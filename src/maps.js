const Maps = (function(){
  const MAPS = {}; let current = null;
  function register(mapSpec){ MAPS[mapSpec.id] = mapSpec; }
  function enter(mapId){ if(!MAPS[mapId]) throw new Error('Map unknown: '+mapId); current = MAPS[mapId]; return current; }
  function getCurrent(){ return current; }
  return { register, enter, getCurrent };
})();
export default Maps;
