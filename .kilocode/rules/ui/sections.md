---
paths: src/ui/sections/**/*
---

# UI Sections rules

Sections are modular tab panels in the Gemini HUD. Each section is a self-contained unit with its own state, lifecycle, and optional styles.

## Structure

Each section lives in its own folder:

```
src/ui/sections/<SectionName>/
├── index.ts          # Public exports only (required)
├── section.ts        # Build/destroy lifecycle (required)
├── state.ts          # Persistent state (required)
├── styles.css.ts     # Section-scoped CSS (optional)
└── parts/            # Sub-features (optional)
    ├── header.ts
    ├── content.ts
    └── footer.ts
```

## Required files

### `index.ts` - Public exports

Export only the public API:

```typescript
export { SettingsSection } from './section';
export type { SettingsState } from './state';
```

**Rules:**
- No heavy UI logic
- No side effects on import
- Only re-exports or a `SectionDefinition` object

### `section.ts` - Lifecycle implementation

Implement the section lifecycle:

```typescript
import { state } from './state';
import { settingsCss } from './styles.css';

export interface SectionDefinition {
  build(container: HTMLElement): void;
  destroy(): void;
}

let root: HTMLElement | null = null;
const cleanups: (() => void)[] = [];

function build(container: HTMLElement): void {
  // Prevent double-build
  if (root) return;

  // Create root element
  root = document.createElement('div');
  root.className = 'settings-section';

  // Inject styles
  const style = document.createElement('style');
  style.textContent = settingsCss;
  root.appendChild(style);

  // Build content
  const header = document.createElement('h2');
  header.textContent = 'Settings';
  root.appendChild(header);

  // Subscribe to state changes
  const unsubscribe = state.subscribe((s) => {
    // React to state changes
  });
  cleanups.push(unsubscribe);

  // Add to container
  container.appendChild(root);
}

function destroy(): void {
  // Run all cleanups
  cleanups.forEach(fn => fn());
  cleanups.length = 0;

  // Remove from DOM
  root?.remove();
  root = null;
}

export const SettingsSection: SectionDefinition = {
  build,
  destroy,
};
```

### `state.ts` - Persistent state

Use `createSectionStore` for persistent state:

```typescript
import { createSectionStore } from '../core/state';

export interface SettingsState {
  // All fields must be JSON-serializable
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  volume: number;
}

const DEFAULT_STATE: SettingsState = {
  theme: 'auto',
  notifications: true,
  volume: 50,
};

// Section ID must be stable (used as storage key)
export const state = createSectionStore<SettingsState>('tab-settings', {
  version: 1,  // Increment when state shape changes
  defaults: DEFAULT_STATE,
});
```

**State rules:**
- All fields must be JSON-serializable (no functions, classes, DOM elements)
- Section ID must be stable (`tab-<name>` format)
- Increment `version` when adding/removing/renaming fields
- Default state must be complete (no undefined fields)

## Optional files

### `styles.css.ts` - Section CSS

Export a single CSS string constant:

```typescript
export const settingsCss = `
  .settings-section {
    padding: var(--spacing-md);
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .settings-section h2 {
    font-size: var(--font-size-lg);
    color: var(--color-text);
    margin: 0 0 var(--spacing-md) 0;
  }

  .settings-section__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-sm);
    background: var(--color-bg-secondary);
    border-radius: var(--radius-sm);
  }
`;
```

### `parts/` - Sub-features

For complex sections, split into parts:

```
src/ui/sections/Inventory/
├── parts/
│   ├── header.ts       # Search bar, filters
│   ├── grid.ts         # Item grid display
│   ├── details.ts      # Selected item details
│   └── actions.ts      # Buy/sell/use buttons
├── section.ts          # Assembles parts
└── ...
```

**Part file pattern:**

