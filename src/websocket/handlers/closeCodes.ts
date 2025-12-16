// src/Websocket/handlers/closeCodes.ts
import { handle } from "./base";
import { WebSocketCloseCode } from "../protocol";

/**
 * Close code handlers.
 * Only logs when debug is enabled.
 */

handle(WebSocketCloseCode.AuthenticationFailure, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] Auth failure", p.code, p.reason); }
});

handle(WebSocketCloseCode.ConnectionSuperseded, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] Superseded", p.code, p.reason); }
});

handle(WebSocketCloseCode.HeartbeatExpired, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] Heartbeat expired", p.code, p.reason); }
});

handle(WebSocketCloseCode.PlayerKicked, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] Player kicked", p.code, p.reason); }
});

handle(WebSocketCloseCode.PlayerLeftVoluntarily, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] Player left voluntarily", p.code, p.reason); }
});

handle(WebSocketCloseCode.ReconnectInitiated, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] Reconnect initiated", p.code, p.reason); }
});

handle(WebSocketCloseCode.ServerDisposed, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] Server disposed", p.code, p.reason); }
});

handle(WebSocketCloseCode.UserSessionSuperseded, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] User session superseded", p.code, p.reason); }
});

handle(WebSocketCloseCode.VersionExpired, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] Version expired", p.code, p.reason); }
});

handle(WebSocketCloseCode.VersionMismatch, (p, ctx) => {
  if (ctx.debug) { console.log("[WS][Close] Version mismatch", p.code, p.reason); }
});
