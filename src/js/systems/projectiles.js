const TAU = Math.PI * 2;

const STYLES = {
  basic:   { color: '#e9e8ff', glow: '#a98cff', size: 5, trail: '#b9a7ff', shape: 'orb' },
  fireball:{ color: '#fff0a8', glow: '#ff6a2d', size: 10, trail: '#ff7a32', shape: 'fire' },
  lightning:{ color: '#fffbd0', glow: '#5dc7ff', size: 7, trail: '#70c8ff', shape: 'bolt' },
  void_lance:{ color: '#f2d7ff', glow: '#8c42ff', size: 9, trail: '#6e3cc7', shape: 'void' },
  meteor: { color: '#fff2ad', glow: '#ff572d', size: 15, trail: '#ff7a32', shape: 'meteor' },
};

export class ProjectileSystem {
  constructor(container, particles) {
    this.container = container;
    this.particles = particles;
    this.projectiles = [];
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'projectiles-layer';
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    container.appendChild(this.canvas);
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

  fire({ from, target, skillId, speed = 420, onImpact }) {
    const style = STYLES[skillId] ?? STYLES.basic;
    const start = { x: from.x, y: from.y };
    if (skillId === 'meteor') {
      start.x = target.x;
      start.y = target.y - 360;
      speed = 520;
    }
    this.projectiles.push({
      x: start.x,
      y: start.y,
      prevX: start.x,
      prevY: start.y,
      target,
      skillId,
      speed,
      life: 2200,
      age: 0,
      style,
      spin: Math.random() * TAU,
      onImpact,
    });
    this.particles?.burst(start.x, start.y, [style.color, style.glow], {
      count: 8, speed: 40, life: 180, size: 2,
    });
  }

  update(delta) {
    const dt = delta / 1000;
    const keep = [];
    for (const p of this.projectiles) {
      p.age += delta;
      p.life -= delta;
      if (p.life <= 0 || !p.target || p.target.hp <= 0) continue;

      p.prevX = p.x;
      p.prevY = p.y;

      let dx = p.target.x - p.x;
      let dy = p.target.y - p.y;
      const dist = Math.hypot(dx, dy) || 1;
      const step = p.speed * dt;

      p.x += (dx / dist) * step;
      p.y += (dy / dist) * step;
      p.spin += delta * 0.012;

      this.particles?.emit({
        x: p.x,
        y: p.y,
        color: p.style.trail,
        count: 2,
        speed: 18,
        size: Math.max(1.2, p.style.size * 0.3),
        life: 170,
      });

      if (dist <= Math.max(12, step * 1.3)) {
        p.onImpact?.(p.target);
        this.impactFx(p.x, p.y, p.style, p.skillId);
        continue;
      }
      keep.push(p);
    }
    this.projectiles = keep;
  }

  impactFx(x, y, style, skillId) {
    this.particles?.burst(x, y, [style.color, style.glow], {
      count: skillId === 'meteor' ? 40 : 18,
      speed: skillId === 'meteor' ? 190 : 105,
      life: skillId === 'meteor' ? 620 : 320,
      gravity: skillId === 'meteor' ? 90 : 0,
      size: skillId === 'meteor' ? 3.8 : 2.8,
    });
    if (skillId === 'meteor') this.particles?.ring(x, y, '#ff6f2e', 36, 38);
    else this.particles?.ring(x, y, style.glow, skillId === 'lightning' ? 16 : 10, skillId === 'void_lance' ? 24 : 18);
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.projectiles) {
      const s = p.style;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.globalAlpha = Math.min(1, p.life / 160);
      ctx.shadowBlur = 22;
      ctx.shadowColor = s.glow;

      // Trail / velocity line
      ctx.strokeStyle = s.trail;
      ctx.lineWidth = Math.max(2, s.size * 0.9);
      ctx.beginPath();
      ctx.moveTo(p.prevX, p.prevY);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      ctx.translate(p.x, p.y);
      const angle = Math.atan2(p.y - p.prevY, p.x - p.prevX);
      ctx.rotate(angle);

      if (s.shape === 'fire') {
        ctx.fillStyle = s.glow;
        ctx.beginPath();
        ctx.moveTo(s.size * 1.7, 0);
        ctx.quadraticCurveTo(-s.size * .2, -s.size * .8, -s.size * 1.2, 0);
        ctx.quadraticCurveTo(-s.size * .2, s.size * .8, s.size * 1.7, 0);
        ctx.fill();
        ctx.fillStyle = s.color;
        ctx.beginPath(); ctx.arc(-s.size * .15, 0, s.size * .55, 0, TAU); ctx.fill();
      } else if (s.shape === 'bolt') {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-s.size * 1.8, 0);
        ctx.lineTo(-s.size * .4, -s.size * .8);
        ctx.lineTo(s.size * .1, .2 * s.size);
        ctx.lineTo(s.size * 1.8, -s.size);
        ctx.stroke();
      } else if (s.shape === 'void') {
        ctx.fillStyle = s.color;
        ctx.beginPath(); ctx.moveTo(s.size * 1.8, 0); ctx.lineTo(0, -s.size); ctx.lineTo(-s.size * 1.2, 0); ctx.lineTo(0, s.size); ctx.closePath(); ctx.fill();
        ctx.fillStyle = s.glow;
        ctx.beginPath(); ctx.arc(0, 0, s.size * .45, 0, TAU); ctx.fill();
      } else if (s.shape === 'meteor') {
        ctx.fillStyle = s.glow;
        ctx.beginPath(); ctx.arc(0, 0, s.size, 0, TAU); ctx.fill();
        ctx.fillStyle = s.color;
        ctx.beginPath(); ctx.arc(-s.size * .25, -s.size * .25, s.size * .55, 0, TAU); ctx.fill();
      } else {
        ctx.fillStyle = s.color;
        ctx.beginPath(); ctx.arc(0, 0, s.size, 0, TAU); ctx.fill();
        ctx.fillStyle = s.glow;
        ctx.beginPath(); ctx.arc(-s.size * .25, -s.size * .25, s.size * .5, 0, TAU); ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
}
