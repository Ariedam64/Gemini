# Gemini

A powerful userscript mod for **MagicGarden/MagicCircle** that provides a customizable HUD overlay with real-time state management and WebSocket integration.

## Features

- **Real-time State Management** - Bridge to game's Jotai store with reactive global variables
- **WebSocket Integration** - Intercept and send game messages programmatically
- **HUD Overlay** - Customizable interface isolated in Shadow DOM
- **Game Data Access** - Dynamic extraction of plants, pets, mutations, items, and more via MGData
- **Sprite Rendering** - Display game sprites with mutation support via MGSprite
- **Modular Architecture** - Core modules (always active) + optional features (toggleable)
- **19+ UI Components** - Production-ready component library with class-based styling
- **TypeScript Strict Mode** - Type-safe development with zero `any` types

## Supported Sites

- `magiccircle.gg/r/*`
- `magicgarden.gg/r/*`
- `starweaver.org/r/*`
- `1227719606223765687.discordsays.com/*` (Discord Activities)

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
2. Build the userscript:
   ```bash
   npm install
   npm run release
   ```
3. Install `dist/gemini.user.js` in your userscript manager

## Quick Start

### NPM Scripts

```bash
npm run dev        # Vite dev server
npm run build      # Debug build → dist/gemini-build.user.js
npm run release    # Production build → dist/gemini.user.js
npm run devtools   # Watch mode
npm run typecheck  # TypeScript validation
npm run test       # Vitest
npm run lint       # ESLint
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+U` | Toggle HUD visibility |

### Debug

- **Console logs**: Prefixed with `[Gemini]`
- **Loader**: Shows initialization progress with step-by-step logging

## Public API

The mod exposes a global `window.Gemini` API with the following namespaces:

### Store (Jotai Bridge)

```typescript
// Read state
await Gemini.Store.select('myInventoryAtom')

// Write state
await Gemini.Store.set('myInventoryAtom', newValue)

// Subscribe to changes
const unsub = await Gemini.Store.subscribe('myInventoryAtom', (value) => {
  console.log('Inventory changed:', value)
})

// Subscribe with immediate callback
await Gemini.Store.subscribeImmediate('myInventoryAtom', callback)
```

### Globals (Reactive Variables)

Reactive variables that combine multiple atoms into cohesive objects:

```typescript
// Available globals
Gemini.Globals.currentTile   // { position, tile, garden, object, plant }
Gemini.Globals.myPets        // Player's pets array
Gemini.Globals.myGarden      // Player's garden state
Gemini.Globals.myInventory   // Player's inventory
Gemini.Globals.gameMap       // Game map data
Gemini.Globals.players       // Connected players
Gemini.Globals.shops         // Shop data
Gemini.Globals.weather       // Current weather

// Usage
const tile = Gemini.Globals.currentTile.get()
console.log(tile.position, tile.object, tile.plant)

// Subscribe to changes
const unsub = Gemini.Globals.currentTile.subscribe((value, prev) => {
  console.log('Tile changed from', prev, 'to', value)
})

// Granular subscriptions (currentTile only)
Gemini.Globals.currentTile.subscribeObject(({ current, previous }) => { ... })
Gemini.Globals.currentTile.subscribePlantInfo(({ current, previous }) => { ... })
Gemini.Globals.currentTile.subscribeGarden(({ current, previous }) => { ... })
```

### Modules (Core Infrastructure)

Core modules are always active and provide essential functionality:

