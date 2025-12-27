import { getDefaultStore } from 'jotai';
import { BitmapText, Container } from 'pixi.js';
import { avgPingAtom } from '@/Quinoa/data/perf/atoms/avgPingAtom';
import { pingTimestampsAtom } from '@/Quinoa/data/perf/atoms/pingTimestampsAtom';
import { MAX_PING_TIMESTAMPS } from '@/Quinoa/data/perf/constants/constants';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import type { QuinoaFrameContext, QuinoaSystem } from '../../interfaces';
import { RateTracker } from '../debug/RateTracker';

const { get, set } = getDefaultStore();

/**
 * Visual configuration for the performance overlay.
 */
const PerfOverlayConfig = {
  /** Position in screen space */
  position: { x: 8, y: 0 },

  /** Text styling */
  style: {
    fontFamily: 'monospace',
    fontSize: 9,
    fill: '#ffffff',
  },

  /** Container opacity */
  alpha: 0.8,

  /** Warning color thresholds */
  warningThresholds: {
    fps: 15, // Yellow below this
    ping: 300, // Yellow above this
  },

  /** Warning color (matches Yellow.Magic from theme) */
  warningColor: '#f6e05e',

  /** Normal color */
  normalColor: '#ffffff',

  /** Ping interval in milliseconds */
  pingIntervalMs: 2000,

  /** Display update interval in milliseconds */
  displayUpdateMs: 1000,

  /** FPS tracking window in milliseconds */
  fpsWindowMs: 1000,

  /** Minimum frames before showing overlay */
  minFramesBeforeVisible: 30,
} as const;

/**
 * Lightweight performance overlay displaying FPS and ping.
 *
 * Positioned in the top-left corner, this overlay provides real-time
 * performance metrics for users. Unlike DebugOverlay, this is user-facing
 * and minimal in appearance.
 */
export class PerfOverlay implements QuinoaSystem {
  public readonly name = 'perf';

  private container: Container;
  private fpsText: BitmapText;
  private separatorText: BitmapText;
  private pingText: BitmapText;

  /** Tracks FPS using a rolling window */
  private fpsTracker: RateTracker;

  /** Frame count for visibility threshold */
  private frameCount = 0;

  /** Last time the display was updated */
  private lastDisplayUpdate = 0;

  /** Last time a ping was sent */
  private lastPingTime = 0;

  /**
   * Creates a new PerfOverlay.
   *
   * @param parentContainer - Container to add the overlay to (typically uiContainer)
   */
  constructor(parentContainer: Container) {
    const { position, style, alpha } = PerfOverlayConfig;

    // Initialize FPS tracker
    this.fpsTracker = new RateTracker(PerfOverlayConfig.fpsWindowMs);

    // Create root container
    this.container = new Container();
    this.container.label = 'PerfOverlay';
    this.container.x = position.x;
    this.container.y = position.y;
    this.container.alpha = alpha;
    this.container.zIndex = 10000;
    this.container.visible = false; // Hidden until we have enough frames

    // Create FPS text
    this.fpsText = new BitmapText({
      text: '0fps',
      style: {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fill: style.fill,
        fontWeight: 'bold',
      },
    });
    this.container.addChild(this.fpsText);

    // Create separator text
    this.separatorText = new BitmapText({
      text: ' | ',
      style: {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fill: style.fill,
        fontWeight: '900',
      },
    });
    this.separatorText.visible = false;
    this.container.addChild(this.separatorText);

    // Create ping text
    this.pingText = new BitmapText({
      text: '0ms',
      style: {
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fill: style.fill,
        fontWeight: 'bold',
      },
    });
    this.pingText.visible = false;
    this.container.addChild(this.pingText);

    parentContainer.addChild(this.container);
  }

  /**
   * Per-frame update - tracks FPS and updates display.
   */
  draw(context: QuinoaFrameContext): void {
    // Track FPS every frame
    this.fpsTracker.tick(context.time);
    this.frameCount++;

    // Check visibility threshold
    if (!this.container.visible) {
      if (this.frameCount >= PerfOverlayConfig.minFramesBeforeVisible) {
        this.container.visible = true;
      } else {
        return;
      }
    }

    // Send ping at intervals
    this.maybeSendPing(context.time);

    // Update position based on safe areas
    const { position } = PerfOverlayConfig;
    if (context.safeAreaInsets) {
      this.container.x = position.x + context.safeAreaInsets.left;
      this.container.y = position.y + context.safeAreaInsets.top;
    }

    // Throttle display updates
    if (
      context.time - this.lastDisplayUpdate <
      PerfOverlayConfig.displayUpdateMs
    ) {
      return;
    }
    this.lastDisplayUpdate = context.time;

    this.updateDisplay();
  }

  /**
   * Sends a ping message if enough time has elapsed.
   */
  private maybeSendPing(time: number): void {
    if (time - this.lastPingTime < PerfOverlayConfig.pingIntervalMs) {
      return;
    }
    this.lastPingTime = time;

    const pingId = Date.now();
    const now = performance.now();

    // Update ping timestamps atom
    const prev = get(pingTimestampsAtom);
    const next = new Map(prev);
    next.set(pingId, { ping: now, pong: null });

    // Remove oldest if exceeding max
    if (next.size > MAX_PING_TIMESTAMPS) {
      const oldestKey = next.keys().next().value;
      if (oldestKey) {
        next.delete(oldestKey);
      }
    }

    set(pingTimestampsAtom, next);

    // Send ping message
    sendQuinoaMessage({
      type: 'Ping',
      id: pingId,
    });
  }

  /**
   * Updates the display text and positions.
   */
  private updateDisplay(): void {
    const { warningThresholds, warningColor, normalColor } = PerfOverlayConfig;

    // Update FPS
    const fps = Math.round(this.fpsTracker.rate);
    this.fpsText.text = `${fps}fps`;
    this.fpsText.style.fill =
      fps <= warningThresholds.fps ? warningColor : normalColor;

    // Update ping
    const ping = get(avgPingAtom);
    if (ping > 0) {
      this.separatorText.visible = true;
      this.pingText.visible = true;
      this.pingText.text = ` ${ping}ms`;
      this.pingText.style.fill =
        ping >= warningThresholds.ping ? warningColor : normalColor;
    } else {
      this.separatorText.visible = false;
      this.pingText.visible = false;
    }

    // Update positions (horizontal layout)
    this.separatorText.x = this.fpsText.width;
    this.pingText.x = this.separatorText.x + this.separatorText.width;
  }

  /**
   * Cleanup resources.
   */
  destroy(): void {
    this.container.destroy({ children: true });
  }
}
