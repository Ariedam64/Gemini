import { atom, getDefaultStore } from 'jotai';
import { Container, Graphics } from 'pixi.js';
import type { Direction } from '@/common/games/Peach/types';
import type { TouchInputSystem } from './TouchInputSystem';

const { set } = getDefaultStore();

const Config = {
  /** Diameter of the outer pad circle */
  padSizePx: 100,
  /** Diameter of the inner joystick knob */
  joystickSizePx: 50,
  /** Maximum distance the joystick can move from center */
  maxDistancePx: 50,
  /** Dead zone radius before movement registers */
  deadZonePx: 10,
  /** Pixels of movement required before showing DPad to prevent jitter on taps */
  visibilityThresholdPx: 3,
  /** Time in ms to hold before showing DPad without movement */
  showDelayMs: 200,
  /** Visual style constants */
  style: {
    padColor: 0xffffff,
    padAlpha: 0.2,
    padBorderWidthPx: 2,
    padBorderAlpha: 0.5,
    joystickColor: 0xffffff,
    joystickAlpha: 0.2,
  },
};

/**
 * Atom to track if the virtual DPad is currently active/visible.
 * Used by UI components to hide themselves when DPad is active.
 */
export const isVirtualDPadActiveAtom = atom<boolean>(false);

/**
 * TouchDPad provides a virtual joystick for touch-based directional input.
 *
 * Architecture:
 * - Visuals: PixiJS Graphics (in uiContainer)
 * - Input: Polling-based via TouchInputManager
 * - Logic:
 *   - 0 touches: Inactive
 *   - 1 touch: Active (Virtual Joystick)
 *   - 2+ touches: Inactive (Defer to ZoomSystem)
 */
export class TouchDPad {
  private container: Container;
  private padGraphics: Graphics;
  private joystickGraphics: Graphics;
  private touchInputSystem: TouchInputSystem;

  // State
  private primaryTouchId: number | null = null;
  private startPosition: { x: number; y: number } = { x: 0, y: 0 };
  private currentDirection: Direction = null;
  private isInMovementState: boolean = false;
  private showDelayStart: number | null = null;

  // Callback
  private onDirectionChange: (direction: Direction) => void;

  constructor(
    uiContainer: Container,
    touchInputSystem: TouchInputSystem,
    onDirectionChange: (direction: Direction) => void
  ) {
    this.touchInputSystem = touchInputSystem;
    this.onDirectionChange = onDirectionChange;

    // Create main container for the DPad visuals (in UI layer)
    this.container = new Container({ label: 'TouchDPad' });
    this.container.visible = false;
    uiContainer.addChild(this.container);

    // Create pad circle (the outer ring)
    this.padGraphics = new Graphics();
    this.drawPad();
    this.container.addChild(this.padGraphics);

    // Create joystick knob (the inner circle)
    this.joystickGraphics = new Graphics();
    this.drawJoystick();
    this.container.addChild(this.joystickGraphics);
  }

  /**
   * Returns the ID of the touch currently controlling the DPad, if any.
   * Used by ZoomSystem to ignore this touch for pinch gestures.
   */
  public getPrimaryTouchId(): number | null {
    return this.primaryTouchId;
  }

  private drawPad(): void {
    const { padSizePx, style } = Config;
    this.padGraphics.clear();
    // Border
    this.padGraphics.circle(0, 0, padSizePx / 2);
    this.padGraphics.stroke({
      color: style.padColor,
      alpha: style.padBorderAlpha,
      width: style.padBorderWidthPx,
    });
    // Fill
    this.padGraphics.circle(0, 0, padSizePx / 2);
    this.padGraphics.fill({ color: style.padColor, alpha: style.padAlpha });
  }

  private drawJoystick(): void {
    const { joystickSizePx, style } = Config;
    this.joystickGraphics.clear();
    this.joystickGraphics.circle(0, 0, joystickSizePx / 2);
    this.joystickGraphics.fill({
      color: style.joystickColor,
      alpha: style.joystickAlpha,
    });
  }

