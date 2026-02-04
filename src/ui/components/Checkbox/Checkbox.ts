// ui/components/Checkbox/Checkbox.ts
import { element } from "../../styles/helpers";

export type CheckboxSize = "sm" | "md" | "lg";
export type LabelSide = "left" | "right" | "none";

export type CheckboxOptions = {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  size?: CheckboxSize;
  label?: string;
  labelSide?: LabelSide;
  onChange?: (checked: boolean) => void;
};

export type CheckboxHandle = {
  root: HTMLDivElement;
  input: HTMLInputElement;
  isChecked: () => boolean;
  setChecked: (v: boolean, silent?: boolean) => void;
  setDisabled: (v: boolean) => void;
  setLabel: (t?: string) => void;
  focus: () => void;
  destroy: () => void;
};

export function Checkbox(opts: CheckboxOptions = {}): CheckboxHandle {
  const {
    id,
    checked = false,
    disabled = false,
    size = "md",
    label,
    labelSide = "right",
    onChange,
  } = opts;

  const root = element("div", { className: "lg-checkbox-wrap" }) as HTMLDivElement;

  const input = element("input", {
    className: `lg-checkbox lg-checkbox--${size}`,
    id,
    type: "checkbox",
    checked: !!checked,
    disabled: !!disabled,
  }) as HTMLInputElement;

  let lblEl: HTMLLabelElement | null = null;
  if (label && labelSide !== "none") {
    lblEl = element("label", { className: "lg-checkbox-label" }, label) as HTMLLabelElement;
    lblEl.addEventListener("click", onClick);
  }

  // Layout label
  if (lblEl && labelSide === "left") {
    root.append(lblEl, input);
  } else if (lblEl && labelSide === "right") {
    root.append(input, lblEl);
  } else {
    root.append(input);
  }

  // State
  let _checked = !!checked;
  let _disabled = !!disabled;

  function reflect() {
    input.checked = _checked;
    input.disabled = _disabled;
  }

  function toggle(silent = false) {
    if (_disabled) return;
    _checked = !_checked;
    reflect();
    if (!silent) onChange?.(_checked);
  }

  function onClick() {
    if (_disabled) return;
    toggle();
  }

  function onKey(e: KeyboardEvent) {
    if (_disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  }

  input.addEventListener("click", onClick);
  input.addEventListener("keydown", onKey);

  function isChecked() {
    return _checked;
  }

  function setChecked(v: boolean, silent = false) {
    _checked = !!v;
    reflect();
    if (!silent) onChange?.(_checked);
  }

  function setDisabled(v: boolean) {
    _disabled = !!v;
    reflect();
  }

  function setLabel(t?: string) {
    if (!t) {
      if (lblEl) {
        lblEl.remove();
        lblEl = null;
      }
      return;
    }
    if (!lblEl) {
      lblEl = element("label", { className: "lg-checkbox-label" }, t) as HTMLLabelElement;
      lblEl.addEventListener("click", onClick);
      root.append(lblEl);
    } else {
      lblEl.textContent = t;
    }
  }

  function focus() {
    input.focus();
  }

  function destroy() {
    input.removeEventListener("click", onClick);
    input.removeEventListener("keydown", onKey);
    if (lblEl) lblEl.removeEventListener("click", onClick);
  }

  reflect();

  return { root, input, isChecked, setChecked, setDisabled, setLabel, focus, destroy };
}
