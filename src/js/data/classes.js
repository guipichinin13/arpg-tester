export const classes = {
  fire: {
    id: 'fire', name: 'Senhor do Fogo', icon: '🔥',
    description: 'Explosões, queimaduras e dano crescente.',
    accent: '#ff7a32',
    skillNodes: [
      { id: 'fire_damage', name: 'Poder Ígneo', skill: 'fireball', stat: 'fireDamagePct', perLevel: 0.12, maxLevel: 5, description: '+12% dano da Bola de Fogo por nível.' },
      { id: 'fire_burn', name: 'Combustão', skill: 'fireball', stat: 'burnDuration', perLevel: 1.2, maxLevel: 4, description: '+1,2s de queimadura por nível.' },
      { id: 'fire_explosion', name: 'Explosão Ígnea', skill: 'fireball', stat: 'explosionRadiusPct', perLevel: 0.20, maxLevel: 4, description: '+20% raio da explosão por nível.' },
      { id: 'fire_explosion_dmg', name: 'Núcleo Explosivo', skill: 'fireball', stat: 'explosionDamagePct', perLevel: 0.15, maxLevel: 4, description: '+15% dano da explosão por nível.' },
      { id: 'fire_meteor', name: 'Meteorito Infernal', skill: 'meteor', stat: 'meteorDamagePct', perLevel: 0.14, maxLevel: 5, description: '+14% dano do Meteorito por nível.' },
      { id: 'fire_spread', name: 'Chamas Famintas', skill: 'fireball', stat: 'fireSpread', perLevel: 1, maxLevel: 3, description: '+1 alvo atingido pela explosão.' },
    ],
  },
  thunder: {
    id: 'thunder', name: 'Deus do Trovão', icon: '⚡',
    description: 'Velocidade, ricochete e Carga Elétrica.',
    accent: '#71d7ff',
    skillNodes: [
      { id: 'thunder_damage', name: 'Fúria Celeste', skill: 'lightning', stat: 'lightningDamagePct', perLevel: 0.12, maxLevel: 5, description: '+12% dano do Raio por nível.' },
      { id: 'thunder_chain', name: 'Condutor', skill: 'lightning', stat: 'lightningChain', perLevel: 1, maxLevel: 3, description: '+1 ricochete do Raio por nível.' },
      { id: 'thunder_charge', name: 'Acúmulo', skill: 'lightning', stat: 'chargeGainPct', perLevel: 0.15, maxLevel: 4, description: '+15% Carga gerada por nível.' },
      { id: 'thunder_overload', name: 'Sobrecarga', skill: 'lightning', stat: 'overloadDamagePct', perLevel: 0.20, maxLevel: 4, description: '+20% dano da Sobrecarga por nível.' },
      { id: 'thunder_radius', name: 'Céu em Chamas', skill: 'lightning', stat: 'overloadRadiusPct', perLevel: 0.20, maxLevel: 3, description: '+20% área da Sobrecarga por nível.' },
      { id: 'thunder_recharge', name: 'Tempestade Divina', skill: 'lightning', stat: 'overloadCooldownRefund', perLevel: 0.10, maxLevel: 3, description: 'Sobrecarga recupera 10% dos cooldowns por nível.' },
    ],
  },
  void: {
    id: 'void', name: 'Void Mage', icon: '☠️',
    description: 'Marca da morte, execução e dano de Vazio.',
    accent: '#b58cff',
    skillNodes: [
      { id: 'void_damage', name: 'Poder do Vazio', skill: 'void_lance', stat: 'voidDamagePct', perLevel: 0.13, maxLevel: 5, description: '+13% dano da Lança do Vazio por nível.' },
      { id: 'void_mark', name: 'Marca da Morte', skill: 'void_lance', stat: 'markDuration', perLevel: 2, maxLevel: 4, description: '+2s de duração da Marca por nível.' },
      { id: 'void_execute', name: 'Ceifador', skill: 'void_lance', stat: 'executeThreshold', perLevel: 0.04, maxLevel: 4, description: '+4% da vida máxima no limite de execução.' },
      { id: 'void_explosion', name: 'Fim do Vazio', skill: 'void_lance', stat: 'executeExplosionPct', perLevel: 0.25, maxLevel: 4, description: '+25% dano da explosão de execução por nível.' },
      { id: 'void_pierce', name: 'Lança Abissal', skill: 'void_lance', stat: 'voidPierce', perLevel: 1, maxLevel: 3, description: '+1 inimigo atravessado pela Lança por nível.' },
      { id: 'void_singularity', name: 'Singularidade', skill: 'meteor', stat: 'voidMeteorRadiusPct', perLevel: 0.25, maxLevel: 3, description: 'Meteorito vira Singularidade: +25% área por nível.' },
    ],
  },
};
