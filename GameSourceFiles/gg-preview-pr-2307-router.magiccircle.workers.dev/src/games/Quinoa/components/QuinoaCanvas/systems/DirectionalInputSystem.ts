import { getDefaultStore } from 'jotai';
import type { Container } from 'pixi.js';
import type { Direction } from '@/common/games/Peach/types';
import { playerDirectionAtom } from '@/Quinoa/atoms/positionAtoms';
import type { QuinoaFrameContext, QuinoaSystem } from '../interfaces';
import { TouchDPad } from './input/TouchDPad';
import type { TouchInputSystem } from './input/TouchInputSystem';

const { set } = getDefaultStore();

/**
 * Movement key constants for directional input.
 * Supports QWERTY, AZERTY keyboards, and arrow keys.
 */
const MOVEMENT_KEYS = new Set([
  'w',
  'z', // For AZERTY keyboard
  'arrowup',

  's',
  'arrowdown',

  'a',
  'q', // For AZERTY keyboard
  'arrowleft',

  'd',
  'arrowright',
]);

/**
 * Helper to check if an element is an input field.
 * Used to prevent movement when typing in text inputs.
 */
function isInputElement(element: Element | null): boolean {
  if (!element) return false;
  return (
    element.tagName === 'INPUT' ||
    element.tagName === 'TEXTAREA' ||
    element.getAttribute('contenteditable') === 'true'
  );
}

/**
 * Detects if the device supports touch input.
 * Uses media query for reliable cross-browser detection.
 */
function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );
}

/**
 * DirectionalInputSystem handles directional input for player movement.
 *
 * Supports:
 * - Keyboard input (WASD, arrows, AZERTY) via window events
 * - Touch DPad input (PixiJS Graphics + touch events) on touch devices
 *
 * Architecture:
 * - Keyboard uses window-level events (not PixiJS, since keyboard is window-global)
 * - Touch DPad uses PixiJS pointer events for full integration
 * - Touch DPad delegates state updates back to this system via callback
 * - Both inputs ultimately update playerDirectionAtom via Jotai store
 * - Handles edge cases: window blur, visibility change, input field focus
 */
export class DirectionalInputSystem implements QuinoaSystem {
  /** Unique identifier used by the engine for this system. */
  public readonly name = 'directionalInput';

  // Keyboard state
  private keysPressed: string[] = [];

  // Touch DPad (only created on touch devices)
  private touchDPad: TouchDPad | null = null;

  // Bound event handlers for cleanup
  private boundHandleKeyDown: (e: KeyboardEvent) => void;
  private boundHandleKeyUp: (e: KeyboardEvent) => void;
  private boundHandleWindowBlur: () => void;
  private boundHandleVisibilityChange: () => void;
  private boundHandleFocusIn: (e: FocusEvent) => void;

  /**
   * Creates a new DirectionalInputSystem.
   *
   * @param uiContainer - Container for UI elements (screen space, for TouchDPad visuals)
   * @param touchInputSystem - System for touch input state
   */
  constructor(uiContainer: Container, touchInputSystem: TouchInputSystem) {
    // Bind handlers
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleKeyUp = this.handleKeyUp.bind(this);
    this.boundHandleWindowBlur = this.handleWindowBlur.bind(this);
    this.boundHandleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.boundHandleFocusIn = this.handleFocusIn.bind(this);

    // Attach keyboard event listeners
    window.addEventListener('keydown', this.boundHandleKeyDown);
    window.addEventListener('keyup', this.boundHandleKeyUp);
    window.addEventListener('blur', this.boundHandleWindowBlur);
    document.addEventListener(
      'visibilitychange',
      this.boundHandleVisibilityChange
    );
    document.addEventListener('focusin', this.boundHandleFocusIn);

    // Create TouchDPad on touch devices
    if (isTouchDevice()) {
      this.touchDPad = new TouchDPad(
        uiContainer,
        touchInputSystem,
        this.handleTouchDirection
      );
    }
  }

  /**
   * Handles direction changes from the TouchDPad.
   */
  private handleTouchDirection = (direction: Direction): void => {
    set(playerDirectionAtom, direction);
  };

  /**
   * Returns the TouchDPad instance if it exists.
   */
  public getTouchDPad(): TouchDPad | null {
    return this.touchDPad;
  }

  /**
   * Per-frame updates for touch input (delayed DPad show).
   */
  public draw(context: QuinoaFrameContext): void {
    this.touchDPad?.update(context.time);
  }

  /**
   * Handles keydown events for movement keys.
   */
  private handleKeyDown(e: KeyboardEvent): void {
    const key = e.key.toLowerCase();

    if (!MOVEMENT_KEYS.has(key)) {
      return;
    }

    // Prevent default browser behavior (like scrolling) for movement keys
    e.preventDefault();

    if (this.keysPressed.includes(key)) {
      return;
    }

    this.keysPressed.push(key);
    this.updateDirectionState();
  }

  /**
   * Handles keyup events to release movement keys.
   */
  private handleKeyUp(e: KeyboardEvent): void {
    const key = e.key.toLowerCase();

    const index = this.keysPressed.indexOf(key);
    if (index > -1) {
      this.keysPressed.splice(index, 1);
      this.updateDirectionState();
    }
  }

  /**
   * Computes the current direction from pressed keys and updates the atom.
   * Uses the most recently pressed key to determine direction.
   */
  private updateDirectionState(): void {
    let newDirection: Direction = null;

    // Iterate backwards to check the most recently pressed key first
    for (let i = this.keysPressed.length - 1; i >= 0; i--) {
      const key = this.keysPressed[i];
      if (['w', 'z', 'arrowup'].includes(key)) {
        newDirection = 'up';
        break;
      } else if (['s', 'arrowdown'].includes(key)) {
        newDirection = 'down';
        break;
      } else if (['a', 'q', 'arrowleft'].includes(key)) {
        newDirection = 'left';
        break;
      } else if (['d', 'arrowright'].includes(key)) {
        newDirection = 'right';
        break;
      }
    }

    set(playerDirectionAtom, newDirection);
  }

  /**
   * Clears pressed-key state and sets direction to null.
   * Used when window loses focus or visibility changes.
   */
  private resetDirectionState(): void {
    if (this.keysPressed.length > 0) {
      this.keysPressed = [];
      set(playerDirectionAtom, null);
    }
  }

  /**
   * When the window loses focus, reset direction to prevent stuck movement.
   */
  private handleWindowBlur(): void {
    this.resetDirectionState();
  }

  /**
   * When the document becomes hidden (e.g. tab switch), reset direction.
   */
  private handleVisibilityChange(): void {
    if (document.visibilityState === 'hidden') {
      this.resetDirectionState();
    }
  }

  /**
   * When an input field gains focus, reset direction to prevent stuck movement.
   */
  private handleFocusIn(e: FocusEvent): void {
    if (isInputElement(e.target as HTMLElement)) {
      this.resetDirectionState();
    }
  }

  /**
   * Cleans up all event listeners.
   */
  public destroy(): void {
    // Clean up keyboard listeners
    window.removeEventListener('keydown', this.boundHandleKeyDown);
    window.removeEventListener('keyup', this.boundHandleKeyUp);
    window.removeEventListener('blur', this.boundHandleWindowBlur);
    document.removeEventListener(
      'visibilitychange',
      this.boundHandleVisibilityChange
    );
    document.removeEventListener('focusin', this.boundHandleFocusIn);

    // Clean up TouchDPad
    this.touchDPad?.destroy();

    // Reset direction on destroy
    set(playerDirectionAtom, null);
  }
}
