# Integration and Wiring

## New Panel Files
Create new panels in:
- src/ui/sections/Trackers/parts/featurePanels/valuePanel.ts
- src/ui/sections/Trackers/parts/featurePanels/hatchingPanel.ts

Each panel implements FeaturePanelDefinition and provides:
- id, label, icon
- isAvailable() -> true
- renderPetSlot() with compact stat rows
- renderGroupedSlot() for team totals
- shouldDisplay() to hide panel when no relevant abilities

## Register Panels
Update:
- src/ui/sections/Trackers/parts/featurePanels/index.ts
  - Import new panels
  - Add to FEATURE_PANELS array

## Default Feature Selection
Update:
- src/ui/sections/Trackers/parts/TrackerExpansion.ts
  - Use detectTeamPurpose(team).suggestedFeatures to pick
    default panel ID if available.
  - Keep current growth/xp fallback if no suggested feature is found.

## Progress Bar Behavior
Progress bar should only switch between xp and growth.
Update:
- updateProgressBarForFeature(): only react to 'xp' and 'growth'
- addProgressBar(): keep current logic; do not introduce new bar modes

## Grouping Rules
- XP stays ungrouped (per-pet stats matter).
- Growth stays grouped when team contributions are meaningful (current logic).
- Coin (Value) and Hatching should support grouping when the stats are team-level.

Plan:
- Extend analyzeTeamForGrouping() or add a new grouping selector so that
  grouping is enabled for non-xp panels when:
  - selected feature is not 'xp'
  - 2-3 pets share relevant ability categories for that panel

Options:
- Option A: Add a new grouping helper in TrackerExpansion that groups pets
  by ability sets for the current panel.
- Option B: Extend analyzeTeamGrouping() to accept a new category parameter
  (e.g., 'coin' or 'hatch') and match pets with the same relevant abilities.

## Row Selection Philosophy
- Panels must detect which ability categories are present and only render
  those rows.
- Hatching rows:
  - Extra Hatches (DoubleHatch)
  - Eggs Returned (PetRefund)
  - Pet Mutation Chance + Est. Mutations (PetMutationBoost)
- Value rows:
  - Size Boost, Mutation Boost, Granters, Extra Harvest, Crop Refund

## CSS
If sprite overlays for egg rows need new CSS classes, extend:
- src/ui/sections/Trackers/parts/featurePanels/growthPanel.css.ts

No new CSS files should be added for these panels.

## Purpose Mapping
Purpose system already recommends 'coin' for coin farming and
'hatch' for hatching. Ensure new panel IDs match these strings:
- Value panel id must be 'coin'
- Hatching panel id must be 'hatch'

## shouldDisplay Rules
- Value: show if pets have size boost, mutation boost, granters,
  DoubleHarvest, or ProduceRefund
- Hatching: show if pets have DoubleHatch, PetRefund, or PetMutationBoost

Panels should hide when no abilities are present.

## Polling / Updates
- Do not add new polling loops for these panels.
- Use the existing TrackerExpansion update cycle and/or reactive Globals.
- If any new subscriptions are added, clean them up in destroy().
