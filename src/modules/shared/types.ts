/**
 * Shared TypeScript types for Phase 2 features
 */

/**
 * Inventory item from myInventory global
 */
export interface InventoryItem {
    id: string;
    itemId: string;
    itemType: 'Produce' | 'Seed' | 'Pet' | 'Decor' | 'Currency';
    species: string;
    isFavorited: boolean;
    weight?: number;
    scale?: number;
    targetScale?: number;
    mutations?: string[];
    raw?: Record<string, unknown>;
}

/**
 * Pet data from myPets global
 */
export interface PetData {
    id: string;
    species: string;
    petScale: number;
    targetScale: number;
    hunger: number;
    age: number;
    xp: number;
    abilityIds: string[];
    currentStrength?: number;
    maxStrength?: number;
    isMature?: boolean;
}

/**
 * Crop data from myGarden global
 */
export interface CropData {
    tileIndex: number;
    species: string;
    weight: number;
    scale: number;
    targetScale: number;
    mutations: string[];
    growth: number; // 0-1
    isMature: boolean;
}
