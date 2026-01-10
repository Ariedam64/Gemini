# Complete Pet Abilities List - Quinoa Game

**Source:** `GameSourceFiles/gg-preview-pr-2329-router.magiccircle.workers.dev/common/games/Quinoa/systems/fauna/faunaAbilitiesDex.ts`

**Total Abilities:** 53 unique abilities
**Last Updated:** 2026-01-07

---

## Ability Categories & Analysis

### 1. COIN FINDER (4 abilities) - Passive Income

**Trigger:** Continuous (always active while pet is active)
**Purpose:** Find coins over time

| Ability ID | Display Name | Proc Rate | Max Coins Findable | Weather Required |
|------------|--------------|-----------|-------------------|------------------|
| `CoinFinderI` | Coin Finder I | 35% | 120,000 | None |
| `CoinFinderII` | Coin Finder II | 13% | 1,200,000 | None |
| `CoinFinderIII` | Coin Finder III | 6% | 10,000,000 | None |
| `SnowyCoinFinder` | Snowy Coin Finder | 15% | 5,000,000 | **Frost** |

**How it Works:**
- Pet has X% chance per time interval to find coins
- Amount found is random between 0 and Max Coins Findable
- Higher tiers have lower proc rate but MUCH higher max coins
- Snowy variant only works during Frost weather

**Team Purpose:** Passive coin farming

**Value Ranking:** III > Snowy > II > I

---

### 2. SEED FINDER (4 abilities) - Seed Gathering

**Trigger:** Continuous
**Purpose:** Find random seeds over time

| Ability ID | Display Name | Proc Rate | Special Notes |
|------------|--------------|-----------|---------------|
| `SeedFinderI` | Seed Finder I | 40% | Common seeds |
| `SeedFinderII` | Seed Finder II | 20% | Better seeds |
| `SeedFinderIII` | Seed Finder III | 10% | Rare seeds |
| `SeedFinderIV` | Seed Finder IV | **0.01%** | Ultra-rare! |

**How it Works:**
- Pet finds seeds automatically
- Lower proc rate = rarer/better seeds
- No weather restrictions

**Team Purpose:** Seed collection for planting

**Value Ranking:** IV (ultra-rare) > III > II > I

---

### 3. PLANT GROWTH BOOST (4 abilities) - Farming Speed

**Trigger:** Continuous
**Purpose:** Reduce crop growth time

| Ability ID | Display Name | Proc Rate | Growth Reduction | Weather Required |
|------------|--------------|-----------|------------------|------------------|
| `PlantGrowthBoost` | Plant Growth Boost I | 24% | -3 minutes | None |
| `PlantGrowthBoostII` | Plant Growth Boost II | 27% | -5 minutes | None |
| `PlantGrowthBoostIII` | Plant Growth Boost III | 30% | -7 minutes | None |
| `SnowyPlantGrowthBoost` | Snowy Plant Growth Boost | 40% | -6 minutes | **Frost** |

**How it Works:**
- When ability procs, reduces growth time of all active crops
- Higher tiers = more time reduction + higher proc rate
- Snowy variant has highest proc rate but only works in Frost

**Team Purpose:** Crop farming efficiency

**Value Ranking:** III > Snowy > II > I

---

### 4. CROP EATER (1 ability) - Sell Price Boost

**Trigger:** Continuous
**Purpose:** Increase crop sell price

| Ability ID | Display Name | Proc Rate | Price Increase |
|------------|--------------|-----------|----------------|
| `ProduceEater` | Crop Eater | 60% | +150% |

**How it Works:**
- When active pet eats crops, increases their sell price by 150%
- High proc rate

**Team Purpose:** Maximize coin gain from selling crops

**Value Ranking:** Unique ability, (usually unwanted as players prefer just getting the mutations on the produce/crops)

---

### 5. CROP SIZE BOOST (4 abilities) - Visual Scale

**Trigger:** Continuous
**Purpose:** Increase crop physical size (scale)

| Ability ID | Display Name | Proc Rate | Scale Increase | Weather Required |
|------------|--------------|-----------|----------------|------------------|
| `ProduceScaleBoost` | Crop Size Boost I | 0.3% | +6% | None |
| `ProduceScaleBoostII` | Crop Size Boost II | 0.4% | +10% | None |
| `ProduceScaleBoostIII` | Crop Size Boost III | 0.5% | +14% | None |
| `SnowyCropSizeBoost` | Snowy Crop Size Boost | 0.8% | +12% | **Frost** |

