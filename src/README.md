# src/ - Gemini Core Architecture

## Overview
Gemini is a advanced userscript for MagicGarden, built with a focus on modularity, performance, and deep game integration. It uses Vite for building and a custom Shadow DOM UI layer.

---

## 📂 Primary Directories

| Directory | Purpose |
|-----------|---------|
| `api/` | Public `window.Gemini` interface. |
| `atoms/`| **Jotai Bridge**. Low-level game state access. |
| `globals/`| **Reactive Abstractions**. High-level state variables. |
| `modules/`| **Game Logic**. Features, Sprites, and Data capture. |
| `websocket/`| **Network Layer**. Action API and Middlewares. |
| `ui/` | **Interface**. HUD, Components, and Theme system. |
| `tests/` | **Verification**. Vitest and mocking suite. |

---

## 🚀 Initialization Flow
The mod initializes in `main.ts` with a strict order to ensure data availability:
1.  **Capture Phase**: Intercept WebSocket & Jotai Store.
2.  **Data Phase**: Wait for `MGData` to capture game definitions.
3.  **Core Phase**: Initialize Modules and Reactive Globals.
4.  **UI Phase**: Inject Shadow DOM and start the HUD.

---

## 🛠️ Developer Tooling
Gemini comes with a built-in **Dev HUD** (enabled by default in dev builds):
- **WS Trace**: Real-time network monitoring.
- **Atom Inspector**: Live state exploration.
- **UI Gallery**: Component library preview.

---

## 📝 General Rules
- **No Hardcoding**: Data must come from `MGData`.
- **Isolation**: Use Shadow DOM for UI.
- **TypeScript**: Strict types required for all game structures.
- **Cleanup**: Modular cleanup is essential to prevent memory leaks in long sessions.

---

## 📖 Extended Documentation
For deep dives, see the README in each specific folder.
- [State Management (Atoms)](src/atoms/README.md)
- [Reactive Variables (Globals)](src/globals/README.md)
- [Networking (WebSocket)](src/websocket/README.md)
- [Modular Logic (Modules)](src/modules/README.md)
- [User Interface (UI)](src/ui/README.md)
