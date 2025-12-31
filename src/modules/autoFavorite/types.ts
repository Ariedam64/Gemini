/**
 * AutoFavorite Feature - Type Definitions
 * 
 * Level 0: No imports from this feature
 */

// ─────────────────────────────────────────────────────────────────────────────
// Config Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SimpleAutoFavoriteConfig {
    enabled: boolean;
    favoriteSpecies: string[];
    favoriteMutations: string[];
}

export interface AutoFavoriteConfig {
    enabled: boolean;
    mode: 'simple';
    simple: SimpleAutoFavoriteConfig;
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const STORAGE_KEY = 'gemini:features:autoFavorite';

export const DEFAULT_CONFIG: AutoFavoriteConfig = {
    enabled: false,
    mode: 'simple',
    simple: {
        enabled: false,
        favoriteSpecies: [],
        favoriteMutations: [],
    },
};

// ─────────────────────────────────────────────────────────────────────────────
// Item Types (for type safety)
// ─────────────────────────────────────────────────────────────────────────────

export interface FavoriteableItem {
    id: string;
    itemType: 'Produce' | 'Pet' | string;
    species?: string;
    petSpecies?: string;
    mutations?: string[];
    isFavorited?: boolean;
    favorited?: boolean;
}
