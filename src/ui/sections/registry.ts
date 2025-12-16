import type { Section } from "./base/Section";

export type SectionsDeps = {
  // Theme: initial + apply. No global HUD setters here.
  applyTheme: (name: string) => void;
  initialTheme: string;
  getCurrentTheme: () => string;
};

// Concrete sections
import { createSettingsSection } from "./Settings/settings";
import { createTestSection } from "./Test/test";

export function buildSections(deps: SectionsDeps): Section[] {
  return [
    createSettingsSection({
      applyTheme: deps.applyTheme,
      initialTheme: deps.initialTheme,
      getCurrentTheme: deps.getCurrentTheme,
    }),
    createTestSection(),
  ];
}
