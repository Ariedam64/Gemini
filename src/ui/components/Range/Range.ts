/**
 * Range Slider Component
 * Theme-compatible range input
 * 
 * Per .claude/rules/ui/ui.components.md:
 * - Logic file: Range.ts
 * - Style file: range.css.ts
 */

import { element } from "../../styles/helpers";

// Re-export CSS for consumers that need to inject styles
export { rangeCss } from './range.css';

export type RangeOptions = {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onInput?: (value: number, ev: Event) => void;
  onChange?: (value: number, ev: Event) => void;
  disabled?: boolean;
};

export type RangeHandle = HTMLInputElement & {
  setValue: (value: number) => void;
  getValue: () => number;
  setDisabled: (disabled: boolean) => void;
};

/**
 * Creates a themed range slider
 * @returns Range input element with façade API
 */
export function Range(opts: RangeOptions = {}): RangeHandle {
  const {
    id,
    min = 0,
    max = 100,
    step = 1,
    value = min,
    onInput,
    onChange,
    disabled = false
  } = opts;

  const input = element("input", {
    id,
    type: "range",
    className: "gemini-range",
    min: String(min),
    max: String(max),
    step: String(step)
  }) as HTMLInputElement;

  input.value = String(value);
  input.disabled = disabled;

  if (onInput) {
    input.addEventListener("input", (ev) => onInput(Number(input.value), ev));
  }
  if (onChange) {
    input.addEventListener("change", (ev) => onChange(Number(input.value), ev));
  }

  // Façade API
  const handle = input as RangeHandle;

  handle.setValue = (val: number) => {
    input.value = String(val);
  };

  handle.getValue = () => Number(input.value);

  handle.setDisabled = (d: boolean) => {
    input.disabled = d;
  };

  return handle;
}
