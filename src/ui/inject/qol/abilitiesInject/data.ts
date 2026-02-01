/**
 * AbilitiesInject - Data Module
 *
 * Responsible for fetching and calculating ability progress data
 * Uses JournalChecker API and MGData (no direct atom access)
 */

import { MGData } from '../../../../modules/data';
import { MGJournal } from '../../../../features/journal';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AbilityProgress {
  logged: string[];      // Ability IDs that are logged
  missing: string[];     // Ability IDs that are missing
  total: number;         // Total number of abilities for this species
  percentage: number;    // Percentage of abilities logged
}

interface PetJournalEntry {
  variantsLogged?: Array<{ variant: string; createdAt: number }>;
  abilitiesLogged?: Array<{ ability: string; createdAt: number }>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ability Data Fetching
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get logged abilities for a specific pet species from JournalChecker
 */
export function getLoggedAbilities(speciesId: string): string[] {
  try {
    const journal = MGJournal.getMyJournal();

    if (!journal?.pets) {
      return [];
    }

    const speciesEntry = journal.pets[speciesId] as PetJournalEntry | undefined;
    if (!speciesEntry?.abilitiesLogged) return [];

    return speciesEntry.abilitiesLogged.map(entry => entry.ability);
  } catch (error) {
    console.error('[AbilitiesInject] Failed to get logged abilities:', error);
    return [];
  }
}

/**
 * Get the log date for a specific ability
 */
export function getAbilityLogDate(speciesId: string, abilityId: string): number | undefined {
  try {
    const journal = MGJournal.getMyJournal();

    if (!journal?.pets) return undefined;

    const speciesEntry = journal.pets[speciesId] as PetJournalEntry | undefined;
    if (!speciesEntry?.abilitiesLogged) return undefined;

    const logEntry = speciesEntry.abilitiesLogged.find(entry => entry.ability === abilityId);
    return logEntry?.createdAt;
  } catch (error) {
    console.error('[AbilitiesInject] Failed to get ability log date:', error);
    return undefined;
  }
}

/**
 * Get all possible abilities for a pet species from MGData
 *
 * Abilities are stored in pets[speciesId].innateAbilityWeights
 * Returns abilities sorted by weight (highest first)
 *
 * IMPORTANT: Filters out RainbowGranter and GoldGranter since they're
 * already displayed by the game as variant stamps (Rainbow/Gold)
 */
export function getAllAbilities(speciesId: string): string[] {
  try {
    const allData = MGData.getAll();

    if (!allData?.pets) {
      return [];
    }

    const petData = allData.pets[speciesId] as Record<string, unknown> | undefined;
    if (!petData) {
      return [];
    }

    // Abilities are in innateAbilityWeights as keys with weights as values
    // Example: { EggGrowthBoost: 80, PetRefund: 20 }
    if (petData.innateAbilityWeights && typeof petData.innateAbilityWeights === 'object') {
      const abilities = petData.innateAbilityWeights as Record<string, number>;

      // Filter out abilities that are already shown as variants
      const EXCLUDED_ABILITIES = ['RainbowGranter', 'GoldGranter'];

      // Sort by weight (highest first) for consistent display order
      return Object.entries(abilities)
        .filter(([abilityId]) => !EXCLUDED_ABILITIES.includes(abilityId))
        .sort(([, a], [, b]) => b - a)
        .map(([abilityId]) => abilityId);
    }

    return [];
  } catch (error) {
    console.error('[AbilitiesInject] Failed to get all abilities:', error);
    return [];
  }
}

/**
 * Get ability display name from ability ID
 */
export function getAbilityName(abilityId: string): string {
  try {
    const allData = MGData.getAll();

    if (!allData?.abilities) return abilityId;

    const abilityData = allData.abilities[abilityId] as Record<string, unknown> | undefined;
    if (!abilityData) return abilityId;

    // Try name field first, fallback to ID
    return abilityData.name ?? abilityData.displayName ?? abilityId;
  } catch (error) {
    console.error('[AbilitiesInject] Failed to get ability name:', error);
    return abilityId;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress Calculation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate ability progress for a specific pet species
 *
 * @param speciesId - Pet species ID (e.g., 'Chicken', 'Cow')
 * @returns Progress data with logged/missing abilities
 */
export function calculateAbilityProgress(speciesId: string): AbilityProgress {
  try {
    const EXCLUDED_ABILITIES = ['RainbowGranter', 'GoldGranter'];

    const loggedRaw = getLoggedAbilities(speciesId);
    const allAbilities = getAllAbilities(speciesId);

    // Filter excluded abilities from logged list too
    const logged = loggedRaw.filter(ability => !EXCLUDED_ABILITIES.includes(ability));

    const missing = allAbilities.filter(ability => !logged.includes(ability));
    const total = allAbilities.length;
    const percentage = total > 0 ? (logged.length / total) * 100 : 0;

    return {
      logged,
      missing,
      total,
      percentage,
    };
  } catch (error) {
    console.error('[AbilitiesInject] Failed to calculate progress:', error);
    return {
      logged: [],
      missing: [],
      total: 0,
      percentage: 0,
    };
  }
}

/**
 * Check if MGData is ready (required for ability lookup)
 */
export function isDataReady(): boolean {
  try {
    const allData = MGData.getAll();
    return !!(allData?.pets && allData?.abilities);
  } catch {
    return false;
  }
}

/**
 * Wait for MGData to be ready
 */
export async function waitForData(): Promise<void> {
  try {
    await MGData.waitForAny();
  } catch (error) {
    console.error('[AbilitiesInject] Failed to wait for data:', error);
  }
}
