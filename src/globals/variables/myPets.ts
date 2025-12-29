import { Store } from "../../atoms/store";
import { deepEqual } from "../core/reactive";
import type {
  MyPetsGlobal,
  MyPetsData,
  UnifiedPet,
  PetAbilityTrigger,
  PetLocationChange,
  PetAbilityEvent,
  PetCountChange,
  ExpandedPetChange,
  PetGrowthEvent,
  PetStrengthGainEvent,
  PetMaxStrengthEvent,
  SubscribeOptions,
  Unsubscribe,
} from "../core/types";
import type { PetInventoryItem, PetInfo, PetSlotInfo } from "../../atoms/types";
import {
  calculatePetAge,
  calculateMaxStrength,
  calculateCurrentStrength,
  isPetMature,
} from "../../modules/calculators";

type MyPetsSources = {
  inventory: PetInventoryItem[];
  hutch: PetInventoryItem[];
  active: PetInfo[];
  slotInfos: Record<string, PetSlotInfo>;
  expandedPetSlotId: string | null;
};

const atomSources = {
  inventory: "myPetInventoryAtom",
  hutch: "myPetHutchPetItemsAtom",
  active: "myPetInfosAtom",
  slotInfos: "myPetSlotInfosAtom",
  expandedPetSlotId: "expandedPetSlotIdAtom",
};

function fromInventoryItem(item: PetInventoryItem, location: "inventory" | "hutch"): UnifiedPet {
  const growthStage = calculatePetAge(item.xp);
  const maxStrength = calculateMaxStrength(item.petSpecies, item.targetScale);
  const currentStrength = calculateCurrentStrength(item.petSpecies, item.xp, maxStrength);
  const isMature = isPetMature(item.petSpecies, growthStage);

  return {
    id: item.id,
    petSpecies: item.petSpecies,
    name: item.name,
    xp: item.xp,
    hunger: item.hunger,
    mutations: [...item.mutations],
    targetScale: item.targetScale,
    abilities: [...item.abilities],
    location,
    position: null,
    lastAbilityTrigger: null,
    growthStage,
    currentStrength,
    maxStrength,
    isMature,
  };
}

function fromPetInfo(info: PetInfo, slotInfos: Record<string, PetSlotInfo>): UnifiedPet {
  const slotInfo = slotInfos[info.slot.id];
  const lastAbilityTrigger: PetAbilityTrigger = slotInfo?.lastAbilityTrigger ?? null;

  const growthStage = calculatePetAge(info.slot.xp);
  const maxStrength = calculateMaxStrength(info.slot.petSpecies, info.slot.targetScale);
  const currentStrength = calculateCurrentStrength(info.slot.petSpecies, info.slot.xp, maxStrength);
  const isMature = isPetMature(info.slot.petSpecies, growthStage);

  return {
    id: info.slot.id,
    petSpecies: info.slot.petSpecies,
    name: info.slot.name,
    xp: info.slot.xp,
    hunger: info.slot.hunger,
    mutations: [...info.slot.mutations],
    targetScale: info.slot.targetScale,
    abilities: [...info.slot.abilities],
    location: "active",
    position: info.position ? { x: info.position.x, y: info.position.y } : null,
    lastAbilityTrigger,
    growthStage,
    currentStrength,
    maxStrength,
    isMature,
  };
}