**How it Works:**
- Makes crops grow bigger visually
- Very low proc rates (0.3-0.8%)
- Larger crops = increases scale/weight, higher scale up to 100 (in game indicator) means higher value (do more research)

**Team Purpose:** Aesthetics / Collection

**Value Ranking:** III > Snowy > II > I

---

### 6. CROP MUTATION BOOST (4 abilities) - Mutation Hunting

**Trigger:** Continuous
**Purpose:** Increase chance of crops getting mutations

| Ability ID | Display Name | Mutation Chance Increase | Weather Required |
|------------|--------------|-------------------------|------------------|
| `ProduceMutationBoost` | Crop Mutation Boost I | +10% | None |
| `ProduceMutationBoostII` | Crop Mutation Boost II | +15% | None |
| `ProduceMutationBoostIII` | Crop Mutation Boost III | +20% | None |
| `SnowyCropMutationBoost` | Snowy Crop Mutation Boost | +22% | **Frost** |

**How it Works:**
- Increases probability of crops mutating
- No proc rate listed = increases the base chance of weather/lunar mutations (do more research to find out exactly how it works)
- Snowy variant is strongest

**Team Purpose:** Mutation farming / journal

**Value Ranking:** Snowy > III > II > I

---

### 7. EGG GROWTH BOOST (4 abilities) - Egg Hatching Speed

**Trigger:** Continuous
**Purpose:** Reduce egg hatch time (eggs must be placed in garden on a tile)

| Ability ID | Display Name | Proc Rate | Time Reduction | Weather Required |
|------------|--------------|-----------|----------------|------------------|
| `EggGrowthBoost` | Egg Growth Boost I | 21% | -7 minutes | None |
| `EggGrowthBoostII_NEW` | Egg Growth Boost II | 24% | -9 minutes | None |
| `EggGrowthBoostII` | Egg Growth Boost III | 27% | -11 minutes | None |
| `SnowyEggGrowthBoost` | Snowy Egg Growth Boost | 35% | -10 minutes | **Frost** |

**Special Note:** EggGrowthBoostII was retroactively upgraded to III, so there are two "II" IDs

**How it Works:**
- Reduces time for turtle eggs to hatch
- Higher tiers = faster hatching

**Team Purpose:** Hatching speed

**Value Ranking:** III (EggGrowthBoostII) > Snowy > II_NEW > I

---

### 8. PET XP BOOST (4 abilities) - Strength Leveling ⭐ CURRENT TRACKER

**Trigger:** Continuous
**Purpose:** Grant bonus XP to all active pets

| Ability ID | Display Name | Proc Rate | Bonus XP | Weather Required |
|------------|--------------|-----------|----------|------------------|
| `PetXpBoost` | XP Boost I | 30% | +300 XP | None |
| `PetXpBoostII` | XP Boost II | 35% | +400 XP | None |
| `PetXpBoostIII` | XP Boost III | 40% | +500 XP | None |
| `SnowyPetXpBoost` | Snowy XP Boost | 50% | +450 XP | **Frost** |

**How it Works:**
- Each proc grants bonus XP to ALL active pets (including self)
- Base XP is 3600/hour, boost adds extra XP per proc
- XP boost is strength-scaled (stronger pet = more bonus XP)

**Team Purpose:** XP farming / leveling pets quickly

**Value Ranking:** III > Snowy > II > I

**Current Implementation:** ✅ Fully tracked in XP Tracker feature

---

### 9. HUNGER BOOST (4 abilities) - Hunger Efficiency

**Trigger:** Continuous
**Purpose:** Reduce hunger depletion rate (pets eat less)

| Ability ID | Display Name | Hunger Reduction | Weather Required |
|------------|--------------|------------------|------------------|
| `HungerBoost` | Hunger Boost I | -12% | None |
| `HungerBoostII` | Hunger Boost II | -16% | None |
| `HungerBoostIII` | Hunger Boost III | -20% | None |
| `SnowyHungerBoost` | Snowy Hunger Boost | -30% | **Frost** |

**How it Works:**
- Pet's hunger depletes slower
- Means you need to feed less often
- No proc rate = always active

**Team Purpose:** Reducing feeding costs / AFKing overnight to keep pets alive

