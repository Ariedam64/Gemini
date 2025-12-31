# Gemini Development Guidelines v4.0

> **Complete Reference** - Everything needed to build features for Gemini.

---

## Critical Rules

> [!CAUTION]
> **NO HARDCODED GAME DATA** - All data from MGData or Gemini Globals

> [!CAUTION]
> **TOUCH CORE MINIMALLY** - `websocket/`, `atoms/core/`, `modules/core/data.ts`, `modules/sprite/`, `modules/pixi/`, `ui/loader/`, `ui/hud/HUD.ts`

---

## 1. Data Sources

### Source Mapping

| Data | Game Location | Gemini Access |
|------|---------------|---------------|
| Plants | floraSpeciesDex | `MGData.get('plants')` |
| Pets | faunaSpeciesDex | `MGData.get('pets')` |
| Mutations | mutationsDex | `MGData.get('mutations')` |
| Abilities | faunaAbilitiesDex | `MGData.get('abilities')` |
| Decor | decorDex | `MGData.get('decor')` |
| Weather | Main bundle | `MGData.get('weather')` |
| My Inventory | myInventoryAtom | `G_MyInventory().get()` |
| My Pets | myPetInfosAtom | `G_MyPets().get()` |
| My Journal | myDataAtom.journal | `G_Players().get().all[n].journal` |
| Shops | shopsAtom | `G_Shops().get()` |
| Current Tile | position + garden atoms | `Globals.currentTile.get()` |

### How MGData Works

MGData hooks `Object.keys/values/entries` to intercept game data at runtime:

```typescript
// Captures objects matching signature patterns:
// Plants: has Carrot, Strawberry, Aloe, Blueberry, Apple
// Mutations: has coinMultiplier property
// Pets: has abilities array
```

### Dynamic Data Pattern

```typescript
// ✅ CORRECT
const mutations = MGData.get('mutations') ?? {};
const names = Object.keys(mutations);

// ✅ Pet mutations (filter by tileRef)
const petMutations = Object.entries(mutations)
    .filter(([_, d]) => !('tileRef' in (d as Record<string, unknown>)))
    .map(([n]) => n);

// ❌ NEVER hardcode
const MUTATIONS = ['Gold', 'Rainbow']; // WRONG
```

---

## 2. Gemini API (window.Gemini)

### Store (Jotai Bridge)

```typescript
await Gemini.Store.select<T>('atomName');     // Read
await Gemini.Store.set('atomName', value);    // Write
await Gemini.Store.subscribe('atomName', cb); // Watch
await Gemini.Store.subscribeImmediate('atomName', cb); // Watch + initial
```

### Globals

| Global | Import | Methods |
|--------|--------|---------|
| `currentTile` | `Globals.currentTile` | `get()`, `subscribe()` |
| `myInventory` | `G_MyInventory()` | `get()`, `subscribeItems()` |
| `myPets` | `G_MyPets()` | `get()`, `subscribe()` |
| `myGarden` | `G_MyGarden()` | `get()`, `subscribe()` |
| `players` | `G_Players()` | `get()`, `subscribe()` |
| `shops` | `G_Shops()` | `get()`, `subscribe()` |
| `weather` | `G_Weather()` | `get()`, `subscribe()` |
| `gameMap` | `G_GameMap()` | `get()`, `subscribe()` |

### Modules

| Module | Purpose |
|--------|---------|
| `MGData` | Game data: `get()`, `has()`, `waitFor()` |
| `MGSprite` | Sprites: `show()`, `toCanvas()`, `warmup()` |
| `MGPixi` | Engine: `getApp()`, `getRenderer()` |
| `MGAudio` | Sound: `play()`, `mute()` |
| `MGCalculators` | Math: `Crop.*`, `Pet.*` |
| `MGTile` | Tiles: `getObjectAt()` |

### WebSocket

