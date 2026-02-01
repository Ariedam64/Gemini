---
paths: src/modules/**/*
---

# Modules rules

Modules are core infrastructure components that are always active and essential for the mod to function.

## Distinction: Modules vs Features

- **Modules (`src/modules/`)**: Core infrastructure, always active (MGData, MGSprite, MGTile, MGPixi, MGAudio, MGCosmetic)
- **Features (`src/features/`)**: Optional enhancements, toggleable on/off (see @rules/features.md)

**This file covers modules only.** For optional features, see `.claude/rules/features.md`.

## API (mandatory)

Each module MUST export ONE main object: `MG<ModuleName>` (PascalCase, `MG` prefix).
Exported from `src/modules/<module>/index.ts`.

### Required methods (ALL modules MUST have these):

```typescript
export const MG<ModuleName> = {
  /**
   * Initialize the module
   * MUST be idempotent (safe to call multiple times)
   * MUST be named exactly "init"
   */
  init: () => void | Promise<void>,

  /**
   * Check if module is ready to use
   * MUST be named exactly "isReady"
   * Returns true if initialization is complete
   */
  isReady: () => boolean,

  // ... other module-specific methods
};
```

### Naming conventions:
- **ALWAYS** use `init` (not `initialize`, `detectVersion`, `initializeBaseUrl`, etc.)
- **ALWAYS** use `isReady` (not `isVersionReady`, `isAssetsReady`, etc.)
- Module-specific methods can have descriptive names (e.g., `get()`, `base()`, `url()`, `wait()`)

### Example (correct):
```typescript
export const MGVersion = {
  init: detectVersion,      // ✅ Standard name
  isReady: isVersionReady,  // ✅ Standard name
  get: getVersion,          // ✅ Domain-specific method
  wait: waitForVersion,     // ✅ Domain-specific method
};
```

### Example (incorrect):
```typescript
export const MGVersion = {
  initialize: detectVersion,    // ❌ Wrong name
  isVersionReady: checkReady,   // ❌ Wrong name
  // ...
};
```

## Structure (mandatory)

```
src/modules/<module>/
├── index.ts           # Public façade (required)
├── types.ts           # Type definitions (required)
├── state.ts           # Runtime cache/state (optional)
└── logic/             # Business logic folder (required)
    ├── file1.ts       # Logic file 1
    ├── file2.ts       # Logic file 2
    └── ...
```

### File responsibilities:

- **`index.ts`** (required)
  - Public façade only, no heavy logic
  - Exports the `MG<ModuleName>` object with `init()` and `isReady()`
  - Re-exports types from `types.ts`
  - Imports functions from `logic/` files

- **`types.ts`** (required)
  - Type definitions, interfaces, and constants
  - No side effects, purely declarative
  - Exported types are re-exported from `index.ts`

- **`state.ts`** (optional - only if the module needs runtime cache/state)
  - Runtime state management (caches, flags, in-memory data)
  - State getters/setters used by logic files
  - **If the module has no runtime state, omit this file entirely**
  - Example: MGVersion needs `state.ts` (caches version), but a pure utility module might not

- **`logic/`** (required folder)
  - All business logic goes here
  - Split into multiple files by responsibility
  - **DO NOT** create a `logic/index.ts` barrel file
  - Import directly from logic files in main `index.ts`
  - Example: `import { detectVersion } from "./logic/detection";`

### Storage (rare, most modules don't need this):
- **Most modules use runtime caching only** (in `state.ts`) - no persistence to disk
- If a module needs **persistent storage** (rare):
  - Still use `state.ts` for in-memory cache
  - Use storage wrapper from `src/utils/storage.ts`
  - Use `MODULE_KEYS` with `module:` prefix
  - Expose domain methods (e.g., `getConfig/setConfig`), not raw storage access

Rule: internal complexity is fine, but usage must stay simple (façade rule).

## No side effects on import
Imports must NOT register listeners, start intervals, or patch globals.
If the module allocates hooks/resources, it MUST provide a way to fully cleanup them.

## Boundaries
- Modules must NOT render UI (DOM/ShadowDOM stays in `src/ui/`).
- Modules must NOT send WS directly (use WS API layer / `src/websocket/api.ts`).
