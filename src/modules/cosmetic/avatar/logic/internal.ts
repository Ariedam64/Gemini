/**
 * Avatar module — internal shared utilities
 * Not exported from the public API.
 */

import type { AvatarOutfit } from "../types";

export const AVATAR_INDICES = {
    BOTTOM: 0,
    MID: 1,
    TOP: 2,
    EXPRESSION: 3,
} as const;

const DEFAULT_AVATAR = [
    "Bottom_DefaultGray.png",
    "Mid_DefaultGray.png",
    "Top_DefaultGray.png",
    "Expression_Default.png",
] as const;

/**
 * Get current avatar state from myDataAtom (local player).
 */
export async function getCurrentAvatarState(): Promise<{ avatar: (string | null)[]; color: string; name: string }> {
    try {
        const { Store } = await import("../../../../atoms/store");
        const myData = await Store.select("myDataAtom");

        if (!myData || typeof myData !== "object") {
            throw new Error("myDataAtom not available");
        }

        const cosmetic = (myData as any).cosmetic as Record<string, unknown> | undefined;
        const name = (myData as any).name as string | undefined;

        return {
            avatar: (cosmetic?.avatar as (string | null)[]) || [...DEFAULT_AVATAR],
            color: (cosmetic?.color as string) || "Red",
            name: name || "Player",
        };
    } catch (err) {
        console.error("[Avatar] Failed to get current avatar state:", err);
        return {
            avatar: [...DEFAULT_AVATAR],
            color: "Red",
            name: "Player",
        };
    }
}

/**
 * Convert outfit to avatar array, merging with provided base values.
 */
export function outfitToArray(outfit: AvatarOutfit, current?: string[] | null): string[] {
    const base: string[] = current ? [...current] : [...DEFAULT_AVATAR];
    if (outfit.bottom) base[AVATAR_INDICES.BOTTOM] = outfit.bottom;
    if (outfit.mid) base[AVATAR_INDICES.MID] = outfit.mid;
    if (outfit.top) base[AVATAR_INDICES.TOP] = outfit.top;
    if (outfit.expression) base[AVATAR_INDICES.EXPRESSION] = outfit.expression;
    return base;
}
