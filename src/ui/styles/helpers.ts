// src/ui/styles/helpers.ts
// DOM element creation helper

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
export function element<K extends keyof HTMLElementTagNameMap>(
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
