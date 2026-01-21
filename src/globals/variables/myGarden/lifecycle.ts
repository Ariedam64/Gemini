/**
 * myGarden Lifecycle
 *
 * Global instance creation and lifecycle management.
 *
 * @module globals/variables/myGarden/lifecycle
 */

import { gardenView } from "../../../atoms";
import { Store } from "../../../atoms/store";
import { getGameMap } from "../gameMap";
import { deepEqual } from "../../core/reactive";
import type {
  MyGardenGlobal,
  MyGardenData,
  MutationId,
  SubscribeOptions,
  Unsubscribe,
} from "../../core/types";
import type { GardenSources, ListenerSets } from "./types";
import { getInitialData, getStableKey } from "./utils";
import { buildData } from "./buildData";
import {
  detectPlantChanges,
  detectPlantMatured,
  detectCropMatured,
  detectEggMatured,
  detectCropMutations,
  detectCropHarvests,
  detectEggChanges,
  detectDecorChanges,
} from "./detectors";

export function createMyGardenGlobal(): MyGardenGlobal {
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

    subscribePlantAdded(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.plantAdded.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const plant of currentData.plants.all) {
          callback({ plant });
        }
      }
      return () => listeners.plantAdded.delete(callback);
    },

    subscribePlantRemoved(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.plantRemoved.add(callback);
      return () => listeners.plantRemoved.delete(callback);
    },

    subscribePlantMatured(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.plantMatured.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const plant of currentData.plants.mature) {
          callback({ plant });
        }
      }
      return () => listeners.plantMatured.delete(callback);
    },

    subscribeCropMutated(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.cropMutated.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const crop of currentData.crops.mutated.all) {
          callback({ crop, added: crop.mutations as MutationId[], removed: [] });
        }
      }
      return () => listeners.cropMutated.delete(callback);
    },

    subscribeCropMatured(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.cropMatured.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const crop of currentData.crops.mature) {
          callback({ crop });
        }
      }
      return () => listeners.cropMatured.delete(callback);
    },

    subscribeCropHarvested(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.cropHarvested.add(callback);
      return () => listeners.cropHarvested.delete(callback);
    },

    subscribeEggPlaced(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.eggPlaced.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const egg of currentData.eggs.all) {
          callback({ egg });
        }
      }
      return () => listeners.eggPlaced.delete(callback);
    },

    subscribeEggRemoved(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.eggRemoved.add(callback);
      return () => listeners.eggRemoved.delete(callback);
    },

    subscribeEggMatured(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.eggMatured.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const egg of currentData.eggs.mature) {
          callback({ egg });
        }
      }
      return () => listeners.eggMatured.delete(callback);
    },

    subscribeDecorPlaced(callback, options?: SubscribeOptions): Unsubscribe {
      listeners.decorPlaced.add(callback);
      if (options?.immediate && initialized && ready.size === sourceCount) {
        for (const decor of currentData.decors.all) {
          callback({ decor });
        }
      }
      return () => listeners.decorPlaced.delete(callback);
    },

    subscribeDecorRemoved(callback, options?: SubscribeOptions): Unsubscribe {
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
