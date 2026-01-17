/**
 * Pets Section
 * Manages pet teams and pet-related features
 */

import { BaseSection } from "../core/Section";
import { TeamCardPart, AbilityLogsCardPart } from "./parts";
import { MGPetTeam } from "../../../features/petTeam";
import { Globals } from "../../../globals";
import { injectStyleOnce } from "../../styles/inject";
import { teamCardCss } from "./parts/team/teamCard.css";
import { basePetCardCss } from "../../components/BasePetCard";
import { badgeCss } from "../../components/Badge/badge.css";
import { arcadeButtonCss } from "../../components/ArcadeButton";
import { geminiIconButtonCss } from "../../components/GeminiIconButton";
import { abilityLogsCardCss } from "./parts/ability/abilityLogsCard.css";
import type { SectionsDeps } from "../core/Types";

export class PetsSection extends BaseSection {
    private unsubscribeMyPets?: () => void;
    private lastActiveTeamId: string | null = null;
    private teamCardPart: TeamCardPart | null = null;
    private abilityLogsCardPart: AbilityLogsCardPart | null = null;
    private deps?: SectionsDeps;

    constructor(deps?: SectionsDeps) {
        super({ id: "tab-pets", label: "Pets" });
        this.deps = deps;
    }

    protected async build(container: HTMLElement): Promise<void> {
        this.container = container;

        // Ensure Sprite system is ready (required for TeamXpPanel pet sprites)
        const { MGSprite } = await import('../../../modules');
        await MGSprite.init();

        // Inject styles into shadow root
        const shadow = container.getRootNode() as ShadowRoot;
        injectStyleOnce(shadow, teamCardCss, 'team-card-styles');
        injectStyleOnce(shadow, basePetCardCss, 'base-pet-card-styles');
        injectStyleOnce(shadow, badgeCss, 'badge-styles');
        injectStyleOnce(shadow, arcadeButtonCss, 'arcade-button-styles');
        injectStyleOnce(shadow, geminiIconButtonCss, 'gemini-icon-button-styles');
        injectStyleOnce(shadow, abilityLogsCardCss, 'ability-logs-card-styles');

        const section = this.createGrid("12px");
        section.id = "pets";
        container.appendChild(section);

        this.initializeTeamCardPart(section);
        this.initializeAbilityLogsCardPart(section);

        // Subscribe to stable pet changes (composition changes only)
        this.unsubscribeMyPets = Globals.myPets.subscribeStable(() => {
            const currentActiveTeamId = MGPetTeam.getActiveTeamId();
            if (currentActiveTeamId !== this.lastActiveTeamId) {
                this.lastActiveTeamId = currentActiveTeamId;
                this.teamCardPart?.render();
            }
        });

        this.lastActiveTeamId = MGPetTeam.getActiveTeamId();
    }

    protected async destroy(): Promise<void> {
        if (this.unsubscribeMyPets) {
            this.unsubscribeMyPets();
            this.unsubscribeMyPets = undefined;
        }

        if (this.teamCardPart) {
            this.teamCardPart.destroy();
            this.teamCardPart = null;
        }

        if (this.abilityLogsCardPart) {
            this.abilityLogsCardPart.destroy();
            this.abilityLogsCardPart = null;
        }
    }

    private initializeTeamCardPart(section: HTMLElement): void {
        if (!this.teamCardPart) {
            this.teamCardPart = new TeamCardPart({
                onTeamReordered: (teamIds) => {
                    console.log('[PetsSection] Teams reordered:', teamIds);
                },
                setHUDOpen: this.deps?.setHUDOpen,
            });
        }

        const teamCard = this.teamCardPart.build();
        section.appendChild(teamCard);
        this.teamCardPart.render();
    }

    private initializeAbilityLogsCardPart(section: HTMLElement): void {
        if (!this.abilityLogsCardPart) {
            this.abilityLogsCardPart = new AbilityLogsCardPart();
        }

        const abilityLogsCard = this.abilityLogsCardPart.build();
        section.appendChild(abilityLogsCard);
        this.abilityLogsCardPart.render();
    }
}
