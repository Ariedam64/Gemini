// src/Websocket/middlewares/base.ts

export type MiddlewareCtx = {
  ws: WebSocket | null;
  pageWindow: any;
  debug: boolean;
};

export type OutgoingMiddlewareResult =
  | void
  | { kind: "drop" }
  | { kind: "replace"; message: unknown };

export type OutgoingMiddleware = (message: unknown, ctx: MiddlewareCtx) => OutgoingMiddlewareResult;

// -----------------------------
// Registry (auto-wired middlewares)
// -----------------------------

const registry: OutgoingMiddleware[] = [];

export function getRegisteredMiddlewares(): OutgoingMiddleware[] {
  return registry.slice();
}

function register(mw: OutgoingMiddleware) {
  registry.push(mw);
}

// -----------------------------
// Helpers
// -----------------------------

function safeJsonParse(s: string): any {
  try { return JSON.parse(s); } catch { return undefined; }
}

/**
 * Normalize outgoing payload so middlewares can read "type" reliably.
 *
 * English note:
 * - WebSocket.send often receives stringified JSON.
 * - RoomConnection.sendMessage may receive (obj) OR (type, payload) OR even mixed.
 * This helper tries to turn it into a comparable shape.
 */
function normalizeOutgoing(raw: unknown): unknown {
  if (typeof raw === "string") {
    const parsed = safeJsonParse(raw);
    return parsed !== undefined ? parsed : raw;
  }
  return raw;
}

// Best-effort "type" extraction for common wire shapes.
function getMessageType(msg: unknown): string | undefined {
  if (msg == null) return;

  // If we got a JSON string that wasn't parsed earlier, parse now.
  if (typeof msg === "string") {
    const parsed = safeJsonParse(msg);
    if (parsed !== undefined) return getMessageType(parsed);
    // Sometimes the type itself is sent as a string: sendMessage("PetPositions", payload)
    return msg;
  }

  // Common: ["Type", payload]
  if (Array.isArray(msg) && typeof msg[0] === "string") return msg[0];

  // Common: { type: "Type", ... } (or variants)
  if (typeof msg === "object") {
    const m = msg as any;
    return m.type ?? m.Type ?? m.kind ?? m.messageType;
  }

  return;
}

// Try to get a "current" ws reference for ctx/debug.
// Kept local to avoid circular deps.
function getCurrentWs(win: any): WebSocket | null {
  const ws = win?.MagicCircle_RoomConnection?.currentWebSocket;
  return ws && typeof ws === "object" ? (ws as WebSocket) : null;
}

type TypedHandler = (message: unknown, ctx: MiddlewareCtx) => void | boolean | OutgoingMiddlewareResult;

/**
 * Create + auto-register a middleware that triggers on a specific message type.
 *
 * defaultAllowSend:
 * - omitted => message is sent unless handler drops it
 * - false   => message is dropped unless handler explicitly allows
 *
 * handler return:
 * - void: keep default decision
 * - boolean: true = send, false = drop
 * - { kind: "drop" } or { kind: "replace", message } for advanced control
 */
export function middleware(type: string, handler: TypedHandler): OutgoingMiddleware;
export function middleware(type: string, defaultAllowSend: boolean, handler: TypedHandler): OutgoingMiddleware;
export function middleware(type: string, a: any, b?: any): OutgoingMiddleware {
  const defaultAllowSend = typeof a === "boolean" ? a : true;
  const handler: TypedHandler = typeof a === "function" ? a : b;

  const mw: OutgoingMiddleware = (message, ctx) => {
    const t = getMessageType(message);
    if (t !== type) return;

    const r = handler(message, ctx);

    // Native middleware result passthrough.
    if (r && typeof r === "object" && "kind" in r) return r as OutgoingMiddlewareResult;

    // Boolean override.
    if (typeof r === "boolean") return r ? undefined : { kind: "drop" };

    // No explicit decision => default behavior.
    return defaultAllowSend ? undefined : { kind: "drop" };
  };

  register(mw);
  return mw;
}

// -----------------------------
// Outgoing patching
// -----------------------------

// We avoid Symbols and visible flags by using WeakSet/WeakMap.
const patchedFns = new WeakSet<Function>();
const nativeByPatched = new WeakMap<Function, Function>();

/**
 * Patch outgoing messages at the best available layer:
 * 1) Prefer MagicCircle_RoomConnection.sendMessage (game-level pipeline, includes queue)
 * 2) Also patch WebSocket.prototype.send (low-level fallback)
 *
 * If `middlewares` is omitted, this uses the auto-registered registry.
 *
 * Returns a disposer that restores original functions (best effort).
 */
