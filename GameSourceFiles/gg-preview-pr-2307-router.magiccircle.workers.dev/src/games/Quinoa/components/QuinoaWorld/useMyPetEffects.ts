import { useLingui } from '@lingui/react/macro';
import { atom, useAtom, useAtomValue } from 'jotai';
import { isEqual } from 'lodash';
import { useCallback, useEffect, useRef } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import {
  faunaAbilitiesDex,
  faunaSpeciesDex,
} from '@/common/games/Quinoa/systems/fauna';
import {
  type CardinalDirection,
  DirectionMap,
  type GridPosition,
  getGlobalTileIndexFromCoordinate,
  getSpawnPosition,
} from '@/common/games/Quinoa/world/map';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import { positionAtom } from '@/Quinoa/atoms/positionAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { playPetSoundEffect } from '@/Quinoa/audio';
import { getAbilityTriggerDescription } from '@/Quinoa/components/abilities/AbilityDescriptions';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import { useInterval } from '@/utils';
import { currentTimeAtom } from '../../atoms/baseAtoms';
import { mapAtom } from '../../atoms/mapAtoms';
import {
  myNonPrimitivePetSlotsAtom,
  myPetSlotInfosAtom,
  myPetsProgressAtom,
  myUserSlotIdxAtom,
  setExpandedPetSlotId,
} from '../../atoms/myAtoms';

export const myPetPositionsAtom = atom<Record<string, GridPosition>>({});

