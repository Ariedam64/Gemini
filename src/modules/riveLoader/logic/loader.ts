/**
 * RiveLoader Loading Logic
 *
 * Loads and caches RiveFile instances with ImageAssets
 * Pattern from game: capture ImageAsset references, apply cosmetics later
 */

import { type FileAsset, type ImageAsset, RiveFile } from '@rive-app/canvas';
import type { RiveFileCacheEntry } from '../types';
import { DYNAMIC_IMAGE_ASSETS } from '../types';
import { getRiveFileCache, setRiveFileCache } from '../state';

/**
 * Load a RiveFile from URL and capture ImageAssets
 * Uses the game's pattern: assetLoader captures references by returning true
 */
export async function loadRiveFile(url: string): Promise<RiveFileCacheEntry> {
    // Check cache first
    const cached = getRiveFileCache(url);
    if (cached) {
        console.log(`[MGRiveLoader] Using cached RiveFile: ${url}`);
        return cached;
    }

    console.log(`[MGRiveLoader] Loading RiveFile from: ${url}`);

    // Fetch the .riv file
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to load RiveFile: ${url} (${response.status})`);
    }

    const buffer = await response.arrayBuffer();

    // Storage for captured image assets (game pattern)
    const imageAssets: Record<string, ImageAsset> = {};

    // Create RiveFile with asset loader to capture image assets
    let riveFile: RiveFile | null = null;

    await new Promise<void>((resolve, reject) => {
        riveFile = new RiveFile({
            buffer,
            assetLoader: (asset: FileAsset) => {
                // Capture dynamic image asset references (game pattern)
                if ((asset as any).isImage && DYNAMIC_IMAGE_ASSETS.includes(asset.name)) {
                    imageAssets[asset.name] = asset as ImageAsset;
                    console.log(`[MGRiveLoader] Captured image asset: ${asset.name}`);
                    return true; // We'll provide the image later with setRenderImage()
                }
                return false;
            },
            onLoad: () => {
                console.log(`[MGRiveLoader] RiveFile loaded: ${url}`);
                resolve();
            },
            onLoadError: (err) => {
                console.error(`[MGRiveLoader] RiveFile load error:`, err);
                reject(err);
            },
        });

        // IMPORTANT: Must call init() to actually load the file! (like the game does)
        riveFile.init().catch((err) => {
            console.error(`[MGRiveLoader] Failed to initialize RiveFile:`, err);
            reject(err);
        });
    });

    if (!riveFile) {
        throw new Error(`[MGRiveLoader] Failed to create RiveFile for ${url}`);
    }

    // Increment ref count (like the game does) so RiveFile is not destroyed
    riveFile.getInstance();

    // Create cache entry
    const entry: RiveFileCacheEntry = {
        riveFile,
        imageAssets,
        url,
        loadedAt: Date.now(),
    };

    // Cache it
    setRiveFileCache(url, entry);

    return entry;
}
