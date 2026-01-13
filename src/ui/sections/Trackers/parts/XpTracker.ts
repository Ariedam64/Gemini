/**
 * XP Tracker - Displays XP tracking data for a specific pet team
 *
 * MOVED FROM: src/ui/sections/Pets/parts/TeamXpPanel.ts
 * CHANGES: Renamed TeamXpPanel → XpTracker, updated imports
 *
 * Per .claude/rules/ui/sections.md:
 * - Section parts handle focused sub-features
 * - Must have build() and destroy() methods
 * - Safe to call multiple times
 *
 * @module XpTracker
 */

import { MGSprite } from '../../../../modules/sprite';
import { MGData } from '../../../../modules/data';
import type { XpBoostStats } from '../../../../features/xpTracker';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamXpData {
    teamId: string;
    teamName: string;
    pets: TeamPetXpData[];
    teamSummary: TeamXpSummary;
}

export interface TeamPetXpData {
    id: string;
    name: string;
    species: string;
    currentStrength: number;
    maxStrength: number;
    isMaxStrength: boolean;
    xpPerHour: number; // base + team boosts
    hoursToNextStrength: number | null;
    hoursToMaxStrength: number;
    feedsToNextStrength: number | null;
    feedsToMaxStrength: number;
    isStarving: boolean;
    hunger: number;
    xpBoostStats: XpBoostStats | null;
    supportingFeeds: number | null; // for max STR boosters
    mutations: string[];
    targetScale: number;
}

export interface TeamXpSummary {
    baseXpPerHour: number; // 3600
    bonusXpPerHour: number; // from XP boost pets
    totalXpPerHour: number; // base + bonus
    activeBoosterCount: number;
    totalProcsPerHour: number;
}

export interface XpTrackerOptions {
    teamId: string;
    onCollapse?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// XP Tracker
// ─────────────────────────────────────────────────────────────────────────────

export class XpTracker {
    public root: HTMLElement;

    private readonly options: XpTrackerOptions;
    private headerElement: HTMLElement | null = null;
    private petsContainer: HTMLElement | null = null;
    private footerElement: HTMLElement | null = null;

    // PERFORMANCE: Cache previous data to avoid unnecessary DOM rebuilds
    private previousPetsData: string | null = null;

    constructor(options: XpTrackerOptions) {
        this.options = options;
        this.root = document.createElement('div');
        this.root.className = 'xp-panel';
    }

    /**
     * Build the XP panel DOM structure
     */
    build(): HTMLElement {
        // Note: CSS is injected at TrackersSection level via injectStyleOnce
        // This ensures styles work within the Shadow DOM

        // Header with team XP rate
        this.headerElement = document.createElement('div');
        this.headerElement.className = 'xp-panel__header';
        this.root.appendChild(this.headerElement);

        // Pets container - horizontal scrollable row
        this.petsContainer = document.createElement('div');
        this.petsContainer.className = 'xp-panel__pets';
        this.root.appendChild(this.petsContainer);

        // Footer with boost summary
        this.footerElement = document.createElement('div');
        this.footerElement.className = 'xp-panel__footer';
        this.root.appendChild(this.footerElement);

        return this.root;
    }

    /**
     * Update panel with new XP data
     */
    update(data: TeamXpData): void {
        this.updateHeader(data.teamSummary);
        this.updatePets(data.pets);
        this.updateFooter(data.teamSummary, data.pets);
    }

    /**
     * Refresh tracker (alias for update with recalculated data)
     * Used by tracker registry for event-driven updates
     */
    refresh(): void {
        // Refresh will be called from tracker definition with fresh data
        // This is a no-op here; actual refresh logic in xpTracker.ts
    }

    /**
     * Update header with XP rate info
     */
    private updateHeader(summary: TeamXpSummary): void {
        if (!this.headerElement) return;

        // Redundant header hidden - TrackerContainer handles the main Title
        this.headerElement.style.display = 'none';

        const hasBoost = summary.bonusXpPerHour > 0;
        // Logic remains but display: none prevents double header
    }

