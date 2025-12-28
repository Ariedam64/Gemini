import { Store } from "../../atoms/store";
import type {
  CurrentTileGlobalWithSubscriptions,
  CurrentTileData,
  TilePosition,
  TileInfo,
  GardenContext,
  TileObject,
  PlantInfo,
  ObjectChange,
  PlantInfoChange,
  GardenChange,
  Unsubscribe,
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

const initialData: CurrentTileData = {
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

function buildData(sources: CurrentTileSources): CurrentTileData {
  return {
    position: buildPosition(sources),
    tile: buildTileInfo(sources),
    garden: buildGardenContext(sources),
    object: buildTileObject(sources),
    plant: buildPlantInfo(sources),
  };
}

function getStableKey(data: CurrentTileData): string {
  return JSON.stringify({
    globalIndex: data.position.globalIndex,
    localIndex: data.position.localIndex,
    tileType: data.tile.type,
    isEmpty: data.tile.isEmpty,
    gardenName: data.garden.name,
    isOwner: data.garden.isOwner,
    playerSlotIndex: data.garden.playerSlotIndex,
    objectType: data.object.type,
    isMature: data.object.isMature,
    plantSpecies: data.plant?.species ?? null,
    slotCount: data.plant?.slots.length ?? 0,
  });
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (typeof a !== typeof b) return false;
  if (typeof a !== "object") return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  const aObj = a as Record<string, unknown>;
  const bObj = b as Record<string, unknown>;
  const aKeys = Object.keys(aObj);
  const bKeys = Object.keys(bObj);

  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    if (!Object.prototype.hasOwnProperty.call(bObj, key)) return false;
    if (!deepEqual(aObj[key], bObj[key])) return false;
  }

  return true;
}

type ListenerSets = {
  all: Set<(value: CurrentTileData, prev: CurrentTileData) => void>;
  stable: Set<(value: CurrentTileData, prev: CurrentTileData) => void>;
  object: Set<(event: ObjectChange) => void>;
  plantInfo: Set<(event: PlantInfoChange) => void>;
  garden: Set<(event: GardenChange) => void>;
};

function isObjectChanged(prev: TileObject, next: TileObject): boolean {
  if (prev.type !== next.type) return true;
  if (prev.isMature !== next.isMature) return true;
  if (prev.data === null && next.data === null) return false;
  if (prev.data === null || next.data === null) return true;
  return !deepEqual(prev.data, next.data);
}

function isPlantInfoChanged(prev: PlantInfo | null, next: PlantInfo | null): boolean {
  if (prev === null && next === null) return false;
  if (prev === null || next === null) return true;
  if (prev.species !== next.species) return true;
  if (prev.currentSlotIndex !== next.currentSlotIndex) return true;
  if (prev.nextHarvestSlotIndex !== next.nextHarvestSlotIndex) return true;
  if (prev.slots.length !== next.slots.length) return true;
  return !deepEqual(prev.sortedSlotIndices, next.sortedSlotIndices);
}

function isGardenChanged(prev: GardenContext, next: GardenContext): boolean {
  return (
    prev.name !== next.name ||
    prev.isOwner !== next.isOwner ||
    prev.playerSlotIndex !== next.playerSlotIndex
  );
}

function createCurrentTileGlobal(): CurrentTileGlobalWithSubscriptions {
  let currentData: CurrentTileData = initialData;
  let previousData: CurrentTileData = initialData;
  let initialized = false;
  const unsubscribes: Unsubscribe[] = [];

  const listeners: ListenerSets = {
    all: new Set(),
    stable: new Set(),
    object: new Set(),
    plantInfo: new Set(),
    garden: new Set(),
  };

  const sources: Partial<CurrentTileSources> = {};
  const sourceKeys = Object.keys(atomSources) as (keyof CurrentTileSources)[];
  const ready = new Set<keyof CurrentTileSources>();

  function notify(): void {
    if (ready.size < sourceKeys.length) return;

    const nextData = buildData(sources as CurrentTileSources);

    if (deepEqual(currentData, nextData)) return;

    previousData = currentData;
    currentData = nextData;

    if (!initialized) return;

    for (const cb of listeners.all) {
      cb(currentData, previousData);
    }

    if (getStableKey(previousData) !== getStableKey(currentData)) {
      for (const cb of listeners.stable) {
        cb(currentData, previousData);
      }
    }

    if (isObjectChanged(previousData.object, currentData.object)) {
      const event: ObjectChange = {
        current: currentData.object,
        previous: previousData.object,
      };
      for (const cb of listeners.object) {
        cb(event);
      }
    }

    if (isPlantInfoChanged(previousData.plant, currentData.plant)) {
      const event: PlantInfoChange = {
        current: currentData.plant,
        previous: previousData.plant,
      };
      for (const cb of listeners.plantInfo) {
        cb(event);
      }
    }

    if (isGardenChanged(previousData.garden, currentData.garden)) {
      const event: GardenChange = {
        current: currentData.garden,
        previous: previousData.garden,
      };
      for (const cb of listeners.garden) {
        cb(event);
      }
    }
  }

  async function init(): Promise<void> {
    if (initialized) return;

    const subscriptionPromises = sourceKeys.map(async (key) => {
      const atomLabel = atomSources[key];

      const unsub = await Store.subscribe(atomLabel, (value: unknown) => {
        (sources as Record<string, unknown>)[key] = value;
        ready.add(key);
        notify();
      });

      unsubscribes.push(unsub);
    });

    await Promise.all(subscriptionPromises);
    initialized = true;

    if (ready.size === sourceKeys.length) {
      currentData = buildData(sources as CurrentTileSources);
    }
  }

  init();

  return {
    get(): CurrentTileData {
      return currentData;
    },

    subscribe(callback: (value: CurrentTileData, prev: CurrentTileData) => void): Unsubscribe {
      listeners.all.add(callback);
      if (initialized && ready.size === sourceKeys.length) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (value: CurrentTileData, prev: CurrentTileData) => void): Unsubscribe {
      listeners.stable.add(callback);
      if (initialized && ready.size === sourceKeys.length) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribeObject(callback: (event: ObjectChange) => void): Unsubscribe {
      listeners.object.add(callback);
      return () => listeners.object.delete(callback);
    },

    subscribePlantInfo(callback: (event: PlantInfoChange) => void): Unsubscribe {
      listeners.plantInfo.add(callback);
      return () => listeners.plantInfo.delete(callback);
    },

    subscribeGarden(callback: (event: GardenChange) => void): Unsubscribe {
      listeners.garden.add(callback);
      return () => listeners.garden.delete(callback);
    },

    destroy(): void {
      for (const unsub of unsubscribes) {
        unsub();
      }
      unsubscribes.length = 0;
      listeners.all.clear();
      listeners.stable.clear();
      listeners.object.clear();
      listeners.plantInfo.clear();
      listeners.garden.clear();
      initialized = false;
    },
  };
}

let instance: CurrentTileGlobalWithSubscriptions | null = null;

export function getCurrentTile(): CurrentTileGlobalWithSubscriptions {
  if (!instance) {
    instance = createCurrentTileGlobal();
  }
  return instance;
}
