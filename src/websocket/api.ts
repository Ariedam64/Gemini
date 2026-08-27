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
 *
 * Envelope:
 * - Every Quinoa gameplay action travels inside the `QuinoaCommand` envelope,
 *   which is what feeds the server's prediction/rollback system. Sending one
 *   flat gets it rejected with `{"commandType":"unknown","code":"invalid_message"}`,
 *   i.e. the action silently does nothing.
 * - `Ping` and `PlayerPosition` stay flat (see RAW_QUINOA_MESSAGE_TYPES), and
 *   Room-scoped messages were never commands.
 */

import { sendToServer, sendType, type SendResult } from "./connection";
import {
  ClientToServerMessageType as T,
  COMMAND_ENVELOPE_TYPE,
  RAW_QUINOA_MESSAGE_TYPES,
} from "./protocol";
import { nextInjectedSequence, registerOurRequestId } from "./commandSequence";
import { pageWindow } from "../utils/windowContext";

const DEFAULT_SCOPE_PATH = ["Room", "Quinoa"];
type ScopeHint = "Room" | "Quinoa";
const SCOPE_PATHS: Record<ScopeHint, string[]> = { Room: ["Room"], Quinoa: DEFAULT_SCOPE_PATH };

/** Position payloads are always a `{x, y}` object, never two loose fields. */
type Position = { x: number; y: number };

