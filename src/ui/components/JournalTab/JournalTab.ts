/**
 * JournalTab Component
 * Game-authentic tab button for Journal navigation
 * 
 * Per .claude/rules/ui/components.md:
 * - Logic file: JournalTab.ts
 * - Style file: journalTab.css.ts
 */

import { element } from "../../styles/helpers";

export { journalTabCss } from './journalTab.css';

export interface JournalTabOptions {
    /** Tab display label */
    label: string;
    /** Unique tab identifier */
    tabId: string;
    /** Tab slot index (1-5) for color variable */
    tabIndex: number;
    /** Whether tab is currently active */
    active?: boolean;
    /** Click handler */
    onClick?: () => void;
}

export interface JournalTabHandle extends HTMLButtonElement {
    setActive: (active: boolean) => void;
    setLabel: (label: string) => void;
}

/**
 * Creates a game-style tab button with customizable colors
 */
export function JournalTab(opts: JournalTabOptions): JournalTabHandle {
    const { label, tabId, tabIndex, active = false, onClick } = opts;

    const button = element("button", {
        className: `journal-tab ${active ? 'active' : ''}`,
        "data-tab": tabId,
        "data-tab-index": String(tabIndex)
    }, label) as HTMLButtonElement;

    // Apply tab color based on index
    const colorVar = `var(--journal-tab-${Math.min(5, Math.max(1, tabIndex))})`;
    button.style.setProperty('--tab-color', colorVar);

    if (onClick) {
        button.addEventListener('click', onClick);
    }

    // Handle API
    const handle = button as JournalTabHandle;

    handle.setActive = (isActive: boolean) => {
        if (isActive) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    };

    handle.setLabel = (lbl: string) => {
        button.textContent = lbl;
    };

    return handle;
}
