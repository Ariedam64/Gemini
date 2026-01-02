/**
 * JournalChecker Feature - Type Definitions
 * 
 * Level 0: No imports from this feature
 */

// ─────────────────────────────────────────────────────────────────────────────
// Journal Entry Types (from game data)
// ─────────────────────────────────────────────────────────────────────────────

export interface VariantLogEntry {
    variant: string;
    createdAt: number;
}

export interface AbilityLogEntry {
    ability: string;
    createdAt: number;
}

export interface PetJournalEntry {
    variantsLogged: VariantLogEntry[];
    abilitiesLogged: AbilityLogEntry[];
}

export interface ProduceJournalEntry {
    variantsLogged: VariantLogEntry[];
}

export interface RawJournal {
    pets: Record<string, PetJournalEntry>;
    produce: Record<string, ProduceJournalEntry>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress Types
// ─────────────────────────────────────────────────────────────────────────────

export interface SpeciesProgress {
    species: string;
    variantsLogged: string[];
    variantsMissing: string[];
    variantsTotal: number;
    variantsPercentage: number;
    abilitiesLogged?: string[];
    abilitiesMissing?: string[];
    abilitiesTotal?: number;
    abilitiesPercentage?: number;
    isComplete: boolean;
}

export interface CategoryProgress {
    total: number;
    logged: number;
    percentage: number;
    speciesDetails: SpeciesProgress[];
    variantsTotal: number;
    variantsLogged: number;
    variantsPercentage: number;
    abilitiesTotal?: number;
    abilitiesLogged?: number;
    abilitiesPercentage?: number;
}

export interface JournalProgress {
    plants: CategoryProgress;
    pets: CategoryProgress;
    lastUpdated: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Config Types
// ─────────────────────────────────────────────────────────────────────────────

export interface JournalCheckerConfig {
    enabled: boolean;
    autoRefresh: boolean;
    refreshIntervalMs: number;
}

// Import storage key from centralized registry (per .claude/rules/core.md #4)
import { FEATURE_KEYS } from '../../utils/storage';

export const STORAGE_KEY = FEATURE_KEYS.JOURNAL_CHECKER;

export const DEFAULT_CONFIG: JournalCheckerConfig = {
    enabled: false,
    autoRefresh: true,
    refreshIntervalMs: 30000,
};
