import { FancyButton } from '@pixi/ui';
import { BitmapText, Container, Graphics } from 'pixi.js';
import type { QuinoaFrameContext, QuinoaSystem } from '../../interfaces';
import type { TileObjectSystem } from '../tile-objects/TileObjectSystem';
import { RateTracker } from './RateTracker';

/**
 * Debug overlay visual configuration.
 */
const Config = {
  /** Update intervals */
  displayIntervalMs: 250, // 4 updates/sec for readability
  rateWindowMs: 500, // Window for FPS/UPS smoothing

  /** Panel styling */
  panel: {
    background: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 10,
    padding: 10,
    gap: 8,
    minWidth: 140,
  },

  /** Metrics text styling */
  text: {
    color: '#e8e8e8',
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 16,
    width: 130, // Fixed width to prevent jumping
  },

  /** Button styling */
  button: {
    width: 110,
    height: 30,
    borderRadius: 6,
    enabledColor: '#2d6a4f', // Forest green
    enabledHover: '#40916c',
    disabledColor: '#9d4348', // Muted red
    disabledHover: '#c1666b',
    textColor: '#ffffff',
    fontSize: 13,
    fontWeight: '600' as const,
  },
} as const;

/**
 * Interface for engine metrics that DebugOverlay queries.
 */
export interface DebugMetricsProvider {
  /** Get the current target UPS based on zoom */
  getTargetUPS(): number;
  /** Get the current effective tile size */
  getEffectiveTileSize(): number;
  /** Check if patching is disabled */
  isPatchDisabled(): boolean;
  /** Set patch disabled state */
  setPatchDisabled(disabled: boolean): void;
  /** Get the current renderer type (WebGPU/WebGL) */
  getRendererType(): string;
}

/**
 * DebugOverlay displays real-time performance metrics in a HUD.
 *
 * Uses standard Pixi containers and manual layout.
 * Implements QuinoaSystem interface to integrate with the engine's update loop.
 *
 * Displayed metrics:
 * - UPS: World update rate (actual/target)
 * - Zoom: Current tile size
 * - Tiles: visible/non-empty/total
 */
export class DebugOverlay implements QuinoaSystem {
  /** Unique identifier used by the engine for this system. */
  public readonly name = 'debug';

  private container: Container;
  private background: Graphics;
  private metricsProvider: DebugMetricsProvider;
  private tileObjectSystem: TileObjectSystem;
  // UI elements
  private metricsText: BitmapText;
  private patchButton: FancyButton;

  // Throttling for display updates
  private lastDisplayUpdate = 0;

  // Rate trackers for smoothed metrics
  private fpsTracker = new RateTracker(Config.rateWindowMs);
  private upsTracker = new RateTracker(Config.rateWindowMs);

  /**
   * Creates a new DebugOverlay.
   *
   * @param parentContainer - Container to add the overlay to (typically app.stage)
   * @param metricsProvider - Provider for querying engine metrics
   * @param tileObjectSystem - System for querying tile object counts
   */
  constructor(
    parentContainer: Container,
    metricsProvider: DebugMetricsProvider,
    tileObjectSystem: TileObjectSystem
  ) {
    this.metricsProvider = metricsProvider;
    this.tileObjectSystem = tileObjectSystem;
    const { text, button } = Config;

    // Create root container
    this.container = new Container();
    this.container.label = 'DebugOverlay';
    this.container.x = 6;
    this.container.y = 55;
    this.container.zIndex = 10000;

    // Create background
    this.background = new Graphics();
    this.container.addChild(this.background);

    // Create metrics text with fixed width to prevent jumping
    this.metricsText = new BitmapText({
      text: 'Initializing...',
      style: {
        fontFamily: text.fontFamily,
        fontSize: text.fontSize,
        fill: text.color,
        align: 'left',
        lineHeight: text.lineHeight,
      },
    });
    this.container.addChild(this.metricsText);

    // Create toggle button
    const enabled = !metricsProvider.isPatchDisabled();
    this.patchButton = new FancyButton({
      defaultView: this.createButtonBackground(enabled, false),
      hoverView: this.createButtonBackground(enabled, true),
      pressedView: this.createButtonBackground(enabled, true, 0.8),
      text: new BitmapText({
        text: `Patch: ${enabled ? 'ON' : 'OFF'}`,
        style: {
          fontFamily: text.fontFamily,
          fontSize: button.fontSize,
          fontWeight: button.fontWeight,
          fill: button.textColor,
        },
      }),
    });
    this.patchButton.onPress.connect(() => this.togglePatch());
    this.container.addChild(this.patchButton);

    this.updateLayout();

    parentContainer.addChild(this.container);
  }

