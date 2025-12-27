// ui/components/Slider/Slider.ts
import { element } from "../../styles/helpers";

export type SliderOptions = {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  label?: string;
  showValue?: boolean;
  disabled?: boolean;
  onInput?: (value: number, ev: Event) => void;
  onChange?: (value: number, ev: Event) => void;
};

export type SliderHandle = {
  root: HTMLDivElement;
  input: HTMLInputElement;
  setValue: (v: number) => void;
  getValue: () => number;
  setDisabled: (d: boolean) => void;
};

export function Slider(opts: SliderOptions = {}): SliderHandle {
  const { id, min = 0, max = 100, step = 1, value = min, label, showValue = true, disabled = false, onInput, onChange } = opts;

  const root = element("div", { className: "slider" }) as HTMLDivElement;
  const row = element("div", { className: "slider-row" }) as HTMLDivElement;
  const track = element("div", { className: "slider-track" }) as HTMLDivElement;
  const fill = element("div", { className: "slider-range" }) as HTMLDivElement;
  track.appendChild(fill);

  const input = element("input", { id, type: "range", min: String(min), max: String(max), step: String(step), value: String(value), disabled }) as HTMLInputElement;
  input.addEventListener("input", (ev) => { update(); onInput?.(getValue(), ev); });
  input.addEventListener("change", (ev) => onChange?.(getValue(), ev));

  function pct(): number {
    const range = max - min;
    if (range === 0) return 0;
    const v = getValue();
    return (v - min) / range;
  }

  function update() {
    const p = Math.max(0, Math.min(1, pct()));
    fill.style.width = `${p * 100}%`;
    if (valueEl) valueEl.textContent = String(getValue());
  }

  function setValue(v: number){ input.value = String(v); update(); }
  function getValue(){ return Number(input.value); }
  function setDisabled(d: boolean){ input.disabled = !!d; }

  let labelEl: HTMLSpanElement | null = null;
  let valueEl: HTMLSpanElement | null = null;
  if (label){ labelEl = element("span", { className: "slider-label" }, label) as HTMLSpanElement; row.appendChild(labelEl); }
  // position the native input inside the track for perfect alignment
  track.appendChild(input);
  row.appendChild(track);
  if (showValue){ valueEl = element("span", { className: "slider-value" }, String(value)) as HTMLSpanElement; row.appendChild(valueEl); }

  root.append(row);
  update();
  return { root, input, setValue, getValue, setDisabled };
}

export type RangeSliderOptions = {
  id?: string;
  min?: number; max?: number; step?: number;
  values?: [number, number];
  label?: string;
  disabled?: boolean;
  showValues?: boolean;
  onInput?: (values: [number, number], ev: Event) => void;
  onChange?: (values: [number, number], ev: Event) => void;
};

export type RangeSliderHandle = {
  root: HTMLDivElement;
  inputs: [HTMLInputElement, HTMLInputElement];
  getValues: () => [number, number];
  setValues: (a: number, b: number) => void;
  setDisabled: (d: boolean) => void;
};

type HandleKind = "min" | "max";

