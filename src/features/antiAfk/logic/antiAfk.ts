/**
 * Anti-AFK Feature - Core Logic
 *
 * Implements all mechanisms to prevent AFK detection:
 * - Event interception
 * - Document property patching
 * - Audio keep-alive
 * - Heartbeat simulation
 */

import {
    STOP_EVENTS,
    HEARTBEAT_INTERVAL_MS,
    AUDIO_FREQUENCY_HZ,
    AUDIO_GAIN,
} from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type EventListener = {
    type: string;
    handler: (e: Event) => void;
    target: Document | Window;
};

interface AntiAfkState {
    listeners: EventListener[];
    savedProps: {
        hidden: PropertyDescriptor | undefined;
        visibilityState: PropertyDescriptor | undefined;
        hasFocus: (() => boolean) | null;
    };
    audioCtx: AudioContext | null;
    oscillator: OscillatorNode | null;
    gainNode: GainNode | null;
    heartbeatInterval: number | null;
}

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

const state: AntiAfkState = {
    listeners: [],
    savedProps: {
        hidden: undefined,
        visibilityState: undefined,
        hasFocus: null,
    },
    audioCtx: null,
    oscillator: null,
    gainNode: null,
    heartbeatInterval: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// Event Swallowing
// ─────────────────────────────────────────────────────────────────────────────

function swallowEvents(): void {
    const addListener = (target: Document | Window, type: string) => {
        const handler = (e: Event) => {
            e.stopImmediatePropagation();
            e.preventDefault?.();
        };
        target.addEventListener(type, handler, { capture: true });
        state.listeners.push({ type, handler, target });
    };

    for (const type of STOP_EVENTS) {
        addListener(document, type);
        addListener(window, type);
    }
}

function restoreEvents(): void {
    for (const { type, handler, target } of state.listeners) {
        try {
            target.removeEventListener(type, handler, { capture: true });
        } catch {
            // Ignore cleanup errors
        }
    }
    state.listeners.length = 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Document Property Patching
// ─────────────────────────────────────────────────────────────────────────────

function patchDocumentProps(): void {
    const proto = Object.getPrototypeOf(document);

    state.savedProps.hidden = Object.getOwnPropertyDescriptor(proto, 'hidden');
    state.savedProps.visibilityState = Object.getOwnPropertyDescriptor(proto, 'visibilityState');
    state.savedProps.hasFocus = document.hasFocus ? document.hasFocus.bind(document) : null;

    try {
        Object.defineProperty(proto, 'hidden', {
            configurable: true,
            get: () => false,
        });
    } catch {
        // Ignore property patch errors
    }

    try {
        Object.defineProperty(proto, 'visibilityState', {
            configurable: true,
            get: () => 'visible',
        });
    } catch {
        // Ignore property patch errors
    }

    try {
        (document as unknown as { hasFocus: () => boolean }).hasFocus = () => true;
    } catch {
        // Ignore property patch errors
    }
}

function restoreDocumentProps(): void {
    const proto = Object.getPrototypeOf(document);

    try {
        if (state.savedProps.hidden) {
            Object.defineProperty(proto, 'hidden', state.savedProps.hidden);
        }
    } catch {
        // Ignore restore errors
    }

    try {
        if (state.savedProps.visibilityState) {
            Object.defineProperty(proto, 'visibilityState', state.savedProps.visibilityState);
        }
    } catch {
        // Ignore restore errors
    }

    try {
        if (state.savedProps.hasFocus) {
            (document as unknown as { hasFocus: () => boolean }).hasFocus = state.savedProps.hasFocus;
        }
    } catch {
        // Ignore restore errors
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Audio Keep-Alive
// ─────────────────────────────────────────────────────────────────────────────

function resumeAudioIfSuspended(): void {
    if (state.audioCtx && state.audioCtx.state !== 'running') {
        state.audioCtx.resume?.().catch(() => {
            // Ignore resume errors
        });
    }
}

function startAudioKeepAlive(): void {
    try {
        const AudioCtx =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        state.audioCtx = new AudioCtx({ latencyHint: 'interactive' });
        state.gainNode = state.audioCtx.createGain();
        state.gainNode.gain.value = AUDIO_GAIN;
        state.oscillator = state.audioCtx.createOscillator();
        state.oscillator.frequency.value = AUDIO_FREQUENCY_HZ;
        state.oscillator.connect(state.gainNode).connect(state.audioCtx.destination);
        state.oscillator.start();

        document.addEventListener('visibilitychange', resumeAudioIfSuspended, { capture: true });
        window.addEventListener('focus', resumeAudioIfSuspended, { capture: true });
    } catch {
        stopAudioKeepAlive();
    }
}

function stopAudioKeepAlive(): void {
    try {
        state.oscillator?.stop();
    } catch {
        // Ignore stop errors
    }
    try {
        state.oscillator?.disconnect();
        state.gainNode?.disconnect();
    } catch {
        // Ignore disconnect errors
    }
    try {
        state.audioCtx?.close?.();
    } catch {
        // Ignore close errors
    }

    document.removeEventListener('visibilitychange', resumeAudioIfSuspended, { capture: true });
    window.removeEventListener('focus', resumeAudioIfSuspended, { capture: true });

    state.oscillator = null;
    state.gainNode = null;
    state.audioCtx = null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Heartbeat
// ─────────────────────────────────────────────────────────────────────────────

function startHeartbeat(): void {
    const target =
        (document.querySelector('canvas') as HTMLElement) ||
        document.body ||
        document.documentElement;

    state.heartbeatInterval = window.setInterval(() => {
        try {
            target.dispatchEvent(
                new MouseEvent('mousemove', {
                    bubbles: true,
                    clientX: 1,
                    clientY: 1,
                })
            );
        } catch {
            // Ignore dispatch errors
        }
    }, HEARTBEAT_INTERVAL_MS);
}

function stopHeartbeat(): void {
    if (state.heartbeatInterval !== null) {
        clearInterval(state.heartbeatInterval);
        state.heartbeatInterval = null;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export function start(): void {
    patchDocumentProps();
    swallowEvents();
    startAudioKeepAlive();
    startHeartbeat();
}

export function stop(): void {
    stopHeartbeat();
    stopAudioKeepAlive();
    restoreEvents();
    restoreDocumentProps();
}
