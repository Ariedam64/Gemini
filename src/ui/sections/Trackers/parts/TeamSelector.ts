/**
 * Team Selector - Card-based team selection UI
 *
 * Displays pet teams as selectable cards with:
 * - Team name and pet count
 * - Pet sprite thumbnails
 * - Team purpose detection indicator
 * - Selection state (primary/comparison)
 * - Support for up to 2 team selection (comparison mode)
 *
 * Per .claude/rules/ui/sections.md:
 * - Section parts handle focused sub-features
 * - Must have build() and destroy() methods
 * - Safe to call multiple times
 *
 * @module TeamSelector
 */

import { MGPetTeam } from '../../../../features/petTeam';
import type { PetTeam } from '../../../../features/petTeam/types';
import { MGSprite } from '../../../../modules/sprite';
import { Globals } from '../../../../globals';
import { getCachedTeamPurpose } from '../utils/cache';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TeamSelectorOptions {
    onSelectionChange: (selectedTeamIds: string[]) => void;
    initialSelection?: string[];
}

export interface TeamCardData {
    team: PetTeam;
    petCount: number;
    purposeIcon: string;
    purposeLabel: string;
    purposeConfidence: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Purpose to Icon Mapping
// ─────────────────────────────────────────────────────────────────────────────

const PURPOSE_ICONS: Record<string, string> = {
    'xp-farming': '📊',
    'gardening': '🌱',
    'crop-farming': '🌱',
    'time-reduction': '⏱️',
    'hatching': '🥚',
    'mutation-hunting': '🌿',
    'efficiency': '⚖️',
    'balanced': '⚖️',
    'unknown': '🛡️',
};

const PURPOSE_LABELS: Record<string, string> = {
    'xp-farming': 'XP Farming',
    'gardening': 'Gardening',
    'crop-farming': 'Gardening',
    'time-reduction': 'Time Reduction',
    'hatching': 'Hatching',
    'mutation-hunting': 'Mutation Hunting',
    'efficiency': 'Efficiency',
    'balanced': 'Standard Team',
    'unknown': 'Standard Team',
};

// ─────────────────────────────────────────────────────────────────────────────
// Team Selector
// ─────────────────────────────────────────────────────────────────────────────

export class TeamSelector {
    public root: HTMLElement;

    private readonly options: TeamSelectorOptions;
    private selectedTeamIds: string[] = [];
    private cardsContainer: HTMLElement | null = null;
    private teamCards: Map<string, HTMLElement> = new Map();

    constructor(options: TeamSelectorOptions) {
        this.options = options;
        this.selectedTeamIds = options.initialSelection || [];
        this.root = document.createElement('div');
        this.root.className = 'team-selector';
    }

    /**
     * Build the TeamSelector DOM structure
     */
    build(): HTMLElement {
        // Note: CSS is injected at TrackersSection level

        // Header
        const header = document.createElement('div');
        header.className = 'team-selector__header';
        header.innerHTML = `
            <h3 class="team-selector__title">Select Team</h3>
            <p class="team-selector__subtitle">Choose up to 2 teams to compare</p>
        `;
        this.root.appendChild(header);

        // Cards container
        this.cardsContainer = document.createElement('div');
        this.cardsContainer.className = 'team-selector__cards';
        this.root.appendChild(this.cardsContainer);

        // Render team cards
        this.renderTeamCards();

        return this.root;
    }

    /**
     * Refresh team cards (e.g., when teams are added/removed)
     * PERFORMANCE: Uses selective updates instead of full rebuild
     */
    refresh(): void {
        this.renderTeamCardsSelective();
    }

    /**
     * Update selection programmatically
     */
    setSelection(teamIds: string[]): void {
        this.selectedTeamIds = teamIds.slice(0, 2); // Max 2 teams
        this.updateCardStates();
    }

    /**
     * Get the card element for a specific team
     */
    getTeamCard(teamId: string): HTMLElement | undefined {
        return this.teamCards.get(teamId);
    }

    /**
     * Get current selection
     */
    getSelection(): string[] {
        return [...this.selectedTeamIds];
    }

