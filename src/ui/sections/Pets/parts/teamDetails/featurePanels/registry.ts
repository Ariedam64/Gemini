/**
 * Feature Panel Registry
 *
 * Extensible system for adding new pet team feature displays.
 *
 * To add a new feature:
 * 1. Create a new file: featurePanels/yourFeature.ts
 * 2. Implement FeaturePanelDefinition interface
 * 3. Register in featurePanels/index.ts FEATURE_PANELS array
 * 4. Done! Feature will auto-integrate into UI
 *
 * Per .claude/rules/ui/ui.sections.md:
 * - Sections manage complex workflows
 * - Section parts are focused, reusable sub-features
 * - Clear lifecycle (build/update/destroy)
 *
 * @module registry
 */

import type { PetTeam } from '../../../../../../features/petTeam/types';
import type { UnifiedPet } from '../../../../../../globals/core/types';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Feature panel definition
 * Implement this interface to create a new feature panel
 */
export interface FeaturePanelDefinition {
    /** Unique feature ID (used for config, routing, etc.) */
    id: string;

    /** Display name in tab/settings */
    label: string;

    /** Icon/emoji for visual identification */
    icon: string;

    /** Feature category (for grouping in settings) */
    category?: 'stats' | 'tracking' | 'optimization' | 'analytics';

    /** Feature is available (check if enabled in config) */
    isAvailable: () => boolean;

    /** Calculate summary data for collapsed badge (optional) */
    getSummary?: (team: PetTeam, pets: UnifiedPet[]) => FeatureSummary | null;

    /** Build the expanded panel DOM */
    buildPanel: (team: PetTeam, container: HTMLElement) => FeaturePanelInstance;

    /** 
     * Render feature-specific stats for an individual pet card slot.
     * Part of the "Blank Shell" architecture.
     * @param viewType - Optional context (e.g., 'egg' or 'plant' for growth panel)
     */
    renderPetSlot?: (pet: UnifiedPet, team: PetTeam, container: HTMLElement, viewType?: string) => void;

    /** Should this feature display for this team? (optional smart filtering) */
    shouldDisplay?: (team: PetTeam, pets: UnifiedPet[]) => boolean;
}

/**
 * Feature summary for collapsed badge
 */
export interface FeatureSummary {
    /** Badge text (e.g., "67%", "3 hatching", "⚡ Active") */
    text: string;

    /** Badge color class (mapped to CSS) */
    variant?: 'low' | 'medium' | 'high' | 'warning' | 'success' | 'neutral';

    /** Tooltip on hover (optional) */
    tooltip?: string;

    /** Priority (higher = show first if space limited) */
    priority?: number;
}

/**
 * Feature panel instance (created when panel is built)
 */
export interface FeaturePanelInstance {
    /** Update panel with new team data */
    update: (team: PetTeam, pets: UnifiedPet[]) => void;

    /** Cleanup panel (remove listeners, intervals, etc.) */
    destroy: () => void;

    /** Optional: Refresh panel data (for auto-update features) */
    refresh?: () => void;
}

/**
 * Feature panel context (provided to each panel)
 */
export interface FeaturePanelContext {
    /** Team being displayed */
    team: PetTeam;

    /** Pets in team (filtered, non-empty slots) */
    pets: UnifiedPet[];

    /** Request panel refresh (call when data changes) */
    requestRefresh: () => void;

    /** Close panel (collapse team) */
    closePanel: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Registry Utilities
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Get available features for a team
 *
 * Filters registered features by:
 * 1. isAvailable() - Feature enabled in config
 * 2. shouldDisplay() - Feature appropriate for team (if provided)
 *
 * @param team - Team to check features for
 * @param pets - Pets in team
 * @param allFeatures - All registered feature panels
 * @returns Available features for this team
 */
export function getAvailableFeatures(
    team: PetTeam,
    pets: UnifiedPet[],
    allFeatures: FeaturePanelDefinition[]
): FeaturePanelDefinition[] {
    return allFeatures.filter(feature => {
        // Check if feature is enabled
        if (!feature.isAvailable()) {
            return false;
        }

        // Check if feature should display for this team
        if (feature.shouldDisplay && !feature.shouldDisplay(team, pets)) {
            return false;
        }

        return true;
    });
}

/**
 * Get feature by ID
 *
 * @param featureId - Feature ID to find
 * @param allFeatures - All registered feature panels
 * @returns Feature definition or undefined
 */
export function getFeatureById(
    featureId: string,
    allFeatures: FeaturePanelDefinition[]
): FeaturePanelDefinition | undefined {
    return allFeatures.find(f => f.id === featureId);
}

/**
 * Get feature summaries for all available features
 *
 * @param team - Team to get summaries for
 * @param pets - Pets in team
 * @param features - Features to get summaries for
 * @returns Map of feature ID to summary
 */
export function getFeatureSummaries(
    team: PetTeam,
    pets: UnifiedPet[],
    features: FeaturePanelDefinition[]
): Map<string, FeatureSummary> {
    const summaries = new Map<string, FeatureSummary>();

    for (const feature of features) {
        if (feature.getSummary) {
            const summary = feature.getSummary(team, pets);
            if (summary) {
                summaries.set(feature.id, summary);
            }
        }
    }

    return summaries;
}
