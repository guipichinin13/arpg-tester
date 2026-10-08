export const MAP_TIERS = Array.from({ length: 20 }, (_, index) => {
  const tier = index + 1;
  const hpMultiplier = Math.pow(1.18, tier - 1);
  const damageMultiplier = Math.pow(1.14, tier - 1);
  const moveMultiplier = 1 + (tier - 1) * 0.012;
  return {
    tier,
    name: `Mapa T${tier}`,
    enemyHpMultiplier: hpMultiplier,
    enemyDamageMultiplier: damageMultiplier,
    enemyMoveMultiplier: moveMultiplier,
    // Reservado para o futuro sistema de currency/modificadores de mapa.
    modifiers: [],
    currencySlots: 0,
  };
});

export function getMapTier(tier = 1) {
  const safeTier = Math.max(1, Math.min(20, Number(tier) || 1));
  return MAP_TIERS[safeTier - 1];
}
