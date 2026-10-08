export const prefixes = [
  {id:'brutal',name:'Brutal',desc:'+30% dano',apply:e=>{e.attackDamage*=1.30;}},
  {id:'fortified',name:'Fortificado',desc:'+45% vida',apply:e=>{e.maxHp*=1.45;e.hp=e.maxHp;}},
  {id:'swift',name:'Veloz',desc:'+28% velocidade',apply:e=>{e.moveSpeed*=1.28;e.attackCooldown*=0.88;}},
  {id:'arcane',name:'Arcano',desc:'+35% alcance',apply:e=>{e.attackRange*=1.35;}},
  {id:'frenzied',name:'Frenético',desc:'+25% velocidade de ataque',apply:e=>{e.attackCooldown*=0.75;}},
  {id:'regenerating',name:'Regenerador',desc:'regenera vida lentamente',apply:e=>{e.regenPerSecond=(e.maxHp*0.018);}},
];
export const suffixes = [
  {id:'of_thorns',name:'dos Espinhos',desc:'reflete 12% do dano',apply:e=>{e.thorns=0.12;}},
  {id:'of_vampirism',name:'Vampírico',desc:'cura 8% do dano',apply:e=>{e.vampirism=0.08;}},
  {id:'of_hunger',name:'da Fome',desc:'+18% dano quando perto da morte',apply:e=>{e.lowHpDamage=0.18;}},
  {id:'of_barriers',name:'das Barreiras',desc:'reduz dano recebido em 15%',apply:e=>{e.damageReduction=0.15;}},
  {id:'of_embers',name:'das Brasas',desc:'pode aplicar queimadura no ataque',apply:e=>{e.embers=true;}},
  {id:'of_shock',name:'do Choque',desc:'ataques podem atordoar',apply:e=>{e.shockChance=0.18;}},
];
function pickDifferent(list,count){
  const pool=[...list],out=[];while(out.length<count&&pool.length){const i=Math.floor(Math.random()*pool.length);out.push(pool.splice(i,1)[0]);}return out;
}
export function rollAffixes(rarity){
  if(rarity==='normal') return [];
  if(rarity==='magic') return [...pickDifferent(prefixes,1),...pickDifferent(suffixes,1)];
  return [...pickDifferent(prefixes,2),...pickDifferent(suffixes,2)];
}
export function applyAffixes(enemy, affixes){
  enemy.affixIds=[];enemy.prefixes=[];enemy.suffixes=[];
  for(const a of affixes){a.apply(enemy);enemy.affixIds.push(a.id);if(prefixes.some(p=>p.id===a.id))enemy.prefixes.push(a.name);else enemy.suffixes.push(a.name);}
  enemy.displayName=[...enemy.prefixes,...enemy.suffixes].join(' ');
}
