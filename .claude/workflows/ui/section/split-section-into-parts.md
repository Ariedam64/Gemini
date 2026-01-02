# Workflow: Split Section into parts/

1) Create `src/ui/sections/<SectionName>/parts/`
2) Move each sub-feature into its own file under `parts/`
3) Assemble parts in `section.ts` and keep a clean `destroy()`

Note: follow `.claude/rules/ui.sections.md` for parts constraints and section lifecycle.
