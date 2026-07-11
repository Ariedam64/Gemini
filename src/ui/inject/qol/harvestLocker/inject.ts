/**
 * HarvestLocker Crop Card Injection — Pixi logic
 *
 * Draws a purple lock border + icon on the game's Pixi-rendered garden info
 * card when the current crop's next harvest slot is locked by HarvestLocker
 * rules. The card used to be DOM (matched via `.css-qnqsp4`); it now renders
 * natively in Pixi (see ../../core/gardenInfoCardPixi.ts).
 */

import { EVENTS } from '../../../../utils/storage';
import { isSlotLocked } from '../../../../features/harvestLocker/logic/core';
import { myOwnCurrentDirtTileIndexAtom, myCurrentGardenObjectAtom, mySelectedSlotIdAtom } from '../../../../atoms';
import type { GardenTileObject, GrowSlot, Unsubscribe } from '../../../../atoms/types';
import { startGardenInfoLockIndicator, type GardenInfoLockIndicatorController } from '../../core/gardenInfoLockIndicator';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let indicator: GardenInfoLockIndicatorController | null = null;

// `myOwnCurrentDirtTileIndexAtom`/`myCurrentGardenObjectAtom`/`mySelectedSlotIdAtom`
// mirror whatever tile/object/slot the game itself is showing in the info
// card — unlike `currentTile` (derived from the player's own position on the
// map), these are correct regardless of where the player is standing.
let currentTileIndex: number | null = null;
let currentGardenObject: GardenTileObject | null = null;
let currentSelectedSlotId: number | null = null;

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
// Lock Evaluation
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Array index of the slot currently shown in the card. `mySelectedSlotIdAtom`
 * holds the sub-slot's stable `slotId`, NOT its position in `slots[]` (same
 * resolution as the price badge — see cropValueIndicator/render.ts), so it
 * must be resolved by id. Falls back to the first slot when nothing matches.
 */
function findSelectedSlotIndex(slots: GrowSlot[], selectedSlotId: number | null): number | null {
    if (!slots.length) return null;
    if (selectedSlotId != null) {
        const idx = slots.findIndex((slot) => slot.slotId === selectedSlotId);
        if (idx >= 0) return idx;
    }
    return 0;
}

function isLocked(): boolean {
    if (currentTileIndex === null || !currentGardenObject || currentGardenObject.objectType !== 'plant') {
        return false;
    }

    const slotIndex = findSelectedSlotIndex(currentGardenObject.slots ?? [], currentSelectedSlotId);
    if (slotIndex === null) return false;

    // tileIndex dans le garden = localIndex (pas globalIndex)
    return isSlotLocked(String(currentTileIndex), slotIndex);
}

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function startWatching(): void {
    indicator = startGardenInfoLockIndicator({ isLocked });

    let unsubTileIndex: Unsubscribe | null = null;
    void myOwnCurrentDirtTileIndexAtom
        .onChangeNow((next) => {
            currentTileIndex = next;
            indicator?.recheck();
        })
        .then((unsub) => {
            if (indicator) unsubTileIndex = unsub;
            else unsub();
        });
    addCleanup(() => unsubTileIndex?.());

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

    let unsubSlotId: Unsubscribe | null = null;
    void mySelectedSlotIdAtom
        .onChangeNow((next) => {
            currentSelectedSlotId = next;
            indicator?.recheck();
        })
        .then((unsub) => {
            if (indicator) unsubSlotId = unsub;
            else unsub();
        });
    addCleanup(() => unsubSlotId?.());

    // Re-evaluate when HarvestLocker rules or config change
    const onLocksUpdated = () => indicator?.recheck();
    window.addEventListener(EVENTS.HARVEST_LOCKER_LOCKS_UPDATED, onLocksUpdated);
    addCleanup(() => window.removeEventListener(EVENTS.HARVEST_LOCKER_LOCKS_UPDATED, onLocksUpdated));

    console.log('[HarvestLocker Inject] Started');
}

export function stopWatching(): void {
    indicator?.stop();
    indicator = null;

    runCleanups();
    currentTileIndex = null;
    currentGardenObject = null;
    currentSelectedSlotId = null;

    console.log('[HarvestLocker Inject] Stopped');
}