    /**
     * Render team cards with selective updates (PERFORMANCE FIX)
     * Only adds/removes/updates changed cards instead of full rebuild
     */
    private renderTeamCardsSelective(): void {
        if (!this.cardsContainer) return;

        const teams = MGPetTeam.getAllTeams();
        const currentTeamIds = new Set(teams.map((t) => t.id));
        const existingTeamIds = new Set(this.teamCards.keys());

        // Remove cards for deleted teams
        for (const teamId of existingTeamIds) {
            if (!currentTeamIds.has(teamId)) {
                const card = this.teamCards.get(teamId);
                if (card) {
                    card.remove();
                    this.teamCards.delete(teamId);
                }
            }
        }

        // Add/update cards
        if (teams.length === 0) {
            // Show empty state
            const empty = document.createElement('div');
            empty.className = 'team-selector__empty';
            empty.textContent = 'No teams found. Create a team in the Pets tab first.';
            this.cardsContainer.innerHTML = '';
            this.cardsContainer.appendChild(empty);
            this.teamCards.clear();
            return;
        } else {
            // Remove empty state if exists
            const emptyState = this.cardsContainer.querySelector('.team-selector__empty');
            if (emptyState) {
                emptyState.remove();
            }
        }

        // Add new cards and maintain order
        for (let i = 0; i < teams.length; i++) {
            const team = teams[i];
            const pets = MGPetTeam.getPetsForTeam(team);
            const purpose = getCachedTeamPurpose(team); // PERFORMANCE: Use cached purpose detection

            const cardData: TeamCardData = {
                team,
                petCount: pets.filter((p) => p).length,
                purposeIcon: PURPOSE_ICONS[purpose.primary] || '❓',
                purposeLabel: PURPOSE_LABELS[purpose.primary] || 'Unknown',
                purposeConfidence: purpose.confidence,
            };

            if (!this.teamCards.has(team.id)) {
                // New team - build and insert card
                const card = this.buildTeamCard(cardData);
                this.teamCards.set(team.id, card);

                // Insert at correct position
                if (i < this.cardsContainer.children.length) {
                    this.cardsContainer.insertBefore(card, this.cardsContainer.children[i]);
                } else {
                    this.cardsContainer.appendChild(card);
                }
            } else {
                // Existing team - update if name changed
                const existingCard = this.teamCards.get(team.id)!;
                const nameEl = existingCard.querySelector('.team-card__name');
                if (nameEl && nameEl.textContent !== team.name) {
                    nameEl.textContent = team.name;
                }

                // Ensure card is in correct position
                const currentIndex = Array.from(this.cardsContainer.children).indexOf(existingCard);
                if (currentIndex !== i) {
                    if (i < this.cardsContainer.children.length) {
                        this.cardsContainer.insertBefore(existingCard, this.cardsContainer.children[i]);
                    } else {
                        this.cardsContainer.appendChild(existingCard);
                    }
                }
            }
        }

        // Update visual states
        this.updateCardStates();
    }

    /**
     * Render all team cards (FULL REBUILD - only used on initial build)
     */
    private renderTeamCards(): void {
        if (!this.cardsContainer) return;

        // Clear existing
        this.cardsContainer.innerHTML = '';
        this.teamCards.clear();

        // Get all teams
        const teams = MGPetTeam.getAllTeams();

        if (teams.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'team-selector__empty';
            empty.textContent = 'No teams found. Create a team in the Pets tab first.';
            this.cardsContainer.appendChild(empty);
            return;
        }

        // Build card data for each team
        const cardDataList: TeamCardData[] = teams.map((team) => {
            const pets = MGPetTeam.getPetsForTeam(team);
            const purpose = getCachedTeamPurpose(team); // PERFORMANCE: Use cached purpose detection

            return {
                team,
                petCount: pets.filter((p) => p).length,
                purposeIcon: PURPOSE_ICONS[purpose.primary] || '❓',
                purposeLabel: PURPOSE_LABELS[purpose.primary] || 'Unknown',
                purposeConfidence: purpose.confidence,
            };
        });

        // Render each card
        for (const cardData of cardDataList) {
            const card = this.buildTeamCard(cardData);
            this.teamCards.set(cardData.team.id, card);
            this.cardsContainer.appendChild(card);
        }

        // Update visual states based on selection
        this.updateCardStates();
    }

