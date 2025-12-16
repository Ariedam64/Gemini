export { Section, type SectionConfig, type MountResult } from "./base/Section";
export { SectionManager, type SectionsThemeDeps } from "./base/SectionManager";

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
} from "./state/sectionState";

export { buildSections, type SectionsDeps } from "./registry";
