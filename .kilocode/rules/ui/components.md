---
paths: src/ui/components/**/*
---

# UI Components rules

Reusable UI primitives that are theme-compatible, responsive, and composable.

## Structure

Each component lives in its own folder:

```
src/ui/components/<ComponentName>/
├── <ComponentName>.ts      # Logic (required)
├── <componentName>.css.ts  # Styles (required)
└── index.ts                # Re-exports (optional)
```

**Naming:**
- Folder: `PascalCase` (e.g., `Button/`, `DataTable/`)
- Logic file: `PascalCase.ts` (e.g., `Button.ts`)
- Style file: `camelCase.css.ts` (e.g., `button.css.ts`)

## Required API

Every component MUST expose:

### Options interface

```typescript
export interface ButtonOptions {
  // Required options (no default)
  label: string;

  // Optional options (have defaults)
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;

  // Event handlers
  onClick?: () => void;
}

const DEFAULT_OPTIONS: Required<Omit<ButtonOptions, 'label' | 'onClick'>> = {
  variant: 'primary',
  size: 'md',
  disabled: false,
};
```

### Handle interface

```typescript
export interface ButtonHandle {
  // Root element (REQUIRED)
  root: HTMLElement;

  // Public methods (minimal)
  setLabel(label: string): void;
  setDisabled(disabled: boolean): void;

  // Cleanup (REQUIRED)
  destroy(): void;
}
```

### Factory function

```typescript
export function createButton(options: ButtonOptions): ButtonHandle {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  // Create root element
  const root = document.createElement('button');
  root.className = `btn btn--${opts.variant} btn--${opts.size}`;
  root.textContent = opts.label;
  root.disabled = opts.disabled;

  // Event listeners
  const handleClick = () => opts.onClick?.();
  root.addEventListener('click', handleClick);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = buttonCss;
  root.appendChild(style);

  return {
    root,

    setLabel(label: string) {
      root.textContent = label;
    },

    setDisabled(disabled: boolean) {
      root.disabled = disabled;
    },

    destroy() {
      root.removeEventListener('click', handleClick);
      root.remove();
    },
  };
}
```

## Style file

Export a single CSS string constant:

```typescript
// button.css.ts
export const buttonCss = `
  .btn {
    /* Theme tokens */
    background: var(--color-primary);
    color: var(--color-text-on-primary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: var(--font-size-md);

    /* Responsive */
    min-height: 44px;  /* Touch-friendly */
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .btn:hover:not(:disabled) {
    background: var(--color-primary-hover);
  }

  .btn:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Variants */
  .btn--secondary {
    background: var(--color-bg-secondary);
    color: var(--color-text);
  }

  .btn--danger {
    background: var(--color-danger);
    color: var(--color-text-on-danger);
  }

  /* Sizes */
  .btn--sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
    min-height: 32px;
  }

  .btn--lg {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-lg);
    min-height: 52px;
  }
`;
```

## Rules

### 1. Theme compatibility (REQUIRED)

**No hardcoded colors:**
```css
/* ❌ BAD */
background: #1a1a2e;
color: white;

/* ✅ GOOD */
background: var(--color-bg);
color: var(--color-text);
```

**Fallback values for safety:**
```css
color: var(--color-text, #000);  /* Fallback if token missing */
```

### 2. Responsive design (REQUIRED)

**Touch-friendly:**
```css
/* Min 44px touch targets (Apple HIG) */
.clickable {
  min-height: 44px;
  min-width: 44px;
}
```

**Flexible widths:**
```css
/* ❌ BAD - Fixed width */
width: 300px;

/* ✅ GOOD - Flexible with constraints */
width: 100%;
max-width: 300px;
min-width: 120px;
```

**Container-responsive:**
```css
/* Adapt to narrow containers */
.card {
  padding: var(--spacing-md);
}

@container (max-width: 300px) {
  .card {
    padding: var(--spacing-sm);
  }
}
```

### 3. Composability (REQUIRED)

Components must be safe to nest:

```typescript
// Parent component can contain child components
const card = createCard({ title: 'Settings' });
const toggle = createToggle({ label: 'Dark mode' });
card.root.appendChild(toggle.root);  // Safe nesting
```

**No global CSS pollution:**
```css
/* ❌ BAD - Affects all buttons */
button {
  background: red;
}

/* ✅ GOOD - Scoped to component */
.btn {
  background: red;
}
```

### 4. Cleanup (REQUIRED)

`destroy()` must remove ALL traces:

```typescript
destroy() {
  // Remove event listeners
  root.removeEventListener('click', handleClick);
  window.removeEventListener('resize', handleResize);

  // Clear intervals/timeouts
  clearInterval(animationInterval);

  // Disconnect observers
  resizeObserver?.disconnect();

  // Remove from DOM
  root.remove();
}
```

### 5. Façade principle

Hide internal complexity:

```typescript
// ❌ BAD - Exposing internals
return {
  root,
  labelElement,        // Internal DOM node
  _state,              // Internal state
  _handleClick,        // Internal handler
  updateInternalState, // Internal method
};

// ✅ GOOD - Minimal public API
return {
  root,
  setLabel,
  setDisabled,
  destroy,
};
```

## Exporting components

In `src/ui/components/index.ts`:

```typescript
export { createButton } from './Button/Button';
export type { ButtonOptions, ButtonHandle } from './Button/Button';

export { createToggle } from './Toggle/Toggle';
export type { ToggleOptions, ToggleHandle } from './Toggle/Toggle';
```

## Common mistakes

### ❌ Missing destroy cleanup
```typescript
// Event listener never removed = memory leak
root.addEventListener('click', handleClick);

// destroy() doesn't remove it
destroy() {
  root.remove();  // Listener still attached!
}
```

### ❌ Hardcoded dimensions
```typescript
// ❌ Breaks on mobile
root.style.width = '400px';

// ✅ Flexible
root.style.width = '100%';
root.style.maxWidth = '400px';
```

### ❌ Forgetting focus states
```css
/* ❌ Keyboard users can't see focus */
.btn:focus {
  outline: none;
}

/* ✅ Visible focus for accessibility */
.btn:focus-visible {
  outline: 2px solid var(--color-focus);
}
```

### ❌ Non-idempotent style injection
```typescript
// ❌ Styles injected multiple times
function createButton() {
  const style = document.createElement('style');
  style.textContent = buttonCss;
  document.head.appendChild(style);  // Duplicates on each call!
}

// ✅ Inject once or into component root
function createButton() {
  const style = document.createElement('style');
  style.textContent = buttonCss;
  root.appendChild(style);  // Scoped to this instance
}
```
