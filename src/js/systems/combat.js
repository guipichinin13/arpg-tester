import { getSkillStats, getDerivedStats } from './stats.js';
import { saveGame } from './save.js';
import { getMageLevel, getSpecLevel, gainSkillPoints } from './talents.js';
import { skills } from '../data/talents.js';

export class CombatSystem {
  constructor(state, logger, particles, projectiles) {
    this.state = state;
    this.log = logger;
    this.particles = particles;
    this.projectiles = projectiles;
  }

  fxBurst(x, y, palette, options) { this.particles?.burst(x, y, palette, options); }

  spawnEnemy() {
    const enemy = {
      x: Math.random() * 680 + 70,
      y: Math.random() * 440 + 90,
      hp: 80, maxHp: 80,
      burning: false,
      burnUntil: 0,
      markedUntil: 0,
      frozenUntil: 0,
    };
    this.state.enemies.push(enemy);
    this.fxBurst(enemy.x, enemy.y, ['#b9384f', '#ff6179'], { count: 7, speed: 35, life: 250, size: 2 });
  }

  getAimDirection() {
    const p = this.state.player;
    const c = this.state.mouse;
    let dx = (c.inside ? c.x : p.x + 1) - p.x;
    let dy = (c.inside ? c.y : p.y) - p.y;
    if (Math.hypot(dx, dy) < 4) dx = 1;
    const len = Math.hypot(dx, dy) || 1;
    return { x: dx / len, y: dy / len };
  }

  canCast(skill) {
    const now = performance.now();
    if ((this.state.cooldowns[skill.id] ?? 0) > now) return false;
    const stats = getSkillStats(this.state, skill);
    return this.state.player.mp >= stats.manaCost;
  }

  spend(skill) {
    const stats = getSkillStats(this.state, skill);
    this.state.cooldowns[skill.id] = performance.now() + stats.cooldown;
    this.state.player.mp = Math.max(0, this.state.player.mp - stats.manaCost);
  }

  castSkill(skillId) {
    const skill = skills[skillId];
    if (!skill || skillId === 'dash' || !this.canCast(skill)) return;
    this.spend(skill);
    const stats = getSkillStats(this.state, skill);
    const direction = this.getAimDirection();
    const speed = skillId === 'fireball' ? 470 : skillId === 'lightning' ? 860 : skillId === 'void_lance' ? 560 : 520;
    const pierce = Math.max(stats.projectilePierce, skillId === 'void_lance' ? getDerivedStats(this.state).voidPierce : 0);

    this.projectiles?.fire({
      from: this.state.player,
      direction,
      skillId,
      speed: speed * stats.projectileSpeed,
      radius: skillId === 'meteor' ? 17 : 8,
      pierce,
      metadata: { sizeMultiplier: stats.projectileSize },
      onHit: enemy => this.applySkillImpact(enemy, skill, stats),
    });

    this.fxBurst(this.state.player.x + direction.x * 20, this.state.player.y + direction.y * 20, ['#ffffff', '#b9a7ff'], { count: 5, speed: 55, life: 120, size: 2 });
  }

  basicAttack() {
    const skill = skills.basic;
    if (!this.canCast(skill)) return;
    this.spend(skill);
    const stats = getSkillStats(this.state, skill);
    const direction = this.getAimDirection();
    this.projectiles?.fire({
      from: this.state.player,
      direction,
      skillId: 'basic',
      speed: 700 * stats.projectileSpeed,
      radius: 7,
      pierce: stats.projectilePierce,
      metadata: { sizeMultiplier: stats.projectileSize },
      onHit: enemy => this.damageEnemy(enemy, stats.damage, skill),
    });
  }