```typescript
// Version
Gemini.Modules.Version.get()        // '1.0.0'

// Assets
Gemini.Modules.Assets.getBaseUrl()  // Game assets base URL
Gemini.Modules.Assets.getManifestUrl()

// Manifest
Gemini.Modules.Manifest.get()       // Full manifest data
Gemini.Modules.Manifest.getSprites()
Gemini.Modules.Manifest.getAudio()

// Data - Dynamic game data capture
Gemini.Modules.Data.get('plants')      // All plants (seed, plant, crop)
Gemini.Modules.Data.get('pets')        // All pets/fauna
Gemini.Modules.Data.get('mutations')   // All mutations
Gemini.Modules.Data.get('items')       // All items
Gemini.Modules.Data.get('decors')      // All decorations
Gemini.Modules.Data.get('eggs')        // All eggs
Gemini.Modules.Data.get('abilities')   // Pet abilities
Gemini.Modules.Data.get('weather')     // Weather types
Gemini.Modules.Data.getAll()           // Get all captured data
Gemini.Modules.Data.has('plants')      // Check if data is available
await Gemini.Modules.Data.waitFor('plants')  // Wait for specific data

// Sprite - Render game sprites with mutations
Gemini.Modules.Sprite.show('plant', 'Carrot')
Gemini.Modules.Sprite.show('plant', 'Carrot', { mutations: ['Gold', 'Wet'] })
const canvas = Gemini.Modules.Sprite.toCanvas('plant', 'Carrot', { mutations: ['Rainbow'] })
Gemini.Modules.Sprite.getCategories()          // ['plant', 'pet', 'item', ...]
Gemini.Modules.Sprite.getCategoryId('plant')   // ['Carrot', 'Strawberry', ...]
Gemini.Modules.Sprite.has('plant', 'Carrot')   // true

// Tile - Map tile access
Gemini.Modules.Tile.getTile(x, y)
Gemini.Modules.Tile.getTransform()

// Pixi - Pixi.js integration
Gemini.Modules.Pixi.getApp()
Gemini.Modules.Pixi.getStage()

// Audio - Game audio
Gemini.Modules.Audio.play('click')

// Cosmetic - Cosmetic items
Gemini.Modules.Cosmetic.get('hats')
```

### Features (Optional/Toggleable)

Features are optional enhancements that can be toggled on/off:

```typescript
// Auto Favorite - Automatically favorite specific items
Gemini.Features.AutoFavorite.init()
Gemini.Features.AutoFavorite.isEnabled()
Gemini.Features.AutoFavorite.setEnabled(true)

// Journal Checker - Check journal entries
Gemini.Features.JournalChecker.init()

// Bulk Favorite - Batch favorite operations
Gemini.Features.BulkFavorite.init()

// Achievements - Track achievements
Gemini.Features.Achievements.init()

// Tracker - Statistics tracking
Gemini.Features.Tracker.init()
```

### WebSocket (Game Actions)

Send game actions programmatically:

```typescript
// Chat & Social
Gemini.WebSocket.chat('Hello!')
Gemini.WebSocket.emote('wave')
Gemini.WebSocket.wish('Good luck!')

// Movement
Gemini.WebSocket.move(x, y)
Gemini.WebSocket.teleport(x, y)

// Garden
Gemini.WebSocket.plantSeed('CarrotSeed', x, y)
Gemini.WebSocket.waterPlant('plant-id')
Gemini.WebSocket.harvestCrop('crop-id')
Gemini.WebSocket.sellAllCrops()

// Shop
Gemini.WebSocket.purchaseSeed('CarrotSeed')
Gemini.WebSocket.purchaseEgg('CommonEgg')
Gemini.WebSocket.purchaseDecor('WoodBench')

// Pets
Gemini.WebSocket.placePet('pet-id', x, y)
Gemini.WebSocket.feedPet('pet-id', 'food-id')
Gemini.WebSocket.namePet('pet-id', 'Fluffy')
Gemini.WebSocket.storePet('pet-id')

// Inventory
Gemini.WebSocket.moveInventoryItem(fromIndex, toIndex)
Gemini.WebSocket.dropObject(slotIndex)
Gemini.WebSocket.pickupObject('object-id')
```

## Architecture

### Project Structure

