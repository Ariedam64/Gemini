# Gemini

A powerful userscript mod for **MagicGarden** that provides a customizable HUD overlay with real-time state management and WebSocket integration.

## Features

- **Real-time State Management** - Bridge to game's Jotai store with reactive global variables
- **WebSocket Integration** - Intercept and send game messages programmatically
- **HUD Overlay** - Customizable interface isolated in Shadow DOM
- **Game Data Access** - Dynamic extraction of plants, pets, mutations, items, and more
- **Sprite Rendering** - Display game sprites with mutation support
- **Modular Architecture** - Easy to extend with new sections and components

## Supported Sites

- `magiccircle.gg/r/*`
- `magicgarden.gg/r/*`
- `starweaver.org/r/*`

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
2. Build the userscript (see [Build](#build))
3. Install `dist/gemini.user.js` in your userscript manager

## Build

```bash
# Install dependencies
npm install

# Development build (with source maps)
npm run build
# Output: dist/gemini-build.user.js

# Production build (minified)
npm run release
# Output: dist/gemini.user.js

# TypeScript validation
npm run typecheck
```

## Usage

Once installed, the mod initializes automatically when you enter a game room.

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+U` | Toggle HUD visibility |

### Console API

The mod exposes a global `window.Gemini` API:

```javascript
// Store - Read/write game state
await Gemini.Store.select('myInventoryAtom')
await Gemini.Store.set('myInventoryAtom', value)
await Gemini.Store.subscribe('myInventoryAtom', callback)

// Globals - Reactive combined state
Gemini.Globals.currentTile.get()
Gemini.Globals.myPets.subscribe((value, prev) => { ... })
Gemini.Globals.myInventory.get()

// WebSocket - Send game actions
Gemini.WebSocket.chat('Hello!')
Gemini.WebSocket.plantSeed('CarrotSeed', 5, 10)
Gemini.WebSocket.harvestCrop('crop-id')
Gemini.WebSocket.placePet('pet-id', 3, 7)

// Modules - Game data and sprites
Gemini.Modules.Data.get('plants')
Gemini.Modules.Sprite.show('plant', 'Carrot', { mutations: ['Gold'] })
```

## Architecture

```
src/
├── main.ts                 # Entry point
├── api/                    # Public API (window.Gemini)
├── atoms/                  # Jotai store bridge
│   ├── core/               # Bridge, lookup, signature detection
│   ├── store.ts            # Store facade (select/set/subscribe)
│   └── types.ts            # Atom type definitions
├── globals/                # Reactive global variables
│   ├── core/               # Base reactive system
│   └── variables/          # Individual globals (currentTile, myPets, etc.)
├── modules/                # Game integration modules
│   ├── core/               # Version, Assets, Manifest, Data
│   ├── sprite/             # Sprite rendering with mutations
│   ├── pixi/               # Pixi.js hooks and tile system
│   └── media/              # Audio and cosmetics
├── websocket/              # WebSocket capture and API
│   ├── connection.ts       # Transport layer
│   ├── api.ts              # Domain actions
│   ├── middlewares/        # Outgoing message filters
│   └── handlers/           # Incoming message handlers
├── ui/
│   ├── loader/             # Bootstrap and loading screen
│   ├── hud/                # Main HUD overlay
│   ├── components/         # Reusable UI components
│   ├── sections/           # Modular tabs/sections
│   ├── theme/              # Theme management
│   └── styles/             # CSS utilities
└── utils/                  # Utilities
```

## Modules

### MGData

Dynamically captures game data at runtime via Object.* hooks.

```typescript
MGData.get('plants')      // All plants (seed, plant, crop)
MGData.get('pets')        // All pets/fauna
MGData.get('mutations')   // All mutations
MGData.get('items')       // All items
MGData.get('decor')       // All decorations
MGData.get('eggs')        // All eggs
MGData.get('abilities')   // Pet abilities
MGData.get('weather')     // Weather types

MGData.getAll()           // Get all captured data
MGData.has('plants')      // Check if data is available
await MGData.waitFor('plants')  // Wait for specific data
```

### MGSprite

Render game sprites with optional mutation effects.

```typescript
// Display a sprite
MGSprite.show('plants', 'Carrot')
MGSprite.show('plants', 'Carrot', { mutations: ['Gold', 'Wet'] })
MGSprite.show('plants', 'Carrot', { x: 100, y: 200, scale: 2 })

// Convert to canvas
const canvas = MGSprite.toCanvas('plants', 'Carrot', { mutations: ['Rainbow'] })

// Query available sprites
MGSprite.getCategories()          // ['plants', 'pets', 'items', ...]
MGSprite.getCategoryId('plants')  // ['Carrot', 'Strawberry', ...]
MGSprite.has('plants', 'Carrot')  // true
```

### Store

Bridge to the game's Jotai state management.

```typescript
// Read state
const inventory = await Store.select('myInventoryAtom')

// Write state
await Store.set('someAtom', newValue)

// Subscribe to changes
const unsubscribe = await Store.subscribe('myInventoryAtom', (value) => {
  console.log('Inventory changed:', value)
})

// Subscribe with immediate callback
await Store.subscribeImmediate('myInventoryAtom', callback)
```

### Global Variables

Reactive variables that combine multiple atoms into cohesive objects.

```typescript
// Available globals
Globals.currentTile   // Current tile info (position, object, plant, garden)
Globals.myPets        // Player's pets
Globals.myGarden      // Player's garden state
Globals.myInventory   // Player's inventory
Globals.gameMap       // Game map data
Globals.players       // Connected players
Globals.shops         // Shop data
Globals.weather       // Current weather

// Usage
const tile = Globals.currentTile.get()
console.log(tile.position, tile.object, tile.plant)

// Subscribe to changes
const unsub = Globals.currentTile.subscribe((value, prev) => {
  console.log('Tile changed:', value)
})

// Granular subscriptions (currentTile only)
Globals.currentTile.subscribeObject(({ current, previous }) => { ... })
Globals.currentTile.subscribePlantInfo(({ current, previous }) => { ... })
Globals.currentTile.subscribeGarden(({ current, previous }) => { ... })
```

### WebSocket API

Send game actions programmatically.

```typescript
// Chat & Social
WebSocket.chat('Hello!')
WebSocket.emote('wave')
WebSocket.wish('Good luck!')

// Movement
WebSocket.move(x, y)
WebSocket.teleport(x, y)

// Garden
WebSocket.plantSeed('CarrotSeed', x, y)
WebSocket.waterPlant('plant-id')
WebSocket.harvestCrop('crop-id')
WebSocket.sellAllCrops()

// Shop
WebSocket.purchaseSeed('CarrotSeed')
WebSocket.purchaseEgg('CommonEgg')
WebSocket.purchaseDecor('WoodBench')

// Pets
WebSocket.placePet('pet-id', x, y)
WebSocket.feedPet('pet-id', 'food-id')
WebSocket.namePet('pet-id', 'Fluffy')
WebSocket.storePet('pet-id')

// Inventory
WebSocket.moveInventoryItem(fromIndex, toIndex)
WebSocket.dropObject(slotIndex)
WebSocket.pickupObject('object-id')
```

## UI Components

The mod includes a library of reusable UI components:

| Component | Description |
|-----------|-------------|
| `Button` | Buttons with variants, icons, loading states |
| `Input` | Text input fields |
| `Select` | Dropdown select menus |
| `Switch` | Toggle switches |
| `Slider` | Range sliders |
| `Card` | Container cards |
| `Badge` | Status badges |
| `Label` | Form labels |
| `Table` | Data tables |
| `NavTabs` | Navigation tabs |
| `SearchBar` | Search input |
| `Tooltip` | Hover tooltips |
| `ColorPicker` | Color selection |
| `TimeRangePicker` | Time range selection |
| `ReorderableList` | Drag-and-drop lists |
| `Log` | Log message display |

## Extending

### Adding a New Section

1. Create folder in `src/ui/sections/YourSection/`
2. Implement `BaseSection` class
3. Register in `src/ui/sections/registry.ts`

```typescript
// src/ui/sections/YourSection/YourSection.ts
import { BaseSection } from "../core/Section";

export class YourSection extends BaseSection {
  readonly id = "your-section";
  readonly label = "Your Section";

  render(): HTMLElement {
    const container = document.createElement("div");
    // Build your UI
    return container;
  }
}

// src/ui/sections/registry.ts
import { YourSection } from "./YourSection/YourSection";

export function buildSections(deps: SectionsDeps): BaseSection[] {
  return [
    // ... existing sections
    new YourSection(),
  ];
}
```

### Adding a WebSocket Handler

1. Create file in `src/websocket/handlers/`
2. Import in `src/websocket/bootstrap.ts`

### Adding a WebSocket Middleware

1. Create file in `src/websocket/middlewares/`
2. Import in `src/websocket/bootstrap.ts`

## Tech Stack

- **TypeScript 5.9** (strict mode)
- **esbuild** (IIFE bundle)
- **Jotai** (state management bridge)
- **Pixi.js** (sprite rendering)
- **Shadow DOM** (UI isolation)

## Debug

- **Toggle HUD**: `Ctrl+Shift+U`
- **Console logs**: Prefixed with `[Gemini]`
- **Loader**: Shows initialization progress

## License

ISC
