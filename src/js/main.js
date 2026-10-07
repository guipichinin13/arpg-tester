import { createGameState } from './state.js';
import { CombatSystem } from './systems/combat.js';
import { createRenderer } from './ui/render.js';
import { bindInput } from './input.js';

const state = createGameState();
const renderer = createRenderer(state);
const combat = new CombatSystem(state, message => {
  state.logs.unshift(message);
  state.logs = state.logs.slice(0, 7);
});

for (let i = 0; i < 5; i += 1) combat.spawnEnemy();
bindInput(state, combat);
renderer.renderAll();

let last = performance.now();
function frame(now) {
  const delta = Math.min(50, now - last);
  last = now;
  combat.update(delta);
  renderer.renderAll();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
