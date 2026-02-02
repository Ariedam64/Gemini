/**
 * Journal All Tab - Injection Logic
 * 
 * Injects an "All" tab button into the journal modal that shows
 * a combined view of crops and pets with actual species entries and progress bars.
 * 
 * Per ui/inject.md: No Shadow DOM, tracked cleanup, idempotent
 */

import { createCleanupTracker, addObserverWithCleanup, isMutationGuarded, withMutationGuard } from '../../core/lifecycle';
import { findJournalModal, findOverviewHeader } from '../_shared/dom';
import { MGData, MGSprite } from '../../../../modules';
import { MGJournal } from '../../../../features/journal';
import type { SpeciesProgress } from '../../../../features/journal';
import { getDisplayName } from '../_shared/names';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

// Separate trackers for button (permanent) and content (temporary)
let buttonTracker = createCleanupTracker(); // Never cleared - button persists
let contentTracker = createCleanupTracker(); // Cleared on deactivate
let initialized = false;
let allTabActive = false;
const ALL_TAB_CLASS = 'gemini-journal-allTab';
const OVERLAY_CLASS = 'gemini-journal-allOverlay';

// Filter/Sort state
type FilterMode = 'all' | 'missing' | 'complete';
type SortMode = 'default' | 'az' | 'progress';
let filterMode: FilterMode = 'all';
let sortMode: SortMode = 'default';

// ─────────────────────────────────────────────────────────────────────────────
// Detection Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Find the tab container - looks for the parent of Crops/Pets buttons
 * Game structure: McGrid > McFlex (tabs) > Button > McFlex > MotionMcFlex (with "Crops" or "Pets" text)
 */
function findTabContainer(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const allElements = modal.querySelectorAll<HTMLElement>('.chakra-text, p, span');

    for (const el of allElements) {
        const text = el.textContent?.trim();
        if (text === 'Crops' || text === 'Pets') {
            const button = el.closest('button');
            if (button) {
                const container = button.parentElement;
                if (container) {
                    const buttons = container.querySelectorAll('button');
                    if (buttons.length >= 2) {
                        return container as HTMLElement;
                    }
                }
            }
        }
    }
    return null;
}

/**
 * Find existing tab buttons - Crops and Pets
 */
function findTabButtons(): { crops: HTMLButtonElement | null; pets: HTMLButtonElement | null } {
    const container = findTabContainer();
    if (!container) return { crops: null, pets: null };

    let crops: HTMLButtonElement | null = null;
    let pets: HTMLButtonElement | null = null;

    const buttons = container.querySelectorAll<HTMLButtonElement>('button');
    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        if (text === 'Crops') crops = btn;
        if (text === 'Pets') pets = btn;
    }

    return { crops, pets };
}

/**
 * Deactivate the native Crops/Pets tabs (retract them to 20px)
 * Called when All tab is activated
 */
function deactivateNativeTabs(): void {
    const { crops, pets } = findTabButtons();

    [crops, pets].forEach(btn => {
        if (!btn) return;
        // Find the inner tab element (MotionMcFlex or McFlex child)
        const tabInner = btn.querySelector('div');
        if (tabInner) {
            const innerTab = tabInner.querySelector('div');
            if (innerTab instanceof HTMLElement) {
                innerTab.style.height = '20px';
            }
        }
    });
}

/**
 * Find the content wrapper (McFlex with overflow:hidden that contains OverviewPage)
 * This is the second child of the main McGrid in the journal
 */
function findContentWrapper(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    // Find McGrid with template rows (main journal grid)
    const grids = modal.querySelectorAll<HTMLElement>('.McGrid');
    for (const grid of grids) {
        // Find the McFlex with overflow:hidden (content wrapper)
        const flexes = grid.querySelectorAll<HTMLElement>(':scope > .McFlex');
        for (const flex of flexes) {
            const computed = window.getComputedStyle(flex);
            if (computed.overflow === 'hidden' || computed.overflowY === 'hidden') {
                // Verify it contains journal content (text like "GARDEN JOURNAL" or species entries)
                if (flex.textContent?.includes('JOURNAL') || flex.querySelector('.McGrid')) {
                    return flex;
                }
            }
        }
    }
    return null;
}

