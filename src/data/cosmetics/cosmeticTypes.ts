// src/data/cosmetics/cosmeticTypes.ts
// Shared cosmetic type definitions for avatar system

/**
 * Cosmetic item slot type (which part of the avatar it covers)
 */
export type CosmeticType = 'Top' | 'Mid' | 'Bottom' | 'Expression';

/**
 * How a cosmetic item becomes available to the player
 */
export type CosmeticAvailability = 'default' | 'purchasable' | 'reward' | 'seasonal';

/**
 * A cosmetic item discovered from the game manifest or defined as a critical default
 */
export interface CosmeticItem {
    /** Unique identifier (typically the filename) */
    id: string;
    /** Filename (e.g. "Top_WizardHat.png") */
    filename: string;
    /** Slot type */
    type: CosmeticType;
    /** How the item is obtained */
    availability: CosmeticAvailability;
    /** Human-readable display name */
    displayName: string;
    /** Shop price (0 for non-purchasable items) */
    price: number;
}
