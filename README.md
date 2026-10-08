# ARPG Mago — v9

Base modular do protótipo com progressão, Waves T1-T20 e árvore de talentos em grafo.

## Novo nesta versão
- Árvore de Mago abre em tela sobreposta ao jogo.
- Nós organizados em troncos esquerda / centro / direita.
- Pré-requisitos criam custo de travessia: começar em um lado e chegar ao outro exige comprar os nós intermediários.
- Mais nós e mais atributos na árvore geral.
- Botão para recomeçar o T atual.
- Botão de teste rápido do T2.
- HUD mostra tier, wave e progresso da wave.
- Waves e afixos continuam isolados em sistemas separados.

## Estrutura
index.html
src/
  css/style.css
  js/
    main.js
    input.js
    state.js
    data/
      classes.js
      maps.js
      monsterAffixes.js
      skills.js
      talents.js
    systems/
      combat.js
      floatingText.js
      particles.js
      projectiles.js
      save.js
      stats.js
      talents.js
      waves.js
    ui/render.js

## Controles
- WASD: mover
- Espaço: ataque básico
- 1/2: skills
- 3: Aura
- Shift: dash
- P: abrir/fechar árvore de talentos
- Mouse: direção das skills


## Correção v10
A inicialização agora é defensiva contra saves antigos/corrompidos, os limites do personagem usam o tamanho real do mapa e existe uma tela de erro caso algum módulo falhe no navegador. Para teste limpo, use o botão 'Limpar save e reiniciar' que aparece em caso de erro.


### Save temporariamente removido
O protótipo atual não usa localStorage, IndexedDB ou outro mecanismo de persistência. Toda a progressão é apenas durante a sessão. Um sistema de save será reintroduzido futuramente com uma arquitetura própria.
