/**
 * Pets Section
 * Manages pet teams and pet-related features
 */

import { BaseSection } from "../core/Section";
import { TeamCardPart } from "./parts";
import { MGPetTeam } from "../../../features/petTeam";
import { Globals } from "../../../globals";
import type { SectionsBuilderDeps } from "../../hud/types";

export class PetsSection extends BaseSection {
    private unsubscribeMyPets?: () => void;
    private lastActiveTeamId: string | null = null;
    private teamCardPart: TeamCardPart | null = null;
    private deps?: SectionsBuilderDeps;

    constructor(deps?: SectionsBuilderDeps) {
        super({ id: "tab-pets", label: "Pets" });
        this.deps = deps;
    }

    protected async build(container: HTMLElement): Promise<void> {
        this.container = container;
        const section = this.createGrid("12px");
        section.id = "pets";
        container.appendChild(section);

        this.initializeTeamCardPart(section);

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

        const card = this.teamCardPart.build();
        section.replaceChildren(card);
        this.teamCardPart.render();
    }
}
