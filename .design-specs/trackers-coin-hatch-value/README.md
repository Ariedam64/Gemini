# Trackers Coin/Hatch/Value Spec

This folder defines the full plan for the remaining Trackers stat cards:
- Value (coin, mutation/size boost + harvest/refund)
- Hatching (double hatch + pet refund + pet mutation boost)

These panels must match the minimal UI patterns used by the existing Growth and XP tracker cards.
No implementation changes are made in this plan.

## Goals
- Add two new tracker panels with ability-specific stat rows.
- Consolidate harvest-related abilities into Value (coin) for a single coin panel.
- Use team-level contributions and grouping/bunching where it makes sense (like Growth),
  but keep XP ungrouped.
- Avoid combined chance formulas; sum expected values linearly across pets.
- Use only runtime data (MGData + Globals). No hardcoded game data.

## Non-Goals
- No egg rate tracking (Growth already covers egg growth rate).
- No inventory crop mutation or size changes (inventory crops do not mutate).
- No new feature toggles or APIs; integrate within existing Trackers panel system.
- No new layouts or heavy UI changes; reuse Growth/XP stat rows.
- No separate Harvest panel (harvest abilities live inside Value).

## Panel Summary
- Value (coin): mutation granters, crop size boost, crop mutation boost,
  double harvest, crop refund.
- Hatching (hatch): double hatch, pet refund, pet mutation boost.

## Key Constraints
- Ability data must come from MGData.get('abilities').
- Plant data must come from MGData.get('plants').
- Weather data must come from MGData.get('weather') and Globals.weather.
- Garden state must come from Globals.myGarden.
- Inventory state must come from Globals.myInventory.
- All computations must be safe when data is missing (return 0 or show inactive).

## Rules Compliance (from .claude)
- Avoid polling to check state or re-render. Use reactive sources (Globals subscribe/subscribeStable, Store) whenever possible.
  - Polling is only allowed if no reliable reactive source exists, and must be justified, long-interval, and cleaned up.
- No hardcoded game data; always use MGData/Globals.
- No side effects on import; initialization must be explicit.
- Clean up all listeners/subscriptions/intervals in destroy().
- Respect feature vs module boundaries and existing section lifecycle patterns.

## Files in This Spec
- ability-research.md: ability behavior notes and source references.
- data-sources.md: runtime data sources and field references.
- ui-guidelines.md: minimal UI rules and stat row layout requirements.
- panel-value.md: value panel calculation plan and UI layout (includes harvest abilities).
- panel-hatching.md: hatching panel calculation plan and UI layout.
- integration.md: feature registration, grouping rules, and default selection.
- implementation-checklist.md: file-by-file tasks for an agent to implement.
- panel-harvest.md: legacy notes (harvest panel merged into value).
