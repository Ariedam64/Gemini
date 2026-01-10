/**
 * Tab Component
 * Game-authentic tab button for navigation
 * 
 * Per .claude/rules/ui/components.md:
 * - Logic file: Tab.ts
 * - Style file: tab.css.ts
 */

import { element } from "../../styles/helpers";
import { tabCss } from './tab.css';

export { tabCss };

export interface TabOptions {
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

export interface TabHandle extends HTMLButtonElement {
    setActive: (active: boolean) => void;
    setLabel: (label: string) => void;
}

/**
 * Creates a game-style tab button with customizable colors
 */
export function Tab(opts: TabOptions): TabHandle {
    const { label, tabId, tabIndex, active = false, onClick } = opts;

    const button = element("button", {
        className: `tab ${active ? 'active' : ''}`,
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
    const handle = button as TabHandle;

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
