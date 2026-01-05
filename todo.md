# TODO

## 1) Storage refactor

> ✅ **COMPLETED** — Storage layer moved to `src/utils/storage.ts` + `src/utils/keys.ts`

- [x] Create `src/utils/storage.ts` (read/write/update/delete)
- [x] Namespace keys with `gemini:`
- [x] Remove the dependency on HUD-only storage access
- [x] Refactor existing HUD storage wrapper to use `src/utils/storage.ts`

---

## 2) UI / QOL injection design

> ✅ **COMPLETED** — Architecture defined in `.claude/rules/ui/ui.inject.md`

- [x] Define architecture for features that modify game UI (DOM patching/injection)
- [x] Placement: `src/ui/inject/qol/<featureName>/`
- [x] Define boundaries + cleanup rules (idempotent, reversible, no leaks)

---

## 3) Project scripts

> ✅ **COMPLETED** — Scripts updated in `package.json`

- [x] `dev`: `npm run dev`
- [x] `build`: `npm run build` → `dist/gemini-build.user.js`
- [x] `release`: `npm run release` → `dist/gemini.user.js`
- [x] `typecheck`: `npm run typecheck`
- [x] `devtools`: `npm run devtools` (watch mode)

---

## 4) Other refactors (modules, sections, components)

> ✅ **MOSTLY COMPLETED** — Modules and components done. UI sections partial (state.ts in section.ts).

- [x] **Modules refactor**
  - [x] `MGAutoFavorite` with `init()` + `isReady()`
  - [x] `MGJournalChecker` with `init()` + `isReady()`
  - [x] `MGBulkFavorite` with `init()` + `isReady()`
  - [x] `MGAchievements` with `init()` + `isReady()`
  - [x] `MGCalculators` with `init()` + `isReady()` (utility, no-op init)
  - [x] `MGSprite` already compliant
  - [x] Updated `modules/index.ts` with all exports + `initAllModules()`

- [/] **UI sections refactor**
  - [x] All sections have `index.ts` facade
  - [x] All sections have main implementation file
  - [ ] Some sections missing `state.ts` (persistence in section.ts instead):
    - `AutoFavoriteSettings/` - persistence in section.ts
    - `FeatureSettings/` - persistence in section.ts
    - `Dev/` - persistence in DevSection.ts

- [x] **UI components refactor**
  - [x] Created missing CSS files: `divider.css.ts`, `range.css.ts`, `statRow.css.ts`
  - [x] Refactored to class-based styling (no inline styles)
  - [x] Added façade APIs with `root`, `setValue`, etc. methods
  - [x] All components now export `componentNameCss` for style injection

---

## 5) Tooling

## 5. Tooling

- [ ] Auto-update: rules/workflows (keep .claude/ in sync)
- [x] ~~Automated: TODO.md + CHANGELOG.md updates~~ → Manual `CHANGELOG.md` created
- [ ] New commands:
  - [ ] Fast git commit (conventional commits)
  - [ ] Fast debug (console beautifier)

## 6. Docs (humans)

- [ ] Rewrite root README for human consumption
  - Remove AI-only instructions → move to .claude/
  - Keep: setup, usage, architecture overview
- [ ] Rewrite src/README if needed (less verbose)
- [ ] Update key folder READMEs (src/modules/, src/ui/, etc.)

---

## 7. TypeScript Errors

> ✅ **COMPLETED** — All errors fixed, `npm run typecheck` passes with 0 errors

### Fixed: bulkFavorite/logic.ts
- **Issue:** Missing `isFavorited` and `id` properties
- **Fix:** Used `inventory.favoritedItemIds` Set + type guard for items with `id`

### Fixed: customModal/index.ts  
- **Issue:** `destroy()` sync but called async `destroyModule()`
- **Fix:** Made `destroy()` async: `async destroy(): Promise<void>`

---

## 8. Compliance Audit

> ✅ **COMPLETED** — All code audited against `.claude/rules/` documentation

### Storage Compliance (core.md)
- [x] `tracker/stats.ts` → uses `storageGet/storageSet`
- [x] `achievements/manager.ts` → uses `storageGet/storageSet`
- [x] `DevSection.ts` → uses `storageGet` + `DEV_KEYS`
- [x] `shared/storage.ts` → deprecated notice added
- [x] `media/audio.ts` → clarified as game volume reads (intentional exception)

### Keys Registry (core.md)
- [x] Added `MODULE_KEYS.ACHIEVEMENTS`
- [x] Added `MODULE_KEYS.TRACKER_STATS`
- [x] Added key descriptions for all new keys

### UI Sections (ui.sections.md)
- [x] `Dev/index.ts` created → `registry.ts` updated to use facade

---

## 9. Journal Checker UI Overhaul
> ✅ **COMPLETED** — Redesigned for in-game journal accuracy and premium sidebar experience

- [x] Implement 2-level Master-Detail navigation
- [x] Create **Scrapbook Lined Paper** background with CSS gradients
- [x] Enforce **Sprites Only** visuals (Zero emoji policy)
- [x] Implement **Expandable Categories** (See More functionality)
- [x] Fix **MGSprite** rendering issue with initialization check
- [x] Integrate **Gemini-native Scrollbars**
- [ ] Finalize decoration (Clipboard frame, rings, golden corners)
- [ ] Add `state.ts` for persistent tab/expand preferences
- [x] Create **JournalProgressBar** component (theme-customizable)
- [x] Create **JournalTab** component (theme-customizable)

---

## 10. CSS Variable Standardization & UI Compliance
> ✅ **COMPLETED** — Internal game-specific variables + header color consistency + Auto-Favorite architectural fixes

**CSS Variables:**
- [x] Add 17 internal CSS variables to all 8 themes
- [x] Update Badge component to use `--rarity-*` variables
- [x] Update Switch component to use `--switch-thumb`
- [x] Change header colors to use `--pill-to`
- [x] Fix MagicGarden Journal text-shadow conflict

**Auto-Favorite Architectural Compliance:**
- [x] Create required `state.ts` file using `createSectionStore` pattern
- [x] Remove inline `<style>` element and inject external stylesheet
- [x] Refactor state management to use section store

**Future Work:**
- [ ] Comprehensive audit of remaining sections (Settings, Pets, Feature Settings, Test)
- [ ] Component audit (Input, Label, Checkbox, Select, Slider, ColorPicker)