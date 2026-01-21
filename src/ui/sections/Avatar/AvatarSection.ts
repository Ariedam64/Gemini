import { element } from "../../styles/helpers";
import { BaseSection } from "../core/Section";
import { Card } from "../../components/Card/Card";
import { Button } from "../../components/Button/Button";
import { list, listAsync, get, getAssetBaseUrl, preloadDiscovery } from "../../../modules/cosmetic/avatar/logic/query";
import { initOwnership } from "../../../modules/cosmetic/avatar/logic/ownership";
import { renderWorld, clearWorldOverride } from "../../../modules/cosmetic/avatar/logic/worldOverride";
import { MGAvatarLoadouts, AvatarLoadout } from "../../../modules/cosmetic/avatar/logic/loadouts";
import { initAvatarUIState, AvatarUIController } from "./State";
import { avatarStyles } from "./styles.css";
import { injectStyleOnce } from "../../styles/inject";
import { Input } from "../../components/Input/Input";
import type { AvatarOutfit, CosmeticInfo } from "../../../modules/cosmetic/avatar/types";
import { ALT_ASSET_PATH } from "../../../modules/cosmetic/avatar/types";

export class AvatarSection extends BaseSection {
    private previewOutfit: Required<Omit<AvatarOutfit, 'color'>> = {
        top: 'Top_DefaultGray.png',
        mid: 'Mid_DefaultGray.png',
        bottom: 'Bottom_DefaultGray.png',
        expression: 'Expression_Default.png',
    };

    private previewContainer: HTMLDivElement | null = null;
    private menuContainer: HTMLDivElement | null = null;
    private menuCard: HTMLDivElement | null = null;
    private loadoutsContainer: HTMLDivElement | null = null;
    private currentSlot: keyof AvatarOutfit | null = null;
    private uiState: AvatarUIController | null = null;
    private cleanups: (() => void)[] = [];

    constructor() {
        super({
            id: "tab-avatar",
            label: "Avatar",
        });
    }

    protected async build(container: HTMLElement): Promise<void> {
        // Parallel async operations (ownership, UI state, current avatar)
        const [_, uiState, current] = await Promise.all([
            initOwnership(),
            initAvatarUIState(),
            get().catch(() => ({
                top: 'Top_DefaultGray.png',
                mid: 'Mid_DefaultGray.png',
                bottom: 'Bottom_DefaultGray.png',
                expression: 'Expression_Default.png',
                color: 'Red',
            }))
        ]);

        // Assign results
        this.uiState = uiState;
        this.previewOutfit = {
            top: current.top,
            mid: current.mid,
            bottom: current.bottom,
            expression: current.expression,
        };

        // Fire-and-forget operations (not blocking UI)
        preloadDiscovery().catch(e => console.warn("[AvatarSection] Discovery failed:", e));
        MGAvatarLoadouts.init();

        const section = this.createContainer("avatar-section");

        // Inject scoped styles into shadow root (Shadow DOM compliance)
        const shadow = container.getRootNode() as ShadowRoot;
        if (shadow instanceof ShadowRoot) {
            injectStyleOnce(shadow, avatarStyles, 'avatar-section-styles');
        } else {
            // Fallback for non-shadow environments
            const styleTag = element("style") as HTMLStyleElement;
            styleTag.textContent = avatarStyles;
            section.appendChild(styleTag);
        }

        container.appendChild(section);

        // --- Main Layout ---
        const mainLayout = element("div", { className: "avatar-main-layout" });
        section.appendChild(mainLayout);

        // Sidebar (Left Column - per mockup)
        const sidebar = element("div", { className: "avatar-slots-column" });
        mainLayout.appendChild(sidebar);

        const slots: { label: string; key: keyof AvatarOutfit }[] = [
            { label: "Expression", key: "expression" },
            { label: "Top (Hat)", key: "top" },
            { label: "Mid (Face)", key: "mid" },
            { label: "Bottom (Outfit)", key: "bottom" },
        ];

        slots.forEach(slot => {
            const btn = Button({
                label: slot.label,
                fullWidth: true,
                size: "sm",
                onClick: () => this.showMenu(slot.key)
            });
            sidebar.appendChild(btn);
        });

        // Apply/Reset Buttons
        const actionGroup = element("div", { className: "avatar-action-group" });
        sidebar.appendChild(actionGroup);

        const applyBtn = Button({
            label: "Apply to World",
            variant: "primary",
            fullWidth: true,
            onClick: async () => {
                applyBtn.setLoading(true);
                await renderWorld(this.previewOutfit);
                applyBtn.setLoading(false);
                applyBtn.setLabel("Success!");
                setTimeout(() => applyBtn.setLabel("Apply to World"), 2000);
            }
        });
        actionGroup.appendChild(applyBtn);

        const resetBtn = Button({
            label: "Reset",
            variant: "danger",
            fullWidth: true,
            size: "sm",
            onClick: async () => {
                await clearWorldOverride();
                const reset = await get();
                this.previewOutfit = { ...reset };
                this.updatePreview();
            }
        });
        actionGroup.appendChild(resetBtn);

        // Preview Area (Right Column)
        const previewArea = element("div", { className: "avatar-preview-area" });
        mainLayout.appendChild(previewArea);

        const previewCard = Card({ title: "Live Preview", variant: "soft" });
        this.previewContainer = element("div", { className: "avatar-preview-box" }) as HTMLDivElement;
        previewCard.querySelector(".card-body")?.appendChild(this.previewContainer);
        previewArea.appendChild(previewCard);
        this.updatePreview();

        // --- Selection Area (Grid) ---
        this.menuCard = Card({ title: "Select Item", variant: "outline" });
        this.menuCard.className += " avatar-selection-area";
        this.menuContainer = element("div", { className: "avatar-items-grid" }) as HTMLDivElement;
        this.menuCard.querySelector(".card-body")?.appendChild(this.menuContainer);
        this.menuCard.style.display = "none";
        section.appendChild(this.menuCard);

        // --- Loadouts Area ---
        const loadoutsArea = element("div", { className: "avatar-loadouts-area" });
        section.appendChild(loadoutsArea);

        const loadoutHeader = element("div", { className: "loadout-header-row" });
        loadoutsArea.appendChild(loadoutHeader);
        loadoutHeader.appendChild(element("h3", { className: "loadout-title" }, "Saved Outfits"));

        const saveBtn = Button({
            label: "+ Save Current",
            size: "sm",
            onClick: () => this.handleSaveCurrent()
        });
        loadoutHeader.appendChild(saveBtn);

        this.loadoutsContainer = element("div", { className: "avatar-loadouts-grid" }) as HTMLDivElement;
        loadoutsArea.appendChild(this.loadoutsContainer);

        // Subscriptions
        this.cleanups.push(MGAvatarLoadouts.subscribe(() => this.renderLoadouts()));
        this.renderLoadouts();
    }

