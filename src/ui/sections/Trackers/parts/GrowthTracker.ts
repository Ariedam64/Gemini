/**
 * Growth Tracker - Displays growth timer statistics for a specific pet team
 *
 * REFACTORED FROM: src/ui/sections/Pets/parts/featurePanels/growthPanel.ts
 * CHANGES: Converted from FeaturePanelDefinition to class-based tracker
 *          Focuses on team-level stats rather than per-pet display
 *
 * Per .claude/rules/ui/sections.md:
 * - Section parts handle focused sub-features
 * - Must have build() and destroy() methods
 * - Safe to call multiple times
 *
 * @module GrowthTracker
 */

import type { PetTeam } from '../../../../features/petTeam/types';
import type { UnifiedPet } from '../../../../globals/core/types';
import { Globals } from '../../../../globals';
import { MGSprite } from '../../../../modules/sprite';
import { MGPetTeam } from '../../../../features/petTeam';
import {
    hasEggBoosts,
    hasPlantBoosts,
    calculateEggBoosts,
    calculatePlantBoosts,
    calculateBoostStats,
} from '../../../../features/growthTimers/logic/boostCalculator';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface GrowthTrackerOptions {
    teamId: string;
}

export interface TeamGrowthData {
    teamId: string;
    teamName: string;
    pets: TeamPetGrowthData[];
    eggStats: GrowthStats | null;
    plantStats: GrowthStats | null;
}

export interface TeamPetGrowthData {
    id: string;
    name: string;
    species: string;
    currentStrength: number;
    maxStrength: number;
    isMaxStrength: boolean;
    mutations: string[];
    growthBoosts: Array<{
        type: 'egg' | 'plant';
        multiplier: number;
    }>;
}

export interface GrowthStats {
    type: 'egg' | 'plant';
    teamMultiplier: number;
    timeReductionPerHour: number;
    growingCount: number;
    nextReadyMs: number;
    nextReadyName: string | null;
    nextReadyId: string | null;
    avgProgressPercent: number;
}


// ─────────────────────────────────────────────────────────────────────────────
// Growth Tracker
// ─────────────────────────────────────────────────────────────────────────────

export class GrowthTracker {
    public root: HTMLElement;

    private readonly options: GrowthTrackerOptions;
    private headerElement: HTMLElement | null = null;
    private statsContainer: HTMLElement | null = null;

    // PERFORMANCE: Cache previous data to avoid unnecessary DOM rebuilds
    private previousPetsData: string | null = null;

    constructor(options: GrowthTrackerOptions) {
        this.options = options;
        this.root = document.createElement('div');
        this.root.className = 'growth-panel';
    }

    /**
     * Build the Growth panel DOM structure
     */
    build(): HTMLElement {
        // Note: CSS is injected at TrackersSection level via injectStyleOnce
        // This ensures styles work within the Shadow DOM

        // Header with team growth summary
        this.headerElement = document.createElement('div');
        this.headerElement.className = 'growth-panel__header';
        this.root.appendChild(this.headerElement);

        // Stats container - two columns for eggs and plants
        this.statsContainer = document.createElement('div');
        this.statsContainer.className = 'growth-panel__stats';
        this.root.appendChild(this.statsContainer);

        return this.root;
    }

    /**
     * Update panel with new growth data
     */
    update(data: TeamGrowthData): void {
        this.updateHeader(data);
        this.updateStats(data);
    }

    /**
     * Refresh tracker (alias for update with recalculated data)
     * Used by tracker registry for event-driven updates
     */
    refresh(): void {
        // Refresh will be called from tracker definition with fresh data
        // This is a no-op here; actual refresh logic in growthTracker.ts
    }

    /**
     * Update header with growth summary
     */
    private updateHeader(data: TeamGrowthData): void {
        if (!this.headerElement) return;

        // Redundant header hidden - TrackerContainer handles the main Title
        this.headerElement.style.display = 'none';

        const totalGrowing = (data.eggStats?.growingCount || 0) + (data.plantStats?.growingCount || 0);
        // Logic remains for potential future use but display: none prevents double header
    }

