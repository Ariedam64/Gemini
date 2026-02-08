import { BaseSection } from "../core/Section";
import { Card } from "../../components/Card/Card";
import { element } from "../../styles/helpers";
import { get } from "../../../modules/cosmetic/avatar/logic/query";
import { MGAvatarLoadouts } from "../../../modules/cosmetic/avatar/logic/loadouts";
import { createAvatarBuilder, type AvatarBuilderHandle } from "../../components/AvatarBuilder/AvatarBuilder";
import type { AvatarOutfit } from "../../../modules/cosmetic/avatar/types";
import { initAvatarUIState, type AvatarUIController } from "./State";
import { createOutfitsLoadoutCard, createOutfitsLoadoutList } from "./parts";

const STYLES = `
    .avatar-outfits-divider {
        margin: 10px 0 8px;
        border: none;
        border-top: 1px solid var(--border);
    }

    .avatar-save-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 10px 16px;
        border-radius: 10px;
        border: 1px solid color-mix(in oklab, var(--accent) 30%, transparent);
        background: color-mix(in oklab, var(--accent) 10%, transparent);
        color: var(--accent);
        font-size: 13px;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.15s ease, border-color 0.15s ease;
        margin: 10px 0 0;
    }
    .avatar-save-btn:hover {
        background: color-mix(in oklab, var(--accent) 18%, transparent);
        border-color: color-mix(in oklab, var(--accent) 50%, transparent);
    }
    .avatar-save-btn:active {
        background: color-mix(in oklab, var(--accent) 26%, transparent);
    }
`;

export class AvatarSection extends BaseSection {
    private avatarBuilder: AvatarBuilderHandle | null = null;
    private uiState: AvatarUIController | null = null;

    constructor() {
        super({
            id: "tab-avatar",
            label: "Avatar",
        });
    }

    protected async build(container: HTMLElement): Promise<void> {
        MGAvatarLoadouts.init();
        this.uiState = await initAvatarUIState();

        const current = await get().catch(() => ({
            top: "Top_DefaultGray.png",
            mid: "Mid_DefaultGray.png",
            bottom: "Bottom_DefaultGray.png",
            expression: "Expression_Default.png",
            color: "Red",
        }));

        const initialOutfit: Required<Omit<AvatarOutfit, "color">> = {
            top: current.top,
            mid: current.mid,
            bottom: current.bottom,
            expression: current.expression,
        };

        const section = this.createContainer("avatar-section");
        container.appendChild(section);

        // Inject styles
        const styleEl = element("style") as HTMLStyleElement;
        styleEl.textContent = STYLES;
        section.appendChild(styleEl);

        // === Builder Card ===
        const builderCard = Card({
            title: "Avatar editor",
            variant: "glass",
            expandable: true,
            defaultExpanded: this.uiState.get().builderExpanded,
            onExpandChange: (expanded) => {
                this.uiState?.update({ builderExpanded: expanded });
            },
        });

        this.avatarBuilder = createAvatarBuilder({
            initialOutfit,
            useRiveAnimation: true,
        });

        const builderBody = builderCard.querySelector(".card-body");
        if (builderBody) {
            builderBody.appendChild(this.avatarBuilder.root);

            // Save button
            const saveBtn = element("button", { className: "avatar-save-btn" }) as HTMLButtonElement;
            saveBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg> Save this outfit`;
            saveBtn.addEventListener("click", () => this.handleSave());
            builderBody.appendChild(saveBtn);

            // Divider + outfit list (loads outfit into builder for editing)
            builderBody.appendChild(element("hr", { className: "avatar-outfits-divider" }));
            const outfitsList = createOutfitsLoadoutList({
                onApply: (loadout) => this.avatarBuilder?.setOutfit(loadout),
            });
            builderBody.appendChild(outfitsList.root);
            this.addCleanup(() => outfitsList.destroy());
        }

        section.appendChild(builderCard);

        // === Outfits Loadout Card (standalone — applies outfit in-game) ===
        const loadoutsCard = createOutfitsLoadoutCard({
            title: "Outfits loadout",
            defaultExpanded: this.uiState.get().loadoutsExpanded,
            onExpandChange: (expanded) => {
                this.uiState?.update({ loadoutsExpanded: expanded });
            },
            layout: "grid",
            showHint: true,
        });
        (loadoutsCard.root as HTMLElement).style.marginTop = "12px";
        section.appendChild(loadoutsCard.root);
        this.addCleanup(() => loadoutsCard.destroy());
    }

    private async handleSave(): Promise<void> {
        if (!this.avatarBuilder) return;
        const outfit = this.avatarBuilder.getOutfit();
        const existing = MGAvatarLoadouts.get();
        const name = `Outfit ${existing.length + 1}`;
        await MGAvatarLoadouts.save(name, outfit);
    }

    public async destroy(): Promise<void> {
        if (this.avatarBuilder) {
            this.avatarBuilder.destroy();
            this.avatarBuilder = null;
        }
        super.destroy();
    }
}
