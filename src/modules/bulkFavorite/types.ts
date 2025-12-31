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

export const STORAGE_KEY = 'gemini:features:bulkFavorite';

export const DEFAULT_CONFIG: BulkFavoriteConfig = {
    enabled: false,
    position: 'top-right',
};
