# Workflow: Add a Feature

Follow this checklist to add a new optional feature to the mod.

## 1. Create feature structure

Create `src/features/<featureName>/` with required files:

```
src/features/<featureName>/
├── types.ts           # Config, constants, types (required)
├── index.ts           # Public API (required)
├── state.ts           # Storage operations (optional)
├── logic/             # Business logic (recommended)
│   └── core.ts        # Main logic
└── ui.ts              # UI components (optional)
```

## 2. Define types and config

In `types.ts`:
- Define `<FeatureName>Config` interface with `enabled: boolean`
- Import storage key from `src/utils/storage.ts` using `FEATURE_KEYS`
- Define `DEFAULT_CONFIG` with `enabled: false`

Example:
```typescript
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

## 3. Implement state management (if needed)

In `state.ts` (optional):
- Use storage wrapper from `src/utils/storage.ts`
- Implement `loadConfig()`, `saveConfig()`, `updateConfig()`
- Keep functions internal (not exposed in public API)

## 4. Implement business logic

In `logic/core.ts` (or split into multiple files):
- Implement feature functionality
- Import from modules (`MGData`, `MGSprite`, `Store`, `Globals`)
- Use WebSocket API for network actions
- Add cleanup logic for all subscriptions/listeners

## 4.5. UI: Feature UI vs Game UI Injection (Important!)

### **Option A: Feature has its own UI (in Gemini HUD)**
If your feature needs UI components inside the Gemini HUD (settings panel, custom overlay, etc.):
- Keep UI in `src/features/<featureName>/ui.ts`
- Use HUD components from `src/ui/components/`
- Render in Shadow DOM (isolated from game)

**Example:** A settings panel, a custom section in the HUD, etc.

### **Option B: Feature injects into game UI (DOM patching)**
If your feature modifies the **existing game UI** (adds buttons, overlays info, patches game elements):
- **DO NOT** put injection logic in `src/features/`
- **MUST** create injection in `src/ui/inject/qol/<featureName>/`
- Follow [.claude/rules/ui/ui.inject.md](.claude/rules/ui/ui.inject.md)

Structure for game UI injection:
```
src/ui/inject/qol/<featureName>/
├── index.ts       # Public API (init, destroy, isEnabled)
├── inject.ts      # DOM injection logic
├── styles.css.ts  # Injected styles (optional)
└── state.ts       # Persistent state (optional)
```

Rules for injection:
- `init()` must be idempotent (safe to call multiple times)
- `destroy()` must fully remove all injected elements
- Track all cleanups (listeners, observers, intervals)
- Only modify game UI, never Gemini HUD
- Storage key pattern: `gemini:inject:<featureName>:*`

**Example:** Adding a button to the game's inventory, showing player stats on game UI, etc.

### **Option C: Both (Feature UI + Game UI Injection)**
If your feature needs both:
1. Keep feature logic in `src/features/<featureName>/`
2. Create injection in `src/ui/inject/qol/<featureName>/`
3. Feature calls injection's `init()` during its own `init()`
4. Feature calls injection's `destroy()` during its own `destroy()`

**Communication between feature and injection:**
- Use CustomEvents (prefixed `gemini:`)
- Or expose methods in injection's public API

## 5. Create public API

In `index.ts`:
- Export minimal API object: `MG<FeatureName>`
- Required methods: `init()`, `destroy()`
- Recommended methods: `isEnabled()`, `setEnabled()`
- Only expose user-facing functions (see [.claude/rules/features.md](.claude/rules/features.md) section 6)

Example:
```typescript
export const MGMyFeature = {
    // Lifecycle
    init,
    destroy,

    // Configuration
    isEnabled,
    setEnabled,

    // Core functionality (minimal)
    doSomething,
};

export type { MyFeature, MyFeatureConfig } from './types';
```

## 6. Register the feature

### A) Export from `src/features/index.ts`
```typescript
export { MGMyFeature } from './myFeature';
export type { MyFeature } from './myFeature';
```

### B) Expose in `src/api/index.ts`
```typescript
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
import { MGMyFeature } from "../../features/myFeature";

export function initFeatures(loader: LoaderController): void {
  const features = [
    // ... other features
    { name: "MyFeature", init: MGMyFeature.init.bind(MGMyFeature) },
  ];
  // ...
}
```

## 7. Add storage key (if needed)

In `src/utils/storage.ts`:
- Add key to `FEATURE_KEYS` object: `MY_FEATURE: "feature:myFeature:config"`
- Add event to `EVENTS` object if needed: `MY_FEATURE_UPDATED: "gemini:myFeature-updated"`

## 8. Test the feature

1. Test with `enabled: false` (feature should do nothing)
2. Test with `enabled: true` (feature should work)
3. Test toggling at runtime (enable → disable → enable)
4. Verify no memory leaks on `destroy()`
5. Check that `init()` is idempotent (safe to call multiple times)

## Quick checklist

- [ ] Feature structure created
- [ ] `types.ts` with config interface
- [ ] `state.ts` with storage operations (if needed)
- [ ] `logic/` with business logic
- [ ] UI decision made:
  - [ ] Option A: Feature UI in `ui.ts` (Gemini HUD)
  - [ ] Option B: Game UI injection in `src/ui/inject/qol/<featureName>/`
  - [ ] Option C: Both (feature orchestrates injection)
- [ ] `index.ts` with minimal public API
- [ ] Exported from `src/features/index.ts`
- [ ] Exposed in `src/api/index.ts`
- [ ] Initialized in `src/ui/loader/bootstrap.ts`
- [ ] Storage key added to `src/utils/storage.ts` (if needed)
- [ ] All tests passing (toggle on/off, no leaks)
- [ ] If injection: cleanup fully removes all DOM changes
