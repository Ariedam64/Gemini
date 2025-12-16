// ui/sections/settings.ts
import { el } from "../../../core/dom";
import { Section } from "..";
import { Card } from "../../components/Card/Card";
import { Select, SelectOption } from "../../components/Select/Select";
import { Label } from "../../components/Label/Label";
import { detectEnvironment } from "../../../utils/api";
import { THEMES } from "../../theme";
import { attachCopyHandler } from "../../../utils/copy";
import { Button } from "../../components/Button/Button";
import { ColorPicker, ColorPickerValue } from "../../components/ColorPicker/ColorPicker";

// NEW: state controller (persist settings: style, license, system)
import {
  initSettingsState,
  defaultSettingState,
  type SettingsStateController,
} from "./settingsState";

export type SettingsDeps = {
  applyTheme: (name: string) => void;
  getCurrentTheme: () => string;
  initialTheme: string;
};

/* ───────────────────────── util ───────────────────────── */

function humanizeName(v: string): string {
  return v.replace(/[_-]+/g, " ").replace(/^\w/, c => c.toUpperCase());
}

function buildThemeOptions(): SelectOption[] {
  // ONLY the THEMES keys. No “system”.
  return Object.keys(THEMES).map(v => ({ value: v, label: humanizeName(v) }));
}

const THEME_COLOR_KEYS = [
  "--bg",
  "--fg",
  "--accent",
  "--muted",
  "--soft",
  "--border",
  "--shadow",
  "--tab-bg",
  "--tab-fg",
  "--pill-from",
  "--pill-to",
] as const;

type ThemeColorKey = typeof THEME_COLOR_KEYS[number];

function labelForVar(key: ThemeColorKey): string {
  return humanizeName(key.replace(/^--/, ""));
}

function toCssValue(value: ColorPickerValue) {
  return value.alpha < 1 ? value.rgba : value.hex;
}

/* ─────────────────────── Environnement (System) ─────────────────────── */

function createEnvCard(params?: { defaultExpanded?: boolean; onExpandChange?: (v: boolean) => void }) {
  const defaultExpanded = params?.defaultExpanded ?? false;
  const onExpandChange = params?.onExpandChange;

  // row sans actions: juste label + valeur en lecture seule
  const row = (k: string, vNode: Node | string) => {
    // Keep the title on the left even on mobile
    const wrap = el("div", { className: "kv kv--inline-mobile" }) as HTMLDivElement;
    const lab = el("label", {}, k);
    const val = el("div", { className: "ro" }) as HTMLDivElement;
    if (typeof vNode === "string") val.textContent = vNode;
    else val.append(vNode);
    wrap.append(lab, val);
    return wrap;
  };

  const hostVal = el("code", {}, "—") as HTMLElement;
  const iframeVal = el("span", {}, "—") as HTMLElement;
  const surfaceVal = el("span", {}, "—") as HTMLElement;
  const platformVal = el("span", {}, "—") as HTMLElement;
  const browserVal = el("span", {}, "—") as HTMLElement;
  const osVal = el("span", {}, "—") as HTMLElement;

  const renderEnv = () => {
    const env = detectEnvironment() as any;
    surfaceVal.textContent  = env.surface;
    platformVal.textContent = env.platform;
    browserVal.textContent  = env.browser ?? "Unknown";
    osVal.textContent       = env.os ?? "Unknown";
    hostVal.textContent     = env.host;
    iframeVal.textContent   = env.isInIframe ? "Yes" : "No";
  };

  // Footer: centered "Copy JSON" button
  const copyJsonBtn = Button({
    label: "Copy JSON",
    variant: "primary",
    size: "sm",
  });
  attachCopyHandler(copyJsonBtn, () => {
    const env = detectEnvironment() as any;
    return JSON.stringify(env, null, 2);
  });
  const footerCentered = el(
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
    row("Surface",  surfaceVal),
    row("Platform", platformVal),
    row("Browser",  browserVal),
    row("OS",       osVal),
    row("Host",     hostVal),
    row("Iframe",   iframeVal),
  );

  const onVis = () => { if (!document.hidden) renderEnv(); };
  document.addEventListener("visibilitychange", onVis);
  renderEnv();

  (card as any).__cleanup = () => document.removeEventListener("visibilitychange", onVis);
  return card as HTMLDivElement & { __cleanup?: () => void };
}

/* ───────────────────────── Settings Section ───────────────────────── */

export function createSettingsSection(deps: SettingsDeps) {
  return new Section({
    id: "tab-settings",
    label: "Settings",
    mount(container) {
      const section = el("section", { id: "settings", className: "lg-section" }) as HTMLDivElement;
      section.style.display = "grid";
      section.style.gap = "12px";
      container.appendChild(section);

      // hydrate + build UI dans un IIFE async pour pouvoir attendre le state
      let ctrl: SettingsStateController | null = null;
      let envCardCleanup: (() => void) | undefined;

      (async () => {
        try {
          ctrl = await initSettingsState();
        } catch {
          // Fallback if the bridge is not ready: use defaults
          ctrl = {
            get: () => defaultSettingState,
            set: () => {},
            save: () => {},
            setUI: () => {},
            setCardExpanded: () => {},
            toggleCard: () => {},
          } as SettingsStateController;
        }

        const st = ctrl.get();

        // Safe active value: if “system” or unknown → first available theme
        const available = Object.keys(THEMES);
        const raw = deps.getCurrentTheme?.() ?? deps.initialTheme;
        const current = available.includes(raw) ? raw : (available[0] ?? "dark");

        let activeTheme = current;

        const themeLabel = Label({ text: "Theme", tone: "muted", size: "lg" });
        const themeSelect = Select({
          options: buildThemeOptions(),
          value: current,
          onChange: v => {
            activeTheme = v;
            deps.applyTheme(v);
            renderThemePickers(v);
          },
        });

        const themeGrid = el("div", { className: "settings-theme-grid" }) as HTMLDivElement;

        const themeCard = Card(
          {
            title: "Style",
            padding: "lg",
            expandable: true,
            defaultExpanded: !!st.ui.expandedCards.style,
            onExpandChange: (v) => ctrl!.setCardExpanded("style", v),
          },
          el("div", { className: "kv settings-theme-row" }, themeLabel.root, themeSelect.root),
          themeGrid
        );

        function updateThemeVar(themeName: string, key: ThemeColorKey, color: ColorPickerValue) {
          const theme = THEMES[themeName];
          if (!theme) return;
          theme[key] = toCssValue(color);
          if (activeTheme === themeName) deps.applyTheme(themeName);
        }

        function renderThemePickers(themeName: string) {
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
              onInput: (val) => updateThemeVar(themeName, key, val),
              onChange: (val) => updateThemeVar(themeName, key, val),
            });
            themeGrid.appendChild(picker.root);
          }
        }

        renderThemePickers(current);

        const envCard = createEnvCard({
          defaultExpanded: !!st.ui.expandedCards.system,
          onExpandChange: (v) => ctrl!.setCardExpanded("system", v),
        });

        // Append in order
        section.appendChild(themeCard);
        section.appendChild(envCard);

        envCardCleanup = (envCard as any).__cleanup;
      })();

      // cleanup
      return () => {
        try { envCardCleanup?.(); } catch {}
        container.replaceChildren();
      };
    },
  });
}
