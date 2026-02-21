import type { BaseSection } from "./core/Section";
import type { SectionsDeps } from "./core/Types";

// Concrete sections
import { SettingsSection } from "./Settings";
import { TestSection } from "./Test";
import { AutoFavoriteSettingsSection } from "./AutoFavoriteSettings";
import { PetsSection } from "./Pets";
import { TrackersSection } from "./Trackers";
import { ShopNotifierSection } from "./ShopNotifier";
import { ShopRestockSection } from "./ShopRestock";
import { AlertsSection } from "./Alerts";
import { DevSection } from "./Dev";
import { AvatarSection } from "./Avatar";
import { RoomSection } from "./Room";
import { LockerSection } from "./Locker";
import { SkinChangerSection } from "./SkinChanger/section";

let testSectionInstance: TestSection | null = null;
let alertsSectionInstance: AlertsSection | null = null;
let shopNotifierSectionInstance: ShopNotifierSection | null = null;
let shopRestockSectionInstance: ShopRestockSection | null = null;

function getTestSection(): TestSection {
  if (!testSectionInstance) {
    testSectionInstance = new TestSection();
  }
  return testSectionInstance;
}

function getAlertsSection(): AlertsSection {
  if (!alertsSectionInstance) {
    alertsSectionInstance = new AlertsSection();
  }
  return alertsSectionInstance;
}

function getShopNotifierSection(): ShopNotifierSection {
  if (!shopNotifierSectionInstance) {
    shopNotifierSectionInstance = new ShopNotifierSection();
  }
  return shopNotifierSectionInstance;
}

function getShopRestockSection(): ShopRestockSection {
  if (!shopRestockSectionInstance) {
    shopRestockSectionInstance = new ShopRestockSection();
  }
  return shopRestockSectionInstance;
}

/**
 * Build all available sections
 * Add new sections here to register them in the HUD
 */
export function buildSections(deps: SectionsDeps): BaseSection[] {
  const sections: BaseSection[] = [
    new SettingsSection(deps),
    new AutoFavoriteSettingsSection(),
    getAlertsSection(),
    getShopNotifierSection(),
    getShopRestockSection(),
    new PetsSection(deps),
    new TrackersSection(deps),
    new AvatarSection(),
    new RoomSection(deps),
    new LockerSection(),
  ];

  // Only include developer tools in non-production builds
  // This allows them to be completely stripped out during 'npm run release'
  if (import.meta.env.MODE !== 'production') {
    sections.push(new SkinChangerSection(deps));
    sections.push(new DevSection());
    sections.push(getTestSection());
  }

  return sections;
}

/**
 * Preload heavy sections in background during mod loading
 */
export async function preloadSections(): Promise<void> {
  const alertsSection = getAlertsSection();
  const shopNotifierSection = getShopNotifierSection();
  const shopRestockSection = getShopRestockSection();
  const testSection = getTestSection();

  // Preload in parallel
  await Promise.all([
    alertsSection.preload(),
    shopNotifierSection.preload(),
    shopRestockSection.preload(),
    testSection.preload(),
  ]);
}