/**
 * Get progress color based on percentage (matching game's getProgressColor)
 */
function getProgressColor(percentage: number): string {
    if (percentage < 15) return '#F98B4B'; // Light Orange
    if (percentage < 25) return '#FC6D30'; // Orange.Magic
    if (percentage < 50) return '#F3D32B'; // Yellow.Magic
    if (percentage < 75) return '#E9B52F'; // Yellow.Dark
    if (percentage < 100) return '#5EAC46'; // Green.Magic
    return '#0B893F'; // Green.Dark (100%)
}



// ─────────────────────────────────────────────────────────────────────────────
// UI Creation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create the All tab button matching the game's tab button styling
 * Uses same structure: Button > McFlex (orient=bottom) > "tab" element
 */
function createAllTabButton(): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = ALL_TAB_CLASS;
    btn.type = 'button';

    // Button styling (matching game's variant="blank" h="60px")
    btn.style.cssText = `
        background: transparent;
        border: none;
        cursor: pointer;
        height: 60px;
        padding: 0;
        margin: 0;
    `;

    // Inner flex container (orient="bottom")
    const inner = document.createElement('div');
    inner.className = 'McFlex';
    inner.style.cssText = `
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 100%;
    `;

    // Tab element - matching game's MotionMcFlex styling
    // Using an olive/teal green to distinguish from Crops (green) and Pets (purple)
    const isSmallScreen = window.innerWidth < 768;
    const tab = document.createElement('div');
    tab.className = 'gemini-allTab-tab';
    tab.style.cssText = `
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: ${isSmallScreen ? '70px' : '100px'};
        height: 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #5a7a6a;
        position: relative;
        border-left: 1px solid #6a9a82;
        border-right: 1px solid #6a9a82;
        border-top: 2px solid #7aba9a;
        overflow: hidden;
        transition: height 0.3s ease-in-out;
    `;

    const text = document.createElement('span');
    text.textContent = 'All';
    text.style.cssText = `
        font-size: ${isSmallScreen ? '12px' : '14px'};
        font-weight: bold;
        color: white;
        position: relative;
        z-index: 2;
    `;

    tab.appendChild(text);
    inner.appendChild(tab);
    btn.appendChild(inner);

    // Update width on resize
    const handleResize = () => {
        const small = window.innerWidth < 768;
        tab.style.width = small ? '70px' : '100px';
        text.style.fontSize = small ? '12px' : '14px';
    };
    window.addEventListener('resize', handleResize);
    buttonTracker.add(() => window.removeEventListener('resize', handleResize));

    // Hover effect
    btn.onmouseenter = () => {
        if (!allTabActive) {
            tab.style.height = '25px';
        }
    };
    btn.onmouseleave = () => {
        if (!allTabActive) {
            tab.style.height = '20px';
        }
    };

    btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        withMutationGuard(() => activateAllTab());
    };

    return btn;
}

/**
 * Create a species row matching game's OverviewPageEntry styling
 * Uses MGSprite.toCanvas() for actual sprite rendering
 */
