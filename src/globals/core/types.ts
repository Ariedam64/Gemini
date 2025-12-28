import type { GrowSlot, GardenTileObject } from "../../atoms/types";

export type Unsubscribe = () => void;

export type GlobalVariable<T> = {
  get(): T;
  subscribe(callback: (value: T, prev: T) => void): Unsubscribe;
  destroy(): void;
};

export type TilePosition = {
  globalIndex: number | null;
  localIndex: number | null;
};

export type TileInfo = {
  type: string | null;
  isEmpty: boolean;
};

export type GardenContext = {
  name: string | null;
  isOwner: boolean;
  playerSlotIndex: number | null;
};

export type TileObject = {
  type: "plant" | "egg" | "decor" | null;
  data: GardenTileObject | null;
  isMature: boolean;
};

export type PlantInfo = {
  species: string;
  slots: GrowSlot[];
  currentSlotIndex: number | null;
  sortedSlotIndices: number[];
  nextHarvestSlotIndex: number | null;
};

export type CurrentTileGlobal = {
  position: TilePosition;
  tile: TileInfo;
  garden: GardenContext;
  object: TileObject;
  plant: PlantInfo | null;
};

export type AtomSources<T extends Record<string, unknown>> = {
  [K in keyof T]: string;
};

export type CombineFunction<TSources extends Record<string, unknown>, TResult> = (
  sources: TSources
) => TResult;

// =============================================================================
// MY PETS GLOBAL
// =============================================================================

export type PetLocation = "inventory" | "hutch" | "active";

export type PetAbilityTrigger = {
  abilityId: string | null;
  performedAt: number | null;
  data: unknown;
} | null;

export type UnifiedPet = {
  id: string;
  petSpecies: string;
  name: string | null;
  xp: number;
  hunger: number;
  mutations: string[];
  targetScale: number;
  abilities: string[];
  location: PetLocation;
  position: { x: number; y: number } | null;
  lastAbilityTrigger: PetAbilityTrigger;
};

export type MyPetsData = {
  all: UnifiedPet[];
  byLocation: {
    inventory: UnifiedPet[];
    hutch: UnifiedPet[];
    active: UnifiedPet[];
  };
  counts: {
    inventory: number;
    hutch: number;
    active: number;
    total: number;
  };
};

export type PetLocationChange = {
  pet: UnifiedPet;
  from: PetLocation;
  to: PetLocation;
};

export type PetAbilityEvent = {
  pet: UnifiedPet;
  trigger: NonNullable<PetAbilityTrigger>;
};

export type PetCountChange = {
  added: UnifiedPet[];
  removed: UnifiedPet[];
  counts: MyPetsData["counts"];
};

export type MyPetsGlobal = {
  get(): MyPetsData;
  subscribe(callback: (value: MyPetsData, prev: MyPetsData) => void): Unsubscribe;
  subscribeStable(callback: (value: MyPetsData, prev: MyPetsData) => void): Unsubscribe;
  subscribeLocation(callback: (event: PetLocationChange) => void): Unsubscribe;
  subscribeAbility(callback: (event: PetAbilityEvent) => void): Unsubscribe;
  subscribeCount(callback: (event: PetCountChange) => void): Unsubscribe;
  destroy(): void;
};
