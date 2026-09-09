// src/modules/data/logic/abilityFormatter.ts
// Format pet ability activity logs into human-readable descriptions

import { state } from "../state";

/** Ability definitions from the API, or null until game data has loaded. */
function getAbilities(): Record<string, unknown> | null {
  return state.data.abilities as Record<string, unknown> | null;
}

/**
 * Activity log entry structure from the game
 */
export interface ActivityLogEntry {
  action: string;
  timestamp: number;
  parameters: Record<string, unknown>;
}

/**
 * Ability ids we deliberately keep out of the logs.
 *
 * The two "Kisser" abilities (Dawnbinder, Amberbinder) are weather-triggered
 * and fire continuously while their weather lasts: in a captured state they
 * accounted for 19 of 25 entries, burying everything else.
 */
const EXCLUDED_ABILITY_IDS = new Set<string>([
  'DawnKisser',
  'MoonKisser',
]);

export type PetAbilityAction = string;

/**
 * Check if an action is a pet ability trigger.
 *
 * The set comes from `MGData.get("abilities")` rather than a list kept here.
 * The hardcoded list this replaces held 35 ids while the game shipped 81, so
 * every ability added since was dropped from the logs without a word — the
 * whole of a captured state's entries, in one case.
 *
 * Returns false while game data is still loading. Nothing is lost: a log only
 * advances the processed-timestamp watermark once it converts, so entries
 * skipped now are picked up on the next state change.
 */
export function isPetAbilityAction(action: string): action is PetAbilityAction {
  if (EXCLUDED_ABILITY_IDS.has(action)) return false;

  const abilities = getAbilities();
  return !!abilities && action in abilities;
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
      // Crop Size is a whole number in [50, 100]: the boost adds points, not a percentage.
      const points = params.sizeIncrease ?? params.scaleIncreasePercentage ?? 0;
      const numPlants = params.numPlantsAffected || 0;
      return `Boosted ${numPlants} ${numPlants === 1 ? 'crop' : 'crops'} size by +${points.toFixed(0)}`;
    }

    default:
      return `Unknown ability: ${action}`;
  }
}
