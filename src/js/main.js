import { createGameState } from './state.js';
import { CombatSystem } from './systems/combat.js';
import { ParticleSystem } from './systems/particles.js';
import { ProjectileSystem } from './systems/projectiles.js';
import { saveGame } from './systems/save.js';
import { FloatingTextSystem } from './systems/floatingText.js';
import { createRenderer } from './ui/render.js';
import { bindInput } from './input.js';
import { WaveSystem } from './systems/waves.js';

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
window.addEventListener('beforeunload',()=>saveGame(state));
state.logs.unshift(state.lastSavedAt?`💾 Build carregada — T${state.map.tier}.`:'✨ Novo personagem — escolha uma classe, 2 skills e 1 Aura.');
try{ renderer.renderAll(); }catch(error){ window.__ARPG_BOOT_ERROR__=error; throw error; }
let last=performance.now();
function frame(now){try{const delta=Math.min(50,now-last);last=now;combat.update(delta);waves.update(delta);projectileSystem.update(delta,state.enemies);particleSystem.update(delta);projectileSystem.render();particleSystem.render();renderer.renderFrame();}catch(error){ if(!window.__ARPG_RUNTIME_ERROR__){window.__ARPG_RUNTIME_ERROR__=error; console.error(error);} } requestAnimationFrame(frame);}requestAnimationFrame(frame);
