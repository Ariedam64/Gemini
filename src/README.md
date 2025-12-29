# src/ - Project Architecture

## Overview

Gemini is a userscript (Tampermonkey/Violetmonkey) that adds a HUD overlay to the MagicGarden game. It uses Shadow DOM to isolate the interface from the game.

## Folder Structure

```
src/
├── main.ts              # Entry point
├── api/                 # Public API (window.Gemini)
├── atoms/               # State management (Jotai bridge)
├── globals/             # Reactive global variables
├── modules/             # Game modules (Data, Sprite, Audio...)
├── websocket/           # Network communication
├── ui/                  # User interface
│   ├── loader/          # Loading screen
│   ├── hud/             # Main overlay
│   ├── components/      # Reusable components
│   ├── sections/        # Modular tabs/sections
│   ├── theme/           # Theme management
│   └── styles/          # CSS and utilities
├── data/                # Static data
└── utils/               # General utilities
```

## Initialization Flow

The `main.ts` file orchestrates initialization in this order:

```
1. createLoader()           → Display loading screen
2. initWebSocketCapture()   → Intercept game's WebSocket
3. initAtoms()              → Connect to game's Jotai store
4. initReactiveGlobals()    → Create reactive variables
5. initAPI()                → Expose window.Gemini
6. initModules()            → Load Data, Sprite, Pixi, Audio...
7. initSpriteWarmup()       → Preload common sprites
8. initSectionsPreload()    → Preload heavy sections
9. initHUD()                → Create Shadow DOM overlay
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                          GAME                               │
└─────────────────────────────────────────────────────────────┘
           │                              ▲
           │ Incoming messages            │ Outgoing messages
           ▼                              │
┌─────────────────────────────────────────────────────────────┐
│                      WEBSOCKET                              │
│  handlers/ (incoming)    │    middlewares/ (outgoing)       │
│  api.ts (send actions)   │    connection.ts (transport)     │
└─────────────────────────────────────────────────────────────┘
           │                              ▲
           ▼                              │
┌─────────────────────────────────────────────────────────────┐
│                        ATOMS                                │
│  Bridge to game's Jotai store                               │
│  50+ atoms (position, inventory, pets, shops...)            │
└─────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│                       GLOBALS                               │
│  Reactive variables combining multiple atoms                │
│  currentTile, myPets, myInventory, shops...                 │
└─────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────┐
│                         UI                                  │
│  HUD (Shadow DOM) → Sections → Components                   │
└─────────────────────────────────────────────────────────────┘
```

## Code Conventions

### Main Patterns

**Synchronous factory functions** for UI components:
```typescript
function MyComponent(opts: Options): HTMLElement {
  const el = element("div");
  // ... setup
  return el;
}
```

**Lazy initialization** for singletons:
```typescript
let instance: T | null = null;
export function init(): T {
  if (instance) return instance;
  return instance = create();
}
```

**Systematic cleanup** for subscriptions:
```typescript
const unsubscribe = Store.subscribe('atom', callback);
// Later: unsubscribe();
```

### TypeScript Rules

- Strict mode required
- No `any` (use `unknown` if necessary)
- Dedicated types for complex structures
- Explicit, self-documenting names

### General Rules

- No comments (code should be readable without explanation)
- Short functions (~30 lines max)
- Early return to avoid nesting
- Named constants (no magic numbers)

## Adding a Feature

| Type | Location | Files to Modify |
|------|----------|-----------------|
| New atom | `atoms/` | `atoms.ts`, `types.ts` |
| New global variable | `globals/variables/` | New file + `index.ts` |
| New WebSocket action | `websocket/` | `api.ts`, `protocol.ts` |
| New middleware | `websocket/middlewares/` | New file + `bootstrap.ts` |
| New handler | `websocket/handlers/` | New file + `bootstrap.ts` |
| New module | `modules/` | New file + `index.ts` |
| New UI section | `ui/sections/` | New folder + `registry.ts` |
| New UI component | `ui/components/` | New folder |

## Debug

- **Toggle HUD**: `Ctrl+Shift+U`
- **Console**: logs prefixed with `[Gemini]`
- **API**: `window.Gemini` in console

## See Also

- [atoms/README.md](atoms/README.md) - State management
- [globals/README.md](globals/README.md) - Reactive variables
- [websocket/README.md](websocket/README.md) - Network communication
- [modules/README.md](modules/README.md) - Game modules
- [ui/README.md](ui/README.md) - User interface
- [api/README.md](api/README.md) - Public API
