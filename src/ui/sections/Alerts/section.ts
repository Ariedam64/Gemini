/**
 * Alerts Section - Main UI
 *
 * Displays notification settings for shops and other alerts
 */

import { BaseSection } from "../core/Section";
import { injectStyleOnce } from "../../styles/inject";
import { alertsCss } from "./styles.css";
import { initSectionState } from "./state";
import { createShopsCard } from "./parts";

export class AlertsSection extends BaseSection {
  private sectionElement: HTMLElement | null = null;
  private shopsCard: ReturnType<typeof createShopsCard> | null = null;

  constructor() {
    super({ id: "tab-alerts", label: "Alerts" });
  }

  protected async build(container: HTMLElement): Promise<void> {
    // Initialize section state
    await initSectionState();

    // Inject stylesheet
    const shadow = container.getRootNode() as ShadowRoot;
    injectStyleOnce(shadow, alertsCss, "alerts-styles");

    // Create main section grid
    const section = this.createGrid("12px");
    section.id = "alerts-section";
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
    // IMPORTANT: Clear shopsCard reference BEFORE super.render()
    // super.render() calls unmount() which calls destroy()
    // We need to prevent destroy() from destroying preloaded content
    const preloadedShopsCard = this.shopsCard;
    this.shopsCard = null; // Clear reference so destroy() doesn't destroy it

    // Call parent render to show preloaded content
    super.render(container);

    // Restore the reference after rendering (content is now in the real container)
    this.shopsCard = preloadedShopsCard;
  }

  private buildParts(): void {
    if (!this.sectionElement) return;

    // Single unified shops card with filters
    this.shopsCard = createShopsCard();
    this.sectionElement.appendChild(this.shopsCard.root);
  }

  protected async destroy(): Promise<void> {
    // Cleanup shops card
    if (this.shopsCard) {
      this.shopsCard.destroy();
      this.shopsCard = null;
    }

    // Cleanup
    this.sectionElement = null;
  }
}
