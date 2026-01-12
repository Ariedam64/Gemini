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
import { Switch } from "../../components/Switch/Switch";
import { ColorPicker, ColorPickerValue } from "../../components/ColorPicker/ColorPicker";
import { MGEnvironment } from "../../../modules/environment";
import { attachCopyHandler } from "../../../utils/clipboard";
import { THEMES } from "../../theme";
import { initSettingsState, DEFAULT_SETTINGS_STATE, SettingsStateController } from "./State";
import { storageGet, storageSet, FEATURE_KEYS } from "../../../utils/storage";
import { BulkFavoriteInject } from "../../inject/qol/bulkFavorite";
import { MGCropValueIndicator } from "../../../features/cropValueIndicator";

/* ───────────────────────── Utilities ───────────────────────── */

function humanizeName(v: string): string {
  return v.replace(/[_-]+/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function buildThemeOptions(): SelectOption[] {
  return Object.keys(THEMES).map((v) => ({ value: v, label: humanizeName(v) }));
}

const THEME_COLOR_KEYS = [
  // Core
  "--bg",
  "--fg",
  "--accent",
  "--muted",
  "--soft",
  "--border",
  "--shadow",
  "--paper",
  // Tabs & Pills
  "--tab-bg",
  "--tab-fg",
  "--pill-from",
  "--pill-to",
  // Status
  "--low",
  "--medium",
  "--high",
  "--complete",
  "--info",
  // Accents
  "--accent-1",
  "--accent-2",
  "--accent-3",
] as const;

type ThemeColorKey = (typeof THEME_COLOR_KEYS)[number];

function labelForVar(key: ThemeColorKey): string {
  return humanizeName(key.replace(/^--/, ""));
}

function toCssValue(value: ColorPickerValue): string {
  return value.alpha < 1 ? value.rgba : value.hex;
}

/* ───────────────────────── Feature Configurations ───────────────────────── */

interface FeatureConfig {
  // HUD Sections (tabs visibility)
  pets: { enabled: boolean };
  journalChecker: { enabled: boolean };
  autoFavorite: { enabled: boolean };

  // In-Game Enhancements
  bulkFavorite: { enabled: boolean };
  cropSizeIndicator: { enabled: boolean };
  eggProbabilityIndicator: { enabled: boolean };
  cropValueIndicator: { enabled: boolean };
}

const DEFAULT_FEATURE_CONFIG: FeatureConfig = {
  // HUD Sections - default to enabled (show all tabs)
  pets: { enabled: true },
  journalChecker: { enabled: true },
  autoFavorite: { enabled: true },
  // In-Game Enhancements - default to disabled
  bulkFavorite: { enabled: false },
  cropSizeIndicator: { enabled: false },
  eggProbabilityIndicator: { enabled: false },
  cropValueIndicator: { enabled: true }, // Enabled for testing
};

/* ───────────────────────── Settings Section ───────────────────────── */

export class SettingsSection extends BaseSection {
  private featureConfig: FeatureConfig = DEFAULT_FEATURE_CONFIG;

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

    // Load feature config (merge stored with defaults)
    const storedFeatureConfig = storageGet<Partial<FeatureConfig>>(FEATURE_KEYS.CONFIG, {});
    this.featureConfig = this.mergeFeatureConfig(storedFeatureConfig);

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

    // HUD Sections card
    const hudSectionsCard = this.createHUDSectionsCard({
      defaultExpanded: !!currentState.ui.expandedCards.hudSections,
      onExpandChange: (v) => state.setCardExpanded("hudSections", v),
    });

    // In-Game Enhancements card
    const enhancementsCard = this.createEnhancementsCard({
      defaultExpanded: !!currentState.ui.expandedCards.enhancements,
      onExpandChange: (v) => state.setCardExpanded("enhancements", v),
    });

    // Environment card
    const envCard = this.createEnvCard({
      defaultExpanded: !!currentState.ui.expandedCards.system,
      onExpandChange: (v) => state.setCardExpanded("system", v),
    });

    section.appendChild(themeCard);
    section.appendChild(hudSectionsCard);
    section.appendChild(enhancementsCard);
    section.appendChild(envCard);
  }

  /** Merge stored config with defaults, ensuring all properties exist */
  private mergeFeatureConfig(stored: Partial<FeatureConfig>): FeatureConfig {
    return {
      pets: { ...DEFAULT_FEATURE_CONFIG.pets, ...stored.pets },
      journalChecker: { ...DEFAULT_FEATURE_CONFIG.journalChecker, ...stored.journalChecker },
      autoFavorite: { ...DEFAULT_FEATURE_CONFIG.autoFavorite, ...stored.autoFavorite },
      bulkFavorite: { ...DEFAULT_FEATURE_CONFIG.bulkFavorite, ...stored.bulkFavorite },
      cropSizeIndicator: { ...DEFAULT_FEATURE_CONFIG.cropSizeIndicator, ...stored.cropSizeIndicator },
      eggProbabilityIndicator: { ...DEFAULT_FEATURE_CONFIG.eggProbabilityIndicator, ...stored.eggProbabilityIndicator },
      cropValueIndicator: { ...DEFAULT_FEATURE_CONFIG.cropValueIndicator, ...stored.cropValueIndicator },
    };
  }

  private saveFeatureConfig(): void {
    storageSet(FEATURE_KEYS.CONFIG, this.featureConfig);
    console.log('[Settings] Feature config saved:', this.featureConfig);
  }

  /**
   * Create HUD Sections card (tab visibility toggles)
   */
  private createHUDSectionsCard(params?: {
    defaultExpanded?: boolean;
    onExpandChange?: (v: boolean) => void;
  }): HTMLDivElement {
    const createSectionRow = (
      label: string,
      enabled: boolean,
      onChange: (val: boolean) => void,
      description: string,
      isFirst: boolean = false,
      isLast: boolean = false
    ): HTMLDivElement => {
      const row = element("div", {
        style: `
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${isFirst ? '0' : '12px'} 0 ${isLast ? '0' : '12px'} 0;
          ${!isLast ? 'border-bottom: 1px solid var(--border);' : ''}
          transition: opacity 0.2s ease;
          opacity: ${enabled ? '1' : '0.5'};
        `
      }) as HTMLDivElement;

      // Content
      const content = element("div") as HTMLDivElement;
      const labelEl = element("div", {
        style: "font-weight: 500; margin-bottom: 4px;"
      }, label);
      const descEl = element("div", {
        style: "font-size: 12px; color: var(--fg); opacity: 0.7;"
      }, description);
      content.append(labelEl, descEl);

      // Switch
      const switchEl = Switch({ checked: enabled, onChange });

      row.append(content, switchEl.root);
      return row;
    };

    return Card(
      {
        title: "HUD Sections",
        padding: "lg",
        expandable: true,
        defaultExpanded: params?.defaultExpanded ?? false,
        onExpandChange: params?.onExpandChange,
      },
      element("div", {},
        createSectionRow(
          "Auto-Favorite",
          this.featureConfig.autoFavorite.enabled,
          (v: boolean) => {
            this.featureConfig.autoFavorite.enabled = v;
            this.saveFeatureConfig();
          },
          "Automatic mutation favoriting settings",
          true // First item
        ),
        createSectionRow(
          "Journal Checker",
          this.featureConfig.journalChecker.enabled,
          (v: boolean) => {
            this.featureConfig.journalChecker.enabled = v;
            this.saveFeatureConfig();
          },
          "Track collection completion progress"
        ),
        createSectionRow(
          "Pets",
          this.featureConfig.pets.enabled,
          (v: boolean) => {
            this.featureConfig.pets.enabled = v;
            this.saveFeatureConfig();
          },
          "Pet management and team tracking",
          false, // Not first
          true // Last item
        )
      )
    );
  }

  /**
   * Create In-Game Enhancements card
   */
  private createEnhancementsCard(params?: {
    defaultExpanded?: boolean;
    onExpandChange?: (v: boolean) => void;
  }): HTMLDivElement {
    const createSectionRow = (
      label: string,
      enabled: boolean,
      onChange: (val: boolean) => void,
      description: string,
      isFirst: boolean = false,
      isLast: boolean = false
    ): HTMLDivElement => {
      const row = element("div", {
        style: `
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          padding: ${isFirst ? '0' : '12px'} 0 ${isLast ? '0' : '12px'} 0;
          ${!isLast ? 'border-bottom: 1px solid var(--border);' : ''}
          transition: opacity 0.2s ease;
          opacity: ${enabled ? '1' : '0.5'};
        `
      }) as HTMLDivElement;

      // Content
      const content = element("div") as HTMLDivElement;
      const labelEl = element("div", {
        style: "font-weight: 500; margin-bottom: 4px;"
      }, label);
      const descEl = element("div", {
        style: "font-size: 12px; color: var(--fg); opacity: 0.7;"
      }, description);
      content.append(labelEl, descEl);

      // Switch
      const switchEl = Switch({ checked: enabled, onChange });

      row.append(content, switchEl.root);
      return row;
    };

    return Card(
      {
        title: "In-Game Enhancements",
        variant: "soft",
        padding: "lg",
        expandable: true,
        defaultExpanded: params?.defaultExpanded ?? false,
        onExpandChange: params?.onExpandChange,
      },
      element("div", {},
        createSectionRow(
          "Bulk Favorite",
          this.featureConfig.bulkFavorite.enabled,
          (v: boolean) => {
            this.featureConfig.bulkFavorite.enabled = v;
            this.saveFeatureConfig();
            BulkFavoriteInject.setEnabled(v);
          },
          "Quick favorite/unfavorite multiple mutations",
          true // First item
        ),
        createSectionRow(
          "Crop Size",
          this.featureConfig.cropSizeIndicator.enabled,
          (v: boolean) => {
            this.featureConfig.cropSizeIndicator.enabled = v;
            this.saveFeatureConfig();
          },
          "Shows size % and journal badges"
        ),
        createSectionRow(
          "Crop Value",
          this.featureConfig.cropValueIndicator.enabled,
          (v: boolean) => {
            this.featureConfig.cropValueIndicator.enabled = v;
            this.saveFeatureConfig();
            MGCropValueIndicator.setEnabled(v);
          },
          "Shows coin value"
        ),
        createSectionRow(
          "Egg Probability",
          this.featureConfig.eggProbabilityIndicator.enabled,
          (v: boolean) => {
            this.featureConfig.eggProbabilityIndicator.enabled = v;
            this.saveFeatureConfig();
          },
          "Shows hatch chances + mutation %",
          false, // Not first
          true // Last item
        )
      )
    );
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
  private updateThemeVar(themeName: string, key: ThemeColorKey, color: ColorPickerValue, activeTheme: string): void {
    const theme = THEMES[themeName];
    if (!theme) return;

    theme[key] = toCssValue(color);

    if (activeTheme === themeName) {
      this.deps.applyTheme(themeName);
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
