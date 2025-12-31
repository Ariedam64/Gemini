// src/Websocket/connection.ts
/**
 * Connection + transport helpers (Tampermonkey-friendly).
 *
 * Goals:
 * - Capture the real WebSocket the page creates (by wrapping win.WebSocket).
 * - Fallback to win.MagicCircle_RoomConnection.currentWebSocket
 * - Provide a single "send" entrypoint that prefers RoomConnection.sendMessage
 *
 * Important:
 * - ZERO domain logic here.
 * - Symbols used to avoid readable global flags.
 */

import { pageWindow } from "../utils/windowContext";
import { pushWSLog } from "../ui/sections/Dev/WSLogger";

export type BestWsResult = {
  ws: WebSocket | null;
  source: "captured" | "roomConnection" | null;
};

type CaptureState = {
  nativeCtor: typeof WebSocket | null;
  captured: WebSocket[];
  latestOpen: WebSocket | null;
};

const state: CaptureState = {
  nativeCtor: null,
  captured: [],
  latestOpen: null,
};

const WRAPPED = Symbol.for("ariesmod.ws.capture.wrapped");
const NATIVE = Symbol.for("ariesmod.ws.capture.native");

const WS_OPEN = 1;

function isOpen(ws: WebSocket | null): ws is WebSocket {
  return !!ws && ws.readyState === WS_OPEN;
}

function pickOpenCaptured(): WebSocket | null {
  if (isOpen(state.latestOpen)) return state.latestOpen;

  for (let i = state.captured.length - 1; i >= 0; i--) {
    const s = state.captured[i];
    if (isOpen(s)) return s;
  }
  return null;
}

function track(ws: WebSocket, debug: boolean) {
  state.captured.push(ws);
  if (state.captured.length > 25) state.captured.splice(0, state.captured.length - 25);

  const markOpen = () => {
    state.latestOpen = ws;
    if (debug) console.log("[WS] captured socket opened", ws.url);
  };

  ws.addEventListener("open", markOpen);
  ws.addEventListener("close", () => {
    if (state.latestOpen === ws) state.latestOpen = null;
    if (debug) console.log("[WS] captured socket closed", ws.url);
  });

  ws.addEventListener("message", (e) => {
    try {
      const data = JSON.parse(e.data);
      pushWSLog("in", data.type || "unknown", data);
    } catch {
      pushWSLog("in", "raw", e.data);
    }
  });

  // If already open when we attach listeners.
  if (ws.readyState === WS_OPEN) markOpen();
}

export function installWebSocketCapture(
  win: any = pageWindow,
  opts: { debug?: boolean } = {}
): () => void {
  const debug = !!opts.debug;

  const currentCtor: any = win?.WebSocket;
  if (typeof currentCtor !== "function") return () => { };

  if (currentCtor[WRAPPED]) {
    state.nativeCtor = currentCtor[NATIVE] ?? state.nativeCtor ?? null;
    return () => { };
  }

  const NativeWebSocket: any = currentCtor;
  state.nativeCtor = NativeWebSocket;

  function WrappedWebSocket(this: any, url: string | URL, protocols?: string | string[]) {
    const ws: WebSocket =
      protocols !== undefined
        ? new NativeWebSocket(url as any, protocols as any)
        : new NativeWebSocket(url as any);

    try { track(ws, debug); } catch { }
    return ws;
  }

  try { (WrappedWebSocket as any).prototype = NativeWebSocket.prototype; } catch { }
  try { Object.setPrototypeOf(WrappedWebSocket, NativeWebSocket); } catch { }

  try {
    (WrappedWebSocket as any).CONNECTING = NativeWebSocket.CONNECTING;
    (WrappedWebSocket as any).OPEN = NativeWebSocket.OPEN;
    (WrappedWebSocket as any).CLOSING = NativeWebSocket.CLOSING;
    (WrappedWebSocket as any).CLOSED = NativeWebSocket.CLOSED;
  } catch { }

  (WrappedWebSocket as any)[WRAPPED] = true;
  (WrappedWebSocket as any)[NATIVE] = NativeWebSocket;

  try {
    win.WebSocket = WrappedWebSocket as any;
    if (debug) console.log("[WS] WebSocket capture installed");
  } catch {
    return () => { };
  }

  return () => {
    try {
      if (win.WebSocket === (WrappedWebSocket as any)) {
        win.WebSocket = NativeWebSocket;
      }
    } catch { }
  };
}

