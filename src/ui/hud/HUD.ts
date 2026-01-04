/**
 * Main HUD factory - orchestrates all HUD components
 * Refactored for better modularity and clarity
 */

import { createNavTabs } from "../components/NavTabs/NavTabs";
import { SectionManager } from "../sections";
import { pageWindow } from "../../utils/windowContext";

/* ================================ Shadow DOM Host ================================ */

const DEFAULT_HOST_STYLES: Partial<CSSStyleDeclaration> = {
  all: "initial",
  position: "fixed",
  top: "0",
  right: "0",
  zIndex: "2147483647",
  pointerEvents: "auto",
  fontFamily:
    'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
  fontSize: "13px",
  lineHeight: "1.35",
};

function attachHost(id = "gemini-root"): {
  host: HTMLDivElement;
  shadow: ShadowRoot;
} {
  const host = document.createElement("div");
  host.id = id;
  Object.assign(host.style, DEFAULT_HOST_STYLES);

  (document.body || document.documentElement).appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });

  return { host, shadow };
}

/* ================================ Imports ================================ */

// HUD modules
import { Hud, HudOptions } from "./types";
import { createHudLayout } from "./layout";
import { createResizeHandler } from "./resize";
import { setupKeyboardShortcuts } from "./keyboard";

// Theme
import { createThemeManager } from "../theme";

// Styles
import { hudCss } from "./styles.css";
import { injectStyleOnce, variablesCss, primitivesCss, utilitiesCss } from "../styles";

// Component styles
import { cardCss } from "../components/Card/card.css";
import { badgeCss } from "../components/Badge/badge.css";
import { buttonCss } from "../components/Button/button.css";
import { inputCss } from "../components/Input/input.css";
import { labelCss } from "../components/Label/label.css";
import { navTabsCss } from "../components/NavTabs/navTabs.css";
import { searchBarCss } from "../components/SearchBar/searchBar.css";
import { selectCss } from "../components/Select/select.css";
import { switchCss } from "../components/Switch/switch.css";
import { tableCss } from "../components/Table/table.css";
import { teamListItemCss } from "../components/TeamListItem/teamListItem.css";
import { timeRangePickerCss } from "../components/TimeRangePicker/timeRangePicker.css";
import { tooltipCss } from "../components/Tooltip/tooltip.css";
import { sliderCss } from "../components/Slider/slider.css";
import { reorderableListCss } from "../components/ReorderableList/reorderableList.css";
import { colorPickerCss } from "../components/ColorPicker/colorPicker.css";
import { logCss } from "../components/Log/log.css";

