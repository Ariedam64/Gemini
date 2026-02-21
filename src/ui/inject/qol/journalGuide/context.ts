/**
 * Journal Guide - User Context
 *
 * Gathers a snapshot of the user's current state from all globals.
 * Used by the scoring engine and badge system to make recommendations.
 *
 * Mutation detection is dynamic: loops over all mutations from MGData
 * so new mutations are automatically tracked without code changes.
 */

import { getMyGarden, getMyPets, getMyInventory } from '../../../../globals';
import { MGData } from '../../../../modules';
import { MGJournal } from '../../../../features/journal';
import type { SpeciesProgress } from '../../../../features/journal';
import { getWeatherPrediction, type WeatherPrediction } from './weather';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type PetAbilityStatus = 'active' | 'owned' | 'none';

export interface PetAbilityInfo {
    goldGranter: PetAbilityStatus;
    rainbowGranter: PetAbilityStatus;
    cropSizeBoost: PetAbilityStatus;
    cropMutationBoost: PetAbilityStatus;
    petMutationBoost: PetAbilityStatus;
    maxStrengthBoost: PetAbilityStatus;
}

export interface SpeciesContext {
    speciesId: string;
    type: 'crop' | 'pet';
    variantsMissing: string[];
    variantsLogged: string[];
    abilitiesMissing?: string[];
    abilitiesLogged?: string[];
    hasMatureCrops: boolean;
    /** Dynamic map of mutationId → whether species has mutated crops of that type */
    mutatedCrops: Map<string, boolean>;
    hasSeeds: boolean;
    hasEggs: boolean;
    isComplete: boolean;
}

