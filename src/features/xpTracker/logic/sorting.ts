/**
 * XP Tracker - Sorting and Filtering Logic
 *
 * Level 2: Imports from types.ts
 */

import type { PetXpProgress, SortOption } from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Sorting Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sort pets by proximity to max strength (closest first)
 */
function sortByClosestToMax(a: PetXpProgress, b: PetXpProgress): number {
    return a.hoursToMaxStrength - b.hoursToMaxStrength;
}

/**
 * Sort pets by proximity to max strength (furthest first)
 */
function sortByFurthestFromMax(a: PetXpProgress, b: PetXpProgress): number {
    return b.hoursToMaxStrength - a.hoursToMaxStrength;
}

/**
 * Sort pets by species name (alphabetically)
 */
function sortBySpecies(a: PetXpProgress, b: PetXpProgress): number {
    return a.species.localeCompare(b.species);
}

/**
 * Sort pets by current strength (highest first)
 */
function sortByStrength(a: PetXpProgress, b: PetXpProgress): number {
    return b.currentStrength - a.currentStrength;
}

/**
 * Sort pets by location (active > inventory > hutch)
 */
function sortByLocation(a: PetXpProgress, b: PetXpProgress): number {
    const locationOrder = { active: 0, inventory: 1, hutch: 2 };
    return locationOrder[a.location] - locationOrder[b.location];
}

/**
 * Sort pets by name (alphabetically)
 */
function sortByName(a: PetXpProgress, b: PetXpProgress): number {
    return a.name.localeCompare(b.name);
}

/**
 * Get sort function for a sort option
 */
export function getSortFunction(sortOption: SortOption): (a: PetXpProgress, b: PetXpProgress) => number {
    switch (sortOption) {
        case 'closestToMax':
            return sortByClosestToMax;
        case 'furthestFromMax':
            return sortByFurthestFromMax;
        case 'species':
            return sortBySpecies;
        case 'strength':
            return sortByStrength;
        case 'location':
            return sortByLocation;
        case 'name':
            return sortByName;
        default:
            return sortByClosestToMax;
    }
}

/**
 * Sort pets by the given option
 */
export function sortPets(pets: PetXpProgress[], sortOption: SortOption): PetXpProgress[] {
    const sortFn = getSortFunction(sortOption);
    return [...pets].sort(sortFn);
}

// ─────────────────────────────────────────────────────────────────────────────
// Filtering Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Filter pets by species
 */
export function filterBySpecies(pets: PetXpProgress[], species: string[]): PetXpProgress[] {
    if (species.length === 0) return pets;
    return pets.filter(p => species.includes(p.species));
}

/**
 * Filter pets with XP Boost ability
 */
export function filterByHasXpBoost(pets: PetXpProgress[], hasXpBoost: boolean): PetXpProgress[] {
    if (!hasXpBoost) return pets;
    return pets.filter(p => p.xpBoostStats !== null);
}

/**
 * Filter pets by location
 */
export function filterByLocation(
    pets: PetXpProgress[],
    locations: Array<'active' | 'inventory' | 'hutch'>
): PetXpProgress[] {
    if (locations.length === 0) return pets;
    return pets.filter(p => locations.includes(p.location));
}

/**
 * Apply all filters and sorting
 */
export function filterAndSortPets(
    pets: PetXpProgress[],
    options: {
        sortBy: SortOption;
        filterSpecies: string[];
        filterHasXpBoost: boolean;
    }
): PetXpProgress[] {
    let result = pets;

    // Apply filters
    result = filterBySpecies(result, options.filterSpecies);
    result = filterByHasXpBoost(result, options.filterHasXpBoost);

    // Apply sorting
    result = sortPets(result, options.sortBy);

    return result;
}
