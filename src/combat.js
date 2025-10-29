const Combat = (function(){
  function calcDamage(attacker, defender){ const atk = attacker.stats.attack || 5; const def = defender.stats.defense || 2; const variance = 0.85 + Math.random()*0.3; return Math.max(1, Math.round((atk - def) * variance)); }
  function runEncounter(party, enemies, hooks = {}){
    const state = { party: party.map(p=>Object.assign({},p)), enemies: enemies.map(e=>Object.assign({},e)), turnOrder: [], round:0, log:[] };
    state.turnOrder = state.party.concat(state.enemies).sort((a,b)=>(b.stats.speed||5)-(a.stats.speed||5));
    function anyAlive(list){ return list.some(x=>x.hp>0); }
    while(anyAlive(state.party) && anyAlive(state.enemies) && state.round < 100){
      state.round++;
      for(const actor of state.turnOrder){
        if(actor.hp <= 0) continue;
        const isPlayer = state.party.find(p=>p.id===actor.id);
        if(isPlayer){
          const aliveEnemies = state.enemies.filter(e=>e.hp>0);
          if(aliveEnemies.length===0) break;
          const target = aliveEnemies.reduce((a,b)=> (a.hp<b.hp?a:b));
          const dmg = calcDamage(actor, target);
          target.hp = Math.max(0, target.hp - dmg);
          state.log.push(`${actor.name} hits ${target.name} for ${dmg}`);
        } else {
          const alivePlayers = state.party.filter(p=>p.hp>0);
          if(alivePlayers.length===0) break;
          const target = alivePlayers[Math.floor(Math.random()*alivePlayers.length)];
          const dmg = calcDamage(actor, target);
          target.hp = Math.max(0, target.hp - dmg);
          state.log.push(`${actor.name} hits ${target.name} for ${dmg}`);
        }
        if(typeof hooks.onRound === 'function') hooks.onRound(state);
        if(!anyAlive(state.party) || !anyAlive(state.enemies)) break;
      }
    }
    const result = { victory: anyAlive(state.party) && !anyAlive(state.enemies), party: state.party, enemies: state.enemies, log: state.log };
    if(typeof hooks.onEnd === 'function') hooks.onEnd(result);
    return result;
  }
  function spawnEnemy(template){ return { id:`e_${Math.random().toString(36).slice(2,9)}`, name: template.name, stats: Object.assign({}, template.stats || { attack:6, defense:2, speed:4 }), hp: template.hp || 30, maxHp: template.hp || 30, loot: template.loot || {} }; }
  return { runEncounter, spawnEnemy };
})();
export default Combat;
