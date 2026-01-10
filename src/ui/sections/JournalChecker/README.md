# Journal Checker Section

Replicates the game's "Garden Journal" clipboard aesthetic.

## Theme Overrides (Intentional)

The hardcoded `#000000` colors in `styles.css.ts` are intentional theme-specific overrides:

- Lines 111, 120, 125: Black text for dark theme / MagicGarden theme

**Rationale:** The journal uses a cream-colored paper background (`--paper: #FDFBF7`) which requires dark text for readability. Standard theme variables designed for dark backgrounds won't provide sufficient contrast.

**Pattern:**
```css
:host-context([data-theme="dark"]) .journal-row-info {
    color: #000000; /* Intentional override for paper background */
}
```
