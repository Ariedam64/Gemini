# Changelog

All notable changes to Gemini. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — 2026-01-10

> Growth Panel UI Overhaul: Mobile-responsive layout, CSS variable standardization, Celestial sprite support, progress percentage overlay, and BasePetCard component

---

### 🆕 Added

#### Growth Timer Feature (`src/features/growthTimers/`)
Complete growth timer tracking system for eggs and plants:
- `index.ts` — Main entry point with boost calculation exports
- `types.ts` — Type definitions (PlantGrowthData, EggGrowthData)
- `logic/boostCalculator.ts` — Calculates reduction effects from pet abilities

#### Feature Panel Registry System (`src/ui/sections/Pets/parts/featurePanels/`)
Extensible panel system for pet team cards:
- `registry.ts` — Panel registration with isAvailable/getSummary/buildPanel
- `xpPanel.ts` — XP Tracker panel definition
- `GrowthPanel.ts` — Growth Timer panel definition
- `growthPanel.css.ts` — Growth panel styles (CSS variables only)

#### BasePetCard Component (`src/ui/components/BasePetCard/`)
Blank shell component implementing "Stat Grid Protocol":
- `BasePetCard.ts` — Reusable pet card shell with left/content slots
- `basePetCard.css.ts` — Theme-compliant CSS (mobile responsive)

#### New UI Components
- **ArcadeButton** — 3D arcade-style button with click sound
- **GeminiIconButton** — Icon button with Gemini styling
- **ProgressBar** — Reusable progress bar with variants
- **SeeMore** — Generic expand/collapse toggle
- **Tab** — Tab navigation component

#### Pet Team Expansion System (`src/ui/sections/Pets/parts/`)
- `TeamCardExpansion.ts` — Expansion handler for team cards
- `TeamCardDrag.ts` — Drag/drop reordering for teams
- `TeamXpPanel.ts` — Team-specific XP panel
- `featureCard.css.ts` — Feature card styles (collapsed summary bar)

#### Calculator Module (`src/modules/calculators/`)
**MOVED FROM FEATURES** — Calculators now in modules for shared access:
- `crop.ts`, `mutation.ts`, `pet.ts` — Game calculation logic

---

### 🔄 Changed

#### Growth Panel — Mobile Responsive Layout
Comprehensive mobile layout improvements:
- Progress bar width now respects container (no overflow)
- Percentage overlayed ON progress bar (centered)
- Mobile stat-row spacing increased (8px margin-bottom)
- Mobile controls centered (justify-content: center)
- Mobile-first flex ordering (sprite → timer → progress)

**Files:**
- `src/ui/components/BasePetCard/basePetCard.css.ts` — Progress bar relative, percent absolute
- `src/ui/sections/Pets/parts/featureCard.css.ts` — Mobile centering rules

#### Growth Panel — CSS Variable Standardization
All text colors use correct CSS variables per user specification:
- `bar-percent` → `--accent` with black outline
- `bar-info` → `--pill-from` with black outline
- `growth-next-time` → `--pill-to`
- `growth-next-date` → `--fg`
- Time formatting: `162min/h` → `2h 42m/h`

**Files:**
- `src/ui/sections/Pets/parts/featureCard.css.ts`
- `src/ui/sections/Pets/parts/TeamCardExpansion.ts`

#### XP Panel — Progress Percentage Centered
Moved percentage span INSIDE progress bar div for proper CSS centering:
- Both NEXT STR and MAX STR rows affected
- Percentage now visually overlays progress fill

**Files:**
- `src/ui/sections/Pets/parts/featurePanels/xpPanel.ts`

#### Growth Panel — Sprite Bunching
Improved stacked sprites layout:
- CSS grid-based 2x2 layout
- 50-65% overlap visibility
- Smaller scale (0.2) for compact display

**Files:**
- `src/ui/sections/Pets/parts/featurePanels/GrowthPanel.ts`

---

### 🐛 Fixed

