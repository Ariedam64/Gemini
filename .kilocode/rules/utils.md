---
paths: src/utils/**/*
---

# Utils rules

`src/utils/` contains cross-cutting helper functions that can be reused anywhere in the mod.

## Structure

```
src/utils/
├── storage.ts       # Persistent storage wrapper (GM_getValue/GM_setValue)
├── timing.ts        # Timing utilities (debounce, throttle, sleep)
├── dom.ts           # DOM utilities (if not UI-specific)
└── index.ts         # Public exports
```

**Principle:** Utils are **dependency-leaves** - they should not import from feature code.

## Rules

### 1. No feature/UI imports

Utils must not depend on features, modules, or UI:

```typescript
// ❌ BAD - Utils importing from features
import { MGAutoFavorite } from '../features/autoFavorite';

export function formatFavorite(fav: Favorite) {
  return MGAutoFavorite.format(fav);
}

// ✅ GOOD - Pure utility, no external dependencies
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
```

**Why:** Utils are meant to be used everywhere. If they import from features, you create circular dependencies.

### 2. One concept per file

```typescript
// ❌ BAD - Grab-bag utils.ts
export function debounce() { ... }
export function formatDate() { ... }
export function capitalize() { ... }
export function calculateTax() { ... }

// ✅ GOOD - Separate files by concept
// timing.ts
export function debounce() { ... }
export function throttle() { ... }

// format.ts
export function formatDate() { ... }
export function formatNumber() { ... }

// string.ts
export function capitalize() { ... }
export function truncate() { ... }
```

### 3. Simple, stable APIs

Utils should be easy to use and rarely change:

```typescript
// ❌ BAD - Complex API with many options
export function debounce(
  fn: Function,
  wait: number,
  options?: {
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
    onStart?: () => void;
    onEnd?: () => void;
  }
) { ... }

// ✅ GOOD - Simple API, covers 90% of use cases
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): T { ... }
```

### 4. Minimal side effects

```typescript
// ❌ BAD - Side effects in utility
export function log(message: string): void {
  console.log(`[Gemini] ${message}`);
  saveToFile(message);  // Side effect!
  sendAnalytics(message);  // Side effect!
}

// ✅ GOOD - Pure function, no side effects
export function prefixMessage(message: string): string {
  return `[Gemini] ${message}`;
}
```

### 5. UI-specific utils go in `src/ui/utils/`

If a helper is specific to DOM/UI, it doesn't belong in `src/utils/`:

```typescript
// ❌ BAD - DOM helper in src/utils/
// src/utils/dom.ts
export function querySelector(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}

// ✅ GOOD - DOM helpers in UI utils
// src/ui/utils/dom.ts
export function querySelector(selector: string): HTMLElement | null {
  return document.querySelector(selector);
}
```

## Storage utility

`storage.ts` is the standard way to persist data:

```typescript
// storage.ts
const PREFIX = 'gemini:';

export function getValue<T>(key: string, defaultValue: T): T {
  const fullKey = PREFIX + key;
  const stored = GM_getValue(fullKey);
  return stored !== undefined ? stored : defaultValue;
}

export function setValue<T>(key: string, value: T): void {
  const fullKey = PREFIX + key;
  GM_setValue(fullKey, value);
}

export function deleteValue(key: string): void {
  const fullKey = PREFIX + key;
  GM_deleteValue(fullKey);
}

// Key constants for type safety
export const KEYS = {
  HUD_OPEN: 'hud:open',
  HUD_POSITION: 'hud:position',
  THEME: 'theme',
} as const;

export const FEATURE_KEYS = {
  AUTO_FAVORITE: 'feature:autoFavorite:config',
  JOURNAL_CHECKER: 'feature:journalChecker:config',
} as const;

export const EVENTS = {
  JOURNAL_UPDATED: 'gemini:journal-updated',
  FAVORITE_ADDED: 'gemini:favorite-added',
} as const;
```

**Rules:**
- Never call `GM_getValue`/`GM_setValue` directly
- Always use the storage wrapper
- All keys are defined in `KEYS`, `FEATURE_KEYS`, or `MODULE_KEYS`
- All events are defined in `EVENTS`

## Common patterns

### Debounce
```typescript
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  wait: number
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: unknown[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), wait);
  }) as T;
}
```

### Throttle
```typescript
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): T {
  let lastCall = 0;

  return ((...args: unknown[]) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  }) as T;
}
```

### Sleep
```typescript
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Yield to main thread
```typescript
export function yieldToMain(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 0));
}
```

## Common mistakes

### ❌ Circular dependency
```typescript
// utils/format.ts
import { MGData } from '../modules/data';  // ❌ Imports from module!

export function formatPlant(plantId: string) {
  const plant = MGData.get('plants')[plantId];  // Depends on module
  return plant.name;
}

// ✅ GOOD - Accept data as parameter
export function formatPlant(plant: { name: string }) {
  return plant.name;
}
```

### ❌ Grab-bag file
```typescript
// ❌ BAD - Everything in one file
// utils/helpers.ts (500+ lines of random functions)

// ✅ GOOD - Split by concept
// utils/timing.ts
// utils/format.ts
// utils/validation.ts
```

### ❌ Unstable API
```typescript
// Version 1
export function format(value: string): string;

// Version 2 - Breaking change!
export function format(value: string, options: FormatOptions): string;

// ✅ GOOD - Backwards compatible
export function format(value: string, options?: FormatOptions): string;
```

### ❌ Direct GM_* calls
```typescript
// ❌ BAD - Direct call
const value = GM_getValue('gemini:theme');

// ✅ GOOD - Use wrapper
import { getValue, KEYS } from './storage';
const value = getValue(KEYS.THEME, 'dark');
```
