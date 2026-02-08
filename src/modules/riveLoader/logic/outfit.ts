/**
 * RiveLoader Outfit Logic
 *
 * Loads and applies cosmetic images to Rive ImageAssets
 * Uses the game's pattern: decodeImage() + setRenderImage()
 */

import { decodeImage } from '@rive-app/canvas';
import { getAssetBaseUrl } from '../../cosmetic/avatar/logic/query';
import type { AvatarOutfit, RiveFileCacheEntry } from '../types';

const BLANK_PATH_SUFFIX = '_Blank.png';

/** Cached transparent PNG buffer (1×1 transparent pixel) */
let transparentPngCache: Uint8Array | null = null;

function getTransparentPng(): Promise<Uint8Array> {
    if (transparentPngCache) return Promise.resolve(transparentPngCache);
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return new Promise<Uint8Array>((resolve, reject) => {
        canvas.toBlob(blob => {
            if (!blob) { reject(new Error('[MGRiveLoader] Failed to create transparent PNG')); return; }
            blob.arrayBuffer().then(buf => {
                transparentPngCache = new Uint8Array(buf);
                resolve(transparentPngCache);
            }, reject);
        }, 'image/png');
    });
}

async function applyImageAsset(asset: unknown, filename: string, assetBase: string): Promise<void> {
    let buffer: Uint8Array;
    if (filename.includes(BLANK_PATH_SUFFIX)) {
        buffer = await getTransparentPng();
    } else {
        const arrayBuffer = await fetch(`${assetBase}${filename}`).then(res => res.arrayBuffer());
        buffer = new Uint8Array(arrayBuffer);
    }
    const image = await decodeImage(buffer);
    (asset as any).setRenderImage(image);
    image.unref();
}

/**
 * Apply outfit to RiveFile ImageAssets
 * Uses the game's pattern from setAvatarImage.ts:
 * 1. Fetch cosmetic image bytes (or transparent PNG for blank slots)
 * 2. Decode with decodeImage()
 * 3. Apply with setRenderImage()
 * 4. Cleanup with unref()
 */
export async function applyOutfit(
    cacheEntry: RiveFileCacheEntry,
    outfit: AvatarOutfit
): Promise<void> {
    const { imageAssets } = cacheEntry;
    const assetBase = getAssetBaseUrl();
    const tasks: Promise<void>[] = [];

    if (outfit.top && imageAssets.Top) {
        tasks.push(
            applyImageAsset(imageAssets.Top, outfit.top, assetBase)
                .catch(err => console.warn('[MGRiveLoader] Failed to load Top:', err))
        );
    }

    if (outfit.mid && imageAssets.Mid) {
        tasks.push(
            applyImageAsset(imageAssets.Mid, outfit.mid, assetBase)
                .catch(err => console.warn('[MGRiveLoader] Failed to load Mid:', err))
        );
    }

    if (outfit.bottom && imageAssets.Bottom) {
        tasks.push(
            applyImageAsset(imageAssets.Bottom, outfit.bottom, assetBase)
                .catch(err => console.warn('[MGRiveLoader] Failed to load Bottom:', err))
        );
    }

    // Note: Expression is handled via state machine inputs, not as an image!
    // DiscordAvatarPlaceholder slot is only for Discord avatar URLs
    // TODO: Handle expression via Rive state machine setInput('expression', index)

    await Promise.all(tasks);
}
