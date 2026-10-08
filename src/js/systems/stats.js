import { classes, auras } from '../data/classes.js';
import { getMageLevel, getSpecLevel } from './talents.js';

function levelValue(state, id, perLevel = 0) { return (getMageLevel(state, id) + getSpecLevel(state, id)) * perLevel; }

export function getActiveAura(state) {
  if (!state.auraActive || !state.loadout.aura) return null;
  return auras[state.loadout.aura] ?? null;
}

export function getDerivedStats(state) {
  const cls = state.selectedClass ? classes[state.selectedClass] : null;
  const aura = getActiveAura(state);
  const auraDef = aura ? auras[aura.id] : null;
  const auraPower = aura ? 1 + getSpecLevel(state, `${state.selectedClass}_aura_power`) * 0.06 : 1;
  const auraEffect = aura ? aura.baseEffect * auraPower : 0;
  const auraRadius = aura ? 185 * (1 + getSpecLevel(state, `${state.selectedClass}_aura_radius`) * 0.15) : 0;
  const auraPulsePower = aura ? 1 + getSpecLevel(state, `${state.selectedClass}_aura_pulse`) * 0.20 : 1;
  const auraDamageReduction = (aura?.damageReduction ?? 0) + getSpecLevel(state, `${state.selectedClass}_aura_guard`) * 0.05;

  const stats = {
    globalDamage: 1 + getMageLevel(state, 'mage_power') * 0.08,
    projectileSpeed: 1 + getMageLevel(state, 'mage_speed') * 0.15,
    maxMana: 100 + getMageLevel(state, 'mage_mana') * 12,
    manaRegen: 1 + getMageLevel(state, 'mage_regen') * 0.20,
    cooldown: Math.max(.50, 1 - getMageLevel(state, 'mage_cooldown') * 0.05),
    critChance: getMageLevel(state, 'mage_crit') * 0.05,
    critDamage: 1.5 + getMageLevel(state, 'mage_critDamage') * 0.25,
    area: 1 + getMageLevel(state, 'mage_area') * 0.10,
    projectilePierce: getMageLevel(state, 'mage_pierce'),
    basicDamage: 1 + getMageLevel(state, 'mage_basic') * 0.15,
    fireDamage: 1,
    lightningDamage: 1,
    voidDamage: 1,
    fireArea: 1,
    fireProjectileSpeed: 1,
    lightningArea: 1,
    voidArea: 1,
    burnDuration: 3,
    burnDamage: 1,
    fireSpread: 0,
    lightningChain: 0,
    chargeGain: 1,
    overloadDamage: 1,
    overloadRadius: 1,
    overloadCooldownRefund: 0,
    markDuration: 4,
    executeThreshold: .20,
    executeExplosion: 1,
    voidPierce: 0,
    projectileSize: 1,
    damageReduction: 0,
    moveSpeed: 1,
    auraRadius,
    auraEffect,
    auraPulsePower,
    auraDamageReduction,
    auraActive: Boolean(aura),
    auraShock: getSpecLevel(state, `${state.selectedClass}_aura_shock`) > 0,
    auraIgnite: getSpecLevel(state, `${state.selectedClass}_aura_ignite`) > 0,
    auraMark: getSpecLevel(state, `${state.selectedClass}_aura_mark`) > 0 || Boolean(auraDef?.mark),
    auraCharge: aura?.chargePerPulse ?? 0,
    auraExecuteBonus: (aura?.executeThreshold ?? 0) + getSpecLevel(state, 'void_aura_execute') * 0.03,
  };

  if (state.selectedClass === 'fire') {
    stats.fireDamage *= 1 + getSpecLevel(state, 'fire_power') * 0.12;
    stats.fireArea *= 1 + getSpecLevel(state, 'fire_area') * 0.15;
    stats.fireProjectileSpeed *= 1 + getSpecLevel(state, 'fire_velocity') * 0.12;
    stats.burnDuration += getSpecLevel(state, 'fire_burn') * 1.2;
    stats.burnDamage *= 1 + getSpecLevel(state, 'fire_burn_power') * 0.20;
    stats.meteorDamage = 1 + getSpecLevel(state, 'fire_meteor') * 0.16;
  } else if (state.selectedClass === 'thunder') {
    stats.lightningDamage *= 1 + getSpecLevel(state, 'thunder_power') * 0.12;
    stats.lightningChain = getSpecLevel(state, 'thunder_chain');
    stats.chargeGain = 1 + getSpecLevel(state, 'thunder_charge') * 0.15;
    stats.overloadDamage = 1 + getSpecLevel(state, 'thunder_overload') * 0.20;
    stats.overloadRadius = 1 + getSpecLevel(state, 'thunder_radius') * 0.20;
    stats.overloadCooldownRefund = getSpecLevel(state, 'thunder_recharge') * 0.10;
  } else if (state.selectedClass === 'void') {
    stats.voidDamage *= 1 + getSpecLevel(state, 'void_power') * 0.13;
    stats.markDuration += getSpecLevel(state, 'void_mark') * 2;
    stats.executeThreshold += getSpecLevel(state, 'void_execute') * 0.04;
    stats.executeExplosion *= 1 + getSpecLevel(state, 'void_explosion') * 0.25;
    stats.voidPierce = getSpecLevel(state, 'void_pierce');
    stats.voidArea *= 1 + getSpecLevel(state, 'void_singularity') * 0.18;
  }

  if (aura) {
    const p = auraEffect;
    if (state.selectedClass === 'fire') stats.fireDamage *= 1 + p;
    if (state.selectedClass === 'thunder') stats.lightningDamage *= 1 + p;
    if (state.selectedClass === 'void') stats.voidDamage *= 1 + p;
    stats.projectileSpeed *= 1 + (aura.projectileSpeed ?? 0) * auraPower;
    stats.cooldown *= 1 - (aura.cooldown ?? 0) * auraPower;
    stats.critChance += (aura.critChance ?? 0) * auraPower;
    stats.moveSpeed *= 1 + (aura.moveSpeed ?? 0) * auraPower;
    stats.damageReduction += auraDamageReduction;
    if (state.selectedClass === 'fire' && getSpecLevel(state, 'fire_aura_ignite')) stats.auraIgnite = true;
    if (state.selectedClass === 'thunder' && getSpecLevel(state, 'thunder_aura_shock')) stats.auraShock = true;
    if (state.selectedClass === 'void') {
      stats.auraMark = stats.auraMark || getSpecLevel(state, 'void_aura_mark') > 0;
      stats.executeThreshold += stats.auraExecuteBonus;
    }
  }

  stats.fireArea *= state.selectedClass === 'fire' && aura ? 1 + auraEffect * 0.35 : 1;
  stats.moveSpeed = Math.min(1.8, stats.moveSpeed);
  return stats;
}

