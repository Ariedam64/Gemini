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
- Core: `@rules/core.md`
- Modules: `@rules/modules.md` (core infrastructure)
- Features: `@rules/features.md` (optional features)
- Utils: `@rules/utils.md`

- State:
  - Atoms: `@rules/state/atoms.md`
  - Globals: `@rules/state/globals.md`

- UI:
  - Core: `@rules/ui/core.md`
  - Components: `@rules/ui/components.md`
  - Loader: `@rules/ui/loader.md`
  - Sections: `@rules/ui/sections.md`
  - Inject: `@rules/ui/ui.inject.md`

- WebSocket: `@rules/websocket/websocket.md`

## Workflows
- Feature: `@workflows/feature/` (creating optional features)
- UI:
  - Components: `@workflows/ui/component/`
  - Loader: `@workflows/ui/loader/`
  - Sections: `@workflows/ui/section/`
  - Styles/Themes: `@workflows/ui/style/`
- State: `@workflows/state/`
- WebSocket: `@workflows/websocket/`
