const TAU = Math.PI * 2;
const STYLES = {
  basic:        { color: '#f2f0ff', glow: '#a78bfa', size: 5, trail: '#b9a7ff', shape: 'orb' },
  fireball:     { color: '#fff3ad', glow: '#ff6a2d', size: 10, trail: '#ff7a32', shape: 'fire' },
  meteor:       { color: '#fff2ad', glow: '#ff572d', size: 15, trail: '#ff7a32', shape: 'meteor' },
  flame_burst:  { color: '#fff1b0', glow: '#ff3f18', size: 13, trail: '#ff6a2d', shape: 'fire' },
  lightning:    { color: '#fffbd0', glow: '#55c7ff', size: 7, trail: '#70c8ff', shape: 'bolt' },
  storm_surge:  { color: '#e4fbff', glow: '#36baff', size: 11, trail: '#6ad7ff', shape: 'bolt' },
  thunderclap:  { color: '#ffffff', glow: '#72d5ff', size: 14, trail: '#76e3ff', shape: 'bolt' },
  void_lance:   { color: '#f6dcff', glow: '#8c42ff', size: 9, trail: '#713fc7', shape: 'void' },
  singularity:  { color: '#fff1ff', glow: '#a95bff', size: 15, trail: '#6b2ee8', shape: 'void' },
  death_wave:   { color: '#ead5ff', glow: '#6e3bcd', size: 13, trail: '#8f5cff', shape: 'void_wave' },
};

