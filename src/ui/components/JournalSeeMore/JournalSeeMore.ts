/**
 * JournalSeeMore Component
 * Expandable "See more" link for Journal category lists
 * 
 * Per .claude/rules/ui/components.md:
 * - Logic file: JournalSeeMore.ts
 * - Style file: journalSeeMore.css.ts
 */

import { element } from "../../styles/helpers";

export { journalSeeMoreCss } from './journalSeeMore.css';

export interface JournalSeeMoreOptions {
    /** Number of additional items */
    count: number;
    /** Whether currently expanded */
    expanded?: boolean;
    /** Click handler */
    onClick?: () => void;
}

export interface JournalSeeMoreHandle extends HTMLDivElement {
    setCount: (count: number) => void;
    setExpanded: (expanded: boolean) => void;
}

/**
 * Creates an expandable "See more" link for Journal lists
 */
export function JournalSeeMore(opts: JournalSeeMoreOptions): JournalSeeMoreHandle {
    const { count, expanded = false, onClick } = opts;

    const container = element("div", {
        className: "journal-see-more"
    }) as HTMLDivElement;

    const link = element("span", {
        className: "journal-see-more-link"
    }, getLabel(count, expanded)) as HTMLSpanElement;

    if (onClick) {
        link.addEventListener('click', onClick);
    }

    container.appendChild(link);

    // Handle API
    const handle = container as JournalSeeMoreHandle;

    handle.setCount = (newCount: number) => {
        link.textContent = getLabel(newCount, expanded);
    };

    handle.setExpanded = (isExpanded: boolean) => {
        link.textContent = getLabel(count, isExpanded);
    };

    return handle;
}

function getLabel(count: number, expanded: boolean): string {
    if (expanded) {
        return "− Show less";
    }
    return `+ and ${count} more...`;
}
