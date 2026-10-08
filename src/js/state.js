export function createGameState(){
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
