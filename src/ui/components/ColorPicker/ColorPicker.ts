// ui/components/ColorPicker/ColorPicker.ts
import { element } from "../../styles/helpers";
import { Card } from "../Card/Card";
import { MGEnvironment } from "../../../modules/core/environment";
import { Input } from "../Input/Input";

type HSVA = { h: number; s: number; v: number; a: number };
type RGBA = { r: number; g: number; b: number; a: number };

export type ColorPickerValue = {
  hsva: HSVA;
  hex: string;
  hexa: string;
  rgba: string;
  alpha: number;
};

export type ColorPickerOptions = {
  id?: string;
  label?: string;
  value?: string;
  alpha?: number;
  defaultExpanded?: boolean;
  detectMobile?: () => boolean;
  onInput?: (value: ColorPickerValue) => void;
  onChange?: (value: ColorPickerValue) => void;
};

export type ColorPickerHandle = {
  root: HTMLDivElement;
  isMobile: boolean;
  getValue: () => ColorPickerValue;
  setValue: (value: string, alpha?: number) => void;
};

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

function hsvaToRgba({ h, s, v, a }: HSVA): RGBA {
  const hh = (h % 360 + 360) % 360 / 60;
  const c = v * s;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  const i = Math.floor(hh);
  switch (i) {
    case 0: r1 = c; g1 = x; break;
    case 1: r1 = x; g1 = c; break;
    case 2: g1 = c; b1 = x; break;
    case 3: g1 = x; b1 = c; break;
    case 4: r1 = x; b1 = c; break;
    default: r1 = c; b1 = x; break;
  }
  const m = v - c;
  const r = Math.round((r1 + m) * 255);
  const g = Math.round((g1 + m) * 255);
  const b = Math.round((b1 + m) * 255);
  return { r: clamp(r, 0, 255), g: clamp(g, 0, 255), b: clamp(b, 0, 255), a: clamp(a, 0, 1) };
}

function rgbaToHsva({ r, g, b, a }: RGBA): HSVA {
  const rr = clamp(r, 0, 255) / 255;
  const gg = clamp(g, 0, 255) / 255;
  const bb = clamp(b, 0, 255) / 255;
  const max = Math.max(rr, gg, bb);
  const min = Math.min(rr, gg, bb);
  const delta = max - min;
  let h = 0;
  if (delta !== 0) {
    if (max === rr) h = 60 * (((gg - bb) / delta) % 6);
    else if (max === gg) h = 60 * ((bb - rr) / delta + 2);
    else h = 60 * ((rr - gg) / delta + 4);
  }
  if (h < 0) h += 360;
  const s = max === 0 ? 0 : delta / max;
  const v = max;
  return { h, s, v, a: clamp(a, 0, 1) };
}

