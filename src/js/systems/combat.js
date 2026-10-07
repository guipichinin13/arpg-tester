import { getSkillStats } from './stats.js';
import { hasTalent, hasClassNode } from './talents.js';
import { saveGame } from './save.js';
import { skills } from '../data/skills.js';

export class CombatSystem {
  constructor(state, logger, particles, projectiles) {
    this.state = state;
    this.log = logger;
    this.particles = particles;
    this.projectiles = projectiles;
  }

  fxBurst(x, y, palette, options) { this.particles?.burst(x, y, palette, options); }

  spawnEnemy() {
    const { enemies } = this.state;
    enemies.push({ x: Math.random() * 680 + 70, y: Math.random() * 440 + 90, hp: 80, maxHp: 80, burning: false, marked: false });
    this.fxBurst(enemies.at(-1).x, enemies.at(-1).y, ['#b9384f', '#ff6179'], { count: 7, speed: 35, life: 250, size: 2 });
  }

  nearestEnemy(maxDistance = Infinity) {
    const p = this.state.player;
    return this.state.enemies
      .filter(enemy => enemy.hp > 0)
      .map(enemy => ({ enemy, distance: Math.hypot(enemy.x - p.x, enemy.y - p.y) }))
      .filter(x => x.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance)[0]?.enemy ?? null;
  }

  canCast(skill) {
    const now = performance.now();
    if (this.state.cooldowns[skill.id] > now) return false;
    const { manaCost } = getSkillStats(this.state, skill);
    return this.state.player.mp >= manaCost;
  }

  spend(skill) {
    const now = performance.now();
    const stats = getSkillStats(this.state, skill);
    this.state.cooldowns[skill.id] = now + stats.cooldown;
    this.state.player.mp = Math.max(0, this.state.player.mp - stats.manaCost);
  }

  basicAttack() {
    const skill = skills.basic;
    if (!this.canCast(skill)) return;
    const enemy = this.nearestEnemy(300);
    if (!enemy) return;
    this.spend(skill);
    const stats = getSkillStats(this.state, skill);
    this.projectiles?.fire({
      from: this.state.player,
      target: enemy,
      skillId: 'basic',
      speed: 620,
      onImpact: target => this.damageEnemy(target, stats.damage, skill),
    });
  }

  castSkill(skillId) {
    const skill = skills[skillId];
    if (!skill || !this.canCast(skill)) return;
    if (skillId === 'dash') return this.dash();
    const enemy = this.nearestEnemy(500);
    if (!enemy) return;
    this.spend(skill);
    const stats = getSkillStats(this.state, skill);
    const speed = skillId === 'fireball' ? 430 : skillId === 'lightning' ? 760 : skillId === 'void_lance' ? 520 : 520;
    this.projectiles?.fire({
      from: this.state.player,
      target: enemy,
      skillId,
      speed,
      onImpact: target => this.applySkillImpact(target, skill, stats),
    });
  }

  applySkillImpact(enemy, skill, stats) {
    if (!enemy || enemy.hp <= 0) return;
    const skillId = skill.id;
    this.damageEnemy(enemy, stats.damage, skill);

    if (skillId === 'fireball') {
      if (hasTalent(this.state, 'fire2')) enemy.burning = true;
      if (hasTalent(this.state, 'fire4') && enemy.hp > 0) {
        const radius = hasClassNode(this.state, 'fire_class_3') ? 145 : 95;
        const multiplier = hasClassNode(this.state, 'fire_class_3') ? 0.75 : 0.55;
        this.particles?.ring(enemy.x, enemy.y, '#ff7a32', 30, radius * .5);
        this.state.enemies
          .filter(other => other !== enemy && other.hp > 0 && Math.hypot(other.x - enemy.x, other.y - enemy.y) < radius)
          .forEach(other => this.damageEnemy(other, stats.damage * multiplier, skill, true));
      }
    }

    if (skillId === 'lightning') {
      this.particles?.ring(enemy.x, enemy.y, '#75cfff', 18, 24);
      if (this.state.selectedClass === 'thunder' && hasClassNode(this.state, 'thunder_class_1')) {
        this.state.combat.charge = Math.min(100, this.state.combat.charge + 35);
        if (this.state.combat.charge >= 100 && hasClassNode(this.state, 'thunder_class_2')) this.overload();
      }
    }

    if (skillId === 'void_lance') {
      if (this.state.selectedClass === 'void' && hasClassNode(this.state, 'void_class_1')) enemy.marked = true;
      if (this.state.selectedClass === 'void' && enemy.hp > 0 && enemy.hp <= enemy.maxHp * 0.2) this.execute(enemy);
    }

    if (skillId === 'meteor') {
      this.particles?.ring(enemy.x, enemy.y, '#ff6f2e', 36, 35);
      const radius = this.state.selectedClass === 'fire' ? 150 : 105;
      this.state.enemies.filter(other => other !== enemy && other.hp > 0 && Math.hypot(other.x - enemy.x, other.y - enemy.y) < radius)
        .forEach(other => this.damageEnemy(other, stats.damage * .35, skill, true));
    }
  }