export function patchOutgoingMessages(opts: {
  pageWindow: any;
  middlewares?: OutgoingMiddleware[];
  debug?: boolean;
  /**
   * How long to wait/poll for MagicCircle_RoomConnection to exist.
   * 0 = don't poll, only patch if present now.
   */
  waitForRoomConnectionMs?: number;
}): () => void {
  const win = opts.pageWindow;
  const debug = !!opts.debug;

  const list =
    opts.middlewares && opts.middlewares.length
      ? opts.middlewares
      : getRegisteredMiddlewares();

  // Even if list is empty, we still patch (optional).
  // But patching with 0 middlewares is basically no-op, so we can just bail.
  if (!list.length) return () => {};

  const makeCtx = (ws: WebSocket | null): MiddlewareCtx => ({ ws, pageWindow: win, debug });

  const runPipeline = (message: unknown, wsForCtx: WebSocket | null): OutgoingMiddlewareResult => {
    let current = message;

    for (const mw of list) {
      const res = mw(current, makeCtx(wsForCtx));
      if (!res) continue;

      if (res.kind === "drop") return { kind: "drop" };
      if (res.kind === "replace") current = res.message;
    }

    return current !== message ? { kind: "replace", message: current } : undefined;
  };

  let restoreRoomSend: (() => void) | null = null;
  let restoreWsSend: (() => void) | null = null;
  let pollId: any = null;

  // 1) Patch RoomConnection.sendMessage (best place)
  const tryPatchRoomConnection = (): boolean => {
    const conn = win?.MagicCircle_RoomConnection;
    const sendMessage = conn?.sendMessage;

    if (!conn || typeof sendMessage !== "function") return false;
    if (patchedFns.has(sendMessage)) return true;

    const original = sendMessage.bind(conn);

    function patchedSendMessage(...args: any[]) {
      // Represent outgoing message in a middleware-friendly way:
      // - 1 arg => that arg
      // - N args => array of args (e.g. ["Type", payload])
      const originalMsg = args.length === 1 ? args[0] : args;

      const normalized = normalizeOutgoing(originalMsg);
      const res = runPipeline(normalized, getCurrentWs(win));

      if (res?.kind === "drop") {
        if (debug) console.log("[WS] drop outgoing (RoomConnection.sendMessage)", normalized);
        return;
      }

      if (res?.kind === "replace") {
        const newMsg = res.message;

        // Map back to sendMessage call:
        // - If original was multi-args and newMsg is array => spread it
        // - Else call with single argument
        if (args.length > 1 && Array.isArray(newMsg)) {
          if (debug) console.log("[WS] replace outgoing (RoomConnection.sendMessage)", normalized, "=>", newMsg);
          return original(...newMsg);
        } else {
          if (debug) console.log("[WS] replace outgoing (RoomConnection.sendMessage)", normalized, "=>", newMsg);
          return original(newMsg);
        }
      }

      // No change
      return original(...args);
    }

    patchedFns.add(patchedSendMessage as any);
    nativeByPatched.set(patchedSendMessage as any, sendMessage);

    try {
      conn.sendMessage = patchedSendMessage as any;
      patchedFns.add(conn.sendMessage);
      if (debug) console.log("[WS] outgoing patched via MagicCircle_RoomConnection.sendMessage");
    } catch {
      return false;
    }

    restoreRoomSend = () => {
      try {
        if (conn.sendMessage === (patchedSendMessage as any)) {
          conn.sendMessage = sendMessage;
        }
      } catch {}
    };

    return true;
  };

  // 2) Patch WebSocket.prototype.send (fallback / safety)
  const patchWebSocketSend = () => {
    const proto = win?.WebSocket?.prototype;
    const nativeSend = proto?.send;

    if (typeof nativeSend !== "function") return;
    if (patchedFns.has(nativeSend)) return;

    function patchedSend(this: WebSocket, data: any) {
      const normalized = normalizeOutgoing(data);
      const res = runPipeline(normalized, this);

      if (res?.kind === "drop") {
        if (debug) console.log("[WS] drop outgoing (ws.send)", normalized);
        return;
      }

      if (res?.kind === "replace") {
        const out = res.message;

        // ws.send expects string/binary. If middleware returned object, stringify.
        const payload =
          typeof out === "string" || out instanceof ArrayBuffer || out instanceof Blob
            ? out
            : JSON.stringify(out);

        if (debug) console.log("[WS] replace outgoing (ws.send)", normalized, "=>", out);
        return (nativeSend as any).call(this, payload);
      }

      // If original data was a string, keep it as-is (don't re-stringify).
      return (nativeSend as any).call(this, data);
    }

    patchedFns.add(patchedSend as any);
    nativeByPatched.set(patchedSend as any, nativeSend);

    try {
      proto.send = patchedSend as any;
      if (debug) console.log("[WS] outgoing patched via WebSocket.prototype.send");
    } catch {
      return;
    }

    restoreWsSend = () => {
      try {
        if (proto.send === (patchedSend as any)) {
          proto.send = nativeSend;
        }
      } catch {}
    };
  };

  // Patch both
  patchWebSocketSend();

  // Try now, otherwise wait a bit for RoomConnection to exist.
  const waitMs = opts.waitForRoomConnectionMs ?? 4000;
  if (!tryPatchRoomConnection() && waitMs > 0) {
    const start = Date.now();
    pollId = setInterval(() => {
      if (tryPatchRoomConnection()) {
        clearInterval(pollId);
        pollId = null;
        return;
      }
      if (Date.now() - start > waitMs) {
        clearInterval(pollId);
        pollId = null;
        if (debug) console.log("[WS] RoomConnection not found, only ws.send is patched");
      }
    }, 250);
  }

  return () => {
    if (pollId) {
      try { clearInterval(pollId); } catch {}
      pollId = null;
    }
    if (restoreRoomSend) {
      try { restoreRoomSend(); } catch {}
      restoreRoomSend = null;
    }
    if (restoreWsSend) {
      try { restoreWsSend(); } catch {}
      restoreWsSend = null;
    }
  };
}

// ------------------------------------------------------------
// Auto-load middleware modules in this folder (side-effect import)
// ------------------------------------------------------------
//
// Reminder: this only works if your bundler supports import.meta.glob.
// If you already import register.ts manually, you can delete this block.

(function autoloadMiddlewares() {
  try {
    const meta: any = import.meta as any;

    const glob =
      meta.glob?.("./**/*.ts", { eager: true }) ??
      meta.glob?.("./**/*.js", { eager: true });

    if (!glob) return;
    void glob;
  } catch {}
})();