```typescript
// Movement
Gemini.WebSocket.move(x, y)
Gemini.WebSocket.teleport(x, y)

// Garden
Gemini.WebSocket.plantSeed(seedId, x, y)
Gemini.WebSocket.harvestCrop(cropId)
Gemini.WebSocket.waterPlant(plantId)

// Inventory
Gemini.WebSocket.toggleFavoriteItem(itemId, true)
Gemini.WebSocket.moveInventoryItem(from, to)

// Pets
Gemini.WebSocket.placePet(petId, x, y)
Gemini.WebSocket.feedPet(petId, foodId)
Gemini.WebSocket.storePet(petId)
```

---

## 3. Atoms (50+)

| Category | Key Atoms |
|----------|-----------|
| **Position** | `positionAtom`, `playerDirectionAtom`, `tileSizeAtom` |
| **Inventory** | `myInventoryAtom`, `myInventoryItemsAtom`, `myFavoritedItemIdsAtom` |
| **Garden** | `myCurrentGardenObjectAtom`, `myCurrentGrowSlotAtom`, `isInMyGardenAtom` |
| **Pets** | `myPetInfosAtom`, `myPetSlotInfosAtom`, `myPetHutchPetItemsAtom` |
| **Shops** | `shopsAtom`, `seedShopAtom`, `eggShopAtom`, `toolShopAtom`, `decorShopAtom` |
| **Journal** | `myJournalAtom`, `myCropJournalAtom`, `myPetJournalAtom` |
| **Map** | `mapAtom`, `mapSeedShopSpawnLocation`, `mapEggShopSpawnLocation` |
| **UI** | `quinoaModalAtom`, `isActionButtonHighlightedAtom` |

---

## 4. WebSocket Middleware/Handlers

### Middlewares (Outgoing)

Located in `websocket/middlewares/`:

```typescript
import { middleware } from './base';

// Log all PlantSeed messages
middleware('PlantSeed', (message, ctx) => {
    console.log('Planting:', message);
    // return undefined = let pass
});

// Block message
middleware('Chat', (message) => {
    if (message.text?.includes('spam')) {
        return { kind: 'drop' };
    }
});

// Modify message
middleware('PlayerPosition', (message) => ({
    kind: 'replace',
    message: { ...message, x: Math.round(message.x) }
}));
```

### Handlers (Incoming)

Located in `websocket/handlers/`:

```typescript
import { handle, handleAnyMessage } from './base';

// Handle specific message type
handle('Welcome', (payload) => {
    console.log('Welcome!', payload.data);
});

// Handle close code
handle(4700, (payload) => {
    console.log('Version mismatch');
});

// Catch-all
handleAnyMessage((payload) => {
    console.log('Message:', payload.type);
});
```

---

## 5. Storage & Events

### Storage (LocalStorage wrapper)

```typescript
import { storageGet, storageSet, storageRemove, storageHas } from '../shared/storage';

// Key convention: gemini:features:{name}
const KEY = 'gemini:features:myFeature';

const config = storageGet<Config>(KEY, DEFAULT);
storageSet(KEY, config);
storageRemove(KEY);
```

### Custom Events

```typescript
// Storage changes
window.addEventListener('gemini:storage:change', (e) => {
    const { key, value } = e.detail;
});

// Feature events
window.dispatchEvent(new CustomEvent('gemini:journal-updated', {
    detail: { progress }
}));
```

---

## 6. DOM Helpers

```typescript
import { onAdded, onRemoved, watch } from '../shared/dom';

// Watch for element added (+ checks existing)
const unwatch = onAdded('[data-testid="inventory"]', (el) => {
    renderButton(el);
});

// Watch for removal
onRemoved('.my-element', (el) => {
    cleanup();
});

// Watch changes on specific element
watch(element, () => {
    console.log('Element changed');
});

// Cleanup
unwatch.disconnect();
```

---

## 7. Feature Structure

### Standard (4 files)

```
src/modules/myFeature/
├── index.ts      # Re-exports
├── types.ts      # Types, constants
├── state.ts      # Storage
└── logic.ts      # Business logic
```

### Complex (logic/ subfolder)

