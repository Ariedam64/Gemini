---
paths: src/ui/**/*
---

# UI Core rules

- UI must be an isolated overlay running in Shadow DOM (no global CSS leakage).
- UI should not rewrite the game UI in-place; prefer minimal anchors + isolated rendering.
- UI must be theme-compatible (CSS variables/tokens, no hardcoded palette).
- UI must be responsive and cross-platform (iOS/macOS/Android/Windows).

- Follow dedicated rules:
  - components → `.claude/rules/ui.components.md`
  - loader → `.claude/rules/ui.loader.md`
  - sections → `.claude/rules/ui.sections.md`

- Follow UI workflows when adding/changing UI structure:
  - `.claude/workflows/ui/`
