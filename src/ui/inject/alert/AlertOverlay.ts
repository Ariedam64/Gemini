/**
 * Alert Overlay Component - Dropdown overlay showing available tracked items
 *
 * Follows component rules:
 * - Factory pattern (Options → Handle)
 * - Theme compatible (CSS vars)
 * - Responsive & touch-friendly (min 44px targets)
 * - Cleanup discipline (destroy method)
 */

import { element } from "../../styles/helpers";
import { MGSprite } from "../../../modules";
import type { AvailableItem } from "./alertData";
import { alertOverlayCss } from "./styles.css";
import { getHudStateValue, DEFAULT_HUD_STATE } from "../../hud/state/state";
import { THEMES } from "../../theme/definitions";

export interface AlertOverlayOptions {
  /** Items to display */
  items: AvailableItem[];

  /** Anchor element for positioning (the alert button) */
  anchorElement: HTMLElement;

  /** Called when close button clicked */
  onClose?: () => void;

  /** Called when Buy All button clicked */
  onBuyAll?: (item: AvailableItem) => void;
}

export interface AlertOverlayHandle {
  root: HTMLDivElement;
  updateItems(items: AvailableItem[]): void;
  destroy(): void;
}

/**
 * Create an item row element
 */
function createItemRow(
  item: AvailableItem,
  onBuyAll?: (item: AvailableItem) => void
): HTMLDivElement {
  const row = element("div", { className: "alert-item-row" }) as HTMLDivElement;

  // Sprite column
  const spriteCol = element("div", { className: "alert-item-sprite" }) as HTMLDivElement;

  if (item.spriteId) {
    try {
      const canvas = MGSprite.toCanvas(item.spriteId, { scale: 0.35 });
      if (canvas) {
        spriteCol.appendChild(canvas);
      } else {
        spriteCol.textContent = "?";
      }
    } catch {
      spriteCol.textContent = "?";
    }
  } else {
    spriteCol.textContent = "?";
  }

  // Info column
  const infoCol = element("div", { className: "alert-item-info" }) as HTMLDivElement;
  const nameEl = element("div", { className: "alert-item-name" }, item.itemName) as HTMLDivElement;
  const remainingEl = element(
    "div",
    { className: "alert-item-remaining" },
    `${item.remaining} remaining`
  ) as HTMLDivElement;
  infoCol.appendChild(nameEl);
  infoCol.appendChild(remainingEl);

  // Actions column
  const actionsCol = element("div", { className: "alert-item-actions" }) as HTMLDivElement;

  const buyAllBtn = element("button", {
    className: "alert-item-btn alert-item-btn--buy-all",
    type: "button",
    title: `Buy all ${item.remaining} available`,
  }, "Buy All") as HTMLButtonElement;

  // Event handlers
  buyAllBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    onBuyAll?.(item);
  });

  actionsCol.appendChild(buyAllBtn);

  // Assemble row
  row.appendChild(spriteCol);
  row.appendChild(infoCol);
  row.appendChild(actionsCol);

  return row;
}

// Close button removed - overlay closes on click outside

/**
 * Create empty state element
 */
function createEmptyState(): HTMLDivElement {
  const empty = element("div", { className: "alert-overlay-empty" }) as HTMLDivElement;

  const icon = element("div", { className: "alert-overlay-empty-icon" }, "🔔") as HTMLDivElement;
  const text = element("div", { className: "alert-overlay-empty-text" }, "No items available") as HTMLDivElement;
  const subtext = element(
    "div",
    { className: "alert-overlay-empty-subtext" },
    "Tracked items will appear here when in stock"
  ) as HTMLDivElement;

  empty.appendChild(icon);
  empty.appendChild(text);
  empty.appendChild(subtext);

  return empty;
}

/**
 * Calculate overlay position relative to anchor (alert button)
 */
function positionOverlay(overlay: HTMLElement, anchor: HTMLElement): void {
  const anchorRect = anchor.getBoundingClientRect();
  const overlayWidth = 340; // Max width from CSS
  const gap = 8; // Gap between button and overlay

  // Reset positioning
  overlay.style.position = "fixed";
  overlay.style.top = "";
  overlay.style.bottom = "";
  overlay.style.left = "";
  overlay.style.right = "";

  // Default: position below button, aligned to right edge of button
  let top = anchorRect.bottom + gap;
  let right = window.innerWidth - anchorRect.right;

  // Check if overlay would overflow viewport
  const wouldOverflowBottom = (top + 480) > window.innerHeight; // 480 = max-height
  const wouldOverflowLeft = (anchorRect.right - overlayWidth) < gap;

  // If overflow bottom, position above button instead
  if (wouldOverflowBottom) {
    overlay.style.bottom = `${window.innerHeight - anchorRect.top + gap}px`;
    overlay.style.top = "auto";
  } else {
    overlay.style.top = `${top}px`;
  }

  // Always align to right edge of button
  overlay.style.right = `${right}px`;

  // If overlay would overflow left edge, clamp to viewport
  if (wouldOverflowLeft) {
    overlay.style.right = "auto";
    overlay.style.left = `${gap}px`;
  }
}

/**
 * Create alert overlay component
 */
export function createAlertOverlay(options: AlertOverlayOptions): AlertOverlayHandle {
  const { items, anchorElement, onClose, onBuyAll } = options;

  // Root container
  const root = element("div", { className: "alert-overlay" }) as HTMLDivElement;

  // Inject styles with theme variables
  const currentTheme = getHudStateValue("theme", DEFAULT_HUD_STATE.theme);
  const themeVars = THEMES[currentTheme];

  // Build theme variables CSS
  let themeVarsCSS = '';
  if (themeVars) {
    const varDeclarations = Object.entries(themeVars)
      .map(([key, value]) => `${key}: ${value};`)
      .join('\n    ');
    themeVarsCSS = `.alert-overlay {\n    ${varDeclarations}\n  }\n\n`;
  }

  const style = document.createElement("style");
  style.textContent = themeVarsCSS + alertOverlayCss;
  root.appendChild(style);

  // Header with title and close button
  const header = element("div", { className: "alert-overlay-header" }) as HTMLDivElement;
  const title = element("div", { className: "alert-overlay-title" }, "Available Items") as HTMLDivElement;

  const closeBtn = element("button", {
    className: "alert-overlay-close",
    type: "button",
    title: "Close",
  }, "✕") as HTMLButtonElement;

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    onClose?.();
  });

  header.appendChild(title);
  header.appendChild(closeBtn);

  // Items list container
  const listContainer = element("div", { className: "alert-overlay-list" }) as HTMLDivElement;

  // Assemble
  root.appendChild(header);
  root.appendChild(listContainer);

  // Initial render
  const updateItems = (newItems: AvailableItem[]) => {
    listContainer.replaceChildren();

    if (newItems.length === 0) {
      listContainer.appendChild(createEmptyState());
    } else {
      for (const item of newItems) {
        const row = createItemRow(item, onBuyAll);
        listContainer.appendChild(row);
      }
    }
  };

  updateItems(items);

  // Position overlay relative to anchor
  positionOverlay(root, anchorElement);

  // Reposition on window resize
  const handleResize = () => {
    positionOverlay(root, anchorElement);
  };
  window.addEventListener("resize", handleResize);

  // Click outside to close
  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as Node;
    if (!root.contains(target) && !anchorElement.contains(target)) {
      onClose?.();
    }
  };
  document.addEventListener("click", handleClickOutside, { capture: true });

  return {
    root,
    updateItems,
    destroy() {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleClickOutside, { capture: true });
      root.remove();
    },
  };
}
