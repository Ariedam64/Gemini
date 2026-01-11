// src/modules/data/logic/abilityFormatter.ts
// Format pet ability activity logs into human-readable descriptions

/**
 * Activity log entry structure from the game
 */
export interface ActivityLogEntry {
  action: string;
  timestamp: number;
  parameters: Record<string, unknown>;
}

/**
 * Pet ability action types (from ActivityLogSchema)
 */
export const PET_ABILITY_ACTIONS = [
  // Coin Finders
  'CoinFinderI',
  'CoinFinderII',
  'CoinFinderIII',
  // Seed Finders
  'SeedFinderI',
  'SeedFinderII',
  'SeedFinderIII',
  'SeedFinderIV',
  // Hunger Restore
  'HungerRestore',
  'HungerRestoreII',
  // Double Harvest/Hatch
  'DoubleHarvest',
  'DoubleHatch',
  // Produce Eater
  'ProduceEater',
  // Pet Hatch Size Boost
  'PetHatchSizeBoost',
  'PetHatchSizeBoostII',
  // Pet Age Boost
  'PetAgeBoost',
  'PetAgeBoostII',
  // Pet Refund
  'PetRefund',
  'PetRefundII',
  // Produce Refund
  'ProduceRefund',
  // Sell Boost
  'SellBoostI',
  'SellBoostII',
  'SellBoostIII',
  'SellBoostIV',
  // Gold/Rainbow/Rain
  'GoldGranter',
  'RainbowGranter',
  'RainDance',
  // Pet XP Boost
  'PetXpBoost',
  'PetXpBoostII',
  // Egg Growth Boost
  'EggGrowthBoost',
  'EggGrowthBoostII_NEW',
  'EggGrowthBoostII',
  // Plant Growth Boost
  'PlantGrowthBoost',
  'PlantGrowthBoostII',
  // Produce Scale Boost
  'ProduceScaleBoost',
  'ProduceScaleBoostII',
] as const;

export type PetAbilityAction = (typeof PET_ABILITY_ACTIONS)[number];

/**
 * Check if an action is a pet ability trigger
 */
export function isPetAbilityAction(action: string): action is PetAbilityAction {
  return PET_ABILITY_ACTIONS.includes(action as PetAbilityAction);
}

/**
 * Filter activity logs to only pet ability actions
 */
export function filterPetAbilityLogs(logs: ActivityLogEntry[]): ActivityLogEntry[] {
  return logs.filter((log) => isPetAbilityAction(log.action));
}

/**
 * Format time in seconds to human-readable string
 * Examples: "3m 5s", "45s", "1h 23m"
 */
function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

/**
 * Get pet display name (use name if available, otherwise species)
 */
function getPetName(pet: any): string {
  return pet?.name || pet?.petSpecies || 'Unknown Pet';
}

/**
 * Format ability log entry into human-readable description
 */
