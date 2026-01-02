// src/modules/core/version.ts
// MGVersion - Detects the game version from script tags

import { pageWindow } from "../../utils/windowContext";
import { sleep } from "../utils/helpers";

let gameVersion: string | null = null;

/**
 * Get the document from the page context
 */
function getDoc(): Document | null {
  return pageWindow?.document ?? (typeof document !== "undefined" ? document : null);
}

/**
 * Scan script tags to find the game version
 * Matches: /version/<hash>/... or /r/12345/version/<hash>/...
 */
function init(doc?: Document): void {
  if (gameVersion !== null) return;

  const d = doc ?? getDoc();
  if (!d) return;

  const scripts = d.scripts;
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts.item(i);
    const src = script?.src;
    if (!src) continue;

    const match = src.match(/\/(?:r\/\d+\/)?version\/([^/]+)/);
    if (match?.[1]) {
      gameVersion = match[1];
      return;
    }
  }
}

/**
 * Get the current game version (initializes if needed)
 */
function get(): string | null {
  init();
  return gameVersion;
}

/**
 * Wait for the game version to be available
 */
async function wait(timeoutMs = 15000): Promise<string> {
  const t0 = performance.now();
  while (performance.now() - t0 < timeoutMs) {
    init();
    if (gameVersion) return gameVersion;
    await sleep(50);
  }
  throw new Error("MGVersion timeout (gameVersion not found)");
}

export const MGVersion = {
  init,
  get,
  wait,
};
