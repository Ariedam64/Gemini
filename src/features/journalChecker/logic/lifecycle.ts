/**
 * JournalChecker Feature - Lifecycle & Events
 * 
 * Level 2: Auto-refresh and event dispatching
 */

import { loadConfig, saveConfig } from '../state';
import { aggregateProgress } from './progress';
import type { JournalProgress } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Runtime State
// ─────────────────────────────────────────────────────────────────────────────

let refreshInterval: ReturnType<typeof setInterval> | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

export function start(): void {
    const config = loadConfig();
    if (!config.enabled) return;

    if (config.autoRefresh && !refreshInterval) {
        refreshInterval = setInterval(async () => {
            const progress = await aggregateProgress();
            dispatchUpdate(progress);
        }, config.refreshIntervalMs);
    }

    console.log('✅ [JournalChecker] Started');
}

export function stop(): void {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        refreshInterval = null;
    }
}

export function setEnabled(enabled: boolean): void {
    const config = loadConfig();
    config.enabled = enabled;
    saveConfig(config);
    enabled ? start() : stop();
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
