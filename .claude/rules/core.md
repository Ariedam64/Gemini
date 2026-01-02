# Core rules (global)

These rules apply everywhere in the repo.

## 1) Game compatibility (non-negotiable)
- NEVER hardcode game data (plants/items/pets/shops/mutations/etc.).
  - Data must come from `MGData` (or Gemini Globals when appropriate).
- Any sprite rendering MUST go through `MGSprite` (`show()` / `toCanvas()` / related API).
  - Do not manually fetch atlases/frames or bake sprite lists.

## 2) Boundaries (keep the repo sane)
- DOM/Shadow DOM rendering lives in `src/ui/` only.
- WebSocket sending is only allowed via the WS API layer (`src/websocket/api.ts` / `window.Gemini.WebSocket`).
- State must go through the existing state layer (Store/atoms + reactive Globals).
  - Do NOT create ad-hoc globals (`window.*`, random singletons) as a second source of truth.

## 3) Side effects & cleanup (no leaks)
- No side effects on import (no listeners, intervals, patches, WS sends, audio, etc.).
- Any subscription/listener/interval/observer MUST have cleanup and be safe to call multiple times.
- Cross-feature signals must use `CustomEvent` prefixed with `gemini:`.

## 4. Storage

- Keys must be namespaced by the built-in prefix (storage wrapper adds `gemini:` automatically).
- Do NOT call `GM_getValue`/`GM_setValue` directly; use `src/utils/storage.ts`.
- All storage keys should be defined in `src/utils/keys.ts` for easy lookup and documentation.
- Events must be prefixed with `gemini:` (e.g., `gemini:journal-updated`).
- Event names should also be defined in `src/utils/keys.ts` under `EVENTS`.
  - HUD persisted state lives in `src/ui/hud/state/state.ts`.

## 5) Code quality (basic but mandatory)
- Keep files small: target < 500 lines. If it grows, split by responsibility.
- Keep functions small and single-purpose. Prefer early returns over deep nesting.
- Names must be explicit (no 1-letter names).
- Avoid magic numbers/strings: use named constants.

## 6) TypeScript & public API hygiene
- TypeScript strict: no `any` (use `unknown` + narrowing).
- Public APIs must be minimal and easy to use (façade approach).
- Prefer importing from domain entrypoints (`index.ts`) over deep internal imports.
