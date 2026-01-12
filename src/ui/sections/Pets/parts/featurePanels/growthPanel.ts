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

import type { FeaturePanelDefinition } from './registry';
import type { PetTeam } from '../../../../../features/petTeam/types';
import type { UnifiedPet } from '../../../../../globals/core/types';
import { Globals } from '../../../../../globals';
import { MGSprite } from '../../../../../modules/sprite';
import { MGPetTeam } from '../../../../../features/petTeam';
import {
    hasEggBoosts,
    hasPlantBoosts,
    calculateEggBoosts,
    calculatePlantBoosts,
    calculateBoostStats
} from '../../../../../features/growthTimers/logic/boostCalculator';
import { EGG_BOOST_ABILITIES, PLANT_BOOST_ABILITIES } from '../../../../../features/growthTimers/types';
import { growthPanelCss } from './growthPanel.css';

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format milliseconds to compact time (e.g., "2h 14m", "45m", "3m 20s")
 */
function formatTimeCompact(ms: number): string {
    if (ms <= 0) return 'Ready!';

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours >= 24) {
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        return `${days}d ${remainingHours}h`;
    }
    if (hours >= 1) {
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    }
    if (minutes >= 1) {
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
}

/**
 * Format minutes per hour to "Xh Ym/h" (e.g., 162min/h → "2h 42m/h")
 */
function formatMinutesPerHour(minutesPerHour: number): string {
    const hours = Math.floor(minutesPerHour / 60);
    const minutes = minutesPerHour % 60;

    if (hours > 0 && minutes > 0) {
        return `${hours}h ${minutes}m/h`;
    } else if (hours > 0) {
        return `${hours}h/h`;
    } else {
        return `${minutes}m/h`;
    }
}
/**
 * Create a DOM element with optional class and text
 */
function el(tag: string, className?: string, text?: string): HTMLElement {
    const elem = document.createElement(tag);
    if (className) elem.className = className;
    if (text) elem.textContent = text;
    return elem;
}

/**
 * Get sprite element for a crop or egg
 * Returns actual canvas DOM element (not HTML string) to preserve rendered content
 */
function getSpriteElement(type: 'egg' | 'plant', species: string | null): HTMLElement {
    const category = type === 'egg' ? 'pet' : 'plant';
    const wrapper = el('span', 'sprite-wrapper');
    if (!species) return wrapper; // Return empty wrapper if no species (no placeholder)
    let targetSpecies = species;

    // Handle Celestial plant sprite mapping (pattern from JournalChecker)
    if (type === 'plant') {
        if (targetSpecies === 'DawnCelestial') targetSpecies = 'DawnCelestialCrop';
        if (targetSpecies === 'MoonCelestial') targetSpecies = 'MoonCelestialCrop';
    }

    try {
        if (MGSprite.isReady() && MGSprite.has(category, targetSpecies)) {
            const canvas = MGSprite.toCanvas(category, targetSpecies, { scale: 0.3 });
            canvas.style.height = '16px';
            canvas.style.width = 'auto';
            canvas.style.imageRendering = 'pixelated';
            wrapper.appendChild(canvas);
        }
    } catch (e) { }

    return wrapper;
}

/**
 * Get stacked sprite elements for showing multiple items (e.g., ALL PLANTS row)
 * Returns actual canvas DOM elements to preserve rendered content
 */
