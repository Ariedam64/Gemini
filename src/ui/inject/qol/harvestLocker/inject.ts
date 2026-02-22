/**
 * HarvestLocker Crop Card Injection — DOM logic
 *
 * Adds a red border + lock icon to the game's crop detail card
 * when the current crop's next harvest slot is locked by HarvestLocker rules.
 *
 * Per ui/ui.inject.md:
 * - No Shadow DOM
 * - All observers/listeners tracked and cleaned up
 * - Styles injected via <style> element with cleanup
 */

import { onAdded, onRemoved } from '../../../../utils/dom';
import { EVENTS } from '../../../../utils/storage';
import { getCurrentTile } from '../../../../globals/variables/currentTile';
import { isSlotLocked } from '../../../../features/harvestLocker/logic/core';
import { harvestLockerInjectCss } from './styles.css';

// ─────────────────────────────────────────────────────────────────────────────
// Selectors — update here if the game changes class names
// ─────────────────────────────────────────────────────────────────────────────

const CROP_CARD_CLASS = 'css-qnqsp4';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const LOCKED_CLASS   = 'gemini-qol-harvestLocker-locked';
const LOCK_ICON_ID   = 'gemini-qol-harvestLocker-lock-icon';
const STYLE_ID       = 'gemini-qol-harvestLocker-styles';

// Feather Icons "lock" — same icon set the game uses (matches stroke style of clock icon)
const LOCK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" focusable="false"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let currentCard: HTMLElement | null = null;
let stylesInjected = false;

// ─────────────────────────────────────────────────────────────────────────────
// Cleanup Tracking (per ui/ui.inject.md pattern)
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
            console.warn('[HarvestLocker Inject] Cleanup error:', e);
        }
    }
    cleanups.length = 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Style Injection
// ─────────────────────────────────────────────────────────────────────────────

function ensureStyles(): void {
    if (stylesInjected) return;
    if (document.getElementById(STYLE_ID)) {
        stylesInjected = true;
        return;
    }

    const styleEl = document.createElement('style');
    styleEl.id = STYLE_ID;
    styleEl.textContent = harvestLockerInjectCss;
    document.head.appendChild(styleEl);
    stylesInjected = true;
}

function removeStyles(): void {
    document.getElementById(STYLE_ID)?.remove();
    stylesInjected = false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Overlay Management
// ─────────────────────────────────────────────────────────────────────────────

function applyOverlay(card: HTMLElement): void {
    card.classList.add(LOCKED_CLASS);

    if (!card.querySelector(`#${LOCK_ICON_ID}`)) {
        const icon = document.createElement('div');
        icon.id = LOCK_ICON_ID;
        icon.innerHTML = LOCK_SVG;
        card.appendChild(icon);
    }
}

function removeOverlay(card: HTMLElement): void {
    card.classList.remove(LOCKED_CLASS);
    card.querySelector(`#${LOCK_ICON_ID}`)?.remove();
}

// ─────────────────────────────────────────────────────────────────────────────
// Lock Evaluation
// ─────────────────────────────────────────────────────────────────────────────

function evaluate(): void {
    if (!currentCard) return;

    const data = getCurrentTile().get();

    if (
        !data.plant ||
        data.position.localIndex === null ||
        data.plant.nextHarvestSlotIndex === null
    ) {
        removeOverlay(currentCard);
        console.log('[HarvestLocker Inject] No plant data — overlay removed');
        return;
    }

    // tileIndex dans le garden = localIndex (pas globalIndex)
    const tileId = String(data.position.localIndex);
    const slotIndex = data.plant.nextHarvestSlotIndex;
    const locked = isSlotLocked(tileId, slotIndex);

    if (locked) {
        applyOverlay(currentCard);
        console.log(`[HarvestLocker Inject] LOCKED — overlay applied (${data.plant.species} tile:${tileId} slot:${slotIndex})`);
    } else {
        removeOverlay(currentCard);
        console.log(`[HarvestLocker Inject] unlocked — overlay removed (${data.plant.species} tile:${tileId} slot:${slotIndex})`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function startWatching(): void {
    ensureStyles();

    // Watch for crop card appearing in DOM
    const unwatchAdded = onAdded(`.${CROP_CARD_CLASS}`, (el) => {
        currentCard = el as HTMLElement;
        evaluate();
    });
    addCleanup(() => unwatchAdded.disconnect());

    // Watch for crop card being removed from DOM
    const unwatchRemoved = onRemoved(`.${CROP_CARD_CLASS}`, (el) => {
        if (currentCard === el) {
            removeOverlay(el as HTMLElement);
            currentCard = null;
        }
    });
    addCleanup(() => unwatchRemoved.disconnect());

    // Re-evaluate when plant info changes (tile navigation, mutations applied)
    const unsubPlant = getCurrentTile().subscribePlantInfo(() => {
        evaluate();
    });
    addCleanup(unsubPlant);

    // Re-evaluate when HarvestLocker rules or config change
    const onLocksUpdated = () => evaluate();
    window.addEventListener(EVENTS.HARVEST_LOCKER_LOCKS_UPDATED, onLocksUpdated);
    addCleanup(() => window.removeEventListener(EVENTS.HARVEST_LOCKER_LOCKS_UPDATED, onLocksUpdated));

    console.log('[HarvestLocker Inject] Started');
}

export function stopWatching(): void {
    if (currentCard) {
        removeOverlay(currentCard);
        currentCard = null;
    }

    runCleanups();
    removeStyles();

    console.log('[HarvestLocker Inject] Stopped');
}
