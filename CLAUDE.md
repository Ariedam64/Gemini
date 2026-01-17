# Gemini Mod (Claude Code)

Project memory for Claude Code. This file provides a structured overview of the project and how to use the `.claude/` context system.

## TL;DR
- **Project**: TypeScript userscript mod (Tampermonkey/Violetmonkey) that hooks into MagicGarden/MagicCircle game's minified runtime bundle in the browser
- **Compatible URLs**:
  - `magiccircle.gg/r/*`
  - `magicgarden.gg/r/*`
  - `starweaver.org/r/*`
  - `1227719606223765687.discordsays.com/*`
- **Stack**: TypeScript 5.9 (strict), esbuild (IIFE bundle), Jotai (atoms), Pixi.js (sprites), Shadow DOM (UI isolation)
- **Architecture**: Modules (always-on infrastructure) + Features (toggleable enhancements)

## Commands
```bash
npm run dev        # Watch mode → dist/gemini-build.user.js
npm run build      # Debug build → dist/gemini-build.user.js
npm run release    # Production → dist/gemini.user.js
npm run typecheck  # TypeScript validation
```

## How to use this context

### When implementing something new

1. **Start with workflows** → Step-by-step checklists for common tasks
   - Adding a feature? → [workflows/feature/add-feature.md](.claude/workflows/feature/add-feature.md)
   - Adding state? → [workflows/state/add-atom.md](.claude/workflows/state/add-atom.md)
   - Adding UI? → [workflows/ui/section/add-section.md](.claude/workflows/ui/section/add-section.md)
   - Adding WebSocket action? → [workflows/websocket/add-action.md](.claude/workflows/websocket/add-action.md)

2. **Reference rules for constraints** → Detailed guides with examples and common mistakes
   - Rules define WHAT is allowed and WHY
   - Workflows define HOW to implement step-by-step
   - Always check the relevant rule before modifying code in that domain

3. **Key architectural principles** (from rules):
   - **No hardcoded game data** → Use `MGData` module (dynamic capture from game runtime)
   - **No direct WebSocket sends** → Use `websocket/api.ts` façade
   - **No side effects on import** → All initialization must be explicit
   - **Modules vs Features**:
     - Modules (`src/modules/`) = Core infrastructure, always active (MGData, MGSprite, MGTile, etc.)
     - Features (`src/features/`) = Optional enhancements, toggleable (AutoFavorite, Tracker, etc.)
   - **Façade pattern** → Public APIs must be minimal and user-friendly
   - **Cleanup discipline** → Every subscription/listener/interval must have cleanup

### When debugging or reviewing code

1. **Check the relevant rule** to verify compliance:
   - Does this code follow the constraints?
   - Are there common mistakes to avoid?
   - Is this using the right pattern?

2. **Cross-reference with workflows** to understand the intended flow

3. **Key patterns to recognize**:
   - **Lazy init singleton**: `let instance: T | null = null; export function get() { ... }`
   - **Factory functions**: `createButton(options): ButtonHandle`
   - **Reactive globals**: `getMyGarden().subscribe((data) => { ... })`
   - **Store API**: `await Store.select('atomName')` / `await Store.set('atomName', value)`

## Repo map (high-level)

```
src/
├── main.ts              # Userscript entry point
├── api/                 # Public API (window.Gemini)
├── atoms/               # Jotai state bridge (Store)
├── globals/             # Reactive derived globals (combine atoms)
├── modules/             # Core infrastructure (always active)
│   ├── data/            # MGData - dynamic game data capture
│   ├── sprite/          # MGSprite - sprite rendering via Pixi
│   ├── tile/            # MGTile - map/tile utilities
│   ├── pixi/            # MGPixi - Pixi.js integration
│   ├── audio/           # MGAudio - audio management
│   └── cosmetic/        # MGCosmetic - player cosmetics
├── features/            # Optional features (toggleable)
│   ├── autoFavorite/    # Auto-favorite mutations
│   ├── journalChecker/  # Journal completion checker
│   ├── bulkFavorite/    # Bulk favorite management
│   ├── achievements/    # Achievement tracking
│   └── tracker/         # Resource/progress tracking
├── websocket/           # WebSocket layer
│   ├── protocol.ts      # Types/constants only
│   ├── connection.ts    # Transport (capture/send)
│   ├── api.ts           # Public actions (façade)
│   ├── middlewares/     # Outgoing message interceptors
│   └── handlers/        # Incoming message handlers
├── ui/                  # User interface (Shadow DOM)
│   ├── loader/          # Bootstrap + loading screen
│   ├── hud/             # Main HUD overlay
│   ├── components/      # Reusable UI primitives
│   ├── sections/        # Modular HUD tabs
│   ├── theme/           # Theme system + tokens
│   ├── styles/          # CSS utilities
│   └── inject/          # Game UI injections (DOM patching)
└── utils/               # Cross-cutting helpers (storage, timing, etc.)

GameSourceFiles/         # Game source reference (minified + unminified)
GameFilesExample/        # Captured network examples (manifest, sprites, payloads)
```

