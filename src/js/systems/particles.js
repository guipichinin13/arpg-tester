const TAU = Math.PI * 2;

export class ParticleSystem {
  constructor(container) {
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'particles-layer';
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.container = container;
    container.appendChild(this.canvas);
    this.resize();
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

  emit({ x, y, count = 12, color = '#fff', speed = 90, size = 3, life = 450, gravity = 0, spread = TAU }) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * spread - spread / 2;
      const velocity = speed * (0.45 + Math.random() * 0.75);
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: size * (0.65 + Math.random() * 0.8),
        life: life * (0.65 + Math.random() * 0.55),
        maxLife: life,
        color,
        gravity,
      });
    }
  }

  burst(x, y, palette, options = {}) {
    palette.forEach((color, index) => {
      this.emit({
        x,
        y,
        color,
        count: Math.round((options.count ?? 18) / palette.length),
        speed: (options.speed ?? 120) * (1 + index * 0.08),
        size: options.size ?? 3,
        life: options.life ?? 500,
        gravity: options.gravity ?? 0,
      });
    });
  }

  ring(x, y, color, count = 24, radius = 20) {
    for (let i = 0; i < count; i += 1) {
      const a = (i / count) * TAU;
      this.particles.push({
        x: x + Math.cos(a) * radius,
        y: y + Math.sin(a) * radius,
        vx: Math.cos(a) * 80,
        vy: Math.sin(a) * 80,
        size: 2.5,
        life: 500,
        maxLife: 500,
        color,
        gravity: 0,
      });
    }
  }

  update(delta) {
    const dt = delta / 1000;
    this.particles = this.particles.filter(p => {
      p.life -= delta;
      if (p.life <= 0) return false;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += p.gravity * dt;
      return true;
    });
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.particles) {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, TAU);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
}
