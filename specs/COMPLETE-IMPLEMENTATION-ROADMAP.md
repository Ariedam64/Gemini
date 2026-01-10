# COMPLETE IMPLEMENTATION ROADMAP
# XP Tracker Refinements & Extensible Pet Feature System

**Status:** ✅ Ready for Implementation
**Created:** 2026-01-07
**Consolidated From:** All user-updated specs + game source + current implementation
**Purpose:** Single source of truth for implementation

---

## TABLE OF CONTENTS

1. [Executive Summary](#executive-summary)
2. [User Decisions & Requirements](#user-decisions--requirements)
3. [Complete Ability System (53 Abilities)](#complete-ability-system)
4. [Species-to-Ability Mapping](#species-to-ability-mapping)
5. [Current Implementation Analysis](#current-implementation-analysis)
6. [Base Template System](#base-template-system)
7. [Phase 1: Immediate Refinements (22 Tasks)](#phase-1-immediate-refinements)
8. [Phase 2: Extensible Architecture](#phase-2-extensible-architecture)
9. [Complete Implementation Code](#complete-implementation-code)
10. [Gemini Compliance Verification](#gemini-compliance-verification)
11. [Testing Strategy](#testing-strategy)
12. [Implementation Checklist](#implementation-checklist)

---

## EXECUTIVE SUMMARY

### What We're Building

**Phase 1 (6-8 hours):** XP Tracker UI refinements + Base template system
**Phase 2 (8-12 hours):** Team purpose detection + Feature panel registry

### Current State (✅ Working)

- **XP Tracker:** Fully functional, displays inline in Pets section
  - Location: `src/features/xpTracker/` + `src/ui/sections/Pets/parts/TeamXpPanel.ts`
  - Features: XP calculations, team XP data, expandable panels, auto-updates (3s), sprites with mutations
  - Max 5 expanded teams (FIFO), progress bars, time/feed estimates, XP Boost detection (I/II/III/Snowy)

- **Pet Team Management:** Full CRUD operations
  - Location: `src/features/petTeam/`
  - API: `MGPetTeam` with createTeam, updateTeam, deleteTeam, renameTeam, getTeam, getAllTeams, etc.
  - Data: `PetTeam { id, name, petIds: [string, string, string], createdAt, updatedAt }`

### Key Technical Details

```typescript
// Constants
MAX_PETS_PER_TEAM = 3;
EMPTY_SLOT = '';
XP_PER_HOUR = 3600; // Base XP rate

// Team Data Structure
interface PetTeam {
    id: string;             // UUID v4
    name: string;           // Unique team name
    petIds: [string, string, string];  // Exactly 3 slots
    createdAt: number;      // Timestamp
    updatedAt: number;      // Timestamp
}

// UnifiedPet (from Globals.myPets.get())
interface UnifiedPet {
    id: string;
    petSpecies: string;
    name: string | null;
    xp: number;
    hunger: number;
    mutations: string[];
    targetScale: number;
    abilities: string[];
    location: 'active' | 'inventory' | 'hutch';
    position: {x: number, y: number} | null;
    growthStage: number;
    currentStrength: number;
    maxStrength: number;
    isMature: boolean;
}
```

---

## USER DECISIONS & REQUIREMENTS

### ✅ Confirmed from User's Doc Updates

**From XP-Tracker-Refinement-and-Extensibility.md:**

1. **Card Dividers:** Option A - Remove all dividers ✅
2. **Theme Colors:** Option A - Use semantic variables (--accent, --fg, --pill-to) ✅
3. **Merge Components:** Clarified - expand button drops panel below with 3 pet slots ✅
4. **Purpose Detection:** Needs ability categorization first (user provided complete categorization) ✅
5. **Feature Tab Position:** Clarified - user confused about "feature tab", confirmed Pets section header stays as-is ✅

**From Template-Layout-Refinements.md:**

1. **STR Display:** Goes UNDER sprite/badges (not next to name) ✅
   ```
   [Sprite]
   [MAX]
   [⚡II]
   STR: 91/91  ← HERE
   ```

2. **Keep Current Layout:** NO restructuring of XP tracker horizontal layout ✅
3. **Template Concept:** Base template provides sprite + name + STR, features populate content area below ✅

**From All-Pet-Abilities-Complete-List.md:**

1. **Categorization Complete:** All 53 abilities categorized into 8 purpose groups ✅
2. **Critical Notes:**
   - "there's no such thing as breeding in the game" (only hatching)
   - Crop Eater "usually unwanted as players prefer just getting the mutations"
   - "Time Reduction" (renamed from "Turtle Farming")
   - Copycat: "not used in game dont display"
   - Rainbow Granter is #1 priority mutation

---

## COMPLETE ABILITY SYSTEM

### All 53 Pet Abilities (from Game Source)

**Source:** `GameSourceFiles/.../faunaAbilitiesDex.ts`

#### 1. XP FARMING (4 abilities) - ✅ Currently Tracked

| Ability ID | Display Name | Proc Rate | Bonus XP | Weather |
|------------|--------------|-----------|----------|---------|
| `PetXpBoost` | XP Boost I | 30% | +300 XP | None |
| `PetXpBoostII` | XP Boost II | 35% | +400 XP | None |
| `PetXpBoostIII` | XP Boost III | 40% | +500 XP | None |
| `SnowyPetXpBoost` | Snowy XP Boost | 50% | +450 XP | Frost |

**How it Works:**
- Each proc grants bonus XP to ALL active pets (including self)
- XP is strength-scaled: `actualXpPerProc = floor(baseXpPerProc * (petStrength / 100))`
- Expected XP/hr = `(procRate / 100) * 60 * actualXpPerProc`
- Snowy variant only active during Frost weather

**Detection Rules:**
- 2+ XP Boost pets = 90% confidence XP farming team
- 1 XP Boost + leveling pets = 70% confidence
- 2+ pets below max STR = 50% confidence (maybe change to 25 or 30% confidence as quite a lot of the time players run 3 pets that arent quite THEIR specific max STR)

---

#### 2. COIN FARMING (6 abilities)

**Coin Finders (4 abilities):**

| Ability ID | Display Name | Proc Rate | Max Coins | Weather |
|------------|--------------|-----------|-----------|---------|
| `CoinFinderI` | Coin Finder I | 35% | 120,000 | None |
| `CoinFinderII` | Coin Finder II | 13% | 1,200,000 | None |
| `CoinFinderIII` | Coin Finder III | 6% | 10,000,000 | None |
| `SnowyCoinFinder` | Snowy Coin Finder | 15% | 5,000,000 | Frost |

**Sell Boosts (4 abilities):**

| Ability ID | Display Name | Proc Rate | Price Increase | Trigger |
|------------|--------------|-----------|----------------|---------|
| `SellBoostI` | Sell Boost I | 10% | +20% | sellAllCrops |
| `SellBoostII` | Sell Boost II | 12% | +30% | sellAllCrops |
| `SellBoostIII` | Sell Boost III | 14% | +40% | sellAllCrops |
| `SellBoostIV` | Sell Boost IV | 16% | +50% | sellAllCrops |

**Other Coin Abilities:**

| Ability ID | Display Name | Proc Rate | Effect | Trigger |
|------------|--------------|-----------|--------|---------|
| `ProduceRefund` | Crop Refund | 20% | Get crops back after selling | sellAllCrops |
| `DoubleHarvest` | Double Harvest | 5% | Double crop yield | harvest |

**Detection Rules:**
- Coin Finder pets present
- Sell Boost + crop-growing abilities
- Crop Refund + Double Harvest combo = high confidence (this is incorrect, i just wanted to note the interactions between these two, if sell boost + crop refund combo is seen its most likely a selling combo, double harvest is IDEALLY seen in a team of 3 when harvesting, then using a mix of crop refund and sell boost pets to sell)

---

#### 3. CROP FARMING (13 abilities)

**Plant Growth Boosts (4 abilities):**

| Ability ID | Display Name | Proc Rate | Time Reduction | Weather |
|------------|--------------|-----------|----------------|---------|
| `PlantGrowthBoost` | Plant Growth Boost I | 24% | -3 minutes | None |
| `PlantGrowthBoostII` | Plant Growth Boost II | 27% | -5 minutes | None |
| `PlantGrowthBoostIII` | Plant Growth Boost III | 30% | -7 minutes | None |
| `SnowyPlantGrowthBoost` | Snowy Plant Growth Boost | 40% | -6 minutes | Frost |

**Crop Size Boosts (4 abilities):**

| Ability ID | Display Name | Proc Rate | Scale Increase | Weather |
|------------|--------------|-----------|----------------|---------|
| `ProduceScaleBoost` | Crop Size Boost I | 0.3% | +6% | None |
| `ProduceScaleBoostII` | Crop Size Boost II | 0.4% | +10% | None |
| `ProduceScaleBoostIII` | Crop Size Boost III | 0.5% | +14% | None |
| `SnowyCropSizeBoost` | Snowy Crop Size Boost | 0.8% | +12% | Frost |

**Note:** Larger crops = higher scale up to 100 (in-game indicator) = higher value (research needed for exact multipliers and scale effect)

**Crop Mutation Boosts (4 abilities):**

| Ability ID | Display Name | Mutation Chance Increase | Weather |
|------------|--------------|-------------------------|---------|
| `ProduceMutationBoost` | Crop Mutation Boost I | +10% | None |
| `ProduceMutationBoostII` | Crop Mutation Boost II | +15% | None |
| `ProduceMutationBoostIII` | Crop Mutation Boost III | +20% | None |
| `SnowyCropMutationBoost` | Snowy Crop Mutation Boost | +22% | Frost |

**Note:** Increases base chance of weather/lunar mutations (research needed for exact mechanics)

**Seed Finders (4 abilities):**

| Ability ID | Display Name | Proc Rate | Notes |
|------------|--------------|-----------|-------|
| `SeedFinderI` | Seed Finder I | 40% | Common seeds |
| `SeedFinderII` | Seed Finder II | 20% | Better seeds |
| `SeedFinderIII` | Seed Finder III | 10% | Rare seeds |
| `SeedFinderIV` | Seed Finder IV | **0.01%** | Ultra-rare |

**Detection Rules:**
- Plant Growth Boost present (faster crops)
- Mutation Granters present (valuable mutations)
- Crop Mutation Boost (mutation hunting)
- 2+ crop-related abilities = high confidence

---

#### 4. TIME REDUCTION (8 abilities)
*(Renamed from "Turtle Farming" - user clarification: there's no breeding, only hatching)*

**Egg Growth Boosts (4 abilities):**

| Ability ID | Display Name | Proc Rate | Time Reduction | Weather |
|------------|--------------|-----------|----------------|---------|
| `EggGrowthBoost` | Egg Growth Boost I | 21% | -7 minutes | None |
| `EggGrowthBoostII_NEW` | Egg Growth Boost II | 24% | -9 minutes | None |
| `EggGrowthBoostII` | Egg Growth Boost III | 27% | -11 minutes | None |
| `SnowyEggGrowthBoost` | Snowy Egg Growth Boost | 35% | -10 minutes | Frost |

**Note:** Eggs must be placed in garden on tiles. EggGrowthBoostII was retroactively upgraded to III.

**Plus:** Plant Growth Boosts (already listed in Crop Farming section)

**Detection Rules:**
- Egg Growth Boost present (eggs in garden)
- Plant Growth Boost present (crop maturation)

---

#### 5. MUTATION HUNTING - rename to 'MUTATION GRANTERS' (7 abilities)

**Mutation Granters (5 abilities):**

| Ability ID | Display Name | Proc Rate | Granted Mutation | Rarity |
|------------|--------------|-----------|------------------|--------|
| `RainDance` | Rain Granter | 10% | Wet | Common |
| `SnowGranter` | Snow Granter | 8% | Chilled | Uncommon |
| `FrostGranter` | Frost Granter | 6% | Frozen | Rare |
| `GoldGranter` | Gold Granter | **0.72%** | **Gold** | Ultra-Rare |
| `RainbowGranter` | Rainbow Granter | **0.72%** | **Rainbow** | Ultra-Rare |

**Value Hierarchy:** Rainbow (#1 priority) > Gold > Frost > Snow > Rain

**Note:** Mutations increase crop sell price significantly (research needed for exact multipliers)

**Plus:**
- Crop Mutation Boosts (4 abilities - listed in Crop Farming)
- Crop Size Boosts (4 abilities - listed in Crop Farming)

**Detection Rules:**
- Gold/Rainbow Granter = rainbow is ultra-rare, high value gold ever so slightly less
- Crop Mutation Boost increases base mutation chance
- Crop Size Boost increases value

---

#### 6. EFFICIENCY (17 abilities)
*AFK farming, long-term use, reducing manual input*

**Hunger Management (8 abilities):**

Hunger Boosts:
| Ability ID | Display Name | Hunger Reduction | Weather |
|------------|--------------|------------------|---------|
| `HungerBoost` | Hunger Boost I | -12% | None |
| `HungerBoostII` | Hunger Boost II | -16% | None |
| `HungerBoostIII` | Hunger Boost III | -20% | None |
| `SnowyHungerBoost` | Snowy Hunger Boost | -30% | Frost |

Hunger Restore:
| Ability ID | Display Name | Proc Rate | Hunger Restore | Weather |
|------------|--------------|-----------|----------------|---------|
| `HungerRestore` | Hunger Restore I | 12% | +30% | None |
| `HungerRestoreII` | Hunger Restore II | 14% | +35% | None |
| `HungerRestoreIII` | Hunger Restore III | 16% | +40% | None |
| `SnowyHungerRestore` | Snowy Hunger Restore | 20% | +38% | Frost |

**Plus:** XP Boosts, Mutation Granters, Growth Boosts, Crop Optimization, Seed Finders, Coin Finders (all listed in their respective sections)

**Detection Rules:**
- Hunger Boost + Hunger Restore = AFK overnight setup (we want to try avoid terms like afk farming and 'automatic' actions like auto feeding or auto harvesting or auto planting and macros etc)
- Multiple passive abilities = minimize manual input
- Key for AFK: Hunger abilities prevent starvation during long sessions

---

#### 7. HATCHING OPTIMIZATION (9 abilities)

**Hatch XP Boosts (3 abilities):**

| Ability ID | Display Name | Proc Rate | Bonus XP | Trigger |
|------------|--------------|-----------|----------|---------|
| `PetAgeBoost` | Hatch XP Boost I | 50% | +8,000 XP | hatchEgg |
| `PetAgeBoostII` | Hatch XP Boost II | 60% | +12,000 XP | hatchEgg |
| `PetAgeBoostIII` | Hatch XP Boost III | 70% | +16,000 XP | hatchEgg |

**Max Strength Boosts (3 abilities):**

| Ability ID | Display Name | Proc Rate | Max STR Increase | Trigger |
|------------|--------------|-----------|------------------|---------|
| `PetHatchSizeBoost` | Max Strength Boost I | 12% | +2.4% | hatchEgg |
| `PetHatchSizeBoostII` | Max Strength Boost II | 14% | +3.5% | hatchEgg |
| `PetHatchSizeBoostIII` | Max Strength Boost III | 16% | +4.6% | hatchEgg |

**Pet Mutation Boosts (3 abilities):**

| Ability ID | Display Name | Mutation Chance Increase | Trigger |
|------------|--------------|-------------------------|---------|
| `PetMutationBoost` | Pet Mutation Boost I | +7% | hatchEgg |
| `PetMutationBoostII` | Pet Mutation Boost II | +10% | hatchEgg |
| `PetMutationBoostIII` | Pet Mutation Boost III | +13% | hatchEgg |

**Note:** Rainbow pet base chance 0.1%, gold base chance 1%

**Pet Refunds (2 abilities):**

| Ability ID | Display Name | Proc Rate | Effect | Trigger |
|------------|--------------|-----------|--------|---------|
| `PetRefund` | Pet Refund I | 5% | Get egg back after selling | sellPet |
| `PetRefundII` | Pet Refund II | 7% | Get egg back after selling | sellPet |

**Double Hatch (1 ability):**

| Ability ID | Display Name | Proc Rate | Effect | Trigger |
|------------|--------------|-----------|--------|---------|
| `DoubleHatch` | Double Hatch | 3% | Hatch 2 pets from 1 egg | hatchEgg |

**Note:** Both hatched pets run rainbow chance separately - research needed for optimal combos

**Value Hierarchy:**
- **Late game:** Max Strength Boost > others (most sought-after)
- **Early game:** Hatch XP Boost (skips grind, overshadowed late-game)
- **Rainbow hunting:** Pet Mutation Boost + Double Hatch + Pet Refund combo

**Detection Rules:**
- Max Strength Boost = high value
- Pet Mutation Boost + Double Hatch + Pet Refund = rainbow hunting team
- Pet Refund = get egg back, retry rare eggs

---

#### 8. SPECIAL/UTILITY (2 abilities)

**Crop Eater (1 ability):**

| Ability ID | Display Name | Proc Rate | Effect |
|------------|--------------|-----------|--------|
| `ProduceEater` | Crop Eater | 60% | +150% crop sell price |

**User Note:** "usually unwanted as players prefer just getting the mutations on the produce/crops. only kept if rainbow, sometimes gold"

**Copycat (1 ability):**

| Ability ID | Display Name | Proc Rate | Effect |
|------------|--------------|-----------|--------|
| `Copycat` | Copycat | 1% | Unknown (likely copies abilities) |

**User Note:** "not used in game dont display"

---

### Ability Trigger Types

1. **continuous** (40 abilities) - Always active while pet is active
2. **hatchEgg** (9 abilities) - Only when hatching eggs
3. **harvest** (1 ability) - Only when harvesting crops
4. **sellAllCrops** (5 abilities) - Only when selling all crops
5. **sellPet** (2 abilities) - Only when selling a pet

---

### Critical Interactions & Combos

**Combo 1: Coin Farming Synergy**
- Double Harvest (5% on harvest) + Crop Refund (20% on sell)
- Different triggers, same outcome: more crops = more coins

**Combo 2: Rainbow Hunting**
- Pet Mutation Boost III (+13% to 0.1% base = 0.113%)
- Double Hatch (3% chance = 2 separate rainbow rolls)
- Pet Refund II (7% to retry rare eggs)
- Strategy: Sell unwanted pets, hope for refund, retry

**Combo 3: AFK Overnight**
- Hunger Boost III (-20%) + Hunger Restore III (+40%)
- Snowy variants even better during Frost
- Keeps pets alive during long sessions

**Combo 4: Mutation Farming**
- Rainbow Granter (0.72%) + Crop Mutation Boost III (+20%)
- Crop Size Boost (value) + mutations (value++)
- High-value crops for coin farming

---

## SPECIES-TO-ABILITY MAPPING

**Source:** `GameSourceFiles/.../faunaSpeciesDex.ts`

### Common Species

**Worm:**
- Abilities: SeedFinderI (50 weight), ProduceEater (50 weight)
- Maturity: 12 hours
- Diet: Carrot, Strawberry, Aloe, Tomato, Apple
- Value: 5,000 coins

**Snail:**
- Abilities: CoinFinderI (100 weight)
- Maturity: 12 hours
- Diet: Blueberry, Tomato, Corn, Daffodil, Chrysanthemum
- Value: 10,000 coins

**Bee:**
- Abilities: ProduceScaleBoost (50 weight), ProduceMutationBoost (50 weight)
- Maturity: 12 hours
- Flying: true
- Diet: Strawberry, Blueberry, Daffodil, Lily, Chrysanthemum
- Value: 30,000 coins

### Uncommon Species

**Chicken:**
- Abilities: EggGrowthBoost (80 weight), PetRefund (20 weight)
- Maturity: 24 hours
- Diet: Aloe, Corn, Watermelon, Pumpkin
- Value: 50,000 coins
- **Note:** User clarification - Chicken has Egg Growth Boost (not just turtles!)

**Bunny:**
- Abilities: CoinFinderII (60 weight), SellBoostI (40 weight)
- Maturity: 24 hours
- Diet: Carrot, Strawberry, Blueberry, OrangeTulip, Apple
- Value: 75,000 coins

**Dragonfly:**
- Abilities: HungerRestore (70 weight), PetMutationBoost (30 weight)
- Maturity: 24 hours
- Flying: true
- Diet: Apple, OrangeTulip, Echeveria
- Value: 150,000 coins

### Rare Species

**Pig:**
- Abilities: SellBoostII (30 weight), PetAgeBoost (30 weight), PetHatchSizeBoost (30 weight)
- Maturity: 72 hours
- Diet: Watermelon, Pumpkin, Mushroom, Bamboo
- Value: 500,000 coins
- Weight: 200.0

**Cow:**
- Abilities: SeedFinderII (30 weight), HungerBoost (30 weight), PlantGrowthBoost (30 weight)
- Maturity: 72 hours
- Diet: Coconut, Banana, BurrosTail, Mushroom
- Value: 1,000,000 coins
- Weight: 600.0

**Turkey:**
- Abilities: RainDance (60 weight), EggGrowthBoostII_NEW (35 weight), DoubleHatch (5 weight)
- Maturity: 72 hours
- Diet: FavaBean, Corn, Squash
- Value: 3,000,000 coins

### Legendary Species

**Squirrel:**
- Abilities: CoinFinderIII (70 weight), SellBoostIII (20 weight), PetMutationBoostII (10 weight)
- Maturity: 100 hours
- Diet: Pumpkin, Banana, Grape
- Value: 5,000,000 coins

**Turtle:**
- (Species continues in game source - abilities not shown in excerpt but typically has Egg Growth Boost)

**Peacock:**
- (Often has XP Boost abilities - needs full source read)

**Goat:**
- (Can have XP Boost including Snowy variant - needs full source read)

### Key Insights

1. **Ability Weights:** Higher weight = more likely to have that ability
2. **Rarity Correlation:** Legendary species have better abilities
3. **Species Specialization:** Each species has 2-3 innate abilities
4. **Team Composition:** Understanding species helps optimize teams

---

## CURRENT IMPLEMENTATION ANALYSIS

### XP Tracker Implementation

**Location:** `src/features/xpTracker/` + `src/ui/sections/Pets/parts/TeamXpPanel.ts`

**Core Components:**

1. **XP Boost Detection** (`logic/xpBoost.ts`)
   ```typescript
   // Key Constants
   XP_BOOST_ABILITY_IDS = ['PetXpBoost', 'PetXpBoostII', 'PetXpBoostIII', 'SnowyPetXpBoost'];
   MAX_TARGET_STRENGTH = 100;

   // Detection
   isXpBoostAbility(abilityId: string): boolean
   getXpBoostAbilities(abilities: string[]): string[]
   hasXpBoostAbility(abilities: string[]): boolean
   getXpBoostTier(abilityId: string): 'I' | 'II' | 'III' | 'Snowy'

   // Calculation
   calculateXpBoostStats(abilityId, petStrength, currentWeather): XpBoostStats | null
   calculateCombinedXpBoostStats(boosters, currentWeather): CombinedXpBoostStats
   ```

2. **Team XP Calculations** (`logic/teamXpCalculations.ts`)
   ```typescript
   // Main Functions
   calculateTeamXpData(teamId: string): TeamXpData | null
   calculateTeamProgressPercent(teamId: string): number

   // Internal
   getTeamPets(team: PetTeam): UnifiedPet[]
   calculateLongestHoursToMax(pets, teamBonusXp): number
   calculatePetXpData(pet, weather, teamBonus, longestHours): TeamPetXpData
   ```

3. **TeamXpPanel Component** (`ui/sections/Pets/parts/TeamXpPanel.ts`)
   ```typescript
   class TeamXpPanel {
       build(): HTMLElement
       update(data: TeamXpData): void
       private updateHeader(summary: TeamXpSummary): void
       private updatePets(pets: TeamPetXpData[]): void
       private updateFooter(summary, pets): void
       private buildPetCard(pet: TeamPetXpData): HTMLElement
       private buildProgressWithStats(pet, type): string
       destroy(): void
   }
   ```

**Data Flow:**
```
User clicks expand on team
  → TeamCard calls calculateTeamXpData(teamId)
    → Gets team from MGPetTeam.getTeam(teamId)
    → Gets pets from Globals.myPets.get()
    → Filters pets by team.petIds
    → Calculates combined boost stats
    → For each pet:
      → Calculates current/max strength
      → Calculates XP rates (base + team bonus)
      → Calculates time/feeds to next/max STR
      → Gets XP boost stats if applicable
      → Calculates supporting feeds for max STR boosters
  → Returns TeamXpData
  → TeamXpPanel.update(data) renders UI
  → Auto-updates every 3 seconds
```

### Current Line Numbers (for Phase 1 changes)

**TeamXpPanel.ts:**
- Line 122: `<span>Team XP Tracker</span>` → Change to "XP Tracker"
- Line 119-134: Header innerHTML → Simplify to show total only
- Line 322: `(🍖: ${feeds})` → Change to `(🍖 x${feeds})`
- Line 247-258: STRENGTH row in stats table → Remove (move to under sprite)

**teamXpPanel.css.ts:**
- Line 302-303: `.xp-stats-table__row { border-bottom: 1px solid var(--border); }` → Remove
- Line 97: `color: var(--mut-gold);` → Change to `color: var(--accent);`
- Line 481-528: Footer styles → Update to theme-semantic colors
- Line 47-108: Header styles → Update to theme-semantic colors

---

## BASE TEMPLATE SYSTEM

### Concept (from User's Clarification)

**User's Explanation:**
> "what the note here is talking about is simply the 'expand button' and 'expand feature', previously, when a pet team was clicked there was no option or possibility to expand it at all. when i added the xp tracker features to this Pets section, i put a small expand button that drops/expands a table BELOW. essentially exactly what the xp tracker pet team dropdown does but without the xp tracker info, just a completely base template to input information/displays/features."

**Visual Representation (User's ASCII Diagram):**
```
┌──────────────────────────────────────────┐
│ [Sprite]  Snael                          │
│ | 64x64|  ─────────────────────────      │
│ |      |                                 │
│ |------|   (Feature stats go here)       │
│ [MAX]                                    │
│ [⚡II]                                   │
│ STR: 91/91  ← Under sprite/badges       │
│                                          │
└──────────────────────────────────────────┘
```

### How It Works

1. **Expand Button Clicked:**
   - Panel drops down below team card
   - Shows 3 cards (one per pet slot in team)

2. **Each Card Auto-Populates:**
   - Pet sprite (64x64, with mutations)
   - Pet name
   - Badges (MAX, XP Boost tier, etc.)
   - STR display under badges (e.g., "STR: 91/91" or "STR: 89/91")
   - Content area (empty, waiting for feature stats)

3. **Features Wire Into Content Area:**
   - XP tracker: populates with Next STR, Max STR, XP Boost stats
   - Turtle timer: would populate with hatch time, optimal feed time
   - Ability tracker: would populate with ability effectiveness
   - Etc.

### Template Components

**BasePetCard.ts Structure:**
```typescript
export interface BasePetCardData {
    id: string;
    name: string;
    species: string;
    currentStrength: number;
    maxStrength: number;
    isMaxStrength: boolean;
    isStarving: boolean;
    mutations: string[];
    targetScale: number;
    badges?: string[]; // e.g., ['MAX', '⚡II']
}

export class BasePetCard {
    public root: HTMLElement;
    private spriteWrapper: HTMLElement | null;
    private badgesRow: HTMLElement | null;
    private strDisplay: HTMLElement | null;
    private contentArea: HTMLElement | null;

    build(): HTMLElement {
        // Creates DOM structure:
        // - sprite wrapper (64x64)
        // - badges row under sprite
        // - STR display under badges
        // - content area for features
    }

    update(pet: BasePetCardData): void {
        // Updates sprite, badges, STR
    }

    getContentArea(): HTMLElement {
        // Features call this to get area to populate
        return this.contentArea!;
    }
}
```

**Usage Pattern:**
```typescript
// XP Tracker uses base template
const baseCard = new BasePetCard();
baseCard.build();
baseCard.update({
    id: pet.id,
    name: pet.name,
    species: pet.species,
    currentStrength: 89,
    maxStrength: 91,
    isMaxStrength: false,
    isStarving: false,
    mutations: ['gold'],
    targetScale: 1.5,
    badges: ['⚡II']
});

// Get content area and populate with XP stats
const contentArea = baseCard.getContentArea();
contentArea.innerHTML = `
    <table class="feature-stats">
        <tr><td>Next STR</td><td>2.5h (🍖 x3)</td></tr>
        <tr><td>Max STR</td><td>12.3h (🍖 x15)</td></tr>
        <tr><td>XP Boost</td><td>+1,200 XP/hr</td></tr>
    </table>
`;
```

### Key Design Principles

1. **No Restructuring:** Keep current XP tracker horizontal layout
2. **STR Under Sprite:** User was clear - goes under badges, not next to name
3. **Minimal Template:** Sprite + Name + STR + Badges = base, features populate the rest
4. **Consistent Future:** All features use same base, ensuring uniformity

---

## PHASE 1: IMMEDIATE REFINEMENTS

### Task Breakdown (22 Tasks, 6-8 hours)

