// src/modules/cosmetic/logic/init.ts
// Initialization logic for cosmetic system

import { joinPath } from "../../utils/path";
import { MGAssets } from "../../assets";
import { MGManifest } from "../../manifest";
import { state } from "../state";

let _initPromise: Promise<boolean> | null = null;

/**
 * Initialize the cosmetic system
 * Loads cosmetic assets from manifest
 */
export async function initCosmeticSystem(): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    state.baseUrl = await MGAssets.base();

    const manifest = await MGManifest.load({ baseUrl: state.baseUrl });
    const bundle = MGManifest.getBundle(manifest, "cosmetic");
    if (!bundle) throw new Error("No 'cosmetic' bundle in manifest");

    state.byCat.clear();
    state.byBase.clear();

    for (const asset of bundle.assets || []) {
      for (const src of asset.src || []) {
        if (typeof src !== "string") continue;
        if (!/^cosmetic\/.+\.png$/i.test(src)) continue;

        const file = src.split("/").pop()!;
        const base = file.replace(/\.png$/i, "");
        const i = base.indexOf("_");
        if (i < 0) continue;

        const cat = base.slice(0, i);
        const name = base.slice(i + 1);
        const u = joinPath(state.baseUrl!, src);

        state.byBase.set(base, u);
        if (!state.byCat.has(cat)) state.byCat.set(cat, new Map());
        state.byCat.get(cat)!.set(name, u);
      }
    }

    state.ready = true;
    return true;
  })();

  return _initPromise;
}
