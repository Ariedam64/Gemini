import { el } from "../../dom";

export type RangeOptions = {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onInput?: (ev: Event) => void;
};

export function Range(opts: RangeOptions = {}) {
  const { id, min = 420, max = 720, step = 10, value, onInput } = opts;
  const input = el("input", { id, type: "range", min: String(min), max: String(max), step: String(step) }) as HTMLInputElement;
  if (value != null) input.value = String(value);
  if (onInput) input.addEventListener("input", onInput);
  return input;
}

