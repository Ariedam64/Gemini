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

middleware(ClientToServerMessageType.PurchaseSeed, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PurchaseSeed"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PurchaseEgg, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PurchaseEgg"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PurchaseTool, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PurchaseTool"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PurchaseDecor, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PurchaseDecor"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PlantEgg, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Garden] PlantEgg"); }
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
