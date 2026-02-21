/**
 * Shared MutationObserver for journal injections
 *
 * Replaces 4 individual observers (journalGuide, journalAllTab, journalHints, journalFilterSort)
 * with a single shared observer that watches for journal open/close and DOM changes.
 * Provides significant performance improvement by reducing redundant DOM scans.
 */

import { findJournalModal, invalidateJournalModalCache } from './dom';
import { isMutationGuarded } from '../../core/lifecycle';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface JournalObserverCallbacks {
    /** Called when journal modal is detected as open */
    onJournalOpen?: () => void;
    /** Called when journal modal is detected as closed */
    onJournalClose?: () => void;
    /** Called on DOM changes while journal is open (debounced at 50ms) */
    onDomChange?: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

const subscribers = new Map<string, JournalObserverCallbacks>();
let observer: MutationObserver | null = null;
let journalOpen = false;
let debounceTimer: number | null = null;
let rafHandle: number | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Observer Logic
// ─────────────────────────────────────────────────────────────────────────────

function checkJournalState(): void {
    const modal = findJournalModal();
    const nowOpen = modal !== null;

    if (nowOpen !== journalOpen) {
        journalOpen = nowOpen;

        if (nowOpen) {
            // Journal opened
            for (const callbacks of subscribers.values()) {
                if (callbacks.onJournalOpen) {
                    try {
                        callbacks.onJournalOpen();
                    } catch (err) {
                        console.warn('[SharedObserver] onJournalOpen error:', err);
                    }
                }
            }
        } else {
            // Journal closed
            invalidateJournalModalCache();
            for (const callbacks of subscribers.values()) {
                if (callbacks.onJournalClose) {
                    try {
                        callbacks.onJournalClose();
                    } catch (err) {
                        console.warn('[SharedObserver] onJournalClose error:', err);
                    }
                }
            }
        }
    }
}

function notifyDomChange(): void {
    if (!journalOpen) return;

    for (const callbacks of subscribers.values()) {
        if (callbacks.onDomChange) {
            try {
                callbacks.onDomChange();
            } catch (err) {
                console.warn('[SharedObserver] onDomChange error:', err);
            }
        }
    }
}

function handleMutations(): void {
    // Skip if mutation guard is active (prevents cascading mutations)
    if (isMutationGuarded()) return;

    // Cancel any pending RAF
    if (rafHandle !== null) {
        cancelAnimationFrame(rafHandle);
    }

    // Batch mutations using requestAnimationFrame
    rafHandle = requestAnimationFrame(() => {
        rafHandle = null;
        checkJournalState();

        // Debounce DOM change notifications
        if (debounceTimer !== null) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = window.setTimeout(() => {
            debounceTimer = null;
            if (!isMutationGuarded()) {
                notifyDomChange();
            }
        }, 50);
    });
}

function ensureObserver(): void {
    if (observer) return;

    observer = new MutationObserver(handleMutations);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Check initial state
    checkJournalState();

    console.log('[SharedObserver] Observer started');
}

function destroyObserver(): void {
    if (!observer) return;

    observer.disconnect();
    observer = null;

    if (rafHandle !== null) {
        cancelAnimationFrame(rafHandle);
        rafHandle = null;
    }

    if (debounceTimer !== null) {
        clearTimeout(debounceTimer);
        debounceTimer = null;
    }

    journalOpen = false;

    console.log('[SharedObserver] Observer destroyed');
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register callbacks with the shared journal observer.
 * Returns an unsubscribe function compatible with CleanupTracker.add().
 *
 * The observer starts automatically when the first subscriber registers,
 * and stops when the last subscriber unregisters.
 *
 * @param id - Unique identifier for this subscriber (e.g., feature name)
 * @param callbacks - Callback functions to invoke
 * @returns Unsubscribe function
 */
export function registerJournalObserver(
    id: string,
    callbacks: JournalObserverCallbacks,
): () => void {
    subscribers.set(id, callbacks);
    ensureObserver();

    // If journal is already open, fire onJournalOpen immediately
    if (journalOpen && callbacks.onJournalOpen) {
        try {
            callbacks.onJournalOpen();
        } catch (err) {
            console.warn('[SharedObserver] Immediate onJournalOpen error:', err);
        }
    }

    return () => {
        subscribers.delete(id);
        if (subscribers.size === 0) {
            destroyObserver();
        }
    };
}

/**
 * Force destroy the shared observer (for emergency cleanup).
 * Removes all subscribers and stops observing.
 */
export function destroySharedObserver(): void {
    destroyObserver();
    subscribers.clear();
}