  applySkillImpact(enemy, skill, stats) {
    if (!enemy || enemy.hp <= 0) return;
    const skillId = skill.id;
    this.damageEnemy(enemy, stats.damage, skill);
    const d = getDerivedStats(this.state);

    if (skillId === 'fireball') {
      enemy.burning = true;
      enemy.burnUntil = performance.now() + d.burnDuration * 1000;
      const radius = 95 * d.area * d.fireExplosionRadius;
      const explosionDamage = stats.damage * d.fireExplosionDamage;
      const extraTargets = d.fireSpread;
      if (getMageLevel(this.state, 'mage_area') || getSpecLevel(this.state, 'fire_explosion') || getSpecLevel(this.state, 'fire_spread')) {
        this.particles?.ring(enemy.x, enemy.y, '#ff7a32', 28, radius * .45);
        const nearby = this.state.enemies
          .filter(other => other !== enemy && other.hp > 0 && Math.hypot(other.x - enemy.x, other.y - enemy.y) < radius)
          .slice(0, 2 + extraTargets);
        nearby.forEach(other => {
          this.damageEnemy(other, explosionDamage, skill, true);
          other.burning = true;
          other.burnUntil = performance.now() + d.burnDuration * 1000;
        });
      }
    }

    if (skillId === 'lightning') {
      this.lightningChain(enemy, stats);
      if (this.state.selectedClass === 'thunder') {
        const charge = Math.min(100, this.state.combat.charge + 35 * d.chargeGain);
        this.state.combat.charge = charge;
        if (charge >= 100) this.overload();
      }
    }

    if (skillId === 'void_lance') {
      if (this.state.selectedClass === 'void') {
        enemy.markedUntil = performance.now() + d.markDuration * 1000;
        if (enemy.hp > 0 && enemy.hp <= enemy.maxHp * d.executeThreshold) this.execute(enemy);
      }
    }

    if (skillId === 'meteor') {
      const radius = 110 * d.area * (this.state.selectedClass === 'void' ? d.voidMeteorRadius : 1);
      this.particles?.ring(enemy.x, enemy.y, this.state.selectedClass === 'void' ? '#a56cff' : '#ff6f2e', 36, radius * .45);
      this.state.enemies
        .filter(other => other !== enemy && other.hp > 0 && Math.hypot(other.x - enemy.x, other.y - enemy.y) < radius)
        .forEach(other => this.damageEnemy(other, stats.damage * .35, skill, true));
    }
  }

  lightningChain(source, stats) {
    const d = getDerivedStats(this.state);
    const max = d.lightningChain;
    if (!max) return;
    const hit = new Set([source]);
    let current = source;
    for (let i = 0; i < max; i += 1) {
      const next = this.state.enemies
        .filter(e => e.hp > 0 && !hit.has(e))
        .sort((a, b) => Math.hypot(a.x - current.x, a.y - current.y) - Math.hypot(b.x - current.x, b.y - current.y))[0];
      if (!next || Math.hypot(next.x - current.x, next.y - current.y) > 170) break;
      hit.add(next);
      this.particles?.beam?.(current.x, current.y, next.x, next.y, '#75cfff', 160);
      this.damageEnemy(next, stats.damage * .45, skills.lightning, true);
      current = next;
    }
  }

  damageEnemy(enemy, rawDamage, skill, secondary = false) {
    if (!enemy || enemy.hp <= 0) return;
    let damage = rawDamage;
    const d = getDerivedStats(this.state);
    if (enemy.burning && performance.now() > enemy.burnUntil) enemy.burning = false;
    if (enemy.burning && skill.id !== 'fireball') damage *= 1 + getMageLevel(this.state, 'mage_power') * .02;
    if (enemy.markedUntil > performance.now()) damage *= 1.15;

    const crit = Math.random() < d.critChance;
    if (crit) damage *= d.critDamage;

    enemy.hp -= damage;
    this.fxBurst(enemy.x, enemy.y, crit ? ['#fff7b0', '#ffe36e'] : ['#d7b7ff', '#7d5cff'], { count: crit ? 12 : 6, speed: crit ? 70 : 35, life: 180, size: crit ? 3 : 2 });
    if (enemy.hp <= 0) this.onKill(enemy);
    if (!secondary) this.log(`${crit ? '💥 CRÍTICO! ' : ''}${skill.name} causou ${Math.round(damage)} dano.`);
  }

