/**
 * Hover Effect Helper
 * Reusable hover effect factory for mutation items
 */

/* ─────────────────────────── Types ─────────────────────────── */

export interface HoverEffectOptions {
    /** Background when selected */
    selectedBg?: string;
    /** Background when not selected (default) */
    defaultBg?: string;
    /** Background when hovered (not selected) */
    hoverBg?: string;
}

const DEFAULT_OPTIONS: Required<HoverEffectOptions> = {
    selectedBg: "color-mix(in oklab, var(--accent) 20%, transparent)",
    defaultBg: "color-mix(in oklab, var(--fg) 5%, transparent)",
    hoverBg: "color-mix(in oklab, var(--fg) 10%, transparent)",
};

/* ─────────────────────────── Factory ─────────────────────────── */

/**
 * Apply hover effect to an element
 * Returns a cleanup function
 *
 * @param element - The element to apply hover effect to
 * @param isSelected - Function that returns whether the item is currently selected
 * @param options - Customization options for backgrounds
 * @returns Cleanup function to remove event listeners
 */
export function applyHoverEffect(
    element: HTMLElement,
    isSelected: () => boolean,
    options: HoverEffectOptions = {}
): () => void {
    const opts = { ...DEFAULT_OPTIONS, ...options };

    const handleMouseEnter = (): void => {
        if (!isSelected()) {
            element.style.background = opts.hoverBg;
        }
    };

    const handleMouseLeave = (): void => {
        if (!isSelected()) {
            element.style.background = opts.defaultBg;
        }
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
    };
}

/**
 * Apply simple hover effect (for items without selection state)
 */
export function applySimpleHoverEffect(
    element: HTMLElement,
    defaultBg: string,
    hoverBg: string
): () => void {
    const handleMouseEnter = (): void => {
        element.style.background = hoverBg;
    };

    const handleMouseLeave = (): void => {
        element.style.background = defaultBg;
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
    };
}
