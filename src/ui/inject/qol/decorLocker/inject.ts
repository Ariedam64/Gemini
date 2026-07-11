/**
 * DecorLocker Decor Card Injection — Pixi logic
 *
 * Draws a purple lock border + icon on the game's Pixi-rendered garden info
 * card when the current decor type is blocked by DecorLocker. The card used
 * to be DOM (matched via `.css-qnqsp4`); it now renders natively in Pixi
 * (see ../../core/gardenInfoCardPixi.ts).
 */

import { EVENTS } from '../../../../utils/storage';
import { MGDecorLocker } from '../../../../features/decorLocker';
import { myCurrentGardenObjectAtom } from '../../../../atoms';
import type { DecorTileObject, GardenTileObject, Unsubscribe } from '../../../../atoms/types';
import { startGardenInfoLockIndicator, type GardenInfoLockIndicatorController } from '../../core/gardenInfoLockIndicator';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let indicator: GardenInfoLockIndicatorController | null = null;

// Mirrors whatever object the game itself is showing in the info card —
// unlike `currentTile` (derived from the player's own position on the map),
// this is correct regardless of where the player is standing.
let currentGardenObject: GardenTileObject | null = null;

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
// Lock Evaluation
// ─────────────────────────────────────────────────────────────────────────────

function isLocked(): boolean {
    // Pas un décor → pas de verrou à afficher
    if (!currentGardenObject || currentGardenObject.objectType !== 'decor') {
        return false;
    }

    const decor = currentGardenObject as DecorTileObject;
    return MGDecorLocker.isDecorBlocked(decor.decorId);
}

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function startWatching(): void {
    indicator = startGardenInfoLockIndicator({ isLocked });

    // Re-evaluate when the inspected object changes (navigation vers un autre décor ou tuile)
    let unsubObject: Unsubscribe | null = null;
    void myCurrentGardenObjectAtom
        .onChangeNow((next) => {
            currentGardenObject = next;
            indicator?.recheck();
        })
        .then((unsub) => {
            if (indicator) unsubObject = unsub;
            else unsub();
        });
    addCleanup(() => unsubObject?.());

    // Re-evaluate when DecorLocker blocked list changes
    const onLocksUpdated = () => indicator?.recheck();
    window.addEventListener(EVENTS.DECOR_LOCKER_LOCKS_UPDATED, onLocksUpdated);
    addCleanup(() => window.removeEventListener(EVENTS.DECOR_LOCKER_LOCKS_UPDATED, onLocksUpdated));

    console.log('[DecorLocker Inject] Started');
}

export function stopWatching(): void {
    indicator?.stop();
    indicator = null;

    runCleanups();
    currentGardenObject = null;

    console.log('[DecorLocker Inject] Stopped');
}
