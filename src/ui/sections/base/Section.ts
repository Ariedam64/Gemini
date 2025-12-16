/**
 * Section: unit of content mounted into the HUD panel.
 * id = unique identifier (also tab id), label = displayed text.
 * mount() receives an empty container and can return a cleanup fn.
 */
export type MountResult = void | (() => void);

export type SectionConfig = {
  id: string;
  label: string;
  mount: (container: HTMLElement) => MountResult;
};

export class Section {
  readonly id: string;
  readonly label: string;
  private _mount: (container: HTMLElement) => MountResult;
  private _cleanup: (() => void) | null = null;

  constructor(cfg: SectionConfig) {
    this.id = cfg.id;
    this.label = cfg.label;
    this._mount = cfg.mount;
  }

  /** Mounts the section into the container, handling previous cleanup. */
  render(container: HTMLElement) {
    this.unmount();

    // Reset container
    while (container.firstChild) container.removeChild(container.firstChild);

    // Execute the section mount
    const res = this._mount(container);

    // Auto-activate first .lg-section element if present
    const first = container.firstElementChild as HTMLElement | null;
    if (first && first.classList.contains("lg-section")) {
      first.classList.add("active");
    }

    if (typeof res === "function") this._cleanup = res;
  }

  /** Cleans up listeners/DOM specific to the section. */
  unmount() {
    if (this._cleanup) {
      try { this._cleanup(); } finally { this._cleanup = null; }
    }
  }
}
