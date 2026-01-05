# Changelog

All notable changes to Gemini. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — 2026-01-05

> CSS Variable Standardization: Internal game-specific variables (mutations, rarities) + header color consistency + Auto-Favorite architectural compliance

---

### 🆕 Added

#### Internal CSS Variables — Theme Architecture
Added 17 internal CSS variables to all 8 themes (NOT exposed in style/theme editor):
- 9 mutation colors: `--mut-rainbow`, `--mut-gold`, `--mut-wet`, `--mut-chilled`, `--mut-frozen`, `--mut-dawnlit`, `--mut-dawncharged`, `--mut-ambershine`, `--mut-ambercharged`
- 7 rarity colors: `--rarity-common`, `--rarity-uncommon`, `--rarity-rare`, `--rarity-legendary`, `--rarity-mythical`, `--rarity-divine`, `--rarity-celestial`
- 1 component variable: `--switch-thumb`

**Why:** Game-authentic colors remain consistent but use CSS variables for proper theme architecture compliance.

**Files:**
- `src/ui/theme/definitions.ts` — Added variables to all themes
- `src/ui/components/Badge/badge.css.ts` — Rarity badges use variables
- `src/ui/components/Switch/switch.css.ts` — Thumb uses variable

#### Auto-Favorite Section State Management
Created required `state.ts` file following section architecture rules:
- `src/ui/sections/AutoFavoriteSettings/state.ts` — Persistent state using `createSectionStore` pattern

---

### 🔄 Changed

#### Header Text → `--pill-to` Color
Changed header text across UI to use `--pill-to` for consistency:
- Journal "GARDEN JOURNAL" header
- Card component titles (affects Auto-Favorite section)

**Files:**
- `src/ui/sections/JournalChecker/styles.css.ts` (Line 64)
- `src/ui/components/Card/Card.ts` (Line 318)

#### Auto-Favorite Section → Architectural Compliance
Refactored to comply with `.claude/rules/ui/sections.md`:
- Created required `state.ts` file using `createSectionStore` pattern
- Removed inline `<style>` element (85+ lines)
- Now injects external `styles.css.ts` via `injectStyleOnce()`
- State management separated from UI logic
- All state access uses `getStore()` pattern

**Files:**
- NEW: `src/ui/sections/AutoFavoriteSettings/state.ts`
- `src/ui/sections/AutoFavoriteSettings/section.ts` (major refactor)

---

### 🐛 Fixed

#### MagicGarden Journal Text Invisible
Fixed invisible text issue caused by conflicting text-shadow.

**Root Cause:** Black text with white text-shadow on cream background
**Fix:** Added `text-shadow: none;` to MagicGarden override

**Files:**
- `src/ui/sections/JournalChecker/styles.css.ts` (Lines 114-121)

---

## [Unreleased] — 2026-01-02

> Major refactor: Storage layer (GM_*), module API standardization (MG* pattern), UI components (class-based styling), comprehensive compliance audit against `.claude/rules/`.

---

### 🆕 Added

#### `src/utils/keys.ts` — Centralized Storage Keys

All storage keys and event names in one place.

```typescript
import { STORAGE_KEYS, EVENTS } from '@/utils/keys';

// Instead of: storageGet('gemini:features:autoFavorite:ui', ...)
// Now:        storageGet(STORAGE_KEYS.FEATURE.AUTO_FAVORITE_UI, ...)
```

**Why:** Prevent typos, single source of truth for all key names.

---

#### `src/utils/storage.ts` — Unified Storage Wrapper

Single GM_* based storage layer with automatic `gemini:` prefixing.

| Function | Purpose |
|----------|---------|
| `storageGet(key, default)` | Read value |
| `storageSet(key, value)` | Write value + dispatch event |
| `storageRemove(key)` | Delete key |
| `migrateStorageKeys()` | One-time localStorage → GM_* migration |

**Why:** TODO.md required moving storage from `ui/hud/state/` to `src/utils/`.

---

### 🔄 Changed

#### Storage Layer → GM_* Only

**Before:** Mixed localStorage (`modules/shared/storage.ts`) + GM_* (`ui/hud/state/storage.ts`)

**After:** All storage uses `src/utils/storage.ts` (GM_* API)

Files updated:
- `modules/autoFavorite/state.ts`
- `modules/journalChecker/state.ts`
- `modules/bulkFavorite/state.ts`
- `ui/hud/state/storage.ts` → now re-exports from `utils/storage.ts`

✅ **Tested:** `npm run typecheck` — no new errors

---

#### UI Sections → Standard Structure

**Before:** Inconsistent naming (`State.ts` vs `state.ts`, `settings.ts` vs `section.ts`)

**After:** All sections follow `.claude/rules/ui/ui.sections.md`:
```
MySection/
├── index.ts      # public exports
├── section.ts    # build/destroy
└── state.ts      # persistent state
```

Sections restructured:
- Settings, Test, AutoFavoriteSettings, FeatureSettings, JournalChecker

✅ **Tested:** Registry loads all sections, typecheck passes

---

#### Module APIs → `MG*` Pattern

**Before:** Individual exports
```typescript
import { start, stop, setEnabled } from './autoFavorite';
start();
```

**After:** Single `MG<Name>` object with `init()` + `isReady()`
```typescript
import { MGAutoFavorite } from './autoFavorite';
MGAutoFavorite.init();
```

