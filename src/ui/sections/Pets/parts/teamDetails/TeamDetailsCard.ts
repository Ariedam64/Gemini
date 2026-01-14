/**
 * Team Details Card Part
 * Displays expanded team view with feature panels and XP tracking
 *
 * Handles:
 * - Team expansion/collapse
 * - Feature panel rendering (growth, xp, etc.)
 * - Team XP panel
 *
 * Per .claude/rules/ui/sections.md
 */

import { Card } from "../../../../components/Card/Card";
import { element } from "../../../../styles/helpers";
import { MGPetTeam } from "../../../../../features/petTeam";
import { Globals } from "../../../../../globals";
import { TeamCardExpansionHandler } from "./TeamCardExpansion";
import { TeamXpPanel, type TeamXpData, type TeamPetXpData } from "./TeamXpPanel";
import type { UnifiedPet } from "../../../../../globals/core/types";

export interface TeamDetailsCardPartOptions {
    getActiveTeamId?: () => string | null;
}

export class TeamDetailsCardPart {
    private card: HTMLDivElement | null = null;
    private detailsContainer: HTMLElement | null = null;
    private lastActiveTeamId: string | null = null;
    private expansionHandler: TeamCardExpansionHandler;
    private xpPanel: TeamXpPanel | null = null;
    private unsubscribePets?: () => void;
    private options: TeamDetailsCardPartOptions;

    constructor(options: TeamDetailsCardPartOptions = {}) {
        this.options = options;
        this.expansionHandler = new TeamCardExpansionHandler({
            getListContainer: () => this.getListContainerFromExpanded(),
        });
    }

    build(): HTMLDivElement {
        if (this.card) return this.card;
        return this.createDetailsCard();
    }

    destroy(): void {
        if (this.unsubscribePets) {
            this.unsubscribePets();
            this.unsubscribePets = undefined;
        }

        this.expansionHandler.destroy();

        if (this.xpPanel) {
            this.xpPanel.destroy();
            this.xpPanel = null;
        }

        this.card = null;
        this.detailsContainer = null;
    }

    async render(): Promise<void> {
        if (!this.card) return;

        const activeTeamId = this.options.getActiveTeamId?.() || MGPetTeam.getActiveTeamId();

        if (!activeTeamId) {
            this.renderEmptyState();
            return;
        }

        if (this.lastActiveTeamId !== activeTeamId) {
            this.lastActiveTeamId = activeTeamId;
            this.expansionHandler.cleanupAll(); // Clear previous expansions
        }

        this.renderTeamDetails(activeTeamId);
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Card Setup
    // ─────────────────────────────────────────────────────────────────────────

    private createDetailsCard(): HTMLDivElement {
        const cardWrapper = element("div", {
            className: "team-details-card-wrapper",
        });

        this.detailsContainer = element("div", {
            className: "team-details-card__content",
        });
        cardWrapper.appendChild(this.detailsContainer);

        const card = Card({
            title: "Team Details",
            subtitle: "Expanded view with features and analysis",
            expandable: true,
            defaultExpanded: true,
        }, cardWrapper);

        this.card = card;
        return card;
    }

    private renderEmptyState(): void {
        if (!this.detailsContainer) return;

        this.detailsContainer.replaceChildren();

        const emptyState = element("div", {
            className: "team-details-card__empty-state",
            style: "padding: 24px; text-align: center; color: color-mix(in oklab, var(--fg) 60%, #9ca3af);",
        });

        emptyState.textContent = "Select a team to view details";
        this.detailsContainer.appendChild(emptyState);
    }

    private renderTeamDetails(teamId: string): void {
        if (!this.detailsContainer) return;

        const team = MGPetTeam.getTeam(teamId);
        if (!team) {
            this.renderEmptyState();
            return;
        }

        this.detailsContainer.replaceChildren();

        // Create a container for the expanded team view
        const expandedContainer = element("div", {
            className: "team-details__expanded-view",
        });

        // Expand the team to show all pets and feature panels
        this.expansionHandler.expand(teamId);

        // Add the expanded view to container
        const expandedState = this.expansionHandler['expandedTeams'].get(teamId);
        if (expandedState) {
            expandedContainer.appendChild(expandedState.container);
            this.detailsContainer.appendChild(expandedContainer);
        }

        // Render Team XP Panel below the expanded view
        this.renderXpPanel(teamId, expandedContainer);
    }

    private renderXpPanel(teamId: string, container: HTMLElement): void {
        if (!this.xpPanel) {
            this.xpPanel = new TeamXpPanel({ teamId });
            const xpPanelRoot = this.xpPanel.build();
            container.appendChild(xpPanelRoot);
            this.subscribeToXpPanelUpdates(teamId);
        } else {
            // Update existing XP panel
            this.subscribeToXpPanelUpdates(teamId);
        }
    }

    private subscribeToXpPanelUpdates(teamId: string): void {
        if (!this.xpPanel) return;

        // Subscribe to pet changes to update XP panel
        if (this.unsubscribePets) {
            this.unsubscribePets();
        }

        this.unsubscribePets = Globals.myPets.subscribeStable(() => {
            const data = this.buildXpData(teamId);
            if (data) {
                this.xpPanel?.update(data);
            }
        });

        // Initial update
        const data = this.buildXpData(teamId);
        if (data) {
            this.xpPanel.update(data);
        }
    }

    private buildXpData(teamId: string): TeamXpData | null {
        const team = MGPetTeam.getTeam(teamId);
        if (!team) return null;

        const myPets = Globals.myPets.get();
        const pets = MGPetTeam.getPetsForTeam(team);

        const petData: TeamPetXpData[] = pets.map((pet) => {
            // Build pet data structure (simplified for now)
            return {
                id: pet.id,
                name: pet.name || pet.petSpecies,
                species: pet.petSpecies,
                currentStrength: pet.currentStrength,
                maxStrength: pet.maxStrength,
                isMaxStrength: pet.currentStrength >= pet.maxStrength,
                xpPerHour: 0, // Would be calculated
                hoursToNextStrength: null,
                hoursToMaxStrength: 0,
                feedsToNextStrength: null,
                feedsToMaxStrength: 0,
                isStarving: false,
                hunger: pet.hunger,
                xpBoostStats: null,
                supportingFeeds: null,
                mutations: pet.mutations || [],
                targetScale: pet.targetScale,
            };
        });

        return {
            teamId,
            teamName: team.name,
            pets: petData,
            teamSummary: {
                baseXpPerHour: 3600,
                bonusXpPerHour: 0,
                totalXpPerHour: 3600,
                activeBoosterCount: 0,
                totalProcsPerHour: 0,
            },
        };
    }

    private getListContainerFromExpanded(): HTMLElement | null {
        const activeTeamId = this.options.getActiveTeamId?.() || MGPetTeam.getActiveTeamId();
        if (!activeTeamId) return null;

        const expandedState = this.expansionHandler['expandedTeams'].get(activeTeamId);
        return expandedState?.container || null;
    }
}
