const TAU = Math.PI * 2;

const STYLES = {
  basic:     { color: '#f2f0ff', glow: '#a78bfa', size: 5, trail: '#b9a7ff', shape: 'orb' },
  fireball:  { color: '#fff3ad', glow: '#ff6a2d', size: 10, trail: '#ff7a32', shape: 'fire' },
  lightning: { color: '#fffbd0', glow: '#55c7ff', size: 7, trail: '#70c8ff', shape: 'bolt' },
  void_lance:{ color: '#f6dcff', glow: '#8c42ff', size: 9, trail: '#713fc7', shape: 'void' },
  meteor:    { color: '#fff2ad', glow: '#ff572d', size: 15, trail: '#ff7a32', shape: 'meteor' },
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

  fire({ from, direction, skillId, speed = 420, radius = 10, pierce = 0, onHit, metadata = {} }) {
    const style = STYLES[skillId] ?? STYLES.basic;
    const len = Math.hypot(direction.x, direction.y) || 1;
    const dx = direction.x / len;
    const dy = direction.y / len;
    const start = { x: from.x, y: from.y };
    const isMeteor = skillId === 'meteor';
    if (isMeteor) {
      start.x = from.x + dx * 80;
      start.y = from.y + dy * 80;
    }

    this.projectiles.push({
      x: start.x, y: start.y,
      prevX: start.x, prevY: start.y,
      dx, dy,
      speed: isMeteor ? 520 : speed,
      life: 2200,
      age: 0,
      skillId,
      style,
      radius: Math.max(7, radius),
      pierceLeft: Math.max(0, pierce),
      hitIds: new Set(),
      onHit,
      metadata,
      spin: Math.random() * TAU,
    });

    this.particles?.burst(start.x, start.y, [style.color, style.glow], { count: 7, speed: 35, life: 160, size: 2 });
  }

  update(delta, enemies = []) {
    const dt = delta / 1000;
    const keep = [];

    for (const p of this.projectiles) {
      p.age += delta;
      p.life -= delta;
      if (p.life <= 0) continue;

      p.prevX = p.x;
      p.prevY = p.y;
      const step = p.speed * dt;
      p.x += p.dx * step;
      p.y += p.dy * step;
      p.spin += delta * 0.012;

      this.particles?.emit({
        x: p.x, y: p.y,
        color: p.style.trail,
        count: p.skillId === 'meteor' ? 4 : 2,
        speed: p.skillId === 'meteor' ? 30 : 18,
        size: Math.max(1.2, p.style.size * .28),
        life: p.skillId === 'meteor' ? 250 : 150,
        gravity: p.skillId === 'meteor' ? 35 : 0,
      });

      let remove = false;
      for (const enemy of enemies) {
        if (!enemy || enemy.hp <= 0 || p.hitIds.has(enemy)) continue;
        const distance = Math.hypot(enemy.x - p.x, enemy.y - p.y);
        if (distance <= p.radius + 18) {
          p.hitIds.add(enemy);
          p.onHit?.(enemy);
          this.impactFx(enemy.x, enemy.y, p.style, p.skillId);
          if (p.pierceLeft > 0) p.pierceLeft -= 1;
          else { remove = true; break; }
        }
      }

      if (p.x < -80 || p.x > this.width + 80 || p.y < -80 || p.y > this.height + 80) remove = true;
      if (!remove) keep.push(p);
    }
    this.projectiles = keep;
  }

  impactFx(x, y, style, skillId) {
    this.particles?.burst(x, y, [style.color, style.glow], {
      count: skillId === 'meteor' ? 42 : 18,
      speed: skillId === 'meteor' ? 190 : 105,
      life: skillId === 'meteor' ? 620 : 320,
      gravity: skillId === 'meteor' ? 90 : 0,
      size: skillId === 'meteor' ? 3.8 : 2.8,
    });
    this.particles?.ring(x, y, style.glow, skillId === 'meteor' ? 34 : 12, skillId === 'meteor' ? 42 : 22);
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    for (const p of this.projectiles) {
      const s = p.style;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.globalAlpha = Math.min(1, p.life / 160);
      ctx.shadowBlur = 24;
      ctx.shadowColor = s.glow;

      ctx.strokeStyle = s.trail;
      ctx.lineWidth = Math.max(2, s.size * .9);
      ctx.beginPath(); ctx.moveTo(p.prevX, p.prevY); ctx.lineTo(p.x, p.y); ctx.stroke();

      ctx.translate(p.x, p.y);
      const angle = Math.atan2(p.dy, p.dx);
      ctx.rotate(angle);
      const scale = p.metadata?.sizeMultiplier ?? 1;
      ctx.scale(scale, scale);

      if (s.shape === 'fire') {
        ctx.fillStyle = s.glow;
        ctx.beginPath(); ctx.moveTo(s.size * 1.7, 0); ctx.quadraticCurveTo(-s.size * .2, -s.size * .8, -s.size * 1.2, 0); ctx.quadraticCurveTo(-s.size * .2, s.size * .8, s.size * 1.7, 0); ctx.fill();
        ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(-s.size * .15, 0, s.size * .55, 0, TAU); ctx.fill();
      } else if (s.shape === 'bolt') {
        ctx.strokeStyle = s.color; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(-s.size * 1.8, 0); ctx.lineTo(-s.size * .5, -s.size * .8); ctx.lineTo(0, s.size * .2); ctx.lineTo(s.size * 1.8, -s.size); ctx.stroke();
      } else if (s.shape === 'void') {
        ctx.fillStyle = s.color; ctx.beginPath(); ctx.moveTo(s.size * 1.8, 0); ctx.lineTo(0, -s.size); ctx.lineTo(-s.size * 1.2, 0); ctx.lineTo(0, s.size); ctx.closePath(); ctx.fill();
        ctx.fillStyle = s.glow; ctx.beginPath(); ctx.arc(0, 0, s.size * .45, 0, TAU); ctx.fill();
      } else if (s.shape === 'meteor') {
        ctx.fillStyle = s.glow; ctx.beginPath(); ctx.arc(0, 0, s.size, 0, TAU); ctx.fill();
        ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(-s.size * .25, -s.size * .25, s.size * .55, 0, TAU); ctx.fill();
      } else {
        ctx.fillStyle = s.color; ctx.beginPath(); ctx.arc(0, 0, s.size, 0, TAU); ctx.fill();
        ctx.fillStyle = s.glow; ctx.beginPath(); ctx.arc(-s.size * .25, -s.size * .25, s.size * .5, 0, TAU); ctx.fill();
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }
}
