import { getDefaultStore } from 'jotai';
import { serverClientTimeOffsetAtom } from '../atoms/timeAtoms';

// Cache the offset value to avoid expensive atom reads on every call
let cachedOffset = 0;

const store = getDefaultStore();

// Subscribe to atom changes to keep cache updated
// This mounts the atom, enabling Jotai's fast path for mounted atoms
store.sub(serverClientTimeOffsetAtom, () => {
  cachedOffset = store.get(serverClientTimeOffsetAtom);
});

// Initialize the cache
cachedOffset = store.get(serverClientTimeOffsetAtom);

/**
 * Calculates the current server time based on the client time and the server
 * time offset.
 *
 * Note that this function is fast, but still has overhead if you're
 * gonna call it 100,000 times a second, which is surprisingly easy to do when
 * rendering the game world! So prefer using the frame-level cached value instead.
 *
 * @returns The current server time in milliseconds since the Unix epoch.
 */
export function calculateServerNow() {
  return Date.now() - cachedOffset;
}
