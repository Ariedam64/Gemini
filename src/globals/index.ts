export * from "./core/types";
export * from "./core/reactive";

export { getCurrentTile } from "./variables/currentTile";

import { getCurrentTile } from "./variables/currentTile";
import type { GlobalVariable, CurrentTileGlobal } from "./core/types";

export type GlobalsRegistry = {
  currentTile: GlobalVariable<CurrentTileGlobal>;
};

let _globals: GlobalsRegistry | null = null;

export function initGlobals(): GlobalsRegistry {
  if (_globals) return _globals;

  _globals = {
    currentTile: getCurrentTile(),
  };

  return _globals;
}

export function getGlobals(): GlobalsRegistry {
  if (!_globals) {
    throw new Error("[Globals] Not initialized. Call initGlobals() first.");
  }
  return _globals;
}

export function destroyGlobals(): void {
  if (_globals) {
    _globals.currentTile.destroy();
    _globals = null;
  }
}

export const Globals = {
  get currentTile() {
    return getGlobals().currentTile;
  },
};