function rgbaToHex({ r, g, b }: RGBA): string {
  const toHex = (c: number) => clamp(Math.round(c), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbaToHexa({ r, g, b, a }: RGBA): string {
  const alpha = clamp(Math.round(a * 255), 0, 255);
  return `${rgbaToHex({ r, g, b, a })}${alpha.toString(16).padStart(2, "0")}`.toUpperCase();
}

function rgbaToCss({ r, g, b, a }: RGBA): string {
  const alpha = Math.round(a * 1000) / 1000;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function parseHex(value: string): RGBA | null {
  let hex = value.trim();
  if (!hex) return null;
  if (hex.startsWith("#")) hex = hex.slice(1);
  if (![3, 4, 6, 8].includes(hex.length)) return null;
  if (!/^[0-9a-fA-F]+$/.test(hex)) return null;
  if (hex.length === 3 || hex.length === 4) {
    hex = hex.split("").map(ch => ch + ch).join("");
  }
  let a = 255;
  if (hex.length === 8) {
    a = parseInt(hex.slice(6, 8), 16);
    hex = hex.slice(0, 6);
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return { r, g, b, a: a / 255 };
}

function parseColorString(value?: string): RGBA | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.startsWith("#")) return parseHex(trimmed);
  const rgbaMatch = trimmed.match(/^rgba?\(([^)]+)\)$/i);
  if (rgbaMatch) {
    const parts = rgbaMatch[1].split(",").map(part => part.trim());
    if (parts.length < 3) return null;
    const r = Number(parts[0]);
    const g = Number(parts[1]);
    const b = Number(parts[2]);
    const a = parts[3] != null ? Number(parts[3]) : 1;
    if ([r, g, b, a].some(n => Number.isNaN(n))) return null;
    return { r, g, b, a };
  }
  return null;
}

function normalizeHsva(value?: string, alpha?: number): HSVA {
  const parsed = parseColorString(value) ?? parseHex(value ?? "") ?? { r: 244, g: 67, b: 54, a: 1 };
  if (typeof alpha === "number") parsed.a = clamp(alpha, 0, 1);
  return rgbaToHsva(parsed);
}

function cleanHexInput(value: string): string {
  const raw = value.trim().replace(/[^0-9a-fA-F#]/g, "");
  const stripped = raw.replace(/#/g, "");
  return `#${stripped}`.slice(0, 9).toUpperCase();
}

function normalizeRgbaInput(value: string): string {
  let raw = value.trim();
  if (!raw) return raw;
  if (/^rgba?\s*\(/i.test(raw)) {
    raw = raw.replace(/^rgba?/i, "rgba");
  } else {
    raw = raw.replace(/^\(?(.*)\)?$/, "$1");
    raw = `rgba(${raw})`;
  }
  raw = raw.replace(/\s*\(\s*/, "(");
  raw = raw.replace(/\s*\)\s*$/, ")");
  raw = raw.replace(/\s*,\s*/g, ", ");
  return raw;
}

function valueFromHsva(state: HSVA): ColorPickerValue {
  const rgbaFull = hsvaToRgba(state);
  const rgbaOpaque = hsvaToRgba({ ...state, a: 1 });
  return {
    hsva: { ...state },
    hex: rgbaToHex(rgbaOpaque),
    hexa: rgbaToHexa(rgbaFull),
    rgba: rgbaToCss(rgbaFull),
    alpha: state.a,
  };
}

export function ColorPicker(opts: ColorPickerOptions = {}): ColorPickerHandle {
  const {
    id,
    label = "Color",
    value,
    alpha,
    defaultExpanded = false,
    detectMobile: detectMobileOverride,
    onInput,
    onChange,
  } = opts;

  const envMobile = detectMobileOverride ? detectMobileOverride() : MGEnvironment.detect().platform === "mobile";
  const isMobile = envMobile;

  let hsva = normalizeHsva(value, alpha);

  const card = Card(
    {
      id,
      className: "color-picker",
      title: label,
      padding: isMobile ? "md" : "lg",
      variant: "soft",
      expandable: !isMobile,
      defaultExpanded: !isMobile && defaultExpanded,
    }
  );

  card.classList.add(isMobile ? "color-picker--mobile" : "color-picker--desktop");

  const header = card.querySelector(".card-header") as HTMLDivElement | null;
  if (header) header.classList.add("color-picker__header");
  const titleEl = header?.querySelector(".card-title") as HTMLElement | null;

  const preview = element("button", {
    className: "color-picker__preview",
    type: "button",
    title: `Preview ${label}`,
    "aria-label": `Change ${label}`,
  }) as HTMLButtonElement;

  if (titleEl) {
    titleEl.prepend(preview);
  } else if (header) {
    header.prepend(preview);
  } else {
    card.prepend(preview);
  }

  const toggleBtn = card.querySelector(".card-toggle") as HTMLButtonElement | null;
  if (!isMobile && toggleBtn) {
    preview.addEventListener("click", () => {
      if (card.classList.contains("card--collapsed")) toggleBtn.click();
    });
  }

  const collapse = card.querySelector(".card-collapse") as HTMLDivElement | null;
  let palette: HTMLDivElement | null = null;
  let paletteCursor: HTMLDivElement | null = null;
  let alphaTrack: HTMLDivElement | null = null;
  let alphaThumb: HTMLDivElement | null = null;
  let hueTrack: HTMLDivElement | null = null;
  let hueThumb: HTMLDivElement | null = null;
  let hexInput: HTMLInputElement | null = null;
  let formatToggle: HTMLButtonElement | null = null;
  let nativeInput: HTMLInputElement | null = null;
  let inputMode: "hex" | "rgba" = "hex";

  function emit(kind: "input" | "change") {
    const payload = valueFromHsva(hsva);
    if (kind === "input") onInput?.(payload);
    else onChange?.(payload);
  }

  function render() {
    const valueFull = valueFromHsva(hsva);
    preview.style.setProperty("--cp-preview-color", valueFull.rgba);
    preview.setAttribute("aria-label", `${label}: ${valueFull.hexa}`);
    if (!isMobile && palette && paletteCursor && alphaTrack && alphaThumb && hueTrack && hueThumb && hexInput) {
      const hueRgb = hsvaToRgba({ ...hsva, s: 1, v: 1, a: 1 });
      const hueColor = rgbaToCss(hueRgb);
      palette.style.setProperty("--cp-palette-hue", hueColor);
      paletteCursor.style.left = `${hsva.s * 100}%`;
      paletteCursor.style.top = `${(1 - hsva.v) * 100}%`;
      alphaTrack.style.setProperty("--cp-alpha-gradient", `linear-gradient(180deg, ${rgbaToCss({ ...hueRgb, a: 1 })} 0%, ${rgbaToCss({ ...hueRgb, a: 0 })} 100%)`);
      alphaThumb.style.top = `${(1 - hsva.a) * 100}%`;
      hueTrack.style.setProperty("--cp-hue-color", rgbaToCss(hsvaToRgba({ ...hsva, v: 1, s: 1, a: 1 })));
      hueThumb.style.left = `${(hsva.h / 360) * 100}%`;
      const hexValue = hsva.a === 1 ? valueFull.hex : valueFull.hexa;
      const rgbaValue = valueFull.rgba;
      const nextInputValue = inputMode === "hex" ? hexValue : rgbaValue;
      if (hexInput !== document.activeElement) hexInput.value = nextInputValue;
      hexInput.setAttribute("aria-label", `${inputMode.toUpperCase()} code for ${label}`);
      hexInput.placeholder = inputMode === "hex" ? "#RRGGBB or #RRGGBBAA" : "rgba(0, 0, 0, 1)";
      if (inputMode === "hex") hexInput.maxLength = 9;
      else hexInput.removeAttribute("maxLength");
      hexInput.dataset.mode = inputMode;
      if (formatToggle) {
        formatToggle.textContent = inputMode.toUpperCase();
        formatToggle.setAttribute("aria-label", inputMode === "hex" ? "Passer en saisie RGBA" : "Revenir en saisie HEX");
        formatToggle.setAttribute("aria-pressed", inputMode === "rgba" ? "true" : "false");
        formatToggle.classList.toggle("is-alt", inputMode === "rgba");
      }
    }
    if (nativeInput && nativeInput !== document.activeElement) {
      nativeInput.value = valueFull.hex;
    }
  }

  function setHsva(next: HSVA, emitKind: "input" | "change" | null = null) {
    hsva = {
      h: (next.h % 360 + 360) % 360,
      s: clamp(next.s, 0, 1),
      v: clamp(next.v, 0, 1),
      a: clamp(next.a, 0, 1),
    };
    render();
    if (emitKind) emit(emitKind);
  }

  function setFromRgba(rgba: RGBA, emitKind: "input" | "change" | null = null) {
    setHsva(rgbaToHsva(rgba), emitKind);
  }

  function pointerDrag(
    target: HTMLElement,
    onMove: (ev: PointerEvent) => void,
    onEnd?: (ev: PointerEvent) => void,
  ) {
    target.addEventListener("pointerdown", (ev) => {
      ev.preventDefault();
      const id = ev.pointerId;
      const move = (event: PointerEvent) => {
        if (event.pointerId !== id) return;
        onMove(event);
      };
      const up = (event: PointerEvent) => {
        if (event.pointerId !== id) return;
        document.removeEventListener("pointermove", move);
        document.removeEventListener("pointerup", up);
        document.removeEventListener("pointercancel", up);
        onEnd?.(event);
      };
      onMove(ev);
      document.addEventListener("pointermove", move);
      document.addEventListener("pointerup", up);
      document.addEventListener("pointercancel", up);
    });
  }

  if (!isMobile && collapse) {
    const body = collapse.querySelector(".card-body") as HTMLDivElement | null;
    if (body) {
      body.classList.add("color-picker__body");

      paletteCursor = element("div", { className: "color-picker__palette-cursor" }) as HTMLDivElement;
      palette = element("div", { className: "color-picker__palette" }, paletteCursor) as HTMLDivElement;

      alphaThumb = element("div", { className: "color-picker__alpha-thumb" }) as HTMLDivElement;
      alphaTrack = element("div", { className: "color-picker__alpha" }, alphaThumb) as HTMLDivElement;

      hueThumb = element("div", { className: "color-picker__hue-thumb" }) as HTMLDivElement;
      hueTrack = element("div", { className: "color-picker__hue" }, hueThumb) as HTMLDivElement;

      const mainRow = element("div", { className: "color-picker__main" }, palette, alphaTrack) as HTMLDivElement;
      const hueRow = element("div", { className: "color-picker__hue-row" }, hueTrack) as HTMLDivElement;

      const hexInputHandle = Input({
        blockGameKeys: true,
      });
      hexInput = hexInputHandle.input;
      hexInput.classList.add("color-picker__hex-input");
      hexInput.value = "";
      hexInput.maxLength = 9;
      hexInput.spellcheck = false;
      hexInput.inputMode = "text";
      hexInput.setAttribute("aria-label", `Hex code for ${label}`);
      formatToggle = element("button", {
        type: "button",
        className: "color-picker__mode-btn",
        textContent: "HEX",
        "aria-pressed": "false",
        "aria-label": "Passer en saisie RGBA",
      }) as HTMLButtonElement;
      hexInputHandle.root.classList.add("color-picker__hex-wrap");
      const hexRow = element("div", { className: "color-picker__hex-row" }, formatToggle, hexInputHandle.root) as HTMLDivElement;

      body.replaceChildren(mainRow, hueRow, hexRow);

      pointerDrag(palette, (ev) => {
        if (!palette || !paletteCursor) return;
        const rect = palette.getBoundingClientRect();
        const x = clamp((ev.clientX - rect.left) / rect.width, 0, 1);
        const y = clamp((ev.clientY - rect.top) / rect.height, 0, 1);
        setHsva({ ...hsva, s: x, v: 1 - y }, "input");
      }, () => emit("change"));

      pointerDrag(alphaTrack, (ev) => {
        if (!alphaTrack) return;
        const rect = alphaTrack.getBoundingClientRect();
        const y = clamp((ev.clientY - rect.top) / rect.height, 0, 1);
        setHsva({ ...hsva, a: 1 - y }, "input");
      }, () => emit("change"));

      pointerDrag(hueTrack, (ev) => {
        if (!hueTrack) return;
        const rect = hueTrack.getBoundingClientRect();
        const x = clamp((ev.clientX - rect.left) / rect.width, 0, 1);
        setHsva({ ...hsva, h: x * 360 }, "input");
      }, () => emit("change"));

      formatToggle.addEventListener("click", () => {
        inputMode = inputMode === "hex" ? "rgba" : "hex";
        if (hexInput) {
          const currentValue = valueFromHsva(hsva);
          hexInput.value = inputMode === "hex"
            ? (hsva.a === 1 ? currentValue.hex : currentValue.hexa)
            : currentValue.rgba;
        }
        render();
        hexInput?.focus();
        hexInput?.select();
      });

      hexInput.addEventListener("input", () => {
        if (inputMode === "hex") {
          const sanitized = cleanHexInput(hexInput!.value);
          if (sanitized !== hexInput!.value) {
            const pos = hexInput!.selectionStart ?? sanitized.length;
            hexInput!.value = sanitized;
            hexInput!.setSelectionRange(pos, pos);
          }
        }
      });
      const commitInput = () => {
        const raw = hexInput!.value;
        if (inputMode === "hex") {
          const parsed = parseHex(raw);
          if (!parsed) {
            hexInput!.value = hsva.a === 1 ? valueFromHsva(hsva).hex : valueFromHsva(hsva).hexa;
            return;
          }
          const stripped = raw.startsWith("#") ? raw.slice(1) : raw;
          const hasAlpha = stripped.length === 4 || stripped.length === 8;
          parsed.a = hasAlpha ? parsed.a : hsva.a;
          setFromRgba(parsed, "change");
        } else {
          const normalized = normalizeRgbaInput(raw);
          const parsed = parseColorString(normalized);
          if (!parsed) {
            hexInput!.value = valueFromHsva(hsva).rgba;
            return;
          }
          setFromRgba(parsed, "change");
        }
      };
      hexInput.addEventListener("change", commitInput);
      hexInput.addEventListener("blur", commitInput);
      hexInput.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter") {
          commitInput();
          hexInput!.blur();
        }
      });
    }
  }

  if (isMobile) {
    if (collapse) collapse.remove();
    nativeInput = element("input", {
      className: "color-picker__native",
      type: "color",
      value: rgbaToHex(hsvaToRgba({ ...hsva, a: 1 })),
    }) as HTMLInputElement;
    preview.addEventListener("click", () => nativeInput!.click());
    nativeInput.addEventListener("input", () => {
      const parsed = parseHex(nativeInput!.value);
      if (parsed) {
        parsed.a = hsva.a;
        setFromRgba(parsed, "input");
        emit("change");
      }
    });
    card.appendChild(nativeInput);
  }

  render();

  return {
    root: card,
    isMobile,
    getValue: () => valueFromHsva(hsva),
    setValue: (next, nextAlpha) => {
      const parsed = parseColorString(next) ?? parseHex(next) ?? parseHex("#FFFFFF");
      if (!parsed) return;
      if (typeof nextAlpha === "number") parsed.a = nextAlpha;
      setFromRgba(parsed, null);
    },
  };
}
