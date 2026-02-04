/**
 * Growth Timers Feature Panel
 *
 * Displays growth timer stats for eggs and plants based on pet abilities.
 * Integrates with feature panel registry for pet card display.
 *
 * Per .claude/rules/ui/sections.md:
 * - Section parts are focused sub-features
 * - Must have clear lifecycle (build/destroy)
 * - Safe to call multiple times
 *
 * @module growthPanel
 */

import type { FeaturePanelDefinition } from '../registry';
import type { PetTeam } from '../../../../../../features/petTeam/types';
import type { UnifiedPet } from '../../../../../../globals/core/types';
import type { TeamPurposeAnalysis } from '../../../../../../features/petTeam/logic/purpose';
import { Globals } from '../../../../../../globals';
import {
    hasEggBoosts,
    hasPlantBoosts,
    calculateEggBoosts,
    calculatePlantBoosts,
    calculateBoostStats
} from '../../../../../../features/growthTimers/logic/boostCalculator';
import { DISPLAY_RULES } from '../../../../../../features/petTeam/constants';

// Import helpers
import {
    el,
    getSpriteElement,
    getStackedSpritesElement,
    buildStatRow,
    buildBoostRow,
    getPetBoostInfo,
    calculateTeamMultiplier,
    calcAvgPercentEggs,
    calcAvgPercentCrops,
    formatCountdown,
    findNextReadyEgg,
    findNextReadyCrop,
    findLastReadyEgg,
    findLastReadyCrop,
    calcBoostedRemaining,
} from './helpers';

// ─────────────────────────────────────────────────────────────────────────────
// Growth Panel Definition
// ─────────────────────────────────────────────────────────────────────────────

