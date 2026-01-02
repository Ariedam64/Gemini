---
paths: src/modules/**/*
---

# Modules rules

## API (mandatory)
- Each module exports ONE main object: `MG<ModuleName>` (PascalCase, `MG` prefix).
- Exported from `src/modules/<module>/index.ts`.
- Must expose:
  - `init(): void | Promise<void>` (idempotent)
  - `isReady(): boolean`

## Structure (recommended)
- `index.ts`  → public façade only (no heavy logic)
- `types.ts`  → exported types/constants (no side effects)
- `state.ts`  → state/caches/config (+ optional persistence wiring)
- `logic.ts` or `logic/` → business logic split as needed
  - If using `logic/` folder: **do NOT create a nested `logic/index.ts` barrel file**
  - Instead, import directly from logic files in the main `index.ts`
  - Example: `import * as Progress from './logic/progress';`

Rule: internal complexity is fine, but usage must stay simple (façade rule).

## No side effects on import
Imports must NOT register listeners, start intervals, or patch globals.
If the module allocates hooks/resources, it MUST provide a way to fully cleanup them.

## Storage (optional)
- Modules MAY persist small settings/caches.
- Persistence MUST live in `state.ts` and use the shared storage wrapper (no direct `GM_*` calls).
- Keys MUST be scoped: `gemini:module:<moduleName>:*`.
- Public API should expose domain methods (e.g. `getConfig/setConfig`), not raw storage.

## Boundaries
- Modules must NOT render UI (DOM/ShadowDOM stays in `src/ui/`).
- Modules must NOT send WS directly (use WS API layer / `src/websocket/api.ts`).
