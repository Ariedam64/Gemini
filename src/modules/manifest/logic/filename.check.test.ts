// src/modules/manifest/logic/filename.check.test.ts
/**
 * BR-58: MGManifest loads `manifest.rgba8.json` (the uncompressed format any GPU
 * reads) instead of `manifest.json`, which the game no longer serves.
 *
 * Pure logic only: `./filename` must not import `window`, `network` nor `MGAssets`
 * (loading.ts cannot be imported in a node environment).
 *
 * `./filename` is loaded through `import.meta.glob` rather than a static import, so
 * that while the module does not exist the check fails on an assertion (the
 * behaviour is missing) instead of a resolution error, and typecheck stays green.
 */

import { describe, expect, it } from "vitest";

/** The public surface `logic/filename.ts` must expose. */
interface FilenameModule {
  MANIFEST_FILENAME: string;
  manifestUrl(baseUrl: string): string;
  isManifestFile(src: string): boolean;
}

const filenameModules = import.meta.glob<FilenameModule>("./filename.ts");

async function loadFilename(): Promise<FilenameModule> {
  const load = filenameModules["./filename.ts"];
  expect(
    load,
    "src/modules/manifest/logic/filename.ts must exist and export MANIFEST_FILENAME, manifestUrl and isManifestFile"
  ).toBeDefined();
  const mod = await (load as () => Promise<FilenameModule>)();
  expect(typeof mod.MANIFEST_FILENAME).toBe("string");
  expect(typeof mod.manifestUrl).toBe("function");
  expect(typeof mod.isManifestFile).toBe("function");
  return mod;
}

describe("BR-58 manifest.rgba8.json", () => {
  it("names the manifest manifest.rgba8.json", async () => {
    const { MANIFEST_FILENAME } = await loadFilename();
    expect(MANIFEST_FILENAME).toBe("manifest.rgba8.json");
  });

  it("builds the manifest URL from the assets base, with or without a trailing slash", async () => {
    const { manifestUrl } = await loadFilename();
    const expected = "https://magicgarden.gg/version/2108/assets/manifest.rgba8.json";
    expect(manifestUrl("https://magicgarden.gg/version/2108/assets/")).toBe(expected);
    expect(manifestUrl("https://magicgarden.gg/version/2108/assets")).toBe(expected);
  });

  it("never points at the stale manifest.json", async () => {
    const { manifestUrl } = await loadFilename();
    const url = manifestUrl("https://magicgarden.gg/version/2108/assets/");
    expect(url.endsWith("/manifest.json")).toBe(false);
  });

  it("recognises the manifest itself and not the other JSON files of a bundle", async () => {
    const { isManifestFile } = await loadFilename();
    expect(isManifestFile("manifest.rgba8.json")).toBe(true);
    expect(isManifestFile("audio/sfx/sfx.json")).toBe(false);
  });
});
