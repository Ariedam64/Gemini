/**
 * BaseSection - Base class for all sections
 * Provides lifecycle management, cleanup utilities, and common helpers
 */

import { element } from "../../styles/helpers";
import type { SectionConfig, MountResult } from "./Types";

export abstract class BaseSection {
  readonly id: string;
  readonly label: string;

  protected container: HTMLElement | null = null;
  private cleanupFunctions: (() => void)[] = [];

  constructor(config: SectionConfig) {
    this.id = config.id;
    this.label = config.label;
  }

  /**
   * Abstract method that sections must implement
   * This is where the section builds its UI
   */
  protected abstract build(container: HTMLElement): void | Promise<void>;

  /**
   * Renders the section into the container
   * Called by SectionManager when the section is activated
   */
  render(container: HTMLElement): void {
    this.unmount();

    // Reset container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    this.container = container;

    // Execute the section build
    const result = this.build(container);

    // Support async build
    if (result instanceof Promise) {
      result.catch((error) => {
        console.error(`[Gemini] Error building section ${this.id}:`, error);
      });
    }

    // Auto-activate first .gemini-section element if present
    const firstSection = container.firstElementChild as HTMLElement | null;
    if (firstSection && firstSection.classList.contains("gemini-section")) {
      firstSection.classList.add("active");
    }
  }

  /**
   * Cleans up listeners/DOM specific to the section
   */
  unmount(): void {
    this.executeCleanup();
    this.container = null;
  }

  /**
   * Helper: Create a section container with proper class names
   */
  protected createContainer(id: string, additionalClasses?: string): HTMLElement {
    const classes = additionalClasses
      ? `gemini-section ${additionalClasses}`
      : "gemini-section";

    return element("section", {
      id,
      className: classes,
    }) as HTMLElement;
  }

  /**
   * Helper: Register a cleanup function to be called on unmount
   * Useful for event listeners, intervals, etc.
   */
  protected addCleanup(fn: () => void): void {
    this.cleanupFunctions.push(fn);
  }

  /**
   * Helper: Create a grid container for section content
   */
  protected createGrid(gap = "12px"): HTMLElement {
    const grid = element("div") as HTMLDivElement;
    grid.style.display = "grid";
    grid.style.gap = gap;
    return grid;
  }

  /**
   * Execute all registered cleanup functions
   */
  private executeCleanup(): void {
    for (const cleanup of this.cleanupFunctions) {
      try {
        cleanup();
      } catch (error) {
        console.error(`[Gemini] Cleanup error in section ${this.id}:`, error);
      }
    }
    this.cleanupFunctions = [];
  }
}
