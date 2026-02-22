/**
 * DecorLocker Decor Card Injection — DOM logic
 *
 * Adds a purple border + lock icon to the game's decor detail card
 * when the current decor type is blocked by DecorLocker.
 *
 * Per ui/ui.inject.md:
 * - No Shadow DOM
 * - All observers/listeners tracked and cleaned up
 * - Styles injected via <style> element with cleanup
 */

import { onAdded, onRemoved } from '../../../../utils/dom';
import { EVENTS } from '../../../../utils/storage';
import { getCurrentTile } from '../../../../globals/variables/currentTile';
import { MGDecorLocker } from '../../../../features/decorLocker';
import type { DecorTileObject } from '../../../../atoms/types';
import { decorLockerInjectCss } from './styles.css';

// ─────────────────────────────────────────────────────────────────────────────
// Selectors — update here if game CSS changes
// ─────────────────────────────────────────────────────────────────────────────

const DECOR_CARD_CLASS = 'css-qnqsp4';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const LOCKED_CLASS   = 'gemini-qol-decorLocker-locked';
const LOCK_ICON_ID   = 'gemini-qol-decorLocker-lock-icon';
const STYLE_ID       = 'gemini-qol-decorLocker-styles';

// Feather Icons "lock" — same icon set as the game
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
            console.warn('[DecorLocker Inject] Cleanup error:', e);
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
    styleEl.textContent = decorLockerInjectCss;
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

    // Pas un décor → on retire l'overlay et on bail
    if (data.object.type !== 'decor' || !data.object.data) {
        removeOverlay(currentCard);
        return;
    }

    const decor = data.object.data as DecorTileObject;
    const blocked = MGDecorLocker.isDecorBlocked(decor.decorId);

    if (blocked) {
        applyOverlay(currentCard);
        console.log(`[DecorLocker Inject] LOCKED — overlay applied (${decor.decorId})`);
    } else {
        removeOverlay(currentCard);
        console.log(`[DecorLocker Inject] unlocked — overlay removed (${decor.decorId})`);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function startWatching(): void {
    ensureStyles();

    // Watch for decor card appearing in DOM
    const unwatchAdded = onAdded(`.${DECOR_CARD_CLASS}`, (el) => {
        currentCard = el as HTMLElement;
        evaluate();
    });
    addCleanup(() => unwatchAdded.disconnect());

    // Watch for decor card being removed from DOM
    const unwatchRemoved = onRemoved(`.${DECOR_CARD_CLASS}`, (el) => {
        if (currentCard === el) {
            removeOverlay(el as HTMLElement);
            currentCard = null;
        }
    });
    addCleanup(() => unwatchRemoved.disconnect());

    // Re-evaluate when object on tile changes (navigation vers un autre décor ou tuile)
    const unsubObject = getCurrentTile().subscribeObject(() => {
        evaluate();
    });
    addCleanup(unsubObject);

    // Re-evaluate when DecorLocker blocked list changes
    const onLocksUpdated = () => evaluate();
    window.addEventListener(EVENTS.DECOR_LOCKER_LOCKS_UPDATED, onLocksUpdated);
    addCleanup(() => window.removeEventListener(EVENTS.DECOR_LOCKER_LOCKS_UPDATED, onLocksUpdated));

    console.log('[DecorLocker Inject] Started');
}

export function stopWatching(): void {
    if (currentCard) {
        removeOverlay(currentCard);
        currentCard = null;
    }

    runCleanups();
    removeStyles();

    console.log('[DecorLocker Inject] Stopped');
}
