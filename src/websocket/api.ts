// src/Websocket/api.ts
/**
 * Domain API helpers (client -> server).
 *
 * This module should be the only import used by feature code.
 * Transport details (RoomConnection, default scopePath injection, etc.)
 * are handled by `connection.ts`.
 *
 * Important:
 * - Payload keys MUST match the game's expected schema.
 * - If a message is ignored by the server, fix the payload here (not in transport).
 */

import { sendType, type SendResult } from "./connection";
import { ClientToServerMessageType as T } from "./protocol";
import { pageWindow } from "../utils/windowContext";

const DEFAULT_SCOPE_PATH = ["Room", "Quinoa"];
type ScopeHint = "Room" | "Quinoa";
const SCOPE_PATHS: Record<ScopeHint, string[]> = { Room: ["Room"], Quinoa: DEFAULT_SCOPE_PATH };

function send(type: string, payload: Record<string, unknown> = {}, win: any = pageWindow): SendResult {
  const raw = payload as Record<string, unknown> & { scopePath?: unknown; scope?: unknown };
  const { scopePath, scope, ...rest } = raw;
  const hint = typeof scopePath === "string" ? scopePath : scope;
  const resolved = Array.isArray(scopePath)
    ? scopePath
    : hint === "Room" || hint === "Quinoa"
      ? SCOPE_PATHS[hint]
      : null;
  return sendType(type, resolved ? { scopePath: resolved, ...rest } : rest, win);
}

// -----------------------------
// Social / chat / host
// -----------------------------

export function chat(message: string, win: any = pageWindow): SendResult {
  return send(T.Chat, { scope: "Room", message }, win);
}

export function emote(emoteType: string, win: any = pageWindow): SendResult {
  return send(T.Emote, { scope: "Room", emoteType }, win);
}

export function wish(wish: string, win: any = pageWindow): SendResult {
  return send(T.Wish, { scope: "Quinoa", wish }, win);
}

export function kickPlayer(playerId: string, win: any = pageWindow): SendResult {
  return send(T.KickPlayer, { scope: "Room", playerId }, win);
}

export function setPlayerData(data: { name?: string; cosmetic?: any }, win: any = pageWindow): SendResult {
  console.log("[Gemini][WS] setPlayerData:", data);
  const { name, cosmetic } = data;
  return send(T.SetPlayerData, { scope: "Room", name, cosmetic }, win);
}

export function usurpHost(win: any = pageWindow): SendResult {
  return send(T.UsurpHost, { scope: "Quinoa" }, win);
}

// Voice / Discord
export function reportSpeakingStart(win: any = pageWindow): SendResult {
  return send(T.ReportSpeakingStart, { scope: "Quinoa" }, win);
}

// -----------------------------
// Session / game / heartbeat
// -----------------------------

export function setSelectedGame(gameId: string, win: any = pageWindow): SendResult {
  return send(T.SetSelectedGame, { scope: "Room", gameId }, win);
}

export function voteForGame(gameId: string, win: any = pageWindow): SendResult {
  return send(T.VoteForGame, { scope: "Room", gameId }, win);
}

export function restartGame(win: any = pageWindow): SendResult {
  return send(T.RestartGame, { scope: "Room" }, win);
}

export function ping(id: string | number, win: any = pageWindow): SendResult {
  return send(T.Ping, { scope: "Quinoa", id }, win);
}

// Movement / position
export function playerPosition(x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlayerPosition, { scope: "Quinoa", x, y }, win);
}

/** Alias for playerPosition (legacy compatibility) */
export const move = playerPosition;

export function teleport(x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.Teleport, { scope: "Quinoa", x, y }, win);
}

export function checkWeatherStatus(win: any = pageWindow): SendResult {
  return send(T.CheckWeatherStatus, { scope: "Quinoa" }, win);
}

// -----------------------------
// Inventory / storage
// -----------------------------

export function moveInventoryItem(fromIndex: number, toIndex: number, win: any = pageWindow): SendResult {
  return send(T.MoveInventoryItem, { scope: "Quinoa", fromIndex, toIndex }, win);
}

export function dropObject(slotIndex: number, win: any = pageWindow): SendResult {
  return send(T.DropObject, { scope: "Quinoa", slotIndex }, win);
}

