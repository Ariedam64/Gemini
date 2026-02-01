# Implementation Checklist (Agent Task List)

Use this checklist to implement the Value and Hatching tracker panels
in the Trackers section. Do not deviate from the minimal UI pattern.

## 1) Create panel files
Create new files under:
- src/ui/sections/Trackers/parts/featurePanels/valuePanel.ts
- src/ui/sections/Trackers/parts/featurePanels/hatchingPanel.ts

Each file must:
- Implement FeaturePanelDefinition
- Define helper functions for calculations (pure functions)
- Render compact stat rows using the same classes as Growth/XP
- Implement renderGroupedSlot for team totals
- Implement shouldDisplay based on ability presence

## 2) Register panels
File: src/ui/sections/Trackers/parts/featurePanels/index.ts
- Import the two new panels
- Add them to FEATURE_PANELS array

## 3) Add CSS for egg sprites and mutation colors (if needed)
File: src/ui/sections/Trackers/parts/featurePanels/growthPanel.css.ts
- Add minimal classes for sprite grid and overlay values:
  - stat__sprite-grid
  - stat__sprite-item
  - stat__sprite-value
- Add minimal classes for mutation colors:
  - stat__value--gold { color: var(--mut-gold); }
  - stat__value--rainbow { color: var(--mut-rainbow); }
- Keep color usage consistent with existing stat rows

## 4) Update TrackerExpansion default selection
File: src/ui/sections/Trackers/parts/TrackerExpansion.ts
- Use detectTeamPurpose(team).suggestedFeatures for initial feature choice
- If suggestion not found, fallback to current behavior
- Ensure only xp/growth switch the progress bar

## 5) Update grouping logic
File: src/ui/sections/Trackers/parts/TrackerExpansion.ts
- Allow grouping for coin/hatch panels (not xp)
- Group when 2-3 pets share relevant ability categories
- Keep existing growth grouping rules intact

## 6) Panel-specific calculation details

### Value panel
- Abilities:
  - size boost: ProduceScaleBoost* + SnowyCropSizeBoost
  - mutation boost: ProduceMutationBoost* + SnowyCropMutationBoost
  - granters: RainDance, SnowGranter, FrostGranter, GoldGranter, RainbowGranter
  - harvest: DoubleHarvest
  - refund: ProduceRefund

- Inputs:
  - garden.crops.all (no inventory crops)
  - garden.crops.mature for "harvest all" counts when available
  - MGData abilities/plants/weather

- Calculations:
  - scaledProbability = min(100, baseProbability * (pet.currentStrength / 100))
  - scaledIncrease = baseParameter * (pet.currentStrength / 100)
  - size boost delta = avg crop value delta with increased targetScale
  - mutation boost extra chance = baseChance * (totalIncrease / 100)
  - granter delta = avg crop value delta when applying granted mutation
  - double harvest expected extras = harvestableCount * probability
  - crop refund expected refunds = harvestableCount * probability

- Display:
  - Rows: SIZE BOOST, MUTATION BOOST, GRANTERS, EXTRA HARVEST, CROP REFUND
  - Rows 1-3: per-proc + per-hour coin values
  - Rows 4-5: expected crop counts + coin value for "harvest all"/"sell all"

### Hatching panel
- Abilities: DoubleHatch, PetRefund*, PetMutationBoost*
- Inputs: inventory eggs only
- Calculations:
  - totalEggs = sum egg quantities in inventory
  - extra hatches per egg type = quantity * sum(DoubleHatch probabilities)
  - pet refund per egg type = quantity * sum(PetRefund probabilities)
  - mutation boost = sum(scaled mutationChanceIncreasePercentage)
  - effective Gold/Rainbow chance = baseChance * (1 + totalIncrease / 100)
  - estimated mutations = totalEggs * effective chance
- Display:
  - EXTRA HATCHES (egg sprites + overlay values)
  - EGGS RETURNED (egg sprites + overlay values)
  - PET MUTATION CHANCE (Rainbow % + Gold % with colored values)
  - EST. MUTATIONS (Rainbow count + Gold count with colored values)
  - If all three abilities are present, collapse the two mutation rows into
    a single PET MUTATION row that includes both chance and estimate values
    to enforce a 3-row max.

## 7) No combined chance rule
Every panel must avoid combined probabilities like 1 - product(1-p).
Always sum expected values linearly across pets.

## 8) shouldDisplay rules
- valuePanel: show when any size/mutation/granter/harvest/refund abilities exist
- hatchingPanel: show when DoubleHatch, PetRefund, or PetMutationBoost exists

## 9) Manual verification
- With no relevant pets, panels should not appear.
- With relevant pets but no garden crops, value rows show 0 or inactive (no errors).
- Hatching panel hides sprite rows if no eggs in inventory.
- XP panel remains ungrouped; Growth and new panels can be grouped.
- Progress bar switches only for xp/growth; other panels leave current bar.
