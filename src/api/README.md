# api/ - Public API (window.Gemini)

## Overview
This module exposes Gemini's public API accessible via `window.Gemini`.

## Structure
- `index.ts`: Entry point for exposing the API to the global window object.

## Philosophy
The Public API serves as the formal interface for external scripts. It must be stable and well-documented.

## Changelog
- **2024-12-31**: Consolidated documentation guidelines. Added logic for dynamic data fetching.
- **2024-12-28**: Initial API structure established.

## TODO
- [ ] Add more helper methods for common automation tasks.
- [ ] Implement a standardized event emitter for the public API.
