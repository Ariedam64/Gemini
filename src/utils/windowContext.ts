// src/utils/windowContext.ts
// Page vs sandbox context helpers for userscript environments

declare const unsafeWindow:
  | (Window & typeof globalThis & { [key: string]: any })
  | undefined;

const sandboxWin = window;

/**
 * Get the actual page window, handling different userscript managers:
 * - Tampermonkey/Violentmonkey: use unsafeWindow
 * - Firefox/Greasemonkey: use window.wrappedJSObject
 * - Fallback: use current window
 */
function getPageWindow(): Window & typeof globalThis & { [key: string]: any } {
  // 1. Try unsafeWindow (Tampermonkey/Violentmonkey standard)
  if (typeof unsafeWindow !== "undefined" && unsafeWindow) {
    return unsafeWindow;
  }

  // 2. Try wrappedJSObject (Firefox/Greasemonkey specific)
  // This gives direct access to the page's window object in Firefox
  const wrapped = (window as any).wrappedJSObject;
  if (wrapped && wrapped !== window) {
    return wrapped;
  }

  // 3. Fallback to current window
  return sandboxWin;
}

const pageWin = getPageWindow();

/** Reference to the actual page window (falls back to the current window). */
export const pageWindow = pageWin;

/** Whether the userscript is running in an isolated sandbox. */
export const isIsolatedContext = pageWin !== sandboxWin;

/** Provide the sandbox window in case something explicitly needs it. */
export const sandboxWindow = sandboxWin;

/** Mirror a global value onto both the page window and sandbox window. */
export function shareGlobal(name: string, value: any) {
  try {
    (pageWin as any)[name] = value;
  } catch {}
  if (isIsolatedContext) {
    try {
      (sandboxWin as any)[name] = value;
    } catch {}
  }
}

/** Read a global value from the page (preferring sandbox if available). */
export function readSharedGlobal<T = any>(name: string): T | undefined {
  if (isIsolatedContext) {
    const sandboxValue = (sandboxWin as any)[name];
    if (sandboxValue !== undefined) return sandboxValue as T;
  }
  return (pageWin as any)[name] as T | undefined;
}

/**
 * Dispatch a CustomEvent to both page and sandbox windows.
 * Creates a fresh event per realm to avoid cross-realm event issues.
 */
export function dispatchCustomEventAll<T = any>(type: string, detail?: T): void {
  const dispatch = (win: Window & typeof globalThis) => {
    try {
      const Ctor = (win as any).CustomEvent || CustomEvent;
      win.dispatchEvent(new Ctor(type, detail !== undefined ? { detail } : undefined));
    } catch {
      // ignore
    }
  };

  dispatch(pageWin);
  if (isIsolatedContext) {
    dispatch(sandboxWin);
  }
}

/** True if the current page context is inside an iframe. */
export function isInIframe(win: Window & typeof globalThis = pageWin): boolean {
  try { return win.top !== win; } catch { return true; }
}
