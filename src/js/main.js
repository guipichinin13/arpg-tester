import { createGameState } from './state.js';
import { CombatSystem } from './systems/combat.js';
import { ParticleSystem } from './systems/particles.js';
import { ProjectileSystem } from './systems/projectiles.js';
import { saveGame } from './systems/save.js';
import { createRenderer } from './ui/render.js';
import { bindInput } from './input.js';

const state = createGameState();
const particleSystem = new ParticleSystem(document.getElementById('game'));
const projectileSystem = new ProjectileSystem(document.getElementById('game'), particleSystem);
const renderer = createRenderer(state);
const combat = new CombatSystem(state, message => {
  state.logs.unshift(message);
  state.logs = state.logs.slice(0, 7);
}, particleSystem, projectileSystem);

for (let i = 0; i < 5; i += 1) combat.spawnEnemy();
bindInput(state, combat);
window.addEventListener('beforeunload', () => saveGame(state));

afterLoadMessage();
renderer.renderAll();

let last = performance.now();
function frame(now) {
  const delta = Math.min(50, now - last);
  last = now;
  combat.update(delta);
  projectileSystem.update(delta);
  particleSystem.update(delta);
  projectileSystem.render();
  particleSystem.render();
  renderer.renderFrame();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function afterLoadMessage() {
  if (state.lastSavedAt) {
    state.logs.unshift(`💾 Build carregada — ${state.availableTalentPoints} ponto(s) disponível(is).`);
  } else {
    state.logs.unshift('✨ Novo personagem. Seus pontos serão salvos automaticamente.');
  }
}
