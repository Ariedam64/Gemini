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

- [ ] **Modules refactor**
  - [ ] Refactor all existing modules to match the `modules.md` structure:
    - `index.ts` (façade), `types.ts`, `state.ts`, `logic.ts` (or `logic/`)
    - `MG<ModuleName>` export with `init()` + `isReady()`
    - Optional persistence in `state.ts` using scoped keys `gemini:module:<name>:*`

- [ ] **UI sections refactor**
  - [ ] Refactor all existing sections to match `ui.sections.md`:
    - `index.ts`, `section.ts`, `state.ts`
    - Optional `styles.css.ts`
    - Use `parts/` when splitting sub-features

- [ ] **UI components refactor**
  - [ ] Refactor all existing components to match `ui.components.md`:
    - `<ComponentName>.ts` + `<componentName>.css.ts`
    - Options + simple façade API + `root`
    - Theme-token based styling + responsive layout

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