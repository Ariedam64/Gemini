# Workflow: Add UI Section

Follow this checklist to add a new section (tab) in the Gemini HUD.

See [.claude/rules/ui/sections.md](.claude/rules/ui/sections.md) for detailed rules.

## 1. Create section folder

Create `src/ui/sections/<SectionName>/` (PascalCase).

Example: `src/ui/sections/Settings/`, `src/ui/sections/Inventory/`

## 2. Create required files

### `index.ts` - Public exports only

```typescript
export { SectionDefinition } from './section';
export type { SectionState } from './state';
```

### `section.ts` - Section implementation

```typescript
import { createSectionStore } from '../core/state';
import type { SectionState } from './state';

export interface SectionDefinition {
  build(container: HTMLElement): void;
  destroy(): void;
}

export function createSection(): SectionDefinition {
  let root: HTMLElement | null = null;

  return {
    build(container: HTMLElement) {
      // Create section UI
      root = document.createElement('div');
      root.className = 'section-name';

      // Build content
      // ...

      container.appendChild(root);
    },

    destroy() {
      // Cleanup listeners, observers, etc.
      root?.remove();
      root = null;
    },
  };
}

export const SectionDefinition = createSection();
```

### `state.ts` - Persistent state (REQUIRED)

```typescript
import { createSectionStore } from '../core/state';

export interface SectionState {
  // State fields (JSON-serializable only)
  expanded: boolean;
  sortOrder: 'asc' | 'desc';
}

const DEFAULT_STATE: SectionState = {
  expanded: true,
  sortOrder: 'asc',
};

// Section ID must be stable and match the section ID in registry
export const state = createSectionStore<SectionState>('tab-section-name', {
  version: 1,
  defaults: DEFAULT_STATE,
});
```

## 3. Optional: Add styles

### `styles.css.ts` - Section-scoped CSS

```typescript
export const sectionCss = `
  .section-name {
    padding: var(--spacing-md);
  }

  .section-name__header {
    font-size: var(--font-size-lg);
    color: var(--color-text);
  }
`;
```

Import and inject in `section.ts`:
```typescript
import { sectionCss } from './styles.css';

const style = document.createElement('style');
style.textContent = sectionCss;
root.appendChild(style);
```

## 4. Optional: Split into parts

If the section is complex, create a `parts/` folder:

```
src/ui/sections/<SectionName>/
├── parts/
│   ├── header.ts      # Section header
│   ├── content.ts     # Main content
│   └── footer.ts      # Footer actions
├── index.ts
├── section.ts         # Assembles parts
└── state.ts
```

See [.claude/workflows/ui/section/split-section-into-parts.md](.claude/workflows/ui/section/split-section-into-parts.md)

## 5. Register the section

In `src/ui/sections/registry.ts`:

```typescript
import { SectionDefinition as MySection } from './MySection';

export const sectionRegistry = {
  // ... other sections
  'tab-my-section': {
    id: 'tab-my-section',
    label: 'My Section',
    icon: '🔧',
    section: MySection,
  },
};
```

## 6. Test the section

Verify:
- Section appears in HUD tabs
- State persists across page reloads
- `destroy()` cleans up all resources
- No memory leaks when switching tabs
- Works on narrow/wide screens

## Quick checklist

- [ ] Folder created in `src/ui/sections/<SectionName>/`
- [ ] `index.ts` created (public exports)
- [ ] `section.ts` created (build/destroy lifecycle)
- [ ] `state.ts` created (persistent state with createSectionStore)
- [ ] `styles.css.ts` created (optional)
- [ ] `parts/` folder created (optional, for complex sections)
- [ ] Section registered in `src/ui/sections/registry.ts`
- [ ] Section ID is stable (`tab-section-name`)
- [ ] State is JSON-serializable
- [ ] All tests passing (lifecycle, persistence, cleanup)
