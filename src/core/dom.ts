// Core DOM helpers: host + shadow, element creation, and style injection.

export type Child = Node | string | number | null | undefined | false;

export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Partial<HTMLElementTagNameMap[K]> | Record<string, any> = {},
  ...children: Child[]
) {
  const node = document.createElement(tag) as HTMLElementTagNameMap[K] & Record<string, any>;
  for (const [k, v] of Object.entries(props || {})) {
    if (v === undefined || v === null) continue;
    if (k === "style" && typeof v === "object") Object.assign((node as HTMLElement).style, v);
    else if (k.startsWith("on") && typeof v === "function") (node as any)[k.toLowerCase()] = v;
    else if (k in node) (node as any)[k] = v;
    else node.setAttribute(k, String(v));
  }
  for (const c of children) {
    if (c === null || c === undefined || c === false) continue;
    node.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
  }
  return node;
}

export function attachHost(id = "mgh-root") {
  const host = document.createElement("div");
  host.id = id;
  Object.assign(host.style, {
    all: "initial",
    position: "fixed",
    top: "0",
    right: "0",
    zIndex: "2147483647",
    pointerEvents: "auto",
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif',
    fontSize: "13px",
    lineHeight: "1.35",
  } as CSSStyleDeclaration);
  (document.body || document.documentElement).appendChild(host);
  const shadow = host.attachShadow({ mode: "open" });
  return { host, shadow } as const;
}

export function injectStyle(root: ShadowRoot, css: string) {
  const style = document.createElement("style");
  style.textContent = css;
  root.appendChild(style);
  return style;
}

export function qs<T extends Element = Element>(root: ParentNode, sel: string) {
  return root.querySelector(sel) as T | null;
}

export function qsa<T extends Element = Element>(root: ParentNode, sel: string) {
  return Array.from(root.querySelectorAll(sel)) as T[];
}
