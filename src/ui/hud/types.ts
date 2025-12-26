import { BaseSection, SectionManager } from "../sections";
import { createNavTabs } from "../components/NavTabs/NavTabs";

/**
 * HUD persistent state stored in Tampermonkey
 */
export interface HudState {
  isOpen: boolean;
  width: number;
  theme: string;
  activeTab: string;
}

/**
 * Theme definition - maps CSS custom properties to values
 */
export type ThemeMap = Record<string, Record<string, string>>;

/**
 * Dependencies passed to sections builder
 */
export type SectionsBuilderDeps = {
  applyTheme: (name: string) => void;
  initialTheme: string;
  getCurrentTheme: () => string;
  setHUDWidth: (px: number) => void;
  setHUDOpen: (open: boolean) => void;
};

/**
 * Main HUD configuration options
 */
export interface HudOptions {
  hostId?: string;

  // Initial state
  initialWidth: number;
  initialOpen: boolean;
  onWidthChange?: (px: number) => void;
  onOpenChange?: (open: boolean) => void;

  // Theme configuration
  themes: ThemeMap;
  initialTheme: string;
  onThemeChange?: (name: string) => void;

  // Tabs/Sections
  buildSections: (deps: SectionsBuilderDeps) => BaseSection[];
  initialTab?: string;
  onTabChange?: (id: string) => void;

  // Shortcuts / UX
  toggleCombo?: (e: KeyboardEvent) => boolean; // default Ctrl+Shift+U
  closeOnEscape?: boolean; // default true
  minWidth?: number; // default 420
  maxWidth?: number; // default 720
}

/**
 * DOM elements returned by layout creation
 */
export interface HudLayoutElements {
  panel: HTMLDivElement;
  tabbar: HTMLDivElement;
  content: HTMLDivElement;
  resizer: HTMLDivElement;
  closeButton: HTMLButtonElement;
  wrapper: HTMLDivElement;
}

/**
 * Resize handler configuration
 */
export interface ResizeHandlerOptions {
  resizer: HTMLDivElement;
  host: HTMLElement;
  panel: HTMLDivElement;
  shadow: ShadowRoot;
  onWidthChange: (px: number) => void;
  initialWidth: number;
  minWidth: number;
  maxWidth: number;
}

/**
 * Resize handler API
 */
export interface ResizeHandler {
  calculateResponsiveBounds: () => { min: number; max: number };
  constrainWidthToLimits: (px: number) => number;
  setHudWidth: (px: number) => void;
  destroy: () => void;
}

/**
 * Theme manager configuration
 */
export interface ThemeManagerOptions {
  host: HTMLElement;
  themes: ThemeMap;
  initialTheme: string;
  onThemeChange?: (name: string) => void;
}

/**
 * Theme manager API
 */
export interface ThemeManager {
  applyTheme: (name: string) => void;
  getCurrentTheme: () => string;
}

/**
 * Keyboard shortcuts configuration
 */
export interface KeyboardShortcutsOptions {
  panel: HTMLDivElement;
  onToggle: () => void;
  onClose: () => void;
  toggleCombo?: (e: KeyboardEvent) => boolean;
  closeOnEscape?: boolean;
}

/**
 * Keyboard shortcuts API
 */
export interface KeyboardShortcuts {
  destroy: () => void;
}

/**
 * Main HUD instance
 */
export interface Hud {
  host: HTMLElement;
  shadow: ShadowRoot;
  wrapper: HTMLDivElement;
  panel: HTMLDivElement;
  content: HTMLDivElement;
  setOpen: (open: boolean) => void;
  setWidth: (px: number) => void;
  sections?: BaseSection[];
  manager?: SectionManager;
  nav?: ReturnType<typeof createNavTabs>;
  destroy: () => void;
}
