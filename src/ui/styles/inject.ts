// Style helper scoped to the HUD shadow root.

export function injectStyleOnce(shadow: ShadowRoot, css: string, id: string) {
  if (shadow.querySelector(`style[data-style-id="${id}"]`)) return;
  const style = document.createElement("style");
  style.setAttribute("data-style-id", id);
  style.textContent = css;
  shadow.appendChild(style);
}
