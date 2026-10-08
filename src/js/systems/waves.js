import { getMapTier } from '../data/maps.js';
import { rollMonsterAffixes } from '../data/monsterAffixes.js';

function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

export function getWaveDefinition(wave) {
  const total = 8 + wave * 2;
  const magicChance = wave < 3 ? 0 : clamp(0.12 + (wave - 3) * 0.085, 0, 0.67);
  const rareChance = wave < 5 ? 0 : clamp(0.04 + (wave - 5) * 0.055, 0, 0.27);
  return {
    wave,
    total,
    magicChance,
    rareChance,
    boss: wave === 10,
    bossDelay: 18000,
    spawnInterval: Math.max(160, 440 - wave * 18),
    hpMultiplier: 1 + (wave - 1) * 0.055,
    damageMultiplier: 1 + (wave - 1) * 0.042,
  };
}

export class WaveSystem {
  constructor(state, combat, logger) {
    this.state = state;
    this.combat = combat;
    this.log = logger;
    this.state.wave = this.state.wave ?? {
      current: 1,
      status: 'spawning',
      spawned: 0,
      defeated: 0,
      total: 0,
      spawnTimer: 0,
      intermissionTimer: 0,
      elapsed: 0,
      bossSpawned: false,
      bossDefeated: false,
      completed: false,
    };
    this.startWave(this.state.wave.current || 1);
  }

  startWave(wave) {
    const safeWave = Math.max(1, Math.min(10, wave));
    const definition = getWaveDefinition(safeWave);
    Object.assign(this.state.wave, {
      current: safeWave,
      status: 'spawning',
      spawned: 0,
      defeated: 0,
      total: definition.total,
      spawnTimer: 0,
      intermissionTimer: 0,
      elapsed: 0,
      bossSpawned: false,
      bossDefeated: false,
      completed: false,
    });
    this.log(`🌊 Wave ${safeWave}/10 iniciada — ${definition.total} monstros.`);
  }

  chooseRarity(definition) {
    if (Math.random() < definition.rareChance) return 'rare';
    if (Math.random() < definition.magicChance) return 'magic';
    return 'normal';
  }

  spawnRegular(definition) {
    const rarity = this.chooseRarity(definition);
    const affixes = rollMonsterAffixes(rarity);
    this.combat.spawnEnemy({
      wave: definition.wave,
      rarity,
      affixes,
      waveHpMultiplier: definition.hpMultiplier,
      waveDamageMultiplier: definition.damageMultiplier,
    });
    this.state.wave.spawned += 1;
  }

  spawnBoss(definition) {
    if (this.state.wave.bossSpawned) return;
    const affixes = rollMonsterAffixes('rare');
    this.combat.spawnEnemy({
      wave: definition.wave,
      rarity: 'boss',
      affixes,
      boss: true,
      waveHpMultiplier: definition.hpMultiplier * 3.8,
      waveDamageMultiplier: definition.damageMultiplier * 2.4,
    });
    this.state.wave.bossSpawned = true;
    this.state.wave.status = 'boss';
    this.log('👹 BOSS DA WAVE 10 — prepare-se!');
  }

  onEnemyKilled(enemy) {
    if (!enemy || enemy.wave !== this.state.wave.current) return;
    this.state.wave.defeated += 1;
    if (enemy.boss) {
      this.state.wave.bossDefeated = true;
      this.log('🏆 Boss derrotado! Limpe os últimos monstros para concluir a Wave 10.');
    }
  }

  update(delta) {
    const wave = this.state.wave;
    if (!wave || wave.completed) return;
    const definition = getWaveDefinition(wave.current);
    wave.elapsed += delta;

    if (wave.status === 'intermission') {
      wave.intermissionTimer -= delta;
      if (wave.intermissionTimer <= 0) this.startWave(wave.current + 1);
      return;
    }

    if (wave.status === 'spawning') {
      wave.spawnTimer -= delta;
      if (wave.spawned < wave.total && wave.spawnTimer <= 0) {
        this.spawnRegular(definition);
        wave.spawnTimer = definition.spawnInterval;
      }
      if (wave.spawned >= wave.total) {
        wave.status = wave.current === 10 ? 'active' : 'active';
        this.log(`⚔️ Wave ${wave.current}: todos os monstros entraram no mapa.`);
      }
    }

    if (wave.current === 10 && !wave.bossSpawned && wave.elapsed >= definition.bossDelay) {
      this.spawnBoss(definition);
    }

    const living = this.state.enemies.filter(enemy => enemy.hp > 0 && enemy.wave === wave.current);
    const regularCleared = wave.spawned >= wave.total && living.filter(enemy => !enemy.boss).length === 0;
    const finalCleared = wave.current === 10
      ? regularCleared && wave.bossSpawned && living.length === 0
      : regularCleared;

    if (finalCleared && wave.status !== 'intermission') {
      if (wave.current >= 10) {
        wave.completed = true;
        wave.status = 'complete';
        this.log('🏆 T1 concluído! As Waves 1–10 foram vencidas.');
      } else {
        wave.status = 'intermission';
        wave.intermissionTimer = 2800;
        this.log(`✅ Wave ${wave.current} concluída. Próxima wave em 2,8s.`);
      }
    }
  }
}
