import type { BaseSection } from "./core/Section";
import type { SectionsDeps } from "./core/Types";

// Concrete sections
import { SettingsSection } from "./Settings";
import { TestSection } from "./Test";
import { AutoFavoriteSettingsSection } from "./AutoFavoriteSettings";
import { JournalCheckerSection } from "./JournalChecker";
import { PetsSection } from "./Pets";
import { DevSection } from "./Dev";

let testSectionInstance: TestSection | null = null;

function getTestSection(): TestSection {
  if (!testSectionInstance) {
    testSectionInstance = new TestSection();
  }
  return testSectionInstance;
}

/**
 * Build all available sections
 * Add new sections here to register them in the HUD
 */
export function buildSections(deps: SectionsDeps): BaseSection[] {
  const sections: BaseSection[] = [
    new SettingsSection(deps),
    new AutoFavoriteSettingsSection(),
    new JournalCheckerSection(),
    new PetsSection(deps),
  ];

  // Only include developer tools in non-production builds
  // This allows them to be completely stripped out during 'npm run release'
  if (import.meta.env.MODE !== 'production') {
    sections.push(new DevSection());
    sections.push(getTestSection());
  }

  return sections;
}

/**
 * Preload heavy sections in background during mod loading
 */
export async function preloadSections(): Promise<void> {
  const testSection = getTestSection();
  await testSection.preload();
}

