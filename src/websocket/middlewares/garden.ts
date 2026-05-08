import { middleware } from "./base";
import { ClientToServerMessageType } from "../protocol";

/**
 * Garden actions / shop purchases outgoing messages.
 */

middleware(ClientToServerMessageType.PlantSeed, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PlantSeed"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.WaterPlant, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] WaterPlant"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.HarvestCrop, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] HarvestCrop"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.SellAllCrops, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] SellAllCrops"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PurchaseShopItem, (msg, ctx) => {
  if (ctx.debug) {
    const shop = (msg as { shop?: unknown }).shop;
    console.log("[MW][Garden] PurchaseShopItem", { shop });
  }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.GrowEgg, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] GrowEgg"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.HatchEgg, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] HatchEgg"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PlantGardenPlant, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PlantGardenPlant"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PotPlant, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PotPlant"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.MutationPotion, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] MutationPotion"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PickupDecor, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PickupDecor"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PlaceDecor, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PlaceDecor"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.RemoveGardenObject, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] RemoveGardenObject"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});
