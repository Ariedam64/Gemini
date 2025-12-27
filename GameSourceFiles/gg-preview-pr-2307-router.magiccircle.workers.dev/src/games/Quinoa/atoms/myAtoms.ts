import { atom, getDefaultStore } from 'jotai';
import { playSfx } from '@/audio/useQuinoaAudio';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import {
  EggsDex,
  type FaunaAbilityId,
  type FaunaSpeciesId,
  faunaAbilitiesDex,
  faunaSpeciesDex,
} from '@/common/games/Quinoa/systems/fauna';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { MutationId } from '@/common/games/Quinoa/systems/mutation';
import { TaskId, taskEntries } from '@/common/games/Quinoa/systems/tasks';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import type {
  DecorRotation,
  Garden,
  GardenTileObject,
} from '@/common/games/Quinoa/user-json-schema/current';
import { getInstaGrowCost } from '@/common/games/Quinoa/utils/getInstaGrowCost';
import {
  getStrength,
  getStrengthScaleFactor,
} from '@/common/games/Quinoa/utils/pets';
import { getGlobalTileIndexFromCoordinate } from '@/common/games/Quinoa/world/map';
import type { GardenTileType } from '@/common/games/Quinoa/world/tiles';
import type { PlayerId } from '@/common/types/player';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { positionAtom } from '@/Quinoa/atoms/positionAtoms';
import { getPlaceholderGardenForSlot } from '@/Quinoa/components/QuinoaWorld/placeholderGardens';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import { playerIdAtom } from '@/store/store';
import { formatTime } from '@/utils/formatTime';
import { nonPrimitiveAtom } from '@/utils/nonPrimitiveAtom';
import type { PetInfo } from '../components/QuinoaCanvas/legacy/canvas-types';
import { calculateServerNow } from '../utils/serverNow';
import {
  currentTimeAtom,
  myDataAtom,
  myUserSlotAtom,
  spectatorsAtom,
  userSlotsAtom,
} from './baseAtoms';
import {
  myFavoritedItemIdsAtom,
  myInventoryItemsAtom,
  myPetHutchPetItemsAtom,
  myPetInventoryAtom,
} from './inventoryAtoms';
import { mapAtom } from './mapAtoms';

const { get, set } = getDefaultStore();

/**
 * My User Slot Index
 */
export const myUserSlotIdxAtom = atom((get) => {
  const myId = get(playerIdAtom);
  const userSlots = get(userSlotsAtom);
  const idx = userSlots.findIndex((slot) => slot?.playerId === myId);
  if (idx === -1) {
    return null;
  }
  return idx;
});

export const isSpectatingAtom = atom((get) => {
  const myId = get(playerIdAtom);
  const myUserSlotIdx = get(myUserSlotIdxAtom);
  const spectators = get(spectatorsAtom);
  return myUserSlotIdx === null && spectators.includes(myId);
});

/**
 * My Pet Infos
 */
export const myPetInfosAtom = atom<PetInfo[]>((get) => {
  const myUserSlot = get(myUserSlotAtom);
  if (!myUserSlot) {
    return [];
  }
  const petInfos: PetInfo[] = [];
  for (const petSlot of myUserSlot.data.petSlots) {
    const position = myUserSlot.petSlotInfos[petSlot.id]?.position;
    if (position) {
      petInfos.push({ slot: petSlot, position });
    }
  }
  return petInfos;
});

/**
 * My Pet Slot Infos
 */
export const myPetSlotInfosAtom = atom((get) => {
  const myUserSlot = get(myUserSlotAtom);
  if (!myUserSlot) {
    return null;
  }
  return myUserSlot.petSlotInfos;
});

/**
 * My Coins Count
 */
export const myCoinsCountAtom = atom((get) => {
  const myData = get(myDataAtom);
  return myData?.coinsCount ?? 0;
});

export const myJournalAtom = atom((get) => {
  const myData = get(myDataAtom);
  return myData?.journal;
});

/**
 * My Crop Journal
 */
