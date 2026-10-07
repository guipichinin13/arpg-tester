import { classes } from '../data/classes.js';
import { talents } from '../data/talents.js';
import { skills } from '../data/skills.js';
import { requirementsMet, hasTalent, hasClassNode, learnTalent, learnClassNode, resetTalents } from '../systems/talents.js';
import { skillDescription, getSkillStats } from '../systems/stats.js';

export function createRenderer(state, combat) {
  const els = {
    classLabel: document.createElement('span'),
  };

  function log(message) {
    state.logs.unshift(message);
    state.logs = state.logs.slice(0, 7);
  }

  function renderHud() {
    const hud = document.getElementById('hud');
    const className = state.selectedClass ? `— ${classes[state.selectedClass].name}` : '— Sem especialização';
    hud.innerHTML = `
      <div class="panel-card stats-card">
        <div class="name">Mago <span>${className}</span></div>
        <div class="small">Nível ${state.player.level} · Pontos de talento: <b>${state.availableTalentPoints}</b></div>
        <div class="bar"><i class="hp" style="width:${state.player.hp}%"></i></div>
        <div class="bar"><i class="mp" style="width:${state.player.mp}%"></i></div>
        <div class="bar"><i class="xp" style="width:${state.player.xp}%"></i></div>
        ${state.selectedClass === 'thunder' ? `<div class="small charge">Carga: ${Math.round(state.combat.charge)}%</div>` : ''}
      </div>
    `;
  }

  function renderArena() {
    const arena = document.getElementById('arena');
    arena.innerHTML = '';
    state.enemies.forEach((enemy, index) => {
      const el = document.createElement('div');
      el.className = 'enemy';
      el.style.left = `${enemy.x}px`;
      el.style.top = `${enemy.y}px`;
      el.innerHTML = `<div class="enemy-hp"><i style="width:${Math.max(0, enemy.hp / enemy.maxHp * 100)}%"></i></div>`;
      arena.appendChild(el);
    });
    const player = document.getElementById('player');
    player.style.left = `${state.player.x}px`;
    player.style.top = `${state.player.y}px`;
    document.getElementById('combat-log').innerHTML = state.logs.join('<br>');
  }

  function renderClasses() {
    const root = document.getElementById('panel-classes');
    root.innerHTML = `<h2>Classe de Mago</h2><div class="sub">A classe define sua identidade. A árvore de talentos define sua build.</div><div id="class-grid" class="class-grid"></div><div id="class-tree"></div>`;
    const grid = root.querySelector('#class-grid');
    Object.values(classes).forEach(cls => {
      const button = document.createElement('button');
      button.className = `class-button ${state.selectedClass === cls.id ? 'selected' : ''}`;
      button.innerHTML = `<b>${cls.icon} ${cls.name}</b><span>${cls.description}</span>`;
      button.onclick = () => {
        state.selectedClass = cls.id;
        state.learnedClassNodes.clear();
        log(`Classe escolhida: ${cls.name}`);
        renderAll();
      };
      grid.appendChild(button);
    });

    const tree = root.querySelector('#class-tree');
    if (!state.selectedClass) {
      tree.innerHTML = `<div class="branch">Escolha uma das 3 classes para desbloquear sua árvore de especialização.</div>`;
      return;
    }
    const cls = classes[state.selectedClass];
    tree.innerHTML = `<div class="branch"><b>${cls.icon} Árvore de ${cls.name}</b><div class="node-stack"></div></div>`;
    const stack = tree.querySelector('.node-stack');
    cls.tree.forEach(node => {
      const button = document.createElement('button');
      const available = requirementsMet(state, node.requires ?? []);
      button.className = `node ${hasClassNode(state, node.id) ? 'learned' : (!available ? 'locked' : '')}`;
      button.innerHTML = `<b>${node.name}<span class="cost">${node.cost}pt</span></b><small>${node.description}</small>`;
      button.onclick = () => {
        const result = learnClassNode(state, node);
        log(result.message);
        renderAll();
      };
      stack.appendChild(button);
    });
  }

  function renderTalents() {
    const root = document.getElementById('panel-talents');
    root.innerHTML = `<h2>Árvore de Talentos</h2><div class="sub">Talentos alteram diretamente o comportamento das habilidades.</div><div id="talent-grid" class="talent-grid"></div><div class="actions"><button id="reset-talents" class="action">Resetar</button><button id="gain-point" class="action primary">+1 ponto</button></div>`;
    const grid = root.querySelector('#talent-grid');
    talents.forEach(talent => {
      const available = requirementsMet(state, talent.requires ?? []);
      const button = document.createElement('button');
      button.className = `node ${hasTalent(state, talent.id) ? 'learned' : (!available ? 'locked' : '')}`;
      button.innerHTML = `<b>${talent.name}<span class="cost">${talent.cost}pt</span></b><small>${talent.description}</small>`;
      button.onclick = () => {
        const result = learnTalent(state, talent);
        log(result.message);
        renderAll();
      };
      grid.appendChild(button);
    });
    root.querySelector('#reset-talents').onclick = () => { resetTalents(state); log('Árvores resetadas.'); renderAll(); };
    root.querySelector('#gain-point').onclick = () => { state.availableTalentPoints += 1; log('+1 ponto de demonstração.'); renderAll(); };
  }

  function renderSkills() {
    const root = document.getElementById('panel-skills');
    root.innerHTML = `<h2>Habilidades</h2><div class="sub">Esta tela mostra como a build está transformando cada skill.</div><div id="skill-list"></div>`;
    const list = root.querySelector('#skill-list');
    [skills.basic, skills.fireball, skills.lightning, skills.void_lance, skills.meteor, skills.dash].forEach(skill => {
      const stats = getSkillStats(state, skill);
      const item = document.createElement('div');
      item.className = 'skill-card';
      item.innerHTML = `<div class="skill-header"><b>${skill.name}</b><span>${skill.key}</span></div><div class="small">${Math.round(stats.damage)} dano · ${Math.round(stats.cooldown)}ms cooldown${stats.manaCost ? ` · ${stats.manaCost} mana` : ''}</div><p>${skillDescription(state, skill)}</p>`;
      list.appendChild(item);
    });
  }

  function renderAll() { renderHud(); renderArena(); renderClasses(); renderTalents(); renderSkills(); }
  return { renderAll, log };
}
