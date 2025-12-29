# globals/ - Reactive Global Variables

## Overview

Globals are reactive variables that combine multiple atoms into a single coherent value. They simplify access to game data by grouping related information.

## Structure

```
globals/
├── index.ts              # Registry and exports
├── core/
│   ├── reactive.ts       # Factory createReactiveGlobal()
│   └── types.ts          # Global types
└── variables/
    ├── currentTile.ts    # Current tile (position, object, plant)
    ├── myPets.ts         # Player's pets
    ├── myGarden.ts       # Player's garden
    ├── myInventory.ts    # Player's inventory
    ├── gameMap.ts        # Map and locations
    ├── players.ts        # Other players
    ├── shops.ts          # Shop state
    └── weather.ts        # Weather
```

## Concept

### Problem Solved

Without globals, you need to subscribe to multiple atoms separately:

```typescript
// ❌ Complex: 3 subscriptions to manage
const unsub1 = await Store.subscribe("positionAtom", ...);
const unsub2 = await Store.subscribe("myCurrentGardenObjectAtom", ...);
const unsub3 = await Store.subscribe("myCurrentGrowSlotAtom", ...);
```

### Solution with Globals

```typescript
// ✅ Simple: 1 single subscription
const unsub = Globals.currentTile.subscribe((tile) => {
  console.log(tile.position, tile.object, tile.plant);
});
```

## GlobalVariable API

```typescript
interface GlobalVariable<T> {
  get(): T;                                           // Synchronous read
  subscribe(callback: (value: T, prev: T) => void): Unsubscribe;
  destroy(): void;                                    // Cleanup
}
```

## Available Globals

### `Globals.currentTile`
Information about the tile where the player is standing.

```typescript
const tile = Globals.currentTile.get();
// {
//   position: { x: 10, y: 20 },
//   globalTileIndex: 42,
//   gardenTile: {...},
//   object: { type: "plant", ... },
//   plant: { name: "Carrot", growSlots: [...] },
//   isInMyGarden: true
// }
```

### `Globals.myPets`
Player's pets (active and in hutch).

```typescript
const pets = Globals.myPets.get();
// {
//   infos: [...],           // All pets
//   slotInfos: {...},       // Info by slot
//   primitiveSlots: [...],  // Basic slots
//   nonPrimitiveSlots: [...] // Advanced slots
// }
```

### `Globals.myInventory`
Player's complete inventory.

```typescript
const inv = Globals.myInventory.get();
// {
//   items: [...],           // All items
//   seeds: [...],           // Seeds
//   crops: [...],           // Harvests
//   pets: [...],            // Pets in inventory
//   eggs: [...],            // Eggs
//   decors: [...],          // Decorations
//   tools: [...]            // Tools
// }
```

### `Globals.myGarden`
Player's garden state.

```typescript
const garden = Globals.myGarden.get();
// {
//   garden: {...},          // Complete data
//   tileObjects: {...},     // Objects by tile
//   boardwalkObjects: {...} // Boardwalk objects
// }
```

### `Globals.shops`
State of all shops.

```typescript
const shops = Globals.shops.get();
// {
//   seed: { inventory: [...], restockSeconds: 120 },
//   egg: { inventory: [...], restockSeconds: 300 },
//   tool: { ... },
//   decor: { ... }
// }
```

### `Globals.gameMap`
Game map and locations.

```typescript
const map = Globals.gameMap.get();
// {
//   map: { cols: 50, rows: 50, ... },
//   tileSize: 32
// }
```

### `Globals.players`
Other players in the garden.

```typescript
const players = Globals.players.get();
// {
//   userSlots: [...],
//   positions: { [playerId]: { x, y } },
//   selectedItems: { [playerId]: item },
//   lastActions: { [playerId]: action }
// }
```

### `Globals.weather`
Current weather.

```typescript
const weather = Globals.weather.get();
// { type: "rain", ... }
```

## Usage

### One-time Read

```typescript
const tile = Globals.currentTile.get();
if (tile.isInMyGarden && tile.object) {
  console.log("On an object in my garden");
}
```

### Subscription

```typescript
const unsubscribe = Globals.currentTile.subscribe((current, previous) => {
  if (current.position !== previous.position) {
    console.log("Moved:", current.position);
  }
});

// Later: cleanup
unsubscribe();
```

## Creating a New Global Variable

### 1. Define the type

```typescript
// core/types.ts
export type MyNewGlobalData = {
  field1: string;
  field2: number;
};

export type MyNewGlobal = GlobalVariable<MyNewGlobalData>;
```

### 2. Create the variable

```typescript
// variables/myNewGlobal.ts
import { createReactiveGlobal } from "../core/reactive";
import type { MyNewGlobal, MyNewGlobalData } from "../core/types";

type Sources = {
  atom1: string;
  atom2: number;
};

const initialValue: MyNewGlobalData = {
  field1: "",
  field2: 0,
};

export function getMyNewGlobal(): MyNewGlobal {
  return createReactiveGlobal<Sources, MyNewGlobalData>(
    // Source atoms
    {
      atom1: "myAtom1Label",
      atom2: "myAtom2Label",
    },
    // Combine function
    (sources) => ({
      field1: sources.atom1,
      field2: sources.atom2,
    }),
    // Initial value
    initialValue
  );
}
```

### 3. Register in index

```typescript
// index.ts
export { getMyNewGlobal } from "./variables/myNewGlobal";

// In initGlobals()
_globals = {
  ...existingGlobals,
  myNewGlobal: getMyNewGlobal(),
};

// In Globals object
export const Globals = {
  ...existing,
  get myNewGlobal() {
    return getGlobals().myNewGlobal;
  },
};
```

## createReactiveGlobal API

```typescript
function createReactiveGlobal<TSources, TResult>(
  atomSources: Record<keyof TSources, string>,  // Atom labels
  combine: (sources: TSources) => TResult,       // Combine function
  initialValue: TResult,                         // Default value
  isEqual?: (a: TResult, b: TResult) => boolean  // Comparison (deepEqual by default)
): GlobalVariable<TResult>
```

## Best Practices

1. **Use for correlated data** - If you only need one atom, use `Store.subscribe` directly
2. **Clean up subscriptions** - Always call `unsubscribe()` when the component unmounts
3. **Don't modify returned values** - Globals are read-only
4. **Avoid frequent recalculations** - The `combine` function is called on each source atom change

## See Also

- [atoms/README.md](../atoms/README.md) - Individual atoms
- [../ui/sections/README.md](../ui/sections/README.md) - Usage in sections
