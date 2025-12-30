/**
 * Game-Style Divider Component
 * Subtle horizontal line matching Magic Garden styling
 */

import { element } from "../../styles/helpers";

export interface DividerOptions {
    /** Optional margin override (default: 8px 0) */
    margin?: string;
    /** Optional color override */
    color?: string;
}

/**
 * Creates a subtle divider line matching game styling
 */
export function Divider(opts: DividerOptions = {}): HTMLDivElement {
    const { margin = "8px 0", color } = opts;

    return element("div", {
        className: "gemini-divider",
        style: `
      height: 1px;
      background: ${color || "var(--border, rgba(255,255,255,0.1))"};
      margin: ${margin};
      width: 100%;
    `.replace(/\s+/g, ' ').trim()
    }) as HTMLDivElement;
}
