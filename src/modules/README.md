# modules/ - Game Modules

## Overview

Modules encapsulate game-related functionality: data, sprites, Pixi.js rendering, audio, calculations, etc. Each module is a singleton initialized at startup.

## Structure

```
modules/
├── index.ts              # Exports and initAllModules()
├── core/
│   ├── version.ts        # MGVersion - Mod version
│   ├── assets.ts         # MGAssets - Asset loading
│   ├── manifest.ts       # MGManifest - Build manifest
│   ├── data.ts           # MGData - Game data (plants, pets, items...)
│   ├── antiafk.ts        # MGAntiAfk - Anti-AFK system
│   └── environment.ts    # MGEnvironment - Runtime info
├── sprite/
│   ├── index.ts          # MGSprite - Sprite rendering
│   ├── core.ts           # Sprite engine
│   ├── display.ts        # Display
│   ├── atlas.ts          # Atlas management
│   └── mutations/        # Visual mutations (Gold, Wet, Rainbow...)
├── pixi/
│   ├── pixi.ts           # MGPixi - Pixi.js engine
│   ├── tile.ts           # MGTile - Tile system
│   └── hooks.ts          # MGPixiHooks - Render hooks
├── media/
│   ├── audio.ts          # MGAudio - Sounds and music
│   └── cosmetic.ts       # MGCosmetic - Cosmetics
├── calculators/
│   ├── index.ts          # MGCalculators
│   ├── crop.ts           # Growth calculations
│   ├── mutation.ts       # Mutation calculations
│   └── pet.ts            # Pet stat calculations
├── achievements/         # MGAchievements - Achievement system
├── pets/
│   ├── strength.ts       # Strength calculations
│   └── abilityLogger.ts  # Ability logging
└── tracker/
    └── stats.ts          # MGTracker - Statistics
```

## Main Modules

### MGData - Game Data

**The most important.** Dynamically captures game data via hooks on `Object.*`.

```typescript
import { MGData } from "./modules";

// Wait for data to be available
await MGData.waitFor("plants");

// Get data
const plants = MGData.get("plants");      // All plants
const pets = MGData.get("pets");          // All pets
const mutations = MGData.get("mutations"); // All mutations
const items = MGData.get("items");        // All items
const decors = MGData.get("decors");      // All decorations
const eggs = MGData.get("eggs");          // All eggs
const abilities = MGData.get("abilities"); // Pet abilities
const weather = MGData.get("weather");    // Weather types

// Check if available
if (MGData.has("plants")) {
  // ...
}

// Get all
const allData = MGData.getAll();
```

**Important:** Never hardcode game data. Always use MGData for compatibility with game updates.

### MGSprite - Sprite Rendering

Displays game sprites with mutation support.

```typescript
import { MGSprite } from "./modules";

// Show a sprite (returns HTMLElement)
const el = MGSprite.show("plant", "Carrot");
const elWithMutations = MGSprite.show("plant", "Carrot", {
  mutations: ["Gold", "Wet"]
});

// Convert to canvas
const canvas = MGSprite.toCanvas("plant", "Carrot");
const canvasWithSize = MGSprite.toCanvas("pet", "Cat", { width: 64, height: 64 });

// Check if sprite exists
if (MGSprite.has("plant", "Carrot")) {
  // ...
}

// List available sprites
const categories = MGSprite.getCategories();  // ["plant", "pet", "item", ...]
const plantIds = MGSprite.getCategoryIds("plant");  // ["Carrot", "Strawberry", ...]

// Warmup (preloading)
await MGSprite.warmup();  // Preload common sprites
```

### MGPixi - Rendering Engine

Access to the game's Pixi.js engine.

```typescript
import { MGPixi } from "./modules";

const app = MGPixi.getApp();        // Pixi Application
const stage = MGPixi.getStage();    // Main stage
const renderer = MGPixi.getRenderer();
```

### MGTile - Tile System

Garden tile object management.

```typescript
import { MGTile } from "./modules";

const tileObject = MGTile.getObjectAt(x, y);
const allObjects = MGTile.getAllObjects();
```