#### Celestial Plant Sprites
Added sprite mapping for Celestial crops:
- `DawnCelestial` → `DawnCelestialCrop`
- `MoonCelestial` → `MoonCelestialCrop`
- Applied to: dropdown selection, collapsed summary bar, stat rows

**Files:**
- `src/ui/sections/Pets/parts/TeamCardExpansion.ts`
- `src/ui/sections/Pets/parts/featurePanels/GrowthPanel.ts`

#### Mobile Horizontal Scroll
Fixed horizontal scrolling when Growth team expanded on mobile:
- Added `max-width: 100%` to team progress bars
- Added `flex-wrap: wrap` to summary bar container
- Added responsive breakpoints (480px, 360px, 320px)

**Files:**
- `src/ui/sections/Pets/parts/featureCard.css.ts`

#### x Count Display Removed
Removed "x9", "x11" count displays from stat rows:
- Removed `count` parameter from `buildStatRow()` function
- Updated all 6 call sites
- Sprites now closer to progress bars

**Files:**
- `src/ui/sections/Pets/parts/featurePanels/GrowthPanel.ts`

#### Gemini Scrollbar in Dropdown
Added themed scrollbar to Growth dropdown:
- `scrollbar-width: thin`
- `scrollbar-color: var(--border) transparent`
- `-webkit-overflow-scrolling: touch` for mobile
- Custom webkit scrollbar styles

**Files:**
- `src/ui/sections/Pets/parts/featureCard.css.ts`

---

### ❌ Removed

#### Calculator Feature Files
Moved to `src/modules/calculators/`:
- `src/features/calculators/index.ts`
- `src/features/calculators/logic/crop.ts`
- `src/features/calculators/logic/mutation.ts`
- `src/features/calculators/logic/pet.ts`

#### Journal-Specific Components (Refactored)
Replaced with generic components:
- `src/ui/components/JournalProgressBar/`
- `src/ui/components/JournalSeeMore/`
- `src/ui/components/JournalTab/`

---

## [Unreleased] — 2026-01-07


### 🆕 Added

#### Inline Pet Team XP Tracking
Integrated XP tracking directly into the Pets section for better UX:
- Expandable XP panels for each pet team (click ▶ button in Overview mode)
- Mini progress bars showing average team progress to max STR when collapsed
- Auto-updates every 3 seconds for expanded teams
- Maximum 5 teams can be expanded simultaneously (FIFO auto-collapse)
- Per-pet stats: current/max strength, XP/hour, time to next/max STR, feeds required
- XP Boost ability detection with tier badges (⚡I, ⚡II, ⚡III, ❄ for Snowy)
- Team-wide XP summary showing base + bonus XP rates
- Special handling for max-strength XP Boost pets (shows "supporting feeds" for leveling teammates)
- Starving pet indicators with 0 XP/hr warning

**Files:**
- `src/ui/sections/Pets/parts/TeamXpPanel.ts` — New XP panel component
- `src/ui/sections/Pets/parts/teamXpPanel.css.ts` — Panel styling
- `src/features/xpTracker/logic/teamXpCalculations.ts` — Team-specific XP calculations
- `src/ui/components/TeamListItem/TeamListItem.ts` — Enhanced with expand button + progress badge
- `src/ui/sections/Pets/parts/TeamCard.ts` — XP panel integration logic

---

### 🔄 Changed

#### XP Tracking → Inline in Pets Section
XP tracking moved from standalone section to inline display:
- XP panels now appear directly under pet teams in Overview mode
- Only available in Overview mode (disabled in Manage mode)
- Tied to existing XP Tracker feature toggle (no separate toggle)

---

### ❌ Removed

#### Standalone XP Tracker Section
Removed standalone XP Tracker section (replaced by inline tracking):
- Deleted `src/ui/sections/XpTracker/` directory
- Removed from sections registry
- XP calculation logic preserved in `src/features/xpTracker/`

---

### 🐛 Fixed