export const myCropJournalAtom = nonPrimitiveAtom(
  (get) => {
    const myJournal = get(myJournalAtom);
    return myJournal?.produce;
  },
  (a, b) => {
    if (!a || !b) {
      return a === b;
    }
    // Compare lengths one by one, return early if any differ
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }
    for (const speciesId of aKeys) {
      const aJournal = a[speciesId as keyof typeof a];
      const bJournal = b[speciesId as keyof typeof b];

      if (
        !aJournal ||
        !bJournal ||
        aJournal.variantsLogged.length !== bJournal.variantsLogged.length
      ) {
        return false;
      }
    }
    return true;
  }
);

/**
 * My Pet Journal
 */
export const myPetJournalAtom = nonPrimitiveAtom(
  (get) => {
    const myJournal = get(myJournalAtom);
    return myJournal?.pets;
  },
  (a, b) => {
    if (!a || !b) {
      return a === b;
    }
    // Compare lengths one by one, return early if any differ
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }
    for (const speciesId of aKeys) {
      const aJournal = a[speciesId as keyof typeof a];
      const bJournal = b[speciesId as keyof typeof b];

      if (
        !aJournal ||
        !bJournal ||
        aJournal.variantsLogged.length !== bJournal.variantsLogged.length ||
        aJournal.abilitiesLogged.length !== bJournal.abilitiesLogged.length
      ) {
        return false;
      }
    }
    return true;
  }
);

/**
 * My Tasks Completed
 */
export const myCompletedTasksAtom = atom((get) => {
  const myData = get(myDataAtom);
  return myData?.tasksCompleted ?? [];
});

/**
 * Whether the tutorial tasks are complete.
 */
export const isTutorialCompleteAtom = atom((get) => {
  const completedTasks = get(myCompletedTasksAtom);
  return completedTasks.includes(TaskId.weatherIntroduction);
});

/**
 * My Active Tasks
 * Returns an array of TaskIds that are currently active (next to be completed).
 * Uses the prerequisites system to determine which tasks are available.
 */
export const myActiveTasksAtom = atom<TaskId[]>((get) => {
  const completedTasks = get(myCompletedTasksAtom);
  const activeTasks: TaskId[] = [];
  for (const [taskId, task] of taskEntries) {
    if (completedTasks.includes(taskId)) {
      continue;
    }
    const prerequisites = task.prerequisites;
    const hasNoPrerequisites = !prerequisites || prerequisites.length === 0;
    const arePrerequisitesMet = prerequisites?.every((prereqId) =>
      completedTasks.includes(prereqId)
    );
    if (hasNoPrerequisites || arePrerequisitesMet) {
      activeTasks.push(taskId);
    }
  }
  return activeTasks;
});

/**
 * Atom to track the currently selected inventory item in Quinoa.
 * null indicates no item is selected.
 * Note that this atom is not guaranteed to be valid, as the inventory items
 * can change server-side at any time.
 *
 * Use myValidatedSelectedItemIndexAtom instead.
 */
export const myPossiblyNoLongerValidSelectedItemIndexAtom = atom<number | null>(
  null
);

/**
 * Selects or deselects an inventory item by its index.
 *
 * This function allows us to distinguish between two types of item selection:
 * 1. **Implicit selection** - occurs during gameplay actions like potting or
 *    harvesting
 * 2. **Explicit selection** - occurs when the user directly clicks on an item
 *    in the inventory
 *
 * This distinction is important because we only want to play sound effects and
 * animations for explicit user selections, not for automatic selections during
 * gameplay actions.
 *
 * **Behavior:**
 * - If the provided index matches the currently selected item, the item will be
 *   deselected
 * - Otherwise, the item at the specified index will be selected
 * - Triggers explicit selection change events to track user-initiated selection
 *   changes
 *
 * @param newSelectedIndex - The zero-based index of the inventory item to
 * select, or null to deselect all items
 */
