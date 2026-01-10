# Phase 2: Extensible Architecture for Future Features

**Project:** GEMINI Mod
**Phase:** 2 (Post-Phase 1 Complete)
**Status:** Architecture Planning
**Created:** 2026-01-07
**Dependencies:** Phase 1 Calculator Modules (Complete), XP Tracker (Deployed)

---

## Executive Summary

Phase 2 establishes an extensible architecture to support multiple pet-related features beyond XP tracking. This system enables:

1. **Intelligent Team Purpose Detection** - Automatically identify team intent based on pet abilities
2. **Feature Panel Registry** - Modular system for adding new features without architectural changes
3. **Smart Display Management** - Context-aware feature visibility based on team composition and user preferences
4. **Future-Proof Extensibility** - Clear patterns for adding Turtle Timer, Ability Tracker, Crop Tracker, etc.

**Core Principle:** Build once, extend infinitely. New features should require minimal integration code.

---

## Table of Contents

- [A. Team Purpose Detection](#a-team-purpose-detection)
- [B. Feature Panel Registry](#b-feature-panel-registry)
- [C. Smart Display Management](#c-smart-display-management)
- [D. Future Extensibility](#d-future-extensibility)

---

## A. Team Purpose Detection

### Overview

Automatically detect what a team is optimized for based on pet ability composition. This enables intelligent defaults for feature display.

### 1. Ability Categorization

Based on `All-Pet-Abilities-Complete-List.md`, abilities are grouped into 8 purpose categories:

#### Category 1: XP Farming
**Goal:** Level pets to max strength quickly

**Abilities:**
- Pet XP Boost (I/II/III/Snowy)

**Detection Indicators:**
- Team has 1+ XP Boost pets
- Team has pets below max strength (STR < maxSTR)
- High confidence if 2+ XP Boost pets (especially Tier III)

**Confidence Scoring:**
```typescript
// 2+ XP Boost pets = 0.9 confidence
// 1 XP Boost + 1+ leveling pets = 0.7 confidence
// 2+ leveling pets (no boost) = 0.5 confidence
```

---

#### Category 2: Coin Farming
**Goal:** Maximize coin generation (passive and active)

**Abilities:**
- Coin Finder (I/II/III/Snowy) - Passive income
- Sell Boost (I/II/III/IV) - Selling multiplier
- Crop Refund - Get crops back after selling
- Double Harvest - Get extra crops when harvesting

**Detection Indicators:**
- Team has Coin Finder pets (passive income)
- Team has Sell Boost + crop-growing context
- Team has Crop Refund + Double Harvest combo (high confidence)

**Confidence Scoring:**
```typescript
// Coin Finder III = 0.8 confidence
// Sell Boost + Crop Refund combo = 0.85 confidence
// Double Harvest + farming abilities = 0.75 confidence
```

**Note:** Double Harvest and Crop Refund achieve similar outcomes via different triggers (harvest vs sell).

---

#### Category 3: Crop Farming
**Goal:** Grow and harvest crops efficiently (mutations, speed, scale)

**Abilities:**
- Mutation Granters (Rain/Snow/Frost/Gold/Rainbow)
- Plant Growth Boost (I/II/III/Snowy) - Faster maturation
- Crop Size Boost (I/II/III/Snowy) - Scale/weight increase
- Crop Mutation Boost (I/II/III/Snowy) - Mutation chance increase
- Seed Finder (I/II/III/IV) - Seed collection
- Double Harvest - Harvest multiplier

**Detection Indicators:**
- Team has Plant Growth Boost (speed farming)
- Team has Mutation Granters (value farming)
- Team has Crop Mutation Boost (mutation hunting)
- High confidence if 2+ crop-related abilities

**Confidence Scoring:**
```typescript
// Rainbow/Gold Granter = 0.95 confidence (ultra-rare, intentional)
// Plant Growth III + Mutation Boost = 0.8 confidence
// Single crop boost ability = 0.4 confidence
```

**Note:** Crop Size Boost increases scale/weight (1-100 in-game indicator) which affects value.

---

#### Category 4: Time Reduction
**Goal:** Reduce waiting time for eggs and crops

**Abilities:**
- Plant Growth Boost (I/II/III/Snowy) - Crop maturation
- Egg Growth Boost (I/II/III/Snowy) - Egg hatching

**Detection Indicators:**
- Team has Egg Growth Boost (eggs placed in garden)
- Team has Plant Growth Boost (crop maturation)
- Team has both = efficiency focus

**Confidence Scoring:**
```typescript
// Egg Growth + active turtle eggs = 0.9 confidence
// Plant Growth only = 0.5 confidence (overlaps with crop farming)
```

**Renamed from "Turtle Farming":** Multiple species have eggs, not just turtles. No breeding in-game, only hatching.

---

#### Category 5: Mutation Hunting
**Goal:** Obtain rare mutations for journal completion and value

**Abilities:**
- Rare Mutation Granters (Frost/Gold/Rainbow)
- Crop Size Boost (I/II/III/Snowy) - Increases value
- Crop Mutation Boost (I/II/III/Snowy) - Increases base mutation chance

**Detection Indicators:**
- Team has Gold/Rainbow Granter (ultra-rare 0.72% proc)
- Team has Crop Mutation Boost (targeted mutation hunting)
- Purpose: Collect rare mutations for journal and high-value crops

**Confidence Scoring:**
```typescript
// Rainbow Granter = 0.95 confidence (ultra-rare, intentional)
// Gold Granter = 0.9 confidence
// Frost Granter + Crop Mutation Boost = 0.8 confidence
```

**Value Hierarchy:** Rainbow > Gold > Frost > Snow > Rain

**Note:** Mutations significantly increase crop value (exact multipliers need research).

---

#### Category 6: Efficiency / AFK Farming
**Goal:** Long-term use, minimize manual input, overnight AFK

**Abilities:**
- Hunger Boost (I/II/III/Snowy) - Slower hunger depletion
- Hunger Restore (I/II/III/Snowy) - Auto-feed over time
- All passive abilities (Coin Finder, Granters, etc.)
- Growth Boosts (reduce wait time)

**Detection Indicators:**
- Team has Hunger Boost + Hunger Restore (AFK setup)
- Team has multiple passive abilities (Coin Finder, Granters)
- Purpose: Maximize gains over time with minimal interaction

**Confidence Scoring:**
```typescript
// Hunger Boost + Hunger Restore = 0.85 confidence (AFK intent)
// Multiple passive abilities = 0.6 confidence
```

**Key for AFK:** Hunger abilities prevent starvation during long sessions (overnight farming).

---

#### Category 7: Hatching Optimization
**Goal:** Maximize egg hatching outcomes (STR, mutations, efficiency)

**Abilities:**
- Max Strength Boost (I/II/III) - **Most sought-after for high max STR**
- Hatch XP Boost (I/II/III) - Start with bonus XP (early-game focus)
- Pet Mutation Boost (I/II/III) - Rainbow 0.1% base, Gold 1% base
- Double Hatch - 3% chance for 2 pets (both run rainbow chance separately)
- Pet Refund (I/II) - Get egg back after selling (retry rare eggs)

**Detection Indicators:**
- Team has Max Strength Boost (late-game priority)
- Team has Pet Mutation Boost (rainbow/gold hunting)
- Team has Pet Refund (retry strategy for rare eggs)
- Team has Double Hatch (ultra-rare, rainbow hunting)

**Confidence Scoring:**
```typescript
// Max Strength Boost III = 0.9 confidence (late-game meta)
// Pet Mutation Boost + Double Hatch = 0.85 confidence (rainbow hunting)
// Hatch XP Boost (early-game) = 0.5 confidence (overshadowed late-game)
```

**Value Hierarchy:**
- **Late game:** Max Strength Boost > all others
- **Early game:** Hatch XP Boost (skips grind)
- **Rainbow hunting:** Pet Mutation Boost + Double Hatch + Pet Refund combo

**Note:** Best hatching combos for rainbow pets still under research. Double Hatch gives 2 separate rainbow rolls per egg.

---

#### Category 8: Special / Unwanted
**Goal:** Edge cases, situational, or unused abilities

**Abilities:**
- **Crop Eater** - Usually avoided (only kept if rainbow/gold mutation on pet)
- **Copycat** - Not used in game, DO NOT DISPLAY

**Detection Rules:**
- Ignore Crop Eater unless team purpose is unclear (then low confidence)
- Never factor Copycat into purpose detection

**Note:** Players prefer mutations on crops rather than eating them. Crop Eater only valuable if the pet itself has rainbow/gold mutation.

---

### 2. Purpose Detection Algorithm

**File:** `src/features/petTeam/logic/purpose.ts` (NEW)

```typescript
/**
 * Team Purpose Detection
 * Analyzes team composition to infer purpose based on pet abilities
 */

import type { PetTeam } from '../types';
import type { UnifiedPet } from '../../../types/unifiedPet';
import { getPetsForTeam } from './pets';

/**
 * Team purpose categories
 */
export type TeamPurpose =
  | 'xp-farming'        // Leveling pets to max STR
  | 'coin-farming'      // Passive/active coin generation
  | 'crop-farming'      // Growing crops (mutations, speed, scale)
  | 'time-reduction'    // Reducing egg/crop wait times
  | 'mutation-hunting'  // Rare mutation collection
  | 'efficiency'        // AFK farming, minimal interaction
  | 'hatching'          // Egg hatching optimization
  | 'balanced'          // Mixed purpose
  | 'unknown';          // Cannot determine

/**
 * Purpose analysis result with confidence scoring
 */
export interface TeamPurposeAnalysis {
  /** Primary detected purpose */
  primary: TeamPurpose;

  /** Confidence in primary purpose (0-1) */
  confidence: number;

  /** Secondary purposes (sorted by confidence) */
  secondary: Array<{ purpose: TeamPurpose; confidence: number }>;

  /** Suggested features to display (ordered by relevance) */
  suggestedFeatures: string[];

  /** Human-readable explanation of detection */
  reasons: string[];
}

/**
 * Ability category detection helpers
 */
const AbilityCategories = {
  XP_BOOST: ['PetXpBoost', 'PetXpBoostII', 'PetXpBoostIII', 'SnowyPetXpBoost'],

  COIN_FINDER: ['CoinFinderI', 'CoinFinderII', 'CoinFinderIII', 'SnowyCoinFinder'],

  SELL_BOOST: ['SellBoostI', 'SellBoostII', 'SellBoostIII', 'SellBoostIV'],

  CROP_REFUND_HARVEST: ['ProduceRefund', 'DoubleHarvest'],

  PLANT_GROWTH: ['PlantGrowthBoost', 'PlantGrowthBoostII', 'PlantGrowthBoostIII', 'SnowyPlantGrowthBoost'],

  CROP_SIZE: ['ProduceScaleBoost', 'ProduceScaleBoostII', 'ProduceScaleBoostIII', 'SnowyCropSizeBoost'],

  CROP_MUTATION: ['ProduceMutationBoost', 'ProduceMutationBoostII', 'ProduceMutationBoostIII', 'SnowyCropMutationBoost'],

  SEED_FINDER: ['SeedFinderI', 'SeedFinderII', 'SeedFinderIII', 'SeedFinderIV'],

  EGG_GROWTH: ['EggGrowthBoost', 'EggGrowthBoostII_NEW', 'EggGrowthBoostII', 'SnowyEggGrowthBoost'],

  HUNGER_BOOST: ['HungerBoost', 'HungerBoostII', 'HungerBoostIII', 'SnowyHungerBoost'],

  HUNGER_RESTORE: ['HungerRestore', 'HungerRestoreII', 'HungerRestoreIII', 'SnowyHungerRestore'],

  RARE_GRANTERS: ['FrostGranter', 'GoldGranter', 'RainbowGranter'],

  COMMON_GRANTERS: ['RainDance', 'SnowGranter'],

  MAX_STR_BOOST: ['PetHatchSizeBoost', 'PetHatchSizeBoostII', 'PetHatchSizeBoostIII'],

  HATCH_XP: ['PetAgeBoost', 'PetAgeBoostII', 'PetAgeBoostIII'],

  PET_MUTATION: ['PetMutationBoost', 'PetMutationBoostII', 'PetMutationBoostIII'],

  DOUBLE_HATCH: ['DoubleHatch'],

  PET_REFUND: ['PetRefund', 'PetRefundII'],

  // Unwanted / Ignore
  IGNORE: ['Copycat', 'ProduceEater'],
} as const;

/**
 * Check if pet has any abilities from a category
 */
function hasAbilityFrom(pet: UnifiedPet, category: readonly string[]): boolean {
  return pet.abilities.some(ability => category.includes(ability));
}

/**
 * Count pets with abilities from a category
 */
function countPetsWithAbility(pets: UnifiedPet[], category: readonly string[]): number {
  return pets.filter(pet => hasAbilityFrom(pet, category)).length;
}

/**
 * Get ability tier from ability ID (I=1, II=2, III=3, IV=4)
 */
function getAbilityTier(abilityId: string): number {
  if (abilityId.includes('IV')) return 4;
  if (abilityId.includes('III') || abilityId === 'EggGrowthBoostII') return 3; // EggGrowthBoostII is actually tier 3
  if (abilityId.includes('II') || abilityId.includes('_NEW')) return 2;
  return 1;
}

/**
 * Calculate average tier for a category
 */
function getAverageTier(pets: UnifiedPet[], category: readonly string[]): number {
  const tiers = pets
    .flatMap(pet => pet.abilities.filter(a => category.includes(a)))
    .map(getAbilityTier);

  if (tiers.length === 0) return 0;
  return tiers.reduce((sum, tier) => sum + tier, 0) / tiers.length;
}

/**
 * Detect team purpose with confidence scoring
 */
export function detectTeamPurpose(team: PetTeam): TeamPurposeAnalysis {
  const pets = getPetsForTeam(team);

  if (pets.length === 0) {
    return {
      primary: 'unknown',
      confidence: 0,
      secondary: [],
      suggestedFeatures: [],
      reasons: ['Team has no pets'],
    };
  }

  const reasons: string[] = [];
  const scores: Partial<Record<TeamPurpose, number>> = {};

  // --- XP FARMING DETECTION ---
  const xpBoostCount = countPetsWithAbility(pets, AbilityCategories.XP_BOOST);
  const levelingPets = pets.filter(p => !p.isMature).length;

  if (xpBoostCount >= 2) {
    const avgTier = getAverageTier(pets, AbilityCategories.XP_BOOST);
    scores['xp-farming'] = 0.75 + (avgTier * 0.05); // Max 0.9 with tier III
    reasons.push(`${xpBoostCount} XP Boost pets (avg tier ${avgTier.toFixed(1)})`);
  } else if (xpBoostCount === 1 && levelingPets >= 1) {
    scores['xp-farming'] = 0.7;
    reasons.push(`1 XP Boost pet with ${levelingPets} leveling pet(s)`);
  } else if (levelingPets >= 2) {
    scores['xp-farming'] = 0.5;
    reasons.push(`${levelingPets} pets below max STR`);
  }

  // --- COIN FARMING DETECTION ---
  const coinFinderCount = countPetsWithAbility(pets, AbilityCategories.COIN_FINDER);
  const sellBoostCount = countPetsWithAbility(pets, AbilityCategories.SELL_BOOST);
  const cropRefundHarvestCount = countPetsWithAbility(pets, AbilityCategories.CROP_REFUND_HARVEST);

  if (coinFinderCount >= 1) {
    const avgTier = getAverageTier(pets, AbilityCategories.COIN_FINDER);
    scores['coin-farming'] = Math.max(scores['coin-farming'] || 0, 0.65 + (avgTier * 0.05));
    reasons.push(`${coinFinderCount} Coin Finder pet(s) (tier ${avgTier.toFixed(1)})`);
  }

  if (sellBoostCount >= 1 && cropRefundHarvestCount >= 1) {
    scores['coin-farming'] = Math.max(scores['coin-farming'] || 0, 0.85);
    reasons.push('Sell Boost + Crop Refund/Double Harvest combo');
  } else if (cropRefundHarvestCount >= 1) {
    scores['coin-farming'] = Math.max(scores['coin-farming'] || 0, 0.75);
    reasons.push('Crop Refund or Double Harvest (coin efficiency)');
  }

  // --- CROP FARMING DETECTION ---
  const rareGranterCount = countPetsWithAbility(pets, AbilityCategories.RARE_GRANTERS);
  const commonGranterCount = countPetsWithAbility(pets, AbilityCategories.COMMON_GRANTERS);
  const plantGrowthCount = countPetsWithAbility(pets, AbilityCategories.PLANT_GROWTH);
  const cropMutationCount = countPetsWithAbility(pets, AbilityCategories.CROP_MUTATION);
  const cropSizeCount = countPetsWithAbility(pets, AbilityCategories.CROP_SIZE);

  if (rareGranterCount >= 1) {
    const hasRainbow = pets.some(p => p.abilities.includes('RainbowGranter'));
    const hasGold = pets.some(p => p.abilities.includes('GoldGranter'));

    if (hasRainbow) {
      scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, 0.95);
      reasons.push('Rainbow Granter (ultra-rare, intentional)');
    } else if (hasGold) {
      scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, 0.9);
      reasons.push('Gold Granter (ultra-rare)');
    } else {
      scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, 0.75);
      reasons.push('Frost Granter (rare mutation)');
    }
  }

  const cropAbilityCount = plantGrowthCount + cropMutationCount + cropSizeCount + commonGranterCount;
  if (cropAbilityCount >= 2) {
    const avgTier = (
      getAverageTier(pets, AbilityCategories.PLANT_GROWTH) +
      getAverageTier(pets, AbilityCategories.CROP_MUTATION) +
      getAverageTier(pets, AbilityCategories.CROP_SIZE)
    ) / 3;

    scores['crop-farming'] = Math.max(scores['crop-farming'] || 0, 0.7 + (avgTier * 0.03));
    reasons.push(`${cropAbilityCount} crop-related abilities`);
  }

  // --- TIME REDUCTION DETECTION ---
  const eggGrowthCount = countPetsWithAbility(pets, AbilityCategories.EGG_GROWTH);

  if (eggGrowthCount >= 1) {
    // TODO: Check if team has active turtle eggs in garden (requires game state integration)
    scores['time-reduction'] = 0.7;
    reasons.push(`${eggGrowthCount} Egg Growth Boost pet(s)`);
  }

  if (plantGrowthCount >= 1 && !scores['crop-farming']) {
    // Only count as time-reduction if not already crop-farming
    scores['time-reduction'] = Math.max(scores['time-reduction'] || 0, 0.5);
    reasons.push('Plant Growth Boost (crop speed)');
  }

  // --- MUTATION HUNTING DETECTION ---
  if (rareGranterCount >= 1 || cropMutationCount >= 1) {
    const hasRainbow = pets.some(p => p.abilities.includes('RainbowGranter'));
    const hasGold = pets.some(p => p.abilities.includes('GoldGranter'));

    if (hasRainbow || hasGold) {
      scores['mutation-hunting'] = 0.95;
      reasons.push(`${hasRainbow ? 'Rainbow' : 'Gold'} Granter (mutation focus)`);
    } else if (cropMutationCount >= 1) {
      scores['mutation-hunting'] = 0.8;
      reasons.push('Crop Mutation Boost (targeted hunting)');
    }
  }

  // --- EFFICIENCY / AFK DETECTION ---
  const hungerBoostCount = countPetsWithAbility(pets, AbilityCategories.HUNGER_BOOST);
  const hungerRestoreCount = countPetsWithAbility(pets, AbilityCategories.HUNGER_RESTORE);

  if (hungerBoostCount >= 1 && hungerRestoreCount >= 1) {
    scores['efficiency'] = 0.85;
    reasons.push('Hunger Boost + Hunger Restore (AFK setup)');
  } else if (hungerBoostCount >= 1 || hungerRestoreCount >= 1) {
    scores['efficiency'] = 0.6;
    reasons.push('Hunger management (reduced feeding)');
  }

  // Count passive abilities (Coin Finder, Granters, etc.)
  const passiveAbilityCount = coinFinderCount + rareGranterCount + commonGranterCount;
  if (passiveAbilityCount >= 2) {
    scores['efficiency'] = Math.max(scores['efficiency'] || 0, 0.6);
    reasons.push(`${passiveAbilityCount} passive abilities (AFK gains)`);
  }

  // --- HATCHING OPTIMIZATION DETECTION ---
  const maxStrCount = countPetsWithAbility(pets, AbilityCategories.MAX_STR_BOOST);
  const hatchXpCount = countPetsWithAbility(pets, AbilityCategories.HATCH_XP);
  const petMutationCount = countPetsWithAbility(pets, AbilityCategories.PET_MUTATION);
  const doubleHatchCount = countPetsWithAbility(pets, AbilityCategories.DOUBLE_HATCH);
  const petRefundCount = countPetsWithAbility(pets, AbilityCategories.PET_REFUND);

  if (maxStrCount >= 1) {
    const avgTier = getAverageTier(pets, AbilityCategories.MAX_STR_BOOST);
    scores['hatching'] = 0.85 + (avgTier * 0.05); // Max 0.95 with tier III
    reasons.push(`Max Strength Boost (tier ${avgTier.toFixed(1)}) - late-game meta`);
  }

  if (petMutationCount >= 1 || doubleHatchCount >= 1 || petRefundCount >= 1) {
    const comboCount = petMutationCount + doubleHatchCount + petRefundCount;
    scores['hatching'] = Math.max(scores['hatching'] || 0, 0.7 + (comboCount * 0.05));
    reasons.push(`${comboCount} rainbow hunting abilities`);
  }

  if (hatchXpCount >= 1 && !scores['hatching']) {
    // Only count if no other hatching focus (overshadowed late-game)
    scores['hatching'] = 0.5;
    reasons.push('Hatch XP Boost (early-game focus)');
  }

  // --- DETERMINE PRIMARY AND SECONDARY PURPOSES ---
  const sortedPurposes = (Object.entries(scores) as [TeamPurpose, number][])
    .sort(([, a], [, b]) => b - a);

  if (sortedPurposes.length === 0) {
    return {
      primary: 'balanced',
      confidence: 0.3,
      secondary: [],
      suggestedFeatures: ['xp'], // Default to XP if unknown
      reasons: ['Mixed or unclear purpose'],
    };
  }

  const [primary, confidence] = sortedPurposes[0];
  const secondary = sortedPurposes.slice(1).map(([purpose, conf]) => ({ purpose, confidence: conf }));

  // --- MAP PURPOSE TO SUGGESTED FEATURES ---
  const featureMap: Record<TeamPurpose, string[]> = {
    'xp-farming': ['xp'],
    'coin-farming': ['coin', 'crop', 'xp'],
    'crop-farming': ['crop', 'mutation', 'xp'],
    'time-reduction': ['timer', 'xp'],
    'mutation-hunting': ['mutation', 'crop', 'xp'],
    'efficiency': ['afk', 'hunger', 'xp'],
    'hatching': ['hatch', 'mutation', 'xp'],
    'balanced': ['xp', 'ability'],
    'unknown': ['xp'],
  };

  return {
    primary,
    confidence,
    secondary,
    suggestedFeatures: featureMap[primary] || ['xp'],
    reasons,
  };
}

/**
 * Helper: Get pets from team
 * (Exported from MGPetTeam.getPetsForTeam)
 */
function getPetsForTeam(team: PetTeam): UnifiedPet[] {
  const myPets = Globals.myPets.get();
  return team.petIds
    .filter(id => id !== '')
    .map(id => myPets.all.find(p => p.id === id))
    .filter(Boolean) as UnifiedPet[];
}
```

---

### 3. Confidence Scoring System

**Design Philosophy:** Multi-purpose teams are common. Use confidence scores, not binary categorization.

#### Scoring Rules

| Confidence Range | Interpretation |
|------------------|----------------|
| 0.9 - 1.0 | **High** - Ultra-rare abilities (Rainbow Granter, Max STR III) or perfect combos |
| 0.7 - 0.89 | **Medium-High** - Clear intent with tier II/III abilities or good combos |
| 0.5 - 0.69 | **Medium** - Single purpose indicator or tier I abilities |
| 0.3 - 0.49 | **Low** - Weak signals or conflicting purposes |
| 0.0 - 0.29 | **Unknown** - No clear purpose detected |

#### Examples

**Example 1: XP Farming Team**
```typescript
Team: [
  Peacock (XP Boost III, Hunger Boost II),
  Goat (Snowy XP Boost, Hunger Restore I),
  Chicken (STR 45/120) // Not mature
]

Detection:
- 2 XP Boost pets (tier 3 + Snowy) → 0.9 confidence
- 1 leveling pet
- Hunger abilities → 0.6 efficiency secondary

Result:
{
  primary: 'xp-farming',
  confidence: 0.9,
  secondary: [{ purpose: 'efficiency', confidence: 0.6 }],
  suggestedFeatures: ['xp'],
  reasons: ['2 XP Boost pets (avg tier 3.0)', 'Hunger management']
}
```

**Example 2: Rainbow Hunting Mutation Team**
```typescript
Team: [
  Capybara (Rainbow Granter, Crop Mutation III),
  Chicken (Plant Growth III, Crop Size II),
  Pig (Gold Granter)
]

Detection:
- Rainbow + Gold Granter → 0.95 mutation-hunting
- Crop Mutation III → 0.95 crop-farming
- Plant Growth + Crop Size → 0.75 crop-farming

Result:
{
  primary: 'mutation-hunting', // Slightly higher due to ultra-rare granters
  confidence: 0.95,
  secondary: [
    { purpose: 'crop-farming', confidence: 0.95 }
  ],
  suggestedFeatures: ['mutation', 'crop', 'xp'],
  reasons: [
    'Rainbow Granter (ultra-rare, intentional)',
    'Gold Granter (ultra-rare)',
    '3 crop-related abilities'
  ]
}
```

**Example 3: AFK Coin Farming**
```typescript
Team: [
  Butterfly (Coin Finder III, Hunger Boost III),
  Snail (Hunger Restore III, Sell Boost II),
  Squirrel (Crop Refund, Double Harvest)
]

Detection:
- Coin Finder III → 0.8 coin-farming
- Sell Boost + Refund + Double Harvest → 0.85 coin-farming
- Hunger Boost + Restore → 0.85 efficiency

Result:
{
  primary: 'coin-farming',
  confidence: 0.85,
  secondary: [{ purpose: 'efficiency', confidence: 0.85 }],
  suggestedFeatures: ['coin', 'crop', 'xp'],
  reasons: [
    '1 Coin Finder pet(s) (tier 3.0)',
    'Sell Boost + Crop Refund/Double Harvest combo',
    'Hunger Boost + Hunger Restore (AFK setup)'
  ]
}
```

---

### 4. Detection Rules Summary

**File Reference:** `src/features/petTeam/logic/purpose.ts`

```typescript
// Quick reference for detection thresholds

// XP FARMING
xpBoostCount >= 2 → 0.75-0.9 confidence (tier-weighted)
xpBoostCount === 1 + levelingPets >= 1 → 0.7 confidence
levelingPets >= 2 → 0.5 confidence

// COIN FARMING
coinFinderCount >= 1 → 0.65-0.8 confidence (tier-weighted)
sellBoost + cropRefundHarvest → 0.85 confidence
cropRefundHarvest only → 0.75 confidence

// CROP FARMING
RainbowGranter → 0.95 confidence
GoldGranter → 0.9 confidence
FrostGranter → 0.75 confidence
cropAbilityCount >= 2 → 0.7-0.76 confidence (tier-weighted)

// TIME REDUCTION
eggGrowthCount >= 1 → 0.7 confidence (higher if eggs detected in garden)
plantGrowthCount >= 1 (no crop-farming) → 0.5 confidence

// MUTATION HUNTING
RainbowGranter or GoldGranter → 0.95 confidence
cropMutationCount >= 1 → 0.8 confidence

// EFFICIENCY / AFK
hungerBoost + hungerRestore → 0.85 confidence
hungerBoost or hungerRestore → 0.6 confidence
passiveAbilityCount >= 2 → 0.6 confidence

// HATCHING OPTIMIZATION
maxStrCount >= 1 → 0.85-0.95 confidence (tier-weighted)
petMutation + doubleHatch + petRefund combo → 0.7-0.8 confidence
hatchXpCount >= 1 (no other hatching) → 0.5 confidence
```

---

### 5. Multi-Purpose Team Handling

**Problem:** Many teams serve 2-3 purposes simultaneously.

**Solution:** Return primary + secondary purposes with confidence scores.

#### Display Strategy

**UI Example:**
```
Team: "Rainbow Farm"
Purpose: Mutation Hunting (95%) + Crop Farming (95%)
Suggested Features: [Mutation] [Crop] [XP]
```

**Feature Selection Logic:**
```typescript
// Priority order when expanding team
1. User's last viewed feature for this team (if exists)
2. User's default feature preference (if set)
3. Primary purpose suggested feature (highest confidence)
4. XP tracker (fallback default)
```

**Benefits:**
- Respects user preferences
- Provides intelligent defaults
- Handles multi-purpose teams gracefully
- Always has a fallback

---

## B. Feature Panel Registry

### Overview

Modular system for registering and managing feature panels. New features can be added by creating a single file and registering it.

### 1. Registry System Architecture

**File:** `src/ui/sections/Pets/parts/featurePanels/registry.ts` (NEW)

```typescript
/**
 * Feature Panel Registry
 * Extensible system for adding new pet team feature displays
 *
 * To add a new feature:
 * 1. Create a new file: featurePanels/yourFeature.ts
 * 2. Implement FeaturePanelDefinition interface
 * 3. Register in featurePanels/index.ts FEATURE_PANELS array
 * 4. Done! Feature will auto-integrate into UI
 */

import type { PetTeam } from '../../../../../features/petTeam';
import type { UnifiedPet } from '../../../../../types/unifiedPet';

/**
 * Feature panel definition
 * Implement this interface to create a new feature panel
 */
export interface FeaturePanelDefinition {
  /** Unique feature ID (used for config, routing, etc.) */
  id: string;

  /** Display name in tab/settings */
  label: string;

  /** Icon/emoji for visual identification */
  icon: string;

  /** Feature category (for grouping in settings) */
  category?: 'stats' | 'tracking' | 'optimization' | 'analytics';

  /** Feature is available (check if enabled in config) */
  isAvailable: () => boolean;

  /** Calculate summary data for collapsed badge (optional) */
  getSummary?: (team: PetTeam, pets: UnifiedPet[]) => FeatureSummary | null;

  /** Build the expanded panel DOM */
  buildPanel: (team: PetTeam, container: HTMLElement) => FeaturePanelInstance;

  /** Should this feature display for this team? (optional smart filtering) */
  shouldDisplay?: (team: PetTeam, pets: UnifiedPet[]) => boolean;
}

/**
 * Feature summary for collapsed badge
 */
export interface FeatureSummary {
  /** Badge text (e.g., "67%", "3 hatching", "⚡ Active") */
  text: string;

  /** Badge color class (mapped to CSS) */
  variant?: 'low' | 'medium' | 'high' | 'warning' | 'success' | 'neutral';

  /** Tooltip on hover (optional) */
  tooltip?: string;

  /** Priority (higher = show first if space limited) */
  priority?: number;
}

/**
 * Feature panel instance (created when panel is built)
 */
export interface FeaturePanelInstance {
  /** Update panel with new team data */
  update: (team: PetTeam, pets: UnifiedPet[]) => void;

  /** Cleanup panel (remove listeners, intervals, etc.) */
  destroy: () => void;

  /** Optional: Refresh panel data (for auto-update features) */
  refresh?: () => void;
}

/**
 * Feature panel context (provided to each panel)
 */
export interface FeaturePanelContext {
  /** Team being displayed */
  team: PetTeam;

  /** Pets in team (filtered, non-empty slots) */
  pets: UnifiedPet[];

  /** Global theme colors (for consistent styling) */
  theme: Record<string, string>;

  /** Request panel refresh (call when data changes) */
  requestRefresh: () => void;

  /** Close panel (collapse team) */
  closePanel: () => void;
}
```

---

### 2. FeaturePanelDefinition Interface

**Core Methods:**

#### `id: string`
Unique identifier for feature routing, config storage, and feature detection.

**Examples:**
- `'xp'` - XP Tracker
- `'turtle'` - Turtle Timer
- `'ability'` - Ability Tracker
- `'crop'` - Crop Boost Tracker
- `'mutation'` - Mutation Tracker

---

#### `label: string`
Human-readable name shown in tabs and settings.

**Examples:**
- `'XP Tracker'`
- `'Turtle Timer'`
- `'Abilities'`
- `'Crop Boosts'`

---

#### `icon: string`
Emoji or icon for visual identification.

**Examples:**
- `'📊'` - XP Tracker
- `'🐢'` - Turtle Timer
- `'⚡'` - Abilities
- `'🌱'` - Crop Tracker

---

#### `isAvailable(): boolean`
Check if feature is enabled in user config.

**Example:**
```typescript
isAvailable: () => MGXPTracker.isEnabled()
```

---

#### `getSummary(team, pets): FeatureSummary | null` (Optional)
Generate collapsed badge data. Return `null` to hide badge.

**Example:**
```typescript
getSummary: (team, pets) => {
  const progress = calculateTeamProgressPercent(team.id);

  if (progress >= 99) return null; // Hide badge when maxed

  return {
    text: `${Math.round(progress)}%`,
    variant: progress < 33 ? 'low' : progress < 67 ? 'medium' : 'high',
    tooltip: `Average progress to max STR: ${Math.round(progress)}%`,
    priority: 10,
  };
}
```

---

#### `buildPanel(team, container): FeaturePanelInstance`
Build and mount the feature panel DOM.

**Example:**
```typescript
buildPanel: (team, container) => {
  const panel = new TeamXpPanel({ teamId: team.id });
  container.appendChild(panel.build());

  const xpData = calculateTeamXpData(team.id);
  if (xpData) panel.update(xpData);

  return {
    update: (updatedTeam, pets) => {
      const newData = calculateTeamXpData(updatedTeam.id);
      if (newData) panel.update(newData);
    },
    destroy: () => panel.destroy(),
    refresh: () => {
      const newData = calculateTeamXpData(team.id);
      if (newData) panel.update(newData);
    },
  };
}
```

---

#### `shouldDisplay(team, pets): boolean` (Optional)
Smart filtering: Should this feature display for this team?

**Example:**
```typescript
// Only show Turtle Timer if team has turtle eggs
shouldDisplay: (team, pets) => {
  return pets.some(pet => pet.petSpecies === 'Turtle');
}
```

---

### 3. How to Register New Features

**Step-by-step process:**

#### Step 1: Create Feature File

**File:** `src/ui/sections/Pets/parts/featurePanels/myFeature.ts`

```typescript
import type { FeaturePanelDefinition } from './registry';
import { MGMyFeature } from '../../../../../features/myFeature';

export const myFeature: FeaturePanelDefinition = {
  id: 'my-feature',
  label: 'My Feature',
  icon: '🎯',
  category: 'stats',

  isAvailable: () => MGMyFeature.isEnabled(),

  getSummary: (team, pets) => {
    // Calculate summary badge
    const data = MGMyFeature.calculateSummary(team.id);
    if (!data) return null;

    return {
      text: data.summaryText,
      variant: data.status,
      tooltip: data.tooltip,
      priority: 5,
    };
  },

  buildPanel: (team, container) => {
    // Build and mount panel
    const panel = new MyFeaturePanel({ teamId: team.id });
    container.appendChild(panel.build());

    return {
      update: (updatedTeam, pets) => {
        panel.update(MGMyFeature.calculateData(updatedTeam.id));
      },
      destroy: () => panel.destroy(),
    };
  },

  shouldDisplay: (team, pets) => {
    // Only show if team has relevant abilities
    return pets.some(pet => pet.abilities.includes('MyAbility'));
  },
};
```

---

#### Step 2: Register in Index

**File:** `src/ui/sections/Pets/parts/featurePanels/index.ts`

```typescript
import { xpFeature } from './xpFeature';
import { turtleFeature } from './turtleFeature';
import { abilityFeature } from './abilityFeature';
import { cropFeature } from './cropFeature';
import { myFeature } from './myFeature'; // ← Add import

/**
 * All registered feature panels
 * Order determines tab order in UI (left to right)
 */
export const FEATURE_PANELS: FeaturePanelDefinition[] = [
  xpFeature,
  turtleFeature,
  abilityFeature,
  cropFeature,
  myFeature, // ← Add to array
];

/**
 * Get available features (user has them enabled)
 */
export function getAvailableFeatures(): FeaturePanelDefinition[] {
  return FEATURE_PANELS.filter(f => f.isAvailable());
}

/**
 * Get feature by ID
 */
export function getFeatureById(id: string): FeaturePanelDefinition | undefined {
  return FEATURE_PANELS.find(f => f.id === id);
}

/**
 * Get features that should display for a team
 */
export function getFeaturesForTeam(team: PetTeam): FeaturePanelDefinition[] {
  const pets = MGPetTeam.getPetsForTeam(team);

  return getAvailableFeatures().filter(feature => {
    if (!feature.shouldDisplay) return true; // No filter = always show
    return feature.shouldDisplay(team, pets);
  });
}
```

---

#### Step 3: Done!

Feature will automatically:
- Appear in team expansion tabs (if `isAvailable()` returns `true`)
- Show collapsed badge (if `getSummary()` returns data)
- Filter based on team composition (if `shouldDisplay()` defined)
- Integrate with settings UI

**No other files need modification.**

---

### 4. Refactored XP Feature

**File:** `src/ui/sections/Pets/parts/featurePanels/xpFeature.ts` (NEW)

```typescript
/**
 * XP Tracker Feature Panel
 * Refactored from existing TeamXpPanel to use registry system
 */

import type { FeaturePanelDefinition } from './registry';
import { MGXPTracker, calculateTeamXpData, calculateTeamProgressPercent } from '../../../../../features/xpTracker';
import { TeamXpPanel } from '../TeamXpPanel'; // Existing component

export const xpFeature: FeaturePanelDefinition = {
  id: 'xp',
  label: 'XP Tracker',
  icon: '📊',
  category: 'stats',

  isAvailable: () => MGXPTracker.isEnabled(),

  getSummary: (team, pets) => {
    const progress = calculateTeamProgressPercent(team.id);

    // Hide badge if all pets are maxed
    if (progress >= 99) return null;

    return {
      text: `${Math.round(progress)}%`,
      variant: progress < 33 ? 'low' : progress < 67 ? 'medium' : 'high',
      tooltip: `Average progress to max STR: ${Math.round(progress)}%`,
      priority: 10, // High priority (show first)
    };
  },

  buildPanel: (team, container) => {
    const panel = new TeamXpPanel({ teamId: team.id });
    container.appendChild(panel.build());

    const xpData = calculateTeamXpData(team.id);
    if (xpData) panel.update(xpData);

    return {
      update: (updatedTeam, pets) => {
        const newData = calculateTeamXpData(updatedTeam.id);
        if (newData) panel.update(newData);
      },
      destroy: () => panel.destroy(),
      refresh: () => {
        const newData = calculateTeamXpData(team.id);
        if (newData) panel.update(newData);
      },
    };
  },

  shouldDisplay: (team, pets) => {
    // Always show XP tracker (all pets gain XP)
    return true;
  },
};
```

**Key Changes:**
- Wraps existing `TeamXpPanel` component (no refactor needed)
- Adds smart badge (hides when all pets maxed)
- Integrates with registry system
- Keeps all existing XP tracker logic intact

---

### 5. Stub Features (Future Implementation)

#### Turtle Feature (Stub)

**File:** `src/ui/sections/Pets/parts/featurePanels/turtleFeature.ts` (NEW)

```typescript
/**
 * Turtle Timer Feature Panel
 * STUB - To be implemented in future phase
 */

import type { FeaturePanelDefinition } from './registry';

export const turtleFeature: FeaturePanelDefinition = {
  id: 'turtle',
  label: 'Turtle Timer',
  icon: '🐢',
  category: 'tracking',

  // TODO: Implement MGTurtleTracker feature
  isAvailable: () => false, // Disabled until implemented

  getSummary: (team, pets) => {
    // TODO: Calculate turtle hatch times
    const turtles = pets.filter(p => p.petSpecies === 'Turtle');
    if (turtles.length === 0) return null;

    return {
      text: `${turtles.length} 🐢`,
      variant: 'neutral',
      tooltip: `${turtles.length} turtle(s) in team`,
      priority: 5,
    };
  },

  buildPanel: (team, container) => {
    // TODO: Build turtle timer panel
    const placeholder = document.createElement('div');
    placeholder.className = 'feature-placeholder';
    placeholder.innerHTML = `
      <div class="feature-placeholder__icon">🐢</div>
      <div class="feature-placeholder__title">Turtle Timer</div>
      <div class="feature-placeholder__message">Coming soon!</div>
    `;
    container.appendChild(placeholder);

    return {
      update: () => {},
      destroy: () => placeholder.remove(),
    };
  },

  shouldDisplay: (team, pets) => {
    // Only show if team has turtle pets or egg growth abilities
    return pets.some(p =>
      p.petSpecies === 'Turtle' ||
      p.abilities.some(a => a.includes('EggGrowth'))
    );
  },
};
```

---

#### Ability Feature (Stub)

**File:** `src/ui/sections/Pets/parts/featurePanels/abilityFeature.ts` (NEW)

```typescript
/**
 * Ability Tracker Feature Panel
 * STUB - To be implemented in future phase
 */

import type { FeaturePanelDefinition } from './registry';

export const abilityFeature: FeaturePanelDefinition = {
  id: 'ability',
  label: 'Abilities',
  icon: '⚡',
  category: 'analytics',

  // TODO: Implement MGAbilityTracker feature
  isAvailable: () => false, // Disabled until implemented

  getSummary: (team, pets) => {
    // TODO: Count rare/valuable abilities
    const totalAbilities = pets.reduce((sum, pet) => sum + pet.abilities.length, 0);

    return {
      text: `${totalAbilities} abilities`,
      variant: 'neutral',
      tooltip: `${totalAbilities} total abilities in team`,
      priority: 3,
    };
  },

  buildPanel: (team, container) => {
    // TODO: Build ability tracker panel
    const placeholder = document.createElement('div');
    placeholder.className = 'feature-placeholder';
    placeholder.innerHTML = `
      <div class="feature-placeholder__icon">⚡</div>
      <div class="feature-placeholder__title">Ability Tracker</div>
      <div class="feature-placeholder__message">Coming soon!</div>
    `;
    container.appendChild(placeholder);

    return {
      update: () => {},
      destroy: () => placeholder.remove(),
    };
  },

  shouldDisplay: () => true, // Always show (all pets have abilities)
};
```

---

#### Crop Feature (Stub)

**File:** `src/ui/sections/Pets/parts/featurePanels/cropFeature.ts` (NEW)

```typescript
/**
 * Crop Boost Tracker Feature Panel
 * STUB - To be implemented in future phase
 */

import type { FeaturePanelDefinition } from './registry';

const CROP_ABILITIES = [
  'PlantGrowthBoost', 'PlantGrowthBoostII', 'PlantGrowthBoostIII', 'SnowyPlantGrowthBoost',
  'ProduceScaleBoost', 'ProduceScaleBoostII', 'ProduceScaleBoostIII', 'SnowyCropSizeBoost',
  'ProduceMutationBoost', 'ProduceMutationBoostII', 'ProduceMutationBoostIII', 'SnowyCropMutationBoost',
  'RainDance', 'SnowGranter', 'FrostGranter', 'GoldGranter', 'RainbowGranter',
];

export const cropFeature: FeaturePanelDefinition = {
  id: 'crop',
  label: 'Crop Tracker',
  icon: '🌱',
  category: 'optimization',

  // TODO: Implement MGCropTracker feature
  isAvailable: () => false, // Disabled until implemented

  getSummary: (team, pets) => {
    // TODO: Calculate crop boost stats
    const cropBoostPets = pets.filter(p =>
      p.abilities.some(a => CROP_ABILITIES.includes(a))
    );

    if (cropBoostPets.length === 0) return null;

    return {
      text: `${cropBoostPets.length} boosts`,
      variant: 'success',
      tooltip: `${cropBoostPets.length} pet(s) with crop abilities`,
      priority: 6,
    };
  },

  buildPanel: (team, container) => {
    // TODO: Build crop tracker panel
    const placeholder = document.createElement('div');
    placeholder.className = 'feature-placeholder';
    placeholder.innerHTML = `
      <div class="feature-placeholder__icon">🌱</div>
      <div class="feature-placeholder__title">Crop Tracker</div>
      <div class="feature-placeholder__message">Coming soon!</div>
    `;
    container.appendChild(placeholder);

    return {
      update: () => {},
      destroy: () => placeholder.remove(),
    };
  },

  shouldDisplay: (team, pets) => {
    // Only show if team has crop-related abilities
    return pets.some(p =>
      p.abilities.some(a => CROP_ABILITIES.includes(a))
    );
  },
};
```

---

## C. Smart Display Management

### Overview

Intelligent system to show relevant features based on team composition, user preferences, and game state.

### 1. User Preferences for Feature Visibility

**File:** `src/ui/sections/Pets/state.ts` (Enhanced)

```typescript
/**
 * Pets Section State (Enhanced for Feature Management)
 */

export interface PetsSectionState {
  // ... existing state fields

  /** Feature display preferences */
  featurePreferences: FeatureDisplayPreferences;
}

export interface FeatureDisplayPreferences {
  /** Which feature to show by default when expanding teams */
  defaultFeature: string | 'auto'; // 'xp' | 'turtle' | 'ability' | 'auto' (use purpose detection)

  /** Features enabled globally (disabled features never show) */
  enabledFeatures: string[]; // ['xp', 'turtle', 'ability', 'crop']

  /** Collapsed badge configuration */
  collapsedBadges: CollapsedBadgeConfig;

  /** Remember last viewed feature per team */
  rememberLastFeature: boolean; // Default: true

  /** Team feature history (teamId → featureId) */
  teamFeatureHistory: Record<string, string>;

  /** Auto-detect team purpose and suggest features */
  autoDetectPurpose: boolean; // Default: true
}

export interface CollapsedBadgeConfig {
  /** Which features can show badges when collapsed */
  enabledBadges: string[]; // ['xp', 'turtle']

  /** Maximum number of badges to show per team */
  maxBadges: number; // Default: 3

  /** Hide badge if no meaningful data (e.g., no turtles in team) */
  hideEmpty: boolean; // Default: true

  /** Sort badges by priority (highest first) */
  sortByPriority: boolean; // Default: true
}

/**
 * Default preferences
 */
export const DEFAULT_FEATURE_PREFERENCES: FeatureDisplayPreferences = {
  defaultFeature: 'auto',
  enabledFeatures: ['xp'], // Only XP enabled by default (others added as features launch)
  collapsedBadges: {
    enabledBadges: ['xp'],
    maxBadges: 3,
    hideEmpty: true,
    sortByPriority: true,
  },
  rememberLastFeature: true,
  teamFeatureHistory: {},
  autoDetectPurpose: true,
};
```

---

### 2. Collapsed Badge Configuration

**Badge Display Logic:**

```typescript
/**
 * Get collapsed badges for a team
 * File: src/ui/sections/Pets/parts/featurePanels/badges.ts (NEW)
 */

import type { PetTeam } from '../../../../features/petTeam';
import type { FeatureSummary } from './registry';
import { getAvailableFeatures } from './index';
import { MGPetTeam } from '../../../../features/petTeam';
import { getPetsSectionState } from '../state';

export interface TeamBadge extends FeatureSummary {
  featureId: string;
  featureLabel: string;
  featureIcon: string;
}

/**
 * Calculate collapsed badges for a team
 */
export function getCollapsedBadges(team: PetTeam): TeamBadge[] {
  const state = getPetsSectionState();
  const config = state.featurePreferences.collapsedBadges;

  // Get pets for team
  const pets = MGPetTeam.getPetsForTeam(team);

  // Get available features
  const features = getAvailableFeatures();

  // Filter to enabled badge features
  const badgeFeatures = features.filter(f =>
    config.enabledBadges.includes(f.id) && f.getSummary
  );

  // Calculate summaries
  const badges: TeamBadge[] = [];

  for (const feature of badgeFeatures) {
    const summary = feature.getSummary!(team, pets);

    // Skip if no data and hideEmpty is true
    if (!summary && config.hideEmpty) continue;
    if (!summary) continue;

    badges.push({
      featureId: feature.id,
      featureLabel: feature.label,
      featureIcon: feature.icon,
      ...summary,
    });
  }

  // Sort by priority (if enabled)
  if (config.sortByPriority) {
    badges.sort((a, b) => (b.priority || 0) - (a.priority || 0));
  }

  // Limit to maxBadges
  return badges.slice(0, config.maxBadges);
}

/**
 * Build badge DOM element
 */
export function buildBadgeElement(badge: TeamBadge): HTMLElement {
  const el = document.createElement('span');
  el.className = `team-badge team-badge--${badge.variant || 'neutral'}`;
  el.setAttribute('data-feature', badge.featureId);
  el.textContent = `${badge.featureIcon} ${badge.text}`;

  if (badge.tooltip) {
    el.title = badge.tooltip;
  }

  return el;
}
```

**CSS for Badges:**

```css
/* File: src/ui/sections/Pets/parts/teamBadges.css.ts (NEW) */

.team-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  background: var(--soft);
  color: var(--fg);
  border: 1px solid var(--border);
  transition: all 0.2s ease;
}

.team-badge:hover {
  background: var(--muted);
  cursor: default;
}

/* Badge variants */
.team-badge--low {
  background: var(--error-bg);
  color: var(--error);
  border-color: var(--error);
}

.team-badge--medium {
  background: var(--warning-bg);
  color: var(--warning);
  border-color: var(--warning);
}

.team-badge--high {
  background: var(--success-bg);
  color: var(--success);
  border-color: var(--success);
}

.team-badge--warning {
  background: var(--warning-bg);
  color: var(--warning);
  border-color: var(--warning);
}

.team-badge--success {
  background: var(--success-bg);
  color: var(--success);
  border-color: var(--success);
}

.team-badge--neutral {
  background: var(--soft);
  color: var(--muted);
  border-color: var(--border);
}
```

---

### 3. Team Feature History (Remember Last Viewed)

**Feature Selection Logic:**

```typescript
/**
 * Determine which feature to show when expanding a team
 * File: src/ui/sections/Pets/parts/featurePanels/selection.ts (NEW)
 */

import type { PetTeam } from '../../../../features/petTeam';
import { detectTeamPurpose } from '../../../../features/petTeam/logic/purpose';
import { getFeatureById, getAvailableFeatures } from './index';
import { getPetsSectionState, updatePetsSectionState } from '../state';

/**
 * Select which feature to display for a team
 * Priority: User history > User default > Purpose detection > XP fallback
 */
export function selectFeatureForTeam(team: PetTeam): string {
  const state = getPetsSectionState();
  const prefs = state.featurePreferences;

  // 1. Check team history (if remember is enabled)
  if (prefs.rememberLastFeature) {
    const lastFeature = prefs.teamFeatureHistory[team.id];
    if (lastFeature) {
      const feature = getFeatureById(lastFeature);
      if (feature && feature.isAvailable()) {
        return lastFeature;
      }
    }
  }

  // 2. Check user default (if not 'auto')
  if (prefs.defaultFeature && prefs.defaultFeature !== 'auto') {
    const feature = getFeatureById(prefs.defaultFeature);
    if (feature && feature.isAvailable()) {
      return prefs.defaultFeature;
    }
  }

  // 3. Use purpose detection (if enabled)
  if (prefs.autoDetectPurpose) {
    const purpose = detectTeamPurpose(team);
    const suggestedFeature = purpose.suggestedFeatures[0];

    const feature = getFeatureById(suggestedFeature);
    if (feature && feature.isAvailable()) {
      return suggestedFeature;
    }
  }

  // 4. Fallback to first available feature (usually XP)
  const available = getAvailableFeatures();
  return available[0]?.id || 'xp';
}

/**
 * Record feature view in team history
 */
export function recordFeatureView(teamId: string, featureId: string): void {
  const state = getPetsSectionState();

  if (!state.featurePreferences.rememberLastFeature) return;

  updatePetsSectionState({
    featurePreferences: {
      ...state.featurePreferences,
      teamFeatureHistory: {
        ...state.featurePreferences.teamFeatureHistory,
        [teamId]: featureId,
      },
    },
  });
}
```

---

### 4. Game Metrics Intelligence (Detect Stage of Game)

**Future Enhancement:** Detect game progression stage to suggest relevant features.

**Placeholder Implementation:**

```typescript
/**
 * Game stage detection (future enhancement)
 * File: src/features/gameStage/detection.ts (FUTURE)
 */

export type GameStage =
  | 'early'      // < 10 pets, low coins, basic abilities
  | 'mid'        // 10-30 pets, decent coins, some rare abilities
  | 'late'       // 30+ pets, high coins, many rare abilities
  | 'endgame';   // All pets maxed, rainbow hunting, optimization

/**
 * Detect current game stage based on player metrics
 * TODO: Implement when needed for smarter defaults
 */
export function detectGameStage(): GameStage {
  const myPets = Globals.myPets.get();
  const petCount = myPets.all.length;
  const maxedPets = myPets.all.filter(p => p.isMature).length;
  const coins = Globals.myUser.get()?.coins || 0;

  // Early game: Few pets, still learning
  if (petCount < 10) return 'early';

  // Mid game: Building collection
  if (petCount < 30 || maxedPets < 10) return 'mid';

  // Late game: Optimizing teams
  if (maxedPets < petCount * 0.7) return 'late';

  // Endgame: All pets maxed, mutation hunting
  return 'endgame';
}

/**
 * Get suggested default feature based on game stage
 * TODO: Implement when needed
 */
export function getSuggestedFeatureByStage(stage: GameStage): string {
  const stageDefaults: Record<GameStage, string> = {
    'early': 'xp',       // Focus on leveling
    'mid': 'xp',         // Still leveling
    'late': 'ability',   // Optimize teams
    'endgame': 'mutation', // Rainbow hunting
  };

  return stageDefaults[stage];
}
```

**Integration (when implemented):**

```typescript
// In selectFeatureForTeam(), add after purpose detection:
if (prefs.useGameStageDefaults) {
  const stage = detectGameStage();
  const stageFeature = getSuggestedFeatureByStage(stage);

  const feature = getFeatureById(stageFeature);
  if (feature && feature.isAvailable()) {
    return stageFeature;
  }
}
```

---

## D. Future Extensibility

### Overview

Clear patterns and step-by-step guide for adding new features to the system.

### 1. How to Add New Features (Step-by-Step Guide)

#### Step 1: Plan Feature Requirements

**Before coding, answer:**

1. **What does this feature track?** (e.g., turtle hatch times, mutation probabilities)
2. **What abilities are relevant?** (e.g., Egg Growth Boost for turtle timer)
3. **What data is needed?** (e.g., egg placement time, hatch duration)
4. **What should the collapsed badge show?** (e.g., "3 hatching soon")
5. **When should this feature display?** (e.g., only for teams with turtles)

---

#### Step 2: Create Feature Backend (Optional)

If feature requires calculations beyond UI, create a feature module:

**File:** `src/features/myFeature/index.ts`

```typescript
/**
 * My Feature Module
 * Handles calculations and data for my feature
 */

export interface MyFeatureConfig {
  enabled: boolean;
  // ... config options
}

export interface MyFeatureData {
  // ... feature-specific data
}

export const MGMyFeature = {
  init() { /* ... */ },
  destroy() { /* ... */ },

  isEnabled(): boolean { /* ... */ },
  setEnabled(enabled: boolean) { /* ... */ },

  calculateData(teamId: string): MyFeatureData | null { /* ... */ },
  calculateSummary(teamId: string): string | null { /* ... */ },
} as const;
```

**Or:** Use existing features (XP tracker reused existing `MGXPTracker`).

---

#### Step 3: Create UI Component (Optional)

If feature needs custom UI beyond simple display:

**File:** `src/ui/sections/Pets/parts/MyFeaturePanel.ts`

```typescript
/**
 * My Feature Panel UI Component
 */

export interface MyFeaturePanelOptions {
  teamId: string;
}

export class MyFeaturePanel {
  private options: MyFeaturePanelOptions;
  private container: HTMLElement;

  constructor(options: MyFeaturePanelOptions) {
    this.options = options;
    this.container = document.createElement('div');
    this.container.className = 'my-feature-panel';
  }

  build(): HTMLElement {
    this.container.innerHTML = `
      <div class="my-feature-panel__header">
        <!-- Header content -->
      </div>
      <div class="my-feature-panel__body">
        <!-- Main content -->
      </div>
    `;

    return this.container;
  }

  update(data: MyFeatureData): void {
    // Update UI with new data
  }

  destroy(): void {
    this.container.remove();
  }
}
```

**Or:** Use simple HTML strings for basic displays.

---

#### Step 4: Create Feature Definition

**File:** `src/ui/sections/Pets/parts/featurePanels/myFeature.ts`

```typescript
import type { FeaturePanelDefinition } from './registry';
import { MGMyFeature } from '../../../../../features/myFeature';
import { MyFeaturePanel } from '../MyFeaturePanel';

export const myFeature: FeaturePanelDefinition = {
  id: 'my-feature',
  label: 'My Feature',
  icon: '🎯',
  category: 'stats',

  isAvailable: () => MGMyFeature.isEnabled(),

  getSummary: (team, pets) => {
    const data = MGMyFeature.calculateSummary(team.id);
    if (!data) return null;

    return {
      text: data,
      variant: 'neutral',
      tooltip: 'My feature summary',
      priority: 5,
    };
  },

  buildPanel: (team, container) => {
    const panel = new MyFeaturePanel({ teamId: team.id });
    container.appendChild(panel.build());

    const data = MGMyFeature.calculateData(team.id);
    if (data) panel.update(data);

    return {
      update: (updatedTeam, pets) => {
        const newData = MGMyFeature.calculateData(updatedTeam.id);
        if (newData) panel.update(newData);
      },
      destroy: () => panel.destroy(),
    };
  },

  shouldDisplay: (team, pets) => {
    // Optional: Filter based on team composition
    return true;
  },
};
```

---

#### Step 5: Register Feature

**File:** `src/ui/sections/Pets/parts/featurePanels/index.ts`

```typescript
import { myFeature } from './myFeature';

export const FEATURE_PANELS: FeaturePanelDefinition[] = [
  xpFeature,
  myFeature, // ← Add here
  // ... other features
];
```

---

#### Step 6: Add to Purpose Detection (Optional)

If feature should be suggested for specific team purposes:

**File:** `src/features/petTeam/logic/purpose.ts`

```typescript
// Add detection logic
const myFeatureAbilities = ['Ability1', 'Ability2'];
const myFeatureCount = countPetsWithAbility(pets, myFeatureAbilities);

if (myFeatureCount >= 2) {
  scores['my-purpose'] = 0.8;
  reasons.push(`${myFeatureCount} my-feature abilities`);
}

// Update feature map
const featureMap: Record<TeamPurpose, string[]> = {
  'my-purpose': ['my-feature', 'xp'],
  // ... other purposes
};
```

---

#### Step 7: Add to Settings UI (Future)

When settings UI is built, feature will auto-appear in:
- Feature enable/disable toggles
- Badge configuration
- Default feature selection

**No manual settings code needed** (handled by registry).

---

#### Step 8: Test

Test checklist:
- [ ] Feature appears in tabs when enabled
- [ ] Feature hidden when disabled
- [ ] Collapsed badge displays correctly
- [ ] Badge hides when `hideEmpty` is true and no data
- [ ] Panel builds and updates correctly
- [ ] `shouldDisplay()` filters correctly
- [ ] Purpose detection suggests feature (if applicable)
- [ ] Team history remembers feature view
- [ ] Multi-team expansion works
- [ ] Feature cleanup on destroy (no memory leaks)

---

### 2. Architecture Patterns to Follow

#### Pattern 1: Single Responsibility

Each feature should handle ONE concern:
- XP Tracker → Pet strength progression
- Turtle Timer → Egg hatch times
- Ability Tracker → Ability analysis
- Crop Tracker → Crop boost stats

**Don't:** Combine unrelated features (e.g., XP + Coin tracking in one feature).

---

#### Pattern 2: Loose Coupling

Features should not depend on each other:
- Use registry for feature discovery
- Use `MGPetTeam` for shared pet data
- Use `Globals` for game state
- Don't import other feature definitions

**Example (Good):**
```typescript
// Uses shared API
const pets = MGPetTeam.getPetsForTeam(team);
```

**Example (Bad):**
```typescript
// Direct coupling to other feature
import { xpFeature } from './xpFeature';
const xpData = xpFeature.getSummary(team);
```

---

#### Pattern 3: Graceful Degradation

Features should handle missing data gracefully:
- Return `null` from `getSummary()` if no data
- Show placeholder in `buildPanel()` if feature not ready
- Don't crash if abilities are missing

**Example:**
```typescript
getSummary: (team, pets) => {
  const data = calculateData(team);

  // Gracefully handle no data
  if (!data || data.isEmpty) return null;

  return { text: data.summary };
}
```

---

#### Pattern 4: Performance Awareness

- Cache calculations when possible
- Avoid expensive operations in `getSummary()` (called on every team render)
- Use `refresh()` for auto-update features (don't poll unnecessarily)
- Clean up timers/listeners in `destroy()`

**Example:**
```typescript
buildPanel: (team, container) => {
  let updateInterval: number | null = null;

  // Auto-update every 3 seconds
  updateInterval = window.setInterval(() => {
    instance.refresh?.();
  }, 3000);

  return {
    update: () => { /* ... */ },
    destroy: () => {
      if (updateInterval) clearInterval(updateInterval);
    },
  };
}
```

---

#### Pattern 5: Theme Consistency

Use theme CSS variables, never hardcoded colors:

**Good:**
```css
.my-feature-panel {
  background: var(--bg);
  color: var(--fg);
  border: 1px solid var(--border);
}

.my-feature-badge--high {
  background: var(--success-bg);
  color: var(--success);
}
```

**Bad:**
```css
.my-feature-panel {
  background: #1a1a1a;
  color: #ffffff;
  border: 1px solid #333333;
}
```

---

### 3. Integration with Existing Systems

#### Integration Point 1: MGPetTeam

**Available APIs:**
```typescript
MGPetTeam.getPetsForTeam(team) → UnifiedPet[]
MGPetTeam.getTeam(teamId) → PetTeam | null
MGPetTeam.detectTeamPurpose(team) → TeamPurposeAnalysis
MGPetTeam.isTeamFull(team) → boolean
```

**Use for:** Getting pet data, team info, purpose detection.

---

#### Integration Point 2: MGXPTracker (Example)

**Available APIs:**
```typescript
MGXPTracker.isEnabled() → boolean
MGXPTracker.getAllPetsProgress() → PetProgress[]
MGXPTracker.calculateTeamXpData(teamId) → TeamXpData | null
MGXPTracker.calculateTeamProgressPercent(teamId) → number
```

**Use for:** XP-related calculations, progress tracking.

---

#### Integration Point 3: Globals

**Available APIs:**
```typescript
Globals.myPets.get() → { all: UnifiedPet[] }
Globals.myUser.get() → UserData
Globals.myPlants.get() → PlantData
Globals.currentWeather.get() → WeatherId
```

**Use for:** Game state access, current conditions.

---

#### Integration Point 4: Theme System

**CSS Variables Available:**
```css
--bg, --soft, --muted, --fg
--border, --accent
--success, --success-bg
--warning, --warning-bg
--error, --error-bg
--pill-from, --pill-to
```

**Use for:** Consistent styling across all themes.

---

#### Integration Point 5: Pets Section State

**Available APIs:**
```typescript
getPetsSectionState() → PetsSectionState
updatePetsSectionState(partial) → void
```

**Use for:** Reading/updating feature preferences, team history.

---

## Summary

Phase 2 provides a robust, extensible architecture for unlimited future features:

### Key Achievements

1. **Team Purpose Detection** - 8 categories, confidence scoring, multi-purpose support
2. **Feature Panel Registry** - Add new features with ~50 lines of code
3. **Smart Display Management** - User prefs, team history, purpose-based defaults
4. **Future-Proof Patterns** - Clear guidelines for maintainability

### What's Next

After Phase 2 implementation:
- Phase 3: Implement Turtle Timer (first new feature)
- Phase 4: Implement Ability Tracker
- Phase 5: Implement Crop/Mutation Trackers
- Phase 6: Settings UI for feature management

### Implementation Order

1. ✅ **Phase 1 Complete** - Calculator modules, automatic strength
2. 🔧 **Phase 2A** - Team purpose detection (`purpose.ts`)
3. 🔧 **Phase 2B** - Feature registry system (`registry.ts`, `index.ts`)
4. 🔧 **Phase 2C** - Refactor XP tracker to use registry (`xpFeature.ts`)
5. 🔧 **Phase 2D** - Add stub features (turtle, ability, crop)
6. 🔧 **Phase 2E** - Smart display management (badges, history, selection)
7. ✅ **Phase 2 Complete** - Ready for new feature development

---

**End of Document**
