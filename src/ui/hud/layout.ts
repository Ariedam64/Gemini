import { element } from "../styles/helpers";
import { HudLayoutElements } from "./types";

/**
 * Create the DOM structure for the HUD
 * Uses new gemini-* class names instead of lg-*
 */
export function createHudLayout(options: {
  shadow: ShadowRoot;
  initialOpen: boolean;
}): HudLayoutElements {
  const { shadow, initialOpen } = options;

  // Main panel container
  const panel = element("div", {
    className: "gemini-panel",
    id: "panel",
    ariaHidden: String(!initialOpen),
  }) as HTMLDivElement;

  // Tab bar at the top
  const tabbar = element("div", {
    className: "gemini-tabbar",
  }) as HTMLDivElement;

  // Content area for sections
  const content = element("div", {
    className: "gemini-content",
    id: "content",
  }) as HTMLDivElement;

  // Resize handle
  const resizer = element("div", {
    className: "gemini-resizer",
    title: "Resize",
  }) as HTMLDivElement;

  // Close button (cross) aligned to the right in the tab bar
  const closeButton = element(
    "button",
    {
      className: "gemini-close",
      title: "Fermer",
      ariaLabel: "Fermer",
    },
    "✕"
  ) as HTMLButtonElement;

  // Assemble panel structure
  panel.append(tabbar, content, resizer);

  // Wrapper for the entire HUD
  const wrapper = element("div", {
    className: "gemini-wrapper",
  }, panel) as HTMLDivElement;

  // Attach to shadow root
  shadow.append(wrapper);

  return {
    panel,
    tabbar,
    content,
    resizer,
    closeButton,
    wrapper,
  };
}