```
src/modules/complexFeature/
├── index.ts
├── types.ts
├── state.ts
└── logic/
    ├── index.ts      # Re-exports logic
    ├── processing.ts
    ├── matching.ts
    └── lifecycle.ts
```

### With UI

```
src/modules/featureWithUI/
├── index.ts
├── types.ts
├── state.ts
├── logic.ts
└── render.ts     # Shadow DOM
```

### Import Levels

```
0: types.ts     ← No imports
1: state.ts     ← types
2: logic.ts     ← types + state
3: render.ts    ← types + state + logic
4: index.ts     ← Re-exports all
```

---

## 8. UI Sections

### Creating a Section

```typescript
// sections/MySection/MySection.ts
import { BaseSection } from '../core/Section';

export class MySectionClass extends BaseSection {
    id = 'my-section';
    label = 'My Section';
    icon = '🎯';

    async preload(): Promise<void> {
        // Heavy init here
    }

    render(): HTMLElement {
        const container = document.createElement('div');
        // Build UI
        return container;
    }

    destroy(): void {
        // Cleanup
    }
}
```

### Registering Section

```typescript
// sections/registry.ts
import { MySectionClass } from './MySection/MySection';

export function buildSections(deps: SectionsDeps): BaseSection[] {
    return [
        // ... existing
        new MySectionClass(),
    ];
}
```

---

## 9. Themes

```typescript
import { createThemeManager, THEMES } from '../theme';

const themeManager = createThemeManager({
    host: shadowRoot.host,
    themes: THEMES,
    initialTheme: 'dark',
    onThemeChange: (id) => console.log('Theme:', id),
});

themeManager.applyTheme('light');
```

---

## 10. UI Components

| Component | Options |
|-----------|---------|
| `Button` | `label`, `variant`, `loading`, `onClick` |
| `Card` | `title`, `collapsible`, `headerRight` |
| `Input` | `type`, `placeholder`, `onChange`, `onEnter` |
| `Select` | `options`, `value`, `onChange` |
| `Switch` | `checked`, `label`, `onChange` |
| `Table` | `columns`, `data`, `sortable`, `onRowClick` |
| `SearchBar` | `placeholder`, `debounceMs`, `onSearch` |
| `Badge` | `text`, `variant` |
| `Slider` | `min`, `max`, `value`, `onChange` |

### Pattern

```typescript
import { element } from '../../ui/styles/helpers';

function MyComponent(opts = {}): HTMLElement & { getValue: () => string } {
    const el = element('div', { className: 'my-comp' });
    // Build, attach methods
    return el;
}
```

---

## 11. CSS Variables

```css
/* Colors */
--bg, --fg, --accent, --border, --muted

/* Layout */
--w: 480px
--radius: 18px
--pad: 14px
--tab-h: 64px

/* Safe areas */
--inset-t, --inset-r, --inset-b, --inset-l
```

### Breakpoints

| Width | --w | --tab-h |
|-------|-----|---------|
| Desktop | 480px | 64px |
| ≤1024px | min(92vw, 560px) | 64px |
| ≤720px | 100vw | 56px |
| ≤480px | 100vw | 52px |
| ≤360px | 100vw | 48px |

---

## 12. Mobile Optimization

- **Touch targets**: ≥44px
- **Safe areas**: Use `--inset-*` variables
- **Scrolling**: `-webkit-overflow-scrolling: touch`
- **Animations**: Check `prefers-reduced-motion`
- **Smart resize**: Use `ResizeObserver`

```typescript
const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
        adjustLayout(entry.contentRect.width);
    }
});
observer.observe(container);
```

---

## 13. MGSprite

```typescript
// Display
MGSprite.show('plants', 'Carrot', { mutations: ['Gold'] });

// To canvas (for HTML)
const canvas = MGSprite.toCanvas('plants', 'Carrot', {
    mutations: ['Rainbow'],
    scale: 0.5
});
```

### Mutation Bounding Box

> [!WARNING]
> Mutations extend sprite bounds. Wrap in fixed container.