    /**
     * Update stats display with egg and plant columns
     * PERFORMANCE: Skip rebuild if pet data hasn't changed
     */
    private updateStats(data: TeamGrowthData): void {
        const statsContainer = this.statsContainer;
        if (!statsContainer) return;

        // PERFORMANCE: Create lightweight data signature to detect changes
        // Only rebuild DOM if the data actually changed
        const pets = data.pets;
        const currentDataSignature = pets.map(p =>
            `${p.id}:${p.currentStrength}:${p.isMaxStrength}:${p.growthBoosts.map(b => `${b.type}:${b.multiplier}`).join(',')}`
        ).join('|');

        if (this.previousPetsData === currentDataSignature) {
            // Data unchanged, skip expensive DOM rebuild
            return;
        }

        this.previousPetsData = currentDataSignature;

        // Clear existing
        statsContainer.innerHTML = '';

        // Check for "Combined Team" (3 identical pets)
        const isCombined = pets.length === 3 && pets.every(p =>
            p.species === pets[0].species &&
            p.growthBoosts.length === pets[0].growthBoosts.length &&
            JSON.stringify(p.growthBoosts) === JSON.stringify(pets[0].growthBoosts)
        );

        if (isCombined) {
            // Render a single triad card
            const combinedCard = this.buildCombinedPetCard(pets, data);
            statsContainer.appendChild(combinedCard);
        } else {
            // Render each pet as a card with sprite
            for (const pet of pets) {
                const petCard = this.buildPetCard(pet, data);
                statsContainer.appendChild(petCard);
            }
        }
    }

    /**
     * Build combined card with triad sprites for identical pets
     */
    /**
     * Build individual pet card with sprite and stats
     */
    private buildPetCard(pet: TeamPetGrowthData, data: TeamGrowthData): HTMLElement {
        const card = document.createElement('div');
        const isMax = pet.isMaxStrength;
        card.className = `tracker-card xp-pet-card ${isMax ? 'tracker-card--complete' : ''}`;

        // Header
        const header = document.createElement('div');
        header.className = 'tracker-card__header';

        const badgeList = pet.growthBoosts.map(b =>
            `<span class="xp-badge xp-badge--boost">${b.type.toUpperCase()} BOOST</span>`
        ).join('');

        header.innerHTML = `
            <span class="tracker-card__header-label">${pet.name || pet.species}</span>
            <div class="xp-pet-card__badges">
                ${isMax ? '<span class="xp-badge xp-badge--max">MAX STR</span>' : ''}
                ${badgeList}
            </div>
        `;
        card.appendChild(header);

        // Body
        const body = document.createElement('div');
        body.className = 'tracker-card__body';

        // Sprite left
        const spriteSection = document.createElement('div');
        spriteSection.className = 'tracker-card__sprite';

        const spriteWrapper = document.createElement('div');
        spriteWrapper.className = 'tracker-card__sprite-wrapper';

        try {
            if (MGSprite.has('pet', pet.species)) {
                const spriteCanvas = MGSprite.toCanvas('pet', pet.species, {
                    mutations: pet.mutations as any,
                    scale: 1.5,
                    boundsMode: 'padded',
                });
                spriteCanvas.style.width = '100%';
                spriteCanvas.style.height = '100%';
                spriteCanvas.style.objectFit = 'contain';
                spriteCanvas.style.imageRendering = 'crisp-edges';
                spriteWrapper.appendChild(spriteCanvas);
            } else {
                spriteWrapper.innerHTML = '<div class="tracker-card__sprite-fallback">🐾</div>';
            }
        } catch (error) {
            spriteWrapper.innerHTML = '<div class="tracker-card__sprite-fallback">🐾</div>';
        }

        spriteSection.appendChild(spriteWrapper);

        // STR Info Badge (Standardized)
        const strBadge = document.createElement('div');
        strBadge.className = 'tracker-str-badge';
        strBadge.textContent = isMax ? `STR ${pet.maxStrength}` : `STR ${pet.currentStrength}/${pet.maxStrength}`;
        body.appendChild(spriteSection);
        body.appendChild(strBadge);

        // Stats right
        const statsSection = document.createElement('div');
        statsSection.className = 'tracker-card__stats';

        const statsTable = document.createElement('table');
        statsTable.className = 'tracker-stats-table tracker-stats-table--aligned';

        if (pet.growthBoosts.length > 0) {
            // Row 1: BOOST (General Mult)
            const mainBoost = pet.growthBoosts[0];
            const boostRow = document.createElement('tr');
            boostRow.className = 'tracker-stats-table__row';
            boostRow.innerHTML = `
                <td>RATE</td>
                <td class="tracker-stats-table__value">${mainBoost.multiplier.toFixed(3)}x</td>
                <td colspan="4"><span class="tracker-insight">Combined Team Reduction</span></td>
            `;
            statsTable.appendChild(boostRow);

            // Row 2+: NEXT EGG / NEXT PLANT
            for (const boost of pet.growthBoosts) {
                const stats = boost.type === 'egg' ? data.eggStats : data.plantStats;
                if (stats) {
                    statsTable.appendChild(this.renderGrowthRow(boost.type === 'egg' ? 'NEXT EGG' : 'NEXT PLANT', stats));
                }
            }

            // MAX STR Row for boosters
            if (!isMax) {
                const maxRow = document.createElement('tr');
                maxRow.className = 'tracker-stats-table__row';
                maxRow.innerHTML = `
                    <td>MAX STR</td>
                    <td colspan="5"><span class="tracker-insight">+${(pet.currentStrength * 0.1).toFixed(1)}% reduction</span></td>
                `;
                statsTable.appendChild(maxRow);
            }
        } else {
            statsTable.innerHTML = `
                <tr class="tracker-stats-table__row">
                    <td>RATE</td>
                    <td colspan="5" style="color: var(--muted); font-size: 11px;">No Growth Ability</td>
                </tr>
                <tr class="tracker-stats-table__row">
                    <td>REDUCTION</td>
                    <td colspan="5" style="color: var(--muted); font-size: 11px;">Not a booster pet</td>
                </tr>
            `;
        }

        statsSection.appendChild(statsTable);
        body.appendChild(statsSection);
        card.appendChild(body);

        return card;
    }

