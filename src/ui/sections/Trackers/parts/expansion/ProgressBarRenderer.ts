/**
 * Progress Bar Renderer
 *
 * Renders XP and Growth progress bars for expanded team cards.
 * Extracted from TrackerExpansion.ts for maintainability.
 *
 * Per .claude/rules/core.md:
 * - Keep files small and focused (<500 lines)
 * - Use proper typing (no `any`)
 *
 * @module expansion/ProgressBarRenderer
 */

import type { UnifiedPet } from '../../../../../globals/core/types';
import type { EggWithTile, CropInfo } from '../../../../../globals/core/types';
import type { ExpandedTeamState } from './types';
import { element } from '../../../../styles/helpers';
import { Globals } from '../../../../../globals';
import { MGSprite } from '../../../../../modules/sprite';
import { GeminiIconButton } from '../../../../components/GeminiIconButton';
import {
    hasEggBoosts,
    hasPlantBoosts,
    calculateEggBoosts,
    calculatePlantBoosts,
    calculateBoostStats
} from '../../../../../features/growthTimers/logic/boostCalculator';
import { calculateItemEffectiveGrowth } from '../../../../../features/growthTimers/logic/effectiveTime';
import { showGrowthDropdown } from './GrowthDropdown';

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Format minutes per hour to "Xh Ym/h"
 */
function formatMinPerHour(min: number): string {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return h > 0 && m > 0 ? `${h}h ${m}m/h` : h > 0 ? `${h}h/h` : `${m}m/h`;
}

/**
 * Format milliseconds to compact time string
 */
function formatTime(ms: number): string {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0) return `${h}h ${m % 60}m ${s % 60}s`;
    if (m > 0) return `${m}m ${s % 60}s`;
    return `${s}s`;
}

/**
 * Get item species/id based on view type
 * Note: Plants use CropInfo (individual crop slots), eggs use EggWithTile
 */
function getItemSpecies(item: EggWithTile | CropInfo, viewType: 'egg' | 'plant'): string {
    if (viewType === 'egg') {
        return (item as EggWithTile).eggId;
    }
    let species = (item as CropInfo).species;
    // Handle Celestial plant sprite mapping
    if (species === 'DawnCelestial') species = 'DawnCelestialCrop';
    if (species === 'MoonCelestial') species = 'MoonCelestialCrop';
    return species;
}

/**
 * Get item times based on view type
 */
function getItemTimes(
    item: EggWithTile | CropInfo,
    viewType: 'egg' | 'plant'
): { startTime: number; endTime: number } {
    if (viewType === 'egg') {
        const egg = item as EggWithTile;
        return { startTime: egg.plantedAt, endTime: egg.maturedAt };
    }
    const crop = item as CropInfo;
    return { startTime: crop.startTime, endTime: crop.endTime };
}

// ─────────────────────────────────────────────────────────────────────────────
// XP Progress Bar
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Render XP progress bar for team
 */
export function renderXpProgressBar(container: HTMLElement, pets: UnifiedPet[]): void {
    const teamHasNonMaxPets = pets.some(p => p.currentStrength < p.maxStrength);

    if (!teamHasNonMaxPets || pets.length === 0) {
        return;
    }

    const teamProgressPercent = Math.round(
        (pets.reduce((sum, p) => sum + (p.currentStrength / p.maxStrength), 0) / pets.length) * 100
    );

    const progressBar = element('div', { className: 'team-progress-bar' });
    const colorClass = teamProgressPercent < 33 ? 'low' : teamProgressPercent < 67 ? 'medium' : 'high';
    const progressFill = element('div', {
        className: `team-progress-bar__fill team-progress-bar__fill--${colorClass}`
    });
    progressFill.style.width = `${teamProgressPercent}%`;

    const progressPercentText = element('div', {
        className: 'team-progress-bar__percent',
        textContent: `${teamProgressPercent}%`
    });

    progressBar.appendChild(progressFill);
    progressBar.appendChild(progressPercentText);
    container.prepend(progressBar);
}