function getStackedSpritesElement(type: 'egg' | 'plant', items: { species?: string; eggId?: string }[]): HTMLElement {
    const wrapper = el('span', 'stacked-sprites');
    // Remove inline styles - handled by CSS

    if (items.length === 0) {
        return wrapper; // Return empty wrapper (no placeholder)
    }

    const category = type === 'egg' ? 'pet' : 'plant';
    const maxSprites = 4;

    // Get unique species (up to maxSprites)
    const uniqueSpecies = [...new Set(items.map(i => type === 'egg' ? i.eggId : i.species).filter(Boolean))];
    const toShow = uniqueSpecies.slice(0, maxSprites);

    if (toShow.length === 0) {
        return wrapper; // Return empty wrapper (no placeholder)
    }

    // Use CSS grid for 2x2 layout with overlap (50-65% visible per user request)
    wrapper.style.display = 'grid';
    wrapper.style.gridTemplateColumns = 'repeat(2, 10px)';
    wrapper.style.gridTemplateRows = 'repeat(2, 10px)';
    wrapper.style.width = '24px';
    wrapper.style.height = '24px';

    let addedAny = false;
    for (let i = 0; i < toShow.length; i++) {
        let spriteAsset = toShow[i];

        // Handle Celestial plant sprite mapping (pattern from JournalChecker)
        if (type === 'plant' && spriteAsset) {
            if (spriteAsset === 'DawnCelestial') spriteAsset = 'DawnCelestialCrop';
            if (spriteAsset === 'MoonCelestial') spriteAsset = 'MoonCelestialCrop';
        }

        try {
            if (MGSprite.isReady() && spriteAsset && MGSprite.has(category, spriteAsset)) {
                const canvas = MGSprite.toCanvas(category, spriteAsset, { scale: 0.2 });
                canvas.style.height = '14px';
                canvas.style.width = 'auto';
                canvas.style.imageRendering = 'pixelated';
                canvas.style.position = 'relative';
                canvas.style.zIndex = String(maxSprites - i);
                wrapper.appendChild(canvas);
                addedAny = true;
            }
        } catch (e) {
            // Skip failed sprites
        }
    }

    if (!addedAny) {
        wrapper.textContent = type === 'egg' ? '🥚' : '🌱';
    }

    return wrapper;
}

/**
 * Build a stat row using DOM APIs
 */
function buildStatRow(
    label: string,
    timer: string,
    spriteElement: HTMLElement,
    progressPercent: number,
    progressClass: string
): HTMLElement {
    const row = el('div', 'stat-row');

    const labelEl = el('span', 'stat__label', label);
    const timerEl = el('span', 'stat__timer', timer);

    const spriteLabel = el('span', 'stat__str-label');
    spriteLabel.appendChild(spriteElement);

    const progressMini = el('div', 'stat__progress-mini');
    const progressFill = el('div', `stat__progress-fill ${progressClass}`);
    progressFill.style.width = `${progressPercent}%`;
    progressMini.appendChild(progressFill);

    const percentEl = el('span', 'stat__percent', `${progressPercent}%`);
    progressMini.appendChild(percentEl); // Append percent INSIDE progress bar

    // Append in correct order: label, sprite, timer, progress (with percent overlayed)
    row.appendChild(labelEl);
    if (spriteElement && spriteElement.innerHTML !== '' && spriteElement.textContent !== '🥚' && spriteElement.textContent !== '🌱') {
        row.appendChild(spriteLabel);  // Only append if sprite has content
    }
    row.appendChild(timerEl);      // Timer second
    row.appendChild(progressMini); // Progress bar with overlayed percent

    return row;
}

/**
 * Build a boost row with sprite indicators
 */
function buildBoostRow(boosts: { text: string; sprite: HTMLElement }[]): HTMLElement {
    const row = el('div', 'stat-row stat-row--boost');
    const labelEl = el('span', 'stat__label', 'BOOST');
    row.appendChild(labelEl);

    const valuesWrapper = el('span', 'stat__values-row');
    boosts.forEach((boost, idx) => {
        const item = el('span', 'stat__boost-item');
        item.appendChild(boost.sprite);
        item.appendChild(el('span', 'stat__value stat__value--accent', boost.text));
        valuesWrapper.appendChild(item);

        if (idx < boosts.length - 1) {
            valuesWrapper.appendChild(el('span', 'stat__separator', ' '));
        }
    });

    row.appendChild(valuesWrapper);
    return row;
}

/**
 * Get pet's boost info for a specific type
 */
function getPetBoostInfo(pet: UnifiedPet, type: 'egg' | 'plant'): {
    hasBoost: boolean;
    minutesPerProc: number;
    hourlyReduction: number;
    abilityName: string;
} {
    const capacities = type === 'egg' ? EGG_BOOST_ABILITIES : PLANT_BOOST_ABILITIES;
    let totalHourlyReduction = 0;
    let hasAnyBoost = false;
    const combinedNames: string[] = [];

    for (const ability of pet.abilities) {
        if (ability in capacities) {
            const data = capacities[ability];
            const procsPerHour = data.procRate * 60;
            totalHourlyReduction += procsPerHour * data.minutesPerProc;
            hasAnyBoost = true;
            combinedNames.push(ability);
        }
    }

    return {
        hasBoost: hasAnyBoost,
        minutesPerProc: 0, // No longer single-ability specific
        hourlyReduction: totalHourlyReduction,
        abilityName: combinedNames.join(', '),
    };
}