    private buildCombinedPetCard(pets: TeamPetGrowthData[], data: TeamGrowthData): HTMLElement {
        const pet = pets[0];
        const card = document.createElement('div');
        const isMax = pets.every(p => p.isMaxStrength);
        card.className = `tracker-card xp-pet-card ${isMax ? 'tracker-card--complete' : ''}`;

        // Header
        const header = document.createElement('div');
        header.className = 'tracker-card__header';
        const badgeList = pet.growthBoosts.map(b =>
            `<span class="xp-badge xp-badge--boost">${b.type.toUpperCase()} BOOST</span>`
        ).join('');

        header.innerHTML = `
            <span class="tracker-card__header-label">${pet.species} Team</span>
            <div class="xp-pet-card__badges">
                ${isMax ? '<span class="xp-badge xp-badge--max">MAX STR</span>' : ''}
                ${badgeList}
            </div>
        `;
        card.appendChild(header);

        // Body
        const body = document.createElement('div');
        body.className = 'tracker-card__body';

        // Triad sprites left
        const spriteSection = document.createElement('div');
        spriteSection.className = 'tracker-card__sprite';

        const triadContainer = document.createElement('div');
        triadContainer.className = 'team-bunched-sprites';

        for (let i = 0; i < 3; i++) {
            const p = pets[i];
            const spriteWrapper = document.createElement('div');
            spriteWrapper.className = `bunched-sprite bunched-sprite--${i + 1}`;

            if (MGSprite.has('pet', p.species)) {
                const canvas = MGSprite.toCanvas('pet', p.species, {
                    mutations: p.mutations as any,
                    scale: 1.5,
                    boundsMode: 'padded',
                });
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.objectFit = 'contain';
                spriteWrapper.appendChild(canvas);
            }
            triadContainer.appendChild(spriteWrapper);
        }
        spriteSection.appendChild(triadContainer);

        // STR Info Badge
        const strBadge = document.createElement('div');
        strBadge.className = 'tracker-str-badge';
        const avgStr = Math.round(pets.reduce((sum, p) => sum + p.currentStrength, 0) / pets.length);
        strBadge.textContent = isMax ? `STR ${pet.maxStrength}` : `AVG STR ${avgStr}/${pet.maxStrength}`;
        body.appendChild(spriteSection);
        body.appendChild(strBadge);

        // Stats right
        const statsSection = document.createElement('div');
        statsSection.className = 'tracker-card__stats';

        const statsTable = document.createElement('table');
        statsTable.className = 'tracker-stats-table tracker-stats-table--aligned';

        if (pet.growthBoosts.length > 0) {
            const mainBoost = pet.growthBoosts[0];
            const boostRow = document.createElement('tr');
            boostRow.className = 'tracker-stats-table__row';
            boostRow.innerHTML = `
                <td>RATE</td>
                <td class="tracker-stats-table__value">${mainBoost.multiplier.toFixed(3)}x</td>
                <td colspan="4"><span class="tracker-insight">Combined Team Reduction</span></td>
            `;
            statsTable.appendChild(boostRow);

            for (const boost of pet.growthBoosts) {
                const stats = boost.type === 'egg' ? data.eggStats : data.plantStats;
                if (stats) {
                    statsTable.appendChild(this.renderGrowthRow(boost.type === 'egg' ? 'NEXT EGG' : 'NEXT PLANT', stats));
                }
            }

            if (!isMax) {
                const maxRow = document.createElement('tr');
                maxRow.className = 'tracker-stats-table__row';
                maxRow.innerHTML = `
                    <td>MAX STR</td>
                    <td colspan="5"><span class="tracker-insight">+${(pet.currentStrength * 0.1).toFixed(1)}% reduction</span></td>
                `;
                statsTable.appendChild(maxRow);
            }
        }

        statsSection.appendChild(statsTable);
        body.appendChild(statsSection);
        card.appendChild(body);

        return card;
    }

