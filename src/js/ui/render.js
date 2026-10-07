import { classes } from '../data/classes.js';
import { mageSkillTree, skills } from '../data/talents.js';
import { buyMageUpgrade, buySpecUpgrade, getMageLevel, getSpecLevel, selectSpecialization, resetMageUpgrades, resetSpecUpgrades } from '../systems/talents.js';
import { getDerivedStats, getSkillStats, skillDescription } from '../systems/stats.js';
import { saveGame } from '../systems/save.js';

export function createRenderer(state) {
  function log(message) {
    state.logs.unshift(message);
    state.logs = state.logs.slice(0, 7);
  }

  function renderHud() {
    const hud = document.getElementById('hud');
    const spec = state.selectedClass ? `${classes[state.selectedClass].icon} ${classes[state.selectedClass].name}` : 'Nenhuma';
    hud.innerHTML = `
      <div class="panel-card stats-card">
        <div class="name">Mago <span>${spec}</span></div>
        <div class="point-row">
          <span>⭐ Nível ${state.player.level}</span>
          <span class="point mage-point">🔮 Mago <b>${state.mageSkillPoints}</b></span>
          <span class="point spec-point">👑 Spec <b>${state.specSkillPoints}</b></span>
        </div>
        <div class="small">XP ${Math.round(state.player.xp)} / 100 · 💾 ${state.saveStatus === 'salvo' ? 'Salvo' : 'Novo'}</div>
        <div class="bar"><i class="hp" style="width:${state.player.hp / state.player.maxHp * 100}%"></i></div>
        <div class="bar"><i class="mp" style="width:${state.player.mp / state.player.maxMp * 100}%"></i></div>
        <div class="bar"><i class="xp" style="width:${state.player.xp}%"></i></div>
        ${state.selectedClass === 'thunder' ? `<div class="small charge">⚡ Carga: ${Math.round(state.combat.charge)}%</div>` : ''}
      </div>`;
  }

  function renderAim() {
    let aim = document.getElementById('aim-reticle');
    if (!aim) {
      aim = document.createElement('div');
      aim.id = 'aim-reticle';
      document.getElementById('game').appendChild(aim);
    }
    aim.style.left = `${state.mouse.x}px`;
    aim.style.top = `${state.mouse.y}px`;
    aim.style.opacity = state.mouse.inside ? '1' : '.25';
  }

  function renderArena() {
    const arena = document.getElementById('arena');
    arena.innerHTML = '';
    state.enemies.forEach(enemy => {
      const el = document.createElement('div');
      el.className = `enemy ${enemy.burning ? 'burning' : ''} ${enemy.markedUntil > performance.now() ? 'marked' : ''}`;
      el.style.left = `${enemy.x}px`;
      el.style.top = `${enemy.y}px`;
      el.innerHTML = `<div class="enemy-hp"><i style="width:${Math.max(0, enemy.hp / enemy.maxHp * 100)}%"></i></div>`;
      arena.appendChild(el);
    });
    document.getElementById('player').style.left = `${state.player.x}px`;
    document.getElementById('player').style.top = `${state.player.y}px`;
    document.getElementById('combat-log').innerHTML = state.logs.join('<br>');
    renderAim();
  }

  function nodeButton(node, type) {
    const current = type === 'mage' ? getMageLevel(state, node.id) : getSpecLevel(state, node.id);
    const maxed = current >= node.maxLevel;
    const button = document.createElement('button');
    button.className = `node ${current ? 'learned' : ''} ${maxed ? 'maxed' : ''}`;
    button.innerHTML = `<div class="node-title"><b>${node.name}</b><span> ${current}/${node.maxLevel}</span></div><small>${node.description}</small><div class="node-cost">${maxed ? 'MAX' : '▲ 1 ponto'}</div>`;
    button.onclick = event => {
      event.preventDefault();
      const result = type === 'mage' ? buyMageUpgrade(state, node) : buySpecUpgrade(state, node);
      log(result.ok ? `✅ ${result.message}` : `⚠️ ${result.message}`);
      renderAll();
    };
    return button;
  }

  function renderClasses() {
    const root = document.getElementById('panel-classes');
    root.innerHTML = `<h2>👑 Especialização</h2><div class="sub">Você escolhe <b>uma única especialização</b> por personagem. Cada nível concede +1 ponto de especialização.</div><div id="class-grid" class="class-grid"></div><div id="spec-tree"></div>`;
    const grid = root.querySelector('#class-grid');

    Object.values(classes).forEach(cls => {
      const button = document.createElement('button');
      const chosen = state.selectedClass === cls.id;
      const locked = Boolean(state.selectedClass) && !chosen;
      button.className = `class-button ${chosen ? 'selected' : ''} ${locked ? 'locked-class' : ''}`;
      button.disabled = locked;
      button.innerHTML = `<b>${cls.icon} ${cls.name}</b><span>${cls.description}</span><em>${chosen ? '✓ Especialização ativa' : locked ? '🔒 Indisponível neste personagem' : 'Escolher'}</em>`;
      button.onclick = () => {
        const result = selectSpecialization(state, cls.id);
        log(result.ok ? `👑 ${cls.name} escolhida. Os próximos pontos de especialização pertencem a esta árvore.` : `⚠️ ${result.message}`);
        renderAll();
      };
      grid.appendChild(button);
    });

    const tree = root.querySelector('#spec-tree');
    if (!state.selectedClass) {
      tree.innerHTML = `<div class="branch empty-branch">Escolha uma classe acima para abrir sua árvore de habilidades.</div>`;
      return;
    }

    const cls = classes[state.selectedClass];
    tree.innerHTML = `<div class="tree-header"><div><b>${cls.icon} Árvore — ${cls.name}</b><span>${state.specSkillPoints} ponto(s) disponível(is)</span></div><small>Todos os upgrades abaixo custam exatamente 1 ponto.</small></div><div class="skill-tree"></div><div class="actions"><button id="reset-spec" class="action">Reembolsar upgrades (${countUpgrades(state.specUpgrades)})</button></div>`;
    const gridTree = tree.querySelector('.skill-tree');
    cls.skillNodes.forEach(node => gridTree.appendChild(nodeButton(node, 'spec')));
    tree.querySelector('#reset-spec').onclick = () => { const n = resetSpecUpgrades(state); log(`↩️ ${n} ponto(s) de especialização devolvido(s).`); renderAll(); };
  }

  function renderTalents() {
    const root = document.getElementById('panel-talents');
    root.innerHTML = `<h2>🌳 Árvore de Skills do Mago</h2><div class="sub">Esta é a árvore geral. Cada upgrade custa <b>1 Ponto de Skill de Mago</b> e altera números reais das habilidades.</div><div class="tree-header"><div><b>🔮 Pontos de Mago: ${state.mageSkillPoints}</b></div><small>${countUpgrades(state.mageUpgrades)} upgrade(s) investido(s)</small></div><div class="mage-tree"></div><div class="actions"><button id="reset-mage" class="action">Reembolsar upgrades (${countUpgrades(state.mageUpgrades)})</button></div>`;
    const tree = root.querySelector('.mage-tree');
    mageSkillTree.forEach(node => tree.appendChild(nodeButton(node, 'mage')));
    root.querySelector('#reset-mage').onclick = () => { const n = resetMageUpgrades(state); log(`↩️ ${n} ponto(s) de Mago devolvido(s).`); renderAll(); };
  }

  function countUpgrades(map) { return Object.values(map).reduce((sum, value) => sum + value, 0); }

  function renderSkills() {
    const root = document.getElementById('panel-skills');
    const d = getDerivedStats(state);
    root.innerHTML = `<h2>✨ Habilidades</h2><div class="sub">As skills agora são apontadas pelo <b>cursor do mouse</b>. A tecla apenas lança na direção do cursor.</div><div class="cursor-info">🎯 Cursor: ${Math.round(state.mouse.x)} × ${Math.round(state.mouse.y)} · Crítico ${Math.round(d.critChance * 100)}%</div><div id="skill-list"></div>`;
    const list = root.querySelector('#skill-list');
    [skills.basic, skills.fireball, skills.lightning, skills.void_lance, skills.meteor, skills.dash].forEach(skill => {
      const stats = getSkillStats(state, skill);
      const item = document.createElement('div');
      item.className = 'skill-card';
      item.innerHTML = `<div class="skill-header"><b>${skill.name}</b><span>${skill.key}</span></div><div class="small">${Math.round(stats.damage)} dano · ${Math.round(stats.cooldown)}ms · ${stats.manaCost} mana</div><p>${skillDescription(state, skill)}</p>`;
      list.appendChild(item);
    });
  }

  function renderFrame() { renderHud(); renderArena(); }
  function renderAll() { renderHud(); renderArena(); renderClasses(); renderTalents(); renderSkills(); }
  return { renderAll, renderFrame, log };
}
