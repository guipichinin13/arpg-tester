import { saveGame } from './save.js';
import { classes } from '../data/classes.js';
import { mageSkillTree } from '../data/talents.js';

export function getMageLevel(state, id) { return state.mageUpgrades[id] ?? 0; }
export function getSpecLevel(state, id) { return state.specUpgrades[id] ?? 0; }
export function countUpgrades(map) { return Object.values(map).reduce((sum, value) => sum + value, 0); }

export function hasMagePrereqs(state,node) { return (node.requires??[]).every(id => id === 'core' || getMageLevel(state,id) > 0 || (mageSkillTree.find(n=>n.id===id)?.core===true)); }

export function getMissingMagePrereqs(state,node) { return (node.requires??[]).filter(id => id !== 'core' && getMageLevel(state,id) <= 0).map(id => mageSkillTree.find(n=>n.id===id)?.name ?? id); }

export function buyMageUpgrade(state, node) {
  const current = getMageLevel(state, node.id);
  if (node.core || node.cost === 0) return { ok:false, message:'Esse é o núcleo da árvore.' };
  const missing = getMissingMagePrereqs(state,node);
  if (missing.length) return { ok:false, message:`Caminho bloqueado. Primeiro aprenda: ${missing.join(', ')}` };
  if (current >= node.maxLevel) return { ok: false, message: 'Esse upgrade já está no nível máximo.' };
  if (state.mageSkillPoints < 1) return { ok: false, message: 'Sem pontos de skill de Mago.' };
  state.mageSkillPoints -= 1;
  state.mageUpgrades[node.id] = current + 1;
  saveGame(state);
  return { ok: true, message: `${node.name} → nível ${current + 1}/${node.maxLevel}` };
}

export function buySpecUpgrade(state, node) {
  if (!state.selectedClass) return { ok: false, message: 'Escolha uma especialização primeiro.' };
  const current = getSpecLevel(state, node.id);
  if (current >= node.maxLevel) return { ok: false, message: 'Esse upgrade já está no nível máximo.' };
  if (state.specSkillPoints < 1) return { ok: false, message: 'Sem pontos da especialização.' };
  state.specSkillPoints -= 1;
  state.specUpgrades[node.id] = current + 1;
  saveGame(state);
  return { ok: true, message: `${node.name} → nível ${current + 1}/${node.maxLevel}` };
}

export function selectSpecialization(state, classId) {
  if (state.selectedClass) return { ok: false, message: 'A especialização é permanente neste personagem.' };
  if (!classes[classId]) return { ok: false, message: 'Especialização inválida.' };
  state.selectedClass = classId;
  state.loadout = { skills: [null, null], aura: null };
  state.auraActive = false;
  state.combat.charge = 0;
  saveGame(state);
  return { ok: true, message: `${classes[classId].name} escolhida. Selecione 2 skills e 1 Aura.` };
}

export function setSkillSlot(state, slotIndex, skillId) {
  if (!state.selectedClass || ![0, 1].includes(slotIndex)) return false;
  const cls = classes[state.selectedClass];
  if (!cls.skills.includes(skillId)) return false;
  const otherIndex = slotIndex === 0 ? 1 : 0;
  const otherSkill = state.loadout.skills[otherIndex];
  const current = state.loadout.skills[slotIndex];
  if (otherSkill === skillId) state.loadout.skills[otherIndex] = current ?? null;
  state.loadout.skills[slotIndex] = skillId;
  saveGame(state);
  return true;
}

export function clearSkillSlot(state, slotIndex) {
  if (![0,1].includes(slotIndex)) return false;
  state.loadout.skills[slotIndex] = null;
  saveGame(state);
  return true;
}

export function selectAura(state, auraId) {
  if (!state.selectedClass) return false;
  const cls = classes[state.selectedClass];
  if (!cls.auras.includes(auraId)) return false;
  state.loadout.aura = auraId;
  state.auraActive = true;
  saveGame(state);
  return true;
}

export function toggleAura(state) {
  if (!state.loadout.aura) return false;
  state.auraActive = !state.auraActive;
  saveGame(state);
  return true;
}

export function gainSkillPoints(state) {
  state.mageSkillPoints += 1;
  if (state.selectedClass) state.specSkillPoints += 1;
  saveGame(state);
}

export function resetMageUpgrades(state) {
  const refunded = countUpgrades(state.mageUpgrades);
  state.mageUpgrades = {};
  state.mageSkillPoints += refunded;
  saveGame(state);
  return refunded;
}

export function resetSpecUpgrades(state) {
  const refunded = countUpgrades(state.specUpgrades);
  state.specUpgrades = {};
  state.specSkillPoints += refunded;
  saveGame(state);
  return refunded;
}

// Compatibilidade
export function hasTalent(state, id) { return getMageLevel(state, id) > 0; }
export function hasClassNode(state, id) { return getSpecLevel(state, id) > 0; }
