import { hasTalent, hasClassNode } from './talents.js';

export function getSkillStats(state, skill) {
  let damage = skill.baseDamage;
  let cooldown = skill.cooldown;
  let manaCost = skill.id === 'fireball' ? 15 : skill.id === 'lightning' ? 18 : skill.id === 'void_lance' ? 22 : 0;
  const player = state.player;

  if (skill.id === 'fireball' && hasTalent(state, 'fire1')) damage *= 1.10;
  if (skill.id === 'fireball' && state.selectedClass === 'fire') damage *= 1.25;
  if (skill.id === 'lightning' && state.selectedClass === 'thunder') damage *= 1.35;
  if (skill.id === 'void_lance' && state.selectedClass === 'void') damage *= 1.35;
  if (hasTalent(state, 'arcane2')) cooldown *= 0.90;
  if (hasTalent(state, 'blood2') && player.hp < player.maxHp * 0.35) damage *= 1.25;
  if (hasTalent(state, 'hybridBloodFire') && player.hp < player.maxHp * 0.35 && skill.id === 'fireball') damage *= 1.20;

  return { damage, cooldown, manaCost };
}

export function skillDescription(state, skill) {
  const lines = [];
  const stats = getSkillStats(state, skill);
  lines.push(`${Math.round(stats.damage)} dano base ajustado.`);
  if (skill.id === 'fireball') {
    if (hasTalent(state, 'fire2')) lines.push('Aplica queimadura.');
    if (hasTalent(state, 'fire4')) lines.push('Explode em área.');
    if (state.selectedClass === 'fire') lines.push('Senhor do Fogo: deixa área incendiada.');
    if (hasTalent(state, 'hybridFireShadow')) lines.push('Chance de crítico por Chama Sombria.');
  }
  if (skill.id === 'lightning') {
    if (state.selectedClass === 'thunder') lines.push('Gera Carga Elétrica.');
  }
  if (skill.id === 'void_lance') {
    if (state.selectedClass === 'void') lines.push('Pode executar inimigos abaixo de 20% HP.');
    if (hasTalent(state, 'shadow3')) lines.push('+30% contra inimigos com pouca vida.');
  }
  if (skill.id === 'dash' && hasTalent(state, 'hybridShadowArcane')) lines.push('Restaura mana.');
  return lines.join(' ');
}
