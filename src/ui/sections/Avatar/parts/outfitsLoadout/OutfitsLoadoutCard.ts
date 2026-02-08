/**
 * Outfits Loadout Card Part
 * Displays saved avatar outfits; click applies them via the Avatar module.
 */

import { Card } from "../../../../components/Card/Card";
import { element } from "../../../../styles/helpers";
import { MGAvatarLoadouts } from "../../../../../modules/cosmetic/avatar/logic/loadouts";
import type { AvatarLoadout } from "../../../../../modules/cosmetic/avatar/logic/loadouts";
import { Avatar } from "../../../../../modules/cosmetic/avatar";
import { getAssetBaseUrl } from "../../../../../modules/cosmetic/avatar/logic/query";
import { outfitsLoadoutCardCss } from "./outfitsLoadoutCard.css";

const LONG_PRESS_DELAY_MS = 500;
const LONG_PRESS_MOVE_TOLERANCE_PX = 10;
const SUPPRESS_CLICK_TIMEOUT_MS = 800;

/* ─────────────────────────── Types ─────────────────────────── */

export interface OutfitsLoadoutListOptions {
    /** Called when an outfit is selected. Defaults to Avatar.set() if not provided. */
    onApply?: (loadout: AvatarLoadout) => void;
    /** "carousel" = horizontal scroll (default), "grid" = vertical wrap with max 3 rows */
    layout?: "carousel" | "grid";
}

export interface OutfitsLoadoutOptions extends OutfitsLoadoutListOptions {
    title?: string;
    defaultExpanded?: boolean;
    onExpandChange?: (expanded: boolean) => void;
    /** Show interaction hint at the bottom of the card */
    showHint?: boolean;
}

export interface OutfitsLoadoutHandle {
    root: HTMLElement;
    destroy(): void;
}

/* ─────────────────────────── List (no Card wrapper) ─────────────────────────── */

