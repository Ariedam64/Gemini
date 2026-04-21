# Magic Dust currency & Pet Hutch upgrade — Design

**Date:** 2026-04-21
**Status:** Approved

## Context

Game update introduced a new currency `magicDust` (earned by selling pets) and a `UpgradePetHutch` action that upgrades the pet hutch capacity. The hutch now has a `capacityLevel` (0–10) instead of a fixed 25-item cap.

Current mod state:
- `src/globals/variables/myPets.ts` hardcodes `maxItems: 25` (lines 257, 285).
- `src/features/petTeam/logic/active.ts:113` is the only consumer of `hutch.maxItems`.
- `src/globals/variables/players.ts` exposes `coins` but not `magicDust`.
- No WebSocket action for hutch upgrades yet.

## Scope

1. Add WebSocket action `UpgradePetHutch`.
2. Add pure calculator for hutch capacity (reads `MGData.decors.PetHutch.upgrades`).
3. Add pure calculator for pet dust sell value (reads `MGData.pets` + `MGData.eggs`).
4. Enrich `myPets.hutch` global with dynamic capacity + upgrade info.
5. Enrich `UnifiedPet` with `dustValue`.
6. Expose `magicDust` on `Player` type.

## Non-goals

- No toggleable feature (no `src/features/*` added).
- No UI work (HUD tab, upgrade button, etc.). Only data exposure.
- No automation (auto-upgrade hutch, auto-sell pets, etc.).

## Design

### 1. WebSocket action

**`src/websocket/protocol.ts`** — add to `ClientToServerMessageType` (Pets section):
```typescript
UpgradePetHutch: "UpgradePetHutch",
```

**`src/websocket/api.ts`** — add:
```typescript
export function upgradePetHutch(win: unknown = pageWindow): SendResult {
  return send(T.UpgradePetHutch, { scope: "Quinoa" }, win as typeof pageWindow);
}
```

No payload: the server upgrades the caller's hutch to `currentLevel + 1` using their dust.

### 2. Hutch capacity calculator

**New file `src/modules/calculators/logic/petHutch.ts`:**

```typescript
import { MGData } from "../../data";

export const HUTCH_BASE_CAPACITY = 25;
export const HUTCH_MAX_LEVEL = 10;

type HutchUpgrade = {
  targetLevel: number;
  cost: { dustQuantity: number };
  capacityBonus: number;
};

function getUpgrades(): HutchUpgrade[] {
  const decors = MGData.get("decors") as Record<string, unknown> | null;
  const hutch = decors?.PetHutch as { upgrades?: HutchUpgrade[] } | undefined;
  return hutch?.upgrades ?? [];
}

export function getHutchCapacity(capacityLevel: number): number {
  return HUTCH_BASE_CAPACITY + getUpgrades()
    .filter((u) => u.targetLevel <= capacityLevel)
    .reduce((sum, u) => sum + u.capacityBonus, 0);
}

export type HutchUpgradeInfo = {
  targetLevel: number;
  dustCost: number;
  capacityAfter: number;
};

export function getNextHutchUpgrade(capacityLevel: number): HutchUpgradeInfo | null {
  const next = getUpgrades().find((u) => u.targetLevel === capacityLevel + 1);
  if (!next) return null;
  return {
    targetLevel: next.targetLevel,
    dustCost: next.cost.dustQuantity,
    capacityAfter: getHutchCapacity(next.targetLevel),
  };
}
```

Base `25` is a runtime constant (game hardcodes it too — not listed in game data). Upgrade tiers come from `MGData.decors.PetHutch.upgrades` per rule #1 (no hardcoded game data).

Export from `src/modules/calculators/logic/index.ts` (if present) and from `src/modules/calculators/index.ts`.

### 3. Pet dust value calculator

**Extend `src/modules/calculators/logic/pet.ts`** (pure, alongside existing pet calcs):

```typescript
const RARITY_DUST_MULT: Record<string, number> = {
  Common: 1,
  Uncommon: 2,
  Rare: 5,
  Legendary: 10,
  Mythic: 50,
  Divine: 50,
  Celestial: 50,
};

function getHatchChanceMult(chancePct: number): number {
  if (chancePct >= 51) return 1;
  if (chancePct >= 11) return 2;
  return 5;
}

function getMutationDustMult(mutations: readonly string[]): number {
  if (mutations.includes("Rainbow")) return 50;
  if (mutations.includes("Gold")) return 25;
  return 1;
}

export type DustValueInput = {
  petSpecies: string;
  sourceEggId: string | null;
  xp: number;
  targetScale: number;
  mutations: readonly string[];
};

export function calculatePetDustValue(pet: DustValueInput): number {
  const pets = MGData.get("pets") as Record<string, { rarity?: string }> | null;
  const eggs = MGData.get("eggs") as Record<
    string,
    { faunaSpawnWeights?: Record<string, number> }
  > | null;

  const rarity = pets?.[pet.petSpecies]?.rarity;
  const rarityMult = (rarity && RARITY_DUST_MULT[rarity]) ?? 1;

  let chancePct = 100;
  const weights = pet.sourceEggId ? eggs?.[pet.sourceEggId]?.faunaSpawnWeights : undefined;
  if (weights) {
    const total = Object.values(weights).reduce<number>((s, w) => s + (w ?? 0), 0);
    const thisWeight = weights[pet.petSpecies] ?? 0;
    chancePct = total > 0 ? (thisWeight / total) * 100 : 100;
  }
  const chanceMult = getHatchChanceMult(chancePct);

  const mutMult = getMutationDustMult(pet.mutations);

  const maxStr = calculateMaxStrength(pet.petSpecies, pet.targetScale);
  if (maxStr <= 0) return 0;
  const curStr = calculateCurrentStrength(pet.petSpecies, pet.xp, maxStr);
  const scaleMult = (curStr * pet.targetScale) / maxStr;

  return Math.floor(100 * rarityMult * chanceMult * mutMult * scaleMult);
}
```

