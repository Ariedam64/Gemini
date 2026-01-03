/**
 * Anti-AFK Feature - Types
 *
 * Prevents AFK detection by the game through multiple mechanisms:
 * - Event swallowing (blur, visibility, etc.)
 * - Document property patching (hidden, visibilityState, hasFocus)
 * - Audio keep-alive (silent oscillator)
 * - Heartbeat (periodic mouse events)
 */

import { FEATURE_KEYS } from '../../utils/storage';

// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────

export interface AntiAfkConfig {
    enabled: boolean;
}

export const DEFAULT_CONFIG: AntiAfkConfig = {
    enabled: true,
};

export const STORAGE_KEY = FEATURE_KEYS.ANTI_AFK;

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** Events to intercept and prevent */
export const STOP_EVENTS = [
    'visibilitychange',
    'blur',
    'focus',
    'focusout',
    'pagehide',
    'freeze',
    'resume',
] as const;

/** Heartbeat interval in milliseconds */
export const HEARTBEAT_INTERVAL_MS = 25_000;

/** Audio oscillator frequency */
export const AUDIO_FREQUENCY_HZ = 1;

/** Audio gain (nearly silent) */
export const AUDIO_GAIN = 0.00001;
