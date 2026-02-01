// src/modules/cosmetic/avatar/query.ts
/**
 * Avatar query functions (list, get, debug)
 */

import { CRITICAL_DEFAULTS } from "./criticalDefaults";
import {
    CosmeticInfo,
    CurrentAvatar,
    AvatarDebugInfo,
    ListOptions,
    CosmeticType,
    ALT_ASSET_PATH,
    BLANK_PATHS,
} from "../types";

import { pageWindow } from "../../../../utils/windowContext";
import { waitForStore } from "../../../../atoms/store";
import { isOwned, initOwnership } from './ownership';
import { isDevBuild } from '../../../../utils/buildMode';

const AVATAR_INDICES = {
    BOTTOM: 0,
    MID: 1,
    TOP: 2,
    EXPRESSION: 3,
} as const;

const discoveredItems: CosmeticInfo[] = [];
let isDiscovered = false;
let discoveryStarted = false;

function ensureDiscoveryStarted() {
    if (discoveryStarted) return;
    discoveryStarted = true;
    discoverFromManifest().then(() => {
        // Discovery complete
    }).catch(() => {
        // Discovery failed, fallbacks will be used
    });
}

// Start discovery immediately
ensureDiscoveryStarted();

let ownershipInitialized = false;

async function ensureOwnershipReady() {
    if (ownershipInitialized) return;
    await initOwnership();
    ownershipInitialized = true;
}

/**
 * Get the base URL for cosmetic assets with version hash
 */
export function getAssetBaseUrl(): string {
    try {
        // Try to find version hash from loaded script tags
        const scripts = Array.from(pageWindow.document.querySelectorAll("script"));
        const versionedScript = scripts.find((s) => s.src.includes("/version/"));

        if (versionedScript) {
            // Extract: "https://magicgarden.gg/version/f72ae33/assets/..."
            const match = versionedScript.src.match(/(https:\/\/.+?\/version\/[^/]+)/);
            if (match) {
                return `${match[1]}/assets/cosmetic/`;
            }
        }

        // Fallback: try to construct from window.location.origin
        console.warn("[Avatar] Could not find versioned asset path, using fallback");
        return `${pageWindow.location.origin}/assets/cosmetic/`;
    } catch (err) {
        console.error("[Avatar] Failed to get asset base URL:", err);
        return "https://magicgarden.gg/assets/cosmetic/"; // Last resort
    }
}

/**
 * Get current avatar state from game atoms
 */
async function getCurrentAvatarState(): Promise<{ avatar: (string | null)[]; color: string; name: string }> {
    try {
        await waitForStore();
        const { Store } = await import("../../../../atoms/store");

        // Use playerAtom which contains the equipped cosmetics
        let playerData = await Store.select("playerAtom");
        for (let i = 0; i < 5 && (!playerData || Object.keys(playerData).length === 0); i++) {
            await new Promise(r => setTimeout(r, 200 * i));
            playerData = await Store.select("playerAtom");
        }

        if (!playerData || (typeof playerData === "object" && Object.keys(playerData).length === 0)) {
            throw new Error("playerAtom not available");
        }

        const cosmetic = (playerData as any).cosmetic as Record<string, unknown> | undefined;
        const name = (playerData as any).name as string | undefined;

        return {
            avatar: (cosmetic?.avatar as (string | null)[]) || [
                "Bottom_DefaultGray.png",
                "Mid_DefaultGray.png",
                "Top_DefaultGray.png",
                "Expression_Default.png",
            ],
            color: (cosmetic?.color as string) || "Red",
            name: name || "Player",
        };
    } catch (err) {
        console.error("[Avatar] Failed to get current avatar state:", err);
        return {
            avatar: [
                "Bottom_DefaultGray.png",
                "Mid_DefaultGray.png",
                "Top_DefaultGray.png",
                "Expression_Default.png",
            ],
            color: "Red",
            name: "Player",
        };
    }
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
        return isOwned(item.filename as string);
    });
}

/**
 * Discover items from game manifest
 */
