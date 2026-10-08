# ARPG Mago — v7

Base modular do protótipo de Action RPG.

## Combate
- 2 skills da especialização + 1 Aura.
- Skills direcionadas pelo cursor.
- Projéteis reais com rastro, colisão e impacto.
- Monstros perseguem o jogador e possuem IA de ataque corpo a corpo ou à distância.
- Dano recebido tem telegraph, partículas, knockback e números de dano.

## Mapas
- Primeiro mapa ativo: **T1**.
- Estrutura preparada para **T1 até T20** em `src/js/data/maps.js`.
- Vida, dano e velocidade dos monstros escalam por tier sem misturar essa regra com o sistema de combate.

## Dano e atributos
- Os atributos da árvore de Mago alimentam diretamente o cálculo final das skills.
- `Poder Arcano`: +10% Poder Mágico por nível.
- O HUD mostra o Poder Mágico atual e as skills mostram o dano final calculado.
- Dano de especialização e Aura são aplicados depois do atributo global, deixando o cálculo previsível.

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
      maps.js
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
    ui/render.js
```


## Sistema de Waves / Tiers

O mapa atual é T1 e possui 10 Waves. As Waves 1–2 usam apenas monstros Normais. A partir da Wave 3, monstros Mágicos entram gradualmente; a partir da Wave 5, monstros Raros também aparecem. Mágicos recebem exatamente 1 Prefixo + 1 Sufixo (2 atributos) e Raros recebem 2 Prefixos + 2 Sufixos (4 atributos). A Wave 10 começa com mobs e, após 18 segundos, invoca o Boss.

A escalada T1–T20 continua isolada em `src/js/data/maps.js`. O sistema de Waves está em `src/js/systems/waves.js` e os afixos em `src/js/data/monsterAffixes.js`. `maps.js` já reserva `modifiers` e `currencySlots` para o futuro sistema de currency que poderá alterar mapas.
