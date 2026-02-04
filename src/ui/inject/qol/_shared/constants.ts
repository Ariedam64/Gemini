/**
 * Shared constants for journal QOL injections
 *
 * Variant lists used by journalHints, abilitiesInject, and journalAllTab.
 */

/**
 * All crop variant IDs in journal display order.
 * Source: game journal petJournalVariants + mutations dex
 */
export const CROP_VARIANT_IDS = [
    'Normal',
    'Wet',
    'Chilled',
    'Frozen',
    'Dawnlit',
    'Ambershine',
    'Gold',
    'Rainbow',
    'Dawncharged',
    'Ambercharged',
    'Max Weight',
] as const;

/**
 * All pet variant IDs in journal display order.
 * Source: common/games/Quinoa/systems/journal/index.ts petJournalVariants
 */
export const PET_VARIANT_IDS = [
    'Normal',
    'Gold',
    'Rainbow',
    'Max Weight',
] as const;

/**
 * Abilities excluded from journal tracking (shown as variant stamps instead).
 */
export const EXCLUDED_ABILITY_IDS = [
    'RainbowGranter',
    'GoldGranter',
] as const;
