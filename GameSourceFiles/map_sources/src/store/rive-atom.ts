import { atom } from 'jotai';
import { loadable } from 'jotai/utils';
import { BinaryFileCache } from '@/utils/BinaryFileCache';
import { createLowLevelRive } from '@/utils/rive-utils';

/**
 * Atom that provides a single (global) loadable instance of the low-level Rive runtime
 *
 * This atom wraps the creation of the Rive runtime in a loadable state,
 * allowing components to track the loading status and handle the async
 * initialization of the Rive runtime. The atom will have states:
 * - 'loading': While the Rive runtime is being initialized
 * - 'hasError': If initialization fails
 * - 'hasData': When the runtime is successfully loaded and ready to use
 *
 * @example
 * ```tsx
 * const loadableLowLevelRive = useAtomValue(lowLevelRiveAtom);
 *
 * if (loadableLowLevelRive.state === 'hasData') {
 *   // Use loadableLowLevelRive.data
 * }
 * ```
 */
export const lowLevelRiveAtom = loadable(atom(createLowLevelRive()));

export const globalRiveFileBinaryCache = new BinaryFileCache(
  'GlobalRiveBinaryFileCache'
);