```typescript
const wrapper = document.createElement('div');
wrapper.style.cssText = 'width:64px;height:64px;display:flex;align-items:center;justify-content:center';
wrapper.appendChild(canvas);
```

---

## 14. Build System

```bash
npm run build    # Production build → dist/gemini.user.js
npm run devtools # Dev build (with HUD / tools) → dist/gemini-build.user.js
```

- **Entry**: `src/main.ts`
- **Format**: IIFE
- **Target**: ES2020
- **Minified**: Yes
- **Header**: `meta.userscript.js`

---

## 15. Testing

```javascript
// Console commands
MGData.get('plants')
MGData.get('mutations')
Gemini.Globals.myInventory.get()
G_Players().get().all[0].journal

// Hotkeys
Ctrl+Shift+U  // Toggle HUD
Escape        // Close HUD
```

### Logging

```typescript
console.log('✅ [Feature] Started');
console.log('🛑 [Feature] Stopped');
console.error('[Feature] Error:', e);
```

---

## 16. Checklist

- [ ] No hardcoded game data
- [ ] Data from MGData/Globals
- [ ] Build passes
- [ ] Files <800 lines
- [ ] Types in `types.ts`
- [ ] State in `state.ts`
- [ ] Logic in `logic.ts` or `logic/`
- [ ] Clean `index.ts` exports
- [ ] Subscriptions cleaned up
- [ ] Mobile breakpoints
- [ ] Touch ≥44px
- [ ] CSS variables used

---

## 17. Game UI Injection Points

> [!NOTE]
> Game uses React + Chakra UI. These selectors may change with game updates.
> Test injection targets via browser DevTools before implementing.

### Container Classes

| Selector | Description | Verified |
|----------|-------------|----------|
| `.QuinoaGameContainer` | Main game wrapper | ⚠️ Test |
| `.QuinoaCanvas` | Pixi.js canvas container | ⚠️ Test |
| `.QuinoaUI-CenterArea` | Center action area | ⚠️ Test |
| `.QuinoaUI-BottomBar` | Bottom bar (inventory hotbar) | ⚠️ Test |
| `.GameScreen` | Full game screen | ⚠️ Test |
| `.Sprite` | Individual sprite elements | ⚠️ Test |
| `canvas` | The game canvas element | ✅ Used |

### Key Components (React)

| Component | Purpose | Location |
|-----------|---------|----------|
| `InventoryModal` | Full inventory popup | `QuinoaUI` context |
| `InventoryItem` | Individual inventory slot | Inside inventory |
| `ActionButton` | Plant/Harvest/etc button | Center area |
| `McTooltip` | Game tooltips (Chakra wrapper) | Various |
| `WeatherStatus` | Weather display | Top UI |
| `SpeciesAttributes` | Mutations/weight display | Inventory items |

### Inventory Item Structure

```
InventoryItem (Button)
├── Index number (top-left)
├── Mutations display (SpeciesAttributes)
├── InventorySprite (canvas)
├── Name text
├── Count/weight (bottom)
└── Favorite heart (IconButton, top-right)
```

### Injection Patterns

```typescript
// Watch for game elements
import { onAdded } from '../shared/dom';

// Inject into inventory items
onAdded('.chakra-button', (el) => {
    // Check if it's an inventory item by structure
    if (el.querySelector('[class*="Sprite"]')) {
        injectIndicator(el);
    }
});

// Inject near action button
onAdded('[class*="QuinoaUI-CenterArea"]', (el) => {
    injectCustomButton(el);
});
```

### Testing Selectors

```javascript
// In browser console, test selectors:
document.querySelector('.QuinoaGameContainer')
document.querySelector('.QuinoaCanvas')
document.querySelectorAll('[class*="Sprite"]')

// Find inventory buttons
document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent?.includes('×')) {
        console.log('Found inventory item:', btn);
    }
});
```

> [!WARNING]
> Game is React-based. Direct DOM manipulation may break React hydration.
> Prefer appending elements rather than modifying existing ones.

