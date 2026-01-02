/**
 * Game-Style Stat Row Component
 * Matches the Magic Garden stats panel layout
 * 
 * Per .claude/rules/ui/ui.components.md:
 * - Logic file: StatRow.ts
 * - Style file: statRow.css.ts
 * 
 * Usage:
 *   const row = StatRow({ label: "Seeds Planted", description: "Total seeds", value: "8,109" });
 */

import { element } from "../../styles/helpers";

// Re-export CSS for consumers that need to inject styles
export { statRowCss } from './statRow.css';

export interface StatRowOptions {
  /** Main label text (e.g., "Seeds Planted") */
  label: string;
  /** Optional description text below label */
  description?: string;
  /** Value to display on the right (string or number) */
  value: string | number;
  /** Optional ID for the row */
  id?: string;
}

export type StatRowHandle = HTMLDivElement & {
  setValue: (value: string | number) => void;
  setLabel: (label: string) => void;
  setDescription: (description?: string) => void;
};

/**
 * Creates a game-style stat row with label, optional description, and right-aligned value
 */
export function StatRow(opts: StatRowOptions): StatRowHandle {
  const { label, description, value, id } = opts;

  const row = element("div", {
    className: "gemini-stat-row",
    id
  }) as HTMLDivElement;

  // Left side: label + optional description
  const left = element("div", {
    className: "gemini-stat-row__left"
  }) as HTMLDivElement;

  const labelEl = element("span", {
    className: "gemini-stat-row__label"
  }, label) as HTMLSpanElement;
  left.appendChild(labelEl);

  let descEl: HTMLSpanElement | null = null;
  if (description) {
    descEl = element("span", {
      className: "gemini-stat-row__desc"
    }, description) as HTMLSpanElement;
    left.appendChild(descEl);
  }

  // Right side: value
  const valueStr = typeof value === "number" ? value.toLocaleString() : value;
  const valueEl = element("span", {
    className: "gemini-stat-row__value"
  }, valueStr) as HTMLSpanElement;

  row.appendChild(left);
  row.appendChild(valueEl);

  // Façade API
  const handle = row as StatRowHandle;

  handle.setValue = (val: string | number) => {
    valueEl.textContent = typeof val === "number" ? val.toLocaleString() : val;
  };

  handle.setLabel = (lbl: string) => {
    labelEl.textContent = lbl;
  };

  handle.setDescription = (desc?: string) => {
    if (desc) {
      if (descEl) {
        descEl.textContent = desc;
      } else {
        descEl = element("span", {
          className: "gemini-stat-row__desc"
        }, desc) as HTMLSpanElement;
        left.appendChild(descEl);
      }
    } else if (descEl) {
      descEl.remove();
      descEl = null;
    }
  };

  return handle;
}

/**
 * Creates a section title (e.g., "Player Stats")
 */
export function SectionTitle(text: string): HTMLDivElement {
  return element("div", {
    className: "gemini-section-title"
  }, text) as HTMLDivElement;
}

/**
 * Creates a group title (e.g., "Plants", "Pets")
 */
export function GroupTitle(text: string): HTMLDivElement {
  return element("div", {
    className: "gemini-group-title"
  }, text) as HTMLDivElement;
}
