/**
 * BulkFavorite Feature - Type Definitions
 * 
 * Level 0: No imports from this feature
 */

// ─────────────────────────────────────────────────────────────────────────────
// Config Types
// ─────────────────────────────────────────────────────────────────────────────

export type BulkFavoritePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface BulkFavoriteConfig {
    enabled: boolean;
    position: BulkFavoritePosition;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

// Import storage key from centralized registry (per .claude/rules/core.md #4)
import { MODULE_KEYS } from '../../utils/storage';

export const STORAGE_KEY = MODULE_KEYS.BULK_FAVORITE;

export const DEFAULT_CONFIG: BulkFavoriteConfig = {
    enabled: false,
    position: 'top-right',
};