function createSpeciesRow(species: SpeciesProgress, type: 'crop' | 'pet'): HTMLElement {
    const row = document.createElement('div');
    row.style.cssText = `
        display: grid;
        grid-template-columns: 50px 1fr;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    `;

    // Sprite container - no background to match game journal
    const spriteContainer = document.createElement('div');
    spriteContainer.style.cssText = `
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    `;

    const isUnknown = species.variantsLogged.length === 0;

    if (isUnknown) {
        // Show placeholder for unknown species - no background to match game
        const questionMark = document.createElement('span');
        questionMark.textContent = '?';
        questionMark.style.cssText = 'font-size: 24px; color: rgba(168, 138, 107, 0.6); font-weight: bold;';
        spriteContainer.appendChild(questionMark);
    } else {
        // Try to render actual sprite using MGSprite
        try {
            if (MGSprite.isReady()) {
                // Use 'plant' / 'pet' category (not 'plants' / 'pets')
                const spriteCategory = type === 'crop' ? 'plant' : 'pet';
                let loadAsset = species.species;

                // Handle special crop name mappings (matching JournalChecker)
                if (type === 'crop') {
                    if (species.species === 'DawnCelestial') loadAsset = 'DawnCelestialCrop';
                    if (species.species === 'MoonCelestial') loadAsset = 'MoonCelestialCrop';
                    if (species.species === 'OrangeTulip') loadAsset = 'Tulip';
                }

                // Try multiple variations
                const tryCanvas = (cat: string, asset: string) => {
                    try {
                        if (MGSprite.has(cat, asset)) {
                            return MGSprite.toCanvas(cat, asset, { scale: 0.5 });
                        }
                    } catch { }
                    return null;
                };

                const canvas = tryCanvas(spriteCategory, loadAsset) ||
                    (type === 'crop' ? tryCanvas('tallplant', loadAsset) : null) ||
                    tryCanvas(spriteCategory, loadAsset.toLowerCase()) ||
                    (type === 'crop' ? tryCanvas('tallplant', loadAsset.toLowerCase()) : null);

                if (canvas) {
                    canvas.style.cssText = 'max-width: 46px; max-height: 46px; display: block;';
                    spriteContainer.appendChild(canvas);
                } else {
                    // Fallback emoji if sprite not found
                    const emoji = document.createElement('span');
                    emoji.textContent = type === 'crop' ? '🌱' : '🐾';
                    emoji.style.cssText = 'font-size: 20px;';
                    spriteContainer.appendChild(emoji);
                }
            } else {
                // Fallback emoji if MGSprite not ready
                const emoji = document.createElement('span');
                emoji.textContent = type === 'crop' ? '🌱' : '🐾';
                emoji.style.cssText = 'font-size: 20px;';
                spriteContainer.appendChild(emoji);
            }
        } catch {
            // Fallback emoji on error
            const emoji = document.createElement('span');
            emoji.textContent = type === 'crop' ? '🌱' : '🐾';
            emoji.style.cssText = 'font-size: 20px;';
            spriteContainer.appendChild(emoji);
        }
    }

    // Calculate combined progress for pets (variants + abilities)
    let logged: number;
    let total: number;
    let percentage: number;

    if (type === 'pet') {
        // Pets: Include abilities to match abilitiesInject behavior
        // Pets have 4 variants: Normal, Gold, Rainbow, Max Weight
        // Plus abilities (varies per species, typically 5-7)
        const abilitiesLogged = species.abilitiesLogged?.length ?? 0;
        const abilitiesTotal = species.abilitiesTotal ?? 0;

        logged = species.variantsLogged.length + abilitiesLogged;
        total = species.variantsTotal + abilitiesTotal;
        percentage = total > 0 ? (logged / total) * 100 : 0;
    } else {
        // Crops: Variants only (11 variants total)
        // Normal, Wet, Chilled, Frozen, Dawnlit, Ambershine, Gold, Rainbow, Dawncharged, Ambercharged, Max Weight
        logged = species.variantsLogged.length;
        total = species.variantsTotal;
        percentage = species.variantsPercentage;
    }

    const color = getProgressColor(percentage);

    // Progress bar container (matching game)
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        position: relative;
        background: #D4C4A8;
        border-radius: 5px;
        padding: 6px 12px;
        overflow: hidden;
        flex: 1;
        min-width: 0;
    `;

    // Progress fill
    const fill = document.createElement('div');
    fill.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${percentage}%;
        background: ${color};
        border-radius: inherit;
        transition: width 0.3s ease;
    `;

    // Text content grid
    const textGrid = document.createElement('div');
    textGrid.style.cssText = `
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        position: relative;
        z-index: 1;
    `;

    const displayName = getDisplayName(species.species, type);
    const nameEl = document.createElement('span');
    nameEl.style.cssText = 'font-weight: bold; font-size: 13px; color: #3D3325; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
    nameEl.textContent = isUnknown ? '???' : displayName;

    const fractionEl = document.createElement('span');
    fractionEl.style.cssText = `font-size: 12px; font-weight: bold; color: ${percentage < 100 ? '#8B6914' : '#3D3325'}; margin-left: 4px; flex-shrink: 0;`;
    fractionEl.textContent = `${logged}/${total}`;

    textGrid.append(nameEl, fractionEl);
    progressContainer.append(fill, textGrid);
    row.append(spriteContainer, progressContainer);

    // Click handler - navigate to species detail page
    row.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigateToSpeciesPage(species.species, type);
    };

    // Hover effect
    row.onmouseenter = () => {
        row.style.opacity = '0.8';
    };
    row.onmouseleave = () => {
        row.style.opacity = '1';
    };

    return row;
}