**Value Ranking:** Snowy > III > II > I

---

### 10. HUNGER RESTORE (4 abilities) - Auto-Feeding

**Trigger:** Continuous
**Purpose:** Restore hunger automatically over time

| Ability ID | Display Name | Proc Rate | Hunger Restore | Weather Required |
|------------|--------------|-----------|----------------|------------------|
| `HungerRestore` | Hunger Restore I | 12% | +30% | None |
| `HungerRestoreII` | Hunger Restore II | 14% | +35% | None |
| `HungerRestoreIII` | Hunger Restore III | 16% | +40% | None |
| `SnowyHungerRestore` | Snowy Hunger Restore | 20% | +38% | **Frost** |

**How it Works:**
- Pet automatically restores own hunger
- Can prevent starvation
- Synergizes with Hunger Boost

**Team Purpose:** AFKing overnight to keep pets alive / reducing feeding

**Value Ranking:** Snowy > III > II > I

---

### 11. PET MUTATION BOOST (3 abilities) - Breeding Mutations

**Trigger:** `hatchEgg` (only when hatching eggs)
**Purpose:** Increase chance of hatched pets having mutations

| Ability ID | Display Name | Mutation Chance Increase |
|------------|--------------|-------------------------|
| `PetMutationBoost` | Pet Mutation Boost I | +7% |
| `PetMutationBoostII` | Pet Mutation Boost II | +10% |
| `PetMutationBoostIII` | Pet Mutation Boost III | +13% |

**How it Works:**
- Only activates when you hatch an egg
- Increases chance new pet will have mutations (rainbow base chance 0.1%, gold base chance 1%)
- Not weather-dependent

**Team Purpose:** Rare pet mutation hunting (rainbow gold pet mutations correspond to the Rainbow Granter and Gold Granter abilities which are both valuable (rainbow more so))

**Value Ranking:** III > II > I

---

### 12. SELL BOOST (4 abilities) - Crop Sale Multiplier

**Trigger:** `sellAllCrops` (when you sell crops)
**Purpose:** Increase crop sell price when selling

| Ability ID | Display Name | Proc Rate | Price Increase |
|------------|--------------|-----------|----------------|
| `SellBoostI` | Sell Boost I | 10% | +20% |
| `SellBoostII` | Sell Boost II | 12% | +30% |
| `SellBoostIII` | Sell Boost III | 14% | +40% |
| `SellBoostIV` | Sell Boost IV | 16% | +50% |

**How it Works:**
- Only activates when you sell all crops
- Chance to increase sell price


**Team Purpose:** Coin farming from crops / increasing sell price of crops (aka produce)

**Value Ranking:** IV > III > II > I

---

### 13. CROP REFUND (1 ability) - Get Crops Back

**Trigger:** `sellAllCrops`
**Purpose:** Chance to get crops back after selling

| Ability ID | Display Name | Proc Rate |
|------------|--------------|-----------|
| `ProduceRefund` | Crop Refund | 20% |

**How it Works:** (essentially the same as double harvest just different actions to get the same outcome, even though these are similar we need to be very aware of how they act/interact)
- 20% chance when selling crops to get them back
- Essentially free coins

**Team Purpose:** Coin farming efficiency

**Value Ranking:** Unique, very valuable

---

### 14. DOUBLE HARVEST (1 ability) - Harvest Multiplier 

**Trigger:** `harvest` (when harvesting crops)
**Purpose:** Chance to double the harvest yield

| Ability ID | Display Name | Proc Rate |
|------------|--------------|-----------|
| `DoubleHarvest` | Double Harvest | 5% |

**How it Works:**
- 5% chance when harvesting to get double crops
- Low proc but very valuable

**Team Purpose:** Crop farming efficiency (essentially the same as crop refund just different actions to get the same outcome, even though these are similar we need to be very aware of how they act/interact)

**Value Ranking:** Unique, valuable

---

### 15. HATCH XP BOOST (3 abilities) - Baby Pet Leveling

**Trigger:** `hatchEgg` (when hatching eggs)
**Purpose:** Grant bonus XP to newly hatched pets

| Ability ID | Display Name | Proc Rate | Bonus XP |
|------------|--------------|-----------|----------|
| `PetAgeBoost` | Hatch XP Boost I | 50% | +8,000 XP |
| `PetAgeBoostII` | Hatch XP Boost II | 60% | +12,000 XP |
| `PetAgeBoostIII` | Hatch XP Boost III | 70% | +16,000 XP |