function newRequestId(): string {
  const cryptoApi = (pageWindow as any)?.crypto ?? globalThis.crypto;
  if (typeof cryptoApi?.randomUUID === "function") return cryptoApi.randomUUID();
  return `gemini-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Wrap a gameplay action in the envelope the server expects.
 *
 * The sequence number is taken at compose time and the request id is registered
 * so the outgoing interceptor lets this envelope through unshifted — see
 * `commandSequence.ts`.
 */
function sendCommand(
  type: string,
  params: Record<string, unknown> = {},
  win: any = pageWindow
): SendResult {
  const requestId = newRequestId();
  registerOurRequestId(requestId);

  return sendToServer(
    {
      scopePath: DEFAULT_SCOPE_PATH,
      type: COMMAND_ENVELOPE_TYPE,
      requestId,
      commandSequence: nextInjectedSequence(),
      command: { type, ...params },
    },
    win
  );
}

function send(type: string, payload: Record<string, unknown> = {}, win: any = pageWindow): SendResult {
  const raw = payload as Record<string, unknown> & { scopePath?: unknown; scope?: unknown };
  const { scopePath, scope, ...rest } = raw;
  const hint = typeof scopePath === "string" ? scopePath : scope;
  const resolved = Array.isArray(scopePath)
    ? scopePath
    : hint === "Room" || hint === "Quinoa"
      ? SCOPE_PATHS[hint]
      : null;

  const isQuinoa = hint === "Quinoa" || (!!resolved && resolved.join("/") === DEFAULT_SCOPE_PATH.join("/"));
  if (isQuinoa && !RAW_QUINOA_MESSAGE_TYPES.has(type)) {
    return sendCommand(type, rest, win);
  }

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

/**
 * Throw a coin in the wishing well.
 *
 * `itemId` wishes for that specific item; the game omits the field entirely for
 * an untargeted wish.
 */
export function wish(itemId?: string, win: any = pageWindow): SendResult {
  return send(T.Wish, { scope: "Quinoa", ...(itemId !== undefined && { itemId }) }, win);
}

export function kickPlayer(targetPlayerId: string, win: any = pageWindow): SendResult {
  return send(T.KickPlayer, { scope: "Room", targetPlayerId }, win);
}

export function setPlayerData(data: { name?: string; cosmetic?: unknown }, win: any = pageWindow): SendResult {
  const { name, cosmetic } = data;
  return send(
    T.SetPlayerData,
    { scope: "Room", ...(name !== undefined && { name }), ...(cosmetic !== undefined && { cosmetic }) },
    win
  );
}

export function usurpHost(win: any = pageWindow): SendResult {
  return send(T.UsurpHost, { scope: "Room" }, win);
}

/** Marks the room chat read up to `seq` (the chat's `latestSeq`). */
export function markChatRead(seq: number, win: any = pageWindow): SendResult {
  return send(T.MarkChatRead, { scope: "Room", seq }, win);
}

// -----------------------------
// Session / game / heartbeat
// -----------------------------

const DEFAULT_GAME_NAME = "Quinoa";

export function setSelectedGame(gameName: string = DEFAULT_GAME_NAME, win: any = pageWindow): SendResult {
  return send(T.SetSelectedGame, { scope: "Room", gameName }, win);
}

export function voteForGame(gameName: string = DEFAULT_GAME_NAME, win: any = pageWindow): SendResult {
  return send(T.VoteForGame, { scope: "Room", gameName }, win);
}

/** Room-scoped, and it names the game to restart in `name` (not `gameName`). */
export function restartGame(gameName: string = DEFAULT_GAME_NAME, win: any = pageWindow): SendResult {
  return send(T.RestartGame, { scope: "Room", name: gameName }, win);
}

export function ping(id: string | number = Date.now(), win: any = pageWindow): SendResult {
  return send(T.Ping, { scope: "Quinoa", id }, win);
}

export function checkWeatherStatus(win: any = pageWindow): SendResult {
  return send(T.CheckWeatherStatus, { scope: "Quinoa" }, win);
}

export function quinoaTutorialSkipped(win: any = pageWindow): SendResult {
  return send(T.QuinoaTutorialSkipped, { scope: "Quinoa" }, win);
}

// -----------------------------
// Movement / position
// -----------------------------

export function playerPosition(x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.PlayerPosition, { scope: "Quinoa", position: { x, y } satisfies Position }, win);
}

/** Alias for playerPosition (legacy compatibility) */
export const move = playerPosition;

export function teleport(x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.Teleport, { scope: "Quinoa", position: { x, y } satisfies Position }, win);
}

// -----------------------------
// Inventory / storage
// -----------------------------

export function moveInventoryItem(moveItemId: string, toInventoryIndex: number, win: any = pageWindow): SendResult {
  return send(T.MoveInventoryItem, { scope: "Quinoa", moveItemId, toInventoryIndex }, win);
}

/**
 * Drops whatever the player currently holds.
 *
 * Takes no parameter: an extra field gets the command rejected as malformed.
 */
export function dropObject(win: any = pageWindow): SendResult {
  return send(T.DropObject, { scope: "Quinoa" }, win);
}

/** Picks up whatever the player is standing on. Takes no parameter either. */
export function pickupObject(win: any = pageWindow): SendResult {
  return send(T.PickupObject, { scope: "Quinoa" }, win);
}

export function toggleLockItem(itemId: string, win: any = pageWindow): SendResult {
  return send(T.ToggleLockItem, { scope: "Quinoa", itemId }, win);
}

/** @deprecated Renamed to toggleLockItem — alias kept for backward compatibility */
export const toggleFavoriteItem = toggleLockItem;

export function setSelectedItem(itemIndex: number, win: any = pageWindow): SendResult {
  return send(T.SetSelectedItem, { scope: "Quinoa", itemIndex }, win);
}

/**
 * `toStorageIndex` and `quantity` are both optional on the wire: the game leaves
 * the index out when the item goes to the end of the storage, and only sends a
 * quantity when moving part of a stack.
 */
export function putItemInStorage(
  itemId: string,
  storageId: string = "PetHutch",
  toStorageIndex?: number,
  quantity?: number,
  win: any = pageWindow
): SendResult {
  return send(
    T.PutItemInStorage,
    {
      scope: "Quinoa",
      itemId,
      storageId,
      ...(toStorageIndex !== undefined && { toStorageIndex }),
      ...(quantity !== undefined && { quantity }),
    },
    win
  );
}

export function retrieveItemFromStorage(
  itemId: string,
  storageId: string = "PetHutch",
  toInventoryIndex?: number,
  quantity?: number,
  win: any = pageWindow
): SendResult {
  return send(
    T.RetrieveItemFromStorage,
    {
      scope: "Quinoa",
      itemId,
      storageId,
      ...(toInventoryIndex !== undefined && { toInventoryIndex }),
      ...(quantity !== undefined && { quantity }),
    },
    win
  );
}

export function moveStorageItem(itemId: string, storageId: string, toStorageIndex: number, win: any = pageWindow): SendResult {
  return send(T.MoveStorageItem, { scope: "Quinoa", itemId, storageId, toStorageIndex }, win);
}

export type SwapItemWithStorageOptions = {
  toStorageIndex?: number;
  toInventoryIndex?: number;
  /** Splits a stack. Always sent alongside `draggedFromInventory`. */
  draggedQuantity?: number;
  /** Which side the drag started on. Only meaningful with `draggedQuantity`. */
  draggedFromInventory?: boolean;
};

/**
 * Exchanges an inventory item for a stored one in a single action, which keeps
 * both capacities unchanged (unlike a retrieve followed by a put).
 */
export function swapItemWithStorage(
  storageId: string,
  inventoryItemId: string,
  storageItemId: string,
  options: SwapItemWithStorageOptions = {},
  win: any = pageWindow
): SendResult {
  const { toStorageIndex, toInventoryIndex, draggedQuantity, draggedFromInventory = false } = options;

  return send(
    T.SwapItemWithStorage,
    {
      scope: "Quinoa",
      storageId,
      inventoryItemId,
      storageItemId,
      ...(toStorageIndex !== undefined && { toStorageIndex }),
      ...(toInventoryIndex !== undefined && { toInventoryIndex }),
      ...(draggedQuantity !== undefined && { draggedQuantity, draggedFromInventory }),
    },
    win
  );
}

export function logItems(win: any = pageWindow): SendResult {
  return send(T.LogItems, { scope: "Quinoa" }, win);
}

// -----------------------------
// Garden / shops
// -----------------------------

export function plantSeed(slot: number, species: string, win: any = pageWindow): SendResult {
  return send(T.PlantSeed, { scope: "Quinoa", slot, species }, win);
}

export function waterPlant(slot: number, win: any = pageWindow): SendResult {
  return send(T.WaterPlant, { scope: "Quinoa", slot }, win);
}

export function harvestCrop(slot: number, slotsIndex?: number, win: any = pageWindow): SendResult {
  return send(T.HarvestCrop, { scope: "Quinoa", slot, ...(slotsIndex !== undefined && { slotsIndex }) }, win);
}

export function sellAllCrops(win: any = pageWindow): SendResult {
  return send(T.SellAllCrops, { scope: "Quinoa" }, win);
}

export type ShopId = "seed" | "tool" | "egg" | "decor" | "dawn";

export type PurchaseItemPayload =
  | { itemType: "Seed"; species: string }
  | { itemType: "Tool"; toolId: string }
  | { itemType: "Egg"; eggId: string }
  | { itemType: "Decor"; decorId: string };

export function purchaseShopItem(shop: ShopId, item: PurchaseItemPayload, win: any = pageWindow): SendResult {
  return send(T.PurchaseShopItem, { scope: "Quinoa", shop, item }, win);
}

export function purchaseSeed(species: string, win: any = pageWindow): SendResult {
  return purchaseShopItem("seed", { itemType: "Seed", species }, win);
}

export function purchaseTool(toolId: string, win: any = pageWindow): SendResult {
  return purchaseShopItem("tool", { itemType: "Tool", toolId }, win);
}

export function purchaseEgg(eggId: string, win: any = pageWindow): SendResult {
  return purchaseShopItem("egg", { itemType: "Egg", eggId }, win);
}

export function purchaseDecor(decorId: string, win: any = pageWindow): SendResult {
  return purchaseShopItem("decor", { itemType: "Decor", decorId }, win);
}

/**
 * Purchase an item from the Dawn shop (only available when the Dawn weather is active).
 * Dawn shop inventory is heterogeneous: each item must declare its own itemType.
 */
export function purchaseDawnItem(item: PurchaseItemPayload, win: any = pageWindow): SendResult {
  return purchaseShopItem("dawn", item, win);
}

export function growEgg(slot: number, eggId: string, win: any = pageWindow): SendResult {
  return send(T.GrowEgg, { scope: "Quinoa", slot, eggId }, win);
}

/** @deprecated Renamed to growEgg — alias kept for backward compatibility */
export const plantEgg = growEgg;

export function hatchEgg(slot: number, win: any = pageWindow): SendResult {
  return send(T.HatchEgg, { scope: "Quinoa", slot }, win);
}

export function plantGardenPlant(slot: number, itemId: string, win: any = pageWindow): SendResult {
  return send(T.PlantGardenPlant, { scope: "Quinoa", slot, itemId }, win);
}

export function potPlant(slot: number, win: any = pageWindow): SendResult {
  return send(T.PotPlant, { scope: "Quinoa", slot }, win);
}

export function mutationPotion(tileObjectIdx: number, growSlotIdx: number, mutation: string, win: any = pageWindow): SendResult {
  return send(T.MutationPotion, { scope: "Quinoa", tileObjectIdx, growSlotIdx, mutation }, win);
}

export function cropCleanser(tileObjectIdx: number, growSlotIdx: number, win: any = pageWindow): SendResult {
  return send(T.CropCleanser, { scope: "Quinoa", tileObjectIdx, growSlotIdx }, win);
}

/** Turns the harvested crop `itemId` into a preserve at the Preservation Station. */
export function preserve(itemId: string, growSlotIdx: number, win: any = pageWindow): SendResult {
  return send(T.Preserve, { scope: "Quinoa", itemId, growSlotIdx }, win);
}

/** Puts a harvested crop on display on a garden or boardwalk tile. */
export function displayCrop(tileType: string, localTileIndex: number, itemId: string, win: any = pageWindow): SendResult {
  return send(T.DisplayCrop, { scope: "Quinoa", tileType, localTileIndex, itemId }, win);
}

export function pickupDisplayedCrop(tileType: string, localTileIndex: number, win: any = pageWindow): SendResult {
  return send(T.PickupDisplayedCrop, { scope: "Quinoa", tileType, localTileIndex }, win);
}

export function pickupDecor(tileType: string, localTileIndex: number, win: any = pageWindow): SendResult {
  return send(T.PickupDecor, { scope: "Quinoa", tileType, localTileIndex }, win);
}

export function placeDecor(decorId: string, tileType: string, localTileIndex: number, rotation?: number, win: any = pageWindow): SendResult {
  return send(
    T.PlaceDecor,
    { scope: "Quinoa", decorId, tileType, localTileIndex, ...(rotation !== undefined && { rotation }) },
    win
  );
}

export function removeGardenObject(slot: number, slotType: string, win: any = pageWindow): SendResult {
  return send(T.RemoveGardenObject, { scope: "Quinoa", slot, slotType }, win);
}

// -----------------------------
// Pets
// -----------------------------

export function placePet(
  petId: string,
  position: Position = { x: 0, y: 0 },
  tileType: string = "Dirt",
  localTileIndex: number = 0,
  win: any = pageWindow
): SendResult {
  return send(T.PlacePet, { scope: "Quinoa", itemId: petId, position, tileType, localTileIndex }, win);
}

export function feedPet(petItemId: string, cropItemId: string, win: any = pageWindow): SendResult {
  return send(T.FeedPet, { scope: "Quinoa", petItemId, cropItemId }, win);
}

export function swapPet(petSlotId: string, petInventoryId: string, win: any = pageWindow): SendResult {
  return send(T.SwapPet, { scope: "Quinoa", petSlotId, petInventoryId }, win);
}

export function swapPetFromStorage(petSlotId: string, storagePetId: string, storageId: string, win: any = pageWindow): SendResult {
  return send(T.SwapPetFromStorage, { scope: "Quinoa", petSlotId, storagePetId, storageId }, win);
}

export function pickupPet(petId: string, win: any = pageWindow): SendResult {
  return send(T.PickupPet, { scope: "Quinoa", petId }, win);
}

export function movePetSlot(movePetSlotId: string, toPetSlotIndex: number, win: any = pageWindow): SendResult {
  return send(T.MovePetSlot, { scope: "Quinoa", movePetSlotId, toPetSlotIndex }, win);
}

export function namePet(petItemId: string, name: string, win: any = pageWindow): SendResult {
  return send(T.NamePet, { scope: "Quinoa", petItemId, name }, win);
}

export function sellPet(itemId: string, win: any = pageWindow): SendResult {
  return send(T.SellPet, { scope: "Quinoa", itemId }, win);
}

/** Mounts a pet — required before any rideable ability (Dawn Capture, ...). */
export function ridePet(petItemId: string, win: any = pageWindow): SendResult {
  return send(T.RidePet, { scope: "Quinoa", petItemId }, win);
}

export function dismountPet(win: any = pageWindow): SendResult {
  return send(T.DismountPet, { scope: "Quinoa" }, win);
}

/** Triggers the Ostrich's Dawn Capture ability. Requires riding the pet and being off cooldown. */
export function dawnCapture(petItemId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.DawnCapture, { scope: "Quinoa", petItemId, position: { x, y } satisfies Position }, win);
}

/** Triggers the Thundercharger's ability. Requires riding the pet and being off cooldown. */
export function thundercharge(petItemId: string, x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.Thundercharge, { scope: "Quinoa", petItemId, position: { x, y } satisfies Position }, win);
}

/** Asks nearby pets to greet the player at this position. */
export function requestPetGreet(x: number, y: number, win: any = pageWindow): SendResult {
  return send(T.RequestPetGreet, { scope: "Quinoa", position: { x, y } satisfies Position }, win);
}

/**
 * Consumes one Replenish Potion to fully restore the pet's hunger.
 * Requires the player to be standing on the pet's tile.
 */
export function replenishPotion(petItemId: string, win: any = pageWindow): SendResult {
  return send(T.ReplenishPotion, { scope: "Quinoa", petItemId }, win);
}

/** Consumes one XP Potion to level the pet up. */
export function xpPotion(petItemId: string, win: any = pageWindow): SendResult {
  return send(T.XPPotion, { scope: "Quinoa", petItemId }, win);
}

export function equipPetCosmetic(petItemId: string, slotCategory: string, cosmeticId: string, win: any = pageWindow): SendResult {
  return send(T.EquipPetCosmetic, { scope: "Quinoa", petItemId, slotCategory, cosmeticId }, win);
}

export function upgradePetHutch(win: any = pageWindow): SendResult {
  return send(T.UpgradePetHutch, { scope: "Quinoa" }, win);
}

export function upgradeSeedSilo(win: any = pageWindow): SendResult {
  return send(T.UpgradeSeedSilo, { scope: "Quinoa" }, win);
}

export function upgradeDecorShed(win: any = pageWindow): SendResult {
  return send(T.UpgradeDecorShed, { scope: "Quinoa" }, win);
}

// -----------------------------
// Pet teams
// -----------------------------

export function savePetTeam(teamId: string, name: string, petIds: string[], win: any = pageWindow): SendResult {
  return send(T.SavePetTeam, { scope: "Quinoa", teamId, name, petIds }, win);
}

export function applyPetTeam(teamId: string, win: any = pageWindow): SendResult {
  return send(T.ApplyPetTeam, { scope: "Quinoa", teamId }, win);
}

export function deletePetTeam(teamId: string, win: any = pageWindow): SendResult {
  return send(T.DeletePetTeam, { scope: "Quinoa", teamId }, win);
}

export function movePetTeam(movePetTeamId: string, toPetTeamIndex: number, win: any = pageWindow): SendResult {
  return send(T.MovePetTeam, { scope: "Quinoa", movePetTeamId, toPetTeamIndex }, win);
}

export function setPetTeamEmblem(teamId: string, emblem: string, win: any = pageWindow): SendResult {
  return send(T.SetPetTeamEmblem, { scope: "Quinoa", teamId, emblem }, win);
}

// -----------------------------
// Seasonal / misc
// -----------------------------

export function throwSnowball(win: any = pageWindow): SendResult {
  return send(T.ThrowSnowball, { scope: "Quinoa" }, win);
}

export function checkFriendBonus(win: any = pageWindow): SendResult {
  return send(T.CheckFriendBonus, { scope: "Quinoa" }, win);
}