    /**
     * Update pets display with sprites and stat cards
     * PERFORMANCE: Skip rebuild if pet data hasn't changed
     */
    private updatePets(pets: TeamPetXpData[]): void {
        const petsContainer = this.petsContainer;
        if (!petsContainer) return;

        // PERFORMANCE: Create lightweight data signature to detect changes
        // Only rebuild DOM if the data actually changed
        const currentDataSignature = pets.map(p =>
            `${p.id}:${p.currentStrength}:${p.isMaxStrength}:${p.isStarving}:${p.xpBoostStats?.isActive}`
        ).join('|');

        if (this.previousPetsData === currentDataSignature) {
            // Data unchanged, skip expensive DOM rebuild
            return;
        }

        this.previousPetsData = currentDataSignature;

        // Clear existing
        petsContainer.innerHTML = '';

        // Check for "Combined Team" (3 identical pets)
        // Same species and same boost status
        const isCombined = pets.length === 3 && pets.every(p =>
            p.species === pets[0].species &&
            JSON.stringify(p.xpBoostStats?.isActive) === JSON.stringify(pets[0].xpBoostStats?.isActive)
        );

        if (isCombined) {
            // Render a single triad card
            const combinedCard = this.buildCombinedPetCard(pets);
            petsContainer.appendChild(combinedCard);
        } else {
            // Render each pet as a card with sprite
            for (const pet of pets) {
                const petCard = this.buildPetCard(pet);
                petsContainer.appendChild(petCard);
            }
        }
    }

