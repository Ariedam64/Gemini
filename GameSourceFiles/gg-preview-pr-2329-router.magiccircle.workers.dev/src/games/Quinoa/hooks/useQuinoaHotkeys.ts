import { getDefaultStore, useSetAtom } from 'jotai';
import { useEffect, useRef } from 'react';
import { hotkeyBeingPressedAtom } from '@/Quinoa/atoms/hotkeyAtoms';
import { myInventoryItemsAtom } from '@/Quinoa/atoms/inventoryAtoms';
import { tileSizeAtom } from '@/Quinoa/atoms/mapAtoms';
import { activeModalAtom } from '@/Quinoa/atoms/modalAtom';
import {
  flipDecorHorizontal,
  rotateDecorClockwise,
  rotateDecorCounterClockwise,
} from '@/Quinoa/utils/orientDecor';
import { ZoomConfig } from '../../../hooks/useZoom';
import {
  explicitlySelectItem,
  goToNextAvailableGrowSlotIndex,
  goToPreviousAvailableGrowSlotIndex,
} from '../atoms/myAtoms';
import {
  clearActionWaitingTimeout,
  executeAction,
} from '../data/action/executeAction/executeAction';
import { teleport } from '../World/teleport';

const { get, set } = getDefaultStore();

type HotkeyAction = () => void;

const hotkeyConfig = new Map<string, HotkeyAction>([
  // Action button
  ['Space', () => executeAction()],
  // Escape key - close any active modal
  ['Escape', () => set(activeModalAtom, null)],
  // Inventory
  ['e', () => toggleInventory()],
  ['x', () => goToPreviousAvailableGrowSlotIndex()],
  ['c', () => goToNextAvailableGrowSlotIndex()],
  // Rotation
  ['r', () => rotateDecorClockwise()],
  ['Shift+r', () => rotateDecorCounterClockwise()],
  ['t', () => flipDecorHorizontal()],
  // Zoom keys
  ['=', () => zoomIn()],
  ['-', () => zoomOut()],
  // Teleport keys (with shift)
  ['Shift+1', () => teleport('seedShop')],
  ['Shift+2', () => teleport('myGarden')],
  ['Shift+3', () => teleport('sellCropsShop')],
  // Inventory keys (1-9)
  ['1', () => selectInventoryItem(0)],
  ['2', () => selectInventoryItem(1)],
  ['3', () => selectInventoryItem(2)],
  ['4', () => selectInventoryItem(3)],
  ['5', () => selectInventoryItem(4)],
  ['6', () => selectInventoryItem(5)],
  ['7', () => selectInventoryItem(6)],
  ['8', () => selectInventoryItem(7)],
  ['9', () => selectInventoryItem(8)],
]);

export const useQuinoaHotkeys = () => {
  const isKeyPressed = useRef<boolean>(false);
  const setActiveHotkey = useSetAtom(hotkeyBeingPressedAtom);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyString = generateKeyString(e);
      // Skip if no keyString (e.g., Cmd/Ctrl/Alt modifiers)
      if (!keyString) {
        return;
      }
      // Find matching hotkey action
      const action = hotkeyConfig.get(keyString);
      if (action && !isKeyPressed.current) {
        e.preventDefault();
        isKeyPressed.current = true;
        setActiveHotkey(keyString);
        action();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const keyString = generateKeyString(e);
      // Skip if no keyString (e.g., Cmd/Ctrl/Alt modifiers)
      if (!keyString) {
        return;
      }
      // Reset isKeyPressed when any tracked key is released
      if (hotkeyConfig.has(keyString)) {
        e.preventDefault();
        isKeyPressed.current = false;
        setActiveHotkey(null);
      }
      clearActionWaitingTimeout();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
};

function generateKeyString(e: KeyboardEvent): string {
  // Convert e.code to e.key for number keys
  let keyToCheck = e.key;
  if (e.code.startsWith('Digit')) {
    keyToCheck = e.code.replace('Digit', '');
  }
  if (e.code === 'Space') {
    keyToCheck = 'Space';
  }
  // Normalize letters to lowercase so CapsLock/Shift don't break letter hotkeys
  const isLetter = keyToCheck.length === 1 && /[a-z]/i.test(keyToCheck);
  if (isLetter) {
    keyToCheck = keyToCheck.toLowerCase();
  }
  // Don't handle keys with Cmd/Ctrl/Alt modifiers (let browser handle them)
  if (e.metaKey || e.ctrlKey || e.altKey) {
    return '';
  }
  // Include Shift modifier for non-letter keys or specific letter combinations
  const shiftAllowedLetters = ['r']; // Letters that can be used with Shift modifier
  const shouldIncludeShift =
    e.shiftKey && (!isLetter || shiftAllowedLetters.includes(keyToCheck));
  return shouldIncludeShift ? `Shift+${keyToCheck}` : keyToCheck;
}

function zoomIn() {
  const currentTileSize = get(tileSizeAtom);
  set(
    tileSizeAtom,
    Math.min(
      currentTileSize * ZoomConfig.keyboardStepMultiplier,
      ZoomConfig.maxTileSize
    )
  );
}

function zoomOut() {
  const currentTileSize = get(tileSizeAtom);
  set(
    tileSizeAtom,
    Math.max(
      currentTileSize / ZoomConfig.keyboardStepMultiplier,
      ZoomConfig.minTileSize
    )
  );
}

function toggleInventory() {
  const current = get(activeModalAtom);
  set(activeModalAtom, current === 'inventory' ? null : 'inventory');
}

function selectInventoryItem(index: number) {
  const inventoryItems = get(myInventoryItemsAtom);
  if (index < inventoryItems.length) {
    explicitlySelectItem(index);
  }
}
