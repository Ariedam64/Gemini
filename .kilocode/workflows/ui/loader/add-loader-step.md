# Workflow: Add Loader Init Step

Follow this checklist to add a new initialization step to the mod's bootstrap sequence.

See [.claude/rules/ui/loader.md](.claude/rules/ui/loader.md) for detailed rules.

## 1. Create the init function

In `src/ui/loader/bootstrap.ts`:

### Sync init function

```typescript
export function initMyFeature(loader: LoaderController): void {
  loader.logStep('MyFeature', 'Initializing MyFeature...');

  try {
    // Initialization logic
    // ...

    loader.logStep('MyFeature', 'MyFeature initialized', 'success');
  } catch (error) {
    loader.logStep('MyFeature', 'Failed to initialize MyFeature', 'error');
    throw error;  // Or handle gracefully
  }
}
```

### Async init function

```typescript
export async function initMyFeature(loader: LoaderController): Promise<void> {
  loader.logStep('MyFeature', 'Initializing MyFeature...');

  try {
    // Async initialization logic
    await someAsyncOperation();

    loader.logStep('MyFeature', 'MyFeature initialized', 'success');
  } catch (error) {
    loader.logStep('MyFeature', 'Failed to initialize MyFeature', 'error');
    throw error;
  }
}
```

### Init function with cleanup

```typescript
export function initMyFeature(loader: LoaderController): () => void {
  loader.logStep('MyFeature', 'Initializing MyFeature...');

  try {
    // Setup listeners, intervals, etc.
    const interval = setInterval(() => { /* ... */ }, 1000);

    loader.logStep('MyFeature', 'MyFeature initialized', 'success');

    // Return cleanup function
    return () => {
      clearInterval(interval);
    };
  } catch (error) {
    loader.logStep('MyFeature', 'Failed to initialize MyFeature', 'error');
    throw error;
  }
}
```

## 2. Add to bootstrap sequence

In `src/ui/loader/bootstrap.ts`, add your init step to the main `bootstrap()` function:

```typescript
export async function bootstrap(): Promise<void> {
  const loader = createLoader();

  try {
    // ... existing steps

    // Add your step here (order matters!)
    await initMyFeature(loader);

    // ... rest of steps

    await loader.succeed('Gemini loaded successfully!');
  } catch (error) {
    await loader.fail('Failed to load Gemini', error);
  }
}
```

## 3. Re-export from loader index

In `src/ui/loader/index.ts`:

```typescript
export { initMyFeature } from './bootstrap';
```

## 4. Important rules

### Logging
- **REQUIRED:** Log at start with `loader.logStep(Key, Message)`
- **REQUIRED:** Log on success with `loader.logStep(Key, Message, 'success')`
- **REQUIRED:** Log on error with `loader.logStep(Key, Message, 'error')`

### Step keys
- Use short, stable keys (e.g., `'Atoms'`, `'HUD'`, `'Globals'`)
- Reuse the same key for start/success/error logs
- Keys are used for progress tracking

### Error handling
- **REQUIRED:** Wrap logic in `try/catch`
- **REQUIRED:** Log errors before throwing
- Decide: rethrow (block bootstrap) or handle gracefully (continue)

### Yielding to main thread
If the init step does heavy work (> 50ms), yield to keep the loader responsive:

```typescript
export async function initHeavyFeature(loader: LoaderController): Promise<void> {
  loader.logStep('Heavy', 'Processing...');

  // Yield to browser
  await new Promise(resolve => setTimeout(resolve, 0));
  // or
  await new Promise(resolve => requestIdleCallback(resolve));

  // Heavy work
  performExpensiveOperation();

  loader.logStep('Heavy', 'Done', 'success');
}
```

## 5. Test the step

Verify:
- Step appears in loader UI with correct message
- Success/error states display correctly
- Init step completes without blocking UI
- Cleanup function (if any) is called on mod unload
- Error handling works (try/catch prevents loader crash)

## Quick checklist

- [ ] Init function created in `src/ui/loader/bootstrap.ts`
- [ ] Logs at start: `loader.logStep(Key, Message)`
- [ ] Logs on success: `loader.logStep(Key, Message, 'success')`
- [ ] Logs on error: `loader.logStep(Key, Message, 'error')`
- [ ] Wrapped in `try/catch`
- [ ] Added to `bootstrap()` sequence (correct order)
- [ ] Re-exported from `src/ui/loader/index.ts`
- [ ] Yields to main thread if heavy work
- [ ] Cleanup function returned (if needed)
- [ ] Tests passing (loader shows step, no UI freeze)
