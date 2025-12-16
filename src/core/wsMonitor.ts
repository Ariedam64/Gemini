// src/core/wsMonitor.ts
// Detect global WebSocket close events, specifically code 4710 (Version Expired)
import { isInIframe, pageWindow } from "../utils/pageContext";

type WsCloseCallback = (ev: CloseEvent, ws: WebSocket) => void;

let installed = false;
const listeners: WsCloseCallback[] = [];

function installPatch() {
  if (installed) return;
  installed = true;
  try {
    const OriginalWS = pageWindow.WebSocket;
    const PatchedWS = function (this: WebSocket, url: string | URL, protocols?: string | string[]) {
      // @ts-ignore - construct underlying socket
      const ws: WebSocket = protocols !== undefined ? new OriginalWS(url as any, protocols as any) : new OriginalWS(url as any);
      try {
        ws.addEventListener("close", (ev: CloseEvent) => {
          try {
            const isExpired = ev?.code === 4710 || /Version\s*Expired/i.test(ev?.reason || "");
            if (isExpired) {
              for (const cb of listeners) {
                try { cb(ev, ws); } catch {}
              }
            }
          } catch {}
        });
      } catch {}
      return ws;
    } as unknown as typeof WebSocket;

    // Preserve prototype chain and static constants
    (PatchedWS as any).prototype = OriginalWS.prototype;
    (PatchedWS as any).CONNECTING = (OriginalWS as any).CONNECTING;
    (PatchedWS as any).OPEN = (OriginalWS as any).OPEN;
    (PatchedWS as any).CLOSING = (OriginalWS as any).CLOSING;
    (PatchedWS as any).CLOSED = (OriginalWS as any).CLOSED;

    // Replace global
    // @ts-ignore
    pageWindow.WebSocket = PatchedWS;
  } catch {}
}

/**
 * Start monitoring WebSocket close events and notify when code 4710 (Version Expired) occurs.
 * Safe to call multiple times; patch is installed once.
 */
export function monitorWsVersionExpired(cb: WsCloseCallback) {
  listeners.push(cb);
  installPatch();
}

/**
 * Installs a listener that reloads the page when the server closes
 * the WebSocket with code 4710 (Version Expired), unless running in an iframe.
 */
export function startAutoReloadOnVersionExpired() {
  monitorWsVersionExpired((_ev) => {
    try { if (!isInIframe()) pageWindow.location.reload(); } catch {}
  });
}
