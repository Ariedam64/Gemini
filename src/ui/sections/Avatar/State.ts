/**
 * Avatar Section State
 * Reactive state for UI preferences (last selected slot, etc).
 */

import { createSectionStore } from "../core/State";

export interface AvatarUIState {
    lastSelectedSlot: string;
}

const DEFAULT_STATE: AvatarUIState = {
    lastSelectedSlot: 'bottom'
};

export type AvatarUIController = {
    get(): AvatarUIState;
    update(patch: Partial<AvatarUIState>): void;
    subscribe(callback: (v: AvatarUIState) => void): () => void;
};

/**
 * Initialize Avatar UI state (ephemeral/local)
 */
export async function initAvatarUIState(): Promise<AvatarUIController> {
    const base = await createSectionStore<AvatarUIState>("tab-avatar-ui", {
        version: 1,
        defaults: DEFAULT_STATE,
    });

    const listeners: ((v: AvatarUIState) => void)[] = [];

    return {
        get: () => base.get(),
        update: (patch) => {
            base.update(patch as any);
            const state = base.get();
            listeners.forEach(cb => cb(state));
        },
        subscribe: (cb) => {
            listeners.push(cb);
            return () => {
                const idx = listeners.indexOf(cb);
                if (idx !== -1) listeners.splice(idx, 1);
            };
        },
    };
}
