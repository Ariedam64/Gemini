---
paths: src/ui/loader/**/*
---

# UI Loader rules

- `loader.ts` contains ONLY the loader UI + `LoaderController` (log/logStep/succeed/fail). No init logic inside.
- Any new init step MUST be added in `bootstrap.ts` as an `initX(loader: LoaderController)` function:
  - sync: `(): void`
  - async: `(): Promise<void>`
  - if cleanup is needed: return a cleanup function `(): void`
- Every init step MUST log via `loader.logStep(<Key>, <Message>, <Tone?>)`:
  - 1 log at start and 1 log on success or failure
  - no uncaught errors: wrap with `try/catch` and log as error
- Step keys (`<Key>`) must be short, stable, and reused consistently (e.g. "Atoms", "HUD", "Globals", ...).
- If an init step can block the main thread (heavy work), it MUST yield to the browser (e.g. `requestIdleCallback` / `setTimeout`) to keep the loader responsive.
- Any init exported from `bootstrap.ts` MUST be re-exported from `src/ui/loader/index.ts`.
