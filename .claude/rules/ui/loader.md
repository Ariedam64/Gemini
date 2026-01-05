---
paths: src/ui/loader/**/*
---

# UI Loader rules

The loader displays a loading screen during mod initialization and provides logging for each init step.

## Structure

```
src/ui/loader/
├── loader.ts      # Loader UI + LoaderController (no init logic)
├── bootstrap.ts   # All init steps (initX functions)
└── index.ts       # Public exports
```

## File responsibilities

### `loader.ts` - UI only

Contains ONLY the loader UI and `LoaderController` interface:

```typescript
export interface LoaderController {
  /**
   * Log a message to the loader
   */
  log(message: string, tone?: 'info' | 'success' | 'error'): void;

  /**
   * Log a step with a stable key (for progress tracking)
   */
  logStep(key: string, message: string, tone?: 'info' | 'success' | 'error'): void;

  /**
   * Mark loading as complete
   */
  succeed(message?: string, delayMs?: number): Promise<void>;

  /**
   * Mark loading as failed
   */
  fail(message: string, error?: unknown): Promise<void>;
}

export function createLoader(): LoaderController {
  // Create loader UI
  // Return controller
}
```

**Rules:**
- No init logic in `loader.ts`
- No imports from other parts of the mod (except types)
- Pure UI + controller

### `bootstrap.ts` - Init sequence

Contains all init steps as `initX(loader)` functions:

```typescript
import { createLoader, LoaderController } from './loader';

// Sync init step
export function initWebSocket(loader: LoaderController): void {
  loader.logStep('WebSocket', 'Initializing WebSocket...');

  try {
    // Init logic
    initWebSocketCapture();

    loader.logStep('WebSocket', 'WebSocket ready', 'success');
  } catch (error) {
    loader.logStep('WebSocket', 'WebSocket failed', 'error');
    throw error;
  }
}

// Async init step
export async function initAtoms(loader: LoaderController): Promise<void> {
  loader.logStep('Atoms', 'Initializing atoms...');

  try {
    await bridgeJotaiStore();

    loader.logStep('Atoms', 'Atoms ready', 'success');
  } catch (error) {
    loader.logStep('Atoms', 'Atoms failed', 'error');
    throw error;
  }
}

// Init step with cleanup
export function initKeyboardShortcuts(loader: LoaderController): () => void {
  loader.logStep('Shortcuts', 'Initializing shortcuts...');

  try {
    const handleKeyDown = (e: KeyboardEvent) => { ... };
    window.addEventListener('keydown', handleKeyDown);

    loader.logStep('Shortcuts', 'Shortcuts ready', 'success');

    // Return cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  } catch (error) {
    loader.logStep('Shortcuts', 'Shortcuts failed', 'error');
    throw error;
  }
}

// Main bootstrap function
export async function bootstrap(): Promise<void> {
  const loader = createLoader();

  try {
    // Run init steps in order
    initWebSocket(loader);
    await initAtoms(loader);
    initGlobals(loader);
    await initModules(loader);
    initHUD(loader);

    await loader.succeed('Gemini loaded!', 500);
  } catch (error) {
    await loader.fail('Failed to load Gemini', error);
  }
}
```

### `index.ts` - Public exports

Re-export everything that should be accessible:

```typescript
export { createLoader } from './loader';
export type { LoaderController } from './loader';
export { bootstrap, initWebSocket, initAtoms, ... } from './bootstrap';
```

## Logging rules

### Always log start and end

```typescript
// ❌ BAD - No start log
function initFoo(loader: LoaderController): void {
  doSomething();
  loader.logStep('Foo', 'Done', 'success');  // User doesn't know it started
}

// ✅ GOOD - Start + end
function initFoo(loader: LoaderController): void {
  loader.logStep('Foo', 'Initializing Foo...');  // Start
  doSomething();
  loader.logStep('Foo', 'Foo ready', 'success');  // End
}
```

### Use stable step keys

Step keys are used for progress tracking. Keep them stable:

```typescript
// ❌ BAD - Unstable keys
loader.logStep('init-websocket', ...);  // Different format
loader.logStep('WebSocket Init', ...);  // Different format

// ✅ GOOD - Consistent keys
loader.logStep('WebSocket', 'Initializing...');
loader.logStep('WebSocket', 'Ready', 'success');
loader.logStep('WebSocket', 'Failed', 'error');
```