```
src/
├── main.ts                 # Userscript entry point
├── api/                    # Public API (window.Gemini)
├── atoms/                  # Jotai store bridge
│   ├── core/               # Bridge, lookup, signature detection
│   ├── store.ts            # Store facade (select/set/subscribe)
│   └── types.ts            # Atom type definitions
├── globals/                # Reactive global variables
│   ├── core/               # Base reactive system
│   └── variables/          # Individual globals (currentTile, myPets, etc.)
├── modules/                # Core infrastructure (always active)
│   ├── core/               # Version, Assets, Manifest, Data
│   ├── sprite/             # Sprite rendering with mutations
│   ├── tile/               # Map tile access
│   ├── pixi/               # Pixi.js hooks and integration
│   └── media/              # Audio and cosmetics
├── features/               # Optional features (toggleable)
│   ├── autoFavorite/       # Auto-favorite items
│   ├── journalChecker/     # Journal checking
│   ├── bulkFavorite/       # Bulk favorite operations
│   ├── achievements/       # Achievement tracking
│   └── tracker/            # Statistics tracking
├── websocket/              # WebSocket capture and API
│   ├── connection.ts       # Transport layer
│   ├── api.ts              # Domain actions
│   ├── middlewares/        # Outgoing message filters (auto-register)
│   └── handlers/           # Incoming message handlers (auto-register)
├── ui/
│   ├── loader/             # Bootstrap and loading screen
│   ├── hud/                # Main HUD overlay
│   ├── components/         # 19+ reusable UI components
│   ├── sections/           # Modular tabs/sections
│   ├── theme/              # Theme management
│   └── styles/             # CSS utilities
└── utils/                  # Cross-cutting utilities (storage, etc.)
```

### Initialization Order

The mod follows a strict initialization sequence (see [ui/loader/bootstrap.ts](src/ui/loader/bootstrap.ts)):

1. `installReactDevToolsHook()` - Capture React Fiber
2. `createLoader()` - Display loader UI
3. `initWebSocketCapture()` - Intercept WebSocket
4. `initAtoms()` - Bridge Jotai store
5. `initReactiveGlobals()` - Create reactive global variables
6. `initAPI()` - Expose `window.Gemini`
7. `initHUD()` - Create Shadow DOM overlay
8. `initModules()` - Load core modules (Data, Sprite, Tile, Pixi, Audio)

### Modules vs Features

#### Modules (`src/modules/`)
Core infrastructure, always active, exposed via `window.Gemini.Modules.*`:
- **MGData** - Dynamic game data capture
- **MGSprite** - Sprite rendering with mutations
- **MGTile** - Map tile access
- **MGPixi** - Pixi.js integration
- **MGAudio** - Game audio
- **MGCosmetic** - Cosmetic items
- **MGVersion** - Version information
- **MGAssets** - Asset management
- **MGManifest** - Game manifest

Each module exports an object with `init()` and `isReady()` methods.

#### Features (`src/features/`)
Optional, toggleable functionality, exposed via `window.Gemini.Features.*`:
- **AutoFavorite** - Auto-favorite specific items
- **JournalChecker** - Check journal entries
- **BulkFavorite** - Batch favorite operations
- **Achievements** - Achievement tracking
- **Tracker** - Statistics tracking

Each feature:
- MUST be toggleable (config with `enabled: boolean`)
- MUST NOT depend on other features
- CAN depend on core modules
- Uses `feature:` storage prefix (e.g., `feature:autoFavorite:config`)

### Storage

All storage uses Tampermonkey's `GM_*` API (not `localStorage`):

```typescript
import { loadValue, saveValue, KEYS } from './utils/storage'

// Keys are auto-prefixed with 'gemini:'
const config = loadValue(KEYS.AUTO_FAVORITE, defaultConfig)
saveValue(KEYS.AUTO_FAVORITE, config)

// Storage events
window.addEventListener('gemini:storage:change', (e) => {
  console.log('Storage changed:', e.detail.key, e.detail.value)
})
```

All storage keys are defined in [src/utils/storage.ts](src/utils/storage.ts) for centralized documentation.

## UI Components

The mod includes 19+ production-ready UI components with class-based styling:

| Component | Description |
|-----------|-------------|
| `Button` | Buttons with variants (default/primary/danger), icons, loading states |
| `Input` | Text inputs with validation, debouncing, game key blocking |
| `Select` | Dropdown select menus with keyboard navigation |
| `Switch` | Toggle switches with labels |
| `Slider` | Range sliders with min/max/step |
| `Card` | Container cards with expandable sections, headers, footers |
| `Badge` | Status badges with tone variants |
| `Label` | Form labels with hints, required indicators |
| `Table` | Data tables with sorting, filtering |
| `NavTabs` | Navigation tabs with pill indicator |
| `SearchBar` | Search input with clear button |
| `Tooltip` | Hover tooltips |
| `ColorPicker` | Color selection with presets |
| `TimeRangePicker` | Time range selection |
| `ReorderableList` | Drag-and-drop reorderable lists |
| `Log` | Log message display with tone variants |
| `Divider` | Visual dividers |
| `Range` | Range display component |
| `StatRow` | Statistics row display |

