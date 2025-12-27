// ui/components/Switch.ts
import { element } from "../../styles/helpers";

export type SwitchSize = "sm" | "md" | "lg";
export type LabelSide = "left" | "right" | "none";

export type SwitchOptions = {
  id?: string;
  checked?: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  label?: string;
  labelSide?: LabelSide;     // "left" | "right" | "none"
  onChange?: (checked: boolean) => void;
};

export type SwitchHandle = {
  root: HTMLDivElement;
  button: HTMLButtonElement;
  isChecked: () => boolean;
  setChecked: (v: boolean, silent?: boolean) => void;
  setDisabled: (v: boolean) => void;
  setLabel: (t?: string) => void;
  focus: () => void;
  destroy: () => void;
};

export function Switch(opts: SwitchOptions = {}): SwitchHandle {
  const {
    id,
    checked = false,
    disabled = false,
    size = "md",
    label,
    labelSide = "right",
    onChange,
  } = opts;

  const root = element("div", { className: "lg-switch-wrap" }) as HTMLDivElement;

  const btn = element("button", {
    className: `lg-switch lg-switch--${size}`,
    id,
    type: "button",
    role: "switch",
    "aria-checked": String(!!checked),
    "aria-disabled": String(!!disabled),
    title: label ?? "Basculer",
  }) as HTMLButtonElement;

  const track = element("span", { className: "lg-switch-track" });
  const thumb = element("span", { className: "lg-switch-thumb" });
  btn.append(track, thumb);

  let lblEl: HTMLSpanElement | null = null;
  if (label && labelSide !== "none") {
    lblEl = element("span", { className: "lg-switch-label" }, label) as HTMLSpanElement;
  }

  // layout label
  if (lblEl && labelSide === "left") {
    root.append(lblEl, btn);
  } else if (lblEl && labelSide === "right") {
    root.append(btn, lblEl);
  } else {
    root.append(btn);
  }

  // state
  let _checked = !!checked;
  let _disabled = !!disabled;

  function reflect() {
    btn.classList.toggle("on", _checked);
    btn.setAttribute("aria-checked", String(_checked));
    btn.disabled = _disabled;
    btn.setAttribute("aria-disabled", String(_disabled));
  }

  function toggle(silent = false) {
    if (_disabled) return;
    _checked = !_checked;
    reflect();
    if (!silent) onChange?.(_checked);
  }

  function onClick(e: MouseEvent) {
    e.preventDefault();
    toggle();
  }

  function onKey(e: KeyboardEvent) {
    if (_disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
    if (e.key === "ArrowLeft") { e.preventDefault(); setChecked(false); }
    if (e.key === "ArrowRight") { e.preventDefault(); setChecked(true); }
  }

  btn.addEventListener("click", onClick);
  btn.addEventListener("keydown", onKey);

  function isChecked() { return _checked; }
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
      if (lblEl) { lblEl.remove(); lblEl = null; }
      return;
    }
    if (!lblEl) {
      lblEl = element("span", { className: "lg-switch-label" }, t) as HTMLSpanElement;
      // default on right if added later
      root.append(lblEl);
    } else {
      lblEl.textContent = t;
    }
  }
  function focus() { btn.focus(); }
  function destroy() {
    btn.removeEventListener("click", onClick);
    btn.removeEventListener("keydown", onKey);
  }

  reflect();

  return { root, button: btn, isChecked, setChecked, setDisabled, setLabel, focus, destroy };
}
