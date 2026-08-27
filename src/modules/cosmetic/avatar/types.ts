// src/modules/cosmetic/avatar/types.ts
/**
 * Avatar module type definitions
 */

/**
 * Avatar slot a cosmetic belongs to.
 *
 * Mirrors the `cat` field of `/assets/cosmetics`. Kept as a union of the
 * categories the API serves today, widened by `(string & {})` so a category
 * added game-side still type-checks instead of breaking the build — the
 * catalog passes `cat` through untouched.
 */
export type CosmeticType =
    | "Top"
    | "Mid"
    | "Bottom"
    | "Expression"
    | "Banner"
    | "Default"
    | "FaceProp"
    | "Status"
    | (string & {});

/**
 * Whether an item is free for everyone or has to be owned.
 *
 * Not served by the API — derived from the naming convention in
 * `logic/catalog.ts`, which is the only place that knows the rule.
 */
export type CosmeticAvailability = "default" | "purchasable";

/**
 * A cosmetic as the mod uses it, built from one `/assets/cosmetics` entry.
 */
export interface CosmeticItem {
    /** Stable id: the API's `base`, e.g. `Top_DonutHalo`. */
    id: string;
    /** Asset filename, `base` plus `.png`. This is what the game stores. */
    filename: string;
    type: CosmeticType;
    displayName: string;
    availability: CosmeticAvailability;
    /** Always 0: the API does not price cosmetics. Kept for API compatibility. */
    price: number;
}

/**
 * Cosmetic item with its absolute asset URL.
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
    // The game ships no `Expression_Blank`: the only `_Blank` assets are Top,
    // Mid and Bottom. The neutral face is `Expression_Default`.
    Expression: "Expression_Default.png",
};