/**
 * Navigate to a species detail page by:
 * 1. Deactivating All tab
 * 2. Clicking the correct native tab (Crops/Pets)
 * 3. Finding and clicking the matching species entry
 */
function navigateToSpeciesPage(speciesId: string, type: 'crop' | 'pet'): void {
    // First deactivate All tab to restore native content
    withMutationGuard(() => deactivateAllTab());

    // Wait for React to render, then click the correct tab and entry
    setTimeout(() => {
        const { crops, pets } = findTabButtons();
        const targetTab = type === 'crop' ? crops : pets;

        if (targetTab) {
            // Click the correct tab
            targetTab.click();

            // Wait for tab content to render, then find and click the entry
            setTimeout(() => {
                const contentWrapper = findContentWrapper();
                if (!contentWrapper) return;

                // Find all McGrid entries (species entries)
                const entries = contentWrapper.querySelectorAll<HTMLElement>('.McGrid');
                for (const entry of entries) {
                    const text = entry.textContent ?? '';
                    // Check if this entry matches our species
                    if (text.toLowerCase().includes(speciesId.toLowerCase()) ||
                        text.includes(getDisplayName(speciesId, type))) {
                        entry.click();
                        break;
                    }
                }

                // Re-inject the All tab button after navigation
                setTimeout(() => {
                    withMutationGuard(() => injectAllTab());
                }, 100);
            }, 200);
        }
    }, 100);
}

/**
 * Create a category section (Crops or Pets) with header and species entries
 */
