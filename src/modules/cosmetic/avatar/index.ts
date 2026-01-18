// src/modules/cosmetic/avatar/index.ts
/**
 * Avatar API - Cosmetic avatar management and rendering
 * Exposed as MGCosmetic.Avatar.*
 */

import { list, listUrls, get, debug } from "./query";
import { set, blank } from "./state";
import { toCanvas } from "./render";
import { render, clearOverride, getOverride } from "./override";
import { renderWorld, clearWorldOverride, getWorldOverride } from "./worldOverride";

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

/**
 * Avatar API
 * Access via Gemini.Modules.Cosmetic.Avatar.*
 */
export const Avatar = {
    // Query functions
    list,
    listUrls,
    get,
    debug,

    // State management (server-synced)
    set,
    blank,

    // Local rendering (canvas preview)
    toCanvas,

    // Visual override - UI avatars (top-right corner, etc)
    render,
    clearOverride,
    getOverride,

    // Visual override - World avatar (playable character)
    renderWorld,
    clearWorldOverride,
    getWorldOverride,
};