function buildData(sources: MyPetsSources): MyPetsData {
  const seenIds = new Set<string>();

  const activePets: UnifiedPet[] = [];
  for (const info of sources.active ?? []) {
    const pet = fromPetInfo(info, sources.slotInfos ?? {});
    activePets.push(pet);
    seenIds.add(pet.id);
  }

  const inventoryPets: UnifiedPet[] = [];
  for (const item of sources.inventory ?? []) {
    if (seenIds.has(item.id)) continue;
    const pet = fromInventoryItem(item, "inventory");
    inventoryPets.push(pet);
    seenIds.add(pet.id);
  }

  const hutchPets: UnifiedPet[] = [];
  for (const item of sources.hutch ?? []) {
    if (seenIds.has(item.id)) continue;
    const pet = fromInventoryItem(item, "hutch");
    hutchPets.push(pet);
    seenIds.add(pet.id);
  }

  const all = [...activePets, ...inventoryPets, ...hutchPets];

  const expandedPetSlotId = sources.expandedPetSlotId ?? null;
  const expandedPet = expandedPetSlotId ? all.find((p) => p.id === expandedPetSlotId) ?? null : null;

  return {
    all,
    byLocation: {
      inventory: inventoryPets,
      hutch: hutchPets,
      active: activePets,
    },
    counts: {
      inventory: inventoryPets.length,
      hutch: hutchPets.length,
      active: activePets.length,
      total: all.length,
    },
    expandedPetSlotId,
    expandedPet,
  };
}

const initialData: MyPetsData = {
  all: [],
  byLocation: { inventory: [], hutch: [], active: [] },
  counts: { inventory: 0, hutch: 0, active: 0, total: 0 },
  expandedPetSlotId: null,
  expandedPet: null,
};

function arraysEqual<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function getStableKey(pet: UnifiedPet): string {
  return JSON.stringify({
    id: pet.id,
    petSpecies: pet.petSpecies,
    name: pet.name,
    mutations: pet.mutations,
    abilities: pet.abilities,
    location: pet.location,
  });
}

function isStableEqual(prev: MyPetsData, next: MyPetsData): boolean {
  if (prev.all.length !== next.all.length) return false;

  const prevKeys = prev.all.map(getStableKey);
  const nextKeys = next.all.map(getStableKey);

  return arraysEqual(prevKeys, nextKeys);
}

function detectLocationChanges(prev: MyPetsData, next: MyPetsData): PetLocationChange[] {
  const changes: PetLocationChange[] = [];
  const prevMap = new Map(prev.all.map((p) => [p.id, p]));

  for (const pet of next.all) {
    const prevPet = prevMap.get(pet.id);
    if (prevPet && prevPet.location !== pet.location) {
      changes.push({ pet, from: prevPet.location, to: pet.location });
    }
  }

  return changes;
}

function detectAbilityEvents(prev: MyPetsData, next: MyPetsData): PetAbilityEvent[] {
  const events: PetAbilityEvent[] = [];
  const prevMap = new Map(prev.all.map((p) => [p.id, p]));

  for (const pet of next.all) {
    if (!pet.lastAbilityTrigger) continue;

    const prevPet = prevMap.get(pet.id);
    const prevTrigger = prevPet?.lastAbilityTrigger;

    const isNew =
      !prevTrigger ||
      prevTrigger.abilityId !== pet.lastAbilityTrigger.abilityId ||
      prevTrigger.performedAt !== pet.lastAbilityTrigger.performedAt;

    if (isNew) {
      events.push({ pet, trigger: pet.lastAbilityTrigger });
    }
  }

  return events;
}

function detectCountChanges(prev: MyPetsData, next: MyPetsData): PetCountChange | null {
  const prevIds = new Set(prev.all.map((p) => p.id));
  const nextIds = new Set(next.all.map((p) => p.id));

  const added = next.all.filter((p) => !prevIds.has(p.id));
  const removed = prev.all.filter((p) => !nextIds.has(p.id));

  if (added.length === 0 && removed.length === 0) return null;

  return { added, removed, counts: next.counts };
}

function detectGrowthEvents(prev: MyPetsData, next: MyPetsData): PetGrowthEvent[] {
  const events: PetGrowthEvent[] = [];
  const prevMap = new Map(prev.all.map((p) => [p.id, p]));

  for (const pet of next.all) {
    const prevPet = prevMap.get(pet.id);
    if (prevPet && pet.growthStage > prevPet.growthStage) {
      events.push({ pet, previousStage: prevPet.growthStage, newStage: pet.growthStage });
    }
  }

  return events;
}

