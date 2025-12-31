/**
 * AutoFavorite Feature - Public API
 * 
 * Level 3: Re-exports from types, state, logic
 * This is the ONLY file external code should import from
 */

// Types
export type {
    AutoFavoriteConfig,
    SimpleAutoFavoriteConfig,
    FavoriteableItem,
} from './types';

export { DEFAULT_CONFIG, STORAGE_KEY } from './types';

// State
export {
    loadConfig,
    saveConfig,
    updateConfig,
    updateSimpleConfig,
    setFavoriteSpecies,
    setFavoriteMutations,
    isEnabled,
} from './state';

// Logic
export {
    start,
    stop,
    setEnabled,
    shouldFavorite,
    getGameMutations,
} from './logic';