**Standard keys:** `WebSocket`, `Atoms`, `Globals`, `Modules`, `HUD`, `Features`

### Always wrap in try/catch

```typescript
// ❌ BAD - Uncaught error crashes loader
function initFoo(loader: LoaderController): void {
  loader.logStep('Foo', 'Starting...');
  dangerousOperation();  // Throws! Loader stuck.
  loader.logStep('Foo', 'Done', 'success');
}

// ✅ GOOD - Errors caught and logged
function initFoo(loader: LoaderController): void {
  loader.logStep('Foo', 'Starting...');

  try {
    dangerousOperation();
    loader.logStep('Foo', 'Done', 'success');
  } catch (error) {
    loader.logStep('Foo', 'Failed', 'error');
    throw error;  // Or handle gracefully
  }
}
```

## Yielding to main thread

Heavy init steps can freeze the loader UI. Yield to keep it responsive:

```typescript
// ❌ BAD - Blocks UI for 500ms
async function initHeavy(loader: LoaderController): Promise<void> {
  loader.logStep('Heavy', 'Processing...');

  for (let i = 0; i < 1000000; i++) {
    expensiveOperation(i);  // UI frozen!
  }

  loader.logStep('Heavy', 'Done', 'success');
}

// ✅ GOOD - Yields to browser
async function initHeavy(loader: LoaderController): Promise<void> {
  loader.logStep('Heavy', 'Processing...');

  for (let i = 0; i < 1000000; i++) {
    expensiveOperation(i);

    // Yield every 1000 iterations
    if (i % 1000 === 0) {
      await new Promise(resolve => setTimeout(resolve, 0));
    }
  }

  loader.logStep('Heavy', 'Done', 'success');
}
```

**Yield methods:**
- `setTimeout(resolve, 0)` - Yields to event loop
- `requestIdleCallback(resolve)` - Yields until browser is idle
- `requestAnimationFrame(resolve)` - Yields until next frame

## Init step patterns

### Sync step
```typescript
export function initSync(loader: LoaderController): void {
  loader.logStep('Sync', 'Starting...');
  try {
    syncOperation();
    loader.logStep('Sync', 'Done', 'success');
  } catch (error) {
    loader.logStep('Sync', 'Failed', 'error');
    throw error;
  }
}
```

### Async step
```typescript
export async function initAsync(loader: LoaderController): Promise<void> {
  loader.logStep('Async', 'Starting...');
  try {
    await asyncOperation();
    loader.logStep('Async', 'Done', 'success');
  } catch (error) {
    loader.logStep('Async', 'Failed', 'error');
    throw error;
  }
}
```

### Step with cleanup
```typescript
export function initWithCleanup(loader: LoaderController): () => void {
  loader.logStep('Cleanup', 'Starting...');
  try {
    const interval = setInterval(tick, 1000);

    loader.logStep('Cleanup', 'Done', 'success');

    return () => {
      clearInterval(interval);
    };
  } catch (error) {
    loader.logStep('Cleanup', 'Failed', 'error');
    throw error;
  }
}
```

## Common mistakes

### ❌ Init logic in loader.ts
```typescript
// loader.ts
import { initWebSocket } from '../websocket';  // ❌ Wrong place!

export function createLoader() {
  initWebSocket();  // ❌ Init logic doesn't belong here
}
```

### ❌ Missing re-export from index.ts
```typescript
// bootstrap.ts
export function initNewFeature(loader) { ... }

// index.ts - forgot to export!
export { bootstrap, initAtoms };  // initNewFeature missing!
```

### ❌ Inconsistent step keys
```typescript
loader.logStep('ws', 'Starting...');      // First call
loader.logStep('WebSocket', 'Done');       // Second call - different key!
// Progress tracking broken
```

### ❌ Silent failures
```typescript
// ❌ BAD - Error swallowed
try {
  dangerousOperation();
} catch (error) {
  console.error(error);  // Not shown to user!
}

// ✅ GOOD - Log to loader
try {
  dangerousOperation();
} catch (error) {
  loader.logStep('Feature', 'Failed', 'error');
  throw error;
}
```
