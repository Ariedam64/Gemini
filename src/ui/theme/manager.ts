/**
 * Theme Manager
 * Handles theme application with smooth transitions
 */

import { pageWindow } from "../../utils/windowContext";

export type ThemeVars = Record<string, string>;
export type ThemeMap = Record<string, ThemeVars>;

export interface ThemeManagerOptions {
  host: HTMLElement;
  themes: ThemeMap;
  initialTheme: string;
  onThemeChange?: (name: string) => void;
}

export interface ThemeManager {
  applyTheme: (name: string) => void;
  getCurrentTheme: () => string;
}

/**
 * Create theme manager
 */
export function createThemeManager(options: ThemeManagerOptions): ThemeManager {
  const { host, themes, initialTheme, onThemeChange } = options;

  let currentTheme = initialTheme;
  let themeAnimationTimer: number | null = null;
  let isInitialized = false;

  /**
   * Apply a theme by setting CSS custom properties on the host element
   * Adds transition animation after first application
   */
  function applyTheme(themeName: string): void {
    const themeDefinition = themes[themeName] || themes[currentTheme] || {};

    // Add animation class after first initialization
    if (isInitialized) {
      host.classList.add("theme-anim");
    }

    // Apply all CSS custom properties from theme
    for (const [propertyName, propertyValue] of Object.entries(themeDefinition)) {
      host.style.setProperty(propertyName, propertyValue as string);
    }

    // Remove animation class after transition completes
    if (isInitialized) {
      if (themeAnimationTimer !== null) {
        clearTimeout(themeAnimationTimer);
      }
      themeAnimationTimer = pageWindow.setTimeout(() => {
        host.classList.remove("theme-anim");
        themeAnimationTimer = null;
      }, 320); // Match CSS transition duration
    } else {
      isInitialized = true;
    }

    currentTheme = themeName;
    onThemeChange?.(themeName);
  }

  /**
   * Get the currently active theme name
   */
  function getCurrentTheme(): string {
    return currentTheme;
  }

  // Apply initial theme
  applyTheme(initialTheme);

  return {
    applyTheme,
    getCurrentTheme,
  };
}
