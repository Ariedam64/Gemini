// src/modules/cosmetic/avatar/worldOverride.ts
/**
 * World Avatar Override - Patches game state atoms to override cosmetics
 * Targets the actual playable character in the game world
 */

import type { AvatarOutfit } from "./types";

const AVATAR_INDICES = {
    BOTTOM: 0,
    MID: 1,
    TOP: 2,
} as const;

let currentOverride: string[] | null = null;
let originalAvatar: string[] | null = null;

/**
 * Convert outfit to array
 */
function outfitToArray(outfit: AvatarOutfit, current?: string[]): string[] {
    const base = current || [
        "Bottom_DefaultGray.png",
        "Mid_DefaultGray.png",
        "Top_DefaultGray.png",
        "Expression_Default.png",
    ];
    const result = [...base];
    if (outfit.bottom) result[AVATAR_INDICES.BOTTOM] = outfit.bottom;
    if (outfit.mid) result[AVATAR_INDICES.MID] = outfit.mid;
    if (outfit.top) result[AVATAR_INDICES.TOP] = outfit.top;
    return result;
}

/**
 * Render world avatar override by patching the state atom
 * This triggers the game's natural avatar reload mechanism
 */
export async function renderWorld(outfit: AvatarOutfit): Promise<boolean> {
    try {
        const { Store } = await import("../../../atoms/store");
        const { getPlayers } = await import("../../../globals/variables/players");

        // Get current player from Globals (reliable)
        const playersGlobal = getPlayers();
        const playersData = playersGlobal.get();
        const myPlayer = playersData.myPlayer;

        if (!myPlayer) {
            console.error("[WorldAvatar] myPlayer not available");
            return false;
        }

        const playerId = myPlayer.id;
        const currentAvatar = myPlayer.cosmetic.avatar;

        // Save original if this is the first override
        if (!originalAvatar) {
            originalAvatar = [...currentAvatar];
        }

        const newAvatar = outfitToArray(outfit, currentAvatar);
        currentOverride = newAvatar;

        console.log("[WorldAvatar] Current avatar:", currentAvatar);
        console.log("[WorldAvatar] New avatar:", newAvatar);

        // Get current state
        const state = await Store.select("stateAtom") as any;
        if (!state?.data?.players) {
            console.error("[WorldAvatar] stateAtom.data.players not available");
            return false;
        }

        // Find player index in players array
        const playerIndex = state.data.players.findIndex((p: any) => p.id === playerId);
        if (playerIndex === -1) {
            console.error("[WorldAvatar] Current player not found in players array");
            return false;
        }

        const player = state.data.players[playerIndex];

        // Create updated state with modified player cosmetic
        const updatedPlayers = [...state.data.players];
        updatedPlayers[playerIndex] = {
            ...player,
            cosmetic: {
                ...player.cosmetic,
                avatar: newAvatar,
            },
        };

        const updatedState = {
            ...state,
            data: {
                ...state.data,
                players: updatedPlayers,
            },
        };

        await Store.set("stateAtom", updatedState);

        console.log("[WorldAvatar] ✓ Override applied successfully!");
        console.log("[WorldAvatar] Your avatar should update immediately.");
        console.log("[WorldAvatar] Note: The override is temporary and may be reverted by the game.");
        console.log("[WorldAvatar] Call renderWorld() again if you need to re-apply it.");
        return true;
    } catch (err) {
        console.error("[WorldAvatar] Failed to render world avatar:", err);
        return false;
    }
}

/**
 * Clear world override and restore original avatar
 */
export async function clearWorldOverride(): Promise<boolean> {
    if (!currentOverride || !originalAvatar) {
        console.log("[WorldAvatar] No override to clear");
        return true;
    }

    try {
        const { Store } = await import("../../../atoms/store");
        const { getPlayers } = await import("../../../globals/variables/players");

        // Get current player from Globals (reliable)
        const playersGlobal = getPlayers();
        const playersData = playersGlobal.get();
        const myPlayer = playersData.myPlayer;

        if (!myPlayer) {
            console.error("[WorldAvatar] myPlayer not available");
            return false;
        }

        const playerId = myPlayer.id;

        // Get current state
        const state = await Store.select("stateAtom") as any;
        if (!state?.data?.players) {
            console.error("[WorldAvatar] stateAtom.data.players not available");
            return false;
        }

        // Find player in players array
        const playerIndex = state.data.players.findIndex((p: any) => p.id === playerId);
        if (playerIndex === -1) {
            console.error("[WorldAvatar] Current player not found in players array");
            return false;
        }

        const player = state.data.players[playerIndex];

        // Restore original avatar
        const restoredPlayers = [...state.data.players];
        restoredPlayers[playerIndex] = {
            ...player,
            cosmetic: {
                ...player.cosmetic,
                avatar: originalAvatar,
            },
        };

        const restoredState = {
            ...state,
            data: {
                ...state.data,
                players: restoredPlayers,
            },
        };

        await Store.set("stateAtom", restoredState);

        currentOverride = null;
        originalAvatar = null;
        console.log("[WorldAvatar] ✓ Override cleared, original avatar restored");
        return true;
    } catch (err) {
        console.error("[WorldAvatar] Failed to clear:", err);
        return false;
    }
}

/**
 * Get current override
 */
export function getWorldOverride(): string[] | null {
    return currentOverride;
}