export function pickupObject(objectId: string, win: any = pageWindow): SendResult {
  return send(T.PickupObject, { scope: "Quinoa", objectId }, win);
}

export function toggleLockItem(itemId: string, win: unknown = pageWindow): SendResult {
  return send(T.ToggleLockItem, { scope: "Quinoa", itemId }, win as typeof pageWindow);
}

/** @deprecated Renamed to toggleLockItem — alias kept for backward compatibility */
export const toggleFavoriteItem = toggleLockItem;

export function setSelectedItem(itemIndex: number, win: unknown = pageWindow): SendResult {
  return send(T.SetSelectedItem, { scope: "Quinoa", itemIndex }, win as typeof pageWindow);
}

export function putItemInStorage(itemId: string, storageId: string = "PetHutch", toStorageIndex?: number, quantity?: number, win: unknown = pageWindow): SendResult {
  return send(T.PutItemInStorage, { scope: "Quinoa", itemId, storageId, ...(toStorageIndex !== undefined && { toStorageIndex }), ...(quantity !== undefined && { quantity }) }, win as typeof pageWindow);
}

export function retrieveItemFromStorage(itemId: string, storageId: string = "PetHutch", toInventoryIndex?: number, quantity?: number, win: unknown = pageWindow): SendResult {
  return send(T.RetrieveItemFromStorage, { scope: "Quinoa", itemId, storageId, ...(toInventoryIndex !== undefined && { toInventoryIndex }), ...(quantity !== undefined && { quantity }) }, win as typeof pageWindow);
}

export function moveStorageItem(itemId: string, storageId: string, toStorageIndex: number, win: unknown = pageWindow): SendResult {
  return send(T.MoveStorageItem, { scope: "Quinoa", itemId, storageId, toStorageIndex }, win as typeof pageWindow);
}

export function logItems(win: any = pageWindow): SendResult {
  return send(T.LogItems, { scope: "Quinoa" }, win);
}

// -----------------------------
// Garden / shops
// -----------------------------

export function plantSeed(slot: number, species: string, win: unknown = pageWindow): SendResult {
  return send(T.PlantSeed, { scope: "Quinoa", slot, species }, win as typeof pageWindow);
}

export function waterPlant(slot: number, win: unknown = pageWindow): SendResult {
  return send(T.WaterPlant, { scope: "Quinoa", slot }, win as typeof pageWindow);
}

export function harvestCrop(slot: number, slotsIndex?: number, win: unknown = pageWindow): SendResult {
  return send(T.HarvestCrop, { scope: "Quinoa", slot, ...(slotsIndex !== undefined && { slotsIndex }) }, win as typeof pageWindow);
}

export function sellAllCrops(win: unknown = pageWindow): SendResult {
  return send(T.SellAllCrops, { scope: "Quinoa" }, win as typeof pageWindow);
}

export function purchaseDecor(decorId: string, win: unknown = pageWindow): SendResult {
  return send(T.PurchaseDecor, { scope: "Quinoa", decorId }, win as typeof pageWindow);
}

export function purchaseEgg(eggId: string, win: unknown = pageWindow): SendResult {
  return send(T.PurchaseEgg, { scope: "Quinoa", eggId }, win as typeof pageWindow);
}

export function purchaseTool(toolId: string, win: unknown = pageWindow): SendResult {
  return send(T.PurchaseTool, { scope: "Quinoa", toolId }, win as typeof pageWindow);
}

export function purchaseSeed(species: string, win: unknown = pageWindow): SendResult {
  return send(T.PurchaseSeed, { scope: "Quinoa", species }, win as typeof pageWindow);
}

export function growEgg(slot: number, eggId: string, win: unknown = pageWindow): SendResult {
  return send(T.GrowEgg, { scope: "Quinoa", slot, eggId }, win as typeof pageWindow);
}

/** @deprecated Renamed to growEgg — alias kept for backward compatibility */
export const plantEgg = growEgg;

export function hatchEgg(slot: number, win: unknown = pageWindow): SendResult {
  return send(T.HatchEgg, { scope: "Quinoa", slot }, win as typeof pageWindow);
}

export function plantGardenPlant(slot: number, itemId: string, win: unknown = pageWindow): SendResult {
  return send(T.PlantGardenPlant, { scope: "Quinoa", slot, itemId }, win as typeof pageWindow);
}