function createCategorySection(title: string, species: SpeciesProgress[], type: 'crop' | 'pet'): HTMLElement {
    const section = document.createElement('div');
    section.style.cssText = 'margin-bottom: 16px;';

    // Calculate section totals
    let sectionLogged = 0;
    let sectionTotal = 0;

    for (const sp of species) {
        if (type === 'pet') {
            // Pets: Include abilities in section totals
            sectionLogged += sp.variantsLogged.length + (sp.abilitiesLogged?.length ?? 0);
            sectionTotal += sp.variantsTotal + (sp.abilitiesTotal ?? 0);
        } else {
            // Crops: Variants only
            sectionLogged += sp.variantsLogged.length;
            sectionTotal += sp.variantsTotal;
        }
    }

    // Section header - styled like game journal (text only, no background card)
    const header = document.createElement('div');
    const color = type === 'crop' ? '#7cb342' : '#9575cd';
    header.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 0;
        margin-bottom: 12px;
        border-bottom: 2px solid rgba(212, 196, 168, 0.3);
    `;
    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    titleSpan.style.cssText = `font-size: 16px; font-weight: 600; font-family: shrikhand, serif; color: ${color}; text-transform: uppercase;`;

    const countSpan = document.createElement('span');
    countSpan.textContent = `${sectionLogged}/${sectionTotal}`;
    countSpan.style.cssText = 'color: #A88A6B; font-size: 12px; font-weight: bold;';

    header.append(titleSpan, countSpan);

    // Species list
    const list = document.createElement('div');
    list.style.cssText = 'display: flex; flex-direction: column; gap: 12px; padding: 0 4px;';

    for (const sp of species) {
        list.appendChild(createSpeciesRow(sp, type));
    }

    section.append(header, list);
    return section;
}

/**
 * Create the complete All tab content with both Crops and Pets sections
 * Includes filter/sort controls and game-style scrollbar
 */
function createAllTabContent(): HTMLElement {
    const journal = MGJournal.getMyJournal();
    const cropsProgress = MGJournal.calculateProduceProgress(journal);
    const petsProgress = MGJournal.calculatePetProgress(journal);

    const container = document.createElement('div');
    container.className = 'gemini-journal-allContent';
    container.style.cssText = `
        padding: 12px 16px;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    `;

    // Header matching game style
    const headerSection = document.createElement('div');
    headerSection.style.cssText = 'text-align: center; padding-bottom: 8px;';
    const headerTitle = document.createElement('p');
    headerTitle.textContent = 'GARDEN JOURNAL';
    headerTitle.style.cssText = 'font-size: 20px; font-weight: bold; font-family: shrikhand, serif; color: #4F6981; margin-bottom: 4px;';

    // Collective progress for the All tab
    const totalLogged = cropsProgress.variantsLogged + petsProgress.variantsLogged + (petsProgress.abilitiesLogged ?? 0);
    const totalTotal = cropsProgress.variantsTotal + petsProgress.variantsTotal + (petsProgress.abilitiesTotal ?? 0);
    const percentage = Math.floor((totalLogged / totalTotal) * 100);

    const headerCollected = document.createElement('p');
    headerCollected.style.cssText = 'font-size: 14px; font-weight: bold; color: #4F6981; margin-top: -2px;';
    headerCollected.textContent = `Collected ${percentage}% `;

    const countSpan = document.createElement('span');
    countSpan.className = 'chakra-text';
    countSpan.style.cssText = 'color: #A88A6B; font-size: 12px; font-weight: bold;';
    countSpan.textContent = `(${totalLogged}/${totalTotal})`;

    headerCollected.appendChild(countSpan);

    const headerDivider = document.createElement('div');
    headerDivider.style.cssText = 'height: 4px; background: #D4C4A8; border-radius: 9999px; opacity: 0.5; margin: 8px 0;';

    headerSection.append(headerTitle, headerCollected, headerDivider);

    // Filter/Sort Controls
    const controlsContainer = document.createElement('div');
    controlsContainer.style.cssText = `
        display: flex;
        gap: 12px;
        padding: 6px 0;
        margin-bottom: 8px;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    `;

    // Filter dropdown
    const filterLabel = document.createElement('span');
    filterLabel.textContent = 'Filter:';
    filterLabel.style.cssText = 'color: #A88A6B; font-size: 11px; font-weight: bold;';

    const filterSelect = document.createElement('select');
    for (const [value, label] of [['all', 'All'], ['missing', 'Missing'], ['complete', 'Complete']]) {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = label;
        filterSelect.appendChild(opt);
    }
    filterSelect.value = filterMode;
    filterSelect.style.cssText = `
        background: #D4C8B8;
        color: #3D3325;
        border: 1px solid #8B7355;
        border-radius: 4px;
        padding: 3px 8px;
        font-size: 10px;
        cursor: pointer;
    `;
    filterSelect.onchange = () => {
        filterMode = filterSelect.value as FilterMode;
        refreshAllTabContent();
    };

    // Sort dropdown
    const sortLabel = document.createElement('span');
    sortLabel.textContent = 'Sort:';
    sortLabel.style.cssText = 'color: #A88A6B; font-size: 11px; font-weight: bold; margin-left: 8px;';

    const sortSelect = document.createElement('select');
    for (const [value, label] of [['default', 'Default'], ['az', 'A-Z'], ['progress', 'By Progress']]) {
        const opt = document.createElement('option');
        opt.value = value;
        opt.textContent = label;
        sortSelect.appendChild(opt);
    }
    sortSelect.value = sortMode;
    sortSelect.style.cssText = filterSelect.style.cssText;
    sortSelect.onchange = () => {
        sortMode = sortSelect.value as SortMode;
        refreshAllTabContent();
    };

    controlsContainer.append(filterLabel, filterSelect, sortLabel, sortSelect);

    // Scrollable content area with game-style scrollbar
    const scrollArea = document.createElement('div');
    scrollArea.className = 'gemini-all-scroll';
    scrollArea.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
    `;

    // Inject scrollbar styles
    injectScrollbarStyles();

    // Apply filter and sort to species
    const filteredCrops = filterAndSortSpecies(cropsProgress.speciesDetails, 'crop');
    const filteredPets = filterAndSortSpecies(petsProgress.speciesDetails, 'pet');

    // Add Crops section (only if has items after filtering)
    if (filteredCrops.length > 0) {
        scrollArea.appendChild(createCategorySection('Crops', filteredCrops, 'crop'));
    }

    // Add Pets section (only if has items after filtering)
    if (filteredPets.length > 0) {
        scrollArea.appendChild(createCategorySection('Pets', filteredPets, 'pet'));
    }

    // Show message if no results
    if (filteredCrops.length === 0 && filteredPets.length === 0) {
        const noResults = document.createElement('div');
        noResults.style.cssText = 'text-align: center; padding: 40px 20px; color: #A88A6B; font-size: 14px;';
        noResults.textContent = filterMode === 'missing'
            ? 'All entries are complete!'
            : filterMode === 'complete'
                ? 'No complete entries yet.'
                : 'No entries found.';
        scrollArea.appendChild(noResults);
    }

    container.append(headerSection, controlsContainer, scrollArea);
    return container;
}

