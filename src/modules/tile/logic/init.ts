// src/modules/tile/logic/init.ts
// Initialization logic for tile system

import { state } from "../state";
import { MGPixiHooks } from "../../pixi/logic/hooks";
import { tos } from "./helpers";

let _initPromise: Promise<boolean> | null = null;

/**
 * Initialize the tile system
 * Waits for PIXI engine and TileObjectSystem to be ready
 */
export async function initTileSystem(timeoutMs = 15000): Promise<boolean> {
  if (state.ready) return true;
  if (_initPromise) return _initPromise;

  _initPromise = (async () => {
    await MGPixiHooks.init(timeoutMs);
    if (!tos()) throw new Error("MGTile: engine captured but tileObject system not found");
    state.ready = true;
    return true;
  })();

  return _initPromise;
}
