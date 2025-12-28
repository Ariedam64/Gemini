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
