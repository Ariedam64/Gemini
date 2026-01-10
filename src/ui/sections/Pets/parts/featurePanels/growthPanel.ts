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
import {
    hasEggBoosts,
    hasPlantBoosts,
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
    const defaultSpecies = type === 'egg' ? 'UncommonEgg' : 'Carrot';
    let targetSpecies = species || defaultSpecies;

    // Handle Celestial plant sprite mapping (pattern from JournalChecker)
    if (type === 'plant') {
        if (targetSpecies === 'DawnCelestial') targetSpecies = 'DawnCelestialCrop';
        if (targetSpecies === 'MoonCelestial') targetSpecies = 'MoonCelestialCrop';
    }

    const wrapper = el('span', 'sprite-wrapper');
    // Remove inline styles - handled by CSS

    try {
        if (MGSprite.isReady() && MGSprite.has(category, targetSpecies)) {
            const canvas = MGSprite.toCanvas(category, targetSpecies, { scale: 0.3 });
            canvas.style.height = '16px';
            canvas.style.width = 'auto';
            canvas.style.imageRendering = 'pixelated';
            wrapper.appendChild(canvas);
            return wrapper;
        }
    } catch (e) {
        // Fallback
    }

    // Fallback emoji
    wrapper.textContent = type === 'egg' ? '🥚' : '🌱';
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
        wrapper.textContent = type === 'egg' ? '🥚' : '🌱';
        return wrapper;
    }

    const category = type === 'egg' ? 'pet' : 'plant';
    const maxSprites = 4;

    // Get unique species (up to maxSprites)
    const uniqueSpecies = [...new Set(items.map(i => type === 'egg' ? i.eggId : i.species).filter(Boolean))];
    const toShow = uniqueSpecies.slice(0, maxSprites);

    if (toShow.length === 0) {
        wrapper.textContent = type === 'egg' ? '🥚' : '🌱';
        return wrapper;
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
    row.appendChild(spriteLabel);  // Sprite first
    row.appendChild(timerEl);      // Timer second
    row.appendChild(progressMini); // Progress bar with overlayed percent

    return row;
}

/**
 * Build a boost row using DOM APIs
 */
function buildBoostRow(boostText: string): HTMLElement {
    const row = el('div', 'stat-row stat-row--boost');
    const labelEl = el('span', 'stat__label', 'BOOST');
    const valueEl = el('span', 'stat__value stat__value--accent', boostText);
    row.appendChild(labelEl);
    row.appendChild(valueEl);
    return row;
}

/**
 * Get pet's boost info for a specific type
 */
function getPetBoostInfo(pet: UnifiedPet, type: 'egg' | 'plant'): {
    hasBoost: boolean;
    minutesPerProc: number;
    abilityName: string;
} {
    const abilities = type === 'egg' ? EGG_BOOST_ABILITIES : PLANT_BOOST_ABILITIES;

    for (const ability of pet.abilities) {
        if (ability in abilities) {
            const data = abilities[ability];
            return {
                hasBoost: true,
                minutesPerProc: data.minutesPerProc,
                abilityName: ability,
            };
        }
    }

    return { hasBoost: false, minutesPerProc: 0, abilityName: '' };
}

/**
 * Calculate average progress percentage for eggs (uses plantedAt/maturedAt)
 */
function calcAvgPercentEggs(items: { maturedAt: number; plantedAt: number }[], now: number): number {
    if (items.length === 0) return 0;
    return Math.round(items.reduce((sum, item) => {
        const total = item.maturedAt - item.plantedAt;
        const elapsed = now - item.plantedAt;
        return sum + Math.min(100, Math.max(0, (elapsed / total) * 100));
    }, 0) / items.length);
}

/**
 * Calculate average progress percentage for crops (uses startTime/endTime)
 */
function calcAvgPercentCrops(items: { startTime: number; endTime: number }[], now: number): number {
    if (items.length === 0) return 0;
    return Math.round(items.reduce((sum, item) => {
        const total = item.endTime - item.startTime;
        const elapsed = now - item.startTime;
        return sum + Math.min(100, Math.max(0, (elapsed / total) * 100));
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

    renderPetSlot: (pet: UnifiedPet, team: PetTeam, container: HTMLElement) => {
        // Inject CSS once (idempotent - won't duplicate if already exists)
        if (!document.getElementById('growth-panel-styles')) {
            const style = document.createElement('style');
            style.id = 'growth-panel-styles';
            style.textContent = growthPanelCss;
            document.head.appendChild(style);
        }

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

        // ─────── DUAL BOOST (both egg + plant) ───────
        if (eggBoost.hasBoost && plantBoost.hasBoost) {
            // BOOST row
            wrapper.appendChild(buildBoostRow(`+${eggBoost.minutesPerProc}min (egg) +${plantBoost.minutesPerProc}min (plant)`));

            // NEXT EGG row
            const eggNext = findNextReadyEgg(growingEggs, now);
            const eggPercent = calcAvgPercentEggs(growingEggs, now);
            wrapper.appendChild(buildStatRow(
                'NEXT EGG',
                formatTimeCompact(eggNext.remainingMs),
                getSpriteElement('egg', eggNext.name),
                eggPercent,
                'stat__progress-fill--egg'
            ));

            // NEXT PLANT row
            const cropNext = findNextReadyCrop(growingCrops, now);
            const cropPercent = calcAvgPercentCrops(growingCrops, now);
            wrapper.appendChild(buildStatRow(
                'NEXT PLANT',
                formatTimeCompact(cropNext.remainingMs),
                getSpriteElement('plant', cropNext.name),
                cropPercent,
                'stat__progress-fill--plant'
            ));
        }
        // ─────── SINGLE BOOST: EGG ───────
        else if (eggBoost.hasBoost) {
            // BOOST row
            wrapper.appendChild(buildBoostRow(`+${eggBoost.minutesPerProc}min/proc`));

            // NEXT EGG row
            const eggNext = findNextReadyEgg(growingEggs, now);
            const eggPercent = calcAvgPercentEggs(growingEggs, now);
            wrapper.appendChild(buildStatRow(
                'NEXT EGG',
                formatTimeCompact(eggNext.remainingMs),
                getSpriteElement('egg', eggNext.name),
                eggPercent,
                'stat__progress-fill--egg'
            ));

            // ALL EGGS row
            const allEggPercent = calcAvgPercentEggs(growingEggs, now);
            wrapper.appendChild(buildStatRow(
                'ALL EGGS',
                `${growingEggs.length} total`,
                getStackedSpritesElement('egg', growingEggs),
                allEggPercent,
                'stat__progress-fill--egg'
            ));
        }
        // ─────── SINGLE BOOST: PLANT ───────
        else if (plantBoost.hasBoost) {
            // BOOST row
            wrapper.appendChild(buildBoostRow(`+${plantBoost.minutesPerProc}min/proc`));

            // NEXT PLANT row
            const cropNext = findNextReadyCrop(growingCrops, now);
            const cropPercent = calcAvgPercentCrops(growingCrops, now);
            wrapper.appendChild(buildStatRow(
                'NEXT PLANT',
                formatTimeCompact(cropNext.remainingMs),
                getSpriteElement('plant', cropNext.name),
                cropPercent,
                'stat__progress-fill--plant'
            ));

            // ALL PLANTS row
            const allCropPercent = calcAvgPercentCrops(growingCrops, now);
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
