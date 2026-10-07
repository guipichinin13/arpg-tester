const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
window.onresize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
window.onresize();

// Configurações das Builds
const CONFIG = {
  direct: { dmg: 185, dot: 40, dur: 3, stacks: 1, proj: 3, rad: 55, prolif: false },
  dot: { dmg: 80, dot: 130, dur: 5, stacks: 3, proj: 1, rad: 35, prolif: true }
};

// Estado Central do Jogo
const state = {
  build: 'direct',
  player: { x: canvas.width / 2, y: canvas.height / 2 + 50, tx: canvas.width / 2, ty: canvas.height / 2 + 50, spd: 4.5 },
  enemies: [], projectiles: [], particles: [], dmgTexts: []
};

// Exposição para a UI
window.app = {
  setBuild: (b) => {
    state.build = b;
    document.getElementById('ui-direct').innerText = CONFIG[b].dmg;
    document.getElementById('ui-dot').innerText = CONFIG[b].dot + '/s';
    document.getElementById('ui-proj').innerText = CONFIG[b].proj;
    document.getElementById('ui-stacks').innerText = CONFIG[b].stacks + 'x';
    document.getElementById('btn-build-1').classList.toggle('active', b === 'direct');
    document.getElementById('btn-build-2').classList.toggle('active', b === 'dot');
  },
  resetEnemies: () => {
    state.enemies = [];
    const cx = canvas.width / 2, cy = canvas.height / 2 - 100;
    const pos = [[cx-120,cy], [cx,cy-60], [cx+120,cy], [cx-50,cy-120], [cx+50,cy-120]];
    pos.forEach((p, i) => state.enemies.push({ id: i, x: p[0], y: p[1], hp: 1200, maxHp: 1200, r: 22, ignStacks: 0, ignTimer: 0, burnDps: 0 }));
  }
};
app.resetEnemies();

// Controles do Mouse
let isMouseDwn = false;
window.onmousedown = (e) => { if (!e.target.closest('.interactive')) { isMouseDwn = true; castFireball(e.clientX, e.clientY); } };
window.onmousemove = (e) => { if (isMouseDwn && !e.target.closest('.interactive')) { state.player.tx = e.clientX; state.player.ty = e.clientY; } };
window.onmouseup = () => isMouseDwn = false;

function castFireball(tx, ty) {
  const s = CONFIG[state.build];
  const angle = Math.atan2(ty - state.player.y, tx - state.player.x);
  for (let i = 0; i < s.proj; i++) {
    const spread = (i - (s.proj - 1) / 2) * 0.22;
    state.projectiles.push({ x: state.player.x, y: state.player.y - 15, vx: Math.cos(angle + spread) * 8.5, vy: Math.sin(angle + spread) * 8.5, dist: 0 });
  }
}

// Motor Físico (Loop)
function update() {
  const p = state.player, s = CONFIG[state.build];
  const dist = Math.hypot(p.tx - p.x, p.ty - p.y);
  if (dist > 5) { p.x += ((p.tx - p.x) / dist) * p.spd; p.y += ((p.ty - p.y) / dist) * p.spd; }

  for (let i = state.projectiles.length - 1; i >= 0; i--) {
    let pr = state.projectiles[i];
    pr.x += pr.vx; pr.y += pr.vy; pr.dist += 8.5;
    
    state.particles.push({ x: pr.x, y: pr.y, vx: -pr.vx * 0.2, vy: -pr.vy * 0.2, life: 1, color: '#ffaa00' });

    let hit = false;
    state.enemies.forEach(e => {
      if (e.hp > 0 && Math.hypot(e.x - pr.x, e.y - pr.y) < e.r + 8) {
        hit = true;
        e.hp -= s.dmg;
        state.dmgTexts.push({ x: e.x, y: e.y - 20, text: s.dmg, life: 1, color: '#ff7700' });
        if (e.ignStacks < s.stacks) e.ignStacks++;
        e.ignTimer = s.dur; e.burnDps = s.dot;
      }
    });

    if (hit || pr.dist > 500) {
      for (let k = 0; k < 15; k++) state.particles.push({ x: pr.x, y: pr.y, vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10, life: 1, color: '#ff3300' });
      state.projectiles.splice(i, 1);
    }
  }

  state.enemies.forEach(e => {
    if (e.hp > 0 && e.ignTimer > 0) {
      e.ignTimer -= 0.016; e.hp -= (e.burnDps * e.ignStacks) * 0.016;
      if (Math.random() < 0.05) state.dmgTexts.push({ x: e.x, y: e.y - 10, text: (e.burnDps * e.ignStacks) + ' DoT', life: 0.8, color: '#ff3366' });
      if (e.ignTimer <= 0) e.ignStacks = 0;
    }
  });

  state.particles = state.particles.filter(pt => (pt.life -= 0.03) > 0);
  state.particles.forEach(pt => { pt.x += pt.vx; pt.y += pt.vy; });
  state.dmgTexts = state.dmgTexts.filter(dt => (dt.life -= 0.02) > 0);
  state.dmgTexts.forEach(dt => dt.y -= 0.8);
}

// Motor de Renderização
function render() {
  ctx.fillStyle = '#07080b'; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#121620';
  for (let i = 0; i < canvas.width; i += 40) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke(); }
  for (let i = 0; i < canvas.height; i += 40) { ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke(); }

  state.enemies.forEach(e => {
    if (e.hp <= 0) return;
    ctx.fillStyle = e.ignStacks > 0 ? '#ff4411' : '#3a4252';
    ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#111'; ctx.fillRect(e.x - 20, e.y - 35, 40, 5);
    ctx.fillStyle = e.ignStacks > 0 ? '#ff3300' : '#00cc66'; ctx.fillRect(e.x - 20, e.y - 35, 40 * Math.max(0, e.hp / e.maxHp), 5);
  });

  ctx.fillStyle = '#ff4400'; ctx.beginPath(); ctx.arc(state.player.x, state.player.y - 10, 16, 0, Math.PI * 2); ctx.fill();

  state.particles.forEach(pt => { ctx.globalAlpha = Math.max(0, pt.life); ctx.fillStyle = pt.color; ctx.beginPath(); ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2); ctx.fill(); });
  ctx.globalAlpha = 1.0;

  state.projectiles.forEach(pr => { ctx.fillStyle = '#ffaa00'; ctx.beginPath(); ctx.arc(pr.x, pr.y, 10, 0, Math.PI * 2); ctx.fill(); });

  state.dmgTexts.forEach(dt => { ctx.globalAlpha = Math.max(0, dt.life); ctx.fillStyle = dt.color; ctx.font = 'bold 14px sans-serif'; ctx.fillText(dt.text, dt.x, dt.y); });
  ctx.globalAlpha = 1.0;
}

(function loop() { update(); render(); requestAnimationFrame(loop); })();