export function explicitlySelectItem(newSelectedIndex: number | null) {
  const { get, set } = getDefaultStore();
  const currentSelectedIndex = get(myValidatedSelectedItemIndexAtom);
  set(mySelectedItemRotationAtom, 0);
  if (currentSelectedIndex === newSelectedIndex) {
    set(myPossiblyNoLongerValidSelectedItemIndexAtom, null);
    set(myLastExplicitSelectedItemIndexAtom, null);
    set(avatarTriggerAnimationAtom, {
      playerId: get(playerIdAtom),
      animation: AvatarTriggerAnimationName.DropObject,
    });
    playSfx('Object_Drop');
    sendQuinoaMessage({
      type: 'DropObject',
    });
  } else {
    set(myPossiblyNoLongerValidSelectedItemIndexAtom, newSelectedIndex);
    set(myLastExplicitSelectedItemIndexAtom, newSelectedIndex);
    set(avatarTriggerAnimationAtom, {
      playerId: get(playerIdAtom),
      animation: AvatarTriggerAnimationName.PickupObject,
    });
    playSfx('Object_PickUp');
    sendQuinoaMessage({
      type: 'PickupObject',
    });
  }
}

/**
 * Atom to track the user's explicit item selection changes.
 *
 * See explicitlySelectItem for more details.
 */
export const myLastExplicitSelectedItemIndexAtom = atom<null | number>(null);

/**
 * My Validated Selected Item Index
 */
export const myValidatedSelectedItemIndexAtom = atom((get) => {
  const selectedIndex = get(myPossiblyNoLongerValidSelectedItemIndexAtom);
  const inventoryItems = get(myInventoryItemsAtom);

  if (!inventoryItems) {
    return null;
  }
  if (selectedIndex === null) {
    return null;
  }
  if (selectedIndex < 0 || selectedIndex >= inventoryItems.length) {
    return null;
  }
  if (inventoryItems[selectedIndex] === undefined) {
    console.error(
      `Selected item index ${selectedIndex} is out of bounds (inventory has ${inventoryItems.length} items). Resetting selection.`
    );
    return null;
  }
  return selectedIndex;
});

/**
 * When true, the validated selected item index should be treated as null.
 * This is used to temporarily suspend selection during certain avatar animations.
 */
export const isSelectedItemAtomSuspended = atom<Record<PlayerId, boolean>>({});

export const setSelectedIndexToEnd = () => {
  const myInventoryItems = get(myInventoryItemsAtom);
  set(myPossiblyNoLongerValidSelectedItemIndexAtom, myInventoryItems.length);
};

/**
 * Number of Pets deployed in Garden
 */
export const myNumPetsInGardenAtom = atom((get) => {
  const myData = get(myDataAtom);
  if (!myData) {
    return 0;
  }
  return myData.petSlots.length;
});

/**
 * My Selected Item
 */
export const mySelectedItemAtom = nonPrimitiveAtom((get) => {
  const selectedIndex = get(myValidatedSelectedItemIndexAtom);
  const inventoryItems = get(myInventoryItemsAtom);
  if (selectedIndex === null || !inventoryItems) {
    return null;
  }
  return inventoryItems[selectedIndex];
});

export const mySelectedItemNameAtom = atom((get) => {
  const selectedItem = get(mySelectedItemAtom);
  switch (selectedItem?.itemType) {
    case ItemType.Egg:
      return EggsDex[selectedItem.eggId].name;
    case ItemType.Produce:
      return floraSpeciesDex[selectedItem.species].crop.name;
    case ItemType.Plant:
      return floraSpeciesDex[selectedItem.species].plant.name;
    case ItemType.Pet:
      return selectedItem.name ?? faunaSpeciesDex[selectedItem.petSpecies].name;
    case ItemType.Seed:
      return floraSpeciesDex[selectedItem.species].seed.name;
    case ItemType.Tool:
      return toolsDex[selectedItem.toolId].name;
    case ItemType.Decor:
      return decorDex[selectedItem.decorId].name;
    default:
      return '';
  }
});

export const mySelectedItemRotationsAtom = atom((get) => {
  const selectedItem = get(mySelectedItemAtom);
  if (!selectedItem || selectedItem.itemType !== ItemType.Decor) {
    return null;
  }
  const blueprint = decorDex[selectedItem.decorId];
  if (!('rotationVariants' in blueprint)) {
    return null;
  }
  return Object.keys(blueprint.rotationVariants).map(Number) as DecorRotation[];
});

