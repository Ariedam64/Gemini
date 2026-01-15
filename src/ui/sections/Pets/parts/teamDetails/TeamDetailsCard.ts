/**
 * Team Details Card Part
 * Displays team list with expandable feature panels
 *
 * Handles:
 * - Team expansion/collapse
 * - Feature panel rendering (growth, xp, etc.)
 *
 * Per .claude/rules/ui/sections.md
 */

import { Card } from "../../../../components/Card/Card";
import { TeamListItem } from "../../../../components/TeamListItem/TeamListItem";
import { element } from "../../../../styles/helpers";
import { MGPetTeam } from "../../../../../features/petTeam";
import { TeamCardExpansionHandler } from "./TeamCardExpansion";

export interface TeamDetailsCardPartOptions {
    getActiveTeamId?: () => string | null;
}

export class TeamDetailsCardPart {
    private card: HTMLDivElement | null = null;
    private detailsContainer: HTMLElement | null = null;
    private listContainer: HTMLElement | null = null;
    private expansionHandler: TeamCardExpansionHandler;
    private options: TeamDetailsCardPartOptions;

    constructor(options: TeamDetailsCardPartOptions = {}) {
        this.options = options;
        this.expansionHandler = new TeamCardExpansionHandler({
            getListContainer: () => this.listContainer,
        });
    }

    build(): HTMLDivElement {
        if (this.card) return this.card;
        return this.createDetailsCard();
    }

    destroy(): void {
        this.expansionHandler.destroy();

        this.card = null;
        this.detailsContainer = null;
        this.listContainer = null;
    }

    render(): void {
        if (!this.card || !this.detailsContainer) return;

        if (!MGPetTeam.isEnabled()) {
            this.renderDisabledState();
            return;
        }

        this.renderTeamList();
    }

    // ─────────────────────────────────────────────────────────────────────────
    // Card Setup
    // ─────────────────────────────────────────────────────────────────────────

    private createDetailsCard(): HTMLDivElement {
        const cardWrapper = element("div", {
            className: "team-details-card-wrapper",
        });

        this.detailsContainer = element("div", {
            className: "team-details-card__content team-card__content",
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

    private clearContent(): void {
        this.expansionHandler.cleanupAll();
        this.listContainer = null;
        this.detailsContainer?.replaceChildren();
    }

    private renderDisabledState(): void {
        if (!this.detailsContainer) return;

        this.clearContent();

        const disabledState = element("div", {
            className: "team-card__disabled-state",
        });

        const message = element("div", {
            textContent: "Pet Team feature is disabled",
            className: "team-card__disabled-message",
        });

        disabledState.appendChild(message);
        this.detailsContainer.appendChild(disabledState);
    }

    private renderEmptyState(): void {
        if (!this.detailsContainer) return;

        this.clearContent();

        const emptyState = element("div", {
            className: "team-card__empty-state",
        });

        emptyState.textContent = "No teams yet. Create one in Team card.";
        this.detailsContainer.appendChild(emptyState);
    }

    private renderTeamList(): void {
        if (!this.detailsContainer) return;

        const expandedTeamIds = Array.from(this.expansionHandler['expandedTeams'].keys());

        this.clearContent();

        const teams = MGPetTeam.getAllTeams();
        if (teams.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.listContainer = element("div", {
            className: "team-card__list-container",
        });

        const activeTeamId = this.options.getActiveTeamId?.() || MGPetTeam.getActiveTeamId();

        teams.forEach((team) => {
            const teamItem = TeamListItem({
                team,
                isActive: activeTeamId === team.id,
                hideDragHandle: true,
                isExpanded: expandedTeamIds.includes(team.id),
                onExpandClick: () => {
                    this.expansionHandler.toggle(team.id);
                },
            });

            this.listContainer!.appendChild(teamItem);
        });

        this.detailsContainer.appendChild(this.listContainer);

        for (const teamId of expandedTeamIds) {
            if (teams.some(team => team.id === teamId)) {
                this.expansionHandler.expand(teamId);
            }
        }
    }
}
