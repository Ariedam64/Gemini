/**
 * Sprite Renderer Helpers
 * Unified sprite rendering for plants and mutations
 */

import { element } from "../../../../../styles/helpers";
import { MGData, MGSprite } from "../../../../../../modules";

/* ─────────────────────────── Types ─────────────────────────── */

export interface SpriteOptions {
    /** Max width/height in pixels */
    size: number;
    /** Mutations to apply (for plants) */
    mutations?: string[];
}

/* ─────────────────────────── Plant Sprites ─────────────────────────── */

/**
 * Render a plant sprite into a container
 * Uses crop spriteId from MGData
 */
export function renderPlantSprite(
    species: string,
    container: HTMLElement,
    options: SpriteOptions
): void {
    const { size, mutations } = options;

    if (!MGSprite.isReady()) {
        container.appendChild(createPlaceholder(size));
        return;
    }

    try {
        const plantsData = MGData.get("plants") as Record<string, unknown> | null;
        const plantInfo = plantsData?.[species] as { crop?: { spriteId?: string } } | undefined;
        const spriteId = plantInfo?.crop?.spriteId;

        if (!spriteId) {
            container.appendChild(createPlaceholder(size));
            return;
        }

        const canvas = MGSprite.toCanvas(spriteId, {
            mutations: mutations && mutations.length > 0 ? mutations : undefined,
            boundsMode: "padded",
        } as Parameters<typeof MGSprite.toCanvas>[1]);

        if (canvas) {
            applyCanvasStyles(canvas, size);
            container.appendChild(canvas);
        } else {
            container.appendChild(createPlaceholder(size));
        }
    } catch (error) {
        console.warn(`[SpriteRenderer] Failed to render plant sprite for ${species}:`, error);
        container.appendChild(createPlaceholder(size));
    }
}

/* ─────────────────────────── Mutation Sprites ─────────────────────────── */

/**
 * Render a mutation sprite into a container
 * Uses spriteId from MGData mutations
 */
export function renderMutationSprite(
    mutationId: string,
    container: HTMLElement,
    size: number
): void {
    if (!MGSprite.isReady()) {
        container.appendChild(createMutationPlaceholder(mutationId, size));
        return;
    }

    try {
        const mutationsData = MGData.get("mutations") as Record<string, unknown> | null;
        const mutationInfo = mutationsData?.[mutationId] as { spriteId?: string } | undefined;
        const spriteId = mutationInfo?.spriteId;

        if (!spriteId) {
            container.appendChild(createMutationPlaceholder(mutationId, size));
            return;
        }

        const canvas = MGSprite.toCanvas(spriteId, {
            boundsMode: "padded",
        } as Parameters<typeof MGSprite.toCanvas>[1]);

        if (canvas) {
            applyCanvasStyles(canvas, size);
            container.appendChild(canvas);
        } else {
            container.appendChild(createMutationPlaceholder(mutationId, size));
        }
    } catch (error) {
        console.warn(`[SpriteRenderer] Failed to render mutation sprite for ${mutationId}:`, error);
        container.appendChild(createMutationPlaceholder(mutationId, size));
    }
}

/* ─────────────────────────── Placeholders ─────────────────────────── */

/**
 * Create a generic placeholder element
 */
export function createPlaceholder(size: number): HTMLElement {
    return element("div", {
        style: `
            width: ${size}px;
            height: ${size}px;
            background: color-mix(in oklab, var(--accent) 20%, transparent);
            border-radius: 4px;
        `,
    });
}

/**
 * Create a "none" placeholder (dash symbol)
 */
export function createNonePlaceholder(size: number): HTMLElement {
    return element("div", {
        style: `
            width: ${size}px;
            height: ${size}px;
            background: linear-gradient(135deg, color-mix(in oklab, var(--fg) 8%, transparent) 0%, color-mix(in oklab, var(--fg) 15%, transparent) 100%);
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${Math.round(size * 0.56)}px;
            font-weight: 300;
            color: color-mix(in oklab, var(--fg) 40%, transparent);
        `,
    }, "—");
}

/**
 * Create a mutation-specific fallback placeholder
 */
function createMutationPlaceholder(mutationId: string, size: number): HTMLElement {
    // Color-specific fallbacks
    if (mutationId === "Gold") {
        return element("div", {
            style: `
                width: ${size}px;
                height: ${size}px;
                background: #FFD700;
                border-radius: 4px;
            `,
        });
    }

    if (mutationId === "Rainbow") {
        return element("div", {
            style: `
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(135deg, #ff0000 0%, #ff7700 16%, #ffff00 33%, #00ff00 50%, #0099ff 66%, #9966ff 83%, #ff0088 100%);
                border-radius: 4px;
            `,
        });
    }

    // Generic fallback
    return createPlaceholder(size);
}

/* ─────────────────────────── Helpers ─────────────────────────── */

/**
 * Apply standard styles to a canvas element
 */
function applyCanvasStyles(canvas: HTMLCanvasElement, maxSize: number): void {
    canvas.style.maxWidth = `${maxSize}px`;
    canvas.style.maxHeight = `${maxSize}px`;
    canvas.style.width = "auto";
    canvas.style.height = "auto";
    canvas.style.display = "block";
}
