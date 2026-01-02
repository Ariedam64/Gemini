# Workflow: Add a Global

1) Create `src/globals/variables/<name>.ts`
2) Use core helpers from:
   - `src/globals/core/reactive.ts`
   - `src/globals/core/types.ts`
3) Build a derived global from atoms and expose a lazy singleton `get<Name>()`
4) Implement API:
   - `get()`
   - `subscribe()` (raw, can tick often)
   - `subscribeStable()` (only real derived changes)
   - `destroy()` (cleanup, idempotent)
5) (Optional) add extra `subscribeX()` helpers if needed (document what they emit)
6) Export/register the getter in the globals entrypoint (and expose via `window.Gemini.Globals` if used)