// src/api/avatar.types.ts
/**
 * TypeScript type definitions for the Avatar API
 */

import type {
    CosmeticType,
    CosmeticAvailability,
    CosmeticItem,
} from "../data/cosmetics/cosmeticTypes";

export type { CosmeticType, CosmeticAvailability };

/**
 * Extended cosmetic info with computed URL
 */
export interface CosmeticInfo extends CosmeticItem {
    url: string; // Full asset URL with version hash
}

/**
 * Avatar outfit specification (partial updates supported)
 */
export interface AvatarOutfit {
    top?: string; // filename like "Top_AviatorHat.png"
    mid?: string;
    bottom?: string;
    expression?: string;
    color?: string; // color ID like "Red", "Blue"
}

/**
 * Complete current avatar state
 */
export interface CurrentAvatar {
    top: string;
    mid: string;
    bottom: string;
    expression: string;
    color: string;
    array: string[]; // Raw 4-element array [bottom, mid, top, expression]
}

/**
 * Debug information about avatar system
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
    counts: Record<CosmeticType, number>;
    allItems: CosmeticInfo[];
    assetBaseUrl: string;
}

/**
 * Options for filtering cosmetic lists
 */
export interface ListOptions {
    type?: CosmeticType | CosmeticType[];
    availability?: CosmeticAvailability | CosmeticAvailability[];
    search?: string; // case-insensitive search in displayName
}
