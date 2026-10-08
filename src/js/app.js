/* ARPG Mago v13 — classic browser bundle. Save disabled intentionally. */


/* ===== src/js/data/classes.js ===== */
const classes = {
  fire: {
    id: 'fire', name: 'Senhor do Fogo', icon: '🔥',
    description: 'Explosões, queimaduras e domínio de área.', accent: '#ff7a32',
    skills: ['fireball', 'meteor', 'flame_burst'],
    auras: ['hellfire', 'molten_ward', 'cinder_haste'],
    skillNodes: [
      { id: 'fire_power', name: '🔥 Poder Ígneo', stat: 'fireDamagePct', perLevel: 0.12, maxLevel: 5, description: '+12% dano de skills de Fogo por nível.' },
      { id: 'fire_velocity', name: '🌋 Chamas Velozes', stat: 'fireProjectileSpeedPct', perLevel: 0.12, maxLevel: 4, description: '+12% velocidade dos projéteis de Fogo por nível.' },
      { id: 'fire_area', name: '💥 Cataclismo', stat: 'fireAreaPct', perLevel: 0.15, maxLevel: 4, description: '+15% área das skills de Fogo por nível.' },
      { id: 'fire_burn', name: '🔥 Combustão', stat: 'burnDuration', perLevel: 1.2, maxLevel: 4, description: '+1,2s de queimadura por nível.' },
      { id: 'fire_burn_power', name: '🩸 Brasa Voraz', stat: 'burnDamagePct', perLevel: 0.20, maxLevel: 4, description: '+20% dano da queimadura por nível.' },
      { id: 'fire_meteor', name: '☄️ Meteorito Infernal', stat: 'meteorDamagePct', perLevel: 0.16, maxLevel: 5, description: '+16% dano do Meteorito por nível.' },
    ],
    auraNodes: [
      { id: 'fire_aura_power', name: '🔥 Aura Incandescente', stat: 'auraEffectPct', perLevel: 0.06, maxLevel: 5, description: '+6% efeito da Aura selecionada por nível.' },
      { id: 'fire_aura_radius', name: '⭕ Círculo do Inferno', stat: 'auraRadiusPct', perLevel: 0.15, maxLevel: 4, description: '+15% raio da Aura por nível.' },
      { id: 'fire_aura_pulse', name: '🌋 Pulsação Ígnea', stat: 'auraPulsePowerPct', perLevel: 0.20, maxLevel: 4, description: '+20% potência dos pulsos da Aura por nível.' },
      { id: 'fire_aura_ignite', name: '🔥 Aura Incendiária', stat: 'auraIgnite', perLevel: 1, maxLevel: 1, description: 'Modifica a Aura: inimigos dentro dela ficam queimando.' },
      { id: 'fire_aura_guard', name: '🛡️ Cinzas Protetoras', stat: 'auraDamageReduction', perLevel: 0.05, maxLevel: 3, description: 'Enquanto a Aura estiver ativa: +5% redução de dano por nível.' },
    ],
  },
  thunder: {
    id: 'thunder', name: 'Deus do Trovão', icon: '⚡',
    description: 'Velocidade, ricochete e Carga Elétrica.', accent: '#71d7ff',
    skills: ['lightning', 'storm_surge', 'thunderclap'],
    auras: ['storm_crown', 'static_field', 'thunder_guard'],
    skillNodes: [
      { id: 'thunder_power', name: '⚡ Fúria Celeste', stat: 'lightningDamagePct', perLevel: 0.12, maxLevel: 5, description: '+12% dano elétrico por nível.' },
      { id: 'thunder_chain', name: '🌩️ Condutor', stat: 'lightningChain', perLevel: 1, maxLevel: 3, description: '+1 ricochete do Raio por nível.' },
      { id: 'thunder_charge', name: '🔋 Acúmulo', stat: 'chargeGainPct', perLevel: 0.15, maxLevel: 4, description: '+15% Carga gerada por nível.' },
      { id: 'thunder_overload', name: '💥 Sobrecarga', stat: 'overloadDamagePct', perLevel: 0.20, maxLevel: 4, description: '+20% dano da Sobrecarga por nível.' },
      { id: 'thunder_radius', name: '🌩️ Céu em Fúria', stat: 'overloadRadiusPct', perLevel: 0.20, maxLevel: 3, description: '+20% área da Sobrecarga por nível.' },
      { id: 'thunder_recharge', name: '👑 Tempestade Divina', stat: 'overloadCooldownRefund', perLevel: 0.10, maxLevel: 3, description: 'Sobrecarga recupera cooldowns por nível.' },
    ],
    auraNodes: [
      { id: 'thunder_aura_power', name: '⚡ Coroa Celeste', stat: 'auraEffectPct', perLevel: 0.06, maxLevel: 5, description: '+6% efeito da Aura selecionada por nível.' },
      { id: 'thunder_aura_radius', name: '⭕ Campo Eletrostático', stat: 'auraRadiusPct', perLevel: 0.15, maxLevel: 4, description: '+15% raio da Aura por nível.' },
      { id: 'thunder_aura_charge', name: '🔋 Gerador Arcano', stat: 'auraChargePct', perLevel: 0.20, maxLevel: 4, description: '+20% geração de Carga da Aura por nível.' },
      { id: 'thunder_aura_shock', name: '⚡ Aura Atordoante', stat: 'auraShock', perLevel: 1, maxLevel: 1, description: 'Modifica a Aura: o pulso pode atordoar inimigos próximos.' },
      { id: 'thunder_aura_guard', name: '🛡️ Manto Trovejante', stat: 'auraDamageReduction', perLevel: 0.05, maxLevel: 3, description: 'Enquanto a Aura estiver ativa: +5% redução de dano por nível.' },
    ],
  },
  void: {
    id: 'void', name: 'Void Mage', icon: '☠️',
    description: 'Marca da morte, execução e domínio do Vazio.', accent: '#b58cff',
    skills: ['void_lance', 'singularity', 'death_wave'],
    auras: ['death_domain', 'void_hunger', 'null_mantle'],
    skillNodes: [
      { id: 'void_power', name: '☠️ Poder do Vazio', stat: 'voidDamagePct', perLevel: 0.13, maxLevel: 5, description: '+13% dano de skills do Vazio por nível.' },
      { id: 'void_pierce', name: '🕳️ Lança Abissal', stat: 'voidPierce', perLevel: 1, maxLevel: 3, description: '+1 inimigo atravessado pelas skills lineares por nível.' },
      { id: 'void_mark', name: '💀 Marca da Morte', stat: 'markDuration', perLevel: 2, maxLevel: 4, description: '+2s de duração da Marca por nível.' },
      { id: 'void_execute', name: '☠️ Ceifador', stat: 'executeThreshold', perLevel: 0.04, maxLevel: 4, description: '+4% da vida máxima no limite de execução.' },
      { id: 'void_explosion', name: '🌑 Fim do Vazio', stat: 'executeExplosionPct', perLevel: 0.25, maxLevel: 4, description: '+25% dano da explosão de execução por nível.' },
      { id: 'void_singularity', name: '🌀 Singularidade', stat: 'voidAreaPct', perLevel: 0.18, maxLevel: 4, description: '+18% área e força das skills de área por nível.' },
    ],
    auraNodes: [
      { id: 'void_aura_power', name: '☠️ Aura Devoradora', stat: 'auraEffectPct', perLevel: 0.06, maxLevel: 5, description: '+6% efeito da Aura selecionada por nível.' },
      { id: 'void_aura_radius', name: '⭕ Domínio Expandido', stat: 'auraRadiusPct', perLevel: 0.15, maxLevel: 4, description: '+15% raio da Aura por nível.' },
      { id: 'void_aura_mark', name: '💀 Aura da Ruína', stat: 'auraMark', perLevel: 1, maxLevel: 1, description: 'Modifica a Aura: ela marca os inimigos dentro dela.' },
      { id: 'void_aura_execute', name: '☠️ Aura da Execução', stat: 'auraExecutePct', perLevel: 0.03, maxLevel: 4, description: '+3% ao limite de execução concedido pela Aura por nível.' },
      { id: 'void_aura_guard', name: '🛡️ Manto do Vazio', stat: 'auraDamageReduction', perLevel: 0.05, maxLevel: 3, description: 'Enquanto a Aura estiver ativa: +5% redução de dano por nível.' },
    ],
  },
};

const auras = {
  hellfire: { id: 'hellfire', name: '🔥 Círculo do Inferno', classId: 'fire', description: '+15% dano de Fogo e pulsa dano/queimadura ao redor.', baseEffect: 0.15, pulseDamage: 10, color: '#ff7a32' },
  molten_ward: { id: 'molten_ward', name: '🛡️ Égide Magmática', classId: 'fire', description: '+10% dano de Fogo e +10% redução de dano.', baseEffect: 0.10, damageReduction: 0.10, color: '#ffb347' },
  cinder_haste: { id: 'cinder_haste', name: '💨 Brasa Acelerada', classId: 'fire', description: '+10% velocidade dos projéteis e +8% crítico.', baseEffect: 0.10, projectileSpeed: 0.10, critChance: 0.08, color: '#ff9a5b' },
  storm_crown: { id: 'storm_crown', name: '⚡ Coroa da Tempestade', classId: 'thunder', description: '+15% dano elétrico e +10% velocidade dos projéteis.', baseEffect: 0.15, projectileSpeed: 0.10, color: '#72dcff' },
  static_field: { id: 'static_field', name: '🔋 Campo Estático', classId: 'thunder', description: '-10% cooldown e gera Carga periodicamente.', baseEffect: 0.10, cooldown: 0.10, chargePerPulse: 10, color: '#78baff' },
  thunder_guard: { id: 'thunder_guard', name: '🛡️ Manto Trovejante', classId: 'thunder', description: '+10% velocidade de movimento e +10% redução de dano.', baseEffect: 0.10, moveSpeed: 0.10, damageReduction: 0.10, color: '#9ae9ff' },
  death_domain: { id: 'death_domain', name: '☠️ Domínio da Morte', classId: 'void', description: '+15% dano do Vazio e marca inimigos próximos.', baseEffect: 0.15, mark: true, color: '#b58cff' },
  void_hunger: { id: 'void_hunger', name: '🕳️ Fome do Vazio', classId: 'void', description: '+10% dano do Vazio e +8% no limite de execução.', baseEffect: 0.10, executeThreshold: 0.08, color: '#d18cff' },
  null_mantle: { id: 'null_mantle', name: '🌑 Manto Nulo', classId: 'void', description: '-10% cooldown e +10% redução de dano.', baseEffect: 0.10, cooldown: 0.10, damageReduction: 0.10, color: '#8668e8' },
};



