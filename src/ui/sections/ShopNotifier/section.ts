/**
 * Shop Notifier Section - Main UI
 *
 * Displays tracked items per shop type with configuration options
 */

import { BaseSection } from "../core/Section";
import { injectStyleOnce } from "../../styles/inject";
import { shopNotifierCss } from "./styles.css";
import { initSectionState } from "./state";
import { createSettingsCard, createShopCard } from "./parts";
import type { ShopType } from "../../../globals/core/types";

const SHOP_TYPES: ShopType[] = ["seed", "tool", "egg", "decor"];

export class ShopNotifierSection extends BaseSection {
  private sectionElement: HTMLElement | null = null;
  private settingsCard: ReturnType<typeof createSettingsCard> | null = null;
  private shopCards: Map<ShopType, ReturnType<typeof createShopCard>> = new Map();

  constructor() {
    super({ id: "tab-shop-notifier", label: "Shop Alerts" });
  }

  protected async build(container: HTMLElement): Promise<void> {
    // Initialize section state
    await initSectionState();

    // Inject stylesheet
    const shadow = container.getRootNode() as ShadowRoot;
    injectStyleOnce(shadow, shopNotifierCss, "shop-notifier-styles");

    // Create main section grid
    const section = this.createGrid("12px");
    section.id = "shop-notifier-section";
    this.sectionElement = section;

    // Build parts
    this.buildParts();

    container.appendChild(section);
  }

  render(container: HTMLElement): void {
    // Call parent render to show preloaded content
    super.render(container);

    // Refresh shop card data to ensure latest state is displayed
    this.refreshShopCards();
  }

  private buildParts(): void {
    if (!this.sectionElement) return;

    // Settings card at the top
    this.settingsCard = createSettingsCard();
    this.sectionElement.appendChild(this.settingsCard.root);

    // Shop cards for each shop type
    for (const shopType of SHOP_TYPES) {
      const shopCard = createShopCard({ shopType });
      this.shopCards.set(shopType, shopCard);
      this.sectionElement.appendChild(shopCard.root);
    }
  }

  private refreshShopCards(): void {
    for (const [shopType, shopCard] of this.shopCards) {
      shopCard.refresh?.();
    }
  }

  protected async destroy(): Promise<void> {
    // Cleanup
    this.settingsCard = null;
    this.shopCards.clear();
    this.sectionElement = null;
  }
}
