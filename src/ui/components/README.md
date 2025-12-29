# ui/components/ - Reusable Components

## Overview

This UI component library follows the factory pattern: each component is a function that returns an HTMLElement with an optional extended API.

## Available Components

| Component | Description | Folder |
|-----------|-------------|--------|
| **Badge** | Compact colored label | `Badge/` |
| **Button** | Button with variants and states | `Button/` |
| **Card** | Container with title and content | `Card/` |
| **ColorPicker** | Color selector | `ColorPicker/` |
| **Input** | Text input field | `Input/` |
| **Label** | Styled text | `Label/` |
| **Log** | Scrollable log display | `Log/` |
| **NavTabs** | Tab navigation | `NavTabs/` |
| **Range** | Numeric slider | `Range/` |
| **ReorderableList** | Drag & drop reorderable list | `ReorderableList/` |
| **SearchBar** | Search bar | `SearchBar/` |
| **Select** | Dropdown menu | `Select/` |
| **Slider** | Slider with value | `Slider/` |
| **Switch** | On/off toggle | `Switch/` |
| **Table** | Data table | `Table/` |
| **TimeRangePicker** | Time range selector | `TimeRangePicker/` |
| **Tooltip** | Tooltip | `Tooltip/` |

## Button

```typescript
import { Button } from "./Button/Button";

const btn = Button({
  label: "Click me",
  variant: "primary",        // "default" | "primary"
  size: "md",                // "md" | "sm"
  iconLeft: "🎮",            // string | Node
  iconRight: "→",
  loading: false,
  disabled: false,
  fullWidth: false,
  tooltip: "Tooltip text",
  onClick: (e) => console.log("Clicked!"),
});

// Extended API
btn.setLoading(true);
btn.setDisabled(true);
btn.setLabel("New label");
btn.setIconLeft("🔄");
```

## Card

```typescript
import { Card } from "./Card/Card";

const card = Card({
  title: "Settings",
  collapsible: true,
  initialCollapsed: false,
  headerRight: Badge({ text: "New" }),
  onToggle: (collapsed) => console.log("Collapsed:", collapsed),
});

// Add content
card.body.appendChild(myContent);

// API
card.setCollapsed(true);
card.setTitle("New Title");
```

## Input

```typescript
import { Input } from "./Input/Input";

const input = Input({
  type: "text",              // "text" | "number" | "password" | "email"
  placeholder: "Enter value",
  value: "initial",
  label: "Username",
  disabled: false,
  onChange: (value) => console.log("Changed:", value),
  onEnter: (value) => console.log("Enter pressed:", value),
});

// API
input.getValue();
input.setValue("new value");
input.setDisabled(true);
input.focus();
```

## Select

```typescript
import { Select } from "./Select/Select";

const select = Select({
  options: [
    { value: "a", label: "Option A" },
    { value: "b", label: "Option B" },
    { value: "c", label: "Option C", disabled: true },
  ],
  value: "a",
  placeholder: "Choose...",
  onChange: (value) => console.log("Selected:", value),
});

// API
select.getValue();
select.setValue("b");
select.setOptions([...]);
```

## Switch

```typescript
import { Switch } from "./Switch/Switch";

const toggle = Switch({
  checked: false,
  label: "Enable feature",
  disabled: false,
  onChange: (checked) => console.log("Toggled:", checked),
});

// API
toggle.isChecked();
toggle.setChecked(true);
toggle.setDisabled(true);
```

## Table

```typescript
import { Table } from "./Table/Table";

const table = Table({
  columns: [
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", sortable: true, align: "right" },
    { key: "actions", label: "", render: (row) => Button({ label: "Edit" }) },
  ],
  data: [
    { name: "Item 1", price: 100 },
    { name: "Item 2", price: 200 },
  ],
  sortable: true,
  defaultSort: { key: "name", direction: "asc" },
  onRowClick: (row) => console.log("Clicked:", row),
});

// API
table.setData([...]);
table.getSelectedRows();
table.clearSelection();
```

## NavTabs

```typescript
import { createNavTabs } from "./NavTabs/NavTabs";

const nav = createNavTabs(
  [
    { id: "tab1", label: "Tab 1" },
    { id: "tab2", label: "Tab 2" },
    { id: "tab3", label: "Tab 3" },
  ],
  "tab1",  // initial tab
  (tabId) => console.log("Tab changed:", tabId)
);

// Use
container.appendChild(nav.root);

// API
nav.setActive("tab2");
nav.recalc();  // Recalculate indicator after resize
```

