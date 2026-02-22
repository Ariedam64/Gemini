# AvatarBuilder Component

Modern, interactive avatar customization component with swipe navigation and category selection.

## Features

- ✨ **Interactive Preview** - Swipe/drag left/right to navigate cosmetics
- 🎯 **Category Selection** - Click on Expression, Top, Mid, or Bottom to select active layer
- 💡 **Visual Feedback** - Active layer highlighted with glow effect
- 📱 **Responsive** - Adapts to mobile, tablet, and desktop
- 👆 **Touch-friendly** - Swipe gestures and large tap targets
- ⚡ **Smooth Animations** - Slide transitions and hover effects
- 🎨 **Theme Compatible** - Uses CSS variables for theming
- 🎬 **Rive Animations** - Optional animated avatar preview using Rive (experimental)

## Usage

### Basic Example

```typescript
import { createAvatarBuilder } from '../components/AvatarBuilder/AvatarBuilder';

// Create the component
const avatarBuilder = createAvatarBuilder({
    onChange: ({ slot, item }) => {
        console.log(`Changed ${slot} to ${item.displayName}`);
    }
});

// Add to DOM
container.appendChild(avatarBuilder.root);

// Cleanup when done
avatarBuilder.destroy();
```

### With Initial Outfit

```typescript
const avatarBuilder = createAvatarBuilder({
    initialOutfit: {
        expression: 'Expression_Happy.png',
        top: 'Top_Wizard.png',
        mid: 'Mid_Glasses.png',
        bottom: 'Bottom_Robe.png'
    },
    onChange: ({ slot, item }) => {
        // Handle changes
        saveToServer({ slot, filename: item.filename });
    }
});
```

### Custom Sizing

```typescript
const avatarBuilder = createAvatarBuilder({
    width: '500px',
    previewHeight: '500px',
    onChange: ({ slot, item }) => {
        console.log('Updated:', slot, item);
    }
});
```

### With Rive Animations (Experimental)

```typescript
const avatarBuilder = createAvatarBuilder({
    useRiveAnimation: true, // Enable animated avatar preview
    onChange: ({ slot, item }) => {
        console.log('Updated:', slot, item);
    }
});
```

**Note:** Rive animation requires the `@rive-app/canvas` package to be installed:
```bash
npm install @rive-app/canvas
```

The Rive integration dynamically loads the game's avatar animation file and plays idle animations. Dynamic outfit updates are currently not fully implemented (work in progress).

## API

### Options

```typescript
interface AvatarBuilderOptions {
    /** Initial outfit to display */
    initialOutfit?: Partial<AvatarOutfit>;

    /** Callback when any cosmetic changes */
    onChange?: (data: { slot: SlotType; item: CosmeticInfo }) => void;

    /** Custom width (default: 100%) */
    width?: string;

    /** Custom height for preview (default: 400px) */
    previewHeight?: string;

    /** Use Rive animations instead of static images (default: false, experimental) */
    useRiveAnimation?: boolean;
}
```

### Handle

```typescript
interface AvatarBuilderHandle {
    root: HTMLElement;

    /** Get current outfit */
    getOutfit(): Required<Omit<AvatarOutfit, 'color'>>;

    /** Set outfit programmatically */
    setOutfit(outfit: Partial<AvatarOutfit>): void;

    /** Set active category */
    setCategory(slot: SlotType): void;

    /** Cleanup */
    destroy(): void;
}
```

### Methods

#### `getOutfit()`
Returns the current outfit configuration.

```typescript
const outfit = avatarBuilder.getOutfit();
console.log(outfit.top); // "Top_Wizard.png"
```

#### `setOutfit(outfit)`
Update the outfit programmatically.

```typescript
avatarBuilder.setOutfit({
    expression: 'Expression_Surprised.png',
    top: 'Top_Crown.png'
});
```

#### `setCategory(slot)`
Change the active category.

```typescript
avatarBuilder.setCategory('expression');
```

#### `destroy()`
Clean up event listeners and remove from DOM.

```typescript
avatarBuilder.destroy();
```

## User Interactions

### Navigation
- **Arrows**: Click ◀ or ▶ buttons to navigate
- **Swipe**: Drag left/right in the preview area
- **Keyboard**: Arrow keys (when focused)

### Category Selection
Click on any category button to:
1. Set it as active (highlighted)
2. Show its cosmetics in the preview
3. Enable navigation for that category

### Visual Feedback
- Active category button: highlighted with border
- Active layer: glowing effect on preview
- Item name: displayed below preview
- Progress indicator: dots + "5/12" text

## Styling

The component uses CSS variables for theming:

```css
--color-bg-secondary    /* Preview background */
--color-border          /* Borders */
--color-primary         /* Active states */
--color-text            /* Text color */
--spacing-*             /* Spacing tokens */
--radius-*              /* Border radius */
```

## Responsive Behavior

### Mobile (< 640px)
- 2x2 grid for category buttons
- Smaller preview (240px)
- Larger touch targets

### Tablet (641px - 1024px)
- 4x1 grid for category buttons
- Medium preview (280px)

### Desktop (> 1024px)
- 4x1 grid for category buttons
- Large preview (300px)

## Accessibility

- ✅ Focus-visible states for keyboard navigation
- ✅ Touch-friendly targets (min 44px)
- ✅ Reduced motion support
- ✅ ARIA labels (TODO: add aria-label attributes)

## Examples in Context

### In a Modal

```typescript
import { Modal } from '../Modal/Modal';
import { createAvatarBuilder } from '../AvatarBuilder/AvatarBuilder';

const modal = Modal({
    title: 'Customize Avatar',
    size: 'lg'
});

const builder = createAvatarBuilder({
    onChange: ({ slot, item }) => {
        // Live preview in modal
    }
});

modal.setContent(builder.root);
modal.show();
```

### In a Section

```typescript
import { createAvatarBuilder } from '../../components/AvatarBuilder/AvatarBuilder';

class MySection extends BaseSection {
    private builder: AvatarBuilderHandle | null = null;

    protected async build(container: HTMLElement): Promise<void> {
        this.builder = createAvatarBuilder({
            onChange: ({ slot, item }) => {
                // Save to state
                this.saveOutfit({ [slot]: item.filename });
            }
        });

        container.appendChild(this.builder.root);
    }

    public async destroy(): Promise<void> {
        this.builder?.destroy();
        super.destroy();
    }
}
```

## Performance Notes

- Cosmetic lists are loaded async on component creation
- Images are lazy-loaded with error handling
- Swipe gestures use passive event listeners
- Animations use CSS transforms for GPU acceleration

## Known Limitations

- Color customization not supported (outfit.color ignored)
- Maximum 10 dots shown in progress indicator (UI constraint)
- Requires MGCosmetic module to be initialized

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ⚠️ IE11 not supported (uses modern JS features)