export const growthPanel: FeaturePanelDefinition = {
    id: 'growth',
    label: 'Growth',
    icon: '⏱️',
    category: 'tracking',

    isAvailable: () => true,

    getSummary: (team: PetTeam, pets: UnifiedPet[]) => {
        const garden = Globals.myGarden.get();
        const total = garden.eggs.growing.length + garden.plants.growing.length;
        if (total === 0) return null;
        return {
            text: `${total} growing`,
            variant: 'neutral' as const,
            tooltip: `${garden.eggs.growing.length} eggs, ${garden.plants.growing.length} plants`,
            priority: 8,
        };
    },

    buildPanel: (team: PetTeam, container: HTMLElement) => {
        return {
            update: () => { },
            destroy: () => { },
            refresh: () => { },
        };
    },

    renderPetSlot: (pet: UnifiedPet, team: PetTeam, container: HTMLElement, viewType?: string, selectedTileIndices?: Set<string>) => {
        const garden = Globals.myGarden.get();
        const now = Date.now();

        const eggBoost = getPetBoostInfo(pet, 'egg');
        const plantBoost = getPetBoostInfo(pet, 'plant');

        container.innerHTML = '';

        if (!eggBoost.hasBoost && !plantBoost.hasBoost) {
            return;
        }

        // Filter growing items by selected tiles if filter is provided
        const growingEggs = selectedTileIndices
            ? garden.eggs.growing.filter(egg => selectedTileIndices.has(egg.tileIndex))
            : garden.eggs.growing;
        const growingCrops = selectedTileIndices
            ? garden.crops.growing.filter(crop => selectedTileIndices.has(crop.tileIndex))
            : garden.crops.growing;

        // Determine effective view type - use intelligent defaults when viewType is undefined
        // If pet has only one boost type, use that type instead of summary view
        let effectiveViewType = viewType as 'egg' | 'plant' | undefined;
        if (!effectiveViewType && eggBoost.hasBoost !== plantBoost.hasBoost) {
            // Pet has only one type of boost - use that type for focused display
            effectiveViewType = eggBoost.hasBoost ? 'egg' : 'plant';
        }

        const hasActiveBoost = (effectiveViewType === 'egg' && eggBoost.hasBoost) ||
            (effectiveViewType === 'plant' && plantBoost.hasBoost);
        const isSummaryView = !effectiveViewType;

        const wrapper = el('div', 'growth-stats-compact');

        if (!hasActiveBoost && !isSummaryView) {
            const lackingType = viewType === 'egg' ? 'Egg' : 'Plant';
            const row = el('div', 'stat-row stat-row--message');
            row.appendChild(el('span', 'stat__message', `No ${lackingType} Growth Boost, Click the Button to Switch View`));
            wrapper.appendChild(row);
            container.appendChild(wrapper);
            return;
        }

        // BOOST Row
        const boostItems: { text: string; sprite: HTMLElement }[] = [];

        const showEggBoost = eggBoost.hasBoost && (effectiveViewType === 'egg' || isSummaryView);
        const showPlantBoost = plantBoost.hasBoost && (effectiveViewType === 'plant' || isSummaryView);

        if (showEggBoost) {
            const speedIncrease = Math.round((eggBoost.hourlyReduction / 60) * 100);
            boostItems.push({
                text: `+${speedIncrease}% Speed`,
                sprite: getSpriteElement('egg', 'UncommonEgg')
            });
        }
        if (showPlantBoost) {
            const speedIncrease = Math.round((plantBoost.hourlyReduction / 60) * 100);
            boostItems.push({
                text: `+${speedIncrease}% Speed`,
                sprite: getSpriteElement('plant', 'Carrot')
            });
        }

        if (boostItems.length > 0) {
            wrapper.appendChild(buildBoostRow(boostItems));
        }

        // Pre-calculate team multipliers
        const teamEggMultStr = calculateTeamMultiplier(team, 'egg');
        const teamEggMult = parseFloat(teamEggMultStr.replace('x', ''));
        const teamPlantMultStr = calculateTeamMultiplier(team, 'plant');
        const teamPlantMult = parseFloat(teamPlantMultStr.replace('x', ''));

        // NEXT Row - show countdown with boosts applied
        if (eggBoost.hasBoost && (effectiveViewType === 'egg' || isSummaryView)) {
            const eggNext = findNextReadyEgg(growingEggs, now);
            const boostedRemaining = calcBoostedRemaining(eggNext.remainingMs, teamEggMult);
            const eggPercent = growingEggs.length > 0
                ? calcAvgPercentEggs(growingEggs, now, teamEggMult)
                : 100;
            const nextCountdown = boostedRemaining > 0 ? formatCountdown(boostedRemaining) : 'Ready!';
            wrapper.appendChild(buildStatRow(
                'NEXT EGG',
                nextCountdown,
                getSpriteElement('egg', eggNext.name),
                eggPercent,
                'stat__progress-fill--egg'
            ));
        }

        if (plantBoost.hasBoost && (effectiveViewType === 'plant' || isSummaryView)) {
            const cropNext = findNextReadyCrop(growingCrops, now);
            const boostedRemaining = calcBoostedRemaining(cropNext.remainingMs, teamPlantMult);
            const cropPercent = growingCrops.length > 0
                ? calcAvgPercentCrops(growingCrops, now, teamPlantMult)
                : 100;
            const nextCountdown = boostedRemaining > 0 ? formatCountdown(boostedRemaining) : 'Ready!';
            wrapper.appendChild(buildStatRow(
                'NEXT PLANT',
                nextCountdown,
                getSpriteElement('plant', cropNext.name),
                cropPercent,
                'stat__progress-fill--plant'
            ));
        }

        // ALL Row - show finish countdown instead of total count
        if (eggBoost.hasBoost && (effectiveViewType === 'egg' || isSummaryView)) {
            const allEggPercent = growingEggs.length > 0
                ? calcAvgPercentEggs(growingEggs, now, teamEggMult)
                : 100;
            const lastEggMs = findLastReadyEgg(growingEggs, now);
            const boostedLastMs = calcBoostedRemaining(lastEggMs, teamEggMult);
            const finishText = boostedLastMs > 0 ? formatCountdown(boostedLastMs) : 'All Ready!';
            wrapper.appendChild(buildStatRow(
                'ALL EGGS',
                finishText,
                getStackedSpritesElement('egg', growingEggs),
                allEggPercent,
                'stat__progress-fill--egg'
            ));
        } else if (plantBoost.hasBoost && (effectiveViewType === 'plant' || isSummaryView)) {
            const allCropPercent = growingCrops.length > 0
                ? calcAvgPercentCrops(growingCrops, now, teamPlantMult)
                : 100;
            const lastCropMs = findLastReadyCrop(growingCrops, now);
            const boostedLastMs = calcBoostedRemaining(lastCropMs, teamPlantMult);
            const finishText = boostedLastMs > 0 ? formatCountdown(boostedLastMs) : 'All Ready!';
            wrapper.appendChild(buildStatRow(
                'ALL PLANTS',
                finishText,
                getStackedSpritesElement('plant', growingCrops),
                allCropPercent,
                'stat__progress-fill--plant'
            ));
        }

        container.appendChild(wrapper);
    },

    renderGroupedSlot: (pets: UnifiedPet[], team: PetTeam, container: HTMLElement, viewType?: string, selectedTileIndices?: Set<string>) => {
        const garden = Globals.myGarden.get();
        const now = Date.now();

        const teamEggBoost = calculateEggBoosts(pets);
        const teamPlantBoost = calculatePlantBoosts(pets);
        const eggStats = calculateBoostStats(teamEggBoost);
        const plantStats = calculateBoostStats(teamPlantBoost);

        container.innerHTML = '';

        const hasEgg = eggStats.timeReductionPerHour > 0;
        const hasPlant = plantStats.timeReductionPerHour > 0;

        if (!hasEgg && !hasPlant) {
            return;
        }

        const wrapper = el('div', 'growth-stats-compact growth-stats-grouped');

        // Filter growing items by selected tiles if filter is provided
        const growingEggs = selectedTileIndices
            ? garden.eggs.growing.filter(egg => selectedTileIndices.has(egg.tileIndex))
            : garden.eggs.growing;
        const growingCrops = selectedTileIndices
            ? garden.crops.growing.filter(crop => selectedTileIndices.has(crop.tileIndex))
            : garden.crops.growing;

        const showEgg = viewType === 'egg' && hasEgg;
        const showPlant = viewType === 'plant' && hasPlant;
        const isSummaryView = !viewType;

        const eggMultiplier = (60 + eggStats.timeReductionPerHour) / 60;
        const plantMultiplier = (60 + plantStats.timeReductionPerHour) / 60;

        // BOOST Row
        const boostItems: { text: string; sprite: HTMLElement }[] = [];

        if ((showEgg || isSummaryView) && hasEgg) {
            const speedIncrease = Math.round((eggStats.timeReductionPerHour / 60) * 100);
            boostItems.push({
                text: `+${speedIncrease}% Speed`,
                sprite: getSpriteElement('egg', 'UncommonEgg')
            });
        }
        if ((showPlant || isSummaryView) && hasPlant) {
            const speedIncrease = Math.round((plantStats.timeReductionPerHour / 60) * 100);
            boostItems.push({
                text: `+${speedIncrease}% Speed`,
                sprite: getSpriteElement('plant', 'Carrot')
            });
        }

        if (boostItems.length > 0) {
            wrapper.appendChild(buildBoostRow(boostItems));
        }

        // NEXT Row - show countdown with boosts applied
        if ((showEgg || isSummaryView) && hasEgg) {
            const eggNext = findNextReadyEgg(growingEggs, now);
            const boostedRemaining = calcBoostedRemaining(eggNext.remainingMs, eggMultiplier);
            const eggPercent = growingEggs.length > 0
                ? calcAvgPercentEggs(growingEggs, now, eggMultiplier)
                : 100;
            const nextCountdown = boostedRemaining > 0 ? formatCountdown(boostedRemaining) : 'Ready!';
            wrapper.appendChild(buildStatRow(
                'NEXT EGG',
                nextCountdown,
                getSpriteElement('egg', eggNext.name),
                eggPercent,
                'stat__progress-fill--egg'
            ));
        }

        if ((showPlant || isSummaryView) && hasPlant) {
            const cropNext = findNextReadyCrop(growingCrops, now);
            const boostedRemaining = calcBoostedRemaining(cropNext.remainingMs, plantMultiplier);
            const cropPercent = growingCrops.length > 0
                ? calcAvgPercentCrops(growingCrops, now, plantMultiplier)
                : 100;
            const nextCountdown = boostedRemaining > 0 ? formatCountdown(boostedRemaining) : 'Ready!';
            wrapper.appendChild(buildStatRow(
                'NEXT PLANT',
                nextCountdown,
                getSpriteElement('plant', cropNext.name),
                cropPercent,
                'stat__progress-fill--plant'
            ));
        }

        // ALL Row - show finish countdown instead of total count
        if ((showEgg || isSummaryView) && hasEgg) {
            const allEggPercent = growingEggs.length > 0
                ? calcAvgPercentEggs(growingEggs, now, eggMultiplier)
                : 100;
            const lastEggMs = findLastReadyEgg(growingEggs, now);
            const boostedLastMs = calcBoostedRemaining(lastEggMs, eggMultiplier);
            const finishText = boostedLastMs > 0 ? formatCountdown(boostedLastMs) : 'All Ready!';
            wrapper.appendChild(buildStatRow(
                'ALL EGGS',
                finishText,
                getStackedSpritesElement('egg', growingEggs),
                allEggPercent,
                'stat__progress-fill--egg'
            ));
        } else if ((showPlant || isSummaryView) && hasPlant) {
            const allCropPercent = growingCrops.length > 0
                ? calcAvgPercentCrops(growingCrops, now, plantMultiplier)
                : 100;
            const lastCropMs = findLastReadyCrop(growingCrops, now);
            const boostedLastMs = calcBoostedRemaining(lastCropMs, plantMultiplier);
            const finishText = boostedLastMs > 0 ? formatCountdown(boostedLastMs) : 'All Ready!';
            wrapper.appendChild(buildStatRow(
                'ALL PLANTS',
                finishText,
                getStackedSpritesElement('plant', growingCrops),
                allCropPercent,
                'stat__progress-fill--plant'
            ));
        }

        container.appendChild(wrapper);
    },

    hasContent: (pets, team) => {
        const petsArray = Array.isArray(pets) ? pets : [pets];
        return hasEggBoosts(petsArray) || hasPlantBoosts(petsArray);
    },

    shouldDisplay: (team: PetTeam, pets: UnifiedPet[], purpose: TeamPurposeAnalysis) => {
        const allowedPanels = DISPLAY_RULES.ALLOWED_PANELS[purpose.primary] || [];
        const isPurposeAllowed = allowedPanels.includes('growth');
        const hasGrowthAbilities = hasEggBoosts(pets) || hasPlantBoosts(pets);
        return isPurposeAllowed && hasGrowthAbilities;
    },

    /**
     * Count stat rows for combined panel detection
     * Growth panel typically shows 2-3 rows: NEXT item, ALL items, boost %
     */
    countRows: (pets, team, viewType) => {
        const petsArray = Array.isArray(pets) ? pets : [pets];
        const hasEgg = hasEggBoosts(petsArray);
        const hasPlant = hasPlantBoosts(petsArray);

        if (!hasEgg && !hasPlant) return 0;

        // When viewType is set, count rows for that type only
        // NEXT row + ALL row = 2 rows typically
        // Without viewType (summary), could show both types = more rows
        if (viewType === 'egg' || viewType === 'plant') {
            return 2; // NEXT item + ALL items
        }

        // Summary view - count both if both exist
        let rows = 0;
        if (hasEgg) rows += 2;
        if (hasPlant) rows += 2;
        return rows;
    },
};
