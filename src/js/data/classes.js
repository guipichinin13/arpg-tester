export const classes = {
  fire: {
    id: 'fire',
    name: 'Senhor do Fogo',
    icon: '🔥',
    description: 'Queimaduras, explosões e dano crescente.',
    primarySkill: 'fireball',
    tree: [
      { id: 'fire_class_1', name: 'Coração das Chamas', cost: 1, description: 'Queimaduras duram +2s.' },
      { id: 'fire_class_2', name: 'Combustão Total', cost: 2, description: 'Inimigos queimando recebem +20% dano.', requires: ['fire_class_1'] },
      { id: 'fire_class_3', name: 'Cataclismo', cost: 3, description: 'Explosões têm mais área e dano.', requires: ['fire_class_2'] },
    ],
  },
  thunder: {
    id: 'thunder',
    name: 'Deus do Trovão',
    icon: '⚡',
    description: 'Burst, velocidade e Carga Elétrica.',
    primarySkill: 'lightning',
    tree: [
      { id: 'thunder_class_1', name: 'Carga', cost: 1, description: 'Skills elétricas geram Carga.' },
      { id: 'thunder_class_2', name: 'Sobrecarga', cost: 2, description: '100 Carga libera uma descarga em área.', requires: ['thunder_class_1'] },
      { id: 'thunder_class_3', name: 'Tempestade Divina', cost: 3, description: 'Ao sobrecarregar, reduz cooldowns.', requires: ['thunder_class_2'] },
    ],
  },
  void: {
    id: 'void',
    name: 'Void Mage',
    icon: '☠️',
    description: 'Vazio, execução e dano de morte.',
    primarySkill: 'void_lance',
    tree: [
      { id: 'void_class_1', name: 'Marca da Morte', cost: 1, description: 'Inimigos marcados sofrem +15% dano.' },
      { id: 'void_class_2', name: 'Devorar', cost: 2, description: 'Dano aumenta contra inimigos com pouca vida.', requires: ['void_class_1'] },
      { id: 'void_class_3', name: 'Fim do Vazio', cost: 3, description: 'Execuções causam explosão de vazio.', requires: ['void_class_2'] },
    ],
  },
};
