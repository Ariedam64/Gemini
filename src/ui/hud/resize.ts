import { ResizeHandlerOptions, ResizeHandler } from "./types";
import { MGEnvironment } from "../../modules/core/environment";
import { pageWindow } from "../../utils/windowContext";

/**
 * Create resize handler for the HUD
 * Handles both mouse drag resize and responsive bounds calculation
 */
export function createResizeHandler(options: ResizeHandlerOptions): ResizeHandler {
  const {
    resizer,
    host,
    panel,
    shadow,
    onWidthChange,
    initialWidth,
    minWidth: configMinWidth,
    maxWidth: configMaxWidth,
  } = options;

  // Dynamic bounds (updated based on mobile/viewport)
  let currentMinWidth = configMinWidth;
  let currentMaxWidth = configMaxWidth;

  /**
   * Calculate responsive bounds based on device and viewport
   */
  function calculateResponsiveBounds(): { min: number; max: number } {
    const env = MGEnvironment.detect();
    const viewportWidth = Math.round(
      ((pageWindow as any).visualViewport?.width) ?? (pageWindow.innerWidth ?? 0)
    );

    if (env.platform === "mobile" || env.os === "ios" || env.os === "android") {
      // Read the host insets (defined in CSS via env(safe-area-inset-*))
      const computedStyle = getComputedStyle(shadow.host as HTMLElement);
      const insetLeft = parseFloat(computedStyle.getPropertyValue("--inset-l")) || 0;
      const insetRight = parseFloat(computedStyle.getPropertyValue("--inset-r")) || 0;

      // Usable width = viewport - insets
      const usableWidth = Math.max(280, viewportWidth - Math.round(insetLeft + insetRight));

      // min ≈ 66% of the viewport but not beyond the usable width
      const min = Math.min(420, Math.max(300, Math.floor(viewportWidth * 0.66)));
      const max = usableWidth;

      currentMinWidth = Math.min(min, usableWidth);
      currentMaxWidth = max;
    } else {
      currentMinWidth = configMinWidth;
      currentMaxWidth = configMaxWidth;
    }

    return { min: currentMinWidth, max: currentMaxWidth };
  }

  /**
   * Constrain a width value to current min/max bounds
   */
  function constrainWidthToLimits(px: number): number {
    return Math.max(currentMinWidth, Math.min(currentMaxWidth, Number(px) || initialWidth));
  }

  /**
   * Set the HUD width with bounds checking
   */
  function setHudWidth(px: number): void {
    const constrainedWidth = constrainWidthToLimits(px);
    host.style.setProperty("--w", `${constrainedWidth}px`);
    onWidthChange(constrainedWidth);
  }

  // Initialize bounds
  calculateResponsiveBounds();

  // Drag resize (disabled on mobile)
  const envAtStart = MGEnvironment.detect();
  const dragEnabled = !(
    envAtStart.platform === "mobile" ||
    envAtStart.os === "ios" ||
    envAtStart.os === "android"
  );

  let isDragging = false;

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const widthInPixels = Math.round(pageWindow.innerWidth - e.clientX);
    setHudWidth(widthInPixels);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    isDragging = false;
    document.body.style.cursor = "";
    pageWindow.removeEventListener("mousemove", handleMouseMove);
    pageWindow.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (!dragEnabled) return;
    e.preventDefault();
    isDragging = true;
    document.body.style.cursor = "ew-resize";
    pageWindow.addEventListener("mousemove", handleMouseMove);
    pageWindow.addEventListener("mouseup", handleMouseUp);
  };

  resizer.addEventListener("mousedown", handleMouseDown);

  /**
   * Cleanup event listeners
   */
  function destroy(): void {
    resizer.removeEventListener("mousedown", handleMouseDown);
    pageWindow.removeEventListener("mousemove", handleMouseMove);
    pageWindow.removeEventListener("mouseup", handleMouseUp);
  }

  return {
    calculateResponsiveBounds,
    constrainWidthToLimits,
    setHudWidth,
    destroy,
  };
}
