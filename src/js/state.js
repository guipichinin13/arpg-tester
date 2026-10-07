export function createGameState() {
  return {
    player: { x: 360, y: 330, hp: 100, maxHp: 100, mp: 100, maxMp: 100, xp: 20, level: 1 },
    availableTalentPoints: 3,
    selectedClass: null,
    learnedTalents: new Set(),
    learnedClassNodes: new Set(),
    keys: new Set(),
    cooldowns: {},
    enemies: [],
    logs: [],
    activeTab: 'classes',
    combat: { charge: 0, burnTicks: [] },
  };
}
