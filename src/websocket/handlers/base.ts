// src/Websocket/handlers/base.ts

export type IncomingCtx = {
  ws: WebSocket;
  pageWindow: any;
  debug: boolean;
};

export type IncomingMessagePayload = {
  kind: "message";
  /** Original MessageEvent.data */
  raw: any;
  /** Best-effort parsed JSON (or the raw if not parseable) */
  data: any;
  /** Best-effort message type extraction */
  type?: string;
};

export type IncomingClosePayload = {
  kind: "close";
  code: number;
  reason: string;
  wasClean: boolean;
  event: CloseEvent;
};

export type IncomingOpenPayload = {
  kind: "open";
  event: Event;
};

export type IncomingErrorPayload = {
  kind: "error";
  event: Event;
};

export type IncomingPayload =
  | IncomingMessagePayload
  | IncomingClosePayload
  | IncomingOpenPayload
  | IncomingErrorPayload;

/**
 * If a handler returns true, it "consumes" the event and stops further dispatch.
 * Return void/false to let other handlers run.
 */
export type IncomingHandlerFn<T extends IncomingPayload = IncomingPayload> = (
  payload: T,
  ctx: IncomingCtx
) => void | boolean;

/**
 * Generic handler.
 * match() is a type-guard so TS knows the payload shape passed to handle().
 */
export type IncomingHandler<T extends IncomingPayload = IncomingPayload> = {
  match: (payload: IncomingPayload) => payload is T;
  handle: IncomingHandlerFn<T>;
};

// -----------------------------
// Registry (auto-wired handlers)
// -----------------------------

const registry: IncomingHandler<any>[] = [];

export function getRegisteredHandlers(): IncomingHandler[] {
  return registry.slice() as IncomingHandler[];
}

function register<T extends IncomingPayload>(h: IncomingHandler<T>) {
  registry.push(h as IncomingHandler<any>);
}

// -----------------------------
// Helpers
// -----------------------------

function getMessageType(msg: unknown): string | undefined {
  if (msg == null) return;

  // Common server shape: { type: "Welcome", ... }
  if (typeof msg === "object") {
    const m = msg as any;
    if (typeof m.type === "string") return m.type;
    if (typeof m.Type === "string") return m.Type;
    if (typeof m.kind === "string") return m.kind;
    if (typeof m.messageType === "string") return m.messageType;
  }

  // Sometimes messages are arrays like ["Welcome", {...}]
  if (Array.isArray(msg) && typeof msg[0] === "string") return msg[0];

  return;
}

function parseIncomingData(raw: any): any {
  // English note: We keep this synchronous. If the page sends Blob, we do not
  // async-decode it here. Most games send string JSON anyway.
  if (typeof raw === "string") {
    try { return JSON.parse(raw); } catch { return raw; }
  }
  return raw;
}

const PATCHED = Symbol.for("ariesmod.ws.handlers.patched");

// -----------------------------
// The single "handle" API (type OR close code)
// -----------------------------

/**
 * Register a handler for a server->client message.type.
 * Example: handle("Welcome", (p) => console.log(p.data));
 */
export function handle(type: string, fn: IncomingHandlerFn<IncomingMessagePayload>): IncomingHandler<IncomingMessagePayload>;
/**
 * Register a handler for a CloseEvent.code.
 * Example: handle(4700, (p) => console.log("VersionMismatch", p.code));
 */
export function handle(code: number, fn: IncomingHandlerFn<IncomingClosePayload>): IncomingHandler<IncomingClosePayload>;
export function handle(typeOrCode: string | number, fn: any): IncomingHandler<any> {
  if (typeof typeOrCode === "string") {
    const type = typeOrCode;

    const h: IncomingHandler<IncomingMessagePayload> = {
      match: (p): p is IncomingMessagePayload => p.kind === "message" && p.type === type,
      handle: fn,
    };

    register(h);
    return h;
  }

  const code = typeOrCode;

  const h: IncomingHandler<IncomingClosePayload> = {
    match: (p): p is IncomingClosePayload => p.kind === "close" && p.code === code,
    handle: fn,
  };

  register(h);
  return h;
}

/**
 * Optional helpers if you want "catch-all" behavior.
 */
