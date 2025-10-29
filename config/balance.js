{
  "maps": [
    { "id":"harbor","title":"Old Harbor","desc":"Foggy docks and crowded piers" },
    { "id":"warehouse","title":"Abandoned Warehouse","desc":"Cluttered storage, possible supplies" },
    { "id":"river","title":"River Transit","desc":"Slow but safer water route" }
  ],
  "scenarios": {
    "evac_old_harbor": {
      "id":"evac_old_harbor","title":"Evacuation of Old Harbor","tier":3,
      "description":"Evacuate civilians within 48 hours","startNodes":["N0"],
      "nodes":["N0","N1","N2","N3","N4","N5","N6","N9"]
    }
  },
  "nodes": {
    "N0":{"id":"N0","title":"Briefing","type":"decision","timeCost":1,"description":"Plan operations","edges":[{"to":"N1"},{"to":"N2"},{"to":"N3"}]},
    "N1":{"id":"N1","title":"Secure Dock Route","type":"objective","timeCost":4,"suppliesCost":10,"description":"Clear dock route","checks":[{"stat":"stealth","difficulty":40}],"rewards":{"rp":8,"evacuated":20},"failure":{"civiliansLoss":6}},
    "N2":{"id":"N2","title":"Rescue Engineer","type":"quest","timeCost":6,"description":"Rescue the engineer to enable motorboat","questTrigger":{"questId":"q_rescue","objId":"rescue_engineer","amount":1},"rewards":{"rp":8},"failure":{"civiliansLoss":8}},
    "N3":{"id":"N3","title":"Salvage Fuel","type":"craft","timeCost":3,"suppliesCost":5,"description":"Recover fuel","recipe":"fuel_can","rewards":{"evacuated":10},"failure":{"civiliansLoss":5}},
    "N4":{"id":"N4","title":"Escort Checkpoints","type":"objective","timeCost":8,"description":"Escort civilians","checks":[{"stat":"leadership","difficulty":50}],"rewards":{"rp":6,"evacuated":30},"failure":{"civiliansLoss":15}},
    "N5":{"id":"N5","title":"Ambush","type":"combat","timeCost":5,"suppliesCost":20,"description":"Handle ambush","enemies":[{"name":"Raider","hp":40,"stats":{"attack":7,"defense":3,"speed":4},"loot":{"metal":1}}],"rewards":{"evacuated":15},"failure":{"civiliansLoss":20}},
    "N6":{"id":"N6","title":"Final Transit","type":"travel","timeCost":6,"description":"Transit to secure zone","targetMap":"river","rewards":{"rp":30,"evacuated":40},"failure":{"civiliansLoss":40}},
    "N9":{"id":"N9","title":"Aftermath","type":"event","timeCost":0,"description":"Scenario ends"}
  },
  "quests": [
    {
      "id":"q_rescue",
      "title":"Rescue the Engineer",
      "description":"Find and rescue the harbor engineer to fix engines.",
      "objectives":[{"id":"rescue_engineer","type":"visit","value":1}],
      "reward":{"rp":12,"items":{"artifact":1}}
    }
  ]
}
