# atoms/ - State Management (Jotai Bridge)

## Overview

This module creates a bridge to the Jotai store used by the MagicGarden game. It allows reading, writing, and subscribing to game state changes.

## Structure

```
atoms/
├── index.ts          # Public exports
├── store.ts          # Store facade (select/set/subscribe)
├── atoms.ts          # All atom definitions
├── types.ts          # TypeScript types
└── core/
    ├── bridge.ts     # React DevTools hook to capture store
    ├── signature.ts  # Signature channel for atom identification
    ├── lookup.ts     # Atom lookup by label
    ├── view.ts       # Derived atom creation (makeAtom, makeView)
    └── utils.ts      # Utilities (getAtPath, setAtPath)
```

## How It Works

### 1. Jotai Store Capture

The bridge installs a React DevTools hook to intercept the Jotai store when React mounts it:

```typescript
// core/bridge.ts
installReactDevToolsHook() // Called very early in init
```

### 2. Atom Identification

Atoms are identified by their `debugLabel` (e.g., `"positionAtom"`). The signature system allows finding them:

```typescript
// core/view.ts
export const positionAtom = makeAtom<GridPosition | null>("positionAtom");
```

### 3. Access via Store Facade

```typescript
import { Store } from "./atoms";

// Read
const position = await Store.select<GridPosition>("positionAtom");

// Write
await Store.set("positionAtom", { x: 10, y: 20 });

// Subscribe
const unsubscribe = await Store.subscribe("positionAtom", (value) => {
  console.log("Position changed:", value);
});
```

## Store API

### `Store.select<T>(label: string): Promise<T>`
Reads the current value of an atom.

### `Store.set<T>(label: string, value: T): Promise<void>`
Modifies an atom's value.

### `Store.subscribe<T>(label, callback): Promise<Unsubscribe>`
Subscribes to changes. The callback is called on each modification.

### `Store.subscribeImmediate<T>(label, callback): Promise<Unsubscribe>`
Like `subscribe`, but immediately calls the callback with the current value.

## Available Atoms

Atoms are organized by category in `atoms.ts`:

| Category | Examples |
|----------|----------|
| Position | `positionAtom`, `playerDirectionAtom` |
| Player | `myDataAtom`, `myCoinsCountAtom` |
| Inventory | `myInventoryAtom`, `mySeedInventoryAtom`, `myPetInventoryAtom` |
| Garden | `myCurrentGardenObjectAtom`, `myCurrentGrowSlotAtom` |
| Pets | `myPetInfosAtom`, `myPetSlotInfosAtom` |
| Shops | `shopsAtom`, `seedShopAtom`, `eggShopAtom` |
| Weather | `weatherAtom` |
| Map | `mapAtom`, `tileSizeAtom` |

## Adding a New Atom

### 1. Define the type (if needed)

```typescript
// types.ts
export type MyNewData = {
  field1: string;
  field2: number;
};
```

### 2. Create the atom

```typescript
// atoms.ts
export const myNewDataAtom = makeAtom<MyNewData | null>("myNewDataAtom");
```

### 3. Create a view (optional)

To access a nested property:

```typescript
// atoms.ts
export const myNewFieldView = makeView<MyNewData | null, string>(
  "myNewDataAtom",
  { path: "field1" }
);
```

### 4. Export

```typescript
// index.ts
export type { MyNewData } from "./types";
export { myNewDataAtom, myNewFieldView } from "./atoms";
```

## Utility Functions

### `makeAtom<T>(label: string)`
Creates a reference to an existing atom in the game.

### `makeView<TSource, TResult>(sourceLabel, options)`
Creates a derived atom that reads a property from another atom:

```typescript
const shopInventoryView = makeView<Shop, Item[]>("seedShopAtom", {
  path: "inventory"
});
```

### `getAtPath(obj, path)` / `setAtPath(obj, path, value)`
Access nested properties via string path:

```typescript
getAtPath(shop, "inventory.0.name") // → "Carrot Seed"
```

## Main Types

```typescript
// Unsubscribe function
type Unsubscribe = () => void;

// Grid position
type GridPosition = { x: number; y: number };

// Player ID
type PlayerId = string;

// Inventory item (union type)
type InventoryItem =
  | CropInventoryItem
  | SeedInventoryItem
  | ToolInventoryItem
  | EggInventoryItem
  | DecorInventoryItem
  | PetInventoryItem;
```

## Best Practices

1. **Always use the Store facade** - Don't access atoms directly
2. **Clean up subscriptions** - Call `unsubscribe()` when no longer needed
3. **Type your calls** - Use generics: `Store.select<MyType>(...)`
4. **Wait for initialization** - Methods are async because the store may not be ready

## See Also

- [globals/README.md](../globals/README.md) - Reactive variables combining multiple atoms
- [../CLAUDE.md](../../CLAUDE.md) - General project instructions
