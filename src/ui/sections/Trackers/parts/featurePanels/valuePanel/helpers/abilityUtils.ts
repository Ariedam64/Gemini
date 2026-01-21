/**
 * Ability Utilities
 *
 * Helper functions for ability data access, filtering, and strength calculations.
 *
 * @module valuePanel/helpers/abilityUtils
 */

import type { UnifiedPet } from '../../../../../../../globals/core/types';
import { MGData } from '../../../../../../../modules/data';

// ─────────────────────────────────────────────────────────────────────────────
// DOM Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function el(tag: string, className?: string, text?: string): HTMLElement {
    const elem = document.createElement(tag);
    if (className) elem.className = className;
    if (text) elem.textContent = text;
    return elem;
}

export function formatCoin(value: number): string {
    if (value >= 1_000_000_000_000) {
        // Trillions: 43.67T
        return `${(value / 1_000_000_000_000).toFixed(2)}T`;
    } else if (value >= 1_000_000_000) {
        // Billions: 452.12B
        return `${(value / 1_000_000_000).toFixed(2)}B`;
    } else if (value >= 1_000_000) {
        // Millions: 245.54M
        return `${(value / 1_000_000).toFixed(2)}M`;
    } else if (value >= 1000) {
        // Thousands: 34.6k or 456k
        const thousands = value / 1000;
        return thousands >= 100 ? `${Math.round(thousands)}k` : `${thousands.toFixed(1)}k`;
    }
    return String(Math.round(value));
}

// ─────────────────────────────────────────────────────────────────────────────
// Ability Data Access
// ─────────────────────────────────────────────────────────────────────────────

export function getAbilityData(abilityId: string) {
    const abilities = MGData.get('abilities');
    if (!abilities) return null;

    const ability = abilities[abilityId] as {
        name?: string;
        baseProbability?: number;
        baseParameters?: {
            scaleIncreasePercentage?: number;
            mutationChanceIncreasePercentage?: number;
            grantedMutations?: string[];
            requiredWeather?: string;
        };
    } | undefined;

    if (!ability) return null;

    return {
        id: abilityId,
        name: ability.name ?? abilityId,
        baseProbability: ability.baseProbability ?? 0,
        scaleIncreasePercentage: ability.baseParameters?.scaleIncreasePercentage ?? 0,
        mutationChanceIncreasePercentage: ability.baseParameters?.mutationChanceIncreasePercentage ?? 0,
        grantedMutations: ability.baseParameters?.grantedMutations ?? [],
        requiredWeather: ability.baseParameters?.requiredWeather ?? null,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Ability Filtering
// ─────────────────────────────────────────────────────────────────────────────

export function hasAbility(pet: UnifiedPet, abilities: readonly string[]): boolean {
    return pet.abilities.some(a => (abilities as readonly string[]).includes(a));
}

export function isAbilityActive(
    pet: UnifiedPet,
    abilityId: string,
    currentWeather: string | null
): boolean {
    if (pet.hunger <= 0) return false;

    const abilityData = getAbilityData(abilityId);
    if (!abilityData) return false;

    if (abilityData.requiredWeather && currentWeather !== abilityData.requiredWeather) {
        return false;
    }

    return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Strength Calculations
// ─────────────────────────────────────────────────────────────────────────────

export function getStrengthFactor(pet: UnifiedPet): number {
    // Game source divides by constant 100, not pet's maxStrength
    // This ensures consistent scaling across all pets
    // Source: GameSourceFiles/.../utils/pets.ts - getStrengthScaleFactor uses maxTargetStrength (100)
    // A pet with strength 80 at maxStrength 80 has 80% effectiveness (not 100%)

    // Validation warnings for debugging
    if (pet.currentStrength < 0 || pet.currentStrength > 100) {
        console.warn(`[Gemini] Invalid strength: ${pet.currentStrength} for pet ${pet.name || 'unknown'}`);
    }

    if (pet.maxStrength < 80 || pet.maxStrength > 100) {
        console.warn(`[Gemini] Unexpected maxStrength: ${pet.maxStrength} for pet ${pet.name || 'unknown'} (expected 80-100)`);
    }

    return pet.currentStrength / 100;
}

export function getScaledProbability(baseProbability: number, strengthFactor: number): number {
    return Math.min(100, baseProbability * strengthFactor);
}
