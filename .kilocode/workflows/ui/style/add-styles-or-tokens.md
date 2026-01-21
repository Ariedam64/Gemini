# Workflow: Theme Change Safe

## Goal
Modify/add a theme without breaking components/sections.

## Steps
1) Change tokens (CSS variables) only
2) Keep fallbacks (defaults)
3) Quick test on:
- inputs, switches, selects
- tables/lists
- background/text/borders
- hover/focus/disabled states

## Quick check
- Readable contrast (at least usable)
- No hardcoded colors inside components
- Responsive still OK
