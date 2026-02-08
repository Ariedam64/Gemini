// src/modules/cosmetic/avatar/worldOverride.ts
/**
 * World Avatar Override - Patches game state atoms to override cosmetics
 * Targets the actual playable character in the game world
 */

import { AvatarOutfit, ALT_ASSET_PATH } from "../types";
import { setPlayerData } from "../../../../websocket/api";
import { pageWindow } from "../../../../utils/windowContext";
import { isDevBuild } from "../../../../utils/buildMode";
import { outfitToArray } from "./internal";

/**
 * Check if a filename represents a blank/hidden part.
 * Recognizes Gemini's internal _Blank marker and the game's ALT_ASSET_PATH.
 */
function isBlankFilename(filename: string | null | undefined): boolean {
    if (!filename) return false;
    const lower = filename.toLowerCase();
    return (
        lower.includes('_blank') ||
        lower.includes('_none') ||
        lower === ALT_ASSET_PATH.toLowerCase()
    );
}


/**
 * Transform avatar array to use ALT_ASSET_PATH for blank parts.
 * This ensures blank parts are handled correctly.
 */
function replaceWithAltPath(avatarArray: string[]): string[] {
    return avatarArray.map(filename => {
        if (isBlankFilename(filename)) {
            return ALT_ASSET_PATH;
        }
        return filename;
    });
}

/**
 * Check if avatar contains any blank parts
 */
function hasBlankParts(avatarArray: string[]): boolean {
    return avatarArray.some(isBlankFilename);
}

/**
 * Send player data directly via MagicCircle_RoomConnection.sendRoomMessage
 */
function syncAvatarState(name: string, cosmetic: { color: string; avatar: string[] }): boolean {
    try {
        const conn = (pageWindow as any).MagicCircle_RoomConnection;
        if (!conn?.sendRoomMessage) {
            console.warn("[WorldAvatar] MagicCircle_RoomConnection.sendRoomMessage not available");
            return false;
        }

        const message = {
            scopePath: ["Room"],
            type: "SetPlayerData",
            name,
            cosmetic,
        };

        console.log("[WorldAvatar] Sending via sendRoomMessage:", message);
        conn.sendRoomMessage(message);
        return true;
    } catch (err) {
        console.error("[WorldAvatar] sendRoomMessage failed:", err);
        return false;
    }
}

let currentOverride: string[] | null = null;
let originalAvatar: string[] | null = null;
let isPatched = false;

// Global state for transparency to the patched method
(pageWindow as any).Gemini_AvatarOverride = null;

/**
 * Traverses the PIXI tree to find the AvatarView class
 */
function applyRenderingPatch() {
    if (isPatched) return;

    // Try to find an AvatarView instance to get its prototype
    // We search the pageWindow for common entry points
    const findAndPatch = async () => {
        try {
            // Check if we can find it via common patterns or traverse the world
            const { Store } = await import("../../../../atoms/store");

            // 1. Patch RiveSprite (Low level)
        
            const patchRiveSprite = (RiveSprite: any) => {
                const proto = RiveSprite.prototype;
                if (!proto || !proto.loadAndSetImage || proto.loadAndSetImage.__gemini_patched) return;

                const originalLoad = proto.loadAndSetImage;

                proto.loadAndSetImage = async function (referencedRiveAssetName: string, pixiAssetKey: string) {
                    // 
                    try {
                        return await originalLoad.apply(this, [referencedRiveAssetName, pixiAssetKey]);
                    } catch (e) {
                        // 
                        this.unsetImage(referencedRiveAssetName);
                    }
                };

                proto.loadAndSetImage.__gemini_patched = true;
            };

            // 2. Patch AvatarView (High level)
            const patchAvatarView = (AvatarView: any) => {
                const proto = AvatarView.prototype;
                if (!proto || !proto.loadAvatar || proto.loadAvatar.__gemini_patched) return;

                const originalLoad = proto.loadAvatar;

                proto.loadAvatar = async function (cosmetics: any) {
                    const override = (pageWindow as any).Gemini_AvatarOverride;
                    const myId = (pageWindow as any).MagicCircle_PlayerId;

                    // We need to find our own playerId if not already stored
                    if (!myId && (pageWindow as any).MagicCircle_QuinoaEngine) {
                        const engine = (pageWindow as any).MagicCircle_QuinoaEngine;
                        // Search views to find our ID? Or just use playerIdAtom
                        // For now, assume it's set by renderWorld
                    }

                    const isMe = this.playerId === myId;

                    if (isMe && override) {
                        cosmetics = {
                            ...cosmetics,
                            avatar: override
                        };
                    }

                    return originalLoad.apply(this, [cosmetics]);
                };

                proto.loadAvatar.__gemini_patched = true;
            };

            // Discovery Loop
            const check = async () => {
                if (isPatched) return;

                // Try to find the engine via Store (most reliable)
                const engine = await Store.select("quinoaEngineAtom") as any;
                if (engine) {
                    (pageWindow as any).MagicCircle_QuinoaEngine = engine;

                    // Once we have engine, we can find the system and classes
                    const avatarSystem = engine.getSystem?.('avatar');
                    if (avatarSystem && avatarSystem.views) {
                        const firstView = avatarSystem.views.values().next().value;
                        if (firstView && firstView.constructor) {
                            patchAvatarView(firstView.constructor);

                            // RiveSprite is usually on the view
                            if (firstView.riveSprite && firstView.riveSprite.constructor) {
                                patchRiveSprite(firstView.riveSprite.constructor);
                                isPatched = true;
                                return;
                            }
                        }
                    }
                }

                // Fallback: Check globals
                if ((pageWindow as any).AvatarView) patchAvatarView((pageWindow as any).AvatarView);
                if ((pageWindow as any).RiveSprite) patchRiveSprite((pageWindow as any).RiveSprite);

                if (!isPatched) setTimeout(check, 2000);
            };

            check();

        } catch (e) {
            // Silent fail
        }
    };

    findAndPatch();
}