  execute(enemy) {
    if (!enemy || enemy.hp <= 0) return;
    const d = getDerivedStats(this.state);
    this.fxBurst(enemy.x, enemy.y, ['#f7e8ff', '#bd7cff', '#551bc0'], { count: 60, speed: 230, life: 650, size: 4 });
    enemy.hp = 0;
    this.log('☠️ EXECUÇÃO — o Vazio devorou o inimigo.');
    if (getSpecLevel(this.state, 'void_explosion') > 0) {
      const radius = 100 * d.area;
      this.state.enemies.filter(other => other !== enemy && other.hp > 0 && Math.hypot(other.x - enemy.x, other.y - enemy.y) < radius)
        .forEach(other => this.damageEnemy(other, 35 * d.voidDamage * d.executeExplosion, skills.void_lance, true));
    }
  }

  overload() {
    const p = this.state.player;
    const d = getDerivedStats(this.state);
    this.state.combat.charge = 0;
    const radius = 210 * d.overloadRadius;
    const damage = 85 * d.overloadDamage;
    this.fxBurst(p.x, p.y, ['#fffbd0', '#6fd5ff', '#8c72ff'], { count: 100, speed: 280, life: 900, size: 4 });
    this.particles?.ring(p.x, p.y, '#81d8ff', 65, radius * .45);
    this.log('⚡ SOBRECARGA — tempestade divina liberada!');
    this.state.enemies.filter(e => e.hp > 0 && Math.hypot(e.x - p.x, e.y - p.y) < radius).forEach(e => this.damageEnemy(e, damage, skills.lightning, true));
    if (d.overloadCooldownRefund > 0) {
      const now = performance.now();
      for (const id of Object.keys(this.state.cooldowns)) this.state.cooldowns[id] = Math.max(now, this.state.cooldowns[id] - 500 * d.overloadCooldownRefund);
    }
  }

  dash() {
    const skill = skills.dash;
    if (!this.canCast(skill)) return;
    this.spend(skill);
    const p = this.state.player;
    const before = { x: p.x, y: p.y };
    const distance = 90;
    const direction = this.getAimDirection();
    p.x += direction.x * distance;
    p.y += direction.y * distance;
    p.x = Math.max(30, Math.min(760, p.x));
    p.y = Math.max(70, Math.min(540, p.y));
    this.fxBurst(before.x, before.y, ['#b98cff', '#6c48ff'], { count: 25, speed: 80, life: 350, size: 2.8 });
    this.fxBurst(p.x, p.y, ['#f0d8ff', '#8a5cff'], { count: 35, speed: 130, life: 450, size: 3 });
  }

  onKill(enemy) {
    this.fxBurst(enemy.x, enemy.y, ['#ff5f79', '#c93655'], { count: 28, speed: 150, life: 500, size: 3 });
    this.state.player.xp += 10;
    while (this.state.player.xp >= 100) {
      this.state.player.xp -= 100;
      this.state.player.level += 1;
      gainSkillPoints(this.state);
      this.log(`⬆️ Nível ${this.state.player.level}! +1 Ponto de Mago +1 Ponto de Especialização.`);
    }
    saveGame(this.state);
  }

  update(delta) {
    const p = this.state.player;
    const speed = 2.7;
    if (this.state.keys.has('w')) p.y -= speed;
    if (this.state.keys.has('s')) p.y += speed;
    if (this.state.keys.has('a')) p.x -= speed;
    if (this.state.keys.has('d')) p.x += speed;
    p.x = Math.max(30, Math.min(760, p.x));
    p.y = Math.max(70, Math.min(540, p.y));

    const d = getDerivedStats(this.state);
    p.maxMp = d.maxMana;
    p.mp = Math.min(p.maxMp, p.mp + delta * 0.012 * d.manaRegen);

    for (const enemy of this.state.enemies) {
      if (enemy.hp <= 0) continue;
      if (enemy.burning && performance.now() > enemy.burnUntil) enemy.burning = false;
      const dx = p.x - enemy.x, dy = p.y - enemy.y;
      const distance = Math.hypot(dx, dy) || 1;
      enemy.x += dx / distance * delta * 0.00035;
      enemy.y += dy / distance * delta * 0.00035;
      if (distance < 34) p.hp -= delta * 0.008;
    }
    if (p.hp <= 0) { p.hp = p.maxHp; p.mp = p.maxMp; this.log('💀 Você caiu. O combate recomeça.'); }
    this.state.enemies = this.state.enemies.filter(e => e.hp > 0);
    while (this.state.enemies.length < 5) this.spawnEnemy();
  }
}
