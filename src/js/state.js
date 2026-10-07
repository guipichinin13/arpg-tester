import { loadGame, applySavedGame } from './systems/save.js';

export function createGameState() {
  const state = {
    player: { x: 360, y: 330, hp: 100, maxHp: 100, mp: 100, maxMp: 100, xp: 20, level: 1 },
    totalTalentPoints: 3,
    availableTalentPoints: 3,
    selectedClass: null,
    learnedTalents: new Set(),
    learnedClassNodes: new Set(),
    keys: new Set(),
    cooldowns: {},
    enemies: [],
    logs: [],
    activeTab: 'classes',
    saveStatus: 'novo',
    lastSavedAt: 0,
    combat: { charge: 0 },
  };
  applySavedGame(state, loadGame());
  return state;
}
