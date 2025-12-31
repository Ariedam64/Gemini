/**
 * BulkFavorite Feature - Public API
 * 
 * Level 3: Re-exports from all modules
 */

// Types
export type { BulkFavoriteConfig, BulkFavoritePosition } from './types';
export { DEFAULT_CONFIG, STORAGE_KEY } from './types';

// State
export { loadConfig, saveConfig, setPosition, isEnabled } from './state';

// Logic
export { bulkFavorite } from './logic';

// Render (lifecycle)
export {
    startWatching as start,
    stopWatching as stop,
    setEnabled,
    renderButton,
    removeButton,
} from './render';