export function handleAnyMessage(fn: IncomingHandlerFn<IncomingMessagePayload>): IncomingHandler<IncomingMessagePayload> {
  const h: IncomingHandler<IncomingMessagePayload> = {
    match: (p): p is IncomingMessagePayload => p.kind === "message",
    handle: fn,
  };
  register(h);
  return h;
}

export function handleAnyClose(fn: IncomingHandlerFn<IncomingClosePayload>): IncomingHandler<IncomingClosePayload> {
  const h: IncomingHandler<IncomingClosePayload> = {
    match: (p): p is IncomingClosePayload => p.kind === "close",
    handle: fn,
  };
  register(h);
  return h;
}

export function handleOpen(fn: IncomingHandlerFn<IncomingOpenPayload>): IncomingHandler<IncomingOpenPayload> {
  const h: IncomingHandler<IncomingOpenPayload> = {
    match: (p): p is IncomingOpenPayload => p.kind === "open",
    handle: fn,
  };
  register(h);
  return h;
}

export function handleError(fn: IncomingHandlerFn<IncomingErrorPayload>): IncomingHandler<IncomingErrorPayload> {
  const h: IncomingHandler<IncomingErrorPayload> = {
    match: (p): p is IncomingErrorPayload => p.kind === "error",
    handle: fn,
  };
  register(h);
  return h;
}

// -----------------------------
// Attach to a WebSocket
// -----------------------------

/**
 * Attaches incoming handlers to a WS instance.
 * If handlers is omitted, it uses the auto-registered registry (plug & play).
 */
export function attachIncomingHandlers(
  ws: WebSocket,
  handlers: IncomingHandler[] = getRegisteredHandlers(),
  opts: { pageWindow?: any; debug?: boolean } = {}
): () => void {
  const win = opts.pageWindow ?? window;
  const debug = !!opts.debug;

  if ((ws as any)[PATCHED]) return () => {};
  (ws as any)[PATCHED] = true;

  const ctx: IncomingCtx = { ws, pageWindow: win, debug };

  const dispatch = (payload: IncomingPayload) => {
    for (const h of handlers as IncomingHandler<any>[]) {
      try {
        if (!h.match(payload)) continue;
        const consumed = h.handle(payload, ctx);
        if (consumed === true) return;
      } catch (e) {
        if (debug) console.error("[WS] handler error", e, payload);
      }
    }
  };

  const onMessage = (ev: MessageEvent) => {
    const data = parseIncomingData(ev.data);
    const type = getMessageType(data);
    dispatch({ kind: "message", raw: ev.data, data, type });
  };

  const onClose = (ev: CloseEvent) => {
    dispatch({
      kind: "close",
      code: ev.code,
      reason: ev.reason,
      wasClean: ev.wasClean,
      event: ev,
    });
  };

  const onOpen = (ev: Event) => dispatch({ kind: "open", event: ev });
  const onError = (ev: Event) => dispatch({ kind: "error", event: ev });

  ws.addEventListener("message", onMessage);
  ws.addEventListener("close", onClose);
  ws.addEventListener("open", onOpen);
  ws.addEventListener("error", onError);

  return () => {
    try { ws.removeEventListener("message", onMessage); } catch {}
    try { ws.removeEventListener("close", onClose); } catch {}
    try { ws.removeEventListener("open", onOpen); } catch {}
    try { ws.removeEventListener("error", onError); } catch {}
    try { delete (ws as any)[PATCHED]; } catch {}
  };
}

// ------------------------------------------------------------
// Auto-load handler modules in this folder (side-effect import)
// ------------------------------------------------------------
//
// Goal: Drop a new file in /handlers and it auto-registers itself.
// Requirement: bundler support for import.meta.glob (Vite/Rollup-like).
// If unsupported, this block does nothing (manual imports then required).

(function autoloadHandlers() {
  try {
    const meta: any = import.meta as any;

    const glob =
      meta.glob?.("./**/*.ts", { eager: true }) ??
      meta.glob?.("./**/*.js", { eager: true });

    if (!glob) return;

    // Eager glob already executed modules (their top-level code runs and registers handlers).
    void glob;
  } catch {
    // No glob support: no autoload.
  }
})();