#### Team XP Panel — Pet Sprite Rendering
Fixed pet sprites not displaying correctly by replicating JournalChecker sprite pattern:
- Added `await MGSprite.init()` in PetsSection before building panels
- Added `MGSprite.has()` check before attempting to render sprites
- Applied explicit canvas styles (width: 64px, height: 64px, objectFit: contain, display: block)
- Used `boundsMode: 'padded'` option for proper sprite bounds
- Reduced scale from 2 to 1 (matches Journal pattern)
- Added warning logs for failed sprite renders

**Why:** MGSprite requires initialization and proper canvas styling for correct rendering. Following the proven JournalChecker pattern ensures sprites display properly with mutations.

**Files:**
- `src/ui/sections/Pets/section.ts` — Added MGSprite.init() call
- `src/ui/sections/Pets/parts/TeamXpPanel.ts` — Sprite rendering using Journal pattern

#### Team XP Panel — Comprehensive UI/UX Overhaul
Major refinements addressing all user-reported issues:

**Multi-Team Expand Fix:**
- Fixed critical bug preventing multiple teams from being expanded simultaneously
- Implemented DOM preservation during re-renders (detach/reattach pattern)
- Expand/collapse now directly manipulates DOM without full re-render
- Supports up to 5 simultaneously expanded teams (FIFO auto-collapse)

**Progress Badge Visibility:**
- Progress badge now always visible when XP tracking is enabled (even when expanded)
- Provides at-a-glance team progress without needing to expand panel

**Seamless Expand Animation:**
- Eliminated animation delay by populating panel data BEFORE DOM insertion
- Removed render() calls from expand/collapse (prevents destroy/rebuild cycle)
- Content now expands smoothly with animation (no empty-then-populate flash)

**Hover State Refinement:**
- Removed conflicting border color change (was causing double-border artifact)
- Accent bar now smoothly transitions color on hover (pill-from → accent)
- Shadow and transform provide subtle depth on hover without border conflicts

**Progress Bar Format Overhaul:**
- Completely redesigned format per specifications
- **NEXT STR** row: `12.8h (🍖: 13) [████████░░ 69%]`
- **MAX STR** row: `48.5h (🍖: 52) [████░░░░░░ 15%]`
- Removed separate "Progress" row
- Each row shows: time estimate, feed count with emoji, inline progress bar with percentage
- Progress calculations: Next STR shows progress within current level (1-99%), Max STR shows overall progress (0-100%)

**Theme Compatibility:**
- All colors use CSS variables (`--mut-gold`, `--mut-ambercharged`, `--fg`, `--bg`, `--soft`, `--border`, etc.)
- Only exceptions: badge text colors (#fff/#1a1a1a) for accessibility on colored backgrounds (documented with comments)
- Zero color-mix() usage
- Full compatibility across all 8 themes

**Files:**
- `src/ui/sections/Pets/parts/TeamCard.ts` — Multi-team expand fix, DOM preservation, expand button state management
- `src/ui/sections/Pets/parts/TeamXpPanel.ts` — New progress row format, buildProgressWithStats()
- `src/ui/sections/Pets/parts/teamXpPanel.css.ts` — New progress row styles, hover state fixes, theme variable compliance

#### Team XP Panel CSS — Variable Standardization
Refactored `teamXpPanel.css.ts` to use direct CSS variables instead of excessive color-mix():
- Replaced ~40 instances of `color-mix()` with direct variable usage
- Now uses `var(--bg)`, `var(--soft)`, `var(--muted)`, `var(--border)`, `var(--shadow)` directly
- Simplified gradients to use `var(--pill-from)` and `var(--pill-to)` without mixing
- Status colors (`var(--low)`, `var(--medium)`, `var(--high)`, `var(--complete)`) used directly
- Converted remaining gold/warning color-mix instances to `rgba()` for XP boost theming
- Better theme compatibility and maintainability

**Why:** GEMINI's theme system provides comprehensive CSS variables - color-mix() should only be used when truly necessary for dynamic opacity adjustments not covered by existing variables.

**Files:**
- `src/ui/sections/Pets/parts/teamXpPanel.css.ts` — CSS variable refactor

---

## [Previous] — 2026-01-05

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
