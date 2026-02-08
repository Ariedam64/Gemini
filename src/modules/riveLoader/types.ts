/**
 * RiveLoader Module Types
 */

import type { ImageAsset, RiveFile } from '@rive-app/canvas';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Dynamic image asset slots in Rive avatar files
 */
export const DYNAMIC_IMAGE_ASSETS = ['Top', 'Mid', 'Bottom', 'DiscordAvatarPlaceholder'] as const;
export type DynamicImageAssetName = typeof DYNAMIC_IMAGE_ASSETS[number];

/**
 * Cached RiveFile with captured ImageAssets
 */
export interface RiveFileCacheEntry {
    /** The loaded RiveFile */
    riveFile: RiveFile;
    /** Captured dynamic image assets */
    imageAssets: Record<string, ImageAsset>;
    /** URL of the .riv file */
    url: string;
    /** Timestamp when loaded */
    loadedAt: number;
}

/**
 * Avatar outfit configuration
 */
export interface AvatarOutfit {
    top: string | null;
    mid: string | null;
    bottom: string | null;
    expression: string | null;
}

/**
 * Rive instance handle
 */
export interface RiveInstanceHandle {
    /** The Rive instance */
    rive: any; // Rive class from @rive-app/canvas
    /** Associated RiveFile cache entry */
    cacheEntry: RiveFileCacheEntry;
    /** Current outfit */
    outfit: AvatarOutfit;
    /** Play animation */
    play(): void;
    /** Pause animation */
    pause(): void;
    /** Fire a state machine trigger input by name (returns true if found) */
    triggerAnimation(name: string): boolean;
    /** Fire a random trigger input from the state machine (returns true if any found) */
    randomAnimation(): boolean;
    /** Cleanup */
    destroy(): void;
}

/**
 * Known .riv files in the game
 */
export interface RiveFileInfo {
    /** File identifier */
    name: string;
    /** Full URL */
    url: string;
    /** Type/category */
    type: 'avatar' | 'emote' | 'ui' | 'other';
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Known .riv file patterns to search for
 */
export const RIVE_FILE_PATTERNS = {
    AVATAR: /avatarelements[^"']*\.riv/,
    EMOTES: /emotes[^"']*\.riv/,
    UI: /(giftbox|currency|bread|donut|streak)[^"']*\.riv/,
} as const;
