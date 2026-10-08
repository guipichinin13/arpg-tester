# ARPG Mago — v6

Protótipo modular em HTML/CSS/JavaScript puro, pensado para evoluir por sistemas sem concentrar lógica no `index.html`.

## Progressão
- O personagem escolhe uma única especialização: Senhor do Fogo, Deus do Trovão ou Void Mage.
- A cada nível, recebe +1 Ponto de Skill de Mago e, depois de escolher a classe, +1 Ponto de Skill da Especialização.
- Cada upgrade custa 1 ponto e é salvo em `localStorage`.

## Loadout
- 3 slots de combate: Skill 1, Skill 2 e Aura.
- Depois de escolher a classe, apenas skills do elemento da especialização ficam disponíveis.
- As duas skills precisam ser escolhidas pelo jogador.
- A Aura ocupa o terceiro slot e pode ser trocada entre as opções da especialização.
- `1` e `2` lançam as skills; `3` ativa/desativa a Aura.
- Todas as skills seguem o cursor do mouse.
- Ataque básico continua no `Espaço` e não ocupa os 3 slots.

## Árvores
- Árvore de Mago: dano, mana, crítico, cooldown, projétil, penetração etc.
- Árvore da Especialização: upgrades das skills e uma seção exclusiva de upgrades da Aura.
- Nós de Aura podem aumentar potência, raio, pulsos, defesa ou modificar diretamente o comportamento da Aura.

## Estrutura
```text
index.html
src/
  css/style.css
  js/
    main.js
    input.js
    state.js
    data/
      classes.js
      skills.js
      talents.js
    systems/
      combat.js
      particles.js
      projectiles.js
      save.js
      stats.js
      talents.js
    ui/render.js
```

## Execução
Abra com Live Server no VS Code ou sirva a pasta por um servidor local. O projeto usa ES Modules e não exige build step.