export class ProjectileSystem {
  constructor(container, particles) {
    this.container = container;
    this.particles = particles;
    this.projectiles = [];
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'projectiles-layer';
    this.ctx = this.canvas.getContext('2d');
    this.resize(); container.appendChild(this.canvas);
    window.addEventListener('resize', () => this.resize());
  }
  resize() {
    const rect = this.container.getBoundingClientRect(); const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width; this.height = rect.height;
    this.canvas.width = Math.round(rect.width * dpr); this.canvas.height = Math.round(rect.height * dpr);
    this.canvas.style.width = `${rect.width}px`; this.canvas.style.height = `${rect.height}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  fire({ from, direction, skillId, speed = 420, radius = 10, pierce = 0, onHit, metadata = {} }) {
    const style = STYLES[skillId] ?? STYLES.basic; const len = Math.hypot(direction.x, direction.y) || 1;
    const dx = direction.x / len; const dy = direction.y / len;
    const start = { x: from.x + dx * 18, y: from.y + dy * 18 };
    this.projectiles.push({ x:start.x, y:start.y, prevX:start.x, prevY:start.y, dx, dy, speed,
      life: 2200, age: 0, skillId, style, radius: Math.max(7, radius), pierceLeft: Math.max(0,pierce),
      hitIds:new Set(), onHit, metadata, spin: Math.random()*TAU });
    this.particles?.burst(start.x,start.y,[style.color,style.glow],{count:8,speed:40,life:150,size:2.2});
  }
  update(delta, enemies=[]) {
    const dt=delta/1000, keep=[];
    for(const p of this.projectiles){
      p.age+=delta; p.life-=delta; if(p.life<=0) continue;
      p.prevX=p.x; p.prevY=p.y; const step=p.speed*dt; p.x+=p.dx*step; p.y+=p.dy*step; p.spin+=delta*.012;
      this.particles?.emit({x:p.x,y:p.y,color:p.style.trail,count:p.skillId==='meteor'?4:2,speed:p.skillId==='meteor'?30:18,size:Math.max(1.2,p.style.size*.28),life:p.skillId==='meteor'?250:150,gravity:p.skillId==='meteor'?35:0});
      let remove=false;
      for(const enemy of enemies){
        if(!enemy || enemy.hp<=0 || p.hitIds.has(enemy)) continue;
        if(Math.hypot(enemy.x-p.x,enemy.y-p.y)<=p.radius+18){
          p.hitIds.add(enemy); p.onHit?.(enemy); this.impactFx(enemy.x,enemy.y,p.style,p.skillId);
          if(p.pierceLeft>0) p.pierceLeft-=1; else {remove=true;break;}
        }
      }
      if(p.x<-100||p.x>this.width+100||p.y<-100||p.y>this.height+100) remove=true;
      if(!remove) keep.push(p);
    }
    this.projectiles=keep;
  }
  impactFx(x,y,style,skillId){
    this.particles?.burst(x,y,[style.color,style.glow],{count:skillId==='meteor'?42:skillId==='singularity'?34:18,speed:skillId==='meteor'?190:105,life:skillId==='meteor'?620:320,gravity:skillId==='meteor'?90:0,size:skillId==='meteor'?3.8:2.8});
    this.particles?.ring(x,y,style.glow,skillId==='meteor'?34:16,skillId==='meteor'?42:24);
  }
  render(){
    const ctx=this.ctx; ctx.clearRect(0,0,this.width,this.height);
    for(const p of this.projectiles){
      const s=p.style; const scale=p.metadata?.sizeMultiplier??1;
      ctx.save(); ctx.lineCap='round'; ctx.globalAlpha=Math.min(1,p.life/160); ctx.shadowBlur=24; ctx.shadowColor=s.glow;
      ctx.strokeStyle=s.trail; ctx.lineWidth=Math.max(2,s.size*.9); ctx.beginPath(); ctx.moveTo(p.prevX,p.prevY);ctx.lineTo(p.x,p.y);ctx.stroke();
      ctx.translate(p.x,p.y);ctx.rotate(Math.atan2(p.dy,p.dx));ctx.scale(scale,scale);
      if(s.shape==='fire'){
        ctx.fillStyle=s.glow;ctx.beginPath();ctx.moveTo(s.size*1.8,0);ctx.quadraticCurveTo(-s.size*.2,-s.size*.95,-s.size*1.25,0);ctx.quadraticCurveTo(-s.size*.2,s.size*.95,s.size*1.8,0);ctx.fill();
        ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(-s.size*.18,0,s.size*.52,0,TAU);ctx.fill();
      } else if(s.shape==='bolt'){
        ctx.strokeStyle=s.color;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-s.size*1.7,0);ctx.lineTo(-s.size*.5,-s.size*.9);ctx.lineTo(0,s.size*.15);ctx.lineTo(s.size*1.7,-s.size);ctx.stroke();
      } else if(s.shape==='void_wave'){
        ctx.fillStyle=s.glow;ctx.beginPath();ctx.moveTo(s.size*1.8,0);ctx.quadraticCurveTo(0,-s.size*1.2,-s.size*1.2,0);ctx.quadraticCurveTo(0,s.size*1.2,s.size*1.8,0);ctx.fill();
        ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(s.size*.15,0,s.size*.42,0,TAU);ctx.fill();
      } else if(s.shape==='void'){
        ctx.fillStyle=s.color;ctx.beginPath();ctx.moveTo(s.size*1.9,0);ctx.lineTo(0,-s.size);ctx.lineTo(-s.size*1.2,0);ctx.lineTo(0,s.size);ctx.closePath();ctx.fill();
        ctx.fillStyle=s.glow;ctx.beginPath();ctx.arc(0,0,s.size*.45,0,TAU);ctx.fill();
      } else if(s.shape==='meteor'){
        ctx.fillStyle=s.glow;ctx.beginPath();ctx.arc(0,0,s.size,0,TAU);ctx.fill();ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(-s.size*.25,-s.size*.25,s.size*.55,0,TAU);ctx.fill();
      } else { ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(0,0,s.size,0,TAU);ctx.fill();ctx.fillStyle=s.glow;ctx.beginPath();ctx.arc(-s.size*.25,-s.size*.25,s.size*.5,0,TAU);ctx.fill(); }
      ctx.restore();
    }
    ctx.globalAlpha=1;
  }
}