/**
 * My Selected Item Rotation
 */
export const mySelectedItemRotationAtom = atom<DecorRotation>(0);

export const myCurrentGlobalTileIndexAtom = atom((get) => {
  const map = get(mapAtom);
  const position = get(positionAtom);
  if (!position) {
    return null;
  }
  return getGlobalTileIndexFromCoordinate(map, position.x, position.y);
});

/**
 * My Current Tile
 * Returns an object with the current tile type and slot index, or null if not on a garden tile
 */
export const myCurrentGardenTileAtom = atom<{
  tileType: GardenTileType;
  userSlotIdx: number;
  localTileIndex: number;
  playerId?: PlayerId;
} | null>((get) => {
  const globalTileIndex = get(myCurrentGlobalTileIndexAtom);
  if (!globalTileIndex) {
    return null;
  }
  const map = get(mapAtom);
  const userSlots = get(userSlotsAtom);
  const userSlotIdxAndDirtTileIdx =
    map.globalTileIdxToDirtTile[globalTileIndex];
  const userSlotIdxAndBoardwalkTileIdx =
    map.globalTileIdxToBoardwalk[globalTileIndex];
  if (!userSlotIdxAndDirtTileIdx && !userSlotIdxAndBoardwalkTileIdx) {
    return null;
  }
  if (userSlotIdxAndDirtTileIdx && userSlotIdxAndBoardwalkTileIdx) {
    console.error(
      'Player is standing on both dirt and boardwalk tile indices. This should never happen.'
    );
    return null;
  }
  let userSlotIdxAndLocalTileIdx: {
    userSlotIdx: number;
    localTileIndex: number;
    tileType: GardenTileType;
  } | null = null;

  if (userSlotIdxAndDirtTileIdx) {
    userSlotIdxAndLocalTileIdx = {
      userSlotIdx: userSlotIdxAndDirtTileIdx.userSlotIdx,
      localTileIndex: userSlotIdxAndDirtTileIdx.dirtTileIdx,
      tileType: 'Dirt',
    };
  } else if (userSlotIdxAndBoardwalkTileIdx) {
    userSlotIdxAndLocalTileIdx = {
      userSlotIdx: userSlotIdxAndBoardwalkTileIdx.userSlotIdx,
      localTileIndex: userSlotIdxAndBoardwalkTileIdx.boardwalkTileIdx,
      tileType: 'Boardwalk',
    };
  } else {
    return null;
  }
  const { userSlotIdx, localTileIndex, tileType } = userSlotIdxAndLocalTileIdx;
  const userSlot = userSlots[userSlotIdx];
  const playerId = userSlot?.playerId;
  return {
    tileType,
    userSlotIdx,
    localTileIndex,
    playerId,
  };
});

/**
 * My Current Garden Object
 */
export const myCurrentGardenObjectAtom = atom((get) => {
  const userSlots = get(userSlotsAtom);
  const currentTile = get(myCurrentGardenTileAtom);
  if (!currentTile) {
    return null;
  }
  const { userSlotIdx, localTileIndex, tileType } = currentTile;
  const userSlot = userSlots[userSlotIdx];
  let garden: Garden;
  if (userSlot === null) {
    garden = getPlaceholderGardenForSlot(userSlotIdx);
  } else {
    garden = userSlot.data.garden;
  }
  let gardenObjects: Record<string, GardenTileObject> = {};
  if (tileType === 'Dirt') {
    gardenObjects = garden.tileObjects;
  } else if (tileType === 'Boardwalk') {
    gardenObjects = garden.boardwalkTileObjects;
  }
  return gardenObjects[localTileIndex] ?? null;
});

export const myOwnCurrentGardenObjectAtom = atom((get) => {
  const isInMyGarden = get(isInMyGardenAtom);
  if (!isInMyGarden) {
    return null;
  }
  const currentGardenObject = get(myCurrentGardenObjectAtom);
  return currentGardenObject;
});

