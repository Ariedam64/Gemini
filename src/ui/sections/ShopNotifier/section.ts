/**
 * Shop Notifier Section - Main UI
 *
 * Displays tracked items per shop type with configuration options
 */

import { BaseSection } from "../core/Section";
import { injectStyleOnce } from "../../styles/inject";
import { shopNotifierCss } from "./styles.css";
import { initSectionState } from "./state";
import { createShopCard } from "./parts";
import type { ShopType } from "../../../globals/core/types";

const SHOP_TYPES: ShopType[] = ["seed", "tool", "egg", "decor"];

export class ShopNotifierSection extends BaseSection {
  private sectionElement: HTMLElement | null = null;
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

    // Wait for MGData categories needed for shop items
    const { MGData } = await import("../../../modules");
    await Promise.all([
      MGData.waitFor("plants"),
      MGData.waitFor("items"),
      MGData.waitFor("eggs"),
      MGData.waitFor("decor"),
    ]);

    // Build parts
    this.buildParts();

    container.appendChild(section);
  }

  render(container: HTMLElement): void {
    // Call parent render to show preloaded content
    super.render(container);
  }

  private buildParts(): void {
    if (!this.sectionElement) return;

    // Shop cards for each shop type
    for (const shopType of SHOP_TYPES) {
      const shopCard = createShopCard({ shopType });
      this.shopCards.set(shopType, shopCard);
      this.sectionElement.appendChild(shopCard.root);
    }
  }

  protected async destroy(): Promise<void> {
    // Cleanup shop cards
    for (const shopCard of this.shopCards.values()) {
      shopCard.destroy?.();
    }
    this.shopCards.clear();

    // Cleanup
    this.sectionElement = null;
  }
}
