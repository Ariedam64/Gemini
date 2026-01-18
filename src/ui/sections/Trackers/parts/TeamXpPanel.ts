/**
 * Team XP Panel - Displays XP tracking data for a specific pet team
 *
 * Per .claude/rules/ui/ui.sections.md:
 * - Section parts handle focused sub-features
 * - Must have build() and destroy() methods
 * - Safe to call multiple times
 *
 * @module TeamXpPanel
 */

import { MGSprite } from '../../../../modules/sprite';
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

export interface TeamXpPanelOptions {
    teamId: string;
    onCollapse?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Team XP Panel
// ─────────────────────────────────────────────────────────────────────────────

export class TeamXpPanel {
    public root: HTMLElement;

    private readonly options: TeamXpPanelOptions;
    private headerElement: HTMLElement | null = null;
    private petsContainer: HTMLElement | null = null;
    private footerElement: HTMLElement | null = null;

    constructor(options: TeamXpPanelOptions) {
        this.options = options;
        this.root = document.createElement('div');
        this.root.className = 'xp-panel';
    }

    /**
     * Build the XP panel DOM structure
     */
    build(): HTMLElement {
        // Note: CSS is injected at PetsSection level via injectStyleOnce
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
     * Update header with XP rate info
     */
    private updateHeader(summary: TeamXpSummary): void {
        if (!this.headerElement) return;

        const hasBoost = summary.bonusXpPerHour > 0;

        // Task 1: Renamed to "XP Tracker" (shorter)
        // Task 7: Show only final total XP/hr (no breakdown)
        this.headerElement.innerHTML = `
            <div class="xp-panel__header-title">
                <span class="xp-panel__header-icon">📊</span>
                <span>XP Tracker</span>
            </div>
            <div class="xp-panel__header-rate">
                <span class="xp-panel__rate-total">${summary.totalXpPerHour.toLocaleString()} XP/hr</span>
            </div>
        `;
    }

    /**
     * Update pets display with sprites and stat cards
     */
    private updatePets(pets: TeamPetXpData[]): void {
        if (!this.petsContainer) return;

        // Clear existing
        this.petsContainer.innerHTML = '';

        // Render each pet as a card with sprite
        for (const pet of pets) {
            const petCard = this.buildPetCard(pet);
            this.petsContainer.appendChild(petCard);
        }
    }

    /**
     * Build individual pet card with sprite and stats
     */
    private buildPetCard(pet: TeamPetXpData): HTMLElement {
        const card = document.createElement('div');
        card.className = 'xp-pet-card';

        if (pet.isStarving) card.classList.add('xp-pet-card--starving');
        if (pet.isMaxStrength) card.classList.add('xp-pet-card--max');

        // Left side: Sprite container
        const spriteSection = document.createElement('div');
        spriteSection.className = 'xp-pet-card__sprite';

        // Create sprite element
        const spriteWrapper = document.createElement('div');
        spriteWrapper.className = 'xp-pet-card__sprite-wrapper';

        // Render pet sprite (using Journal pattern)
        try {
            const mutations = pet.mutations as import('../../../../modules/sprite').MutationName[];

            // Check if sprite exists before rendering
            if (MGSprite.has('pet', pet.species)) {
                const spriteCanvas = MGSprite.toCanvas('pet', pet.species, {
                    mutations,
                    scale: 1,
                    boundsMode: 'padded'
                });

                // Apply explicit canvas styles (Journal pattern)
                spriteCanvas.style.width = '64px';
                spriteCanvas.style.height = '64px';
                spriteCanvas.style.objectFit = 'contain';
                spriteCanvas.style.display = 'block';

                spriteWrapper.appendChild(spriteCanvas);
            } else {
                // Sprite not found
                spriteWrapper.innerHTML = `<div class="xp-pet-card__sprite-fallback">🐾</div>`;
            }
        } catch (error) {
            // Fallback if sprite fails
            console.warn(`[TeamXpPanel] Failed to render sprite for ${pet.species}:`, error);
            spriteWrapper.innerHTML = `<div class="xp-pet-card__sprite-fallback">🐾</div>`;
        }

        spriteSection.appendChild(spriteWrapper);

        // Status badges under sprite
        const badgesRow = document.createElement('div');
        badgesRow.className = 'xp-pet-card__badges';

        if (pet.isMaxStrength) {
            badgesRow.innerHTML += `<span class="xp-badge xp-badge--max">MAX</span>`;
        }
        if (pet.isStarving) {
            badgesRow.innerHTML += `<span class="xp-badge xp-badge--starving">STARVING</span>`;
        }
        if (pet.xpBoostStats) {
            const icon = pet.xpBoostStats.tier === 'Snowy' ? '❄' : '⚡';
            badgesRow.innerHTML += `<span class="xp-badge xp-badge--boost">${icon}${pet.xpBoostStats.tier}</span>`;
        }

        spriteSection.appendChild(badgesRow);

        // Task 10: Add STR display under sprite/badges
        const strDisplay = document.createElement('div');
        strDisplay.className = 'xp-pet-card__str-display';
        strDisplay.innerHTML = `
            <span class="xp-str__label">STR</span>
            <span class="xp-str__current">${pet.currentStrength}</span>
            <span class="xp-str__separator">/</span>
            <span class="xp-str__max">${pet.maxStrength}</span>
        `;
        spriteSection.appendChild(strDisplay);

        card.appendChild(spriteSection);

        // Right side: Stats table
        const statsSection = document.createElement('div');
        statsSection.className = 'xp-pet-card__stats';

        // Pet name header
        const nameHeader = document.createElement('div');
        nameHeader.className = 'xp-pet-card__name';
        nameHeader.textContent = pet.name || pet.species;
        statsSection.appendChild(nameHeader);

        // Stats table
        const statsTable = document.createElement('table');
        statsTable.className = 'xp-stats-table';

        if (pet.isStarving) {
            // Starving state - simplified display (Task 12: No Strength row)
            statsTable.innerHTML = `
                <tr class="xp-stats-table__row xp-stats-table__row--warning">
                    <td class="xp-stats-table__label">Status</td>
                    <td class="xp-stats-table__value xp-stats-table__value--danger">0 XP/hr - FEED NOW!</td>
                </tr>
            `;
        } else {
            // Normal state - Task 12/13: Stats start with Next STR (no Strength row)
            statsTable.innerHTML = `
                ${!pet.isMaxStrength ? `
                <tr class="xp-stats-table__row">
                    <td class="xp-stats-table__label">Next STR</td>
                    <td class="xp-stats-table__value">
                        ${this.buildProgressWithStats(pet, 'next')}
                    </td>
                </tr>
                <tr class="xp-stats-table__row">
                    <td class="xp-stats-table__label">Max STR</td>
                    <td class="xp-stats-table__value">
                        ${this.buildProgressWithStats(pet, 'max')}
                    </td>
                </tr>
                ` : ''}
                ${pet.xpBoostStats ? `
                <tr class="xp-stats-table__row xp-stats-table__row--boost">
                    <td class="xp-stats-table__label">XP Boost</td>
                    <td class="xp-stats-table__value">
                        <span class="xp-boost-stat">+${pet.xpBoostStats.expectedXpPerHour.toLocaleString()} XP/hr</span>
                        ${!pet.xpBoostStats.isActive ? '<span class="xp-inactive">(inactive)</span>' : ''}
                    </td>
                </tr>
                ` : ''}
                ${pet.supportingFeeds !== null ? `
                <tr class="xp-stats-table__row xp-stats-table__row--support">
                    <td class="xp-stats-table__label">Supporting</td>
                    <td class="xp-stats-table__value">
                        <span class="xp-support">${pet.supportingFeeds} feeds to carry team</span>
                    </td>
                </tr>
                ` : ''}
            `;
        }

        statsSection.appendChild(statsTable);
        card.appendChild(statsSection);

        return card;
    }

    /**
     * Build progress row with time, feeds, and progress bar
     * Format: 12.8h (🍖 x13) [████████░░ 69%]
     */
    private buildProgressWithStats(pet: TeamPetXpData, type: 'next' | 'max'): string {
        const hours = type === 'next' ? pet.hoursToNextStrength : pet.hoursToMaxStrength;
        const feeds = type === 'next' ? pet.feedsToNextStrength : pet.feedsToMaxStrength;

        // Calculate progress percentage
        const currentProgress = pet.currentStrength - Math.floor(pet.currentStrength);
        const nextProgress = type === 'next'
            ? Math.floor(currentProgress * 100)
            : Math.floor((pet.currentStrength / pet.maxStrength) * 100);

        const percent = type === 'next'
            ? Math.min(99, Math.max(1, nextProgress)) // Next STR: 1-99%
            : Math.min(100, Math.max(0, nextProgress)); // Max STR: 0-100%

        const colorClass = percent < 33 ? 'low' : percent < 67 ? 'medium' : 'high';

        return `
            <div class="xp-progress-row">
                <span class="xp-progress-row__time">${this.formatHours(hours)}</span>
                <span class="xp-progress-row__feeds">(🍖 x${feeds})</span>
                <div class="xp-progress-row__bar-container">
                    <div class="xp-progress-row__bar">
                        <div class="xp-progress-row__fill xp-progress-row__fill--${colorClass}" style="width: ${percent}%"></div>
                    </div>
                    <span class="xp-progress-row__percent">${percent}%</span>
                </div>
            </div>
        `;
    }

    /**
     * Update footer with boost summary
     */
    private updateFooter(summary: TeamXpSummary, pets: TeamPetXpData[]): void {
        if (!this.footerElement) return;

        if (summary.activeBoosterCount === 0) {
            this.footerElement.innerHTML = '';
            this.footerElement.classList.add('xp-panel__footer--hidden');
            return;
        }

        this.footerElement.classList.remove('xp-panel__footer--hidden');

        const activeBoosters = pets.filter(p => p.xpBoostStats?.isActive);
        const boosterNames = activeBoosters.map(p => p.name || p.species).join(', ');

        this.footerElement.innerHTML = `
            <div class="xp-panel__footer-icon">⚡</div>
            <div class="xp-panel__footer-content">
                <div class="xp-panel__footer-title">
                    ${summary.activeBoosterCount} XP Booster${summary.activeBoosterCount !== 1 ? 's' : ''} Active
                </div>
                <div class="xp-panel__footer-detail">
                    +${summary.bonusXpPerHour.toLocaleString()} bonus XP/hr
                    <span class="xp-panel__footer-names">(${boosterNames})</span>
                </div>
            </div>
        `;
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
