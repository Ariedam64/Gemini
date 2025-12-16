import { middleware } from "./base";
import { ClientToServerMessageType } from "../protocol";

/**
 * Social / chat / host related outgoing messages.
 */

middleware(ClientToServerMessageType.Chat, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Social] Chat"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.Dev, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Social] Dev"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.Emote, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Social] Emote"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.Wish, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Social] Wish"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.KickPlayer, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Social] KickPlayer"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.ReportSpeakingStart, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Voice] ReportSpeakingStart"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.SetPlayerData, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Social] SetPlayerData"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.UsurpHost, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Social] UsurpHost"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});