export function formatAbilityLog(log: ActivityLogEntry): string {
  const { action, parameters } = log;
  const params = parameters as any;

  switch (action) {
    // ========== Coin Finders ==========
    case 'CoinFinderI':
    case 'CoinFinderII':
    case 'CoinFinderIII': {
      const coins = params.coinsFound || 0;
      return `Found ${coins} coins`;
    }

    // ========== Seed Finders ==========
    case 'SeedFinderI':
    case 'SeedFinderII':
    case 'SeedFinderIII':
    case 'SeedFinderIV': {
      const speciesId = params.speciesId || 'Unknown';
      return `Found 1× ${speciesId} seed`;
    }

    // ========== Hunger Restore ==========
    case 'HungerRestore':
    case 'HungerRestoreII': {
      const targetName = getPetName(params.targetPet);
      const amount = params.hungerRestoreAmount || 0;

      // Check if target is itself
      const isSelf = params.pet?.id === params.targetPet?.id;
      const target = isSelf ? 'itself' : targetName;

      return `Restored ${amount} hunger to ${target}`;
    }

    // ========== Double Harvest ==========
    case 'DoubleHarvest': {
      const cropSpecies = params.harvestedCrop?.species || 'Unknown';
      return `Double harvested ${cropSpecies}`;
    }

    // ========== Double Hatch ==========
    case 'DoubleHatch': {
      const extraPetSpecies = params.extraPet?.petSpecies || 'Unknown';
      return `Double hatched ${extraPetSpecies}`;
    }

    // ========== Produce Eater ==========
    case 'ProduceEater': {
      const cropSpecies = params.growSlot?.species || 'Unknown';
      const sellPrice = params.sellPrice || 0;
      return `Ate ${cropSpecies} for ${sellPrice} coins`;
    }

    // ========== Pet Hatch Size Boost ==========
    case 'PetHatchSizeBoost':
    case 'PetHatchSizeBoostII': {
      const targetName = getPetName(params.targetPet);
      const increase = params.strengthIncrease || 0;
      return `Boosted ${targetName}'s size by +${increase.toFixed(0)}`;
    }

    // ========== Pet Age Boost ==========
    case 'PetAgeBoost':
    case 'PetAgeBoostII': {
      const targetName = getPetName(params.targetPet);
      const xp = params.bonusXp || 0;
      return `Gave +${xp} XP to ${targetName}`;
    }

    // ========== Pet Refund ==========
    case 'PetRefund':
    case 'PetRefundII': {
      const eggId = params.eggId || 'Unknown Egg';
      return `Refunded 1× ${eggId}`;
    }

    // ========== Produce Refund ==========
    case 'ProduceRefund': {
      const numCrops = params.cropsRefunded?.length || 0;
      return `Refunded ${numCrops} ${numCrops === 1 ? 'crop' : 'crops'}`;
    }

    // ========== Sell Boost ==========
    case 'SellBoostI':
    case 'SellBoostII':
    case 'SellBoostIII':
    case 'SellBoostIV': {
      const bonus = params.bonusCoins || 0;
      return `Gave +${bonus} bonus coins`;
    }

    // ========== Gold/Rainbow/Rain ==========
    case 'GoldGranter':
    case 'RainbowGranter':
    case 'RainDance': {
      const mutation = params.mutation || 'Unknown';
      const cropSpecies = params.growSlot?.species || 'Unknown';
      return `Made ${cropSpecies} turn ${mutation}`;
    }

    // ========== Pet XP Boost ==========
    case 'PetXpBoost':
    case 'PetXpBoostII': {
      const xp = params.bonusXp || 0;
      const numPets = params.petsAffected?.length || 0;
      return `Gave +${xp} XP to ${numPets} ${numPets === 1 ? 'pet' : 'pets'}`;
    }

    // ========== Egg Growth Boost ==========
    case 'EggGrowthBoost':
    case 'EggGrowthBoostII_NEW':
    case 'EggGrowthBoostII': {
      const seconds = params.secondsReduced || 0;
      const numEggs = params.eggsAffected?.length || 0;
      const time = formatTime(seconds);
      return `Reduced ${numEggs} ${numEggs === 1 ? 'egg' : 'eggs'} growth by ${time}`;
    }

    // ========== Plant Growth Boost ==========
    case 'PlantGrowthBoost':
    case 'PlantGrowthBoostII': {
      const seconds = params.secondsReduced || 0;
      const numPlants = params.numPlantsAffected || 0;
      const time = formatTime(seconds);
      return `Reduced ${numPlants} ${numPlants === 1 ? 'plant' : 'plants'} growth by ${time}`;
    }

    // ========== Produce Scale Boost ==========
    case 'ProduceScaleBoost':
    case 'ProduceScaleBoostII': {
      const percentage = params.scaleIncreasePercentage || 0;
      const numPlants = params.numPlantsAffected || 0;
      return `Boosted ${numPlants} ${numPlants === 1 ? 'crop' : 'crops'} size by +${percentage.toFixed(0)}%`;
    }

    default:
      return `Unknown ability: ${action}`;
  }
}
