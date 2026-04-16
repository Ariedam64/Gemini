import type { BaseSection } from "./core/Section";
import type { SectionsDeps } from "./core/Types";

// Concrete sections
import { SettingsSection } from "./Settings";
import { PetsSection } from "./Pets";

import { AlertsSection } from "./Alerts";
import { AvatarSection } from "./Avatar";
import { RoomSection } from "./Room";
import { LockerSection } from "./Locker";

let alertsSectionInstance: AlertsSection | null = null;
let lockerSectionInstance: LockerSection | null = null;

function getAlertsSection(): AlertsSection {
  if (!alertsSectionInstance) {
    alertsSectionInstance = new AlertsSection();
  }
  return alertsSectionInstance;
}

function getLockerSection(): LockerSection {
  if (!lockerSectionInstance) {
    lockerSectionInstance = new LockerSection();
  }
  return lockerSectionInstance;
}

/**
 * Build all available sections
 * Add new sections here to register them in the HUD
 */
export function buildSections(deps: SectionsDeps): BaseSection[] {
  const sections: BaseSection[] = [
    new SettingsSection(deps),
    getAlertsSection(),
    new PetsSection(deps),

    new AvatarSection(),
    new RoomSection(deps),
    getLockerSection(),
  ];


  return sections;
}

/**
 * Preload heavy sections in background during mod loading
 */
export async function preloadSections(): Promise<void> {
  const alertsSection = getAlertsSection();
  const lockerSection = getLockerSection();

  // Preload in parallel
  await Promise.all([
    alertsSection.preload(),
    lockerSection.preload(),
  ]);
}

