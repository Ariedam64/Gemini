/**
 * Grouping Utilities
 *
 * Analyzes pet teams to determine optimal grouping for display.
 * Used by expansion handler to create grouped vs individual pet rows.
 *
 * Per .claude/rules/core.md:
 * - Keep files small and focused
 * - Use proper typing (no `any`)
 *
 * @module expansion/GroupingUtils
 */

import type { UnifiedPet } from '../../../../../globals/core/types';
import type { PetTeam } from '../../../../../features/petTeam/types';
import type { GroupingAnalysisResult } from './types';
import { analyzeTeamGrouping } from '../../../../../features/growthTimers/logic/petAbilityUtils';
import { ABILITY_CATEGORIES } from '../../../../../features/petTeam/constants';

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Normalize ability name for comparison (removes tiers/prefixes)
 */
function normalizeAbility(ability: string): string {
    // Remove _NEW, Snowy_, and tier suffixes (I, II, III, IV)
    // Also remove Gold and Rainbow prefixes for special variants
    return ability
        .replace(/_NEW$/, '')
        .replace(/^(Snowy|Gold|Rainbow)/, '')
        .replace(/(I|II|III|IV)$/, '');
}

/**
 * Check if pet has hatching-related abilities
 * Uses normalized check to catch all variants (Snowy, tiers, etc.)
 */
function hasHatchingAbilities(pet: UnifiedPet): boolean {
    const abilities = pet.abilities || [];
    return abilities.some((a: string) => {
        const normalized = normalizeAbility(a);

        // Check if normalized name matches the base name of any category ability
        // We compare against the first item in each category as a proxy for the base name
        return (
            normalizeAbility(ABILITY_CATEGORIES.MAX_STR_BOOST[0]) === normalized ||
            normalizeAbility(ABILITY_CATEGORIES.PET_MUTATION[0]) === normalized ||
            normalizeAbility(ABILITY_CATEGORIES.DOUBLE_HATCH[0]) === normalized ||
            normalizeAbility(ABILITY_CATEGORIES.PET_REFUND[0]) === normalized
        );
    });
}

/**
 * Check if pet has crop harvest abilities
 */
function hasCropHarvestAbilities(pet: UnifiedPet): boolean {
    const CROP_HARVEST_ABILITIES = ['DoubleHarvest', 'ProduceRefund', 'ProduceRefundII'] as const;
    const abilities = pet.abilities || [];
    return abilities.some((a: string) =>
        CROP_HARVEST_ABILITIES.some(target => normalizeAbility(target) === normalizeAbility(a))
    );
}

/**
 * Check if pet has growth or mutation abilities (excludes crop harvest grouping)
 */
function hasGrowthOrMutationAbilities(pet: UnifiedPet): boolean {
    const abilities = pet.abilities || [];
    return abilities.some((a: string) => {
        const normalized = normalizeAbility(a);
        return (
            normalizeAbility(ABILITY_CATEGORIES.EGG_GROWTH[0]) === normalized ||
            normalizeAbility(ABILITY_CATEGORIES.PLANT_GROWTH[0]) === normalized ||
            normalizeAbility(ABILITY_CATEGORIES.CROP_MUTATION[0]) === normalized
        );
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Analysis Function
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Analyze team to determine if pets should be grouped
 *
 * Supports:
 * - Hatching teams (MAX_STR_BOOST, PET_MUTATION, DOUBLE_HATCH, PET_REFUND)
 * - Crop harvest teams (DoubleHarvest, ProduceRefund)
 * - Growth teams (EGG_GROWTH, PLANT_GROWTH)
 *
 * @param team - Pet team to analyze
 * @param pets - Pets in the team
 * @param viewCategory - Current view category ('egg' | 'plant') for view-dependent grouping
 */
export function analyzeTeamForGrouping(
    team: PetTeam,
    pets: UnifiedPet[],
    viewCategory?: 'egg' | 'plant'
): GroupingAnalysisResult {
    // Detect if this is a hatching team (has hatching abilities)
    const hatchingPets = pets.filter(hasHatchingAbilities);

    // If 2+ pets have hatching abilities, group them together
    // Note: This takes priority even if hatching pets also have granter abilities
    // (e.g., Gold Chicken has DoubleHatch + PetRefund + GoldGranter)
    if (hatchingPets.length >= 2 && hatchingPets.length <= 3) {
        const remainingPets = pets.filter(p => !hatchingPets.includes(p));
        return {
            shouldGroup: true,
            matchingPets: hatchingPets,
            remainingPets,
            // Flag to indicate this is a hatching group for purpose detection
            groupType: 'hatching' as const
        };
    }

    // Detect if this is a crop economy team (capybaras with DoubleHarvest/ProduceRefund)
    const cropHarvestPets = pets.filter(hasCropHarvestAbilities);

    // If 2+ pets have crop harvest abilities (and no growth/mutation), group them
    if (cropHarvestPets.length >= 2 && cropHarvestPets.length <= 3) {
        // Check that these pets don't have growth/mutation abilities (which would use standard grouping)
        const hasGrowthOrMutation = cropHarvestPets.some(hasGrowthOrMutationAbilities);

        if (!hasGrowthOrMutation) {
            const remainingPets = pets.filter(p => !cropHarvestPets.includes(p));
            return {
                shouldGroup: true,
                matchingPets: cropHarvestPets,
                remainingPets,
                groupType: 'crop' as const
            };
        }
    }

    // For growth teams, use strict matching to ensure accurate grouped stats
    const growthResult = analyzeTeamGrouping(pets, viewCategory);
    return growthResult.shouldGroup
        ? { ...growthResult, groupType: 'growth' as const }
        : growthResult;
}

/**
 * Check if all pets in group are at max strength
 * Used to determine if XP grouping is valid
 */
export function areAllPetsMaxStrength(pets: UnifiedPet[]): boolean {
    return pets.every(pet => pet.currentStrength >= pet.maxStrength);
}
