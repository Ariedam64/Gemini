/**
 * Pet Ability Utilities
 *
 * Helper functions for analyzing and normalizing pet abilities.
 * Used for grouping pets with identical ability types in tracker displays.
 *
 * Per .claude/rules/features.md:
 * - Features are self-contained with clear boundaries
 * - No side effects on import
 * - Pure functions for testability
 *
 * @module petAbilityUtils
 */

import type { UnifiedPet } from '../../../globals/core/types';

// ─────────────────────────────────────────────────────────────────────────────
// Ability Normalization
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalize ability name by removing tier suffixes and special variants
 * 
 * Handles:
 *   - Tier suffixes: I, II, III, IV
 *   - Special suffix: _NEW (e.g., EggGrowthBoostII_NEW)
 *   - Snowy prefix: Snowy (e.g., SnowyEggGrowthBoost)
 * 
 * Examples:
 *   EggGrowthBoost → EggGrowthBoost
 *   EggGrowthBoostII_NEW → EggGrowthBoost
 *   SnowyEggGrowthBoost → EggGrowthBoost
 *   PlantGrowthBoostII → PlantGrowthBoost
 * 
 * @param ability - Raw ability name from pet data
 * @returns Normalized base ability name
 */
export function normalizeAbilityName(ability: string): string {
    let normalized = ability;

    // Remove _NEW suffix
    normalized = normalized.replace(/_NEW$/, '');

    // Remove Snowy prefix
    normalized = normalized.replace(/^Snowy/, '');

    // Remove tier suffixes (I, II, III, IV)
    // Must match from end of string to avoid matching I in middle of words
    normalized = normalized.replace(/(I|II|III|IV)$/, '');

    return normalized;
}

/**
 * Get set of base ability types for a pet
 * 
 * @param pet - Pet to analyze
 * @returns Set of normalized base ability names
 * 
 * @example
 * const pet = { abilities: ['EggGrowthBoostII_NEW', 'PlantGrowthBoostIII'] };
 * getPetBaseAbilities(pet); // Set(['EggGrowthBoost', 'PlantGrowthBoost'])
 */
export function getPetBaseAbilities(pet: UnifiedPet): Set<string> {
    return new Set(pet.abilities.map(normalizeAbilityName));
}

/**
 * Check if two sets of abilities are equal
 * 
 * @param set1 - First set of abilities
 * @param set2 - Second set of abilities
 * @returns True if sets contain identical abilities
 */
function areSetsEqual(set1: Set<string>, set2: Set<string>): boolean {
    if (set1.size !== set2.size) return false;
    for (const item of set1) {
        if (!set2.has(item)) return false;
    }
    return true;
}

/**
 * Check if a pet has a specific growth ability type
 *
 * @param pet - Pet to check
 * @param abilityType - Base ability name to look for (e.g., 'EggGrowthBoost', 'PlantGrowthBoost')
 * @returns True if pet has an ability matching the base type
 */
function petHasAbilityType(pet: UnifiedPet, abilityType: string): boolean {
    const abilities = getPetBaseAbilities(pet);
    return abilities.has(abilityType);
}

/**
 * Analyze team composition for grouping opportunities
 *
 * Groups pets based on the viewCategory:
 * - 'egg': Group all pets with EggGrowthBoost (regardless of other abilities)
 * - 'plant': Group all pets with PlantGrowthBoost (regardless of other abilities)
 * - undefined: Use strict matching (identical ability sets)
 *
 * @param pets - Array of pets in team (up to 3)
 * @param viewCategory - Optional view category to filter grouping by ability type
 * @returns Grouping analysis with matching and remaining pets
 *
 * @example
 * // View-dependent grouping (plant view)
 * // Pet A: EggGrowthBoost + PlantGrowthBoost
 * // Pet B: PlantGrowthBoost only
 * // Pet C: EggGrowthBoost only
 * const result = analyzeTeamGrouping([petA, petB, petC], 'plant');
 * // { shouldGroup: true, matchingPets: [petA, petB], remainingPets: [petC] }
 *
 * @example
 * // Strict grouping (no viewCategory)
 * const result = analyzeTeamGrouping([turtle1, turtle2, turtle3]);
 * // { shouldGroup: true, matchingPets: [turtle1, turtle2, turtle3], remainingPets: [] }
 */
export function analyzeTeamGrouping(
    pets: UnifiedPet[],
    viewCategory?: 'egg' | 'plant'
): {
    shouldGroup: boolean;
    matchingPets: UnifiedPet[];
    remainingPets: UnifiedPet[];
} {
    // Need at least 2 pets to group
    if (pets.length < 2) {
        return {
            shouldGroup: false,
            matchingPets: [],
            remainingPets: pets,
        };
    }

    // View-dependent grouping: group by specific ability type
    if (viewCategory) {
        const targetAbility = viewCategory === 'egg' ? 'EggGrowthBoost' : 'PlantGrowthBoost';

        // Find all pets with the target ability
        const petsWithAbility = pets.filter(pet => petHasAbilityType(pet, targetAbility));
        const petsWithoutAbility = pets.filter(pet => !petHasAbilityType(pet, targetAbility));

        // Group if 2 or more pets have the target ability
        if (petsWithAbility.length >= 2) {
            return {
                shouldGroup: true,
                matchingPets: petsWithAbility,
                remainingPets: petsWithoutAbility,
            };
        }

        // Not enough pets with target ability to group
        return {
            shouldGroup: false,
            matchingPets: [],
            remainingPets: pets,
        };
    }

    // Strict grouping (original logic): require identical ability sets
    const petAbilities = pets.map(pet => ({
        pet,
        abilities: getPetBaseAbilities(pet),
    }));

    // Try to find largest matching group (prefer 3 over 2)
    // Check if all 3 pets match
    if (pets.length === 3) {
        const [first, second, third] = petAbilities;
        if (areSetsEqual(first.abilities, second.abilities) &&
            areSetsEqual(first.abilities, third.abilities)) {
            return {
                shouldGroup: true,
                matchingPets: [first.pet, second.pet, third.pet],
                remainingPets: [],
            };
        }
    }

    // Check if first 2 pets match
    const [first, second, third] = petAbilities;
    if (areSetsEqual(first.abilities, second.abilities)) {
        return {
            shouldGroup: true,
            matchingPets: [first.pet, second.pet],
            remainingPets: third ? [third.pet] : [],
        };
    }

    // Check if pets 1 and 3 match
    if (third && areSetsEqual(first.abilities, third.abilities)) {
        return {
            shouldGroup: true,
            matchingPets: [first.pet, third.pet],
            remainingPets: [second.pet],
        };
    }

    // Check if pets 2 and 3 match
    if (third && areSetsEqual(second.abilities, third.abilities)) {
        return {
            shouldGroup: true,
            matchingPets: [second.pet, third.pet],
            remainingPets: [first.pet],
        };
    }

    // No matches found
    return {
        shouldGroup: false,
        matchingPets: [],
        remainingPets: pets,
    };
}
