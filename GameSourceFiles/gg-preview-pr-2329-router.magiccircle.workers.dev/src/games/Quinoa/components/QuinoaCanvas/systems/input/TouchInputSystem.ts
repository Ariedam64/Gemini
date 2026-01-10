import type { QuinoaSystem } from '../../interfaces';

export interface TouchSnapshot {
  id: number;
  x: number;
  y: number;
}

/**
 * Manages touch input by listening to native DOM events and maintaining a
 * snapshot of the current state.
 *
 * Architecture:
 * - Listens to native 'touchstart', 'touchmove', 'touchend', 'touchcancel'
 * - On ANY event, it reads event.touches (the full list) and overwrites state
 * - This provides a self-healing "snapshot" architecture that prevents stuck inputs
 * - Callers poll getTouches() every frame instead of listening to events
 */
export class TouchInputSystem implements QuinoaSystem {
  public readonly name = 'touchInput';

  private canvas: HTMLCanvasElement;
  private currentTouches: TouchSnapshot[] = [];

  // Bound handlers for cleanup
  private boundHandleTouch: (e: TouchEvent) => void;
  private boundHandleBlur: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    this.boundHandleTouch = this.handleTouch.bind(this);
    this.boundHandleBlur = this.handleBlur.bind(this);

    // Bind to native touch events
    // We use passive: false so we can preventDefault() to stop scrolling
    this.canvas.addEventListener('touchstart', this.boundHandleTouch, {
      passive: false,
    });
    this.canvas.addEventListener('touchmove', this.boundHandleTouch, {
      passive: false,
    });
    this.canvas.addEventListener('touchend', this.boundHandleTouch, {
      passive: false,
    });
    this.canvas.addEventListener('touchcancel', this.boundHandleTouch, {
      passive: false,
    });

    // Safety: Clear input on window blur or visibility change
    window.addEventListener('blur', this.boundHandleBlur);
    document.addEventListener('visibilitychange', this.boundHandleBlur);
  }

  /**
   * Main event handler for all touch events.
   * Updates the snapshot state from event.touches.
   */
  private handleTouch(e: TouchEvent): void {
    // Prevent default browser behavior (scrolling/zooming)
    if (e.type === 'touchmove' || e.type === 'touchstart') {
      e.preventDefault();
    }

    // Coordinate conversion
    const rect = this.canvas.getBoundingClientRect();

    // Rebuild snapshot from scratch
    // event.touches is the authoritative list of all fingers currently on screen
    const newTouches: TouchSnapshot[] = [];

    for (let i = 0; i < e.touches.length; i++) {
      const touch = e.touches[i];
      newTouches.push({
        id: touch.identifier,
        // Convert client coordinates to canvas-space logical pixels (CSS pixels)
        // We use logical pixels because PixiJS stage coordinates typically match CSS pixels
        // (the renderer handles the resolution scaling to physical pixels)
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }

    this.currentTouches = newTouches;
  }

  /**
   * Clears all input state. Called on blur/visibility change.
   */
  private handleBlur(): void {
    this.currentTouches = [];
  }

  /**
   * Returns the current list of active touches.
   */
  public getTouches(): ReadonlyArray<TouchSnapshot> {
    return this.currentTouches;
  }

  /**
   * Returns the number of currently active touches.
   */
  public getTouchCount(): number {
    return this.currentTouches.length;
  }

  public destroy(): void {
    this.canvas.removeEventListener('touchstart', this.boundHandleTouch);
    this.canvas.removeEventListener('touchmove', this.boundHandleTouch);
    this.canvas.removeEventListener('touchend', this.boundHandleTouch);
    this.canvas.removeEventListener('touchcancel', this.boundHandleTouch);

    window.removeEventListener('blur', this.boundHandleBlur);
    document.removeEventListener('visibilitychange', this.boundHandleBlur);

    this.currentTouches = [];
  }
}
