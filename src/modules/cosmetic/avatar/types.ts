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
    top?: string;
    mid?: string;
    bottom?: string;
    expression?: string;
    color?: string;
}

/**
 * Current avatar configuration (all slots populated)
 */
export interface CurrentAvatar {
    top: string;
    mid: string;
    bottom: string;
    expression: string;
    color: string;
    array: string[]; // 4-element array format
}

/**
 * List options for filtering cosmetics
 */
export interface ListOptions {
    type?: string | string[];
    availability?: string | string[];
    search?: string;
}

/**
 * Debug information
 */
export interface AvatarDebugInfo {
    current: {
        avatar: string[];
        color: string;
        parsed: {
            top: string;
            mid: string;
            bottom: string;
            expression: string;
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
