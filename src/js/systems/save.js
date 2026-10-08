const SAVE_KEY='arpg_mago_save_v5';
const LEGACY_KEYS=['arpg_mago_save_v4','arpg_mago_save_v3'];
export function saveGame(state){
  const payload={version:5,player:{...state.player},mageSkillPoints:state.mageSkillPoints,specSkillPoints:state.specSkillPoints,selectedClass:state.selectedClass,mageUpgrades:state.mageUpgrades,specUpgrades:state.specUpgrades,loadout:{...state.loadout,skills:[...state.loadout.skills]},auraActive:state.auraActive,map:{tier:state.map.tier},savedAt:Date.now()};
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(payload));state.saveStatus='salvo';state.lastSavedAt=payload.savedAt;}catch(e){state.saveStatus='erro';console.warn('Save falhou',e)}
}
export function loadGame(){try{let raw=localStorage.getItem(SAVE_KEY);if(!raw){for(const key of LEGACY_KEYS){raw=localStorage.getItem(key);if(raw)break;}}if(!raw)return null;const d=JSON.parse(raw);return d&&[3,4,5].includes(d.version)?d:null;}catch(e){return null;}}
export function clearSave(){localStorage.removeItem(SAVE_KEY)}
export function applySavedGame(state,data){
 if(!data)return false;Object.assign(state.player,data.player??{});state.mageSkillPoints=Number.isFinite(data.mageSkillPoints)?data.mageSkillPoints:1;state.specSkillPoints=Number.isFinite(data.specSkillPoints)?data.specSkillPoints:1;state.selectedClass=data.selectedClass??null;state.mageUpgrades=data.mageUpgrades??{};state.specUpgrades=data.specUpgrades??{};state.loadout={skills:Array.isArray(data.loadout?.skills)?[data.loadout.skills[0]??null,data.loadout.skills[1]??null]:[null,null],aura:data.loadout?.aura??null};state.auraActive=Boolean(data.auraActive&&state.loadout.aura);state.map.tier=data.map?.tier??1;state.saveStatus='salvo';state.lastSavedAt=data.savedAt??Date.now();return true;
}