## SearchBar

```typescript
import { SearchBar } from "./SearchBar/SearchBar";

const search = SearchBar({
  placeholder: "Search...",
  debounceMs: 300,
  onSearch: (query) => console.log("Searching:", query),
  onClear: () => console.log("Cleared"),
});

// API
search.getValue();
search.setValue("query");
search.clear();
search.focus();
```

## Badge

```typescript
import { Badge } from "./Badge/Badge";

const badge = Badge({
  text: "New",
  variant: "success",  // "default" | "success" | "warning" | "error" | "info"
  size: "sm",          // "sm" | "md"
});
```

## Slider

```typescript
import { Slider } from "./Slider/Slider";

const slider = Slider({
  min: 0,
  max: 100,
  value: 50,
  step: 1,
  label: "Volume",
  showValue: true,
  onChange: (value) => console.log("Value:", value),
});

// API
slider.getValue();
slider.setValue(75);
```

## ColorPicker

```typescript
import { ColorPicker } from "./ColorPicker/ColorPicker";

const picker = ColorPicker({
  value: "#7c3aed",
  label: "Primary color",
  presets: ["#ff0000", "#00ff00", "#0000ff"],
  onChange: (color) => console.log("Color:", color),
});

// API
picker.getValue();
picker.setValue("#ff0000");
```

## ReorderableList

```typescript
import { ReorderableList } from "./ReorderableList/ReorderableList";

const list = ReorderableList({
  items: ["Item 1", "Item 2", "Item 3"],
  renderItem: (item, index) => {
    const el = document.createElement("div");
    el.textContent = item;
    return el;
  },
  onReorder: (items) => console.log("New order:", items),
});

// API
list.setItems([...]);
list.getItems();
```

## Tooltip

```typescript
import { Tooltip } from "./Tooltip/Tooltip";

const tooltip = Tooltip({
  content: "This is a tooltip",
  position: "top",  // "top" | "bottom" | "left" | "right"
});

// Attach to an element
tooltip.attach(targetElement);
tooltip.detach();
```

## Creating a New Component

### 1. File Structure

```
components/
└── MyComponent/
    ├── MyComponent.ts      # Logic
    ├── myComponent.css.ts  # Styles
    └── index.ts            # Export (optional)
```

### 2. Basic Component

```typescript
// MyComponent/MyComponent.ts
import { element } from "../../styles/helpers";

export type MyComponentOptions = {
  value?: string;
  onChange?: (value: string) => void;
};

export type MyComponentHandle = HTMLElement & {
  getValue: () => string;
  setValue: (v: string) => void;
};

export function MyComponent(opts: MyComponentOptions = {}): MyComponentHandle {
  const { value = "", onChange } = opts;

  const container = element("div", {
    className: "my-component"
  }) as MyComponentHandle;

  let currentValue = value;

  // Build DOM
  const input = element("input") as HTMLInputElement;
  input.value = value;
  input.addEventListener("input", () => {
    currentValue = input.value;
    onChange?.(currentValue);
  });

  container.appendChild(input);

  // Extended API
  container.getValue = () => currentValue;
  container.setValue = (v: string) => {
    currentValue = v;
    input.value = v;
  };

  return container;
}
```

### 3. Styles

```typescript
// MyComponent/myComponent.css.ts
export const myComponentCss = `
.my-component {
  display: flex;
  gap: var(--spacing-sm);
}

.my-component input {
  padding: var(--spacing-sm);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-bg-secondary);
  color: var(--color-text);
}
`;
```

### 4. Register Styles

Add the import in `hud/HUD.ts`:

```typescript
import { myComponentCss } from "../components/MyComponent/myComponent.css";

// In createHUD(), add to styleInjections
const styleInjections = [
  // ...existing
  [myComponentCss, "myComponent"],
];
```

## Conventions

1. **Factory function** - Always a function returning HTMLElement
2. **Optional options** - `opts: Options = {}`
3. **API via properties** - Add methods on the returned element
4. **Naming** - PascalCase for component, camelCase for options
5. **Separate styles** - CSS in a `.css.ts` file
6. **CSS variables** - Use variables from `styles/variables.css.ts`

## See Also

- [../styles/README.md](../styles/README.md) - CSS variables and helpers
- [../hud/README.md](../hud/README.md) - Style injection
