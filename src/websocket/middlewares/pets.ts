import { middleware } from "./base";
import { ClientToServerMessageType } from "../protocol";

/**
 * Pets outgoing messages.
 */

middleware(ClientToServerMessageType.PlacePet, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Pets] PlacePet"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.FeedPet, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Pets] FeedPet"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PetPositions, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Pets] PetPositions"); }
  const shouldBlock = false; // <-- put your condition here
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.SwapPet, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Pets] SwapPet"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.StorePet, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Pets] StorePet"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.NamePet, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Pets] NamePet"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.SellPet, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Pets] SellPet"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});
