/**
 * JournalChecker Feature - Progress Calculation
 * 
 * Level 2: Core logic for calculating journal progress
 * Uses MGData for game data, G_Players for journal access
 * Optimization: Caches results until journal data changes
 */

import { MGData } from '../../../modules';
import { G_Players } from '../../../globals';
import type {
    RawJournal,
    CategoryProgress,
    SpeciesProgress,
    JournalProgress,
} from '../types';

// ─────────────────────────────────────────────────────────────────────────────
// Cache State
// ─────────────────────────────────────────────────────────────────────────────

let cachedProgress: JournalProgress | null = null;
let lastJournalHash: string | null = null;

// ─────────────────────────────────────────────────────────────────────────────
// Journal Access
// ─────────────────────────────────────────────────────────────────────────────

export function getMyJournal(): RawJournal | null {
    try {
        const playersData = G_Players().get();
        return (playersData.myPlayer?.journal as RawJournal) || null;
    } catch {
        return null;
    }
}

function getJournalHash(journal: RawJournal | null): string {
    if (!journal) return 'null';
    // Simple hash based on string length and first/last entries to avoid full JSON stringify
    return `pro:${Object.keys(journal.produce).length}-pet:${Object.keys(journal.pets).length}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Game Data Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getCropVariants(): string[] {
    const mutations = MGData.get('mutations') ?? {};
    const mutationNames = Object.keys(mutations);
    return ['Normal', ...mutationNames, 'Max Weight'];
}

export function getPetVariants(): string[] {
    const mutations = MGData.get('mutations') ?? {};
    const petMutations = Object.entries(mutations)
        .filter(([_, data]) => !('tileRef' in (data as Record<string, unknown>)))
        .map(([name]) => name);

    return ['Normal', ...petMutations, 'Max Weight'];
}

export function getAllMutations(): string[] {
    return Object.keys(MGData.get('mutations') ?? {});
}

export function getPetAbilities(petSpecies: string): string[] {
    const pets = MGData.get('pets') ?? {};
    const petData = pets[petSpecies] as Record<string, any> | undefined;
    if (!petData) return [];

    const abilities = new Set<string>();
    if (Array.isArray(petData.abilities)) petData.abilities.forEach((a: string) => abilities.add(a));
    if (Array.isArray(petData.possibleAbilities)) petData.possibleAbilities.forEach((a: string) => abilities.add(a));

    if (petData.abilityTiers) {
        Object.values(petData.abilityTiers).forEach((tier: any) => {
            if (Array.isArray(tier)) tier.forEach((a: string) => abilities.add(a));
        });
    }

    return [...abilities];
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress Calculation
// ─────────────────────────────────────────────────────────────────────────────

export function calculateProduceProgress(journal: RawJournal | null): CategoryProgress {
    const plants = MGData.get('plants') ?? {};
    const allPlantIds = Object.keys(plants);
    const allVariants = getCropVariants();
    const produceJournal = journal?.produce ?? {};

    const speciesDetails: SpeciesProgress[] = [];
    let loggedVariantsCount = 0;

    for (const plantId of allPlantIds) {
        const entry = produceJournal[plantId];
        const loggedVariants = entry?.variantsLogged?.map(v => v.variant) ?? [];
        const missingVariants = allVariants.filter(v => !loggedVariants.includes(v));

        loggedVariantsCount += loggedVariants.length;

        speciesDetails.push({
            species: plantId,
            variantsLogged: loggedVariants,
            variantsMissing: missingVariants,
            variantsTotal: allVariants.length,
            variantsPercentage: allVariants.length > 0 ? (loggedVariants.length / allVariants.length) * 100 : 0,
            isComplete: missingVariants.length === 0,
        });
    }

    const totalVariants = allPlantIds.length * allVariants.length;
    const loggedSpecies = speciesDetails.filter(s => s.variantsLogged.length > 0).length;

    return {
        total: allPlantIds.length,
        logged: loggedSpecies,
        percentage: allPlantIds.length > 0 ? (loggedSpecies / allPlantIds.length) * 100 : 0,
        speciesDetails,
        variantsTotal: totalVariants,
        variantsLogged: loggedVariantsCount,
        variantsPercentage: totalVariants > 0 ? (loggedVariantsCount / totalVariants) * 100 : 0,
    };
}

export function calculatePetProgress(journal: RawJournal | null): CategoryProgress {
    const pets = MGData.get('pets') ?? {};
    const allPetIds = Object.keys(pets);
    const allVariants = getPetVariants();
    const petsJournal = journal?.pets ?? {};

    const speciesDetails: SpeciesProgress[] = [];
    let variantsLogged = 0;
    let variantsTotal = 0;
    let abilitiesLogged = 0;
    let abilitiesTotal = 0;

    for (const petId of allPetIds) {
        const entry = petsJournal[petId];
        const loggedV = entry?.variantsLogged?.map(v => v.variant) ?? [];
        const loggedA = entry?.abilitiesLogged?.map(a => a.ability) ?? [];

        const missingV = allVariants.filter(v => !loggedV.includes(v));
        const possibleA = getPetAbilities(petId);
        const missingA = possibleA.filter(a => !loggedA.includes(a));

        variantsTotal += allVariants.length;
        variantsLogged += loggedV.length;
        abilitiesTotal += possibleA.length;
        abilitiesLogged += Math.min(loggedA.length, possibleA.length);

        speciesDetails.push({
            species: petId,
            variantsLogged: loggedV,
            variantsMissing: missingV,
            variantsTotal: allVariants.length,
            variantsPercentage: allVariants.length > 0 ? (loggedV.length / allVariants.length) * 100 : 0,
            abilitiesLogged: loggedA,
            abilitiesMissing: missingA,
            abilitiesTotal: possibleA.length,
            abilitiesPercentage: possibleA.length > 0 ? (loggedA.length / possibleA.length) * 100 : 0,
            isComplete: missingV.length === 0 && (possibleA.length === 0 || missingA.length === 0),
        });
    }

    const loggedSpecies = speciesDetails.filter(s => s.variantsLogged.length > 0).length;

    return {
        total: allPetIds.length,
        logged: loggedSpecies,
        percentage: allPetIds.length > 0 ? (loggedSpecies / allPetIds.length) * 100 : 0,
        speciesDetails,
        variantsTotal,
        variantsLogged,
        variantsPercentage: variantsTotal > 0 ? (variantsLogged / variantsTotal) * 100 : 0,
        abilitiesTotal,
        abilitiesLogged,
        abilitiesPercentage: abilitiesTotal > 0 ? (abilitiesLogged / abilitiesTotal) * 100 : 0,
    };
}

export async function aggregateProgress(force: boolean = false): Promise<JournalProgress> {
    await MGData.waitForAny();

    const journal = getMyJournal();
    const hash = getJournalHash(journal);

    if (!force && cachedProgress && hash === lastJournalHash) {
        return cachedProgress;
    }

    const progress: JournalProgress = {
        plants: calculateProduceProgress(journal),
        pets: calculatePetProgress(journal),
        lastUpdated: Date.now(),
    };

    cachedProgress = progress;
    lastJournalHash = hash;

    return progress;
}

export async function getMissingSummary(): Promise<{
    plants: { species: string; missing: string[] }[];
    pets: { species: string; missingVariants: string[]; missingAbilities: string[] }[];
}> {
    const progress = await aggregateProgress();

    return {
        plants: progress.plants.speciesDetails
            .filter(s => s.variantsMissing.length > 0)
            .map(s => ({ species: s.species, missing: s.variantsMissing })),
        pets: progress.pets.speciesDetails
            .filter(s => s.variantsMissing.length > 0 || (s.abilitiesMissing?.length ?? 0) > 0)
            .map(s => ({
                species: s.species,
                missingVariants: s.variantsMissing,
                missingAbilities: s.abilitiesMissing ?? [],
            })),
    };
}
