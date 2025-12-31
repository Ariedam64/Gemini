# Gemini Atoms - State Management Architecture

## Overview
The Atoms system is the heart of Gemini's integration with the game's internal state (Jotai bridge).

## Structure
- `core/bridge.ts`: Capture the Jotai store via React DevTools hook.
- `core/signature.ts`: Discovery system for mangled game atoms.
- `store.ts`: Public API for select/set/subscribe.

## Changelog
- **2024-12-31**: Added signature support for new plant and pet atoms. Updated documentation for better AI alignment.
- **2024-12-25**: Fixed memory leak in bridge observer.

## TODO
- [ ] Implement signature validation to detect game updates automatically.
- [ ] Add more granular typing for Jotai store internal objects.
