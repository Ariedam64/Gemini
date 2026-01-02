---
paths: src/ui/sections/**/*
---

# UI Sections rules

- Each section lives in `src/ui/sections/<SectionName>/`.

- Required files:
  - `index.ts`   (public exports only)
  - `section.ts` (implementation: build/cleanup)
  - `state.ts`   (persistent state only)

- Optional:
  - `styles.css.ts` (section-scoped CSS string export)
  - `parts/`        (internal section sub-features)

- `index.ts` MUST:
  - expose the public section API only (re-exports or a `SectionDefinition` object)
  - contain no heavy UI logic

- `section.ts` MUST:
  - implement the section lifecycle:
    - `build(container: HTMLElement)`
    - `destroy()`

- `state.ts` MUST:
  - use `createSectionStore(<sectionId>, { version, defaults })`
  - keep state JSON-serializable
  - keep `<sectionId>` stable and matching the section id (e.g. `tab-...`)

- `styles.css.ts` (if present) MUST export a single CSS string constant: `<sectionName>Css`.

## Parts (when used)
- If a section is split into sub-features, it MUST use a `parts/` folder.
- One part = one file under `parts/`.
- `section.ts` assembles the final UI by composing parts (each part owns a focused responsibility).
