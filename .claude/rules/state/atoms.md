---
paths: src/atoms/**/*
---

# Atoms rules

- `src/atoms/` is the single source of truth for state access (atoms + Store bridge).

- Files responsibilities:
  - `types.ts`   = atom keys/types (public contracts)
  - `atoms.ts`   = atom declarations
  - `lookup.ts`  = atom registry/lookup (key -> atom)
  - `store.ts`   = public Store API (select/set/subscribe)
  - `bridge.ts`  = wiring between atoms and the Store bridge
  - `view.ts`    = read-only derived views (optional)
  - `signature.ts` = stable signatures/change detection helpers (optional)
  - `index.ts`   = public exports only

- When adding a new atom, it MUST be registered so the Store can access it (types + atoms + lookup + index as needed).

- Atoms can update frequently; stable consumers should use views/signatures when relevant.