    private updatePreview() {
        if (!this.previewContainer) return;
        this.previewContainer.innerHTML = "";
        const assetBase = getAssetBaseUrl();
        const layers = [
            { f: this.previewOutfit.bottom, z: 1 },
            { f: this.previewOutfit.mid, z: 2 },
            { f: this.previewOutfit.top, z: 3 },
            { f: this.previewOutfit.expression, z: 4 },
        ];

        layers.forEach(layer => {
            const isAltPath = layer.f === ALT_ASSET_PATH;
            if (!layer.f || layer.f.includes("_Blank.png") || isAltPath) return;
            const img = element("img", {
                src: `${assetBase}${layer.f}`,
                className: "avatar-preview-layer",
                style: { zIndex: String(layer.z) },
                onerror: () => img.style.display = "none"
            });
            this.previewContainer!.appendChild(img);
        });
    }

    private async showMenu(slot: keyof AvatarOutfit) {
        if (!this.menuContainer || !this.menuCard) return;
        this.currentSlot = slot;
        const typeMap: Record<string, string> = { top: "Top", mid: "Mid", bottom: "Bottom", expression: "Expression" };
        const items = await listAsync({ type: typeMap[slot] });

        this.menuContainer.innerHTML = "";
        this.menuCard.style.display = "block";
        const title = this.menuCard.querySelector(".card-title");
        if (title) title.textContent = `Selection: ${typeMap[slot]} (${items.length - 1} variants)`;

        items.forEach(item => {
            const isSelected = this.previewOutfit[slot as keyof typeof this.previewOutfit] === item.filename;
            const isNone = item.displayName === "None";

            const btn = element("div", {
                className: `avatar-item-btn ${isSelected ? 'active' : ''}`,
                "data-filename": item.filename || "null",
                onclick: () => this.selectItem(item)
            });

            if (isNone) {
                btn.appendChild(element("div", { className: "none-placeholder" }, "∅"));
            } else {
                const img = element("img", { src: item.url, className: "avatar-item-img", onerror: () => img.style.display = "none" });
                btn.appendChild(img);
            }

            btn.appendChild(element("div", { className: "avatar-item-label" }, isNone ? "None" : item.displayName));
            this.menuContainer!.appendChild(btn);
        });

        this.menuCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    private selectItem(item: CosmeticInfo) {
        if (!this.currentSlot || !this.menuContainer) return;
        (this.previewOutfit as any)[this.currentSlot] = item.filename;
        this.updatePreview();

        this.menuContainer.querySelectorAll(".avatar-item-btn").forEach(btn => {
            const match = btn.getAttribute("data-filename") === (item.filename || "null");
            btn.classList.toggle("active", match);
        });
    }

    private renderLoadouts() {
        if (!this.loadoutsContainer) return;
        this.loadoutsContainer.innerHTML = "";
        const list = MGAvatarLoadouts.get();

        if (list.length === 0) {
            this.loadoutsContainer.innerHTML = '<div style="grid-column: 1/-1; opacity: 0.5; text-align: center; padding: 20px;">No outfits saved yet.</div>';
            return;
        }

        list.forEach(loadout => {
            const card = element("div", { className: "loadout-card" });

            // Mini Preview Box
            const miniPreview = element("div", { className: "loadout-mini-preview" });
            const assetBase = getAssetBaseUrl();
            const layers = [
                { f: loadout.bottom, z: 1 },
                { f: loadout.mid, z: 2 },
                { f: loadout.top, z: 3 },
                { f: loadout.expression, z: 4 },
            ];
            layers.forEach(layer => {
                const isAltPath = layer.f === ALT_ASSET_PATH;
                if (!layer.f || layer.f.includes("_Blank.png") || isAltPath) return;
                const img = element("img", {
                    src: `${assetBase}${layer.f}`,
                    className: "loadout-mini-layer",
                    style: { zIndex: String(layer.z) },
                    onerror: () => img.style.display = "none"
                });
                miniPreview.appendChild(img);
            });
            card.appendChild(miniPreview);

            // Naming Row (Input instead of static text)
            const header = element("div", { className: "loadout-header" });
            const inputHandle = Input({
                value: loadout.name,
                placeholder: "Unnamed Outfit",
                mode: "alphanumeric",
                allowSpaces: true,
                maxLength: 24,
                blockGameKeys: true,
                onChange: (val) => {
                    MGAvatarLoadouts.rename(loadout.id, val);
                }
            });
            // Extra key blocking: stop propagation directly on input to prevent game hotkeys
            // This is needed because game's key handlers may be added before Gemini's soft block
            inputHandle.input.addEventListener("keydown", (e) => e.stopPropagation(), true);
            inputHandle.input.addEventListener("keyup", (e) => e.stopPropagation(), true);
            inputHandle.input.addEventListener("keypress", (e) => e.stopPropagation(), true);
            inputHandle.root.classList.add("loadout-name-input");
            header.appendChild(inputHandle.root);

            const delBtn = element("div", {
                className: "icon-btn",
                onclick: (e) => {
                    e.stopPropagation();
                    if (confirm(`Delete this outfit?`)) MGAvatarLoadouts.delete(loadout.id);
                }
            }, "🗑️");
            header.appendChild(delBtn);
            card.appendChild(header);

            const wearBtn = Button({
                label: "Wear", size: "sm", fullWidth: true,
                onClick: async () => {
                    wearBtn.setLoading(true);
                    await MGAvatarLoadouts.wear(loadout.id);
                    this.previewOutfit = {
                        top: loadout.top,
                        mid: loadout.mid,
                        bottom: loadout.bottom,
                        expression: loadout.expression
                    };
                    this.updatePreview();
                    wearBtn.setLoading(false);
                }
            });
            card.appendChild(wearBtn);
            this.loadoutsContainer!.appendChild(card);
        });
    }

    private async handleSaveCurrent() {
        // Save current outfit with an empty name, will show up as placeholder in the grid
        const id = await MGAvatarLoadouts.save("", this.previewOutfit);
        // The subscription to Loadouts will trigger renderLoadouts()
        // We can find the input and focus it after a small delay to ensure DOM is ready
        setTimeout(() => {
            if (!this.loadoutsContainer) return;
            // Find the last card (newly added) and its input
            const cards = this.loadoutsContainer.querySelectorAll(".loadout-card");
            const lastCard = cards[cards.length - 1];
            const input = lastCard?.querySelector("input") as HTMLInputElement | null;
            if (input) {
                input.focus();
                input.select();
            }
        }, 100);
    }

    public async destroy(): Promise<void> {
        this.cleanups.forEach(fn => fn());
        this.cleanups = [];
        super.destroy();
    }
}
