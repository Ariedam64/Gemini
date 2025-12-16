// src/net/ws.ts
import { pageWindow, readSharedGlobal } from "../utils/pageContext";

type RoomConn = { sendMessage: (msg: any) => void };

// ───────────────────────── Connexion & envoi ─────────────────────────
let SCOPE: string[] = ["Room", "Quinoa"];

function getConn(): RoomConn | null {
  const a = (pageWindow as any)?.MagicCircle_RoomConnection as RoomConn | undefined;
  if (a && typeof a.sendMessage === "function") return a;
  const b = readSharedGlobal<RoomConn>("MagicCircle_RoomConnection");
  return b && typeof b.sendMessage === "function" ? b : null;
}

export async function waitForConnection(timeoutMs = 3000): Promise<RoomConn> {
  const t0 = Date.now();
  for (;;) {
    const c = getConn();
    if (c) return c;
    if (Date.now() - t0 >= timeoutMs) throw new Error("RoomConnection introuvable");
    await new Promise(r => setTimeout(r, 100));
  }
}

export function setDefaultScopePath(path: string[]) { SCOPE = path.slice(); }
export function getDefaultScopePath(): string[] { return SCOPE.slice(); }

export function sendToGame(msg: { type: string; scopePath?: string[]; [k: string]: any }) {
  const c = getConn();
  if (!c) throw new Error("RoomConnection indisponible");
  const { scopePath, ...rest } = msg;
  c.sendMessage({ scopePath: scopePath?.length ? scopePath : SCOPE, ...rest });
}

export async function sendToGameSafe(msg: { type: string; scopePath?: string[]; [k: string]: any }) {
  const c = getConn() ?? await waitForConnection();
  const { scopePath, ...rest } = msg;
  c.sendMessage({ scopePath: scopePath?.length ? scopePath : SCOPE, ...rest });
}

// ───────────────────────── Position joueur ─────────────────────────

export async function teleport(x: number, y: number): Promise<void> {
  try { sendToGame({ type: "Teleport", position: { x, y } }); } catch {}
}

export async function move(x: number, y: number): Promise<void> {
  try { sendToGame({ type: "PlayerPosition", position: { x, y } }); } catch {}
}

// ───────────────────────── Actions jardin ─────────────────────────
export async function plantSeed(slot: number, species: string): Promise<void> {
  try { sendToGame({ type: "PlantSeed", slot, species }); } catch {}
}

export async function waterPlant(slot: number): Promise<void> {
  try { sendToGame({ type: "WaterPlant", slot }); } catch {}
}

export async function harvestCrop(slot: number, slotsIndex: number): Promise<void> {
  try { sendToGame({ type: "HarvestCrop", slot, slotsIndex }); } catch {}
}

export async function removeGardenObject(slot: number, slotType: string): Promise<void> {
  try { sendToGame({ type: "RemoveGardenObject", slot, slotType }); } catch {}
}

export async function pickupObject(): Promise<void> {
  try { sendToGame({ type: "PickupObject" }); } catch {}
}

export async function dropObject(): Promise<void> {
  try { sendToGame({ type: "DropObject" }); } catch {}
}

export async function placeDecor(tileType: "Dirt" | "Boardwalk", localTileIndex: number, decorId: string): Promise<void> {
  try { sendToGame({ type: "PlaceDecor", tileType, localTileIndex, decorId }); } catch {}
}

// ───────────────────────── Pets ─────────────────────────
export async function feedPet(petItemId: string, cropItemId: string): Promise<void> {
  try { sendToGame({ type: "FeedPet", petItemId, cropItemId }); } catch {}
}

export async function hatchEgg(slot: number): Promise<void> {
  try { sendToGame({ type: "HatchEgg", slot }); } catch {}
}

export async function swapPet(petSlotId: string, petInventoryId: string): Promise<void> {
  try { sendToGame({ type: "SwapPet", petSlotId, petInventoryId }); } catch {}
}

export async function placePet(itemId: string, position: { x: 0; y: 0 }, tileType: "Boardwalk", localTileIndex: number ): Promise<void> {
  try { sendToGame({ type: "PlacePet", itemId, position, tileType, localTileIndex }); } catch {}
}

export async function storePet(itemId: string): Promise<void> {
  try { sendToGame({ type: "StorePet", itemId }); } catch {}
}

// ───────────────────────── Inventaire / UI ─────────────────────────
export async function setSelectedItem(itemIndex: number): Promise<void> {
  try { sendToGame({ type: "SetSelectedItem", itemIndex }); } catch {}
}

export async function toggleFavoriteItem(itemId: string): Promise<void> {
  try { sendToGame({ type: "ToggleFavoriteItem", itemId }); } catch {}
}

// ───────────────────────── Commerce ─────────────────────────
export async function sellAllCrops(): Promise<void> {
  try { sendToGame({ type: "SellAllCrops" }); } catch {}
}

export async function sellPet(itemId: string): Promise<void> {
  try { sendToGame({ type: "SellPet", itemId }); } catch {}
}

export async function wish(itemId: string): Promise<void> {
  try { sendToGame({ type: "Wish", itemId }); } catch {}
}

export async function purchaseSeed(species: string): Promise<void> {
  try { sendToGame({ type: "PurchaseSeed", species }); } catch {}
}

export async function purchaseDecor(decorId: string): Promise<void> {
  try { sendToGame({ type: "PurchaseDecor", decorId }); } catch {}
}

export async function purchaseEgg(eggId: string): Promise<void> {
  try { sendToGame({ type: "PurchaseEgg", eggId }); } catch {}
}

export async function purchaseTool(toolId: string): Promise<void> {
  try { sendToGame({ type: "PurchaseTool", toolId }); } catch {}
}