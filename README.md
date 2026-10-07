# ARPG Mago — protótipo modular v5

## Rodar
Abra a pasta no VS Code e use um servidor local (Live Server) ou Python:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Progressão
- Um personagem escolhe apenas uma especialização: Senhor do Fogo, Deus do Trovão ou Void Mage.
- Cada nível concede 1 Ponto de Skill de Mago + 1 Ponto de Skill da especialização escolhida.
- Cada upgrade custa exatamente 1 ponto.
- Pontos e upgrades são salvos em `localStorage`.
- A árvore geral fica em `src/js/data/talents.js`.
- As árvores das especializações ficam em `src/js/data/classes.js`.

## Mira
As skills são lançadas na direção do cursor dentro da arena. O projétil nasce no mago, viaja pelo cenário e aplica o efeito no impacto.

## Estrutura
- `src/js/state.js` — estado do jogo
- `src/js/input.js` — teclado + mouse
- `src/js/data/` — classes, skills e árvores
- `src/js/systems/combat.js` — combate, dano e progressão
- `src/js/systems/projectiles.js` — projéteis
- `src/js/systems/particles.js` — partículas
- `src/js/systems/talents.js` — compras/reembolsos
- `src/js/systems/stats.js` — cálculo de atributos
- `src/js/systems/save.js` — persistência
- `src/js/ui/render.js` — interface
- `src/css/style.css` — visual
