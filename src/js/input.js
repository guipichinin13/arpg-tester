export function bindInput(state, combat) {
  const game = document.getElementById('game');

  const updateMouse = (event) => {
    const rect = game.getBoundingClientRect();
    state.mouse.x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    state.mouse.y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
    state.mouse.inside = true;
  };
  game.addEventListener('mousemove', updateMouse);
  game.addEventListener('mouseenter', () => { state.mouse.inside = true; });
  game.addEventListener('mouseleave', () => { state.mouse.inside = false; });

  window.addEventListener('keydown', event => {
    const key = event.key.toLowerCase();
    state.keys.add(key);
    if (event.key === ' ') { event.preventDefault(); combat.basicAttack(); }
    if (key === '1') combat.castSkill('fireball');
    if (key === '2') combat.castSkill('lightning');
    if (key === '3') combat.castSkill('void_lance');
    if (key === '4') combat.castSkill('meteor');
    if (event.key === 'Shift') combat.dash();
  });

  window.addEventListener('keyup', event => state.keys.delete(event.key.toLowerCase()));

  document.querySelectorAll('.tab').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.tab;
      state.activeTab = id;
      document.querySelectorAll('.tab').forEach(tab => tab.classList.toggle('active', tab === button));
      document.querySelectorAll('.content-panel').forEach(panel => panel.classList.add('hidden'));
      document.getElementById(`panel-${id}`).classList.remove('hidden');
    });
  });
}
