/**
 * myGarden Utilities
 *
 * Utility functions for data initialization and helpers.
 *
 * @module globals/variables/myGarden/utils
 */

import { MGData } from "../../../modules/data";
import { getGameMap } from "../gameMap";
import type { MyGardenData, CropInfo, TileIndex, XY } from "../../core/types";

export function getMutationIds(): string[] {
  const mutations = MGData.get("mutations");
  if (!mutations) return [];
  return Object.keys(mutations);
}

export function createEmptyMutationRecord(): Record<string, CropInfo[]> {
  const record: Record<string, CropInfo[]> = {};
  for (const mutation of getMutationIds()) {
    record[mutation] = [];
  }
  return record;
}

export function getInitialData(): MyGardenData {
  return {
    garden: null,
    mySlotIndex: null,
    plants: {
      all: [],
      mature: [],
      growing: [],
      bySpecies: {},
      count: 0,
    },
    crops: {
      all: [],
      mature: [],
      growing: [],
      mutated: {
        all: [],
        byMutation: createEmptyMutationRecord(),
      },
    },
    eggs: {
      all: [],
      mature: [],
      growing: [],
      byType: {},
      count: 0,
    },
    decors: {
      tileObjects: [],
      boardwalk: [],
      all: [],
      byType: {},
      count: 0,
    },
    tiles: {
      tileObjects: [],
      boardwalk: [],
      empty: {
        tileObjects: [],
        boardwalk: [],
      },
    },
    counts: {
      plants: 0,
      maturePlants: 0,
      crops: 0,
      matureCrops: 0,
      eggs: 0,
      matureEggs: 0,
      decors: 0,
      emptyTileObjects: 0,
      emptyBoardwalk: 0,
    },
  };
}

export function getTilePosition(tileIndex: TileIndex, gameMapData: ReturnType<typeof getGameMap>["get"]): XY {
  const map = gameMapData();
  if (!map) return { x: 0, y: 0 };
  return map.globalToXY(parseInt(tileIndex, 10));
}

export function getStableKey(data: MyGardenData): string {
  return JSON.stringify({
    plants: data.counts.plants,
    maturePlants: data.counts.maturePlants,
    crops: data.counts.crops,
    matureCrops: data.counts.matureCrops,
    eggs: data.counts.eggs,
    matureEggs: data.counts.matureEggs,
    decors: data.counts.decors,
    emptyTileObjects: data.counts.emptyTileObjects,
    emptyBoardwalk: data.counts.emptyBoardwalk,
  });
}
