import * as v from 'valibot';
import type { FaunaAbilityBlueprint } from './fauna-blueprints';

export const faunaAbilitiesDex = {
  // ===== CROP ABILITIES =====
  // Abilities that directly affect crops

  // Scale/Size Effects
  ProduceScaleBoost: {
    name: 'Crop Size Boost I',
    trigger: 'continuous',
    baseProbability: 0.3,
    baseParameters: {
      scaleIncreasePercentage: 6,
    },
  },
  ProduceScaleBoostII: {
    name: 'Crop Size Boost II',
    trigger: 'continuous',
    baseProbability: 0.4,
    baseParameters: {
      scaleIncreasePercentage: 10,
    },
  },
  // Duplication/Quantity Effects
  DoubleHarvest: {
    name: 'Double Harvest',
    trigger: 'harvest',
    baseProbability: 5,
    baseParameters: {},
  },
  DoubleHatch: {
    name: 'Double Hatch',
    trigger: 'hatchEgg',
    baseProbability: 3,
    baseParameters: {},
  },
  // Economic Effects
  ProduceEater: {
    name: 'Crop Eater',
    trigger: 'continuous',
    baseProbability: 60,
    baseParameters: {
      cropSellPriceIncreasePercentage: 150,
    },
  },
  SellBoostI: {
    name: 'Sell Boost I',
    trigger: 'sellAllCrops',
    baseProbability: 10,
    baseParameters: {
      cropSellPriceIncreasePercentage: 20,
    },
  },
  SellBoostII: {
    name: 'Sell Boost II',
    trigger: 'sellAllCrops',
    baseProbability: 12,
    baseParameters: {
      cropSellPriceIncreasePercentage: 30,
    },
  },
  SellBoostIII: {
    name: 'Sell Boost III',
    trigger: 'sellAllCrops',
    baseProbability: 14,
    baseParameters: {
      cropSellPriceIncreasePercentage: 40,
    },
  },
  SellBoostIV: {
    name: 'Sell Boost IV',
    trigger: 'sellAllCrops',
    baseProbability: 16,
    baseParameters: {
      cropSellPriceIncreasePercentage: 50,
    },
  },
  ProduceRefund: {
    name: 'Crop Refund',
    trigger: 'sellAllCrops',
    baseProbability: 20,
    baseParameters: {},
  },
  // ===== PLANT ABILITIES =====
  // Abilities that affect plants while growing

  // Growth Effects
  PlantGrowthBoost: {
    name: 'Plant Growth Boost I',
    trigger: 'continuous',
    baseProbability: 24,
    baseParameters: {
      plantGrowthReductionMinutes: 3,
    },
  },
  PlantGrowthBoostII: {
    name: 'Plant Growth Boost II',
    trigger: 'continuous',
    baseProbability: 27,
    baseParameters: {
      plantGrowthReductionMinutes: 5,
    },
  },
  // Mutation Effects
  ProduceMutationBoost: {
    name: 'Crop Mutation Boost I',
    trigger: 'continuous',
    baseParameters: {
      mutationChanceIncreasePercentage: 10,
    },
  },
  ProduceMutationBoostII: {
    name: 'Crop Mutation Boost II',
    trigger: 'continuous',
    baseParameters: {
      mutationChanceIncreasePercentage: 15,
    },
  },
  PetMutationBoost: {
    name: 'Pet Mutation Boost I',
    trigger: 'hatchEgg',
    baseParameters: {
      mutationChanceIncreasePercentage: 7,
    },
  },
  PetMutationBoostII: {
    name: 'Pet Mutation Boost II',
    trigger: 'hatchEgg',
    baseParameters: {
      mutationChanceIncreasePercentage: 10,
    },
  },
  GoldGranter: {
    name: 'Gold Granter',
    trigger: 'continuous',
    baseProbability: 0.72,
    baseParameters: {
      grantedMutations: ['Gold'],
    },
  },
  RainbowGranter: {
    name: 'Rainbow Granter',
    trigger: 'continuous',
    baseProbability: 0.72,
    baseParameters: {
      grantedMutations: ['Rainbow'],
    },
  },
  RainDance: {
    name: 'Rain Granter',
    trigger: 'continuous',
    baseProbability: 10,
    baseParameters: {
      grantedMutations: ['Wet'],
    },
  },
  // ===== EGG ABILITIES =====
  // Abilities that affect eggs and hatching

  EggGrowthBoost: {
    name: 'Egg Growth Boost I',
    trigger: 'continuous',
    baseProbability: 21,
    baseParameters: {
      eggGrowthTimeReductionMinutes: 7,
    },
  },
  EggGrowthBoostII_NEW: {
    name: 'Egg Growth Boost II',
    trigger: 'continuous',
    baseProbability: 24,
    baseParameters: {
      eggGrowthTimeReductionMinutes: 9,
    },
  },
  // We upgraded Egg Growth boost II to III retroactively but didn't want to do a whole
  // schema migration, so we just changed name and added a EggGrowthBoostII_NEW.
  EggGrowthBoostII: {
    name: 'Egg Growth Boost III',
    trigger: 'continuous',
    baseProbability: 27,
    baseParameters: {
      eggGrowthTimeReductionMinutes: 11,
    },
  },
  // ===== PET ABILITIES =====
  // Abilities that affect pets (including the pet with the ability)

  // Growth/Development Effects
  PetAgeBoost: {
    name: 'Hatch XP Boost I',
    trigger: 'hatchEgg',
    baseProbability: 50,
    baseParameters: {
      bonusXp: 8000,
    },
  },
  PetAgeBoostII: {
    name: 'Hatch XP Boost II',
    trigger: 'hatchEgg',
    baseProbability: 60,
    baseParameters: {
      bonusXp: 12_000,
    },
  },
  PetHatchSizeBoost: {
    name: 'Max Strength Boost I',
    trigger: 'hatchEgg',
    baseProbability: 12,
    baseParameters: {
      maxStrengthIncreasePercentage: 2.4,
    },
  },
  PetHatchSizeBoostII: {
    name: 'Max Strength Boost II',
    trigger: 'hatchEgg',
    baseProbability: 14,
    baseParameters: {
      maxStrengthIncreasePercentage: 3.5,
    },
  },
  // Experience/Progression Effects
  PetXpBoost: {
    name: 'XP Boost I',
    trigger: 'continuous',
    baseProbability: 30,
    baseParameters: {
      bonusXp: 300,
    },
  },
  PetXpBoostII: {
    name: 'XP Boost II',
    trigger: 'continuous',
    baseProbability: 35,
    baseParameters: {
      bonusXp: 400,
    },
  },
  // Hunger/Maintenance Effects
  HungerRestore: {
    name: 'Hunger Restore I',
    trigger: 'continuous',
    baseProbability: 12,
    baseParameters: {
      hungerRestorePercentage: 30,
    },
  },
  HungerRestoreII: {
    name: 'Hunger Restore II',
    trigger: 'continuous',
    baseProbability: 14,
    baseParameters: {
      hungerRestorePercentage: 35,
    },
  },
  HungerBoost: {
    name: 'Hunger Boost I',
    trigger: 'continuous',
    baseParameters: {
      hungerDepletionRateDecreasePercentage: 12,
    },
  },
  HungerBoostII: {
    name: 'Hunger Boost II',
    trigger: 'continuous',
    baseParameters: {
      hungerDepletionRateDecreasePercentage: 16,
    },
  },
  // Economic Effects
  PetRefund: {
    name: 'Pet Refund I',
    trigger: 'sellPet',
    baseProbability: 5,
    baseParameters: {},
  },
  PetRefundII: {
    name: 'Pet Refund II',
    trigger: 'sellPet',
    baseProbability: 7,
    baseParameters: {},
  },
  // Special Effects
  Copycat: {
    name: 'Copycat',
    trigger: 'continuous',
    baseProbability: 1,
    baseParameters: {},
  },

  // ===== USER/RESOURCE ABILITIES =====
  // Abilities that generate resources for the user
  CoinFinderI: {
    name: 'Coin Finder I',
    trigger: 'continuous',
    baseProbability: 35,
    baseParameters: {
      baseMaxCoinsFindable: 120_000,
    },
  },
  CoinFinderII: {
    name: 'Coin Finder II',
    trigger: 'continuous',
    baseProbability: 13,
    baseParameters: {
      baseMaxCoinsFindable: 1_200_000,
    },
  },
  CoinFinderIII: {
    name: 'Coin Finder III',
    trigger: 'continuous',
    baseProbability: 6,
    baseParameters: {
      baseMaxCoinsFindable: 10_000_000,
    },
  },
  SeedFinderI: {
    name: 'Seed Finder I',
    trigger: 'continuous',
    baseProbability: 40,
    baseParameters: {},
  },
  SeedFinderII: {
    name: 'Seed Finder II',
    trigger: 'continuous',
    baseProbability: 20,
    baseParameters: {},
  },
  SeedFinderIII: {
    name: 'Seed Finder III',
    trigger: 'continuous',
    baseProbability: 10,
    baseParameters: {},
  },
  SeedFinderIV: {
    name: 'Seed Finder IV',
    trigger: 'continuous',
    baseProbability: 0.01,
    baseParameters: {},
  },
} as const satisfies Record<Capitalize<string>, FaunaAbilityBlueprint>;

export type FaunaAbilityId = keyof typeof faunaAbilitiesDex;
export const faunaAbilityIds = Object.keys(
  faunaAbilitiesDex
) as FaunaAbilityId[];
export const FaunaAbilityIdSchema = v.picklist(faunaAbilityIds);

type NonEmptyBaseParameters<T> = T extends Record<string, never> ? never : T;

export type FaunaAbilityBaseParameters = {
  [K in FaunaAbilityId]: NonEmptyBaseParameters<
    (typeof faunaAbilitiesDex)[K]['baseParameters']
  >;
}[FaunaAbilityId] extends infer U
  ? U extends Record<string, unknown>
    ? keyof U
    : never
  : never;
