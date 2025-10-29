const Quests = (function(){
  const ACTIVE = {};
  function createQuest(def){ ACTIVE[def.id] = { spec: def, progress: def.objectives.map(o=>({ id:o.id, done:0, target:o.value||1 })), state: 'active' }; }
  function progress(questId, objId, amount=1){ const q = ACTIVE[questId]; if(!q) return false; const o = q.progress.find(x=>x.id===objId); if(!o) return false; o.done = Math.min(o.target, o.done + amount); if(q.progress.every(p=>p.done>=p.target)){ q.state='completed'; return true; } return false; }
  function getActive(){ return Object.keys(ACTIVE).map(k=> ({ id:k, state:ACTIVE[k].state, spec:ACTIVE[k].spec, progress: ACTIVE[k].progress })); }
  function isCompleted(id){ return ACTIVE[id] && ACTIVE[id].state==='completed'; }
  function get(id){ return ACTIVE[id]; }
  return { createQuest, progress, getActive, isCompleted, get };
})();
export default Quests;
