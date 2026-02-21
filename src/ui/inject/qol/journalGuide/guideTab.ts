/**
 * Journal Guide - Guide Tab UI
 *
 * Creates the Guide tab button and manages the guide content overlay
 * following the journalAllTab pattern for natural integration.
 */

import { MGSprite, MGData } from '../../../../modules';
import type { MutationName } from '../../../../modules/sprite/types';
import type { Recommendation, Tier } from './scoring';
import { TIER_ORDER, TIER_LABELS, TIER_COLORS, groupByTier } from './scoring';
import { createVariantLetter } from '../../../../features/missingVariantsIndicator/letterStyles';
import { getDisplayName } from '../_shared/names';
import { findJournalModal } from '../_shared/dom';
import type { CleanupTracker } from '../../core/types';
import { setActiveCustomTab } from '../_shared/tabState';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const GUIDE_TAB_CLASS = 'gemini-qol-journalGuide-tab';
const OVERLAY_CLASS = 'gemini-qol-journalGuide-overlay';

let lastGuideTabClickTime = 0; // For click debouncing

// ─────────────────────────────────────────────────────────────────────────────
// Tab Button
// ─────────────────────────────────────────────────────────────────────────────

export function createGuideTab(availableCount: number, onClick: () => void): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.className = GUIDE_TAB_CLASS;
    btn.type = 'button';

    btn.style.cssText = `
        background: transparent;
        border: none;
        cursor: pointer;
        height: 60px;
        padding: 0;
        margin: 0;
    `;

    const inner = document.createElement('div');
    inner.className = 'McFlex';
    inner.style.cssText = `
        display: flex;
        align-items: flex-end;
        justify-content: center;
        height: 100%;
    `;

    const tab = document.createElement('div');
    tab.className = 'gemini-qol-journalGuide-tab-inner';
    tab.style.cssText = `
        display: flex;
        align-items: flex-start;
        justify-content: center;
        width: clamp(70px, 12vw, 100px);
        height: 20px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background: #d4a574;
        position: relative;
        border-left: 1px solid #e4b584;
        border-right: 1px solid #e4b584;
        border-top: 2px solid #f4c594;
        overflow: hidden;
        transition: height 0.3s ease-in-out;
    `;

    const text = document.createElement('span');
    text.textContent = '★';
    text.style.cssText = `
        font-size: clamp(14px, 2vw, 16px);
        font-weight: bold;
        color: white;
        position: relative;
        z-index: 2;
    `;

    // Badge count if available
    if (availableCount > 0) {
        const badge = document.createElement('span');
        badge.className = 'gemini-qol-journalGuide-tab-badge';
        badge.textContent = String(availableCount);
        badge.style.cssText = `
            position: absolute;
            top: -4px;
            right: 8px;
            background: #28a745;
            color: white;
            font-size: 9px;
            font-weight: bold;
            padding: 2px 5px;
            border-radius: 10px;
            z-index: 3;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        `;
        tab.appendChild(badge);
    }

    tab.appendChild(text);
    inner.appendChild(tab);
    btn.appendChild(inner);

    // Hover effect
    btn.onmouseenter = () => {
        if (!btn.hasAttribute('data-active')) {
            tab.style.height = '25px';
        }
    };
    btn.onmouseleave = () => {
        if (!btn.hasAttribute('data-active')) {
            tab.style.height = '20px';
        }
    };

    btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Debounce rapid clicks (300ms)
        const now = Date.now();
        if (now - lastGuideTabClickTime < 300) return;
        lastGuideTabClickTime = now;

        onClick();
    };

    return btn;
}

// ─────────────────────────────────────────────────────────────────────────────
// Content Helpers
// ─────────────────────────────────────────────────────────────────────────────