### MGAudio - Audio

Sound and music playback.

```typescript
import { MGAudio } from "./modules";

MGAudio.play("harvest");
MGAudio.setVolume(0.5);
MGAudio.mute();
```

### MGCalculators - Calculations

Gameplay calculation functions.

```typescript
import { MGCalculators } from "./modules";

// Crop growth
const growthTime = MGCalculators.Crop.getGrowthTime(plantData, weather);
const isReady = MGCalculators.Crop.isReadyToHarvest(growSlot);

// Mutations
const mutationChance = MGCalculators.Mutation.getChance(plant, activePets);

// Pets
const strength = MGCalculators.Pet.getStrength(petInfo);
const xpNeeded = MGCalculators.Pet.getXpForLevel(level);
```

### MGAntiAfk - Anti-AFK

Prevents disconnection due to inactivity.

```typescript
import { MGAntiAfk } from "./modules";

MGAntiAfk.enable();
MGAntiAfk.disable();
const isActive = MGAntiAfk.isEnabled();
```

### MGVersion / MGManifest / MGEnvironment

Build and environment information.

```typescript
import { MGVersion, MGManifest, MGEnvironment } from "./modules";

console.log(MGVersion.get());      // "1.2.3"
console.log(MGManifest.get());     // { version, buildDate, ... }
console.log(MGEnvironment.get());  // { browser, platform, ... }
```

## Initialization

All modules are initialized via `initAllModules()`:

```typescript
import { initAllModules } from "./modules";

await initAllModules((progress) => {
  console.log(`${progress.name}: ${progress.status}`);
  // { name: "Data", status: "start" }
  // { name: "Data", status: "success" }
  // { name: "Sprites", status: "start" }
  // ...
});
```

Initialization order:
1. Data (data capture)
2. AntiAfk
3. Sprites
4. TileObjectSystem
5. Pixi
6. Audio
7. Cosmetics

## Adding a New Module

### 1. Create the file

```typescript
// modules/core/myModule.ts
let initialized = false;
let data: MyModuleData | null = null;

export const MGMyModule = {
  async init(): Promise<void> {
    if (initialized) return;
    // ... initialization
    initialized = true;
  },

  get(): MyModuleData {
    if (!data) throw new Error("MGMyModule not initialized");
    return data;
  },

  // ... other methods
};
```

### 2. Export in index.ts

```typescript
// modules/index.ts
export { MGMyModule } from "./core/myModule";

// In initAllModules()
const tasks = [
  // ... existing
  { name: "MyModule", init: () => MGMyModule.init() },
];
```

### 3. Expose in API (optional)

```typescript
// api/index.ts
Modules: {
  // ... existing
  MyModule: MGMyModule,
}
```

## MGData in Detail

### How It Works

MGData intercepts calls to `Object.defineProperty`, `Object.freeze`, etc. to capture static game data when it's defined.

### Data Structure

```typescript
// Plants
type PlantData = {
  id: string;
  name: string;
  seed: { spriteId: string; price: number; };
  plant: { spriteId: string; growTime: number; };
  crop: { spriteId: string; sellPrice: number; };
};

// Pets
type PetData = {
  id: string;
  name: string;
  spriteId: string;
  abilities: string[];
  baseStats: { ... };
};

// etc.
```

### Waiting for Data

```typescript
// Wait for a specific category
await MGData.waitFor("plants");

// Wait for multiple categories
await Promise.all([
  MGData.waitFor("plants"),
  MGData.waitFor("pets"),
  MGData.waitFor("mutations"),
]);
```

## Best Practices

1. **Always wait for init** - Modules are async, await `waitFor()` or check `has()`
2. **Use MGData, no hardcoding** - Data can change with game updates
3. **Clean up listeners** - If using Pixi hooks, clean them up
4. **Lazy loading** - Sprites are loaded on demand, use `warmup()` if needed

## See Also

- [../api/README.md](../api/README.md) - Modules exposed via window.Gemini
- [../../CLAUDE.md](../../CLAUDE.md) - Instructions on MGData and MGSprite
