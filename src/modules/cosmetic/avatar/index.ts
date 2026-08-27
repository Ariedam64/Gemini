// src/modules/cosmetic/avatar/index.ts
/**
 * Avatar API - Cosmetic avatar management and rendering
 * Exposed as MGCosmetic.Avatar.*
 */

import { list, listUrls, get, debug, listAsync } from "./logic/query";
import { loadCatalog, isCatalogLoaded } from "./logic/catalog";
import { set, blank } from "./logic/state";
import { toCanvas, clearImageCache } from "./logic/render";
import { render, clearOverride, getOverride } from "./logic/override";
import { renderWorld, clearWorldOverride, getWorldOverride } from "./logic/worldOverride";
import { MGAvatarLoadouts as Loadouts } from "./logic/loadouts";
import { initOwnership, isLoaded } from "./logic/ownership";

// Re-export types
export type {
    CosmeticInfo,
    AvatarOutfit,
    CurrentAvatar,
    ListOptions,
    AvatarDebugInfo,
    ToCanvasOptions,
    CosmeticType,
    CosmeticAvailability,
} from "./types";
export type { AvatarLoadout } from "./logic/loadouts";

/**
 * Avatar API
 * Access via Gemini.Modules.Cosmetic.Avatar.*
 */
export const Avatar = {
    // ============================================================
    // Standard Module Interface (required by modules.md)
    // ============================================================

    /**
     * Initialize avatar module: cosmetic catalog + ownership data.
     * Safe to call multiple times.
     */
    init: async (): Promise<void> => {
        await Promise.all([loadCatalog(), initOwnership()]);
    },

    /**
     * Check if the module is ready
     * @returns true once the catalog and the ownership system are loaded
     */
    isReady: () => isCatalogLoaded() && isLoaded(),

    // ============================================================
    // Query Functions
    // ============================================================

    list,
    listAsync,
    listUrls,
    get,
    debug,

    // ============================================================
    // State Management (server-synced)
    // ============================================================

    set,
    blank,

    // ============================================================
    // Loadout Management
    // ============================================================

    Loadouts,

    // ============================================================
    // Rendering (canvas preview)
    // ============================================================

    toCanvas,
    clearImageCache,

    // ============================================================
    // Visual Override - UI Avatars (top-right corner, etc)
    // ============================================================

    render,
    clearOverride,
    getOverride,

    // ============================================================
    // Visual Override - World Avatar (playable character)
    // ============================================================

    renderWorld,
    clearWorldOverride,
    getWorldOverride,
};
