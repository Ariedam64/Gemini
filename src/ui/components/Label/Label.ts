// ui/components/Label.ts
import { element } from "../../styles/helpers";

export type LabelTone = "default" | "muted" | "info" | "success" | "warning" | "danger";
export type LabelSize = "sm" | "md" | "lg";
export type LabelLayout = "inline" | "stacked";
export type LabelVariant = "text" | "title";

export type LabelOptions = {
  id?: string;
  text?: string;
  htmlFor?: string;          // id of an input to target
  tone?: LabelTone;
  size?: LabelSize;
  layout?: LabelLayout;
  variant?: LabelVariant;
  required?: boolean;
  disabled?: boolean;
  tooltip?: string;          // title
  hint?: string;             // text under the label
  icon?: string | Node;      // emoji, text, or Node
  suffix?: Node | string;    // badge/text on the right
  onClick?: (ev: MouseEvent) => void;
};

export type LabelHandle = {
  root: HTMLDivElement;
  labelEl: HTMLLabelElement;
  hintEl: HTMLDivElement | null;
  setText: (t: string) => void;
  setTone: (t: LabelTone) => void;
  setRequired: (r: boolean) => void;
  setDisabled: (d: boolean) => void;
  setHint: (h?: string) => void;
};

export function Label(opts: LabelOptions = {}): LabelHandle {
  const {
    id,
    text = "",
    htmlFor,
    tone = "default",
    size = "md",
    layout = "inline",
    variant = "text",
    required = false,
    disabled = false,
    tooltip,
    hint,
    icon,
    suffix,
    onClick,
  } = opts;

  const root = element("div", { className: "lg-label-wrap", id }) as HTMLDivElement;

  const labelEl = element("label", {
    className: "lg-label",
    ...(htmlFor ? { htmlFor } : {}),
    ...(tooltip ? { title: tooltip } : {}),
  }) as HTMLLabelElement;

  // icon
  if (icon) {
    const ic = typeof icon === "string" ? element("span", { className: "lg-label-ico" }, icon) : icon;
    (ic as HTMLElement).classList?.add?.("lg-label-ico");
    labelEl.appendChild(ic as Node);
  }

  const textSpan = element("span", { className: "lg-label-text" }, text) as HTMLSpanElement;
  labelEl.appendChild(textSpan);

  // required mark
  const req = element("span", { className: "lg-label-req", ariaHidden: "true" }, " *") as HTMLSpanElement;
  if (required) labelEl.appendChild(req);

  // suffix slot (badge, etc.)
  let suffixNode: Node | null = null;
  if (suffix != null) {
    suffixNode = typeof suffix === "string" ? document.createTextNode(suffix) : suffix;
    const box = element("span", { className: "lg-label-suffix" }) as HTMLSpanElement;
    box.appendChild(suffixNode);
    labelEl.appendChild(box);
  }

  // hint text (below)
  const hintEl = hint ? element("div", { className: "lg-label-hint" }, hint) as HTMLDivElement : null;

  // classes
  root.classList.add(`lg-label--${layout}`);
  root.classList.add(`lg-label--${size}`);
  if (variant === "title") root.classList.add("lg-label--title");
  applyTone(tone);
  if (disabled) root.classList.add("is-disabled");

  root.appendChild(labelEl);
  if (hintEl) root.appendChild(hintEl);

  if (onClick) labelEl.addEventListener("click", onClick);

  function applyTone(t: LabelTone) {
    root.classList.remove("lg-label--default","lg-label--muted","lg-label--info","lg-label--success","lg-label--warning","lg-label--danger");
    root.classList.add(`lg-label--${t}`);
  }

  function setText(t: string) { textSpan.textContent = t; }
  function setTone(t: LabelTone) { applyTone(t); }
  function setRequired(r: boolean) {
    if (r && !req.isConnected) labelEl.appendChild(req);
    if (!r && req.isConnected) req.remove();
    if (r) labelEl.setAttribute("aria-required", "true"); else labelEl.removeAttribute("aria-required");
  }
  function setDisabled(d: boolean) {
    root.classList.toggle("is-disabled", !!d);
  }
  function setHint(h?: string) {
    if (!h && hintEl && hintEl.isConnected) hintEl.remove();
    else if (h && hintEl) hintEl.textContent = h;
    else if (h && !hintEl) root.appendChild(element("div", { className: "lg-label-hint" }, h));
  }

  return { root, labelEl, hintEl, setText, setTone, setRequired, setDisabled, setHint };
}
