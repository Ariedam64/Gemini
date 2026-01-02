# Workflow: Create a new feature

Use this workflow when creating a new optional feature for the mod.

## Prerequisites

1. Feature name decided (e.g., "CropTimer")
2. Feature purpose clear (what does it do?)
3. Feature is optional and toggleable (not core infrastructure)

## Steps

### 1. Create feature directory structure

```bash
src/features/
└── myFeature/
    ├── index.ts       # Public API
    ├── types.ts       # Types and constants
    ├── state.ts       # State management
    └── README.md      # Feature documentation (optional)
```

### 2. Define types (`types.ts`)

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

### 3. Implement state management (`state.ts`)

```typescript
import { storageGet, storageSet } from '../../utils/storage';
import type { MyFeatureConfig } from './types';
import { STORAGE_KEY, DEFAULT_CONFIG } from './types';

export function loadConfig(): MyFeatureConfig {
    return storageGet<MyFeatureConfig>(STORAGE_KEY, DEFAULT_CONFIG);
}

export function saveConfig(config: MyFeatureConfig): void {
    storageSet(STORAGE_KEY, config);
}

export function isEnabled(): boolean {
    return loadConfig().enabled;
}

export function setEnabled(enabled: boolean): void {
    const config = loadConfig();
    config.enabled = enabled;
    saveConfig(config);
}
```

### 4. Create public API (`index.ts`)

```typescript
import { loadConfig, saveConfig, isEnabled, setEnabled } from './state';
import type { MyFeatureConfig } from './types';

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

// Export public API
export const MGMyFeature = {
    init,
    destroy,
    isEnabled,
    setEnabled,
    getConfig: loadConfig,
    updateConfig: saveConfig,
};

// Export types
export type { MyFeatureConfig };
export { MyFeature } from './types';
```

### 5. Add storage key to `src/utils/storage.ts`

```typescript
export const FEATURE_KEYS = {
    // ... existing keys
    MY_FEATURE: 'feature:myFeature:config',
} as const;
```

### 6. Register feature in `src/features/index.ts`

```typescript
export { MGMyFeature, MyFeature } from "./myFeature";
```

### 7. Re-export from `src/modules/index.ts` (for backward compatibility)

```typescript
export { MGMyFeature, MyFeature } from "../features/myFeature";
```

### 8. Add to module initialization (optional)

If the feature should initialize on mod load:

```typescript
// src/modules/index.ts
import { MGMyFeature } from "../features/myFeature";

export async function initAllModules(...) {
  const tasks = [
    // ... existing tasks
    { name: "MyFeature", init: () => MGMyFeature.init() },
  ];
  // ...
}
```

### 9. Create UI section (if needed)

If the feature needs a UI panel in the HUD:

```typescript
// src/ui/sections/MyFeature/section.ts
import { BaseSection } from "../core/Section";
import { MGMyFeature } from "../../../features/myFeature";

export class MyFeatureSection extends BaseSection {
    constructor() {
        super({ id: "tab-my-feature", label: "My Feature" });
    }

    protected async build(container: HTMLElement): Promise<void> {
        // Build UI...
    }
}
```

Then register in `src/ui/sections/registry.ts`.

### 10. Test

1. Feature disabled by default → should do nothing
2. Enable feature → should work
3. Disable feature → should cleanup
4. Toggle at runtime → should handle gracefully

## Checklist

- [ ] Feature directory created in `src/features/`
- [ ] `types.ts` with config interface and STORAGE_KEY
- [ ] `state.ts` with loadConfig/saveConfig/isEnabled/setEnabled
- [ ] `index.ts` with init/destroy and public API
- [ ] Storage key added to FEATURE_KEYS in `storage.ts`
- [ ] Exported from `src/features/index.ts`
- [ ] Re-exported from `src/modules/index.ts` (backward compat)
- [ ] Added to initAllModules if needed
- [ ] UI section created and registered if needed
- [ ] Tested enabled/disabled states
- [ ] Documentation updated (if applicable)
