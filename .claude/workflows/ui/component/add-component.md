# Workflow: Add UI Component

## Goal
Create a reusable component: theme-compatible, responsive, and composable.

## Before you create
Follow: `.claude/workflows/ui/reuse-existing-component.md`
(Only create a new component if nothing fits.)

## Steps
1) Create folder:
- `src/ui/components/<ComponentName>/`

2) Create files:
- `<ComponentName>.ts` (logic)
- `<componentName>.css.ts` (styles), export `<componentName>Css`

3) API
- Options object (with defaults)
- Handle with `root: HTMLElement`
- Simple public façade (do not expose internal DOM/state)

4) Theme & styling
- Use CSS variables/tokens
- No hardcoded palette

5) Responsive & cross-platform
- Container-responsive (narrow/wide)
- Touch-friendly (iOS/Android)
- No fragile fixed layouts across macOS/Windows

## Quick check
- Works in a narrow container
- Theme changes do not break readability
- Can be nested inside other components safely
