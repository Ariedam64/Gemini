# Workflow: Add an Atom

Follow this checklist to add a new atom to the state system.

See [.claude/rules/state/atoms.md](.claude/rules/state/atoms.md) for detailed rules.

## 1. Define the atom type

In `src/atoms/types.ts`:
- Add the atom key to the `AtomKey` type union
- Add the corresponding type to the `AtomTypeMap` interface

Example:
```typescript
export type AtomKey =
  | "myInventoryAtom"
  | "myNewAtom"  // Add this
  // ...

export interface AtomTypeMap {
  myInventoryAtom: InventoryState;
  myNewAtom: MyNewState;  // Add this
  // ...
}
```

## 2. Declare the atom

In `src/atoms/atoms.ts`:
- Import necessary types
- Create the atom using Jotai's `atom()`

Example:
```typescript
import { atom } from 'jotai';
import type { MyNewState } from './types';

export const myNewAtom = atom<MyNewState | null>(null);
```

## 3. Register the atom in lookup

In `src/atoms/lookup.ts`:
- Add the atom to the `atomRegistry` object so the Store can resolve it by key

Example:
```typescript
import { myNewAtom } from './atoms';

export const atomRegistry = {
  myInventoryAtom,
  myNewAtom,  // Add this
  // ...
} as const;
```

## 4. Expose the atom (if public)

In `src/atoms/index.ts`:
- Re-export the atom if it's part of the public API

Example:
```typescript
export { myNewAtom } from './atoms';
export type { MyNewState } from './types';
```

## 5. Optional: Add a Signature (recommended for frequently updating atoms)

**When to use:** If the atom updates frequently but you only care about real changes (avoid reacting to every tick).

In `src/atoms/signature.ts`:
- Create a signature function that returns a stable hash/string of the important data

Example:
```typescript
export function getMyNewAtomSignature(state: MyNewState | null): string {
  if (!state) return 'null';
  // Only hash the fields that matter for change detection
  return `${state.id}-${state.version}`;
}
```

## 6. Optional: Add a View (recommended for UI-friendly consumption)

**When to use:** If you need a derived/normalized read model for easier UI consumption.

In `src/atoms/view.ts`:
- Create a view function that transforms the atom data into a UI-friendly format

Example:
```typescript
export function getMyNewAtomView(state: MyNewState | null): MyNewView {
  if (!state) return { items: [], total: 0 };

  return {
    items: state.items.map(normalizeItem),
    total: state.items.length,
  };
}
```

## 7. Test the atom

Verify:
- The atom key resolves via Store API: `await Store.select('myNewAtom')`
- Can read value: `const value = await Store.select('myNewAtom')`
- Can write value: `await Store.set('myNewAtom', newValue)`
- Can subscribe: `const unsub = await Store.subscribe('myNewAtom', (value) => { ... })`
- If signature added: verify it doesn't spam when data is unchanged
- If view added: verify it returns the expected transformed data

## Quick checklist

- [ ] Atom key added to `AtomKey` type in `types.ts`
- [ ] Atom type added to `AtomTypeMap` in `types.ts`
- [ ] Atom declared in `atoms.ts`
- [ ] Atom registered in `lookup.ts`
- [ ] Atom exported from `index.ts` (if public)
- [ ] Signature added in `signature.ts` (optional, for frequent updates)
- [ ] View added in `view.ts` (optional, for UI consumption)
- [ ] Store API works (select/set/subscribe)
- [ ] No spam on unchanged data (if using signature)
