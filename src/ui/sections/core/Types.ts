/**
 * Common types for sections system
 */

/**
 * Dependencies passed to sections builder from HUD
 */
export type SectionsDeps = {
  applyTheme: (name: string) => void;
  initialTheme: string;
  getCurrentTheme: () => string;
  setHUDWidth?: (px: number) => void;
  setHUDOpen?: (open: boolean) => void;
};

/**
 * Dependencies with additional HUD controls
 */
export type SectionsThemeDeps = {
  applyTheme: (name: string) => void;
  getCurrentTheme: () => string;
};

/**
 * Configuration for creating a section
 */
export type SectionConfig = {
  id: string;
  label: string;
};

/**
 * Result returned by mount function
 * Can be void or a cleanup function
 */
export type MountResult = void | (() => void);
