---
paths: src/globals/**/*
---

# Globals rules

`src/globals/` contains derived reactive variables that combine multiple atoms into a single, easy-to-use value.

## Purpose

Globals provide a **read-only layer** on top of atoms:
- Combine multiple atoms into one derived value
- Expose a simpler API than raw atom subscriptions
- Handle change detection automatically

**Example:** `currentTile` global combines 8 atoms (position, tile, garden, object, plant, etc.) into one object.

## Structure

```
src/globals/
├── core/
│   ├── reactive.ts   # createReactiveGlobal helper
│   └── types.ts      # GlobalVariable interface
├── variables/
│   ├── currentTile.ts    # Individual global
│   └── playerStats.ts    # Individual global
└── index.ts          # Public exports
```

## Creating a Global

Each global lives in `src/globals/variables/<name>.ts`:

```typescript
import { createReactiveGlobal } from '../core/reactive';
import type { GlobalVariable } from '../core/types';
import { Store } from '../../atoms';

// 1. Define the derived type
export interface CurrentTile {
  position: Position | null;
  tile: Tile | null;
  garden: Garden | null;
  plant: Plant | null;
}

// 2. Define which atoms this global depends on
const ATOM_DEPENDENCIES = [
  'positionAtom',
  'tileAtom',
  'gardenAtom',
  'plantAtom',
] as const;

// 3. Derive the value from atoms
async function derive(): Promise<CurrentTile> {
  const [position, tile, garden, plant] = await Promise.all([
    Store.select('positionAtom'),
    Store.select('tileAtom'),
    Store.select('gardenAtom'),
    Store.select('plantAtom'),
  ]);

  return { position, tile, garden, plant };
}

// 4. Create the reactive global
const currentTileGlobal = createReactiveGlobal<CurrentTile>({
  name: 'currentTile',
  atomKeys: ATOM_DEPENDENCIES,
  derive,
});

// 5. Export lazy singleton getter
let instance: GlobalVariable<CurrentTile> | null = null;

export function getCurrentTile(): GlobalVariable<CurrentTile> {
  if (!instance) {
    instance = currentTileGlobal;
  }
  return instance;
}
```

## Required API

Every global MUST expose these methods:

### `get(): T`
Get the current derived value synchronously.

```typescript
const tile = Globals.currentTile.get();
console.log(tile.position);
```

### `subscribe(callback): Unsubscribe`
Subscribe to ALL changes (may fire on every atom tick).

```typescript
const unsubscribe = Globals.currentTile.subscribe((value, prev) => {
  console.log('Changed:', value);
});

// Later: cleanup
unsubscribe();
```

### `subscribeStable(callback): Unsubscribe`
Subscribe only to MEANINGFUL changes (uses internal signature).

```typescript
// Only fires when the derived value actually changes
const unsubscribe = Globals.currentTile.subscribeStable((value, prev) => {
  console.log('Tile actually changed:', value);
});
```

### `destroy(): void`
Cleanup all subscriptions (idempotent - safe to call multiple times).

```typescript
Globals.currentTile.destroy();
```

## Optional: Extra subscription helpers

You can add domain-specific helpers if needed:

```typescript
// Subscribe only when position changes
export function subscribeToPosition(
  callback: (pos: Position | null) => void
): Unsubscribe {
  const global = getCurrentTile();
  let lastPos: string | null = null;

  return global.subscribe((value) => {
    const posKey = value.position ? `${value.position.x},${value.position.y}` : null;
    if (posKey === lastPos) return;
    lastPos = posKey;
    callback(value.position);
  });
}
```

## Rules

### 1. Globals are read-only

Globals derive from atoms - they don't write to them:

```typescript
// ❌ BAD - Globals should not write
Globals.currentTile.set({ ... });

// ✅ GOOD - Write via Store, globals react automatically
await Store.set('positionAtom', newPosition);
// Globals.currentTile.get() will return updated value
```

### 2. Use subscribeStable for UI

Raw `subscribe()` can fire 60+ times per second. Use `subscribeStable()` for UI updates:

```typescript
// ❌ BAD - UI re-renders on every tick
Globals.currentTile.subscribe((tile) => {
  renderUI(tile);  // Performance nightmare!
});

// ✅ GOOD - Only re-render on actual changes
Globals.currentTile.subscribeStable((tile) => {
  renderUI(tile);
});
```

### 3. Always cleanup subscriptions

```typescript
// ❌ BAD - Memory leak
Globals.currentTile.subscribe(callback);
// Never unsubscribed!

// ✅ GOOD - Store and cleanup
const unsubscribe = Globals.currentTile.subscribe(callback);
// Later:
unsubscribe();
```

### 4. Lazy initialization

Globals use lazy singletons - they're created on first access:

```typescript
// Global is created here, not on import
const tile = getCurrentTile();
```

This avoids creating globals that are never used.

## Exposing in public API

If a global should be accessible via `window.Gemini.Globals`:

In `src/api/index.ts`:
```typescript
import { getCurrentTile } from '../globals';

export const GeminiAPI = {
  Globals: {
    currentTile: getCurrentTile(),
  },
};
```

Usage:
```typescript
window.Gemini.Globals.currentTile.get();
window.Gemini.Globals.currentTile.subscribeStable((tile) => { ... });
```

## Common mistakes

### ❌ Missing atom dependency
```typescript
// The global won't update when gardenAtom changes!
const myGlobal = createReactiveGlobal({
  atomKeys: ['positionAtom', 'tileAtom'],  // Missing 'gardenAtom'!
  derive: async () => {
    const garden = await Store.select('gardenAtom');  // Used but not in dependencies
    return { garden };
  },
});
```

### ❌ Heavy computation in derive
```typescript
// ❌ BAD - Expensive work on every tick
async function derive() {
  const data = await Store.select('bigDataAtom');
  return expensiveTransform(data);  // Runs 60+ times/sec!
}

// ✅ GOOD - Use memoization or signature-based caching
async function derive() {
  const data = await Store.select('bigDataAtom');
  const sig = getDataSignature(data);
  if (sig === lastSig) return cachedResult;
  lastSig = sig;
  cachedResult = expensiveTransform(data);
  return cachedResult;
}
```

### ❌ Forgetting to export from index.ts
```typescript
// src/globals/variables/myGlobal.ts ✅
export function getMyGlobal() { ... }

// src/globals/index.ts ❌ MISSING!
// import { getMyGlobal } from '../globals' will fail
```
