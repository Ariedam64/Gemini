// src/ui/dom.ts
// DOM utilities for UI components

/* ================================ Types ================================ */

export type Child = Node | string | number | null | undefined | false;

export type ElementProps<K extends keyof HTMLElementTagNameMap> =
  Omit<Partial<HTMLElementTagNameMap[K]>, "style"> & {
    style?: string | Partial<CSSStyleDeclaration>;
  } & Record<string, unknown>;

/* ============================== Element Creation ============================== */

/**
 * Create an HTML element with props and children (JSX-like syntax)
 */
export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: ElementProps<K> | null = null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(props || {})) {
    if (value === undefined || value === null) continue;

    if (key === "style") {
      if (typeof value === "string") {
        node.setAttribute("style", value);
      } else if (typeof value === "object") {
        Object.assign(node.style, value);
      }
    } else if (key.startsWith("on") && typeof value === "function") {
      (node as any)[key.toLowerCase()] = value;
    } else if (key in node) {
      (node as any)[key] = value;
    } else {
      node.setAttribute(key, String(value));
    }
  }

  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    node.appendChild(
      typeof child === "string" || typeof child === "number"
        ? document.createTextNode(String(child))
        : child
    );
  }

  return node;
}

/* ================================ Shadow DOM ================================ */

const DEFAULT_HOST_STYLES: Partial<CSSStyleDeclaration> = {
  all: "initial",
  position: "fixed",
  top: "0",
  right: "0",
  zIndex: "2147483647",
  pointerEvents: "auto",
  fontFamily:
    'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
  fontSize: "13px",
  lineHeight: "1.35",
};

/**
 * Create and attach a shadow DOM host element
 */
export function attachHost(id = "gemini-root"): {
  host: HTMLDivElement;
  shadow: ShadowRoot;
} {
  const host = document.createElement("div");
  host.id = id;
  Object.assign(host.style, DEFAULT_HOST_STYLES);

  (document.body || document.documentElement).appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });

  return { host, shadow };
}
