# Gemini Modules - Game Functionality

## Overview
Modules represent self-contained units of game-related logic. From rendering sprites to calculating crop growth or handling inventory auto-favoriting, modules encapsulate complex behaviors into singletons.

---

## 🏗️ Core Modules

### 1. MGData (`src/modules/core/data.ts`)
**The most critical module.** It captures static game data (plants, pets, items, mutations) as the game defines them. 
- **CRITICAL**: Never hardcode mutation lists or plant names. Use `MGData.get('plants')` so the mod stays compatible with game updates.

### 2. MGSprite (`src/modules/sprite/`)
A high-performance sprite renderer that can generate HTMLElements or Canvases of any game object, including support for mutations (Gold, Wet, Rainbow, etc.).

### 3. MGCalculators
Encapsulates game formulas (formulas that determine growth time, mutation chance, etc.) to ensure Gemini's predictions match the server exactly.

---

## 🏗️ Modular Structure
A "Complex Feature" (e.g., Journal Checker) should follow this folder pattern:
- `index.ts`: Public API and exports.
- `types.ts`: Local types.
- `state.ts`: Feature state.
- `logic/`: Core algorithms and event handlers.
- `render/`: UI-specific components.

---

## 🛠️ Module Lifecycle
1.  **Init**: Modules are initialized in `src/main.ts`.
2.  **Dependencies**: Many modules depend on `MGData`. Use `await MGData.waitFor('categories')` inside your module's init.
3.  **Cleanup**: If a module registers global listeners or intervals, it must provide a teardown path.

---

## 📝 Best Practices
1.  **Single Responsibility**: A module should do one thing well. Break complex behaviors into smaller sub-modules.
2.  **Statelessness**: Prefer pure functions for logic, keeping state minimal and centralized in `state.ts`.
3.  **Cross-Module Communication**: Use the public API of other modules rather than reaching into their internal files.

---

## 🔗 Related Systems
- **Atoms**: Modules often read atoms to get the current context.
- **WebSocket**: Modules use the WS API to trigger server-side actions.
---

## Changelog
- **v4.3**: Implemented resilient data loading for Auto-Favorite feature (Soft Wait Strategy) to prevent data timeouts from crashing the UI.
