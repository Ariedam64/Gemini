/**
 * Sections module exports
 * Centralized exports for all sections functionality
 */

// Core classes
export { BaseSection } from "./core/Section";
export { SectionManager } from "./core/Manager";

// Types
export type {
  SectionConfig,
  MountResult,
  SectionsDeps,
  SectionsThemeDeps,
} from "./core/Types";

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
} from "./core/State";

// Registry
export { buildSections } from "./registry";
