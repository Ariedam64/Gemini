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
 * A state machine input, with the type that decides how it is driven.
 *
 * A `trigger` is fired, a `boolean` and a `number` are set. Getting it wrong
 * does nothing at all and raises no error, which is why this is worth knowing
 * rather than guessing.
 */
export interface RiveStateMachineInput {
    name: string;
    type: 'trigger' | 'boolean' | 'number';
}

export interface RiveStateMachine {
    name: string;
    inputs: RiveStateMachineInput[];
}

export interface RiveAnimation {
    name: string;
    frames: number;
    fps: number;
    durationMs: number;
}

export interface RiveArtboard {
    name: string;
    width: number;
    height: number;
    animations: RiveAnimation[];
    stateMachines: RiveStateMachine[];
}

/**
 * A .riv file published by the MG API.
 */
export interface RiveFileInfo {
    /** Catalog key: `avatar`, `pets`, `decor`, `currency`, ... */
    name: string;
    /** Fetchable URL, proxied by the API so CORS headers are present. */
    url: string;
    /** Type/category */
    type: 'avatar' | 'emote' | 'ui' | 'other';
    /** Whether the file can actually be parsed by a Rive runtime. */
    loadable: boolean;
    /** Versioned game URL. Not fetchable from a browser — for reference only. */
    origin?: string;
    /** Inventory of what the file contains. Empty if the API could not read it. */
    artboards: RiveArtboard[];
}
