/**
 * Avatar Loadout Module
 * Logic and state for managing persistent avatar outfits.
 */

import { storageGet, storageSet, KEYS } from "../../../../utils/storage";
import { AvatarOutfit } from "../types";
import { renderWorld } from "./worldOverride";

export interface AvatarLoadout extends Required<Omit<AvatarOutfit, 'color'>> {
    id: string;
    name: string;
    createdAt: number;
}

let loadouts: AvatarLoadout[] = [];
const listeners: ((l: AvatarLoadout[]) => void)[] = [];

const notify = () => {
    listeners.forEach(cb => cb([...loadouts]));
};

export const MGAvatarLoadouts = {
    /**
     * Initialize loadouts from storage
     */
    init(): void {
        loadouts = storageGet(KEYS.SECTION.AVATAR_LOADOUTS, []);
    },

    /**
     * Get all saved loadouts
     */
    get(): AvatarLoadout[] {
        return [...loadouts];
    },

    /**
     * Save a new loadout or update existing one.
     * Returns the id of the saved loadout, or the existing id if the outfit is a duplicate.
     */
    async save(name: string, outfit: Required<Omit<AvatarOutfit, 'color'>>, id?: string): Promise<string> {
        if (!id) {
            const duplicate = loadouts.find(l =>
                l.top === outfit.top &&
                l.mid === outfit.mid &&
                l.bottom === outfit.bottom &&
                l.expression === outfit.expression
            );
            if (duplicate) return duplicate.id;
        }

        const newId = id || Math.random().toString(36).substring(2, 9);

        const newLoadout: AvatarLoadout = {
            ...outfit,
            id: newId,
            name: name,
            createdAt: id ? (loadouts.find(l => l.id === id)?.createdAt || Date.now()) : Date.now()
        };

        if (id) {
            const index = loadouts.findIndex(l => l.id === id);
            if (index !== -1) loadouts[index] = newLoadout;
            else loadouts.push(newLoadout);
        } else {
            loadouts.push(newLoadout);
        }

        storageSet(KEYS.SECTION.AVATAR_LOADOUTS, loadouts);
        notify();
        return newId;
    },

    /**
     * Delete a loadout
     */
    delete(id: string): void {
        loadouts = loadouts.filter(l => l.id !== id);
        storageSet(KEYS.SECTION.AVATAR_LOADOUTS, loadouts);
        notify();
    },

    /**
     * Rename a loadout (does not trigger UI rebuild to preserve input focus)
     */
    rename(id: string, name: string): void {
        const loadout = loadouts.find(l => l.id === id);
        if (loadout) {
            loadout.name = name;
            storageSet(KEYS.SECTION.AVATAR_LOADOUTS, loadouts);
            // NOTE: We intentionally do NOT call notify() here to avoid
            // rebuilding the UI while the user is still typing in the input.
            // The name is already visible in the input field.
        }
    },

    /**
     * Apply a loadout to the world
     */
    async wear(id: string): Promise<boolean> {
        const loadout = loadouts.find(l => l.id === id);
        if (!loadout) return false;

        const outfit: AvatarOutfit = {
            top: loadout.top,
            mid: loadout.mid,
            bottom: loadout.bottom,
            expression: loadout.expression
        };

        return await renderWorld(outfit);
    },

    /**
     * Subscribe to loadout changes
     */
    subscribe(callback: (l: AvatarLoadout[]) => void): () => void {
        listeners.push(callback);
        return () => {
            const idx = listeners.indexOf(callback);
            if (idx !== -1) listeners.splice(idx, 1);
        };
    }
};