export function getSkillStats(state, skill) {
  const d = getDerivedStats(state);
  let damage = skill.baseDamage;
  let area = d.area;
  let speed = d.projectileSpeed;

  damage *= d.globalDamage;
  if (skill.id === 'basic') damage *= d.basicDamage;
  if (skill.classId === 'fire') { damage *= d.fireDamage; area *= d.fireArea; speed *= d.fireProjectileSpeed; }
  if (skill.classId === 'thunder') { damage *= d.lightningDamage; }
  if (skill.classId === 'void') { damage *= d.voidDamage; area *= d.voidArea; }
  if (skill.id === 'meteor') damage *= d.meteorDamage ?? 1;
  if (skill.id === 'flame_burst') damage *= 1.05;

  return {
    damage, cooldown: skill.cooldown * d.cooldown, manaCost: skill.manaCost ?? 0,
    projectileSpeed: speed, projectilePierce: d.projectilePierce,
    critChance: d.critChance, critDamage: d.critDamage,
    areaMultiplier: area, projectileSize: d.projectileSize,
  };
}

export function skillDescription(state, skill) {
  const d = getDerivedStats(state); const s = getSkillStats(state, skill);
  const lines = [`${Math.round(s.damage)} dano · ${Math.round(s.cooldown)}ms · ${s.manaCost} Mana.`];
  lines.push(`Crítico ${Math.round(s.critChance * 100)}% · área +${Math.round((s.areaMultiplier - 1) * 100)}% · projétil +${Math.round((s.projectileSpeed - 1) * 100)}% velocidade.`);
  if (skill.classId === 'fire') lines.push(`Queimadura ${Math.round(d.burnDuration * 10) / 10}s · dano de queimadura +${Math.round((d.burnDamage - 1) * 100)}%.`);
  if (skill.classId === 'thunder') lines.push(`Ricochetes ${d.lightningChain} · Carga +${Math.round((d.chargeGain - 1) * 100)}%.`);
  if (skill.classId === 'void') lines.push(`Execução em ${Math.round(d.executeThreshold * 100)}% HP · atravessa ${d.voidPierce} inimigo(s).`);
  if (state.loadout.aura) lines.push(`Aura: ${auras[state.loadout.aura].name} ${state.auraActive ? 'ATIVA' : 'inativa'}.`);
  return lines.join(' ');
}