  /**
   * Updates the layout of the overlay elements.
   */
  private updateLayout(): void {
    const { panel, button } = Config;

    // Position metrics text
    this.metricsText.x = panel.padding;
    this.metricsText.y = panel.padding;

    // Position button below text
    this.patchButton.x = panel.padding;
    this.patchButton.y =
      this.metricsText.y + this.metricsText.height + panel.gap;

    // Calculate container dimensions
    const contentWidth = Math.max(
      this.metricsText.width,
      button.width // Button width is fixed in createButtonBackground
    );
    const width = Math.max(panel.minWidth, contentWidth + panel.padding * 2);
    const height = this.patchButton.y + button.height + panel.padding;

    // Redraw background
    this.background.clear();
    this.background.roundRect(0, 0, width, height, panel.borderRadius);
    this.background.fill(panel.background);
  }

  /**
   * Create a button background graphic.
   */
  private createButtonBackground(
    enabled: boolean,
    hover: boolean,
    alpha = 1
  ): Graphics {
    const { button } = Config;
    const bg = new Graphics();

    let color: string;
    if (enabled) {
      color = hover ? button.enabledHover : button.enabledColor;
    } else {
      color = hover ? button.disabledHover : button.disabledColor;
    }

    bg.roundRect(0, 0, button.width, button.height, button.borderRadius);
    bg.fill({ color, alpha });
    return bg;
  }

  /**
   * Patch update - track UPS via RateTracker.
   */
  patch(context: QuinoaFrameContext): void {
    this.upsTracker.tick(context.time);
  }

  /**
   * Per-frame update - track FPS and update display.
   * Display throttled to ~4 UPS for readability.
   */
  draw(context: QuinoaFrameContext): void {
    // Track FPS every frame
    this.fpsTracker.tick(context.time);

    // Update position based on safe areas
    if (context.safeAreaInsets) {
      this.container.x = 6 + context.safeAreaInsets.left;
      this.container.y = 55 + context.safeAreaInsets.top;
    }

    // Throttle display updates
    if (context.time - this.lastDisplayUpdate < Config.displayIntervalMs) {
      return;
    }
    this.lastDisplayUpdate = context.time;

    // Query metrics
    const targetPatchRate = this.metricsProvider.getTargetUPS();
    const tileSize = this.metricsProvider.getEffectiveTileSize();
    const rendererType = this.metricsProvider.getRendererType();

    // Query tile counts from TileObjectSystem
    const tileCounts = this.tileObjectSystem.debugCountTiles() ?? {
      visibleCount: 0,
      withContentCount: 0,
      totalCount: 0,
    };

    // Update metrics text
    this.metricsText.text = this.formatMetrics(
      this.fpsTracker.rate,
      targetPatchRate,
      this.upsTracker.rate,
      tileSize,
      tileCounts,
      rendererType
    );

    // Update layout since text height might have changed
    this.updateLayout();
  }

  /**
   * Format all metrics into display text.
   */
  private formatMetrics(
    fps: number,
    targetPatchRate: number,
    patchRate: number,
    tileSize: number,
    tileCounts: {
      visibleCount: number;
      withContentCount: number;
      totalCount: number;
    },
    rendererType: string
  ): string {
    const { visibleCount, withContentCount, totalCount } = tileCounts;
    return [
      `draw: ${Math.round(fps)} (${rendererType})`,
      `patch: ${Math.round(patchRate)}/${Math.round(targetPatchRate)}`,
      `zoom: ${tileSize.toFixed(1)}`,
      `tiles: ${visibleCount}/${withContentCount}/${totalCount}`,
    ].join('\n');
  }

  /**
   * Toggle patch updates on/off.
   */
  private togglePatch(): void {
    const currentlyDisabled = this.metricsProvider.isPatchDisabled();
    this.metricsProvider.setPatchDisabled(!currentlyDisabled);

    // Update button appearance
    const enabled = currentlyDisabled; // Toggle: was disabled, now enabled
    this.patchButton.defaultView = this.createButtonBackground(enabled, false);
    this.patchButton.hoverView = this.createButtonBackground(enabled, true);
    this.patchButton.pressedView = this.createButtonBackground(
      enabled,
      true,
      0.8
    );

    // Update button text
    const textView = this.patchButton.textView;
    if (textView && 'text' in textView) {
      (textView as BitmapText).text = `Patch: ${enabled ? 'ON' : 'OFF'}`;
    }
  }

  /**
   * Cleanup resources.
   */
  destroy(): void {
    this.container.destroy({ children: true });
  }
}
