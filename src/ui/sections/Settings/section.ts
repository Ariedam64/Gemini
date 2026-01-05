/**
 * Settings Section
 * Manages theme customization and system environment display
 */

import { element } from "../../styles/helpers";
import { BaseSection } from "../core/Section";
import type { SectionsDeps } from "../core/Types";
import { Card } from "../../components/Card/Card";
import { Select, SelectOption } from "../../components/Select/Select";
import { Label } from "../../components/Label/Label";
import { Button } from "../../components/Button/Button";
import { ColorPicker, ColorPickerValue } from "../../components/ColorPicker/ColorPicker";
import { MGEnvironment } from "../../../modules/environment";
import { attachCopyHandler } from "../../../utils/clipboard";
import { THEMES } from "../../theme";
import { initSettingsState, DEFAULT_SETTINGS_STATE, SettingsStateController } from "./state";

/* ───────────────────────── Utilities ───────────────────────── */

function humanizeName(v: string): string {
  return v.replace(/[_-]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function buildThemeOptions(): SelectOption[] {
  return Object.keys(THEMES).map((v) => ({ value: v, label: humanizeName(v) }));
}

const THEME_COLOR_KEYS = [
  // Core Theme
  "--bg",
  "--fg",
  "--accent",
  "--muted",
  "--soft",
  "--border",
  "--shadow",
  // Tabs & Pills
  "--tab-bg",
  "--tab-fg",
  "--pill-from",
  "--pill-to",
] as const;

// Journal-specific keys (separate for grouped UI)
const JOURNAL_COLOR_KEYS = [
  "--journal-bar-low",
  "--journal-bar-mid",
  "--journal-bar-high",
  "--journal-bar-complete",
  "--journal-rainbow",
  "--journal-tab-1",
  "--journal-tab-2",
  "--journal-tab-3",
] as const;

type ThemeColorKey = (typeof THEME_COLOR_KEYS)[number];
type JournalColorKey = (typeof JOURNAL_COLOR_KEYS)[number];

function labelForVar(key: ThemeColorKey): string {
  return humanizeName(key.replace(/^--/, ""));
}

function labelForJournalVar(key: JournalColorKey): string {
  // Create friendly labels for Journal keys
  const labels: Record<string, string> = {
    "--journal-bar-low": "Progress Low",
    "--journal-bar-mid": "Progress Mid",
    "--journal-bar-high": "Progress High",
    "--journal-bar-complete": "Progress Complete",
    "--journal-rainbow": "Rainbow",
    "--journal-tab-1": "Tab 1 (All)",
    "--journal-tab-2": "Tab 2 (Crops)",
    "--journal-tab-3": "Tab 3 (Pets)",
  };
  return labels[key] ?? humanizeName(key.replace(/^--journal-/, ""));
}

function toCssValue(value: ColorPickerValue): string {
  return value.alpha < 1 ? value.rgba : value.hex;
}

/* ───────────────────────── Settings Section ───────────────────────── */

export class SettingsSection extends BaseSection {
  constructor(private deps: SectionsDeps) {
    super({
      id: "tab-settings",
      label: "Settings",
    });
  }

  protected async build(container: HTMLElement): Promise<void> {
    const section = this.createGrid("12px");
    section.id = "settings";
    container.appendChild(section);

    // Initialize state with fallback
    let state: SettingsStateController;
    try {
      state = await initSettingsState();
    } catch {
      // Fallback if state initialization fails
      state = {
        get: () => DEFAULT_SETTINGS_STATE,
        set: () => { },
        save: () => { },
        setUI: () => { },
        setCardExpanded: () => { },
        toggleCard: () => { },
      } as SettingsStateController;
    }

    const currentState = state.get();

    // Safe active theme value
    const available = Object.keys(THEMES);
    const rawTheme = this.deps.getCurrentTheme?.() ?? this.deps.initialTheme;
    const currentTheme = available.includes(rawTheme) ? rawTheme : (available[0] ?? "dark");
    let activeTheme = currentTheme;

    // Theme selection
    const themeLabel = Label({ text: "Theme", tone: "muted", size: "lg" });
    const themeSelect = Select({
      options: buildThemeOptions(),
      value: currentTheme,
      onChange: (v) => {
        activeTheme = v;
        this.deps.applyTheme(v);
        this.renderThemePickers(v, themeGrid, activeTheme);
      },
    });

    const themeGrid = element("div", { className: "settings-theme-grid" }) as HTMLDivElement;

    const themeCard = Card(
      {
        title: "Style",
        padding: "lg",
        expandable: true,
        defaultExpanded: !!currentState.ui.expandedCards.style,
        onExpandChange: (v) => state.setCardExpanded("style", v),
      },
      element("div", { className: "kv settings-theme-row" }, themeLabel.root, themeSelect.root),
      themeGrid
    );

    // Render initial theme pickers
    this.renderThemePickers(currentTheme, themeGrid, activeTheme);

    // Journal customization card
    const journalGrid = element("div", { className: "settings-theme-grid" }) as HTMLDivElement;
    this.renderJournalPickers(currentTheme, journalGrid, activeTheme);

    const journalCard = Card(
      {
        title: "Journal",
        padding: "lg",
        expandable: true,
        defaultExpanded: false,
        variant: "soft",
      },
      journalGrid
    );

    // Environment card
    const envCard = this.createEnvCard({
      defaultExpanded: !!currentState.ui.expandedCards.system,
      onExpandChange: (v) => state.setCardExpanded("system", v),
    });

    section.appendChild(themeCard);
    section.appendChild(journalCard);
    section.appendChild(envCard);
  }

  /**
   * Render theme color pickers for a specific theme
   */
  private renderThemePickers(themeName: string, themeGrid: HTMLDivElement, activeTheme: string): void {
    const theme = THEMES[themeName];
    themeGrid.replaceChildren();

    if (!theme) return;

    for (const key of THEME_COLOR_KEYS) {
      const currentValue = theme[key];
      if (currentValue == null) continue;

      const picker = ColorPicker({
        label: labelForVar(key),
        value: currentValue,
        defaultExpanded: false,
        onInput: (val) => this.updateThemeVar(themeName, key, val, activeTheme),
        onChange: (val) => this.updateThemeVar(themeName, key, val, activeTheme),
      });

      themeGrid.appendChild(picker.root);
    }
  }

  /**
   * Update a theme variable and re-apply if it's the active theme
   */
  private updateThemeVar(themeName: string, key: ThemeColorKey | JournalColorKey, color: ColorPickerValue, activeTheme: string): void {
    const theme = THEMES[themeName];
    if (!theme) return;

    theme[key] = toCssValue(color);

    if (activeTheme === themeName) {
      this.deps.applyTheme(themeName);
    }
  }

  /**
   * Render Journal-specific color pickers
   */
  private renderJournalPickers(themeName: string, journalGrid: HTMLDivElement, activeTheme: string): void {
    const theme = THEMES[themeName];
    journalGrid.replaceChildren();

    if (!theme) return;

    for (const key of JOURNAL_COLOR_KEYS) {
      const currentValue = theme[key];
      if (currentValue == null) continue;

      const picker = ColorPicker({
        label: labelForJournalVar(key),
        value: currentValue,
        defaultExpanded: false,
        onInput: (val) => this.updateThemeVar(themeName, key, val, activeTheme),
        onChange: (val) => this.updateThemeVar(themeName, key, val, activeTheme),
      });

      journalGrid.appendChild(picker.root);
    }
  }

  /**
   * Create environment/system information card
   */
  private createEnvCard(params?: {
    defaultExpanded?: boolean;
    onExpandChange?: (v: boolean) => void;
  }): HTMLDivElement {
    const defaultExpanded = params?.defaultExpanded ?? false;
    const onExpandChange = params?.onExpandChange;

    const row = (k: string, vNode: Node | string) => {
      const wrap = element("div", { className: "kv kv--inline-mobile" }) as HTMLDivElement;
      const lab = element("label", {}, k);
      const val = element("div", { className: "ro" }) as HTMLDivElement;
      if (typeof vNode === "string") val.textContent = vNode;
      else val.append(vNode);
      wrap.append(lab, val);
      return wrap;
    };

    const hostVal = element("code", {}, "—") as HTMLElement;
    const iframeVal = element("span", {}, "—") as HTMLElement;
    const surfaceVal = element("span", {}, "—") as HTMLElement;
    const platformVal = element("span", {}, "—") as HTMLElement;
    const browserVal = element("span", {}, "—") as HTMLElement;
    const osVal = element("span", {}, "—") as HTMLElement;

    const renderEnv = () => {
      const env = MGEnvironment.detect() as any;
      surfaceVal.textContent = env.surface;
      platformVal.textContent = env.platform;
      browserVal.textContent = env.browser ?? "Unknown";
      osVal.textContent = env.os ?? "Unknown";
      hostVal.textContent = env.host;
      iframeVal.textContent = env.isInIframe ? "Yes" : "No";
    };

    const copyJsonBtn = Button({
      label: "Copy JSON",
      variant: "primary",
      size: "sm",
    });

    attachCopyHandler(copyJsonBtn, () => {
      const env = MGEnvironment.detect() as any;
      return JSON.stringify(env, null, 2);
    });

    const footerCentered = element(
      "div",
      { style: "width:100%;display:flex;justify-content:center;" },
      copyJsonBtn
    );

    const card = Card(
      {
        title: "System",
        variant: "soft",
        padding: "lg",
        footer: footerCentered,
        expandable: true,
        defaultExpanded,
        onExpandChange,
      },
      row("Surface", surfaceVal),
      row("Platform", platformVal),
      row("Browser", browserVal),
      row("OS", osVal),
      row("Host", hostVal),
      row("Iframe", iframeVal)
    );

    const onVis = () => {
      if (!document.hidden) renderEnv();
    };
    document.addEventListener("visibilitychange", onVis);
    renderEnv();

    // Register cleanup
    this.addCleanup(() => document.removeEventListener("visibilitychange", onVis));

    return card;
  }
}
