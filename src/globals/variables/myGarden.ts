import { gardenView } from "../../atoms";
import { Store } from "../../atoms/store";
import { getGameMap } from "./gameMap";
import { deepEqual } from "../core/reactive";
import { MGData } from "../../modules/data";
import type {
  MyGardenGlobal,
  MyGardenData,
  PlantWithTile,
  CropInfo,
  EggWithTile,
  DecorWithTile,
  TileIndex,
  MutationId,
  MapTile,
  XY,
  PlantAddedEvent,
  PlantRemovedEvent,
  PlantMaturedEvent,
  CropMutatedEvent,
  CropMaturedEvent,
  CropHarvestedEvent,
  EggPlacedEvent,
  EggRemovedEvent,
  EggMaturedEvent,
  DecorPlacedEvent,
  DecorRemovedEvent,
  SubscribeOptions,
  Unsubscribe,
} from "../core/types";
import type {
  Garden,
  GardenTileObject,
  PlantTileObject,
  EggTileObject,
  DecorTileObject,
  GrowSlot,
  DecorRotation,
} from "../../atoms/types";

type GardenSources = {
  garden: Garden | null;
  mySlotIndex: number | null;
};

type ListenerSets = {
  all: Set<(value: MyGardenData, prev: MyGardenData) => void>;
  stable: Set<(value: MyGardenData, prev: MyGardenData) => void>;
  plantAdded: Set<(event: PlantAddedEvent) => void>;
  plantRemoved: Set<(event: PlantRemovedEvent) => void>;
  plantMatured: Set<(event: PlantMaturedEvent) => void>;
  cropMutated: Set<(event: CropMutatedEvent) => void>;
  cropMatured: Set<(event: CropMaturedEvent) => void>;
  cropHarvested: Set<(event: CropHarvestedEvent) => void>;
  eggPlaced: Set<(event: EggPlacedEvent) => void>;
  eggRemoved: Set<(event: EggRemovedEvent) => void>;
  eggMatured: Set<(event: EggMaturedEvent) => void>;
  decorPlaced: Set<(event: DecorPlacedEvent) => void>;
  decorRemoved: Set<(event: DecorRemovedEvent) => void>;
};

function getMutationIds(): string[] {
  const mutations = MGData.get("mutations");
  if (!mutations) return [];
  return Object.keys(mutations);
}

function createEmptyMutationRecord(): Record<string, CropInfo[]> {
  const record: Record<string, CropInfo[]> = {};
  for (const mutation of getMutationIds()) {
    record[mutation] = [];
  }
  return record;
}