/* ===== src/js/data/maps.js ===== */
const mapTiers = Array.from({length:20}, (_,i)=>{
  const tier=i+1;
  return {
    tier,
    name:`T${tier}`,
    enemyHpMultiplier:1+0.28*(tier-1),
    enemyDamageMultiplier:1+0.18*(tier-1),
    enemyMoveMultiplier:1+0.025*(tier-1),
    waveCount:10,
    baseMobs:10+Math.floor((tier-1)*1.5),
    bossMultiplier:2.8+0.15*(tier-1),
    currencySlots: tier>=3 ? 1+Math.floor((tier-3)/4) : 0,
  };
});
function getMapTier(tier){ return mapTiers[Math.max(1,Math.min(20,tier))-1]; }



/* ===== src/js/data/monsterAffixes.js ===== */
const prefixes = [
  {id:'brutal',name:'Brutal',desc:'+30% dano',apply:e=>{e.attackDamage*=1.30;}},
  {id:'fortified',name:'Fortificado',desc:'+45% vida',apply:e=>{e.maxHp*=1.45;e.hp=e.maxHp;}},
  {id:'swift',name:'Veloz',desc:'+28% velocidade',apply:e=>{e.moveSpeed*=1.28;e.attackCooldown*=0.88;}},
  {id:'arcane',name:'Arcano',desc:'+35% alcance',apply:e=>{e.attackRange*=1.35;}},
  {id:'frenzied',name:'Frenético',desc:'+25% velocidade de ataque',apply:e=>{e.attackCooldown*=0.75;}},
  {id:'regenerating',name:'Regenerador',desc:'regenera vida lentamente',apply:e=>{e.regenPerSecond=(e.maxHp*0.018);}},
];
const suffixes = [
  {id:'of_thorns',name:'dos Espinhos',desc:'reflete 12% do dano',apply:e=>{e.thorns=0.12;}},
  {id:'of_vampirism',name:'Vampírico',desc:'cura 8% do dano',apply:e=>{e.vampirism=0.08;}},
  {id:'of_hunger',name:'da Fome',desc:'+18% dano quando perto da morte',apply:e=>{e.lowHpDamage=0.18;}},
  {id:'of_barriers',name:'das Barreiras',desc:'reduz dano recebido em 15%',apply:e=>{e.damageReduction=0.15;}},
  {id:'of_embers',name:'das Brasas',desc:'pode aplicar queimadura no ataque',apply:e=>{e.embers=true;}},
  {id:'of_shock',name:'do Choque',desc:'ataques podem atordoar',apply:e=>{e.shockChance=0.18;}},
];
function pickDifferent(list,count){
  const pool=[...list],out=[];while(out.length<count&&pool.length){const i=Math.floor(Math.random()*pool.length);out.push(pool.splice(i,1)[0]);}return out;
}
function rollAffixes(rarity){
  if(rarity==='normal') return [];
  if(rarity==='magic') return [...pickDifferent(prefixes,1),...pickDifferent(suffixes,1)];
  return [...pickDifferent(prefixes,2),...pickDifferent(suffixes,2)];
}
function applyAffixes(enemy, affixes){
  enemy.affixIds=[];enemy.prefixes=[];enemy.suffixes=[];
  for(const a of affixes){a.apply(enemy);enemy.affixIds.push(a.id);if(prefixes.some(p=>p.id===a.id))enemy.prefixes.push(a.name);else enemy.suffixes.push(a.name);}
  enemy.displayName=[...enemy.prefixes,...enemy.suffixes].join(' ');
}



/* ===== src/js/data/skills.js ===== */
const skills = {
  basic: { id: 'basic', name: '✨ Ataque Arcano', key: 'Espaço', baseDamage: 15, cooldown: 300, manaCost: 0, classId: null, category: 'basic' },
  fireball: { id: 'fireball', name: '🔥 Bola de Fogo', baseDamage: 34, cooldown: 1600, manaCost: 15, classId: 'fire', type: 'projectile' },
  meteor: { id: 'meteor', name: '☄️ Meteorito', baseDamage: 72, cooldown: 2600, manaCost: 30, classId: 'fire', type: 'projectile' },
  flame_burst: { id: 'flame_burst', name: '💥 Rajada Infernal', baseDamage: 52, cooldown: 2100, manaCost: 24, classId: 'fire', type: 'projectile' },
  lightning: { id: 'lightning', name: '⚡ Raio', baseDamage: 46, cooldown: 1200, manaCost: 18, classId: 'thunder', type: 'projectile' },
  storm_surge: { id: 'storm_surge', name: '🌩️ Surto de Tempestade', baseDamage: 58, cooldown: 1800, manaCost: 22, classId: 'thunder', type: 'projectile' },
  thunderclap: { id: 'thunderclap', name: '💥 Estrondo', baseDamage: 68, cooldown: 2400, manaCost: 28, classId: 'thunder', type: 'projectile' },
  void_lance: { id: 'void_lance', name: '☠️ Lança do Vazio', baseDamage: 62, cooldown: 1600, manaCost: 22, classId: 'void', type: 'projectile' },
  singularity: { id: 'singularity', name: '🌀 Singularidade', baseDamage: 78, cooldown: 2600, manaCost: 32, classId: 'void', type: 'projectile' },
  death_wave: { id: 'death_wave', name: '🌑 Onda da Morte', baseDamage: 60, cooldown: 2000, manaCost: 24, classId: 'void', type: 'projectile' },
  dash: { id: 'dash', name: '🌑 Dash', key: 'Shift', baseDamage: 0, cooldown: 2200, manaCost: 0, classId: null, category: 'movement' },
};



