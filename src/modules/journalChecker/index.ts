/**
 * JournalChecker Feature - Public API
 * 
 * Level 3: Re-exports from all modules
 * Aligned with Gemini v4.0 "Complex Feature" structure
 */

// Types
import type {
    VariantLogEntry,
    AbilityLogEntry,
    PetJournalEntry,
    ProduceJournalEntry,
    RawJournal,
    SpeciesProgress,
    CategoryProgress,
    JournalProgress,
    JournalCheckerConfig,
} from './types';

import { DEFAULT_CONFIG, STORAGE_KEY } from './types';
import * as State from './state';
// Direct imports from logic files (no barrel file per .claude/rules/modules.md)
import * as Progress from './logic/progress';
import * as Lifecycle from './logic/lifecycle';

/**
 * JournalChecker Module
 * @module MGJournalChecker
 */
export const MGJournalChecker = {
    // ─── Required Module API ───
    /**
     * Initialize the JournalChecker module
     * Idempotent: safe to call multiple times
     */
    init(): void {
        if (this.isReady()) return;
        Lifecycle.start();
    },

    /**
     * Check if module is ready/initialized
     */
    isReady(): boolean {
        return State.isEnabled();
    },

    // ─── Types ───
    DEFAULT_CONFIG,
    STORAGE_KEY,

    // ─── State API ───
    loadConfig: State.loadConfig,
    saveConfig: State.saveConfig,
    isEnabled: State.isEnabled,
    setAutoRefresh: State.setAutoRefresh,
    setRefreshInterval: State.setRefreshInterval,

    // ─── Logic API (from progress.ts) ───
    getMyJournal: Progress.getMyJournal,
    getCropVariants: Progress.getCropVariants,
    getPetVariants: Progress.getPetVariants,
    getAllMutations: Progress.getAllMutations,
    getPetAbilities: Progress.getPetAbilities,
    calculateProduceProgress: Progress.calculateProduceProgress,
    calculatePetProgress: Progress.calculatePetProgress,
    aggregateJournalProgress: Progress.aggregateProgress,
    getMissingSummary: Progress.getMissingSummary,

    // ─── Logic API (from lifecycle.ts) ───
    start: Lifecycle.start,
    stop: Lifecycle.stop,
    setEnabled: Lifecycle.setEnabled,
    refresh: Lifecycle.refresh,
    dispatchUpdate: Lifecycle.dispatchUpdate,
} as const;

// ─── Backward Compatibility (Deprecated) ───
/**
 * @deprecated Use MGJournalChecker instead
 */
export const JournalChecker = MGJournalChecker;

// Maintain old export name for aggregateProgress
export const aggregateJournalProgress = Progress.aggregateProgress;

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
    JournalCheckerConfig,
};
