import { type Atom, atom, getDefaultStore } from 'jotai';
import { useEffect, useRef } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import type { QuinoaMessage } from '@/common/games/Quinoa/messages';
import { getSpawnPosition } from '@/common/games/Quinoa/world/map';
import { mapAtom } from '@/Quinoa/atoms/mapAtoms';
import { activeModalAtom } from '@/Quinoa/atoms/modalAtom';
import {
  lastPositionInMyGardenAtom,
  positionAtom,
} from '@/Quinoa/atoms/positionAtoms';
import { actionAtom } from '@/Quinoa/data/action/actionAtom';
import { clearActionWaitingTimeout } from '@/Quinoa/data/action/executeAction/executeAction';
import {
  isInMyGardenAtom,
  myCurrentGrowSlotIndexAtom,
  myCurrentSortedGrowSlotIndicesAtom,
  myUserSlotIdxAtom,
  myValidatedSelectedItemIndexAtom,
} from '../../atoms/myAtoms';
import { sendQuinoaMessage } from '../../utils/sendQuinoaMessage';
import QuinoaCanvas from './QuinoaCanvas';

/**
 * Tracks the last slot index that was actually rendered/displayed.
 * Persists through null transitions (e.g., during reconnections) to prevent
 * re-triggering teleport and establishing shot animations when returning to
 * the same slot after a temporary disconnection.
 */
const myLastRenderedSlotIndexAtom = atom<number | null>(null);

const { get, set, sub } = getDefaultStore();

/**
 * QuinoaCanvasWrapper handles React-level side effects for the Quinoa game.
 *
 * Responsibilities:
 * - Atom subscriptions for sounds (modal open/close)
 * - Position change side effects (grow slot reset, modal close)
 * - Selected item WebSocket sync
 *
 * The actual rendering and game loop is handled by QuinoaCanvas via PixiJS Ticker.
 */
const QuinoaCanvasWrapper: React.FC = () => {
  const prevActiveModal = useRef(get(activeModalAtom));
  const prevPosition = useRef(get(positionAtom));

  useEffect(() => {
    // Define atom handlers in a Map to avoid code duplication
    // These handle React-level side effects (sounds, establishing shot, etc.)
    // Movement and rendering is handled by QuinoaCanvas via PixiJS Ticker
    const atomHandlers = new Map<Atom<unknown>, () => void>([
      [
        myLastRenderedSlotIndexAtom,
        () => {
          const lastSeenAssignedSlotIndex = get(myLastRenderedSlotIndexAtom);
          const currentSlotIndex = get(myUserSlotIdxAtom);
          if (
            lastSeenAssignedSlotIndex === currentSlotIndex ||
            currentSlotIndex === null
          ) {
            return;
          }
          // Start at spawn position
          const spawnPosition = getSpawnPosition(
            get(mapAtom),
            currentSlotIndex
          );
          if (!spawnPosition) {
            return;
          }
          set(positionAtom, spawnPosition);
          set(lastPositionInMyGardenAtom, spawnPosition);
          sendQuinoaMessage({
            type: 'Teleport',
            position: spawnPosition,
          });
          set(myLastRenderedSlotIndexAtom, currentSlotIndex);
        },
      ],
      [
        activeModalAtom,
        () => {
          const prev = prevActiveModal.current;
          const activeModal = get(activeModalAtom);
          switch (activeModal) {
            case 'journal':
              playSfx('Journal_Opens');
              break;
            case 'eggShop':
            case 'toolShop':
            case 'seedShop':
            case 'decorShop':
              playSfx('Shop_Open');
              break;
            case 'inventory':
            case 'leaderboard':
            case 'stats':
            case 'petHutch':
            case 'activityLog':
            case null:
            default:
              break;
          }
          switch (prev) {
            case 'journal':
              if (activeModal === null) {
                playSfx('Journal_Closes');
              }
              break;
            case 'eggShop':
            case 'toolShop':
            case 'seedShop':
            case 'inventory':
            case 'petHutch':
            case 'leaderboard':
            case 'decorShop':
            case 'stats':
            case 'activityLog':
            case null:
              break;
            default:
              break;
          }
          prevActiveModal.current = activeModal;
        },
      ],
      [
        myValidatedSelectedItemIndexAtom,
        () => {
          const selectedItemIndex = get(myValidatedSelectedItemIndexAtom);
          const message: QuinoaMessage = {
            type: 'SetSelectedItem',
            itemIndex: selectedItemIndex,
          };
          sendQuinoaMessage(message);
        },
      ],
      [
        positionAtom,
        () => {
          /**
           * Subscribe to the player position to reset the grow slot index when the player moves
           */
          const growSlotIndices = get(myCurrentSortedGrowSlotIndicesAtom);
          set(myCurrentGrowSlotIndexAtom, growSlotIndices?.[0] ?? 0);
          const isInMyGarden = get(isInMyGardenAtom);
          if (isInMyGarden) {
            set(lastPositionInMyGardenAtom, get(positionAtom));
          }
          // If your position changes, you don't want to do the new action, even if the action is the same.
          // For example, if you're shoveling a plant and you move to a new position, you don't want to shovel the new plant.
          clearActionWaitingTimeout();
          const activeModal = get(activeModalAtom);
          // Close the pet hutch modal if you move out of the hutch tile.
          if (activeModal === 'petHutch') {
            set(activeModalAtom, null);
          }
          prevPosition.current = get(positionAtom);
        },
      ],
      [
        actionAtom,
        () => {
          // Subscribe to the actionAtom and clear the action waiting timeout when the action changes.
          // If you're waiting for an action and the action changes, you don't want to do the new action.
          // For example, if you're holding the insta-grow button and the grow slot matures while you're
          // waiting it should cancel your insta-grow.
          clearActionWaitingTimeout();
        },
      ],
    ]);
    // Initialize by running all handlers once with current atom values
    atomHandlers.forEach((handler) => handler());
    // Set up subscriptions
    const unsubscribes = Array.from(atomHandlers.entries()).map(
      ([atom, handler]) => sub(atom, handler)
    );
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
    };
  }, []);

  return <QuinoaCanvas />;
};

export default QuinoaCanvasWrapper;
