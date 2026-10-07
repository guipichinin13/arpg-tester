import { getMageLevel, getSpecLevel } from './talents.js';

function sum(state, id, perLevel) { return (getMageLevel(state, id) + getSpecLevel(state, id)) * perLevel; }

export function getDerivedStats(state) {
  return {
    globalDamage: 1 + sum(state, 'mage_power', .08),
    projectileSpeed: 1 + sum(state, 'mage_speed', .15),
    maxMana: 100 + getMageLevel(state, 'mage_mana') * 12,
    manaRegen: 1 + sum(state, 'mage_regen', .20),
    cooldown: Math.max(.55, 1 - sum(state, 'mage_cooldown', .05)),
    critChance: sum(state, 'mage_crit', .05),
    critDamage: 1.5 + sum(state, 'mage_critDamage', .25),
    area: 1 + sum(state, 'mage_area', .10),
    projectilePierce: getMageLevel(state, 'mage_pierce'),
    basicDamage: 1 + sum(state, 'mage_basic', .15),
    elemental: 1 + sum(state, 'mage_fire', .05),
    projectileSize: 1 + sum(state, 'mage_range', .10),

    fireDamage: 1 + sum(state, 'fire_damage', .12),
    burnDuration: 3 + getSpecLevel(state, 'fire_burn') * 1.2,
    fireExplosionRadius: 1 + getSpecLevel(state, 'fire_explosion') * .20,
    fireExplosionDamage: 0.55 + getSpecLevel(state, 'fire_explosion_dmg') * .15,
    fireSpread: getSpecLevel(state, 'fire_spread'),
    meteorDamage: 1 + sum(state, 'fire_meteor', .14),

    lightningDamage: 1 + sum(state, 'thunder_damage', .12),
    lightningChain: getSpecLevel(state, 'thunder_chain'),
    chargeGain: 1 + getSpecLevel(state, 'thunder_charge') * .15,
    overloadDamage: 1 + getSpecLevel(state, 'thunder_overload') * .20,
    overloadRadius: 1 + getSpecLevel(state, 'thunder_radius') * .20,
    overloadCooldownRefund: getSpecLevel(state, 'thunder_recharge') * .10,

    voidDamage: 1 + sum(state, 'void_damage', .13),
    markDuration: 4 + getSpecLevel(state, 'void_mark') * 2,
    executeThreshold: .20 + getSpecLevel(state, 'void_execute') * .04,
    executeExplosion: 1 + getSpecLevel(state, 'void_explosion') * .25,
    voidPierce: getSpecLevel(state, 'void_pierce'),
    voidMeteorRadius: 1 + getSpecLevel(state, 'void_singularity') * .25,
  };
}

export function getSkillStats(state, skill) {
  const d = getDerivedStats(state);
  let damage = skill.baseDamage;
  let manaCost = skill.manaCost ?? 0;

  damage *= d.globalDamage;
  if (skill.id === 'basic') damage *= d.basicDamage;
  if (skill.id === 'fireball') damage *= d.elemental * d.fireDamage;
  if (skill.id === 'lightning') damage *= d.elemental * d.lightningDamage;
  if (skill.id === 'void_lance') damage *= d.elemental * d.voidDamage;
  if (skill.id === 'meteor') {
    damage *= d.meteorDamage * d.elemental;
    if (state.selectedClass === 'void') damage *= d.voidMeteorRadius;
  }

  return {
    damage,
    cooldown: skill.cooldown * d.cooldown,
    manaCost,
    projectileSpeed: 1 + (d.projectileSpeed - 1),
    projectilePierce: d.projectilePierce,
    critChance: d.critChance,
    critDamage: d.critDamage,
    areaMultiplier: d.area,
    projectileSize: d.projectileSize,
  };
}

export function skillDescription(state, skill) {
  const d = getDerivedStats(state);
  const stats = getSkillStats(state, skill);
  const lines = [`${Math.round(stats.damage)} dano · ${Math.round(stats.cooldown)}ms · ${stats.manaCost} Mana.`];
  lines.push(`Crítico ${Math.round(d.critChance * 100)}% · área +${Math.round((d.area - 1) * 100)}% · projétil +${Math.round((d.projectileSpeed - 1) * 100)}% velocidade.`);
  if (skill.id === 'fireball') lines.push(`Explosão: +${Math.round((d.fireExplosionRadius - 1) * 100)}% raio · ${Math.round(d.burnDuration * 10) / 10}s de queimadura · ${d.fireSpread} alvo(s) extra.`);
  if (skill.id === 'lightning') lines.push(`Ricochetes extras: ${d.lightningChain} · Carga: +${Math.round((d.chargeGain - 1) * 100)}%.`);
  if (skill.id === 'void_lance') lines.push(`Execução em ${Math.round(d.executeThreshold * 100)}% HP · atravessa ${d.voidPierce} inimigo(s) extra.`);
  if (skill.id === 'meteor') lines.push(state.selectedClass === 'void' ? `☠️ Singularidade: área +${Math.round((d.voidMeteorRadius - 1) * 100)}%.` : 'Impacto em área e partículas pesadas.');
  return lines.join(' ');
}
