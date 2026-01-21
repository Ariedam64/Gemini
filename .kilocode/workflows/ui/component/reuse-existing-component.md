# Workflow: Reuse Existing Component

## Goal
Avoid duplication (Input/Switch/Select/Button/etc.)

## Steps
1) Search in `src/ui/components/` for something that covers ~80% of the need
2) If you need a variant:
- add an option (size/variant/tone)
- or expose a component-scoped CSS var on the root
3) If the component is too rigid:
- refactor to be configurable without breaking existing usage

## Quick check
- One source of truth per primitive
- No hidden “forks” or copy-paste variants
