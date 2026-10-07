export const mageSkillTree = [
  { id: 'mage_power', name: '🔮 Poder Arcano', stat: 'globalDamagePct', perLevel: 0.08, maxLevel: 5, description: '+8% dano de skills por nível.' },
  { id: 'mage_speed', name: '💨 Projéteis Rápidos', stat: 'projectileSpeedPct', perLevel: 0.15, maxLevel: 4, description: '+15% velocidade dos projéteis por nível.' },
  { id: 'mage_mana', name: '💧 Reserva de Mana', stat: 'maxManaFlat', perLevel: 12, maxLevel: 5, description: '+12 Mana máxima por nível.' },
  { id: 'mage_regen', name: '♻️ Fluxo de Mana', stat: 'manaRegenPct', perLevel: 0.20, maxLevel: 4, description: '+20% regeneração de Mana por nível.' },
  { id: 'mage_cooldown', name: '⌛ Concentração', stat: 'cooldownPct', perLevel: 0.05, maxLevel: 4, description: '-5% cooldown das skills por nível.' },
  { id: 'mage_crit', name: '🎯 Insight Arcano', stat: 'critChance', perLevel: 0.05, maxLevel: 5, description: '+5% chance crítica por nível.' },
  { id: 'mage_area', name: '💠 Amplificação', stat: 'areaPct', perLevel: 0.10, maxLevel: 4, description: '+10% áreas de impacto por nível.' },
  { id: 'mage_pierce', name: '🌀 Penetração', stat: 'projectilePierce', perLevel: 1, maxLevel: 2, description: 'Projéteis atravessam +1 inimigo por nível.' },
  { id: 'mage_basic', name: '✨ Arcano Condensado', stat: 'basicDamagePct', perLevel: 0.15, maxLevel: 5, description: '+15% dano do ataque básico por nível.' },
  { id: 'mage_fire', name: '🔥 Especialização Elemental', stat: 'allElementalPct', perLevel: 0.05, maxLevel: 5, description: '+5% dano elemental por nível.' },
  { id: 'mage_range', name: '🎯 Foco Distante', stat: 'projectileSizePct', perLevel: 0.10, maxLevel: 3, description: '+10% tamanho dos projéteis por nível.' },
  { id: 'mage_critDamage', name: '💥 Ruptura Arcana', stat: 'critDamagePct', perLevel: 0.25, maxLevel: 3, description: '+25% dano crítico por nível.' },
];

export const skills = {
  basic: { id: 'basic', name: '✨ Ataque Arcano', key: 'Espaço', baseDamage: 15, cooldown: 300, manaCost: 0 },
  fireball: { id: 'fireball', name: '🔥 Bola de Fogo', key: '1', baseDamage: 30, cooldown: 1600, manaCost: 15 },
  lightning: { id: 'lightning', name: '⚡ Raio', key: '2', baseDamage: 45, cooldown: 1200, manaCost: 18 },
  void_lance: { id: 'void_lance', name: '☠️ Lança do Vazio', key: '3', baseDamage: 60, cooldown: 1600, manaCost: 22 },
  meteor: { id: 'meteor', name: '☄️ Meteorito', key: '4', baseDamage: 70, cooldown: 2600, manaCost: 30 },
  dash: { id: 'dash', name: '🌑 Dash', key: 'Shift', baseDamage: 0, cooldown: 2200, manaCost: 0 },
};
