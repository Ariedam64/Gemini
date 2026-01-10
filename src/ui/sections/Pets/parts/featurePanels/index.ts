/**
 * Feature Panels - Barrel Exports
 *
 * Central registry for all pet team feature panels.
 * New features are registered here by adding to FEATURE_PANELS array.
 *
 * Per .claude/rules/core.md:
 * - Barrel files for clean imports
 * - No side effects on import
 * - Clear module boundaries
 *
 * @module featurePanels
 */

// Re-export registry types
export type {
    FeaturePanelDefinition,
    FeatureSummary,
    FeaturePanelInstance,
    FeaturePanelContext,
} from './registry';

export {
    getAvailableFeatures,
    getFeatureById,
    getFeatureSummaries,
} from './registry';

// Import registered features
import { xpPanel } from './xpPanel';
import { growthPanel } from './growthPanel';

/**
 * All registered feature panels
 *
 * To add a new feature:
 * 1. Import it above
 * 2. Add to this array
 * 3. Done!
 */
import type { FeaturePanelDefinition } from './registry';

export const FEATURE_PANELS: FeaturePanelDefinition[] = [
    xpPanel,
    growthPanel,
];

