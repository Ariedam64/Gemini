/**
 * Growth Panel Helpers
 *
 * Shared helper functions for growth panel rendering.
 * Extracted from growthPanel.ts for maintainability.
 *
 * Per .claude/rules/core.md:
 * - Keep files small and focused (<500 lines)
 * - Use proper typing (no `any`)
 *
 * @module growthPanel/helpers
 */

import type { UnifiedPet } from '../../../../../../globals/core/types';
import type { PetTeam } from '../../../../../../features/petTeam/types';
import { MGSprite } from '../../../../../../modules/sprite';
import { MGPetTeam } from '../../../../../../features/petTeam';
import {
    calculateEggBoosts,
    calculatePlantBoosts,
    calculateBoostStats
} from '../../../../../../features/growthTimers/logic/boostCalculator';
import { EGG_BOOST_ABILITIES, PLANT_BOOST_ABILITIES } from '../../../../../../features/growthTimers/types';

// ─────────────────────────────────────────────────────────────────────────────
// DOM Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create a DOM element with optional class and text
 */
export function el(tag: string, className?: string, text?: string): HTMLElement {
    const elem = document.createElement(tag);
    if (className) elem.className = className;
    if (text) elem.textContent = text;
    return elem;
}

// ─────────────────────────────────────────────────────────────────────────────
// Time Formatting
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format milliseconds to compact time (e.g., "2h 14m", "45m", "3m 20s")
 */
export function formatTimeCompact(ms: number): string {
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
export function formatMinutesPerHour(minutesPerHour: number): string {
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
 * Format milliseconds into countdown string (e.g., "4d 6h 23m")
 */
export function formatCountdown(ms: number): string {
    if (ms <= 0) return '0m';

    const totalSeconds = Math.floor(ms / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const parts: string[] = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0 || parts.length === 0) parts.push(`${minutes}m`);

    return parts.join(' ');
}

// ─────────────────────────────────────────────────────────────────────────────
// Sprite Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get sprite element for a crop or egg
 * Returns actual canvas DOM element (not HTML string) to preserve rendered content
 */
export function getSpriteElement(type: 'egg' | 'plant', species: string | null): HTMLElement {
    const category = type === 'egg' ? 'pet' : 'plant';
    const wrapper = el('span', 'sprite-wrapper');
    if (!species) return wrapper;
    let targetSpecies = species;

    // Handle Celestial plant sprite mapping
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
 */
export function getStackedSpritesElement(type: 'egg' | 'plant', items: { species?: string; eggId?: string }[]): HTMLElement {
    const wrapper = el('span', 'stacked-sprites');

    if (items.length === 0) {
        return wrapper;
    }

    const category = type === 'egg' ? 'pet' : 'plant';
    const maxSprites = 4;

    const uniqueSpecies = [...new Set(items.map(i => type === 'egg' ? i.eggId : i.species).filter(Boolean))];
    const toShow = uniqueSpecies.slice(0, maxSprites);

    if (toShow.length === 0) {
        return wrapper;
    }

    wrapper.style.display = 'grid';
    wrapper.style.gridTemplateColumns = 'repeat(2, 10px)';
    wrapper.style.gridTemplateRows = 'repeat(2, 10px)';
    wrapper.style.width = '24px';
    wrapper.style.height = '24px';

    let addedAny = false;
    for (let i = 0; i < toShow.length; i++) {
        let spriteAsset = toShow[i];

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
        } catch (e) { }
    }

    if (!addedAny) {
        wrapper.textContent = type === 'egg' ? '🥚' : '🌱';
    }

    return wrapper;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI Builders
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a stat row using DOM APIs
 */
export function buildStatRow(
    label: string,
    timer: string,
    spriteElement: HTMLElement,
    progressPercent: number,
    progressClass: string,
    countdown?: string
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

    const displayText = countdown ? `${progressPercent}% (${countdown})` : `${progressPercent}%`;
    const percentEl = el('span', 'stat__percent', displayText);
    progressMini.appendChild(percentEl);

    row.appendChild(labelEl);
    if (spriteElement && spriteElement.innerHTML !== '' && spriteElement.textContent !== '🥚' && spriteElement.textContent !== '🌱') {
        row.appendChild(spriteLabel);
    }
    row.appendChild(timerEl);
    row.appendChild(progressMini);

    return row;
}

/**
 * Build a boost row with sprite indicators
 */
export function buildBoostRow(boosts: { text: string; sprite: HTMLElement }[]): HTMLElement {
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

// ─────────────────────────────────────────────────────────────────────────────
// Boost Calculations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get pet's boost info for a specific type
 */
export function getPetBoostInfo(pet: UnifiedPet, type: 'egg' | 'plant'): {
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
        minutesPerProc: 0,
        hourlyReduction: totalHourlyReduction,
        abilityName: combinedNames.join(', '),
    };
}

/**
 * Calculate individual pet boost multiplier
 * Formula: (60 + hourlyReduction) / 60
 */
export function calculatePetMultiplier(pet: UnifiedPet, type: 'egg' | 'plant'): string {
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
export function calculateTeamMultiplier(team: PetTeam, type: 'egg' | 'plant'): string {
    const pets = MGPetTeam.getPetsForTeam(team);
    const boosts = type === 'egg' ? calculateEggBoosts(pets) : calculatePlantBoosts(pets);
    const stats = calculateBoostStats(boosts);

    const multiplier = (60 + stats.timeReductionPerHour) / 60;
    return `${multiplier.toFixed(2)}x`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress Calculations
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Calculate average progress percentage for eggs (uses plantedAt/maturedAt)
 */
export function calcAvgPercentEggs(items: { maturedAt: number; plantedAt: number }[], now: number, speedMultiplier: number = 1): number {
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
export function calcAvgPercentCrops(items: { startTime: number; endTime: number }[], now: number, speedMultiplier: number = 1): number {
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
export function findNextReadyEgg(items: { maturedAt: number; eggId?: string }[], now: number) {
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
export function findNextReadyCrop(items: { endTime: number; species?: string }[], now: number) {
    if (items.length === 0) return { remainingMs: 0, name: null };
    const sorted = [...items].sort((a, b) => a.endTime - b.endTime);
    const next = sorted[0];
    return {
        remainingMs: Math.max(0, next.endTime - now),
        name: (next.species || null) as string | null,
    };
}

/**
 * Find last (longest) ready egg - when ALL eggs will be done
 */
export function findLastReadyEgg(items: { maturedAt: number }[], now: number): number {
    if (items.length === 0) return 0;
    const maxMaturedAt = Math.max(...items.map(i => i.maturedAt));
    return Math.max(0, maxMaturedAt - now);
}

/**
 * Find last (longest) ready crop - when ALL crops will be done
 */
export function findLastReadyCrop(items: { endTime: number }[], now: number): number {
    if (items.length === 0) return 0;
    const maxEndTime = Math.max(...items.map(i => i.endTime));
    return Math.max(0, maxEndTime - now);
}

/**
 * Calculate boosted remaining time
 * Takes raw remaining ms and applies speed multiplier
 */
export function calcBoostedRemaining(remainingMs: number, speedMultiplier: number): number {
    if (remainingMs <= 0 || speedMultiplier <= 0) return 0;
    return Math.round(remainingMs / speedMultiplier);
}

