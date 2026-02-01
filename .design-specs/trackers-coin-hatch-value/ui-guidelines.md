# UI Guidelines (Minimal Growth/XP Style)

All new panels must match the existing minimal UI used by Growth and XP.
Do not introduce new layouts, cards, or typography systems.

## Required Patterns
- Use the existing compact stat rows from growthPanel.css.ts:
  - .stat-row
  - .stat__label
  - .stat__timer / .stat__value / .stat__feeds
  - .stat__progress-mini (only when progress is needed)

- Keep rows short and ability-specific. One row per ability type by default.
  Pet Mutation Boost uses two rows (chance + estimate) unless all three
  hatching abilities are present, in which case it collapses to one row.
- XP stays ungrouped; Value and Hatching can be grouped when team totals
  are the meaningful signal (similar to Growth).

## Value Panel Row Formatting
- Rows 1-3 (Size Boost, Mutation Boost, Granters):
  - Use per-proc and per-hour coin values.
  - Example layout: label + "+X/proc" + "+Y/hr".

- Rows 4-5 (Double Harvest, Crop Refund):
  - Use "harvest all" / "sell all" expected crop counts and coin values.
  - Example layout: label + "+X crops" + "+Y coins".

Use existing stat slots (stat__timer/stat__value) to avoid new layout code.

## Hatching Panel Row Formatting
- Extra Hatches row:
  - Label: "EXTRA HATCHES".
  - Egg sprites with expected extra hatch counts overlaid.
- Eggs Returned row:
  - Label: "EGGS RETURNED".
  - Egg sprites with expected refund counts overlaid.
- Pet Mutation Chance row (default):
  - Label: "PET MUTATION CHANCE".
  - Two values on the same row: Rainbow % and Gold %.
  - Color each value to match its mutation type.
- Est. Mutations row (default):
  - Label: "EST. MUTATIONS".
  - Two values on the same row: expected Rainbow count and Gold count.
  - Color each value to match its mutation type.
- Combined Pet Mutation row (only when all three abilities are present):
  - Label: "PET MUTATION".
  - Include Rainbow % + Gold % and estimated Rainbow + Gold counts on one row.

## Hatching Egg Sprite Rows (Overlay Values)
- Only show egg types with quantity > 0.
- Each egg type shows sprite and a numeric overlay value.
- Spacing should be consistent and comfortable (no overlap between types).

Suggested structure (DOM):
- .stat-row
  - .stat__label
  - .stat__sprite-grid
    - .stat__sprite-item (position: relative)
      - sprite canvas
      - .stat__sprite-value (absolute overlay, centered)

If new CSS is required, extend growthPanel.css.ts (already injected in Trackers):
- .stat__sprite-grid { display: flex; gap: 8px; align-items: center; }
- .stat__sprite-item { position: relative; display: inline-flex; }
- .stat__sprite-value { position: absolute; top: -6px; right: -4px; ... }

For mutation colors, prefer existing theme tokens:
- Rainbow: var(--mut-rainbow)
- Gold: var(--mut-gold)

## Icons and Labels
- Feature panel labels and icons must be minimal like XP/Growth.
- Use a short label (Value, Hatching).
- Icon glyphs should follow the same pattern as XP/Growth; if no matching
  glyph is known, use a simple ASCII placeholder and update later.

## Progress Bars
Only XP and Growth use progress bars. The new panels must not add
additional progress bars or complex visualizations.
