// src/modules/cosmetic/avatar/types.ts
/**
 * Avatar module type definitions
 */

import type { CosmeticItem } from "../../../data/cosmetics/cosmeticTypes";

// Re-export from data
export type { CosmeticType, CosmeticAvailability } from "../../../data/cosmetics/cosmeticTypes";

/**
 * Cosmetic item with computed URL
 */
export interface CosmeticInfo extends CosmeticItem {
    url: string;
}

/**
 * Avatar outfit specification (partial - only specify what you want to change)
 */
export interface AvatarOutfit {
    top?: string | null;
    mid?: string | null;
    bottom?: string | null;
    expression?: string | null;
    color?: string;
}

/**
 * Current avatar configuration (all slots populated)
 */
export interface CurrentAvatar {
    top: string | null;
    mid: string | null;
    bottom: string | null;
    expression: string | null;
    color: string;
    array: (string | null)[]; // 4-element array format
}

/**
 * List options for filtering cosmetics
 */
export interface ListOptions {
    type?: string | string[];
    availability?: string | string[];
    search?: string;
    includeUnowned?: boolean;
}

/**
 * Debug information
 */
export interface AvatarDebugInfo {
    current: {
        avatar: (string | null)[];
        color: string;
        parsed: {
            top: string | null;
            mid: string | null;
            bottom: string | null;
            expression: string | null;
        };
    };
    counts: Record<string, number>;
    allItems: CosmeticInfo[];
    assetBaseUrl: string;
}

/**
 * Canvas rendering options
 */
export interface ToCanvasOptions {
    width?: number;
    height?: number;
    scale?: number;
}

/**
 * Fallback asset path for special rendering cases.
 * @internal
 */
export const ALT_ASSET_PATH = "Expression_Stressed.png";

/**
 * Type-specific blank asset paths for "None" options.
 * @internal
 */
export const BLANK_PATHS: Record<string, string> = {
    Top: "Top_Blank.png",
    Mid: "Mid_Blank.png",
    Bottom: "Bottom_Blank.png",
    Expression: "Expression_Blank.png",
};