// ─────────────────────────────────────────────────────────────────────────────
// Growth Summary Bar
// ─────────────────────────────────────────────────────────────────────────────

export interface GrowthSummaryBarOptions {
    container: HTMLElement;
    pets: UnifiedPet[];
    teamId: string;
    state: ExpandedTeamState;
    onViewTypeChange: (viewType: 'egg' | 'plant') => void;
    onPinnedItemChange: (itemId: string) => void;
    onRefresh: () => void;
}

/**
 * Render Growth summary bar with progress, next item, and controls
 */
export function renderGrowthSummaryBar(options: GrowthSummaryBarOptions): void {
    const { container, pets, teamId, state, onViewTypeChange, onPinnedItemChange, onRefresh } = options;

    const viewType = state.growthViewType || 'plant';
    const garden = Globals.myGarden.get();
    const now = Date.now();

    // Get items based on view type
    const items = viewType === 'egg' ? garden.eggs.growing : garden.crops.growing;
    const totalItemsCount = items.length;

    // Calculate boosts
    const eggBoosts = calculateEggBoosts(pets);
    const plantBoosts = calculatePlantBoosts(pets);
    const eggReduction = calculateBoostStats(eggBoosts).timeReductionPerHour;
    const plantReduction = calculateBoostStats(plantBoosts).timeReductionPerHour;
    const currentReduction = Math.round(viewType === 'egg' ? eggReduction : plantReduction);

    // Calculate average progress
    let avgPercent = totalItemsCount > 0 ? 0 : 100;
    if (totalItemsCount > 0) {
        const speedMultiplier = (60 + currentReduction) / 60;
        avgPercent = Math.round(items.reduce((sum, item) => {
            const { startTime, endTime } = getItemTimes(item, viewType);
            const elapsed = now - startTime;
            const remainingRaw = endTime - now;
            const remainingEffective = remainingRaw / speedMultiplier;
            const totalEffective = elapsed + remainingEffective;
            const percent = totalEffective > 0 ? (elapsed / totalEffective) * 100 : 0;
            return sum + Math.min(100, Math.max(0, percent));
        }, 0) / totalItemsCount);
    }

    // Find active/pinned item
    let activeItem = items.find(item => String(item.tileIndex) === state.pinnedItemId);
    if (!activeItem && totalItemsCount > 0) {
        // Sort by end time, get first
        activeItem = [...items].sort((a, b) => {
            const aEnd = getItemTimes(a, viewType).endTime;
            const bEnd = getItemTimes(b, viewType).endTime;
            return aEnd - bEnd;
        })[0];
    }

    // Build bar wrapper
    const barWrapper = element('div', { className: 'growth-summary-overhaul' });

    // Progress bar
    const progressBar = element('div', {
        className: `team-progress-bar team-progress-bar--${viewType}`
    });
    const progressFill = element('div', {
        className: `team-progress-bar__fill team-progress-bar__fill--${viewType}`
    });
    progressFill.style.width = `${avgPercent}%`;

    const barText = element('div', { className: 'team-progress-bar__overlay' });
    barText.innerHTML = `
        <span class="bar-percent">${avgPercent}%</span>
        <span class="bar-info">${totalItemsCount} total +${formatMinPerHour(currentReduction)}</span>
    `;

    progressBar.appendChild(progressFill);
    progressBar.appendChild(barText);

    // Next/Pinned item display
    const nextItemRow = element('div', { className: 'growth-next-item' });
    if (activeItem) {
        const species = getItemSpecies(activeItem, viewType);
        const category = viewType === 'egg' ? 'pet' : 'plant';
        const { startTime: itemStartTime, endTime: itemEndTime } = getItemTimes(activeItem, viewType);

        // Calculate effective time
        const speedMultiplier = (60 + currentReduction) / 60;
        const effectiveRemainingMs = Math.max(0, Math.round((itemEndTime - now) / speedMultiplier));
        const effectiveEndTime = now + effectiveRemainingMs;

        const date = new Date(effectiveEndTime);
        const isTomorrow = date.getDate() !== new Date().getDate();
        const timeStr = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
        const dateStr = `${isTomorrow ? 'Tomorrow ' : ''}${timeStr}`;

        // Sprite element
        const spriteEl = element('div', { className: 'growth-next-sprite' });
        try {
            if (MGSprite.isReady() && MGSprite.has(category, species)) {
                const canvas = MGSprite.toCanvas(category, species, { scale: 0.3 });
                canvas.style.height = '20px';
                canvas.style.width = 'auto';
                canvas.style.imageRendering = 'pixelated';
                spriteEl.appendChild(canvas);
            } else {
                spriteEl.textContent = viewType === 'egg' ? '🥚' : '🌱';
            }
        } catch {
            spriteEl.textContent = viewType === 'egg' ? '🥚' : '🌱';
        }

        nextItemRow.innerHTML = `
            <div class="growth-next-details">
                <span class="growth-next-time">${formatTime(effectiveRemainingMs)}</span>
                <span class="growth-next-date">| ${dateStr}</span>
            </div>
        `;
        nextItemRow.prepend(spriteEl);
    } else {
        nextItemRow.innerHTML = `<span class="empty-text">No items growing</span>`;
    }

    // Controls (Toggle + Dropdown)
    const controls = element('div', { className: 'growth-overhaul-controls' });

    // Toggle button sprite
    const toggleId = viewType === 'egg' ? 'UncommonEgg' : 'Carrot';
    const toggleCategory = viewType === 'egg' ? 'pet' : 'plant';
    let toggleSprite: HTMLCanvasElement | null = null;

    try {
        if (MGSprite.isReady() && MGSprite.has(toggleCategory, toggleId)) {
            toggleSprite = MGSprite.toCanvas(toggleCategory, toggleId, { scale: 0.35 });
        }
    } catch {
        // Use null sprite, GeminiIconButton handles fallback
    }

    // Toggle button
    const toggleBtn = GeminiIconButton({
        variant: viewType === 'egg' ? 'egg' : 'plant',
        sprite: toggleSprite,
        playSound: true,
        tooltip: `Switch to ${viewType === 'egg' ? 'plants' : 'eggs'}`,
        onClick: (e) => {
            e.stopPropagation();
            const newViewType = viewType === 'egg' ? 'plant' : 'egg';
            onViewTypeChange(newViewType);
        }
    });

    // Dropdown button
    const dropdownBtn = element('button', { className: 'growth-dropdown-overhaul', textContent: '▼' });
    dropdownBtn.onclick = (e) => {
        e.stopPropagation();
        showGrowthDropdown({
            anchor: dropdownBtn,
            items,
            viewType,
            teamId,
            onSelect: (itemId) => {
                onPinnedItemChange(itemId);
                onRefresh();
            }
        });
    };

    // Only show toggle if team has BOTH egg and plant growth abilities
    const hasBothAbilities = eggReduction > 0 && plantReduction > 0;
    if (hasBothAbilities) {
        controls.appendChild(toggleBtn);
    }
    controls.appendChild(dropdownBtn);

    // Assemble
    barWrapper.appendChild(progressBar);
    barWrapper.appendChild(nextItemRow);
    barWrapper.appendChild(controls);

    // Replace or prepend
    const existing = container.querySelector('.growth-summary-overhaul');
    if (existing) {
        existing.replaceWith(barWrapper);
    } else {
        container.prepend(barWrapper);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress Bar Mode Detection
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Determine which progress bar mode to use based on team purpose
 */
export function determineProgressBarMode(
    pets: UnifiedPet[],
    primaryPurpose?: string
): 'xp' | 'growth' {
    const isGrowthTeam =
        primaryPurpose === 'time-reduction' ||
        hasEggBoosts(pets) ||
        hasPlantBoosts(pets);

    return isGrowthTeam ? 'growth' : 'xp';
}
