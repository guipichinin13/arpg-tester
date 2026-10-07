import { saveGame } from './save.js';

export function hasTalent(state, id) { return state.learnedTalents.has(id); }
export function hasClassNode(state, id) { return state.learnedClassNodes.has(id); }
export function requirementsMet(state, requires = []) {
  return requires.every(id => state.learnedTalents.has(id) || state.learnedClassNodes.has(id));
}

export function learnTalent(state, talent) {
  if (state.learnedTalents.has(talent.id)) return { ok: false, message: 'Esse talento já foi aprendido.' };
  if (!requirementsMet(state, talent.requires)) return { ok: false, message: 'Pré-requisito não atendido.' };
  if (state.availableTalentPoints < talent.cost) return { ok: false, message: 'Pontos insuficientes.' };
  state.availableTalentPoints -= talent.cost;
  state.learnedTalents.add(talent.id);
  saveGame(state);
  return { ok: true, message: `Talento aprendido: ${talent.name}` };
}

export function learnClassNode(state, node) {
  if (state.learnedClassNodes.has(node.id)) return { ok: false, message: 'Especialização já aprendida.' };
  if (!requirementsMet(state, node.requires)) return { ok: false, message: 'Pré-requisito da classe não atendido.' };
  if (state.availableTalentPoints < node.cost) return { ok: false, message: 'Pontos insuficientes.' };
  state.availableTalentPoints -= node.cost;
  state.learnedClassNodes.add(node.id);
  saveGame(state);
  return { ok: true, message: `Especialização aprendida: ${node.name}` };
}

export function switchClassWithRefund(state, classDef) {
  let refund = 0;
  const previous = state.selectedClass;
  if (previous) {
    // O chamador fornece as árvores; os IDs ainda existentes no save são precificados pelo nodeCosts.
    refund = Object.values(classDef).flatMap(c => c.tree).filter(n => state.learnedClassNodes.has(n.id)).reduce((sum, n) => sum + n.cost, 0);
  }
  state.availableTalentPoints += refund;
  state.learnedClassNodes.clear();
  saveGame(state);
  return refund;
}

export function resetTalents(state) {
  state.learnedTalents.clear();
  state.learnedClassNodes.clear();
  state.availableTalentPoints = state.totalTalentPoints;
  saveGame(state);
}

export function gainTalentPoint(state) {
  state.totalTalentPoints += 1;
  state.availableTalentPoints += 1;
  saveGame(state);
}