// Section styles
import { settingsCss } from "../sections/Settings/styles.css";

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => resolve(), { timeout: 16 });
    } else {
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Create and initialize the HUD
 */
export async function createHUD(opts: HudOptions): Promise<Hud> {
  const {
    hostId = "gemini-hud-root",

    initialWidth,
    initialOpen,
    onWidthChange,
    onOpenChange,

    themes,
    initialTheme,
    onThemeChange,

    buildSections,
    initialTab,
    onTabChange,

    toggleCombo = (e) => e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "u",
    closeOnEscape = true,
    minWidth = 420,
    maxWidth = 720,
  } = opts;

  // ===== 1. Host + Shadow + CSS Injection =====
  const { host, shadow } = attachHost(hostId);

  // Inject all styles in batches with yields to avoid blocking
  const styleInjections: [string, string][] = [
    [variablesCss, "variables"],
    [primitivesCss, "primitives"],
    [utilitiesCss, "utilities"],
    [hudCss, "hud"],
    [cardCss, "card"],
    [badgeCss, "badge"],
    [buttonCss, "button"],
    [inputCss, "input"],
    [labelCss, "label"],
    [navTabsCss, "navTabs"],
    [searchBarCss, "searchBar"],
    [selectCss, "select"],
    [switchCss, "switch"],
    [tableCss, "table"],
    [teamListItemCss, "teamListItem"],
    [timeRangePickerCss, "timeRangePicker"],
    [tooltipCss, "tooltip"],
    [sliderCss, "slider"],
    [reorderableListCss, "reorderableList"],
    [colorPickerCss, "colorPicker"],
    [logCss, "log"],
    [settingsCss, "settings"],
  ];

  for (let i = 0; i < styleInjections.length; i++) {
    const [css, id] = styleInjections[i];
    injectStyleOnce(shadow, css, id);
    if (i % 5 === 4) {
      await yieldToMain();
    }
  }

  // ===== 2. Create DOM Structure =====
  const { panel, tabbar, content, resizer, closeButton, wrapper } = createHudLayout({
    shadow,
    initialOpen,
  });

  // ===== 3. Open/Close Management =====
  function dispatchHudOpenEvent(isOpen: boolean): void {
    panel.dispatchEvent(
      new CustomEvent("gemini:hud-open-change", {
        detail: { isOpen },
        bubbles: true,
      })
    );
    onOpenChange?.(isOpen);
  }

  function setHudOpen(isOpen: boolean): void {
    const wasOpen = panel.classList.contains("open");
    panel.classList.toggle("open", isOpen);
    panel.setAttribute("aria-hidden", isOpen ? "false" : "true");

    if (isOpen !== wasOpen) {
      dispatchHudOpenEvent(isOpen);
    }
  }

  // Initialize open state
  setHudOpen(initialOpen);

  // Close button handler
  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHudOpen(false);
  });

  // ===== 4. Theme Management =====
  const themeManager = createThemeManager({
    host: host as HTMLElement,
    themes,
    initialTheme,
    onThemeChange,
  });

  // ===== 5. Resize Management =====
  const resizeHandler = createResizeHandler({
    resizer,
    host: host as HTMLElement,
    panel,
    shadow,
    onWidthChange: onWidthChange || (() => { }),
    initialWidth,
    minWidth,
    maxWidth,
  });

  // Initialize width
  resizeHandler.setHudWidth(initialWidth);

  // ===== 6. Sections + Navigation =====
  const sections = buildSections({
    applyTheme: themeManager.applyTheme,
    initialTheme,
    getCurrentTheme: themeManager.getCurrentTheme,
    setHUDWidth: resizeHandler.setHudWidth,
    setHUDOpen: setHudOpen,
  });

  const manager = new SectionManager(sections, content, {
    applyTheme: themeManager.applyTheme,
    getCurrentTheme: themeManager.getCurrentTheme,
  });

  const tabs = sections.map((s) => ({ id: s.id, label: s.label }));

  // Resilient tab selection: ensure initialTab actually exists, else fallback to first available
  const activeTabId = (initialTab && sections.some(s => s.id === initialTab))
    ? initialTab
    : (tabs[0]?.id || "");

  const nav = createNavTabs(tabs, activeTabId, (id) => {
    manager.activate(id);
    onTabChange?.(id);
  });

  // Nav takes all available width
  nav.root.style.flex = "1 1 auto";
  nav.root.style.minWidth = "0";

  // Assemble tabbar: nav (flex:1) + close button
  tabbar.append(nav.root, closeButton);

  // Activate initial tab
  if (activeTabId) {
    manager.activate(activeTabId);
  }

  // ===== 7. Keyboard Shortcuts =====
  const keyboardShortcuts = setupKeyboardShortcuts({
    panel,
    onToggle: () => setHudOpen(!panel.classList.contains("open")),
    onClose: () => setHudOpen(false),
    toggleCombo,
    closeOnEscape,
  });

  // ===== 8. Resize Observer & Layout Events =====
  const handleResize = (): void => {
    nav.recalc();
    const currentWidth =
      parseInt(getComputedStyle(host as HTMLElement).getPropertyValue("--w")) || initialWidth;
    resizeHandler.calculateResponsiveBounds();
    resizeHandler.setHudWidth(currentWidth);
  };
  pageWindow.addEventListener("resize", handleResize);

  const handleLayoutResize = (e: any): void => {
    const width = e.detail?.width;
    if (width) resizeHandler.setHudWidth(width);
    else resizeHandler.setHudWidth(initialWidth);
    nav.recalc();
  };
  host.addEventListener("gemini:layout-resize", handleLayoutResize);

  // ===== 9. Cleanup =====
  function destroy(): void {
    keyboardShortcuts.destroy();
    resizeHandler.destroy();
    pageWindow.removeEventListener("resize", handleResize);
    host.removeEventListener("gemini:layout-resize", handleLayoutResize);
  }

  // ===== 10. Return HUD Instance =====
  return {
    host: host as HTMLElement,
    shadow,
    wrapper,
    panel,
    content,
    setOpen: setHudOpen,
    setWidth: resizeHandler.setHudWidth,
    sections,
    manager,
    nav,
    destroy,
  };
}
