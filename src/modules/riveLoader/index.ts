/**
 * MGRiveLoader Module
 *
 * Manages Rive animation files (.riv) and instances with dynamic cosmetic loading.
 * Provides caching, discovery, and outfit management for Rive avatars.
 *
 * @example
 * ```typescript
 * // Initialize module
 * await MGRiveLoader.init();
 *
 * // List available .riv files
 * const files = MGRiveLoader.list();
 *
 * // Create instance with outfit
 * const instance = await MGRiveLoader.createInstance({
 *     canvas: myCanvas,
 *     outfit: { top: 'Top_Wizard.png', mid: 'Mid_Glasses.png', ... }
 * });
 *
 * // Update outfit
 * await MGRiveLoader.updateOutfit(instance, { top: 'Top_Crown.png', ... });
 *
 * // Cleanup
 * instance.destroy();
 * ```
 */

import { discoverRiveFiles, findAvatarRiveFile } from './logic/discovery';
import { loadRiveFile } from './logic/loader';
import { createRiveInstance, updateInstanceOutfit, type CreateRiveInstanceOptions } from './logic/instance';
import { isReady as checkReady, setReady, getDiscoveredFiles } from './state';

export type {
    RiveFileInfo,
    AvatarOutfit,
    RiveInstanceHandle,
    RiveFileCacheEntry
} from './types';

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────

let initialized = false;

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Initialize the module
 * Discovers available .riv files from game scripts
 * Idempotent - safe to call multiple times
 */
async function init(): Promise<void> {
    if (initialized) return;
    initialized = true;

    try {
        // Discover .riv files
        await discoverRiveFiles();
        setReady(true);
        console.log('[MGRiveLoader] Initialized');
    } catch (err) {
        console.error('[MGRiveLoader] Initialization failed:', err);
        setReady(false);
        throw err;
    }
}

/**
 * Check if module is ready
 */
function isReady(): boolean {
    return checkReady();
}

/**
 * List discovered .riv files
 */
function list() {
    return getDiscoveredFiles();
}

/**
 * Get a specific RiveFile by URL
 * Loads and caches if not already loaded
 */
async function getRiveFile(url: string) {
    return await loadRiveFile(url);
}

/**
 * Get the avatar .riv file specifically
 */
async function getAvatarRiveFile() {
    const file = await findAvatarRiveFile();
    if (!file) return null;
    return await loadRiveFile(file.url);
}

/**
 * Create a Rive instance with outfit
 */
async function createInstance(options: CreateRiveInstanceOptions) {
    return await createRiveInstance(options);
}

/**
 * Update outfit on existing instance
 */
async function updateOutfit(handle: Parameters<typeof updateInstanceOutfit>[0], outfit: Parameters<typeof updateInstanceOutfit>[1]) {
    return await updateInstanceOutfit(handle, outfit);
}

// ─────────────────────────────────────────────────────────────────────────────
// Export
// ─────────────────────────────────────────────────────────────────────────────

export const MGRiveLoader = {
    // Required (standard API)
    init,
    isReady,

    // Discovery
    list,

    // Loading
    getRiveFile,
    getAvatarRiveFile,

    // Instances
    createInstance,
    updateOutfit,
};