export function createOutfitsLoadoutList(options: OutfitsLoadoutListOptions = {}): OutfitsLoadoutHandle {
    const { onApply, layout = "carousel" } = options;
    let listEl: HTMLDivElement | null = null;

    function renderList(): void {
        if (!listEl) return;
        listEl.innerHTML = "";

        const loadouts = MGAvatarLoadouts.get();

        if (loadouts.length === 0) {
            listEl.appendChild(element("div", { className: "outfits-loadout-empty" }, "No saved outfits yet."));
            return;
        }

        const baseUrl = getAssetBaseUrl();

        if (layout === "grid") {
            const grid = element("div", { className: "outfits-loadout-grid" }) as HTMLDivElement;
            loadouts.forEach(loadout => {
                grid.appendChild(createOutfitCard(loadout, baseUrl));
            });
            listEl.appendChild(grid);
        } else {
            const carousel = element("div", { className: "outfits-loadout-carousel" }) as HTMLDivElement;
            loadouts.forEach(loadout => {
                carousel.appendChild(createOutfitCard(loadout, baseUrl));
            });
            attachDragScroll(carousel);
            listEl.appendChild(carousel);
        }
    }

    function createOutfitCard(loadout: AvatarLoadout, baseUrl: string): HTMLElement {
        const card = element("div", { className: "outfits-loadout-card" }) as HTMLDivElement;

        let suppressClick = false;
        let suppressTimer: ReturnType<typeof setTimeout> | null = null;

        const deleteThis = () => {
            suppressClick = true;
            if (suppressTimer) clearTimeout(suppressTimer);
            suppressTimer = setTimeout(() => { suppressClick = false; }, SUPPRESS_CLICK_TIMEOUT_MS);
            MGAvatarLoadouts.delete(loadout.id);
        };

        // Click to select outfit
        card.addEventListener("click", () => {
            if (suppressClick) return;
            if (onApply) {
                onApply(loadout);
            } else {
                void Avatar.set({
                    top: loadout.top,
                    mid: loadout.mid,
                    bottom: loadout.bottom,
                    expression: loadout.expression,
                });
            }
        });

        // Right-click to delete (desktop)
        card.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            e.stopPropagation();
            deleteThis();
        });

        // Long-press to delete (mobile)
        let longPressTimer: ReturnType<typeof setTimeout> | null = null;
        let longPressStart: { x: number; y: number } | null = null;
        let longPressTriggered = false;

        const clearLongPress = () => {
            if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
            longPressStart = null;
            longPressTriggered = false;
        };

        card.addEventListener("pointerdown", (e) => {
            if (e.pointerType === "mouse") return;
            if (e.button !== 0) return;
            clearLongPress();
            longPressStart = { x: e.clientX, y: e.clientY };
            longPressTimer = setTimeout(() => {
                longPressTimer = null;
                if (!longPressStart) return;
                longPressTriggered = true;
                deleteThis();
            }, LONG_PRESS_DELAY_MS);
        });

        card.addEventListener("pointermove", (e) => {
            if (!longPressStart || longPressTriggered) return;
            const dx = e.clientX - longPressStart.x;
            const dy = e.clientY - longPressStart.y;
            if (dx * dx + dy * dy > LONG_PRESS_MOVE_TOLERANCE_PX * LONG_PRESS_MOVE_TOLERANCE_PX) {
                clearLongPress();
            }
        });

        card.addEventListener("pointerup", clearLongPress);
        card.addEventListener("pointercancel", clearLongPress);

        // Mini preview (stacked layers)
        const preview = element("div", { className: "outfits-loadout-preview" });
        const layers = [loadout.bottom, loadout.mid, loadout.top, loadout.expression];
        layers.forEach((filename, index) => {
            if (!filename || filename.includes("_Blank")) return;
            const img = element("img", {
                className: "outfits-loadout-layer",
                style: { zIndex: String(index + 1) },
            }) as HTMLImageElement;
            img.src = `${baseUrl}${filename}`;
            img.onerror = () => img.remove();
            preview.appendChild(img);
        });
        card.appendChild(preview);

        return card;
    }

    function attachDragScroll(el: HTMLDivElement): void {
        let isDragging = false;
        let startX = 0;
        let scrollLeft = 0;

        const onDown = (e: MouseEvent | TouchEvent) => {
            isDragging = true;
            startX = ("touches" in e ? e.touches[0].clientX : e.clientX) - el.offsetLeft;
            scrollLeft = el.scrollLeft;
        };

        const onMove = (e: MouseEvent | TouchEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = ("touches" in e ? e.touches[0].clientX : e.clientX) - el.offsetLeft;
            el.scrollLeft = scrollLeft - (x - startX);
        };

        const onUp = () => { isDragging = false; };

        el.addEventListener("mousedown", onDown);
        el.addEventListener("touchstart", onDown, { passive: true });
        el.addEventListener("mousemove", onMove);
        el.addEventListener("touchmove", onMove, { passive: false });
        el.addEventListener("mouseup", onUp);
        el.addEventListener("mouseleave", onUp);
        el.addEventListener("touchend", onUp);
    }

    // Inject styles + build root
    const styleEl = element("style") as HTMLStyleElement;
    styleEl.textContent = outfitsLoadoutCardCss;

    listEl = element("div") as HTMLDivElement;
    renderList();

    const root = element("div") as HTMLDivElement;
    root.appendChild(styleEl);
    root.appendChild(listEl);

    const unsub = MGAvatarLoadouts.subscribe(() => renderList());

    return {
        root,
        destroy() {
            unsub();
            listEl = null;
        },
    };
}

/* ─────────────────────────── Card (with Card wrapper) ─────────────────────────── */

export function createOutfitsLoadoutCard(options: OutfitsLoadoutOptions = {}): OutfitsLoadoutHandle {
    const { title = "Outfits", defaultExpanded = true, onExpandChange, onApply, layout, showHint = false } = options;

    const list = createOutfitsLoadoutList({ onApply, layout });

    const root = Card({
        title,
        variant: "soft",
        expandable: true,
        defaultExpanded,
        onExpandChange,
    });

    const body = root.querySelector(".card-body");
    if (body) {
        body.appendChild(list.root);

        if (showHint) {
            const hint = element("div", { className: "outfits-loadout-hint" });
            hint.innerHTML = `
                <span class="outfits-loadout-hint__desktop">Click to apply · Right-click to delete</span>
                <span class="outfits-loadout-hint__mobile">Tap to apply · Hold to delete</span>
            `;
            body.appendChild(hint);
        }
    }

    return {
        root,
        destroy: () => list.destroy(),
    };
}