function detectStrengthGainEvents(prev: MyPetsData, next: MyPetsData): PetStrengthGainEvent[] {
  const events: PetStrengthGainEvent[] = [];
  const prevMap = new Map(prev.all.map((p) => [p.id, p]));

  for (const pet of next.all) {
    const prevPet = prevMap.get(pet.id);
    if (prevPet && pet.currentStrength > prevPet.currentStrength) {
      events.push({ pet, previousStrength: prevPet.currentStrength, newStrength: pet.currentStrength });
    }
  }

  return events;
}

function detectMaxStrengthEvents(prev: MyPetsData, next: MyPetsData): PetMaxStrengthEvent[] {
  const events: PetMaxStrengthEvent[] = [];
  const prevMap = new Map(prev.all.map((p) => [p.id, p]));

  for (const pet of next.all) {
    const prevPet = prevMap.get(pet.id);
    if (prevPet && pet.currentStrength === pet.maxStrength && prevPet.currentStrength < prevPet.maxStrength) {
      events.push({ pet });
    }
  }

  return events;
}

type ListenerSets = {
  all: Set<(value: MyPetsData, prev: MyPetsData) => void>;
  stable: Set<(value: MyPetsData, prev: MyPetsData) => void>;
  location: Set<(event: PetLocationChange) => void>;
  ability: Set<(event: PetAbilityEvent) => void>;
  count: Set<(event: PetCountChange) => void>;
  expandedPet: Set<(event: ExpandedPetChange) => void>;
  growth: Set<(event: PetGrowthEvent) => void>;
  strengthGain: Set<(event: PetStrengthGainEvent) => void>;
  maxStrength: Set<(event: PetMaxStrengthEvent) => void>;
};

