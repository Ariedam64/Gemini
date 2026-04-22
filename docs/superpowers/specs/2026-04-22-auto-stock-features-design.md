# Auto-Stock Seed Silo & Decor Shed — Design

**Date:** 2026-04-22
**Status:** Approved (brainstorm), pending spec review

## Context

Two reactive QoL features, ported from the `mgafk-android` companion app:
- **Auto-Stock Seed Silo** — when a seed is picked up that matches a species already in the silo, auto-move it into the silo.
- **Auto-Stock Decor Shed** — same, but for decors that match a `decorId` already in the shed.

**Source behavior reference:** `mgafk-android/app/src/main/java/com/mgafk/app/ui/MainViewModel.kt` (`runAutoStock`, lines ~1000–1043).

## Goals

1. Parity with Android: same triggers, same algorithm, same guards.
2. Integrate both features into the Gemini Settings → "In-Game Enhancements" card with on/off toggles.
3. No throttle (match Android — one WS message per matching inventory item on every inventory change).

## Non-goals

- No UI of our own (no HUD tab, no feedback toast). Just the on/off toggle in Settings.
- No new storages / new decor handling. Skip the feature silently if the player doesn't own the target storage.
- No throttling or debouncing.

## Algorithm (identical for both features, just different targets)

**Trigger:** subscribe to `mySlot` WS bus (same pattern as `myPets`). Fires on every relevant atom change — which is what the Android reference relies on.

**Per fire:**
1. Read `slot.data.inventory` via `getMySlot()`.
2. Find the target storage in `inventory.storages` by matching `storage.decorId === "SeedSilo"` (or `"DecorShed"`). Skip silently if not found.
3. Build a set of already-present keys from that storage's items:
   - SeedSilo → set of `species` for items where `itemType === "Seed"`.
   - DecorShed → set of `decorId` for items where `itemType === "Decor"`.
4. Scan inventory items. For each item whose key is in the set:
   - Call `WebSocketAPI.putItemInStorage(itemId, storageId, toStorageIndex, quantity?)`
   - `itemId = species` for seeds, `itemId = decorId` for decors (matches the Android send).
   - `storageId = "SeedSilo"` or `"DecorShed"`.
   - `toStorageIndex = currentStorageItemCount` (any valid index — server merges stacks).
   - No `quantity` (move all — server default).

**No debounce, no dedup.** A burst of picks will fire multiple WS messages. This matches Android.

## Gemini integration

### Feature files (standard `src/features/<name>/` pattern)

```
src/features/autoStockSeedSilo/
├── types.ts           # { enabled: boolean }, DEFAULT_CONFIG, STORAGE_KEY
├── state.ts           # loadConfig / saveConfig / updateConfig (storage wrapper)
├── logic/
│   └── autoStock.ts   # subscribe handler + core algorithm
└── index.ts           # MGAutoStockSeedSilo = { init, destroy, isEnabled, setEnabled }
```

Same structure for `src/features/autoStockDecorShed/`.

**Implementation details:**
- `init()` — idempotent; if `config.enabled === false`, return early. Otherwise subscribe to WS bus (`"inventory"` and `"mySlot"`) and run the scan immediately for current state.
- `destroy()` — unsubscribe, reset internal state.
- `setEnabled(on: boolean)` — persist config, call `destroy()` then `init()` to pick up the change.
- `isEnabled()` — returns `loadConfig().enabled`.

### Registration in `InjectionRegistry`

Even though nothing about these features modifies the DOM, the "In-Game Enhancements" card is backed by the `InjectionRegistry` ([src/ui/inject/core/registry.ts](../../src/ui/inject/core/registry.ts)). The registry's contract is just `{ init, destroy, isEnabled }` — which our features already implement — so we register directly from the features themselves (no thin wrapper file, no dummy directory under `src/ui/inject/`).

In `src/ui/loader/bootstrap.ts`, after features are initialized:
```ts
const registry = getRegistry();
registry.register({
  id: "autoStockSeedSilo",
  name: "Auto-Stock Seed Silo",
  description: "Whenever a seed in your inventory matches a species already in the silo, move it in automatically.",
  storageKey: "feature:autoStockSeedSilo:enabled",
  defaultEnabled: false,
  injection: {
    init: MGAutoStockSeedSilo.init,
    destroy: MGAutoStockSeedSilo.destroy,
    isEnabled: MGAutoStockSeedSilo.isEnabled,
  },
});
registry.register({ /* same for decorShed */ });
```

**Note:** `src/ui/inject/` stays strictly for DOM injections (per `rules/ui/ui.inject.md`). Our features live in `src/features/` and self-register with the toggle registry — the registry is agnostic to whether the payload actually touches the DOM.

### Public API exposure

In `src/features/index.ts` and `src/api/index.ts` (same pattern as `MGAutoFavorite`):
```ts
window.Gemini.Features.AutoStockSeedSilo = MGAutoStockSeedSilo;
window.Gemini.Features.AutoStockDecorShed = MGAutoStockDecorShed;
```

Toggles via UI ↔ API stay in sync because both route through the feature's `setEnabled()`.

## Files touched

| Path | Change |
| --- | --- |
| `src/features/autoStockSeedSilo/types.ts` | **new** — config types |
| `src/features/autoStockSeedSilo/state.ts` | **new** — persistence |
| `src/features/autoStockSeedSilo/logic/autoStock.ts` | **new** — algorithm + subscription |
| `src/features/autoStockSeedSilo/index.ts` | **new** — public façade |
| `src/features/autoStockDecorShed/*` | **new** — mirror structure |
| `src/features/index.ts` | add exports |
| `src/api/index.ts` | expose both features |
| `src/ui/loader/bootstrap.ts` | initialize features + register with InjectionRegistry |
| `src/utils/storage.ts` | add `FEATURE_KEYS.AUTO_STOCK_SEED_SILO` and `.AUTO_STOCK_DECOR_SHED` |

## Verification

- Own a SeedSilo with at least one species inside. Pick up a seed of that species. Within a second it should appear in the silo (not the inventory).
- Own a DecorShed with at least one decor inside. Pick up a matching decor. Same expectation.
- Without the storage: feature toggled on → no errors in console, no WS messages sent.
- Toggle off via Settings card: no more auto-moves. Re-toggle on: resumes.
- Public API: `window.Gemini.Features.AutoStockSeedSilo.isEnabled()` reflects the toggle state.
- Typecheck passes.

## Risks / edge cases

- **Rapid pickups flood WS**: accepted (same as Android).
- **Silo/shed full**: the feature only sends items whose key is already present → server merges stacks, no 25-slot overflow. If the server rejects a send, we log and continue (per `.claude/rules/websocket/websocket.md` middleware discipline).
- **Favorited / locked items**: the Android app doesn't filter them out. We match that behavior — if a seed/decor is locked, it still matches the key and the server decides whether to accept the move.
- **Decor seed conflicts**: seeds have both `species` and `quantity`; decors have `decorId` and `quantity`. Keys are type-specific (no risk of matching a seed to a decor).
- **Storage schema changes**: the `storages` list shape matches what `myPets.readSources` already reads (`s.id === "X" || s.decorId === "X"`). We use the same dual-match for safety.