/**
 * Calculate individual pet boost multiplier
 * Formula: (60 + hourlyReduction) / 60
 * Example: 60m base + 60m reduction = 120/60 = 2.00x faster
 */
function calculatePetMultiplier(pet: UnifiedPet, type: 'egg' | 'plant'): string {
    const capacities = type === 'egg' ? EGG_BOOST_ABILITIES : PLANT_BOOST_ABILITIES;
    let hourlyReduction = 0;

    for (const ability of pet.abilities) {
        if (ability in capacities) {
            const data = capacities[ability];
            const procsPerHour = data.procRate * 60;
            hourlyReduction += procsPerHour * data.minutesPerProc;
        }
    }

    const multiplier = (60 + hourlyReduction) / 60;
    return `${multiplier.toFixed(2)}x`;
}

/**
 * Calculate team boost multiplier
 */
function calculateTeamMultiplier(team: PetTeam, type: 'egg' | 'plant'): string {
    const pets = MGPetTeam.getPetsForTeam(team);
    const boosts = type === 'egg' ? calculateEggBoosts(pets) : calculatePlantBoosts(pets);
    const stats = calculateBoostStats(boosts);

    const multiplier = (60 + stats.timeReductionPerHour) / 60;
    return `${multiplier.toFixed(2)}x`;
}

/**
 * Calculate average progress percentage for eggs (uses plantedAt/maturedAt)
 */
function calcAvgPercentEggs(items: { maturedAt: number; plantedAt: number }[], now: number, speedMultiplier: number = 1): number {
    if (items.length === 0) return 0;
    return Math.round(items.reduce((sum, item) => {
        const elapsed = now - item.plantedAt;
        const remainingRaw = item.maturedAt - now;
        const remainingEffective = remainingRaw / speedMultiplier;
        const totalEffective = elapsed + remainingEffective;
        const percent = totalEffective > 0 ? (elapsed / totalEffective) * 100 : 0;
        return sum + Math.min(100, Math.max(0, percent));
    }, 0) / items.length);
}

/**
 * Calculate average progress percentage for crops (uses startTime/endTime)
 */
function calcAvgPercentCrops(items: { startTime: number; endTime: number }[], now: number, speedMultiplier: number = 1): number {
    if (items.length === 0) return 0;
    return Math.round(items.reduce((sum, item) => {
        const elapsed = now - item.startTime;
        const remainingRaw = item.endTime - now;
        const remainingEffective = remainingRaw / speedMultiplier;
        const totalEffective = elapsed + remainingEffective;
        const percent = totalEffective > 0 ? (elapsed / totalEffective) * 100 : 0;
        return sum + Math.min(100, Math.max(0, percent));
    }, 0) / items.length);
}

/**
 * Find next ready egg
 */
function findNextReadyEgg(items: { maturedAt: number; eggId?: string }[], now: number) {
    if (items.length === 0) return { remainingMs: 0, name: null };
    const sorted = [...items].sort((a, b) => a.maturedAt - b.maturedAt);
    const next = sorted[0];
    return {
        remainingMs: Math.max(0, next.maturedAt - now),
        name: (next.eggId || null) as string | null,
    };
}

/**
 * Find next ready crop
 */
