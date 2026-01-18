/**
 * Expansion Module Types
 *
 * Shared type definitions for the team expansion system.
 * Eliminates `any` usage per .claude/rules/core.md §6.
 *
 * @module expansion/types
 */

import type { UnifiedPet } from '../../../../../globals/core/types';
import type { PetTeam } from '../../../../../features/petTeam/types';
import type { FeaturePanelDefinition } from '../featurePanels/registry';
import type { BasePetCard } from '../../../../components/BasePetCard/BasePetCard';

// ─────────────────────────────────────────────────────────────────────────────
// State Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * State for a single feature card in the expansion
 */
export interface FeatureCardState {
    /** Position in team (0-2) */
    slotIndex: number;
    /** Currently displayed feature ID */
    currentFeatureId: string;
    /** BasePetCard shell component */
    shell: BasePetCard | null;
    /** Container element for this card */
    container: HTMLElement;
    /** Feature panel definition */
    featureData: FeaturePanelDefinition;
}

/**
 * State for an expanded team
 */
export interface ExpandedTeamState {
    /** All cards in this expansion */
    cards: FeatureCardState[];
    /** Timestamp when expanded */
    expandedAt: number;
    /** Container element for the expansion */
    container: HTMLElement;
    /** Current growth view type (egg/plant) */
    growthViewType?: 'egg' | 'plant';
    /** Pinned item ID for growth dropdown */
    pinnedItemId?: string;
    /** Current progress bar mode */
    currentBarMode?: 'xp' | 'growth';
}

// ─────────────────────────────────────────────────────────────────────────────
// Options Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Options for ExpansionHandler constructor
 */
export interface ExpansionHandlerOptions {
    /** Function to get the list container element */
    getListContainer: () => HTMLElement | null;
}

/**
 * Options for creating an individual pet row
 */
export interface IndividualPetRowOptions {
    /** Pet to display */
    pet: UnifiedPet;
    /** Team context */
    team: PetTeam;
    /** Available feature panels */
    features: FeaturePanelDefinition[];
    /** Current growth view type */
    viewType?: 'egg' | 'plant';
    /** Team ID */
    teamId: string;
    /** Selected feature ID */
    selectedFeatureId: string;
    /** Callback when feature changes */
    onFeatureChange?: (newFeatureId: string) => void;
    /** Callback to trigger re-expand for XP */
    onReexpandForXP?: () => void;
}

/**
 * Options for creating a grouped pet row
 */
export interface GroupedPetRowOptions {
    /** Pets that match grouping criteria */
    matchingPets: UnifiedPet[];
    /** Team context */
    team: PetTeam;
    /** Available feature panels */
    features: FeaturePanelDefinition[];
    /** Current growth view type */
    viewType?: 'egg' | 'plant';
    /** Team ID */
    teamId: string;
    /** Selected feature ID */
    selectedFeatureId: string;
    /** Callback when feature changes */
    onFeatureChange?: (newFeatureId: string) => void;
    /** Callback to trigger re-expand for XP */
    onReexpandForXP?: () => void;
}

/**
 * Result from creating a pet row
 */
export interface PetRowResult {
    /** Container element */
    container: HTMLElement;
    /** Card state for updates */
    cardState: FeatureCardState;
}

// ─────────────────────────────────────────────────────────────────────────────
// Progress Bar Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Options for rendering progress bars
 */
export interface ProgressBarOptions {
    /** Container to render into */
    container: HTMLElement;
    /** Pets to calculate progress for */
    pets: UnifiedPet[];
    /** Team ID */
    teamId: string;
    /** Force a specific mode */
    forceMode?: 'xp' | 'growth';
}

/**
 * Options for the growth summary bar
 */
export interface GrowthSummaryBarOptions extends ProgressBarOptions {
    /** Expanded team state */
    state: ExpandedTeamState;
    /** Callback when dropdown should show */
    onShowDropdown: (anchor: HTMLElement, viewType: 'egg' | 'plant') => void;
    /** Callback when view type changes */
    onViewTypeChange: (viewType: 'egg' | 'plant') => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Dropdown Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Growth item for dropdown (egg or plant)
 */
export interface GrowthDropdownItem {
    /** Tile index (unique ID) */
    tileIndex: string;
    /** Species/egg ID */
    species: string;
    /** End time timestamp */
    endTime: number;
    /** Start time timestamp */
    startTime: number;
}

/**
 * Options for showing the growth dropdown
 */
export interface GrowthDropdownOptions {
    /** Anchor element to position relative to */
    anchor: HTMLElement;
    /** Items to display */
    items: GrowthDropdownItem[];
    /** Current view type */
    viewType: 'egg' | 'plant';
    /** Team ID (for toggle logic) */
    teamId: string;
    /** Callback when item is selected */
    onSelect: (itemId: string) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Grouping Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Result of analyzing team for grouping
 */
export interface GroupingAnalysisResult {
    /** Whether pets should be grouped */
    shouldGroup: boolean;
    /** Pets that match grouping criteria */
    matchingPets: UnifiedPet[];
    /** Remaining pets (not grouped) */
    remainingPets: UnifiedPet[];
    /** Optional: Type of grouping detected (for purpose detection) */
    groupType?: 'hatching' | 'crop' | 'growth';
}