---

## Quick Imports

```typescript
// Data
import { MGData, MGSprite } from '../modules';

// Globals  
import { G_MyInventory, G_Players } from '../../globals';

// WebSocket
import { toggleFavoriteItem } from '../../websocket/api';

// Storage
import { storageGet, storageSet } from '../shared/storage';

// DOM
import { onAdded, onRemoved } from '../shared/dom';

// UI
import { element, cx } from '../../ui/styles/helpers';
```

## 18. Developer Tools & Internal Testing

Gemini includes a robust suite of internal developer tools to accelerate feature building and debugging. These tools are strictly for internal use and are automatically stripped from production builds.

### Build & Dev Commands

| Command | Purpose | Output |
|---------|---------|--------|
| `npm run dev` | Real-time development with HMR | In-memory / Network load |
| `npm run devtools` | Development build (with HUD tools) | `dist/gemini-build.user.js` |
| `npm run build` | Production build (Optimized & Stripped) | `dist/gemini.user.js` |

> [!IMPORTANT]
> **HMR Support**: `npm run dev` supports Hot Module Replacement for the UI. However, game-engine hooks (WebSocket/Pixi) may require a page refresh to re-initialize correctly.

### Conditional Stripping

To ensure standard users have the smallest and most secure footprint, all developer tools are wrapped in conditional compilation blocks:

```typescript
// src/ui/sections/registry.ts
if (import.meta.env.MODE !== 'production') {
    sections.push(new DevSection());
    sections.push(new TestSection());
}
```

Vite's tree-shaking will completely remove these classes and their related logic from the `npm run build` output.

### Developer HUD (The "DEV" Tab)

Access the internal HUD via `Ctrl+Shift+U` and navigate to the **DEV** tab.

#### 1. Atom Inspector
Live reactive data explorer. Optimized for performance with **Lazy Loading**:
- **Collapsed by Default**: All sections start collapsed to minimize CPU/Memory usage during play.
- **Categorization**: Grouped into `MGData` (Static game definitions), `Globals` (High-level Gemini reactive data), and `Atoms` (Raw Jotai bridge signatures).
- **Search**: Dynamic filtering across all keys. Expanding a card initiates a live subscription; collapsing it stops the overhead.

#### 2. WS Trace (Network Monitor)
Real-time WebSocket traffic monitor.
- **Directional Coding**: Green for IN (incoming), Blue for OUT (outgoing).
- **Smart Summaries**: Automatically extracts operation types and key data fields for quick glancing.
- **Integrated Inspector**: Click any packet to open a dedicated JSON viewer at the bottom of the trace window.

#### 3. UI Gallery
A playground for the Gemini Design System and layout testing.
- **Layout Simulation**: Toggle between Desktop and Mobile width to verify responsive CSS behavior.
- **Sprite Explorer**: Live rendering with pixel-perfection. Apply mutations like `Gold` or `Rainbow` to verify rendering pipelines.
- **Interactive Card Builder**: Free-form component positioning system:
  - Drag components from palette onto canvas
  - Move components anywhere with snap-to-grid (8px)
  - Resize via SE corner handle
  - **Sprite Component**: 3 dropdown selects (category, asset, mutation) using `MGSprite` API
  - **Preview Mode**: Toggle to hide edit indicators and see actual layout

#### 4. Pixi Tools
Specialized utilities for map and engine inspection.
- **Click to Pick**: Activate "Pick from Canvas" and click any tile in the game world to automatically select its coordinates.
- **Engine Inspection**: Views both `TileObject` (Logic State) and `TileView` (Rendering State) combined. Includes detailed metadata for plants (grow time, mutations, etc.) via `MGData`.

#### 5. HMR & Sync Controls
Located at the top of the Dev HUD:
- **Auto-Reload Toggle**: When unchecked, Vite will NOT refresh the browser automatically on save. This is critical for large refactors.
- **Pulse Badge**: When a refresh is blocked, a "Update Pending..." badge appears.
- **Manual Reload**: Click the "Reload Script" button to force a full browser refresh when your changes are stable.