function findContentWrapper(): HTMLElement | null {
    const modal = findJournalModal();
    if (!modal) return null;

    const grids = modal.querySelectorAll<HTMLElement>('.McGrid');
    for (const grid of grids) {
        const flexes = grid.querySelectorAll<HTMLElement>(':scope > .McFlex');
        for (const flex of flexes) {
            const computed = window.getComputedStyle(flex);
            if (computed.overflow === 'hidden' || computed.overflowY === 'hidden') {
                if (flex.textContent?.includes('JOURNAL') || flex.querySelector('.McGrid')) {
                    return flex;
                }
            }
        }
    }
    return null;
}

function deactivateNativeTabs(): void {
    const modal = findJournalModal();
    if (!modal) return;

    const buttons = modal.querySelectorAll<HTMLButtonElement>('button');
    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        if (text === 'Crops' || text === 'Pets' || text === 'All') {
            // Find the MotionMcFlex or inner tab element
            const tabInner = btn.querySelector('div');
            if (tabInner) {
                // Look for the actual tab element (could be nested)
                const innerTab = tabInner.querySelector('div');
                if (innerTab instanceof HTMLElement) {
                    innerTab.style.height = '20px';
                }
            }
        }
    }
}

function reactivateNativeTabs(): void {
    const modal = findJournalModal();
    if (!modal) return;

    const buttons = modal.querySelectorAll<HTMLButtonElement>('button');
    for (const btn of buttons) {
        const text = btn.textContent?.trim();
        if (text === 'Crops' || text === 'Pets' || text === 'All') {
            const tabInner = btn.querySelector('div');
            if (tabInner) {
                const innerTab = tabInner.querySelector('div');
                if (innerTab instanceof HTMLElement) {
                    // Only reset if it's at 20px (was deactivated)
                    if (innerTab.style.height === '20px') {
                        innerTab.style.height = '';
                    }
                }
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Recommendation Rows
// ─────────────────────────────────────────────────────────────────────────────

function createRecommendationRow(rec: Recommendation): HTMLElement {
    const row = document.createElement('div');
    row.className = 'gemini-qol-journalGuide-row';
    row.style.cssText = `
        display: grid;
        grid-template-columns: minmax(36px, 50px) 1fr;
        align-items: center;
        gap: 8px;
        padding: 6px 4px;
        border-radius: 4px;
        transition: background 0.2s;
        cursor: default;
    `;

    // Sprite container - responsive sizing
    const spriteContainer = document.createElement('div');
    spriteContainer.style.cssText = `
        width: clamp(36px, 8vw, 50px);
        height: clamp(36px, 8vw, 50px);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        overflow: visible;
    `;

    // Render species sprite WITH mutations applied (Gold glow, Rainbow gradient, etc.)
    if (MGSprite.isReady()) {
        try {
            const spriteCategory = rec.type === 'crop' ? 'plant' : 'pet';
            let loadAsset = rec.speciesId;

            // Handle special crop name mappings
            if (rec.type === 'crop') {
                if (rec.speciesId === 'DawnCelestial') loadAsset = 'DawnCelestialCrop';
                if (rec.speciesId === 'MoonCelestial') loadAsset = 'MoonCelestialCrop';
                if (rec.speciesId === 'OrangeTulip') loadAsset = 'Tulip';
            }

            // Build mutations dynamically: any mutation ID from MGData maps to [mutationId]
            // Normal and Max Weight map to [] (no visual mutation)
            const getMutationsForVariant = (variantId: string): MutationName[] => {
                if (variantId === 'Normal' || variantId === 'Max Weight') return [];
                const mutations = MGData.get('mutations') as Record<string, any> | null;
                if (mutations && variantId in mutations) return [variantId as MutationName];
                return [];
            };

            // Get mutations for this variant (abilities don't have mutations)
            const mutations = !rec.isAbility ? getMutationsForVariant(rec.variantId) : [];

            // Try multiple category variations with proper mutation support
            const tryCanvas = (cat: string, asset: string) => {
                try {
                    if (MGSprite.has(cat, asset)) {
                        return MGSprite.toCanvas(cat, asset, {
                            scale: 0.5,
                            mutations,
                            // Use boundsMode: 'mutations' to prevent cutoff of visual effects
                            boundsMode: mutations.length > 0 ? 'mutations' : undefined,
                        });
                    }
                } catch { }
                return null;
            };

            const canvas = tryCanvas(spriteCategory, loadAsset) ||
                (rec.type === 'crop' ? tryCanvas('tallplant', loadAsset) : null) ||
                tryCanvas(spriteCategory, loadAsset.toLowerCase()) ||
                (rec.type === 'crop' ? tryCanvas('tallplant', loadAsset.toLowerCase()) : null);

            if (canvas) {
                // Apply styling matching working examples (objectFit: contain is critical)
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.objectFit = 'contain';
                canvas.style.imageRendering = 'pixelated';
                canvas.style.display = 'block';
                spriteContainer.appendChild(canvas);
            } else {
                // Fallback emoji
                const emoji = document.createElement('span');
                emoji.textContent = rec.type === 'crop' ? '🌱' : '🐾';
                emoji.style.cssText = 'font-size: 20px;';
                spriteContainer.appendChild(emoji);
            }
        } catch (err) {
            console.warn('[JournalGuide] Failed to render sprite for', rec.speciesId, err);
            // Fallback emoji
            const emoji = document.createElement('span');
            emoji.textContent = rec.type === 'crop' ? '🌱' : '🐾';
            emoji.style.cssText = 'font-size: 20px;';
            spriteContainer.appendChild(emoji);
        }
    } else {
        // Fallback emoji if MGSprite not ready
        const emoji = document.createElement('span');
        emoji.textContent = rec.type === 'crop' ? '🌱' : '🐾';
        emoji.style.cssText = 'font-size: 20px;';
        spriteContainer.appendChild(emoji);
    }

    row.appendChild(spriteContainer);

    // Info container
    const infoContainer = document.createElement('div');
    infoContainer.style.cssText = 'display: flex; flex-direction: column; gap: 2px; min-width: 0; overflow: hidden;';

    // Name + variant/ability
    const nameRow = document.createElement('div');
    nameRow.style.cssText = 'display: flex; align-items: center; gap: 6px;';

    const nameText = document.createElement('span');
    nameText.textContent = rec.displayName;
    nameText.style.cssText = 'font-weight: bold; font-size: 13px; color: #3D3325; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
    nameRow.appendChild(nameText);

    if (!rec.isAbility) {
        const variantEl = createVariantLetter(rec.variantId, '14px');
        nameRow.appendChild(variantEl);
    } else {
        const abilityTag = document.createElement('span');
        abilityTag.textContent = rec.variantId;
        abilityTag.style.cssText = 'font-size: 10px; font-weight: bold; color: #9575cd; background: rgba(149, 117, 205, 0.15); padding: 2px 6px; border-radius: 4px;';
        nameRow.appendChild(abilityTag);
    }

    infoContainer.appendChild(nameRow);

    // Action hint
    const hintEl = document.createElement('div');
    hintEl.textContent = rec.actionHint;
    hintEl.style.cssText = 'font-size: 11px; color: #6B5D50; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
    infoContainer.appendChild(hintEl);

    row.appendChild(infoContainer);

    // Hover effect
    row.onmouseenter = () => {
        row.style.background = 'rgba(212, 196, 168, 0.3)';
    };
    row.onmouseleave = () => {
        row.style.background = '';
    };

    return row;
}

// ─────────────────────────────────────────────────────────────────────────────
// Tier Sections
// ─────────────────────────────────────────────────────────────────────────────

function createTierSection(tier: Tier, recommendations: Recommendation[]): HTMLElement {
    const section = document.createElement('div');
    section.style.cssText = 'margin-bottom: 16px;';

    // Tier header
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: ${TIER_COLORS[tier]}15;
        border-left: 4px solid ${TIER_COLORS[tier]};
        border-radius: 4px;
        margin-bottom: 8px;
        cursor: pointer;
        transition: background 0.2s;
    `;

    const titleSpan = document.createElement('span');
    titleSpan.textContent = TIER_LABELS[tier];
    titleSpan.style.cssText = `font-size: 13px; font-weight: 600; color: #3D3325;`;

    const countSpan = document.createElement('span');
    countSpan.textContent = String(recommendations.length);
    countSpan.style.cssText = `font-size: 11px; font-weight: bold; color: white; background: ${TIER_COLORS[tier]}; padding: 2px 8px; border-radius: 10px;`;

    header.append(titleSpan, countSpan);

    // Tier body (collapsible)
    const body = document.createElement('div');
    body.style.cssText = 'display: flex; flex-direction: column; gap: 6px; padding: 0 4px;';

    // Start with "easy", "setup", and "rare" tiers collapsed
    let collapsed = tier === 'easy' || tier === 'setup' || tier === 'rare';
    if (collapsed) {
        body.style.display = 'none';
    }

    for (const rec of recommendations) {
        body.appendChild(createRecommendationRow(rec));
    }

    // Toggle collapse on click
    header.onclick = () => {
        collapsed = !collapsed;
        body.style.display = collapsed ? 'none' : 'flex';
    };

    header.onmouseenter = () => {
        header.style.background = `${TIER_COLORS[tier]}25`;
    };
    header.onmouseleave = () => {
        header.style.background = `${TIER_COLORS[tier]}15`;
    };

    section.append(header, body);
    return section;
}

// ─────────────────────────────────────────────────────────────────────────────
// Guide Content
// ─────────────────────────────────────────────────────────────────────────────

type FilterMode = 'all' | 'crops' | 'pets';
let currentFilter: FilterMode = 'all';

function filterRecommendations(recs: Recommendation[], filter: FilterMode): Recommendation[] {
    if (filter === 'all') return recs;
    if (filter === 'crops') return recs.filter(r => r.type === 'crop');
    return recs.filter(r => r.type === 'pet');
}

function createFilterPills(onChange: (filter: FilterMode) => void): HTMLElement {
    const container = document.createElement('div');
    container.style.cssText = `
        display: flex;
        gap: 6px;
        justify-content: center;
        padding: 6px 0;
        flex-wrap: wrap;
    `;

    const filters: { label: string; value: FilterMode }[] = [
        { label: 'All', value: 'all' },
        { label: 'Crops', value: 'crops' },
        { label: 'Pets', value: 'pets' },
    ];

    for (const { label, value } of filters) {
        const pill = document.createElement('button');
        pill.textContent = label;
        pill.style.cssText = `
            padding: 4px 16px;
            border-radius: 12px;
            border: none;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            background: ${value === currentFilter ? '#8B7355' : '#D4C4A8'};
            color: ${value === currentFilter ? 'white' : '#5A4A3A'};
        `;

        pill.onmouseenter = () => {
            if (value !== currentFilter) {
                pill.style.background = '#C4B5A0';
            }
        };
        pill.onmouseleave = () => {
            if (value !== currentFilter) {
                pill.style.background = '#D4C4A8';
            }
        };

        pill.onclick = () => {
            currentFilter = value;
            // Update all pills
            for (const p of container.querySelectorAll('button')) {
                const pBtn = p as HTMLButtonElement;
                const isActive = pBtn.textContent === label;
                pBtn.style.background = isActive ? '#8B7355' : '#D4C4A8';
                pBtn.style.color = isActive ? 'white' : '#5A4A3A';
            }
            onChange(value);
        };

        container.appendChild(pill);
    }

    return container;
}

function createGuideContent(recommendations: Recommendation[]): HTMLElement {
    const container = document.createElement('div');
    container.style.cssText = `
        padding: 12px 16px;
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    `;

    // Header
    const headerSection = document.createElement('div');
    headerSection.style.cssText = 'text-align: center; padding-bottom: 8px;';

    const headerTitle = document.createElement('p');
    headerTitle.textContent = 'JOURNAL GUIDE';
    headerTitle.style.cssText = 'font-size: clamp(14px, 3vw, 20px); font-weight: bold; font-family: shrikhand, serif; color: #4F6981; margin-bottom: 4px;';

    const headerSubtitle = document.createElement('p');
    headerSubtitle.textContent = 'Recommended actions for missing variants';
    headerSubtitle.style.cssText = 'font-size: 12px; color: #A88A6B; margin-top: -2px;';

    const headerDivider = document.createElement('div');
    headerDivider.style.cssText = 'height: 4px; background: #D4C4A8; border-radius: 9999px; opacity: 0.5; margin: 8px 0;';

    headerSection.append(headerTitle, headerSubtitle, headerDivider);

    // Filter pills
    const filterContainer = createFilterPills((filter) => {
        // Rebuild content with new filter
        const overlay = document.querySelector('.gemini-qol-journalGuide-overlay');
        if (overlay) {
            overlay.innerHTML = '';
            overlay.appendChild(createGuideContent(recommendations));
        }
    });

    // Scrollable content area
    const scrollArea = document.createElement('div');
    scrollArea.style.cssText = `
        flex: 1;
        overflow-y: auto;
        padding-right: 4px;
    `;

    // Add custom scrollbar styling
    scrollArea.className = 'gemini-qol-journalGuide-scroll';

    // Filter and group recommendations
    const filtered = filterRecommendations(recommendations, currentFilter);
    const grouped = groupByTier(filtered);
    let hasContent = false;

    for (const tier of TIER_ORDER) {
        const items = grouped.get(tier) ?? [];
        if (items.length === 0) continue;
        hasContent = true;
        scrollArea.appendChild(createTierSection(tier, items));
    }

    if (!hasContent) {
        const empty = document.createElement('div');
        empty.style.cssText = 'text-align: center; padding: 40px 20px; color: #A88A6B; font-size: 14px;';
        empty.textContent = filtered.length === 0
            ? 'No missing entries for this filter!'
            : 'All caught up!';
        scrollArea.appendChild(empty);
    }

    container.append(headerSection, filterContainer, scrollArea);
    return container;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function activateGuideTab(recommendations: Recommendation[], tracker: CleanupTracker): void {
    // Notify tab state system (handles native tab retraction)
    setActiveCustomTab('guide');

    // Update Guide tab styling to active
    const guideBtn = document.querySelector<HTMLElement>(`.${GUIDE_TAB_CLASS}`);
    const guideTab = guideBtn?.querySelector<HTMLElement>('.gemini-qol-journalGuide-tab-inner');
    if (guideTab) {
        guideTab.style.height = '35px';
        guideBtn?.setAttribute('data-active', 'true');
    }

    // Find content wrapper
    const contentWrapper = findContentWrapper();
    if (!contentWrapper) {
        console.warn('[JournalGuide] Cannot activate Guide tab: content wrapper not found');
        return;
    }

    // Hide native content children
    const nativeChildren: HTMLElement[] = [];
    for (const child of Array.from(contentWrapper.children)) {
        if (child instanceof HTMLElement && !child.classList.contains(OVERLAY_CLASS)) {
            nativeChildren.push(child);
            child.style.visibility = 'hidden';
        }
    }
    tracker.add(() => {
        for (const child of nativeChildren) {
            child.style.visibility = '';
        }
    });

    // Create overlay
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
        tracker.add(() => { contentWrapper.style.position = ''; });
    }

    overlay.appendChild(createGuideContent(recommendations));
    contentWrapper.appendChild(overlay);
    tracker.add(() => overlay.remove());
}

export function deactivateGuideTab(): void {
    // Notify tab state system (handles native tab reactivation)
    setActiveCustomTab(null);

    // Reset Guide tab styling
    const guideBtn = document.querySelector<HTMLElement>(`.${GUIDE_TAB_CLASS}`);
    const guideTab = guideBtn?.querySelector<HTMLElement>('.gemini-qol-journalGuide-tab-inner');
    if (guideTab) {
        guideTab.style.height = '20px';
        guideBtn?.removeAttribute('data-active');
    }

    // Reset filter to 'all'
    currentFilter = 'all';
}

/**
 * Reset all module-level state (called on destroy)
 */
export function resetGuideTabState(): void {
    currentFilter = 'all';
    lastGuideTabClickTime = 0;
}
