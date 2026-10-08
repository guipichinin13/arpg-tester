export const mapTiers = Array.from({length:20}, (_,i)=>{
  const tier=i+1;
  return {
    tier,
    name:`T${tier}`,
    enemyHpMultiplier:1+0.28*(tier-1),
    enemyDamageMultiplier:1+0.18*(tier-1),
    enemyMoveMultiplier:1+0.025*(tier-1),
    waveCount:10,
    baseMobs:10+Math.floor((tier-1)*1.5),
    bossMultiplier:2.8+0.15*(tier-1),
    currencySlots: tier>=3 ? 1+Math.floor((tier-3)/4) : 0,
  };
});
export function getMapTier(tier){ return mapTiers[Math.max(1,Math.min(20,tier))-1]; }
