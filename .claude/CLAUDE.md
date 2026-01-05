# Gemini Mod (Claude Code)

Project memory for Claude Code. Keep it short and actionable.

## TL;DR
- Project: userscript mod (Tampermonkey/Violetmonkey) that hooks into the game’s minified runtime bundle in the browser.
- Compatible: MagicGarden/MagicCircle + Discord Activities
- URLs:
  - `magiccircle.gg/r/*`
  - `magicgarden.gg/r/*`
  - `starweaver.org/r/*`
  - `1227719606223765687.discordsays.com/*`
- Stack: TypeScript (strict), esbuild (IIFE), Jotai, Pixi.js, Shadow DOM

## Commands
- dev: `npm run dev`
- build: `npm run build` (dist/gemini-build.user.js)
- release: `npm run release` (dist/gemini.user.js)
- typecheck: `npm run typecheck`

## Repo map (high-level)
- `src/main.ts` — userscript entry
- `src/api/` — public API (`window.Gemini`)
- `src/atoms/` — state bridge (Store)
- `src/globals/` — reactive derived globals
- `src/modules/` — core infrastructure (MGData, MGSprite, MGTile, MGPixi, MGAudio, MGCosmetic)
- `src/features/` — optional features (AutoFavorite, JournalChecker, BulkFavorite, Achievements, Tracker)
- `src/websocket/` — capture/transport + actions
- `src/ui/` — loader + HUD + components + sections + styles + theme
- `src/utils/` — cross-cutting helpers only (storage, etc.)
- `GameSourceFiles/` — exported game source for reference (minified runtime bundle + unminified reference code)
- `GameFilesExample/` — real network examples captured from DevTools (manifest.json, sprite json, sample atom payloads, etc.)

## Key project files
- `CHANGELOG.md` — version history (Keep a Changelog format)
- `TODO.md` — active development tasks

## Game reference folders

### GameSourceFiles/
Reference only (to understand internals). The mod hooks the minified bundle at runtime.
- Runtime bundle (available in browser): `GameSourceFiles/main-DvXv24E7.js`
- Unminified reference code (NOT available to the mod at runtime, used for understanding):
  - `GameSourceFiles/gg-preview-pr-2307-router.magiccircle.workers.dev/src/games/Quinoa`

### GameFilesExample/
Captured network examples from DevTools (real fetched files/payloads).
Use these as examples to understand formats (manifest.json, sprite atlases, sample atom payloads, etc.).

Note: Treat `GameSourceFiles/` and `GameFilesExample/` as reference inputs. Do not copy game code into the mod.

## Rules (source of truth)
- Core: [.claude/rules/core.md](.claude/rules/core.md)
- Modules: [.claude/rules/modules.md](.claude/rules/modules.md) (core infrastructure)
- Features: [.claude/rules/features.md](.claude/rules/features.md) (optional features)
- Utils: [.claude/rules/utils.md](.claude/rules/utils.md)

- State:
  - Atoms: [.claude/rules/state/atoms.md](.claude/rules/state/atoms.md)
  - Globals: [.claude/rules/state/globals.md](.claude/rules/state/globals.md)

- UI:
  - Core: [.claude/rules/ui/core.md](.claude/rules/ui/core.md)
  - Components: [.claude/rules/ui/components.md](.claude/rules/ui/components.md)
  - Loader: [.claude/rules/ui/loader.md](.claude/rules/ui/loader.md)
  - Sections: [.claude/rules/ui/sections.md](.claude/rules/ui/sections.md)
  - Inject: [.claude/rules/ui/ui.inject.md](.claude/rules/ui/ui.inject.md)

- WebSocket: [.claude/rules/websocket/websocket.md](.claude/rules/websocket/websocket.md)

## Workflows
- State:
  - Add Atom: [.claude/workflows/state/add-atom.md](.claude/workflows/state/add-atom.md)
  - Add Global: [.claude/workflows/state/add-global.md](.claude/workflows/state/add-global.md)
- UI:
  - Add Component: [.claude/workflows/ui/component/add-component.md](.claude/workflows/ui/component/add-component.md)
  - Reuse Component: [.claude/workflows/ui/component/reuse-existing-component.md](.claude/workflows/ui/component/reuse-existing-component.md)
  - Add Loader Step: [.claude/workflows/ui/loader/add-loader-step.md](.claude/workflows/ui/loader/add-loader-step.md)
  - Add Section: [.claude/workflows/ui/section/add-section.md](.claude/workflows/ui/section/add-section.md)
  - Split Section: [.claude/workflows/ui/section/split-section-into-parts.md](.claude/workflows/ui/section/split-section-into-parts.md)
  - Add Styles: [.claude/workflows/ui/style/add-styles-or-tokens.md](.claude/workflows/ui/style/add-styles-or-tokens.md)
  - Theme Change: [.claude/workflows/ui/style/theme-change-safe.md](.claude/workflows/ui/style/theme-change-safe.md)
- WebSocket:
  - Add Action: [.claude/workflows/websocket/add-action.md](.claude/workflows/websocket/add-action.md)
