export * from "./core/types";
export * from "./core/reactive";

export { getCurrentTile } from "./variables/currentTile";
export { getMyPets } from "./variables/myPets";
export { getGameMap } from "./variables/gameMap";
export { getMyInventory } from "./variables/myInventory";
export { getPlayers } from "./variables/players";

import { getCurrentTile } from "./variables/currentTile";
import { getMyPets } from "./variables/myPets";
import { getGameMap } from "./variables/gameMap";
import { getMyInventory } from "./variables/myInventory";
import { getPlayers } from "./variables/players";
import type {
  CurrentTileGlobalWithSubscriptions,
  MyPetsGlobal,
  GameMapGlobal,
  MyInventoryGlobal,
  PlayersGlobal,
} from "./core/types";

export type GlobalsRegistry = {
  currentTile: CurrentTileGlobalWithSubscriptions;
  myPets: MyPetsGlobal;
  gameMap: GameMapGlobal;
  myInventory: MyInventoryGlobal;
  players: PlayersGlobal;
};

let _globals: GlobalsRegistry | null = null;

export function initGlobals(): GlobalsRegistry {
  if (_globals) return _globals;

  _globals = {
    currentTile: getCurrentTile(),
    myPets: getMyPets(),
    gameMap: getGameMap(),
    myInventory: getMyInventory(),
    players: getPlayers(),
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
    _globals.myPets.destroy();
    _globals.gameMap.destroy();
    _globals.myInventory.destroy();
    _globals.players.destroy();
    _globals = null;
  }
}

export const Globals = {
  get currentTile() {
    return getGlobals().currentTile;
  },
  get myPets() {
    return getGlobals().myPets;
  },
  get gameMap() {
    return getGlobals().gameMap;
  },
  get myInventory() {
    return getGlobals().myInventory;
  },
  get players() {
    return getGlobals().players;
  },
};
