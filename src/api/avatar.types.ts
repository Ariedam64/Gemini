// src/api/avatar.types.ts
/**
 * Public type surface of the Avatar API.
 *
 * These types used to be declared a second time here, against a
 * `src/data/cosmetics` module that no longer exists — so the copy had silently
 * drifted out of any contract at all. They now re-export the module's own
 * definitions, which are the single source of truth.
 */

export type {
    CosmeticType,
    CosmeticAvailability,
    CosmeticItem,
    CosmeticInfo,
    AvatarOutfit,
    CurrentAvatar,
    AvatarDebugInfo,
    ListOptions,
    ToCanvasOptions,
} from "../modules/cosmetic/avatar/types";