Formula mirrors game function `mg` found in `QuinoaView` bundle (verified).

### 4. `myPets.hutch` enrichment

**`src/globals/core/types.ts`** — update `MyPetsData.hutch`:
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

**`src/globals/core/types.ts`** — update `UnifiedPet`:
```typescript
export type UnifiedPet = {
  // ...existing fields...
  sourceEggId: string | null;
  dustValue: number;
};
```

**`src/globals/variables/myPets.ts`** changes:
- `MyPetsSources` gains `hutchCapacityLevel: number` (default 0).
- `readSources()` reads `(hutchStorage as { capacityLevel?: number }).capacityLevel ?? 0`.
- `fromInventoryItem` / `fromPrimitiveSlot` now populate `sourceEggId` (inventory already has it; `PetSlot` has it too — verify in atoms/types.ts, add if missing).
- `fromInventoryItem` / `fromPrimitiveSlot` call `calculatePetDustValue(...)` and set `dustValue`.
- `buildData` uses `getHutchCapacity(capacityLevel)` for `maxItems` and `getNextHutchUpgrade(capacityLevel)` for `nextUpgrade`.
- Update `initialData.hutch` to include `capacityLevel: 0, nextUpgrade: null`.

Since `petTeam/logic/active.ts:113` reads `hutchInfo.maxItems`, it auto-benefits from the fix.

### 5. `Player.magicDust` exposure

**`src/globals/variables/players.ts`:**
- `RawUserSlot.data` gains `magicDustCount: number`.
- `buildPlayer` adds `magicDust: slotData?.magicDustCount ?? 0`.

**`src/globals/core/types.ts`** — `Player` type gains:
```typescript
magicDust: number;
```

Accessible via `Globals.players.myPlayer.magicDust`.

### 6. Public API exposure

- `window.Gemini.WebSocket.upgradePetHutch()` — auto-exposed via api.ts reexport.
- `window.Gemini.Globals.myPets.get().hutch` — enriched object.
- `window.Gemini.Globals.myPets.get().all[i].dustValue` — per-pet sell value.
- `window.Gemini.Globals.players.get().myPlayer.magicDust` — dust balance.

## Files touched

| Path | Change |
| --- | --- |
| `src/websocket/protocol.ts` | add `UpgradePetHutch` type |
| `src/websocket/api.ts` | add `upgradePetHutch()` |
| `src/modules/calculators/logic/petHutch.ts` | **new** — capacity + upgrade info |
| `src/modules/calculators/logic/pet.ts` | add `calculatePetDustValue` |
| `src/modules/calculators/index.ts` | re-export new functions |
| `src/globals/core/types.ts` | enrich `MyPetsData.hutch`, `UnifiedPet`, `Player` |
| `src/globals/variables/myPets.ts` | read capacityLevel, populate dustValue, use calculators |
| `src/globals/variables/players.ts` | read `magicDustCount`, expose `magicDust` |
| `src/atoms/types.ts` (if needed) | add `sourceEggId` to `PetSlot` if missing |

## Verification

- Typecheck passes (`npm run typecheck`).
- `window.Gemini.Globals.myPets.get().hutch.maxItems` matches game-displayed hutch capacity at current level.
- `window.Gemini.Globals.myPets.get().all.find(p => p.id === '<knownId>').dustValue` matches game's sell-pet preview.
- `window.Gemini.Globals.players.get().myPlayer.magicDust` matches in-game dust counter.
- `window.Gemini.WebSocket.upgradePetHutch()` bumps the level if enough dust (verified by server state change).
- `petTeam` activate flow uses new max capacity (no regression if user has base hutch).

## Risks / edge cases

- Pet without `sourceEggId` (e.g., mutated/event pets): `chancePct` defaults to 100 → mult = 1. Matches game.
- Pet with species not in `MGData.pets`: `rarityMult = 1`, `dustValue` effectively uses default. Safe fallback.
- `MGData` not loaded yet: calculators return `0` or use defaults — caller must accept `0` early on. No crash.
- Unknown rarity string (future game update): falls back to 1.
- Player in another room without hutch: `hasHutch=false`, `maxItems = HUTCH_BASE_CAPACITY`, `nextUpgrade=null`.