/* ===== src/js/data/talents.js ===== */
const mageSkillTree = [
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



/* ===== src/js/state.js ===== */
function createGameState(){
 const state={
  player:{x:360,y:330,hp:100,maxHp:100,mp:100,maxMp:100,xp:0,level:1},
  mageSkillPoints:1,specSkillPoints:1,selectedClass:null,mageUpgrades:{},specUpgrades:{},
  loadout:{skills:[null,null],aura:null},auraActive:false,keys:new Set(),mouse:{x:360,y:330,inside:false},cooldowns:{},enemies:[],logs:[],activeTab:'classes',talentsOpen:false,
  combat:{charge:0,auraPulseTimer:0,lastPlayerHitAt:0},map:{tier:1,modifiers:[],currencySlots:0},wave:{current:1,status:'spawning',spawned:0,defeated:0,total:0,spawnTimer:0,intermissionTimer:0,elapsed:0,bossSpawned:false,bossDefeated:false,completed:false}
 };
  // Sanitiza qualquer save antigo/corrompido para o jogo nunca iniciar travado.
  if(!state.player || !Number.isFinite(state.player.x) || !Number.isFinite(state.player.y)) state.player={x:360,y:330,hp:100,maxHp:100,mp:100,maxMp:100,xp:0,level:1};
  state.player.x=Math.max(30,Math.min(1100,Number(state.player.x)||360));
  state.player.y=Math.max(70,Math.min(700,Number(state.player.y)||330));
  state.player.hp=Number.isFinite(state.player.hp)?Math.max(1,state.player.hp):100;
  state.player.maxHp=Number.isFinite(state.player.maxHp)&&state.player.maxHp>0?state.player.maxHp:100;
  state.player.mp=Number.isFinite(state.player.mp)?Math.max(0,state.player.mp):100;
  state.player.maxMp=Number.isFinite(state.player.maxMp)&&state.player.maxMp>0?state.player.maxMp:100;
  state.player.xp=Number.isFinite(state.player.xp)?Math.max(0,Math.min(99.99,state.player.xp)):0;
  state.player.level=Number.isFinite(state.player.level)&&state.player.level>0?Math.floor(state.player.level):1;
  if(!state.mageUpgrades || typeof state.mageUpgrades!=='object' || Array.isArray(state.mageUpgrades)) state.mageUpgrades={};
  if(!state.specUpgrades || typeof state.specUpgrades!=='object' || Array.isArray(state.specUpgrades)) state.specUpgrades={};
  if(!Number.isFinite(state.mageSkillPoints)||state.mageSkillPoints<0) state.mageSkillPoints=1;
  if(!Number.isFinite(state.specSkillPoints)||state.specSkillPoints<0) state.specSkillPoints=1;
  if(!state.loadout || !Array.isArray(state.loadout.skills)) state.loadout={skills:[null,null],aura:null};
  state.loadout.skills=[state.loadout.skills[0]??null,state.loadout.skills[1]??null];
  if(!('aura' in state.loadout)) state.loadout.aura=null;
 return state;
}



/* ===== src/js/systems/talents.js ===== */

function getMageLevel(state, id) { return state.mageUpgrades[id] ?? 0; }
function getSpecLevel(state, id) { return state.specUpgrades[id] ?? 0; }
function countUpgrades(map) { return Object.values(map).reduce((sum, value) => sum + value, 0); }

function hasMagePrereqs(state,node) { return (node.requires??[]).every(id => id === 'core' || getMageLevel(state,id) > 0 || (mageSkillTree.find(n=>n.id===id)?.core===true)); }

function getMissingMagePrereqs(state,node) { return (node.requires??[]).filter(id => id !== 'core' && getMageLevel(state,id) <= 0).map(id => mageSkillTree.find(n=>n.id===id)?.name ?? id); }

function buyMageUpgrade(state, node) {
  const current = getMageLevel(state, node.id);
  if (node.core || node.cost === 0) return { ok:false, message:'Esse é o núcleo da árvore.' };
  const missing = getMissingMagePrereqs(state,node);
  if (missing.length) return { ok:false, message:`Caminho bloqueado. Primeiro aprenda: ${missing.join(', ')}` };
  if (current >= node.maxLevel) return { ok: false, message: 'Esse upgrade já está no nível máximo.' };
  if (state.mageSkillPoints < 1) return { ok: false, message: 'Sem pontos de skill de Mago.' };
  state.mageSkillPoints -= 1;
  state.mageUpgrades[node.id] = current + 1;
  return { ok: true, message: `${node.name} → nível ${current + 1}/${node.maxLevel}` };
}

function buySpecUpgrade(state, node) {
  if (!state.selectedClass) return { ok: false, message: 'Escolha uma especialização primeiro.' };
  const current = getSpecLevel(state, node.id);
  if (current >= node.maxLevel) return { ok: false, message: 'Esse upgrade já está no nível máximo.' };
  if (state.specSkillPoints < 1) return { ok: false, message: 'Sem pontos da especialização.' };
  state.specSkillPoints -= 1;
  state.specUpgrades[node.id] = current + 1;
  return { ok: true, message: `${node.name} → nível ${current + 1}/${node.maxLevel}` };
}

function selectSpecialization(state, classId) {
  if (state.selectedClass) return { ok: false, message: 'A especialização é permanente neste personagem.' };
  if (!classes[classId]) return { ok: false, message: 'Especialização inválida.' };
  state.selectedClass = classId;
  state.loadout = { skills: [null, null], aura: null };
  state.auraActive = false;
  state.combat.charge = 0;
  return { ok: true, message: `${classes[classId].name} escolhida. Selecione 2 skills e 1 Aura.` };
}

function setSkillSlot(state, slotIndex, skillId) {
  if (!state.selectedClass || ![0, 1].includes(slotIndex)) return false;
  const cls = classes[state.selectedClass];
  if (!cls.skills.includes(skillId)) return false;
  const otherIndex = slotIndex === 0 ? 1 : 0;
  const otherSkill = state.loadout.skills[otherIndex];
  const current = state.loadout.skills[slotIndex];
  if (otherSkill === skillId) state.loadout.skills[otherIndex] = current ?? null;
  state.loadout.skills[slotIndex] = skillId;
  return true;
}

function clearSkillSlot(state, slotIndex) {
  if (![0,1].includes(slotIndex)) return false;
  state.loadout.skills[slotIndex] = null;
  return true;
}

function selectAura(state, auraId) {
  if (!state.selectedClass) return false;
  const cls = classes[state.selectedClass];
  if (!cls.auras.includes(auraId)) return false;
  state.loadout.aura = auraId;
  state.auraActive = true;
  return true;
}

function toggleAura(state) {
  if (!state.loadout.aura) return false;
  state.auraActive = !state.auraActive;
  return true;
}

function gainSkillPoints(state) {
  state.mageSkillPoints += 1;
  if (state.selectedClass) state.specSkillPoints += 1;
}

function resetMageUpgrades(state) {
  const refunded = countUpgrades(state.mageUpgrades);
  state.mageUpgrades = {};
  state.mageSkillPoints += refunded;
  return refunded;
}

function resetSpecUpgrades(state) {
  const refunded = countUpgrades(state.specUpgrades);
  state.specUpgrades = {};
  state.specSkillPoints += refunded;
  return refunded;
}

// Compatibilidade
function hasTalent(state, id) { return getMageLevel(state, id) > 0; }
function hasClassNode(state, id) { return getSpecLevel(state, id) > 0; }



/* ===== src/js/systems/stats.js ===== */

function getActiveAura(state) {
  if (!state.auraActive || !state.loadout.aura) return null;
  return auras[state.loadout.aura] ?? null;
}

function getDerivedStats(state) {
  const cls = state.selectedClass ? classes[state.selectedClass] : null;
  const aura = getActiveAura(state);

  const auraPower = aura ? 1 + getSpecLevel(state, `${state.selectedClass}_aura_power`) * 0.06 : 1;
  const auraEffect = aura ? aura.baseEffect * auraPower : 0;
  const auraRadius = aura ? 185 * (1 + getSpecLevel(state, `${state.selectedClass}_aura_radius`) * 0.15) : 0;
  const auraPulsePower = aura ? 1 + getSpecLevel(state, `${state.selectedClass}_aura_pulse`) * 0.20 : 1;
  const auraDamageReduction = (aura?.damageReduction ?? 0) + getSpecLevel(state, `${state.selectedClass}_aura_guard`) * 0.05;

  // Atributos do Mago: todos os cálculos de dano passam por estes multiplicadores.
  const spellPower = 1 + getMageLevel(state, 'mage_power') * 0.10 + getMageLevel(state, 'arcane_core') * 0.10 + getMageLevel(state,'elemental_affinity') * 0.08 + getMageLevel(state,'spell_amplifier') * 0.12 + getMageLevel(state,'elemental_apex') * 0.15 + getMageLevel(state,'left_bridge') * 0.10 + getMageLevel(state,'crossroads') * 0.12 + getMageLevel(state,'grand_arcana') * 0.18;
  const basicPower = 1 + getMageLevel(state, 'mage_basic') * 0.15 + getMageLevel(state,'basic_mastery') * 0.15;
  const critChance = Math.min(0.85, getMageLevel(state, 'mage_crit') * 0.05 + getMageLevel(state,'arcane_insight')*0.04 + getMageLevel(state,'precision')*0.05 + getMageLevel(state,'right_bridge')*0.04 + getMageLevel(state,'arcane_predator')*0.06);
  const critDamage = 1.5 + getMageLevel(state, 'mage_critDamage') * 0.25 + getMageLevel(state,'overkill')*0.25 + getMageLevel(state,'rupture')*0.30;

  const stats = {
    spellPower,
    globalDamage: spellPower,
    basicPower,
    basicDamage: basicPower,
    projectileSpeed: 1 + getMageLevel(state, 'mage_speed') * 0.15 + getMageLevel(state,'projectile_mastery')*0.12,
    maxMana: 100 + getMageLevel(state, 'mage_mana') * 12 + getMageLevel(state,'mana_reserve')*15,
    manaRegen: 1 + getMageLevel(state, 'mage_regen') * 0.20 + getMageLevel(state,'mana_flow')*0.18,
    cooldown: Math.max(0.40, 1 - getMageLevel(state, 'mage_cooldown') * 0.05 - getMageLevel(state,'arcane_focus')*0.05 - getMageLevel(state,'arcane_echo')*0.04),
    critChance,
    critDamage,
    area: 1 + getMageLevel(state, 'mage_area') * 0.10 + getMageLevel(state,'area_mastery')*0.10,
    projectilePierce: getMageLevel(state, 'mage_pierce') + getMageLevel(state,'piercing_arcane') + getMageLevel(state,'pierce_route'),
    fireDamage: 1,
    lightningDamage: 1,
    voidDamage: 1,
    fireArea: 1,
    fireProjectileSpeed: 1,
    lightningArea: 1,
    voidArea: 1,
    burnDuration: 3,
    burnDamage: 1,
    fireSpread: 0,
    lightningChain: 0,
    chargeGain: 1,
    overloadDamage: 1,
    overloadRadius: 1,
    overloadCooldownRefund: 0,
    markDuration: 4,
    executeThreshold: .20,
    executeExplosion: 1,
    voidPierce: 0,
    projectileSize: 1,
    damageReduction: 0,
    moveSpeed: 1,
    auraRadius,
    auraEffect,
    auraPulsePower,
    auraDamageReduction,
    auraActive: Boolean(aura),
    auraShock: getSpecLevel(state, `${state.selectedClass}_aura_shock`) > 0,
    auraIgnite: getSpecLevel(state, `${state.selectedClass}_aura_ignite`) > 0,
    auraMark: getSpecLevel(state, `${state.selectedClass}_aura_mark`) > 0 || Boolean(aura?.mark),
    auraCharge: aura?.chargePerPulse ?? 0,
    auraExecuteBonus: (aura?.executeThreshold ?? 0) + getSpecLevel(state, 'void_aura_execute') * 0.03,
  };

  if (state.selectedClass === 'fire') {
    stats.fireDamage *= 1 + getSpecLevel(state, 'fire_power') * 0.12;
    stats.fireArea *= 1 + getSpecLevel(state, 'fire_area') * 0.15;
    stats.fireProjectileSpeed *= 1 + getSpecLevel(state, 'fire_velocity') * 0.12;
    stats.burnDuration += getSpecLevel(state, 'fire_burn') * 1.2;
    stats.burnDamage *= 1 + getSpecLevel(state, 'fire_burn_power') * 0.20;
    stats.meteorDamage = 1 + getSpecLevel(state, 'fire_meteor') * 0.16;
  } else if (state.selectedClass === 'thunder') {
    stats.lightningDamage *= 1 + getSpecLevel(state, 'thunder_power') * 0.12;
    stats.lightningChain = getSpecLevel(state, 'thunder_chain');
    stats.chargeGain = 1 + getSpecLevel(state, 'thunder_charge') * 0.15;
    stats.overloadDamage = 1 + getSpecLevel(state, 'thunder_overload') * 0.20;
    stats.overloadRadius = 1 + getSpecLevel(state, 'thunder_radius') * 0.20;
    stats.overloadCooldownRefund = getSpecLevel(state, 'thunder_recharge') * 0.10;
  } else if (state.selectedClass === 'void') {
    stats.voidDamage *= 1 + getSpecLevel(state, 'void_power') * 0.13;
    stats.markDuration += getSpecLevel(state, 'void_mark') * 2;
    stats.executeThreshold += getSpecLevel(state, 'void_execute') * 0.04;
    stats.executeExplosion *= 1 + getSpecLevel(state, 'void_explosion') * 0.25;
    stats.voidPierce = getSpecLevel(state, 'void_pierce');
    stats.voidArea *= 1 + getSpecLevel(state, 'void_singularity') * 0.18;
  }

  if (aura) {
    const p = auraEffect;
    if (state.selectedClass === 'fire') stats.fireDamage *= 1 + p;
    if (state.selectedClass === 'thunder') stats.lightningDamage *= 1 + p;
    if (state.selectedClass === 'void') stats.voidDamage *= 1 + p;
    stats.projectileSpeed *= 1 + (aura.projectileSpeed ?? 0) * auraPower;
    stats.cooldown *= 1 - (aura.cooldown ?? 0) * auraPower;
    stats.critChance = Math.min(0.75, stats.critChance + (aura.critChance ?? 0) * auraPower);
    stats.moveSpeed *= 1 + (aura.moveSpeed ?? 0) * auraPower;
    stats.damageReduction += auraDamageReduction;
    if (state.selectedClass === 'fire' && getSpecLevel(state, 'fire_aura_ignite')) stats.auraIgnite = true;
    if (state.selectedClass === 'thunder' && getSpecLevel(state, 'thunder_aura_shock')) stats.auraShock = true;
    if (state.selectedClass === 'void') {
      stats.auraMark = stats.auraMark || getSpecLevel(state, 'void_aura_mark') > 0;
      stats.executeThreshold += stats.auraExecuteBonus;
    }
  }

  stats.fireArea *= state.selectedClass === 'fire' && aura ? 1 + auraEffect * 0.35 : 1;
  stats.moveSpeed = Math.min(1.8, stats.moveSpeed);
  return stats;
}

function getSkillStats(state, skill) {
  const d = getDerivedStats(state);
  let damage = skill.baseDamage;
  let area = d.area;
  let speed = d.projectileSpeed;

  // Ordem clara de cálculo: base -> atributo do Mago -> elemento -> especialização/Aura.
  const attributeMultiplier = skill.id === 'basic' ? d.basicPower : d.spellPower;
  damage *= attributeMultiplier;
  if (skill.classId === 'fire') { damage *= d.fireDamage; area *= d.fireArea; speed *= d.fireProjectileSpeed; }
  if (skill.classId === 'thunder') damage *= d.lightningDamage;
  if (skill.classId === 'void') { damage *= d.voidDamage; area *= d.voidArea; }
  if (skill.id === 'meteor') damage *= d.meteorDamage ?? 1;
  if (skill.id === 'flame_burst') damage *= 1.05;

  return {
    baseDamage: skill.baseDamage,
    damage,
    cooldown: skill.cooldown * d.cooldown,
    manaCost: skill.manaCost ?? 0,
    projectileSpeed: speed,
    projectilePierce: d.projectilePierce,
    critChance: d.critChance,
    critDamage: d.critDamage,
    areaMultiplier: area,
    projectileSize: d.projectileSize,
    spellPowerPct: Math.round((attributeMultiplier - 1) * 100),
  };
}

function skillDescription(state, skill) {
  const d = getDerivedStats(state);
  const s = getSkillStats(state, skill);
  const lines = [`${Math.round(s.damage)} dano atual (base ${s.baseDamage}) · ${Math.round(s.cooldown)}ms · ${s.manaCost} Mana.`];
  lines.push(`Poder ${skill.id === 'basic' ? 'Básico' : 'Mágico'} +${s.spellPowerPct}% · crítico ${Math.round(s.critChance * 100)}% · área +${Math.round((s.areaMultiplier - 1) * 100)}% · projétil +${Math.round((s.projectileSpeed - 1) * 100)}%.`);
  if (skill.classId === 'fire') lines.push(`Queimadura ${Math.round(d.burnDuration * 10) / 10}s · dano da queimadura +${Math.round((d.burnDamage - 1) * 100)}%.`);
  if (skill.classId === 'thunder') lines.push(`Ricochetes ${d.lightningChain} · Carga +${Math.round((d.chargeGain - 1) * 100)}%.`);
  if (skill.classId === 'void') lines.push(`Execução em ${Math.round(d.executeThreshold * 100)}% HP · atravessa ${d.voidPierce} inimigo(s).`);
  if (state.loadout.aura) lines.push(`Aura: ${auras[state.loadout.aura].name} ${state.auraActive ? 'ATIVA' : 'inativa'}.`);
  return lines.join(' ');
}



/* ===== src/js/systems/particles.js ===== */
const TAU = Math.PI * 2;

class ParticleSystem {
  constructor(container) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'particles-layer';
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.beams = [];
    this.container = container;
    container.appendChild(this.canvas);
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.round(rect.width * dpr);
    this.canvas.height = Math.round(rect.height * dpr);
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  emit({ x, y, count = 12, color = '#fff', speed = 90, size = 3, life = 450, gravity = 0, spread = TAU }) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * spread - spread / 2;
      const velocity = speed * (0.45 + Math.random() * 0.75);
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: size * (0.65 + Math.random() * 0.8),
        life: life * (0.65 + Math.random() * 0.55),
        maxLife: life,
        color,
        gravity,
      });
    }
  }

  burst(x, y, palette, options = {}) {
    palette.forEach((color, index) => {
      this.emit({
        x,
        y,
        color,
        count: Math.round((options.count ?? 18) / palette.length),
        speed: (options.speed ?? 120) * (1 + index * 0.08),
        size: options.size ?? 3,
        life: options.life ?? 500,
        gravity: options.gravity ?? 0,
      });
    });
  }


  beam(x1, y1, x2, y2, color = '#fff', life = 160, width = 3) {
    this.beams.push({ x1, y1, x2, y2, color, life, maxLife: life, width });
  }

  ring(x, y, color, count = 24, radius = 20) {
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * TAU;
      this.particles.push({
        x: x + Math.cos(a) * radius,
        y: y + Math.sin(a) * radius,
        vx: Math.cos(a) * 80,
        vy: Math.sin(a) * 80,
        size: 2.5,
        life: 500,
        maxLife: 500,
        color,
        gravity: 0,
      });
    }
  }

  update(delta) {
    const dt = delta / 1000;
    this.beams = this.beams.filter(b => { b.life -= delta; return b.life > 0; });
    this.particles = this.particles.filter(p => {
      p.life -= delta;
      if (p.life <= 0) return false;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += p.gravity * dt;
      return true;
    });
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    for (const b of this.beams) {
      const alpha = Math.max(0, b.life / b.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = b.color;
      ctx.shadowColor = b.color;
      ctx.shadowBlur = 14;
      ctx.lineWidth = b.width;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.lineTo(b.x2, b.y2);
      ctx.stroke();
      ctx.restore();
    }
  }
}



