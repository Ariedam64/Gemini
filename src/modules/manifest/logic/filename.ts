// src/modules/manifest/logic/filename.ts
// Manifest file name and URL (pure logic, no window/network imports)

import { joinPath } from "../../utils/path";

/**
 * The game names its manifests `manifest.<bc7|astc|etc2|bc3|rgba8>.json` by GPU
 * texture format; the old manifest file is no longer served. `rgba8` is the
 * uncompressed format, readable by any GPU.
 */
export const MANIFEST_FILENAME = "manifest.rgba8.json";

/**
 * Full URL of the manifest under the given assets base URL
 */
export function manifestUrl(baseUrl: string): string {
  return joinPath(baseUrl, MANIFEST_FILENAME);
}

/**
 * Whether a bundle src is the manifest itself
 */
export function isManifestFile(src: string): boolean {
  return src === MANIFEST_FILENAME;
}