function getInitialData(): MyGardenData {
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

function getTilePosition(tileIndex: TileIndex, gameMapData: ReturnType<typeof getGameMap>["get"]): XY {
  const map = gameMapData();
  if (!map) return { x: 0, y: 0 };
  return map.globalToXY(parseInt(tileIndex, 10));
}

function buildPlantWithTile(
  tileIndex: TileIndex,
  plant: PlantTileObject,
  position: XY,
  now: number
): PlantWithTile {
  const matureSlotsCount = plant.slots.filter((slot) => now >= slot.endTime).length;
  return {
    tileIndex,
    position,
    species: plant.species,
    plantedAt: plant.plantedAt,
    maturedAt: plant.maturedAt,
    isMature: now >= plant.maturedAt,
    slots: plant.slots,
    slotsCount: plant.slots.length,
    matureSlotsCount,
  };
}

function buildCropInfo(
  tileIndex: TileIndex,
  position: XY,
  slotIndex: number,
  slot: GrowSlot,
  now: number
): CropInfo {
  return {
    tileIndex,
    position,
    slotIndex,
    species: slot.species,
    startTime: slot.startTime,
    endTime: slot.endTime,
    targetScale: slot.targetScale,
    mutations: [...slot.mutations],
    isMature: now >= slot.endTime,
  };
}

function buildEggWithTile(
  tileIndex: TileIndex,
  egg: EggTileObject,
  position: XY,
  now: number
): EggWithTile {
  return {
    tileIndex,
    position,
    eggId: egg.eggId,
    plantedAt: egg.plantedAt,
    maturedAt: egg.maturedAt,
    isMature: now >= egg.maturedAt,
  };
}

function buildDecorWithTile(
  tileIndex: TileIndex,
  decor: DecorTileObject,
  position: XY,
  location: "tileObjects" | "boardwalk"
): DecorWithTile {
  return {
    tileIndex,
    position,
    decorId: decor.decorId,
    rotation: decor.rotation as DecorRotation,
    location,
  };
}

function buildData(sources: GardenSources, gameMap: typeof getGameMap): MyGardenData {
  const { garden, mySlotIndex } = sources;
  const now = Date.now();

  if (!garden || mySlotIndex === null) {
    return getInitialData();
  }

  const mapData = gameMap().get();
  const userSlotTiles = mapData?.userSlots[mySlotIndex];

  const tileObjectsTiles = userSlotTiles?.dirtTiles ?? [];
  const boardwalkTiles = userSlotTiles?.boardwalkTiles ?? [];

  const plants: PlantWithTile[] = [];
  const maturePlants: PlantWithTile[] = [];
  const growingPlants: PlantWithTile[] = [];
  const plantsBySpecies: Record<string, PlantWithTile[]> = {};
  const allCrops: CropInfo[] = [];
  const matureCrops: CropInfo[] = [];
  const growingCrops: CropInfo[] = [];
  const mutatedCrops: CropInfo[] = [];
  const cropsByMutation = createEmptyMutationRecord();

  const eggs: EggWithTile[] = [];
  const matureEggs: EggWithTile[] = [];
  const growingEggs: EggWithTile[] = [];
  const eggsByType: Record<string, EggWithTile[]> = {};

  const tileObjectsDecors: DecorWithTile[] = [];
  const boardwalkDecors: DecorWithTile[] = [];
  const decorsByType: Record<string, DecorWithTile[]> = {};

  const occupiedTileObjectsTiles = new Set<number>();
  const occupiedBoardwalkTiles = new Set<number>();

  for (const [tileIndex, obj] of Object.entries(garden.tileObjects)) {
    const globalIndex = parseInt(tileIndex, 10);
    occupiedTileObjectsTiles.add(globalIndex);

    const position = mapData ? mapData.globalToXY(globalIndex) : { x: 0, y: 0 };

    if (obj.objectType === "plant") {
      const plantObj = obj as PlantTileObject;
      const plant = buildPlantWithTile(tileIndex, plantObj, position, now);
      plants.push(plant);

      if (plant.isMature) {
        maturePlants.push(plant);
      } else {
        growingPlants.push(plant);
      }

      if (!plantsBySpecies[plant.species]) {
        plantsBySpecies[plant.species] = [];
      }
      plantsBySpecies[plant.species].push(plant);

      for (let i = 0; i < plantObj.slots.length; i++) {
        const slot = plantObj.slots[i];
        const crop = buildCropInfo(tileIndex, position, i, slot, now);
        allCrops.push(crop);

        if (crop.isMature) {
          matureCrops.push(crop);
        } else {
          growingCrops.push(crop);
        }

        if (crop.mutations.length > 0) {
          mutatedCrops.push(crop);
          for (const mutation of crop.mutations) {
            if (!cropsByMutation[mutation]) {
              cropsByMutation[mutation] = [];
            }
            cropsByMutation[mutation].push(crop);
          }
        }
      }
    } else if (obj.objectType === "egg") {
      const eggObj = obj as EggTileObject;
      const egg = buildEggWithTile(tileIndex, eggObj, position, now);
      eggs.push(egg);

      if (!eggsByType[egg.eggId]) {
        eggsByType[egg.eggId] = [];
      }
      eggsByType[egg.eggId].push(egg);

      if (egg.isMature) {
        matureEggs.push(egg);
      } else {
        growingEggs.push(egg);
      }
    } else if (obj.objectType === "decor") {
      const decorObj = obj as DecorTileObject;
      const decor = buildDecorWithTile(tileIndex, decorObj, position, "tileObjects");
      tileObjectsDecors.push(decor);

      if (!decorsByType[decor.decorId]) {
        decorsByType[decor.decorId] = [];
      }
      decorsByType[decor.decorId].push(decor);
    }
  }

  for (const [tileIndex, obj] of Object.entries(garden.boardwalkTileObjects)) {
    const globalIndex = parseInt(tileIndex, 10);
    occupiedBoardwalkTiles.add(globalIndex);

    const position = mapData ? mapData.globalToXY(globalIndex) : { x: 0, y: 0 };
    const decorObj = obj as DecorTileObject;
    const decor = buildDecorWithTile(tileIndex, decorObj, position, "boardwalk");
    boardwalkDecors.push(decor);

    if (!decorsByType[decor.decorId]) {
      decorsByType[decor.decorId] = [];
    }
    decorsByType[decor.decorId].push(decor);
  }

  const allDecors = [...tileObjectsDecors, ...boardwalkDecors];

  const emptyTileObjectsTiles = tileObjectsTiles.filter((t) => !occupiedTileObjectsTiles.has(t.localIndex));
  const emptyBoardwalkTiles = boardwalkTiles.filter((t) => !occupiedBoardwalkTiles.has(t.localIndex));

  return {
    garden,
    mySlotIndex,
    plants: {
      all: plants,
      mature: maturePlants,
      growing: growingPlants,
      bySpecies: plantsBySpecies,
      count: plants.length,
    },
    crops: {
      all: allCrops,
      mature: matureCrops,
      growing: growingCrops,
      mutated: {
        all: mutatedCrops,
        byMutation: cropsByMutation,
      },
    },
    eggs: {
      all: eggs,
      mature: matureEggs,
      growing: growingEggs,
      byType: eggsByType,
      count: eggs.length,
    },
    decors: {
      tileObjects: tileObjectsDecors,
      boardwalk: boardwalkDecors,
      all: allDecors,
      byType: decorsByType,
      count: allDecors.length,
    },
    tiles: {
      tileObjects: tileObjectsTiles,
      boardwalk: boardwalkTiles,
      empty: {
        tileObjects: emptyTileObjectsTiles,
        boardwalk: emptyBoardwalkTiles,
      },
    },
    counts: {
      plants: plants.length,
      maturePlants: maturePlants.length,
      crops: allCrops.length,
      matureCrops: matureCrops.length,
      eggs: eggs.length,
      matureEggs: matureEggs.length,
      decors: allDecors.length,
      emptyTileObjects: emptyTileObjectsTiles.length,
      emptyBoardwalk: emptyBoardwalkTiles.length,
    },
  };
}

function getStableKey(data: MyGardenData): string {
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

function detectPlantChanges(
  prev: PlantWithTile[],
  next: PlantWithTile[]
): { added: PlantWithTile[]; removed: PlantWithTile[] } {
  const prevTiles = new Set(prev.map((p) => p.tileIndex));
  const nextTiles = new Set(next.map((p) => p.tileIndex));

  const added = next.filter((p) => !prevTiles.has(p.tileIndex));
  const removed = prev.filter((p) => !nextTiles.has(p.tileIndex));

  return { added, removed };
}

function detectPlantMatured(
  prevMature: PlantWithTile[],
  nextMature: PlantWithTile[],
  nextAll: PlantWithTile[]
): PlantWithTile[] {
  const prevMatureTiles = new Set(prevMature.map((p) => p.tileIndex));
  const nextAllTiles = new Set(nextAll.map((p) => p.tileIndex));

  return nextMature.filter((p) =>
    !prevMatureTiles.has(p.tileIndex) && nextAllTiles.has(p.tileIndex)
  );
}

function detectCropMatured(
  prevMature: CropInfo[],
  nextMature: CropInfo[],
  nextAll: CropInfo[]
): CropInfo[] {
  const prevMatureKeys = new Set(prevMature.map((c) => `${c.tileIndex}:${c.slotIndex}`));
  const nextAllKeys = new Set(nextAll.map((c) => `${c.tileIndex}:${c.slotIndex}`));

  return nextMature.filter((c) => {
    const key = `${c.tileIndex}:${c.slotIndex}`;
    return !prevMatureKeys.has(key) && nextAllKeys.has(key);
  });
}

function detectEggMatured(
  prevMature: EggWithTile[],
  nextMature: EggWithTile[],
  nextAll: EggWithTile[]
): EggWithTile[] {
  const prevMatureTiles = new Set(prevMature.map((e) => e.tileIndex));
  const nextAllTiles = new Set(nextAll.map((e) => e.tileIndex));

  return nextMature.filter((e) =>
    !prevMatureTiles.has(e.tileIndex) && nextAllTiles.has(e.tileIndex)
  );
}

function detectCropMutations(
  prevPlants: PlantWithTile[],
  nextPlants: PlantWithTile[]
): CropMutatedEvent[] {
  const events: CropMutatedEvent[] = [];
  const prevMap = new Map(prevPlants.map((p) => [p.tileIndex, p]));

  for (const nextPlant of nextPlants) {
    const prevPlant = prevMap.get(nextPlant.tileIndex);
    if (!prevPlant) continue;

    const minSlots = Math.min(prevPlant.slots.length, nextPlant.slots.length);
    for (let i = 0; i < minSlots; i++) {
      const prevMutations = new Set(prevPlant.slots[i].mutations);
      const nextMutations = new Set(nextPlant.slots[i].mutations);

      const added = [...nextMutations].filter((m) => !prevMutations.has(m)) as MutationId[];
      const removed = [...prevMutations].filter((m) => !nextMutations.has(m)) as MutationId[];

      if (added.length > 0 || removed.length > 0) {
        const now = Date.now();
        const slot = nextPlant.slots[i];
        const crop: CropInfo = {
          tileIndex: nextPlant.tileIndex,
          position: nextPlant.position,
          slotIndex: i,
          species: slot.species,
          startTime: slot.startTime,
          endTime: slot.endTime,
          targetScale: slot.targetScale,
          mutations: [...slot.mutations],
          isMature: now >= slot.endTime,
        };
        events.push({ crop, added, removed });
      }
    }
  }

  return events;
}

function detectCropHarvests(
  prevPlants: PlantWithTile[],
  nextPlants: PlantWithTile[],
  prevCrops: CropInfo[]
): CropHarvestedEvent[] {
  const events: CropHarvestedEvent[] = [];
  const nextMap = new Map(nextPlants.map((p) => [p.tileIndex, p]));

  const prevCropMap = new Map<string, CropInfo>();
  for (const crop of prevCrops) {
    prevCropMap.set(`${crop.tileIndex}:${crop.slotIndex}`, crop);
  }

  for (const prevPlant of prevPlants) {
    const nextPlant = nextMap.get(prevPlant.tileIndex);
    if (!nextPlant) continue;

    const minSlots = Math.min(prevPlant.slots.length, nextPlant.slots.length);
    for (let i = 0; i < minSlots; i++) {
      const prevSlot = prevPlant.slots[i];
      const nextSlot = nextPlant.slots[i];

      if (prevSlot.startTime !== nextSlot.startTime) {
        const prevCrop = prevCropMap.get(`${prevPlant.tileIndex}:${i}`);
        if (!prevCrop || !prevCrop.isMature) continue;

        const crop: CropInfo = {
          tileIndex: prevPlant.tileIndex,
          position: prevPlant.position,
          slotIndex: i,
          species: prevSlot.species,
          startTime: prevSlot.startTime,
          endTime: prevSlot.endTime,
          targetScale: prevSlot.targetScale,
          mutations: [...prevSlot.mutations],
          isMature: true,
        };
        events.push({ crop, remainingSlots: nextPlant.slotsCount });
      }
    }

    if (nextPlant.slotsCount < prevPlant.slotsCount) {
      for (let i = nextPlant.slotsCount; i < prevPlant.slotsCount; i++) {
        const prevCrop = prevCropMap.get(`${prevPlant.tileIndex}:${i}`);
        if (!prevCrop || !prevCrop.isMature) continue;

        const slot = prevPlant.slots[i];
        if (!slot) continue;

        const crop: CropInfo = {
          tileIndex: prevPlant.tileIndex,
          position: prevPlant.position,
          slotIndex: i,
          species: slot.species,
          startTime: slot.startTime,
          endTime: slot.endTime,
          targetScale: slot.targetScale,
          mutations: [...slot.mutations],
          isMature: true,
        };
        events.push({ crop, remainingSlots: nextPlant.slotsCount });
      }
    }
  }

  return events;
}

function detectEggChanges(
  prev: EggWithTile[],
  next: EggWithTile[]
): { added: EggWithTile[]; removed: EggWithTile[] } {
  const prevTiles = new Set(prev.map((e) => e.tileIndex));
  const nextTiles = new Set(next.map((e) => e.tileIndex));

  const added = next.filter((e) => !prevTiles.has(e.tileIndex));
  const removed = prev.filter((e) => !nextTiles.has(e.tileIndex));

  return { added, removed };
}

function detectDecorChanges(
  prev: DecorWithTile[],
  next: DecorWithTile[]
): { added: DecorWithTile[]; removed: DecorWithTile[] } {
  const prevKey = (d: DecorWithTile) => `${d.tileIndex}:${d.location}`;
  const nextKey = (d: DecorWithTile) => `${d.tileIndex}:${d.location}`;

  const prevKeys = new Set(prev.map(prevKey));
  const nextKeys = new Set(next.map(nextKey));

  const added = next.filter((d) => !prevKeys.has(nextKey(d)));
  const removed = prev.filter((d) => !nextKeys.has(prevKey(d)));

  return { added, removed };
}

function createMyGardenGlobal(): MyGardenGlobal {
  let currentData: MyGardenData = getInitialData();
  let previousData: MyGardenData = getInitialData();
  let initialized = false;
  const unsubscribes: Unsubscribe[] = [];

  const listeners: ListenerSets = {
    all: new Set(),
    stable: new Set(),
    plantAdded: new Set(),
    plantRemoved: new Set(),
    plantMatured: new Set(),
    cropMutated: new Set(),
    cropMatured: new Set(),
    cropHarvested: new Set(),
    eggPlaced: new Set(),
    eggRemoved: new Set(),
    eggMatured: new Set(),
    decorPlaced: new Set(),
    decorRemoved: new Set(),
  };

  const sources: Partial<GardenSources> = {};
  const ready = new Set<keyof GardenSources>();
  const sourceCount = 2;

  function notify(): void {
    if (ready.size < sourceCount) return;

    const nextData = buildData(sources as GardenSources, getGameMap);

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

    const plantChanges = detectPlantChanges(previousData.plants.all, currentData.plants.all);
    for (const plant of plantChanges.added) {
      for (const cb of listeners.plantAdded) {
        cb({ plant });
      }
    }
    for (const plant of plantChanges.removed) {
      for (const cb of listeners.plantRemoved) {
        cb({ plant, tileIndex: plant.tileIndex });
      }
    }

    const maturedPlants = detectPlantMatured(
      previousData.plants.mature,
      currentData.plants.mature,
      currentData.plants.all
    );
    for (const plant of maturedPlants) {
      for (const cb of listeners.plantMatured) {
        cb({ plant });
      }
    }

    const mutationEvents = detectCropMutations(previousData.plants.all, currentData.plants.all);
    for (const event of mutationEvents) {
      for (const cb of listeners.cropMutated) {
        cb(event);
      }
    }

    const maturedCrops = detectCropMatured(
      previousData.crops.mature,
      currentData.crops.mature,
      currentData.crops.all
    );
    for (const crop of maturedCrops) {
      for (const cb of listeners.cropMatured) {
        cb({ crop });
      }
    }

    const harvestEvents = detectCropHarvests(previousData.plants.all, currentData.plants.all, previousData.crops.all);
    for (const event of harvestEvents) {
      for (const cb of listeners.cropHarvested) {
        cb(event);
      }
    }

    const eggChanges = detectEggChanges(previousData.eggs.all, currentData.eggs.all);
    for (const egg of eggChanges.added) {
      for (const cb of listeners.eggPlaced) {
        cb({ egg });
      }
    }
    for (const egg of eggChanges.removed) {
      for (const cb of listeners.eggRemoved) {
        cb({ egg });
      }
    }

    const maturedEggs = detectEggMatured(
      previousData.eggs.mature,
      currentData.eggs.mature,
      currentData.eggs.all
    );
    for (const egg of maturedEggs) {
      for (const cb of listeners.eggMatured) {
        cb({ egg });
      }
    }

    const decorChanges = detectDecorChanges(previousData.decors.all, currentData.decors.all);
    for (const decor of decorChanges.added) {
      for (const cb of listeners.decorPlaced) {
        cb({ decor });
      }
    }
    for (const decor of decorChanges.removed) {
      for (const cb of listeners.decorRemoved) {
        cb({ decor });
      }
    }
  }

  async function init(): Promise<void> {
    if (initialized) return;

    const unsub1 = await gardenView.onChangeNow((value) => {
      sources.garden = value;
      ready.add("garden");
      notify();
    });
    unsubscribes.push(unsub1);

    const unsub2 = await Store.subscribe("myUserSlotIdxAtom", (value: unknown) => {
      sources.mySlotIndex = value as number | null;
      ready.add("mySlotIndex");
      notify();
    });
    unsubscribes.push(unsub2);

    initialized = true;

    if (ready.size === sourceCount) {
      currentData = buildData(sources as GardenSources, getGameMap);
    }
  }

  init();

  return {
    get(): MyGardenData {
      return currentData;
    },

    subscribe(
      callback: (value: MyGardenData, prev: MyGardenData) => void,
      options?: SubscribeOptions
    ): Unsubscribe {
      listeners.all.add(callback);
      if (options?.immediate !== false && initialized && ready.size === sourceCount) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(
      callback: (value: MyGardenData, prev: MyGardenData) => void,
      options?: SubscribeOptions
    ): Unsubscribe {
      listeners.stable.add(callback);
      if (options?.immediate !== false && initialized && ready.size === sourceCount) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribePlantAdded(callback: (event: PlantAddedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.plantAdded.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const plant of currentData.plants.all) {
          callback({ plant });
        }
      }
      return () => listeners.plantAdded.delete(callback);
    },

    subscribePlantRemoved(callback: (event: PlantRemovedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.plantRemoved.add(callback);
      return () => listeners.plantRemoved.delete(callback);
    },

    subscribePlantMatured(callback: (event: PlantMaturedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.plantMatured.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const plant of currentData.plants.mature) {
          callback({ plant });
        }
      }
      return () => listeners.plantMatured.delete(callback);
    },

    subscribeCropMutated(callback: (event: CropMutatedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.cropMutated.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const crop of currentData.crops.mutated.all) {
          callback({ crop, added: crop.mutations as MutationId[], removed: [] });
        }
      }
      return () => listeners.cropMutated.delete(callback);
    },

    subscribeCropMatured(callback: (event: CropMaturedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.cropMatured.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const crop of currentData.crops.mature) {
          callback({ crop });
        }
      }
      return () => listeners.cropMatured.delete(callback);
    },

    subscribeCropHarvested(callback: (event: CropHarvestedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.cropHarvested.add(callback);
      return () => listeners.cropHarvested.delete(callback);
    },

    subscribeEggPlaced(callback: (event: EggPlacedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.eggPlaced.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const egg of currentData.eggs.all) {
          callback({ egg });
        }
      }
      return () => listeners.eggPlaced.delete(callback);
    },

    subscribeEggRemoved(callback: (event: EggRemovedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.eggRemoved.add(callback);
      return () => listeners.eggRemoved.delete(callback);
    },

    subscribeEggMatured(callback: (event: EggMaturedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.eggMatured.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const egg of currentData.eggs.mature) {
          callback({ egg });
        }
      }
      return () => listeners.eggMatured.delete(callback);
    },

    subscribeDecorPlaced(callback: (event: DecorPlacedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.decorPlaced.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const decor of currentData.decors.all) {
          callback({ decor });
        }
      }
      return () => listeners.decorPlaced.delete(callback);
    },

    subscribeDecorRemoved(callback: (event: DecorRemovedEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.decorRemoved.add(callback);
      return () => listeners.decorRemoved.delete(callback);
    },

    destroy(): void {
      for (const unsub of unsubscribes) {
        unsub();
      }
      unsubscribes.length = 0;
      listeners.all.clear();
      listeners.stable.clear();
      listeners.plantAdded.clear();
      listeners.plantRemoved.clear();
      listeners.plantMatured.clear();
      listeners.cropMutated.clear();
      listeners.cropMatured.clear();
      listeners.cropHarvested.clear();
      listeners.eggPlaced.clear();
      listeners.eggRemoved.clear();
      listeners.eggMatured.clear();
      listeners.decorPlaced.clear();
      listeners.decorRemoved.clear();
      initialized = false;
    },
  };
}

let instance: MyGardenGlobal | null = null;

export function getMyGarden(): MyGardenGlobal {
  if (!instance) {
    instance = createMyGardenGlobal();
  }
  return instance;
}
