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
  return send(T.KickPlayer, { scope: "Room", targetPlayerId: playerId }, win);
}

export function setPlayerData(data: { name?: string; cosmetic?: any }, win: any = pageWindow): SendResult {
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

export function requestGame(gameId: string, win: any = pageWindow): SendResult {
  return send(T.RequestGame, { scope: "Room", gameId }, win);
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

export function toggleFavoriteItem(itemId: string, win: any = pageWindow): SendResult {
  return send(T.ToggleFavoriteItem, { scope: "Quinoa", itemId }, win);
}

export function putItemInStorage(itemId: string, storageId: string = "PetHutch", win: any = pageWindow): SendResult {
  return send(T.PutItemInStorage, { scope: "Quinoa", itemId, storageId }, win);
}

export function retrieveItemFromStorage(itemId: string, storageId: string = "PetHutch", win: any = pageWindow): SendResult {
  return send(T.RetrieveItemFromStorage, { scope: "Quinoa", itemId, storageId }, win);
}

export function moveStorageItem(fromIndex: number, toIndex: number, win: any = pageWindow): SendResult {
  return send(T.MoveStorageItem, { scope: "Quinoa", fromIndex, toIndex }, win);
}

export function logItems(win: any = pageWindow): SendResult {
  return send(T.LogItems, { scope: "Quinoa" }, win);
}

// -----------------------------
// Garden / shops
// -----------------------------

export function plantSeed(seedId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlantSeed, { scope: "Quinoa", seedId, x, y }, win);
}

export function waterPlant(plantId: string, win: any = pageWindow): SendResult {
  return send(T.WaterPlant, { scope: "Quinoa", plantId }, win);
}

export function harvestCrop(cropId: string, win: any = pageWindow): SendResult {
  return send(T.HarvestCrop, { scope: "Quinoa", cropId }, win);
}

export function sellAllCrops(win: any = pageWindow): SendResult {
  return send(T.SellAllCrops, { scope: "Quinoa" }, win);
}

export function purchaseDecor(decorId: string, win: any = pageWindow): SendResult {
  return send(T.PurchaseDecor, { scope: "Quinoa", decorId }, win);
}

export function purchaseEgg(eggId: string, win: any = pageWindow): SendResult {
  return send(T.PurchaseEgg, { scope: "Quinoa", eggId }, win);
}

export function purchaseTool(toolId: string, win: any = pageWindow): SendResult {
  return send(T.PurchaseTool, { scope: "Quinoa", toolId }, win);
}

export function purchaseSeed(species: string, win: any = pageWindow): SendResult {
  return send(T.PurchaseSeed, { scope: "Quinoa", species }, win);
}

export function plantEgg(eggId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlantEgg, { scope: "Quinoa", eggId, x, y }, win);
}

export function hatchEgg(eggId: string, win: any = pageWindow): SendResult {
  return send(T.HatchEgg, { scope: "Quinoa", eggId }, win);
}

export function plantGardenPlant(plantId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlantGardenPlant, { scope: "Quinoa", plantId, x, y }, win);
}

export function potPlant(plantId: string, potId: string, win: any = pageWindow): SendResult {
  return send(T.PotPlant, { scope: "Quinoa", plantId, potId }, win);
}

export function mutationPotion(potionId: string, targetId: string, win: any = pageWindow): SendResult {
  return send(T.MutationPotion, { scope: "Quinoa", potionId, targetId }, win);
}

export function pickupDecor(decorInstanceId: string, win: any = pageWindow): SendResult {
  return send(T.PickupDecor, { scope: "Quinoa", decorInstanceId }, win);
}

export function placeDecor(decorId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlaceDecor, { scope: "Quinoa", decorId, x, y }, win);
}

export function removeGardenObject(objectId: string, win: any = pageWindow): SendResult {
  return send(T.RemoveGardenObject, { scope: "Quinoa", objectId }, win);
}

// -----------------------------
// Pets
// -----------------------------

export function placePet(petId: string, position: { x: number; y: number } = { x: 0, y: 0 }, tileType: string = "Dirt", localTileIndex: number = 0, win: any = pageWindow
): SendResult {
  return send(T.PlacePet, { scope: "Quinoa", itemId: petId, position, tileType, localTileIndex }, win);
}

export function feedPet(petId: string, foodItemId: string, win: any = pageWindow): SendResult {
  return send(T.FeedPet, { scope: "Quinoa", petId, foodItemId }, win);
}

export function petPositions(positions: unknown, win: any = pageWindow): SendResult {
  return send(T.PetPositions, { scope: "Quinoa", positions }, win);
}

export function swapPet(petSlotId: string, petInventoryId: string, win: any = pageWindow): SendResult {
  return send(T.SwapPet, { scope: "Quinoa", petSlotId, petInventoryId }, win);
}

export function storePet(itemId: string, win: any = pageWindow): SendResult {
  return send(T.StorePet, { scope: "Quinoa", itemId }, win);
}

export function namePet(petId: string, name: string, win: any = pageWindow): SendResult {
  return send(T.NamePet, { scope: "Quinoa", petId, name }, win);
}

export function sellPet(petId: string, win: any = pageWindow): SendResult {
  return send(T.SellPet, { scope: "Quinoa", petId }, win);
}
