/**
 * EggLocker Egg Card Injection — Pixi logic
 *
 * Draws a purple lock border + icon on the game's Pixi-rendered garden info
 * card when the current egg type is blocked by EggLocker. The card used to
 * be DOM (matched via `.css-qnqsp4`); it now renders natively in Pixi (see
 * ../../core/gardenInfoCardPixi.ts).
 */

import { EVENTS } from '../../../../utils/storage';
import { MGEggLocker } from '../../../../features/eggLocker';
import { myCurrentGardenObjectAtom } from '../../../../atoms';
import type { EggTileObject, GardenTileObject, Unsubscribe } from '../../../../atoms/types';
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
            console.warn('[EggLocker Inject] Cleanup error:', e);
        }
    }
    cleanups.length = 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Lock Evaluation
// ─────────────────────────────────────────────────────────────────────────────

function isLocked(): boolean {
    // Pas un oeuf → pas de verrou à afficher
    if (!currentGardenObject || currentGardenObject.objectType !== 'egg') {
        return false;
    }

    const egg = currentGardenObject as EggTileObject;
    return MGEggLocker.getBlockedEggs().includes(egg.eggId);
}

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function startWatching(): void {
    indicator = startGardenInfoLockIndicator({ isLocked });

    // Re-evaluate when the inspected object changes (navigation vers un autre oeuf ou tuile)
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

    // Re-evaluate when EggLocker blocked list changes
    const onLocksUpdated = () => indicator?.recheck();
    window.addEventListener(EVENTS.EGG_LOCKER_LOCKS_UPDATED, onLocksUpdated);
    addCleanup(() => window.removeEventListener(EVENTS.EGG_LOCKER_LOCKS_UPDATED, onLocksUpdated));

    console.log('[EggLocker Inject] Started');
}

export function stopWatching(): void {
    indicator?.stop();
    indicator = null;

    runCleanups();
    currentGardenObject = null;

    console.log('[EggLocker Inject] Stopped');
}
