import { getSkillStats } from './stats.js';
import { hasTalent, hasClassNode } from './talents.js';
import { skills } from '../data/skills.js';

export class CombatSystem {
  constructor(state, logger) { this.state = state; this.log = logger; }

  spawnEnemy() {
    const { enemies } = this.state;
    enemies.push({ x: Math.random() * 680 + 70, y: Math.random() * 440 + 90, hp: 80, maxHp: 80, burning: false, marked: false });
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
    if (this.state.player.mp < manaCost) return false;
    return true;
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
    const enemy = this.nearestEnemy(115);
    if (!enemy) return;
    this.spend(skill);
    this.damageEnemy(enemy, getSkillStats(this.state, skill).damage, skill);
  }

  castSkill(skillId) {
    const skill = skills[skillId];
    if (!skill || !this.canCast(skill)) return;
    if (skillId === 'dash') return this.dash();
    const enemy = this.nearestEnemy(300);
    if (!enemy) return;
    this.spend(skill);
    const stats = getSkillStats(this.state, skill);
    this.damageEnemy(enemy, stats.damage, skill);

    if (skillId === 'fireball' && hasTalent(this.state, 'fire2')) enemy.burning = true;
    if (skillId === 'fireball' && hasTalent(this.state, 'fire4')) {
      this.state.enemies.filter(other => other !== enemy && other.hp > 0 && Math.hypot(other.x - enemy.x, other.y - enemy.y) < 95)
        .forEach(other => this.damageEnemy(other, stats.damage * 0.55, skill, true));
    }

    if (this.state.selectedClass === 'thunder' && skillId === 'lightning' && hasClassNode(this.state, 'thunder_class_1')) {
      this.state.combat.charge = Math.min(100, this.state.combat.charge + 35);
      if (this.state.combat.charge >= 100 && hasClassNode(this.state, 'thunder_class_2')) this.overload();
    }

    if (this.state.selectedClass === 'void' && skillId === 'void_lance' && enemy.hp > 0 && enemy.hp <= enemy.maxHp * 0.2) {
      this.execute(enemy);
    }
  }

  damageEnemy(enemy, rawDamage, skill, secondary = false) {
    let damage = rawDamage;
    if (enemy.burning && hasTalent(this.state, 'fire3')) damage *= 1.25;
    if (hasTalent(this.state, 'shadow3') && enemy.hp < enemy.maxHp * 0.30) damage *= 1.30;
    if (hasClassNode(this.state, 'fire_class_2') && enemy.burning) damage *= 1.20;
    if (hasClassNode(this.state, 'void_class_1') && enemy.marked) damage *= 1.15;
    if (hasClassNode(this.state, 'void_class_2') && enemy.hp < enemy.maxHp * 0.35) damage *= 1.30;
    if (hasTalent(this.state, 'hybridFireShadow') && skill.id === 'fireball' && Math.random() < 0.15) damage *= 2;

    enemy.hp -= damage;
    if (enemy.hp <= 0) this.onKill(enemy);
    else if (this.state.selectedClass === 'void' && hasClassNode(this.state, 'void_class_1')) enemy.marked = true;
    if (!secondary) this.log(`✨ ${skill.name} causou ${Math.round(damage)} dano.`);
  }

  execute(enemy) {
    if (enemy.hp <= 0) return;
    enemy.hp = 0;
    this.log('☠️ EXECUÇÃO — o Vazio devorou o inimigo.');
    if (hasClassNode(this.state, 'void_class_3')) {
      this.state.enemies.filter(other => other !== enemy && other.hp > 0 && Math.hypot(other.x - enemy.x, other.y - enemy.y) < 110)
        .forEach(other => other.hp -= 28);
    }
  }

  overload() {
    this.state.combat.charge = 0;
    this.log('⚡ SOBRECARGA — tempestade divina liberada!');
    this.state.enemies.filter(e => e.hp > 0 && Math.hypot(e.x - this.state.player.x, e.y - this.state.player.y) < 180)
      .forEach(e => e.hp -= 85);
  }

  dash() {
    const skill = skills.dash;
    if (!this.canCast(skill)) return;
    this.spend(skill);
    const p = this.state.player;
    const distance = hasTalent(this.state, 'shadow1') ? 110 : 80;
    if (this.state.keys.has('w')) p.y -= distance;
    if (this.state.keys.has('s')) p.y += distance;
    if (this.state.keys.has('a')) p.x -= distance;
    if (this.state.keys.has('d')) p.x += distance;
    p.x = Math.max(30, Math.min(760, p.x));
    p.y = Math.max(70, Math.min(540, p.y));
    if (hasTalent(this.state, 'hybridShadowArcane')) p.mp = Math.min(p.maxMp, p.mp + 20);
  }

  onKill(enemy) {
    this.state.player.xp += 10;
    if (hasTalent(this.state, 'blood1')) this.state.player.hp = Math.min(this.state.player.maxHp, this.state.player.hp + 4);
    if (hasTalent(this.state, 'blood3') && Math.random() < 0.25) this.log('💀 Carnificina: execução em cadeia!');
    if (this.state.player.xp >= 100) {
      this.state.player.xp -= 100;
      this.state.player.level += 1;
      this.state.availableTalentPoints += 1;
      this.log(`⬆️ Nível ${this.state.player.level}! +1 ponto de talento.`);
    }
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
