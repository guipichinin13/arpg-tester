# ARPG Mago — protótipo modular

Protótipo de Action RPG 2D com arquitetura modular para crescer sem concentrar tudo no `index.html`.

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
      │  ├─ particles.js
      │  ├─ save.js
      │  ├─ stats.js
      │  └─ talents.js
      └─ ui/
         └─ render.js
```

## Save / progressão

A build é salva automaticamente em `localStorage` com a chave `arpg_mago_save_v2`.

São persistidos:
- nível e XP
- classe escolhida
- talentos gerais aprendidos
- nós da árvore de classe aprendidos
- pontos totais de talento
- pontos disponíveis

Os pontos ganhos ao subir de nível também são salvos. Ao resetar, os pontos gastos voltam para o saldo total. Ao trocar de classe, os pontos gastos na árvore da classe anterior são devolvidos.

## Partículas

O combate usa `src/js/systems/particles.js`, separado da lógica de combate. Há efeitos próprios para ataque, fogo, explosão, raio, vazio, meteorito, dash, execução, sobrecarga e morte de inimigos.

## Como testar

Recomendado usar um servidor local:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Próximas extensões

A mesma estrutura permite adicionar novas classes, skill trees, equipamentos, efeitos de status, monstros, bosses, mapas, inventário, loot, save em arquivo e posteriormente migrar a lógica para uma engine.


## Correção de pontos
A renderização contínua do combate agora é separada da renderização dos menus. Isso evita recriar botões de talentos/classes a cada frame e permite clicar normalmente para distribuir pontos. Pontos de nível e compras de talentos são salvos automaticamente no localStorage.
