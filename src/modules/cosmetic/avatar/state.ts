// src/modules/cosmetic/avatar/state.ts
/**
 * Avatar state management (set, blank)
 */

import type { AvatarOutfit } from "./types";
import { setPlayerData } from "../../../websocket/api";
import { pageWindow } from "../../../utils/windowContext";
import { allCosmeticItems } from "./allCosmeticItems";

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
        const { Store } = await import("../../../atoms/store");
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
 * Set avatar outfit (allows any cosmetic for preview purposes)
 * Preserves player name and only updates specified slots
 */
export async function set(outfit: AvatarOutfit): Promise<boolean> {
    try {
        const current = await getCurrentAvatarState();

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
