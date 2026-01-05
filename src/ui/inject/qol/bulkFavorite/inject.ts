/**
 * BulkFavorite QOL Injection - DOM Injection Logic
 *
 * Per ui/ui.inject.md:
 * - Injection features must NOT render Shadow DOM
 * - Inject via <style> element with cleanup
 * - All event listeners must be tracked and removed on destroy
 *
 * Design based on QPM's bulk favorite sidebar with species buttons
 * Mobile: dual horizontal rows (top + bottom of inventory)
 * Unbreakability: Uses activeModalAtom state instead of brittle text checks
 */

import { onAdded, onRemoved } from '../../../../utils/dom';
import { element } from '../../../styles/helpers';
import { bulkFavoriteInjectCss } from './styles.css';
import * as CONFIG from './config';
import { createSpeciesButton } from './helpers';
import { loadConfig } from '../../../../features/bulkFavorite/state';
import { G_MyInventory } from '../../../../globals';
import { toggleFavoriteItem } from '../../../../websocket/api';
import { activeModalAtom } from '../../../../atoms/atoms';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface ProduceGroup {
    species: string;
    itemIds: string[];
    allFavorited: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let sidebar: HTMLDivElement | null = null;
let topRow: HTMLDivElement | null = null;
let bottomRow: HTMLDivElement | null = null;
let stylesInjected = false;
let currentPanel: Element | null = null;
let isInventoryOpen = false;

let currentInventorySub: (() => void) | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Cleanup Tracking (per ui.inject.md pattern)
// ─────────────────────────────────────────────────────────────────────────────

const cleanups: (() => void)[] = [];

function addCleanup(fn: () => void): void {
    cleanups.push(fn);
}

function runCleanups(): void {
    for (const fn of cleanups) {
        try {
            fn();
        } catch (e) {
            console.warn('[BulkFavorite] Cleanup error:', e);
        }
    }
    cleanups.length = 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilities
// ─────────────────────────────────────────────────────────────────────────────

function isMobile(): boolean {
    return window.innerWidth <= CONFIG.LAYOUT_BREAKPOINT_MOBILE;
}

function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ─────────────────────────────────────────────────────────────────────────────
// Style Injection
// ─────────────────────────────────────────────────────────────────────────────

function ensureStyles(): void {
    if (stylesInjected) return;
    if (document.getElementById(CONFIG.STYLE_ID)) {
        stylesInjected = true;
        return;
    }

    const styleEl = document.createElement('style');
    styleEl.id = CONFIG.STYLE_ID;
    styleEl.textContent = bulkFavoriteInjectCss;
    document.head.appendChild(styleEl);
    stylesInjected = true;
}

function removeStyles(): void {
    const styleEl = document.getElementById(CONFIG.STYLE_ID);
    styleEl?.remove();
    stylesInjected = false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Inventory Helpers
// ─────────────────────────────────────────────────────────────────────────────

function getProduceGroups(): ProduceGroup[] {
    const inventory = G_MyInventory().get();
    if (!inventory?.items) return [];

    const favoritedIds = new Set(inventory.favoritedItemIds ?? []);
    const groupMap = new Map<string, string[]>();

    for (const item of inventory.items) {
        const raw = item as Record<string, unknown>;
        if (raw.itemType !== 'Produce') continue;

        const species = raw.species as string | undefined;
        const id = raw.id as string | undefined;
        if (!species || !id) continue;

        const existing = groupMap.get(species);
        if (existing) {
            existing.push(id);
        } else {
            groupMap.set(species, [id]);
        }
    }

    const groups: ProduceGroup[] = [];
    for (const [species, itemIds] of groupMap) {
        const allFavorited = itemIds.length > 0 && itemIds.every(id => favoritedIds.has(id));
        groups.push({ species, itemIds, allFavorited });
    }

    groups.sort((a, b) => a.species.localeCompare(b.species));
    return groups;
}

// ─────────────────────────────────────────────────────────────────────────────
// Toggle Logic
// ─────────────────────────────────────────────────────────────────────────────

async function handleToggle(species: string): Promise<void> {
    const inventory = G_MyInventory().get();
    if (!inventory?.items) return;

    const favoritedIds = new Set(inventory.favoritedItemIds ?? []);

    const speciesItems: { id: string; favorited: boolean }[] = [];
    for (const item of inventory.items) {
        const raw = item as Record<string, unknown>;
        if (raw.itemType !== 'Produce') continue;
        if (raw.species !== species) continue;

        const id = raw.id as string | undefined;
        if (!id) continue;

        speciesItems.push({
            id,
            favorited: favoritedIds.has(id)
        });
    }

    if (speciesItems.length === 0) return;

    const allFavorited = speciesItems.every(item => item.favorited);
    const itemsToToggle = allFavorited
        ? speciesItems.filter(item => item.favorited)
        : speciesItems.filter(item => !item.favorited);

    console.log(`🔄 [BulkFavorite] ${allFavorited ? 'Unfavoriting' : 'Favoriting'} ${itemsToToggle.length}/${speciesItems.length} ${species}`);

    for (const item of itemsToToggle) {
        toggleFavoriteItem(item.id);
        await delay(CONFIG.DELAY_BETWEEN_TOGGLES);
    }

    // UI will update reactively via subscribeFavorites
}

// ─────────────────────────────────────────────────────────────────────────────
// Button Creation
// ─────────────────────────────────────────────────────────────────────────────

function createButton(group: ProduceGroup, mobile: boolean): HTMLButtonElement {
    const { species, itemIds, allFavorited } = group;

    return createSpeciesButton({
        species,
        itemCount: itemIds.length,
        isFavorited: allFavorited,
        isMobile: mobile,
        onClick: () => handleToggle(species),
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop & Mobile Layout
// ─────────────────────────────────────────────────────────────────────────────

function createDesktopSidebar(container: Element): HTMLDivElement {
    const sidebarEl = element('div', { id: CONFIG.SIDEBAR_ID }) as HTMLDivElement;
    const rect = container.getBoundingClientRect();

    const maxHeight = Math.max(
        window.innerHeight - CONFIG.SIDEBAR_MAX_HEIGHT_OFFSET,
        CONFIG.SIDEBAR_MIN_HEIGHT
    );
    sidebarEl.style.maxHeight = `${maxHeight}px`;

    // Use fixed positioning relative to modal (append to body to avoid overflow:hidden clipping)
    sidebarEl.style.position = 'fixed';
    sidebarEl.style.left = `${rect.right + CONFIG.SIDEBAR_MARGIN}px`;
    sidebarEl.style.top = `${rect.top}px`;

    return sidebarEl;
}

function createMobileRow(id: string, container: Element, position: 'top' | 'bottom'): HTMLDivElement {
    const row = element('div', {
        id,
        className: 'gemini-qol-bulkFavorite-row'
    }) as HTMLDivElement;

    const rect = container.getBoundingClientRect();

    if (position === 'top') {
        row.style.bottom = `${window.innerHeight - rect.top + CONFIG.GAP_MOBILE}px`;
    } else {
        row.style.top = `${rect.bottom + CONFIG.GAP_MOBILE}px`;
    }

    row.style.left = `${rect.left}px`;
    row.style.maxWidth = `${rect.width}px`;
    return row;
}

function renderUI(): void {
    const groups = getProduceGroups();
    const mobile = isMobile();

    if (mobile) {
        renderMobileUI(groups);
    } else {
        renderDesktopUI(groups);
    }
}

function renderDesktopUI(groups: ProduceGroup[]): void {
    if (!sidebar) return;
    sidebar.innerHTML = '';
    if (groups.length === 0) {
        sidebar.style.display = 'none';
        return;
    }
    sidebar.style.display = 'flex';
    for (const group of groups) {
        sidebar.appendChild(createButton(group, false));
    }
    console.log(`🎯 [BulkFavorite] Desktop: Rendered ${groups.length} produce types`);
}

function renderMobileUI(groups: ProduceGroup[]): void {
    if (!topRow || !bottomRow) return;
    topRow.innerHTML = '';
    bottomRow.innerHTML = '';

    if (groups.length === 0) {
        topRow.style.display = 'none';
        bottomRow.style.display = 'none';
        return;
    }

    topRow.style.display = 'flex';
    const topGroups = groups.slice(0, CONFIG.MOBILE_MAX_BUTTONS_PER_ROW);
    const bottomGroups = groups.slice(CONFIG.MOBILE_MAX_BUTTONS_PER_ROW);

    for (const group of topGroups) {
        topRow.appendChild(createButton(group, true));
    }

    if (bottomGroups.length > 0) {
        bottomRow.style.display = 'flex';
        for (const group of bottomGroups) {
            bottomRow.appendChild(createButton(group, true));
        }
    } else {
        bottomRow.style.display = 'none';
    }
    console.log(`🎯 [BulkFavorite] Mobile: Rendered ${groups.length} types`);
}

/**
 * Find the inventory modal content container
 * Searches for a bounded content panel within .McGrid
 */
function findInventoryContainer(): HTMLElement | null {
    const mcGrid = document.querySelector('.McGrid');
    if (!mcGrid) {
        console.log('⚠️ [BulkFavorite] No .McGrid found');
        return null;
    }

    const gridRect = mcGrid.getBoundingClientRect();
    const isMobile = window.innerWidth <= CONFIG.LAYOUT_BREAKPOINT_MOBILE;

    // On mobile, the inventory is full-width - use McGrid directly
    if (isMobile) {
        console.log(`🎯 [BulkFavorite] Mobile mode - using McGrid: ${Math.round(gridRect.width)}x${Math.round(gridRect.height)}`);
        return mcGrid as HTMLElement;
    }

    // On desktop, find the bounded inventory content panel
    // Look for an element that:
    // 1. Is roughly centered horizontally
    // 2. Has bounded dimensions (not full-screen)
    // 3. Has significant area (the main content, not a button)

    const viewportCenter = window.innerWidth / 2;
    let bestMatch: HTMLElement | null = null;
    let bestScore = 0;

    // Search all descendants, not just direct children
    const candidates = mcGrid.querySelectorAll('.McFlex, .McGrid');

    for (const el of candidates) {
        const rect = el.getBoundingClientRect();
        if (rect.width < 200 || rect.height < 200) continue; // Too small
        if (rect.width > window.innerWidth - 100) continue; // Too wide (full-screen)

        // Score based on: area, centeredness, and reasonable proportions
        const centerX = rect.left + rect.width / 2;
        const centeredness = 1 - Math.abs(centerX - viewportCenter) / viewportCenter;
        const area = rect.width * rect.height;
        const score = area * centeredness;

        if (score > bestScore) {
            bestMatch = el as HTMLElement;
            bestScore = score;
        }
    }

    if (bestMatch) {
        const r = bestMatch.getBoundingClientRect();
        console.log(`🎯 [BulkFavorite] Found desktop container: ${Math.round(r.width)}x${Math.round(r.height)} @ (${Math.round(r.left)}, ${Math.round(r.top)})`);
        return bestMatch;
    }

    // Fallback to McGrid
    console.log(`🎯 [BulkFavorite] Fallback to McGrid: ${Math.round(gridRect.width)}x${Math.round(gridRect.height)}`);
    return mcGrid as HTMLElement;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

let renderTimeout: ReturnType<typeof setTimeout> | null = null;

export function renderButton(): void {
    // Debounce rendering to prevent flickering
    if (renderTimeout) {
        clearTimeout(renderTimeout);
    }

    renderTimeout = setTimeout(() => {
        _renderButtonInternal();
    }, CONFIG.DEBOUNCE_RENDER);
}

function _renderButtonInternal(): void {
    // Find the modal container
    const targetEl = findInventoryContainer();
    if (!targetEl) {
        // Modal not ready yet, will be triggered again when it appears
        return;
    }

    console.log(`🎯 [BulkFavorite] Found inventory modal container`);

    removeSidebar();
    ensureStyles();

    currentPanel = targetEl;
    const mobile = isMobile();

    if (mobile) {
        topRow = createMobileRow(CONFIG.MOBILE_TOP_ROW_ID, targetEl, 'top');
        bottomRow = createMobileRow(CONFIG.MOBILE_BOTTOM_ROW_ID, targetEl, 'bottom');
        document.body.appendChild(topRow);
        document.body.appendChild(bottomRow);
    } else {
        sidebar = createDesktopSidebar(targetEl);
        // Append to body to avoid overflow:hidden clipping from modal container
        document.body.appendChild(sidebar);
    }

    renderUI();

    // Subscribe to inventory changes for reactive UI updates
    if (currentInventorySub) {
        currentInventorySub();
    }
    currentInventorySub = G_MyInventory().subscribeFavorites(() => {
        if (isInventoryOpen) {
            renderUI();
        }
    });
}

export function removeSidebar(): void {
    if (renderTimeout) {
        clearTimeout(renderTimeout);
        renderTimeout = null;
    }

    if (currentInventorySub) {
        currentInventorySub();
        currentInventorySub = null;
    }

    sidebar?.remove();
    sidebar = null;
    topRow?.remove();
    topRow = null;
    bottomRow?.remove();
    bottomRow = null;
    currentPanel = null;
}

export function removeButton(): void {
    removeSidebar();
}

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export async function startWatching(): Promise<void> {
    const config = loadConfig();
    if (!config.enabled) {
        console.log('⚠️ [BulkFavorite] Feature disabled');
        return;
    }
    ensureStyles();

    // Subscribe to modal state
    const unsubState = await activeModalAtom.onChangeNow((modal) => {
        const isOpen = modal === 'inventory';

        if (isOpen !== isInventoryOpen) {
            isInventoryOpen = isOpen;
            if (isOpen) {
                renderButton();
            } else {
                removeSidebar();
            }
        }
    });

    // Watch for McGrid appearing (in case DOM renders after state change)
    const unwatchGrid = onAdded('.McGrid', () => {
        if (!isInventoryOpen) return;
        if (sidebar || topRow) return; // Already rendered
        renderButton();
    });

    // Watch for modal removal
    const unwatchRemove = onRemoved('.McGrid', (el) => {
        if (currentPanel && currentPanel === el) {
            removeSidebar();
        }
    });

    // Register lifecycle cleanups
    addCleanup(() => unsubState());
    addCleanup(() => unwatchGrid.disconnect());
    addCleanup(() => unwatchRemove.disconnect());
    addCleanup(() => {
        removeSidebar();
        isInventoryOpen = false;
        currentPanel = null;
    });

    console.log('✅ [BulkFavorite] Started (State-driven + DOM observation)');
}

export function stopWatching(): void {
    runCleanups();
    removeStyles();
    console.log('🛑 [BulkFavorite] Stopped');
}

export function setEnabled(enabled: boolean): void {
    const config = loadConfig();
    config.enabled = enabled;
    enabled ? startWatching() : stopWatching();
}
