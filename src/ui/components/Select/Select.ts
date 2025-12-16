// ui/components/Select.ts
import { el } from "../../../core/dom";

export type SelectOption = { value: string; label: string; disabled?: boolean };
export type SelectSize = "sm" | "md" | "lg";

export type SelectOptions = {
  id?: string;
  value?: string;                     // initial value
  options: SelectOption[];
  placeholder?: string;
  size?: SelectSize;
  disabled?: boolean;
  blockGameKeys?: boolean;            // soft-block game keys while menu open
  onChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
};

export type SelectHandle = {
  root: HTMLDivElement;
  open: () => void;
  close: () => void;
  toggle: () => void;
  getValue: () => string | null;
  setValue: (v: string, opts?: { notify?: boolean }) => void;
  setOptions: (opts: SelectOption[]) => void;
  setDisabled: (d: boolean) => void;
  destroy: () => void;
};

/* ---------- Global soft key-block while a select is open ---------- */
let __selAttached = false;
const __protectedForKeys = new Set<HTMLElement>();
const __keyHandler = (e: KeyboardEvent) => {
  const active = document.activeElement as HTMLElement | null;
  for (const el of __protectedForKeys) {
    if (active && (active === el || el.contains(active))) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      return;
    }
  }
};
function __attachGlobalKeys() {
  if (__selAttached) return;
  __selAttached = true;
  window.addEventListener("keydown", __keyHandler, true);
  window.addEventListener("keypress", __keyHandler, true);
  window.addEventListener("keyup", __keyHandler, true);
  document.addEventListener("keydown", __keyHandler, true);
  document.addEventListener("keypress", __keyHandler, true);
  document.addEventListener("keyup", __keyHandler, true);
}
function __detachGlobalKeys() {
  if (!__selAttached) return;
  if (__protectedForKeys.size > 0) return;
  __selAttached = false;
  window.removeEventListener("keydown", __keyHandler, true);
  window.removeEventListener("keypress", __keyHandler, true);
  window.removeEventListener("keyup", __keyHandler, true);
  document.removeEventListener("keydown", __keyHandler, true);
  document.removeEventListener("keypress", __keyHandler, true);
  document.removeEventListener("keyup", __keyHandler, true);
}
/* ------------------------------------------------------------------ */

