/**
 * Shared calculator constants
 * Common constants used across calculation modules
 */

// ─────────────────────────────────────────────────────────────────────────────
// XP Mechanics (Game Constants)
// ─────────────────────────────────────────────────────────────────────────────

/** XP gained per hour for active, non-starving pets */
export const XP_PER_HOUR = 3600;

/** XP gained per second */
export const XP_PER_SECOND = 1;

/** Base target strength at targetScale = 1.0 */
export const BASE_TARGET_STRENGTH = 80;

/** Max target strength at targetScale = maxScale */
export const MAX_TARGET_STRENGTH = 100;

/** Strength gained from birth to maturity (30 levels) */
export const STRENGTH_GAINED = 30;

/** Number of strength levels (30) */
export const MAX_LEVELS = 30;

/** Rolls per hour for ability procs (3600 = 1 per second) */
export const ROLLS_PER_HOUR = 3600;

// ─────────────────────────────────────────────────────────────────────────────
// Pet Hunger Depletion (Wiki Data)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Pet hunger depletion times (minutes to fully deplete from 100%)
 * Source: Magic Garden Wiki (https://magicgarden.wiki/Pets)
 *
 * These are empirically measured constants from community testing.
 * NOT available in game source (server-side calculation).
 * Per .claude/rules/core.md - acceptable to hardcode wiki-sourced constants.
 *
 * VERIFIED from wiki 2026-01-06.
 */
export const PET_HUNGER_DEPLETION_MINUTES: Record<string, number> = {
    // Common pets
    Worm: 30,
    Snail: 60,
    Bee: 15,

    // Uncommon pets
    Chicken: 60,
    Bunny: 45,
    Dragonfly: 15,

    // Rare pets
    Pig: 60,
    Cow: 75,
    Turkey: 60,

    // Winter pets (confirmed from wiki 2026-01-06)
    SnowFox: 45,
    Stoat: 60,
    WhiteCaribou: 75,

    // Legendary pets
    Squirrel: 30,
    Turtle: 90,
    Goat: 60,

    // Mythical pets
    Butterfly: 30,
    Peacock: 60,
    Capybara: 60,
};
