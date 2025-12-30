import type { BaseSection } from "./core/Section";
import type { SectionsDeps } from "./core/Types";

// Concrete sections
import { SettingsSection } from "./Settings/settings";
import { TestSection } from "./Test/test";
import { AutoFavoriteSettingsSection } from "./AutoFavoriteSettings/AutoFavoriteSettings";
import { FeatureSettingsSection } from "./FeatureSettings/FeatureSettings";
import { JournalCheckerSection } from "./JournalChecker/JournalChecker";

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
    new FeatureSettingsSection(),
    new AutoFavoriteSettingsSection(),
    new JournalCheckerSection(),
    getTestSection(),
  ];
}
