# ARPG Mago — protótipo modular

A ideia desta versão é não concentrar o jogo em um único `index.html`.

## Estrutura

```text
arpg_mago/
├─ index.html
├─ README.md
└─ src/
   ├─ css/
   │  └─ style.css
   └─ js/
      ├─ main.js
      ├─ state.js
      ├─ input.js
      ├─ data/
      │  ├─ classes.js
      │  ├─ talents.js
      │  └─ skills.js
      ├─ systems/
      │  ├─ combat.js
      │  ├─ stats.js
      │  └─ talents.js
      └─ ui/
         └─ render.js
```

## Como testar

Abra `index.html` em um navegador moderno. Como o projeto usa ES Modules, um servidor local simples é recomendado:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Próximas extensões

A arquitetura já separa dados e sistemas para podermos adicionar novas classes, habilidades, equipamentos, efeitos, monstros, bosses, mapas, save/load e futuramente migrar a mesma lógica para uma engine.
