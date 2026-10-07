import { createGameState } from './state.js';
import { CombatSystem } from './systems/combat.js';
import { ParticleSystem } from './systems/particles.js';
import { saveGame } from './systems/save.js';
import { createRenderer } from './ui/render.js';
import { bindInput } from './input.js';

const state = createGameState();
const particleSystem = new ParticleSystem(document.getElementById('game'));
const renderer = createRenderer(state);
const combat = new CombatSystem(state, message => {
  state.logs.unshift(message);
  state.logs = state.logs.slice(0, 7);
}, particleSystem);

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
  particleSystem.update(delta);
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
