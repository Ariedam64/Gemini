# Magic Dust & Pet Hutch Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expose the new `magicDust` currency and `UpgradePetHutch` action, and make hutch capacity + pet dust value derive dynamically from game data.

**Architecture:** Additive data layer — one new WebSocket action, two pure calculators (hutch capacity, pet dust value), and enrichment of existing `myPets` / `players` globals + types. No new features, no UI, no behavior toggles.

**Tech Stack:** TypeScript strict, Jotai (atoms), game data via `MGData`. Verification via `npm run typecheck` + manual browser DevTools.

**Spec:** [`docs/superpowers/specs/2026-04-21-magic-dust-pet-hutch-design.md`](../specs/2026-04-21-magic-dust-pet-hutch-design.md)

---

## Context the implementer needs

- This project is a userscript mod (Tampermonkey) hooked into the MagicCircle/MagicGarden game in the browser. No test suite is in active use — primary verification is `npm run typecheck` and manual checks via `window.Gemini.*` in the browser console after `npm run dev` builds to `dist/gemini-build.user.js`.
- **Never hardcode game data** (rule #1 in `.claude/rules/core.md`). Tier costs, rarity multipliers tied to specific species, and upgrade tables live in `MGData` — read them dynamically.
- The game itself hardcodes base values as literals (e.g., `25` for hutch base capacity). Those are fine to keep as module-level constants because the game treats them the same way.
- Formulas below were verified by reading the minified game bundle `GameSourceFiles/QuinoaView-ClnqnHhW.js` (functions `Qs`, `mg`, `dg`, `fg`, `pg`).

---

## Task 1: Add `UpgradePetHutch` WebSocket action

**Files:**
- Modify: `src/websocket/protocol.ts` (Pets section of `ClientToServerMessageType`)
- Modify: `src/websocket/api.ts` (add export)

- [ ] **Step 1: Add the message type constant**

Open `src/websocket/protocol.ts`. In the `ClientToServerMessageType` object, locate the `// Pets` block (starts with `PlacePet: "PlacePet",`). Add `UpgradePetHutch: "UpgradePetHutch",` on a new line at the end of that block, right after `SellPet: "SellPet",`.

Replace:
```typescript
  // Pets
  PlacePet: "PlacePet",
  FeedPet: "FeedPet",
  PetPositions: "PetPositions",
  SwapPet: "SwapPet",
  SwapPetFromStorage: "SwapPetFromStorage",
  PickupPet: "PickupPet",
  MovePetSlot: "MovePetSlot",
  NamePet: "NamePet",
  SellPet: "SellPet",
```
With:
```typescript
  // Pets
  PlacePet: "PlacePet",
  FeedPet: "FeedPet",
  PetPositions: "PetPositions",
  SwapPet: "SwapPet",
  SwapPetFromStorage: "SwapPetFromStorage",
  PickupPet: "PickupPet",
  MovePetSlot: "MovePetSlot",
  NamePet: "NamePet",
  SellPet: "SellPet",
  UpgradePetHutch: "UpgradePetHutch",
```

- [ ] **Step 2: Add the API function**

Open `src/websocket/api.ts`. At the end of the `// Pets` section (just after `export function sellPet(...)` and before the `// -----` seasonal section), append:

```typescript
export function upgradePetHutch(win: unknown = pageWindow): SendResult {
  return send(T.UpgradePetHutch, { scope: "Quinoa" }, win as typeof pageWindow);
}
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add src/websocket/protocol.ts src/websocket/api.ts
git commit -m "feat(ws): add UpgradePetHutch action"
```

---

## Task 2: Add `sourceEggId` to pet atom types

**Why:** The dust calculator needs `sourceEggId`. The game's minified Zod schema confirms `sourceEggId` is on inventory pets (required) and on active pet slots (nullable). `src/atoms/types.ts` is currently missing it.

**Files:**
- Modify: `src/atoms/types.ts` (PetInventoryItem + PetSlot)

- [ ] **Step 1: Add `sourceEggId` to `PetInventoryItem`**

In `src/atoms/types.ts`, update `PetInventoryItem` (around lines 99-109) to include `sourceEggId: string;` at the end:

```typescript
export type PetInventoryItem = {
  id: string;
  itemType: "Pet";
  petSpecies: string;
  name: string | null;
  xp: number;
  hunger: number;
  mutations: string[];
  targetScale: number;
  abilities: string[];
  sourceEggId: string;
};
```

- [ ] **Step 2: Add `sourceEggId` to `PetSlot`**

Update `PetSlot` (around lines 146-155) to include `sourceEggId: string | null;` at the end:

```typescript
export type PetSlot = {
  id: string;
  petSpecies: string;
  name: string | null;
  xp: number;
  hunger: number;
  mutations: string[];
  targetScale: number;
  abilities: string[];
  sourceEggId: string | null;
};
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no new errors (these fields are additive; existing consumers ignore unknown fields).

- [ ] **Step 4: Commit**

```bash
git add src/atoms/types.ts
git commit -m "feat(atoms): expose sourceEggId on PetInventoryItem and PetSlot"
```

---

## Task 3: Create the pet hutch capacity calculator

**Files:**
- Create: `src/modules/calculators/logic/petHutch.ts`

- [ ] **Step 1: Write the calculator**

Create `src/modules/calculators/logic/petHutch.ts` with:

```typescript
// src/modules/calculators/logic/petHutch.ts
// Pet Hutch capacity & upgrade calculators - verified from game source
// (function Qs in QuinoaView-ClnqnHhW.js)

import { MGData } from "../../data";

// Game hardcodes this literal in Qs(). Not present in MGData.
const HUTCH_BASE_CAPACITY = 25;
export const HUTCH_MAX_LEVEL = 10;

interface HutchUpgrade {
  targetLevel: number;
  cost: { dustQuantity: number };
  capacityBonus: number;
}

export interface HutchNextUpgrade {
  targetLevel: number;
  dustCost: number;
  capacityAfter: number;
}

function getUpgrades(): HutchUpgrade[] {
  const decors = MGData.get("decors") as Record<string, unknown> | null;
  const hutch = decors?.PetHutch as { upgrades?: HutchUpgrade[] } | undefined;
  return hutch?.upgrades ?? [];
}

/**
 * Compute current hutch capacity from the stored capacityLevel (0-10).
 *
 * Formula mirrors game's Qs("PetHutch", level):
 *   25 + sum(upgrade.capacityBonus for upgrade in upgrades if targetLevel <= level)
 *
 * @param capacityLevel Current hutch capacity level (0..HUTCH_MAX_LEVEL)
 * @returns Max items the hutch can hold right now.
 */
export function calculateHutchCapacity(capacityLevel: number): number {
  return HUTCH_BASE_CAPACITY + getUpgrades()
    .filter((u) => u.targetLevel <= capacityLevel)
    .reduce((sum, u) => sum + u.capacityBonus, 0);
}

/**
 * Get info about the next available upgrade tier, or null if maxed.
 *
 * @param capacityLevel Current hutch capacity level (0..HUTCH_MAX_LEVEL)
 * @returns Next upgrade descriptor (target level, dust cost, capacity after), or null.
 */
export function getNextHutchUpgrade(capacityLevel: number): HutchNextUpgrade | null {
  const next = getUpgrades().find((u) => u.targetLevel === capacityLevel + 1);
  if (!next) return null;
  return {
    targetLevel: next.targetLevel,
    dustCost: next.cost?.dustQuantity ?? 0,
    capacityAfter: calculateHutchCapacity(next.targetLevel),
  };
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/modules/calculators/logic/petHutch.ts
git commit -m "feat(calculators): add pet hutch capacity calculator"
```

---

## Task 4: Add the pet dust value calculator

**Why:** The dust value for selling a pet combines rarity, hatch chance, mutation, and scale multipliers. Formula verified from game function `mg` in `QuinoaView-ClnqnHhW.js`.

**Files:**
- Modify: `src/modules/calculators/logic/pet.ts` (append functions + export)

- [ ] **Step 1: Add the dust value calculator**

At the end of `src/modules/calculators/logic/pet.ts` (after `calculateStrengthProgress`), append:

```typescript
// ─────────────────────────────────────────────────────────────────────────────
// Dust value (sell price in Magic Dust)
// Source: function mg in QuinoaView-ClnqnHhW.js
// ─────────────────────────────────────────────────────────────────────────────

const RARITY_DUST_MULT: Record<string, number> = {
  Common: 1,
  Uncommon: 2,
  Rare: 5,
  Legendary: 10,
  Mythic: 50,
  Divine: 50,
  Celestial: 50,
};

function getHatchChanceDustMult(chancePct: number): number {
  if (chancePct >= 51) return 1;
  if (chancePct >= 11) return 2;
  return 5;
}

function getMutationDustMult(mutations: readonly string[]): number {
  if (mutations.includes("Rainbow")) return 50;
  if (mutations.includes("Gold")) return 25;
  return 1;
}

export interface PetDustValueInput {
  petSpecies: string;
  sourceEggId: string | null;
  xp: number;
  targetScale: number;
  mutations: readonly string[];
}

/**
 * Compute the Magic Dust value a pet would sell for.
 *
 * Formula: floor(100 * rarityMult * hatchMult * mutationMult * scaleMult)
 *   rarityMult    – from pet species rarity in MGData
 *   hatchMult     – from pet's hatch chance in its source egg
 *   mutationMult  – Rainbow=50, Gold=25, else 1
 *   scaleMult     – (currentStrength * targetScale) / maxStrength
 *
 * Returns 0 if pet data is missing.
 */
export function calculatePetDustValue(pet: PetDustValueInput): number {
  const petsData = MGData.get("pets") as Record<string, { rarity?: string }> | null;
  const eggsData = MGData.get("eggs") as Record<
    string,
    { faunaSpawnWeights?: Record<string, number> }
  > | null;

  const rarity = petsData?.[pet.petSpecies]?.rarity;
  const rarityMult = (rarity && RARITY_DUST_MULT[rarity]) ?? 1;

  let chancePct = 100;
  const weights = pet.sourceEggId
    ? eggsData?.[pet.sourceEggId]?.faunaSpawnWeights
    : undefined;
  if (weights) {
    const total = Object.values(weights).reduce<number>(
      (sum, weight) => sum + (weight ?? 0),
      0
    );
    const thisWeight = weights[pet.petSpecies] ?? 0;
    chancePct = total > 0 ? (thisWeight / total) * 100 : 100;
  }
  const chanceMult = getHatchChanceDustMult(chancePct);

  const mutationMult = getMutationDustMult(pet.mutations);

  const maxStrength = calculateMaxStrength(pet.petSpecies, pet.targetScale);
  if (maxStrength <= 0) return 0;
  const currentStrength = calculateCurrentStrength(pet.petSpecies, pet.xp, maxStrength);
  const scaleMult = (currentStrength * pet.targetScale) / maxStrength;

  return Math.floor(100 * rarityMult * chanceMult * mutationMult * scaleMult);
}
```

- [ ] **Step 2: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/modules/calculators/logic/pet.ts
git commit -m "feat(calculators): add pet dust value formula"
```

---

## Task 5: Expose new calculators in `MGCalculators` façade

**Files:**
- Modify: `src/modules/calculators/index.ts`

- [ ] **Step 1: Re-export the petHutch module**

At the top of `src/modules/calculators/index.ts`, after the existing `export * from './logic/mutation';` line, add:

```typescript
export * from './logic/petHutch';
```

- [ ] **Step 2: Wire new functions into `MGCalculators`**

In the same file, locate the `import { ... } from './logic/pet';` block (around the imports section) and add `calculatePetDustValue` at the end of the destructured list:

Replace:
```typescript
import {
  calculatePetAge,
  calculateMaxStrength,
  calculateCurrentStrength,
  isPetMature,
  calculateStrengthPerHour,
  getPetData,
} from './logic/pet';
```
With:
```typescript
import {
  calculatePetAge,
  calculateMaxStrength,
  calculateCurrentStrength,
  isPetMature,
  calculateStrengthPerHour,
  getPetData,
  calculatePetDustValue,
} from './logic/pet';

import {
  calculateHutchCapacity,
  getNextHutchUpgrade,
} from './logic/petHutch';
```

Then extend the `pet:` namespace inside `MGCalculators` and add a new `petHutch:` namespace:

Replace:
```typescript
  // ─── Pet Calculators ───
  pet: {
    calculateAge: calculatePetAge,
    calculateMaxStrength: calculateMaxStrength,
    calculateCurrentStrength: calculateCurrentStrength,
    isMature: isPetMature,
    calculateStrengthPerHour: calculateStrengthPerHour,
    getData: getPetData,
  },
```
With:
```typescript
  // ─── Pet Calculators ───
  pet: {
    calculateAge: calculatePetAge,
    calculateMaxStrength: calculateMaxStrength,
    calculateCurrentStrength: calculateCurrentStrength,
    isMature: isPetMature,
    calculateStrengthPerHour: calculateStrengthPerHour,
    getData: getPetData,
    calculateDustValue: calculatePetDustValue,
  },

  // ─── Pet Hutch Calculators ───
  petHutch: {
    calculateCapacity: calculateHutchCapacity,
    getNextUpgrade: getNextHutchUpgrade,
  },
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/modules/calculators/index.ts
git commit -m "feat(calculators): expose dust value and hutch capacity in MGCalculators"
```

---

## Task 6: Enrich `UnifiedPet` and `MyPetsData.hutch` types

**Files:**
- Modify: `src/globals/core/types.ts`

- [ ] **Step 1: Add fields to `UnifiedPet`**

Find the `UnifiedPet` type in `src/globals/core/types.ts` (just before `MyPetsData`, around line 115 where `maxStrength` and `isMature` are defined). Add `sourceEggId` and `dustValue` at the end.

The final type should look like this (only the last two fields are new — keep all existing fields as-is):
```typescript
export type UnifiedPet = {
  // ...all existing fields...
  maxStrength: number;
  isMature: boolean;
  sourceEggId: string | null;
  dustValue: number;
};
```

If the existing definition is spread across other fields you haven't shown, append only these two lines right before the closing `};`.

- [ ] **Step 2: Enrich `MyPetsData.hutch`**

In the same file, replace the `hutch:` block of `MyPetsData` (currently):
```typescript
  hutch: {
    hasHutch: boolean;
    currentItems: number;
    maxItems: number;
  };
```
With:
```typescript
  hutch: {
    hasHutch: boolean;
    currentItems: number;
    maxItems: number;
    capacityLevel: number;
    nextUpgrade: {
      targetLevel: number;
      dustCost: number;
      capacityAfter: number;
    } | null;
  };
```

- [ ] **Step 3: Typecheck**

Run: `npm run typecheck`
Expected: **errors are expected here** — `myPets.ts` still builds the old shape. These will be fixed in Task 7. If typecheck reports errors outside `src/globals/variables/myPets.ts`, fix those first (should be rare — the hutch/UnifiedPet types are consumed centrally).

- [ ] **Step 4: Do not commit yet**

Leave these type changes staged (or unstaged) — they will be committed together with the implementation in Task 7. This keeps `main` buildable at every commit.

---

## Task 7: Update the `myPets` global to populate new fields

**Files:**
- Modify: `src/globals/variables/myPets.ts`

- [ ] **Step 1: Import the new calculators**

At the top of `src/globals/variables/myPets.ts`, update the calculator import block (currently around lines 22-28) by adding the new functions:

Replace:
```typescript
import {
  calculatePetAge,
  calculateMaxStrength,
  calculateCurrentStrength,
  isPetMature,
} from "../../modules/calculators/logic/pet";
```
With:
```typescript
import {
  calculatePetAge,
  calculateMaxStrength,
  calculateCurrentStrength,
  isPetMature,
  calculatePetDustValue,
} from "../../modules/calculators/logic/pet";
import {
  calculateHutchCapacity,
  getNextHutchUpgrade,
} from "../../modules/calculators/logic/petHutch";
```

- [ ] **Step 2: Extend `MyPetsSources` to include `hutchCapacityLevel`**

Replace the existing `MyPetsSources` type (around lines 29-36) with:

```typescript
type MyPetsSources = {
  inventory: PetInventoryItem[];
  hutch: PetInventoryItem[];
  active: PetSlot[];
  slotInfos: Record<string, PetSlotInfo>;
  myNumPetHutchItems: number;
  hutchCapacityLevel: number;
  activityLogs: ActivityLogEntry[];
};
```

And extend `atomSources` to include the new source key (keep the existing atom mappings; the new `hutchCapacityLevel` is derived from `mySlot`, not from a dedicated atom, so map it to `mySlot` via `slotInfos` or reuse `myPetHutchPetItemsAtom`). Since `atomSources` drives the "ready" set and already includes `hutch` (mapped to `myPetHutchPetItemsAtom`), the capacity level will be read in the same `readSources()` pass — just add a key so the sources map covers it.

Replace:
```typescript
const atomSources = {
  inventory: "myPetInventoryAtom",
  hutch: "myPetHutchPetItemsAtom",
  active: "myPrimitivePetSlotsAtom",
  slotInfos: "myPetSlotInfosAtom",
  myNumPetHutchItems: "myNumPetHutchItemsAtom",
  activityLogs: "myDataAtom",
};
```
With:
```typescript
const atomSources = {
  inventory: "myPetInventoryAtom",
  hutch: "myPetHutchPetItemsAtom",
  active: "myPrimitivePetSlotsAtom",
  slotInfos: "myPetSlotInfosAtom",
  myNumPetHutchItems: "myNumPetHutchItemsAtom",
  hutchCapacityLevel: "myPetHutchPetItemsAtom",
  activityLogs: "myDataAtom",
};
```

- [ ] **Step 3: Update `fromInventoryItem` to populate `sourceEggId` and `dustValue`**

Replace the entire `fromInventoryItem` function (around lines 47-77) with:

```typescript
function fromInventoryItem(item: PetInventoryItem, location: "inventory" | "hutch"): UnifiedPet {
  const growthStage = calculatePetAge(item.xp);
  const maxStrength = calculateMaxStrength(item.petSpecies, item.targetScale);
  const currentStrength = calculateCurrentStrength(item.petSpecies, item.xp, maxStrength);
  const isMature = isPetMature(item.petSpecies, growthStage);

  // Calculate hunger percentage
  const pets = MGData.get("pets") as Record<string, any> | null;
  const petData = pets?.[item.petSpecies];
  const coinsToFullyReplenishHunger = petData?.coinsToFullyReplenishHunger ?? 1;
  const hungerPercent = (item.hunger / coinsToFullyReplenishHunger) * 100;

  const dustValue = calculatePetDustValue({
    petSpecies: item.petSpecies,
    sourceEggId: item.sourceEggId,
    xp: item.xp,
    targetScale: item.targetScale,
    mutations: item.mutations,
  });

  return {
    id: item.id,
    petSpecies: item.petSpecies,
    name: item.name,
    xp: item.xp,
    hunger: item.hunger,
    hungerPercent,
    mutations: [...item.mutations],
    targetScale: item.targetScale,
    abilities: [...item.abilities],
    location,
    position: null,
    lastAbilityTrigger: null,
    growthStage,
    currentStrength,
    maxStrength,
    isMature,
    sourceEggId: item.sourceEggId,
    dustValue,
  };
}
```

- [ ] **Step 4: Update `fromPrimitiveSlot` similarly**

Replace the entire `fromPrimitiveSlot` function (around lines 79-113) with:

```typescript
function fromPrimitiveSlot(slot: PetSlot, slotInfos: Record<string, PetSlotInfo>): UnifiedPet {
  const slotInfo = slotInfos[slot.id];
  const lastAbilityTrigger: PetAbilityTrigger = slotInfo?.lastAbilityTrigger ?? null;
  const position = slotInfo?.position ?? null;

  const growthStage = calculatePetAge(slot.xp);
  const maxStrength = calculateMaxStrength(slot.petSpecies, slot.targetScale);
  const currentStrength = calculateCurrentStrength(slot.petSpecies, slot.xp, maxStrength);
  const isMature = isPetMature(slot.petSpecies, growthStage);

  // Calculate hunger percentage
  const pets = MGData.get("pets") as Record<string, any> | null;
  const petData = pets?.[slot.petSpecies];
  const coinsToFullyReplenishHunger = petData?.coinsToFullyReplenishHunger ?? 1;
  const hungerPercent = (slot.hunger / coinsToFullyReplenishHunger) * 100;

  const dustValue = calculatePetDustValue({
    petSpecies: slot.petSpecies,
    sourceEggId: slot.sourceEggId,
    xp: slot.xp,
    targetScale: slot.targetScale,
    mutations: slot.mutations,
  });

  return {
    id: slot.id,
    petSpecies: slot.petSpecies,
    name: slot.name,
    xp: slot.xp,
    hunger: slot.hunger,
    hungerPercent,
    mutations: [...slot.mutations],
    targetScale: slot.targetScale,
    abilities: [...slot.abilities],
    location: "active",
    position: position ? { x: position.x, y: position.y } : null,
    lastAbilityTrigger,
    growthStage,
    currentStrength,
    maxStrength,
    isMature,
    sourceEggId: slot.sourceEggId,
    dustValue,
  };
}
```

- [ ] **Step 5: Update `buildData` to use dynamic hutch capacity**

Find `buildData` (around lines 225-279). Replace the hutch section (currently around lines 253-275) with the new logic. Specifically, replace:

```typescript
  const myGarden = getMyGarden();
  const gardenData = myGarden.get();
  const hasHutch = gardenData.decors.all.some((decor) => decor.decorId === "PetHutch");
  const currentItems = sources.myNumPetHutchItems ?? 0;
  const maxItems = 25;

  return {
    all,
    byLocation: {
      inventory: inventoryPets,
      hutch: hutchPets,
      active: activePets,
    },
    counts: {
      inventory: inventoryPets.length,
      hutch: hutchPets.length,
      active: activePets.length,
      total: all.length,
    },
    hutch: {
      hasHutch,
      currentItems,
      maxItems,
    },
    abilityLogs: [...abilityLogsStorage],
  };
```
With:
```typescript
  const myGarden = getMyGarden();
  const gardenData = myGarden.get();
  const hasHutch = gardenData.decors.all.some((decor) => decor.decorId === "PetHutch");
  const currentItems = sources.myNumPetHutchItems ?? 0;
  const capacityLevel = sources.hutchCapacityLevel ?? 0;
  const maxItems = calculateHutchCapacity(capacityLevel);
  const nextUpgrade = getNextHutchUpgrade(capacityLevel);

  return {
    all,
    byLocation: {
      inventory: inventoryPets,
      hutch: hutchPets,
      active: activePets,
    },
    counts: {
      inventory: inventoryPets.length,
      hutch: hutchPets.length,
      active: activePets.length,
      total: all.length,
    },
    hutch: {
      hasHutch,
      currentItems,
      maxItems,
      capacityLevel,
      nextUpgrade,
    },
    abilityLogs: [...abilityLogsStorage],
  };
```

- [ ] **Step 6: Update `initialData` to include new hutch fields**

Replace the existing `initialData` (around line 281):
```typescript
const initialData: MyPetsData = {
  all: [],
  byLocation: { inventory: [], hutch: [], active: [] },
  counts: { inventory: 0, hutch: 0, active: 0, total: 0 },
  hutch: { hasHutch: false, currentItems: 0, maxItems: 25 },
  abilityLogs: [],
};
```
With:
```typescript
const initialData: MyPetsData = {
  all: [],
  byLocation: { inventory: [], hutch: [], active: [] },
  counts: { inventory: 0, hutch: 0, active: 0, total: 0 },
  hutch: {
    hasHutch: false,
    currentItems: 0,
    maxItems: 25,
    capacityLevel: 0,
    nextUpgrade: null,
  },
  abilityLogs: [],
};
```

- [ ] **Step 7: Update `readSources` to also read `capacityLevel`**

Find `readSources` (around lines 515-534). Replace it with:

```typescript
  function readSources(): MyPetsSources {
    const slot = getMySlot();
    const data = slot?.data;
    const inventory = (data?.inventory?.items ?? []).filter(
      (i: { itemType: string }) => i.itemType === "Pet"
    ) as PetInventoryItem[];
    const hutchStorage = (data?.inventory?.storages ?? []).find(
      (s: { id?: string; decorId?: string }) => s.id === "PetHutch" || s.decorId === "PetHutch"
    );
    const hutchAllItems = (hutchStorage as { items?: unknown[] })?.items ?? [];
    const hutchItems = (hutchAllItems as { itemType: string }[]).filter(
      (i) => i.itemType === "Pet"
    ) as unknown as PetInventoryItem[];
    const active = (data?.petSlots ?? []) as PetSlot[];
    const slotInfos = (slot?.petSlotInfos ?? {}) as Record<string, PetSlotInfo>;
    const numHutchItems = (hutchStorage as { items?: unknown[] })?.items?.length ?? 0;
    const hutchCapacityLevel =
      (hutchStorage as { capacityLevel?: number })?.capacityLevel ?? 0;
    const activityLogs = (data?.activityLogs ?? []) as ActivityLogEntry[];

    return {
      inventory,
      hutch: hutchItems,
      active,
      slotInfos,
      myNumPetHutchItems: numHutchItems,
      hutchCapacityLevel,
      activityLogs,
    };
  }
```

- [ ] **Step 8: Typecheck**

Run: `npm run typecheck`
Expected: no errors. If `petTeam/logic/active.ts` complains about the hutch shape, read that file — the existing consumer only uses `maxItems` and `currentItems`, both still present, so it should pass cleanly.

- [ ] **Step 9: Commit**

```bash
git add src/globals/core/types.ts src/globals/variables/myPets.ts
git commit -m "feat(globals): derive hutch capacity from capacityLevel and expose pet dust value"
```

---

## Task 8: Expose `magicDust` on the `Player` type

**Files:**
- Modify: `src/globals/core/types.ts` (add `magicDust` to `Player`)
- Modify: `src/globals/variables/players.ts` (read `magicDustCount` from userSlot)

- [ ] **Step 1: Add `magicDust` to the `Player` type**

In `src/globals/core/types.ts`, locate the `Player` type's Économie section (around line 323-325). Replace:
```typescript
  // Économie
  coins: number;
  inventory: unknown;
  shopPurchases: unknown;
```
With:
```typescript
  // Économie
  coins: number;
  magicDust: number;
  inventory: unknown;
  shopPurchases: unknown;
```

- [ ] **Step 2: Add `magicDustCount` to `RawUserSlot.data`**

In `src/globals/variables/players.ts`, locate the `RawUserSlot` type (around lines 30-58). In the `data:` sub-object, insert `magicDustCount: number;` right after `coinsCount: number;`:

Replace:
```typescript
  data: {
    schemaVersion: number;
    coinsCount: number;
    inventory: unknown;
```
With:
```typescript
  data: {
    schemaVersion: number;
    coinsCount: number;
    magicDustCount: number;
    inventory: unknown;
```

- [ ] **Step 3: Populate `magicDust` in `buildPlayer`**

In the same file, locate the `buildPlayer` function's Économie section (around lines 107-110). Replace:
```typescript
    // Économie
    coins: slotData?.coinsCount ?? 0,
    inventory: slotData?.inventory ?? null,
    shopPurchases: slotData?.shopPurchases ?? null,
```
With:
```typescript
    // Économie
    coins: slotData?.coinsCount ?? 0,
    magicDust: slotData?.magicDustCount ?? 0,
    inventory: slotData?.inventory ?? null,
    shopPurchases: slotData?.shopPurchases ?? null,
```

- [ ] **Step 4: Typecheck**

Run: `npm run typecheck`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/globals/core/types.ts src/globals/variables/players.ts
git commit -m "feat(globals): expose magicDust on Player from userSlot.magicDustCount"
```

---

## Task 9: Manual verification in the browser

**Files:** none modified — this is a runtime verification gate before declaring the plan done.

- [ ] **Step 1: Start the dev build**

Run: `npm run dev`
Expected: esbuild watches and writes `dist/gemini-build.user.js`.

- [ ] **Step 2: Load the userscript and open the game**

Open the game URL (e.g., `https://magiccircle.gg/r/<yourRoom>`) with Tampermonkey pointing at the dev build. Wait for the HUD to load (Ctrl+Shift+U toggles it).

- [ ] **Step 3: Verify hutch capacity in the browser console**

In DevTools console, run:
```javascript
const m = window.Gemini.Globals.myPets.get();
console.log("hutch:", m.hutch);
console.log("dust balance:", window.Gemini.Globals.players.get().myPlayer?.magicDust);
console.log("a pet's dust value:", m.all[0]?.dustValue, m.all[0]?.petSpecies);
```
Expected:
- `m.hutch.maxItems` equals the in-game hutch capacity (25 at level 0, 30 at level 1, ..., 100 at level 10).
- `m.hutch.capacityLevel` matches the current upgrade level shown in-game.
- `m.hutch.nextUpgrade` is `null` only when level is 10; otherwise has `targetLevel`, `dustCost`, `capacityAfter`.
- `myPlayer.magicDust` matches the in-game dust counter.
- `m.all[0].dustValue` is a positive integer (matches the sell preview shown when hovering the sell-pet NPC for that pet — close enough; server is authoritative).

- [ ] **Step 4: Verify the WebSocket action dispatches (optional, only if you have enough dust)**

In DevTools console, with at least `nextUpgrade.dustCost` dust on the account, run:
```javascript
window.Gemini.WebSocket.upgradePetHutch();
```
Expected: within a second, `window.Gemini.Globals.myPets.get().hutch.capacityLevel` bumps by 1, `maxItems` reflects the new tier, `magicDust` drops by `dustCost`.

If you don't have enough dust, skip this step — the API existence check (the function is a function, not `undefined`) is enough:
```javascript
typeof window.Gemini.WebSocket.upgradePetHutch === "function"
// → true
```

- [ ] **Step 5: Final typecheck sweep**

Run: `npm run typecheck`
Expected: clean.

- [ ] **Step 6: Done**

Close the worktree / open a PR. No additional commit for this task.

---

## Files touched (summary)

| Path | Tasks |
| --- | --- |
| `src/websocket/protocol.ts` | 1 |
| `src/websocket/api.ts` | 1 |
| `src/atoms/types.ts` | 2 |
| `src/modules/calculators/logic/petHutch.ts` (new) | 3 |
| `src/modules/calculators/logic/pet.ts` | 4 |
| `src/modules/calculators/index.ts` | 5 |
| `src/globals/core/types.ts` | 6, 8 |
| `src/globals/variables/myPets.ts` | 7 |
| `src/globals/variables/players.ts` | 8 |
