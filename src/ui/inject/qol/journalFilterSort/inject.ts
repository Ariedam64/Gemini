/**
 * Journal Filter/Sort - Core Logic
 * 
 * Provides filter (All/Missing/Collected) and sort (Default/Alphabetical/Progress)
 * functionality for journal species entries.
 * 
 * Per ui/inject.md: No Shadow DOM, tracked cleanup, idempotent
 */

import { createCleanupTracker, addObserverWithCleanup, isMutationGuarded, withMutationGuard } from '../../core/lifecycle';
import { findJournalModal, findScrollableSpeciesList } from '../_shared/dom';
import { onCustomTabChange } from '../_shared/tabState';

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export type FilterMode = 'all' | 'missing' | 'collected';
export type SortMode = 'default' | 'alphabetical' | 'progress';

interface FilterSortState {
    filter: FilterMode;
    sort: SortMode;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let tracker = createCleanupTracker();
let initialized = false;
let state: FilterSortState = { filter: 'all', sort: 'default' };
const CONTROLS_CLASS = 'gemini-journal-filterSort';
const LABEL_CLASS = `${CONTROLS_CLASS}__label`;
const LABEL_SORT_CLASS = `${CONTROLS_CLASS}__label--sort`;
const SELECT_CLASS = `${CONTROLS_CLASS}__select`;
const MODAL_CLASS = 'gemini-journal-modal';
let stylesInjected = false;

const FILTER_SORT_STYLES = `
    .${CONTROLS_CLASS} {
        display: flex;
        gap: 8px;
        padding: 6px 0;
        margin: 6px 0;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
    }

    .${LABEL_CLASS} {
        color: #A88A6B;
        font-size: 11px;
    }

    .${LABEL_SORT_CLASS} {
        margin-left: 8px;
    }

    .${SELECT_CLASS} {
        background: #D4C8B8;
        color: #3D3325;
        border: 1px solid #8B7355;
        border-radius: 4px;
        padding: 3px 6px;
        font-size: 10px;
        cursor: pointer;
        max-width: 45vw;
    }

    @media (max-width: 520px) {
        .${CONTROLS_CLASS} {
            gap: 6px;
            justify-content: flex-start;
            flex-direction: column;
            align-items: stretch;
        }

        .${LABEL_SORT_CLASS} {
            margin-left: 0;
        }

        .${LABEL_CLASS} {
            width: 100%;
        }

        .${SELECT_CLASS} {
            flex: 1 1 auto;
            width: 100%;
            max-width: 100%;
        }
    }

    @media (max-width: 360px) {
        .${SELECT_CLASS} {
            font-size: 9px;
        }
    }

    @media (max-width: 520px) {
        .${MODAL_CLASS} {
            max-width: calc(100vw - 16px) !important;
            width: calc(100vw - 16px) !important;
            left: 8px !important;
            right: 8px !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
        }
    }
`;

function ensureStyles(): void {
    if (stylesInjected) return;

    const style = document.createElement('style');
    style.id = 'gemini-journal-filterSort-styles';
    style.textContent = FILTER_SORT_STYLES;
    document.head.appendChild(style);

    tracker.add(() => style.remove());
    stylesInjected = true;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Detection - Game DOM Structure Aware
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/**
 * Find the overview page header containing "Collected X%"
 * Used to position filter/sort controls
 */
function findOverviewHeader(): HTMLElement | null {
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

/**
 * Find all species entry cards on the overview page
 * From game source: Direct McGrid children of the scrollable container
 * Each McGrid has: InventorySprite + McFlex (progress bar container)
 */
function findSpeciesEntries(): HTMLElement[] {
    const scrollable = findScrollableSpeciesList();
    if (!scrollable) return [];

    // Species entries are direct McGrid children of the scrollable container
    // These have cursor: pointer and contain the species name + progress
    const entries = Array.from(scrollable.querySelectorAll<HTMLElement>(':scope > .McGrid'));

    // Filter to only valid species entries (should have progress text like "5/11")
    return entries.filter(entry => {
        const text = entry.textContent ?? '';
        return text.match(/\d+\/\d+/) !== null;
    });
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// UI Creation
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function createControlsContainer(): HTMLElement {
    const container = document.createElement('div');
    container.className = CONTROLS_CLASS;

    // Filter dropdown
    const filterLabel = document.createElement('span');
    filterLabel.textContent = 'Filter:';
    filterLabel.className = LABEL_CLASS;

    const filterSelect = document.createElement('select');
    filterSelect.className = SELECT_CLASS;
    for (const [value, label] of [['all', 'All'], ['missing', 'Missing'], ['collected', 'Complete']]) {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = label;
        filterSelect.appendChild(opt);
    }
    filterSelect.value = state.filter;
    filterSelect.onchange = () => {
        state.filter = filterSelect.value as FilterMode;
        withMutationGuard(() => applyFilterSort());
    };

    // Sort dropdown
    const sortLabel = document.createElement('span');
    sortLabel.textContent = 'Sort:';
    sortLabel.className = `${LABEL_CLASS} ${LABEL_SORT_CLASS}`;

    const sortSelect = document.createElement('select');
    sortSelect.className = SELECT_CLASS;
    for (const [value, label] of [['default', 'Default'], ['alphabetical', 'A-Z'], ['progress', 'By Progress']]) {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = label;
        sortSelect.appendChild(opt);
    }
    sortSelect.value = state.sort;
    sortSelect.onchange = () => {
        state.sort = sortSelect.value as SortMode;
        withMutationGuard(() => applyFilterSort());
    };

    container.append(filterLabel, filterSelect, sortLabel, sortSelect);

    return container;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Filter/Sort Logic
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

interface EntryInfo {
    el: HTMLElement;
    name: string;
    progress: number;
    originalOrder: number;
}

function parseEntryInfo(el: HTMLElement, index: number): EntryInfo | null {
    const texts = el.querySelectorAll('.chakra-text, p, span');
    let name = '';
    let progress = 0;

    for (const text of texts) {
        const content = text.textContent?.trim() ?? '';

        // Parse progress like "5/11"
        const progressMatch = content.match(/^(\d+)\/(\d+)$/);
        if (progressMatch) {
            const current = parseInt(progressMatch[1]);
            const total = parseInt(progressMatch[2]);
            progress = total > 0 ? (current / total) * 100 : 0;
            continue;
        }

        // Parse name (not "???", not percentage, reasonable length)
        if (content !== '???' && !content.includes('%') && content.length >= 2 && content.length <= 25) {
            name = content;
        }
    }

    if (!name && progress === 0) return null;

    return { el, name: name || '???', progress, originalOrder: index };
}

function applyFilterSort(): void {
    const entries = findSpeciesEntries();
    if (entries.length === 0) return;

    // Parse entry info
    const entryInfos: EntryInfo[] = [];
    entries.forEach((el, index) => {
        const info = parseEntryInfo(el, index);
        if (info) entryInfos.push(info);
    });

    if (entryInfos.length === 0) return;

    // Apply filter
    for (const info of entryInfos) {
        let visible = true;

        if (state.filter === 'missing') {
            visible = info.progress < 100;
        } else if (state.filter === 'collected') {
            visible = info.progress === 100;
        }

        info.el.style.display = visible ? '' : 'none';
    }

    // Apply sort using CSS order
    let sortedInfos: EntryInfo[];

    switch (state.sort) {
        case 'alphabetical':
            sortedInfos = [...entryInfos].sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'progress':
            sortedInfos = [...entryInfos].sort((a, b) => b.progress - a.progress);
            break;
        default:
            sortedInfos = [...entryInfos].sort((a, b) => a.originalOrder - b.originalOrder);
    }

    // Apply order
    sortedInfos.forEach((info, i) => {
        info.el.style.order = String(i);
    });
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Injection
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function injectControls(): void {
    // Check if already injected
    if (document.querySelector(`.${CONTROLS_CLASS}`)) {
        return;
    }

    const modal = findJournalModal();
    if (modal) {
        modal.classList.add(MODAL_CLASS);
        tracker.add(() => modal.classList.remove(MODAL_CLASS));
    }

    const header = findOverviewHeader();
    if (!header) {
        return;
    }

    // Find the parent flex container to insert after header
    const parent = header.closest('.McFlex');
    if (!parent) {
        return;
    }

    // Create and inject controls after the header's parent McFlex
    const controls = createControlsContainer();

    // Insert after the header element
    const nextSibling = header.nextElementSibling;
    if (nextSibling && header.parentElement) {
        header.parentElement.insertBefore(controls, nextSibling);
    } else if (header.parentElement) {
        header.parentElement.appendChild(controls);
    } else {
        return;
    }

    tracker.add(() => controls.remove());
}

function processPage(): void {
    withMutationGuard(() => {
        injectControls();
        applyFilterSort();
    });
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Observation
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let debounceTimer: number | null = null;

function debouncedProcessPage(): void {
    if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
    }
    debounceTimer = window.setTimeout(() => {
        if (!isMutationGuarded()) {
            processPage();
        }
        debounceTimer = null;
    }, 200); // Increased debounce for stability
}

function startObserving(): void {
    // Initial scan with delays for React rendering
    setTimeout(processPage, 100);
    setTimeout(processPage, 400);
    setTimeout(processPage, 800);

    // Watch for DOM changes with debouncing and mutation guard
    const observer = new MutationObserver(() => {
        if (isMutationGuarded()) return;
        debouncedProcessPage();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    addObserverWithCleanup(tracker, observer);

    // Hide controls when custom tabs (All/Guide) are active
    const unsubscribe = onCustomTabChange((tab) => {
        const controls = document.querySelector<HTMLElement>(`.${CONTROLS_CLASS}`);
        if (controls) {
            controls.style.display = tab ? 'none' : '';
        }
    });
    tracker.add(unsubscribe);

    // Cleanup debounce timer on destroy
    tracker.add(() => {
        if (debounceTimer !== null) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }
    });
}

function stopObserving(): void {
    // Reset state
    state = { filter: 'all', sort: 'default' };

    tracker.run();
    tracker.clear();
    tracker = createCleanupTracker();
    stylesInjected = false;
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export function init(): void {
    if (initialized) return;
    initialized = true;
    ensureStyles();
    startObserving();
    console.log('[JournalFilterSort] Initialized');
}

export function destroy(): void {
    if (!initialized) return;
    initialized = false;
    stopObserving();
    console.log('[JournalFilterSort] Destroyed');
}

export function isEnabled(): boolean {
    return initialized;
}




