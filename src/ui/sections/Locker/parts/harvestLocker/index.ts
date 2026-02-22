/**
 * HarvestLocker Parts
 * Barrel export for all harvestLocker UI components
 */

// Types
export type {
    ViewMode,
    RuleEditorData,
    RuleEditorModalOptions,
    RuleEditorModalHandle,
    ExistingRuleSelectorOptions,
    ExistingRuleSelectorHandle,
    ColorMutation,
} from "./types";

export { COLOR_MUTATIONS, MUTATION_GROUPS } from "./types";

// Card component (factory + class for backward compatibility)
export {
    createHarvestLockerCard,
    HarvestLockerCardPart,
    type HarvestLockerCardOptions,
    type HarvestLockerCardHandle,
} from "./harvestLockerCard";

// Modal components
export { createRuleEditorModal } from "./RuleEditorModal";
export { createExistingRuleSelector } from "./ExistingRuleSelector";

// Styles
export { harvestLockerCardCss } from "./harvestLockerCard.css";

// Helpers (for external use if needed)
export {
    renderPlantSprite,
    renderMutationSprite,
    createPlaceholder,
    createNonePlaceholder,
    getAvailableWeatherMutations,
    getMutationDisplayName,
    formatMutationNames,
} from "./helpers";

// Sections (for external use if needed)
export {
    createSizeSection,
    createColorMutationSection,
    createWeatherMutationSection,
    createPreviewSection,
    createMutationItem,
} from "./sections";
