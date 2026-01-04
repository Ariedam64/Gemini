# Features rules

Features are optional, toggleable functionality that enhance the user experience.

## Distinction: Modules vs Features

- **Modules (`src/modules/`)**: Core infrastructure, always active (MGData, MGSprite, MGTile, MGPixi, MGAudio, MGCosmetic, WebSocket, Store, Globals)
- **Features (`src/features/`)**: Optional enhancements, toggleable on/off (AutoFavorite, JournalChecker, BulkFavorite, Achievements, Tracker)

## 1) Feature structure

Each feature lives in `src/features/<featureName>/` and follows this structure:

### Required files:
- `types.ts` - Type definitions, constants, and configuration types
- `index.ts` - Public API and initialization

### Optional files:
- `state.ts` - State management and storage operations (if feature needs persistent state)
- `ui.ts` - UI components (if feature has visual elements)
- `middleware.ts` - WebSocket outgoing message handling
- `handler.ts` - WebSocket incoming message handling

### Logic folder (recommended):
- `logic/` - Business logic implementation
  - Split complex logic into multiple files by responsibility
  - Example: `logic/antiAfk.ts`, `logic/events.ts`, `logic/audio.ts`
  - Keep each file focused and under 500 lines
  - Import from `logic/` folder in `index.ts`

### Example structure:
```
src/features/myFeature/
├── types.ts           # Config, constants, types
├── state.ts           # Storage operations (optional)
├── logic/             # Business logic (recommended)
│   ├── core.ts        # Main logic
│   ├── helpers.ts     # Helper functions
│   └── events.ts      # Event handling
├── index.ts           # Public API
└── ui.ts              # UI components (optional)
```

## 2) Toggle requirement

- All features MUST be toggleable on/off
- Feature config MUST have `enabled: boolean` property
- Use FEATURE_KEYS from `src/utils/storage.ts` (NOT MODULE_KEYS)
- Storage keys use `feature:` prefix (e.g., `feature:autoFavorite:config`)

Example:
```typescript
// types.ts
import { FEATURE_KEYS } from '../../utils/storage';

export interface MyFeatureConfig {
    enabled: boolean;
    // ... other config
}

export const STORAGE_KEY = FEATURE_KEYS.MY_FEATURE;
export const DEFAULT_CONFIG: MyFeatureConfig = {
    enabled: false,
};
```

## 3) Independence

- Features MUST NOT depend on other features
- Features CAN depend on core modules (MGData, MGSprite, Store, Globals, WebSocket API)
- Features CAN use shared utilities from `src/utils/`
- Cross-feature communication MUST use CustomEvents (prefixed `gemini:`)

## 4) Bootstrap pattern

- Export `init()` function that checks if enabled
- Return early if disabled
- Clean up on disable
- Safe to call multiple times

Example:
```typescript
// index.ts
import { loadConfig } from './state';

let initialized = false;

export function init(): void {
    if (initialized) return;

    const config = loadConfig();
    if (!config.enabled) {
        console.log('[MyFeature] Disabled');
        return;
    }

    initialized = true;
    console.log('[MyFeature] Initialized');

    // Setup feature...
}

export function destroy(): void {
    if (!initialized) return;
    initialized = false;

    // Cleanup...
}
```

## 5) Naming conventions

- Public API: `MGFeatureName` (e.g., `MGAutoFavorite`)
- Internal exports: `FeatureName` (e.g., `AutoFavorite`)
- File pattern: `src/features/featureName/` (camelCase)
- Storage key: `feature:featureName:*`

## 6) Public API & Exposure

Features MUST be exposed in two places:

### A) Export from `src/features/index.ts`
```typescript
// src/features/index.ts
export { MGMyFeature } from './myFeature';
export type { MyFeature } from './myFeature';
```

### B) Expose in `src/api/index.ts`
```typescript
// src/api/index.ts
import { MGMyFeature } from "../features/myFeature";

export const GeminiAPI = {
  // ...
  Features: {
    // ... other features
    MyFeature: MGMyFeature,
  },
};
```

### C) Initialize in `src/ui/loader/bootstrap.ts`
```typescript
// src/ui/loader/bootstrap.ts
import { MGMyFeature } from "../../features/myFeature";

export function initFeatures(loader: LoaderController): void {
  const features = [
    // ... other features
    { name: "MyFeature", init: MGMyFeature.init.bind(MGMyFeature) },
  ];
  // ...
}
```

### Feature module structure

**IMPORTANT: Keep the public API minimal and user-focused**

The API exposed via `window.Gemini.Features.*` should contain ONLY essential functions that users need. Internal helpers, validation functions, and constants should NOT be exposed.

**Good example (minimal API):**
```typescript
// index.ts
export const MGMyFeature = {
    // Lifecycle
    init,
    destroy,

    // Configuration
    isEnabled,
    setEnabled,

    // Core functionality (only essential user-facing functions)
    createItem,
    deleteItem,
    getItem,
    getAllItems,
};

export type { MyFeature, MyFeatureConfig } from './types';
```

**Bad example (too verbose):**
```typescript
// ❌ DON'T expose everything
export const MGMyFeature = {
    init,
    destroy,
    isReady,
    isEnabled,
    setEnabled,
    loadConfig,
    saveConfig,
    updateConfig,
    DEFAULT_CONFIG,      // ❌ Internal constant
    STORAGE_KEY,         // ❌ Internal constant
    MAX_ITEMS,           // ❌ Internal constant
    createItem,
    deleteItem,
    getItem,
    getAllItems,
    validateItem,        // ❌ Internal validation
    isItemUnique,        // ❌ Internal helper
    normalizeItem,       // ❌ Internal helper
};
```

**Guidelines:**
- Only expose functions users will actually call
- Hide internal helpers (validation, normalization, etc.)
- Hide constants (MAX_*, STORAGE_KEY, DEFAULT_CONFIG, etc.)
- Hide low-level state operations (loadConfig, saveConfig, updateConfig)
- Keep it simple: lifecycle + config + core features

The feature will be accessible via `window.Gemini.Features.MyFeature`

## 7) Side effects & cleanup

- No side effects on import (per @rules/core.md)
- All event listeners/intervals/observers MUST have cleanup
- Safe to enable/disable at runtime
- Cleanup on destroy() must remove all traces

## 8) Testing toggles

When implementing a feature:
1. Test with `enabled: false` (feature should do nothing)
2. Test with `enabled: true` (feature should work)
3. Test toggling at runtime (enable → disable → enable)
4. Verify no memory leaks on disable
