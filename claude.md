# Gemini - Game Mod for MagicGarden/Quinoa

## Project Overview

Gemini is a sophisticated Tampermonkey/Violetmonkey userscript mod for the MagicGarden/Quinoa web game. It provides a custom HUD overlay with real-time game state management and WebSocket integration.

**Target Platforms:** All browsers (Chrome, Firefox, Safari, Edge) on PC, Mac, iOS, and Android via Tampermonkey/Violetmonkey.

**Game URLs:**
- `https://magiccircle.gg/r/*`
- `https://magicgarden.gg/r/*`
- `https://starweaver.org/r/*`

## Tech Stack

- **TypeScript 5.9.3** (strict mode)
- **esbuild** - Bundler (IIFE format, single file output)
- **Jotai** - State management (custom bridge to game's React store)
- **Pixi.js** - Graphics/sprite rendering (via game's instance)
- **Shadow DOM** - UI isolation from game styles

## Project Structure

```
Gemini/
├── src/                      # Main source code
│   ├── main.ts              # Entry point
│   ├── bootstrap.ts         # Init functions
│   ├── loader.ts            # Loading overlay
│   ├── atoms/               # Jotai store bridge
│   ├── modules/             # Game asset systems
│   ├── ui/                  # HUD & components
│   ├── utils/               # Utilities
│   ├── websocket/           # Network layer
│   └── data/                # Reference data
├── GameSourceFiles/          # Extracted game source (reference)
├── GameFilesExample/         # Example game data files
├── dist/                     # Build output
├── esbuild.config.mjs       # Build config
├── meta.userscript.js       # Userscript metadata
└── tsconfig.json            # TypeScript config
```

## Key Directories

### `/src/atoms/` - Game State (Jotai Bridge)
Custom bridge to React's Jotai store. Captures game state without direct imports.

**Key files:**
- `atoms.ts` - Atom definitions (position, inventory, pets, shops, etc.)
- `store.ts` - Store facade (`Store.select()`, `Store.set()`, `Store.subscribe()`)
- `core/bridge.ts` - Mirror bridge to Jotai
- `types.ts` - TypeScript types for all game state

**Usage:**
```typescript
await Store.select('myInventoryAtom')        // Read
await Store.set('myInventoryAtom', value)    // Write
await Store.subscribe('myInventoryAtom', cb) // Subscribe
```

### `/src/modules/` - Game Assets & Graphics
Access to game resources and Pixi.js rendering.

**Key files:**
- `core/version.ts` - Game version detection
- `core/manifest.ts` - Asset manifest loading
- `pixi/sprite.ts` - Sprite/texture loading
- `pixi/tile.ts` - Tile system introspection
- `media/audio.ts` - Audio/SFX system

### `/src/ui/` - HUD & Components
Overlay interface with theme management.

**Structure:**
- `hud/` - Main HUD factory and state
- `components/` - Reusable UI (Button, Input, Select, Table, etc.)
- `sections/` - Modular tabs/sections
- `theme/` - Theme switching
- `styles/` - Global CSS variables and utilities

**Component Pattern:** Factory functions with CSS-in-JS
```typescript
const button = Button({ label: "Click", variant: "primary", onClick: fn });
```

### `/src/websocket/` - Network Layer
WebSocket capture and message routing.

**Key files:**
- `connection.ts` - WebSocket capture & transport
- `api.ts` - Player action functions (chat, plant, harvest, etc.)
- `middlewares/` - Outgoing message processing
- `handlers/` - Incoming message handlers

**API:**
```typescript
await chat("Hello!");
await plantSeed(seedId, x, y);
await harvestCrop(cropId);
```

### `/src/utils/` - Utilities
- `api.ts` - Game REST endpoints
- `pageContext.ts` - Tampermonkey page window access

### `/GameSourceFiles/` - Game Reference
Extracted game source code for reference only. Contains:
- Flora/fauna/decor definitions
- Mutation mechanics
- Shop/inventory systems
- Map/tile data

**Note:** This is the deobfuscated game code fetched from network. We only have access to the minified main in production.

## Build Commands

```bash
npm run build      # Debug build -> dist/gemini-build.user.js
npm run release    # Release build -> dist/gemini.user.js
npm run typecheck  # TypeScript validation
```

## Initialization Flow

```
1. installReactDevToolsHook()  # Capture React store
2. createLoader()              # Show loading screen
3. initWebSocketCapture()      # Intercept game WebSocket
4. initAtoms()                 # Bridge to Jotai store
5. initHUD()                   # Create Shadow DOM overlay
6. initModules()               # Load asset systems
7. Ready!
```

## Coding Guidelines

### General
- **TypeScript strict mode** - All code must be fully typed
- **No comments needed** - Use clear, self-documenting names
- **Async/await** - All store/network operations are async
- **Shadow DOM isolation** - UI styles don't leak to game

### State Management
- **Read game state** via atoms (`Store.select()`)
- **Send commands** via WebSocket API (`api.ts` functions)
- **UI state** persists via Tampermonkey storage (`GM_getValue`/`GM_setValue`)

### Component Creation
- All components are **synchronous factory functions**
- Each component has a `.css.ts` file for styles
- Use existing components in `/ui/components/`

### Adding Features
1. **New atom?** Add to `atoms/atoms.ts` and `atoms/types.ts`
2. **New game action?** Add to `websocket/api.ts`
3. **New UI section?** Create in `ui/sections/` and register in `registry.ts`
4. **New component?** Create folder in `ui/components/`

### WebSocket Middleware
- Middlewares in `websocket/middlewares/` auto-register via import
- Handlers in `websocket/handlers/` auto-register via import
- Add imports to `websocket/bootstrap.ts`

## Key Patterns

### Lazy Initialization
```typescript
let instance: T | null = null;
export function init(): T {
  if (instance) return instance;
  instance = create();
  return instance;
}
```

### Atom Views (Derived State)
```typescript
const gardenView = makeView("myDataAtom", { path: "garden" });
```

### Cleanup/Disposal
Functions return cleanup routines when needed:
```typescript
const unsubscribe = await Store.subscribe('atom', callback);
// Later: unsubscribe();
```

## Important Types

### Inventory
- `CropInventoryItem`, `SeedInventoryItem`, `ToolInventoryItem`
- `EggInventoryItem`, `PetInventoryItem`, `DecorInventoryItem`

### Garden
- `GrowSlot` - Plant growth stage
- `PlantTileObject`, `EggTileObject`, `DecorTileObject`

### Pets
- `PetSlot`, `PetInfo`, `PetSlotInfo`

### Shops
- `Shop`, `Shops` (seed, egg, tool, decor)
- Reset timers: seed 300s, tool 600s, egg 900s, decor 3600s

## Cross-Platform Notes

- Use `pageWindow` from `utils/pageContext.ts` for `unsafeWindow` access
- Test on mobile browsers (touch events, responsive layout)
- Shadow DOM ensures style isolation across browsers
- Avoid browser-specific APIs without polyfills

## Debugging

- Toggle HUD: `Ctrl+Shift+U`
- Atoms available via React DevTools
- Console logs prefixed with `[Gemini]`
- Loading screen shows initialization progress
