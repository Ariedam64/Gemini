---
paths: src/utils/**/*
---

# Utils rules

- `src/utils/` is for cross-cutting helpers only (can be reused anywhere).
- Keep utils as dependency-leaves: avoid importing from `src/ui/**` and feature modules.
  - If a helper is UI/DOM-specific, put it under `src/ui/utils/` instead.
- One concept per file (no grab-bag `utils.ts`).
- APIs must stay small and stable (simple inputs/outputs, minimal side effects).
