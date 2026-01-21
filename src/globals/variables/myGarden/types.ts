/**
 * myGarden Internal Types
 *
 * Internal type definitions for myGarden implementation.
 *
 * @module globals/variables/myGarden/types
 */

import type {
  MyGardenData,
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
} from "../../core/types";
import type { Garden } from "../../../atoms/types";

export type GardenSources = {
  garden: Garden | null;
  mySlotIndex: number | null;
};

export type ListenerSets = {
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
