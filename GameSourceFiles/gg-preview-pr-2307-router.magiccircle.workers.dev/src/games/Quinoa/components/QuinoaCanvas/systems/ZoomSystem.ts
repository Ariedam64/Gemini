import { getDefaultStore } from 'jotai';
import type { Container, FederatedWheelEvent } from 'pixi.js';
import { ZoomConfig } from '@/hooks/useZoom';
import { tileSizeAtom } from '@/Quinoa/atoms/mapAtoms';
import { activeModalAtom } from '@/Quinoa/atoms/modalAtom';
import type { QuinoaSystem } from '../interfaces';
import type { DirectionalInputSystem } from './DirectionalInputSystem';
import type { EstablishingShotSystem } from './EstablishingShotSystem';
import type { TouchInputSystem } from './input/TouchInputSystem';

// Safari gesture events
interface GestureEvent extends Event {
  scale: number;
  rotation: number;
  preventDefault: () => void;
  stopPropagation: () => void;
}

const { get, set } = getDefaultStore();

/**
 * ZoomSystem handles wheel and pinch-to-zoom input.
 *
 * Architecture:
 * - Mouse/Trackpad: Event-driven (Wheel + Safari Gesture API)
 * - Touchscreen: Polling-based (via TouchInputSystem)
 * - Conflict Resolution: Filters out touch points used by the active DPad
 *   (via DirectionalInputSystem) to prevent accidental zooms while walking.
 *
 * This hybrid approach ensures:
 * 1. Responsive trackpad zooming on macOS (via Gesture API)
 * 2. Robust, non-stuck pinch zooming on Touchscreens (via State Snapshot)
 */
export class ZoomSystem implements QuinoaSystem {
  public readonly name = 'zoom';

  private eventTarget: Container;
  private canvas: HTMLCanvasElement;
  private touchInputSystem: TouchInputSystem;
  private establishingShotSystem: EstablishingShotSystem;
  private directionalInputSystem: DirectionalInputSystem;

  // Touch/Pinch state
  private initialPinchDistance: number | null = null;
  private initialTileSizeOnZoom: number = 0;

  // Safari Gesture state
  private initialTileSizeOnGesture: number = 0;

  constructor(
    eventTarget: Container,
    canvas: HTMLCanvasElement,
    touchInputSystem: TouchInputSystem,
    establishingShotSystem: EstablishingShotSystem,
    directionalInputSystem: DirectionalInputSystem
  ) {
    this.eventTarget = eventTarget;
    this.canvas = canvas;
    this.touchInputSystem = touchInputSystem;
    this.establishingShotSystem = establishingShotSystem;
    this.directionalInputSystem = directionalInputSystem;

    // Mouse/Trackpad listeners
    this.eventTarget.on('wheel', this.handlePixiWheel);

    // Native gesture listeners (macOS Trackpad primarily)
    this.canvas.addEventListener(
      'gesturestart',
      this.handleSafariGestureStart as EventListener,
      { passive: false }
    );
    this.canvas.addEventListener(
      'gesturechange',
      this.handleSafariGestureChange as EventListener,
      { passive: false }
    );
    this.canvas.addEventListener(
      'gestureend',
      this.handleSafariGestureEnd as EventListener,
      { passive: false }
    );

    // Native wheel listener to prevent browser zoom (Chrome/Firefox/Edge)
    this.canvas.addEventListener('wheel', this.preventNativeBrowserZoom, {
      passive: false,
    });
  }

