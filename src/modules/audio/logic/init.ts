// src/modules/audio/logic/init.ts
// Initialization logic for audio system

import { getJSON } from "../../utils/network";
import { joinPath } from "../../utils/path";
import { MGAssets } from "../../assets";
import { MGManifest } from "../../manifest";
import type { SfxAtlas } from "../types";
import { state } from "../state";
import { buildSfxGroups } from "./sfx";

let _initPromise: Promise<boolean> | null = null;

/**
 * Initialize the audio system
 * Loads audio manifest and prepares SFX atlas
 */
export async function initAudioSystem(): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    state.baseUrl = await MGAssets.base();

    const manifest = await MGManifest.load(state.baseUrl);
    const bundle = MGManifest.getBundle(manifest, "audio");
    if (!bundle) throw new Error("No audio bundle in manifest");

    for (const asset of bundle.assets || []) {
      for (const src of asset.src || []) {
        if (typeof src !== "string") continue;

        const match = /^audio\/(ambience|music)\/(.+)\.mp3$/i.exec(src);
        if (match) {
          const cat = match[1].toLowerCase() as "ambience" | "music";
          const name = match[2];
          state.urls[cat].set(name, joinPath(state.baseUrl!, src));
          continue;
        }

        if (/^audio\/sfx\/sfx\.mp3$/i.test(src)) {
          state.sfx.mp3Url = joinPath(state.baseUrl!, src);
        }
        if (/^audio\/sfx\/sfx\.json$/i.test(src)) {
          state.sfx.atlasUrl = joinPath(state.baseUrl!, src);
        }
      }
    }

    if (!state.sfx.atlasUrl) throw new Error("Missing audio/sfx/sfx.json in manifest");

    state.sfx.atlas = await getJSON<SfxAtlas>(state.sfx.atlasUrl);
    buildSfxGroups(state.sfx.atlas);

    state.ready = true;
    return true;
  })();

  return _initPromise;
}
