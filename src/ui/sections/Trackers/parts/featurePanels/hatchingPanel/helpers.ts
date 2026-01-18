/**
 * Hatching Panel Helpers
 *
 * Shared helper functions for hatching panel rendering.
 * Extracted from hatchingPanel.ts for maintainability.
 *
 * @module hatchingPanel/helpers
 */

import type { UnifiedPet } from '../../../../../../globals/core/types';
import { Globals } from '../../../../../../globals';
import { MGData } from '../../../../../../modules/data';
import { MGSprite } from '../../../../../../modules/sprite';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

export const MAX_TARGET_STRENGTH = 100;

export const DOUBLE_HATCH_ABILITIES = ['DoubleHatch'] as const;
export const PET_REFUND_ABILITIES = ['PetRefund', 'PetRefundII'] as const;
export const PET_MUTATION_BOOST_ABILITIES = [
    'PetMutationBoost',
    'PetMutationBoostII',
    'PetMutationBoostIII',
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// DOM Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function el(tag: string, className?: string, text?: string): HTMLElement {
    const elem = document.createElement(tag);
    if (className) elem.className = className;
    if (text) elem.textContent = text;
    return elem;
}

// ─────────────────────────────────────────────────────────────────────────────
// Ability Utilities
// ─────────────────────────────────────────────────────────────────────────────

export function getAbilityData(abilityId: string) {
    const abilities = MGData.get('abilities');
    if (!abilities) return null;

    const ability = abilities[abilityId] as {
        name?: string;
        baseProbability?: number;
        baseParameters?: {
            mutationChanceIncreasePercentage?: number;
        };
    } | undefined;

    if (!ability) return null;

    return {
        id: abilityId,
        name: ability.name ?? abilityId,
        baseProbability: ability.baseProbability ?? 0,
        mutationChanceIncreasePercentage: ability.baseParameters?.mutationChanceIncreasePercentage ?? 0,
    };
}

export function hasAbility(pet: UnifiedPet, abilities: readonly string[]): boolean {
    return pet.abilities.some(a => (abilities as readonly string[]).includes(a));
}

export function isAbilityActive(pet: UnifiedPet): boolean {
    return pet.hunger > 0;
}

export function getStrengthFactor(pet: UnifiedPet): number {
    // Use pet's actual maxStrength for accurate scaling
    // Wiki: "Max Strength ranges from 80 to 100"
    // A pet at max STR should have 100% effectiveness regardless of their max value
    return pet.currentStrength / pet.maxStrength;
}

export function getScaledProbability(baseProbability: number, strengthFactor: number): number {
    return Math.min(100, baseProbability * strengthFactor);
}

// ─────────────────────────────────────────────────────────────────────────────
// Sprite Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getEggSpriteElement(eggId: string): HTMLElement {
    const wrapper = el('span', 'sprite-wrapper');

    try {
        if (MGSprite.isReady() && MGSprite.has('pet', eggId)) {
            const canvas = MGSprite.toCanvas('pet', eggId, { scale: 0.6 });
            canvas.style.height = '32px';
            canvas.style.width = 'auto';
            canvas.style.imageRendering = 'pixelated';
            wrapper.appendChild(canvas);
        }
    } catch (e) {
        wrapper.textContent = '🥚';
    }

    return wrapper;
}

// ─────────────────────────────────────────────────────────────────────────────
// UI Builders
// ─────────────────────────────────────────────────────────────────────────────

export function buildSpriteRow(label: string, items: { eggId: string; value: number }[]): HTMLElement {
    const row = el('div', 'stat-row');
    row.appendChild(el('span', 'stat__label', label));

    const grid = el('div', 'stat__sprite-grid');

    for (const item of items) {
        if (item.value <= 0) continue;

        const spriteItem = el('div', 'stat__sprite-item');
        spriteItem.appendChild(getEggSpriteElement(item.eggId));

        const valueEl = el('span', 'stat__sprite-value', item.value.toFixed(1));
        spriteItem.appendChild(valueEl);

        grid.appendChild(spriteItem);
    }

    row.appendChild(grid);
    return row;
}

export function buildMutationRow(
    label: string,
    rainbowValue: string,
    goldValue: string,
    isPercentage: boolean
): HTMLElement {
    const row = el('div', 'stat-row');
    row.appendChild(el('span', 'stat__label', label));

    const valuesWrapper = el('span', 'stat__values-row');

    const rainbowEl = el('span', 'stat__value stat__value--rainbow', rainbowValue);
    if (isPercentage) rainbowEl.textContent = `${rainbowValue}%`;
    rainbowEl.style.backgroundImage = 'var(--rainbow-text-gradient)';
    rainbowEl.style.webkitBackgroundClip = 'text';
    rainbowEl.style.webkitTextFillColor = 'transparent';
    rainbowEl.style.backgroundClip = 'text';
    valuesWrapper.appendChild(rainbowEl);

    valuesWrapper.appendChild(el('span', 'stat__separator', ' | '));

    const goldEl = el('span', 'stat__value stat__value--gold', goldValue);
    if (isPercentage) goldEl.textContent = `${goldValue}%`;
    valuesWrapper.appendChild(goldEl);

    row.appendChild(valuesWrapper);
    return row;
}

