/**
 * JournalChecker Feature - Public API
 * 
 * Level 3: Re-exports from all modules
 * Aligned with Gemini v4.0 "Complex Feature" structure
 */

// Types
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
} from './types';

export { DEFAULT_CONFIG, STORAGE_KEY } from './types';

// State
export {
    loadConfig,
    saveConfig,
    isEnabled,
    setAutoRefresh,
    setRefreshInterval,
} from './state';

// Logic (from logic/ subfolder)
export {
    getMyJournal,
    getCropVariants,
    getPetVariants,
    getAllMutations,
    getPetAbilities,
    calculateProduceProgress,
    calculatePetProgress,
    aggregateProgress as aggregateJournalProgress,
    getMissingSummary,
    start,
    stop,
    setEnabled,
    refresh,
    dispatchUpdate,
} from './logic';
