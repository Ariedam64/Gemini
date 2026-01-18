// src/modules/cosmetic/avatar/query.ts
/**
 * Avatar query functions (list, get, debug)
 */

import { allCosmeticItems } from "./allCosmeticItems";
import type {
    CosmeticInfo,
    CurrentAvatar,
    AvatarDebugInfo,
    ListOptions,
    CosmeticType,
} from "./types";
import { pageWindow } from "../../../utils/windowContext";

const AVATAR_INDICES = {
    BOTTOM: 0,
    MID: 1,
    TOP: 2,
    EXPRESSION: 3,
} as const;

/**
 * Get the base URL for cosmetic assets with version hash
 */
function getAssetBaseUrl(): string {
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
async function getCurrentAvatarState(): Promise<{ avatar: string[]; color: string; name: string }> {
    try {
        // Use Gemini Store bridge to read atoms (recommended pattern)
        const { Store } = await import("../../../atoms/store");

        const myData = await Store.select("myDataAtom");

        console.log("[Avatar Debug] myDataAtom:", myData);

        if (!myData || typeof myData !== "object") {
            throw new Error("myDataAtom not available");
        }

        const cosmetic = (myData as any).cosmetic as Record<string, unknown> | undefined;
        const name = (myData as any).name as string | undefined;

        console.log("[Avatar Debug] cosmetic:", cosmetic);
        console.log("[Avatar Debug] avatar array:", cosmetic?.avatar);
        console.log("[Avatar Debug] color:", cosmetic?.color);

        return {
            avatar: (cosmetic?.avatar as string[]) || [
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
 * List all cosmetic items with metadata
 */
export function list(options?: ListOptions): CosmeticInfo[] {
    const baseUrl = getAssetBaseUrl();

    const items: CosmeticInfo[] = allCosmeticItems.map((item) => ({
        ...item,
        url: `${baseUrl}${item.filename}`,
    }));

    return filterCosmetics(items, options);
}

/**
 * List all cosmetic asset URLs
 */
export function listUrls(options?: ListOptions): string[] {
    return list(options).map((item) => item.url);
}

/**
 * Get current avatar configuration
 */
export async function get(): Promise<CurrentAvatar> {
    const state = await getCurrentAvatarState();

    return {
        bottom: state.avatar[AVATAR_INDICES.BOTTOM] || "Bottom_DefaultGray.png",
        mid: state.avatar[AVATAR_INDICES.MID] || "Mid_DefaultGray.png",
        top: state.avatar[AVATAR_INDICES.TOP] || "Top_DefaultGray.png",
        expression: state.avatar[AVATAR_INDICES.EXPRESSION] || "Expression_Default.png",
        color: state.color,
        array: state.avatar,
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
