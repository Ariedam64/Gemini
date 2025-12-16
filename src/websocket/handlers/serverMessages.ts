// src/Websocket/handlers/serverMessages.ts
import { handle } from "./base";
import { ServerToClientMessageType } from "../protocol";

/**
 * Server -> client message handlers.
 * Only logs when debug is enabled.
 */

handle(ServerToClientMessageType.Config, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] Config", p.data); }
});

handle(ServerToClientMessageType.CurrencyTransaction, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] CurrencyTransaction", p.data); }
});

handle(ServerToClientMessageType.Emote, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] Emote", p.data); }
});

handle(ServerToClientMessageType.InappropriateContentRejected, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] InappropriateContentRejected", p.data); }
});

handle(ServerToClientMessageType.PartialState, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] PartialState", p.data); }
});

handle(ServerToClientMessageType.Pong, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] Pong", p.data); }
});

handle(ServerToClientMessageType.ServerErrorMessage, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] ServerErrorMessage", p.data); }
});

handle(ServerToClientMessageType.Welcome, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] Welcome", p.data); }
});
