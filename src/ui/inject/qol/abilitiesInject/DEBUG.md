# AbilitiesInject - Debugging Guide

## Issue: Modal Container Not Found

The injection is initializing but can't find the modal container. This means the CSS selector doesn't match the game's actual DOM structure.

## How to Fix

### Step 1: Find the Correct Selector

1. Open the journal modal in the game
2. Open browser DevTools (F12)
3. Click the "Elements" tab
4. Click the element picker (top-left of DevTools)
5. Click on the journal modal background
6. Look at the selected element in the Elements panel

### Step 2: Identify the Container

Look for the parent container that:
- Contains the entire journal modal
- Has a class or ID you can select
- Remains in the DOM when the modal is open

**Common patterns to look for:**
- `<div class="modal">...</div>`
- `<div class="Modal">...</div>`
- `<div role="dialog">...</div>`
- `<div data-modal="journal">...</div>`

### Step 3: Update the Selector

Once you find the selector, update `constants.ts`:

```typescript
// In src/ui/inject/qol/abilitiesInject/constants.ts

export const SELECTORS = {
  // Update this line with the correct selector:
  modalContainer: '[role="dialog"]', // Example - replace with actual selector

  // ... rest of selectors
}
```

## Alternative: Dynamic Selector Finding

If the modal structure is complex, you can use this approach in `inject.ts`:

### Option A: Find by Role

```typescript
function findModalContainer(): HTMLElement | null {
  // Try common modal patterns
  const selectors = [
    '[role="dialog"]',
    '[role="alertdialog"]',
    '.modal-overlay',
    '.Modal',
    '[data-modal]',
    '[class*="modal"]',
    '[class*="Modal"]',
  ];

  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el && el.textContent?.includes('GARDEN JOURNAL')) {
      return el as HTMLElement;
    }
  }

  return null;
}
```

### Option B: Find by Content

```typescript
function findModalContainer(): HTMLElement | null {
  // Find element containing "GARDEN JOURNAL"
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: (node) => {
        const el = node as HTMLElement;
        const text = el.textContent || '';
        if (text.includes('GARDEN JOURNAL') && el.children.length > 0) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    }
  );

  let current = walker.nextNode();
  let modalRoot: HTMLElement | null = null;

  while (current) {
    const el = current as HTMLElement;
    // Find the highest parent that still contains "GARDEN JOURNAL"
    if (el.parentElement && !el.parentElement.textContent?.includes('GARDEN JOURNAL')) {
      modalRoot = el;
      break;
    }
    current = walker.nextNode();
  }

  return modalRoot;
}
```

## Quick Console Test

Run this in the browser console when the journal is open:

```javascript
// Test different selectors
const selectors = [
  '.modal-container',
  '[role="dialog"]',
  '.Modal',
  '[class*="modal"]',
  '[class*="Modal"]',
];

for (const sel of selectors) {
  const el = document.querySelector(sel);
  if (el) {
    console.log(`✅ Found with: ${sel}`, el);
  } else {
    console.log(`❌ Not found: ${sel}`);
  }
}

// Find by "GARDEN JOURNAL" text
const allElements = document.querySelectorAll('*');
for (const el of allElements) {
  if (el.textContent?.includes('GARDEN JOURNAL') && el.children.length > 5) {
    console.log('📍 Possible modal container:', el);
    console.log('   Classes:', el.className);
    console.log('   ID:', el.id);
    console.log('   Role:', el.getAttribute('role'));
  }
}
```

## Expected Console Output

When working correctly, you should see:
```
[AbilitiesInject] Journal opened
[AbilitiesInject] Started watching journal modal
```

When it's broken, you see:
```
[AbilitiesInject] Journal opened
[AbilitiesInject] Modal container not found
```

## Testing After Fix

1. Rebuild: `npm run build`
2. Reload the userscript in browser
3. Open journal modal
4. Check console for success message
5. Navigate to a pet species
6. Look for the abilities section below variant stamps