---

## 19. Architecture Deep Dives

### Gemini API (`window.Gemini`)
The public-facing interface for external script interaction.
- **Store**: `Jotai` bridge access (`select`, `set`, `subscribe`).
- **Globals**: Highly processed reactive variables.
- **Modules**: Access to `Data`, `Sprite`, `Pixi`, `Audio`, and `Calculators`.
- **WebSocket**: Clean API for every possible server action.

### Atoms vs. Globals
- **Atoms**: Raw data from the `Jotai` store. Use for direct state reading/writing. Signature-based discovery ensures compatibility across game versions.
- **Globals**: Derived, debounced, and synchronous state. Use for UI binding and complex feature logic.

### UI Design System
- **Shadow DOM**: Complete isolation from game CSS.
- **Factory Pattern**: Every component is a pure function returning an `HTMLElement` or a `Handle` with setters.
- **Component Guidelines**: Minimal dependencies, CSS Variables for all styling, and responsive layout testing via the **UI Gallery**.

### Network Layer
- **WebSocket Capture**: Intercepts the native `WebSocket` constructor before game load.
- **API Mapping**: Every server packet has a corresponding `Gemini.WebSocket` function.
- **Interception**: Use the middleware system to block or modify packets before they leave the client.

---

## 20. Managing Project Documentation

To maintain a "Single Source of Truth" and prevent documentation drift:

1.  **Centralization**: The `development_guidelinesbase.md` is the primary reference. All core architectural changes MUST be documented here.
2.  **Section READMEs**: Maintain detailed `README.md` files in directory roots (`src/api`, `src/atoms`, `src/globals`, `src/ui`, `src/websocket`). These MUST reflect the full detail of their respective sections using the same philosophy and structure.
3.  **Synchronization**: When adding/editing a feature, you MUST update both the central guidelines and the section-specific README.
4.  **Logging**: All READMEs (central and section-specific) MUST contain a `# Changelog` and a `# TODO` section, updated when necessary/appropriate.

## 21. Instructions for AI Agents

All AI agents (Claude, Codex, Antigravity, etc.) and IDE extensions MUST:
1.  Read `AI_INSTRUCTIONS.md` at the project root first.
2.  Follow `development_guidelinesbase.md` as the absolute ruleset for architecture and implementation.
3.  Ensure every implementation update includes corresponding updates to the Changelogs and TODOs of relevant READMEs.
4.  Maintain high standards of code removal for production builds (conditional compilation).

---

## 22. World Changelog
- **v4.4**: Implemented resilient tab selection in the HUD to prevent production crashes when a previously active tab (like 'DEV') is missing.
- **v4.3**: Implemented resilient data loading for Auto-Favorite feature (Soft Wait Strategy). Updated build scripts and cleaned Userscript header.
- **v4.2**: Interactive Card Builder redesign with free-form `PositioningCanvas`, dynamic `SpritePicker`, and Preview mode. Simplified Pixi Tools to click-only selection.
- **v4.1**: Overhauled Dev HUD. Implemented Manual HMR. Established AI Alignment & Docs hierarchy.
- **v4.0**: Redesigned Design System, Shadow DOM isolation, and Reactive Globals.
- **v3.5**: Added WebSocket Middleware and API mapping.

---

## 23. World TODO
- [ ] Implement a standardized "Feature Toggle" system for non-dev features.
- [ ] Add support for multiple themes (Light/Minimalist/Retro).
- [ ] Expand automated testing coverage to UI components via Vitest.
- [ ] Research performance bottlenecks in large garden rendering.
- [x] Refine build scripts (rename release to devtools) and clean header ✓
- [ ] **Manual Review Required**: Auto-Favorite feature - verify sprite rendering and logic after refactor.
- [ ] **Manual Review Required**: Journal Checker - verify functionality after refactor.
- [ ] **Manual Review Required**: Bulk Favorite - currently non-functioning, needs repair.

---

*v4.4 - 2024-12-31*
