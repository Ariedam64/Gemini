import { BaseSection } from "./BaseSection";
import type { SectionsThemeDeps } from "./sectionTypes";

/**
 * Section Manager
 * Manages section lifecycle: activation, mounting, unmounting
 * Re-applies theme on each activation when provided
 */
export class SectionManager {
  private sections: Map<string, BaseSection>;
  private activeId: string | null = null;
  private container: HTMLElement;
  private theme?: SectionsThemeDeps;

  constructor(sections: BaseSection[], container: HTMLElement, theme?: SectionsThemeDeps) {
    this.sections = new Map(sections.map((s) => [s.id, s]));
    this.container = container;
    this.theme = theme;
  }

  get ids(): string[] {
    return Array.from(this.sections.keys());
  }

  get all(): BaseSection[] {
    return Array.from(this.sections.values());
  }

  get active(): string | null {
    return this.activeId;
  }

  /**
   * Activate a section by ID
   * Unmounts the previous section and renders the new one
   */
  activate(id: string): void {
    if (this.activeId === id) return;
    if (!this.sections.has(id)) {
      throw new Error(`[Gemini] Unknown section: ${id}`);
    }

    // Cleanup previous section
    if (this.activeId) {
      this.sections.get(this.activeId)!.unmount();
    }

    this.activeId = id;
    this.sections.get(id)!.render(this.container);

    // Auto-apply theme on each activation
    if (this.theme) {
      const name = this.theme.getCurrentTheme();
      this.theme.applyTheme(name);
    }
  }
}