    /**
     * Build combined card with triad sprites for identical pets
     */
    private buildCombinedPetCard(pets: TeamPetXpData[]): HTMLElement {
        const templatePet = pets[0];
        const card = document.createElement('div');
        const isMax = pets.every(p => p.isMaxStrength);
        card.className = `tracker-card xp-pet-card ${isMax ? 'tracker-card--complete' : ''}`;

        // Header
        const header = document.createElement('div');
        header.className = 'tracker-card__header';
        header.innerHTML = `
            <span class="tracker-card__header-label">${templatePet.species} Team</span>
            <div class="xp-pet-card__badges">
                ${isMax ? '<span class="xp-badge xp-badge--max">MAX STR</span>' : ''}
                ${templatePet.xpBoostStats?.isActive ? '<span class="xp-badge xp-badge--boost">XP BOOST</span>' : ''}
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
            const pet = pets[i];
            const spriteWrapper = document.createElement('div');
            spriteWrapper.className = `bunched-sprite bunched-sprite--${i + 1}`;

            if (MGSprite.has('pet', pet.species)) {
                const canvas = MGSprite.toCanvas('pet', pet.species, {
                    mutations: pet.mutations as any,
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
        strBadge.textContent = isMax ? `STR ${templatePet.maxStrength}` : `AVG STR ${avgStr}/${templatePet.maxStrength}`;
        body.appendChild(spriteSection);
        body.appendChild(strBadge);

        // Stats right
        const statsSection = document.createElement('div');
        statsSection.className = 'tracker-card__stats';

        const statsTable = document.createElement('table');
        statsTable.className = 'tracker-stats-table tracker-stats-table--aligned';

        // NEXT STR row
        statsTable.appendChild(this.renderProgressRow('NEXT STR', 'next', templatePet));

        // MAX STR row
        if (!isMax) {
            statsTable.appendChild(this.renderProgressRow('MAX STR', 'max', templatePet));
        }

        statsSection.appendChild(statsTable);
        body.appendChild(statsSection);
        card.appendChild(body);

        return card;
    }

    /**
     * Build individual pet card with sprite and stats
     */
    private buildPetCard(pet: TeamPetXpData): HTMLElement {
        const card = document.createElement('div');
        const isMax = pet.isMaxStrength;
        card.className = `tracker-card xp-pet-card ${isMax ? 'tracker-card--complete' : ''} ${pet.isStarving ? 'tracker-card--warning' : ''}`;

        // Header
        const header = document.createElement('div');
        header.className = 'tracker-card__header';
        header.innerHTML = `
            <span class="tracker-card__header-label">${pet.name || pet.species}</span>
            <div class="xp-pet-card__badges">
                ${isMax ? '<span class="xp-badge xp-badge--max">MAX STR</span>' : ''}
                ${pet.isStarving ? '<span class="xp-badge xp-badge--starving">STARVING</span>' : ''}
                ${pet.xpBoostStats ? `<span class="xp-badge xp-badge--boost">${pet.xpBoostStats.tier} BOOST</span>` : ''}
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
            const mutations = pet.mutations as import('../../../../modules/sprite').MutationName[];
            if (MGSprite.has('pet', pet.species)) {
                const spriteCanvas = MGSprite.toCanvas('pet', pet.species, {
                    mutations,
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
        // Image 4 Alignment Mode
        statsTable.className = 'tracker-stats-table tracker-stats-table--aligned';

        if (pet.isStarving) {
            statsTable.innerHTML = `
                <tr class="tracker-stats-table__row">
                    <td colspan="6" style="color: var(--low); font-weight: 800; padding: 12px; text-align: center;">STARVING (0 XP/hr)</td>
                </tr>
            `;
        } else {
            // Row 1: RATE
            const rateRow = document.createElement('tr');
            rateRow.className = 'tracker-stats-table__row';
            rateRow.innerHTML = `
                <td>RATE</td>
                <td colspan="5" class="tracker-stats-table__value">
                    <span class="xp-boost-stat">${pet.xpPerHour.toLocaleString()} XP/hr</span>
                </td>
            `;
            statsTable.appendChild(rateRow);

            // Row 2: NEXT STR
            if (!isMax) {
                statsTable.appendChild(this.renderProgressRow('NEXT STR', 'next', pet));
            }

            // Row 3: MAX STR
            statsTable.appendChild(this.renderProgressRow('MAX STR', 'max', pet));

            // Row 4: INSIGHT (Optional)
            if (pet.supportingFeeds !== null || pet.xpBoostStats) {
                const insightRow = document.createElement('tr');
                insightRow.className = 'tracker-stats-table__row';
                insightRow.innerHTML = `
                    <td>INSIGHT</td>
                    <td colspan="5">
                        <span class="tracker-insight">
                            ${pet.xpBoostStats ? `+${pet.xpBoostStats.expectedXpPerHour.toLocaleString()} Yield` : ''}
                            ${pet.supportingFeeds !== null ? ` • ${pet.supportingFeeds} carrying feeds` : ''}
                        </span>
                    </td>
                `;
                statsTable.appendChild(insightRow);
            }
        }

        statsSection.appendChild(statsTable);
        body.appendChild(statsSection);
        card.appendChild(body);

        return card;
    }

    private renderProgressRow(label: string, type: 'next' | 'max', pet: TeamPetXpData): HTMLElement {
        const row = document.createElement('tr');
        row.className = 'tracker-stats-table__row';

        const hours = type === 'next' ? pet.hoursToNextStrength : pet.hoursToMaxStrength;
        const feeds = type === 'next' ? pet.feedsToNextStrength : pet.feedsToMaxStrength;
        const currentStrength = pet.currentStrength || 0;
        const maxStrength = pet.maxStrength || 1;

        let percent = 0;
        let targetStr = 0;

        if (type === 'next') {
            const fraction = currentStrength - Math.floor(currentStrength);
            percent = Math.floor(fraction * 100);
            percent = Math.min(99, Math.max(1, percent));
            targetStr = Math.floor(currentStrength) + 1;
        } else {
            percent = Math.floor((currentStrength / maxStrength) * 100);
            percent = Math.min(100, Math.max(0, percent));
            targetStr = maxStrength;
        }

        const colorClass = percent < 33 ? 'low' : percent < 67 ? 'medium' : 'high';
        const isDone = type === 'max' ? pet.isMaxStrength : (hours === 0 && (feeds || 0) <= 0);
        const feedsDisplay = isDone ? 'MAXED' : ((feeds || 0) > 0 ? `🍖 x${feeds}` : '< 1 feed');
        const timeDisplay = isDone ? '0h' : this.formatHours(hours || 0);

        row.innerHTML = `
            <td>${label}</td>
            <td>${timeDisplay}</td>
            <td>(${feedsDisplay})</td>
            <td>STR ${targetStr}</td>
            <td>
                <div class="tracker-progress-row__bar">
                    <div class="tracker-progress-row__fill tracker-progress-row__fill--${colorClass}" style="width: ${percent}%"></div>
                </div>
            </td>
            <td>${percent}%</td>
        `;
        return row;
    }

    /**
     * Update footer with boost summary
     */
    private updateFooter(summary: TeamXpSummary, pets: TeamPetXpData[]): void {
        if (!this.footerElement) return;

        // Forced hide to reduce fluff as requested
        this.footerElement.innerHTML = '';
        this.footerElement.classList.add('xp-panel__footer--hidden');
    }

    /**
     * Format hours to readable string
     */
    private formatHours(hours: number | null): string {
        if (hours === null || hours === 0) return '0h';
        if (!isFinite(hours)) return '∞';

        if (hours < 1) {
            const minutes = Math.ceil(hours * 60);
            return `${minutes}m`;
        } else if (hours < 24) {
            return `${hours.toFixed(1)}h`;
        } else {
            const days = Math.floor(hours / 24);
            const remainingHours = Math.floor(hours % 24);
            return `${days}d ${remainingHours}h`;
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
        this.petsContainer = null;
        this.footerElement = null;
    }
}
