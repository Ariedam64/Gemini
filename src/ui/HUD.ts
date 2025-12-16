// ui/HUD.ts
import { el, attachHost, injectStyle } from "../core/dom";
import { createNavTabs } from "./components/NavTabs/NavTabs";
import { Section, SectionManager } from "./sections";
import { detectEnvironment } from "../utils/api";

import { cardCss } from "./components/Card/card.css";
import { badgeCss } from "./components/Badge/badge.css";
import { buttonCss } from "./components/Button/button.css";

import { injectStyleOnce } from "./styles/injectStyle";
import { tokensCss } from "./styles/token.css";
import { utilsCss } from "./styles/utils.css";
import { baseCss } from "./styles/base.css";
import { inputCss } from "./components/Input/input.css";
import { labelCss } from "./components/Label/label.css";
import { navTabsCss } from "./components/NavTabs/navTabs.css";
import { searchBarCss } from "./components/SearchBar/searchBar.css";
import { selectCss } from "./components/Select/select.css";
import { switchCss } from "./components/Switch/switch.css";
import { tableCss } from "./components/Table/table.css";
import { timeRangePickerCss } from "./components/TimeRangePicker/timeRangePicker.css";
import { tooltipCss } from "./components/Tooltip/tooltip.css";
import { sliderCss } from "./components/Slider/slider.css";
import { reorderableListCss } from "./components/ReorderableList/reorderableList.css";
import { colorPickerCss } from "./components/ColorPicker/colorPicker.css";
import { logCss } from "./components/Log/log.css";
import { pageWindow } from "../utils/pageContext";

export type HUD = {
  host: HTMLElement;
  shadow: ShadowRoot;
  wrap: HTMLDivElement;
  panel: HTMLDivElement;
  content: HTMLDivElement;
  setOpen: (open: boolean) => void;
  setWidth: (px: number) => void;
  sections?: Section[];
  manager?: SectionManager;
  nav?: ReturnType<typeof createNavTabs>;
  destroy: () => void;
};

export type ThemeMap = Record<string, Record<string, string>>;

export type SectionsBuilderDeps = {
  applyTheme: (name: string) => void;
  initialTheme: string;
  getCurrentTheme: () => string;
  setHUDWidth: (px: number) => void;
  setHUDOpen: (open: boolean) => void;
};

export type HUDOptions = {
  hostId?: string;
  baseCss?: string;

  // HUD state
  initialWidth: number;
  initialOpen: boolean;
  onWidthChange?: (px: number) => void;
  onOpenChange?: (open: boolean) => void;

  // Theme
  themes: ThemeMap;
  initialTheme: string;
  onThemeChange?: (name: string) => void;

  // Tabs/Sections
  buildSections: (deps: SectionsBuilderDeps) => Section[];
  initialTab?: string;
  onTabChange?: (id: string) => void;

  // Shortcuts / UX
  toggleCombo?: (e: KeyboardEvent) => boolean; // default Ctrl+Shift+U
  closeOnEscape?: boolean;                      // default true
  minWidth?: number;                            // default 420
  maxWidth?: number;                            // default 720
};

