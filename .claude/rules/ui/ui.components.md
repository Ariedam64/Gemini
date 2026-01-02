---
paths: src/ui/components/**/*
---

# UI Components rules

- Each component MUST have:
  - a logic file: `<ComponentName>.ts`
  - a style file: `<componentName>.css.ts` exporting `<componentName>Css`

- Components MUST expose:
  - an `Options` object (with defaults)
  - a simple public API (façade) and a `root: HTMLElement` mount point

- Styling MUST be theme-compatible:
  - use CSS variables/tokens (no hardcoded palette)

- Components MUST be responsive and work across environments (iOS/macOS/Android/Windows):
  - avoid fixed layouts, support narrow containers, touch-friendly controls

- Components MUST be composable:
  - safe to nest inside other components
