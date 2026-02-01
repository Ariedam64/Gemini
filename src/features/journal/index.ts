/**
 * Journal Feature - Public API
 *
 * Level 3: Re-exports from all modules
 * Replaces the old journalChecker feature with a minimal public surface.
 */

import type {
    VariantLogEntry,
    AbilityLogEntry,
    PetJournalEntry,
    ProduceJournalEntry,
    RawJournal,
    SpeciesProgress,
    CategoryProgress,
    JournalProgress,
    JournalConfig,
    JournalInjectionToggles,
} from './types';

import * as Progress from './logic/progress';
import * as Lifecycle from './logic/lifecycle';
import { registerInjections } from './logic/injections';
import { loadConfig } from './state';

let ready = false;

/**
 * MGJournal Module - Journal progress tracking + injection management
 */
export const MGJournal = {
    // ─── Required Module API ───

    init(): void {
        if (ready) return;
        ready = true;
        loadConfig(); // trigger migration if needed
        Lifecycle.start();
        registerInjections();
    },

    destroy(): void {
        if (!ready) return;
        ready = false;
        Lifecycle.stop();
        // Injections are destroyed by the registry
    },

    isReady(): boolean {
        return ready;
    },

    // ─── Progress API (used by external consumers) ───

    getProgress(): JournalProgress | null {
        return null; // Use aggregateJournalProgress() for async access
    },

    getMyJournal: Progress.getMyJournal,
    getCropVariants: Progress.getCropVariants,
    getPetVariants: Progress.getPetVariants,
    getAllMutations: Progress.getAllMutations,
    getPetAbilities: Progress.getPetAbilities,
    calculateProduceProgress: Progress.calculateProduceProgress,
    calculatePetProgress: Progress.calculatePetProgress,
    aggregateJournalProgress: Progress.aggregateProgress,
    getMissingSummary: Progress.getMissingSummary,

    // ─── Lifecycle API ───

    refresh: Lifecycle.refresh,
    dispatchUpdate: Lifecycle.dispatchUpdate,
} as const;

// ─── Type Exports ───
export type {
    VariantLogEntry,
    AbilityLogEntry,
    PetJournalEntry,
    ProduceJournalEntry,
    RawJournal,
    SpeciesProgress,
    CategoryProgress,
    JournalProgress,
    JournalConfig,
    JournalInjectionToggles,
};