  damageEnemy(enemy, rawDamage, skill, secondary = false) {
    let damage = rawDamage;
    if (enemy.burning && hasTalent(this.state, 'fire3')) damage *= 1.25;
    if (hasTalent(this.state, 'shadow3') && enemy.hp < enemy.maxHp * 0.30) damage *= 1.30;
    if (hasClassNode(this.state, 'fire_class_2') && enemy.burning) damage *= 1.20;
    if (enemy.marked && hasClassNode(this.state, 'void_class_1')) damage *= 1.15;
    if (hasClassNode(this.state, 'void_class_2') && enemy.hp < enemy.maxHp * 0.35) damage *= 1.30;
    if (hasTalent(this.state, 'hybridFireShadow') && skill.id === 'fireball' && Math.random() < 0.15) damage *= 2;

    enemy.hp -= damage;
    if (enemy.hp <= 0) this.onKill(enemy);
    else if (!secondary && enemy.burning) this.fxBurst(enemy.x, enemy.y, ['#ffb52e', '#ff5d2e'], { count: 6, speed: 30, life: 220, size: 2 });
    if (!secondary) this.log(`✨ ${skill.name} causou ${Math.round(damage)} dano.`);
  }

  execute(enemy) {
    if (enemy.hp <= 0) return;
    this.fxBurst(enemy.x, enemy.y, ['#f6e4ff', '#b067ff', '#5319b8'], { count: 50, speed: 220, life: 650, size: 4 });
    enemy.hp = 0;
    this.log('☠️ EXECUÇÃO — o Vazio devorou o inimigo.');
    if (hasClassNode(this.state, 'void_class_3')) {
      this.state.enemies.filter(other => other !== enemy && other.hp > 0 && Math.hypot(other.x - enemy.x, other.y - enemy.y) < 110)
        .forEach(other => this.damageEnemy(other, 35, skills.void_lance, true));
    }
  }

  overload() {
    const p = this.state.player;
    this.state.combat.charge = 0;
    this.fxBurst(p.x, p.y, ['#fffbd0', '#6fd5ff', '#8c72ff'], { count: 90, speed: 260, life: 900, size: 4 });
    this.particles?.ring(p.x, p.y, '#81d8ff', 60, 30);
    this.log('⚡ SOBRECARGA — tempestade divina liberada!');
    this.state.enemies.filter(e => e.hp > 0 && Math.hypot(e.x - p.x, e.y - p.y) < 210).forEach(e => e.hp -= 85);
    if (hasClassNode(this.state, 'thunder_class_3')) {
      Object.keys(this.state.cooldowns).forEach(id => { this.state.cooldowns[id] = Math.min(this.state.cooldowns[id], performance.now() + 350); });
    }
  }

  dash() {
    const skill = skills.dash;
    if (!this.canCast(skill)) return;
    this.spend(skill);
    const p = this.state.player;
    const before = { x: p.x, y: p.y };
    const distance = hasTalent(this.state, 'shadow1') ? 110 : 80;
    if (this.state.keys.has('w')) p.y -= distance;
    if (this.state.keys.has('s')) p.y += distance;
    if (this.state.keys.has('a')) p.x -= distance;
    if (this.state.keys.has('d')) p.x += distance;
    p.x = Math.max(30, Math.min(760, p.x));
    p.y = Math.max(70, Math.min(540, p.y));
    if (hasTalent(this.state, 'hybridShadowArcane')) p.mp = Math.min(p.maxMp, p.mp + 20);
    this.fxBurst(before.x, before.y, ['#b98cff', '#6c48ff'], { count: 20, speed: 80, life: 350, size: 2.8 });
    this.fxBurst(p.x, p.y, ['#f0d8ff', '#8a5cff'], { count: 30, speed: 130, life: 450, size: 3 });
  }

  onKill(enemy) {
    this.fxBurst(enemy.x, enemy.y, ['#ff5f79', '#c93655'], { count: 26, speed: 145, life: 500, size: 3 });
    this.state.player.xp += 10;
    if (hasTalent(this.state, 'blood1')) this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + 4);
    if (hasTalent(this.state, 'blood3') && Math.random() < 0.25) this.log('💀 Carnificina: execução em cadeia!');

    let leveledUp = false;
    while (this.state.player.xp >= 100) {
      this.state.player.xp -= 100;
      this.state.player.level += 1;
      this.state.totalTalentPoints += 1;
      this.state.availableTalentPoints += 1;
      leveledUp = true;
      this.log(`⬆️ Nível ${this.state.player.level}! +1 ponto de talento disponível.`);
    }
    if (leveledUp) saveGame(this.state);
  }

  update(delta) {
    const p = this.state.player;
    const speed = hasTalent(this.state, 'shadow1') ? 2.7 * 1.15 : 2.7;
    if (this.state.keys.has('w')) p.y -= speed;
    if (this.state.keys.has('s')) p.y += speed;
    if (this.state.keys.has('a')) p.x -= speed;
    if (this.state.keys.has('d')) p.x += speed;
    p.x = Math.max(30, Math.min(760, p.x));
    p.y = Math.max(70, Math.min(540, p.y));
    p.mp = Math.min(p.maxMp, p.mp + delta * 0.012 * (hasTalent(this.state, 'arcane1') ? 1.2 : 1));

    for (const enemy of this.state.enemies) {
      if (enemy.hp <= 0) continue;
      const dx = p.x - enemy.x;
      const dy = p.y - enemy.y;
      const distance = Math.hypot(dx, dy) || 1;
      enemy.x += dx / distance * delta * 0.00035;
      enemy.y += dy / distance * delta * 0.00035;
      if (distance < 34) p.hp -= delta * 0.008;
    }
    if (p.hp <= 0) {
      p.hp = p.maxHp;
      p.mp = p.maxMp;
      this.log('💀 Você caiu. O Vazio o trouxe de volta ao combate.');
    }
    this.state.enemies = this.state.enemies.filter(e => e.hp > 0);
    while (this.state.enemies.length < 5) this.spawnEnemy();
  }
}
