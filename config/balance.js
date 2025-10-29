// config/balance.js
const BALANCE = {
  ALPHA: 0.6,
  RP_REGEN_BASE: 1,
  NB_DECAY_BASE: 0.5,
  COSTS: { HINT:5, PREVIEW:12, DELAY:20, REWRITE_MINOR:40, REWRITE_MAJOR:90, BURY_TRUTH:30, STORY_SAVE_BASE:80 },
  NB_THRESH: [50,120,240],
  THREAT_SCALE: function(t){ return 1 + 0.15*(t-1); },
  presets: {
    Story: { ALPHA:0.45, RP_REGEN_BASE:2, NB_DECAY_BASE:0.7 },
    Standard: { ALPHA:0.6, RP_REGEN_BASE:1, NB_DECAY_BASE:0.5 },
    Hardcore: { ALPHA:0.75, RP_REGEN_BASE:0.6, NB_DECAY_BASE:0.35 }
  }
};
export default BALANCE;
