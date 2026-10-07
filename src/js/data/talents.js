export const talents = [
  { id: 'fire1', name: '🔥 Faísca', cost: 1, description: '+10% dano de fogo.', tags: ['fire'] },
  { id: 'fire2', name: '🔥 Combustão', cost: 1, description: 'Bola de Fogo aplica queimadura.', requires: ['fire1'], tags: ['fire'] },
  { id: 'fire3', name: '🔥 Inferno', cost: 2, description: '+25% dano contra queimados.', requires: ['fire2'], tags: ['fire'] },
  { id: 'fire4', name: '💥 Explosão Ígnea', cost: 2, description: 'Bola de Fogo explode em área.', requires: ['fire1'], tags: ['fire'] },

  { id: 'ice1', name: '❄️ Cristal', cost: 1, description: '+15% duração de controle.', tags: ['ice'] },
  { id: 'ice2', name: '❄️ Congelamento', cost: 2, description: 'Inimigos muito lentos podem congelar.', requires: ['ice1'], tags: ['ice'] },
  { id: 'ice3', name: '🧊 Prisão de Gelo', cost: 2, description: 'Nova cria zona de controle.', requires: ['ice2'], tags: ['ice'] },

  { id: 'shadow1', name: '🌑 Passo Sombrio', cost: 1, description: '+15% velocidade e dash.', tags: ['shadow'] },
  { id: 'shadow2', name: '🎯 Predador', cost: 1, description: '+15% crítico.', requires: ['shadow1'], tags: ['shadow'] },
  { id: 'shadow3', name: '☠️ Execução', cost: 2, description: '+30% dano contra inimigos com pouca vida.', requires: ['shadow2'], tags: ['shadow'] },

  { id: 'arcane1', name: '🔮 Condensação', cost: 1, description: '+20% regeneração de mana.', tags: ['arcane'] },
  { id: 'arcane2', name: '⌛ Fluxo Arcano', cost: 2, description: '-10% cooldown das skills.', requires: ['arcane1'], tags: ['arcane'] },
  { id: 'arcane3', name: '⚡ Sobrecarga', cost: 2, description: 'Após usar uma skill, a próxima recebe +40% dano.', requires: ['arcane2'], tags: ['arcane'] },

  { id: 'blood1', name: '🩸 Sede', cost: 1, description: 'Ataques recuperam vida.', tags: ['blood'] },
  { id: 'blood2', name: '🩸 Frenesi', cost: 2, description: 'Dano aumenta quando o HP está baixo.', requires: ['blood1'], tags: ['blood'] },
  { id: 'blood3', name: '💀 Carnificina', cost: 2, description: 'Abates podem iniciar execução em cadeia.', requires: ['blood2'], tags: ['blood'] },

  { id: 'hybridFireShadow', name: '🔥🌑 Chama Sombria', cost: 3, description: 'Fogo ganha chance de crítico.', requires: ['fire1', 'shadow1'], tags: ['fire', 'shadow'] },
  { id: 'hybridIceArcane', name: '❄️🔮 Tempestade Arcana', cost: 3, description: 'Controle reduz cooldowns.', requires: ['ice1', 'arcane1'], tags: ['ice', 'arcane'] },
  { id: 'hybridBloodFire', name: '🩸🔥 Sangue em Chamas', cost: 3, description: 'Fogo aumenta quando HP está baixo.', requires: ['blood1', 'fire1'], tags: ['blood', 'fire'] },
  { id: 'hybridShadowArcane', name: '🌑🔮 Voidwalker', cost: 3, description: 'Dash Sombrio restaura mana.', requires: ['shadow1', 'arcane1'], tags: ['shadow', 'arcane'] },
];
