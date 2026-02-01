/**
 * myGarden Build Data
 *
 * Main data building function that creates MyGardenData from garden sources.
 *
 * @module globals/variables/myGarden/buildData
 */

import { getGameMap } from "../gameMap";
import type { MyGardenData, PlantWithTile, CropInfo, EggWithTile, DecorWithTile } from "../../core/types";
import type { PlantTileObject, EggTileObject, DecorTileObject } from "../../../atoms/types";
import type { GardenSources } from "./types";
import { getInitialData, createEmptyMutationRecord } from "./utils";
import { buildPlantWithTile, buildCropInfo, buildEggWithTile, buildDecorWithTile } from "./builders";

export function buildData(sources: GardenSources, gameMap: typeof getGameMap): MyGardenData {
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
