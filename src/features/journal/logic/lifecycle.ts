/**
 * Journal Feature - Lifecycle & Events
 *
 * Level 2: Auto-refresh and event dispatching
 */

import { loadConfig } from '../state';
import { aggregateProgress } from './progress';
import type { JournalProgress } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Runtime State
// ─────────────────────────────────────────────────────────────────────────────

let refreshInterval: ReturnType<typeof setInterval> | null = null;
let started = false;

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function start(): void {
    if (started) return;
    started = true;

    // Auto-refresh with a 30s interval
    if (!refreshInterval) {
        refreshInterval = setInterval(async () => {
            const progress = await aggregateProgress();
            dispatchUpdate(progress);
        }, 30000);
    }

    console.log('[Journal] Started');
}

export function stop(): void {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
    started = false;
}

export function isStarted(): boolean {
    return started;
}

// ─────────────────────────────────────────────────────────────────────────────
// Events
// ─────────────────────────────────────────────────────────────────────────────

export function dispatchUpdate(progress: JournalProgress): void {
    window.dispatchEvent(new CustomEvent('gemini:journal-updated', { detail: progress }));
}

export async function refresh(): Promise<JournalProgress> {
    const progress = await aggregateProgress();
    dispatchUpdate(progress);
    return progress;
}
