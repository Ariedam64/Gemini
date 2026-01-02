// src/modules/core/assets.ts
// MGAssets - Generates base URLs for game assets

import { ORIGIN } from "../utils/network";
import { joinPath } from "../utils/path";
import { MGVersion } from "./version";

let _basePromise: Promise<string> | null = null;
let _base: string | null = null;

/**
 * Get the base URL for assets (e.g., https://magicgarden.gg/version/<hash>/assets/)
 */
async function base(): Promise<string> {
  if (_base) return _base;
  if (_basePromise) return _basePromise;

  _basePromise = (async () => {
    const gameVersion = await MGVersion.wait(15000);
    _base = `${ORIGIN}/version/${gameVersion}/assets/`;
    return _base;
  })();

  return _basePromise;
}

/**
 * Get the full URL for a relative asset path
 */
async function url(relativePath: string): Promise<string> {
  const baseUrl = await base();
  return joinPath(baseUrl, relativePath);
}

export const MGAssets = {
  base,
  url,
};