## Key project files
- `CHANGELOG.md` — Version history (Keep a Changelog format)
- `TODO.md` — Active development tasks
- `.claude/` — AI context (rules, workflows, this file)

## Game reference folders

### GameSourceFiles/
**Reference only** (to understand game internals). The mod hooks the minified bundle at runtime.

- **Runtime bundle** (available in browser): `GameSourceFiles/main-DvXv24E7.js`
- **Unminified reference** (NOT available at runtime, for understanding only):
  - `GameSourceFiles/gg-preview-pr-2307-router.magiccircle.workers.dev/src/games/Quinoa`

### GameFilesExample/
**Captured network examples** from DevTools (real fetched files/payloads).

Use these as examples to understand formats:
- `manifest.json` — Asset manifest
- Sprite atlases — JSON + PNG files
- Sample atom payloads — Jotai state snapshots

**Important**: Treat both folders as **reference inputs only**. Do not copy game code into the mod.

## Rules (source of truth)

Rules define **constraints, patterns, and anti-patterns** with detailed examples.

### Core rules (apply everywhere)
- **Core**: [.claude/rules/core.md](.claude/rules/core.md)
  - Game compatibility (no hardcoded data, use MGData/MGSprite)
  - Boundaries (DOM in ui/, WS sends via api/, state via Store)
  - Side effects & cleanup (no leaks, no import side effects)
  - Storage (namespaced keys, wrappers only)
  - Code quality (small files/functions, explicit names)
  - TypeScript strict (no `any`, minimal public APIs)

### Domain rules (specific layers)
- **Modules**: [.claude/rules/modules.md](.claude/rules/modules.md)
  - Always-on infrastructure (MGData, MGSprite, MGTile, etc.)
  - No toggles, no user-facing config
  - Lazy initialization patterns

- **Features**: [.claude/rules/features.md](.claude/rules/features.md)
  - Toggleable enhancements (enabled/disabled config)
  - Feature structure (types, state, logic/, index, ui)
  - Independence (no cross-feature dependencies)
  - Bootstrap pattern (init/destroy lifecycle)

- **Utils**: [.claude/rules/utils.md](.claude/rules/utils.md)
  - Dependency-leaf principle (no imports from features/modules)
  - One concept per file (timing, storage, format, etc.)
  - Simple, stable APIs

### State rules
- **Atoms**: [.claude/rules/state/atoms.md](.claude/rules/state/atoms.md)
  - Store API (select, set, subscribe)
  - Atom registration (atomRegistry, atomLookup)
  - Immutable updates pattern

- **Globals**: [.claude/rules/state/globals.md](.claude/rules/state/globals.md)
  - Reactive derived variables (combine atoms)
  - createReactiveGlobal pattern
  - Subscription helpers

### UI rules
- **Core**: [.claude/rules/ui/core.md](.claude/rules/ui/core.md)
  - Shadow DOM isolation
  - Theme compatibility (CSS vars only)
  - Responsive design (touch-friendly, flexible)

- **Components**: [.claude/rules/ui/components.md](.claude/rules/ui/components.md)
  - Factory pattern (Options → Handle)
  - Cleanup discipline (destroy method)
  - Composability (safe nesting)

- **Loader**: [.claude/rules/ui/loader.md](.claude/rules/ui/loader.md)
  - Bootstrap sequence (init steps)
  - LoaderController interface
  - Logging rules (stable keys, try/catch)

- **Sections**: [.claude/rules/ui/sections.md](.claude/rules/ui/sections.md)
  - Lifecycle (build/destroy)
  - Persistent state (JSON-serializable)
  - Parts system (sub-features)

- **Inject**: [.claude/rules/ui/ui.inject.md](.claude/rules/ui/ui.inject.md)
  - Game UI patching (outside Shadow DOM)
  - Injection patterns (waitForElement, safe patching)

### WebSocket rules
- **WebSocket**: [.claude/rules/websocket/websocket.md](.claude/rules/websocket/websocket.md)
  - File responsibilities (protocol, connection, api, middlewares, handlers)
  - No hardcoded message types (use enums)
  - Middleware/handler patterns (no throws, must return)

## Workflows (step-by-step guides)

Workflows are **actionable checklists** for implementing common tasks.

