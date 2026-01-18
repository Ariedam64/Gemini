// ui/components/SearchBar.ts
import { element } from "../../styles/helpers";

export type SearchSize = "sm" | "md" | "lg";

export type SearchBarOptions = {
  id?: string;
  placeholder?: string;
  value?: string;
  size?: SearchSize;                 // default "md"
  disabled?: boolean;
  autoFocus?: boolean;

  /** Triggered on every change (debounced if debounceMs > 0) */
  onChange?: (value: string) => void;

  /** Triggered on Enter, or when autoSearch=true after debounce */
  onSearch?: (value: string) => void;

  /** If true, calls onSearch after the debounce delay (type-ahead) */
  autoSearch?: boolean;

  /** Debounce delay in ms for automatic onChange/onSearch */
  debounceMs?: number;               // 0 = no debounce

  /** Key for quick focus ("/" by default, set "" to disable) */
  focusKey?: string;

  /** Optional icons (string = text, Node = SVG/element) */
  iconLeft?: string | Node;          // magnifier by default if not provided
  iconRight?: string | Node;         // e.g., shortcut, help…

  /** Integrated clear button "×" */
  withClear?: boolean;
  clearTitle?: string;               // title du bouton clear

  /** Accessibility */
  ariaLabel?: string;

  /** Submission by button (shown if provided) */
  submitLabel?: string | Node;

  /** Loading state (spinner on the right) */
  loading?: boolean;

  /** Soft-blocks game keyboard events while the input is focused */
  blockGameKeys?: boolean;
};

export type SearchBarHandle = {
  root: HTMLDivElement;
  input: HTMLInputElement;

  getValue: () => string;
  setValue: (v: string, opts?: { notify?: boolean }) => void;

  focus: () => void;
  blur: () => void;

  setDisabled: (d: boolean) => void;
  setPlaceholder: (t: string) => void;

  clear: (opts?: { notify?: boolean }) => void;

  setLoading: (on: boolean) => void;
  setIconLeft: (n?: string | Node) => void;
  setIconRight: (n?: string | Node) => void;
};

/* ───────────────────── Soft block (window+document capture) ───────────────────── */

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

function toNode(c?: string | Node): Node | null {
  if (c == null) return null;
  return typeof c === "string" ? document.createTextNode(c) : c;
}

function makeSpinner(): SVGSVGElement {
  const svgNS = "http://www.w3.org/2000/svg";
  const s = document.createElementNS(svgNS, "svg");
  s.setAttribute("viewBox", "0 0 24 24");
  s.setAttribute("width", "16");
  s.setAttribute("height", "16");
  s.setAttribute("aria-hidden", "true");
  s.style.display = "none";
  s.style.flexShrink = "0";
  const c = document.createElementNS(svgNS, "circle");
  c.setAttribute("cx", "12");
  c.setAttribute("cy", "12");
  c.setAttribute("r", "9");
  c.setAttribute("fill", "none");
  c.setAttribute("stroke", "currentColor");
  c.setAttribute("stroke-width", "3");
  c.setAttribute("stroke-linecap", "round");
  const dash = document.createElementNS(svgNS, "animate");
  dash.setAttribute("attributeName", "stroke-dasharray");
  dash.setAttribute("values", "1,150;90,150;90,150");
  dash.setAttribute("dur", "1.5s");
  dash.setAttribute("repeatCount", "indefinite");
  const rot = document.createElementNS(svgNS, "animateTransform");
  rot.setAttribute("attributeName", "transform");
  rot.setAttribute("attributeType", "XML");
  rot.setAttribute("type", "rotate");
  rot.setAttribute("from", "0 12 12");
  rot.setAttribute("to", "360 12 12");
  rot.setAttribute("dur", "1s");
  rot.setAttribute("repeatCount", "indefinite");
  c.append(dash, rot);
  s.appendChild(c);
  return s;
}

