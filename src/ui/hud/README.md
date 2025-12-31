# ui/hud/ - Main HUD

## Overview

The HUD (Heads-Up Display) is Gemini's main overlay. It's rendered in an isolated Shadow DOM and contains navigable sections.

## Structure

```
hud/
├── HUD.ts            # Factory createHUD()
├── layout.ts         # DOM creation
├── resize.ts         # Resize handling
├── keyboard.ts       # Keyboard shortcuts
├── styles.css.ts     # HUD CSS
├── types.ts          # Types
└── state/
    ├── state.ts      # Global HUD state
    └── storage.ts    # Tampermonkey persistence
```

## DOM Architecture

```
<div#gemini-root>                    ← Host (position: fixed)
  └── #shadow-root
        ├── <style>                  ← All injected CSS
        └── <div.gemini-wrapper>
              └── <div.gemini-panel> ← Main panel
                    ├── <div.gemini-resizer>  ← Resize handle
                    ├── <div.gemini-tabbar>   ← Navigation bar
                    │     ├── NavTabs
                    │     └── CloseButton
                    └── <div.gemini-content>  ← Section content
                          └── [Active section]
```

## createHUD API

```typescript
const hud = await createHUD({
  // Host identifier
  hostId: "gemini-hud-root",

  // Dimensions
  initialWidth: 480,
  minWidth: 420,
  maxWidth: 720,
  onWidthChange: (width) => saveState({ width }),

  // Open state
  initialOpen: false,
  onOpenChange: (isOpen) => saveState({ isOpen }),

  // Themes
  themes: [darkTheme, lightTheme],
  initialTheme: "dark",
  onThemeChange: (themeId) => saveState({ theme: themeId }),

  // Sections
  buildSections: (deps) => [
    new SettingsSection(deps),
    new TestSection(),
  ],
  initialTab: "settings",
  onTabChange: (tabId) => saveState({ tab: tabId }),

  // Keyboard shortcuts
  toggleCombo: (e) => e.ctrlKey && e.shiftKey && e.key === "u",
  closeOnEscape: true,
});
```

## Returned HUD Object

```typescript
type Hud = {
  host: HTMLElement;           // Host element
  shadow: ShadowRoot;          // Shadow root
  wrapper: HTMLElement;        // Wrapper container
  panel: HTMLElement;          // Main panel
  content: HTMLElement;        // Content area

  setOpen: (open: boolean) => void;
  setWidth: (width: number) => void;

  sections: BaseSection[];
  manager: SectionManager;
  nav: NavTabsHandle;

  destroy: () => void;
};
```

## Lifecycle

### 1. Host Creation

```typescript
function attachHost(id: string) {
  const host = document.createElement("div");
  host.id = id;
  Object.assign(host.style, {
    position: "fixed",
    top: "0",
    right: "0",
    zIndex: "2147483647",
    // ...
  });

  document.body.appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });

  return { host, shadow };
}
```

### 2. Style Injection

Styles are injected in batches with yields to avoid blocking the thread:

```typescript
const styleInjections = [
  [variablesCss, "variables"],
  [primitivesCss, "primitives"],
  [buttonCss, "button"],
  // ...
];

for (let i = 0; i < styleInjections.length; i++) {
  injectStyleOnce(shadow, css, id);
  if (i % 5 === 4) await yieldToMain();  // Yield every 5 styles
}
```

### 3. Layout

```typescript
const { panel, tabbar, content, resizer, closeButton, wrapper } =
  createHudLayout({ shadow, initialOpen });
```

### 4. Sections

```typescript
const sections = buildSections(deps);
const manager = new SectionManager(sections, content);

// Resilient tab selection: ensure initialTab actually exists, else fallback to first available
const activeTabId = (initialTab && sections.some(s => s.id === initialTab))
  ? initialTab
  : (sections[0]?.id || "");

manager.activate(activeTabId);
```

### 5. Navigation

```typescript
const nav = createNavTabs(tabs, activeTabId, (id) => {
  manager.activate(id);
  onTabChange?.(id);
});
tabbar.append(nav.root, closeButton);
```

## Resizing

The HUD can be resized by dragging the left edge:

```typescript
const resizeHandler = createResizeHandler({
  resizer,        // Drag handle
  host,
  panel,
  shadow,
  onWidthChange,
  initialWidth,
  minWidth,       // 420px by default
  maxWidth,       // 720px by default
});

// API
resizeHandler.setHudWidth(500);
resizeHandler.calculateResponsiveBounds();
resizeHandler.destroy();
```

## Keyboard Shortcuts

```typescript
const shortcuts = setupKeyboardShortcuts({
  panel,
  onToggle: () => setHudOpen(!isOpen),
  onClose: () => setHudOpen(false),
  toggleCombo: (e) => e.ctrlKey && e.shiftKey && e.key === "u",
  closeOnEscape: true,
});

// Cleanup
shortcuts.destroy();
```

## Persistent State

The HUD saves its state via the Tampermonkey API:

```typescript
// state/storage.ts
export function loadHudState(): HudState {
  return GM_getValue("hud-state", defaultState);
}

export function saveHudState(state: HudState): void {
  GM_setValue("hud-state", state);
}
```

Saved state:
- Panel width
- Open/closed state
- Active theme
- Active tab
- Section states (collapsed cards, etc.)

## Events

The HUD emits custom events:

```typescript
// Open/close state change
panel.addEventListener("gemini:hud-open-change", (e) => {
  console.log("HUD is now:", e.detail.isOpen ? "open" : "closed");
});
```

## Themes

Managed via ThemeManager:

```typescript
const themeManager = createThemeManager({
  host,
  themes,
  initialTheme,
  onThemeChange,
});

// Change theme
themeManager.applyTheme("light");

// CSS variables are updated on the host
// :host { --color-bg: #fff; ... }
```

## Main CSS Classes

```css
.gemini-panel {
  /* Main panel */
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  transform: translateX(100%);  /* Closed by default */
}

.gemini-panel.open {
  transform: translateX(0);
}

.gemini-tabbar {
  /* Navigation bar */
  display: flex;
  border-bottom: 1px solid var(--color-border);
}

.gemini-content {
  /* Scrollable content area */
  flex: 1;
  overflow-y: auto;
}

.gemini-resizer {
  /* Left resize handle */
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  cursor: ew-resize;
}
```

## Game Integration

A button is injected into the game's toolbar to open the HUD:

```typescript
// ui/inject/toolbarButton.ts
startInjectGamePanelButton({
  onClick: () => hud.setOpen(true),
});
```

## See Also

- [../sections/README.md](../sections/README.md) - Section system
- [../components/README.md](../components/README.md) - UI components
- [../theme/README.md](../theme/README.md) - Theme system
