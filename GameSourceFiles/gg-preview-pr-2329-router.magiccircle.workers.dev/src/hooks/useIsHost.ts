import { useAtomValue } from 'jotai';
import { isHostAtom } from '@/store/store';

/**
 * Tracks whether the current player is the host.
 *
 * Note: If the host is not yet known, returns `true`. This is often a good
 * assumption because in any new room, the first player to join is the host.
 * More importantly... this assumption aligns with the preexisting behavior of
 * `isHostAtom`, which used to return `true` (not `null`) when the host was not yet
 * known.
 */
export const useIsHost = () => useAtomValue(isHostAtom) ?? true;