/* ===== src/js/systems/floatingText.js ===== */
class FloatingTextSystem {
  constructor(container) {
    this.container = container;
  }

  show(x, y, text, kind = 'damage') {
    const el = document.createElement('div');
    el.className = `floating-text ${kind}`;
    el.textContent = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    this.container.appendChild(el);
    window.setTimeout(() => el.remove(), 700);
  }
}



/* ===== src/js/systems/projectiles.js ===== */
const PROJ_PROJ_TAU = Math.PI * 2;
const STYLES = {
  basic:        { color: '#f2f0ff', glow: '#a78bfa', size: 5, trail: '#b9a7ff', shape: 'orb' },
  fireball:     { color: '#fff3ad', glow: '#ff6a2d', size: 10, trail: '#ff7a32', shape: 'fire' },
  meteor:       { color: '#fff2ad', glow: '#ff572d', size: 15, trail: '#ff7a32', shape: 'meteor' },
  flame_burst:  { color: '#fff1b0', glow: '#ff3f18', size: 13, trail: '#ff6a2d', shape: 'fire' },
  lightning:    { color: '#fffbd0', glow: '#55c7ff', size: 7, trail: '#70c8ff', shape: 'bolt' },
  storm_surge:  { color: '#e4fbff', glow: '#36baff', size: 11, trail: '#6ad7ff', shape: 'bolt' },
  thunderclap:  { color: '#ffffff', glow: '#72d5ff', size: 14, trail: '#76e3ff', shape: 'bolt' },
  void_lance:   { color: '#f6dcff', glow: '#8c42ff', size: 9, trail: '#713fc7', shape: 'void' },
  singularity:  { color: '#fff1ff', glow: '#a95bff', size: 15, trail: '#6b2ee8', shape: 'void' },
  death_wave:   { color: '#ead5ff', glow: '#6e3bcd', size: 13, trail: '#8f5cff', shape: 'void_wave' },
};

