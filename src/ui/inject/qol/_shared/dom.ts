/**
 * Shared DOM helpers for journal QOL injections
 *
 * Extracted from journalAllTab and journalFilterSort to avoid duplication.
 */

/**
 * Find the journal modal by looking for GardenJournal.webp background image.
 * Uses computed styles since Chakra UI applies styles via CSS, not inline.
 */
export function findJournalModal(): HTMLElement | null {
    // Strategy 1: Look for elements with GardenJournal in computed background-image
    const boxes = document.querySelectorAll<HTMLElement>('.chakra-box, [class*="Box"], div');
    for (const el of boxes) {
        if (el.style.backgroundImage?.includes('GardenJournal')) {
            return el;
        }
        const computed = window.getComputedStyle(el);
        if (computed.backgroundImage?.includes('GardenJournal')) {
            return el;
        }
    }

    // Strategy 2: Find by looking for "GARDEN JOURNAL" text and walking up
    const textElements = document.querySelectorAll<HTMLElement>('.chakra-text, p, span');
    for (const el of textElements) {
        if (el.textContent?.includes('GARDEN JOURNAL')) {
            let parent = el.parentElement;
            for (let i = 0; i < 10 && parent; i++) {
                if (parent.classList.contains('McGrid') || parent.querySelector('.McGrid')) {
                    return parent;
                }
                parent = parent.parentElement;
            }
        }
    }

    return null;
}

/**
 * Check if we're currently on the journal page (modal is open).
 */
export function isJournalPage(): boolean {
    return findJournalModal() !== null;
}

/**
 * Find the scrollable species list (McFlex with overflowY: auto containing McGrid children).
 */
export function findScrollableSpeciesList(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const flexes = modal.querySelectorAll<HTMLElement>('.McFlex');
    for (const flex of flexes) {
        const computed = window.getComputedStyle(flex);
        if ((computed.overflowY === 'auto' || computed.overflowY === 'scroll') &&
            flex.querySelector(':scope > .McGrid')) {
            return flex;
        }
    }
    return null;
}
/**
 * Find the overview page header containing "Collected X%"
 */
export function findOverviewHeader(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const textElements = modal.querySelectorAll<HTMLElement>('.chakra-text, p, span');
    for (const el of textElements) {
        const text = el.textContent?.trim() ?? '';
        if (text.match(/Collected\s+\d+%/i)) {
            return el;
        }
    }
    return null;
}
