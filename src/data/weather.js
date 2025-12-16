export const tileRefsAnimations = {
  Rain: 10,
  Frost: 20,
  Sunny: 30,
  AmberMoon: 40,
  Dawn: 50,
  MoonCelestialActivationTile: 91,
  DawnCelestialActivationTile: 92,
};

export const weatherCatalog = {
  Rain: {
    atomValue:'Rain',
    description:'Gives the Wet mutation to mature garden crops',
    type: 'weather',
    cycle: { kind: 'weather', startWindowMin: 20, startWindowMax: 35, durationMinutes: 5 },
    weightInCycle: 0.75,                           // 75% of weather events
    appliesRandomCropPercent: 30,                  // ~30% of applicable crops
    conditions: { requiresMature: true, requiresNoExistingModifier: true },
    mutations: [
      { name: 'Wet',    multiplier: 2 },
      { name: 'Frozen', multiplier: 10, conditional: 'applies if crop already has Chilled' },
    ],
    stacking: {
      compatible: ['Golden', 'Rainbow', 'Giant'],
      incompatible: ['Wet', 'Chilled', 'Frozen']},
    screenEffect: 'Rain on screen',
    notes: ['Primary vs Snow (75%)', 'Affecte une culture applicable au hasard']
  },
  Frost: {
    atomValue:'Frost',
    description:'Gives the Frozen mutation to mature garden crops',
    type: 'weather',
    displayName: 'Snow',
    cycle: { kind: 'weather', startWindowMin: 20, startWindowMax: 35, durationMinutes: 5 },
    weightInCycle: 0.25,                           // 25% of weather events
    appliesRandomCropPercent: 30,
    conditions: { requiresMature: true, requiresNoExistingModifier: true },
    mutations: [
      { name: 'Chilled', multiplier: 2 },
      { name: 'Frozen',  multiplier: 10, conditional: 'applies if crop already has Wet' },
    ],
    stacking: {
      compatible: ['Golden', 'Rainbow', 'Giant'],
      incompatible: ['Wet', 'Chilled', 'Frozen']},
    screenEffect: 'Snow on screen',
    notes: ['Secondary vs Rain (25%)', 'Frozen recommandé pour champignon/cactus/bambou']
  },
  Sunny: {
    atomValue:null,
    description:'No special effects',
    type: 'base',
    cycle: { kind: 'base' },
    appliesRandomCropPercent: 0,
    conditions: { requiresMature: false, requiresNoExistingModifier: false },
    mutations: [],
    stacking: {
      compatible: ['Golden', 'Rainbow', 'Giant'],
      incompatible: []},
    screenEffect: 'Blue skies',
    notes: ['État par défaut, aucun effet']
  },
  AmberMoon:{
    atomValue:'Amber Moon',
    description:'Gives the Amberglow mutation to mature garden crops',
    type: 'lunar',
    displayName: 'Harvest Moon',
    cycle: { kind: 'lunar', periodMinutes: 240, durationMinutes: 10 },
    weightInCycle: 0.33,                           // 33% of lunar events
    appliesRandomCropPercent: 30,
    conditions: { requiresMature: true, requiresNoExistingModifier: true },
    mutations: [
      { name: 'Amberglow', multiplier: 5 },
    ],
    stacking: { compatible: ['Gold','Rainbow'], incompatible: ['Dawnlit','Amberlit'] },
    screenEffect: 'Nightfall glow (orange)',
    notes: ['1 fois / 4h', 'Ne se cumule pas avec Dawnlit']
  },
  Dawn:{
    atomValue:'Dawn',
    description:'Gives the Dawnlit mutation to mature garden crops',
    type: 'lunar',
    cycle: { kind: 'lunar', periodMinutes: 240, durationMinutes: 10 },
    weightInCycle: 0.67,                           // 67% of lunar events
    appliesRandomCropPercent: 30,
    conditions: { requiresMature: true, requiresNoExistingModifier: true },
    mutations: [
      { name: 'Dawnlit', multiplier: 2 },
    ],
    stacking: { compatible: ['Gold','Rainbow'], incompatible: ['Amberlit','Dawnlit'] },
    screenEffect: 'Sunrise glow (purple)',
    notes: ['1 fois / 4h', 'Ne se cumule pas avec Amberglow']
  }
}
