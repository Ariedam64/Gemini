# Gemini UI Components - Atomic Design

## Overview
Gemini uses a lightweight atomic design system. Components are primitive building blocks used to construct Sections and the HUD Header.

---

## 🏗️ Implementation Pattern
Every component lives in its own folder and exports a factory function.

### Standard Structure
```
/Button
  index.ts (Export Button)
  Button.ts (Logic & DOM)
  button.css.ts (Scoped Styles)
```

### The "Handle" Pattern
If a component needs to be updated after being added to the DOM, it returns a `Handle`:
```typescript
interface ProgressBarHandle extends HTMLElement {
    setProgress: (val: number) => void;
}
```

---

## 🎨 Design Tokens
Always use CSS variables from `src/ui/styles/variables.css.ts`.
- `var(--radius-md)` for rounded corners.
- `var(--color-text-secondary)` for subtitles.
- `var(--bg-card)` for container backgrounds.

---

## 📂 Catalog
| Component | Primary Use | Façade API |
|-----------|-------------|------------|
| **Badge** | Status labels (Success, Warning). | — |
| **Button** | Clickable actions (Primary/Default). | `setLoading`, `setDisabled`, `setLabel` |
| **Card** | Content grouping with optional titles. | — |
| **ColorPicker** | Color selection. | — |
| **Divider** | Visual separators. | Variants: thick/dashed/vertical |
| **Input** | Text and number entry. | — |
| **Label** | Form labels. | — |
| **Log** | Console-style log output. | — |
| **NavTabs** | Tab navigation. | — |
| **Range** | Percentage or value sliders. | `setValue`, `getValue`, `setDisabled` |
| **ReorderableList** | Drag-to-reorder lists. | — |
| **SoundPicker** | Drag/drop audio upload with rename list. | getItems, setItems, addFiles |
| **SearchBar** | Search input with icon. | — |
| **SegmentedControl** | Segmented option selection. | `select`, `getSelected`, `setDisabled` |
| **Select** | Dropdown selection. | — |
| **Slider** | Styled slider input. | — |
| **StatRow** | Stats display (label + value). | `setValue`, `setLabel`, `setDescription` |
| **Switch** | Boolean toggles. | — |
| **Table** | Tabular data display. | — |
| **TimeRangePicker** | Time range selection. | — |
| **Tooltip** | Hover tooltips. | — |

---

## 🛠️ Performance
- **Minimal DOM Nodes**: Avoid unnecessary wrapper divs.
- **Event Delegation**: Use where appropriate for lists.
- **Lazy Styles**: Components should only inject their CSS once per session.

---

## 🕹️ Testing
Use the **UI Gallery** section in the Dev HUD to see your component in action with various parameters.
