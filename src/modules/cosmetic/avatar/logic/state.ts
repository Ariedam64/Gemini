// src/modules/cosmetic/avatar/state.ts
/**
 * Avatar state management (set, blank)
 */

import type { AvatarOutfit } from "../types";
import { setPlayerData } from "../../../../websocket/api";
import { pageWindow } from "../../../../utils/windowContext";

const AVATAR_INDICES = {
    BOTTOM: 0,
    MID: 1,
    TOP: 2,
    EXPRESSION: 3,
} as const;

/**
 * Get current avatar state from game atoms
 */
async function getCurrentAvatarState(): Promise<{ avatar: string[]; color: string; name: string }> {
    try {
        const { Store } = await import("../../../../atoms/store");
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

import { get } from "./query";

/**
 * Set avatar outfit (allows any cosmetic for preview purposes)
 * Preserves player name and only updates specified slots
 */
export async function set(outfit: AvatarOutfit): Promise<boolean> {
    try {
        const current = await get();

        // Build new avatar array with updates
        const finalAvatar: (string | null)[] = [
            outfit.bottom !== undefined ? outfit.bottom : current.bottom,
            outfit.mid !== undefined ? outfit.mid : current.mid,
            outfit.top !== undefined ? outfit.top : current.top,
            outfit.expression !== undefined ? outfit.expression : current.expression,
        ];

        const newColor = outfit.color !== undefined ? outfit.color : current.color;

        // Note: Catalog validation removed - discovery-first pattern means
        // all valid cosmetics should be discoverable from the manifest

        // Send to server
        const result = setPlayerData(
            {
                cosmetic: {
                    color: newColor,
                    avatar: finalAvatar,
                },
            },
            pageWindow
        );

        console.log("[Avatar] Set outfit:", { outfit, finalAvatar, result });
        return true;
    } catch (err) {
        console.error("[Avatar] Failed to set outfit:", err);
        return false;
    }
}

/**
 * Reset avatar to default gray outfit
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
