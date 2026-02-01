# Data Sources and Runtime Dependencies

This plan must only use runtime data captured by MGData and Globals.
Do not hardcode ability/plant/mutation values.

## MGData
Use MGData.get(<key>) from src/modules/data.

- abilities
  - baseProbability (number)
  - baseParameters (object)
    - scaleIncreasePercentage
    - mutationChanceIncreasePercentage
    - grantedMutations (string[])
    - requiredWeather (string)

- plants
  - [species].crop.baseSellPrice
  - [species].crop.maxScale

- mutations
  - [mutationId].baseChance
  - [mutationId].coinMultiplier
  - Use existing calculators instead of raw data when possible.

- weather
  - [weatherId].mutator.mutation
  - [weatherId].mutator.chancePerMinutePerCrop

## Globals
Use Globals from src/globals. Key sources:

- Globals.myGarden.get()
  - crops.all: CropInfo[] (species, targetScale, mutations, startTime, endTime)
  - crops.mature, crops.growing
  - eggs.growing: EggWithTile[] (eggId, plantedAt, maturedAt)

- Globals.myInventory.get()
  - items: InventoryItem[]
  - Eggs are itemType === 'Egg' with eggId + quantity

- Globals.myPets.get()
  - all: UnifiedPet[] (abilities, currentStrength, maxStrength, hunger, targetScale)

- Globals.weather.get()
  - type, isActive

## Calculators
Prefer existing calculators and helpers:

- src/modules/calculators/logic/crop.ts
  - calculateCropSellPrice(species, targetScale, mutations)

- src/modules/calculators/logic/mutation.ts
  - calculateMutationMultiplier(mutations)
  - getMutationInfo(mutation)

## Strength Scaling Rule
Use the same scaling behavior as the game UI:
- strengthScaleFactor = pet.currentStrength / 100
- scaledProbability = min(100, baseProbability * strengthScaleFactor)
- scaledValue = baseValue * strengthScaleFactor

Reference implementation in GameSourceFiles:
- Quinoa utils: common/games/Quinoa/utils/pets.ts (getStrengthScaleFactor)
- UI: src/games/Quinoa/components/abilities/PetAbility.tsx

## Gating Rules
- Weather gating: if baseParameters.requiredWeather exists and Globals.weather
  does not match, treat the ability as inactive.
- Hunger gating: if pet.hunger <= 0, treat the ability as inactive.
