export function bindInput(state,combat,renderer,waves){
 const game=document.getElementById('game');
 const updateMouse=event=>{const rect=game.getBoundingClientRect();state.mouse.x=Math.max(0,Math.min(rect.width,event.clientX-rect.left));state.mouse.y=Math.max(0,Math.min(rect.height,event.clientY-rect.top));state.mouse.inside=true;};
 game.addEventListener('mousemove',updateMouse);game.addEventListener('mouseenter',()=>state.mouse.inside=true);game.addEventListener('mouseleave',()=>state.mouse.inside=false);
 window.addEventListener('keydown',event=>{const key=event.key.toLowerCase();state.keys.add(key);if(['1','2','3',' ','shift'].includes(key)||event.key==='Shift')event.preventDefault();if(event.key===' '){combat.basicAttack();return;}if(key==='1')combat.castSlot(0);if(key==='2')combat.castSlot(1);if(key==='3')combat.castSlot(2);if(event.key==='Shift')combat.dash();if(key==='p')state.talentsOpen=!state.talentsOpen;});
 window.addEventListener('keyup',event=>state.keys.delete(event.key.toLowerCase()));
 document.querySelectorAll('.tab').forEach(button=>button.addEventListener('click',()=>{state.activeTab=button.dataset.tab;document.querySelectorAll('.tab').forEach(t=>t.classList.toggle('active',t===button));document.querySelectorAll('.content-panel').forEach(p=>p.classList.add('hidden'));document.getElementById(`panel-${state.activeTab}`).classList.remove('hidden');}));
}
