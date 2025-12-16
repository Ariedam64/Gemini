import { middleware } from "./base";
import { ClientToServerMessageType } from "../protocol";

/**
 * Inventory / storage outgoing messages.
 */

middleware(ClientToServerMessageType.MoveInventoryItem, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Inventory] MoveInventoryItem"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.DropObject, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Inventory] DropObject"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PickupObject, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Inventory] PickupObject"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.ToggleFavoriteItem, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Inventory] ToggleFavoriteItem"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PutItemInStorage, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Inventory] PutItemInStorage"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.RetrieveItemFromStorage, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Inventory] RetrieveItemFromStorage"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.MoveStorageItem, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Inventory] MoveStorageItem"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.LogItems, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Inventory] LogItems"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});
