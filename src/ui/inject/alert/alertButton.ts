/**
 * Alert Button - Inject the alert bell as a native Pixi slot on the game's
 * right-side icon rail (see ../core/pixiRailButton.ts for why: the rail
 * moved from DOM buttons to Pixi rendering, so there is nothing left to
 * clone into).
 *
 * The rest of the notifier UI (badge, panel) stays plain DOM; only the
 * anchor point moves from a cloned `<button>` to the Pixi button's
 * `getScreenRect()`. The badge becomes a floating fixed-position element
 * since there's no DOM button left to attach it to as a child.
 */
import { startPixiRailButton, type ScreenRect } from "../core/pixiRailButton";

type AlertButtonOptions = {
  onClick: () => void;
  iconGlyph?: string; // default bell emoji
};

const DEFAULT_ICON_GLYPH = "\u{1F514}"; // 🔔
const BADGE_GAP = 4;
const BADGE_Z_INDEX = 10000;

export interface AlertButtonHandle {
  getScreenRect(): ScreenRect | null;
  updateBadge(count: number): void;
  startRinging(): void;
  stopRinging(): void;
  destroy(): void;
}

function createBadgeElement(): HTMLSpanElement {
  const badge = document.createElement("span");
  badge.className = "gemini-alert-badge";
  Object.assign(badge.style, {
    position: "fixed",
    minWidth: "18px",
    height: "18px",
    borderRadius: "9px",
    backgroundColor: "#EF4444",
    color: "white",
    fontSize: "10px",
    fontWeight: "700",
    display: "none",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 4px",
    pointerEvents: "none",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    zIndex: String(BADGE_Z_INDEX),
  } satisfies Partial<CSSStyleDeclaration>);
  badge.textContent = "0";
  return badge;
}

export function startInjectAlertButton(opts: AlertButtonOptions): AlertButtonHandle {
  const iconGlyph = opts.iconGlyph || DEFAULT_ICON_GLYPH;

  const badge = createBadgeElement();
  document.body.appendChild(badge);

  const pixiButton = startPixiRailButton({
    label: "GeminiAlertButton",
    icon: { type: "glyph", glyph: iconGlyph },
    onClick: opts.onClick,
  });

  const positionBadge = () => {
    const rect = pixiButton.getScreenRect();
    if (!rect) return;
    badge.style.top = `${rect.top - BADGE_GAP}px`;
    badge.style.right = `${window.innerWidth - rect.right - BADGE_GAP}px`;
  };

  const handleResize = () => positionBadge();
  window.addEventListener("resize", handleResize);

  return {
    getScreenRect: () => pixiButton.getScreenRect(),

    updateBadge(count: number) {
      if (count > 0) {
        badge.textContent = String(count);
        badge.style.display = "flex";
        positionBadge();
      } else {
        badge.style.display = "none";
      }
    },

    startRinging() {
      pixiButton.setWiggle(true);
    },

    stopRinging() {
      pixiButton.setWiggle(false);
    },

    destroy() {
      window.removeEventListener("resize", handleResize);
      pixiButton.stop();
      badge.remove();
    },
  };
}
