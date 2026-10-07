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
  return { ok: true, message: `Talento aprendido: ${talent.name}` };
}

export function learnClassNode(state, node) {
  if (state.learnedClassNodes.has(node.id)) return { ok: false, message: 'Especialização já aprendida.' };
  if (!requirementsMet(state, node.requires)) return { ok: false, message: 'Pré-requisito da classe não atendido.' };
  if (state.availableTalentPoints < node.cost) return { ok: false, message: 'Pontos insuficientes.' };
  state.availableTalentPoints -= node.cost;
  state.learnedClassNodes.add(node.id);
  return { ok: true, message: `Especialização aprendida: ${node.name}` };
}

export function resetTalents(state) {
  state.learnedTalents.clear();
  state.learnedClassNodes.clear();
  state.availableTalentPoints = 3;
}