export const myOwnCurrentDirtTileIndexAtom = atom((get) => {
  const currentTile = get(myCurrentGardenTileAtom);
  const myId = get(playerIdAtom);
  if (!currentTile) {
    return null;
  }
  const { localTileIndex, tileType, playerId } = currentTile;
  if (tileType !== 'Dirt' || playerId !== myId) {
    return null;
  }
  return localTileIndex;
});

export const myCurrentGardenObjectNameAtom = atom((get) => {
  const currentGardenObject = get(myCurrentGardenObjectAtom);
  switch (currentGardenObject?.objectType) {
    case 'plant':
      return floraSpeciesDex[currentGardenObject.species].plant.name;
    case 'egg':
      return EggsDex[currentGardenObject.eggId].name;
    case 'decor':
      return decorDex[currentGardenObject.decorId].name;
    default:
      return '';
  }
});

export const isInMyGardenAtom = atom((get) => {
  const currentTile = get(myCurrentGardenTileAtom);
  const myId = get(playerIdAtom);
  if (!currentTile) {
    return false;
  }
  return currentTile.playerId === myId;
});

export const myGardenBoardwalkTileObjectsAtom = nonPrimitiveAtom((get) => {
  const myUserSlot = get(myUserSlotAtom);
  if (!myUserSlot) {
    return null;
  }
  return myUserSlot.data.garden.boardwalkTileObjects;
});

/**
 * myCurrentStablePlantObjectInfoAtom
 *
 * This atom provides stable, sorted grow slot information for the current plant tile.
 * - It sorts grow slots by endTime (earliest to latest).
 * - The sort order is stable while on the same plant tile and with the same number of grow slots.
 * - This prevents UI reordering as endTimes change, improving UX when browsing/harvesting.
 *
 * Only recalculates when:
 *   - The player moves to a different plant tile
 *   - The number of grow slots changes
 */
const myCurrentStablePlantObjectInfoAtom = nonPrimitiveAtom(
  (get) => {
    const currentGardenTile = get(myCurrentGardenTileAtom);
    const currentGardenObject = get(myCurrentGardenObjectAtom);
    const isPlant = currentGardenObject?.objectType === 'plant';
    if (!currentGardenObject || !isPlant || !currentGardenTile) {
      return null;
    }
    const { localTileIndex, tileType } = currentGardenTile;
    const sortedGrowSlots = currentGardenObject.slots
      .map((slot, index) => ({
        index,
        endTime: slot.endTime,
      }))
      .sort((a, b) => a.endTime - b.endTime);

    return {
      sortedGrowSlots,
      localTileIndex,
      tileType,
    };
  },
  (a, b) => {
    if (!a || !b) {
      return a === b;
    }
    if (a.sortedGrowSlots.length !== b.sortedGrowSlots.length) {
      return false;
    }
    return a.localTileIndex === b.localTileIndex && a.tileType === b.tileType;
  }
);

export const myCurrentSortedGrowSlotIndicesAtom = atom((get) => {
  const plantObjectInfo = get(myCurrentStablePlantObjectInfoAtom);
  if (!plantObjectInfo) {
    return null;
  }
  return plantObjectInfo.sortedGrowSlots.map((slot) => slot.index);
});

export const myCurrentGrowSlotIndexAtom = atom(0);

/**
 * My Current Grow Slots
 */
export const myCurrentGrowSlotsAtom = atom((get) => {
  const currentGardenObject = get(myCurrentGardenObjectAtom);
  const isPlant = currentGardenObject?.objectType === 'plant';
  if (!currentGardenObject || !isPlant) {
    return null;
  }
  return currentGardenObject.slots;
});

/**
 * My Current Grow Slot
 */
export const myCurrentGrowSlotAtom = nonPrimitiveAtom((get) => {
  const myCurrentGrowSlotIndex = get(myCurrentGrowSlotIndexAtom);
  const myCurrentGrowSlots = get(myCurrentGrowSlotsAtom);
  return myCurrentGrowSlots?.[myCurrentGrowSlotIndex] ?? null;
});