function createMyPetsGlobal(): MyPetsGlobal {
  let currentData: MyPetsData = initialData;
  let previousData: MyPetsData = initialData;
  let initialized = false;
  const unsubscribes: Unsubscribe[] = [];

  const listeners: ListenerSets = {
    all: new Set(),
    stable: new Set(),
    location: new Set(),
    ability: new Set(),
    count: new Set(),
    expandedPet: new Set(),
    growth: new Set(),
    strengthGain: new Set(),
    maxStrength: new Set(),
  };

  const sources: Partial<MyPetsSources> = {};
  const sourceKeys = Object.keys(atomSources) as (keyof MyPetsSources)[];
  const ready = new Set<keyof MyPetsSources>();

  function notify(): void {
    if (ready.size < sourceKeys.length) return;

    const nextData = buildData(sources as MyPetsSources);

    if (deepEqual(currentData, nextData)) return;

    previousData = currentData;
    currentData = nextData;

    if (!initialized) return;

    for (const cb of listeners.all) {
      cb(currentData, previousData);
    }

    if (!isStableEqual(previousData, currentData)) {
      for (const cb of listeners.stable) {
        cb(currentData, previousData);
      }
    }

    const locationChanges = detectLocationChanges(previousData, currentData);
    for (const change of locationChanges) {
      for (const cb of listeners.location) {
        cb(change);
      }
    }

    const abilityEvents = detectAbilityEvents(previousData, currentData);
    for (const event of abilityEvents) {
      for (const cb of listeners.ability) {
        cb(event);
      }
    }

    const countChange = detectCountChanges(previousData, currentData);
    if (countChange) {
      for (const cb of listeners.count) {
        cb(countChange);
      }
    }

    const growthEvents = detectGrowthEvents(previousData, currentData);
    for (const event of growthEvents) {
      for (const cb of listeners.growth) {
        cb(event);
      }
    }

    const strengthGainEvents = detectStrengthGainEvents(previousData, currentData);
    for (const event of strengthGainEvents) {
      for (const cb of listeners.strengthGain) {
        cb(event);
      }
    }

    const maxStrengthEvents = detectMaxStrengthEvents(previousData, currentData);
    for (const event of maxStrengthEvents) {
      for (const cb of listeners.maxStrength) {
        cb(event);
      }
    }

    if (previousData.expandedPetSlotId !== currentData.expandedPetSlotId) {
      const event: ExpandedPetChange = {
        current: currentData.expandedPet,
        previous: previousData.expandedPet,
        currentId: currentData.expandedPetSlotId,
        previousId: previousData.expandedPetSlotId,
      };
      for (const cb of listeners.expandedPet) {
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
      currentData = buildData(sources as MyPetsSources);
    }
  }

  init();

  return {
    get(): MyPetsData {
      return currentData;
    },

    subscribe(callback: (value: MyPetsData, prev: MyPetsData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.all.add(callback);
      if (options?.immediate !== false && initialized && ready.size === sourceKeys.length) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (value: MyPetsData, prev: MyPetsData) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.stable.add(callback);
      if (options?.immediate !== false && initialized && ready.size === sourceKeys.length) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribeLocation(callback: (event: PetLocationChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.location.add(callback);
      if (options?.immediate && initialized && ready.size === sourceKeys.length) {
        for (const pet of currentData.all) {
          callback({ pet, from: pet.location, to: pet.location });
        }
      }
      return () => listeners.location.delete(callback);
    },

    subscribeAbility(callback: (event: PetAbilityEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.ability.add(callback);
      if (options?.immediate && initialized && ready.size === sourceKeys.length) {
        for (const pet of currentData.all) {
          if (pet.lastAbilityTrigger) {
            callback({ pet, trigger: pet.lastAbilityTrigger });
          }
        }
      }
      return () => listeners.ability.delete(callback);
    },

    subscribeCount(callback: (event: PetCountChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.count.add(callback);
      if (options?.immediate && initialized && ready.size === sourceKeys.length) {
        callback({ added: currentData.all, removed: [], counts: currentData.counts });
      }
      return () => listeners.count.delete(callback);
    },

    subscribeExpandedPet(callback: (event: ExpandedPetChange) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.expandedPet.add(callback);
      if (options?.immediate && initialized && ready.size === sourceKeys.length) {
        callback({
          current: currentData.expandedPet,
          previous: currentData.expandedPet,
          currentId: currentData.expandedPetSlotId,
          previousId: currentData.expandedPetSlotId,
        });
      }
      return () => listeners.expandedPet.delete(callback);
    },

    subscribeGrowth(callback: (event: PetGrowthEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.growth.add(callback);
      if (options?.immediate && initialized && ready.size === sourceKeys.length) {
        for (const pet of currentData.all) {
          callback({ pet, previousStage: pet.growthStage, newStage: pet.growthStage });
        }
      }
      return () => listeners.growth.delete(callback);
    },

    subscribeStrengthGain(callback: (event: PetStrengthGainEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.strengthGain.add(callback);
      if (options?.immediate && initialized && ready.size === sourceKeys.length) {
        for (const pet of currentData.all) {
          callback({ pet, previousStrength: pet.currentStrength, newStrength: pet.currentStrength });
        }
      }
      return () => listeners.strengthGain.delete(callback);
    },

    subscribeMaxStrength(callback: (event: PetMaxStrengthEvent) => void, options?: SubscribeOptions): Unsubscribe {
      listeners.maxStrength.add(callback);
      if (options?.immediate && initialized && ready.size === sourceKeys.length) {
        for (const pet of currentData.all) {
          if (pet.currentStrength === pet.maxStrength) {
            callback({ pet });
          }
        }
      }
      return () => listeners.maxStrength.delete(callback);
    },

    destroy(): void {
      for (const unsub of unsubscribes) {
        unsub();
      }
      unsubscribes.length = 0;
      listeners.all.clear();
      listeners.stable.clear();
      listeners.location.clear();
      listeners.ability.clear();
      listeners.count.clear();
      listeners.expandedPet.clear();
      listeners.growth.clear();
      listeners.strengthGain.clear();
      listeners.maxStrength.clear();
      initialized = false;
    },
  };
}

let instance: MyPetsGlobal | null = null;

export function getMyPets(): MyPetsGlobal {
  if (!instance) {
    instance = createMyPetsGlobal();
  }
  return instance;
}