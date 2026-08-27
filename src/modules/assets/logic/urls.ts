// src/modules/assets/logic/urls.ts
// Asset URL generation logic

import { ORIGIN } from "../../utils/network";
import { joinPath } from "../../utils/path";
import { MGVersion } from "../../version";
import { fetchJson } from "../../../utils/http";
import { MG_API } from "../../../utils/mgApi";
import {
  getCachedBaseUrl,
  getPendingPromise,
  setCachedBaseUrl,
  setPendingPromise,
  hasBaseUrl,
} from "../state";
import type { AssetsInitOptions } from "../types";

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
 *
 * The MG API is the source: it reports the versioned base it last synced
 * against, so every module reads the same value the API's own asset URLs are
 * built from.
 *
 * Known risk, accepted deliberately: that is the version the API last synced,
 * not the version running in this page. If the game ships an update before the
 * API picks it up, this points at assets that no longer exist and consumers
 * (audio, manifest, cosmetic) take 404s until the API catches up.
 *
 * Deriving from `MGVersion` is kept only for when the API cannot be reached at
 * all — that is error handling, not a second opinion on the version.
 */
export async function getBaseUrl(options: AssetsInitOptions = {}): Promise<string> {
  const cached = getCachedBaseUrl();
  if (cached) return cached;

  const pending = getPendingPromise();
  if (pending) return pending;

  const promise = (async () => {
    const url = options.gameVersion
      ? `${ORIGIN}/version/${options.gameVersion}/assets/`
      : await resolveBaseUrl();
    setCachedBaseUrl(url);
    return url;
  })();

  setPendingPromise(promise);
  return promise;
}

/** The API's base URL, falling back to the page's own game version. */
async function resolveBaseUrl(): Promise<string> {
  try {
    const response = await fetchJson<{ baseUrl?: string }>(MG_API.assetBaseUrl);
    if (response.baseUrl) return response.baseUrl;
    throw new Error("no baseUrl in response");
  } catch (error) {
    console.warn("[MGAssets] API unreachable, deriving base URL from the page:", error);
    const gameVersion = await MGVersion.wait({ timeoutMs: DEFAULT_TIMEOUT_MS });
    return `${ORIGIN}/version/${gameVersion}/assets/`;
  }
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
