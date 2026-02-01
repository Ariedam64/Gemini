# Panel: Hatching

## Feature ID
- id: hatch
- label: Hatching
- category: tracking

## Panel Behavior (Growth-Style)
- Header label reads "Hatching" and uses the same minimal card styling as Growth.
- Detect which hatching abilities exist on the team and only render rows for those.
- If 2-3 pets share the same hatching ability category, use grouping/bunching and
  show team-level totals (like Growth). If only one pet has the ability, the
  per-pet view shows the same math (team == pet).
- Keep rows minimal and ability-specific (target 1-3 rows). If all three
  abilities are present, combine Pet Mutation chance + estimate into one row
  so the panel stays at 3 rows max.

## Abilities Covered (Ability-Specific Rows)
1) Double Hatch
- DoubleHatch

2) Pet Refund
- PetRefund
- PetRefundII

3) Pet Mutation Boost
- PetMutationBoost
- PetMutationBoostII
- PetMutationBoostIII

## Inputs
- Inventory eggs: Globals.myInventory.get().items (itemType === 'Egg')
- Ability data: MGData.get('abilities')
- Mutations data (base chance): MGData.get('mutations')
- Pet data: Globals.myPets.get() (strength + hunger)

## No Egg Rate Tracking
- Do not calculate eggs per hour or hatch rate.
- This panel is inventory-based and per-hatch based only.

## Strength Scaling and Gating
- scaledProbability = min(100, baseProbability * (pet.currentStrength / 100))
- scaledIncrease = baseParameter * (pet.currentStrength / 100)
- If pet.hunger <= 0, treat ability as inactive.

## Row Calculations

### Row 1: Extra Hatches (DoubleHatch)
- Label: "EXTRA HATCHES".
- Use inventory eggs grouped by eggId.
- For each pet with DoubleHatch:
  - perHatchExtra = scaledProbability / 100
- For each egg type:
  - expectedExtraHatchesForType = quantity * sum(perHatchExtra)
- Display as sprite list with overlay values:
  - egg sprite + expected extra hatches overlay
  - hide egg types with quantity == 0

### Row 2: Eggs Returned (PetRefund)
- Label: "EGGS RETURNED".
- Refund calculation is based on current egg inventory by egg type.
- For each pet with PetRefund or PetRefundII:
  - perSellRefundChance = scaledProbability / 100
- For each egg type in inventory:
  - expectedRefundsForType = quantity * sum(perSellRefundChance)
- Display as sprite list with overlay values (same layout as Extra Hatches).

### Row 3: Pet Mutation (PetMutationBoost)
- Default layout uses two rows:
  - "PET MUTATION CHANCE": Rainbow % + Gold % (colored by mutation type)
  - "EST. MUTATIONS": expected Rainbow + Gold counts (colored by mutation type)
- If all three abilities are present (DoubleHatch + PetRefund + PetMutationBoost),
  combine into a single "PET MUTATION" row with both the chance values and
  estimated counts, so the panel stays at 3 rows max.
- Team total increase percent = sum(scaledIncrease) across pets.
- Base chances from MGData.get('mutations'):
  - Gold.baseChance
  - Rainbow.baseChance
- Effective chance = baseChance * (1 + totalIncrease / 100).
- totalEggs = sum of all egg quantities in inventory.
- expectedRainbow = totalEggs * effectiveRainbowChance
- expectedGold = totalEggs * effectiveGoldChance

## Display Rules
- Only show rows for abilities present on the team.
- If no inventory eggs, hide sprite rows (Extra Hatches, Eggs Returned).
- If all three abilities are present, collapse Pet Mutation rows into one.
- Keep rows compact; use the same stat-row classes as Growth.

## No Combined Chance Rule
- Do not compute combined probabilities across pets.
- Sum expected values linearly across pets.

## Grouping
- renderGroupedSlot shows team totals for the rows above.
- Group/bunch when 2-3 pets share the same hatching ability category.
