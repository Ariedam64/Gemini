# Gemini UI - Interface Architecture

## Overview
High-performance, framework-agnostic UI built with pure functions and Shadow DOM isolation.

## Structure
- `components/`: Atomic design primitives (Button, Card, Input, etc.).
- `styles/`: CSS tokens, helpers, and global variables.
- `sections/`: High-level HUD views managed via NavTabs.

## Changelog
- **2024-12-31**: Fixed Card header clipping. Overhauled UI Gallery with mobile simulation. Added `danger` variant to Button.
- **2024-12-15**: Established design system and Shadow DOM host.

## TODO
- [ ] Add support for drag-and-drop in Table component.
- [ ] Implement a standardized Tooltip manager.
- [ ] Optimize the "Glassmorphism" theme for low-end devices.