/**
 * Render world avatar override by patching the state atom
 * This triggers the game's natural avatar reload mechanism
 */
export async function renderWorld(outfit: AvatarOutfit): Promise<boolean> {
    try {
        const { Store } = await import("../../../../atoms/store");
        const { getPlayers } = await import("../../../../globals/variables/players");

        if (isDevBuild()) {
            applyRenderingPatch();
        }

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

        // Ensure playerId is available for the patch
        (pageWindow as any).MagicCircle_PlayerId = playerId;

        // Save original if this is the first override
        if (!originalAvatar) {
            originalAvatar = [...currentAvatar];
        }

        let newAvatar = outfitToArray(outfit, currentAvatar);

        const hasBlank = hasBlankParts(newAvatar);
        if (isDevBuild() && hasBlank) {
            newAvatar = replaceWithAltPath(newAvatar);
        }

        currentOverride = newAvatar;

        // Set the global override for the patched renderer
        (pageWindow as any).Gemini_AvatarOverride = newAvatar;

        console.log("[WorldAvatar] Applying override:", newAvatar);

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

        // Sync to server for persistence

        if (isDevBuild() && hasBlank) {
            console.log("[WorldAvatar] Syncing to server:", newAvatar);

            syncAvatarState(myPlayer.name, {
                color: myPlayer.cosmetic.color || "Gray",
                avatar: newAvatar,
            });
        } else {
            // Standard method
            setPlayerData({
                name: myPlayer.name,
                cosmetic: {
                    ...myPlayer.cosmetic,
                    avatar: newAvatar,
                }
            }, pageWindow);
        }

        return true;
    } catch (err) {
        return false;
    }
}

/**
 * Clear world override and restore original avatar
 */
export async function clearWorldOverride(): Promise<boolean> {
    if (!currentOverride || !originalAvatar) {
        return true;
    }

    try {
        const { Store } = await import("../../../../atoms/store");
        const { getPlayers } = await import("../../../../globals/variables/players");

        // Clear the global override
        (pageWindow as any).Gemini_AvatarOverride = null;

        // Get current player from Globals (reliable)
        const playersGlobal = getPlayers();
        const playersData = playersGlobal.get();
        const myPlayer = playersData.myPlayer;

        if (!myPlayer) {
            return false;
        }

        const playerId = myPlayer.id;

        // Get current state
        const state = await Store.select("stateAtom") as any;
        if (!state?.data?.players) {
            return false;
        }

        // Find player in players array
        const playerIndex = state.data.players.findIndex((p: any) => p.id === playerId);
        if (playerIndex === -1) {
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

        // Sync to server for persistence
        setPlayerData({
            name: myPlayer.name,
            cosmetic: {
                ...myPlayer.cosmetic,
                avatar: originalAvatar,
            }
        }, pageWindow);


        currentOverride = null;
        originalAvatar = null;
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * Get current override
 */
export function getWorldOverride(): string[] | null {
    return currentOverride;
}
