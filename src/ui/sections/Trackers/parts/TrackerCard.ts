/**
 * Tracker Card Part
 *
 * Displays pet teams with expandable tracker panels.
 * UI mirrors Pets/parts/TeamCard.ts structure with key differences:
 * - Mode: "Simple" / "Detailed" (not "Overview" / "Manage")
 * - NO team switching (read-only display)
 * - NO drag handles (teams cannot be reordered)
 * - KEEP expand/collapse for tracker panels
 *
 * Per .claude/rules/ui/sections.md
 *
 * -----------------------------------------------------------
 * NOTE: This imports TeamCardExpansionHandler and FEATURE_PANELS
 * from the Pets section. These will eventually be removed from
 * Pets and moved here when Pets becomes team-management only.
 * See: TODO.md or implementation_plan.md for migration notes.
 * -----------------------------------------------------------
 */

import { Card } from '../../../components/Card/Card';
import { TeamListItem } from '../../../components/TeamListItem/TeamListItem';
import {
    SegmentedControl,
    SegmentedControlHandle,
} from '../../../components/SegmentedControl/SegmentedControl';
import { element } from '../../../styles/helpers';
import { MGPetTeam } from '../../../../features/petTeam';
import { Globals } from '../../../../globals';
import type { PetTeam } from '../../../../features/petTeam';

// NOTE: Importing from Pets section - these will move to Trackers when Pets
// section is simplified to team-management only.
// Local vendored expansion handler
import { TrackerExpansionHandler } from './TrackerExpansion';
import { TileGridOverlay } from './TileGridOverlay';

