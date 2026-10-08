
export function createGameState() {
  const state = {
    player: { x: 360, y: 330, hp: 100, maxHp: 100, mp: 100, maxMp: 100, xp: 0, level: 1 },
    mageSkillPoints: 1,
    specSkillPoints: 1,
    selectedClass: null,
    mageUpgrades: {},
    specUpgrades: {},
    loadout: { skills: [null, null], aura: null },
    auraActive: false,
    keys: new Set(),
    mouse: { x: 360, y: 330, inside: false },
    cooldowns: {},
    enemies: [],
    logs: [],
    activeTab: 'classes',
    combat: { charge: 0, auraPulseTimer: 0, lastPlayerHitAt: 0 },
    map: { tier: 1, modifiers: [], currencySlots: 0 },
    wave: { current: 1, status: 'spawning', spawned: 0, defeated: 0, total: 10, spawnTimer: 0, intermissionTimer: 0, elapsed: 0, bossSpawned: false, bossDefeated: false, completed: false },
  };
  return state;
}
