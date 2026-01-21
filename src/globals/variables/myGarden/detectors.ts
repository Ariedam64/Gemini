/**
 * myGarden Detectors
 *
 * Change detection functions for garden state transitions.
 *
 * @module globals/variables/myGarden/detectors
 */

import type {
  PlantWithTile,
  CropInfo,
  EggWithTile,
  DecorWithTile,
  MutationId,
  CropMutatedEvent,
  CropHarvestedEvent,
} from "../../core/types";

export function detectPlantChanges(
  prev: PlantWithTile[],
  next: PlantWithTile[]
): { added: PlantWithTile[]; removed: PlantWithTile[] } {
  const prevTiles = new Set(prev.map((p) => p.tileIndex));
  const nextTiles = new Set(next.map((p) => p.tileIndex));

  const added = next.filter((p) => !prevTiles.has(p.tileIndex));
  const removed = prev.filter((p) => !nextTiles.has(p.tileIndex));

  return { added, removed };
}

export function detectPlantMatured(
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

export function detectCropMatured(
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

export function detectEggMatured(
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

export function detectCropMutations(
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
          fruitCount: 1, // Each CropInfo = 1 fruit slot
        };
        events.push({ crop, added, removed });
      }
    }
  }

  return events;
}

export function detectCropHarvests(
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
          fruitCount: 1, // Each CropInfo = 1 fruit slot
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
          fruitCount: 1, // Each CropInfo = 1 fruit slot
        };
        events.push({ crop, remainingSlots: nextPlant.slotsCount });
      }
    }
  }

  return events;
}

export function detectEggChanges(
  prev: EggWithTile[],
  next: EggWithTile[]
): { added: EggWithTile[]; removed: EggWithTile[] } {
  const prevTiles = new Set(prev.map((e) => e.tileIndex));
  const nextTiles = new Set(next.map((e) => e.tileIndex));

  const added = next.filter((e) => !prevTiles.has(e.tileIndex));
  const removed = prev.filter((e) => !nextTiles.has(e.tileIndex));

  return { added, removed };
}

export function detectDecorChanges(
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
