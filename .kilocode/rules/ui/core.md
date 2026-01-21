---
paths: src/ui/**/*
---

# UI Core rules

All Gemini UI runs in an isolated Shadow DOM overlay on top of the game.

## Architecture

```
src/ui/
├── loader/        # Bootstrap loading screen
├── hud/           # Main HUD overlay (tabs, controls)
├── components/    # Reusable UI primitives
├── sections/      # HUD tab content (modular)
├── inject/        # Game UI modifications (DOM patching)
├── theme/         # Theme system (CSS variables)
└── styles/        # Shared style utilities
```

## Core principles

### 1. Shadow DOM isolation

All Gemini UI runs inside Shadow DOM to prevent CSS leakage:

```typescript
// ✅ GOOD - Isolated in Shadow DOM
const host = document.createElement('div');
const shadow = host.attachShadow({ mode: 'open' });
shadow.appendChild(myComponent);
document.body.appendChild(host);

// ❌ BAD - Direct DOM injection (CSS leaks both ways)
document.body.appendChild(myComponent);
```

**Why:** The game has its own CSS. Without Shadow DOM:
- Game CSS can break Gemini UI
- Gemini CSS can break game UI

### 2. No game UI rewriting

Gemini UI is an **overlay**, not a replacement:

```typescript
// ❌ BAD - Replacing game UI
gameElement.innerHTML = '<div class="gemini-replacement">...</div>';

// ✅ GOOD - Overlay on top of game
const overlay = createOverlay();
document.body.appendChild(overlay);  // Floats above game
```

**Exception:** `src/ui/inject/` is allowed to modify game UI for QOL features (see [.claude/rules/ui/ui.inject.md](.claude/rules/ui/ui.inject.md)).

### 3. Theme compatibility

All colors, spacing, and typography MUST use CSS variables:

```css
/* ❌ BAD - Hardcoded values */
.my-component {
  background: #1a1a2e;
  color: white;
  padding: 16px;
}

/* ✅ GOOD - Theme tokens */
.my-component {
  background: var(--color-bg);
  color: var(--color-text);
  padding: var(--spacing-md);
}
```

**Available tokens:**
- Colors: `--color-bg`, `--color-text`, `--color-border`, `--color-primary`, etc.
- Spacing: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`
- Typography: `--font-size-sm`, `--font-size-md`, `--font-size-lg`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`

### 4. Responsive & cross-platform

UI must work on all platforms the game supports:

```css
/* ❌ BAD - Fixed dimensions */
.panel {
  width: 400px;
  height: 600px;
}

/* ✅ GOOD - Flexible with constraints */
.panel {
  width: 100%;
  max-width: 400px;
  min-width: 280px;
  height: auto;
  max-height: 80vh;
}
```

**Requirements:**
- **Touch-friendly:** Min 44px touch targets for buttons/controls
- **Narrow screens:** Works on mobile (< 400px width)
- **Wide screens:** Doesn't stretch awkwardly on desktop
- **Platform quirks:** Test on iOS Safari, Android Chrome, desktop browsers

## Dedicated rules

Each UI subdomain has its own detailed rules:

- **Components:** [.claude/rules/ui/components.md](.claude/rules/ui/components.md)
- **Sections:** [.claude/rules/ui/sections.md](.claude/rules/ui/sections.md)
- **Loader:** [.claude/rules/ui/loader.md](.claude/rules/ui/loader.md)
- **Game UI injection:** [.claude/rules/ui/ui.inject.md](.claude/rules/ui/ui.inject.md)

## Workflows

When adding/changing UI, follow the appropriate workflow:

- [.claude/workflows/ui/component/add-component.md](.claude/workflows/ui/component/add-component.md)
- [.claude/workflows/ui/section/add-section.md](.claude/workflows/ui/section/add-section.md)
- [.claude/workflows/ui/loader/add-loader-step.md](.claude/workflows/ui/loader/add-loader-step.md)
- [.claude/workflows/ui/style/add-styles-or-tokens.md](.claude/workflows/ui/style/add-styles-or-tokens.md)

## Common mistakes

### ❌ Global styles without scoping
```css
/* This will leak outside Shadow DOM if injected wrong */
button {
  background: red;
}

/* Scope to your component */
.my-component button {
  background: red;
}
```

### ❌ Using z-index wars
```css
/* ❌ BAD - Arbitrary high z-index */
.modal {
  z-index: 999999;
}

/* ✅ GOOD - Use local stacking context */
.modal-container {
  isolation: isolate;  /* Creates new stacking context */
}
.modal {
  z-index: 1;  /* Only needs to be above siblings */
}
```

### ❌ Blocking scroll on mobile
```css
/* ❌ BAD - Breaks mobile scrolling */
.panel {
  overflow: hidden;
}

/* ✅ GOOD - Allow scrolling */
.panel {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;  /* Smooth iOS scroll */
}
```

### ❌ Non-accessible focus states
```css
/* ❌ BAD - Removing focus indicator */
button:focus {
  outline: none;
}

/* ✅ GOOD - Custom but visible focus */
button:focus {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
```
