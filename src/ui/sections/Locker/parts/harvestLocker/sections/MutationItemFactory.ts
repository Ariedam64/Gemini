/**
 * Mutation Item Factory
 * Creates selectable mutation items for color and weather sections
 */

import { element } from "../../../../../styles/helpers";
import { renderMutationSprite, createNonePlaceholder } from "../helpers";
import { getMutationDisplayName } from "../helpers";

/* ─────────────────────────── Types ─────────────────────────── */

export interface MutationItemOptions {
    /** Mutation ID or "none" */
    mutationId: string;
    /** Whether this item is currently selected */
    isSelected: boolean;
    /** Callback when clicked */
    onToggle: () => void;
    /** Sprite size in pixels */
    size?: number;
    /** Override the display label (defaults to getMutationDisplayName) */
    label?: string;
}

export interface MutationItemHandle {
    root: HTMLElement;
    /** Update the selected state visually */
    setSelected(selected: boolean): void;
    /** Grey out + block pointer events (used when "none" locks the other items) */
    setDisabled(disabled: boolean): void;
}

/* ─────────────────────────── Factory ─────────────────────────── */

const SPRITE_SIZE = 32;

/**
 * Create a mutation selection item with sprite and label
 */
export function createMutationItem(options: MutationItemOptions): MutationItemHandle {
    const { mutationId, isSelected: initialSelected, onToggle, size = SPRITE_SIZE } = options;

    let selected = initialSelected;
    let disabled = false;

    // Container
    const item = element("div", {
        style: `
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            padding: 8px;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.15s ease;
        `,
    });

    // Apply initial styles
    updateStyles();

    // Click handler
    item.addEventListener("click", onToggle);

    // Hover effects
    item.addEventListener("mouseenter", () => {
        if (!selected && !disabled) {
            item.style.background = "color-mix(in oklab, var(--fg) 10%, transparent)";
        }
    });

    item.addEventListener("mouseleave", () => {
        if (!selected && !disabled) {
            item.style.background = "color-mix(in oklab, var(--fg) 5%, transparent)";
        }
    });

    // Sprite container
    const spriteContainer = element("div", {
        style: "display: flex; align-items: center; justify-content: center;",
    });

    if (mutationId === "none") {
        spriteContainer.appendChild(createNonePlaceholder(size));
    } else {
        renderMutationSprite(mutationId, spriteContainer, size);
    }

    item.appendChild(spriteContainer);

    // Label
    const displayName = options.label ?? getMutationDisplayName(mutationId);
    const label = element("div", {
        style: `
            font-size: 10px;
            color: var(--fg);
            text-align: center;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 100%;
        `,
    }, displayName);
    item.appendChild(label);

    /* ───────────────────── Helpers ───────────────────── */

    function updateStyles(): void {
        if (selected) {
            item.style.background = "color-mix(in oklab, var(--accent) 20%, transparent)";
            item.style.border = "1px solid var(--accent)";
        } else {
            item.style.background = "color-mix(in oklab, var(--fg) 5%, transparent)";
            item.style.border = "1px solid color-mix(in oklab, var(--fg) 10%, transparent)";
        }
    }

    /* ───────────────────── Public API ───────────────────── */

    function setSelected(newSelected: boolean): void {
        selected = newSelected;
        updateStyles();
    }

    function setDisabled(newDisabled: boolean): void {
        disabled = newDisabled;
        item.style.opacity = disabled ? "0.35" : "1";
        item.style.pointerEvents = disabled ? "none" : "";
        item.style.cursor = disabled ? "default" : "pointer";
    }

    return {
        root: item,
        setSelected,
        setDisabled,
    };
}
