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

handle(ServerToClientMessageType.RoomFrame, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] RoomFrame", p.data); }
});

handle(ServerToClientMessageType.PartialState, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][STC] PartialState (legacy)", p.data); }
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

/**
 * Reply to a QuinoaCommand envelope.
 *
 * A failure here is the only sign that an action was rejected — the command
 * simply does nothing otherwise, which is what made the envelope migration so
 * hard to spot. Failures are logged even without debug on.
 */
handle(ServerToClientMessageType.QuinoaCommandResult, (p, ctx) => {
  const result = p.data as { ok?: boolean; code?: string; commandType?: string; requestId?: string };

  if (result?.ok === false) {
    console.warn("[Gemini][WS] Command rejected:", {
      commandType: result.commandType,
      code: result.code,
      requestId: result.requestId,
    });
    return;
  }

  if (ctx.debug) { console.log("[WS][STC] QuinoaCommandResult", result); }
});
