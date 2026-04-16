/**
 * Main HUD factory - orchestrates all HUD components
 * Refactored for better modularity and clarity
 */

import { createNavTabs } from "../components/NavTabs/NavTabs";
import { SectionManager } from "../sections";
import { pageWindow } from "../../utils/windowContext";
import { storageGet, FEATURE_KEYS, EVENTS } from "../../utils/storage";
import { startVersionChecker } from "../../utils/version";

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

function attachHost(id = "gemini-root", appendToDOM = true): {
  host: HTMLDivElement;
  shadow: ShadowRoot;
} {
  const host = document.createElement("div");
  host.id = id;
  Object.assign(host.style, DEFAULT_HOST_STYLES);

  // On Firefox, attaching the Shadow DOM host to the DOM immediately causes
  // massive perf overhead (~100fps drop) even when the HUD is hidden.
  // If the HUD starts closed, defer DOM attachment until it's opened.
  if (appendToDOM) {
    (document.body || document.documentElement).appendChild(host);
  }
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
import { checkboxCss } from "../components/Checkbox/checkbox.css";
import { tableCss } from "../components/Table/table.css";
import { teamListItemCss } from "../components/TeamListItem/teamListItem.css";
import { timeRangePickerCss } from "../components/TimeRangePicker/timeRangePicker.css";
import { tooltipCss } from "../components/Tooltip/tooltip.css";
import { sliderCss } from "../components/Slider/slider.css";
import { reorderableListCss } from "../components/ReorderableList/reorderableList.css";
import { colorPickerCss } from "../components/ColorPicker/colorPicker.css";
import { logCss } from "../components/Log/log.css";
import { segmentedControlCss } from "../components/SegmentedControl/segmentedControl.css";
import { soundPickerCss } from "../components/SoundPicker/soundPicker.css";

// Section styles
import { settingsCss } from "../sections/Settings/styles.css";
import { teamCardCss } from "../sections/Pets/parts/team/teamCard.css";

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
  const { host, shadow } = attachHost(hostId, !!initialOpen);

  // Firefox perf: use adoptedStyleSheets instead of <style> DOM elements.
  // Shadow DOM <style> elements force Firefox to recalculate styles every frame.
  // adoptedStyleSheets uses CSSStyleSheet objects which are processed more
  // efficiently — no DOM nodes, shared/cached by the browser engine.
  const allCss = [
    variablesCss,
    primitivesCss,
    utilitiesCss,
    hudCss,
    cardCss,
    badgeCss,
    buttonCss,
    checkboxCss,
    inputCss,
    labelCss,
    navTabsCss,
    searchBarCss,
    selectCss,
    switchCss,
    tableCss,
    teamListItemCss,
    timeRangePickerCss,
    tooltipCss,
    sliderCss,
    reorderableListCss,
    colorPickerCss,
    logCss,
    segmentedControlCss,
    soundPickerCss,
    settingsCss,
    teamCardCss,
  ].join('\n');

  if ('adoptedStyleSheets' in shadow) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(allCss);
    shadow.adoptedStyleSheets = [sheet];
  } else {
    // Fallback for older browsers
    injectStyleOnce(shadow, allCss, "gemini-combined");
  }

  // ===== 2. Create DOM Structure =====
  const { panel, tabbar, content, footer, resizer, closeButton, wrapper } = createHudLayout({
    shadow,
    initialOpen,
  });

  // ===== 2b. Version Checker =====
  // footer is a plain div (created by createHudFooter inside layout).
  // We import createHudFooter's update logic via the footer element directly —
  // but since layout creates the handle internally, we wire the checker here
  // using a lightweight approach: find the handle's update method via the element.
  // Instead, we expose it via a typed wrapper below.
  const stopVersionChecker = startVersionChecker((info) => {
    // Update version text + show/hide update button
    const versionEl = footer.querySelector<HTMLElement>(".gemini-footer__version");
    const updateBtn = footer.querySelector<HTMLElement>(".gemini-footer__update-btn");
    if (versionEl) {
      versionEl.textContent = info.hasUpdate && info.remote
        ? `v${info.local} → v${info.remote}`
        : `v${info.local}`;
    }
    if (updateBtn) {
      updateBtn.style.display = info.hasUpdate ? "inline-flex" : "none";
    }
    footer.classList.toggle("gemini-footer--has-update", info.hasUpdate);
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

  // Track pending close timeout so we can cancel it if re-opened quickly
  let closeTimerId: ReturnType<typeof setTimeout> | null = null;
  const TRANSITION_MS = 300; // slightly above CSS .28s to ensure animation completes

  function setHudOpen(isOpen: boolean): void {
    const wasOpen = panel.classList.contains("open");
    if (isOpen === wasOpen && (isOpen === host.isConnected)) return;

    // Cancel any pending close removal
    if (closeTimerId !== null) {
      clearTimeout(closeTimerId);
      closeTimerId = null;
    }

    if (isOpen) {
      // ── Open ──
      // 1. Attach host to DOM (if removed by previous close)
      if (!host.isConnected) {
        (document.body || document.documentElement).appendChild(host);
      }
      // 2. Force reflow so the browser registers the initial translateX(100%)
      //    state BEFORE we add .open. Without this, the append + class add
      //    happen in the same paint and no transition plays.
      void host.offsetHeight;
      panel.classList.add("open");
      panel.setAttribute("aria-hidden", "false");
    } else {
      // ── Close ──
      // 1. Remove .open to trigger the slide-out transition
      panel.classList.remove("open");
      panel.setAttribute("aria-hidden", "true");
      // 2. After transition ends, remove host from DOM (Firefox perf fix)
      closeTimerId = setTimeout(() => {
        closeTimerId = null;
        // Only remove if still closed (user might have re-opened during transition)
        if (!panel.classList.contains("open") && host.isConnected) {
          host.remove();
        }
      }, TRANSITION_MS);
    }

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

  // ===== 6b. Tab Visibility (inline - controlled by feature toggles) =====
  const TAB_FEATURE_MAP: Record<string, string> = {
    'tab-pets': 'pets',
    'tab-locker': 'locker',

    'tab-alerts': 'alerts',
    'tab-avatar': 'avatar',
    'tab-room': 'room',
  };

  function applyTabVisibility(): void {
    const config = storageGet<Record<string, { enabled: boolean }>>(
      FEATURE_KEYS.CONFIG,
      {
        pets: { enabled: true },
        locker: { enabled: true },

        alerts: { enabled: true },
        avatar: { enabled: true },
        room: { enabled: true },
      }
    );

    for (const [tabId, featureKey] of Object.entries(TAB_FEATURE_MAP)) {
      const isEnabled = config[featureKey]?.enabled ?? true; // Default to true (show tabs by default)
      if (isEnabled) {
        nav.showTab(tabId);
      } else {
        nav.hideTab(tabId);
      }
    }
  }

  function handleTabVisibilityChange(event: Event): void {
    const { key } = (event as CustomEvent<{ key: string }>).detail;
    if (key === FEATURE_KEYS.CONFIG || key === 'feature:config') {
      applyTabVisibility();
    }
  }

  window.addEventListener(EVENTS.STORAGE_CHANGE, handleTabVisibilityChange);

  // Apply initial tab visibility
  applyTabVisibility();

  // Validate active tab is visible after applying visibility
  let effectiveActiveTab = activeTabId;
  if (!nav.isTabVisible(activeTabId)) {
    const visibleTabs = nav.getVisibleTabs();
    if (visibleTabs.length > 0) {
      effectiveActiveTab = visibleTabs[0];
    }
  }

  // Activate initial tab
  if (effectiveActiveTab) {
    manager.activate(effectiveActiveTab);
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
    stopVersionChecker();
    window.removeEventListener(EVENTS.STORAGE_CHANGE, handleTabVisibilityChange);
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
