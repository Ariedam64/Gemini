// src/modules/cosmetic/avatar/logic/query.ts
/**
 * Avatar query functions (list, get, debug)
 */

import { getCurrentAvatarState } from "./internal";
import { getCatalog, loadCatalog, resolveCosmeticUrl } from "./catalog";

export { resolveCosmeticUrl } from "./catalog";
import {
    CosmeticInfo,
    CurrentAvatar,
    AvatarDebugInfo,
    ListOptions,
    CosmeticType,
    ALT_ASSET_PATH,
    BLANK_PATHS,
} from "../types";

import { isOwned, initOwnership } from './ownership';
import { isDevBuild } from '../../../../utils/buildMode';

let ownershipInitialized = false;

async function ensureOwnershipReady() {
    if (ownershipInitialized) return;
    await initOwnership();
    ownershipInitialized = true;
}

/**
 * Filter cosmetics based on options
 */
function filterCosmetics(items: CosmeticInfo[], options?: ListOptions): CosmeticInfo[] {
    if (!options) return items;

    let filtered = items;

    // Filter by type
    if (options.type) {
        const types = Array.isArray(options.type) ? options.type : [options.type];
        filtered = filtered.filter((item) => types.includes(item.type));
    }

    // Filter by availability
    if (options.availability) {
        const availabilities = Array.isArray(options.availability)
            ? options.availability
            : [options.availability];
        filtered = filtered.filter((item) => availabilities.includes(item.availability));
    }

    // Filter by search term
    if (options.search) {
        const searchLower = options.search.toLowerCase();
        filtered = filtered.filter((item) =>
            item.displayName.toLowerCase().includes(searchLower)
        );
    }

    return filtered;
}

/**
 * Filter cosmetics based on ownership
 */
function applyOwnershipFilter(items: CosmeticInfo[], options?: ListOptions): CosmeticInfo[] {
    const devBuild = isDevBuild();

    if (devBuild || options?.includeUnowned) {
        return items;
    }

    return items.filter(item => {
        if (item.availability === 'default') {
            return true;
        }
        return isOwned(item.filename);
    });
}

/**
 * Build the synthetic "None" entries for each slot.
 *
 * These are not catalog items: they let the picker clear a slot. Only shown in
 * dev builds, and skipped when the blank asset is already a real catalog entry.
 */
function buildNoneOptions(items: CosmeticInfo[], options?: ListOptions): CosmeticInfo[] {
    if (!isDevBuild()) return [];

    const known = new Set(items.map((item) => item.filename));
    const slots = options?.type
        ? (Array.isArray(options.type) ? options.type : [options.type])
        : ["Top", "Mid", "Bottom", "Expression"];

    const noneOptions: CosmeticInfo[] = [];
    for (const slot of slots) {
        const filename = BLANK_PATHS[slot] || ALT_ASSET_PATH;
        if (known.has(filename)) continue;

        noneOptions.push({
            id: `None_${slot}`,
            filename,
            type: slot as CosmeticType,
            displayName: "None",
            availability: "default",
            price: 0,
            url: resolveCosmeticUrl(filename),
        });
    }
    return noneOptions;
}

/**
 * List all cosmetic items with metadata.
 *
 * Synchronous, and therefore empty until the catalog has loaded — use
 * {@link listAsync} when the caller can wait.
 */
export function list(options?: ListOptions): CosmeticInfo[] {
    const items = [...getCatalog()];
    const combined = [...buildNoneOptions(items, options), ...items];

    return applyOwnershipFilter(filterCosmetics(combined, options), options);
}

/**
 * List cosmetics, waiting for the catalog and ownership data first.
 */
export async function listAsync(options?: ListOptions): Promise<CosmeticInfo[]> {
    await Promise.all([loadCatalog(), ensureOwnershipReady()]);
    return list(options);
}

/**
 * Preload the cosmetic catalog.
 */
export async function preloadDiscovery(): Promise<void> {
    await loadCatalog();
}

/**
 * List all cosmetic asset URLs
 */
export function listUrls(options?: ListOptions): string[] {
    return list(options).map((item) => item.url);
}

/**
 * Get current avatar state
 */
export async function get(): Promise<CurrentAvatar> {
    const { avatar, color } = await getCurrentAvatarState();

    return {
        top: avatar[2],
        mid: avatar[1],
        bottom: avatar[0],
        expression: avatar[3],
        color,
        array: avatar,
    };
}

/**
 * Get comprehensive debugging information
 */
export async function debug(): Promise<AvatarDebugInfo> {
    const current = await getCurrentAvatarState();
    const currentParsed = await get();
    const items = await listAsync();

    // Count items by type
    const counts = {} as Record<CosmeticType, number>;
    items.forEach((item) => {
        counts[item.type] = (counts[item.type] || 0) + 1;
    });

    return {
        current: {
            avatar: current.avatar,
            color: current.color,
            parsed: {
                top: currentParsed.top,
                mid: currentParsed.mid,
                bottom: currentParsed.bottom,
                expression: currentParsed.expression,
            },
        },
        counts,
        allItems: items,
        assetBaseUrl: getAssetBaseUrl(),
    };
}

/**
 * Base URL the cosmetic assets are served from.
 *
 * Reported for debugging only. The catalog carries absolute URLs, so nothing
 * builds a path from this any more; it is read back off the first entry rather
 * than scraped from the page.
 */
export function getAssetBaseUrl(): string {
    const first = getCatalog()[0];
    if (!first?.url) return "";
    return first.url.slice(0, first.url.lastIndexOf("/") + 1);
}
