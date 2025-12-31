# Gemini Sections - Tabbed Layouts

## Overview
Sections represent the main content areas of the Gemini HUD. Each section corresponds to a tab in the top navigation.

---

## 🏗️ The `BaseSection` Class
All sections must extend `BaseSection` found in `src/ui/sections/core/Section.ts`.

### Lifecycle Methods
- `build(container)`: **Required.** This is where you construct your DOM.
- `onMount()`: Called when the section becomes visible. Use for starting listeners.
- `onUnmount()`: Called when switching away. Use for cleaning up listeners.
- `preload()`: Optional. Build heavy UI in the background before the user clicks the tab.

---

## 🛠️ Registering a Section
1.  **Create your folder** under `src/ui/sections/`.
2.  **Add it to the registry** in `src/ui/sections/registry.ts`.
3.  **Import your styles** in the main `createHUD` call if necessary.

---

## 📝 Rules of Engagement
1.  **Cleanup is mandatory**: Any `setInterval` or `Store.subscribe` created in a section must be added to `this.addCleanup()`.
2.  **Responsive Layout**: Use `createGrid()` helper to ensure your section looks good at both 400px and 700px widths.
3.  **State Persistence**: If your section has configuration, use the `storage` helpers to save user preferences across sessions.

---

## 🔗 Related Systems
- **NavTabs**: The component that controls which section is active.
- **SectionManager**: The engine that handles mounting/unmounting logic.

---

## Dev Section
The `Dev/` folder contains development-only tools (conditionally compiled):
- **PositioningCanvas**: Free-form component positioning with snap-to-grid
- **SpritePicker**: Dynamic sprite selection (unused - dropdowns now in PositioningCanvas)
- **ComponentPalette**: Drag-and-drop component gallery

---

## Changelog
- **v4.3**: Implemented resilient data loading for Auto-Favorite feature (Soft Wait Strategy) to prevent data timeouts from crashing the UI.
- **v4.2**: DevSection refactored with interactive Card Builder, sprite dropdowns, and preview mode.
