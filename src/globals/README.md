# Gemini Globals - Reactive State Abstractions

## Overview
High-level abstractions combining multiple underlying atoms into stable reactive variables.

## Structure
- `core/factory.ts`: Standardized creation of reactive globals.
- `variables/`: Individual global definitions (Inventory, Pets, CurrentTile, etc.).

## Changelog
- **2024-12-31**: Added `myPlayer` for direct access to local data. Enhanced responsiveness of `currentTile`.
- **2024-12-20**: Initial global variables established.

## TODO
- [ ] Add `history` support for globals to track changes over time.
- [ ] Optimize deep equality checks for large inventory objects.
