---
paths: src/atoms/**/*
---

# Atoms rules

`src/atoms/` is the single source of truth for state access (atoms + Store bridge).

## File responsibilities

```
src/atoms/
├── types.ts      # Atom keys/types (public contracts)
├── atoms.ts      # Atom declarations
├── lookup.ts     # Atom registry (key → atom)
├── store.ts      # Public Store API (select/set/subscribe)
├── bridge.ts     # Wiring between atoms and React/Jotai store
├── view.ts       # Read-only derived views (optional)
├── signature.ts  # Stable signatures for change detection (optional)
└── index.ts      # Public exports only
```

### `types.ts` - Public contracts

Define all atom keys and their corresponding types:

```typescript
// Atom key union (all valid atom names)
export type AtomKey =
  | "myInventoryAtom"
  | "myPositionAtom"
  | "myGardenAtom";

// Type map (key → value type)
export interface AtomTypeMap {
  myInventoryAtom: InventoryState;
  myPositionAtom: PositionState;
  myGardenAtom: GardenState;
}

// Individual state types
export interface InventoryState {
  items: Item[];
  capacity: number;
}
```

### `atoms.ts` - Atom declarations

Declare atoms using Jotai:

```typescript
import { atom } from 'jotai';
import type { InventoryState } from './types';

export const myInventoryAtom = atom<InventoryState | null>(null);
export const myPositionAtom = atom<PositionState | null>(null);
```

### `lookup.ts` - Atom registry

Map keys to atoms for the Store bridge:

```typescript
import { myInventoryAtom, myPositionAtom } from './atoms';

export const atomRegistry = {
  myInventoryAtom,
  myPositionAtom,
} as const;
```

### `store.ts` - Public Store API

The Store API is the ONLY way to access atoms from outside `src/atoms/`:

```typescript
// Read atom value
const inventory = await Store.select('myInventoryAtom');

// Write atom value
await Store.set('myInventoryAtom', newInventory);

// Subscribe to changes
const unsubscribe = await Store.subscribe('myInventoryAtom', (value) => {
  console.log('Inventory changed:', value);
});

// Immediate subscribe (fires immediately with current value)
const unsubscribe = await Store.subscribeImmediate('myInventoryAtom', (value) => {
  console.log('Current inventory:', value);
});
```

### `view.ts` - Derived views (optional)

Use views when you need a transformed/normalized read model for UI:

```typescript
export interface InventoryView {
  items: NormalizedItem[];
  totalCount: number;
  isFull: boolean;
}

export function getInventoryView(state: InventoryState | null): InventoryView {
  if (!state) return { items: [], totalCount: 0, isFull: false };

  return {
    items: state.items.map(normalizeItem),
    totalCount: state.items.length,
    isFull: state.items.length >= state.capacity,
  };
}
```

### `signature.ts` - Change detection (optional)

Use signatures when atoms update frequently but you only care about meaningful changes:

```typescript
// Returns a stable string that changes only when relevant data changes
export function getInventorySignature(state: InventoryState | null): string {
  if (!state) return 'null';
  // Only hash fields that matter for change detection
  return `${state.items.length}-${state.capacity}`;
}
```

## Rules

### 1. Registration is mandatory

When adding a new atom, it MUST be registered in ALL relevant files:

1. `types.ts` - Add key to `AtomKey` union + type to `AtomTypeMap`
2. `atoms.ts` - Declare the atom
3. `lookup.ts` - Add to registry
4. `index.ts` - Re-export (if public)

**Forgetting any step will cause runtime errors.**

### 2. No direct atom access

```typescript
// ❌ BAD - Direct Jotai access outside atoms/
import { myInventoryAtom } from '../atoms/atoms';
const value = useAtomValue(myInventoryAtom);

// ✅ GOOD - Use Store API
import { Store } from '../atoms';
const value = await Store.select('myInventoryAtom');
```

### 3. Handle frequent updates

Atoms from the game can update very frequently (every tick). To avoid performance issues:

```typescript
// ❌ BAD - Re-renders on every atom tick
Store.subscribe('myPositionAtom', (pos) => {
  updateUI(pos);  // Called 60+ times per second!
});

// ✅ GOOD - Use signature to detect real changes
let lastSignature = '';
Store.subscribe('myPositionAtom', (pos) => {
  const sig = getPositionSignature(pos);
  if (sig === lastSignature) return;  // Skip if unchanged
  lastSignature = sig;
  updateUI(pos);
});
```

### 4. Keep types stable

Atom keys and types are public contracts. Changing them can break:
- Subscribers in features
- Views and signatures
- External code using `window.Gemini.Store`

**Before changing an atom type, check all usages.**

## Common mistakes

### ❌ Forgetting to register in lookup.ts
```typescript
// types.ts ✅
export type AtomKey = "myNewAtom" | ...;

// atoms.ts ✅
export const myNewAtom = atom<MyState | null>(null);

// lookup.ts ❌ MISSING!
// Store.select('myNewAtom') will fail at runtime
```

### ❌ Using wrong initial value
```typescript
// ❌ BAD - Empty object instead of null
export const myAtom = atom<MyState>({} as MyState);

// ✅ GOOD - null indicates "not yet loaded"
export const myAtom = atom<MyState | null>(null);
```

### ❌ Mutating atom state directly
```typescript
// ❌ BAD - Mutating existing state
const state = await Store.select('myInventoryAtom');
state.items.push(newItem);  // Mutation!
await Store.set('myInventoryAtom', state);

// ✅ GOOD - Create new state object
const state = await Store.select('myInventoryAtom');
await Store.set('myInventoryAtom', {
  ...state,
  items: [...state.items, newItem],
});
```