const useMyPetEffects = () => {
  const map = useAtomValue(mapAtom);
  const position = useAtomValue(positionAtom);
  const myPetSlots = useAtomValue(myNonPrimitivePetSlotsAtom);
  const myPetSlotInfos = useAtomValue(myPetSlotInfosAtom);
  const myPetsProgress = useAtomValue(myPetsProgressAtom);
  const myUserSlotIdx = useAtomValue(myUserSlotIdxAtom);
  const currentTime = useAtomValue(currentTimeAtom);
  const [myPetPositions, setMyPetPositions] = useAtom(myPetPositionsAtom);
  const { t } = useLingui();

  const getInitialPetPosition = useCallback(() => {
    if (myUserSlotIdx === null) {
      return;
    }
    const spawnPosition = getSpawnPosition(map, myUserSlotIdx);
    if (!spawnPosition) {
      return;
    }
    // Move the pet 100 times to get it to a random position
    const initialPosition = getNewPetPosition(spawnPosition, 100);
    return initialPosition;
  }, [map, myUserSlotIdx]);

  const isValidMovePosition = useCallback(
    (x: number, y: number) => {
      if (myUserSlotIdx === null) {
        return false;
      }
      const isAnotherPetAlreadyHere = Object.values(myPetPositions)
        .filter((position) => position !== undefined)
        .some((position) => position.x === x && position.y === y);

      const isPlayerAlreadyHere =
        position && x === position.x && y === position.y;

      if (isAnotherPetAlreadyHere || isPlayerAlreadyHere) {
        return false;
      }
      const tileIndex = getGlobalTileIndexFromCoordinate(map, x, y);
      const dirtTile = map.globalTileIdxToDirtTile[tileIndex];
      const boardwalkTile = map.globalTileIdxToBoardwalk[tileIndex];
      if (
        dirtTile?.userSlotIdx === myUserSlotIdx ||
        boardwalkTile?.userSlotIdx === myUserSlotIdx
      ) {
        return true;
      }
      return false;
    },
    [map, myUserSlotIdx, myPetPositions, position]
  );

  const getNewPetPosition = useCallback(
    (
      currentPosition: GridPosition,
      numMoves: number = 1
    ): GridPosition | undefined => {
      let newPosition = { ...currentPosition };
      for (let i = 0; i < numMoves; i++) {
        const validDirections: CardinalDirection[] = [];
        for (const direction of Object.keys(
          DirectionMap
        ) as CardinalDirection[]) {
          const { x, y } = DirectionMap[direction];
          const newX = newPosition.x + x;
          const newY = newPosition.y + y;
          if (isValidMovePosition(newX, newY)) {
            validDirections.push(direction);
          }
        }
        if (validDirections.length > 0) {
          const randomDirection =
            validDirections[Math.floor(Math.random() * validDirections.length)];
          const { x, y } = DirectionMap[randomDirection];
          newPosition = {
            x: newPosition.x + x,
            y: newPosition.y + y,
          };
        }
      }
      return newPosition;
    },
    [myUserSlotIdx, isValidMovePosition]
  );

  // Initialize myPetPositions with existing position from the server
  const hasInitializedPetPositionsRef = useRef(false);
  const lastInitializedSlotIdxRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset positions when user slot changes (player moved to different garden)
    if (lastInitializedSlotIdxRef.current !== myUserSlotIdx) {
      hasInitializedPetPositionsRef.current = false;
      lastInitializedSlotIdxRef.current = myUserSlotIdx;
      setMyPetPositions({});
      return;
    }
    if (myPetSlotInfos === null || hasInitializedPetPositionsRef.current) {
      return;
    }
    const positions: Record<string, GridPosition> = {};
    for (const [petId, petSlotInfo] of Object.entries(myPetSlotInfos)) {
      positions[petId] = petSlotInfo.position;
    }
    setMyPetPositions(positions);
    hasInitializedPetPositionsRef.current = true;
  }, [myPetSlotInfos, myUserSlotIdx]);

  useInterval(() => {
    if (!myPetSlots || myUserSlotIdx === null) {
      return;
    }
    const newPetPositions = { ...myPetPositions };

    myPetSlots.forEach((slot) => {
      const currentPosition = myPetPositions[slot.id];
      if (currentPosition) {
        const isHungerEmpty = slot.hunger <= 0;
        if (isHungerEmpty) {
          return;
        }
        const moveProbability =
          faunaSpeciesDex[slot.petSpecies].moveProbability;
        if (Math.random() > moveProbability) {
          return;
        }
        const newPosition = getNewPetPosition(currentPosition);
        if (newPosition) {
          newPetPositions[slot.id] = newPosition;
        }
      } else {
        const initialPosition = getInitialPetPosition();
        if (initialPosition) {
          newPetPositions[slot.id] = initialPosition;
        }
      }
    });
    const hasPositionsChanged = !isEqual(myPetPositions, newPetPositions);
    if (!hasPositionsChanged) {
      return;
    }
    setMyPetPositions(newPetPositions);
    sendQuinoaMessage({
      type: 'PetPositions',
      petPositions: newPetPositions,
    });
  }, 1000);

  const lastAbilityTriggerTimestampsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    if (!myPetSlotInfos) {
      return;
    }
    Object.entries(myPetSlotInfos).forEach(([petId, petSlotInfo]) => {
      const trigger = petSlotInfo.lastAbilityTrigger;
      if (!trigger) {
        return;
      }
      const lastSeen = lastAbilityTriggerTimestampsRef.current[petId];
      if (lastSeen && lastSeen >= trigger.performedAt) {
        return;
      }
      // If the toast's performed at is older than 3 seconds, don't show it.
      // This prevents toast from appearing more than once when the user reloads the page.
      const millisecondsToConsiderToastStale = 3000;
      if (
        currentTime - trigger.performedAt >
        millisecondsToConsiderToastStale
      ) {
        return;
      }
      const petSlot = myPetSlots?.find((slot) => slot.id === petId);
      if (!petSlot) {
        return;
      }
      const { name: defaultName, tileRef } =
        faunaSpeciesDex[petSlot.petSpecies];
      const name = petSlot.name ?? defaultName;

      if (trigger.isHungerEmpty) {
        const abilityTrigger = faunaAbilitiesDex[trigger.abilityId].trigger;
        // Throttle hunger empty toasts to prevent spam
        const throttleMilliseconds = 20_000;
        if (
          trigger.performedAt - lastSeen < throttleMilliseconds &&
          abilityTrigger === 'continuous'
        ) {
          return;
        }
        const abilityName = faunaAbilitiesDex[trigger.abilityId].name;
        const title = t`${abilityName} failed!`;
        const description = t`Feed ${name} to activate this ability.`;
        const mutations = petSlot.mutations;

        sendQuinoaToast({
          toastType: 'default',
          title,
          description,
          icon: tileRef,
          mutations,
          variant: 'error',
          onClick: () => setExpandedPetSlotId(petId),
        });
        playSfx('Pet_Hungry');
        lastAbilityTriggerTimestampsRef.current[petId] = trigger.performedAt;
        return;
      }
      if (trigger.data) {
        const description = getAbilityTriggerDescription(
          name,
          trigger.abilityId,
          trigger.data
        );
        if (!description) {
          return;
        }
        const mutations = petSlot.mutations;
        const title = faunaAbilitiesDex[trigger.abilityId].name;

        sendQuinoaToast({
          toastType: 'default',
          title,
          description,
          icon: tileRef,
          mutations,
          // Assume that every ability trigger has an activity log
          onClick: openActivityLogModal,
        });
        playPetSoundEffect(petSlot.petSpecies);
        playSfx('Pet_EffectActive');

        lastAbilityTriggerTimestampsRef.current[petId] = trigger.performedAt;
      }
    });
  }, [myPetSlotInfos, myPetsProgress]);
};

export default useMyPetEffects;
