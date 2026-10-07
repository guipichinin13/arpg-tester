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

state.logs.unshift(state.lastSavedAt
  ? `💾 Build carregada — 🔮 ${state.mageSkillPoints} Mago · 👑 ${state.specSkillPoints} Especialização.`
  : '✨ Novo personagem — 1 Ponto de Mago + 1 Ponto de Especialização inicial.');
renderer.renderAll();

let last = performance.now();
function frame(now) {
  const delta = Math.min(50, now - last);
  last = now;
  combat.update(delta);
  projectileSystem.update(delta, state.enemies);
  particleSystem.update(delta);
  projectileSystem.render();
  particleSystem.render();
  renderDynamicUi();
  requestAnimationFrame(frame);
}

function renderDynamicUi() {
  renderer.renderFrame();
}

requestAnimationFrame(frame);