export interface UserContext {
    weather: WeatherPrediction;
    petAbilities: PetAbilityInfo;
    hasDawnbinder: boolean;
    hasMoonbinder: boolean;
    speciesContexts: Map<string, SpeciesContext>;
    cropProgress: SpeciesProgress[];
    petProgress: SpeciesProgress[];
    timestamp: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public Helpers
// ─────────────────────────────────────────────────────────────────────────────

/** Check if a species has mutated crops for a given mutation ID */
export function hasMutatedCropsFor(species: SpeciesContext, mutationId: string): boolean {
    return species.mutatedCrops.get(mutationId) ?? false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Cache
// ─────────────────────────────────────────────────────────────────────────────

let cachedContext: UserContext | null = null;
let cacheInvalid = true;

export function invalidateContext(): void {
    cacheInvalid = true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pet Ability Detection
// ─────────────────────────────────────────────────────────────────────────────

const ABILITY_MAP: Record<string, keyof PetAbilityInfo> = {
    'GoldGranter': 'goldGranter',
    'RainbowGranter': 'rainbowGranter',
    'CropSizeBoost': 'cropSizeBoost',
    'ProduceMutationBoost': 'cropMutationBoost',
    'SnowyCropMutationBoost': 'cropMutationBoost',
    'PetMutationBoost': 'petMutationBoost',
    'MaxStrengthBoost': 'maxStrengthBoost',
};

function scanPetAbilities(): PetAbilityInfo {
    const result: PetAbilityInfo = {
        goldGranter: 'none',
        rainbowGranter: 'none',
        cropSizeBoost: 'none',
        cropMutationBoost: 'none',
        petMutationBoost: 'none',
        maxStrengthBoost: 'none',
    };

    try {
        const petsData = getMyPets().get();
        if (!petsData) return result;

        const locations = [
            { pets: petsData.byLocation?.active ?? [], status: 'active' as const },
            { pets: petsData.byLocation?.inventory ?? [], status: 'owned' as const },
            { pets: petsData.byLocation?.hutch ?? [], status: 'owned' as const },
        ];

        for (const { pets, status } of locations) {
            for (const pet of pets) {
                if (!pet.abilities) continue;
                for (const ability of pet.abilities) {
                    const key = ABILITY_MAP[ability];
                    if (!key) continue;
                    // 'active' takes priority over 'owned'
                    if (result[key] === 'none' || (status === 'active' && result[key] === 'owned')) {
                        result[key] = status;
                    }
                }
            }
        }
    } catch {
        // Return defaults if globals not ready
    }

    return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Garden Detection
// ─────────────────────────────────────────────────────────────────────────────

function checkDawnbinder(): boolean {
    try {
        const garden = getMyGarden().get();
        const plants = garden?.plants?.bySpecies?.['DawnCelestial'] ?? [];
        return plants.length > 0;
    } catch {
        return false;
    }
}

function checkMoonbinder(): boolean {
    try {
        const garden = getMyGarden().get();
        const plants = garden?.plants?.bySpecies?.['MoonCelestial'] ?? [];
        return plants.length > 0;
    } catch {
        return false;
    }
}

function hasMutatedCropsOfSpecies(speciesId: string, mutationId: string): boolean {
    try {
        const garden = getMyGarden().get();
        const mutatedCrops = garden?.crops?.mutated?.byMutation?.[mutationId] ?? [];
        return mutatedCrops.some((c: any) => c.species === speciesId);
    } catch {
        return false;
    }
}

function hasMatureCropsOfSpecies(speciesId: string): boolean {
    try {
        const garden = getMyGarden().get();
        const plants = garden?.plants?.bySpecies?.[speciesId] ?? [];
        return plants.some((p: any) => p.matureSlotsCount > 0);
    } catch {
        return false;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Inventory Detection
// ─────────────────────────────────────────────────────────────────────────────

function hasSeedsForSpecies(speciesId: string): boolean {
    try {
        const inv = getMyInventory().get();
        if (!inv?.items) return false;
        return inv.items.some(
            (item: any) => item.itemType === 'Seed' && item.species === speciesId,
        );
    } catch {
        return false;
    }
}

function hasEggsForPetSpecies(petSpeciesId: string): boolean {
    try {
        const inv = getMyInventory().get();
        if (!inv?.items) return false;
        const eggs = MGData.get('eggs') ?? {};
        return inv.items.some((item: any) => {
            if (item.itemType !== 'Egg') return false;
            const eggData = eggs[item.eggId] as Record<string, any> | undefined;
            return eggData?.species === petSpeciesId || eggData?.petSpecies === petSpeciesId;
        });
    } catch {
        return false;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Shop Availability Detection
// ─────────────────────────────────────────────────────────────────────────────

function isSeedInShop(speciesId: string): boolean {
    try {
        const plants = MGData.get('plants') as Record<string, any> | null;
        if (!plants?.[speciesId]?.seed) return false;
        const seedId = plants[speciesId].seed.id;
        if (!seedId) return false;

        // Check global shop state using MGShopRestock or direct shop check
        // For now, return false - will implement shop check if needed
        return false;
    } catch {
        return false;
    }
}

function isEggInShop(petSpeciesId: string): boolean {
    try {
        const pets = MGData.get('pets') as Record<string, any> | null;
        if (!pets?.[petSpeciesId]?.pet) return false;
        const eggId = pets[petSpeciesId].pet.eggId;
        if (!eggId) return false;

        // Check global shop state
        return false;
    } catch {
        return false;
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Mutation Detection Helper
// ─────────────────────────────────────────────────────────────────────────────

/** Build a map of mutationId → boolean for a crop species */
function buildMutatedCropsMap(speciesId: string): Map<string, boolean> {
    const map = new Map<string, boolean>();
    const mutations = MGData.get('mutations') as Record<string, any> | null;
    if (!mutations) return map;

    for (const mutId of Object.keys(mutations)) {
        map.set(mutId, hasMutatedCropsOfSpecies(speciesId, mutId));
    }
    return map;
}

/** Empty mutation map for pets or unloaded species */
function emptyMutatedCropsMap(): Map<string, boolean> {
    const map = new Map<string, boolean>();
    const mutations = MGData.get('mutations') as Record<string, any> | null;
    if (!mutations) return map;

    for (const mutId of Object.keys(mutations)) {
        map.set(mutId, false);
    }
    return map;
}

// ─────────────────────────────────────────────────────────────────────────────
// Context Builder
// ─────────────────────────────────────────────────────────────────────────────

export function gatherContext(): UserContext {
    if (!cacheInvalid && cachedContext) {
        return cachedContext;
    }

    const weather = getWeatherPrediction();
    const petAbilities = scanPetAbilities();
    const hasDawnbinder = checkDawnbinder();
    const hasMoonbinder = checkMoonbinder();

    const journal = MGJournal.getMyJournal();
    const produceProgress = MGJournal.calculateProduceProgress(journal);
    const petProgress = MGJournal.calculatePetProgress(journal);

    const speciesContexts = new Map<string, SpeciesContext>();

    // Build crop species contexts from journal entries
    const journalCropIds = new Set<string>();
    for (const sp of produceProgress.speciesDetails) {
        journalCropIds.add(sp.species);
        speciesContexts.set(sp.species, {
            speciesId: sp.species,
            type: 'crop',
            variantsMissing: sp.variantsMissing,
            variantsLogged: sp.variantsLogged,
            hasMatureCrops: hasMatureCropsOfSpecies(sp.species),
            mutatedCrops: buildMutatedCropsMap(sp.species),
            hasSeeds: hasSeedsForSpecies(sp.species),
            hasEggs: false,
            isComplete: sp.isComplete,
        });
    }

    // Add crops with 0 journal entries (all variants missing)
    try {
        const plants = MGData.get('plants') as Record<string, any> | null;
        if (plants) {
            const allCropVariants = MGJournal.getCropVariants();
            for (const speciesId of Object.keys(plants)) {
                if (!journalCropIds.has(speciesId)) {
                    speciesContexts.set(speciesId, {
                        speciesId,
                        type: 'crop',
                        variantsMissing: [...allCropVariants],
                        variantsLogged: [],
                        hasMatureCrops: hasMatureCropsOfSpecies(speciesId),
                        mutatedCrops: emptyMutatedCropsMap(),
                        hasSeeds: hasSeedsForSpecies(speciesId),
                        hasEggs: false,
                        isComplete: false,
                    });
                }
            }
        }
    } catch {
        // Skip if MGData not ready
    }

    // Build pet species contexts from journal entries
    const journalPetIds = new Set<string>();
    for (const sp of petProgress.speciesDetails) {
        journalPetIds.add(sp.species);
        speciesContexts.set(sp.species, {
            speciesId: sp.species,
            type: 'pet',
            variantsMissing: sp.variantsMissing,
            variantsLogged: sp.variantsLogged,
            abilitiesMissing: sp.abilitiesMissing,
            abilitiesLogged: sp.abilitiesLogged,
            hasMatureCrops: false,
            mutatedCrops: emptyMutatedCropsMap(),
            hasSeeds: false,
            hasEggs: hasEggsForPetSpecies(sp.species),
            isComplete: sp.isComplete,
        });
    }

    // Add pets with 0 journal entries (all variants missing)
    try {
        const pets = MGData.get('pets') as Record<string, any> | null;
        if (pets) {
            const allPetVariants = MGJournal.getPetVariants();
            for (const speciesId of Object.keys(pets)) {
                if (!journalPetIds.has(speciesId)) {
                    const petData = pets[speciesId];
                    const abilities = petData?.pet?.abilities || [];
                    speciesContexts.set(speciesId, {
                        speciesId,
                        type: 'pet',
                        variantsMissing: [...allPetVariants],
                        variantsLogged: [],
                        abilitiesMissing: abilities,
                        abilitiesLogged: [],
                        hasMatureCrops: false,
                        mutatedCrops: emptyMutatedCropsMap(),
                        hasSeeds: false,
                        hasEggs: hasEggsForPetSpecies(speciesId),
                        isComplete: false,
                    });
                }
            }
        }
    } catch {
        // Skip if MGData not ready
    }

    cachedContext = {
        weather,
        petAbilities,
        hasDawnbinder,
        hasMoonbinder,
        speciesContexts,
        cropProgress: produceProgress.speciesDetails,
        petProgress: petProgress.speciesDetails,
        timestamp: Date.now(),
    };
    cacheInvalid = false;

    return cachedContext;
}
