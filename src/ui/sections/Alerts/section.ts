/**
 * Alerts Section - Main UI
 *
 * Displays notification settings for shops and other alerts
 */

import { BaseSection } from "../core/Section";
import { injectStyleOnce } from "../../styles/inject";
import { alertsCss } from "./styles.css";
import { initSectionState } from "./state";
import { createShopsCard, createWeatherCard } from "./parts";

export class AlertsSection extends BaseSection {
  private sectionElement: HTMLElement | null = null;
  private shopsCard: ReturnType<typeof createShopsCard> | null = null;
  private weatherCard: ReturnType<typeof createWeatherCard> | null = null;

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

    // Wait for MGData categories needed for shop items and weather
    const { MGData } = await import("../../../modules");
    await Promise.all([
      MGData.waitFor("plants"),
      MGData.waitFor("items"),
      MGData.waitFor("eggs"),
      MGData.waitFor("decor"),
      MGData.waitFor("weather"),
      MGData.waitFor("mutations"),
    ]);

    // Build parts
    this.buildParts();

    container.appendChild(section);
  }

  render(container: HTMLElement): void {
    // IMPORTANT: Clear card references BEFORE super.render()
    // super.render() calls unmount() which calls destroy()
    // We need to prevent destroy() from destroying preloaded content
    const preloadedShopsCard = this.shopsCard;
    const preloadedWeatherCard = this.weatherCard;
    this.shopsCard = null; // Clear reference so destroy() doesn't destroy it
    this.weatherCard = null;

    // Call parent render to show preloaded content
    super.render(container);

    // Restore the references after rendering (content is now in the real container)
    this.shopsCard = preloadedShopsCard;
    this.weatherCard = preloadedWeatherCard;
  }

  private buildParts(): void {
    if (!this.sectionElement) return;

    // Single unified shops card with filters
    this.shopsCard = createShopsCard();
    this.sectionElement.appendChild(this.shopsCard.root);

    // Weather card
    this.weatherCard = createWeatherCard();
    this.sectionElement.appendChild(this.weatherCard.root);
  }

  protected async destroy(): Promise<void> {
    // Cleanup shops card
    if (this.shopsCard) {
      this.shopsCard.destroy();
      this.shopsCard = null;
    }

    // Cleanup weather card
    if (this.weatherCard) {
      this.weatherCard.destroy();
      this.weatherCard = null;
    }

    // Cleanup
    this.sectionElement = null;
  }
}