export function buildCombinedMutationRow(
    rainbowChance: string,
    goldChance: string,
    rainbowEstimate: string,
    goldEstimate: string
): HTMLElement {
    const row = el('div', 'stat-row');
    row.appendChild(el('span', 'stat__label', 'PET MUTATION'));

    const valuesWrapper = el('span', 'stat__values-row');

    const rainbowEl = el('span', 'stat__value stat__value--rainbow',
        `${rainbowChance}% (${rainbowEstimate})`);
    rainbowEl.style.backgroundImage = 'var(--rainbow-text-gradient)';
    rainbowEl.style.webkitBackgroundClip = 'text';
    rainbowEl.style.webkitTextFillColor = 'transparent';
    rainbowEl.style.backgroundClip = 'text';
    valuesWrapper.appendChild(rainbowEl);

    valuesWrapper.appendChild(el('span', 'stat__separator', ' | '));

    const goldEl = el('span', 'stat__value stat__value--gold',
        `${goldChance}% (${goldEstimate})`);
    valuesWrapper.appendChild(goldEl);

    row.appendChild(valuesWrapper);
    return row;
}

// ─────────────────────────────────────────────────────────────────────────────
// Calculations
// ─────────────────────────────────────────────────────────────────────────────

export function getEggInventory() {
    const inventory = Globals.myInventory.get();
    const eggMap = new Map<string, number>();

    for (const item of inventory.items) {
        if (item.itemType === 'Egg' && item.eggId) {
            const current = eggMap.get(item.eggId) || 0;
            eggMap.set(item.eggId, current + (item.quantity || 1));
        }
    }

    return eggMap;
}

export function calculateDoubleHatchStats(pets: UnifiedPet[]) {
    const eggInventory = getEggInventory();
    const results: { eggId: string; value: number }[] = [];

    let totalProbability = 0;

    for (const pet of pets) {
        if (!isAbilityActive(pet)) continue;

        const strengthFactor = getStrengthFactor(pet);

        for (const abilityId of DOUBLE_HATCH_ABILITIES) {
            if (!pet.abilities.includes(abilityId)) continue;

            const abilityData = getAbilityData(abilityId);
            if (!abilityData) continue;

            const scaledProb = getScaledProbability(abilityData.baseProbability, strengthFactor);
            totalProbability += scaledProb / 100;
        }
    }

    for (const [eggId, quantity] of eggInventory) {
        const expectedExtras = quantity * totalProbability;
        results.push({ eggId, value: expectedExtras });
    }

    return results;
}

export function calculatePetRefundStats(pets: UnifiedPet[]) {
    const eggInventory = getEggInventory();
    const results: { eggId: string; value: number }[] = [];

    let totalProbability = 0;

    for (const pet of pets) {
        if (!isAbilityActive(pet)) continue;

        const strengthFactor = getStrengthFactor(pet);

        for (const abilityId of PET_REFUND_ABILITIES) {
            if (!pet.abilities.includes(abilityId)) continue;

            const abilityData = getAbilityData(abilityId);
            if (!abilityData) continue;

            const scaledProb = getScaledProbability(abilityData.baseProbability, strengthFactor);
            totalProbability += scaledProb / 100;
        }
    }

    for (const [eggId, quantity] of eggInventory) {
        const expectedRefunds = quantity * totalProbability;
        results.push({ eggId, value: expectedRefunds });
    }

    return results;
}

export function calculatePetMutationStats(pets: UnifiedPet[]) {
    const eggInventory = getEggInventory();
    const totalEggs = Array.from(eggInventory.values()).reduce((sum, qty) => sum + qty, 0);

    let totalRainbowIncrease = 0;
    let totalGoldIncrease = 0;

    for (const pet of pets) {
        if (!isAbilityActive(pet)) continue;

        const hasMutationBoost = PET_MUTATION_BOOST_ABILITIES.some(abilityId =>
            pet.abilities.includes(abilityId)
        );

        if (hasMutationBoost) {
            totalRainbowIncrease += pet.currentStrength * 0.0001;
            totalGoldIncrease += pet.currentStrength * 0.001;
        }
    }

    const mutations = MGData.get('mutations');
    let baseGoldChance = 1;
    let baseRainbowChance = 0.1;

    if (mutations) {
        const goldMutation = mutations['Gold'] as { baseChance?: number } | undefined;
        const rainbowMutation = mutations['Rainbow'] as { baseChance?: number } | undefined;

        if (goldMutation?.baseChance !== undefined) {
            baseGoldChance = goldMutation.baseChance;
        }
        if (rainbowMutation?.baseChance !== undefined) {
            baseRainbowChance = rainbowMutation.baseChance;
        }
    }

    const effectiveGold = baseGoldChance + totalGoldIncrease;
    const effectiveRainbow = baseRainbowChance + totalRainbowIncrease;

    const expectedGold = (totalEggs * effectiveGold) / 100;
    const expectedRainbow = (totalEggs * effectiveRainbow) / 100;

    return {
        goldChance: effectiveGold,
        rainbowChance: effectiveRainbow,
        expectedGold,
        expectedRainbow,
    };
}
