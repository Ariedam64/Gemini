# ui/ - User Interface

## Overview

Gemini's interface is a HUD overlay rendered in a Shadow DOM to completely isolate it from the game. It uses factory functions to create components.

## Structure

```
ui/
├── loader/               # Initial loading screen
│   ├── bootstrap.ts      # Orchestrated init functions
│   └── loader.ts         # LoaderController
├── hud/                  # Main HUD
│   ├── HUD.ts            # Factory createHUD()
│   ├── layout.ts         # DOM structure
│   ├── resize.ts         # Resize handling
│   ├── keyboard.ts       # Keyboard shortcuts
│   ├── styles.css.ts     # HUD CSS
│   ├── types.ts          # Types
│   └── state/            # Persistent state
├── components/           # Reusable components
│   ├── Button/
│   ├── Card/
│   ├── Input/
│   ├── Select/
│   ├── Table/
│   └── ... (18 components)
├── sections/             # HUD tabs/sections
│   ├── core/             # Section system
│   ├── Settings/         # Settings section
│   └── Test/             # Test/debug section
├── theme/                # Theme management
│   ├── index.ts
│   └── definitions.ts
├── styles/               # Global CSS
│   ├── variables.css.ts  # CSS variables
│   ├── primitives.css.ts # Base styles
│   ├── utilities.css.ts  # Utility classes
│   ├── helpers.ts        # JS helpers
│   └── inject.ts         # Style injection
└── inject/               # Game injection
    └── toolbarButton.ts  # Game toolbar button
```

## Shadow DOM Architecture

```
<body>
  └── #gemini-root (host element)
        └── #shadow-root (isolated from game)
              ├── <style> (injected CSS)
              └── .gemini-panel
                    ├── .gemini-tabbar
                    │     ├── NavTabs
                    │     └── CloseButton
                    └── .gemini-content
                          └── [Active section]
```

### Why Shadow DOM?

- **CSS Isolation**: Game styles don't affect the HUD and vice versa
- **No Conflicts**: CSS classes are free without collision risk
- **Encapsulation**: HUD DOM is invisible to the game

## Factory Pattern

All UI components follow the factory pattern: synchronous functions returning HTMLElement.

```typescript
// Standard pattern
function MyComponent(options: Options): HTMLElement {
  const container = element("div", { className: "my-component" });

  // Build DOM
  const title = element("h2");
  title.textContent = options.title;
  container.appendChild(title);

  // Event listeners
  container.addEventListener("click", handleClick);

  return container;
}

// With handle for extended API
function Button(options: ButtonOptions): ButtonHandle {
  const btn = element("button") as ButtonHandle;

  // Extended API
  btn.setLoading = (v: boolean) => { ... };
  btn.setDisabled = (v: boolean) => { ... };

  return btn;
}
```

### Benefits

- No framework (React, Vue...) needed
- Synchronous and predictable rendering
- Easy to test and debug
- Lightweight and performant

## Style System

### CSS Variables

Defined in `styles/variables.css.ts`:

```css
:host {
  --color-bg: #1a1a2e;
  --color-text: #eaeaea;
  --color-primary: #7c3aed;
  --color-border: #2d2d44;
  --radius-md: 8px;
  --spacing-md: 12px;
  /* ... */
}
```

### Style Injection

```typescript
import { injectStyleOnce } from "../styles";

// In the HUD
injectStyleOnce(shadowRoot, myCss, "my-component-id");
```

### Helpers

```typescript
import { element, cx } from "../styles/helpers";

// Create element with options
const div = element("div", {
  className: "my-class",
  id: "my-id",
});

// Combine classes
const classes = cx("base", isActive && "active", variant);
```

## Themes

### Usage

```typescript
import { createThemeManager } from "./theme";

const themeManager = createThemeManager({
  host: hostElement,
  themes: [darkTheme, lightTheme],
  initialTheme: "dark",
  onThemeChange: (themeId) => console.log("Theme:", themeId),
});

// Change theme
themeManager.applyTheme("light");

// Get current theme
const current = themeManager.getCurrentTheme();
```

### Defining a Theme

```typescript
// theme/definitions.ts
export const myTheme: Theme = {
  id: "my-theme",
  name: "My Theme",
  variables: {
    "--color-bg": "#ffffff",
    "--color-text": "#000000",
    // ...
  },
};
```

## Loader

The loading screen displayed during initialization.

```typescript
const loader = createLoader({
  title: "Gemini is loading",
  subtitle: "Connecting...",
});

// Log steps
loader.log("Connecting to server...");
loader.logStep("atoms", "Loading state...", "info");
loader.logStep("atoms", "State loaded!", "success");

// Finish
loader.succeed("Ready!");
// or
loader.fail("Error", error);
```

## HUD Creation Flow

```typescript
// 1. Create host + shadow
const { host, shadow } = attachHost("gemini-root");

// 2. Inject styles
injectStyleOnce(shadow, variablesCss, "variables");
injectStyleOnce(shadow, componentsCss, "components");

// 3. Create layout
const { panel, tabbar, content } = createHudLayout({ shadow });

// 4. Create sections
const sections = buildSections(deps);
const manager = new SectionManager(sections, content);

// 5. Create navigation
const nav = createNavTabs(tabs, initialTab, onTabChange);
tabbar.appendChild(nav.root);

// 6. Activate initial section
manager.activate(initialTab);
```

## Keyboard Shortcuts

- `Ctrl+Shift+U`: Toggle HUD (open/close)
- `Escape`: Close HUD

Configurable in `createHUD()`:

```typescript
createHUD({
  toggleCombo: (e) => e.ctrlKey && e.key === "g",  // Ctrl+G
  closeOnEscape: true,
});
```

## See Also

- [components/README.md](components/README.md) - Component catalog
- [sections/README.md](sections/README.md) - Section system
- [hud/README.md](hud/README.md) - HUD architecture