export function SearchBar(opts: SearchBarOptions = {}): SearchBarHandle {
  const {
    id,
    placeholder = "Search...",
    value = "",
    size = "md",
    disabled = false,
    autoFocus = false,
    onChange,
    onSearch,
    autoSearch = false,
    debounceMs = 0,
    focusKey = "/",
    iconLeft,
    iconRight,
    withClear = true,
    clearTitle = "Clear",
    ariaLabel,
    submitLabel,
    loading = false,
    blockGameKeys = true,
  } = opts;

  // Racine
  const root = element("div", { className: "search" + (size ? ` search--${size}` : ""), id }) as HTMLDivElement;

  // Left icon
  const left = element("span", { className: "search-ico search-ico--left" }) as HTMLSpanElement;
  if (iconLeft) {
    const n = toNode(iconLeft);
    if (n) left.appendChild(n);
  } else {
    left.textContent = "🔎";
    left.style.opacity = ".9";
  }

  // Input
  const input = element("input", {
    className: "input search-input",
    type: "text",
    placeholder,
    value,
    "aria-label": ariaLabel || placeholder,
  }) as HTMLInputElement;

  // Customizable right icon
  const right = element("span", { className: "search-ico search-ico--right" }) as HTMLSpanElement;
  if (iconRight) {
    const n = toNode(iconRight);
    if (n) right.appendChild(n);
  }

  // Spinner
  const spinner = makeSpinner();
  spinner.classList.add("search-spinner");

  // Clear
  const clearBtn = withClear
    ? (element("button", { className: "search-clear", type: "button", title: clearTitle }, "×") as HTMLButtonElement)
    : null;

  // Submit
  const submitBtn = submitLabel != null
    ? (element("button", { className: "btn search-submit", type: "button" }, submitLabel) as HTMLButtonElement)
    : null;

  // Assemblage
  const field = element("div", { className: "search-field" }, left, input, right, spinner, ...(clearBtn ? [clearBtn] : [])) as HTMLDivElement;
  root.append(field, ...(submitBtn ? [submitBtn] : []));

  // State
  let isDisabled = !!disabled;
  let debTimer: number | null = null;

  function setLoading(on: boolean) {
    spinner.style.display = on ? "inline-block" : "none";
    root.classList.toggle("is-loading", on);
  }

  function flushDebounce() {
    if (debTimer != null) {
      window.clearTimeout(debTimer);
      debTimer = null;
    }
  }

  function scheduleDebounce(cb: () => void) {
    flushDebounce();
    if (debounceMs > 0) {
      debTimer = window.setTimeout(() => {
        debTimer = null;
        cb();
      }, debounceMs);
    } else {
      cb();
    }
  }

  function emitChange() {
    onChange?.(input.value);
    if (autoSearch && onSearch) onSearch(input.value);
  }

  // Handlers
  input.addEventListener("input", () => {
    scheduleDebounce(emitChange);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      flushDebounce();
      onSearch?.(input.value);
    } else if (e.key === "Escape") {
      if (input.value.length > 0) {
        setValue("", { notify: true });
      } else {
        input.blur();
      }
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => setValue("", { notify: true }));
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", () => onSearch?.(input.value));
  }

  // Blocage soft dynamique: actif pendant le focus de CETTE search bar
  let unregisterSoft = () => {};
  if (blockGameKeys) {
    unregisterSoft = __lgRegisterSoftBlock(input);
  }

  // Quick focus with "/" if enabled and if the input is not already focused
  if (focusKey) {
    const onGlobalKey = (e: KeyboardEvent) => {
      if (e.key === focusKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const ae = document.activeElement as HTMLElement | null;
        const editing = ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || (ae as any).isContentEditable);
        if (!editing) {
          e.preventDefault();
          input.focus();
        }
      }
    };
    window.addEventListener("keydown", onGlobalKey, true);

    // cleanup
    (root as any).__cleanup = () => {
      window.removeEventListener("keydown", onGlobalKey, true);
      unregisterSoft();
    };
  } else {
    (root as any).__cleanup = () => { unregisterSoft(); };
  }

  function setDisabled(d: boolean) {
    isDisabled = !!d;
    input.disabled = isDisabled;
    clearBtn && (clearBtn.disabled = isDisabled);
    submitBtn && (submitBtn.disabled = isDisabled);
    root.classList.toggle("disabled", isDisabled);
  }

  function setValue(v: string, opts: { notify?: boolean } = {}) {
    const prev = input.value;
    input.value = v ?? "";
    if (opts.notify && prev !== v) {
      scheduleDebounce(emitChange);
    }
  }

  function getValue() { return input.value; }
  function focus() { input.focus(); }
  function blur() { input.blur(); }
  function setPlaceholder(t: string) { input.placeholder = t; }
  function clear(opts?: { notify?: boolean }) { setValue("", opts); }

  // Init
  setDisabled(isDisabled);
  setLoading(loading);
  if (autoFocus) focus();

  const handle: SearchBarHandle = {
    root,
    input,
    getValue,
    setValue,
    focus,
    blur,
    setDisabled,
    setPlaceholder,
    clear,
    setLoading,
    setIconLeft(n?: string | Node) {
      left.replaceChildren();
      const node = toNode(n ?? "🔎");
      if (node) left.appendChild(node);
    },
    setIconRight(n?: string | Node) {
      right.replaceChildren();
      const node = toNode(n ?? "");
      if (node) right.appendChild(node);
    },
  };

  return handle;
}
