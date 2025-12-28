import { createLazyGlobal } from "../core/reactive";
import type {
  CurrentTileGlobal,
  TilePosition,
  TileInfo,
  GardenContext,
  TileObject,
  PlantInfo,
} from "../core/types";
import type { GardenTileObject, PlantTileObject } from "../../atoms/types";

type CurrentTileSources = {
  currentGardenTile: {
    tileType: string;
    userSlotIdx: number;
    localTileIndex: number;
  } | null;
  globalTileIndex: number | null;
  gardenObject: GardenTileObject | null;
  isMature: boolean;
  isInMyGarden: boolean;
  gardenName: string | null;
  sortedSlotIndices: number[];
  currentGrowSlotIndex: number | null;
};

const atomSources = {
  currentGardenTile: "myCurrentGardenTileAtom",
  globalTileIndex: "myCurrentGlobalTileIndexAtom",
  gardenObject: "myCurrentGardenObjectAtom",
  isMature: "isGardenObjectMatureAtom",
  isInMyGarden: "isInMyGardenAtom",
  gardenName: "currentGardenNameAtom",
  sortedSlotIndices: "myCurrentSortedGrowSlotIndicesAtom",
  currentGrowSlotIndex: "myCurrentGrowSlotIndexAtom",
};

function buildPosition(sources: CurrentTileSources): TilePosition {
  const tile = sources.currentGardenTile;
  return {
    globalIndex: sources.globalTileIndex,
    localIndex: tile?.localTileIndex ?? null,
  };
}

function buildTileInfo(sources: CurrentTileSources): TileInfo {
  const tile = sources.currentGardenTile;
  return {
    type: tile?.tileType ?? null,
    isEmpty: sources.gardenObject === null,
  };
}

function buildGardenContext(sources: CurrentTileSources): GardenContext {
  const tile = sources.currentGardenTile;
  return {
    name: sources.gardenName,
    isOwner: sources.isInMyGarden ?? false,
    playerSlotIndex: tile?.userSlotIdx ?? null,
  };
}

function buildTileObject(sources: CurrentTileSources): TileObject {
  const obj = sources.gardenObject;
  if (!obj) {
    return { type: null, data: null, isMature: false };
  }
  return {
    type: obj.objectType,
    data: obj,
    isMature: sources.isMature ?? false,
  };
}

function buildPlantInfo(sources: CurrentTileSources): PlantInfo | null {
  const obj = sources.gardenObject;
  if (!obj || obj.objectType !== "plant") {
    return null;
  }

  const plant = obj as PlantTileObject;
  const sorted = sources.sortedSlotIndices ?? [];

  return {
    species: plant.species,
    slots: plant.slots ?? [],
    currentSlotIndex: sources.currentGrowSlotIndex,
    sortedSlotIndices: sorted,
    nextHarvestSlotIndex: sorted.length > 0 ? sorted[0] : null,
  };
}

function combine(sources: CurrentTileSources): CurrentTileGlobal {
  return {
    position: buildPosition(sources),
    tile: buildTileInfo(sources),
    garden: buildGardenContext(sources),
    object: buildTileObject(sources),
    plant: buildPlantInfo(sources),
  };
}

const initialValue: CurrentTileGlobal = {
  position: {
    globalIndex: null,
    localIndex: null,
  },
  tile: {
    type: null,
    isEmpty: true,
  },
  garden: {
    name: null,
    isOwner: false,
    playerSlotIndex: null,
  },
  object: {
    type: null,
    data: null,
    isMature: false,
  },
  plant: null,
};

export const getCurrentTile = createLazyGlobal<CurrentTileSources, CurrentTileGlobal>(
  atomSources,
  combine,
  initialValue
);
