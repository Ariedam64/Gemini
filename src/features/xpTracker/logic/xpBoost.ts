/**
 * XP Tracker - XP Boost Ability Logic
 *
 * Functions for detecting and calculating XP Boost ability contributions.
 * XP Boost values fetched dynamically from MGData.get('abilities').
 *
 * Level 2: Imports from types.ts
 */

import {
    XP_BOOST_ABILITY_IDS,
    ROLLS_PER_HOUR,
    MAX_TARGET_STRENGTH,
    type XpBoostStats,
    type CombinedXpBoostStats,
} from '../types';
import { MGData } from '../../../modules/data';

// ─────────────────────────────────────────────────────────────────────────────
// XP Boost Detection
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check if an ability ID is an XP Boost ability
 */
export function isXpBoostAbility(abilityId: string): boolean {
    return XP_BOOST_ABILITY_IDS.includes(abilityId as any);
}

/**
 * Get XP Boost ability data from MGData
 */
function getXpBoostAbilityData(abilityId: string) {
    const abilities = MGData.get('abilities');
    if (!abilities) return null;

    const ability = abilities[abilityId] as {
        name?: string;
        baseProbability?: number;
        baseParameters?: {
            bonusXp?: number;
            requiredWeather?: string;
        };
    } | undefined;
    if (!ability) return null;

    // Validate it's an XP Boost ability
    if (!isXpBoostAbility(abilityId)) return null;

    return {
        id: abilityId,
        name: ability.name ?? 'XP Boost',
        baseProbability: ability.baseProbability ?? 0,
        bonusXp: ability.baseParameters?.bonusXp ?? 0,
        requiredWeather: ability.baseParameters?.requiredWeather ?? null,
    };
}

/**
 * Get XP Boost ability IDs from a pet's abilities array
 */
export function getXpBoostAbilities(abilities: string[]): string[] {
    return abilities.filter(isXpBoostAbility);
}

/**
 * Check if pet has any XP Boost ability
 */
export function hasXpBoostAbility(abilities: string[]): boolean {
    return abilities.some(isXpBoostAbility);
}

/**
 * Get the tier label for an XP Boost ability
 */
export function getXpBoostTier(abilityId: string): 'I' | 'II' | 'III' | 'Snowy' {
    switch (abilityId) {
        case 'PetXpBoost':
            return 'I';
        case 'PetXpBoostII':
            return 'II';
        case 'PetXpBoostIII':
            return 'III';
        case 'SnowyPetXpBoost':
            return 'Snowy';
        default:
            return 'I'; // Fallback
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// XP Boost Calculations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate XP Boost stats for a single ability
 *
 * @param abilityId - The XP Boost ability ID
 * @param petStrength - Current pet strength (used for scaling)
 * @param currentWeather - Current weather type (e.g., 'Frost', 'Rain')
 * @param petMaxStrength - Pet's maximum strength (ranges 80-100)
 * @returns XP Boost stats or null if not a valid XP Boost ability
 */
export function calculateXpBoostStats(
    abilityId: string,
    petStrength: number,
    currentWeather: string | null,
    petMaxStrength: number = 100  // Default to 100 for backward compatibility
): XpBoostStats | null {
    const abilityData = getXpBoostAbilityData(abilityId);
    if (!abilityData) return null;

    const tier = getXpBoostTier(abilityId);

    // Check weather requirement
    const requiredWeather = abilityData.requiredWeather;
    const isActive = requiredWeather === null || currentWeather === requiredWeather;

    // Strength scaling factor - use actual maxStrength for accurate scaling
    // Wiki: "Max Strength ranges from 80 to 100"
    const strengthFactor = petStrength / petMaxStrength;

    // XP Boost II+ scales by STR^2 (Double Scaling) per Wiki/MGData research
    // We'll apply this to all tiers for consistency if they are high STR
    const scalingFactor = strengthFactor * strengthFactor;

    // Base values from MGData
    const baseChancePerMinute = abilityData.baseProbability;
    const baseXpPerProc = abilityData.bonusXp;

    // Scaled values (XP is scaled by strength squared)
    const actualChancePerMinute = baseChancePerMinute; // Chance is not scaled
    const actualXpPerProc = Math.floor(baseXpPerProc * scalingFactor);

    // Expected procs per hour
    // baseProbability is % per minute, so convert to procs
    // Procs per hour = (chance per minute / 100) * 60 minutes
    const expectedProcsPerHour = (actualChancePerMinute / 100) * 60;

    // Expected XP per hour (only if active)
    const expectedXpPerHour = isActive ? Math.floor(expectedProcsPerHour * actualXpPerProc) : 0;

    return {
        abilityId,
        abilityName: abilityData.name,
        tier,
        baseChancePerMinute,
        actualChancePerMinute,
        baseXpPerProc,
        actualXpPerProc,
        expectedProcsPerHour,
        expectedXpPerHour,
        requiredWeather: requiredWeather as 'Frost' | null,
        isActive,
    };
}

/**
 * Calculate combined XP Boost stats for all active boosters
 *
 * @param boosters - Array of { petId, petName, abilities, strength, maxStrength }
 * @param currentWeather - Current weather type
 * @returns Combined stats for all XP Boost pets
 */
export function calculateCombinedXpBoostStats(
    boosters: Array<{
        petId: string;
        petName: string;
        abilities: string[];
        strength: number;
        maxStrength?: number;  // Optional for backward compatibility
    }>,
    currentWeather: string | null
): CombinedXpBoostStats {
    const result: CombinedXpBoostStats = {
        totalBonusXpPerHour: 0,
        totalProcsPerHour: 0,
        activeBoosterCount: 0,
        boosters: [],
    };

    for (const booster of boosters) {
        const xpBoostAbilities = getXpBoostAbilities(booster.abilities);

        for (const abilityId of xpBoostAbilities) {
            const stats = calculateXpBoostStats(
                abilityId,
                booster.strength,
                currentWeather,
                booster.maxStrength || 100
            );
            if (!stats) continue;

            result.boosters.push({
                petId: booster.petId,
                petName: booster.petName,
                stats,
            });

            if (stats.isActive) {
                result.totalBonusXpPerHour += stats.expectedXpPerHour;
                result.totalProcsPerHour += stats.expectedProcsPerHour;
                result.activeBoosterCount++;
            }
        }
    }

    return result;
}

/**
 * Get primary XP Boost stats for a pet (first XP Boost ability found)
 */
export function getPrimaryXpBoostStats(
    abilities: string[],
    petStrength: number,
    currentWeather: string | null,
    petMaxStrength: number = 100
): XpBoostStats | null {
    const xpBoostAbilities = getXpBoostAbilities(abilities);
    if (xpBoostAbilities.length === 0) return null;

    return calculateXpBoostStats(xpBoostAbilities[0], petStrength, currentWeather, petMaxStrength);
}
