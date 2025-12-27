// ui/components/Input.ts
import { el } from "../../dom";

export type InputMode = "any" | "digits" | "alpha" | "alphanumeric";

export type InputOptions = {
  id?: string;
  placeholder?: string;
  value?: string;
  mode?: InputMode;
  allowSpaces?: boolean;
  allowDashes?: boolean;
  allowUnderscore?: boolean;
  maxLength?: number;
  blockGameKeys?: boolean;      // soft-block game key events while the input is focused
  debounceMs?: number;
  onChange?: (val: string) => void;
  onEnter?: (val: string) => void;
  label?: string;
};

export type InputHandle = {
  root: HTMLDivElement;
  input: HTMLInputElement;
  getValue: () => string;
  setValue: (v: string) => void;
  focus: () => void;
  blur: () => void;
  setDisabled: (d: boolean) => void;
  isFocused: () => boolean;
  destroy: () => void;
};

/* ----------------------------- Built-in soft block (window+document capture) ----------------------------- */

let __lgSoftAttached = false;
const __lgProtectedEls = new Set<HTMLElement>();

function __lgDeepActiveElement(root: Document | ShadowRoot = document): Element | null {
  let ae: any = root.activeElement || null;
  while (ae && ae.shadowRoot && ae.shadowRoot.activeElement) {
    ae = ae.shadowRoot.activeElement;
  }
  return ae;
}

const __lgSoftHandler = (e: KeyboardEvent) => {
  const focused = __lgDeepActiveElement();
  if (!focused) return;
  for (const el of __lgProtectedEls) {
    if (focused === el || el.contains(focused)) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      return;
    }
  }
};

function __lgAttachSoft() {
  if (__lgSoftAttached) return;
  __lgSoftAttached = true;
  window.addEventListener("keydown", __lgSoftHandler, true);
  window.addEventListener("keypress", __lgSoftHandler, true);
  window.addEventListener("keyup", __lgSoftHandler, true);
  document.addEventListener("keydown", __lgSoftHandler, true);
  document.addEventListener("keypress", __lgSoftHandler, true);
  document.addEventListener("keyup", __lgSoftHandler, true);
}

function __lgDetachSoft() {
  if (!__lgSoftAttached) return;
  __lgSoftAttached = false;
  window.removeEventListener("keydown", __lgSoftHandler, true);
  window.removeEventListener("keypress", __lgSoftHandler, true);
  window.removeEventListener("keyup", __lgSoftHandler, true);
  document.removeEventListener("keydown", __lgSoftHandler, true);
  document.removeEventListener("keypress", __lgSoftHandler, true);
  document.removeEventListener("keyup", __lgSoftHandler, true);
}

/** Register an element to protect; returns an unregister. */
function __lgRegisterSoftBlock(el: HTMLElement) {
  if (__lgProtectedEls.size === 0) __lgAttachSoft();
  __lgProtectedEls.add(el);
  return () => {
    __lgProtectedEls.delete(el);
    if (__lgProtectedEls.size === 0) __lgDetachSoft();
  };
}

/* ─────────────────────────────────────────────────────────────────────────── */

function buildRegex(mode: InputMode, spaces: boolean, dashes: boolean, underscore: boolean) {
  let core: string;
  switch (mode) {
    case "digits": core = "0-9"; break;
    case "alpha": core = "\\p{L}"; break;
    case "alphanumeric": core = "\\p{L}0-9"; break;
    default: return null;
  }
  if (spaces) core += " ";
  if (dashes) core += "\\-";
  if (underscore) core += "_";
  return new RegExp(`[^${core}]`, "gu");
}

function sanitize(value: string, rx: RegExp | null): string {
  if (!rx) return value;
  return value.replace(rx, "");
}

function debounce<T extends (...args:any[])=>void>(fn: T, ms=0): T {
  if (!ms) return fn as T;
  let t: any;
  return ((...args:any[]) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  }) as T;
}

export function Input(opts: InputOptions = {}): InputHandle {
  const {
    id,
    placeholder = "",
    value = "",
    mode = "any",
    allowSpaces = false,
    allowDashes = false,
    allowUnderscore = false,
    maxLength,
    blockGameKeys = true,
    debounceMs = 0,
    onChange,
    onEnter,
    label,
  } = opts;

  const wrap = el("div", { className: "lg-input-wrap" }) as HTMLDivElement;
  const input = el("input", { className: "input", id, placeholder }) as HTMLInputElement;

  if (typeof maxLength === "number" && maxLength > 0) input.maxLength = maxLength;
  if (value) input.value = value;

  if (label) {
    const lab = el("div", { className: "lg-input-label" }, label);
    wrap.appendChild(lab);
  }
  wrap.appendChild(input);

  // Filtrage
  const rx = buildRegex(mode, allowSpaces, allowDashes, allowUnderscore);
  const applyFilter = () => {
    const start = input.selectionStart ?? input.value.length;
    const before = input.value.length;
    const filtered = sanitize(input.value, rx);
    if (filtered !== input.value) {
      input.value = filtered;
      const delta = before - filtered.length;
      const pos = Math.max(0, start - delta);
      input.setSelectionRange(pos, pos);
    }
  };

  const emitChange = debounce(() => onChange?.(input.value), debounceMs);

  input.addEventListener("input", () => { applyFilter(); emitChange(); });
  input.addEventListener("paste", () => queueMicrotask(() => { applyFilter(); emitChange(); }));
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") onEnter?.(input.value); });

  // Blocage soft dynamique: actif seulement quand cet input est focus
  const unregister = blockGameKeys ? __lgRegisterSoftBlock(input) : () => {};

  function getValue() { return input.value; }
  function setValue(v: string) { input.value = v ?? ""; applyFilter(); emitChange(); }
  function focus() { input.focus(); }
  function blur() { input.blur(); }
  function setDisabled(d: boolean) { input.disabled = !!d; }
  function isFocused() { return document.activeElement === input; }
  function destroy() { unregister(); }

  return { root: wrap, input, getValue, setValue, focus, blur, setDisabled, isFocused, destroy };
}
