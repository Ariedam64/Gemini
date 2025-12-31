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

function send(type: string, payload: Record<string, unknown> = {}, win: any = pageWindow): SendResult {
  return sendType(type, payload, win);
}

// -----------------------------
// Social / chat / host
// -----------------------------

export function chat(message: string, win: any = pageWindow): SendResult {
  // Chat is room-scoped. If you want "Room only", override scopePath explicitly.
  return send(T.Chat, { scopePath: ["Room"], message }, win);
}

export function emote(emoteType: string, win: any = pageWindow): SendResult {
  return send(T.Emote, { scopePath: ["Room"], emoteType }, win);
}

export function wish(wish: string, win: any = pageWindow): SendResult {
  return send(T.Wish, { wish }, win);
}

export function kickPlayer(playerId: string, win: any = pageWindow): SendResult {
  return send(T.KickPlayer, { scopePath: ["Room"], playerId }, win);
}

export function setPlayerData(data: Record<string, unknown>, win: any = pageWindow): SendResult {
  return send(T.SetPlayerData, { scopePath: ["Room"], data }, win);
}

export function usurpHost(win: any = pageWindow): SendResult {
  return send(T.UsurpHost, {}, win);
}

// Voice / Discord
export function reportSpeakingStart(win: any = pageWindow): SendResult {
  return send(T.ReportSpeakingStart, {}, win);
}

// -----------------------------
// Session / game / heartbeat
// -----------------------------

export function setSelectedGame(gameId: string, win: any = pageWindow): SendResult {
  return send(T.SetSelectedGame, { scopePath: ["Room"], gameId }, win);
}

export function voteForGame(gameId: string, win: any = pageWindow): SendResult {
  return send(T.VoteForGame, { scopePath: ["Room"], gameId }, win);
}

export function requestGame(gameId: string, win: any = pageWindow): SendResult {
  return send(T.RequestGame, { scopePath: ["Room"], gameId }, win);
}

export function restartGame(win: any = pageWindow): SendResult {
  return send(T.RestartGame, { scopePath: ["Room"] }, win);
}

export function ping(id: string | number, win: any = pageWindow): SendResult {
  return send(T.Ping, { id }, win);
}

// Movement / position
export function playerPosition(x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlayerPosition, { x, y }, win);
}

/** Alias for playerPosition (legacy compatibility) */
export const move = playerPosition;

export function teleport(x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.Teleport, { x, y }, win);
}

export function checkWeatherStatus(win: any = pageWindow): SendResult {
  return send(T.CheckWeatherStatus, {}, win);
}

// -----------------------------
// Inventory / storage
// -----------------------------

export function moveInventoryItem(fromIndex: number, toIndex: number, win: any = pageWindow): SendResult {
  return send(T.MoveInventoryItem, { fromIndex, toIndex }, win);
}

export function dropObject(slotIndex: number, win: any = pageWindow): SendResult {
  return send(T.DropObject, { slotIndex }, win);
}

export function pickupObject(objectId: string, win: any = pageWindow): SendResult {
  return send(T.PickupObject, { objectId }, win);
}

export function toggleFavoriteItem(itemId: string, favorited: boolean, win: any = pageWindow): SendResult {
  return send(T.ToggleFavoriteItem, { scopePath: ["Item", itemId], itemId, favorited }, win);
}

export function putItemInStorage(itemId: string, win: any = pageWindow): SendResult {
  return send(T.PutItemInStorage, { itemId }, win);
}

export function retrieveItemFromStorage(itemId: string, win: any = pageWindow): SendResult {
  return send(T.RetrieveItemFromStorage, { itemId }, win);
}

export function moveStorageItem(fromIndex: number, toIndex: number, win: any = pageWindow): SendResult {
  return send(T.MoveStorageItem, { fromIndex, toIndex }, win);
}

export function logItems(win: any = pageWindow): SendResult {
  return send(T.LogItems, {}, win);
}

// -----------------------------
// Garden / shops
// -----------------------------

export function plantSeed(seedId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlantSeed, { seedId, x, y }, win);
}

export function waterPlant(plantId: string, win: any = pageWindow): SendResult {
  return send(T.WaterPlant, { plantId }, win);
}

export function harvestCrop(cropId: string, win: any = pageWindow): SendResult {
  return send(T.HarvestCrop, { cropId }, win);
}

export function sellAllCrops(win: any = pageWindow): SendResult {
  return send(T.SellAllCrops, {}, win);
}

export function purchaseDecor(decorId: string, win: any = pageWindow): SendResult {
  return send(T.PurchaseDecor, { decorId }, win);
}

export function purchaseEgg(eggId: string, win: any = pageWindow): SendResult {
  return send(T.PurchaseEgg, { eggId }, win);
}

export function purchaseTool(toolId: string, win: any = pageWindow): SendResult {
  return send(T.PurchaseTool, { toolId }, win);
}

export function purchaseSeed(seedId: string, win: any = pageWindow): SendResult {
  return send(T.PurchaseSeed, { seedId }, win);
}

export function plantEgg(eggId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlantEgg, { eggId, x, y }, win);
}

export function hatchEgg(eggId: string, win: any = pageWindow): SendResult {
  return send(T.HatchEgg, { eggId }, win);
}

export function plantGardenPlant(plantId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlantGardenPlant, { plantId, x, y }, win);
}

export function potPlant(plantId: string, potId: string, win: any = pageWindow): SendResult {
  return send(T.PotPlant, { plantId, potId }, win);
}

export function mutationPotion(potionId: string, targetId: string, win: any = pageWindow): SendResult {
  return send(T.MutationPotion, { potionId, targetId }, win);
}

export function pickupDecor(decorInstanceId: string, win: any = pageWindow): SendResult {
  return send(T.PickupDecor, { decorInstanceId }, win);
}

export function placeDecor(decorId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlaceDecor, { decorId, x, y }, win);
}

export function removeGardenObject(objectId: string, win: any = pageWindow): SendResult {
  return send(T.RemoveGardenObject, { objectId }, win);
}

// -----------------------------
// Pets
// -----------------------------

export function placePet(petId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlacePet, { petId, x, y }, win);
}

export function feedPet(petId: string, foodItemId: string, win: any = pageWindow): SendResult {
  return send(T.FeedPet, { petId, foodItemId }, win);
}

export function petPositions(positions: unknown, win: any = pageWindow): SendResult {
  return send(T.PetPositions, { positions }, win);
}

export function swapPet(petIdA: string, petIdB: string, win: any = pageWindow): SendResult {
  return send(T.SwapPet, { petIdA, petIdB }, win);
}

export function storePet(petId: string, win: any = pageWindow): SendResult {
  return send(T.StorePet, { petId }, win);
}

export function namePet(petId: string, name: string, win: any = pageWindow): SendResult {
  return send(T.NamePet, { petId, name }, win);
}

export function sellPet(petId: string, win: any = pageWindow): SendResult {
  return send(T.SellPet, { petId }, win);
}
