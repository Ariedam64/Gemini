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

import { getTrackersState, toggleTeamExpanded, setTrackerMode } from '../state';

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
    private modeControl: SegmentedControlHandle | null = null;
    private modeContainer: HTMLDivElement | null = null;
    private content: HTMLDivElement | null = null;
    private listContainer: HTMLElement | null = null;
    private options: TrackerCardPartOptions;

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

        if (this.modeControl) {
            this.modeControl.destroy();
            this.modeControl = null;
        }

        this.card = null;
        this.modeContainer = null;
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

        if (this.modeContainer) {
            this.modeContainer.style.display = 'flex';
        }

        this.ensureModeControl();
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

        // Mode container (Simple / Detailed toggle)
        this.modeContainer = element('div', {
            className: 'tracker-card__mode-container',
        });
        cardWrapper.appendChild(this.modeContainer);

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

    private ensureModeControl(): void {
        if (!this.modeContainer) return;

        const state = getTrackersState().get();

        if (!this.modeControl) {
            this.modeControl = SegmentedControl({
                segments: [
                    { id: 'simple', label: 'Simple' },
                    { id: 'detailed', label: 'Detailed' },
                ],
                selected: state.mode,
                onChange: (id) => {
                    setTrackerMode(id as 'simple' | 'detailed');
                    this.renderTeamList();
                },
            });

            this.modeContainer.appendChild(this.modeControl);
            return;
        }

        // Sync control with state
        if (this.modeControl.getSelected() !== state.mode) {
            this.modeControl.select(state.mode);
        }
    }

    // ───────────────────────────────────────────────────────────────────────────
    // Rendering
    // ───────────────────────────────────────────────────────────────────────────

    private renderDisabledState(): void {
        if (!this.content) return;

        this.expansionHandler.cleanupAll();
        this.listContainer = null;

        if (this.modeContainer) {
            this.modeContainer.style.display = 'none';
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
