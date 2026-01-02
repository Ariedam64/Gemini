---
paths: src/globals/**/*
---

# Globals rules (minimal)

- `src/globals/` = derived reactive globals from atoms only (read layer).
- Use the globals core helpers:
  - `src/globals/core/reactive.ts`
  - `src/globals/core/types.ts`

- Each global lives in `src/globals/variables/<name>.ts` and is exposed via a lazy singleton getter:
  - `export function get<Name>(): <Name>Global`

- Public API MUST include:
  - `get()`
  - `subscribe()` (raw, may emit on every atom tick)
  - `subscribeStable()` (emit only when derived value changes)
  - `destroy()` (idempotent cleanup)

- Extra subscription helpers are allowed when needed, but optional and must not replace the required ones.