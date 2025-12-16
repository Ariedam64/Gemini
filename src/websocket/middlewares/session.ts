import { middleware } from "./base";
import { ClientToServerMessageType } from "../protocol";

/**
 * Session / game / heartbeat outgoing messages.
 */

console.log("[WS] TESTTEST");

middleware(ClientToServerMessageType.SetSelectedGame, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Session] SetSelectedGame"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.VoteForGame, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Session] VoteForGame"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.RequestGame, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Session] RequestGame"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.RestartGame, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Session] RestartGame"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.Ping, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Session] Ping"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.PlayerPosition, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Session] PlayerPosition"); }
  const shouldBlock = false; 
  return shouldBlock ? false : true;
  
});

middleware(ClientToServerMessageType.Teleport, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Session] Teleport"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});

middleware(ClientToServerMessageType.CheckWeatherStatus, (_msg, ctx) => {
  if (ctx.debug) { console.log("[MW][Session] CheckWeatherStatus"); }
  const shouldBlock = false;
  return shouldBlock ? false : true;
});
