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

/**
 * Whether to show our pet team card.
 *
 * Off: the game shipped its own pet team system, so ours is redundant. The
 * card and every part it uses are kept in place — flip this back to true if
 * the game's version ever regresses.
 *
 * This hides the UI only. `MGPetTeam` keeps running: `growthTimers` and
 * `xpTracker` read team composition from it for their calculations.
 */
const SHOW_TEAM_CARD: boolean = false;

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

        // Ensure Sprite system is ready (the ability logs render pet sprites)
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

        if (SHOW_TEAM_CARD) {
            this.initializeTeamCardPart(section);
        }
        this.initializeAbilityLogsCardPart(section);

        // Only the team card reacts to composition changes, so the subscription
        // goes with it rather than running to re-render nothing.
        if (SHOW_TEAM_CARD) {
            this.unsubscribeMyPets = Globals.myPets.subscribeStable(() => {
                const currentActiveTeamId = MGPetTeam.getActiveTeamId();
                if (currentActiveTeamId !== this.lastActiveTeamId) {
                    this.lastActiveTeamId = currentActiveTeamId;
                    this.teamCardPart?.render();
                }
            });

            this.lastActiveTeamId = MGPetTeam.getActiveTeamId();
        }
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