export const secondsUntilCurrentGrowSlotMaturesAtom = atom((get) => {
  const currentTime = get(currentTimeAtom);
  const myCurrentGrowSlot = get(myCurrentGrowSlotAtom);
  if (!myCurrentGrowSlot) {
    return null;
  }
  const msRemaining = myCurrentGrowSlot.endTime - currentTime;
  return formatTime(msRemaining);
});

export const isCurrentGrowSlotMatureAtom = atom((get) => {
  const secondsRemaining = get(secondsUntilCurrentGrowSlotMaturesAtom);
  return secondsRemaining === '0s';
});

/**
 * My Current Egg
 */
export const myCurrentEggAtom = atom((get) => {
  const currentGardenObject = get(myCurrentGardenObjectAtom);
  if (!currentGardenObject) {
    return null;
  }
  if (currentGardenObject.objectType !== 'egg') {
    return null;
  }
  return currentGardenObject;
});

export const numGrowSlotsAtom = atom((get) => {
  const myCurrentGrowSlots = get(myCurrentGrowSlotsAtom);
  return myCurrentGrowSlots?.length ?? 0;
});

/**
 * Setter atom to move to the next grow slot index
 */
export const goToNextAvailableGrowSlotIndex = () => {
  const currentGrowSlotIndex = get(myCurrentGrowSlotIndexAtom);
  const growSlotIndices = get(myCurrentSortedGrowSlotIndicesAtom);

  if (!growSlotIndices || growSlotIndices.length === 0) {
    return;
  }
  const currentIndex = growSlotIndices.indexOf(currentGrowSlotIndex);
  // Find the next index after the current index
  const nextIndex = growSlotIndices[currentIndex + 1] ?? null;
  if (nextIndex !== null) {
    set(myCurrentGrowSlotIndexAtom, nextIndex);
  } else {
    // If no index found after current, wrap to the first index
    set(myCurrentGrowSlotIndexAtom, growSlotIndices[0]);
  }
};

/**
 * Setter atom to move to the previous grow slot index
 */
export const goToPreviousAvailableGrowSlotIndex = () => {
  const currentGrowSlotIndex = get(myCurrentGrowSlotIndexAtom);
  const growSlotIndices = get(myCurrentSortedGrowSlotIndicesAtom);

  if (!growSlotIndices || growSlotIndices.length === 0) {
    return;
  }
  const currentIndex = growSlotIndices.indexOf(currentGrowSlotIndex);
  // Find the previous index before the current index
  const previousIndex = growSlotIndices[currentIndex - 1];

  if (previousIndex !== undefined) {
    set(myCurrentGrowSlotIndexAtom, previousIndex);
  } else {
    // If no index found before current, wrap to the last index
    set(
      myCurrentGrowSlotIndexAtom,
      growSlotIndices[growSlotIndices.length - 1]
    );
  }
};

/**
 * Insta-Grow Cost
 */
export const instaGrowCostAtom = atom((get) => {
  const currentGardenObject = get(myCurrentGardenObjectAtom);
  if (!currentGardenObject || currentGardenObject.objectType === 'decor') {
    return 0;
  }
  return getInstaGrowCost(currentGardenObject, calculateServerNow());
});

export const isGardenObjectMatureAtom = atom((get) => {
  const currentGardenObject = get(myCurrentGardenObjectAtom);
  if (!currentGardenObject) {
    return false;
  }
  if (currentGardenObject.objectType === 'decor') {
    return true;
  }
  return currentGardenObject.maturedAt <= calculateServerNow();
});

/**
 * Seconds until earliest action is available (i.e., harvesting the first grow slot or hatching the egg)
 */
export const secondsUntilEarliestActionAtom = atom((get) => {
  const now = get(currentTimeAtom);
  const growSlots = get(myCurrentGrowSlotsAtom);
  const currentEgg = get(myCurrentEggAtom);

  const endTimes: number[] = [];
  // Add grow slot end times (for plants)
  if (growSlots) {
    endTimes.push(...growSlots.map((slot) => slot.endTime));
  }
  // Add egg maturation time (for eggs)
  if (currentEgg) {
    endTimes.push(currentEgg.maturedAt);
  }
  // Find the earliest time to finish
  const earliestTime = Math.min(...endTimes);
  const msRemaining = Math.max(0, earliestTime - now);
  return formatTime(msRemaining);
});

