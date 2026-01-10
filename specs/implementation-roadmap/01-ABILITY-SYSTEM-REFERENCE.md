# ABILITY SYSTEM REFERENCE
# Complete Pet Abilities, Species Mapping, and Detection Rules

**Status:** Ready for Implementation
**Created:** 2026-01-07
**Source:** COMPLETE-IMPLEMENTATION-ROADMAP.md (lines 122-514)
**Purpose:** Comprehensive reference for all 53 pet abilities, their mechanics, and team detection logic

---

## TABLE OF CONTENTS

1. [Overview](#overview)
2. [All 53 Pet Abilities by Category](#all-53-pet-abilities-by-category)
3. [Ability Trigger Types](#ability-trigger-types)
4. [Critical Interactions & Combos](#critical-interactions--combos)
5. [Species-to-Ability Mapping](#species-to-ability-mapping)
6. [Research Notes](#research-notes)

---

## OVERVIEW

### Ability Categories

All 53 abilities are organized into 8 functional categories based on player usage patterns:

1. **XP FARMING** (4 abilities) - Leveling pets to max strength
2. **COIN FARMING** (6 abilities) - Maximizing coin generation
3. **CROP FARMING** (13 abilities) - Growing and optimizing crops
4. **TIME REDUCTION** (8 abilities) - Reducing egg/plant maturation time
5. **MUTATION GRANTERS** (7 abilities) - Adding valuable mutations to crops
6. **EFFICIENCY** (17 abilities) - Extended play sessions, reducing manual input
7. **HATCHING OPTIMIZATION** (9 abilities) - Improving hatched pet quality
8. **SPECIAL/UTILITY** (2 abilities) - Niche or unused abilities

### Key Mechanics

**Strength Scaling:**
```typescript
actualXpPerProc = floor(baseXpPerProc * (petStrength / 100))
```

**XP Per Hour:**
```typescript
expectedXpPerHour = (procRate / 100) * 60 * actualXpPerProc
```

**Weather Effects:**
- Snowy variants only active during Frost weather
- Weather-based mutation granters are always active (not weather-dependent)

---

## ALL 53 PET ABILITIES BY CATEGORY

### 1. XP FARMING (4 abilities)

**Currently tracked by XP Tracker feature**

| Ability ID | Display Name | Proc Rate | Bonus XP | Weather |
|------------|--------------|-----------|----------|---------|
| `PetXpBoost` | XP Boost I | 30% | +300 XP | None |
| `PetXpBoostII` | XP Boost II | 35% | +400 XP | None |
| `PetXpBoostIII` | XP Boost III | 40% | +500 XP | None |
| `SnowyPetXpBoost` | Snowy XP Boost | 50% | +450 XP | Frost |

**How It Works:**
- Each proc grants bonus XP to ALL active pets (including self)
- XP is strength-scaled: `actualXpPerProc = floor(baseXpPerProc * (petStrength / 100))`
- Expected XP/hr = `(procRate / 100) * 60 * actualXpPerProc`
- Snowy variant only active during Frost weather

**Detection Rules:**
- 2+ XP Boost pets = 90% confidence XP farming team
- 1 XP Boost + leveling pets = 70% confidence
- 2+ pets below max STR = 25-30% confidence (players often run 3 pets that aren't quite at THEIR specific max STR)

---

### 2. COIN FARMING (6 abilities)

#### Coin Finders (4 abilities)

| Ability ID | Display Name | Proc Rate | Max Coins | Weather |
|------------|--------------|-----------|-----------|---------|
| `CoinFinderI` | Coin Finder I | 35% | 120,000 | None |
| `CoinFinderII` | Coin Finder II | 13% | 1,200,000 | None |
| `CoinFinderIII` | Coin Finder III | 6% | 10,000,000 | None |
| `SnowyCoinFinder` | Snowy Coin Finder | 15% | 5,000,000 | Frost |

#### Sell Boosts (4 abilities)

| Ability ID | Display Name | Proc Rate | Price Increase | Trigger |
|------------|--------------|-----------|----------------|---------|
| `SellBoostI` | Sell Boost I | 10% | +20% | sellAllCrops |
| `SellBoostII` | Sell Boost II | 12% | +30% | sellAllCrops |
| `SellBoostIII` | Sell Boost III | 14% | +40% | sellAllCrops |
| `SellBoostIV` | Sell Boost IV | 16% | +50% | sellAllCrops |

#### Other Coin Abilities

| Ability ID | Display Name | Proc Rate | Effect | Trigger |
|------------|--------------|-----------|--------|---------|
| `ProduceRefund` | Crop Refund | 20% | Get crops back after selling | sellAllCrops |
| `DoubleHarvest` | Double Harvest | 5% | Double crop yield | harvest |

**Ability Interactions:**
- **Sell Boost + Crop Refund combo:** Seen when selling. Double Harvest ideally used in team of 3 when harvesting, then swap to Crop Refund + Sell Boost pets for selling
- **Different triggers, same outcome:** Double Harvest (harvest trigger) and Crop Refund (sell trigger) work at different stages but both maximize crop availability

**Detection Rules:**
- Coin Finder pets present = passive coin farming
- Sell Boost + crop-growing abilities = active coin farming
- Crop Refund + Sell Boost combo = high confidence selling team

---

### 3. CROP FARMING (13 abilities)

#### Plant Growth Boosts (4 abilities)

| Ability ID | Display Name | Proc Rate | Time Reduction | Weather |
|------------|--------------|-----------|----------------|---------|
| `PlantGrowthBoost` | Plant Growth Boost I | 24% | -3 minutes | None |
| `PlantGrowthBoostII` | Plant Growth Boost II | 27% | -5 minutes | None |
| `PlantGrowthBoostIII` | Plant Growth Boost III | 30% | -7 minutes | None |
| `SnowyPlantGrowthBoost` | Snowy Plant Growth Boost | 40% | -6 minutes | Frost |

#### Crop Size Boosts (4 abilities)

| Ability ID | Display Name | Proc Rate | Scale Increase | Weather |
|------------|--------------|-----------|----------------|---------|
| `ProduceScaleBoost` | Crop Size Boost I | 0.3% | +6% | None |
| `ProduceScaleBoostII` | Crop Size Boost II | 0.4% | +10% | None |
| `ProduceScaleBoostIII` | Crop Size Boost III | 0.5% | +14% | None |
| `SnowyCropSizeBoost` | Snowy Crop Size Boost | 0.8% | +12% | Frost |

**Note:** Larger crops = higher scale up to 100 (in-game indicator) = higher value (research needed for exact multipliers and scale effect)

#### Crop Mutation Boosts (4 abilities)

| Ability ID | Display Name | Mutation Chance Increase | Weather |
|------------|--------------|-------------------------|---------|
| `ProduceMutationBoost` | Crop Mutation Boost I | +10% | None |
| `ProduceMutationBoostII` | Crop Mutation Boost II | +15% | None |
| `ProduceMutationBoostIII` | Crop Mutation Boost III | +20% | None |
| `SnowyCropMutationBoost` | Snowy Crop Mutation Boost | +22% | Frost |

**Note:** Increases base chance of weather/lunar mutations (research needed for exact mechanics)

#### Seed Finders (4 abilities)

| Ability ID | Display Name | Proc Rate | Notes |
|------------|--------------|-----------|-------|
| `SeedFinderI` | Seed Finder I | 40% | Common seeds |
| `SeedFinderII` | Seed Finder II | 20% | Better seeds |
| `SeedFinderIII` | Seed Finder III | 10% | Rare seeds |
| `SeedFinderIV` | Seed Finder IV | **0.01%** | Ultra-rare |

**Detection Rules:**
- Plant Growth Boost present = faster crop cycles
- Mutation Granters present = valuable mutation farming
- Crop Mutation Boost = mutation hunting
- 2+ crop-related abilities = high confidence crop farming team

---

### 4. TIME REDUCTION (8 abilities)

**Note:** Renamed from "Turtle Farming" - there's no breeding in the game, only hatching

#### Egg Growth Boosts (4 abilities)

| Ability ID | Display Name | Proc Rate | Time Reduction | Weather |
|------------|--------------|-----------|----------------|---------|
| `EggGrowthBoost` | Egg Growth Boost I | 21% | -7 minutes | None |
| `EggGrowthBoostII_NEW` | Egg Growth Boost II | 24% | -9 minutes | None |
| `EggGrowthBoostII` | Egg Growth Boost III | 27% | -11 minutes | None |
| `SnowyEggGrowthBoost` | Snowy Egg Growth Boost | 35% | -10 minutes | Frost |

**Note:** Eggs must be placed in garden on tiles. EggGrowthBoostII was retroactively upgraded to III.

#### Plus: Plant Growth Boosts (4 abilities)

See Crop Farming section for Plant Growth Boost details.

**Detection Rules:**
- Egg Growth Boost present = eggs in garden
- Plant Growth Boost present = crop maturation acceleration
- Both present = comprehensive time reduction strategy

---

### 5. MUTATION GRANTERS (7 abilities)

#### Mutation Granters (5 abilities)

| Ability ID | Display Name | Proc Rate | Granted Mutation | Rarity |
|------------|--------------|-----------|------------------|--------|
| `RainDance` | Rain Granter | 10% | Wet | Common |
| `SnowGranter` | Snow Granter | 8% | Chilled | Uncommon |
| `FrostGranter` | Frost Granter | 6% | Frozen | Rare |
| `GoldGranter` | Gold Granter | **0.72%** | **Gold** | Ultra-Rare |
| `RainbowGranter` | Rainbow Granter | **0.72%** | **Rainbow** | Ultra-Rare |

**Value Hierarchy:** Rainbow is ultra-rare #1 priority, Gold ever so slightly less valuable

**Note:** Mutations increase crop sell price significantly (research needed for exact multipliers)

#### Plus: Crop Mutation Boosts (4 abilities)

See Crop Farming section for Crop Mutation Boost details.

#### Plus: Crop Size Boosts (4 abilities)

See Crop Farming section for Crop Size Boost details.

**Detection Rules:**
- Gold/Rainbow Granter = ultra-rare, high value (Rainbow #1, Gold slightly less)
- Crop Mutation Boost = increases base mutation chance
- Crop Size Boost = increases crop value
- Combined presence = mutation farming for maximum value

---

### 6. EFFICIENCY (17 abilities)

**Purpose:** Extended play sessions, long-term use, reducing manual input

#### Hunger Management (8 abilities)

**Hunger Boosts:**

| Ability ID | Display Name | Hunger Reduction | Weather |
|------------|--------------|------------------|---------|
| `HungerBoost` | Hunger Boost I | -12% | None |
| `HungerBoostII` | Hunger Boost II | -16% | None |
| `HungerBoostIII` | Hunger Boost III | -20% | None |
| `SnowyHungerBoost` | Snowy Hunger Boost | -30% | Frost |

**Hunger Restore:**

| Ability ID | Display Name | Proc Rate | Hunger Restore | Weather |
|------------|--------------|-----------|----------------|---------|
| `HungerRestore` | Hunger Restore I | 12% | +30% | None |
| `HungerRestoreII` | Hunger Restore II | 14% | +35% | None |
| `HungerRestoreIII` | Hunger Restore III | 16% | +40% | None |
| `SnowyHungerRestore` | Snowy Hunger Restore | 20% | +38% | Frost |

#### Plus: Other Efficiency Abilities

All abilities listed in their respective sections also contribute to efficiency:
- XP Boosts (passive XP gains)
- Mutation Granters (passive mutation application)
- Growth Boosts (time reduction)
- Crop Optimization (passive crop improvements)
- Seed Finders (passive seed acquisition)
- Coin Finders (passive coin generation)

**Detection Rules:**
- Hunger Boost + Hunger Restore = extended play sessions/overnight setup
- Multiple passive abilities = minimize manual input
- Key for long-term use: Hunger abilities prevent starvation during extended sessions

---

### 7. HATCHING OPTIMIZATION (9 abilities)

#### Hatch XP Boosts (3 abilities)

| Ability ID | Display Name | Proc Rate | Bonus XP | Trigger |
|------------|--------------|-----------|----------|---------|
| `PetAgeBoost` | Hatch XP Boost I | 50% | +8,000 XP | hatchEgg |
| `PetAgeBoostII` | Hatch XP Boost II | 60% | +12,000 XP | hatchEgg |
| `PetAgeBoostIII` | Hatch XP Boost III | 70% | +16,000 XP | hatchEgg |

#### Max Strength Boosts (3 abilities)

| Ability ID | Display Name | Proc Rate | Max STR Increase | Trigger |
|------------|--------------|-----------|------------------|---------|
| `PetHatchSizeBoost` | Max Strength Boost I | 12% | +2.4% | hatchEgg |
| `PetHatchSizeBoostII` | Max Strength Boost II | 14% | +3.5% | hatchEgg |
| `PetHatchSizeBoostIII` | Max Strength Boost III | 16% | +4.6% | hatchEgg |

#### Pet Mutation Boosts (3 abilities)

| Ability ID | Display Name | Mutation Chance Increase | Trigger |
|------------|--------------|-------------------------|---------|
| `PetMutationBoost` | Pet Mutation Boost I | +7% | hatchEgg |
| `PetMutationBoostII` | Pet Mutation Boost II | +10% | hatchEgg |
| `PetMutationBoostIII` | Pet Mutation Boost III | +13% | hatchEgg |

**Note:** Rainbow pet base chance 0.1%, gold pet base chance 1%

#### Pet Refunds (2 abilities)

| Ability ID | Display Name | Proc Rate | Effect | Trigger |
|------------|--------------|-----------|--------|---------|
| `PetRefund` | Pet Refund I | 5% | Get egg back after selling | sellPet |
| `PetRefundII` | Pet Refund II | 7% | Get egg back after selling | sellPet |

#### Double Hatch (1 ability)

| Ability ID | Display Name | Proc Rate | Effect | Trigger |
|------------|--------------|-----------|--------|---------|
| `DoubleHatch` | Double Hatch | 3% | Hatch 2 pets from 1 egg | hatchEgg |

**Note:** Both hatched pets run rainbow chance separately (research needed for optimal combos)

**Value Hierarchy:**
- **Late game:** Max Strength Boost > others (most sought-after)
- **Early game:** Hatch XP Boost (skips grind, overshadowed late-game)
- **Rainbow hunting:** Pet Mutation Boost + Double Hatch + Pet Refund combo

**Detection Rules:**
- Max Strength Boost = high value late-game optimization
- Pet Mutation Boost + Double Hatch + Pet Refund = rainbow hunting team
- Pet Refund = get egg back, retry rare eggs

---

### 8. SPECIAL/UTILITY (2 abilities)

#### Crop Eater (1 ability)

| Ability ID | Display Name | Proc Rate | Effect |
|------------|--------------|-----------|--------|
| `ProduceEater` | Crop Eater | 60% | +150% crop sell price |

**User Note:** "Usually unwanted as players prefer just getting the mutations on the produce/crops. Only kept if rainbow, sometimes gold."

#### Copycat (1 ability)

| Ability ID | Display Name | Proc Rate | Effect |
|------------|--------------|-----------|--------|
| `Copycat` | Copycat | 1% | Unknown (likely copies abilities) |

**User Note:** "Not used in game, don't display."

**Implementation:** Exclude Copycat from all detection, displays, and calculations.

---

## ABILITY TRIGGER TYPES

### Trigger Mechanics

Abilities activate based on different game events:

1. **continuous** (40 abilities)
   - Always active while pet is in active team
   - Examples: XP Boost, Coin Finder, Hunger Boost, Mutation Granters, Growth Boosts
   - Proc on timer-based intervals

2. **hatchEgg** (9 abilities)
   - Only triggers when hatching an egg
   - Examples: Hatch XP Boost, Max Strength Boost, Pet Mutation Boost, Double Hatch
   - Single-use per hatch event

3. **harvest** (1 ability)
   - Only triggers when harvesting crops
   - Example: Double Harvest
   - Procs on each harvest action

4. **sellAllCrops** (5 abilities)
   - Only triggers when selling all crops
   - Examples: Sell Boost (I-IV), Crop Refund
   - Procs during sell transaction

5. **sellPet** (2 abilities)
   - Only triggers when selling a pet
   - Examples: Pet Refund (I-II)
   - Procs during pet sale

### Trigger Type Distribution

| Trigger Type | Count | Purpose |
|--------------|-------|---------|
| continuous | 40 | Passive benefits, always active |
| hatchEgg | 9 | One-time hatching optimization |
| harvest | 1 | Crop harvesting boost |
| sellAllCrops | 5 | Selling transaction boost |
| sellPet | 2 | Pet sale refund chance |

---

## CRITICAL INTERACTIONS & COMBOS

### Combo 1: Coin Farming Synergy

**Abilities:**
- Double Harvest (5% on harvest)
- Crop Refund (20% on sell)

**Strategy:**
- Different triggers, same outcome: more crops = more coins
- Use Double Harvest team (3 pets) when harvesting
- Swap to Crop Refund + Sell Boost pets for selling
- Maximizes crop availability and sell value

**Detection Logic:**
- Double Harvest present = harvesting phase team
- Sell Boost + Crop Refund = selling phase team
- Player likely switches teams between harvest/sell

---

### Combo 2: Rainbow Hunting

**Abilities:**
- Pet Mutation Boost III (+13% to 0.1% base = 0.113%)
- Double Hatch (3% chance = 2 separate rainbow rolls)
- Pet Refund II (7% to retry rare eggs)

**Strategy:**
- Hatch with Mutation Boost to increase rainbow chance
- Double Hatch gives two separate rainbow rolls
- Sell unwanted pets, hope for refund to retry
- Each retry is another chance at rainbow

**Detection Logic:**
- Pet Mutation Boost + Double Hatch + Pet Refund = 95% confidence rainbow hunting
- Pet Refund alone = 60% confidence egg recycling strategy

---

### Combo 3: Extended Play Sessions

**Abilities:**
- Hunger Boost III (-20%)
- Hunger Restore III (+40%)
- Snowy variants even better during Frost

**Strategy:**
- Hunger Boost reduces hunger drain rate
- Hunger Restore procs periodically refill hunger
- Combined, keeps pets alive during long sessions
- Eliminates need for manual feeding

**Detection Logic:**
- Hunger Boost + Hunger Restore = 90% confidence extended play setup
- Multiple Hunger abilities = high confidence overnight/long-term team
- Key for extended play: Prevents pet starvation

---

### Combo 4: Mutation Farming

**Abilities:**
- Rainbow Granter (0.72%)
- Crop Mutation Boost III (+20%)
- Crop Size Boost (value multiplier)

**Strategy:**
- Rainbow Granter adds rainbow mutation to crops
- Mutation Boost increases chance of additional mutations
- Size Boost increases base crop value
- Rainbow + size = maximum coin value crops

**Detection Logic:**
- Rainbow/Gold Granter + Mutation Boost + Size Boost = 95% confidence mutation farming
- Mutation Granter alone = 70% confidence mutation focus
- Combined with Plant Growth Boost = optimized mutation farming cycle

---

## SPECIES-TO-ABILITY MAPPING

**Source:** `GameSourceFiles/.../faunaSpeciesDex.ts`

### Common Species

#### Worm
- **Abilities:** SeedFinderI (50 weight), ProduceEater (50 weight)
- **Maturity:** 12 hours
- **Diet:** Carrot, Strawberry, Aloe, Tomato, Apple
- **Value:** 5,000 coins
- **Usage:** Early-game seed finding, ProduceEater generally unwanted

#### Snail
- **Abilities:** CoinFinderI (100 weight)
- **Maturity:** 12 hours
- **Diet:** Blueberry, Tomato, Corn, Daffodil, Chrysanthemum
- **Value:** 10,000 coins
- **Usage:** Entry-level passive coin farming

#### Bee
- **Abilities:** ProduceScaleBoost (50 weight), ProduceMutationBoost (50 weight)
- **Maturity:** 12 hours
- **Flying:** true
- **Diet:** Strawberry, Blueberry, Daffodil, Lily, Chrysanthemum
- **Value:** 30,000 coins
- **Usage:** Early crop optimization (size + mutation chance)

---

### Uncommon Species

#### Chicken
- **Abilities:** EggGrowthBoost (80 weight), PetRefund (20 weight)
- **Maturity:** 24 hours
- **Diet:** Aloe, Corn, Watermelon, Pumpkin
- **Value:** 50,000 coins
- **Usage:** Egg hatching acceleration (not just turtles!)

#### Bunny
- **Abilities:** CoinFinderII (60 weight), SellBoostI (40 weight)
- **Maturity:** 24 hours
- **Diet:** Carrot, Strawberry, Blueberry, OrangeTulip, Apple
- **Value:** 75,000 coins
- **Usage:** Mid-tier coin farming (passive + sell boost)

#### Dragonfly
- **Abilities:** HungerRestore (70 weight), PetMutationBoost (30 weight)
- **Maturity:** 24 hours
- **Flying:** true
- **Diet:** Apple, OrangeTulip, Echeveria
- **Value:** 150,000 coins
- **Usage:** Extended play sessions (hunger management) + hatching optimization

---

### Rare Species

#### Pig
- **Abilities:** SellBoostII (30 weight), PetAgeBoost (30 weight), PetHatchSizeBoost (30 weight)
- **Maturity:** 72 hours
- **Diet:** Watermelon, Pumpkin, Mushroom, Bamboo
- **Value:** 500,000 coins
- **Weight:** 200.0
- **Usage:** Hatching optimization (XP + Max STR boost) or coin farming (sell boost)

#### Cow
- **Abilities:** SeedFinderII (30 weight), HungerBoost (30 weight), PlantGrowthBoost (30 weight)
- **Maturity:** 72 hours
- **Diet:** Coconut, Banana, BurrosTail, Mushroom
- **Value:** 1,000,000 coins
- **Weight:** 600.0
- **Usage:** Crop farming (seeds + growth) + extended play (hunger reduction)

#### Turkey
- **Abilities:** RainDance (60 weight), EggGrowthBoostII_NEW (35 weight), DoubleHatch (5 weight)
- **Maturity:** 72 hours
- **Diet:** FavaBean, Corn, Squash
- **Value:** 3,000,000 coins
- **Usage:** Mutation granting (Rain) + hatching optimization

---

### Legendary Species

#### Squirrel
- **Abilities:** CoinFinderIII (70 weight), SellBoostIII (20 weight), PetMutationBoostII (10 weight)
- **Maturity:** 100 hours
- **Diet:** Pumpkin, Banana, Grape
- **Value:** 5,000,000 coins
- **Usage:** High-tier coin farming + rainbow hunting

#### Turtle
- **Abilities:** (Species continues in game source - abilities not shown in excerpt)
- **Maturity:** (research needed)
- **Diet:** (research needed)
- **Value:** (research needed)
- **Usage:** Typically has Egg Growth Boost abilities

#### Peacock
- **Abilities:** Often has XP Boost abilities (research needed for full details)
- **Maturity:** (research needed)
- **Diet:** (research needed)
- **Value:** (research needed)
- **Usage:** XP farming teams

#### Goat
- **Abilities:** Can have XP Boost including Snowy variant (research needed for full details)
- **Maturity:** (research needed)
- **Diet:** (research needed)
- **Value:** (research needed)
- **Usage:** XP farming, especially during Frost weather

---

### Key Insights

1. **Ability Weights:** Higher weight = more likely to have that ability when hatched
2. **Rarity Correlation:** Legendary species have better/rarer abilities
3. **Species Specialization:** Each species has 2-3 innate abilities from specific pool
4. **Team Composition:** Understanding species helps optimize team building
5. **Multi-Purpose Species:** Some species (like Pig) have abilities across multiple categories

---

## RESEARCH NOTES

The following items require further investigation from game source or testing:

### Mechanics & Formulas

1. **Crop Size Boost exact multipliers** (Line 204)
   - How does scale (0-100 indicator) map to coin value?
   - What is the exact formula for scale → value conversion?
   - How do multiple Size Boosts stack?

2. **Crop Mutation Boost exact mechanics** (Line 215)
   - What is the base chance for each mutation type?
   - How does +10%/+15%/+20% apply (additive or multiplicative)?
   - Interaction with weather/lunar cycles?

3. **Mutation price multipliers** (Line 270)
   - Exact multiplier for each mutation (Wet, Chilled, Frozen, Gold, Rainbow)
   - Do mutations stack multiplicatively?
   - How does crop scale interact with mutations?

4. **Double Hatch mechanics** (Line 354)
   - Do both pets roll abilities independently?
   - Are mutation chances independent for both pets?
   - Optimal combo testing (Mutation Boost + Double Hatch + Refund)

### Species Data Completion

5. **Turtle full abilities** (Line 500)
   - Complete ability list with weights
   - Maturity time, diet, value
   - Confirmation: Does Turtle have Egg Growth Boost?

6. **Peacock full abilities** (Line 502-503)
   - Complete ability list with weights
   - Which XP Boost tiers available?
   - Maturity time, diet, value

7. **Goat full abilities** (Line 505-506)
   - Complete ability list with weights
   - Confirmation: Has Snowy XP Boost?
   - Maturity time, diet, value

8. **Other legendary species**
   - Capybara abilities, if exists
   - Any other legendary species in game source
   - Complete legendary tier ability distribution

### Detection Logic Validation

9. **Confidence thresholds** (Lines 144-146, 177-180)
   - Validate proposed confidence levels with user gameplay data
   - Test multi-category teams (e.g., XP + Coin Finder combo)
   - Edge cases where detection might fail

10. **Team switching patterns** (Line 180)
    - How common is harvest team → sell team switching?
    - Should extension detect team pairs (harvest + sell)?
    - UI implications for showing paired teams

### Weather System

11. **Snowy ability activation**
    - Exact weather condition check (is it only "Frost" or other conditions?)
    - Do Snowy abilities deactivate immediately when weather changes?
    - Interaction with weather prediction/planning

12. **Mutation Granter weather interaction**
    - Do Rain/Snow/Frost Granters work in any weather?
    - Or do they require matching weather to proc?
    - Testing needed for confirmation

### Future Expansion

13. **Ability stacking rules**
    - Can multiple pets with same ability stack effects?
    - Or does only highest tier apply?
    - Team composition optimization implications

14. **Pet position effects**
    - Does pet position in team (slot 1/2/3) affect proc rates?
    - Any hidden mechanics based on position?
    - Game source investigation needed

15. **Hunger drain formula**
    - Exact hunger drain rate per minute/hour
    - How do Hunger Boost percentages apply?
    - Formula for time until starvation with/without boosts

---

**End of Document**

*This reference should be updated as research items are resolved and new game mechanics are discovered.*