**How it Works:** 
- When egg hatches, pet starts with bonus XP
- High proc rates
- Skips early leveling grind

**Team Purpose:**  fast leveling / not the most useful late game (gets overshadowed by Max STR boost)

**Value Ranking:** III > II > I

---

### 16. MAX STRENGTH BOOST (3 abilities) - Strength Cap Increase

**Trigger:** `hatchEgg`
**Purpose:** Increase max strength of hatched pets

| Ability ID | Display Name | Proc Rate | Max STR Increase |
|------------|--------------|-----------|------------------|
| `PetHatchSizeBoost` | Max Strength Boost I | 12% | +2.4% |
| `PetHatchSizeBoostII` | Max Strength Boost II | 14% | +3.5% |
| `PetHatchSizeBoostIII` | Max Strength Boost III | 16% | +4.6% |

**How it Works:**
- Hatched pets have a chance to reach higher max strength (research how the STR works for hatching properly if you need more understanding)


**Team Purpose:** Have a chance at getting a higher STR pet hatched out of an egg (one of the most saught after for high max STR abilities for hatching)

**Value Ranking:** III > II > I

---

### 17. DOUBLE HATCH (1 ability) - Twin Pets

**Trigger:** `hatchEgg`
**Purpose:** Chance to hatch 2 pets from 1 egg

| Ability ID | Display Name | Proc Rate |
|------------|--------------|-----------|
| `DoubleHatch` | Double Hatch | 3% |

**How it Works:**
- 3% chance to get 2 pets from 1 egg
- Very rare but extremely valuable
- Essentially free pet
- not yet explored what the 'best combination' for hatching a rainbow pet is yet, since when the double hatch does proc, both hatched pets from one egg run the rainbow chance seperately/individually so so much research is still yet to be done on hatching and this topic etc)

**Team Purpose:** Egg Hatching

**Value Ranking:** Unique, rare, very valuable

---

### 18. PET REFUND (2 abilities) - Get Pet Back After Selling

**Trigger:** `sellPet` (when selling a pet)
**Purpose:** Chance to get egg that pet belongs to back after selling

| Ability ID | Display Name | Proc Rate |
|------------|--------------|-----------|
| `PetRefund` | Pet Refund I | 5% |
| `PetRefundII` | Pet Refund II | 7% |

**How it Works:**
- Chance to get egg that pet belongs to back after selling
- Get coins AND keep get to retry chances on the egg type 
- Low proc but very valuable
- most people use this when selling pets to get the egg back and retry their luck if its a rarer egg type and to also maximise their chance at getting rainbows (more chances etc)

**Team Purpose:** Gain eggs back when selling, retry your luck with rarer eggs if it procs

**Value Ranking:** II > I

---

### 19. MUTATION GRANTERS (5 abilities) - Guaranteed Mutations

**Trigger:** Continuous
**Purpose:** Grant specific mutations to crops

| Ability ID | Display Name | Proc Rate | Granted Mutation | Rarity |
|------------|--------------|-----------|------------------|--------|
| `RainDance` | Rain Granter | 10% | Wet | Common |
| `SnowGranter` | Snow Granter | 8% | Chilled | Uncommon |
| `FrostGranter` | Frost Granter | 6% | Frozen | Rare |
| `GoldGranter` | Gold Granter | **0.72%** | **Gold** | Ultra-Rare |
| `RainbowGranter` | Rainbow Granter | **0.72%** | **Rainbow** | Ultra-Rare |

**How it Works:**
- Pet grants specific mutation to crops
- Lower proc = rarer mutation
- Gold/Rainbow are extremely rare and valuable, rainbow being the most

**Team Purpose:** Mutation hunting / collection / Coin farming (crops/produce) 

