/**
 * EggLockerCard Part
 * Grid of egg types with sprite + lock/unlock toggle per egg
 */

import { Card } from "../../../../components/Card/Card";
import { element } from "../../../../styles/helpers";
import { MGEggLocker } from "../../../../../features/eggLocker";
import { MGData, MGSprite } from "../../../../../modules";

/* ─────────────────────────── Types ─────────────────────────── */

export interface EggLockerCardOptions {
    defaultExpanded?: boolean;
    onExpandChange?: (expanded: boolean) => void;
}

export interface EggLockerCardHandle {
    root: HTMLDivElement;
    render(): void;
    destroy(): void;
}

/* ─────────────────────────── SVG Icons ─────────────────────────── */

function lockSvg(locked: boolean): SVGElement {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");

    svg.innerHTML = locked
        ? '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>'
        : '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>';

    return svg;
}

/* ─────────────────────────── Sprite Rendering ─────────────────────────── */

function renderEggSprite(eggId: string, container: HTMLElement, size: number): void {
    if (!MGSprite.isReady()) {
        container.appendChild(spritePlaceholder(size));
        return;
    }

    try {
        const eggsData = MGData.get("eggs") as Record<string, { spriteId?: string }> | null;
        const spriteId = eggsData?.[eggId]?.spriteId;

        if (!spriteId) {
            container.appendChild(spritePlaceholder(size));
            return;
        }

        const canvas = MGSprite.toCanvas(spriteId, {
            boundsMode: "padded",
        } as Parameters<typeof MGSprite.toCanvas>[1]);

        if (canvas) {
            canvas.style.maxWidth = `${size}px`;
            canvas.style.maxHeight = `${size}px`;
            canvas.style.width = "auto";
            canvas.style.height = "auto";
            canvas.style.display = "block";
            container.appendChild(canvas);
        } else {
            container.appendChild(spritePlaceholder(size));
        }
    } catch {
        container.appendChild(spritePlaceholder(size));
    }
}

function spritePlaceholder(size: number): HTMLElement {
    return element("div", {
        style: `width:${size}px;height:${size}px;background:color-mix(in oklab, var(--accent) 20%, transparent);border-radius:6px;`,
    });
}

/* ─────────────────────────── Factory ─────────────────────────── */

export function createEggLockerCard(options: EggLockerCardOptions = {}): EggLockerCardHandle {
    let content: HTMLDivElement | null = null;
    let card: HTMLDivElement | null = null;

    card = buildCard();

    /* ───────────────────── Build ───────────────────── */

    function buildCard(): HTMLDivElement {
        content = element("div", {
            className: "egg-locker-card__wrapper",
        }) as HTMLDivElement;

        renderEggGrid();

        return Card(
            {
                title: "Egg Hatching",
                subtitle: "Prevent hatching specific eggs",
                expandable: true,
                defaultExpanded: options.defaultExpanded ?? true,
                onExpandChange: options.onExpandChange,
            },
            content
        );
    }

    /* ───────────────────── Render ───────────────────── */

    function renderEggGrid(): void {
        if (!content) return;
        content.replaceChildren();

        const eggIds = MGEggLocker.getAvailableEggs();

        if (eggIds.length === 0) {
            content.appendChild(element("div", {
                className: "egg-locker-card__empty",
            }, "No eggs available"));
            return;
        }

        const blockedSet = new Set(MGEggLocker.getBlockedEggs());
        const eggsData = MGData.get("eggs") as Record<string, { name?: string }> | null;
        const grid = element("div", { className: "egg-locker-card__grid" });

        for (const eggId of eggIds) {
            const name = eggsData?.[eggId]?.name ?? eggId;
            grid.appendChild(createEggItem(eggId, blockedSet.has(eggId), name));
        }

        content.appendChild(grid);
    }

    function createEggItem(eggId: string, isLocked: boolean, name: string): HTMLElement {
        const item = element("div", {
            className: "egg-locker-item" + (isLocked ? " egg-locker-item--locked" : ""),
        });

        // Sprite
        const spriteWrap = element("div", { className: "egg-locker-item__sprite" });
        renderEggSprite(eggId, spriteWrap, 48);
        item.appendChild(spriteWrap);

        // Name
        item.appendChild(element("div", { className: "egg-locker-item__name" }, name));

        // Lock icon
        const lockIcon = element("div", {
            className: "egg-locker-item__lock" + (isLocked ? " egg-locker-item__lock--locked" : ""),
        });
        lockIcon.appendChild(lockSvg(isLocked));
        item.appendChild(lockIcon);

        item.addEventListener("click", () => {
            if (isLocked) {
                MGEggLocker.unblockEgg(eggId);
            } else {
                MGEggLocker.blockEgg(eggId);
            }
            renderEggGrid();
        });

        return item;
    }

    /* ───────────────────── Public API ───────────────────── */

    function render(): void {
        renderEggGrid();
    }

    function destroy(): void {
        content = null;
        card = null;
    }

    return {
        root: card,
        render,
        destroy,
    };
}

/* ─────────────────────────── Class Wrapper ─────────────────────────── */

export class EggLockerCardPart {
    private handle: EggLockerCardHandle | null = null;
    private options: EggLockerCardOptions;

    constructor(options: EggLockerCardOptions = {}) {
        this.options = options;
    }

    build(): HTMLDivElement {
        if (!this.handle) {
            this.handle = createEggLockerCard(this.options);
        }
        return this.handle.root;
    }

    render(): void {
        this.handle?.render();
    }

    destroy(): void {
        this.handle?.destroy();
        this.handle = null;
    }
}