/**
 * Filter and sort species based on current filter/sort mode
 */
function filterAndSortSpecies(species: SpeciesProgress[], _type: 'crop' | 'pet'): SpeciesProgress[] {
    // Apply filter - pets include abilities, crops include variants only
    let filtered = species.filter(sp => {
        let logged: number;
        let total: number;

        if (_type === 'pet') {
            // Pets: Include abilities in filter calculations
            logged = sp.variantsLogged.length + (sp.abilitiesLogged?.length ?? 0);
            total = sp.variantsTotal + (sp.abilitiesTotal ?? 0);
        } else {
            // Crops: Variants only
            logged = sp.variantsLogged.length;
            total = sp.variantsTotal;
        }

        const percentage = total > 0 ? (logged / total) * 100 : 0;

        switch (filterMode) {
            case 'missing': return percentage < 100;
            case 'complete': return percentage >= 100;
            default: return true;
        }
    });

    // Apply sort
    if (sortMode === 'az') {
        filtered = [...filtered].sort((a, b) => a.species.localeCompare(b.species));
    } else if (sortMode === 'progress') {
        filtered = [...filtered].sort((a, b) => {
            // Pets: Include abilities in sort calculations
            const aLogged = _type === 'pet'
                ? a.variantsLogged.length + (a.abilitiesLogged?.length ?? 0)
                : a.variantsLogged.length;
            const aTotal = _type === 'pet'
                ? a.variantsTotal + (a.abilitiesTotal ?? 0)
                : a.variantsTotal;
            const aProgress = aTotal > 0 ? aLogged / aTotal : 0;

            const bLogged = _type === 'pet'
                ? b.variantsLogged.length + (b.abilitiesLogged?.length ?? 0)
                : b.variantsLogged.length;
            const bTotal = _type === 'pet'
                ? b.variantsTotal + (b.abilitiesTotal ?? 0)
                : b.variantsTotal;
            const bProgress = bTotal > 0 ? bLogged / bTotal : 0;

            return bProgress - aProgress; // Descending
        });
    }

    return filtered;
}

/**
 * Inject game-style scrollbar CSS
 */
let scrollbarStylesInjected = false;
function injectScrollbarStyles(): void {
    if (scrollbarStylesInjected) return;
    scrollbarStylesInjected = true;

    const style = document.createElement('style');
    style.textContent = `
        .gemini-all-scroll::-webkit-scrollbar {
            width: 4px;
            height: 6px;
        }
        .gemini-all-scroll::-webkit-scrollbar-track {
            background: transparent;
        }
        .gemini-all-scroll::-webkit-scrollbar-thumb {
            background: rgba(85, 48, 20, 0.2);
            border-radius: 3px;
        }
        .gemini-all-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(110, 60, 24, 0.3);
        }
    `;
    document.head.appendChild(style);
    buttonTracker.add(() => {
        style.remove();
        scrollbarStylesInjected = false;
    });
}

