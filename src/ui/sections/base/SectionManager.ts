import { Section } from "./Section";

export type SectionsThemeDeps = {
  applyTheme: (name: string) => void;
  getCurrentTheme: () => string; // ex: () => getV(K.theme, DEF.theme)
};

/**
 * Minimal section manager.
 * Drives tab activation and mounts/unmounts the active section.
 * Re-applies theme on each activation when provided.
 */
export class SectionManager {
  private sections: Map<string, Section>;
  private activeId: string | null = null;
  private container: HTMLElement;
  private theme?: SectionsThemeDeps;

  constructor(sections: Section[], container: HTMLElement, theme?: SectionsThemeDeps) {
    this.sections = new Map(sections.map(s => [s.id, s]));
    this.container = container;
    this.theme = theme;
  }

  get ids() { return Array.from(this.sections.keys()); }
  get all() { return Array.from(this.sections.values()); }
  get active() { return this.activeId; }

  activate(id: string) {
    if (this.activeId === id) return;
    if (!this.sections.has(id)) throw new Error("Unknown source: " + id);

    // cleanup previous
    if (this.activeId) this.sections.get(this.activeId)!.unmount();

    this.activeId = id;
    this.sections.get(id)!.render(this.container);

    // Auto-apply theme on each activation
    if (this.theme) {
      const name = this.theme.getCurrentTheme();
      this.theme.applyTheme(name);
    }
  }
}