export function getRoomConnectionWebSocket(win: any = pageWindow): WebSocket | null {
  const ws = win?.MagicCircle_RoomConnection?.currentWebSocket;
  return ws && typeof ws === "object" ? (ws as WebSocket) : null;
}

export function getBestWebSocket(win: any = pageWindow): BestWsResult {
  const captured = pickOpenCaptured();
  if (captured) return { ws: captured, source: "captured" };

  const fallback = getRoomConnectionWebSocket(win);
  if (fallback) return { ws: fallback, source: "roomConnection" };

  return { ws: null, source: null };
}

export function watchBestWebSocket(
  onChange: (res: BestWsResult) => void,
  opts: { intervalMs?: number; debug?: boolean; pageWindow?: any } = {}
): () => void {
  const win = opts.pageWindow ?? pageWindow;
  const intervalMs = opts.intervalMs ?? 500;
  const debug = !!opts.debug;

  let last: WebSocket | null = null;
  let lastSource: BestWsResult["source"] = null;

  const tick = () => {
    const res = getBestWebSocket(win);
    if (res.ws !== last || res.source !== lastSource) {
      last = res.ws;
      lastSource = res.source;
      if (debug) console.log("[WS] best socket changed:", res.source, res.ws);
      onChange(res);
    }
  };

  tick();
  const id = setInterval(tick, intervalMs);
  return () => clearInterval(id);
}

// ------------------------------------------------------------
// Sending helpers (transport-level, still NOT domain)
// ------------------------------------------------------------

export type SendResult =
  | { ok: true }
  | { ok: false; reason: "no-ws" | "not-open" | "error"; error?: unknown };

function tryStringify(message: unknown): string | null {
  if (typeof message === "string") return message;
  try { return JSON.stringify(message); } catch { return null; }
}

/**
 * Sends a message to the server.
 * Prefers MagicCircle_RoomConnection.sendMessage when available.
 *
 * Supports:
 * - object/string payloads
 * - tuple-style calls for RoomConnection: ["Type", payload] or ["Type", payload, ...]
 */
export function sendToServer(message: unknown, win: any = pageWindow): SendResult {
  const Conn = win?.MagicCircle_RoomConnection;
  if (Conn && typeof Conn.sendMessage === "function") {
    try {
      if (Array.isArray(message)) Conn.sendMessage(...message);
      else Conn.sendMessage(message);
      return { ok: true };
    } catch (error) {
      return { ok: false, reason: "error", error };
    }
  }

  const { ws } = getBestWebSocket(win);
  if (!ws) return { ok: false, reason: "no-ws" };
  if (!isOpen(ws)) return { ok: false, reason: "not-open" };

  const payload = tryStringify(message);
  if (payload == null) {
    return { ok: false, reason: "error", error: new Error("Cannot stringify message") };
  }

  try {
    const data = JSON.parse(payload);
    pushWSLog("out", data.type || "unknown", data);
  } catch { }

  try {
    ws.send(payload);
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: "error", error };
  }
}

export function sendType(
  type: string,
  payload: Record<string, unknown> = {},
  win: any = pageWindow
): SendResult {
  return sendToServer({ type, ...payload }, win);
}

export function sendArgs(
  type: string,
  payload?: unknown,
  win: any = pageWindow
): SendResult {
  return sendToServer(payload === undefined ? [type] : [type, payload], win);
}
