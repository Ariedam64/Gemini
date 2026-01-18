# Panel: Value (Coin)

## Feature ID
- id: coin (purpose system uses "coin")
- label: Value
- category: tracking or stats (match existing panel conventions)

## Panel Behavior (Growth-Style)
- Header label reads "Value" and uses the same minimal card styling as Growth.
- Detect which value abilities exist on the team and only render rows for those.
- If 2-3 pets share the same value ability category, use grouping/bunching and
  show team-level totals. If only one pet has the ability, the per-pet view
  shows the same math (team == pet).
- Keep rows compact and ability-specific.

## Abilities Covered (Ability-Specific Rows)
1) Crop Size Boost
- ProduceScaleBoost
- ProduceScaleBoostII
- ProduceScaleBoostIII
- SnowyCropSizeBoost (weather gated)

2) Crop Mutation Boost
- ProduceMutationBoost
- ProduceMutationBoostII
- ProduceMutationBoostIII
- SnowyCropMutationBoost (weather gated)

3) Mutation Granters
- RainDance (Wet)
- SnowGranter (Chilled)
- FrostGranter (Frozen)
- GoldGranter (Gold)
- RainbowGranter (Rainbow)

4) Double Harvest
- DoubleHarvest

5) Crop Refund
- ProduceRefund

## Inputs
- Garden crops: Globals.myGarden.get().crops.all
- Harvestable count: prefer Globals.myGarden.get().crops.mature when available
- Weather: Globals.weather.get(), MGData.get('weather')
- Ability data: MGData.get('abilities')
- Plant data: MGData.get('plants')
- Crop value: calculateCropSellPrice
- Pet data: Globals.myPets.get() (strength + hunger)

## Strength Scaling
- strengthScaleFactor = pet.currentStrength / 100
- scaledProbability = min(100, baseProbability * strengthScaleFactor)
- scaledIncrease = baseParameter * strengthScaleFactor

## Gating
- If pet.hunger <= 0, treat its abilities as inactive.
- If baseParameters.requiredWeather exists and weather does not match, treat as inactive.

## Row Calculations

### Row 1: Crop Size Boost
- Label: "SIZE BOOST".
- For each pet with a size boost ability, compute:
  - scaledScaleIncreasePct = baseParameters.scaleIncreasePercentage * strengthScaleFactor
  - procsPerHour = (scaledProbability / 100) * 60 (continuous triggers are per minute)
- Per-crop delta:
  - currentValue = calculateCropSellPrice(species, targetScale, mutations)
  - newScale = min(targetScale * (1 + scaledScaleIncreasePct / 100), maxScale)
  - newValue = calculateCropSellPrice(species, newScale, mutations)
  - deltaValue = max(0, newValue - currentValue)
- Use garden crops only. Ignore inventory crops.
- Aggregate per pet using average deltaValue across garden crops.
- Team display:
  - expectedDeltaPerHour = sum(perPetProcsPerHour * avgDeltaValue)
  - expectedDeltaPerProc = avgDeltaValue

### Row 2: Crop Mutation Boost (Weather Mutator)
- Label: "MUTATION BOOST".
- Requires active weather with mutator (Rain, Frost, Dawn, Amber Moon).
- Base chance per minute per crop from MGData.get('weather'):
  - baseChance = weather.mutator.chancePerMinutePerCrop
- Total increase percent from pets (sum of scaled mutationChanceIncreasePercentage).
- Additional chance per minute per crop = baseChance * (totalIncrease / 100).
- Additional procs per hour = cropsCount * (additionalChance / 100) * 60.
- Value per proc:
  - Use weather.mutator.mutation (Wet, Chilled, Dawnlit, Ambershine, etc).
  - For each garden crop, compute deltaValue by applying that mutation
    (add to mutations if not already present) and measuring sell price delta.
  - Use average deltaValue across crops.
- If weather is inactive or has no mutator, row should display inactive or 0.

### Row 3: Mutation Granters
- Label: "GRANTERS".
- For each granter ability:
  - grantedMutation from baseParameters.grantedMutations
  - procsPerHour = (scaledProbability / 100) * 60
  - avgDeltaValue = average delta across garden crops when applying grantedMutation
- If a crop already has the granted mutation, its deltaValue is 0.
- Team display: sum expectedDeltaPerHour across pets; show per-proc delta as avg.

### Row 4: Double Harvest (per harvest)
- Label: "EXTRA HARVEST".
- Trigger happens per crop harvested.
- Use harvestableCount from garden (prefer crops.mature; fallback to crops.all).
- For each pet with DoubleHarvest:
  - expectedExtraCrops = harvestableCount * (scaledProbability / 100)
  - expectedExtraCoins = sum(cropSellPrice * (scaledProbability / 100))
    across harvestable crops
- Team display:
  - expectedExtraCropsTeam = sum expectedExtraCrops across pets (linear expectation)
  - expectedExtraCoinsTeam = sum expectedExtraCoins across pets
- Display as two compact stats:
  - "+X crops (harvest all)" and "+Y coins (harvest all)"

### Row 5: Crop Refund (per sell all)
- Label: "CROP REFUND".
- Trigger happens on sellAllCrops.
- Refund rolls per crop sold (confirmed by research docs and user input).
- Use harvestableCount from garden as stand-in for "sell all" amount.
- For each pet with ProduceRefund:
  - expectedRefundedCrops = harvestableCount * (scaledProbability / 100)
  - expectedRefundedCoins = sum(cropSellPrice * (scaledProbability / 100))
    across harvestable crops (assumes re-selling refunded crops)
- Team display:
  - expectedRefundedCropsTeam = sum expectedRefundedCrops across pets
  - expectedRefundedCoinsTeam = sum expectedRefundedCoins across pets
- Display as two compact stats:
  - "+X crops (sell all)" and "+Y coins (sell all)"

## Display Rules
- Only show rows for abilities present on the team.
- Rows 1-3 show per-proc and per-hour coin values.
- Rows 4-5 show expected crop counts and coin values for "harvest all" and
  "sell all" actions (no per-hour estimate).
- If no relevant pets or no garden crops, hide row or show 0.

## No Combined Chance Rule
- Do not compute combined probabilities across pets.
- Sum expected values linearly across pets.

## Grouping
- renderGroupedSlot should display team-level totals (same as above).
- Group/bunch when 2-3 pets share the same value ability category.