See [.claude/workflows/ui/component/](..claude/workflows/ui/component/) for component creation workflows.

## Core Rules

All code must follow these non-negotiable rules (see [.claude/rules/core.md](.claude/rules/core.md)):

### 1. Game Compatibility
- **NEVER hardcode game data** - Use `MGData.get()` for all game data
- **All sprite rendering** must go through `MGSprite` API
- No manual atlas/frame fetching

### 2. Boundaries
- DOM/Shadow DOM rendering: `src/ui/` only
- WebSocket sending: Via WS API layer only (`src/websocket/api.ts`)
- State: Via Store/atoms + reactive Globals only
- No ad-hoc globals or singletons

### 3. Side Effects & Cleanup
- No side effects on import (no listeners, intervals, patches, WS sends, audio)
- Every subscription/listener MUST have cleanup
- Safe to call multiple times
- Cross-feature signals: `CustomEvent` prefixed with `gemini:`

### 4. Storage
- Keys namespaced with `gemini:` prefix (automatic via wrapper)
- Use `src/utils/storage.ts`, NOT direct `GM_getValue`/`GM_setValue`
- All keys defined in `KEYS` export
- HUD persisted state: `src/ui/hud/state/state.ts`

### 5. Code Quality
- Files < 500 lines (split by responsibility)
- Functions small and single-purpose
- Prefer early returns over deep nesting
- Explicit names (no 1-letter names)
- No magic numbers/strings (use named constants)

### 6. TypeScript & Public API
- TypeScript strict: no `any` (use `unknown` + narrowing)
- Public APIs minimal and easy to use (façade approach)
- Prefer domain entrypoints (`index.ts`) over deep imports

## Development Workflows

The [.claude/workflows/](.claude/workflows/) folder contains step-by-step guides for common tasks:

### Features
- [Creating a Feature](.claude/workflows/feature/create.md)
- [Adding Feature Logic](.claude/workflows/feature/logic.md)
- [Adding Feature UI](.claude/workflows/feature/ui.md)
- [Adding Feature State](.claude/workflows/feature/state.md)

### UI
- [Creating a Component](.claude/workflows/ui/component/create.md)
- [Creating a Section](.claude/workflows/ui/section/create.md)
- [Creating a Loader Step](.claude/workflows/ui/loader/create.md)
- [Creating a Style](.claude/workflows/ui/style/create.md)

### State
- [Creating an Atom](.claude/workflows/state/atom.md)
- [Creating a Global](.claude/workflows/state/global.md)

### WebSocket
- [Creating an Action](.claude/workflows/websocket/action.md)
- [Creating a Handler](.claude/workflows/websocket/handler.md)
- [Creating a Middleware](.claude/workflows/websocket/middleware.md)

## Extending the Mod

### Adding a New Feature

Features are optional, toggleable functionality. See [.claude/workflows/feature/create.md](.claude/workflows/feature/create.md) for the complete workflow.

**Quick example:**

```typescript
// src/features/myFeature/types.ts
import { FEATURE_KEYS } from '../../utils/storage'

export interface MyFeatureConfig {
  enabled: boolean
  // ... other config
}

export const STORAGE_KEY = FEATURE_KEYS.MY_FEATURE
export const DEFAULT_CONFIG: MyFeatureConfig = {
  enabled: false,
}

// src/features/myFeature/index.ts
import { loadConfig } from './state'

let initialized = false

export function init(): void {
  if (initialized) return

  const config = loadConfig()
  if (!config.enabled) {
    console.log('[MyFeature] Disabled')
    return
  }

  initialized = true
  console.log('[MyFeature] Initialized')

  // Setup feature...
}

export function destroy(): void {
  if (!initialized) return
  initialized = false
  // Cleanup...
}

export const MGMyFeature = {
  init,
  destroy,
  isEnabled,
  setEnabled,
  getConfig,
  updateConfig,
}
```

### Adding a New Section

Sections are tabs in the HUD. See [.claude/workflows/ui/section/create.md](.claude/workflows/ui/section/create.md) for the complete workflow.

**Quick example:**