/**
 * Seconds until latest action is available (i.e., harvesting the last grow slot or hatching the egg)
 */
export const secondsUntilLatestActionAtom = atom((get) => {
  const now = get(currentTimeAtom);
  const growSlots = get(myCurrentGrowSlotsAtom);
  const currentEgg = get(myCurrentEggAtom);

  const endTimes: number[] = [];
  // Add grow slot end times (for plants)
  if (growSlots) {
    endTimes.push(...growSlots.map((slot) => slot.endTime));
  }
  // Add egg maturation time (for eggs)
  if (currentEgg) {
    endTimes.push(currentEgg.maturedAt);
  }
  // Find the latest time to finish
  const latestTime = Math.max(...endTimes);
  const msRemaining = Math.max(0, latestTime - now);
  return formatTime(msRemaining);
});

/**
 * My Primitive Pet Slots. Avoid using if possible, as it will update the xp, hunger, etc. every second.
 */
export const myPrimitivePetSlotsAtom = atom((get) => {
  const myData = get(myDataAtom);
  return myData?.petSlots ?? [];
});

/**
 * My Non-Primitive Pet Slots. Use when you only care about important changes, like the pet being swapped or the hunger starving.
 */
export const myNonPrimitivePetSlotsAtom = nonPrimitiveAtom(
  (get) => {
    const myData = get(myDataAtom);
    return myData?.petSlots ?? [];
  },
  (a, b) => {
    if (!a || !b) {
      return a === b;
    }
    if (a.length !== b.length) {
      return false;
    }
    return a.every((aPetSlot, index) => {
      const bPetSlot = b[index];
      if (!bPetSlot || aPetSlot.id !== bPetSlot.id) {
        return false;
      }
      // Compare hunger only for zero vs non-zero changes
      // This is so that the background of the pet slot changes when the hunger changes
      const aHungerZero = aPetSlot.hunger === 0;
      const bHungerZero = bPetSlot.hunger === 0;
      if (aHungerZero !== bHungerZero) {
        return false;
      }
      // Compare strength only for non-zero changes
      // This is so that the pet slot changes when the strength changes
      const aStrength = getStrength({
        speciesId: aPetSlot.petSpecies,
        xp: aPetSlot.xp,
        targetScale: aPetSlot.targetScale,
      });
      const bStrength = getStrength({
        speciesId: bPetSlot.petSpecies,
        xp: bPetSlot.xp,
        targetScale: bPetSlot.targetScale,
      });
      if (aStrength !== bStrength) {
        return false;
      }
      if (aPetSlot.name !== bPetSlot.name) {
        return false;
      }
      return true;
    });
  }
);

export const expandedPetSlotIdAtom = atom<string | null>(null);

export const setExpandedPetSlotId = (petId: string | null) => {
  set(expandedPetSlotIdAtom, petId);
};

/**
 * My Pet Progress
 */
export const myPetsProgressAtom = nonPrimitiveAtom<
  Record<
    string,
    {
      name: string;
      hunger: number;
      xp: number;
      targetScale: number;
      speciesId: FaunaSpeciesId;
      mutations: MutationId[];
    }
  >
>((get) => {
  const petInventory = get(myPetInventoryAtom);
  const petSlots = get(myPrimitivePetSlotsAtom);
  const petHutchItems = get(myPetHutchPetItemsAtom);
  const allPets = [...petInventory, ...petSlots, ...petHutchItems];

  const petProgress: Record<
    string,
    {
      name: string;
      hunger: number;
      xp: number;
      targetScale: number;
      speciesId: FaunaSpeciesId;
      mutations: MutationId[];
    }
  > = {};
  allPets.forEach((pet) => {
    petProgress[pet.id] = {
      speciesId: pet.petSpecies,
      name: pet.name ?? faunaSpeciesDex[pet.petSpecies].name,
      hunger: pet.hunger,
      xp: pet.xp,
      targetScale: pet.targetScale,
      mutations: pet.mutations,
    };
  });

  return petProgress;
});

