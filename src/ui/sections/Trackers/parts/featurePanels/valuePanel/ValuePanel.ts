/**
 * Value (Coin) Tracker Feature Panel
 *
 * Displays coin value stats based on value-related pet abilities.
 *
 * @module valuePanel
 */

import type { FeaturePanelDefinition } from '../registry';
import type { PetTeam } from '../../../../../../features/petTeam/types';
import type { UnifiedPet } from '../../../../../../globals/core/types';
import type { TeamPurposeAnalysis } from '../../../../../../features/petTeam/logic/purpose';
import { Globals } from '../../../../../../globals';
import { DISPLAY_RULES } from '../../../../../../features/petTeam/constants';

import {
    el,
    formatCoin,
    hasAbility,
    buildStatRow,
    buildHarvestRow,
    SIZE_BOOST_ABILITIES,
    MUTATION_BOOST_ABILITIES,
    GRANTER_ABILITIES,
    HARVEST_ABILITIES,
    REFUND_ABILITIES,
    calculateSizeBoostStats,
    calculateMutationBoostStats,
    calculateGranterStats,
    calculateHarvestStats,
    calculateRefundStats,
} from './helpers';

// ─────────────────────────────────────────────────────────────────────────────
// Value Panel Definition
// ─────────────────────────────────────────────────────────────────────────────

export const valuePanel: FeaturePanelDefinition = {
    id: 'coin',
    label: 'Value',
    icon: '💰',
    category: 'tracking',

    isAvailable: () => true,

    getSummary: (team: PetTeam, pets: UnifiedPet[]) => {
        const garden = Globals.myGarden.get();
        const cropCount = garden.crops.all.length;
        if (cropCount === 0) return null;

        return {
            text: `${cropCount} crops`,
            variant: 'neutral' as const,
            tooltip: `${garden.crops.mature.length} mature, ${garden.crops.growing.length} growing`,
            priority: 7,
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
        const pets = [pet];
        if (valuePanel.renderGroupedSlot) {
            valuePanel.renderGroupedSlot(pets, team, container, viewType, selectedTileIndices);
        }
    },

    renderGroupedSlot: (pets: UnifiedPet[], team: PetTeam, container: HTMLElement, viewType?: 'egg' | 'plant', selectedTileIndices?: Set<string>) => {
        const weatherData = Globals.weather.get();
        const currentWeather = weatherData.isActive ? weatherData.type : null;

        container.innerHTML = '';

        const wrapper = el('div', 'value-stats-compact');

        const hasSizeBoost = pets.some(p => hasAbility(p, SIZE_BOOST_ABILITIES));
        const hasMutationBoost = pets.some(p => hasAbility(p, MUTATION_BOOST_ABILITIES));
        const hasGranters = pets.some(p => hasAbility(p, GRANTER_ABILITIES));
        const hasHarvest = pets.some(p => hasAbility(p, HARVEST_ABILITIES));
        const hasRefund = pets.some(p => hasAbility(p, REFUND_ABILITIES));

        if (!hasSizeBoost && !hasMutationBoost && !hasGranters && !hasHarvest && !hasRefund) {
            return;
        }

        if (hasSizeBoost) {
            const stats = calculateSizeBoostStats(pets, currentWeather, selectedTileIndices);
            wrapper.appendChild(buildStatRow(
                'SIZE BOOST',
                `+${formatCoin(stats.perProc)}/proc`,
                `+${formatCoin(stats.perHour)}/hr`
            ));
        }

        if (hasMutationBoost) {
            const stats = calculateMutationBoostStats(pets, currentWeather, selectedTileIndices);
            wrapper.appendChild(buildStatRow(
                'MUTATION BOOST',
                `+${formatCoin(stats.perProc)}/proc`,
                `+${formatCoin(stats.perHour)}/hr`
            ));
        }

        if (hasGranters) {
            const stats = calculateGranterStats(pets, currentWeather, selectedTileIndices);
            wrapper.appendChild(buildStatRow(
                'GRANTERS',
                `+${formatCoin(stats.perProc)}/proc`,
                `+${formatCoin(stats.perHour)}/hr`
            ));
        }

        if (hasHarvest) {
            const stats = calculateHarvestStats(pets, currentWeather, selectedTileIndices);
            wrapper.appendChild(buildHarvestRow(
                'EXTRA HARVEST',
                `+${stats.expectedCrops.toFixed(1)} crops`,
                `+${formatCoin(stats.expectedCoins)} coins`
            ));
        }

        if (hasRefund) {
            const stats = calculateRefundStats(pets, currentWeather, selectedTileIndices);
            wrapper.appendChild(buildHarvestRow(
                'CROP REFUND',
                `+${stats.expectedCrops.toFixed(1)} crops`,
                `+${formatCoin(stats.expectedCoins)} coins`
            ));
        }

        container.appendChild(wrapper);
    },

    hasContent: (pets, team) => {
        const petsArray = Array.isArray(pets) ? pets : [pets];

        return petsArray.some(p =>
            hasAbility(p, SIZE_BOOST_ABILITIES) ||
            hasAbility(p, MUTATION_BOOST_ABILITIES) ||
            hasAbility(p, GRANTER_ABILITIES) ||
            hasAbility(p, HARVEST_ABILITIES) ||
            hasAbility(p, REFUND_ABILITIES)
        );
    },

    shouldDisplay: (team: PetTeam, pets: UnifiedPet[], purpose: TeamPurposeAnalysis) => {
        const allowedPanels = DISPLAY_RULES.ALLOWED_PANELS[purpose.primary] || [];
        const isPurposeAllowed = allowedPanels.includes('coin');

        const hasEconomyAbilities = pets.some(p =>
            hasAbility(p, SIZE_BOOST_ABILITIES) ||
            hasAbility(p, MUTATION_BOOST_ABILITIES) ||
            hasAbility(p, GRANTER_ABILITIES) ||
            hasAbility(p, HARVEST_ABILITIES) ||
            hasAbility(p, REFUND_ABILITIES)
        );

        return isPurposeAllowed && hasEconomyAbilities;
    },

    /**
     * Count stat rows for combined panel detection
     * Each ability type = 1 row (Size, Mutation, Granters, Harvest, Refund)
     */
    countRows: (pets, team) => {
        const petsArray = Array.isArray(pets) ? pets : [pets];
        let rows = 0;

        // Each ability type = 1 row
        if (petsArray.some(p => hasAbility(p, SIZE_BOOST_ABILITIES))) rows++;
        if (petsArray.some(p => hasAbility(p, MUTATION_BOOST_ABILITIES))) rows++;
        if (petsArray.some(p => hasAbility(p, GRANTER_ABILITIES))) rows++;
        if (petsArray.some(p => hasAbility(p, HARVEST_ABILITIES))) rows++;
        if (petsArray.some(p => hasAbility(p, REFUND_ABILITIES))) rows++;

        return rows;
    },
};
