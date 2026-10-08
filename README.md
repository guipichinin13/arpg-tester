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