/**
 * My Crop Mutation Pet Details
 * Gets pets with ProduceMutationBoost abilities and their calculated percentage values
 */
export const myActiveCropMutationPetsAtom = nonPrimitiveAtom((get) => {
  const myPetSlots = get(myNonPrimitivePetSlotsAtom);
  if (!myPetSlots) {
    return [];
  }
  const cropMutationPets: {
    speciesId: FaunaSpeciesId;
    mutations: MutationId[];
    mutationChanceIncreasePercentage: number;
  }[] = [];

  myPetSlots.forEach((slot) => {
    const {
      petSpecies: speciesId,
      hunger,
      xp,
      targetScale,
      mutations,
      abilities,
    } = slot;

    if (hunger <= 0) {
      return;
    }
    const cropMutationAbilities: FaunaAbilityId[] = [];

    for (const ability of [
      'ProduceMutationBoost',
      'ProduceMutationBoostII',
    ] as const) {
      if (!abilities.includes(ability)) {
        continue;
      }
      cropMutationAbilities.push(ability);
    }
    if (cropMutationAbilities.length > 0) {
      const strengthScaleFactor = getStrengthScaleFactor({
        speciesId,
        xp,
        targetScale,
      });
      let mutationChanceIncreasePercentage = 0;

      cropMutationAbilities.forEach((ability) => {
        const bluePrint = faunaAbilitiesDex[ability];
        const baseChance =
          'mutationChanceIncreasePercentage' in bluePrint.baseParameters
            ? bluePrint.baseParameters.mutationChanceIncreasePercentage
            : 0;
        mutationChanceIncreasePercentage += baseChance * strengthScaleFactor;
      });
      cropMutationPets.push({
        speciesId,
        mutations,
        mutationChanceIncreasePercentage,
      });
    }
  });
  return cropMutationPets;
});

/**
 * Set the selected item index to the next item in the expanded pet diet
 * This is used to advance the selection to the next item in the expanded pet diet
 */
export const setSelectedIndexToNextItemInPetDiet = () => {
  const expandedPetSlotId = get(expandedPetSlotIdAtom);
  if (!expandedPetSlotId) {
    return;
  }
  const myInventoryItems = get(myInventoryItemsAtom);
  const myFavoritedItemIds = get(myFavoritedItemIdsAtom);
  const selectedItem = get(mySelectedItemAtom);
  const petsProgress = get(myPetsProgressAtom);
  const { speciesId } = petsProgress[expandedPetSlotId];
  const { diet } = faunaSpeciesDex[speciesId];
  // Filter out the selected item because it's being fed to the pet
  const newInventoryItems = myInventoryItems.filter(
    (item) => item !== selectedItem
  );
  const itemInDiet = newInventoryItems
    .filter((item) => item.itemType === ItemType.Produce)
    .filter((item) => diet.some((species) => species === item.species));
  // Sort items in diet with favorited items at the end
  const sortedItemsInDiet = itemInDiet.sort((a, b) => {
    const aIsFavorited = myFavoritedItemIds.includes(a.id);
    const bIsFavorited = myFavoritedItemIds.includes(b.id);
    if (aIsFavorited === bIsFavorited) {
      return 0;
    }
    return aIsFavorited ? 1 : -1;
  });
  // Get the first item (preferring non-favorited items)
  const nextItemInDiet = sortedItemsInDiet[0];

  const nextItemIndex = newInventoryItems.indexOf(nextItemInDiet);
  set(myPossiblyNoLongerValidSelectedItemIndexAtom, nextItemIndex);
};

export const myStatsAtom = atom((get) => {
  const myData = get(myDataAtom);
  return myData?.stats;
});

/**
 * My Activity Logs
 * Returns the array of activity log entries for the current player
 */
export const myActivityLogsAtom = nonPrimitiveAtom((get) => {
  const myData = get(myDataAtom);
  return myData?.activityLogs ?? [];
});
