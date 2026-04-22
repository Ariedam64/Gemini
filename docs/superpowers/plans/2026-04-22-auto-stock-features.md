# Auto-Stock Seed Silo & Decor Shed — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the mgafk-android auto-stock features (seed silo + decor shed) to Gemini as two toggleable features, wire them into the "In-Game Enhancements" Settings card, and add a reusable `getNextFreeStorageIndex` util.

**Architecture:** Two standard `src/features/` modules subscribe to `Globals.myInventory.subscribeStable()` and auto-dispatch `putItemInStorage` WS messages for inventory items whose species/decorId is already present in the matching storage. `myInventory` global is extended with a `storages` field. Features self-register with `InjectionRegistry` via `bootstrap.ts` to appear in the Settings toggle card.

**Tech Stack:** TypeScript strict, Jotai (via `Globals.myInventory`), storage wrapper (`src/utils/storage.ts`), `InjectionRegistry` (for UI toggle integration). Verification via `npm run typecheck` + manual browser DevTools.

**Spec:** [`docs/superpowers/specs/2026-04-22-auto-stock-features-design.md`](../specs/2026-04-22-auto-stock-features-design.md)

---

## Context the implementer needs

- This is a userscript mod (Tampermonkey) for MagicGarden/MagicCircle. The mod runs inside the game page context.
- **No test suite** is actively maintained — primary verification is `npm run typecheck` and manual checks via `window.Gemini.*` in DevTools after `npm run dev` rebuilds `dist/gemini-build.user.js`.
- **Never hardcode game data** (rule #1 of `.claude/rules/core.md`). Storage IDs like `"SeedSilo"` and `"DecorShed"` are game-data keys that the game itself uses as literals — acceptable as module-level constants in our features (same treatment we gave `"PetHutch"` in earlier work).
- **Pre-existing typecheck errors** in `src/modules/cosmetic/*`, `src/modules/rive/riveLoader/*`, `src/ui/components/AvatarBuilder/*`, and `src/ui/components/TeamListItem/TeamListItem_backup.ts` are unrelated — ignore them. Only flag NEW errors introduced by your changes.
- **Reference feature:** `src/features/eggLocker/` follows the same structural pattern (types → state → index with init/destroy/isEnabled/setEnabled). Use it as a template for structure (not logic — our features are simpler, no middleware).

---

## Task 1: Create the `getNextFreeStorageIndex` util

**Files:**
- Create: `src/utils/gameStorage.ts`

- [ ] **Step 1: Create the util file**

Create `src/utils/gameStorage.ts` with:

```typescript
// src/utils/gameStorage.ts
// Pure helpers for reading game storage structures (SeedSilo, DecorShed, PetHutch, ...).

import type { ItemStorage } from "../atoms/types";

/**
 * Get the next free index in a game storage.
 *
 * Game storages are contiguous — items fill from index 0 upward, no gaps —
 * so the count of existing items is also the index of the next empty slot.
 *
 * @param storage The storage to inspect.
 * @returns Index of the next free slot (0 if storage is empty).
 */
export function getNextFreeStorageIndex(storage: ItemStorage): number {
  return storage.items.length;
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no new errors. Pre-existing errors unchanged.

- [ ] **Step 3: Commit**

```bash
git add src/utils/gameStorage.ts
git commit -m "feat(utils): add getNextFreeStorageIndex helper for game storages"
```

---

## Task 2: Expose the util via a new `Utils` namespace in `window.Gemini`

**Files:**
- Modify: `src/api/index.ts`

- [ ] **Step 1: Add import**

In `src/api/index.ts`, add the import near the top (after the WebSocketAPI import, around line 5):

```typescript
import { getNextFreeStorageIndex } from "../utils/gameStorage";
```

- [ ] **Step 2: Add `Utils` namespace to `GeminiAPI`**

Still in `src/api/index.ts`, locate the `GeminiAPI` object. Add a new `Utils` namespace right after the `Features` block and before the `WebSocket` block. The final structure around that section should look like this (context included to show exactly where to insert):

```typescript
  Features: {
    // ... existing entries, unchanged ...
  },

  Utils: {
    getNextFreeStorageIndex,
  },

  WebSocket: {
    // ... existing entries, unchanged ...
  },
```

Do not modify any other section of `GeminiAPI`.

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/api/index.ts
git commit -m "feat(api): expose Utils namespace with getNextFreeStorageIndex"
```

---

## Task 3: Add `FEATURE_KEYS` entries for both features

**Files:**
- Modify: `src/utils/storage.ts`

- [ ] **Step 1: Add the two storage keys**

In `src/utils/storage.ts`, locate the `FEATURE_KEYS` object (around line 58). Add two new entries at the end of the object (before the closing `} as const;`), right after the `DECOR_LOCKER` entry:

Replace:
```typescript
    /** Decor locker feature config */
    DECOR_LOCKER: 'feature:decorLocker:config',
} as const;
```

With:
```typescript
    /** Decor locker feature config */
    DECOR_LOCKER: 'feature:decorLocker:config',
    /** Auto-stock seed silo feature config */
    AUTO_STOCK_SEED_SILO: 'feature:autoStockSeedSilo:config',
    /** Auto-stock decor shed feature config */
    AUTO_STOCK_DECOR_SHED: 'feature:autoStockDecorShed:config',
} as const;
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add src/utils/storage.ts
git commit -m "feat(storage): add FEATURE_KEYS entries for auto-stock features"
```

---

## Task 4: Extend `myInventory` global to expose `storages`

**Files:**
- Modify: `src/globals/core/types.ts`
- Modify: `src/globals/variables/myInventory.ts`

- [ ] **Step 1: Add `storages` to the `MyInventoryData` type**

In `src/globals/core/types.ts`, locate the `MyInventoryData` type. First find the import block at the top and ensure `ItemStorage` is imported from `../../atoms/types`. If the file already imports `InventoryItem` from there, add `ItemStorage` to the same import. Otherwise add a new import.

Check the current import. It's likely something like:
```typescript
import type { InventoryItem, ... } from "../../atoms/types";
```
Extend it to:
```typescript
import type { InventoryItem, ItemStorage, ... } from "../../atoms/types";
```

Then find the `MyInventoryData` type body and add `storages: ItemStorage[];` as a new field. The resulting type should look like:

```typescript
export type MyInventoryData = {
  items: InventoryItem[];
  storages: ItemStorage[];
  // ... all other existing fields unchanged ...
};
```

Do not reorder existing fields. Just append the new one where it makes sense (right after `items` is fine — they're related).

- [ ] **Step 2: Add `storages` to `MyInventorySources` in myInventory.ts**

In `src/globals/variables/myInventory.ts`, locate `MyInventorySources` (around line 15). Replace:

```typescript
type MyInventorySources = {
  inventory: Inventory | null;
  isFull: boolean;
  selectedItemIndex: number | null;
};
```

With:

```typescript
type MyInventorySources = {
  inventory: Inventory | null;
  isFull: boolean;
  selectedItemIndex: number | null;
  storages: ItemStorage[];
};
```

Then, at the top of the file, extend the import from `../../atoms/types` to also import `ItemStorage`:

```typescript
import type { Inventory, InventoryItem, ItemStorage } from "../../atoms/types";
```

- [ ] **Step 3: Populate `storages` in `readSources`**

Still in `src/globals/variables/myInventory.ts`, locate `readSources` (around line 158) and extend it to read `storages`:

Replace:
```typescript
  function readSources(): MyInventorySources {
    const slot = getMySlot();
    const inventory = slot?.data?.inventory ?? null;
    const items = inventory?.items ?? [];
    const selectedItemIndex = slot?.notAuthoritative_selectedItemIndex ?? null;
    return {
      inventory,
      isFull: items.length >= MAX_INVENTORY_SIZE,
      selectedItemIndex,
    };
  }
```

With:
```typescript
  function readSources(): MyInventorySources {
    const slot = getMySlot();
    const inventory = slot?.data?.inventory ?? null;
    const items = inventory?.items ?? [];
    const selectedItemIndex = slot?.notAuthoritative_selectedItemIndex ?? null;
    const storages = (inventory?.storages ?? []) as ItemStorage[];
    return {
      inventory,
      isFull: items.length >= MAX_INVENTORY_SIZE,
      selectedItemIndex,
      storages,
    };
  }
```

- [ ] **Step 4: Populate `storages` in `buildData`**

Locate `buildData` (around line 31) and replace:

```typescript
function buildData(sources: MyInventorySources): MyInventoryData {
  const inventory = sources.inventory;
  const items = inventory?.items ?? [];
  const favoritedItemIds = inventory?.favoritedItemIds ?? [];
  const selectedIndex = sources.selectedItemIndex;

  let selectedItem: SelectedItem = null;
  if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < items.length) {
    selectedItem = {
      index: selectedIndex,
      item: items[selectedIndex],
    };
  }

  return {
    items,
    favoritedItemIds,
    count: items.length,
    isFull: sources.isFull ?? false,
    selectedItem,
  };
}
```

With:

```typescript
function buildData(sources: MyInventorySources): MyInventoryData {
  const inventory = sources.inventory;
  const items = inventory?.items ?? [];
  const favoritedItemIds = inventory?.favoritedItemIds ?? [];
  const selectedIndex = sources.selectedItemIndex;

  let selectedItem: SelectedItem = null;
  if (selectedIndex !== null && selectedIndex >= 0 && selectedIndex < items.length) {
    selectedItem = {
      index: selectedIndex,
      item: items[selectedIndex],
    };
  }

  return {
    items,
    storages: sources.storages ?? [],
    favoritedItemIds,
    count: items.length,
    isFull: sources.isFull ?? false,
    selectedItem,
  };
}
```

- [ ] **Step 5: Update `initialData` to include `storages: []`**

Locate `initialData` (around line 23). Replace:

```typescript
const initialData: MyInventoryData = {
  items: [],
  favoritedItemIds: [],
  count: 0,
  isFull: false,
  selectedItem: null,
};
```

With:

```typescript
const initialData: MyInventoryData = {
  items: [],
  storages: [],
  favoritedItemIds: [],
  count: 0,
  isFull: false,
  selectedItem: null,
};
```

- [ ] **Step 6: Update `getStableKey` to include storage signatures**

Locate `getStableKey` (around line 54). It currently hashes `itemKeys`, `favoritedItemIds`, `isFull`, `selectedItemIndex`. Add a storage signature so `subscribeStable` fires when storages change (not just items).

Replace:
```typescript
function getStableKey(data: MyInventoryData): string {
  const itemKeys = data.items.map((item) => {
    if ("id" in item) {
      return item.id;
    }
    if ("species" in item && item.itemType === "Seed") {
      return `seed:${item.species}:${item.quantity}`;
    }
    if ("toolId" in item) {
      return `tool:${item.toolId}:${item.quantity}`;
    }
    if ("eggId" in item) {
      return `egg:${item.eggId}:${item.quantity}`;
    }
    if ("decorId" in item) {
      return `decor:${item.decorId}:${item.quantity}`;
    }
    return JSON.stringify(item);
  });

  return JSON.stringify({
    itemKeys,
    favoritedItemIds: data.favoritedItemIds,
    isFull: data.isFull,
    selectedItemIndex: data.selectedItem?.index ?? null,
  });
}
```

With:
```typescript
function getStableKey(data: MyInventoryData): string {
  const itemKeys = data.items.map((item) => {
    if ("id" in item) {
      return item.id;
    }
    if ("species" in item && item.itemType === "Seed") {
      return `seed:${item.species}:${item.quantity}`;
    }
    if ("toolId" in item) {
      return `tool:${item.toolId}:${item.quantity}`;
    }
    if ("eggId" in item) {
      return `egg:${item.eggId}:${item.quantity}`;
    }
    if ("decorId" in item) {
      return `decor:${item.decorId}:${item.quantity}`;
    }
    return JSON.stringify(item);
  });

  const storageKeys = data.storages.map((s) => {
    const id = (s as { id?: string; decorId?: string }).id ?? (s as { decorId?: string }).decorId ?? "unknown";
    const itemSig = (s.items ?? [])
      .map((it) => {
        if ("species" in it && it.itemType === "Seed") return `S:${it.species}:${it.quantity}`;
        if ("decorId" in it && it.itemType === "Decor") return `D:${it.decorId}:${it.quantity}`;
        if ("id" in it) return `P:${it.id}`;
        return "?";
      })
      .join(",");
    return `${id}[${itemSig}]`;
  });

  return JSON.stringify({
    itemKeys,
    storageKeys,
    favoritedItemIds: data.favoritedItemIds,
    isFull: data.isFull,
    selectedItemIndex: data.selectedItem?.index ?? null,
  });
}
```

- [ ] **Step 7: Typecheck**

Run: `npm run typecheck`
Expected: no new errors. `ItemStorage` already exists in `src/atoms/types.ts`.

- [ ] **Step 8: Commit**

```bash
git add src/globals/core/types.ts src/globals/variables/myInventory.ts
git commit -m "feat(globals): expose storages in myInventory global"
```

---

## Task 5: Create the `autoStockSeedSilo` feature

**Files:**
- Create: `src/features/autoStockSeedSilo/types.ts`
- Create: `src/features/autoStockSeedSilo/state.ts`
- Create: `src/features/autoStockSeedSilo/logic/autoStock.ts`
- Create: `src/features/autoStockSeedSilo/index.ts`

- [ ] **Step 1: Types**

Create `src/features/autoStockSeedSilo/types.ts`:

```typescript
/**
 * AutoStockSeedSilo types and configuration
 */

export interface AutoStockSeedSiloConfig {
  enabled: boolean;
}

export const DEFAULT_CONFIG: AutoStockSeedSiloConfig = {
  enabled: false,
};

export const STORAGE_ID = "SeedSilo";
```

- [ ] **Step 2: State**

Create `src/features/autoStockSeedSilo/state.ts`:

```typescript
/**
 * AutoStockSeedSilo state management (load/save config)
 */

import { storageGet, storageSet, KEYS } from "../../utils/storage";
import type { AutoStockSeedSiloConfig } from "./types";
import { DEFAULT_CONFIG } from "./types";

export function loadConfig(): AutoStockSeedSiloConfig {
  const stored = storageGet<AutoStockSeedSiloConfig>(
    KEYS.FEATURE.AUTO_STOCK_SEED_SILO,
    DEFAULT_CONFIG
  );
  return { ...DEFAULT_CONFIG, ...stored };
}

export function saveConfig(config: AutoStockSeedSiloConfig): void {
  storageSet(KEYS.FEATURE.AUTO_STOCK_SEED_SILO, config);
}
```

- [ ] **Step 3: Logic**

Create `src/features/autoStockSeedSilo/logic/autoStock.ts`:

```typescript
/**
 * AutoStockSeedSilo — core algorithm.
 *
 * Scans my inventory for seeds whose species is already present in the SeedSilo
 * storage, and auto-moves each one via `putItemInStorage`.
 *
 * Port of mgafk-android `runAutoStock` (MainViewModel.kt) — no debounce, no dedup.
 */

import { getMyInventory } from "../../../globals";
import { putItemInStorage } from "../../../websocket/api";
import { getNextFreeStorageIndex } from "../../../utils/gameStorage";
import { STORAGE_ID } from "../types";
import type { InventoryItem, ItemStorage } from "../../../atoms/types";
import type { MyInventoryData } from "../../../globals/core/types";

type Unsub = () => void;
let unsubscribe: Unsub | null = null;

function findSilo(storages: ItemStorage[]): ItemStorage | null {
  return (
    storages.find(
      (s) =>
        (s as { id?: string }).id === STORAGE_ID ||
        (s as { decorId?: string }).decorId === STORAGE_ID
    ) ?? null
  );
}

function runScan(data: MyInventoryData): void {
  const silo = findSilo(data.storages);
  if (!silo) return;

  const presentSpecies = new Set<string>();
  for (const item of silo.items ?? []) {
    if ("species" in item && item.itemType === "Seed") {
      presentSpecies.add(item.species);
    }
  }
  if (presentSpecies.size === 0) return;

  const toIndex = getNextFreeStorageIndex(silo);

  for (const item of data.items) {
    if (!isSeedItem(item)) continue;
    if (!presentSpecies.has(item.species)) continue;
    putItemInStorage(item.species, STORAGE_ID, toIndex);
  }
}

function isSeedItem(item: InventoryItem): item is InventoryItem & { species: string; itemType: "Seed" } {
  return "species" in item && item.itemType === "Seed";
}

export function startAutoStock(): void {
  if (unsubscribe) return;

  const myInventory = getMyInventory();

  // Immediate scan against current snapshot (covers enable-while-holding-items).
  runScan(myInventory.get());

  // Subscribe to further changes.
  unsubscribe = myInventory.subscribeStable((data) => {
    runScan(data);
  });
}

export function stopAutoStock(): void {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
}
```

- [ ] **Step 4: Public index**

Create `src/features/autoStockSeedSilo/index.ts`:

```typescript
/**
 * AutoStockSeedSilo feature — public façade.
 */

import { loadConfig, saveConfig } from "./state";
import { startAutoStock, stopAutoStock } from "./logic/autoStock";

let initialized = false;

function init(): void {
  if (initialized) return;
  const config = loadConfig();
  if (!config.enabled) {
    console.log("[AutoStockSeedSilo] Disabled");
    return;
  }
  initialized = true;
  startAutoStock();
  console.log("[AutoStockSeedSilo] Initialized");
}

function destroy(): void {
  if (!initialized) return;
  stopAutoStock();
  initialized = false;
  console.log("[AutoStockSeedSilo] Destroyed");
}

function isEnabled(): boolean {
  return loadConfig().enabled;
}

function setEnabled(enabled: boolean): void {
  const config = loadConfig();
  config.enabled = enabled;
  saveConfig(config);

  if (enabled && !initialized) {
    init();
  } else if (!enabled && initialized) {
    destroy();
  }
}

export const MGAutoStockSeedSilo = {
  init,
  destroy,
  isEnabled,
  setEnabled,
};

export type { AutoStockSeedSiloConfig } from "./types";
```

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: no new errors.

- [ ] **Step 6: Commit**

```bash
git add src/features/autoStockSeedSilo/
git commit -m "feat(autoStockSeedSilo): auto-move matching seeds into SeedSilo on inventory change"
```

---

## Task 6: Create the `autoStockDecorShed` feature

Mirror structure of Task 5 with decor-specific types.

**Files:**
- Create: `src/features/autoStockDecorShed/types.ts`
- Create: `src/features/autoStockDecorShed/state.ts`
- Create: `src/features/autoStockDecorShed/logic/autoStock.ts`
- Create: `src/features/autoStockDecorShed/index.ts`

- [ ] **Step 1: Types**

Create `src/features/autoStockDecorShed/types.ts`:

```typescript
/**
 * AutoStockDecorShed types and configuration
 */

export interface AutoStockDecorShedConfig {
  enabled: boolean;
}

export const DEFAULT_CONFIG: AutoStockDecorShedConfig = {
  enabled: false,
};

export const STORAGE_ID = "DecorShed";
```

- [ ] **Step 2: State**

Create `src/features/autoStockDecorShed/state.ts`:

```typescript
/**
 * AutoStockDecorShed state management (load/save config)
 */

import { storageGet, storageSet, KEYS } from "../../utils/storage";
import type { AutoStockDecorShedConfig } from "./types";
import { DEFAULT_CONFIG } from "./types";

export function loadConfig(): AutoStockDecorShedConfig {
  const stored = storageGet<AutoStockDecorShedConfig>(
    KEYS.FEATURE.AUTO_STOCK_DECOR_SHED,
    DEFAULT_CONFIG
  );
  return { ...DEFAULT_CONFIG, ...stored };
}

export function saveConfig(config: AutoStockDecorShedConfig): void {
  storageSet(KEYS.FEATURE.AUTO_STOCK_DECOR_SHED, config);
}
```

- [ ] **Step 3: Logic**

Create `src/features/autoStockDecorShed/logic/autoStock.ts`:

```typescript
/**
 * AutoStockDecorShed — core algorithm.
 *
 * Scans my inventory for decors whose decorId is already present in the
 * DecorShed storage, and auto-moves each one via `putItemInStorage`.
 */

import { getMyInventory } from "../../../globals";
import { putItemInStorage } from "../../../websocket/api";
import { getNextFreeStorageIndex } from "../../../utils/gameStorage";
import { STORAGE_ID } from "../types";
import type { InventoryItem, ItemStorage } from "../../../atoms/types";
import type { MyInventoryData } from "../../../globals/core/types";

type Unsub = () => void;
let unsubscribe: Unsub | null = null;

function findShed(storages: ItemStorage[]): ItemStorage | null {
  return (
    storages.find(
      (s) =>
        (s as { id?: string }).id === STORAGE_ID ||
        (s as { decorId?: string }).decorId === STORAGE_ID
    ) ?? null
  );
}

function runScan(data: MyInventoryData): void {
  const shed = findShed(data.storages);
  if (!shed) return;

  const presentDecors = new Set<string>();
  for (const item of shed.items ?? []) {
    if ("decorId" in item && item.itemType === "Decor") {
      presentDecors.add(item.decorId);
    }
  }
  if (presentDecors.size === 0) return;

  const toIndex = getNextFreeStorageIndex(shed);

  for (const item of data.items) {
    if (!isDecorItem(item)) continue;
    if (!presentDecors.has(item.decorId)) continue;
    putItemInStorage(item.decorId, STORAGE_ID, toIndex);
  }
}

function isDecorItem(item: InventoryItem): item is InventoryItem & { decorId: string; itemType: "Decor" } {
  return "decorId" in item && item.itemType === "Decor";
}

export function startAutoStock(): void {
  if (unsubscribe) return;

  const myInventory = getMyInventory();

  runScan(myInventory.get());

  unsubscribe = myInventory.subscribeStable((data) => {
    runScan(data);
  });
}

export function stopAutoStock(): void {
  if (unsubscribe) {
    unsubscribe();
    unsubscribe = null;
  }
}
```

- [ ] **Step 4: Public index**

Create `src/features/autoStockDecorShed/index.ts`:

```typescript
/**
 * AutoStockDecorShed feature — public façade.
 */

import { loadConfig, saveConfig } from "./state";
import { startAutoStock, stopAutoStock } from "./logic/autoStock";

let initialized = false;

function init(): void {
  if (initialized) return;
  const config = loadConfig();
  if (!config.enabled) {
    console.log("[AutoStockDecorShed] Disabled");
    return;
  }
  initialized = true;
  startAutoStock();
  console.log("[AutoStockDecorShed] Initialized");
}

function destroy(): void {
  if (!initialized) return;
  stopAutoStock();
  initialized = false;
  console.log("[AutoStockDecorShed] Destroyed");
}

function isEnabled(): boolean {
  return loadConfig().enabled;
}

function setEnabled(enabled: boolean): void {
  const config = loadConfig();
  config.enabled = enabled;
  saveConfig(config);

  if (enabled && !initialized) {
    init();
  } else if (!enabled && initialized) {
    destroy();
  }
}

export const MGAutoStockDecorShed = {
  init,
  destroy,
  isEnabled,
  setEnabled,
};

export type { AutoStockDecorShedConfig } from "./types";
```

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: no new errors.

- [ ] **Step 6: Commit**

```bash
git add src/features/autoStockDecorShed/
git commit -m "feat(autoStockDecorShed): auto-move matching decors into DecorShed on inventory change"
```

---

## Task 7: Wire features into exports, API, and bootstrap/registry

**Files:**
- Modify: `src/features/index.ts`
- Modify: `src/api/index.ts`
- Modify: `src/ui/loader/bootstrap.ts`

- [ ] **Step 1: Export from `src/features/index.ts`**

Open `src/features/index.ts`. Add two new exports near the other feature exports (alphabetically between `antiAfk` and similar makes sense, but any location within the top export block is fine). Add:

```typescript
export { MGAutoStockSeedSilo } from "./autoStockSeedSilo";
export type { AutoStockSeedSiloConfig } from "./autoStockSeedSilo";
export { MGAutoStockDecorShed } from "./autoStockDecorShed";
export type { AutoStockDecorShedConfig } from "./autoStockDecorShed";
```

- [ ] **Step 2: Import in `src/api/index.ts`**

Add imports near the other feature imports (around lines 22-36):

```typescript
import { MGAutoStockSeedSilo } from "../features/autoStockSeedSilo";
import { MGAutoStockDecorShed } from "../features/autoStockDecorShed";
```

- [ ] **Step 3: Expose under `Features` namespace**

Still in `src/api/index.ts`, add two entries to the `Features` object. Place them at the end of the existing list, right after `DecorLocker: MGDecorLocker,`:

```typescript
    DecorLocker: MGDecorLocker,
    AutoStockSeedSilo: MGAutoStockSeedSilo,
    AutoStockDecorShed: MGAutoStockDecorShed,
  },
```

- [ ] **Step 4: Wire into `bootstrap.ts` features list**

Open `src/ui/loader/bootstrap.ts`. Add imports near the other feature imports at the top of the file:

```typescript
import { MGAutoStockSeedSilo } from "../../features/autoStockSeedSilo";
import { MGAutoStockDecorShed } from "../../features/autoStockDecorShed";
```

Locate `initFeatures` (around line 191). In the `features` array (around lines 194-208), append two entries at the end, right after `DecorLocker`:

```typescript
    { name: "DecorLocker", init: MGDecorLocker.init.bind(MGDecorLocker) },
    { name: "AutoStockSeedSilo", init: MGAutoStockSeedSilo.init.bind(MGAutoStockSeedSilo) },
    { name: "AutoStockDecorShed", init: MGAutoStockDecorShed.init.bind(MGAutoStockDecorShed) },
  ];
```

- [ ] **Step 5: Register both with the `InjectionRegistry`**

Still in `src/ui/loader/bootstrap.ts`, locate the `registry.register(...)` block inside `initFeatures` (around lines 234-250). After the existing `cropSizeIndicator` registration block (and any blank-line comments that follow), add two new registrations:

```typescript
    registry.register({
      id: 'autoStockSeedSilo',
      name: 'Auto-Stock Seed Silo',
      description: 'Whenever a seed in your inventory matches a species already in the silo, move it in automatically.',
      injection: {
        init: MGAutoStockSeedSilo.init.bind(MGAutoStockSeedSilo),
        destroy: MGAutoStockSeedSilo.destroy.bind(MGAutoStockSeedSilo),
        isEnabled: MGAutoStockSeedSilo.isEnabled.bind(MGAutoStockSeedSilo),
      },
      storageKey: FEATURE_KEYS.AUTO_STOCK_SEED_SILO,
      defaultEnabled: false,
    });

    registry.register({
      id: 'autoStockDecorShed',
      name: 'Auto-Stock Decor Shed',
      description: 'Whenever a decor in your inventory matches a decor already in the shed, move it in automatically.',
      injection: {
        init: MGAutoStockDecorShed.init.bind(MGAutoStockDecorShed),
        destroy: MGAutoStockDecorShed.destroy.bind(MGAutoStockDecorShed),
        isEnabled: MGAutoStockDecorShed.isEnabled.bind(MGAutoStockDecorShed),
      },
      storageKey: FEATURE_KEYS.AUTO_STOCK_DECOR_SHED,
      defaultEnabled: false,
    });
```

Place these BEFORE the `registry.initAll();` call (around line 255) — they must be registered before the initAll runs, otherwise they won't be picked up on mod start.

- [ ] **Step 6: Typecheck**

Run: `npm run typecheck`
Expected: no new errors.

If you get an error about `injection: { init, destroy, isEnabled }` not matching the expected `InjectionAPI` shape, open `src/ui/inject/core/types.ts` and confirm that `InjectionAPI` is `{ init, destroy, isEnabled }` (it is — check Task 7 won't need adjustments). The binding above turns the feature's façade methods into `InjectionAPI`-compatible bound callbacks.

- [ ] **Step 7: Commit**

```bash
git add src/features/index.ts src/api/index.ts src/ui/loader/bootstrap.ts
git commit -m "feat(bootstrap): register auto-stock features + expose in window.Gemini.Features"
```

---

## Task 8: Manual browser verification

**Files:** none modified.

- [ ] **Step 1: Start the dev build**

Run: `npm run dev`
Expected: esbuild/vite watches and writes `dist/gemini-build.user.js`.

- [ ] **Step 2: Load the userscript and open the game**

Open the game URL with Tampermonkey pointing at the dev build. Wait for the HUD (Ctrl+Shift+U toggles it).

- [ ] **Step 3: Sanity-check the new API surface**

In DevTools console:

```javascript
// Feature façades
typeof window.Gemini.Features.AutoStockSeedSilo?.setEnabled === "function"   // true
typeof window.Gemini.Features.AutoStockDecorShed?.setEnabled === "function"  // true

// Util
typeof window.Gemini.Utils?.getNextFreeStorageIndex === "function"  // true

// Settings card shows the two toggles
// Open Settings tab → "In-Game Enhancements" card → verify "Auto-Stock Seed Silo"
// and "Auto-Stock Decor Shed" rows appear.
```

- [ ] **Step 4: Test the SeedSilo flow**

Preconditions: own a SeedSilo on your farm; have at least one species already inside (e.g. `Carrot`); drop some of those same seeds back into your inventory.

Then in the Settings → In-Game Enhancements card, toggle **Auto-Stock Seed Silo** ON.

Expected: within a moment, the matching seeds leave your inventory and appear merged into the silo. No errors in console. New picks of the same species auto-move on the next inventory change.

Toggle OFF → the feature stops moving new picks. Confirmed via console:
```javascript
window.Gemini.Features.AutoStockSeedSilo.isEnabled()  // reflects toggle
```

- [ ] **Step 5: Test the DecorShed flow**

Preconditions: own a DecorShed with at least one decor type inside; hold a matching decor in inventory.

Toggle **Auto-Stock Decor Shed** ON → matching decor auto-moves. Same off/on behavior.

- [ ] **Step 6: Edge cases**

- Toggle ON when you DON'T own the storage → no errors, no WS messages (check Network tab, or the `window.Gemini.WSState` capture buffer).
- Toggle ON with nothing matching → no WS messages fire.
- `window.Gemini.Utils.getNextFreeStorageIndex(window.Gemini.Globals.myInventory.get().storages[0])` → returns `storages[0].items.length`.

- [ ] **Step 7: Final typecheck sweep**

Run: `npm run typecheck`
Expected: clean (aside from pre-existing errors listed in the plan context section).

- [ ] **Step 8: Done**

No additional commit for this task. Plan complete.

---

## Files touched (summary)

| Path | Task |
| --- | --- |
| `src/utils/gameStorage.ts` (new) | 1 |
| `src/api/index.ts` | 2, 7 |
| `src/utils/storage.ts` | 3 |
| `src/globals/core/types.ts` | 4 |
| `src/globals/variables/myInventory.ts` | 4 |
| `src/features/autoStockSeedSilo/` (new, 4 files) | 5 |
| `src/features/autoStockDecorShed/` (new, 4 files) | 6 |
| `src/features/index.ts` | 7 |
| `src/ui/loader/bootstrap.ts` | 7 |