    private renderGrowthRow(label: string, stats: GrowthStats): HTMLElement {
        const row = document.createElement('tr');
        row.className = 'tracker-stats-table__row';

        const percent = stats.avgProgressPercent;
        const colorClass = percent < 33 ? 'low' : percent < 67 ? 'medium' : 'high';

        // Blank display logic: if count is 0, show blank or placeholder
        if (stats.growingCount === 0) {
            row.innerHTML = `
                <td>${label}</td>
                <td colspan="2" style="color: var(--muted); font-size: 11px; font-style: italic;">Nothing growing</td>
                <td colspan="3"></td>
            `;
            return row;
        }

        const isReady = stats.nextReadyMs <= 0;
        const timeDisplay = isReady ? 'Ready!' : this.formatTime(stats.nextReadyMs);

        // Create sprite icon
        const iconCell = document.createElement('td');
        iconCell.style.textAlign = 'center';
        iconCell.style.width = '32px';

        if (stats.nextReadyId) {
            try {
                const category = stats.type === 'egg' ? 'item' : 'item'; // Both are usually items in MGSprite for crops/eggs
                // For crops it might be 'item' category or 'crop'. 
                // In this codebase, 'Cactus' is an item? Let's check.
                // Actually MGSprite.toCanvas('item', 'WoodEgg') or 'Cactus'
                const canvas = MGSprite.toCanvas('item', stats.nextReadyId, { scale: 0.8 });
                canvas.style.width = '24px';
                canvas.style.height = '24px';
                canvas.style.objectFit = 'contain';
                iconCell.appendChild(canvas);
            } catch (e) {
                iconCell.textContent = stats.type === 'egg' ? '🥚' : '🌱';
            }
        } else {
            iconCell.textContent = stats.type === 'egg' ? '🥚' : '🌱';
        }

        // Column structure: Label | Time | Icon | Target/Name | Bar | Percent
        row.innerHTML = `
            <td>${label}</td>
            <td>${timeDisplay}</td>
        `;
        row.appendChild(iconCell);

        const nameCell = document.createElement('td');
        nameCell.style.fontSize = '10px';
        nameCell.style.opacity = '0.8';
        nameCell.style.maxWidth = '60px';
        nameCell.style.overflow = 'hidden';
        nameCell.style.textOverflow = 'ellipsis';
        nameCell.style.whiteSpace = 'nowrap';
        nameCell.textContent = stats.nextReadyName || '';
        row.appendChild(nameCell);

        const barCell = document.createElement('td');
        barCell.innerHTML = `
            <div class="tracker-progress-row__bar">
                <div class="tracker-progress-row__fill tracker-progress-row__fill--${colorClass}" style="width: ${percent}%"></div>
            </div>
        `;
        row.appendChild(barCell);

        const percentCell = document.createElement('td');
        percentCell.textContent = `${percent}%`;
        row.appendChild(percentCell);

        return row;
    }

    /**
     * Build progress row with time and progress bar
     */
    private buildProgressWithStats(stats: GrowthStats): string {
        const percent = stats.avgProgressPercent;
        const colorClass = percent < 33 ? 'low' : percent < 67 ? 'medium' : 'high';
        const isReady = stats.nextReadyMs <= 0;

        return `
            <div class="tracker-progress-row">
                <span class="tracker-progress-row__time">${isReady ? 'Ready!' : this.formatTime(stats.nextReadyMs)}</span>
                <div class="tracker-progress-row__bar-container">
                    <div class="tracker-progress-row__bar">
                        <div class="tracker-progress-row__fill tracker-progress-row__fill--${colorClass}" style="width: ${percent}%"></div>
                    </div>
                    <span class="tracker-progress-row__percent">${percent}%</span>
                </div>
            </div>
        `;
    }

    /**
     * Format milliseconds to compact time (e.g., "2h 14m", "45m", "3m 20s")
     */
    private formatTime(ms: number): string {
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
    private formatMinutesPerHour(minutesPerHour: number): string {
        const hours = Math.floor(minutesPerHour / 60);
        const minutes = Math.round(minutesPerHour % 60);

        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}m/h`;
        } else if (hours > 0) {
            return `${hours}h/h`;
        } else {
            return `${minutes}m/h`;
        }
    }

    /**
     * Cleanup
     */
    destroy(): void {
        if (this.root.parentNode) {
            this.root.parentNode.removeChild(this.root);
        }

        this.headerElement = null;
        this.statsContainer = null;
    }
}