async function discoverFromManifest(): Promise<void> {
    if (isDiscovered) return;
    try {
        const baseUrl = getAssetBaseUrl();
        // The manifest is usually in the same assets folder
        const manifestUrl = baseUrl.replace(/\/cosmetic\/$/, "/manifest.json");

        const response = await fetch(manifestUrl);
        if (!response.ok) return;

        const manifest = await response.json();
        const bundles = manifest?.bundles || [];
        const cosmeticBundle = bundles.find((b: any) => b.name === "cosmetic" || b.name === "cosmetics");

        if (!cosmeticBundle) return;

        // Start with critical defaults pre-seeded to avoid duplicates
        const seen = new Set<string>(CRITICAL_DEFAULTS.map(i => i.filename as string));

        for (const asset of cosmeticBundle.assets || []) {
            for (const src of asset.src || []) {
                if (typeof src !== "string") continue;

                // Match: cosmetic/Bottom_WizardRobe.png or cosmetics/Trader_Top.png
                const match = /^(cosmetic|cosmetics)\/(.+)\.png$/i.exec(src);
                if (!match) continue;

                const folder = match[1];
                const baseName = match[2];
                const filename = `${baseName}.png`;
                if (seen.has(filename)) continue;

                const parts = baseName.split("_");
                if (parts.length < 2) continue;

                const type = parts[0] as CosmeticType;
                // Add spaces between camelCase words in the name
                const displayName = parts.slice(1).join(" ")
                    .replace(/([a-z])([A-Z])/g, '$1 $2');

                // Ensure we don't double up the folder if the filename already has it or if we handle it via url
                discoveredItems.push({
                    id: filename,
                    filename: filename as any,
                    type,
                    displayName,
                    availability: "purchasable" as any,
                    price: 0,
                    // Construct URL relative to assets folder
                    url: `${baseUrl.replace(/\/cosmetic\/$/, `/${folder}/`)}${filename}`
                });
                seen.add(filename);
            }
        }

        isDiscovered = true;
        console.log(`[Avatar] Discovered ${discoveredItems.length} new items from manifest`);
    } catch (err) {
        console.error("[Avatar] Discovery failed:", err);
    }
}

/**
 * List all cosmetic items with metadata
 */
export function list(options?: ListOptions): CosmeticInfo[] {
    const baseUrl = getAssetBaseUrl();

    // Priority 1: Discovered items from manifest (primary source)
    const discoveredWithUrls: CosmeticInfo[] = discoveredItems.map((item) => ({
        ...item,
        url: item.url || `${baseUrl}${item.filename}`,
    }));

    // Priority 2: Critical defaults (fallback if discovery fails/incomplete)
    const defaultsWithUrls: CosmeticInfo[] = CRITICAL_DEFAULTS.map((item) => ({
        ...item,
        url: `${baseUrl}${item.filename}`,
    }));

    // Deduplicate: Use Set to track filenames
    const seen = new Set<string>();
    const items: CosmeticInfo[] = [];

    // Add discovered items first
    for (const item of discoveredWithUrls) {
        if (!seen.has(item.filename as string)) {
            items.push(item);
            seen.add(item.filename as string);
        }
    }

    // Add defaults for any missing types
    for (const item of defaultsWithUrls) {
        if (!seen.has(item.filename as string)) {
            items.push(item);
            seen.add(item.filename as string);
        }
    }

    // Add "None" option (only if not already in items, to avoid duplicates)
    const noneOptions: CosmeticInfo[] = [];
    if (isDevBuild()) {
        const typesToNone = options?.type
            ? (Array.isArray(options.type) ? options.type : [options.type])
            : ["Top", "Mid", "Bottom", "Expression"];

        typesToNone.forEach(t => {
            const noneFilename = BLANK_PATHS[t] || ALT_ASSET_PATH;
            // Only add if not already in items (dedup against seen set)
            if (!seen.has(noneFilename)) {
                noneOptions.push({
                    id: `None_${t}`,
                    filename: noneFilename as any,
                    type: t as any,
                    displayName: "None",
                    availability: "default",
                    price: 0,
                    url: noneFilename ? `${baseUrl}${noneFilename}` : ""
                });
            }
        });
    }

    const combined = [...noneOptions, ...items];

    let filtered = filterCosmetics(combined, options);
    filtered = applyOwnershipFilter(filtered, options);

    return filtered;
}

/**
 * Initialize ownership before returning list (async version)
 */
export async function listAsync(options?: ListOptions): Promise<CosmeticInfo[]> {
    await ensureOwnershipReady();
    return list(options);
}

/**
 * Preload discovered items
 */
export async function preloadDiscovery(): Promise<void> {
    await discoverFromManifest();
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
    const items = list();

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
