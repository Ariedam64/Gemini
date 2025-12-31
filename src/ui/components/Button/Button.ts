// ui/components/Button.ts
import { element } from "../../styles/helpers";

export type ButtonVariant = "default" | "primary" | "danger";
export type ButtonSize = "md" | "sm";

export type ButtonOptions = {
  label?: string | Node;
  id?: string;
  variant?: ButtonVariant;      // "default" | "primary" | "danger"
  size?: ButtonSize;            // "md" (default) | "sm"
  iconLeft?: string | Node;     // if provided, icon on the left
  iconRight?: string | Node;    // if provided, icon on the right
  loading?: boolean;            // built-in spinner (disables the button)
  tooltip?: string;             // title=
  type?: "button" | "submit" | "reset";
  onClick?: (ev: MouseEvent) => void;
  disabled?: boolean;
  fullWidth?: boolean;          // stretch the button to 100%
};

export type ButtonHandle = HTMLButtonElement & {
  setLoading: (v: boolean) => void;
  setDisabled: (v: boolean) => void;
  setLabel: (content: string | Node) => void;
  setIconLeft: (content?: string | Node) => void;
  setIconRight: (content?: string | Node) => void;
  setVariant: (v: ButtonVariant) => void;
};

function toNode(content?: string | Node): Node | null {
  if (content == null) return null;
  return typeof content === "string" ? document.createTextNode(content) : content;
}

function makeIcon(content: string | Node, side: "left" | "right") {
  const span = document.createElement("span");
  span.className = `btn-ico btn-ico--${side}`;
  const n = toNode(content);
  if (n) span.appendChild(n);
  return span;
}

// Small standalone SVG spinner (no CSS required)
function makeSpinner(): SVGSVGElement {
  const svgNS = "http://www.w3.org/2000/svg";
  const s = document.createElementNS(svgNS, "svg");
  s.setAttribute("viewBox", "0 0 24 24");
  s.setAttribute("width", "16");
  s.setAttribute("height", "16");
  s.setAttribute("aria-hidden", "true");
  s.style.marginRight = "6px";
  s.style.display = "none";             // hidden by default
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
  const rotate = document.createElementNS(svgNS, "animateTransform");
  rotate.setAttribute("attributeName", "transform");
  rotate.setAttribute("attributeType", "XML");
  rotate.setAttribute("type", "rotate");
  rotate.setAttribute("from", "0 12 12");
  rotate.setAttribute("to", "360 12 12");
  rotate.setAttribute("dur", "1s");
  rotate.setAttribute("repeatCount", "indefinite");
  c.appendChild(dash);
  c.appendChild(rotate);
  s.appendChild(c);
  return s;
}

export function Button(opts: ButtonOptions = {}): ButtonHandle {
  const {
    label = "",
    id,
    variant = "default",
    size = "md",
    iconLeft,
    iconRight,
    loading = false,
    tooltip,
    type = "button",
    onClick,
    disabled = false,
    fullWidth = false,
  } = opts;

  // structure: [spinner][iconLeft][label][iconRight]
  const btn = element("button", { className: "btn", id }) as HTMLButtonElement;
  btn.type = type;
  if (variant === "primary") btn.classList.add("primary");
  if (variant === "danger") btn.classList.add("danger");
  if (size === "sm") btn.classList.add("btn--sm");
  if (tooltip) btn.title = tooltip;
  if (fullWidth) btn.style.width = "100%";

  // content
  const spinner = makeSpinner();
  const left = iconLeft ? makeIcon(iconLeft, "left") : null;
  const right = iconRight ? makeIcon(iconRight, "right") : null;
  const labelSpan = document.createElement("span");
  labelSpan.className = "btn-label";
  const labelNode = toNode(label);
  if (labelNode) labelSpan.appendChild(labelNode);

  // Icon only: adjust class for your .btn--icon styles
  if (!labelNode && (left || right)) btn.classList.add("btn--icon");

  // assemble
  btn.appendChild(spinner);
  if (left) btn.appendChild(left);
  btn.appendChild(labelSpan);
  if (right) btn.appendChild(right);

  // initial states
  const initialDisabled = disabled || loading;
  btn.disabled = initialDisabled;
  btn.setAttribute("aria-busy", String(!!loading));
  spinner.style.display = loading ? "inline-block" : "none";

  if (onClick) btn.addEventListener("click", onClick);

  // tiny API
  const handle = btn as ButtonHandle;

  handle.setLoading = (v: boolean) => {
    btn.setAttribute("aria-busy", String(!!v));
    spinner.style.display = v ? "inline-block" : "none";
    btn.disabled = v || disabled;
  };

  handle.setDisabled = (v: boolean) => {
    btn.disabled = v || (btn.getAttribute("aria-busy") === "true");
  };

  handle.setLabel = (content: string | Node) => {
    labelSpan.replaceChildren();
    const n = toNode(content);
    if (n) labelSpan.appendChild(n);
    if (!n && (left || right)) btn.classList.add("btn--icon");
    else btn.classList.remove("btn--icon");
  };

  handle.setIconLeft = (content?: string | Node) => {
    if (content == null) {
      left?.remove();
      return;
    }
    if (left) {
      left.replaceChildren(toNode(content)!);
    } else {
      btn.insertBefore(makeIcon(content, "left"), labelSpan);
    }
  };

  handle.setIconRight = (content?: string | Node) => {
    if (content == null) {
      right?.remove();
      return;
    }
    if (right) {
      right.replaceChildren(toNode(content)!);
    } else {
      btn.appendChild(makeIcon(content, "right"));
    }
  };

  handle.setVariant = (v: ButtonVariant) => {
    btn.classList.remove("primary", "danger");
    if (v === "primary") btn.classList.add("primary");
    if (v === "danger") btn.classList.add("danger");
  };

  return handle;
}
