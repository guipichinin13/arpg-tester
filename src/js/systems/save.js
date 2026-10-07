const SAVE_KEY = 'arpg_mago_save_v2';

export function saveGame(state) {
  const payload = {
    version: 2,
    player: {
      hp: state.player.hp,
      mp: state.player.mp,
      xp: state.player.xp,
      level: state.player.level,
      x: state.player.x,
      y: state.player.y,
    },
    totalTalentPoints: state.totalTalentPoints,
    availableTalentPoints: state.availableTalentPoints,
    selectedClass: state.selectedClass,
    learnedTalents: [...state.learnedTalents],
    learnedClassNodes: [...state.learnedClassNodes],
    savedAt: Date.now(),
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    state.saveStatus = 'salvo';
    state.lastSavedAt = Date.now();
  } catch (error) {
    state.saveStatus = 'erro';
    console.warn('Não foi possível salvar a build.', error);
  }
}

export function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || data.version !== 2) return null;
    return data;
  } catch (error) {
    console.warn('Save inválido, usando novo personagem.', error);
    return null;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function applySavedGame(state, data) {
  if (!data) return false;
  Object.assign(state.player, data.player ?? {});
  state.totalTalentPoints = Number.isFinite(data.totalTalentPoints) ? data.totalTalentPoints : 3;
  state.availableTalentPoints = Number.isFinite(data.availableTalentPoints) ? data.availableTalentPoints : state.totalTalentPoints;
  state.selectedClass = data.selectedClass ?? null;
  state.learnedTalents = new Set(data.learnedTalents ?? []);
  state.learnedClassNodes = new Set(data.learnedClassNodes ?? []);
  state.saveStatus = 'salvo';
  state.lastSavedAt = data.savedAt ?? Date.now();
  return true;
}
