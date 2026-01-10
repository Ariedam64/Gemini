import { atom } from 'jotai';

/**
 * Atom that tracks which hotkey is currently being pressed.
 *
 * This atom stores the string representation of the currently active hotkey
 * (e.g., 'Space', 'e', 'Shift+1', etc.) or null if no tracked hotkey is pressed.
 * It's used to provide visual feedback in the UI, such as highlighting the
 * action button when the Space key is held down.
 *
 * @example
 * ```ts
 * const activeHotkey = useAtomValue(hotkeyBeingPressed);
 * const isSpacePressed = activeHotkey === 'Space';
 * ```
 */
export const hotkeyBeingPressedAtom = atom<string | null>(null);
