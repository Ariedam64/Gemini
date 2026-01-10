/**
 * XP Tracker - XP Calculation Logic
 *
 * Pure utility functions for XP and strength calculations.
 * Based on verified game source: common/games/Quinoa/utils/pets.ts
 *
 * Level 2: Imports from types.ts
 */

import {
    XP_PER_HOUR,
    BASE_TARGET_STRENGTH,
    MAX_TARGET_STRENGTH,
    STRENGTH_GAINED,
} from '../types';
import { MGData } from '../../../modules/data';

// ─────────────────────────────────────────────────────────────────────────────
// Core XP Calculations (from game source)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get pet species data from MGData catalog
 */
export function getSpeciesData(species: string): { hoursToMature: number; maxScale: number } | null {
    const petsData = MGData.get('pets');
    if (!petsData) return null;

    const petEntry = petsData[species] as { hoursToMature?: number; maxScale?: number } | undefined;
    if (!petEntry) return null;

    return {
        hoursToMature: petEntry.hoursToMature ?? 0,
        maxScale: petEntry.maxScale ?? 1,
    };
}

/**
 * Calculate pet age in hours from XP
 * Formula: xp / 3600
 */
export function calculateAge(xp: number): number {
    return xp / XP_PER_HOUR;
}

/**
 * Calculate max strength based on targetScale
 * Formula (from game source):
 * - targetScale 1.0 = 80 strength
 * - targetScale maxScale = 100 strength
 * - Linear interpolation between
 */
export function calculateMaxStrength(species: string, targetScale: number): number {
    const speciesData = getSpeciesData(species);
    if (!speciesData) return BASE_TARGET_STRENGTH;

    const { maxScale } = speciesData;

    if (targetScale <= 1) return BASE_TARGET_STRENGTH;
    if (targetScale >= maxScale) return MAX_TARGET_STRENGTH;

    const progress = (targetScale - 1) / (maxScale - 1);
    return Math.floor(BASE_TARGET_STRENGTH + (MAX_TARGET_STRENGTH - BASE_TARGET_STRENGTH) * progress);
}

/**
 * Calculate starting strength (max - 30)
 */
export function calculateStartingStrength(maxStrength: number): number {
    return maxStrength - STRENGTH_GAINED;
}

/**
 * Calculate strength gain per hour for a species
 * Formula: 30 / hoursToMature
 */
export function calculateStrengthPerHour(species: string): number {
    const speciesData = getSpeciesData(species);
    if (!speciesData || speciesData.hoursToMature <= 0) return 0;

    return STRENGTH_GAINED / speciesData.hoursToMature;
}

/**
 * Calculate current strength based on XP
 * Formula (from game source):
 * - hoursGrown = xp / 3600
 * - strengthPerHour = 30 / hoursToMature
 * - strengthGained = min(strengthPerHour × hoursGrown, 30)
 * - currentStrength = floor(startingStrength + strengthGained)
 */
export function calculateCurrentStrength(species: string, xp: number, maxStrength: number): number {
    const speciesData = getSpeciesData(species);
    if (!speciesData) return maxStrength - STRENGTH_GAINED;

    const hoursGrown = xp / XP_PER_HOUR;
    const strengthPerHour = STRENGTH_GAINED / speciesData.hoursToMature;
    const strengthGained = Math.min(strengthPerHour * hoursGrown, STRENGTH_GAINED);
    const startingStrength = maxStrength - STRENGTH_GAINED;

    return Math.floor(startingStrength + strengthGained);
}

/**
 * Calculate XP required for a specific strength level
 */
export function calculateXpForStrength(species: string, targetStrength: number, maxStrength: number): number {
    const speciesData = getSpeciesData(species);
    if (!speciesData) return 0;

    const startingStrength = maxStrength - STRENGTH_GAINED;
    const strengthNeeded = targetStrength - startingStrength;

    if (strengthNeeded <= 0) return 0;

    const strengthPerHour = STRENGTH_GAINED / speciesData.hoursToMature;
    if (strengthPerHour <= 0) return 0;

    const hoursNeeded = strengthNeeded / strengthPerHour;
    return hoursNeeded * XP_PER_HOUR;
}

/**
 * Calculate hours remaining to reach a target strength
 */
export function calculateHoursToStrength(
    species: string,
    currentXp: number,
    targetStrength: number,
    maxStrength: number,
    xpPerHour: number = XP_PER_HOUR
): number {
    const targetXp = calculateXpForStrength(species, targetStrength, maxStrength);
    const xpRemaining = targetXp - currentXp;

    if (xpRemaining <= 0) return 0;
    if (xpPerHour <= 0) return Infinity;

    return xpRemaining / xpPerHour;
}

/**
 * Calculate hours remaining to reach max strength
 */
export function calculateHoursToMaxStrength(
    species: string,
    currentXp: number,
    maxStrength: number,
    xpPerHour: number = XP_PER_HOUR
): number {
    return calculateHoursToStrength(species, currentXp, maxStrength, maxStrength, xpPerHour);
}

/**
 * Calculate hours remaining to reach next strength level
 */
export function calculateHoursToNextStrength(
    species: string,
    currentXp: number,
    currentStrength: number,
    maxStrength: number,
    xpPerHour: number = XP_PER_HOUR
): number {
    if (currentStrength >= maxStrength) return 0;

    const nextStrength = currentStrength + 1;
    return calculateHoursToStrength(species, currentXp, nextStrength, maxStrength, xpPerHour);
}

/**
 * Check if pet is mature (has reached max strength)
 */
export function isPetMature(currentStrength: number, maxStrength: number): boolean {
    return currentStrength >= maxStrength;
}

/**
 * Calculate progress percentage toward max strength (0-100)
 */
export function calculateStrengthProgress(currentStrength: number, maxStrength: number): number {
    const startingStrength = maxStrength - STRENGTH_GAINED;
    const gained = currentStrength - startingStrength;
    const progress = (gained / STRENGTH_GAINED) * 100;
    return Math.min(100, Math.max(0, progress));
}
