/**
 * Hatching Tracker Feature Panel
 *
 * Displays hatching stats based on hatching-related pet abilities.
 *
 * @module hatchingPanel
 */

import type { FeaturePanelDefinition } from '../registry';
import type { PetTeam } from '../../../../../../features/petTeam/types';
import type { UnifiedPet } from '../../../../../../globals/core/types';
import type { TeamPurposeAnalysis } from '../../../../../../features/petTeam/logic/purpose';
import { Globals } from '../../../../../../globals';
import { DISPLAY_RULES } from '../../../../../../features/petTeam/constants';

import {
    el,
    hasAbility,
    buildSpriteRow,
    buildCombinedMutationRow,
    DOUBLE_HATCH_ABILITIES,
    PET_REFUND_ABILITIES,
    PET_MUTATION_BOOST_ABILITIES,
    calculateDoubleHatchStats,
    calculatePetRefundStats,
    calculatePetMutationStats,
} from './helpers';

// ─────────────────────────────────────────────────────────────────────────────
// Hatching Panel Definition
// ─────────────────────────────────────────────────────────────────────────────

export const hatchingPanel: FeaturePanelDefinition = {
    id: 'hatch',
    label: 'Hatching',
    icon: '🥚',
    category: 'tracking',

    isAvailable: () => true,

    getSummary: (team: PetTeam, pets: UnifiedPet[]) => {
        const eggInventory = Globals.myInventory.get().items.filter(i => i.itemType === 'Egg');
        const totalEggs = eggInventory.reduce((sum, item) => sum + (item.quantity || 1), 0);
        if (totalEggs === 0) return null;

        return {
            text: `${totalEggs} eggs`,
            variant: 'neutral' as const,
            tooltip: `${totalEggs} eggs in inventory`,
            priority: 6,
        };
    },

    buildPanel: (team: PetTeam, container: HTMLElement) => {
        return {
            update: () => { },
            destroy: () => { },
            refresh: () => { },
        };
    },

    renderPetSlot: (pet: UnifiedPet, team: PetTeam, container: HTMLElement, viewType?: 'egg' | 'plant', selectedTileIndices?: Set<string>) => {
        container.innerHTML = '';

        const wrapper = el('div', 'hatching-stats-compact');

        const hasDoubleHatch = hasAbility(pet, DOUBLE_HATCH_ABILITIES);
        const hasPetRefund = hasAbility(pet, PET_REFUND_ABILITIES);
        const hasMutationBoost = hasAbility(pet, PET_MUTATION_BOOST_ABILITIES);

        if (!hasDoubleHatch && !hasPetRefund && !hasMutationBoost) {
            return;
        }

        // Calculate stats for THIS pet only
        const singlePetArray = [pet];

        // DOUBLE HATCH row
        if (hasDoubleHatch) {
            const stats = calculateDoubleHatchStats(singlePetArray, selectedTileIndices);
            if (stats.length > 0) {
                wrapper.appendChild(buildSpriteRow('DOUBLE HATCH', stats));
            }
        }

        // PET REFUND row
        if (hasPetRefund) {
            const stats = calculatePetRefundStats(singlePetArray, selectedTileIndices);
            if (stats.length > 0) {
                wrapper.appendChild(buildSpriteRow('PET REFUND', stats));
            }
        }

        // MUTATION BOOST row
        if (hasMutationBoost) {
            const stats = calculatePetMutationStats(singlePetArray, selectedTileIndices);

            // Format percentages with proper decimal places
            const rainbowChance = stats.rainbowChance.toFixed(4);
            const goldChance = stats.goldChance.toFixed(2);

            // Format expected values
            const rainbowEstimate = stats.expectedRainbow < 0.01
                ? `~${(stats.expectedRainbow * 100).toFixed(1)}%e`
                : stats.expectedRainbow.toFixed(2);
            const goldEstimate = stats.expectedGold.toFixed(2);

            wrapper.appendChild(buildCombinedMutationRow(
                rainbowChance,
                goldChance,
                rainbowEstimate,
                goldEstimate
            ));
        }

        container.appendChild(wrapper);
    },

    renderGroupedSlot: (pets: UnifiedPet[], team: PetTeam, container: HTMLElement, viewType?: 'egg' | 'plant', selectedTileIndices?: Set<string>) => {
        container.innerHTML = '';

        const wrapper = el('div', 'hatching-stats-compact');

        const hasDoubleHatch = pets.some(p => hasAbility(p, DOUBLE_HATCH_ABILITIES));
        const hasPetRefund = pets.some(p => hasAbility(p, PET_REFUND_ABILITIES));
        const hasMutationBoost = pets.some(p => hasAbility(p, PET_MUTATION_BOOST_ABILITIES));

        if (!hasDoubleHatch && !hasPetRefund && !hasMutationBoost) {
            return;
        }

        // DOUBLE HATCH row
        if (hasDoubleHatch) {
            const stats = calculateDoubleHatchStats(pets, selectedTileIndices);
            if (stats.length > 0) {
                wrapper.appendChild(buildSpriteRow('DOUBLE HATCH', stats));
            }
        }

        // PET REFUND row
        if (hasPetRefund) {
            const stats = calculatePetRefundStats(pets, selectedTileIndices);
            if (stats.length > 0) {
                wrapper.appendChild(buildSpriteRow('PET REFUND', stats));
            }
        }

        // MUTATION BOOST row
        if (hasMutationBoost) {
            const stats = calculatePetMutationStats(pets, selectedTileIndices);

            // Format percentages with proper decimal places
            const rainbowChance = stats.rainbowChance.toFixed(4);
            const goldChance = stats.goldChance.toFixed(2);

            // Format expected values
            const rainbowEstimate = stats.expectedRainbow < 0.01
                ? `~${(stats.expectedRainbow * 100).toFixed(1)}%e`
                : stats.expectedRainbow.toFixed(2);
            const goldEstimate = stats.expectedGold.toFixed(2);

            wrapper.appendChild(buildCombinedMutationRow(
                rainbowChance,
                goldChance,
                rainbowEstimate,
                goldEstimate
            ));
        }

        container.appendChild(wrapper);
    },

    hasContent: (pets, team) => {
        const petsArray = Array.isArray(pets) ? pets : [pets];

        return petsArray.some(p =>
            hasAbility(p, DOUBLE_HATCH_ABILITIES) ||
            hasAbility(p, PET_REFUND_ABILITIES) ||
            hasAbility(p, PET_MUTATION_BOOST_ABILITIES)
        );
    },

    shouldDisplay: (team: PetTeam, pets: UnifiedPet[], purpose: TeamPurposeAnalysis) => {
        const allowedPanels = DISPLAY_RULES.ALLOWED_PANELS[purpose.primary] || [];
        const isPurposeAllowed = allowedPanels.includes('hatch');

        const hasHatchingAbilities = pets.some(p =>
            hasAbility(p, DOUBLE_HATCH_ABILITIES) ||
            hasAbility(p, PET_REFUND_ABILITIES) ||
            hasAbility(p, PET_MUTATION_BOOST_ABILITIES)
        );

        return isPurposeAllowed && hasHatchingAbilities;
    },

    /**
     * Count stat rows for combined panel detection
     * Each hatching ability type = 1 row (Double Hatch, Pet Refund, Pet Mutation)
     */
    countRows: (pets, team) => {
        const petsArray = Array.isArray(pets) ? pets : [pets];
        let rows = 0;

        // Each ability type = 1 row
        if (petsArray.some(p => hasAbility(p, DOUBLE_HATCH_ABILITIES))) rows++;
        if (petsArray.some(p => hasAbility(p, PET_REFUND_ABILITIES))) rows++;
        if (petsArray.some(p => hasAbility(p, PET_MUTATION_BOOST_ABILITIES))) rows++;

        return rows;
    },
};
