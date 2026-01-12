# Workflow: Add a Global

Follow this checklist to add a new reactive global variable derived from atoms.

See [.claude/rules/state/globals.md](.claude/rules/state/globals.md) for detailed rules.

## 1. Create the global variable file

Create `src/globals/variables/<name>.ts` where `<name>` is descriptive (e.g., `currentTile.ts`, `playerStats.ts`).

## 2. Import core helpers

Import from the globals core system:
```typescript
import { createReactiveGlobal } from '../core/reactive';
import type { GlobalVariable, Unsubscribe } from '../core/types';
```

## 3. Define the global type

Define the TypeScript type for your global's value:
```typescript
export interface MyGlobal {
  field1: string;
  field2: number;
  // ... derived fields from multiple atoms
}
```

## 4. Implement the derivation logic

Create a function that computes the global value from atoms:
```typescript
import { Store } from '../../atoms';

async function deriveMyGlobal(): Promise<MyGlobal> {
  const atom1 = await Store.select('someAtom');
  const atom2 = await Store.select('anotherAtom');

  // Combine/transform atom data
  return {
    field1: atom1?.value || 'default',
    field2: atom2?.count || 0,
  };
}
```

## 5. Create the reactive global

Use `createReactiveGlobal` to wire everything together:
```typescript
const myGlobal = createReactiveGlobal<MyGlobal>({
  name: 'myGlobal',
  atomKeys: ['someAtom', 'anotherAtom'],  // Atoms this global depends on
  derive: deriveMyGlobal,
});
```

## 6. Implement the public API

Export a lazy singleton getter with the required API:
```typescript
let instance: GlobalVariable<MyGlobal> | null = null;

export function getMyGlobal(): GlobalVariable<MyGlobal> {
  if (!instance) {
    instance = myGlobal;
  }
  return instance;
}
```

The global MUST expose:
- `get()` - Get current value
- `subscribe(callback)` - Subscribe to all changes (may tick often)
- `subscribeStable(callback)` - Subscribe only to meaningful changes
- `destroy()` - Cleanup (idempotent)

## 7. Optional: Add extra subscription helpers

If needed, add domain-specific subscription helpers:
```typescript
// Example: subscribe only when a specific field changes
export function subscribeToField1(callback: (value: string) => void): Unsubscribe {
  const global = getMyGlobal();
  let prev: string | undefined;

  return global.subscribe((value) => {
    if (value.field1 !== prev) {
      prev = value.field1;
      callback(value.field1);
    }
  });
}
```

## 8. Register the global

In `src/globals/index.ts`:
- Export the getter function

Example:
```typescript
export { getMyGlobal } from './variables/myGlobal';
export type { MyGlobal } from './variables/myGlobal';
```

## 9. Expose in public API (if needed)

If this global should be accessible via `window.Gemini.Globals`:

In `src/api/index.ts`:
```typescript
import { getMyGlobal } from '../globals';

export const GeminiAPI = {
  // ...
  Globals: {
    // ... other globals
    myGlobal: getMyGlobal(),
  },
};
```

## 10. Test the global

Verify:
- `get()` returns the correct derived value
- `subscribe()` receives updates when atoms change
- `subscribeStable()` only fires on meaningful changes (not every atom tick)
- `destroy()` can be called multiple times safely
- No memory leaks after destroy

## Quick checklist

- [ ] File created in `src/globals/variables/<name>.ts`
- [ ] Type defined for the global value
- [ ] Derivation function implemented
- [ ] Reactive global created with `createReactiveGlobal`
- [ ] Public API implemented (get, subscribe, subscribeStable, destroy)
- [ ] Lazy singleton getter exported
- [ ] Exported from `src/globals/index.ts`
- [ ] Exposed in `src/api/index.ts` (if public)
- [ ] Tests pass (get, subscribe, subscribeStable, destroy)
- [ ] No memory leaks after destroy