```typescript
// src/ui/sections/YourSection/YourSection.ts
import { BaseSection } from '../core/Section'

export class YourSection extends BaseSection {
  readonly id = 'your-section'
  readonly label = 'Your Section'

  build(container: HTMLElement): void | Promise<void> {
    const section = this.createContainer(this.id)
    // Build your UI
    container.appendChild(section)
  }
}

// src/ui/sections/registry.ts
import { YourSection } from './YourSection/YourSection'

export function buildSections(deps: SectionsDeps): BaseSection[] {
  return [
    // ... existing sections
    new YourSection(),
  ]
}
```

### Adding a WebSocket Action

WebSocket actions are exposed via `window.Gemini.WebSocket.*`. See [.claude/workflows/websocket/action.md](.claude/workflows/websocket/action.md).

### Adding a WebSocket Handler

Handlers process incoming WebSocket messages. Create a file in `src/websocket/handlers/` and import it in `src/websocket/bootstrap.ts`. See [.claude/workflows/websocket/handler.md](.claude/workflows/websocket/handler.md).

### Adding a WebSocket Middleware

Middlewares filter outgoing WebSocket messages. Create a file in `src/websocket/middlewares/` and import it in `src/websocket/bootstrap.ts`. See [.claude/workflows/websocket/middleware.md](.claude/workflows/websocket/middleware.md).

## Tech Stack

- **TypeScript 5.9** (strict mode enforced)
- **Vite** + **vite-plugin-monkey** (esbuild IIFE bundler)
- **Jotai** (state management bridge)
- **Pixi.js** (sprite rendering)
- **Shadow DOM** (UI isolation from game)
- **Tampermonkey GM_* API** (persistence, not localStorage)

## Game Reference Folders

### GameSourceFiles/
Reference only (to understand game internals). The mod hooks the minified bundle at runtime.

- **Runtime bundle** (available in browser):
  - `GameSourceFiles/main-DvXv24E7.js`
- **Unminified reference code** (NOT available to the mod at runtime, used for understanding):
  - `GameSourceFiles/gg-preview-pr-2307-router.magiccircle.workers.dev/src/games/Quinoa`

### GameFilesExample/
Captured network examples from DevTools (real fetched files/payloads). Use these as examples to understand formats (manifest.json, sprite atlases, sample atom payloads, etc.).

**Note:** Treat `GameSourceFiles/` and `GameFilesExample/` as reference inputs. Do not copy game code into the mod.

## Documentation

For comprehensive development principles, architecture details, and contribution guidelines, refer to:

### Project Instructions
- [.claude/CLAUDE.md](.claude/CLAUDE.md) - Project memory for Claude Code (TL;DR)
- [CLAUDE.md](CLAUDE.md) - Main project overview

### Rules (Source of Truth)
- [.claude/rules/core.md](.claude/rules/core.md) - Core rules (global)
- [.claude/rules/modules.md](.claude/rules/modules.md) - Module rules
- [.claude/rules/features.md](.claude/rules/features.md) - Feature rules
- [.claude/rules/utils.md](.claude/rules/utils.md) - Utility rules
- [.claude/rules/state/](.claude/rules/state/) - State management rules (atoms, globals)
- [.claude/rules/ui/](.claude/rules/ui/) - UI rules (core, components, loader, sections)
- [.claude/rules/websocket/](.claude/rules/websocket/) - WebSocket rules

### Workflows (Step-by-Step Guides)
- [.claude/workflows/feature/](.claude/workflows/feature/) - Feature creation workflows
- [.claude/workflows/ui/](.claude/workflows/ui/) - UI workflows (components, sections, loader, styles)
- [.claude/workflows/state/](.claude/workflows/state/) - State workflows (atoms, globals)
- [.claude/workflows/websocket/](.claude/workflows/websocket/) - WebSocket workflows (actions, handlers, middlewares)

### Legacy Documentation
- [development_guidelinesbase.md](development_guidelinesbase.md) - Comprehensive dev guidelines (legacy)
- [AI_INSTRUCTIONS.md](AI_INSTRUCTIONS.md) - Instructions for AI agents (legacy)

### Project Files
- [CHANGELOG.md](CHANGELOG.md) - Version history (Keep a Changelog format)
- [TODO.md](TODO.md) - Active development tasks

> **Note:** AI agents and developers must always prioritize `.claude/` documentation over making assumptions.

## License

ISC