export function Select(cfg: SelectOptions): SelectHandle {
  const {
    id,
    value = null,
    options,
    placeholder = "Select...",
    size = "md",
    disabled = false,
    blockGameKeys = true,
    onChange,
    onOpenChange,
  } = cfg;

  const root = el("div", { className: "select", id }) as HTMLDivElement;
  const trigger = el("button", { className: "select-trigger", type: "button" }) as HTMLButtonElement;
  const valSpan = el("span", { className: "select-value" }, placeholder) as HTMLSpanElement;
  const caret = el("span", { className: "select-caret" }, "▾") as HTMLSpanElement;
  trigger.append(valSpan, caret);

  const menu = el("div", { className: "select-menu", role: "listbox", tabindex: "-1", "aria-hidden": "true" }) as HTMLDivElement;

  root.classList.add(`select--${size}`);

  let open = false;
  let current: string | null = value;
  let unregKeys: (() => void) | null = null;
  let isDisabled = !!disabled;

  function labelFor(v: string | null) {
    if (v == null) return placeholder;
    const found = (cfg.options || options).find(o => o.value === v);
    return found?.label ?? placeholder;
  }

  function reflectSelection(v: string | null) {
    valSpan.textContent = labelFor(v);
    menu.querySelectorAll(".select-option").forEach(elm => {
      const val = (elm as HTMLElement).dataset.value;
      const sel = v != null && val === v;
      elm.classList.toggle("selected", sel);
      elm.setAttribute("aria-selected", String(sel));
    });
  }

  function renderOptions(list: SelectOption[]) {
    menu.replaceChildren();
    list.forEach((opt) => {
      const item = el("button", {
        className: "select-option" + (opt.disabled ? " disabled" : ""),
        type: "button",
        role: "option",
        "data-value": opt.value,
        "aria-selected": String(opt.value === current),
        tabindex: "-1",
      }, opt.label) as HTMLButtonElement;

      if (opt.value === current) item.classList.add("selected");

      if (!opt.disabled) {
        item.addEventListener("pointerdown", (e) => {
          e.preventDefault();    // avoid blur before setValue
          e.stopPropagation();   // avoid close/reopen from the document
          setValue(opt.value, { notify: true });
          closeMenu();
        }, { capture: true });
      }

      menu.appendChild(item);
    });
  }

  function setAria() {
    trigger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
  }

  function positionMenu() {
    const r = trigger.getBoundingClientRect();
    Object.assign(menu.style, { minWidth: `${r.width}px` });
  }

  function openMenu() {
    if (open || isDisabled) return;
    open = true;
    root.classList.add("open");
    setAria();
    positionMenu();
    document.addEventListener("mousedown", onDocDown, true);
    document.addEventListener("scroll", onDocScroll, true);
    window.addEventListener("resize", onWindowResize);
    menu.focus({ preventScroll: true });
    if (blockGameKeys) {
      __attachGlobalKeys();
      __protectedForKeys.add(root);
      unregKeys = () => { __protectedForKeys.delete(root); __detachGlobalKeys(); };
    }
    onOpenChange?.(true);
  }

  function closeMenu() {
    if (!open) return;
    open = false;
    root.classList.remove("open");
    setAria();
    document.removeEventListener("mousedown", onDocDown, true);
    document.removeEventListener("scroll", onDocScroll, true);
    window.removeEventListener("resize", onWindowResize);
    trigger.focus({ preventScroll: true });
    unregKeys?.(); unregKeys = null;
    onOpenChange?.(false);
  }

  function toggleMenu() { open ? closeMenu() : openMenu(); }

  function setValue(v: string, opts: { notify?: boolean } = {}) {
    const prev = current;
    current = v;
    reflectSelection(current);
    if (opts.notify !== false && prev !== v) onChange?.(v);
  }

  function getValue() { return current; }

  // Keyboard nav
  function focusNext(dir: 1 | -1) {
    const items = Array.from(menu.querySelectorAll<HTMLButtonElement>(".select-option:not(.disabled)"));
    if (!items.length) return;
    const idx = items.findIndex(it => it.classList.contains("active"));
    const next = items[(idx + (dir === 1 ? 1 : items.length - 1)) % items.length];
    items.forEach(it => it.classList.remove("active"));
    next.classList.add("active");
    next.focus({ preventScroll: true });
    next.scrollIntoView({ block: "nearest" });
  }
  function onTriggerKey(e: KeyboardEvent) {
    if (e.key === " " || e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault(); openMenu();
    }
  }
  function onMenuKey(e: KeyboardEvent) {
    if (e.key === "Escape") { e.preventDefault(); closeMenu(); return; }
    if (e.key === "Enter" || e.key === " ") {
      const active = menu.querySelector<HTMLButtonElement>(".select-option.active") ||
                     menu.querySelector<HTMLButtonElement>(".select-option.selected");
      if (active && !active.classList.contains("disabled")) {
        e.preventDefault();
        setValue(active.dataset.value!, { notify: true });
        closeMenu();
      }
      return;
    }
    if (e.key === "ArrowDown") { e.preventDefault(); focusNext(1); return; }
    if (e.key === "ArrowUp")   { e.preventDefault(); focusNext(-1); return; }
  }

  function onDocDown(e: MouseEvent) {
    if (!root.contains(e.target as Node)) closeMenu();
  }
  function onDocScroll() { if (open) positionMenu(); }
  function onWindowResize() { if (open) positionMenu(); }

  function setDisabled(d: boolean) {
    isDisabled = !!d;
    trigger.disabled = isDisabled;
    root.classList.toggle("disabled", isDisabled);
    if (isDisabled) closeMenu();
  }

  function setOptions(newOpts: SelectOption[]) {
    cfg.options = newOpts;
    renderOptions(newOpts);
    if (!newOpts.some(o => o.value === current)) {
      current = null;
      reflectSelection(null); // no notify
    }
  }

  // Mount + init
  root.append(trigger, menu);

  // Toggle on pointerdown (capture) to avoid re-open after global close
  trigger.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  }, { capture: true });

  trigger.addEventListener("keydown", onTriggerKey);
  menu.addEventListener("keydown", onMenuKey);

  renderOptions(options);
  // Init SANS notifier
  if (value != null) {
    current = value;
    reflectSelection(current);
  } else {
    reflectSelection(null);
  }
  setAria();
  setDisabled(isDisabled);

  return {
    root,
    open: openMenu,
    close: closeMenu,
    toggle: toggleMenu,
    getValue,
    setValue,
    setOptions,
    setDisabled,
    destroy() {
      document.removeEventListener("mousedown", onDocDown, true);
      document.removeEventListener("scroll", onDocScroll, true);
      window.removeEventListener("resize", onWindowResize);
      unregKeys?.(); unregKeys = null;
    }
  };
}
