/**
 * Expansion Module - Barrel Exports
 *
 * Central export point for team expansion functionality.
 * Per .claude/rules/core.md §6: "Prefer importing from domain entrypoints"
 *
 * @module expansion
 */

// Types
export type {
    FeatureCardState,
    ExpandedTeamState,
    ExpansionHandlerOptions,
    IndividualPetRowOptions,
    GroupedPetRowOptions,
    PetRowResult,
    ProgressBarOptions,
    GrowthSummaryBarOptions,
    GrowthDropdownOptions,
    GroupingAnalysisResult,
} from './types';

// Grouping utilities
export {
    analyzeTeamForGrouping,
    areAllPetsMaxStrength,
} from './GroupingUtils';

// Growth dropdown
export {
    showGrowthDropdown,
    closeGrowthDropdown,
} from './GrowthDropdown';
export type { GrowthItem } from './GrowthDropdown';

// Progress bar rendering
export {
    renderXpProgressBar,
    renderGrowthSummaryBar,
    determineProgressBarMode,
} from './ProgressBarRenderer';
export type { GrowthSummaryBarOptions as RenderGrowthSummaryBarOptions } from './ProgressBarRenderer';
