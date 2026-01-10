import * as v from 'valibot';
import { WeatherId } from '../weather';
import type { FaunaAbilityBlueprint } from './fauna-blueprints';

export const faunaAbilitiesDex = {
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
  SnowyCoinFinder: {
    name: 'Snowy Coin Finder',
    trigger: 'continuous',
    baseProbability: 15,
    baseParameters: {
      baseMaxCoinsFindable: 5_000_000,
      requiredWeather: WeatherId.Frost,
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
  PlantGrowthBoostIII: {
    name: 'Plant Growth Boost III',
    trigger: 'continuous',
    baseProbability: 30,
    baseParameters: {
      plantGrowthReductionMinutes: 7,
    },
  },
  SnowyPlantGrowthBoost: {
    name: 'Snowy Plant Growth Boost',
    trigger: 'continuous',
    baseProbability: 40,
    baseParameters: {
      plantGrowthReductionMinutes: 6,
      requiredWeather: WeatherId.Frost,
    },
  },
  ProduceEater: {
    name: 'Crop Eater',
    trigger: 'continuous',
    baseProbability: 60,
    baseParameters: {
      cropSellPriceIncreasePercentage: 150,
    },
  },
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
  ProduceScaleBoostIII: {
    name: 'Crop Size Boost III',
    trigger: 'continuous',
    baseProbability: 0.5,
    baseParameters: {
      scaleIncreasePercentage: 14,
    },
  },
  SnowyCropSizeBoost: {
    name: 'Snowy Crop Size Boost',
    trigger: 'continuous',
    baseProbability: 0.8,
    baseParameters: {
      scaleIncreasePercentage: 12,
      requiredWeather: WeatherId.Frost,
    },
  },
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
  ProduceMutationBoostIII: {
    name: 'Crop Mutation Boost III',
    trigger: 'continuous',
    baseParameters: {
      mutationChanceIncreasePercentage: 20,
    },
  },
  SnowyCropMutationBoost: {
    name: 'Snowy Crop Mutation Boost',
    trigger: 'continuous',
    baseParameters: {
      mutationChanceIncreasePercentage: 22,
      requiredWeather: WeatherId.Frost,
    },
  },
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
  SnowyEggGrowthBoost: {
    name: 'Snowy Egg Growth Boost',
    trigger: 'continuous',
    baseProbability: 35,
    baseParameters: {
      eggGrowthTimeReductionMinutes: 10,
      requiredWeather: WeatherId.Frost,
    },
  },
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
  PetXpBoostIII: {
    name: 'XP Boost III',
    trigger: 'continuous',
    baseProbability: 40,
    baseParameters: {
      bonusXp: 500,
    },
  },
  SnowyPetXpBoost: {
    name: 'Snowy XP Boost',
    trigger: 'continuous',
    baseProbability: 50,
    baseParameters: {
      bonusXp: 450,
      requiredWeather: WeatherId.Frost,
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
  HungerBoostIII: {
    name: 'Hunger Boost III',
    trigger: 'continuous',
    baseParameters: {
      hungerDepletionRateDecreasePercentage: 20,
    },
  },
  SnowyHungerBoost: {
    name: 'Snowy Hunger Boost',
    trigger: 'continuous',
    baseParameters: {
      hungerDepletionRateDecreasePercentage: 30,
      requiredWeather: WeatherId.Frost,
    },
  },
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
  HungerRestoreIII: {
    name: 'Hunger Restore III',
    trigger: 'continuous',
    baseProbability: 16,
    baseParameters: {
      hungerRestorePercentage: 40,
    },
  },
  SnowyHungerRestore: {
    name: 'Snowy Hunger Restore',
    trigger: 'continuous',
    baseProbability: 20,
    baseParameters: {
      hungerRestorePercentage: 38,
      requiredWeather: WeatherId.Frost,
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
  PetMutationBoostIII: {
    name: 'Pet Mutation Boost III',
    trigger: 'hatchEgg',
    baseParameters: {
      mutationChanceIncreasePercentage: 13,
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
  DoubleHarvest: {
    name: 'Double Harvest',
    trigger: 'harvest',
    baseProbability: 5,
    baseParameters: {},
  },
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
  PetAgeBoostIII: {
    name: 'Hatch XP Boost III',
    trigger: 'hatchEgg',
    baseProbability: 70,
    baseParameters: {
      bonusXp: 16_000,
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
  PetHatchSizeBoostIII: {
    name: 'Max Strength Boost III',
    trigger: 'hatchEgg',
    baseProbability: 16,
    baseParameters: {
      maxStrengthIncreasePercentage: 4.6,
    },
  },
  DoubleHatch: {
    name: 'Double Hatch',
    trigger: 'hatchEgg',
    baseProbability: 3,
    baseParameters: {},
  },
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
  RainDance: {
    name: 'Rain Granter',
    trigger: 'continuous',
    baseProbability: 10,
    baseParameters: {
      grantedMutations: ['Wet'],
    },
  },
  SnowGranter: {
    name: 'Snow Granter',
    trigger: 'continuous',
    baseProbability: 8,
    baseParameters: {
      grantedMutations: ['Chilled'],
    },
  },
  FrostGranter: {
    name: 'Frost Granter',
    trigger: 'continuous',
    baseProbability: 6,
    baseParameters: {
      grantedMutations: ['Frozen'],
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
  Copycat: {
    name: 'Copycat',
    trigger: 'continuous',
    baseProbability: 1,
    baseParameters: {},
  },
} as const satisfies Record<Capitalize<string>, FaunaAbilityBlueprint>;

export type FaunaAbilityId = keyof typeof faunaAbilitiesDex;
export const faunaAbilityIds = Object.keys(
  faunaAbilitiesDex
) as FaunaAbilityId[];
export const FaunaAbilityIdSchema = v.picklist(faunaAbilityIds);

/**
 * Map of FaunaAbilityIds to their index for stable sorting.
 */
const faunaAbilityIdOrder = new Map<FaunaAbilityId, number>(
  faunaAbilityIds.map((id, idx) => [id, idx])
);

/**
 * Sorts FaunaAbilityIds using a cached order map for stable sorting.
 * Example:
 * ```ts
 * const abilities = ['CoinFinderI', 'CoinFinderII', 'DoubleHarvest'];
 * const sortedAbilities = abilities.toSorted(faunaAbilitySortFn);
 * console.log(sortedAbilities); // ['CoinFinderI', 'CoinFinderII', 'DoubleHarvest']
 * ```
 */
export function faunaAbilitySortFn(
  a: FaunaAbilityId,
  b: FaunaAbilityId
): number {
  // Push unknown abilities to the end with Infinity
  return (
    (faunaAbilityIdOrder.get(a) ?? Infinity) -
    (faunaAbilityIdOrder.get(b) ?? Infinity)
  );
}

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
