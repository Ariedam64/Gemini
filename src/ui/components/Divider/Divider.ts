/**
 * Game-Style Divider Component
 * Subtle horizontal line matching Magic Garden styling
 * 
 * Per .claude/rules/ui/ui.components.md:
 * - Logic file: Divider.ts
 * - Style file: divider.css.ts
 */

import { element } from "../../styles/helpers";

// Re-export CSS for consumers that need to inject styles
export { dividerCss } from './divider.css';

export type DividerVariant = 'default' | 'thick' | 'dashed' | 'vertical';

export interface DividerOptions {
    /** Optional margin override (default: uses CSS) */
    margin?: string;
    /** Optional color override (uses CSS variable if not set) */
    color?: string;
    /** Variant style */
    variant?: DividerVariant;
}

/**
 * Creates a subtle divider line matching game styling
 * @returns Divider element with façade API
 */
export function Divider(opts: DividerOptions = {}): HTMLDivElement {
    const { margin, color, variant = 'default' } = opts;

    const div = element("div", {
        className: "gemini-divider"
    }) as HTMLDivElement;

    // Add variant class if not default
    if (variant !== 'default') {
        div.classList.add(`gemini-divider--${variant}`);
    }

    // Apply overrides if provided
    if (margin) div.style.margin = margin;
    if (color) div.style.background = color;

    return div;
}