function findNextReadyCrop(items: { endTime: number; species?: string }[], now: number) {
    if (items.length === 0) return { remainingMs: 0, name: null };
    const sorted = [...items].sort((a, b) => a.endTime - b.endTime);
    const next = sorted[0];
    return {
        remainingMs: Math.max(0, next.endTime - now),
        name: (next.species || null) as string | null,
    };
}

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

    renderPetSlot: (pet: UnifiedPet, team: PetTeam, container: HTMLElement, viewType?: string) => {

        const garden = Globals.myGarden.get();
        const now = Date.now();

        const eggBoost = getPetBoostInfo(pet, 'egg');
        const plantBoost = getPetBoostInfo(pet, 'plant');

        // Clear container
        container.innerHTML = '';

        if (!eggBoost.hasBoost && !plantBoost.hasBoost) {
            return;
        }

        const growingEggs = garden.eggs.growing;
        const growingCrops = garden.crops.growing;

        // Create wrapper
        const wrapper = el('div', 'growth-stats-compact');

        // Check if pet contributes to current view
        const hasActiveBoost = (viewType === 'egg' && eggBoost.hasBoost) ||
            (viewType === 'plant' && plantBoost.hasBoost);

        // If no viewType is specified (e.g. summary view), show what the pet has
        const isSummaryView = !viewType;

        if (!hasActiveBoost && !isSummaryView) {
            const lackingType = viewType === 'egg' ? 'Egg' : 'Plant';
            const row = el('div', 'stat-row stat-row--message');
            row.appendChild(el('span', 'stat__message', `No ${lackingType} Growth Boost, Click the Button to Switch View`));
            wrapper.appendChild(row);
            container.appendChild(wrapper);
            return;
        }

        // 1. Context-Aware BOOST Row (Percentage based)
        const boostItems: { text: string; sprite: HTMLElement }[] = [];

        const showEggBoost = eggBoost.hasBoost && (viewType === 'egg' || isSummaryView);
        const showPlantBoost = plantBoost.hasBoost && (viewType === 'plant' || isSummaryView);

        if (showEggBoost) {
            const speedIncrease = Math.round((eggBoost.hourlyReduction / 60) * 100);
            boostItems.push({
                text: `+${speedIncrease}%`,
                sprite: getSpriteElement('egg', 'UncommonEgg')
            });
        }
        if (showPlantBoost) {
            const speedIncrease = Math.round((plantBoost.hourlyReduction / 60) * 100);
            boostItems.push({
                text: `+${speedIncrease}%`,
                sprite: getSpriteElement('plant', 'Carrot')
            });
        }

        if (boostItems.length > 0) {
            wrapper.appendChild(buildBoostRow(boostItems));
        }

        // Pre-calculate team multipliers for unified progress bars
        const teamEggMultStr = calculateTeamMultiplier(team, 'egg');
        const teamEggMultVal = parseFloat(teamEggMultStr.replace('x', ''));
        const teamPlantMultStr = calculateTeamMultiplier(team, 'plant');
        const teamPlantMultVal = parseFloat(teamPlantMultStr.replace('x', ''));

        // 2. Build NEXT Row (STRICT contextual filtering)
        // Values: Display pet's individual power, Progres: Display team's effective progress
        if (eggBoost.hasBoost && (viewType === 'egg' || isSummaryView)) {
            const eggMult = calculatePetMultiplier(pet, 'egg');
            const eggNext = findNextReadyEgg(growingEggs, now);
            const eggPercent = growingEggs.length > 0
                ? calcAvgPercentEggs(growingEggs, now, teamEggMultVal)
                : 100; // 100% if nothing growing
            wrapper.appendChild(buildStatRow(
                'NEXT EGG',
                eggMult,
                getSpriteElement('egg', eggNext.name),
                eggPercent,
                'stat__progress-fill--egg'
            ));
        }

        if (plantBoost.hasBoost && (viewType === 'plant' || isSummaryView)) {
            const plantMult = calculatePetMultiplier(pet, 'plant');
            const cropNext = findNextReadyCrop(growingCrops, now);
            const cropPercent = growingCrops.length > 0
                ? calcAvgPercentCrops(growingCrops, now, teamPlantMultVal)
                : 100; // 100% if nothing growing
            wrapper.appendChild(buildStatRow(
                'NEXT PLANT',
                plantMult,
                getSpriteElement('plant', cropNext.name),
                cropPercent,
                'stat__progress-fill--plant'
            ));
        }

        // 3. Build ALL Row (STRICT contextual filtering)
        if (eggBoost.hasBoost && (viewType === 'egg' || isSummaryView)) {
            const allEggPercent = growingEggs.length > 0
                ? calcAvgPercentEggs(growingEggs, now, teamEggMultVal)
                : 100; // 100% if nothing growing
            wrapper.appendChild(buildStatRow(
                'ALL EGGS',
                `${growingEggs.length} total`,
                getStackedSpritesElement('egg', growingEggs),
                allEggPercent,
                'stat__progress-fill--egg'
            ));
        } else if (plantBoost.hasBoost && (viewType === 'plant' || isSummaryView)) {
            const allCropPercent = growingCrops.length > 0
                ? calcAvgPercentCrops(growingCrops, now, teamPlantMultVal)
                : 100; // 100% if nothing growing
            wrapper.appendChild(buildStatRow(
                'ALL PLANTS',
                `${growingCrops.length} total`,
                getStackedSpritesElement('plant', growingCrops),
                allCropPercent,
                'stat__progress-fill--plant'
            ));
        }

        container.appendChild(wrapper);
    },

    shouldDisplay: (team: PetTeam, pets: UnifiedPet[]) => {
        return hasEggBoosts(pets) || hasPlantBoosts(pets);
    },
};