export function potPlant(slot: number, win: unknown = pageWindow): SendResult {
  return send(T.PotPlant, { scope: "Quinoa", slot }, win as typeof pageWindow);
}

export function mutationPotion(tileObjectIdx: number, growSlotIdx: number, mutation: string, win: unknown = pageWindow): SendResult {
  return send(T.MutationPotion, { scope: "Quinoa", tileObjectIdx, growSlotIdx, mutation }, win as typeof pageWindow);
}

export function cropCleanser(tileObjectIdx: number, growSlotIdx: number, win: unknown = pageWindow): SendResult {
  return send(T.CropCleanser, { scope: "Quinoa", tileObjectIdx, growSlotIdx }, win as typeof pageWindow);
}

export function pickupDecor(tileType: string, localTileIndex: number, win: unknown = pageWindow): SendResult {
  return send(T.PickupDecor, { scope: "Quinoa", tileType, localTileIndex }, win as typeof pageWindow);
}

export function placeDecor(decorId: string, tileType: string, localTileIndex: number, rotation?: number, win: unknown = pageWindow): SendResult {
  return send(T.PlaceDecor, { scope: "Quinoa", decorId, tileType, localTileIndex, ...(rotation !== undefined && { rotation }) }, win as typeof pageWindow);
}

export function removeGardenObject(slot: number, slotType: string, win: unknown = pageWindow): SendResult {
  return send(T.RemoveGardenObject, { scope: "Quinoa", slot, slotType }, win as typeof pageWindow);
}

// -----------------------------
// Pets
// -----------------------------

export function placePet(petId: string, position: { x: number; y: number } = { x: 0, y: 0 }, tileType: string = "Dirt", localTileIndex: number = 0, win: unknown = pageWindow
): SendResult {
  return send(T.PlacePet, { scope: "Quinoa", itemId: petId, position, tileType, localTileIndex }, win as typeof pageWindow);
}

export function feedPet(petItemId: string, cropItemId: string, win: unknown = pageWindow): SendResult {
  return send(T.FeedPet, { scope: "Quinoa", petItemId, cropItemId }, win as typeof pageWindow);
}

export function petPositions(petPositions: unknown, win: unknown = pageWindow): SendResult {
  return send(T.PetPositions, { scope: "Quinoa", petPositions }, win as typeof pageWindow);
}

export function swapPet(petSlotId: string, petInventoryId: string, win: unknown = pageWindow): SendResult {
  return send(T.SwapPet, { scope: "Quinoa", petSlotId, petInventoryId }, win as typeof pageWindow);
}

export function swapPetFromStorage(petSlotId: string, storagePetId: string, storageId: string, win: unknown = pageWindow): SendResult {
  return send(T.SwapPetFromStorage, { scope: "Quinoa", petSlotId, storagePetId, storageId }, win as typeof pageWindow);
}

export function pickupPet(petId: string, win: unknown = pageWindow): SendResult {
  return send(T.PickupPet, { scope: "Quinoa", petId }, win as typeof pageWindow);
}

export function movePetSlot(movePetSlotId: string, toPetSlotIndex: number, win: unknown = pageWindow): SendResult {
  return send(T.MovePetSlot, { scope: "Quinoa", movePetSlotId, toPetSlotIndex }, win as typeof pageWindow);
}

export function namePet(petItemId: string, name: string, win: unknown = pageWindow): SendResult {
  return send(T.NamePet, { scope: "Quinoa", petItemId, name }, win as typeof pageWindow);
}

export function sellPet(itemId: string, win: unknown = pageWindow): SendResult {
  return send(T.SellPet, { scope: "Quinoa", itemId }, win as typeof pageWindow);
}

export function upgradePetHutch(win: unknown = pageWindow): SendResult {
  return send(T.UpgradePetHutch, { scope: "Quinoa" }, win as typeof pageWindow);
}

// -----------------------------
// Seasonal / misc
// -----------------------------

export function throwSnowball(win: unknown = pageWindow): SendResult {
  return send(T.ThrowSnowball, { scope: "Quinoa" }, win as typeof pageWindow);
}

export function checkFriendBonus(win: unknown = pageWindow): SendResult {
  return send(T.CheckFriendBonus, { scope: "Quinoa" }, win as typeof pageWindow);
}
