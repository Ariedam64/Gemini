// src/api/avatar.ts
/**
 * Avatar Outfit API
 * Dynamically list and manage all available avatar cosmetics in Magic Garden
 */

import { allCosmeticItems } from "../data/cosmetics/allCosmeticItems";
import type {
    CosmeticType,
    CosmeticAvailability,
} from "../data/cosmetics/cosmeticTypes";
import type {
    CosmeticInfo,
    AvatarOutfit,
    CurrentAvatar,
    AvatarDebugInfo,
    ListOptions,
} from "./avatar.types";
import { setPlayerData } from "../websocket/api";
import { pageWindow } from "../utils/windowContext";

// ─────────────────────────────────────────────────────────────────────────────
// Internal State & Helpers
// ─────────────────────────────────────────────────────────────────────────────

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
        const { Store } = await import("../atoms/store");

        const myData = await Store.select("myDataAtom");

        if (!myData || typeof myData !== "object") {
            throw new Error("myDataAtom not available");
        }

        const cosmetic = (myData as any).cosmetic as Record<string, unknown> | undefined;
        const name = (myData as any).name as string | undefined;

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

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * List all cosmetic items with metadata
 * @param options Optional filtering by type, availability, or search term
 * @returns Array of cosmetic items with full URLs
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
 * @param options Optional filtering by type, availability, or search term
 * @returns Array of full asset URLs
 */
export function listUrls(options?: ListOptions): string[] {
    return list(options).map((item) => item.url);
}

/**
 * Get current avatar configuration
 * @returns Current avatar state with parsed slots
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
 * Set avatar outfit (allows any cosmetic for preview purposes)
 * Preserves player name and only updates specified slots
 * @param outfit Partial outfit specification
 * @returns Promise resolving to true on success
 */
export async function set(outfit: AvatarOutfit): Promise<boolean> {
    try {
        const current = await getCurrentAvatarState();
        const currentParsed = await get();

        // Build new avatar array with updates
        const newAvatar = [...current.avatar];

        if (outfit.bottom !== undefined) {
            newAvatar[AVATAR_INDICES.BOTTOM] = outfit.bottom;
        }
        if (outfit.mid !== undefined) {
            newAvatar[AVATAR_INDICES.MID] = outfit.mid;
        }
        if (outfit.top !== undefined) {
            newAvatar[AVATAR_INDICES.TOP] = outfit.top;
        }
        if (outfit.expression !== undefined) {
            newAvatar[AVATAR_INDICES.EXPRESSION] = outfit.expression;
        }

        const newColor = outfit.color !== undefined ? outfit.color : current.color;

        // Validate that items exist (warn but don't block)
        const allFilenames = allCosmeticItems.map((item) => item.filename);
        [outfit.bottom, outfit.mid, outfit.top, outfit.expression].forEach((filename) => {
            if (filename && !allFilenames.includes(filename as any)) {
                console.warn(`[Avatar] Cosmetic not found in catalog: ${filename}`);
            }
        });

        // Send to server (preserves player name as requested)
        const result = setPlayerData(
            {
                name: current.name,
                cosmetic: {
                    color: newColor,
                    avatar: newAvatar,
                },
            },
            pageWindow
        );

        console.log("[Avatar] Set outfit:", { outfit, result });
        return true;
    } catch (err) {
        console.error("[Avatar] Failed to set outfit:", err);
        return false;
    }
}

/**
 * Reset avatar to default gray outfit
 * @returns Promise resolving to true on success
 */
export async function blank(): Promise<boolean> {
    return set({
        top: "Top_DefaultGray.png",
        mid: "Mid_DefaultGray.png",
        bottom: "Bottom_DefaultGray.png",
        expression: "Expression_Default.png",
        color: "Red",
    });
}

/**
 * Get comprehensive debugging information
 * @returns Debug info about avatar system
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