**Value Ranking:** Gold/Rainbow (rainbow #1) > Frost > Snow > Rain
(check how the mutations increase the value of crops to get a better understanding)
---

### 20. COPYCAT (1 ability) - Ability Copying (not used in game dont display)

**Trigger:** Continuous
**Purpose:** Unknown - possibly copies other pets' abilities?

| Ability ID | Display Name | Proc Rate | Parameters |
|------------|--------------|-----------|------------|
| `Copycat` | Copycat | 1% | None listed |

**How it Works:**
- **UNCLEAR** - no parameters defined
- Likely copies abilities from other active pets
- Very low proc rate

**Team Purpose:** Unknown - needs research

**Value Ranking:** Unknown

---

## Summary by Category

### 🪙 COINS 
- Coin Finder (I/II/III/Snowy)
- Sell Boost (I/II/III/IV)
- Crop Refund

### 🌱 GARDEN 
- Plant Growth Boost (I/II/III/Snowy)
- Crop Size Boost (I/II/III/Snowy)
- Crop Mutation Boost (I/II/III/Snowy)
- Seed Finder (I/II/III/IV)
- Double Harvest

###    EGGS & HATCHING 
- Hatch XP Boost (I/II/III)
- Max Strength Boost (I/II/III)
- Double Hatch
- Pet Mutation Boost (I/II/III)
- Egg Growth Boost (I/II/III/Snowy)
- Pet Refund (I/II)

### ⚡ XP  
- Pet XP Boost (I/II/III/Snowy)

### 🍖 FOOD 
- Hunger Boost (I/II/III/Snowy)
- Hunger Restore (I/II/III/Snowy)

### 🎨 GRANTERS (sort of linked with Garden)
- Rain/Snow/Frost/Gold/Rainbow Granter

### unwanted
- Crop Eater (usually only kept if rainbow, sometimes gold based on situation)

### ❓ SPECIAL not used dont display
- Copycat

---

## Weather-Dependent Abilities (9 total)

All require **Frost** weather:
1. Snowy Coin Finder
2. Snowy Plant Growth Boost
3. Snowy Crop Size Boost
4. Snowy Crop Mutation Boost
5. Snowy Egg Growth Boost
6. Snowy Pet XP Boost
7. Snowy Hunger Boost
8. Snowy Hunger Restore

**Note:** Snowy abilities are generally strong but ONLY work during Frost weather, making them situational.

---

## Trigger Types

### 1. `continuous` (40 abilities)
- Always active while pet is active
- Most common trigger type
- Includes: Coin Finder, Seed Finder, Growth Boosts, XP Boost, Hunger, Mutation Granters

### 2. `hatchEgg` (9 abilities)
- Only activates when hatching an egg
- Includes: Pet Mutation Boost, Hatch XP Boost, Max STR Boost, Double Hatch

### 3. `harvest` (1 ability)
- Only activates when harvesting crops
- Includes: Double Harvest

### 4. `sellAllCrops` (5 abilities)
- Only activates when selling all crops
- Includes: Sell Boost, Crop Refund

### 5. `sellPet` (2 abilities)
- Only activates when selling a pet
- Includes: Pet Refund

---

## Proc Rate Analysis

### Very High (30%+)
- Coin Finder I (35%), Seed Finder I (40%), Crop Eater (60%)
- Common abilities that trigger frequently

### High (10-30%)
- Most tier I/II abilities
- Weather-dependent Snowy abilities (35-50%)

### Medium (5-10%)
- Tier III abilities
- Double Harvest (5%), Frost Granter (6%)

### Low (1-5%)
- Coin Finder III (6%), Double Hatch (3%), Copycat (1%)

### Ultra-Low (<1%)
- Crop Size Boost (0.3-0.8%)
- Gold/Rainbow Granter (0.72%)
- Seed Finder IV (0.01%)

---

## ✅ USER CATEGORIZATION COMPLETE

### Purpose-Based Ability Categories

**Note:** Many abilities serve multiple purposes. This categorization reflects primary and secondary use cases.

---

#### 1. **XP Farming** - Leveling pets quickly

| Ability Group | Abilities |
|--------------|-----------|
| XP Boost | Pet XP Boost (I/II/III/Snowy) |

**Detection Rules:**
- Team has 1+ XP Boost pets
- Team has pets below max strength
- High confidence if 2+ XP Boost pets

---

#### 2. **Coin Farming** - Maximizing coin generation

| Ability Group | Abilities |
|--------------|-----------|
| Coin Finder | Coin Finder (I/II/III/Snowy) |
| Sell Boost | Sell Boost (I/II/III/IV) |
| Crop Refund | Crop Refund |
| Double Harvest | Double Harvest |

**Detection Rules:**
- Team has Coin Finder pets
- Team has Sell Boost + crop-growing pets
- Crop Refund + Double Harvest combo = high coin farming confidence

**Note:** Double Harvest and Crop Refund have similar outcomes but different triggers (harvest vs sell)

---

#### 3. **Crop Farming** - Growing and harvesting crops efficiently

| Ability Group | Abilities |
|--------------|-----------|
| Mutation Granters | Rain/Snow/Frost/Gold/Rainbow Granter |
| Plant Growth Boost | Plant Growth Boost (I/II/III/Snowy) |
| Crop Size Boost | Crop Size Boost (I/II/III/Snowy) |
| Crop Mutation Boost | Crop Mutation Boost (I/II/III/Snowy) |
| Seed Finder | Seed Finder (I/II/III/IV) |
| Double Harvest | Double Harvest |

**Detection Rules:**
- Team has Plant Growth Boost (faster crops)
- Team has Mutation Granters (valuable mutations)
- Team has Crop Mutation Boost (mutation hunting)
- High confidence if 2+ crop-related abilities

**Note:** Crop Size Boost increases scale/weight (up to 100 in-game indicator) which affects crop value

---

#### 4. **Time Reduction** - Reducing wait times (formerly "Turtle Farming")

**Renamed because:** Multiple pet species (not just turtles) have eggs, and there's no breeding in-game (only hatching).

| Ability Group | Abilities |
|--------------|-----------|
| Plant Growth Boost | Plant Growth Boost (I/II/III/Snowy) |
| Egg Growth Boost | Egg Growth Boost (I/II/III/Snowy) |

**Detection Rules:**
- Team has Egg Growth Boost (eggs placed in garden)
- Team has Plant Growth Boost (crop maturation)
- Purpose: Reduce waiting time for crops/eggs

---

#### 5. **Mutation Hunting** - Obtaining rare mutations

| Ability Group | Abilities |
|--------------|-----------|
| Rare Mutation Granters | Frost Granter, Gold Granter, Rainbow Granter |
| Crop Size Boost | Crop Size Boost (I/II/III/Snowy) |
| Crop Mutation Boost | Crop Mutation Boost (I/II/III/Snowy) |

**Detection Rules:**
- Team has Gold/Rainbow Granter (ultra-rare, rainbow #1 priority)
- Team has Crop Mutation Boost (increases base weather/lunar mutation chance)
- Purpose: Collect rare mutations for journal/value

**Value Hierarchy:** Rainbow > Gold > Frost > Snow > Rain

**Note:** Mutations increase crop value significantly (needs more research on exact multipliers)

---

#### 6. **Efficiency** - Long-term use, AFK farming, reducing manual input

| Ability Group | Abilities |
|--------------|-----------|
| XP Boost | Pet XP Boost (I/II/III/Snowy) |
| Hunger Management | Hunger Boost (I/II/III/Snowy), Hunger Restore (I/II/III/Snowy) |
| Mutation Granters | Frost/Gold/Rainbow Granter |
| Growth Boosts | Plant Growth Boost (I/II/III/Snowy), Egg Growth Boost (I/II/III/Snowy) |
| Crop Optimization | Crop Size Boost (I/II/III/Snowy), Crop Mutation Boost (I/II/III/Snowy) |
| Seed Collection | Seed Finder (I/II/III/IV) |
| Passive Income | Coin Finder (I/II/III/Snowy) |

**Detection Rules:**
- Team has Hunger Boost + Hunger Restore (AFK overnight, keep pets alive)
- Team has multiple passive abilities (Coin Finder, Granters)
- Purpose: Minimize manual input, maximize gains over time

**Key for AFK:** Hunger abilities prevent starvation during long sessions

---

#### 7. **Hatching Optimization** - Maximizing egg hatching outcomes

| Ability Group | Abilities |
|--------------|-----------|
| Hatch XP Boost | Hatch XP Boost (I/II/III) |
| Max Strength Boost | Max Strength Boost (I/II/III) |
| Double Hatch | Double Hatch |
| Pet Mutation Boost | Pet Mutation Boost (I/II/III) |
| Pet Refund | Pet Refund (I/II) |

**Detection Rules:**
- Team has Max Strength Boost (most sought-after for high max STR)
- Team has Pet Mutation Boost (rainbow 0.1% base, gold 1% base)
- Team has Pet Refund (get egg back, retry rare eggs for rainbow hunting)
- Team has Double Hatch (ultra-rare 3%, both pets run rainbow chance separately)

**Value Hierarchy:**
- **Late game:** Max Strength Boost > others
- **Early game:** Hatch XP Boost (skips early grind, but overshadowed late-game)
- **Rainbow hunting:** Pet Mutation Boost + Double Hatch + Pet Refund combo

**Note:** Best hatching combinations for rainbow pets still under research. Double Hatch gives 2 separate rainbow chances per egg.

---

#### 8. **Special/Utility** - Edge cases and unused

| Category | Abilities | Status |
|----------|-----------|--------|
| Unwanted | Crop Eater | Usually avoided (only kept if rainbow/gold mutation) |
| Not Used | Copycat | Not used in game - DO NOT DISPLAY |

**Crop Eater Note:** Players prefer getting mutations on crops rather than eating them for price boost. Only valuable if the pet itself has rainbow/gold mutation.

---

## Ability Ownership & Pet Species

**IMPORTANT:** Different pet species have access to different abilities. Understanding species-to-ability mapping is critical for:
- Team composition optimization
- Ability rarity assessment
- Breeding/hatching strategies

**Examples:**
- Peacock: Often has XP Boost abilities
- Goat: Can have XP Boost (including Snowy variant)
- Chicken: Has Egg Growth Boost (not just turtles!)
- Various species: Mutation Granters (Rainbow/Gold are ultra-rare on any species)

**TODO:** Research complete species-to-ability mapping for accurate team analysis.

---

## Critical Interactions & Combos

### Combo 1: Coin Farming Synergy
- **Double Harvest** (5% on harvest) + **Crop Refund** (20% on sell)
- Different triggers, same outcome: more crops = more coins
- Awareness needed: both abilities interact with crop economy differently

### Combo 2: Rainbow Hunting
- **Pet Mutation Boost III** (+13% to 0.1% base = 0.113% per hatch)
- **Double Hatch** (3% chance = 2 separate rainbow rolls)
- **Pet Refund II** (7% chance to retry rare eggs)
- **Strategy:** Sell unwanted pets from rare eggs, hope for refund, retry for rainbow

### Combo 3: AFK Overnight
- **Hunger Boost III** (-20% depletion) + **Hunger Restore III** (40% restore)
- **Snowy variants** even better during Frost weather
- Keeps pets alive during long AFK sessions

### Combo 4: Mutation Farming
- **Rainbow Granter** (0.72% proc) + **Crop Mutation Boost III** (+20%)
- **Crop Size Boost** (increases value) + mutations (increases value further)
- High-value crops for coin farming

---

## Research Needed (User Flagged)

1. **Crop Mutation Boost** - Exact mechanics of base weather/lunar mutation chance increase
2. **Crop Size Boost** - Exact value multiplier for scale 1-100
3. **Mutation Value Multipliers** - How much do mutations increase crop sell price?
4. **Max Strength Hatching** - Exact mechanics of STR inheritance and boost application
5. **Rainbow Hatching Combos** - Best ability combinations for maximizing rainbow pet chance
6. **Species-to-Ability Map** - Complete mapping of which species can have which abilities
7. **Copycat Ability** - Mechanics (though not used in game, good to document)

---

## Implementation Notes for Team Detection

When building `detectTeamPurpose()`:

1. **Weight abilities by rarity**
   - Rainbow Granter (0.72%) = ultra-rare = high confidence
   - Plant Growth I (24%) = common = lower confidence

2. **Consider ability tiers**
   - Tier III/IV abilities indicate serious optimization
   - Tier I abilities may be placeholders

3. **Detect combos**
   - XP Boost + low-STR pets = XP farming
   - Hunger Boost + Hunger Restore = AFK setup
   - Double Hatch + Pet Refund = rainbow hunting

4. **Multi-purpose teams**
   - Many teams serve 2-3 purposes
   - Use confidence scores, not binary categorization
   - Example: Team with Plant Growth + Coin Finder = Crop Farming (60%) + Coin Farming (40%)

5. **Exclude unwanted/unused**
   - Ignore Crop Eater (unless rainbow/gold mutation)
   - Never display Copycat

---

## Next Steps

✅ **Categorization Complete**
✅ **User notes incorporated**

**Ready for:**
1. Team purpose detection algorithm implementation
2. Smart feature display rules
3. Visual mockups for feature panels
4. Intelligent auto-detection based on team composition
