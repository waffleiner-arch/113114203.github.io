import BAL from './balance.js';
const Crafting = (function(){
  const inventory = {};
  function add(item,qty=1){ inventory[item] = (inventory[item]||0) + qty; }
  function remove(item,qty=1){ if((inventory[item]||0) < qty) return false; inventory[item] -= qty; if(inventory[item]===0) delete inventory[item]; return true; }
  function canCraft(recipeKey){ const recipe = BAL.CRAFT_RECIPES[recipeKey]; if(!recipe) return false; for(const k of Object.keys(recipe.req)) if((inventory[k]||0) < recipe.req[k]) return false; return true; }
  function craft(recipeKey){ const recipe = BAL.CRAFT_RECIPES[recipeKey]; if(!recipe) return {ok:false,reason:'missing'}; if(!canCraft(recipeKey)) return {ok:false,reason:'ingredients'}; for(const k of Object.keys(recipe.req)) remove(k, recipe.req[k]); return { ok:true, result: recipe.result }; }
  function dump(){ return Object.assign({}, inventory); }
  return { add, remove, canCraft, craft, dump };
})();
export default Crafting;
