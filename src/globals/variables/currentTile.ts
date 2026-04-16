import {
  subscribe as wsSubscribe,
  getMySlot,
  getMyPlayerId,
  getGameState,
  getRoomState,
  getSelectedGrowSlotIndex,
  setSelectedGrowSlotIndex,
} from "../../state";
import { Store } from "../../atoms/store";
import { deepEqual } from "../core/reactive";
import { getGameMap } from "./gameMap";
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
  SubscribeOptions,
  Unsubscribe,
} from "../core/types";
import type { GardenTileObject, PlantTileObject, GardenPlayer } from "../../atoms/types";

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
  gardenName: GardenPlayer | null;
  sortedSlotIndices: number[];
  currentGrowSlotIndex: number | null;
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
    name: sources.gardenName?.name ?? null,
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
    currentSlotIndex: sources.currentGrowSlotIndex ?? (sorted.length > 0 ? sorted[0] : null),
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
  if (!deepEqual(prev.sortedSlotIndices, next.sortedSlotIndices)) return true;
  // Check if slot data changed (targetScale, mutations, etc.)
  return !deepEqual(prev.slots, next.slots);
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

  let notifyScheduled = false;
  // Real-time position from atom polling (game engine updates this every frame,
  // WS only sends at tile boundaries). Prefer this over WS slot.position.
  let localPosition: { x: number; y: number } | null = null;

  function readSources(): CurrentTileSources {
    const slot = getMySlot();
    // Prefer real-time position from atom (frame-accurate) over WS position (tile-boundary)
    const pos = localPosition ?? slot?.position ?? null;
    const mapData = getGameMap()?.get();
    const gameState = getGameState();
    const myPid = getMyPlayerId();

    let globalTileIndex: number | null = null;
    if (pos && mapData) {
      globalTileIndex = mapData.xyToGlobal(pos.x, pos.y);
    }

    let currentGardenTile: CurrentTileSources["currentGardenTile"] = null;
    if (globalTileIndex !== null && mapData) {
      const ownerSlotIdx = mapData.getTileOwner(globalTileIndex);
      if (ownerSlotIdx !== null) {
        const isDirt = mapData.isDirtTile(globalTileIndex);
        const isBoardwalk = mapData.isBoardwalkTile(globalTileIndex);
        if (isDirt || isBoardwalk) {
          const slotData = mapData.userSlots[ownerSlotIdx];
          const tiles = isDirt ? slotData?.dirtTiles : slotData?.boardwalkTiles;
          const localTile = tiles?.find((t) => t.globalIndex === globalTileIndex);
          currentGardenTile = {
            tileType: isDirt ? "Dirt" : "Boardwalk",
            userSlotIdx: ownerSlotIdx,
            localTileIndex: localTile?.localIndex ?? 0,
          };
        }
      }
    }

    let gardenObject: GardenTileObject | null = null;
    if (currentGardenTile && gameState?.userSlots) {
      const ownerSlot = gameState.userSlots[currentGardenTile.userSlotIdx];
      const garden = ownerSlot?.data?.garden;
      if (garden) {
        const tileKey = String(currentGardenTile.localTileIndex);
        gardenObject = (currentGardenTile.tileType === "Dirt"
          ? garden.tileObjects?.[tileKey]
          : garden.boardwalkTileObjects?.[tileKey]) as GardenTileObject ?? null;
      }
    }

    let isMature = false;
    if (gardenObject) {
      if (gardenObject.objectType === "decor") {
        isMature = true;
      } else if ("maturedAt" in gardenObject) {
        isMature = (gameState?.currentTime ?? Date.now()) >= (gardenObject as { maturedAt: number }).maturedAt;
      }
    }

    const isInMyGarden = currentGardenTile !== null && myPid !== null
      ? (() => {
          const ownerSlot = gameState?.userSlots?.[currentGardenTile.userSlotIdx];
          return ownerSlot?.playerId === myPid || ownerSlot?.databaseUserId === myPid;
        })()
      : false;

    let gardenName: GardenPlayer | null = null;
    if (currentGardenTile) {
      const ownerSlot = gameState?.userSlots?.[currentGardenTile.userSlotIdx];
      if (ownerSlot) {
        const roomPlayer = getRoomState()?.players?.find(
          (p) => p.id === ownerSlot.playerId || p.databaseUserId === ownerSlot.databaseUserId
        );
        if (roomPlayer) gardenName = roomPlayer as unknown as GardenPlayer;
      }
    }

    let sortedSlotIndices: number[] = [];
    if (gardenObject?.objectType === "plant") {
      const slots = (gardenObject as PlantTileObject).slots ?? [];
      sortedSlotIndices = slots
        .map((s, i) => ({ i, endTime: s.endTime }))
        .sort((a, b) => a.endTime - b.endTime)
        .map((s) => s.i);
    }

    return {
      currentGardenTile, globalTileIndex, gardenObject, isMature,
      isInMyGarden, gardenName, sortedSlotIndices,
      currentGrowSlotIndex: getSelectedGrowSlotIndex(),
    };
  }

  function flush(): void {
    notifyScheduled = false;
    const nextData = buildData(readSources());
    if (deepEqual(currentData, nextData)) return;

    previousData = currentData;
    currentData = nextData;
    if (!initialized) return;

    for (const cb of listeners.all) cb(currentData, previousData);

    if (getStableKey(previousData) !== getStableKey(currentData)) {
      for (const cb of listeners.stable) cb(currentData, previousData);
    }
    if (isObjectChanged(previousData.object, currentData.object)) {
      for (const cb of listeners.object) cb({ current: currentData.object, previous: previousData.object });
    }
    if (isPlantInfoChanged(previousData.plant, currentData.plant)) {
      for (const cb of listeners.plantInfo) cb({ current: currentData.plant, previous: previousData.plant });
    }
    if (isGardenChanged(previousData.garden, currentData.garden)) {
      for (const cb of listeners.garden) cb({ current: currentData.garden, previous: previousData.garden });
    }
  }

  function scheduleFlush(): void {
    // Flush synchronously — the tile calculation is lightweight (O(1) map lookups)
    // and deferring via microtask adds perceptible latency when moving between plants.
    flush();
  }

  function init(): void {
    if (initialized) return;
    const sources = readSources();
    if (sources.globalTileIndex !== null) currentData = buildData(sources);

    unsubscribes.push(wsSubscribe("position", scheduleFlush));
    unsubscribes.push(wsSubscribe("garden", scheduleFlush));
    unsubscribes.push(wsSubscribe("mySlot", scheduleFlush));
    unsubscribes.push(wsSubscribe("selection", scheduleFlush));
    unsubscribes.push(wsSubscribe("players", scheduleFlush));

    // Poll these 2 atoms — they're updated by the game engine in real-time
    // but only sent via WS at tile boundaries (position) or on click (slot).
    // 2 atoms polled at 200ms = negligible overhead.
    Store.subscribe("positionAtom", (value: unknown) => {
      localPosition = value as { x: number; y: number } | null;
      scheduleFlush();
    }).then((unsub) => unsubscribes.push(unsub));

    Store.subscribe("mySelectedSlotIdAtom", (value: unknown) => {
      setSelectedGrowSlotIndex(value as number | null);
      scheduleFlush();
    }).then((unsub) => unsubscribes.push(unsub));

    initialized = true;
  }

  init();

  return {
    get(): CurrentTileData {
      return currentData;
    },

    subscribe(callback: (value: CurrentTileData, prev: CurrentTileData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.all.add(callback);
      if (options?.immediate !== false && initialized && currentData !== initialData) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (value: CurrentTileData, prev: CurrentTileData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.stable.add(callback);
      if (options?.immediate !== false && initialized && currentData !== initialData) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribeObject(callback: (event: ObjectChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.object.add(callback);
      if (options?.immediate && initialized && currentData !== initialData) {
        callback({ current: currentData.object, previous: currentData.object });
      }
      return () => listeners.object.delete(callback);
    },

    subscribePlantInfo(callback: (event: PlantInfoChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.plantInfo.add(callback);
      if (options?.immediate && initialized && currentData !== initialData) {
        callback({ current: currentData.plant, previous: currentData.plant });
      }
      return () => listeners.plantInfo.delete(callback);
    },

    subscribeGarden(callback: (event: GardenChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.garden.add(callback);
      if (options?.immediate && initialized && currentData !== initialData) {
        callback({ current: currentData.garden, previous: currentData.garden });
      }
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

export function destroyCurrentTile(): void { instance?.destroy(); instance = null; }

export function getCurrentTile(): CurrentTileGlobalWithSubscriptions {
  if (!instance) {
    instance = createCurrentTileGlobal();
  }
  return instance;
}