Modules updated: `autoFavorite`, `journalChecker`

> Backward compatibility: Old imports still work (deprecated).

✅ **Tested:** `initAllModules()` uses new API, typecheck passes

---

#### UI Components → Class-Based Styling

**Before:** Components with inline styles (Divider, Range, StatRow)

**After:** Separate CSS files per `ui.components.md`
```
Divider/
├── Divider.ts       # Logic + façade API
└── divider.css.ts   # Theme-compatible CSS
```

Components refactored:
- `Divider` — Added variant support (default/thick/dashed/vertical)
- `Range` — Added façade API (setValue/getValue/setDisabled)
- `StatRow` — Added façade API (setValue/setLabel/setDescription)

✅ **Tested:** All 19 components now comply with `ui.components.md`

---

#### Complex Modules → No Nested Barrel Files

**Before:** `journalChecker/logic/index.ts` re-exports everything

**After:** Direct imports in main `index.ts`
```typescript
import * as Progress from './logic/progress';
import * as Lifecycle from './logic/lifecycle';
```

**Why:** Developer feedback — "duplicated index.ts" confusion.

---

### � Fixed

#### TypeScript Errors → 0 Errors

**Before:** 4 errors in 2 files

**After:** `npm run typecheck` passes with 0 errors

| File | Issue | Fix |
|------|-------|-----|
| `bulkFavorite/logic.ts` | Missing `isFavorited`/`id` | Used `favoritedItemIds` Set + type guard |
| `customModal/index.ts` | Sync `destroy()` called async | Made `destroy()` async |

---

#### Package.json Scripts

**Before:** Missing `release`, `devtools` was incorrectly configured

**After:** All scripts match `.claude/CLAUDE.md` docs

```json
"release": "vite build --mode release",
"devtools": "vite build --watch"
```

---

#### Missing MGJournalChecker Initialization

**Before:** `MGJournalChecker` was exported but not initialized in `initAllModules()`

**After:** Added missing import and initialization task

```typescript
import { MGJournalChecker } from "./journalChecker";
// ...
{ name: "JournalChecker", init: () => MGJournalChecker.init() },
```

**Impact:** This was causing atoms to return null and modules not fully exposing to `window.Gemini`.

---

#### Missing Module API Exports

**Before:** `MGAutoFavorite`, `MGJournalChecker`, `MGBulkFavorite` were not exposed in `window.Gemini.Modules`

**After:** Added missing imports and exports to `src/api/index.ts`

```typescript
import { MGAutoFavorite, MGJournalChecker, MGBulkFavorite } from "../modules";
// ...
Modules: {
  // ...
  AutoFavorite: MGAutoFavorite,
  JournalChecker: MGJournalChecker,
  BulkFavorite: MGBulkFavorite,
  // ...
}
```

**Impact:** Gemini API now properly exposes all refactored modules.

---

#### MGData Data Loading & Reliability (Robust Fix)

**Before:** `MGData` relied on passive `Object.keys` hooks and often failed in the Vite build due to sandbox isolation and HMR state loss, leading to `null` plants/pets/items in the HUD.

**After:** 
1. **Context Fix:** Restored `'inject-into': 'page'` in `vite.config.ts`, matching the working `main` branch and ensuring hooks are visible to the game.
2. **HMR Stability:** Implemented dev-only state persistence on `pageWindow` to allow captured data to survive development reloads.
3. **Proactive Dev Trigger:** Added a dev-only (auto-stripped in prod) proactive scan trigger in `MGData.init()` to ensure prompt data capture.
4. **Compliance (Rule 25):** Standardized early synchronous hook installation in `main.ts`.

**Impact:** Reliable and compliant game data capture across all environments and build systems.

---

### 📝 Docs Updated

- `.claude/rules/ui/ui.inject.md` — **NEW** QOL injection architecture
- `.claude/CLAUDE.md` — Added ui.inject reference
- `TODO.md` — Sections 1, 2, 3, 4, 7, 8 marked complete/mostly complete
- `CHANGELOG.md` — Comprehensive change log for this refactor

---

### 🔍 Comprehensive Compliance Audit

All code audited against `.claude/rules/` documentation:

| Area | Files Fixed | Issue |
|------|-------------|-------|
| Storage | `tracker/stats.ts` | Was using `localStorage` → now uses `storageGet/storageSet` |
| Storage | `DevSection.ts` | Was using `localStorage` → now uses `storageGet` + `DEV_KEYS` |
| Storage | `achievements/manager.ts` | Was using `localStorage` → now uses `storageGet/storageSet` |
| Deprecated | `shared/storage.ts` | Added deprecation notice pointing to `utils/storage.ts` |
| Keys | `utils/keys.ts` | Added `TRACKER_STATS`, `ACHIEVEMENTS` keys + descriptions |
| UI Sections | `Dev/index.ts` | Created proper facade; updated `registry.ts` import |
| Comments | `media/audio.ts` | Clarified game volume reads are intentional exception |

**Verified exceptions (intentional localStorage reads):**
- `media/audio.ts` — Reads game's volume settings (not Gemini storage)
- `utils/storage.ts` — Migration helper for localStorage → GM_*

---

### ⚠️ Known Issues

None — All TypeScript errors resolved!

---

## Previous Versions

Changelog started 2026-01-02.
