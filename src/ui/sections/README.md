# ui/sections/ - Section System

## Overview

Sections are the HUD's tabs. Each section is a class that extends `BaseSection` and implements its own UI.

## Structure

```
sections/
├── index.ts              # Exports
├── registry.ts           # buildSections() + preload
├── core/
│   ├── Section.ts        # Base class BaseSection
│   ├── Manager.ts        # SectionManager
│   ├── State.ts          # Section state
│   └── Types.ts          # Types
├── Settings/
│   ├── Settings.ts       # SettingsSection
│   ├── State.ts          # Specific state
│   └── styles.css.ts     # CSS
└── Test/
    ├── Test.ts           # TestSection
    └── styles.css.ts     # CSS
```

## BaseSection

Abstract class that all sections must extend.

```typescript
abstract class BaseSection {
  readonly id: string;
  readonly label: string;

  // Must implement
  protected abstract build(container: HTMLElement): void | Promise<void>;

  // Lifecycle
  render(container: HTMLElement): void;
  unmount(): void;

  // Preloading
  async preload(): Promise<void>;
  isPreloaded(): boolean;

  // Helpers
  protected createContainer(id: string, classes?: string): HTMLElement;
  protected createGrid(gap?: string): HTMLElement;
  protected addCleanup(fn: () => void): void;
}
```

## Creating a New Section

### 1. Create folder and files

```
sections/
└── MySection/
    ├── MySection.ts
    ├── State.ts        # (optional)
    └── styles.css.ts   # (optional)
```

### 2. Implement the section

```typescript
// sections/MySection/MySection.ts
import { BaseSection } from "../core/Section";
import type { SectionConfig, SectionsDeps } from "../core/Types";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";

export class MySection extends BaseSection {
  private deps: SectionsDeps;

  constructor(deps: SectionsDeps) {
    super({
      id: "my-section",
      label: "My Section",
    });
    this.deps = deps;
  }

  protected build(container: HTMLElement): void {
    const section = this.createContainer("my-section-content");

    // Create content
    const card = Card({ title: "My Card" });

    const btn = Button({
      label: "Click me",
      onClick: () => this.handleClick(),
    });

    card.body.appendChild(btn);
    section.appendChild(card);

    // Subscriptions with automatic cleanup
    const unsub = someStore.subscribe((value) => {
      // Update UI
    });
    this.addCleanup(unsub);

    container.appendChild(section);
  }

  private handleClick(): void {
    console.log("Button clicked!");
  }
}
```

### 3. Styles (optional)

```typescript
// sections/MySection/styles.css.ts
export const mySectionCss = `
#my-section-content {
  padding: var(--spacing-md);
}

#my-section-content .my-custom-class {
  color: var(--color-primary);
}
`;
```

### 4. Register the section

```typescript
// sections/registry.ts
import { MySection } from "./MySection/MySection";

export function buildSections(deps: SectionsDeps): BaseSection[] {
  return [
    new SettingsSection(deps),
    new TestSection(),
    new MySection(deps),  // Add here
  ];
}
```

### 5. Inject styles

```typescript
// hud/HUD.ts
import { mySectionCss } from "../sections/MySection/styles.css";

const styleInjections = [
  // ...existing
  [mySectionCss, "mySection"],
];
```

## SectionsDeps

Dependencies injected to sections that need them:

```typescript
type SectionsDeps = {
  applyTheme: (themeId: string) => void;
  initialTheme: string;
  getCurrentTheme: () => string;
  setHUDWidth: (width: number) => void;
  setHUDOpen: (open: boolean) => void;
};
```

Usage:

```typescript
class MySection extends BaseSection {
  constructor(deps: SectionsDeps) {
    super({ id: "my", label: "My" });

    // Use deps
    deps.applyTheme("dark");
    deps.setHUDWidth(500);
  }
}
```

## SectionManager

Manages section activation/deactivation.

```typescript
const manager = new SectionManager(sections, contentContainer, {
  applyTheme,
  getCurrentTheme,
});

// Activate a section
manager.activate("my-section");

// Get active section
const active = manager.getActive();

// Get section by ID
const section = manager.getById("my-section");
```

## Preloading

For heavy sections, preloading builds content in the background.

```typescript
// In the section
class HeavySection extends BaseSection {
  protected async build(container: HTMLElement): Promise<void> {
    // Heavy construction...
    for (const item of largeDataset) {
      await yieldToMain();  // Don't block UI
      container.appendChild(renderItem(item));
    }
  }
}

// In registry.ts
export async function preloadSections(): Promise<void> {
  const heavy = new HeavySection();
  await heavy.preload();  // Builds in background
}

// Later, render() reuses preloaded content
heavy.render(container);  // Instant
```

## Automatic Cleanup

Use `addCleanup()` to register cleanup functions:

```typescript
protected build(container: HTMLElement): void {
  // Subscription
  const unsub = Store.subscribe("atom", callback);
  this.addCleanup(unsub);

  // Interval
  const id = setInterval(tick, 1000);
  this.addCleanup(() => clearInterval(id));

  // Event listener
  const handler = (e) => { ... };
  window.addEventListener("resize", handler);
  this.addCleanup(() => window.removeEventListener("resize", handler));
}
// Everything is automatically cleaned up when unmount() is called
```

## Persistent State

To save section state (collapsed cards, scroll position, etc.):

```typescript
// MySection/State.ts
import { getSectionState, setSectionState } from "../core/State";

const STATE_KEY = "my-section";

type MyState = {
  expandedCards: string[];
  scrollPosition: number;
};

export function getState(): MyState {
  return getSectionState(STATE_KEY) ?? {
    expandedCards: [],
    scrollPosition: 0,
  };
}

export function saveState(state: Partial<MyState>): void {
  const current = getState();
  setSectionState(STATE_KEY, { ...current, ...state });
}
```

Usage in section:

```typescript
import { getState, saveState } from "./State";

protected build(container: HTMLElement): void {
  const state = getState();

  const card = Card({
    initialCollapsed: !state.expandedCards.includes("card1"),
    onToggle: (collapsed) => {
      const expanded = collapsed
        ? state.expandedCards.filter(id => id !== "card1")
        : [...state.expandedCards, "card1"];
      saveState({ expandedCards: expanded });
    },
  });
}
```

## Existing Sections

### SettingsSection

Mod settings: theme, HUD width, keyboard shortcuts, etc.

### TestSection

Debug section for testing components and displaying game data (sprites, data...).

## See Also

- [../components/README.md](../components/README.md) - UI components
- [../hud/README.md](../hud/README.md) - HUD architecture
