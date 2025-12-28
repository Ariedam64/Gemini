import { Store } from "../../atoms/store";
import type {
  MyPetsGlobal,
  MyPetsData,
  UnifiedPet,
  PetAbilityTrigger,
  PetLocationChange,
  PetAbilityEvent,
  PetCountChange,
  Unsubscribe,
} from "../core/types";
import type { PetInventoryItem, PetInfo, PetSlotInfo } from "../../atoms/types";

type MyPetsSources = {
  inventory: PetInventoryItem[];
  hutch: PetInventoryItem[];
  active: PetInfo[];
  slotInfos: Record<string, PetSlotInfo>;
};

const atomSources = {
  inventory: "myPetInventoryAtom",
  hutch: "myPetHutchPetItemsAtom",
  active: "myPetInfosAtom",
  slotInfos: "myPetSlotInfosAtom",
};

function fromInventoryItem(item: PetInventoryItem, location: "inventory" | "hutch"): UnifiedPet {
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
  };
}

function fromPetInfo(info: PetInfo, slotInfos: Record<string, PetSlotInfo>): UnifiedPet {
  const slotInfo = slotInfos[info.slot.id];
  const lastAbilityTrigger: PetAbilityTrigger = slotInfo?.lastAbilityTrigger ?? null;

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
  };
}

const initialData: MyPetsData = {
  all: [],
  byLocation: { inventory: [], hutch: [], active: [] },
  counts: { inventory: 0, hutch: 0, active: 0, total: 0 },
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

type ListenerSets = {
  all: Set<(value: MyPetsData, prev: MyPetsData) => void>;
  stable: Set<(value: MyPetsData, prev: MyPetsData) => void>;
  location: Set<(event: PetLocationChange) => void>;
  ability: Set<(event: PetAbilityEvent) => void>;
  count: Set<(event: PetCountChange) => void>;
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

    subscribe(callback: (value: MyPetsData, prev: MyPetsData) => void): Unsubscribe {
      listeners.all.add(callback);
      if (initialized && ready.size === sourceKeys.length) {
        callback(currentData, currentData);
      }
      return () => listeners.all.delete(callback);
    },

    subscribeStable(callback: (value: MyPetsData, prev: MyPetsData) => void): Unsubscribe {
      listeners.stable.add(callback);
      if (initialized && ready.size === sourceKeys.length) {
        callback(currentData, currentData);
      }
      return () => listeners.stable.delete(callback);
    },

    subscribeLocation(callback: (event: PetLocationChange) => void): Unsubscribe {
      listeners.location.add(callback);
      return () => listeners.location.delete(callback);
    },

    subscribeAbility(callback: (event: PetAbilityEvent) => void): Unsubscribe {
      listeners.ability.add(callback);
      return () => listeners.ability.delete(callback);
    },

    subscribeCount(callback: (event: PetCountChange) => void): Unsubscribe {
      listeners.count.add(callback);
      return () => listeners.count.delete(callback);
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
