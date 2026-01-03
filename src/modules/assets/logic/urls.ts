// src/modules/assets/logic.ts
// Asset URL generation logic

import { ORIGIN } from "../utils/network";
import { joinPath } from "../utils/path";
import { MGVersion } from "../version";
import {
  getCachedBaseUrl,
  getPendingPromise,
  setCachedBaseUrl,
  setPendingPromise,
  hasBaseUrl,
} from "./state";
import type { AssetsInitOptions } from "./types";

const DEFAULT_TIMEOUT_MS = 15000;

/**
 * Initialize base URL from game version
 */
export async function initializeBaseUrl(options: AssetsInitOptions = {}): Promise<void> {
  if (hasBaseUrl()) return;
  await getBaseUrl(options);
}

/**
 * Get the base URL for assets
 * Pattern: https://magicgarden.gg/version/<hash>/assets/
 */
export async function getBaseUrl(options: AssetsInitOptions = {}): Promise<string> {
  const cached = getCachedBaseUrl();
  if (cached) return cached;

  const pending = getPendingPromise();
  if (pending) return pending;

  const promise = (async () => {
    const gameVersion = options.gameVersion ?? await MGVersion.wait({ timeoutMs: DEFAULT_TIMEOUT_MS });
    const url = `${ORIGIN}/version/${gameVersion}/assets/`;
    setCachedBaseUrl(url);
    return url;
  })();

  setPendingPromise(promise);
  return promise;
}

/**
 * Get the full URL for a relative asset path
 */
export async function getAssetUrl(relativePath: string): Promise<string> {
  const baseUrl = await getBaseUrl();
  return joinPath(baseUrl, relativePath);
}

/**
 * Check if module is ready
 */
export function isModuleReady(): boolean {
  return hasBaseUrl();
}
