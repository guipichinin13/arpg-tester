export const MONSTER_PREFIXES = [
  { id: 'brutal', name: 'Brutal', description: '+28% dano de ataque.', stats: { damage: 1.28 } },
  { id: 'hardened', name: 'Endurecido', description: '+45% vida máxima.', stats: { hp: 1.45 } },
  { id: 'swift', name: 'Veloz', description: '+30% velocidade de movimento.', stats: { speed: 1.30 } },
  { id: 'arcane', name: 'Arcano', description: '+15% dano e +20% alcance de ataque.', stats: { damage: 1.15, range: 1.20 } },
  { id: 'vampiric', name: 'Vampírico', description: 'Recupera 12% do dano causado.', stats: { lifesteal: 0.12 } },
  { id: 'fortified', name: 'Fortificado', description: 'Recebe 12% menos dano.', stats: { damageTaken: 0.88 } },
];

export const MONSTER_SUFFIXES = [
  { id: 'fury', name: 'da Fúria', description: '+22% velocidade de ataque.', stats: { attackSpeed: 1.22 } },
  { id: 'resistance', name: 'da Resistência', description: 'Recebe 12% menos dano.', stats: { damageTaken: 0.88 } },
  { id: 'thorns', name: 'dos Espinhos', description: 'Reflete 10% do dano recebido.', stats: { thorns: 0.10 } },
  { id: 'hunt', name: 'da Caçada', description: '+12% movimento e +8% dano.', stats: { speed: 1.12, damage: 1.08 } },
  { id: 'colossus', name: 'do Colosso', description: '+25% vida e -10% velocidade.', stats: { hp: 1.25, speed: 0.90 } },
  { id: 'chaos', name: 'do Caos', description: '+18% dano e +10% alcance.', stats: { damage: 1.18, range: 1.10 } },
];

function pickUnique(list, used) {
  const available = list.filter(item => !used.has(item.id));
  return available[Math.floor(Math.random() * available.length)];
}

export function rollMonsterAffixes(rarity) {
  if (rarity === 'normal') return { prefixes: [], suffixes: [], all: [] };

  const prefixCount = rarity === 'rare' ? 2 : 1;
  const suffixCount = rarity === 'rare' ? 2 : 1;
  const usedPrefixes = new Set();
  const usedSuffixes = new Set();
  const prefixes = [];
  const suffixes = [];

  for (let i = 0; i < prefixCount; i += 1) {
    const item = pickUnique(MONSTER_PREFIXES, usedPrefixes);
    usedPrefixes.add(item.id);
    prefixes.push(item);
  }
  for (let i = 0; i < suffixCount; i += 1) {
    const item = pickUnique(MONSTER_SUFFIXES, usedSuffixes);
    usedSuffixes.add(item.id);
    suffixes.push(item);
  }

  return { prefixes, suffixes, all: [...prefixes, ...suffixes] };
}

export function applyAffixesToMonster(base, affixes) {
  const result = {
    hp: base.hp,
    damage: base.damage,
    speed: base.speed,
    attackRange: base.attackRange,
    attackCooldown: base.attackCooldown,
    damageTaken: 1,
    lifesteal: 0,
    thorns: 0,
  };

  for (const affix of affixes.all ?? []) {
    const stats = affix.stats ?? {};
    result.hp *= stats.hp ?? 1;
    result.damage *= stats.damage ?? 1;
    result.speed *= stats.speed ?? 1;
    result.attackRange *= stats.range ?? 1;
    result.attackCooldown /= stats.attackSpeed ?? 1;
    result.damageTaken *= stats.damageTaken ?? 1;
    result.lifesteal += stats.lifesteal ?? 0;
    result.thorns += stats.thorns ?? 0;
  }

  return result;
}

export function buildMonsterName(baseName, rarity, affixes) {
  if (rarity === 'normal') return baseName;
  const prefixes = affixes.prefixes.map(item => item.name).join(' ');
  const suffixes = affixes.suffixes.map(item => item.name).join(' ');
  return `${prefixes} ${baseName} ${suffixes}`.trim();
}
