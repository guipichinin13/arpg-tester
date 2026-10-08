export const mageSkillTree = [
  { id:'core', name:'✦ Núcleo do Arcano', stat:null, perLevel:0, maxLevel:1, description:'Ponto de partida da árvore. Não custa pontos.', x:50, y:7, requires:[], cost:0, core:true },

  // Tronco central
  { id:'mana_reserve', name:'💧 Reserva Arcana', stat:'maxManaFlat', perLevel:15, maxLevel:4, description:'+15 Mana máxima por nível.', x:50, y:18, requires:['core'] },
  { id:'mana_flow', name:'♻️ Fluxo Arcano', stat:'manaRegenPct', perLevel:0.18, maxLevel:4, description:'+18% regeneração de Mana por nível.', x:50, y:30, requires:['mana_reserve'] },
  { id:'arcane_focus', name:'🧠 Concentração', stat:'cooldownPct', perLevel:0.05, maxLevel:4, description:'-5% cooldown por nível.', x:50, y:42, requires:['mana_flow'] },
  { id:'arcane_core', name:'🔮 Coração Arcano', stat:'globalDamagePct', perLevel:0.10, maxLevel:5, description:'+10% Poder Mágico por nível.', x:50, y:54, requires:['arcane_focus'] },

  // Tronco esquerdo — poder/área
  { id:'elemental_affinity', name:'🌈 Afinidade Elemental', stat:'globalDamagePct', perLevel:0.08, maxLevel:4, description:'+8% dano global por nível.', x:27, y:19, requires:['mana_reserve'] },
  { id:'area_mastery', name:'💠 Domínio de Área', stat:'areaPct', perLevel:0.10, maxLevel:4, description:'+10% área de impacto por nível.', x:17, y:31, requires:['elemental_affinity'] },
  { id:'spell_amplifier', name:'💥 Amplificação', stat:'globalDamagePct', perLevel:0.12, maxLevel:4, description:'+12% Poder Mágico por nível.', x:17, y:43, requires:['area_mastery'] },
  { id:'elemental_apex', name:'🌋 Maestria Elemental', stat:'globalDamagePct', perLevel:0.15, maxLevel:3, description:'+15% dano global por nível.', x:27, y:55, requires:['spell_amplifier','arcane_core'] },
  { id:'overkill', name:'💀 Excesso de Poder', stat:'critDamagePct', perLevel:0.25, maxLevel:3, description:'+25% dano crítico por nível.', x:17, y:67, requires:['elemental_apex'] },

  // Tronco direito — precisão/projétil
  { id:'arcane_insight', name:'👁️ Insight Arcano', stat:'critChance', perLevel:0.04, maxLevel:5, description:'+4% chance crítica por nível.', x:73, y:19, requires:['mana_reserve'] },
  { id:'projectile_mastery', name:'🏹 Maestria de Projéteis', stat:'projectileSpeedPct', perLevel:0.12, maxLevel:4, description:'+12% velocidade dos projéteis por nível.', x:83, y:31, requires:['arcane_insight'] },
  { id:'precision', name:'🎯 Precisão Mortal', stat:'critChance', perLevel:0.05, maxLevel:4, description:'+5% chance crítica por nível.', x:83, y:43, requires:['projectile_mastery'] },
  { id:'rupture', name:'💥 Ruptura Crítica', stat:'critDamagePct', perLevel:0.30, maxLevel:3, description:'+30% dano crítico por nível.', x:73, y:55, requires:['precision','arcane_core'] },
  { id:'piercing_arcane', name:'🌀 Penetração Arcana', stat:'projectilePierce', perLevel:1, maxLevel:3, description:'+1 inimigo atravessado por projéteis por nível.', x:83, y:67, requires:['rupture'] },

  // Ramos intermediários — exigem atravessar o centro
  { id:'left_bridge', name:'↙️ Ponte do Conhecimento', stat:'globalDamagePct', perLevel:0.10, maxLevel:2, description:'+10% dano global. Primeiro ponto de travessia.', x:38, y:70, requires:['elemental_apex','arcane_core'] },
  { id:'right_bridge', name:'↘️ Ponte da Precisão', stat:'critChance', perLevel:0.04, maxLevel:2, description:'+4% crítico. Primeiro ponto de travessia.', x:62, y:70, requires:['rupture','arcane_core'] },
  { id:'crossroads', name:'✥ Encruzilhada Arcana', stat:'globalDamagePct', perLevel:0.12, maxLevel:2, description:'+12% Poder Mágico. Conecta os dois lados.', x:50, y:80, requires:['left_bridge','right_bridge'] },
  { id:'arcane_echo', name:'🔁 Eco Arcano', stat:'cooldownPct', perLevel:0.04, maxLevel:3, description:'-4% cooldown por nível.', x:40, y:90, requires:['crossroads'] },
  { id:'arcane_predator', name:'☠️ Predador Arcano', stat:'critChance', perLevel:0.06, maxLevel:3, description:'+6% crítico por nível.', x:60, y:90, requires:['crossroads'] },
  { id:'grand_arcana', name:'👑 Grande Arcana', stat:'globalDamagePct', perLevel:0.18, maxLevel:3, description:'+18% dano global. Nó final da árvore.', x:50, y:98, requires:['arcane_echo','arcane_predator'] },

  // Nós laterais extras
  { id:'basic_mastery', name:'✨ Arcano Condensado', stat:'basicDamagePct', perLevel:0.15, maxLevel:5, description:'+15% dano do ataque básico por nível.', x:7, y:43, requires:['area_mastery'] },
  { id:'pierce_route', name:'🗡️ Linha Perfurante', stat:'projectilePierce', perLevel:1, maxLevel:2, description:'+1 penetração por nível.', x:93, y:43, requires:['projectile_mastery'] },
];