export function createHUD(opts: HUDOptions): HUD {
  const {
    hostId = "lg-slideout-root",
    baseCss: baseCssOpt,

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

  // Internal dynamic bounds (updated based on mobile/viewport)
  let minW = minWidth;
  let maxW = maxWidth;

  // Host + Shadow + CSS
  const { host, shadow } = attachHost(hostId);
  injectStyleOnce(shadow, tokensCss, "tokens");
  injectStyleOnce(shadow, baseCss,   "base");
  injectStyleOnce(shadow, utilsCss,  "utils");

  injectStyleOnce(shadow, cardCss,   "card");
  injectStyleOnce(shadow, badgeCss, "badge");
  injectStyleOnce(shadow, buttonCss, "button");
  injectStyleOnce(shadow, inputCss, "input");
  injectStyleOnce(shadow, labelCss, "label");
  injectStyleOnce(shadow, navTabsCss, "navTabs");
  injectStyleOnce(shadow, searchBarCss, "searchBar");
  injectStyleOnce(shadow, selectCss, "select");
  injectStyleOnce(shadow, switchCss, "switch");
  injectStyleOnce(shadow, tableCss, "table");
  injectStyleOnce(shadow, timeRangePickerCss, "timeRangePicker");
  injectStyleOnce(shadow, tooltipCss, "tooltip");
  injectStyleOnce(shadow, sliderCss, "slider");
  injectStyleOnce(shadow, reorderableListCss, "reorderableList");
  injectStyleOnce(shadow, colorPickerCss, "colorPicker");
  injectStyleOnce(shadow, logCss, "log");

  // Support an additional CSS string provided by the caller
  if (baseCssOpt) injectStyleOnce(shadow, baseCssOpt, "external-base");

  // Structure HUD
  const panel = el("div", { className: "lg-panel", id: "panel", ariaHidden: String(!initialOpen) }) as HTMLDivElement;
  const tabbar = el("div", { className: "lg-tabbar" });
  const content = el("div", { className: "lg-content", id: "content" }) as HTMLDivElement;
  const resizer = el("div", { className: "lg-resizer", title: "Resize" }) as HTMLDivElement;
  panel.append(tabbar, content, resizer);

  // Close button (cross) aligned to the right in the tab bar
  const closeBtn = el("button", {
    className: "lg-close",
    title: "Fermer",
    ariaLabel: "Fermer",
  }, "✕") as HTMLButtonElement;

  const wrap = el("div", { className: "lg-wrap" }, panel) as HTMLDivElement;
  shadow.append(wrap);

  // Adaptive bounds
function computeBounds() {
  const env = detectEnvironment();
  const vw = Math.round(((pageWindow as any).visualViewport?.width) ?? (pageWindow.innerWidth ?? 0));

  if (env.platform === "mobile" || env.os === "ios" || env.os === "android") {
    // Read the host insets (defined in CSS via env(safe-area-inset-*))
    const cs = getComputedStyle(shadow.host as HTMLElement);
    const insetL = parseFloat(cs.getPropertyValue("--inset-l")) || 0;
    const insetR = parseFloat(cs.getPropertyValue("--inset-r")) || 0;

    // Usable width = viewport - insets. No decorative margin.
    const usable = Math.max(280, vw - Math.round(insetL + insetR));

    // min ≈ 66% of the viewport but not beyond the usable width
    minW = Math.min(420, Math.max(300, Math.floor(vw * 0.66)));
    minW = Math.min(minW, usable);

    // max = usable width, full stop.
    maxW = usable;
  } else {
    minW = minWidth;
    maxW = maxWidth;
  }
}
  function clampWidth(px: number) {
    return Math.max(minW, Math.min(maxW, Number(px) || initialWidth));
  }

  // Open/Close
  function emitOpenChange(open: boolean) {
    panel.dispatchEvent(new CustomEvent("lg:open-change", { detail: { open }, bubbles: true }));
    onOpenChange?.(open);
  }
  function setOpen(open: boolean) {
    const before = panel.classList.contains("open");
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", open ? "false" : "true");
    // Show/hide the (now removed) opening FAB
    // FAB removed: no floating open button
    if (open !== before) emitOpenChange(open);
  }

  // Width
  function setWidth(px: number) {
    const v = clampWidth(px);
    (shadow.host as HTMLElement).style.setProperty("--w", `${v}px`);
    onWidthChange?.(v);
  }

  // Init
  computeBounds();
  setWidth(initialWidth);
  setOpen(initialOpen);

  // Actions
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
  });

  // Shortcuts
  const onKeyDown = (e: KeyboardEvent) => {
    const isOpen = panel.classList.contains("open");
    if (closeOnEscape && e.key === "Escape" && isOpen) return void setOpen(false);
    if (toggleCombo(e)) setOpen(!isOpen);
  };
  document.addEventListener("keydown", onKeyDown, { capture: true });

  // Drag resize (disabled on mobile)
  const envAtStart = detectEnvironment();
  const dragEnabled = !(envAtStart.platform === "mobile" || envAtStart.os === "ios" || envAtStart.os === "android");

  let dragging = false;
  const onMove = (e: MouseEvent) => {
    if (!dragging) return;
    e.preventDefault();
    const px = Math.round(pageWindow.innerWidth - e.clientX);
    setWidth(px);
  };
  const onUp = () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor = "";
    pageWindow.removeEventListener("mousemove", onMove);
    pageWindow.removeEventListener("mouseup", onUp);
  };
  resizer.addEventListener("mousedown", (e) => {
    if (!dragEnabled) return;
    e.preventDefault();
    dragging = true;
    document.body.style.cursor = "ew-resize";
    pageWindow.addEventListener("mousemove", onMove);
    pageWindow.addEventListener("mouseup", onUp);
  });

  // Theme
  let currentTheme = initialTheme;
  let themeAnimTimer: number | null = null;
  let didInitApply = false;

  function applyTheme(name: string) {
    const t = themes[name] || themes[currentTheme] || {};
    const hostEl = shadow.host as HTMLElement;

    if (didInitApply) hostEl.classList.add("theme-anim");
    for (const [k, v] of Object.entries(t)) hostEl.style.setProperty(k, v as string);

    if (didInitApply) {
      if (themeAnimTimer !== null) clearTimeout(themeAnimTimer);
      themeAnimTimer = pageWindow.setTimeout(() => {
        hostEl.classList.remove("theme-anim");
        themeAnimTimer = null;
      }, 320);
    } else {
      didInitApply = true;
    }

    currentTheme = name;
    onThemeChange?.(name);
  }
  const getCurrentTheme = () => currentTheme;
  applyTheme(initialTheme);

  // Sections + Nav
  const sections = buildSections({
    applyTheme,
    initialTheme,
    getCurrentTheme,
    setHUDWidth: setWidth,
    setHUDOpen: setOpen,
  });

  const manager = new SectionManager(sections, content, { applyTheme, getCurrentTheme });

  const TABS = sections.map(s => ({ id: s.id, label: s.label }));
  const nav = createNavTabs(TABS, initialTab || TABS[0]?.id || "", (id) => {
    manager.activate(id);
    onTabChange?.(id);
  });

  // The nav takes all available width
  nav.root.style.flex = "1 1 auto";
  nav.root.style.minWidth = "0";

  // Tab bar: nav (flex:1) + cross on the right
  tabbar.append(nav.root, closeBtn);

  manager.activate(initialTab || TABS[0]?.id || "");

  // Resize: recalc nav + bounds + clamp width
  const onResize = () => {
    nav.recalc();
    const current = parseInt(getComputedStyle(shadow.host as HTMLElement).getPropertyValue("--w")) || initialWidth;
    computeBounds();
    setWidth(current);
  };
  pageWindow.addEventListener("resize", onResize);

  function destroy() {
    document.removeEventListener("keydown", onKeyDown, { capture: true } as any);
    pageWindow.removeEventListener("resize", onResize);
    pageWindow.removeEventListener("mousemove", onMove);
    pageWindow.removeEventListener("mouseup", onUp);
  }

  return { host, shadow, wrap, panel, content, setOpen, setWidth, sections, manager, nav, destroy };
}
