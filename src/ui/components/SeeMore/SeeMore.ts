/**
 * SeeMore Component
 * Expandable "See more" link for category lists
 * 
 * Per .claude/rules/ui/components.md:
 * - Logic file: SeeMore.ts
 * - Style file: seeMore.css.ts
 */

import { element } from "../../styles/helpers";
import { seeMoreCss } from './seeMore.css';

export { seeMoreCss };

export interface SeeMoreOptions {
    /** Number of additional items */
    count: number;
    /** Whether currently expanded */
    expanded?: boolean;
    /** Click handler */
    onClick?: () => void;
}

export interface SeeMoreHandle extends HTMLDivElement {
    setCount: (count: number) => void;
    setExpanded: (expanded: boolean) => void;
}

/**
 * Creates an expandable "See more" link for lists
 */
export function SeeMore(opts: SeeMoreOptions): SeeMoreHandle {
    const { count, expanded = false, onClick } = opts;

    const container = element("div", {
        className: "see-more"
    }) as HTMLDivElement;

    const link = element("span", {
        className: "see-more-link"
    }, getLabel(count, expanded)) as HTMLSpanElement;

    if (onClick) {
        link.addEventListener('click', onClick);
    }

    container.appendChild(link);

    // Handle API
    const handle = container as SeeMoreHandle;

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
