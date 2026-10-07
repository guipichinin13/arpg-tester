const SAVE_KEY = 'arpg_mago_save_v3';

export function saveGame(state) {
  const payload = {
    version: 3,
    player: { ...state.player },
    mageSkillPoints: state.mageSkillPoints,
    specSkillPoints: state.specSkillPoints,
    selectedClass: state.selectedClass,
    mageUpgrades: state.mageUpgrades,
    specUpgrades: state.specUpgrades,
    savedAt: Date.now(),
  };
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
    state.saveStatus = 'salvo';
    state.lastSavedAt = payload.savedAt;
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
    if (!data || data.version !== 3) return null;
    return data;
  } catch (error) {
    console.warn('Save inválido.', error);
    return null;
  }
}

export function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

export function applySavedGame(state, data) {
  if (!data) return false;
  Object.assign(state.player, data.player ?? {});
  state.mageSkillPoints = Number.isFinite(data.mageSkillPoints) ? data.mageSkillPoints : 1;
  state.specSkillPoints = Number.isFinite(data.specSkillPoints) ? data.specSkillPoints : 1;
  state.selectedClass = data.selectedClass ?? null;
  state.mageUpgrades = data.mageUpgrades ?? {};
  state.specUpgrades = data.specUpgrades ?? {};
  state.saveStatus = 'salvo';
  state.lastSavedAt = data.savedAt ?? Date.now();
  return true;
}