### Feature workflows
- **Add Feature**: [.claude/workflows/feature/add-feature.md](.claude/workflows/feature/add-feature.md)
  - Complete guide for creating toggleable features
  - UI options: Gemini HUD vs Game UI injection
  - Bootstrap pattern, public API exposure

### State workflows
- **Add Atom**: [.claude/workflows/state/add-atom.md](.claude/workflows/state/add-atom.md)
  - Declare atom, add to registry, use Store API
  - Type definition, default values, subscriptions

- **Add Global**: [.claude/workflows/state/add-global.md](.claude/workflows/state/add-global.md)
  - Reactive derived variables (combine atoms)
  - createReactiveGlobal pattern, subscription helpers

### UI workflows
- **Add Component**: [.claude/workflows/ui/component/add-component.md](.claude/workflows/ui/component/add-component.md)
  - Factory pattern (Options/Handle interfaces)
  - Style injection, cleanup, registration

- **Reuse Component**: [.claude/workflows/ui/component/reuse-existing-component.md](.claude/workflows/ui/component/reuse-existing-component.md)
  - Import from components index, instantiate, cleanup

- **Add Loader Step**: [.claude/workflows/ui/loader/add-loader-step.md](.claude/workflows/ui/loader/add-loader-step.md)
  - Init patterns (sync, async, cleanup)
  - Logging rules (stable keys, try/catch)

- **Add Section**: [.claude/workflows/ui/section/add-section.md](.claude/workflows/ui/section/add-section.md)
  - Lifecycle (build/destroy), persistent state
  - Registration in sections registry

- **Split Section**: [.claude/workflows/ui/section/split-section-into-parts.md](.claude/workflows/ui/section/split-section-into-parts.md)
  - Parts pattern for complex sections
  - Assembling parts in section.ts

- **Add Styles**: [.claude/workflows/ui/style/add-styles-or-tokens.md](.claude/workflows/ui/style/add-styles-or-tokens.md)
  - CSS variables (theme tokens)
  - Style injection patterns

- **Theme Change**: [.claude/workflows/ui/style/theme-change-safe.md](.claude/workflows/ui/style/theme-change-safe.md)
  - Safe theme system modifications
  - Token naming conventions

### WebSocket workflows
- **Add Action**: [.claude/workflows/websocket/add-action.md](.claude/workflows/websocket/add-action.md)
  - Protocol types → api.ts façade
  - Middleware/handler registration (optional)

## Common patterns

### Lazy init singleton
```typescript
let instance: T | null = null;
export function get(): T {
  if (!instance) {
    instance = create();
  }
  return instance;
}
```

### Factory function (components/UI)
```typescript
export interface Options { label: string; onClick?: () => void; }
export interface Handle { root: HTMLElement; destroy(): void; }
export function create(options: Options): Handle { ... }
```

### Reactive global (combine atoms)
```typescript
const sources: Partial<Sources> = {};
const ready = new Set<keyof Sources>();

async function init() {
  const unsub = await Store.subscribe('atomName', (value) => {
    sources.atomName = value;
    ready.add('atomName');
    notify();
  });
}
```

### Store API (atoms)
```typescript
await Store.select('myAtom')              // Read
await Store.set('myAtom', value)          // Write
await Store.subscribe('myAtom', callback) // Subscribe
```

### Cleanup pattern
```typescript
const cleanups: (() => void)[] = [];

function init() {
  const unsub = subscribe(...);
  cleanups.push(unsub);

  window.addEventListener('resize', handleResize);
  cleanups.push(() => window.removeEventListener('resize', handleResize));
}

function destroy() {
  cleanups.forEach(fn => fn());
  cleanups.length = 0;
}
```

## Critical rules (never break)

1. **No hardcoded game data** → Always use `MGData.get('plants')` / `MGSprite.show('plant', 'Carrot')`
2. **No direct WebSocket sends** → Always use `websocket/api.ts` actions
3. **No side effects on import** → All initialization must be explicit (init functions)
4. **No ad-hoc globals** → Use Store/atoms or reactive Globals
5. **Modules = always-on, Features = toggleable** → Don't confuse the two
6. **TypeScript strict** → No `any`, use `unknown` + narrowing
7. **Cleanup discipline** → Every listener/subscription/interval must cleanup

## Debug tips

- **HUD toggle**: `Ctrl+Shift+U`
- **Console logs**: Prefixed with `[Gemini]`
- **Loader**: Shows initialization progress with step keys
- **Store inspection**: `window.Gemini.Store.select('atomName')`
- **Globals inspection**: `window.Gemini.Globals.currentTile.get()`
- **Module access**: `window.Gemini.Modules.Data.get('plants')`
- **Feature access**: `window.Gemini.Features.AutoFavorite.isEnabled()`
