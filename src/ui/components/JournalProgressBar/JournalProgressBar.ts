/**
 * JournalProgressBar Component
 * Game-authentic progress bar for Journal Checker
 * 
 * Per .claude/rules/ui/components.md:
 * - Logic file: JournalProgressBar.ts
 * - Style file: journalProgressBar.css.ts
 */

import { element } from "../../styles/helpers";

export { journalProgressBarCss } from './journalProgressBar.css';

export interface JournalProgressBarOptions {
    /** Progress percentage (0-100) */
    percentage: number;
    /** Species/item name to display */
    label?: string;
    /** Pre-rendered sprite canvas */
    sprite?: HTMLCanvasElement;
    /** Optional ID for the row */
    id?: string;
}

export interface JournalProgressBarHandle extends HTMLDivElement {
    setPercentage: (value: number) => void;
    setLabel: (label: string) => void;
}

/**
 * Get the appropriate progress color based on percentage thresholds
 * Rainbow uses accent color with HSL rotation for gradient
 */
function getProgressStyle(percentage: number): { background: string; className: string } {
    if (percentage >= 100) {
        // Rainbow gradient computed from accent
        return {
            background: `linear-gradient(90deg, 
        var(--accent) 0%, 
        color-mix(in oklch, var(--accent), lime 40%) 25%, 
        color-mix(in oklch, var(--accent), cyan 40%) 50%, 
        color-mix(in oklch, var(--accent), blue 40%) 75%, 
        color-mix(in oklch, var(--accent), magenta 40%) 100%)`,
            className: 'journal-bar-rainbow'
        };
    }
    if (percentage >= 75) {
        return { background: 'var(--high)', className: '' };
    }
    if (percentage >= 25) {
        return { background: 'var(--medium)', className: '' };
    }
    return { background: 'var(--low)', className: '' };
}

/**
 * Creates a game-style progress bar row with sprite, label, and progress visualization
 */
export function JournalProgressBar(opts: JournalProgressBarOptions): JournalProgressBarHandle {
    const { percentage, label, sprite, id } = opts;

    const row = element("div", {
        className: "journal-progress-row",
        id
    }) as HTMLDivElement;

    // Sprite container
    const spriteContainer = element("div", {
        className: "journal-progress-sprite"
    }) as HTMLDivElement;

    if (sprite) {
        sprite.style.maxWidth = "32px";
        sprite.style.maxHeight = "32px";
        spriteContainer.appendChild(sprite);
    }

    // Progress bar section
    const barWrapper = element("div", {
        className: "journal-progress-bar-wrapper"
    }) as HTMLDivElement;

    // Label overlay
    const labelEl = element("span", {
        className: "journal-progress-label"
    }, label ?? "") as HTMLSpanElement;

    // Progress track
    const track = element("div", {
        className: "journal-progress-track"
    }) as HTMLDivElement;

    // Progress fill
    const clampedPct = Math.max(0, Math.min(100, percentage));
    const progressStyle = getProgressStyle(clampedPct);

    const fill = element("div", {
        className: `journal-progress-fill ${progressStyle.className}`.trim()
    }) as HTMLDivElement;
    fill.style.width = `${clampedPct}%`;
    fill.style.background = progressStyle.background;

    track.appendChild(fill);
    barWrapper.append(labelEl, track);

    // Percentage display
    const pctEl = element("span", {
        className: "journal-progress-pct"
    }, `${Math.floor(clampedPct)}%`) as HTMLSpanElement;

    row.append(spriteContainer, barWrapper, pctEl);

    // Handle API
    const handle = row as JournalProgressBarHandle;

    handle.setPercentage = (value: number) => {
        const clamped = Math.max(0, Math.min(100, value));
        const style = getProgressStyle(clamped);
        fill.style.width = `${clamped}%`;
        fill.style.background = style.background;
        fill.className = `journal-progress-fill ${style.className}`.trim();
        pctEl.textContent = `${Math.floor(clamped)}%`;
    };

    handle.setLabel = (lbl: string) => {
        labelEl.textContent = lbl;
    };

    return handle;
}
