/**
 * Sections module exports
 * Centralized exports for all sections functionality
 */

// Core classes
export { BaseSection } from "./core/BaseSection";
export { SectionManager } from "./core/sectionManager";

// Types
export type {
  SectionConfig,
  MountResult,
  SectionsDeps,
  SectionsThemeDeps,
} from "./core/sectionTypes";

// State management utilities
export {
  readSectionRaw,
  writeSection,
  ensureBoolean,
  ensureNumber,
  clampNumber,
  numberRange,
  stringArray,
  unique,
  mergeExpanded,
  toggleExpanded,
  createSectionState,
  createSectionStore,
  type SectionStateConfig,
  type SectionStateController,
} from "./core/sectionState";

// Registry
export { buildSections } from "./registry";
