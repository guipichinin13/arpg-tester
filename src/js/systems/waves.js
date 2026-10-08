import { getMapTier } from '../data/maps.js';
import { rollAffixes, applyAffixes } from '../data/monsterAffixes.js';

export class WaveSystem {
  constructor(state, combat, logger){this.state=state;this.combat=combat;this.log=logger;this.spawnDelay=0;this.bossTimer=0;this.beginTier(1);}
  beginTier(tier){
    const safe=Math.max(1,Math.min(20,tier));
    const map=getMapTier(safe);this.state.map.tier=safe;
    this.state.enemies.length=0;
    this.state.wave={current:1,status:'spawning',spawned:0,total:0,defeated:0,spawnTimer:0,intermissionTimer:0,elapsed:0,bossSpawned:false,bossDefeated:false,completed:false};
    this.configureWave();
    this.log(`🗺️ ${map.name} iniciado — sobreviva às 10 Waves.`);
  }
  restartTier(){this.beginTier(this.state.map.tier);}
  testTier(tier){this.beginTier(tier);}
  configureWave(){
    const map=getMapTier(this.state.map.tier),w=this.state.wave.current;
    this.state.wave.total=map.baseMobs + Math.floor((w-1)*1.7) + Math.floor(this.state.map.tier*0.35);
    this.state.wave.spawned=0;this.state.wave.defeated=0;this.state.wave.spawnTimer=250;this.state.wave.elapsed=0;this.state.wave.bossSpawned=false;this.state.wave.bossDefeated=false;this.state.wave.status='spawning';this.bossTimer=18000;
    this.log(`🌊 Wave ${w}/10 — ${this.state.wave.total} monstros detectados.`);
  }
  rarityForWave(){
    const w=this.state.wave.current;if(w<=2)return 'normal';
    const magicChance=Math.min(0.58,0.10+(w-2)*0.07);
    const rareChance=w<5?0:Math.min(0.30,(w-4)*0.045);
    const r=Math.random();
    if(r<rareChance)return 'rare';
    if(r<rareChance+magicChance)return 'magic';
    return 'normal';
  }
  spawnOne(){
    const rarity=this.rarityForWave();
    const e=this.combat.spawnEnemy({rarity,sourceWave:this.state.wave.current,affixes:rollAffixes(rarity)});
    if(e){applyAffixes(e,e.rolledAffixes||[]);this.state.wave.spawned++;}
  }
  spawnBoss(){
    if(this.state.wave.bossSpawned)return;
    const map=getMapTier(this.state.map.tier),e=this.combat.spawnEnemy({rarity:'boss',isBoss:true,sourceWave:10,affixes:[]});
    if(e){e.maxHp*=map.bossMultiplier;e.hp=e.maxHp;e.attackDamage*=1.55;e.moveSpeed*=1.10;e.name=`Guardião T${this.state.map.tier}`;e.displayName=e.name;this.state.wave.bossSpawned=true;this.log(`👑 BOSS — ${e.name} entrou no mapa!`);}
  }
  update(delta){
    const w=this.state.wave;if(w.completed)return;
    w.elapsed+=delta;
    if(w.status==='spawning'){
      w.spawnTimer-=delta;
      if(w.spawned<w.total&&w.spawnTimer<=0){this.spawnOne();w.spawnTimer=260-Math.min(120,this.state.map.tier*3);}
      if(w.spawned>=w.total){w.status='fighting';}
    } else if(w.status==='fighting'){
      if(this.state.enemies.length===0){
        if(w.current===10&&!w.bossSpawned&&w.elapsed>=18000)this.spawnBoss();
        else if(w.current===10&&w.bossSpawned){w.status='completed';w.completed=true;this.log(`🏆 T${this.state.map.tier} concluído!`);}
        else {w.status='intermission';w.intermissionTimer=3000;this.log(`✅ Wave ${w.current} limpa.`);}
      } else if(w.current===10&&!w.bossSpawned&&w.elapsed>=18000){this.spawnBoss();}
    } else if(w.status==='intermission'){
      w.intermissionTimer-=delta;if(w.intermissionTimer<=0){w.current++;this.configureWave();}
    }
  }
}
