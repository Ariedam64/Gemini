import { getDefaultStore } from 'jotai';
import {
  type GridPosition,
  getTilePosition,
  type LocationName,
} from '@/common/games/Quinoa/world/map';
import { AvatarTriggerAnimationName } from '@/components/Avatars/avatarRiveConstants';
import { avatarTriggerAnimationAtom } from '@/Quinoa/atoms/avatarAtoms';
import { activeModalAtom } from '@/Quinoa/atoms/modalAtom';
import {
  lastPositionInMyGardenAtom,
  positionAtom,
} from '@/Quinoa/atoms/positionAtoms';
import { playerIdAtom } from '@/store/store';
import { mapAtom } from '../atoms/mapAtoms';
import {
  myCurrentGlobalTileIndexAtom,
  myUserSlotIdxAtom,
} from '../atoms/myAtoms';
import { sendQuinoaMessage } from '../utils/sendQuinoaMessage';

/**
 * Enum representing possible teleportation destinations in the game world
 */
export type TeleportationDestination = LocationName | 'myGarden';

/**
 * Teleports the player to the specified destination
 * @param destination - The destination to teleport to
 */
export function teleport(destination: TeleportationDestination) {
  const { get, set } = getDefaultStore();
  const map = get(mapAtom);
  const myId = get(playerIdAtom);
  const mySlotIdx = get(myUserSlotIdxAtom);
  const myGlobalTileIndex = get(myCurrentGlobalTileIndexAtom);
  const myPosition = get(positionAtom);

  if (!myPosition || !myGlobalTileIndex) {
    return;
  }
  let destinationPosition: GridPosition | null = myPosition;

  switch (destination) {
    case 'myGarden':
      if (mySlotIdx === null) {
        console.warn('My slot index is null');
        break;
      }
      destinationPosition = get(lastPositionInMyGardenAtom);
      break;
    case 'seedShop':
      if (map.locations.seedShop.spawnTileIdx.includes(myGlobalTileIndex)) {
        destinationPosition = get(positionAtom);
      } else {
        const randomSpawnTileIdx =
          map.locations.seedShop.spawnTileIdx[
            Math.floor(
              Math.random() * map.locations.seedShop.spawnTileIdx.length
            )
          ];
        destinationPosition = getTilePosition(map, randomSpawnTileIdx);
      }
      break;
    case 'toolShop':
      if (map.locations.toolShop.spawnTileIdx.includes(myGlobalTileIndex)) {
        destinationPosition = get(positionAtom);
      } else {
        const randomSpawnTileIdx =
          map.locations.toolShop.spawnTileIdx[
            Math.floor(
              Math.random() * map.locations.toolShop.spawnTileIdx.length
            )
          ];
        destinationPosition = getTilePosition(map, randomSpawnTileIdx);
      }
      break;
    case 'eggShop':
      if (map.locations.eggShop.spawnTileIdx.includes(myGlobalTileIndex)) {
        destinationPosition = get(positionAtom);
      } else {
        const randomSpawnTileIdx =
          map.locations.eggShop.spawnTileIdx[
            Math.floor(
              Math.random() * map.locations.eggShop.spawnTileIdx.length
            )
          ];
        destinationPosition = getTilePosition(map, randomSpawnTileIdx);
      }
      break;
    case 'decorShop':
      if (map.locations.decorShop.spawnTileIdx.includes(myGlobalTileIndex)) {
        destinationPosition = get(positionAtom);
      } else {
        const randomSpawnTileIdx =
          map.locations.decorShop.spawnTileIdx[
            Math.floor(
              Math.random() * map.locations.decorShop.spawnTileIdx.length
            )
          ];
        destinationPosition = getTilePosition(map, randomSpawnTileIdx);
      }
      break;
    case 'sellCropsShop':
      if (
        map.locations.sellCropsShop.spawnTileIdx.includes(myGlobalTileIndex)
      ) {
        destinationPosition = get(positionAtom);
      } else {
        const randomSpawnTileIdx =
          map.locations.sellCropsShop.spawnTileIdx[
            Math.floor(
              Math.random() * map.locations.sellCropsShop.spawnTileIdx.length
            )
          ];
        destinationPosition = getTilePosition(map, randomSpawnTileIdx);
      }
      break;
    case 'collectorsClub':
      if (
        map.locations.collectorsClub.spawnTileIdx.includes(myGlobalTileIndex)
      ) {
        destinationPosition = get(positionAtom);
      } else {
        const randomSpawnTileIdx =
          map.locations.collectorsClub.spawnTileIdx[
            Math.floor(
              Math.random() * map.locations.collectorsClub.spawnTileIdx.length
            )
          ];
        destinationPosition = getTilePosition(map, randomSpawnTileIdx);
      }
      break;
    case 'shopsCenter':
      if (map.locations.shopsCenter.spawnTileIdx.includes(myGlobalTileIndex)) {
        destinationPosition = get(positionAtom);
      } else {
        const randomSpawnTileIdx =
          map.locations.shopsCenter.spawnTileIdx[
            Math.floor(
              Math.random() * map.locations.shopsCenter.spawnTileIdx.length
            )
          ];
        destinationPosition = getTilePosition(map, randomSpawnTileIdx);
      }
      break;
    case 'sellPetShop':
    case 'wishingWell':
      break;
  }
  if (!destinationPosition) {
    return;
  }
  set(avatarTriggerAnimationAtom, {
    playerId: myId,
    animation: AvatarTriggerAnimationName.JoinGame,
  });
  sendQuinoaMessage({ type: 'Teleport', position: destinationPosition });
  set(positionAtom, destinationPosition);
  set(activeModalAtom, null);
}
