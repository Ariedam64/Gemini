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
| Component | Primary Use |
|-----------|-------------|
| **Badge** | Status labels (Success, Warning). |
| **Button** | Clickable actions (Primary/Default). |
| **Card** | Content grouping with optional titles. |
| **Input** | Text and number entry. |
| **Switch** | Boolean toggles. |
| **Range** | Percentage or value sliders. |
| **Divider** | Visual separators. |

---

## 🛠️ Performance
- **Minimal DOM Nodes**: Avoid unnecessary wrapper divs.
- **Event Delegation**: Use where appropriate for lists.
- **Lazy Styles**: Components should only inject their CSS once per session.

---

## 🕹️ Testing
Use the **UI Gallery** section in the Dev HUD to see your component in action with various parameters.