export function RangeSlider(opts: RangeSliderOptions = {}): RangeSliderHandle {
  const { id, min = 0, max = 100, step = 1, values = [min, max], label, disabled = false, showValues = true, onInput, onChange } = opts;

  const clamp = (v: number) => Math.min(max, Math.max(min, v));
  const initialLo = clamp(Math.min(values[0], values[1]));
  const initialHi = clamp(Math.max(values[0], values[1]));
  const span = max - min;
  const stepSize = Number.isFinite(step) && step > 0 ? step : 1;
  const gap = span <= 0 ? 0 : Math.min(stepSize, span);

  const root = element("div", { className: "slider slider--range" }) as HTMLDivElement;
  const row = element("div", { className: "slider-row" }) as HTMLDivElement;
  const track = element("div", { className: "slider-track" }) as HTMLDivElement;
  const fill = element("div", { className: "slider-range" }) as HTMLDivElement;
  track.appendChild(fill);

  const inputMin = element("input", {
    type: "range",
    min: String(min),
    max: String(max),
    step: String(step),
    value: String(initialLo),
    disabled,
  }) as HTMLInputElement;
  const inputMax = element("input", {
    type: "range",
    min: String(min),
    max: String(max),
    step: String(step),
    value: String(initialHi),
    disabled,
  }) as HTMLInputElement;

  if (id) {
    inputMin.id = `${id}-min`;
    inputMax.id = `${id}-max`;
  }
  inputMin.dataset.handle = "min";
  inputMax.dataset.handle = "max";

  const inputs: [HTMLInputElement, HTMLInputElement] = [inputMin, inputMax];

  function normalize(which?: HandleKind): [number, number] {
    let lo = clamp(Number(inputMin.value));
    let hi = clamp(Number(inputMax.value));
    if (gap <= 0) {
      if (lo > hi) {
        if (which === "min") {
          lo = hi;
          inputMin.value = String(lo);
        } else {
          hi = lo;
          inputMax.value = String(hi);
        }
      }
      return [lo, hi];
    }

    if (which === "min") {
      const maxLo = hi - gap;
      if (lo > maxLo) {
        lo = Math.max(min, maxLo);
        inputMin.value = String(lo);
        if (hi - lo < gap) {
          hi = Math.min(max, lo + gap);
          inputMax.value = String(hi);
        }
      }
    } else if (which === "max") {
      const minHi = lo + gap;
      if (hi < minHi) {
        hi = Math.min(max, Math.max(minHi, min + gap));
        inputMax.value = String(hi);
        if (hi - lo < gap) {
          lo = Math.max(min, hi - gap);
          inputMin.value = String(lo);
        }
      }
    } else {
      if (lo > hi - gap) {
        lo = Math.max(min, hi - gap);
        inputMin.value = String(lo);
      }
      if (hi < lo + gap) {
        hi = Math.min(max, lo + gap);
        inputMax.value = String(hi);
      }
    }
    return [lo, hi];
  }

  let labelEl: HTMLSpanElement | null = null;
  if (label) {
    labelEl = element("span", { className: "slider-label" }, label) as HTMLSpanElement;
    row.appendChild(labelEl);
  }

  track.appendChild(inputMin);
  track.appendChild(inputMax);
  row.appendChild(track);

  let valuesEl: HTMLSpanElement | null = null;
  if (showValues) {
    valuesEl = element("span", { className: "slider-value slider-value-range" }) as HTMLSpanElement;
    row.appendChild(valuesEl);
  }

  function update(which?: HandleKind): [number, number] {
    const [lo, hi] = normalize(which);
    const span = max - min;
    const loPct = span === 0 ? 0 : ((lo - min) / span) * 100;
    const hiPct = span === 0 ? 0 : ((hi - min) / span) * 100;

    fill.style.left = `${loPct}%`;
    fill.style.width = `${Math.max(hiPct - loPct, 0)}%`;

    if (valuesEl && showValues) valuesEl.textContent = `${lo} - ${hi}`;
    return [lo, hi];
  }

  const handleInput = (which: HandleKind) => (ev: Event) => {
    const current = update(which);
    onInput?.(current, ev);
  };
  const handleChange = (which: HandleKind) => (ev: Event) => {
    const current = update(which);
    onChange?.(current, ev);
  };

  inputMin.addEventListener("input", handleInput("min"));
  inputMax.addEventListener("input", handleInput("max"));
  inputMin.addEventListener("change", handleChange("min"));
  inputMax.addEventListener("change", handleChange("max"));

  for (const input of inputs) {
    input.addEventListener("focus", () => {
      for (const other of inputs) other.classList.remove("is-active");
      input.classList.add("is-active");
    });
    input.addEventListener("blur", () => input.classList.remove("is-active"));
  }

  root.append(row);
  update();

  function getValues(): [number, number] {
    const [lo, hi] = normalize();
    return [lo, hi];
  }

  function setValues(a: number, b: number) {
    const lo = clamp(Math.min(a, b));
    const hi = clamp(Math.max(a, b));
    inputMin.value = String(lo);
    inputMax.value = String(hi);
    update();
  }

  function setDisabled(d: boolean) {
    for (const input of inputs) input.disabled = !!d;
    if (d) root.classList.add("is-disabled");
    else root.classList.remove("is-disabled");
  }

  if (!showValues && valuesEl) valuesEl.textContent = "";

  return {
    root,
    inputs,
    getValues,
    setValues,
    setDisabled,
  };
}
