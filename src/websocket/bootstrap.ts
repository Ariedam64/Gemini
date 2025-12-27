// src/Websocket/bootstrap.ts
import { installWebSocketCapture, getBestWebSocket, watchBestWebSocket } from "./connection";
import { pageWindow } from "../utils/pageContext";
import { patchOutgoingMessages, type OutgoingMiddleware } from "./middlewares/base";
import { attachIncomingHandlers, type IncomingHandler } from "./handlers/base";

import "./handlers/closeCodes";
import "./handlers/serverMessages";

import "./middlewares/garden"
import "./middlewares/inventory"
import "./middlewares/pets"
import "./middlewares/session"
import "./middlewares/social"


/**
 * WebSocket bootstrap:
 * - Captures/chooses the "real" game WebSocket (or falls back to MagicCircle_RoomConnection.currentWebSocket)
 * - Patches outgoing messages (middlewares)
 * - Routes incoming messages (handlers)
 */

export type WebsocketBootstrap = {
  /** Returns the currently selected WebSocket (may be null if not available yet). */
  getWs: () => WebSocket | null;
  /** Uninstalls patches/listeners (best effort). */
  dispose: () => void;
};

export type BootstrapOptions = {
  /** Page window (Tampermonkey: unsafeWindow). Defaults to unsafeWindow or window. */
  pageWindow?: any;

  /**
   * Optional explicit middlewares.
   * If omitted, we use auto-registered middlewares (plug & play).
   */
  middlewares?: OutgoingMiddleware[];

  /**
   * Optional explicit handlers.
   * If omitted, we use auto-registered handlers (plug & play).
   */
  handlers?: IncomingHandler[];

  /** Poll interval for detecting the active WS. */
  pollMs?: number;

  /** Log a bit more. */
  debug?: boolean;
};

export function bootstrapWebsocket(opts: BootstrapOptions = {}): WebsocketBootstrap {
  const win = opts.pageWindow ?? pageWindow;
  const pollMs = opts.pollMs ?? 500;
  const debug = !!opts.debug;

  const disposers: Array<() => void> = [];

  // 1) Capture sockets created by the page (optional but useful).
  disposers.push(installWebSocketCapture(win, { debug }));

  // 2) Patch outgoing messages.
  // If opts.middlewares is omitted, patchOutgoingMessages uses the auto registry.
  disposers.push(
    patchOutgoingMessages({
      pageWindow: win,
      middlewares: opts.middlewares,
      debug,
    })
  );

  // 3) Attach incoming handlers to the current socket and to future sockets.
  let detachIncoming: (() => void) | null = null;

  const attachTo = (ws: WebSocket | null) => {
    if (detachIncoming) {
      try { detachIncoming(); } catch {}
      detachIncoming = null;
    }
    if (!ws) return;

    // If opts.handlers is omitted, attachIncomingHandlers uses the auto registry.
    detachIncoming = attachIncomingHandlers(ws, opts.handlers, {
      debug,
      pageWindow: win,
    });
  };

  // Initial attach (if we already can resolve a WS)
  attachTo(getBestWebSocket(win).ws);

  // Watch for WS changes (reconnects, room changes, etc.)
  disposers.push(
    watchBestWebSocket((res) => attachTo(res.ws), {
      intervalMs: pollMs,
      debug,
      pageWindow: win,
    })
  );

  return {
    getWs: () => getBestWebSocket(win).ws,
    dispose: () => {
      // In reverse order, like any decent adult would do.
      for (let i = disposers.length - 1; i >= 0; i--) {
        try { disposers[i](); } catch {}
      }
      if (detachIncoming) {
        try { detachIncoming(); } catch {}
        detachIncoming = null;
      }
    },
  };
}

// -----------------------------
// Singleton init helpers
// -----------------------------

let instance: WebsocketBootstrap | null = null;

/**
 * Initialize websocket layer once.
 * Calling it multiple times returns the same instance.
 */
export function initWebSocket(opts: BootstrapOptions = {}): WebsocketBootstrap {
  if (instance) return instance;
  instance = bootstrapWebsocket(opts);
  return instance;
}

/** Get the current instance (or null if not initialized). */
export function getWebSocketBootstrap(): WebsocketBootstrap | null {
  return instance;
}

/** Convenience: get the currently selected WS (or null). */
export function getWs(): WebSocket | null {
  return instance?.getWs() ?? null;
}

/** Dispose and reset (useful for hot reload / manual teardown). */
export function disposeWebSocket(): void {
  if (!instance) return;
  try { instance.dispose(); } catch {}
  instance = null;
}
