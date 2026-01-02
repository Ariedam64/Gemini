# Changelog

All notable changes to Gemini. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased] — 2026-01-02

> Storage & naming refactor to align with `.claude/` documentation standards.

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

### 📝 Docs Updated

- `.claude/rules/ui/ui.inject.md` — **NEW** QOL injection architecture
- `.claude/CLAUDE.md` — Added ui.inject reference
- `TODO.md` — Sections 1, 2, 3, 7 marked complete

---

### ⚠️ Known Issues

None — All TypeScript errors resolved!

---

## Previous Versions

Changelog started 2026-01-02.
