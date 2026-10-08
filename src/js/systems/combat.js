import { classes } from '../data/classes.js';
import { skills } from '../data/skills.js';
import { getSkillStats, getDerivedStats } from './stats.js';
import { saveGame } from './save.js';
import { getSpecLevel, gainSkillPoints, toggleAura } from './talents.js';
import { getMapTier } from '../data/maps.js';

export class CombatSystem {
  constructor(state, logger, particles, projectiles, floatingText) { this.state=state;this.log=logger;this.particles=particles;this.projectiles=projectiles;this.floatingText=floatingText; }
  fxBurst(x,y,palette,options){this.particles?.burst(x,y,palette,options);}
  spawnEnemy(){
    const map=getMapTier(this.state.map.tier);
    const ranged=Math.random()<0.18;
    const maxHp=Math.round(80*map.enemyHpMultiplier*(0.90+Math.random()*0.20));
    const enemy={
      x:Math.random()*680+70,y:Math.random()*440+90,hp:maxHp,maxHp,
      type:ranged?'caster':'melee',
      burning:false,burnUntil:0,markedUntil:0,frozenUntil:0,stunnedUntil:0,
      moveSpeed:(ranged?42:56)*(0.95+Math.random()*0.14)*map.enemyMoveMultiplier,
      attackDamage:(ranged?8.5:7.5)*(0.92+Math.random()*0.16)*map.enemyDamageMultiplier,
      attackRange:ranged?250:44,
      attackCooldown:ranged?1700:900,
      attackTimer:400+Math.random()*700,
      attackWindup:0,
      attackWindupDuration:ranged?380:220,
    };
    this.state.enemies.push(enemy);
    this.fxBurst(enemy.x,enemy.y,ranged?['#8d76ff','#d2c1ff']:['#b9384f','#ff6179'],{count:7,speed:35,life:250,size:2});
  }
  getAimDirection(){
    const p=this.state.player,c=this.state.mouse;let dx=(c.inside?c.x:p.x+1)-p.x,dy=(c.inside?c.y:p.y)-p.y;
    if(Math.hypot(dx,dy)<4)dx=1;const len=Math.hypot(dx,dy)||1;return{x:dx/len,y:dy/len};
  }
  canCast(skill){const now=performance.now();if((this.state.cooldowns[skill.id]??0)>now)return false;const st=getSkillStats(this.state,skill);return this.state.player.mp>=st.manaCost;}
  spend(skill){const st=getSkillStats(this.state,skill);this.state.cooldowns[skill.id]=performance.now()+st.cooldown;this.state.player.mp=Math.max(0,this.state.player.mp-st.manaCost);}
  castSlot(index){
    if(index===2){
      if(!this.state.loadout.aura){this.log('✨ Escolha uma Aura no painel Skills.');return;}
      toggleAura(this.state);this.log(this.state.auraActive?'✨ Aura ativada.':'✨ Aura desativada.');return;
    }
    const id=this.state.loadout.skills[index];
    if(!id){this.log(`✨ Slot ${index+1} vazio. Escolha uma skill da sua especialização.`);return;}
    const skill=skills[id]; if(!skill||!this.state.selectedClass||skill.classId!==this.state.selectedClass)return;
    if(!this.canCast(skill))return; this.spend(skill); const st=getSkillStats(this.state,skill); const d=getDerivedStats(this.state); const dir=this.getAimDirection();
    const speedMap={fireball:480,meteor:420,flame_burst:520,lightning:900,storm_surge:650,thunderclap:500,void_lance:590,singularity:400,death_wave:470};
    const speed=(speedMap[id]??500)*st.projectileSpeed; const radiusMap={fireball:9,meteor:17,flame_burst:13,lightning:7,storm_surge:10,thunderclap:14,void_lance:9,singularity:16,death_wave:15};
    const pierce=id==='void_lance'||id==='death_wave'?Math.max(st.projectilePierce,d.voidPierce):st.projectilePierce;
    this.projectiles?.fire({from:this.state.player,direction:dir,skillId:id,speed,radius:radiusMap[id]??10,pierce,metadata:{sizeMultiplier:st.projectileSize},onHit:enemy=>this.applySkillImpact(enemy,skill,st)});
    this.fxBurst(this.state.player.x+dir.x*20,this.state.player.y+dir.y*20,['#ffffff',classes[this.state.selectedClass].accent],{count:5,speed:55,life:120,size:2});
  }
  basicAttack(){
    const skill=skills.basic;if(!this.canCast(skill))return;this.spend(skill);const st=getSkillStats(this.state,skill);const dir=this.getAimDirection();
    this.projectiles?.fire({from:this.state.player,direction:dir,skillId:'basic',speed:720*st.projectileSpeed,radius:7,pierce:st.projectilePierce,metadata:{sizeMultiplier:st.projectileSize},onHit:enemy=>this.damageEnemy(enemy,st.damage,skill)});
  }
  applySkillImpact(enemy,skill,stats){
    if(!enemy||enemy.hp<=0)return;const id=skill.id,d=getDerivedStats(this.state);this.damageEnemy(enemy,stats.damage,skill);
    if(skill.classId==='fire')this.applyFireImpact(enemy,skill,stats,d);
    if(skill.classId==='thunder')this.applyThunderImpact(enemy,skill,stats,d);
    if(skill.classId==='void')this.applyVoidImpact(enemy,skill,stats,d);
  }
  applyFireImpact(enemy,skill,stats,d){
    enemy.burning=true;enemy.burnUntil=performance.now()+d.burnDuration*1000;
    if(skill.id==='fireball'||skill.id==='flame_burst'||skill.id==='meteor'){
      const baseRadius=skill.id==='flame_burst'?105:skill.id==='meteor'?125:85;
      const radius=baseRadius*d.areaMultiplier;const mult=skill.id==='flame_burst'?.62:skill.id==='meteor'?.40:.48;
      this.particles?.ring(enemy.x,enemy.y,'#ff7336',30,radius*.45);
      this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<radius).slice(0,skill.id==='flame_burst'?6:4).forEach(o=>{this.damageEnemy(o,stats.damage*mult,skill,true);o.burning=true;o.burnUntil=performance.now()+d.burnDuration*1000;});
    }
  }
  applyThunderImpact(enemy,skill,stats,d){
    this.addCharge(35*d.chargeGain);
    if(skill.id==='lightning'||skill.id==='storm_surge')this.lightningChain(enemy,stats,d);
    if(skill.id==='thunderclap'){
      const r=95*d.areaMultiplier;this.particles?.ring(enemy.x,enemy.y,'#72d6ff',32,r*.45);
      this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<r).forEach(o=>this.damageEnemy(o,stats.damage*.42,skill,true));
    }
  }
  applyVoidImpact(enemy,skill,stats,d){
    enemy.markedUntil=performance.now()+d.markDuration*1000;
    if(enemy.hp>0&&enemy.hp<=enemy.maxHp*d.executeThreshold)this.execute(enemy);
    if(skill.id==='singularity'){
      const r=130*d.areaMultiplier;this.particles?.ring(enemy.x,enemy.y,'#a96cff',44,r*.42);
      this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<r).forEach(o=>this.damageEnemy(o,stats.damage*.50,skill,true));
    }
    if(skill.id==='death_wave'){
      const r=90*d.areaMultiplier;this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<r).forEach(o=>this.damageEnemy(o,stats.damage*.35,skill,true));
    }
  }
  lightningChain(source,stats,d){
    const max=d.lightningChain;if(!max)return;const hit=new Set([source]);let current=source;
    for(let i=0;i<max;i++){const next=this.state.enemies.filter(e=>e.hp>0&&!hit.has(e)).sort((a,b)=>Math.hypot(a.x-current.x,a.y-current.y)-Math.hypot(b.x-current.x,b.y-current.y))[0];if(!next||Math.hypot(next.x-current.x,next.y-current.y)>170)break;hit.add(next);this.particles?.beam(current.x,current.y,next.x,next.y,'#75cfff',180,3);this.damageEnemy(next,stats.damage*.45,skills.lightning,true);current=next;}
  }
  addCharge(amount){if(this.state.selectedClass!=='thunder')return;this.state.combat.charge=Math.min(100,this.state.combat.charge+amount);if(this.state.combat.charge>=100)this.overload();}
  damageEnemy(enemy,rawDamage,skill,secondary=false){
    if(!enemy||enemy.hp<=0)return;let damage=rawDamage;const d=getDerivedStats(this.state);const crit=Math.random()<d.critChance;if(crit)damage*=d.critDamage;
    if(enemy.burning&&skill.classId==='fire')damage*=1.05; if(enemy.markedUntil>performance.now())damage*=1.12;
    enemy.hp-=damage;
    this.floatingText?.show(enemy.x,enemy.y-24,`${crit?'💥 ':''}${Math.round(damage)}`,crit?'crit':'damage');
    this.fxBurst(enemy.x,enemy.y,crit?['#fff7b0','#ffe36e']:['#d7b7ff','#7d5cff'],{count:crit?12:6,speed:crit?70:35,life:180,size:crit?3:2});
    if(enemy.hp<=0)this.onKill(enemy);
    if(!secondary)this.log(`${crit?'💥 CRÍTICO! ':''}${skill.name} causou ${Math.round(damage)} dano.`);
  }
  execute(enemy){
    if(!enemy||enemy.hp<=0)return;const d=getDerivedStats(this.state);this.fxBurst(enemy.x,enemy.y,['#f7e8ff','#bd7cff','#551bc0'],{count:60,speed:230,life:650,size:4});enemy.hp=0;this.log('☠️ EXECUÇÃO — o Vazio devorou o inimigo.');
    if(getSpecLevel(this.state,'void_explosion')>0){const radius=100*d.area;this.state.enemies.filter(o=>o!==enemy&&o.hp>0&&Math.hypot(o.x-enemy.x,o.y-enemy.y)<radius).forEach(o=>this.damageEnemy(o,35*d.spellPower*d.voidDamage*d.executeExplosion,skills.void_lance,true));}
  }
  overload(){
    const p=this.state.player,d=getDerivedStats(this.state);this.state.combat.charge=0;const radius=210*d.overloadRadius,damage=85*d.spellPower*d.overloadDamage;
    this.fxBurst(p.x,p.y,['#fffbd0','#6fd5ff','#8c72ff'],{count:100,speed:280,life:900,size:4});this.particles?.ring(p.x,p.y,'#81d8ff',65,radius*.45);this.log('⚡ SOBRECARGA — tempestade divina liberada!');
    this.state.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-p.x,e.y-p.y)<radius).forEach(e=>this.damageEnemy(e,damage,skills.lightning,true));
    if(d.overloadCooldownRefund>0){const now=performance.now();for(const id of Object.keys(this.state.cooldowns))this.state.cooldowns[id]=Math.max(now,this.state.cooldowns[id]-500*d.overloadCooldownRefund);}
  }
  auraPulse(delta){
    if(!this.state.auraActive||!this.state.loadout.aura)return;const d=getDerivedStats(this.state);this.state.combat.auraPulseTimer-=delta;if(this.state.combat.auraPulseTimer>0)return;
    this.state.combat.auraPulseTimer=900;
    const p=this.state.player;const nearby=this.state.enemies.filter(e=>e.hp>0&&Math.hypot(e.x-p.x,e.y-p.y)<d.auraRadius);
    const aura=this.state.loadout.aura;
    if(this.state.selectedClass==='fire'){
      this.particles?.ring(p.x,p.y,'#ff7733',34,d.auraRadius*.35);
      if(aura==='hellfire'){nearby.forEach(e=>{this.damageEnemy(e,10*d.auraPulsePower,skills.fireball,true);e.burning=true;e.burnUntil=performance.now()+d.burnDuration*1000;});}
      if(d.auraIgnite)nearby.forEach(e=>{e.burning=true;e.burnUntil=performance.now()+d.burnDuration*1000;});
    }
    if(this.state.selectedClass==='thunder'){
      this.particles?.ring(p.x,p.y,'#73d7ff',34,d.auraRadius*.35);
      if(aura==='static_field')this.addCharge((d.auraCharge||10)*(1+getSpecLevel(this.state,'thunder_aura_charge')*.20));
      if(aura==='storm_crown'&&nearby[0])this.particles?.beam(p.x,p.y,nearby[0].x,nearby[0].y,'#83ddff',120,2);
      if(d.auraShock)nearby.forEach(e=>{e.stunnedUntil=performance.now()+450;});
    }
    if(this.state.selectedClass==='void'){
      this.particles?.ring(p.x,p.y,'#aa72ff',34,d.auraRadius*.35);
      if(d.auraMark||aura==='death_domain')nearby.forEach(e=>e.markedUntil=performance.now()+d.markDuration*1000);
      if(aura==='void_hunger')nearby.forEach(e=>this.damageEnemy(e,8*d.auraPulsePower,skills.void_lance,true));
    }
  }
  dash(){
    const skill=skills.dash;if(!this.canCast(skill))return;this.spend(skill);const p=this.state.player,before={x:p.x,y:p.y},dir=this.getAimDirection();const d=getDerivedStats(this.state);const distance=95*d.moveSpeed;
    p.x=Math.max(30,Math.min(760,p.x+dir.x*distance));p.y=Math.max(70,Math.min(540,p.y+dir.y*distance));
    this.fxBurst(before.x,before.y,['#b98cff','#6c48ff'],{count:25,speed:80,life:350,size:2.8});this.fxBurst(p.x,p.y,['#f0d8ff','#8a5cff'],{count:35,speed:130,life:450,size:3});
  }
  onKill(enemy){
    this.fxBurst(enemy.x,enemy.y,['#ff5f79','#c93655'],{count:28,speed:150,life:500,size:3});this.state.player.xp+=10;
    while(this.state.player.xp>=100){this.state.player.xp-=100;this.state.player.level+=1;gainSkillPoints(this.state);this.log(`⬆️ Nível ${this.state.player.level}! +1 Ponto de Mago +1 Ponto de Especialização.`);}
    saveGame(this.state);
  }
  enemyAttack(enemy, dist, dx, dy){
    const p=this.state.player;
    if(enemy.attackWindup>0) return;
    if(enemy.attackTimer>0) return;
    const inRange=dist<=enemy.attackRange;
    if(!inRange) return;
    enemy.attackWindup=enemy.attackWindupDuration;
    enemy.attackTargetX=p.x; enemy.attackTargetY=p.y;
    this.fxBurst(enemy.x,enemy.y,enemy.type==='caster'?['#b79aff','#7c57ff']:['#ff6a7d','#b92542'],{count:enemy.type==='caster'?10:7,speed:25,life:180,size:2.4});
  }

  resolveEnemyHit(enemy){
    const p=this.state.player,d=getDerivedStats(this.state);
    const damage=Math.max(1,enemy.attackDamage*(1-d.damageReduction));
    p.hp-=damage;
    this.floatingText?.show(p.x,p.y-28,`-${Math.round(damage)}`,'player-hit');
    if(enemy.type==='caster')this.particles?.beam(enemy.x,enemy.y,p.x,p.y,'#bd7cff',220,4);
    else {
      this.fxBurst(p.x,p.y,['#ff7385','#ff334f'],{count:18,speed:105,life:300,size:3});
      const len=Math.hypot(enemy.x-p.x,enemy.y-p.y)||1;
      p.x=Math.max(30,Math.min(760,p.x-(enemy.x-p.x)/len*10));
      p.y=Math.max(70,Math.min(540,p.y-(enemy.y-p.y)/len*10));
    }
    if(performance.now()-this.state.combat.lastPlayerHitAt>600){
      this.state.combat.lastPlayerHitAt=performance.now();
      this.log(`🩸 Você sofreu ${Math.round(damage)} de dano.`);
    }
    enemy.attackTimer=enemy.attackCooldown;
  }

  update(delta){
    const p=this.state.player,d=getDerivedStats(this.state),dt=delta/1000,now=performance.now();
    const speed=175*d.moveSpeed;if(this.state.keys.has('w'))p.y-=speed*dt;if(this.state.keys.has('s'))p.y+=speed*dt;if(this.state.keys.has('a'))p.x-=speed*dt;if(this.state.keys.has('d'))p.x+=speed*dt;
    p.x=Math.max(30,Math.min(760,p.x));p.y=Math.max(70,Math.min(540,p.y));p.maxMp=d.maxMana;p.mp=Math.min(p.maxMp,p.mp+dt*12*d.manaRegen);this.auraPulse(delta);

    for(const enemy of this.state.enemies){
      if(enemy.hp<=0)continue;
      if(enemy.burning&&now>enemy.burnUntil)enemy.burning=false;
      if(enemy.markedUntil&&now>enemy.markedUntil)enemy.markedUntil=0;
      enemy.attackTimer=Math.max(0,enemy.attackTimer-delta);
      const dx=p.x-enemy.x,dy=p.y-enemy.y,dist=Math.hypot(dx,dy)||1;
      const stunned=enemy.stunnedUntil>now;

      if(enemy.attackWindup>0){
        enemy.attackWindup-=delta;
        if(enemy.attackWindup<=0&&!stunned){
          const targetDx=p.x-enemy.x,targetDy=p.y-enemy.y,targetDist=Math.hypot(targetDx,targetDy)||1;
          if(enemy.type==='caster'||targetDist<=enemy.attackRange+12)this.resolveEnemyHit(enemy);
          else enemy.attackTimer=220;
        }
        continue;
      }

      if(!stunned){
        const keepDistance=enemy.type==='caster'?145:0;
        if(dist>enemy.attackRange-8 || (enemy.type==='caster'&&dist<keepDistance)){
          enemy.x+=dx/dist*enemy.moveSpeed*dt;
          enemy.y+=dy/dist*enemy.moveSpeed*dt;
        }
        this.enemyAttack(enemy,dist,dx,dy);
      }
    }

    if(p.hp<=0){p.hp=p.maxHp;p.mp=p.maxMp;this.fxBurst(p.x,p.y,['#ffffff','#8d7bff'],{count:35,speed:130,life:500,size:3});this.log('💀 Você caiu no mapa. O personagem foi restaurado para continuar o teste.');}
    this.state.enemies=this.state.enemies.filter(e=>e.hp>0);while(this.state.enemies.length<5)this.spawnEnemy();
  }
}