/**
 * Refresh the All tab content (called when filter/sort changes)
 */
function refreshAllTabContent(): void {
    const overlay = document.querySelector(`.${OVERLAY_CLASS}`);
    if (!overlay) return;

    // Clear and rebuild content
    while (overlay.firstChild) overlay.firstChild.remove();
    overlay.appendChild(createAllTabContent());
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab Activation - Using Overlay Approach
// ─────────────────────────────────────────────────────────────────────────────

function activateAllTab(): void {
    if (allTabActive) return;
    allTabActive = true;

    // Update our All tab styling to be "active" (taller, like game tabs)
    const allBtn = document.querySelector<HTMLElement>(`.${ALL_TAB_CLASS}`);
    const allTab = allBtn?.querySelector<HTMLElement>('.gemini-allTab-tab');
    if (allTab) {
        allTab.style.height = '35px';
    }

    // Deactivate native Crops/Pets tabs
    deactivateNativeTabs();

    // Find content wrapper
    const contentWrapper = findContentWrapper();
    if (!contentWrapper) {
        console.warn('[JournalAllTab] Cannot activate All tab: content wrapper not found');
        allTabActive = false;
        return;
    }

    // Hide native content children (except our overlay) to prevent double rendering
    const nativeChildren: HTMLElement[] = [];
    for (const child of Array.from(contentWrapper.children)) {
        if (child instanceof HTMLElement && !child.classList.contains(OVERLAY_CLASS)) {
            nativeChildren.push(child);
            child.style.visibility = 'hidden';
        }
    }
    contentTracker.add(() => {
        // Restore visibility on cleanup
        for (const child of nativeChildren) {
            child.style.visibility = '';
        }
    });

    // Create overlay that covers the content area (transparent - uses journal bg)
    const overlay = document.createElement('div');
    overlay.className = OVERLAY_CLASS;
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
        background: transparent;
        display: flex;
        flex-direction: column;
    `;

    // Set wrapper to position: relative if not already
    const wrapperPos = window.getComputedStyle(contentWrapper).position;
    if (wrapperPos === 'static') {
        contentWrapper.style.position = 'relative';
        contentTracker.add(() => { contentWrapper.style.position = ''; });
    }

    overlay.appendChild(createAllTabContent());
    contentWrapper.appendChild(overlay);
    contentTracker.add(() => overlay.remove());

    // Update main header to show total progress
    updateTotalProgressHeader();

    console.log('[JournalAllTab] All tab activated');
}

/**
 * Update the main journal header to show combined progress of Crops + Pets
 */
function updateTotalProgressHeader(): void {
    const header = findOverviewHeader();
    if (!header) return;

    // Calculate totals
    const journal = MGJournal.getMyJournal();
    const crops = MGJournal.calculateProduceProgress(journal);
    const pets = MGJournal.calculatePetProgress(journal);

    const totalLogged = crops.variantsLogged + pets.variantsLogged + (pets.abilitiesLogged ?? 0);
    const totalTotal = crops.variantsTotal + pets.variantsTotal + (pets.abilitiesTotal ?? 0);
    const percentage = Math.floor((totalLogged / totalTotal) * 100);

    // Store original values for restoration
    if (!header.hasAttribute('data-original-percent')) {
        const percentMatch = header.textContent?.match(/Collected\s+(\d+)%/);
        if (percentMatch) {
            header.setAttribute('data-original-percent', percentMatch[1]);
        }
    }

    const countSpan = header.querySelector('span.chakra-text') as HTMLElement | null;
    if (countSpan && !countSpan.hasAttribute('data-original-count')) {
        countSpan.setAttribute('data-original-count', countSpan.textContent || '');
    }

    // Update text node (percentage)
    const percentageNode = header.childNodes[0];
    if (percentageNode && percentageNode.nodeType === Node.TEXT_NODE) {
        percentageNode.textContent = `Collected ${percentage}% `;
    }

    // Update count span
    if (countSpan) {
        countSpan.textContent = `(${totalLogged}/${totalTotal})`;
    }
}

/**
 * Restore the main journal header to its original state
 */
function restoreTotalProgressHeader(): void {
    const header = findOverviewHeader();
    if (!header) return;

    const origPercent = header.getAttribute('data-original-percent');
    if (origPercent) {
        const percentageNode = header.childNodes[0];
        if (percentageNode && percentageNode.nodeType === Node.TEXT_NODE) {
            percentageNode.textContent = `Collected ${origPercent}% `;
        }
        header.removeAttribute('data-original-percent');
    }

    const countSpan = header.querySelector('span.chakra-text') as HTMLElement | null;
    if (countSpan) {
        const origCount = countSpan.getAttribute('data-original-count');
        if (origCount) {
            countSpan.textContent = origCount;
        }
        countSpan.removeAttribute('data-original-count');
    }
}

function deactivateAllTab(): void {
    if (!allTabActive) return;
    allTabActive = false;

    // Reset All tab styling
    const allBtn = document.querySelector<HTMLElement>(`.${ALL_TAB_CLASS}`);
    const allTab = allBtn?.querySelector<HTMLElement>('.gemini-allTab-tab');
    if (allTab) {
        allTab.style.height = '20px';
    }

    // Run cleanup (restores native content visibility, removes overlay)
    // NOTE: Only clears contentTracker, buttonTracker persists
    contentTracker.run();
    contentTracker = createCleanupTracker();

    // Restore header
    restoreTotalProgressHeader();

    console.log('[JournalAllTab] All tab deactivated');
}

// ─────────────────────────────────────────────────────────────────────────────
// Injection
// ─────────────────────────────────────────────────────────────────────────────

function injectAllTab(): void {
    const tabContainer = findTabContainer();
    if (!tabContainer) return;

    // Check if already injected
    if (tabContainer.querySelector(`.${ALL_TAB_CLASS}`)) return;

    const { crops, pets } = findTabButtons();
    if (!crops) {
        return;
    }

    // Create and inject All tab button before Crops
    const allBtn = createAllTabButton();
    tabContainer.insertBefore(allBtn, crops);
    // Add button removal to buttonTracker (permanent - only cleared on destroy)
    buttonTracker.add(() => allBtn.remove());

    // Listen for clicks on other tabs to deactivate All
    const handleTabClick = () => {
        withMutationGuard(() => deactivateAllTab());
    };

    if (crops) {
        crops.addEventListener('click', handleTabClick);
        buttonTracker.add(() => crops.removeEventListener('click', handleTabClick));
    }
    if (pets) {
        pets.addEventListener('click', handleTabClick);
        buttonTracker.add(() => pets.removeEventListener('click', handleTabClick));
    }

    console.log('[JournalAllTab] Tab injected');
}

function processPage(): void {
    withMutationGuard(() => {
        injectAllTab();
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// Observation
// ─────────────────────────────────────────────────────────────────────────────

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
    }, 200);
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

    addObserverWithCleanup(buttonTracker, observer);

    // Cleanup debounce timer
    buttonTracker.add(() => {
        if (debounceTimer !== null) {
            clearTimeout(debounceTimer);
            debounceTimer = null;
        }
    });
}

function stopObserving(): void {
    deactivateAllTab();
    // Clear both trackers on full cleanup
    contentTracker.run();
    contentTracker.clear();
    buttonTracker.run();
    buttonTracker.clear();
    contentTracker = createCleanupTracker();
    buttonTracker = createCleanupTracker();
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function init(): void {
    if (initialized) return;
    initialized = true;
    startObserving();
    console.log('[JournalAllTab] Initialized');
}

export function destroy(): void {
    if (!initialized) return;
    initialized = false;
    stopObserving();
    console.log('[JournalAllTab] Destroyed');
}

export function isEnabled(): boolean {
    return initialized;
}