class ProjectileSystem {
  constructor(container, particles) {
    this.container = container;
    this.particles = particles;
    this.projectiles = [];
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'projectiles-layer';
    this.ctx = this.canvas.getContext('2d');
    this.resize(); container.appendChild(this.canvas);
    window.addEventListener('resize', () => this.resize());
  }
  resize() {
    const rect = this.container.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width; this.height = rect.height;
    this.canvas.width = Math.round(rect.width * dpr); this.canvas.height = Math.round(rect.height * dpr);
    this.canvas.style.width = `${rect.width}px`; this.canvas.style.height = `${rect.height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  fire({ from, direction, skillId, speed = 420, radius = 10, pierce = 0, onHit, metadata = {} }) {
    const style = STYLES[skillId] ?? STYLES.basic; const len = Math.hypot(direction.x, direction.y) || 1;
    const dx = direction.x / len; const dy = direction.y / len;
    const start = { x: from.x + dx * 18, y: from.y + dy * 18 };
    this.projectiles.push({ x:start.x, y:start.y, prevX:start.x, prevY:start.y, dx, dy, speed,
      life: 2200, age: 0, skillId, style, radius: Math.max(7, radius), pierceLeft: Math.max(0,pierce),
      hitIds:new Set(), onHit, metadata, spin: Math.random()*PROJ_TAU });
    this.particles?.burst(start.x,start.y,[style.color,style.glow],{count:8,speed:40,life:150,size:2.2});
  }
  update(delta, enemies=[]) {
    const dt=delta/1000, keep=[];
    for(const p of this.projectiles){
      p.age+=delta; p.life-=delta; if(p.life<=0) continue;
      p.prevX=p.x; p.prevY=p.y; const step=p.speed*dt; p.x+=p.dx*step; p.y+=p.dy*step; p.spin+=delta*.012;
      this.particles?.emit({x:p.x,y:p.y,color:p.style.trail,count:p.skillId==='meteor'?4:2,speed:p.skillId==='meteor'?30:18,size:Math.max(1.2,p.style.size*.28),life:p.skillId==='meteor'?250:150,gravity:p.skillId==='meteor'?35:0});
      let remove=false;
      for(const enemy of enemies){
        if(!enemy || enemy.hp<=0 || p.hitIds.has(enemy)) continue;
        if(Math.hypot(enemy.x-p.x,enemy.y-p.y)<=p.radius+18){
          p.hitIds.add(enemy); p.onHit?.(enemy); this.impactFx(enemy.x,enemy.y,p.style,p.skillId);
          if(p.pierceLeft>0) p.pierceLeft-=1; else {remove=true;break;}
        }
      }
      if(p.x<-100||p.x>this.width+100||p.y<-100||p.y>this.height+100) remove=true;
      if(!remove) keep.push(p);
    }
    this.projectiles=keep;
  }
  impactFx(x,y,style,skillId){
    this.particles?.burst(x,y,[style.color,style.glow],{count:skillId==='meteor'?42:skillId==='singularity'?34:18,speed:skillId==='meteor'?190:105,life:skillId==='meteor'?620:320,gravity:skillId==='meteor'?90:0,size:skillId==='meteor'?3.8:2.8});
    this.particles?.ring(x,y,style.glow,skillId==='meteor'?34:16,skillId==='meteor'?42:24);
  }
  render(){
    const ctx=this.ctx; ctx.clearRect(0,0,this.width,this.height);
    for(const p of this.projectiles){
      const s=p.style; const scale=p.metadata?.sizeMultiplier??1;
      ctx.save(); ctx.lineCap='round'; ctx.globalAlpha=Math.min(1,p.life/160); ctx.shadowBlur=24; ctx.shadowColor=s.glow;
      ctx.strokeStyle=s.trail; ctx.lineWidth=Math.max(2,s.size*.9); ctx.beginPath(); ctx.moveTo(p.prevX,p.prevY);ctx.lineTo(p.x,p.y);ctx.stroke();
      ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(p.dy,p.dx));ctx.scale(scale,scale);
      if(s.shape==='fire'){
        ctx.fillStyle=s.glow;ctx.beginPath();ctx.moveTo(s.size*1.8,0);ctx.quadraticCurveTo(-s.size*.2,-s.size*.95,-s.size*1.25,0);ctx.quadraticCurveTo(-s.size*.2,s.size*.95,s.size*1.8,0);ctx.fill();
        ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(-s.size*.18,0,s.size*.52,0,PROJ_TAU);ctx.fill();
      } else if(s.shape==='bolt'){
        ctx.strokeStyle=s.color;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-s.size*1.7,0);ctx.lineTo(-s.size*.5,-s.size*.9);ctx.lineTo(0,s.size*.15);ctx.lineTo(s.size*1.7,-s.size);ctx.stroke();
      } else if(s.shape==='void_wave'){
        ctx.fillStyle=s.glow;ctx.beginPath();ctx.moveTo(s.size*1.8,0);ctx.quadraticCurveTo(0,-s.size*1.2,-s.size*1.2,0);ctx.quadraticCurveTo(0,s.size*1.2,s.size*1.8,0);ctx.fill();
        ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(s.size*.15,0,s.size*.42,0,PROJ_TAU);ctx.fill();
      } else if(s.shape==='void'){
        ctx.fillStyle=s.color;ctx.beginPath();ctx.moveTo(s.size*1.9,0);ctx.lineTo(0,-s.size);ctx.lineTo(-s.size*1.2,0);ctx.lineTo(0,s.size);ctx.closePath();ctx.fill();
        ctx.fillStyle=s.glow;ctx.beginPath();ctx.arc(0,0,s.size*.45,0,PROJ_TAU);ctx.fill();
      } else if(s.shape==='meteor'){
        ctx.fillStyle=s.glow;ctx.beginPath();ctx.arc(0,0,s.size,0,PROJ_TAU);ctx.fill();ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(-s.size*.25,-s.size*.25,s.size*.55,0,PROJ_TAU);ctx.fill();
      } else { ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(0,0,s.size,0,PROJ_TAU);ctx.fill();ctx.fillStyle=s.glow;ctx.beginPath();ctx.arc(-s.size*.25,-s.size*.25,s.size*.5,0,PROJ_TAU);ctx.fill(); }
      ctx.restore();
    }
    ctx.globalAlpha=1;
  }
}



/* ===== src/js/systems/combat.js ===== */

class CombatSystem {
  constructor(state, logger, particles, projectiles, floatingText) { this.state=state;this.log=logger;this.particles=particles;this.projectiles=projectiles;this.floatingText=floatingText; }
  getBounds(){const game=document.getElementById('game');const r=game?.getBoundingClientRect?.();return{w:Math.max(420,(r?.width||1100)),h:Math.max(420,(r?.height||760)),left:30,right:Math.max(420,(r?.width||1100))-30,top:70,bottom:Math.max(420,(r?.height||760))-40};}
  fxBurst(x,y,palette,options){this.particles?.burst(x,y,palette,options);}
  spawnEnemy(options={}){
    const map=getMapTier(this.state.map.tier);
    const ranged=Math.random()<0.18;
    const rarity=options.rarity??'normal';
    const boss=Boolean(options.isBoss);
    const maxHp=Math.round((boss?260:80)*map.enemyHpMultiplier*(0.90+Math.random()*0.20));
    const b=this.getBounds();
    const enemy={
      x:Math.random()*(b.right-70)+70,y:Math.random()*(b.bottom-95)+90,hp:maxHp,maxHp,
      type:ranged?'caster':'melee',rarity,boss,sourceWave:options.sourceWave??1,rolledAffixes:options.affixes??[],
      burning:false,burnUntil:0,markedUntil:0,frozenUntil:0,stunnedUntil:0,regenPerSecond:0,thorns:0,vampirism:0,lowHpDamage:0,damageReduction:0,embers:false,shockChance:0,
      moveSpeed:(boss?48:(ranged?42:56))*(0.95+Math.random()*0.14)*map.enemyMoveMultiplier*(boss?1.1:1),
      attackDamage:(boss?18:(ranged?8.5:7.5))*(0.92+Math.random()*0.16)*map.enemyDamageMultiplier*(boss?1.3:1),
      attackRange:ranged?250:44,attackCooldown:ranged?1700:900,attackTimer:400+Math.random()*700,attackWindup:0,attackWindupDuration:ranged?380:220,
      displayName:boss?`Guardião T${this.state.map.tier}`:(rarity==='rare'?'Raro':rarity==='magic'?'Mágico':'Normal'),
    };
    this.state.enemies.push(enemy);
    const palette=boss?['#ffd47a','#ff6f3d']:rarity==='rare'?['#f1cf65','#b98a1c']:rarity==='magic'?['#8d76ff','#d2c1ff']:ranged?['#8d76ff','#d2c1ff']:['#b9384f','#ff6179'];
    this.fxBurst(enemy.x,enemy.y,palette,{count:boss?20:7,speed:boss?65:35,life:boss?500:250,size:boss?3:2});
    return enemy;
  }
  getAimDirection(){
    const p=this.state.player,c=this.state.mouse;let dx=(c.inside?c.x:p.x+1)-p.x,dy=(c.inside?c.y:p.y)-p.y;
    if(Math.hypot(dx,dy)<4)dx=1;const len=Math.hypot(dx,dy)||1;return{x:dx/len,y:dy/len};
  }
  canCast(skill){const now=performance.now();if((this.state.cooldowns[skill.id]??0)>now)return false;const st=getSkillStats(this.state,skill);return this.state.player.mp>=st.manaCost;}
  spend(skill){const st=getSkillStats(this.state,skill);this.state.cooldowns[skill.id]=performance.now()+st.cooldown;this.state.player.mp=Math.max(0,this.state.player.mp-st.manaCost);}
  castSlot(index){
    if(index===2){
      if(!this.state.loadout.aura){this.log('✨ Escolha uma Aura no painel Skills.');return;}
      toggleAura(this.state);this.log(this.state.auraActive?'✨ Aura ativada.':'✨ Aura desativada.');return;
    }
    const id=this.state.loadout.skills[index];
    if(!id){this.log(`✨ Slot ${index+1} vazio. Escolha uma skill da sua especialização.`);return;}
    const skill=skills[id]; if(!skill||!this.state.selectedClass||skill.classId!==this.state.selectedClass)return;
    if(!this.canCast(skill))return; this.spend(skill); const st=getSkillStats(this.state,skill); const d=getDerivedStats(this.state); const dir=this.getAimDirection();
    const speedMap={fireball:480,meteor:420,flame_burst:520,lightning:900,storm_surge:650,thunderclap:500,void_lance:590,singularity:400,death_wave:470};
    const speed=(speedMap[id]??500)*st.projectileSpeed; const radiusMap={fireball:9,meteor:17,flame_burst:13,lightning:7,storm_surge:10,thunderclap:14,void_lance:9,singularity:16,death_wave:15};
    const pierce=id==='void_lance'||id==='death_wave'?Math.max(st.projectilePierce,d.voidPierce):st.projectilePierce;
    this.projectiles?.fire({from:this.state.player,direction:dir,skillId:id,speed,radius:radiusMap[id]??10,pierce,metadata:{sizeMultiplier:st.projectileSize},onHit:enemy=>this.applySkillImpact(enemy,skill,st)});
    this.fxBurst(this.state.player.x+dir.x*20,this.state.player.y+dir.y*20,['#ffffff',classes[this.state.selectedClass].accent],{count:5,speed:55,life:120,size:2});
  }
  basicAttack(){
    const skill=skills.basic;if(!this.canCast(skill))return;this.spend(skill);const st=getSkillStats(this.state,skill);const dir=this.getAimDirection();
    this.projectiles?.fire({from:this.state.player,direction:dir,skillId:'basic',speed:720*st.projectileSpeed,radius:7,pierce:st.projectilePierce,metadata:{sizeMultiplier:st.projectileSize},onHit:enemy=>this.damageEnemy(enemy,st.damage,skill)});
  }
  applySkillImpact(enemy,skill,stats){
    if(!enemy||enemy.hp<=0)return;const id=skill.id,d=getDerivedStats(this.state);this.damageEnemy(enemy,stats.damage,skill);
    if(skill.classId==='fire')this.applyFireImpact(enemy,skill,stats,d);
    if(skill.classId==='thunder')this.applyThunderImpact(enemy,skill,stats,d);
    if(skill.classId==='void')this.applyVoidImpact(enemy,skill,stats,d);
  }
  applyFireImpact(enemy,skill,stats,d){
    enemy.burning=true;enemy.burnUntil=performance.now()+d.burnDuration*1000;
    if(skill.id==='fireball'||skill.id==='flame_burst'||skill.id==='meteor'){
      const baseRadius=skill.id==='flame_burst'?105:skill.id==='meteor'?125:85;
      const radius=baseRadius*d.areaMultiplier;const mult=skill.id==='flame_burst'?.62:skill.id==='meteor'?.40:.48;
      this.particles?.ring(enemy.x,enemy.y,'#ff7336',30,radius*.45);
      this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<radius).slice(0,skill.id==='flame_burst'?6:4).forEach(o=>{this.damageEnemy(o,stats.damage*mult,skill,true);o.burning=true;o.burnUntil=performance.now()+d.burnDuration*1000;});
    }
  }
  applyThunderImpact(enemy,skill,stats,d){
    this.addCharge(35*d.chargeGain);
    if(skill.id==='lightning'||skill.id==='storm_surge')this.lightningChain(enemy,stats,d);
    if(skill.id==='thunderclap'){
      const r=95*d.areaMultiplier;this.particles?.ring(enemy.x,enemy.y,'#72d6ff',32,r*.45);
      this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<r).forEach(o=>this.damageEnemy(o,stats.damage*.42,skill,true));
    }
  }
  applyVoidImpact(enemy,skill,stats,d){
    enemy.markedUntil=performance.now()+d.markDuration*1000;
    if(enemy.hp>0&&enemy.hp<=enemy.maxHp*d.executeThreshold)this.execute(enemy);
    if(skill.id==='singularity'){
      const r=130*d.areaMultiplier;this.particles?.ring(enemy.x,enemy.y,'#a96cff',44,r*.42);
      this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<r).forEach(o=>this.damageEnemy(o,stats.damage*.50,skill,true));
    }
    if(skill.id==='death_wave'){
      const r=90*d.areaMultiplier;this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<r).forEach(o=>this.damageEnemy(o,stats.damage*.35,skill,true));
    }
  }
  lightningChain(source,stats,d){
    const max=d.lightningChain;if(!max)return;const hit=new Set([source]);let current=source;
    for(let i=0;i<max;i++){const next=this.state.enemies.filter(e=>e.hp>0&&!hit.has(e)).sort((a,b)=>Math.hypot(a.x-current.x,a.y-current.y)-Math.hypot(b.x-current.x,b.y-current.y))[0];if(!next||Math.hypot(next.x-current.x,next.y-current.y)>170)break;hit.add(next);this.particles?.beam(current.x,current.y,next.x,next.y,'#75cfff',180,3);this.damageEnemy(next,stats.damage*.45,skills.lightning,true);current=next;}
  }
  addCharge(amount){if(this.state.selectedClass!=='thunder')return;this.state.combat.charge=Math.min(100,this.state.combat.charge+amount);if(this.state.combat.charge>=100)this.overload();}
  damageEnemy(enemy,rawDamage,skill,secondary=false){
    if(!enemy||enemy.hp<=0)return;let damage=rawDamage;const d=getDerivedStats(this.state);const crit=Math.random()<d.critChance;if(crit)damage*=d.critDamage;
    if(enemy.burning&&skill.classId==='fire')damage*=1.05; if(enemy.markedUntil>performance.now())damage*=1.12;
    damage*=Math.max(0.1,1-(enemy.damageReduction||0));
    enemy.hp-=damage;
    this.floatingText?.show(enemy.x,enemy.y-24,`${crit?'💥 ':''}${Math.round(damage)}`,crit?'crit':'damage');
    this.fxBurst(enemy.x,enemy.y,crit?['#fff7b0','#ffe36e']:['#d7b7ff','#7d5cff'],{count:crit?12:6,speed:crit?70:35,life:180,size:crit?3:2});
    if(enemy.hp<=0)this.onKill(enemy);
    if(!secondary)this.log(`${crit?'💥 CRÍTICO! ':''}${skill.name} causou ${Math.round(damage)} dano.`);
  }
  execute(enemy){
    if(!enemy||enemy.hp<=0)return;const d=getDerivedStats(this.state);this.fxBurst(enemy.x,enemy.y,['#f7e8ff','#bd7cff','#551bc0'],{count:60,speed:230,life:650,size:4});enemy.hp=0;this.log('☠️ EXECUÇÃO — o Vazio devorou o inimigo.');
    if(getSpecLevel(this.state,'void_explosion')>0){const radius=100*d.area;this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<radius).forEach(o=>this.damageEnemy(o,35*d.spellPower*d.voidDamage*d.executeExplosion,skills.void_lance,true));}
  }
  overload(){
    const p=this.state.player,d=getDerivedStats(this.state);this.state.combat.charge=0;const radius=210*d.overloadRadius,damage=85*d.spellPower*d.overloadDamage;
    this.fxBurst(p.x,p.y,['#fffbd0','#6fd5ff','#8c72ff'],{count:100,speed:280,life:900,size:4});this.particles?.ring(p.x,p.y,'#81d8ff',65,radius*.45);this.log('⚡ SOBRECARGA — tempestade divina liberada!');
    this.state.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-p.x,e.y-p.y)<radius).forEach(e=>this.damageEnemy(e,damage,skills.lightning,true));
    if(d.overloadCooldownRefund>0){const now=performance.now();for(const id of Object.keys(this.state.cooldowns))this.state.cooldowns[id]=Math.max(now,this.state.cooldowns[id]-500*d.overloadCooldownRefund);}
  }
  auraPulse(delta){
    if(!this.state.auraActive||!this.state.loadout.aura)return;const d=getDerivedStats(this.state);this.state.combat.auraPulseTimer-=delta;if(this.state.combat.auraPulseTimer>0)return;
    this.state.combat.auraPulseTimer=900;
    const p=this.state.player;const nearby=this.state.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-p.x,e.y-p.y)<d.auraRadius);
    const aura=this.state.loadout.aura;
    if(this.state.selectedClass==='fire'){
      this.particles?.ring(p.x,p.y,'#ff7733',34,d.auraRadius*.35);
      if(aura==='hellfire'){nearby.forEach(e=>{this.damageEnemy(e,10*d.auraPulsePower,skills.fireball,true);e.burning=true;e.burnUntil=performance.now()+d.burnDuration*1000;});}
      if(d.auraIgnite)nearby.forEach(e=>{e.burning=true;e.burnUntil=performance.now()+d.burnDuration*1000;});
    }
    if(this.state.selectedClass==='thunder'){
      this.particles?.ring(p.x,p.y,'#73d7ff',34,d.auraRadius*.35);
      if(aura==='static_field')this.addCharge((d.auraCharge||10)*(1+getSpecLevel(this.state,'thunder_aura_charge')*.20));
      if(aura==='storm_crown'&&nearby[0])this.particles?.beam(p.x,p.y,nearby[0].x,nearby[0].y,'#83ddff',120,2);
      if(d.auraShock)nearby.forEach(e=>{e.stunnedUntil=performance.now()+450;});
    }
    if(this.state.selectedClass==='void'){
      this.particles?.ring(p.x,p.y,'#aa72ff',34,d.auraRadius*.35);
      if(d.auraMark||aura==='death_domain')nearby.forEach(e=>e.markedUntil=performance.now()+d.markDuration*1000);
      if(aura==='void_hunger')nearby.forEach(e=>this.damageEnemy(e,8*d.auraPulsePower,skills.void_lance,true));
    }
  }
  dash(){
    const skill=skills.dash;if(!this.canCast(skill))return;this.spend(skill);const p=this.state.player,before={x:p.x,y:p.y},dir=this.getAimDirection();const d=getDerivedStats(this.state);const distance=95*d.moveSpeed;
    const b=this.getBounds();p.x=Math.max(b.left,Math.min(b.right,p.x+dir.x*distance));p.y=Math.max(b.top,Math.min(b.bottom,p.y+dir.y*distance));
    this.fxBurst(before.x,before.y,['#b98cff','#6c48ff'],{count:25,speed:80,life:350,size:2.8});this.fxBurst(p.x,p.y,['#f0d8ff','#8a5cff'],{count:35,speed:130,life:450,size:3});
  }
  onKill(enemy){
    this.fxBurst(enemy.x,enemy.y,['#ff5f79','#c93655'],{count:28,speed:150,life:500,size:3});this.state.player.xp+=10;
    while(this.state.player.xp>=100){this.state.player.xp-=100;this.state.player.level+=1;gainSkillPoints(this.state);this.log(`⬆️ Nível ${this.state.player.level}! +1 Ponto de Mago +1 Ponto de Especialização.`);}
  }
  enemyAttack(enemy, dist, dx, dy){
    const p=this.state.player;
    if(enemy.attackWindup>0) return;
    if(enemy.attackTimer>0) return;
    const inRange=dist<=enemy.attackRange;
    if(!inRange) return;
    enemy.attackWindup=enemy.attackWindupDuration;
    enemy.attackTargetX=p.x; enemy.attackTargetY=p.y;
    this.fxBurst(enemy.x,enemy.y,enemy.type==='caster'?['#b79aff','#7c57ff']:['#ff6a7d','#b92542'],{count:enemy.type==='caster'?10:7,speed:25,life:180,size:2.4});
  }

  resolveEnemyHit(enemy){
    const p=this.state.player,d=getDerivedStats(this.state);
    let raw=enemy.attackDamage;
    if(enemy.lowHpDamage && enemy.hp<enemy.maxHp*0.35) raw*=1+enemy.lowHpDamage;
    const damage=Math.max(1,raw*(1-d.damageReduction));
    p.hp-=damage;
    this.floatingText?.show(p.x,p.y-28,`-${Math.round(damage)}`,'player-hit');
    if(enemy.type==='caster')this.particles?.beam(enemy.x,enemy.y,p.x,p.y,'#bd7cff',220,4);
    if(enemy.vampirism) enemy.hp=Math.min(enemy.maxHp,enemy.hp+damage*enemy.vampirism);
    if(enemy.embers){p.hp=Math.max(0,p.hp-2);this.floatingText?.show(p.x,p.y-45,'BRASA','player-hit');}
    if(enemy.shockChance&&Math.random()<enemy.shockChance)this.state.player.hitStunUntil=performance.now()+250;
    else {
      this.fxBurst(p.x,p.y,['#ff7385','#ff334f'],{count:18,speed:105,life:300,size:3});
      const len=Math.hypot(enemy.x-p.x,enemy.y-p.y)||1;
      const b=this.getBounds();
      p.x=Math.max(b.left,Math.min(b.right,p.x-(enemy.x-p.x)/len*10));
      p.y=Math.max(b.top,Math.min(b.bottom,p.y-(enemy.y-p.y)/len*10));
    }
    if(performance.now()-this.state.combat.lastPlayerHitAt>600){
      this.state.combat.lastPlayerHitAt=performance.now();
      this.log(`🩸 Você sofreu ${Math.round(damage)} de dano.`);
    }
    enemy.attackTimer=enemy.attackCooldown;
    if(enemy.thorns){const reflect=Math.max(1,enemy.thorns*damage);p.hp=Math.max(0,p.hp-reflect);this.floatingText?.show(p.x,p.y-55,`-espinhos ${Math.round(reflect)}`,'player-hit');}
  }

  update(delta){
    const p=this.state.player,d=getDerivedStats(this.state),dt=delta/1000,now=performance.now();
    const speed=175*d.moveSpeed;if(this.state.keys.has('w'))p.y-=speed*dt;if(this.state.keys.has('s'))p.y+=speed*dt;if(this.state.keys.has('a'))p.x-=speed*dt;if(this.state.keys.has('d'))p.x+=speed*dt;
    const b=this.getBounds();p.x=Math.max(b.left,Math.min(b.right,p.x));p.y=Math.max(b.top,Math.min(b.bottom,p.y));p.maxMp=d.maxMana;p.mp=Math.min(p.maxMp,p.mp+dt*12*d.manaRegen);this.auraPulse(delta);

    for(const enemy of this.state.enemies){
      if(enemy.hp<=0)continue;
      if(enemy.burning&&now>enemy.burnUntil)enemy.burning=false;
      if(enemy.regenPerSecond>0)enemy.hp=Math.min(enemy.maxHp,enemy.hp+enemy.regenPerSecond*dt);
      if(enemy.markedUntil&&now>enemy.markedUntil)enemy.markedUntil=0;
      enemy.attackTimer=Math.max(0,enemy.attackTimer-delta);
      const dx=p.x-enemy.x,dy=p.y-enemy.y,dist=Math.hypot(dx,dy)||1;
      const stunned=enemy.stunnedUntil>now;

      if(enemy.attackWindup>0){
        enemy.attackWindup-=delta;
        if(enemy.attackWindup<=0&&!stunned){
          const targetDx=p.x-enemy.x,targetDy=p.y-enemy.y,targetDist=Math.hypot(targetDx,targetDy)||1;
          if(enemy.type==='caster'||targetDist<=enemy.attackRange+12)this.resolveEnemyHit(enemy);
          else enemy.attackTimer=220;
        }
        continue;
      }

      if(!stunned){
        const keepDistance=enemy.type==='caster'?145:0;
        if(dist>enemy.attackRange-8 || (enemy.type==='caster'&&dist<keepDistance)){
          enemy.x+=dx/dist*enemy.moveSpeed*dt;
          enemy.y+=dy/dist*enemy.moveSpeed*dt;
        }
        this.enemyAttack(enemy,dist,dx,dy);
      }
    }

    if(p.hp<=0){p.hp=p.maxHp;p.mp=p.maxMp;this.fxBurst(p.x,p.y,['#ffffff','#8d7bff'],{count:35,speed:130,life:500,size:3});this.log('💀 Você caiu no mapa. O personagem foi restaurado para continuar o teste.');}
    this.state.enemies=this.state.enemies.filter(e=>e.hp>0);
  }
}



/* ===== src/js/systems/waves.js ===== */

class WaveSystem {
  constructor(state, combat, logger){this.state=state;this.combat=combat;this.log=logger;this.spawnDelay=0;this.bossTimer=0;this.beginTier(state.map?.tier||1);}
  beginTier(tier){
    const safe=Math.max(1,Math.min(20,tier));
    const map=getMapTier(safe);this.state.map.tier=safe;
    this.state.enemies.length=0;
    this.state.wave={current:1,status:'spawning',spawned:0,total:0,defeated:0,spawnTimer:0,intermissionTimer:0,elapsed:0,bossSpawned:false,bossDefeated:false,completed:false};
    this.configureWave();
    this.log(`🗺️ ${map.name} iniciado — sobreviva às 10 Waves.`);
  }
  restartTier(){this.beginTier(this.state.map.tier);}
  testTier(tier){this.beginTier(tier);}
  configureWave(){
    const map=getMapTier(this.state.map.tier),w=this.state.wave.current;
    this.state.wave.total=map.baseMobs + Math.floor((w-1)*1.7) + Math.floor(this.state.map.tier*0.35);
    this.state.wave.spawned=0;this.state.wave.defeated=0;this.state.wave.spawnTimer=250;this.state.wave.elapsed=0;this.state.wave.bossSpawned=false;this.state.wave.bossDefeated=false;this.state.wave.status='spawning';this.bossTimer=18000;
    this.log(`🌊 Wave ${w}/10 — ${this.state.wave.total} monstros detectados.`);
  }
  rarityForWave(){
    const w=this.state.wave.current;if(w<=2)return 'normal';
    const magicChance=Math.min(0.58,0.10+(w-2)*0.07);
    const rareChance=w<5?0:Math.min(0.30,(w-4)*0.045);
    const r=Math.random();
    if(r<rareChance)return 'rare';
    if(r<rareChance+magicChance)return 'magic';
    return 'normal';
  }
  spawnOne(){
    const rarity=this.rarityForWave();
    const e=this.combat.spawnEnemy({rarity,sourceWave:this.state.wave.current,affixes:rollAffixes(rarity)});
    if(e){applyAffixes(e,e.rolledAffixes||[]);this.state.wave.spawned++;}
  }
  spawnBoss(){
    if(this.state.wave.bossSpawned)return;
    const map=getMapTier(this.state.map.tier),e=this.combat.spawnEnemy({rarity:'boss',isBoss:true,sourceWave:10,affixes:[]});
    if(e){e.maxHp*=map.bossMultiplier;e.hp=e.maxHp;e.attackDamage*=1.55;e.moveSpeed*=1.10;e.name=`Guardião T${this.state.map.tier}`;e.displayName=e.name;this.state.wave.bossSpawned=true;this.log(`👑 BOSS — ${e.name} entrou no mapa!`);}
  }
  update(delta){
    const w=this.state.wave;if(w.completed)return;
    w.elapsed+=delta;
    if(w.status==='spawning'){
      w.spawnTimer-=delta;
      if(w.spawned<w.total&&w.spawnTimer<=0){this.spawnOne();w.spawnTimer=260-Math.min(120,this.state.map.tier*3);}
      if(w.spawned>=w.total){w.status='fighting';}
    } else if(w.status==='fighting'){
      if(this.state.enemies.length===0){
        if(w.current===10&&!w.bossSpawned&&w.elapsed>=18000)this.spawnBoss();
        else if(w.current===10&&w.bossSpawned){w.status='completed';w.completed=true;this.log(`🏆 T${this.state.map.tier} concluído!`);}
        else {w.status='intermission';w.intermissionTimer=3000;this.log(`✅ Wave ${w.current} limpa.`);}
      } else if(w.current===10&&!w.bossSpawned&&w.elapsed>=18000){this.spawnBoss();}
    } else if(w.status==='intermission'){
      w.intermissionTimer-=delta;if(w.intermissionTimer<=0){w.current++;this.configureWave();}
    }
  }
}



/* ===== src/js/input.js ===== */
function bindInput(state,combat,renderer,waves){
 const game=document.getElementById('game');
 const updateMouse=event=>{const rect=game.getBoundingClientRect();state.mouse.x=Math.max(0,Math.min(rect.width,event.clientX-rect.left));state.mouse.y=Math.max(0,Math.min(rect.height,event.clientY-rect.top));state.mouse.inside=true;};
 game.addEventListener('mousemove',updateMouse);game.addEventListener('mouseenter',()=>state.mouse.inside=true);game.addEventListener('mouseleave',()=>state.mouse.inside=false);
 window.addEventListener('keydown',event=>{const key=event.key.toLowerCase();state.keys.add(key);if(['1','2','3',' ','shift'].includes(key)||event.key==='Shift')event.preventDefault();if(event.key===' '){combat.basicAttack();return;}if(key==='1')combat.castSlot(0);if(key==='2')combat.castSlot(1);if(key==='3')combat.castSlot(2);if(event.key==='Shift')combat.dash();if(key==='p')state.talentsOpen=!state.talentsOpen;});
 window.addEventListener('keyup',event=>state.keys.delete(event.key.toLowerCase()));
 document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{state.activeTab=button.dataset.tab;document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t===button));document.querySelectorAll('.content-panel').forEach(p=>p.classList.add('hidden'));document.getElementById(`panel-${state.activeTab}`).classList.remove('hidden');}));
}



/* ===== src/js/ui/render.js ===== */

function createRenderer(state){
 function log(message){state.logs.unshift(message);state.logs=state.logs.slice(0,8);}
 function renderHud(){
  const hud=document.getElementById('hud'),d=getDerivedStats(state),cls=state.selectedClass?(classes[state.selectedClass]??null):null,spec=cls?`${cls.icon} ${cls.name}`:'Nenhuma';
  const slots=[0,1,2].map(i=>{const aura=i===2,id=aura?state.loadout.aura:state.loadout.skills[i],obj=id?(aura?auras[id]:skills[id]):null;return `<div class="hud-slot ${aura&&state.auraActive?'aura-on':''}"><b>${i+1}</b><span>${obj?obj.name:'Vazio'}</span><small>${aura&&obj?(state.auraActive?'ATIVA':'OFF'):''}</small></div>`}).join('');
  const w=state.wave;const prog=w.total?`${w.spawned}/${w.total}`:'0/0';
  hud.innerHTML=`<div class="panel-card stats-card"><div class="name">Mago <span>${spec}</span></div><div class="point-row"><span>⭐ Nível ${state.player.level}</span><span class="point mage-point">🔮 Mago <b>${state.mageSkillPoints}</b></span><span class="point spec-point">👑 Spec <b>${state.selectedClass?state.specSkillPoints:'—'}</b></span></div><div class="small">XP ${Math.round(state.player.xp)}/100 · 🗺️ <b>T${state.map.tier}</b> · 🌊 <b>Wave ${w.current}/10</b> · 👹 ${prog}${w.bossSpawned?' · 👑 BOSS':''}</div><div class="small">Poder Mágico <b>+${Math.round((d.spellPower-1)*100)}%</b> · Crítico ${Math.round(d.critChance*100)}%</div><div class="bar"><i class="hp" style="width:${state.player.hp/state.player.maxHp*100}%"></i></div><div class="bar"><i class="mp" style="width:${state.player.mp/state.player.maxMp*100}%"></i></div><div class="bar"><i class="xp" style="width:${state.player.xp}%"></i></div>${state.selectedClass==='thunder'?`<div class="small charge">⚡ Carga: ${Math.round(state.combat.charge)}%</div>`:''}<div class="hud-slots">${slots}</div></div>`;
 }
 function renderAim(){let aim=document.getElementById('aim-reticle');if(!aim){aim=document.createElement('div');aim.id='aim-reticle';document.getElementById('game').appendChild(aim);}aim.style.left=`${state.mouse.x}px`;aim.style.top=`${state.mouse.y}px`;aim.style.opacity=state.mouse.inside?'1':'.25';}
 function renderAura(){let ring=document.getElementById('aura-ring');if(!ring){ring=document.createElement('div');ring.id='aura-ring';document.getElementById('game').appendChild(ring);}const d=getDerivedStats(state),aura=state.loadout.aura?auras[state.loadout.aura]:null;if(!aura||!state.auraActive){ring.style.display='none';return;}ring.style.display='block';ring.style.left=`${state.player.x}px`;ring.style.top=`${state.player.y}px`;ring.style.width=`${d.auraRadius*2}px`;ring.style.height=`${d.auraRadius*2}px`;ring.style.borderColor=aura.color;ring.style.boxShadow=`0 0 24px ${aura.color}44,inset 0 0 22px ${aura.color}16`;}
 function renderArena(){const arena=document.getElementById('arena');arena.innerHTML='';state.enemies.forEach(e=>{const el=document.createElement('div');el.className=`enemy ${e.rarity||'normal'} ${e.boss?'boss':''} ${e.burning?'burning':''} ${e.markedUntil>performance.now()?'marked':''} ${e.stunnedUntil>performance.now()?'stunned':''}`;el.style.left=`${e.x}px`;el.style.top=`${e.y}px`;const title=e.boss?'👑 '+e.displayName:e.displayName;el.innerHTML=`<div class="enemy-label">${title}</div><div class="enemy-hp"><i style="width:${Math.max(0,e.hp/e.maxHp*100)}%"></i></div>`;arena.appendChild(el)});const p=document.getElementById('player');p.style.left=`${state.player.x}px`;p.style.top=`${state.player.y}px`;document.getElementById('combat-log').innerHTML=state.logs.join('<br>');renderAim();renderAura();}
 function nodeButton(node,type){const core=node.core||false,current=type==='mage'?getMageLevel(state,node.id):getSpecLevel(state,node.id),maxed=current>=node.maxLevel;const b=document.createElement('button');b.className=`node ${current?'learned':''} ${maxed?'maxed':''} ${core?'core-node':''}`;b.innerHTML=`<div class="node-title"><b>${node.name}</b><span>${core?'ROOT':`${current}/${node.maxLevel}`}</span></div><small>${node.description}</small><div class="node-cost">${core?'NÚCLEO':maxed?'MAX':'▲ 1 ponto'}</div>`;b.onclick=e=>{e.preventDefault();const r=type==='mage'?buyMageUpgrade(state,node):buySpecUpgrade(state,node);log(r.ok?`✅ ${r.message}`:`⚠️ ${r.message}`);renderAll();};return b;}
 function renderClasses(){const root=document.getElementById('panel-classes');root.innerHTML=`<h2>👑 Especialização</h2><div class="sub">Uma única classe por personagem.</div><div id="class-grid" class="class-grid"></div><div id="spec-tree"></div><div class="map-panel"><div><b>🗺️ Mapa atual: T${state.map.tier}</b><small>As Waves servem como base para T1 → T20.</small></div><div class="map-actions"><button id="restart-tier">↻ Recomeçar T${state.map.tier}</button><button id="test-t2">▶ Testar T2</button></div></div>`;
  const grid=root.querySelector('#class-grid');Object.values(classes).forEach(cls=>{const chosen=state.selectedClass===cls.id,locked=Boolean(state.selectedClass)&&!chosen;const b=document.createElement('button');b.className=`class-button ${chosen?'selected':''} ${locked?'locked-class':''}`;b.disabled=locked;b.innerHTML=`<b>${cls.icon} ${cls.name}</b><span>${cls.description}</span><em>${chosen?'✓ Especialização ativa':locked?'🔒 Indisponível':'Escolher'}</em>`;b.onclick=()=>{const r=selectSpecialization(state,cls.id);log(r.ok?`👑 ${cls.name} escolhida.`:`⚠️ ${r.message}`);renderAll();};grid.appendChild(b);});
  const tree=root.querySelector('#spec-tree');if(!state.selectedClass){tree.innerHTML='<div class="empty-branch">Escolha uma especialização para liberar upgrades de Skills e Aura.</div>';}else{const cls=classes[state.selectedClass]??classes.fire;tree.innerHTML=`<div class="tree-header"><div><b>${cls.icon} ${cls.name}</b><span>${state.specSkillPoints} ponto(s)</span></div><small>Todos os upgrades custam 1 ponto.</small></div><div class="skill-tree" id="spec-skill-tree"></div><h3>🌀 Aura</h3><div class="skill-tree" id="spec-aura-tree"></div>`;cls.skillNodes.forEach(n=>tree.querySelector('#spec-skill-tree').appendChild(nodeButton(n,'spec')));cls.auraNodes.forEach(n=>tree.querySelector('#spec-aura-tree').appendChild(nodeButton(n,'spec')));}
  root.querySelector('#restart-tier').onclick=()=>{window.dispatchEvent(new CustomEvent('restart-tier'));};
  root.querySelector('#test-t2').onclick=()=>{window.dispatchEvent(new CustomEvent('test-tier',{detail:2}));};
 }
 function renderTalents(){document.getElementById('panel-talents').innerHTML=`<h2>🌳 Árvore de Skills do Mago</h2><div class="sub">Pressione <b>P</b> ou use o botão flutuante para abrir a árvore completa.</div><div class="tree-summary"><b>🔮 Pontos: ${state.mageSkillPoints}</b><span>${countUpgrades(state.mageUpgrades)} upgrades investidos</span></div><div class="actions"><button id="open-talents" class="action primary">Abrir árvore completa</button><button id="reset-mage" class="action">Reembolsar ${countUpgrades(state.mageUpgrades)} ponto(s)</button></div>`;document.getElementById('open-talents').onclick=()=>{state.talentsOpen=true;renderAll();};document.getElementById('reset-mage').onclick=()=>{const n=resetMageUpgrades(state);log(`↩️ ${n} ponto(s) de Mago devolvido(s).`);renderAll();};}
 function slotCard(index){const isAura=index===2,id=isAura?state.loadout.aura:state.loadout.skills[index],obj=isAura?(id?auras[id]:null):(id?skills[id]:null);return `<div class="loadout-slot ${isAura&&state.auraActive?'active':''}"><div class="slot-label">SLOT ${index+1} — ${isAura?'AURA':'SKILL'}</div><strong>${obj?obj.name:'Vazio'}</strong><small>${obj?obj.description||'':'Selecione uma opção abaixo.'}</small>${obj?`<button data-clear="${index}">Remover</button>`:''}</div>`;}
 function renderSkills(){const root=document.getElementById('panel-skills');root.innerHTML=`<h2>✨ Loadout</h2><div class="sub">2 skills da classe + 1 Aura. Todos os projéteis seguem o cursor.</div>${state.selectedClass?`<div class="loadout-grid">${slotCard(0)}${slotCard(1)}${slotCard(2)}</div><h3>⚔️ Skills</h3><div id="skill-options" class="option-grid"></div><h3>🌀 Auras</h3><div id="aura-options" class="option-grid"></div>`:'<div class="empty-branch">Escolha uma especialização primeiro.</div>'}<h3>✨ Ataque Básico</h3><div class="skill-card">${skills.basic.name} — Espaço · ${Math.round(getSkillStats(state,skills.basic).damage)} dano</div>`;if(!state.selectedClass)return;const cls=classes[state.selectedClass]??null;if(!cls)return;for(const id of cls.skills){const s=skills[id],b=document.createElement('button');b.className=`option-button ${state.loadout.skills.includes(id)?'chosen':''}`;const st=getSkillStats(state,s);b.innerHTML=`<b>${s.name}</b><span>${s.description}</span><strong>⚔️ ${Math.round(st.damage)} dano · ${st.manaCost} Mana</strong><em>${state.loadout.skills[0]===id?'Slot 1':state.loadout.skills[1]===id?'Slot 2':'Selecionar'}</em>`;b.onclick=()=>{const target=state.loadout.skills[0]?1:0;setSkillSlot(state,target,id);renderAll();};root.querySelector('#skill-options').appendChild(b)}for(const id of cls.auras){const a=auras[id],b=document.createElement('button');b.className=`option-button ${state.loadout.aura===id?'chosen':''}`;b.innerHTML=`<b>${a.name}</b><span>${a.description}</span><em>${state.loadout.aura===id?'✓ Equipada':'Equipar'}</em>`;b.onclick=()=>{selectAura(state,id);renderAll();};root.querySelector('#aura-options').appendChild(b)}root.querySelectorAll('[data-clear]').forEach(b=>b.onclick=()=>{const i=Number(b.dataset.clear);if(i<2)clearSkillSlot(state,i);else{state.loadout.aura=null;state.auraActive=false}renderAll()});}
 function renderTalentModal(){let modal=document.getElementById('talent-modal');if(!state.talentsOpen){if(modal)modal.remove();return;}if(!modal){modal=document.createElement('div');modal.id='talent-modal';document.body.appendChild(modal);}modal.innerHTML=`<div class="talent-backdrop"></div><section class="talent-window"><header class="talent-top"><div><h1>🌳 Árvore de Skills — Mago</h1><p>Os troncos se ramificam para esquerda e direita. Para atravessar de um lado para o outro, você precisa comprar os nós intermediários.</p></div><div class="talent-points"><b>🔮 ${state.mageSkillPoints}</b><span>pontos disponíveis</span></div><button id="close-talents" class="close-talents">✕</button></header><div class="talent-legend"><span>🟢 Aprendido</span><span>🟣 Disponível</span><span>🔒 Bloqueado</span><span>💡 Cada nó = 1 ponto</span></div><div class="talent-canvas" id="talent-canvas"></div><footer><button id="reset-mage-modal" class="action">↩ Reembolsar árvore</button><span>Começar pela direita e alcançar a esquerda exige atravessar as pontes do centro.</span></footer></section>`;
  const canvas=modal.querySelector('#talent-canvas');const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('tree-lines');svg.setAttribute('viewBox','0 0 1000 800');for(const n of mageSkillTree){for(const req of (n.requires??[])){const r=mageSkillTree.find(x=>x.id===req);if(!r)continue;const line=document.createElementNS('http://www.w3.org/2000/svg','line');line.setAttribute('x1',r.x*10);line.setAttribute('y1',r.y*8);line.setAttribute('x2',n.x*10);line.setAttribute('y2',n.y*8);line.classList.add((getMageLevel(state,n.id)||n.core)?'line-active':'line');svg.appendChild(line);}}canvas.appendChild(svg);
  mageSkillTree.forEach(n=>{const b=nodeButton(n,'mage');b.style.left=`calc(${n.x}% - 74px)`;b.style.top=`calc(${n.y}% - 40px)`;if(n.requires?.length&&!n.core){const missing=n.requires.filter(id=>getMageLevel(state,id)<=0&&id!=='core');b.classList.toggle('path-locked',missing.length>0);}canvas.appendChild(b);});
  modal.querySelector('#close-talents').onclick=()=>{state.talentsOpen=false;renderAll();};modal.querySelector('.talent-backdrop').onclick=()=>{state.talentsOpen=false;renderAll();};modal.querySelector('#reset-mage-modal').onclick=()=>{const n=resetMageUpgrades(state);log(`↩️ ${n} ponto(s) devolvido(s).`);renderAll();};}
 function renderFrame(){renderHud();renderArena();if(state.talentsOpen){if(!document.getElementById('talent-modal'))renderTalentModal();}else if(document.getElementById('talent-modal'))document.getElementById('talent-modal').remove();}
 function renderAll(){renderHud();renderArena();renderClasses();renderTalents();renderSkills();renderTalentModal();if(!document.getElementById('talent-open-float')){const btn=document.createElement('button');btn.id='talent-open-float';btn.textContent='🌳 Árvore [P]';btn.onclick=()=>{state.talentsOpen=true;renderAll();};document.getElementById('game').appendChild(btn);}}
 return {renderAll,renderFrame,log};
}



/* ===== src/js/main.js ===== */

const state=createGameState();
window.__ARPG_STATE__=state;
const game=document.getElementById('game');
const particleSystem=new ParticleSystem(game);
const projectileSystem=new ProjectileSystem(game,particleSystem);
const floatingText=new FloatingTextSystem(game);
const renderer=createRenderer(state);
const combat=new CombatSystem(state,message=>renderer.log(message),particleSystem,projectileSystem,floatingText);
const waves=new WaveSystem(state,combat,message=>renderer.log(message));
combat.waveSystem=waves;
bindInput(state,combat,renderer,waves);
window.addEventListener('restart-tier',()=>{waves.restartTier();renderer.renderAll();});
window.addEventListener('test-tier',e=>{waves.testTier(Number(e.detail)||2);renderer.renderAll();});
state.logs.unshift('✨ Protótipo iniciado — escolha uma classe, 2 skills e 1 Aura.');
try{ renderer.renderAll(); }catch(error){ window.__ARPG_BOOT_ERROR__=error; throw error; }
let last=performance.now();
function frame(now){try{const delta=Math.min(50,now-last);last=now;combat.update(delta);waves.update(delta);projectileSystem.update(delta,state.enemies);particleSystem.update(delta);projectileSystem.render();particleSystem.render();renderer.renderFrame();}catch(error){ if(!window.__ARPG_RUNTIME_ERROR__){window.__ARPG_RUNTIME_ERROR__=error; console.error(error);} } requestAnimationFrame(frame);}requestAnimationFrame(frame);