import { getTrackersState, toggleTeamExpanded, setCalculationScope, setTileSelection } from '../state';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TrackerCardPartOptions {
    /** Called when HUD should open/close (for mobile pet selection) */
    setHUDOpen?: (open: boolean) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tracker Card Part
// ─────────────────────────────────────────────────────────────────────────────

export class TrackerCardPart {
    private card: HTMLDivElement | null = null;
    private scopeControl: SegmentedControlHandle | null = null;
    private scopeContainer: HTMLDivElement | null = null;
    private content: HTMLDivElement | null = null;
    private listContainer: HTMLElement | null = null;
    private options: TrackerCardPartOptions;
    private tileGridOverlay: TileGridOverlay | null = null;

    /**
     * Expansion handler for inline tracker panels.
     */
    private expansionHandler: TrackerExpansionHandler;

    constructor(options: TrackerCardPartOptions) {
        this.options = options;
        this.expansionHandler = new TrackerExpansionHandler({
            getListContainer: () => this.listContainer
        });
    }

    // ───────────────────────────────────────────────────────────────────────────
    // Public API
    // ───────────────────────────────────────────────────────────────────────────

    build(): HTMLDivElement {
        if (this.card) return this.card;
        return this.createCard();
    }

    destroy(): void {
        this.expansionHandler.destroy();

        if (this.scopeControl) {
            this.scopeControl.destroy();
            this.scopeControl = null;
        }

        if (this.tileGridOverlay) {
            this.tileGridOverlay.destroy?.();
            this.tileGridOverlay = null;
        }

        this.card = null;
        this.scopeContainer = null;
        this.content = null;
        this.listContainer = null;
    }

    render(): void {
        if (!this.card) return;

        const isEnabled = MGPetTeam.isEnabled();

        if (!isEnabled) {
            this.renderDisabledState();
            return;
        }

        if (this.scopeContainer) {
            this.scopeContainer.style.display = 'flex';
        }

        this.ensureScopeControl();
        this.renderTeamList();
    }

    /** Get the list container (used by expansion handler) */
    getListContainer(): HTMLElement | null {
        return this.listContainer;
    }

    // ───────────────────────────────────────────────────────────────────────────
    // Card Setup
    // ───────────────────────────────────────────────────────────────────────────

    private createCard(): HTMLDivElement {
        const cardWrapper = element('div', {
            className: 'tracker-card-wrapper',
        });

        // Scope container (All Tiles / Selected Tiles toggle) - replaces mode container
        this.scopeContainer = element('div', {
            className: 'tracker-card__scope-container',
        });
        cardWrapper.appendChild(this.scopeContainer);

        // Content container
        this.content = element('div', {
            className: 'tracker-card__content',
        });
        cardWrapper.appendChild(this.content);

        // Wrap in Card component
        const card = Card(
            {
                title: 'Trackers',
                expandable: true,
                defaultExpanded: true,
            },
            cardWrapper
        );

        this.card = card;
        return card;
    }

    private ensureScopeControl(): void {
        if (!this.scopeContainer) return;

        const state = getTrackersState().get();

        if (!this.scopeControl) {
            this.scopeControl = SegmentedControl({
                segments: [
                    { id: 'all', label: 'All Tiles' },
                    { id: 'selected', label: 'Selected Tiles' },
                ],
                selected: state.calculationScope,
                onChange: (id) => {
                    const scope = id as 'all' | 'selected';
                    setCalculationScope(scope);

                    // Show grid overlay if switching to 'selected', hide if 'all'
                    if (scope === 'selected') {
                        this.showTileGridOverlay();
                    } else {
                        this.tileGridOverlay?.hide();
                    }

                    this.renderTeamList();
                },
            });

            this.scopeContainer.appendChild(this.scopeControl);
            return;
        }

        // Sync control with state
        if (this.scopeControl.getSelected() !== state.calculationScope) {
            this.scopeControl.select(state.calculationScope);
        }
    }

    private showTileGridOverlay(): void {
        if (!this.tileGridOverlay) {
            // Append overlay to scope container for proper positioning
            this.tileGridOverlay = new TileGridOverlay({
                onChange: () => {
                    // Re-render team list when selections change
                    this.renderTeamList();
                },
                container: this.scopeContainer || undefined,
            });
            this.tileGridOverlay.build();
        }

        this.tileGridOverlay.show();
    }

    // ───────────────────────────────────────────────────────────────────────────
    // Rendering
    // ───────────────────────────────────────────────────────────────────────────

    private renderDisabledState(): void {
        if (!this.content) return;

        this.expansionHandler.cleanupAll();
        this.listContainer = null;

        if (this.scopeContainer) {
            this.scopeContainer.style.display = 'none';
        }

        const disabledState = element('div', {
            className: 'tracker-card__disabled-state',
        });

        const message = element('div', {
            textContent: 'Pet Teams feature is not enabled',
            className: 'tracker-card__disabled-message',
        });

        disabledState.appendChild(message);
        this.content.replaceChildren(disabledState);
    }

    private renderTeamList(): void {
        if (!this.content) return;

        // Cleanup previous expansion panels
        this.expansionHandler.cleanupAll();
        this.content.replaceChildren();

        const teams = MGPetTeam.getAllTeams();
        const activeTeamId = MGPetTeam.getActiveTeamId();
        const state = getTrackersState().get();

        // Pass tile filter to expansion handler
        const selectedFilter = state.calculationScope === 'selected'
            ? new Set(state.selectedTileIndices)
            : undefined;

        this.expansionHandler.setTileFilter(selectedFilter);

        if (teams.length === 0) {
            this.renderEmptyState();
            return;
        }

        // Create list container
        this.listContainer = element('div', {
            className: 'tracker-card__list-container',
        });

        // Render each team
        teams.forEach((team: PetTeam) => {
            const isActive = activeTeamId === team.id;
            const isExpanded = state.expandedTeamIds.includes(team.id);

            const teamItem = TeamListItem({
                team,
                isActive,
                // NO drag handle (read-only)
                hideDragHandle: true,
                // NOT editable (read-only)
                isNameEditable: false,
                // Show expand state
                isExpanded,
                // Handle expand click
                onExpandClick: () => {
                    this.handleExpandToggle(team.id);
                },
            });

            // Add data attribute for expansion handler lookup
            teamItem.setAttribute('data-team-id', team.id);

            // Issue #8: Prevent read-only teams from triggering activation on click
            teamItem.addEventListener('click', (ev) => {
                ev.stopPropagation();
            });

            this.listContainer!.appendChild(teamItem);

            // If expanded, render the tracker panel
            if (isExpanded) {
                this.expansionHandler.expand(team.id);
            }
        });

        this.content.appendChild(this.listContainer);
    }

    private renderEmptyState(): void {
        if (!this.content) return;

        const emptyState = element('div', {
            className: 'tracker-card__empty-state',
        });

        const message = element('div', {
            textContent: 'No teams created yet.',
            className: 'tracker-card__empty-message',
        });

        const hint = element('div', {
            textContent: 'Create teams in the Pets tab to view trackers.',
            className: 'tracker-card__empty-hint',
        });

        emptyState.appendChild(message);
        emptyState.appendChild(hint);
        this.content.appendChild(emptyState);
    }

    // ───────────────────────────────────────────────────────────────────────────
    // Event Handlers
    // ───────────────────────────────────────────────────────────────────────────

    private handleExpandToggle(teamId: string): void {
        // Update state
        toggleTeamExpanded(teamId);

        // Update expansion handler
        this.expansionHandler.toggle(teamId);

        // Update the team item's expanded visual state
        const teamItem = this.listContainer?.querySelector(
            `[data-team-id="${teamId}"]`
        ) as HTMLElement | null;

        if (teamItem) {
            const isNowExpanded = getTrackersState()
                .get()
                .expandedTeamIds.includes(teamId);
            const expandBtn = teamItem.querySelector('.team-list-item__expand');
            if (expandBtn) {
                expandBtn.classList.toggle('team-list-item__expand--open', isNowExpanded);
            }
        }
    }
}
