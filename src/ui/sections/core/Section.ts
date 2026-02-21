/**
 * BaseSection - Base class for all sections
 * Provides lifecycle management, cleanup utilities, and common helpers
 */

import { element } from "../../styles/helpers";
import type { SectionConfig } from "./Types";

export abstract class BaseSection {
  readonly id: string;
  readonly label: string;

  protected container: HTMLElement | null = null;
  private cleanupFunctions: (() => void)[] = [];
  private preloadedContent: HTMLElement | null = null;
  private preloadPromise: Promise<void> | null = null;

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
   * Optional lifecycle hook - override to cleanup section-specific resources
   * Called automatically when section is unmounted
   */
  protected destroy(): void | Promise<void> {
    // Override in subclasses to cleanup resources (listeners, subscriptions, etc.)
  }

  /**
   * Preload the section content in background
   * Creates content in a detached container for later use
   */
  async preload(): Promise<void> {
    if (this.preloadedContent || this.preloadPromise) return;

    const tempContainer = element("div") as HTMLDivElement;

    this.preloadPromise = (async () => {
      const result = this.build(tempContainer);
      if (result instanceof Promise) {
        await result;
      }
      this.preloadedContent = tempContainer;
      this.preloadPromise = null;
    })();

    await this.preloadPromise;
  }

  /**
   * Check if section has preloaded content ready
   */
  isPreloaded(): boolean {
    return this.preloadedContent !== null;
  }

  /**
   * Renders the section into the container
   * Called by SectionManager when the section is activated
   */
  render(container: HTMLElement): void {
    // Only unmount if there's a previous render to clean up.
    // Skipping on first render preserves event listeners from preload().
    if (this.container !== null) {
      this.unmount();
    }

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    this.container = container;

    if (this.preloadedContent) {
      while (this.preloadedContent.firstChild) {
        container.appendChild(this.preloadedContent.firstChild);
      }
      this.preloadedContent = null;
    } else {
      const result = this.build(container);

      if (result instanceof Promise) {
        result.catch((error) => {
          console.error(`[Gemini] Error building section ${this.id}:`, error);
        });
      }
    }

    const firstSection = container.firstElementChild as HTMLElement | null;
    if (firstSection && firstSection.classList.contains("gemini-section")) {
      firstSection.classList.add("active");
    }
  }

  /**
   * Cleans up listeners/DOM specific to the section
   */
  unmount(): void {
    // Call destroy hook first (for section-specific cleanup)
    const destroyResult = this.destroy();
    if (destroyResult instanceof Promise) {
      destroyResult.catch((err) => {
        console.error(`[Gemini] Destroy error in section ${this.id}:`, err);
      });
    }

    // Then execute registered cleanup functions
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