    /**
     * Build individual team card
     */
    private buildTeamCard(data: TeamCardData): HTMLElement {
        const card = document.createElement('div');
        card.className = 'team-card';
        card.dataset.teamId = data.team.id;

        // Card header with team name
        const header = document.createElement('div');
        header.className = 'team-card__header';

        const nameEl = document.createElement('div');
        nameEl.className = 'team-card__name';
        nameEl.textContent = data.team.name;
        header.appendChild(nameEl);

        const countEl = document.createElement('div');
        countEl.className = 'team-card__count';
        countEl.textContent = `${data.petCount} ${data.petCount === 1 ? 'pet' : 'pets'}`;
        header.appendChild(countEl);

        card.appendChild(header);

        // Pet sprites preview
        const spritesRow = document.createElement('div');
        spritesRow.className = 'team-card__sprites';

        const pets = MGPetTeam.getPetsForTeam(data.team).filter((p) => p);
        const maxSprites = 4;
        const spritesToShow = pets.slice(0, maxSprites);

        // TODO (OPTIMIZATION): Consider caching sprite canvases with mutation-aware keys
        // This would avoid re-rendering identical sprites across multiple team cards
        // Cache key: `${petSpecies}:${mutations.sort().join(',')}:${scale}`
        for (const pet of spritesToShow) {
            const spriteWrapper = document.createElement('div');
            spriteWrapper.className = 'team-card__sprite';

            try {
                const mutations = pet.mutations as import('../../../../modules/sprite').MutationName[];
                if (MGSprite.has('pet', pet.petSpecies)) {
                    const spriteCanvas = MGSprite.toCanvas('pet', pet.petSpecies, {
                        mutations,
                        scale: 1.5,
                        boundsMode: 'padded',
                    });
                    spriteCanvas.style.width = '100%';
                    spriteCanvas.style.height = '100%';
                    spriteCanvas.style.objectFit = 'contain';
                    spriteCanvas.style.imageRendering = 'crisp-edges';
                    spriteCanvas.style.display = 'block';
                    spriteWrapper.appendChild(spriteCanvas);
                } else {
                    spriteWrapper.innerHTML = '<div class="team-card__sprite-fallback">🐾</div>';
                }
            } catch (error) {
                console.warn(`[TeamSelector] Failed to render sprite for ${pet.petSpecies}:`, error);
                spriteWrapper.innerHTML = '<div class="team-card__sprite-fallback">🐾</div>';
            }

            spritesRow.appendChild(spriteWrapper);
        }

        // Show "+N" indicator if more pets than shown
        if (pets.length > maxSprites) {
            const moreIndicator = document.createElement('div');
            moreIndicator.className = 'team-card__sprite team-card__sprite--more';
            moreIndicator.textContent = `+${pets.length - maxSprites}`;
            spritesRow.appendChild(moreIndicator);
        }

        card.appendChild(spritesRow);

        // Purpose indicator
        const purposeRow = document.createElement('div');
        purposeRow.className = 'team-card__purpose';

        purposeRow.innerHTML = `
            <span class="team-card__purpose-icon">${data.purposeIcon}</span>
            <span class="team-card__purpose-label">${data.purposeLabel}</span>
            <span class="team-card__purpose-confidence">${Math.round(data.purposeConfidence * 100)}%</span>
        `;

        card.appendChild(purposeRow);

        // Click handler
        card.addEventListener('click', () => {
            this.handleCardClick(data.team.id);
        });

        return card;
    }

    /**
     * Handle team card click
     */
    private handleCardClick(teamId: string): void {
        const index = this.selectedTeamIds.indexOf(teamId);

        if (index >= 0) {
            // Already selected - deselect
            this.selectedTeamIds.splice(index, 1);
        } else {
            // Not selected - add (max 2)
            if (this.selectedTeamIds.length < 2) {
                this.selectedTeamIds.push(teamId);
            } else {
                // Replace oldest selection
                this.selectedTeamIds.shift();
                this.selectedTeamIds.push(teamId);
            }
        }

        this.updateCardStates();
        this.options.onSelectionChange(this.selectedTeamIds);
    }

    /**
     * Update visual states of all cards based on selection
     */
    private updateCardStates(): void {
        for (const [teamId, cardElement] of this.teamCards) {
            const selectionIndex = this.selectedTeamIds.indexOf(teamId);

            // Remove all selection classes
            cardElement.classList.remove(
                'team-card--selected',
                'team-card--primary',
                'team-card--comparison'
            );

            // Add appropriate class
            if (selectionIndex === 0) {
                cardElement.classList.add('team-card--selected', 'team-card--primary');
            } else if (selectionIndex === 1) {
                cardElement.classList.add('team-card--selected', 'team-card--comparison');
            }
        }
    }

    /**
     * Cleanup
     */
    destroy(): void {
        if (this.root.parentNode) {
            this.root.parentNode.removeChild(this.root);
        }

        this.cardsContainer = null;
        this.teamCards.clear();
    }
}
