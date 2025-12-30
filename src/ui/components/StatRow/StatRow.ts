/**
 * Game-Style Stat Row Component
 * Matches the Magic Garden stats panel layout
 * 
 * Usage:
 *   const row = StatRow({ label: "Seeds Planted", description: "Total seeds", value: "8,109" });
 */

import { element } from "../../styles/helpers";

export interface StatRowOptions {
    /** Main label text (e.g., "Seeds Planted") */
    label: string;
    /** Optional description text below label */
    description?: string;
    /** Value to display on the right (string or number) */
    value: string | number;
    /** Whether to format value as time (optional) */
    formatAsTime?: boolean;
}

/**
 * Creates a game-style stat row with label, optional description, and right-aligned value
 */
export function StatRow(opts: StatRowOptions): HTMLDivElement {
    const { label, description, value } = opts;

    const row = element("div", {
        className: "stat-row",
        style: `
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 6px 8px;
      border-radius: 8px;
      transition: background 0.2s ease;
      min-height: fit-content;
    `.replace(/\s+/g, ' ').trim()
    }) as HTMLDivElement;

    // Add hover effect
    row.addEventListener("mouseenter", () => {
        row.style.background = "rgba(255, 255, 255, 0.05)";
    });
    row.addEventListener("mouseleave", () => {
        row.style.background = "transparent";
    });

    // Left side: label + optional description
    const left = element("div", {
        style: `
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex: 1;
      min-width: 0;
    `.replace(/\s+/g, ' ').trim()
    }) as HTMLDivElement;

    const labelEl = element("span", {
        style: `
      color: var(--item-label, #F5F5F5);
      font-weight: 500;
      font-size: 14px;
      line-height: 1.3;
    `.replace(/\s+/g, ' ').trim()
    }, label) as HTMLSpanElement;
    left.appendChild(labelEl);

    if (description) {
        const descEl = element("span", {
            style: `
        color: var(--item-desc, rgba(255,255,255,0.6));
        font-size: 14px;
        line-height: 1.3;
        word-break: break-word;
      `.replace(/\s+/g, ' ').trim()
        }, description) as HTMLSpanElement;
        left.appendChild(descEl);
    }

    // Right side: value
    const valueStr = typeof value === "number" ? value.toLocaleString() : value;
    const valueEl = element("span", {
        style: `
      color: var(--item-value, #FFF27D);
      font-weight: 700;
      font-size: 16px;
      text-align: right;
      min-width: 60px;
      flex-shrink: 0;
    `.replace(/\s+/g, ' ').trim()
    }, valueStr) as HTMLSpanElement;

    row.appendChild(left);
    row.appendChild(valueEl);

    return row;
}

/**
 * Creates a section title (e.g., "Player Stats")
 */
export function SectionTitle(text: string): HTMLDivElement {
    return element("div", {
        style: `
      color: var(--section-title, #FFF27D);
      font-weight: 700;
      font-size: 18px;
      margin-bottom: 8px;
    `.replace(/\s+/g, ' ').trim()
    }, text) as HTMLDivElement;
}

/**
 * Creates a group title (e.g., "Plants", "Pets")
 */
export function GroupTitle(text: string): HTMLDivElement {
    return element("div", {
        style: `
      color: var(--group-title, #5EB292);
      font-weight: 700;
      font-size: 16px;
      margin-bottom: 4px;
    `.replace(/\s+/g, ' ').trim()
    }, text) as HTMLDivElement;
}
