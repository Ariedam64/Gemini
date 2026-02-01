# Ability Research (Value + Hatching Trackers)

This document summarizes confirmed behaviors for abilities used by the new Value and Hatching tracker panels.

## Primary sources
- GameSourceFiles/gg-preview-pr-2329-router.magiccircle.workers.dev/common/games/Quinoa/systems/fauna/faunaAbilitiesDex.ts (trigger, baseProbability, baseParameters)
- GameSourceFiles/gg-preview-pr-2329-router.magiccircle.workers.dev/src/games/Quinoa/components/abilities/AbilityDescriptions.tsx (player-facing behavior text)
- GameSourceFiles/gg-preview-pr-2329-router.magiccircle.workers.dev/common/games/Quinoa/utils/pets.ts (toast data payloads)
- GameSourceFiles/gg-preview-pr-2329-router.magiccircle.workers.dev/src/games/Quinoa/components/abilities/PetAbility.tsx (strength scaling and inactive rules)
- GameSourceFiles/gg-preview-pr-2329-router.magiccircle.workers.dev/common/games/Quinoa/systems/weather/weatherDex.ts (weather mutator base chance)
- GameSourceFiles/gg-preview-pr-2329-router.magiccircle.workers.dev/common/games/Quinoa/systems/mutation/mutationsDex.ts (base chances for Gold/Rainbow)
- GameSourceFiles/gg-preview-pr-2329-router.magiccircle.workers.dev/src/games/Quinoa/atoms/myAtoms.ts (mutation boost scaling)
- helpers/magic_garden_research/03_mechanics_formulas.md (crop refund per crop sold, stacking uncertainty)
- helpers/magic_garden_research/04_interactions_and_strategies.md (supply vs sale framing)
- helpers/magic_garden_research/wiki/text (pet mutation + pet refund notes)

## Global rules for ability math
- Strength scaling: for abilities with baseProbability or baseParameters, game UI scales values by strengthScaleFactor = strength / 100 and clamps probabilities to 100.
  - From PetAbility.tsx: scaledProbability = baseProbability * strengthScaleFactor, actualProbability = min(100, scaledProbability).
  - Use pet.currentStrength / 100 in the mod (aligns with maxTargetStrength = 100).
- Weather gating: if baseParameters.requiredWeather is present and current weather does not match, treat ability as inactive.
- Hunger gating: PetAbility marks abilities inactive when hunger <= 0. Trackers should treat such pets as inactive.
- Stacking uncertainty: research docs discuss CLAMP vs STACK for multiple pets; tracker estimates must avoid combined chance and sum expected values linearly.

## Value (Coin) abilities
### Crop Size Boost (ProduceScaleBoost I/II/III, SnowyCropSizeBoost)
- Trigger: continuous (faunaAbilitiesDex.ts).
- BaseProbability (percent per minute):
  - I: 0.3, II: 0.4, III: 0.5, Snowy: 0.8.
- baseParameters: scaleIncreasePercentage (I: 6, II: 10, III: 14, Snowy: 12) with requiredWeather = Frost for Snowy.
- AbilityDescriptions: "Chance to increase size of garden crops."
- No explicit server targeting rules found; assume a random garden crop is affected per proc.
- Tracker implication: use garden crops only; compute average coin delta per crop when applying scaled size increase.

### Crop Mutation Boost (ProduceMutationBoost I/II/III, SnowyCropMutationBoost)
- Trigger: continuous.
- baseParameters: mutationChanceIncreasePercentage (I: 10, II: 15, III: 20, Snowy: 22 + requiredWeather = Frost).
- myAtoms.ts shows scaling: sum(baseChance * strengthScaleFactor) across active pets.
- This is not a proc; it is a percent increase to mutation chance.
- Tracker implication: apply total increase to weather mutator chance per minute per crop (weatherDex).

### Mutation Granters (RainDance, SnowGranter, FrostGranter, GoldGranter, RainbowGranter)
- Trigger: continuous.
- BaseProbability (percent per minute):
  - RainDance: 10, SnowGranter: 8, FrostGranter: 6, GoldGranter: 0.72, RainbowGranter: 0.72.
- baseParameters.grantedMutations: Wet, Chilled, Frozen, Gold, Rainbow.
- AbilityDescriptions: "made your <crop> turn <mutation>" with notes:
  - RainDance can turn Chilled -> Frozen when Wet is added.
  - SnowGranter can turn Wet -> Frozen when Chilled is added.
- Tracker implication: treat each proc as applying the granted mutation to a garden crop; compute coin delta by applying mutation to that crop (if already present, delta = 0). Note that Frozen may occur when Wet + Chilled are combined; use mutation calculator behavior to decide if a special-case conversion is needed.

### Double Harvest (DoubleHarvest)
- Trigger: harvest (per crop harvested).
- BaseProbability: 5 (percent per harvest).
- AbilityDescriptions: "harvested an extra <crop>" (toast data includes cropName).
- Research doc: supply-side multiplier (04_interactions_and_strategies.md).
- Tracker implication: for "harvest all current garden crops", expected extra crops = count * scaledProbability. Coin value of extras is based on the harvested crop sell prices.

### Crop Refund (ProduceRefund)
- Trigger: sellAllCrops.
- BaseProbability: 20 (percent).
- AbilityDescriptions: "refunded <numCropsRefunded> crops" (toast data includes numCropsRefunded).
- Research doc + user confirmation: refund rolls per crop sold (even when Sell All).
- Tracker implication: for "sell all current garden crops", expected refunded crops = count * scaledProbability (linear per pet). Coin value of refunds assumes re-selling those refunded crops.

## Hatching abilities
### Double Hatch (DoubleHatch)
- Trigger: hatchEgg.
- BaseProbability: 3 (percent per egg hatch).
- AbilityDescriptions: "hatched an extra <pet>".
- Tracker implication: expected extra pets per hatch = scaledProbability. Use inventory egg counts to show expected extra pets if all eggs are hatched.

### Pet Refund (PetRefund I/II)
- Trigger: sellPet.
- BaseProbability: 5 (I), 7 (II) (percent).
- AbilityDescriptions: "refunded 1 <eggName>".
- Wiki: selling a pet can return an egg of the same tier.
- Tracker implication: use current egg inventory by egg type to estimate expected refunds when selling pets hatched from those eggs. Display per egg type sprite with expected returns. Do not use combined chance.

### Pet Mutation Boost (PetMutationBoost I/II/III)
- Trigger: hatchEgg.
- baseParameters: mutationChanceIncreasePercentage (I: 7, II: 10, III: 13).
- AbilityDescriptions: "Increases chance of hatched pets gaining mutations."
- Wiki: base pet mutation chances are 1% (Gold) and 0.1% (Rainbow).
- Tracker implication: apply total increase (scaled by strength) to base chances for Gold and Rainbow. If MGData lacks pet mutation base chances, show the increase percent only.

## Known unknowns / assumptions
- No server logic found for exact crop target selection for size boost and mutation granters; tracker uses average delta across current garden crops.
- Stacking vs clamping of multiple pets is unknown; tracker uses linear expectation per user requirement.
- Inventory crops do not mutate or resize; only garden crops are included in value calculations.
