# Workflow: Add UI Component

Create a reusable, theme-compatible, responsive, and composable UI component.

See [.claude/rules/ui/components.md](.claude/rules/ui/components.md) for detailed rules.

## Before you create

**IMPORTANT:** Check [.claude/workflows/ui/component/reuse-existing-component.md](.claude/workflows/ui/component/reuse-existing-component.md) first.

Only create a new component if:
- No existing component covers ~80% of the need
- The requirement is fundamentally different (not just a variant)

## 1. Create component folder

Create `src/ui/components/<ComponentName>/` (PascalCase).

Example: `src/ui/components/Button/`, `src/ui/components/DataTable/`

## 2. Create required files

### Logic file: `<ComponentName>.ts`

```typescript
export interface <ComponentName>Options {
  // Required options
  label: string;

  // Optional options with defaults
  variant?: 'primary' | 'secondary';
  disabled?: boolean;

  // Event handlers
  onClick?: () => void;
}

const DEFAULT_OPTIONS: Partial<<ComponentName>Options> = {
  variant: 'primary',
  disabled: false,
};

export interface <ComponentName>Handle {
  root: HTMLElement;

  // Public methods (minimal)
  setLabel(label: string): void;
  setDisabled(disabled: boolean): void;
  destroy(): void;
}

export function create<ComponentName>(
  options: <ComponentName>Options
): <ComponentName>Handle {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Create root element
  const root = document.createElement('div');
  root.className = 'component-name';

  // Build internal DOM
  // ...

  // Apply styles
  const style = document.createElement('style');
  style.textContent = componentNameCss;
  root.appendChild(style);

  // Public API
  return {
    root,

    setLabel(label: string) {
      // Update label
    },

    setDisabled(disabled: boolean) {
      // Update disabled state
    },

    destroy() {
      // Cleanup listeners, observers, etc.
    },
  };
}
```

### Style file: `<componentName>.css.ts`

```typescript
export const componentNameCss = `
  .component-name {
    /* Use CSS variables from theme */
    background-color: var(--color-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);

    /* Responsive */
    padding: var(--spacing-sm);
    width: 100%;
    max-width: 100%;

    /* Touch-friendly */
    min-height: 44px;
  }

  .component-name:hover {
    background-color: var(--color-bg-hover);
  }

  .component-name:focus {
    outline: 2px solid var(--color-focus);
  }

  .component-name[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
```

## 3. Component API requirements

### Options object
- Define an interface with all configuration
- Provide sensible defaults
- Required options should be explicit

### Handle object
- `root: HTMLElement` (REQUIRED)
- Minimal public methods (only what's needed)
- `destroy()` method for cleanup (REQUIRED)

### Façade principle
- Hide internal DOM structure
- Hide internal state
- Expose only user-facing operations

## 4. Theme compatibility

**REQUIRED:**
- Use CSS variables/tokens (from theme system)
- No hardcoded colors (#fff, rgb(), etc.)
- Fallback values for all variables

**Example:**
```css
color: var(--color-text, #000);  /* Fallback to black */
```

## 5. Responsive & cross-platform

**REQUIRED:**
- Container-responsive (works in narrow/wide containers)
- Touch-friendly controls (min 44px touch targets)
- No fixed layouts (use flex, grid, or percentage widths)
- Test on iOS/macOS/Android/Windows if possible

**Example:**
```css
/* Bad: fixed width */
width: 300px;

/* Good: flexible width */
width: 100%;
max-width: 600px;
```

## 6. Composability

**REQUIRED:**
- Safe to nest inside other components
- No global CSS pollution (scoped styles only)
- No z-index wars (use local stacking context)

## 7. Export the component

In `src/ui/components/index.ts`:
```typescript
export { create<ComponentName> } from './<ComponentName>/<ComponentName>';
export type { <ComponentName>Options, <ComponentName>Handle } from './<ComponentName>/<ComponentName>';
```

## 8. Test the component

Verify:
- Works in narrow container (< 400px width)
- Works in wide container (> 800px width)
- Theme change doesn't break readability
- Touch targets are at least 44px
- Disabled state works
- Event handlers fire correctly
- Destroy cleans up all listeners
- Can be nested inside other components

## Quick checklist

- [ ] Checked for existing reusable components first
- [ ] Folder created in `src/ui/components/<ComponentName>/`
- [ ] Logic file created: `<ComponentName>.ts`
- [ ] Style file created: `<componentName>.css.ts`
- [ ] Options interface defined with defaults
- [ ] Handle interface with `root` and `destroy()`
- [ ] Uses CSS variables (no hardcoded colors)
- [ ] Responsive (narrow/wide containers)
- [ ] Touch-friendly (min 44px targets)
- [ ] Composable (safe to nest)
- [ ] Exported from `src/ui/components/index.ts`
- [ ] All tests passing
