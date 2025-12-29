# api/ - Public API (window.Gemini)

## Overview

This module exposes Gemini's public API accessible via `window.Gemini` in the browser console or in other scripts.

## Structure

```
api/
└── index.ts    # GeminiAPI + exposeGeminiAPI()
```

## Exposed API

```typescript
window.Gemini = {
  Store: { ... },      // Jotai atom access
  Globals: { ... },    // Reactive variables
  Modules: { ... },    // Game modules
  WebSocket: { ... },  // Network actions
  _internal: { ... },  // Internal functions (debug)
};
```

## Store

Access to state management (Jotai bridge).

```typescript
// Read
const pos = await Gemini.Store.select("positionAtom");

// Write
await Gemini.Store.set("positionAtom", { x: 10, y: 20 });

// Subscribe
const unsub = await Gemini.Store.subscribe("myCoinsCountAtom", (coins) => {
  console.log("Coins:", coins);
});

// Subscribe with immediate value
const unsub = await Gemini.Store.subscribeImmediate("weatherAtom", (weather) => {
  console.log("Weather:", weather);
});
```

## Globals

Reactive variables combining multiple atoms.

```typescript
// Synchronous read
const tile = Gemini.Globals.currentTile.get();
const pets = Gemini.Globals.myPets.get();
const inv = Gemini.Globals.myInventory.get();

// Subscribe
const unsub = Gemini.Globals.currentTile.subscribe((current, prev) => {
  console.log("Tile changed:", current);
});
```

Available variables:
- `currentTile` - Position and object under player
- `myPets` - Player's pets
- `myInventory` - Complete inventory
- `myGarden` - Garden state
- `gameMap` - Map and locations
- `players` - Other players
- `shops` - Shop state
- `weather` - Weather

## Modules

Access to game modules.

```typescript
// Game data
const plants = Gemini.Modules.Data.get("plants");
const pets = Gemini.Modules.Data.get("pets");
await Gemini.Modules.Data.waitFor("mutations");

// Sprites
const canvas = Gemini.Modules.Sprite.toCanvas("plant", "Carrot");
Gemini.Modules.Sprite.show("pet", "Cat", { mutations: ["Gold"] });

// Version
console.log(Gemini.Modules.Version.get());

// Audio
Gemini.Modules.Audio.play("harvest");

// Anti-AFK
Gemini.Modules.AntiAfk.enable();

// Calculators
const growthTime = Gemini.Modules.Calculators.Crop.getGrowthTime(plant);
```

Available modules:
| Module | Description |
|--------|-------------|
| `Version` | Mod version |
| `Assets` | Asset loading |
| `Manifest` | Build manifest |
| `Data` | Game data (plants, pets, items...) |
| `AntiAfk` | Anti-AFK system |
| `Environment` | Runtime info |
| `Sprite` | Sprite rendering |
| `Tile` | Tile system |
| `Pixi` | Pixi.js engine |
| `Audio` | Sounds and music |
| `Cosmetic` | Cosmetics |
| `Achievements` | Achievement system |
| `Calculators` | Gameplay calculations |
| `Pets` | Pet utilities |
| `Tracker` | Statistics |

## WebSocket

Network actions to the server.

```typescript
// Movement
Gemini.WebSocket.move(x, y);
Gemini.WebSocket.teleport(x, y);

// Garden
Gemini.WebSocket.plantSeed(seedId, x, y);
Gemini.WebSocket.waterPlant(plantId);
Gemini.WebSocket.harvestCrop(cropId);
Gemini.WebSocket.sellAllCrops();

// Purchases
Gemini.WebSocket.purchaseSeed(seedId);
Gemini.WebSocket.purchaseEgg(eggId);
Gemini.WebSocket.purchaseTool(toolId);
Gemini.WebSocket.purchaseDecor(decorId);

// Pets
Gemini.WebSocket.placePet(petId, x, y);
Gemini.WebSocket.feedPet(petId, foodItemId);
Gemini.WebSocket.namePet(petId, name);
Gemini.WebSocket.sellPet(petId);
Gemini.WebSocket.storePet(petId);

// Eggs
Gemini.WebSocket.plantEgg(eggId, x, y);
Gemini.WebSocket.hatchEgg(eggId);

// Decorations
Gemini.WebSocket.placeDecor(decorId, x, y);
Gemini.WebSocket.pickupDecor(decorInstanceId);

// Inventory
Gemini.WebSocket.moveInventoryItem(fromIndex, toIndex);
Gemini.WebSocket.toggleFavoriteItem(itemId, favorite);
Gemini.WebSocket.putItemInStorage(itemId);
Gemini.WebSocket.retrieveItemFromStorage(itemId);

// Social
Gemini.WebSocket.chat(message);
Gemini.WebSocket.emote(emoteType);

// Other
Gemini.WebSocket.ping(id);
Gemini.WebSocket.checkWeatherStatus();
```

## _internal

Internal functions for debugging.

```typescript
// Access globals (avoid in production)
const globals = Gemini._internal.getGlobals();

// Reinitialize globals
Gemini._internal.initGlobals();
Gemini._internal.destroyGlobals();
```

## Adding a Feature to the API

### 1. Modify api/index.ts

```typescript
// Import the new module/function
import { myNewFunction } from "../somewhere";

export const GeminiAPI = {
  // Existing...

  // Add in appropriate section
  MyNewNamespace: {
    doSomething: myNewFunction,
  },

  // Or in an existing namespace
  WebSocket: {
    // ...existing
    myNewAction: WebSocketAPI.myNewAction,
  },
};
```

### 2. Types (optional but recommended)

```typescript
// For console autocompletion
declare global {
  interface Window {
    Gemini: typeof GeminiAPI;
  }
}
```

## Usage Examples

### Console script: Harvest all mature plants

```javascript
const garden = Gemini.Globals.myGarden.get();
const objects = Object.values(garden.tileObjects);

for (const obj of objects) {
  if (obj.objectType === "plant" && obj.isReadyToHarvest) {
    Gemini.WebSocket.harvestCrop(obj.id);
    await new Promise(r => setTimeout(r, 100)); // Small delay
  }
}
```

### Console script: Display inventory

```javascript
const inv = Gemini.Globals.myInventory.get();
console.table(inv.items.map(i => ({
  name: i.name,
  type: i.itemType,
  quantity: i.quantity ?? 1
})));
```

### Console script: Monitor position changes

```javascript
Gemini.Globals.currentTile.subscribe((tile) => {
  console.log(`Position: (${tile.position.x}, ${tile.position.y})`);
  if (tile.object) {
    console.log(`On: ${tile.object.objectType}`);
  }
});
```

## See Also

- [../atoms/README.md](../atoms/README.md) - Store.select/set/subscribe
- [../globals/README.md](../globals/README.md) - Globals.*
- [../modules/README.md](../modules/README.md) - Modules.*
- [../websocket/README.md](../websocket/README.md) - WebSocket.*
