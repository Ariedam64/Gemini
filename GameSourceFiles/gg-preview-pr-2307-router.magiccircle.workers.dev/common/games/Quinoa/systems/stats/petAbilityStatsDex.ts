import * as v from 'valibot';
import { FaunaAbilityId } from '../fauna/faunaAbilitiesDex';
import { StatBlueprint } from './stats-blueprint';

/**
 * Stats tracking for pet abilities.
 * - Ability IDs track the number of times each ability has triggered
 * - Extended stats track cumulative values (coins earned, hunger restored, etc.)
 *
 * Note: We do NOT track stats for passive abilities since it's not easy to quantify them.
 */
type PetAbilitiesStatsDex = Record<
  Exclude<
    FaunaAbilityId,
    | 'ProduceMutationBoost'
    | 'ProduceMutationBoostII'
    | 'PetMutationBoost'
    | 'PetMutationBoostII'
  >,
  StatBlueprint
> &
  Record<string, StatBlueprint>;

export const petAbilitiesStatsDex = {
  // ===== ABILITY TRIGGER COUNTS =====
  // Each ability ID tracks how many times it has successfully triggered
  CoinFinderI: {
    name: 'Coin Finder I',
    description: 'Number of times Coin Finder I triggered',
  },
  CoinFinderII: {
    name: 'Coin Finder II',
    description: 'Number of times Coin Finder II triggered',
  },
  CoinFinderIII: {
    name: 'Coin Finder III',
    description: 'Number of times Coin Finder III triggered',
  },
  HungerRestore: {
    name: 'Hunger Restore I',
    description: 'Number of times Hunger Restore I triggered',
  },
  HungerRestoreII: {
    name: 'Hunger Restore II',
    description: 'Number of times Hunger Restore II triggered',
  },
  DoubleHarvest: {
    name: 'Double Harvest',
    description: 'Number of times Double Harvest triggered',
  },
  SeedFinderI: {
    name: 'Seed Finder I',
    description: 'Number of times Seed Finder I triggered',
  },
  SeedFinderII: {
    name: 'Seed Finder II',
    description: 'Number of times Seed Finder II triggered',
  },
  SeedFinderIII: {
    name: 'Seed Finder III',
    description: 'Number of times Seed Finder III triggered',
  },
  SeedFinderIV: {
    name: 'Seed Finder IV',
    description: 'Number of times Seed Finder IV triggered',
  },
  ProduceRefund: {
    name: 'Crop Refund',
    description: 'Number of times Crop Refund triggered',
  },
  SellBoostI: {
    name: 'Sell Boost I',
    description: 'Number of times Sell Boost I triggered',
  },
  SellBoostII: {
    name: 'Sell Boost II',
    description: 'Number of times Sell Boost II triggered',
  },
  SellBoostIII: {
    name: 'Sell Boost III',
    description: 'Number of times Sell Boost III triggered',
  },
  SellBoostIV: {
    name: 'Sell Boost IV',
    description: 'Number of times Sell Boost IV triggered',
  },
  PetXpBoost: {
    name: 'XP Boost I',
    description: 'Number of times XP Boost I triggered',
  },
  PetXpBoostII: {
    name: 'XP Boost II',
    description: 'Number of times XP Boost II triggered',
  },
  // We no longer track hunger boost abilities since they trigger every second
  HungerBoost: {
    name: 'Hunger Boost I',
    description: 'Number of times Hunger Boost I triggered',
    isHidden: true,
  },
  HungerBoostII: {
    name: 'Hunger Boost II',
    description: 'Number of times Hunger Boost II triggered',
    isHidden: true,
  },
  PetRefund: {
    name: 'Pet Refund I',
    description: 'Number of times Pet Refund I triggered',
  },
  PetRefundII: {
    name: 'Pet Refund II',
    description: 'Number of times Pet Refund II triggered',
  },
  PetAgeBoost: {
    name: 'Hatch XP Boost I',
    description: 'Number of times Hatch XP Boost I triggered',
  },
  PetAgeBoostII: {
    name: 'Hatch XP Boost II',
    description: 'Number of times Hatch XP Boost II triggered',
  },
  EggGrowthBoost: {
    name: 'Egg Growth Boost I',
    description: 'Number of times Egg Growth Boost I triggered',
  },
  EggGrowthBoostII_NEW: {
    name: 'Egg Growth Boost II',
    description: 'Number of times Egg Growth Boost II triggered',
  },
  // We upgraded Egg Growth boost II to III retroactively but didn't want to do a whole
  // schema migration, so we just changed name and added a EggGrowthBoostII_NEW.
  EggGrowthBoostII: {
    name: 'Egg Growth Boost III',
    description: 'Number of times Egg Growth Boost III triggered',
  },
  PetHatchSizeBoost: {
    name: 'Max Strength Boost I',
    description: 'Number of times Max Strength Boost I triggered',
  },
  PetHatchSizeBoostII: {
    name: 'Max Strength Boost II',
    description: 'Number of times Max Strength Boost II triggered',
  },
  Copycat: {
    name: 'Copycat',
    description: 'Number of times Copycat triggered',
  },
  DoubleHatch: {
    name: 'Double Hatch',
    description: 'Number of times Double Hatch triggered',
  },
  ProduceScaleBoost: {
    name: 'Crop Size Boost I',
    description: 'Number of times Crop Size Boost I triggered',
  },
  ProduceScaleBoostII: {
    name: 'Crop Size Boost II',
    description: 'Number of times Crop Size Boost II triggered',
  },
  PlantGrowthBoost: {
    name: 'Plant Growth Boost I',
    description: 'Number of times Plant Growth Boost I triggered',
  },
  PlantGrowthBoostII: {
    name: 'Plant Growth Boost II',
    description: 'Number of times Plant Growth Boost II triggered',
  },
  GoldGranter: {
    name: 'Gold Granter',
    description: 'Number of times Gold Granter triggered',
  },
  RainbowGranter: {
    name: 'Rainbow Granter',
    description: 'Number of times Rainbow Granter triggered',
  },
  RainDance: {
    name: 'Rain Granter',
    description: 'Number of times Rain Granter triggered',
  },
  ProduceEater: {
    name: 'Crop Eater',
    description: 'Number of times Crop Eater triggered',
  },

  // ===== EXTENDED CUMULATIVE STATS =====
  // These track specific cumulative values across all ability triggers

  // Coin-related
  totalCoinsFound: {
    name: 'Total Coins Found',
    description: 'Total coins earned from all Coin Finder abilities',
  },
  totalSellBoostBonusCoins: {
    name: 'Total Bonus Coins from Sell Boost',
    description: 'Total bonus coins earned from all Sell Boost abilities',
  },
  totalCoinsFromProduceEater: {
    name: 'Total Coins from Crop Eater',
    description: 'Total coins earned from Crop Eater ability',
  },

  // Hunger-related
  totalHungerRestored: {
    name: 'Total Hunger Restored',
    description: 'Total hunger restored by Hunger Restore abilities',
  },
  totalHungerBoosted: {
    name: 'Total Hunger Boosted',
    description: 'Total hunger gained from Hunger Boost abilities',
  },

  // XP-related
  totalXpBoosted: {
    name: 'Total XP Boosted During Growth',
    description: 'Total XP gained from Pet XP Boost abilities',
  },
  totalHatchXpBoosted: {
    name: 'Total XP Boosted During Hatching',
    description: 'Total XP gained from Pet Age Boost abilities',
  },

  // Growth-related
  secondsReducedPlantGrowth: {
    name: 'Time Saved: Plant Growth Boost',
    description: 'Total time saved from Plant Growth Boost abilities',
    formatAsTime: true,
  },
  secondsReducedEggGrowth: {
    name: 'Time Saved: Egg Growth Boost',
    description: 'Total time saved from Egg Growth Boost abilities',
    formatAsTime: true,
  },
} as const satisfies PetAbilitiesStatsDex;

export type PetAbilityStatId = keyof typeof petAbilitiesStatsDex;

export const petAbilityStatIds = Object.keys(
  petAbilitiesStatsDex
) as PetAbilityStatId[];
export const PetAbilityStatIdSchema = v.picklist(petAbilityStatIds);
export const petAbilityStatEntries = Object.entries(
  petAbilitiesStatsDex
) as Array<[PetAbilityStatId, StatBlueprint]>;