  /**
   * Per-frame update to handle Touchscreen Pinch via Polling.
   */
  public draw(): void {
    // Poll touches from the system
    const allTouches = this.touchInputSystem.getTouches();

    // Filter out the DPad touch if active so we don't zoom while moving
    const dpad = this.directionalInputSystem.getTouchDPad();
    const dpadTouchId = dpad ? dpad.getPrimaryTouchId() : null;

    const touches =
      dpadTouchId !== null
        ? allTouches.filter((t) => t.id !== dpadTouchId)
        : allTouches;

    // We only care about pinch if exactly 2 touches are present
    if (touches.length !== 2) {
      this.initialPinchDistance = null;
      return;
    }

    if (this.shouldBlockZoom()) return;

    this.cancelEstablishingShotIfRunning();

    const [t1, t2] = touches;
    const distance = Math.sqrt((t2.x - t1.x) ** 2 + (t2.y - t1.y) ** 2);

    // Start of pinch
    if (this.initialPinchDistance === null) {
      this.initialPinchDistance = distance;
      this.initialTileSizeOnZoom = get(tileSizeAtom);
    } else {
      // Continue pinch
      const scale = distance / this.initialPinchDistance;
      const newTileSize = this.initialTileSizeOnZoom * scale;

      const clampedTileSize = Math.max(
        Math.min(newTileSize, ZoomConfig.maxTileSize),
        ZoomConfig.minTileSize
      );

      set(tileSizeAtom, clampedTileSize);
    }
  }

  private shouldBlockZoom(): boolean {
    const activeModal = get(activeModalAtom);
    if (activeModal) return true;
    return false;
  }

  private preventNativeBrowserZoom = (e: WheelEvent): void => {
    // Check for pinch-to-zoom gesture on Chrome/Firefox (ctrl + wheel)
    if (e.ctrlKey) {
      e.preventDefault();
    }
  };

  private handlePixiWheel = (e: FederatedWheelEvent): void => {
    if (this.shouldBlockZoom()) return;

    this.cancelEstablishingShotIfRunning();

    const isPinch =
      'ctrlKey' in e.nativeEvent && (e.nativeEvent as WheelEvent).ctrlKey;

    const multiplier = isPinch
      ? ZoomConfig.pinchStepMultiplier
      : ZoomConfig.wheelStepMultiplier;

    const zoomFactor = 1 - e.deltaY * multiplier;

    const currentTileSize = get(tileSizeAtom);
    const newTileSize = Math.max(
      Math.min(currentTileSize * zoomFactor, ZoomConfig.maxTileSize),
      ZoomConfig.minTileSize
    );

    set(tileSizeAtom, newTileSize);
  };

  // Safari Gesture Handling (macOS Trackpad)

  private handleSafariGestureStart = (e: GestureEvent): void => {
    e.preventDefault();
    if (this.shouldBlockZoom()) return;

    this.cancelEstablishingShotIfRunning();

    this.initialTileSizeOnGesture = get(tileSizeAtom);
  };

  /**
   * Helper to cancel the establishing shot if it's currently running.
   * Called whenever the user initiates a zoom interaction.
   */
  private cancelEstablishingShotIfRunning(): void {
    if (this.establishingShotSystem.isRunning()) {
      this.establishingShotSystem.stop();
    }
  }

  private handleSafariGestureChange = (e: GestureEvent): void => {
    e.preventDefault();
    if (this.shouldBlockZoom()) return;

    const newTileSize = this.initialTileSizeOnGesture * e.scale;
    const clampedTileSize = Math.max(
      Math.min(newTileSize, ZoomConfig.maxTileSize),
      ZoomConfig.minTileSize
    );

    set(tileSizeAtom, clampedTileSize);
  };

  private handleSafariGestureEnd = (e: GestureEvent): void => {
    e.preventDefault();
    this.initialTileSizeOnGesture = 0;
  };

  public destroy(): void {
    if (this.eventTarget) {
      this.eventTarget.off('wheel', this.handlePixiWheel);
    }

    if (this.canvas) {
      this.canvas.removeEventListener(
        'gesturestart',
        this.handleSafariGestureStart as EventListener
      );
      this.canvas.removeEventListener(
        'gesturechange',
        this.handleSafariGestureChange as EventListener
      );
      this.canvas.removeEventListener(
        'gestureend',
        this.handleSafariGestureEnd as EventListener
      );
      this.canvas.removeEventListener('wheel', this.preventNativeBrowserZoom);
    }
  }
}
