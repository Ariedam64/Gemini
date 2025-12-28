# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Userscript mod (Tampermonkey/Violetmonkey) for MagicGarden game. HUD overlay with real-time state management and WebSocket integration.

**URLs:** `magiccircle.gg/r/*`, `magicgarden.gg/r/*`, `starweaver.org/r/*`

**Stack:** TypeScript 5.9 (strict), esbuild (IIFE), Jotai, Pixi.js, Shadow DOM

## Structure

```
src/
├── main.ts           # Entry point
├── api/              # Public API (window.Gemini)
├── atoms/            # Jotai bridge (state)
├── globals/          # Reactive global variables
├── modules/          # Assets & Pixi.js
├── websocket/        # Network (WS capture)
├── ui/
│   ├── loader/       # Bootstrap & loading screen
│   ├── hud/          # Main HUD overlay
│   ├── components/   # Reusable UI components
│   ├── sections/     # Modular tabs/sections
│   ├── theme/        # Theme management
│   └── styles/       # CSS utilities
└── utils/            # Utilities
```

## Initialization (ui/loader/bootstrap.ts)

```
1. installReactDevToolsHook()  → Capture React Fiber
2. createLoader()              → Display loader
3. initWebSocketCapture()      → Intercept WebSocket
4. initAtoms()                 → Bridge Jotai store
5. initReactiveGlobals()       → Reactive global variables
6. initAPI()                   → Expose window.Gemini
7. initHUD()                   → Shadow DOM overlay
8. initModules()               → Load assets (Data, Sprite, Tile, Pixi, Audio)
```

## Loader (ui/loader/loader.ts)

`LoaderController` interface:
- `log(message, tone?)` - Log message (info/success/error)
- `logStep(key, message, tone?)` - Log with step key
- `succeed(message?, delayMs?)` - Complete successfully
- `fail(message, error?)` - Display error

## Public API (window.Gemini)

Exposed via `api/index.ts`:

```typescript
window.Gemini = {
  Store: { select, set, subscribe, subscribeImmediate },
  Globals: { currentTile },
  Modules: { Version, Assets, Manifest, Data, Sprite, Tile, Pixi, Audio, Cosmetic },
  WebSocket: { chat, move, plantSeed, harvestCrop, purchaseSeed, placePet, ... }
}
```

## Global Variables (globals/)

Reactive variables combining multiple atoms:

```typescript
interface GlobalVariable<T> {
  get(): T;
  subscribe(callback: (value: T, prev: T) => void): Unsubscribe;
  destroy(): void;
}

// Example: currentTile combines 8 atoms into one object
Globals.currentTile.get()  // { position, tile, garden, object, plant }
Globals.currentTile.subscribe((value, prev) => { ... })
```

**Creation:** `createReactiveGlobal()` in `globals/core/reactive.ts`

## Store (atoms/)

```typescript
await Store.select('myInventoryAtom')        // Read
await Store.set('myInventoryAtom', value)    // Write
await Store.subscribe('myInventoryAtom', cb) // Subscribe
```

## WebSocket (websocket/)

- `connection.ts` - WebSocket capture & transport
- `api.ts` - Actions (chat, plantSeed, harvestCrop, purchaseSeed, placePet, ...)
- `middlewares/` - Outgoing message filtering (auto-register via import)
- `handlers/` - Incoming message handling (auto-register via import)

## Build

```bash
npm run build      # Debug → dist/gemini-build.user.js
npm run release    # Release → dist/gemini.user.js
npm run typecheck  # TypeScript validation
```

## Code Rules

### Readability
- **Explicit names** - Self-documenting variables, functions, and types
- **No comments** - Code must be readable without explanation
- **Short functions** - Max ~30 lines, single responsibility
- **Early return** - Avoid deep nesting levels
- **Named constants** - No magic numbers/strings

### TypeScript
- **Strict mode** - Everything must be explicitly typed
- **Dedicated types** - Create types for complex structures
- **Avoid `any`** - Use `unknown` if necessary

### Architecture
- **Factory functions** - Synchronous components returning HTMLElement
- **Lazy init** - Singleton pattern with init check
- **Cleanup** - Every subscription returns a cleanup function
- **Shadow DOM** - UI isolated from game

### Patterns

```typescript
// Lazy init
let instance: T | null = null;
export function init(): T {
  if (instance) return instance;
  return instance = create();
}

// Cleanup
const unsubscribe = await Store.subscribe('atom', callback);
// Later: unsubscribe();
```

### Adding Features
1. **New atom** → `atoms/atoms.ts` + `atoms/types.ts`
2. **New action** → `websocket/api.ts`
3. **New UI section** → `ui/sections/` + register in `registry.ts`
4. **New component** → Folder in `ui/components/`
5. **New middleware/handler** → File + import in `websocket/bootstrap.ts`

## Game Source Reference

The `GameSourceFiles/` folder contains the deobfuscated game source code for reference. This is where you can understand how the game works internally (flora, fauna, mutations, shops, inventory, map/tile systems, etc.).

**Important:** In production, only the minified bundle is available:
`GameSourceFiles/gg-preview-pr-2307-router.magiccircle.workers.dev/version/gg-preview-pr-2307-app/assets/main-DT8r8yOu.js`

The mod hooks into this minified code at runtime.

## Debug

- Toggle HUD: `Ctrl+Shift+U`
- Console: logs prefixed with `[Gemini]`
- Loader: shows init progress