  private show(x: number, y: number): void {
    this.container.visible = true;
    this.padGraphics.position.set(x, y);
    this.joystickGraphics.position.set(x, y);
    set(isVirtualDPadActiveAtom, true);
  }

  private hide(): void {
    this.container.visible = false;
    this.primaryTouchId = null;
    this.currentDirection = null;
    this.isInMovementState = false;
    this.showDelayStart = null;
    set(isVirtualDPadActiveAtom, false);

    // Notify cleanup
    this.onDirectionChange(null);
  }

  /**
   * Main update loop called every frame.
   */
  public update(time: number): void {
    const touches = this.touchInputSystem.getTouches();

    // CASE 1: Check if our active touch is still valid
    if (this.primaryTouchId !== null) {
      const activeTouch = touches.find((t) => t.id === this.primaryTouchId);

      if (!activeTouch) {
        // Touch lost (finger lifted)
        this.hide();
        return;
      }

      // If we have multiple touches, and we haven't really started moving yet,
      // it's probably a pinch gesture starting. Cancel DPad to allow Zoom.
      if (touches.length > 1 && !this.isInMovementState) {
        this.hide();
        return;
      }

      // Continue processing with the active touch
      this.processTouch(activeTouch, time);
      return;
    }

    // CASE 2: No active touch, look for a new candidate
    // If there are no touches, or multiple touches (likely a pinch), ignore
    if (touches.length === 0 || touches.length > 1) {
      return;
    }

    // Exactly one touch - candidate for DPad
    const touch = touches[0];
    this.startNewTouch(touch, time);
  }

  private startNewTouch(
    touch: { id: number; x: number; y: number },
    time: number
  ): void {
    this.primaryTouchId = touch.id;
    this.startPosition = { x: touch.x, y: touch.y };
    this.showDelayStart = time;
    this.isInMovementState = false;
    // Don't show yet (wait for delay or movement)
  }

  private processTouch(
    touch: { id: number; x: number; y: number },
    time: number
  ): void {
    // Calculate movement from start
    const deltaX = touch.x - this.startPosition.x;
    const deltaY = touch.y - this.startPosition.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    // Logic to show the visuals
    if (!this.container.visible) {
      const showDueToMovement = distance > Config.visibilityThresholdPx;
      const showDueToTime =
        this.showDelayStart !== null &&
        time - this.showDelayStart >= Config.showDelayMs;

      if (showDueToMovement || showDueToTime) {
        this.showDelayStart = null;
        this.show(this.startPosition.x, this.startPosition.y);
      }
    }

    // Update Joystick Visuals
    if (this.container.visible) {
      if (distance > Config.maxDistancePx) {
        const clampedX =
          this.startPosition.x + Config.maxDistancePx * Math.cos(angle);
        const clampedY =
          this.startPosition.y + Config.maxDistancePx * Math.sin(angle);
        this.joystickGraphics.position.set(clampedX, clampedY);
      } else {
        this.joystickGraphics.position.set(touch.x, touch.y);
      }
    }

    // Calculate Direction
    let newDirection: Direction = null;
    const effectiveDeadZone = this.isInMovementState ? 0 : Config.deadZonePx;

    if (distance >= effectiveDeadZone) {
      if (!this.isInMovementState && distance >= Config.deadZonePx) {
        this.isInMovementState = true;
      }

      const degrees = (angle * 180) / Math.PI;
      if (degrees >= -45 && degrees < 45) {
        newDirection = 'right';
      } else if (degrees >= 45 && degrees < 135) {
        newDirection = 'down';
      } else if (degrees >= -135 && degrees < -45) {
        newDirection = 'up';
      } else {
        newDirection = 'left';
      }
    }

    // Emit changes
    if (this.currentDirection !== newDirection) {
      this.currentDirection = newDirection;
      this.onDirectionChange(newDirection);
    }
  }

  public destroy(): void {
    this.container.destroy({ children: true });
    set(isVirtualDPadActiveAtom, false);
  }
}
