import { saveGame } from './save.js';

export function getMageLevel(state, id) { return state.mageUpgrades[id] ?? 0; }
export function getSpecLevel(state, id) { return state.specUpgrades[id] ?? 0; }
export function getUpgradeLevel(state, id) { return getMageLevel(state, id) || getSpecLevel(state, id); }

export function buyMageUpgrade(state, node) {
  const current = getMageLevel(state, node.id);
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
  if (state.selectedClass) return { ok: false, message: `Você já escolheu ${state.selectedClass}. A especialização é permanente neste personagem.` };
  state.selectedClass = classId;
  saveGame(state);
  return { ok: true, message: 'Especialização definida. Ela não pode ser trocada neste personagem.' };
}

export function gainSkillPoints(state) {
  state.mageSkillPoints += 1;
  state.specSkillPoints += 1;
  saveGame(state);
}

export function resetMageUpgrades(state) {
  let refunded = 0;
  for (const level of Object.values(state.mageUpgrades)) refunded += level;
  state.mageUpgrades = {};
  state.mageSkillPoints += refunded;
  saveGame(state);
  return refunded;
}

export function resetSpecUpgrades(state) {
  let refunded = 0;
  for (const level of Object.values(state.specUpgrades)) refunded += level;
  state.specUpgrades = {};
  state.specSkillPoints += refunded;
  saveGame(state);
  return refunded;
}

// Compatibilidade com sistemas de combate existentes.
export function hasTalent(state, id) { return getMageLevel(state, id) > 0; }
export function hasClassNode(state, id) { return getSpecLevel(state, id) > 0; }