```typescript
// parts/header.ts
export interface HeaderPart {
  root: HTMLElement;
  setSearchQuery(query: string): void;
  destroy(): void;
}

export function createHeader(
  onSearch: (query: string) => void
): HeaderPart {
  const root = document.createElement('div');
  root.className = 'inventory-header';

  const input = document.createElement('input');
  input.placeholder = 'Search...';
  input.addEventListener('input', () => onSearch(input.value));
  root.appendChild(input);

  return {
    root,
    setSearchQuery(query: string) {
      input.value = query;
    },
    destroy() {
      root.remove();
    },
  };
}
```

**Assembling parts in section.ts:**

```typescript
import { createHeader } from './parts/header';
import { createGrid } from './parts/grid';

function build(container: HTMLElement): void {
  root = document.createElement('div');

  // Create parts
  const header = createHeader((query) => {
    grid.filter(query);
  });
  const grid = createGrid();

  // Assemble
  root.appendChild(header.root);
  root.appendChild(grid.root);

  // Register for cleanup
  cleanups.push(() => header.destroy());
  cleanups.push(() => grid.destroy());

  container.appendChild(root);
}
```

## Registering a section

In `src/ui/sections/registry.ts`:

```typescript
import { SettingsSection } from './Settings';
import { InventorySection } from './Inventory';

export interface SectionConfig {
  id: string;
  label: string;
  icon: string;
  section: SectionDefinition;
}

export const sectionRegistry: Record<string, SectionConfig> = {
  'tab-settings': {
    id: 'tab-settings',
    label: 'Settings',
    icon: '⚙️',
    section: SettingsSection,
  },
  'tab-inventory': {
    id: 'tab-inventory',
    label: 'Inventory',
    icon: '🎒',
    section: InventorySection,
  },
};
```

## Rules

### 1. State must be JSON-serializable

```typescript
// ❌ BAD - Non-serializable
interface BadState {
  onClick: () => void;         // Function
  element: HTMLElement;        // DOM node
  user: User;                  // Class instance
}

// ✅ GOOD - JSON-serializable
interface GoodState {
  selectedId: string | null;   // Primitive
  items: string[];             // Array of primitives
  config: { enabled: boolean }; // Plain object
}
```

### 2. Section ID must be stable

The section ID is used as the storage key. Changing it loses user data:

```typescript
// ❌ BAD - ID changed, user settings lost
createSectionStore('settings-tab', ...);  // Was 'tab-settings'

// ✅ GOOD - ID stays the same forever
createSectionStore('tab-settings', ...);
```

### 3. Cleanup must be complete

```typescript
function destroy(): void {
  // ❌ BAD - Partial cleanup
  root?.remove();

  // ✅ GOOD - Complete cleanup
  cleanups.forEach(fn => fn());  // Subscriptions, listeners
  cleanups.length = 0;
  root?.remove();
  root = null;
}
```

### 4. No memory leaks on tab switch

Users switch tabs frequently. Each switch calls `destroy()` then `build()`:

```typescript
// ❌ BAD - Leak on every tab switch
function build() {
  window.addEventListener('resize', handleResize);  // Never removed!
}

// ✅ GOOD - Cleanup tracked
function build() {
  window.addEventListener('resize', handleResize);
  cleanups.push(() => window.removeEventListener('resize', handleResize));
}
```

## Common mistakes

### ❌ Side effects on import
```typescript
// section.ts
const state = loadFromStorage();  // Runs on import!

// ✅ GOOD - Load in build()
function build() {
  const state = loadFromStorage();
}
```

### ❌ Forgetting to increment state version
```typescript
// Version 1
interface State { name: string; }

// Version 1 (forgot to increment!)
interface State { name: string; age: number; }
// Old users get { name: '...' } without age = runtime errors

// ✅ GOOD
// version: 2 - added 'age' field
interface State { name: string; age: number; }
```

### ❌ Building without checking if already built
```typescript
// ❌ Double-build creates duplicates
function build(container) {
  const root = document.createElement('div');
  container.appendChild(root);  // Appends again on re-build!
}

// ✅ GOOD - Guard against double-build
function build(container) {
  if (root) return;  // Already built
  root = document.createElement('div');
  container.appendChild(root);
}
```
