import type { BaseSection } from "./core/Section";
import type { SectionsDeps } from "./core/Types";

// Concrete sections
import { SettingsSection } from "./Settings/Settings";
import { TestSection } from "./Test/Test";

/**
 * Build all available sections
 * Add new sections here to register them in the HUD
 */
export function buildSections(deps: SectionsDeps): BaseSection[] {
  return [
    new SettingsSection(deps),
    new TestSection(),
  ];
}
