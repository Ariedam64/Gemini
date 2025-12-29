import type { BaseSection } from "./core/Section";
import type { SectionsDeps } from "./core/Types";

// Concrete sections
import { SettingsSection } from "./Settings/Settings";
import { TestSection } from "./Test/Test";

let testSectionInstance: TestSection | null = null;

function getTestSection(): TestSection {
  if (!testSectionInstance) {
    testSectionInstance = new TestSection();
  }
  return testSectionInstance;
}

/**
 * Preload heavy sections in background during mod loading
 */
export async function preloadSections(): Promise<void> {
  const testSection = getTestSection();
  await testSection.preload();
}

/**
 * Build all available sections
 * Add new sections here to register them in the HUD
 */
export function buildSections(deps: SectionsDeps): BaseSection[] {
  return [
    new SettingsSection(deps),
    getTestSection(),
  ];
}
