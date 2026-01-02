# Workflow: Add an Atom (and optional View/Signature)

1) Define/update the public types:
- Add the atom key/type in `src/atoms/types.ts` (keep it stable).

2) Declare the atom:
- Add the atom in `src/atoms/atoms.ts`.

3) Register the atom:
- Add it to `src/atoms/lookup.ts` so the Store bridge can resolve it by key.

4) Expose it:
- Re-export from `src/atoms/index.ts` if it’s part of the public surface.

5) Optional: add a Signature (recommended when atoms tick often)
- If the underlying data updates frequently but you only care about real changes, add a signature in `src/atoms/signature.ts`.
- Use the signature to drive “stable” change detection (avoid reacting to every tick).

6) Optional: add a View (recommended for UI-friendly consumption)
- If you need a derived/normalized read model, add a view in `src/atoms/view.ts`.
- Views should be read-only and easy to consume (façade).

7) Quick check
- The new key resolves via the Store API (`select/set/subscribe`).
- If you added signature/view, verify it does not spam on atom ticks when data is unchanged.