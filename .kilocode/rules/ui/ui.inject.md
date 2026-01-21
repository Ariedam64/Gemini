---
paths: src/ui/inject/**/*
---

# UI Injection Rules

Rules for features that modify existing game UI through DOM patching/injection.

## Location

All game UI modifications live in:
```
src/ui/inject/
├── qol/           # Quality-of-life enhancements
│   ├── index.ts   # Exports all QOL features
│   └── <feature>/ # Individual QOL features
└── patches/       # Game UI patches (optional)
```

## Structure (per feature)

```
src/ui/inject/qol/<featureName>/
├── index.ts       # Public API (init, destroy, isEnabled)
├── inject.ts      # DOM injection logic
├── styles.css.ts  # Injected styles (optional)
└── state.ts       # Persistent state (optional)
```

## API (mandatory)

Each injection feature must export:
```typescript
export const <FeatureName>Inject = {
  init(): void { /* inject into game UI */ },
  destroy(): void { /* remove all injected elements */ },
  isEnabled(): boolean { /* check if feature is active */ },
};
```

## Rules

### Idempotent
- `init()` must be safe to call multiple times
- Check if already injected before injecting

### Reversible  
- `destroy()` must fully remove all injected elements
- No orphaned elements, listeners, or styles

### No leaks
- All event listeners must be tracked and removed on destroy
- All MutationObservers must be disconnected on destroy
- All setInterval/setTimeout must be cleared on destroy

### Cleanup tracking
```typescript
const cleanups: (() => void)[] = [];

function addCleanup(fn: () => void): void {
  cleanups.push(fn);
}

function destroy(): void {
  cleanups.forEach(fn => fn());
  cleanups.length = 0;
}
```

### Scope
- Only modify game UI elements, never Gemini HUD
- Use specific selectors to target game elements
- Prefer class-based selectors over complex paths

### Styling
- Injected styles must be scoped (e.g., `.gemini-qol-<feature>`)
- Use CSS custom properties from theme when possible
- Inject via `<style>` element with cleanup

## Boundaries

- Injection features MAY import from `src/modules/` (readonly access)
- Injection features MAY use `src/websocket/api.ts` (for actions)
- Injection features must NOT import from `src/ui/components/` or `src/ui/hud/`
- Injection features must NOT render Shadow DOM

## Storage

- Use `src/utils/storage.ts` for persistence
- Key pattern: `gemini:inject:<featureName>:*`
