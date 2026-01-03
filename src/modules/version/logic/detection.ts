// src/modules/version/logic/detection.ts
// Version detection logic

import { pageWindow } from "../../../utils/windowContext";
import { sleep } from "../../utils/helpers";
import { getCachedVersion, setCachedVersion, hasVersion } from "../state";
import type { VersionInitOptions, VersionWaitOptions } from "../types";

const VERSION_REGEX = /\/(?:r\/\d+\/)?version\/([^/]+)/;
const DEFAULT_TIMEOUT_MS = 15000;
const POLL_INTERVAL_MS = 50;

/**
 * Get the document from the page context
 */
function getPageDocument(): Document | null {
  return pageWindow?.document ?? (typeof document !== "undefined" ? document : null);
}

/**
 * Scan script tags to find the game version
 * Matches patterns: /version/<hash>/... or /r/12345/version/<hash>/...
 */
export function detectVersion(options: VersionInitOptions = {}): void {
  if (hasVersion()) return;

  const doc = options.doc ?? getPageDocument();
  if (!doc) return;

  const scripts = doc.scripts;
  for (let i = 0; i < scripts.length; i++) {
    const script = scripts.item(i);
    const src = script?.src;
    if (!src) continue;

    const match = src.match(VERSION_REGEX);
    if (match?.[1]) {
      setCachedVersion(match[1]);
      return;
    }
  }
}

/**
 * Get the current game version (initializes if needed)
 */
export function getVersion(): string | null {
  detectVersion();
  return getCachedVersion();
}

/**
 * Check if version has been detected
 */
export function isVersionReady(): boolean {
  return hasVersion();
}

/**
 * Wait for the game version to be available
 */
export async function waitForVersion(options: VersionWaitOptions = {}): Promise<string> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const startTime = performance.now();

  while (performance.now() - startTime < timeoutMs) {
    detectVersion();
    const version = getCachedVersion();
    if (version) return version;
    await sleep(POLL_INTERVAL_MS);
  }

  throw new Error("MGVersion timeout (gameVersion not found)");
}
