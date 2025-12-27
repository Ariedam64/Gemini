import { CompositeTilemap } from '@pixi/tilemap';
import {
  type Application,
  Assets,
  Color,
  Container,
  Sprite,
  Texture,
} from 'pixi.js';
import { WeatherId } from '@/common/games/Quinoa/systems/weather';
import mapJson from '@/common/games/Quinoa/world/Tiled/map.json';
import type { QuinoaFrameContext, QuinoaSystem } from '../../interfaces';
import { GlobalRenderLayers } from '../GlobalRenderLayers';

// =============================================================================
// Constants
// =============================================================================

/**
 * Debug mode to cycle through weather types every 3 seconds.
 * Useful for stress testing tilemap rebuild performance.
 */
const DEBUG_CHAOS_MODE = false;

/** Map dimensions in tiles (from map.json) */
const MAP_WIDTH_TILES = mapJson.width;
const MAP_HEIGHT_TILES = mapJson.height;

/**
 * Hash function constants for pseudo-random tile phase distribution.
 * These create a non-repeating noise pattern across the tile grid.
 * Based on the common GLSL random hash: fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453)
 */
const HASH_X_MULTIPLIER = 12.9898;
const HASH_Y_MULTIPLIER = 78.233;
const HASH_SCALE = 43758.5453;

/**
 * Number of animation frames in each weather texture strip.
 * All weather textures must have the same frame count.
 */
const WEATHER_FRAME_COUNT = 9;

/**
 * Number of distinct phase classes for animation staggering.
 * Higher values create more organic randomness across the map.
 * Decoupled from frame count to allow fine-grained control
 * over visual variation without changing the animation itself.
 */
const WEATHER_PHASE_COUNT = 50;

// =============================================================================
// Weather Visual Configuration
// =============================================================================

/**
 * Visual configuration for each weather type.
 *
 * Each weather has:
 * - Two color scrims (tinted overlays) at different render layers
 * - An animated texture strip with timing configuration
 */
interface WeatherVisualConfig {
  /** Color overlay rendered above ground tiles but below entities */
  aboveGround: Color;
  /** Color overlay rendered above everything (UI excluded) */
  aboveEverything: Color;
  /** Asset path to the horizontal animation strip texture */
  textureName: string;
  /** Animation playback speed in frames per second */
  fps: number;
  /**
   * Duration in milliseconds to pause after animation completes before cycling.
   * Each tile rests individually based on its phase offset, creating a staggered
   * effect where some tiles are animating while others are resting.
   * Defaults to 0 (no rest period).
   */
  restDurationMs?: number;
}

const weatherVisuals: Record<WeatherId, WeatherVisualConfig> = {
  [WeatherId.Rain]: {
    aboveGround: new Color('rgba(30, 58, 138, 0.17)'),
    aboveEverything: new Color('rgba(30, 58, 138, 0.13)'),
    textureName: 'weather/RainAnimation',
    fps: 24,
  },
  [WeatherId.Frost]: {
    aboveGround: new Color('rgba(135, 206, 235, 0.23)'),
    aboveEverything: new Color('rgba(135, 206, 235, 0.18)'),
    textureName: 'weather/FrostAnimation',
    fps: 24,
  },
  [WeatherId.Dawn]: {
    aboveGround: new Color('rgba(59, 24, 102, 0.20)'),
    aboveEverything: new Color('rgba(59, 24, 102, 0.15)'),
    textureName: 'weather/DawnAnimation',
    fps: 10,
    restDurationMs: 30_000,
  },
  [WeatherId.AmberMoon]: {
    aboveGround: new Color('rgba(74, 24, 24, 0.26)'),
    aboveEverything: new Color('rgba(74, 24, 24, 0.20)'),
    textureName: 'weather/AmberMoonAnimation',
    fps: 10,
    restDurationMs: 30_000,
  },
};

// =============================================================================
// WeatherSystem
// =============================================================================

/**
 * Renders weather effects (rain, snow, etc.) across the game world.
 *
 * ## Two-Container Architecture
 *
 * This system uses **two separate containers** because weather effects span
 * two different coordinate spaces:
 *
 * 1. **`weatherContainer`** (world-space, passed to constructor)
 *    - Holds animated tilemaps that show rain/snow/etc at world positions
 *    - Moves with the camera when the player pans around
 *    - Tiles are positioned at world coordinates (e.g., `x * tileWidth`)
 *
 * 2. **`staticContainer`** (screen-space, returned by `getContainer()`)
 *    - Holds the `backgroundScrim` color overlay
 *    - Does NOT move with camera - stays fixed to the viewport
 *    - Always covers the full screen regardless of camera position
 *
 * These cannot be combined into a single container because PixiJS containers
 * inherit their parent's transform. A RenderLayer could theoretically be used,
 * but would require coupling to an external global layer registry with no real
 * benefit - the current sibling-container approach keeps ownership clear.
 *
 * ## Animated Tilemaps
 *
 * Weather animations use `@pixi/tilemap`'s CompositeTilemap. Since `tileAnim`
 * (the animation frame counter) is global per tilemap, we create multiple
 * tilemaps (WEATHER_PHASE_COUNT) to achieve staggered animation. Tiles are
 * distributed across tilemaps using a pseudo-random hash function based on
 * position, creating organic variation.
 *
 * The number of phase classes is decoupled from the animation frame count,
 * allowing fine-grained staggering without increasing texture size.
 *
 * Tilemaps are rebuilt on each weather change since `@pixi/tilemap`'s
 * `tileset()` cannot properly swap textures after tiles are placed.
 *
 * ## Color Scrims
 *
 * Two semi-transparent color overlays provide atmospheric tinting:
 * - `backgroundScrim`: Screen-space overlay (in `staticContainer`)
 * - `topScrim`: World-space overlay via `GlobalRenderLayers.aboveGround`
 *
 * ## Performance
 * - Tilemaps are rebuilt on weather change (infrequent, ~50 tilemaps)
 * - Animation updates only when the frame index changes
 * - Background scrim updates only on window resize
 */
export class WeatherSystem implements QuinoaSystem {
  /** Unique identifier used by the engine for this system. */
  public readonly name = 'weather';

  private app: Application;

  /**
   * World-space container for animated weather tilemaps.
   * Moves with the camera as the player pans around the map.
   */
  private weatherContainer: Container;

  /**
   * Screen-space container for the background color scrim.
   * Does NOT move with camera - stays fixed to the viewport.
   * Must be added to the stage as a sibling (not child) of weatherContainer.
   */
  private staticContainer: Container;

  /** Screen-space color overlay in staticContainer. */
  private backgroundScrim: Sprite;

  /** World-space color overlay attached to GlobalRenderLayers.aboveGround. */
  private topScrim: Sprite;

  /** World container for attaching topScrim (passed from engine). */
  private worldContainer: Container;

  /** Tilemaps for weather animation, one per phase class. */
  private weatherTilemaps: CompositeTilemap[] = [];

  // Animation state
  private frameDurationMs = 0;
  private animationStartTime = 0;
  private lastAnimationFrame = -1;
  /** Number of extra "rest" slots appended to the animation cycle */
  private restFrameSlots = 0;

  // Current weather
  private weatherId: WeatherId | null = null;

  // Cached dimensions for resize detection
  private lastRendererWidth = 0;
  private lastRendererHeight = 0;

  private chaosInterval: number | null = null;

  /**
   * Creates a new WeatherSystem.
   *
   * @param app - The PixiJS application instance
   * @param weatherContainer - World-space container for weather tilemaps.
   *   This container should move with the camera. The caller must also add
   *   the screen-space container from `getContainer()` to the stage.
   * @param worldContainer - World container for attaching the topScrim overlay.
   *   The topScrim is attached to this container and rendered via the
   *   GlobalRenderLayers.aboveGround render layer.
   */
  constructor(
    app: Application,
    weatherContainer: Container,
    worldContainer: Container
  ) {
    this.app = app;
    this.weatherContainer = weatherContainer;
    this.worldContainer = worldContainer;

    // Static container for background scrim (doesn't move with camera)
    this.staticContainer = new Container({ label: 'WeatherStatic' });

    // Background scrim: covers screen, doesn't move with camera
    this.backgroundScrim = new Sprite(Texture.WHITE);
    this.backgroundScrim.visible = false;
    this.backgroundScrim.label = 'WeatherStaticScrim';
    this.staticContainer.addChild(this.backgroundScrim);

    // Top scrim: world-space overlay, rendered above ground tiles
    this.topScrim = new Sprite(Texture.WHITE);
    this.topScrim.visible = false;
    this.topScrim.label = 'WeatherAboveGroundScrim';
    this.initializeTopScrim();

    // Chaos mode for stress testing
    if (DEBUG_CHAOS_MODE) {
      const weathers = Object.values(WeatherId);
      let index = 0;
      this.chaosInterval = window.setInterval(() => {
        index = (index + 1) % weathers.length;
        const newWeather = weathers[index];
        console.log(`[WeatherSystem] Chaos Mode: Switching to ${newWeather}`);
        this.weatherId = newWeather;
        this.onWeatherChange(newWeather);
      }, 3000);
    }
  }

  /**
   * Attaches the top scrim to the world container with proper render layer.
   */
  private initializeTopScrim(): void {
    this.worldContainer.addChild(this.topScrim);
    GlobalRenderLayers.aboveGround?.attach(this.topScrim);
  }

  /**
   * Cleans up all resources.
   */
  destroy(): void {
    if (this.chaosInterval !== null) {
      clearInterval(this.chaosInterval);
    }
    this.staticContainer.destroy({ children: true });

    // Destroy tilemaps
    for (const tilemap of this.weatherTilemaps) {
      tilemap.destroy({ children: true });
    }
    this.weatherTilemaps = [];

    if (this.topScrim.parent) {
      this.topScrim.parent.removeChild(this.topScrim);
    }
    this.topScrim.destroy();
  }

  /**
   * Returns the screen-space container holding the background color scrim.
   *
   * This must be added to the stage as a **sibling** of the world-space
   * `weatherContainer` (passed to constructor), not as a child. The render
   * order should be: `weatherContainer` → `staticContainer` → `uiContainer`.
   *
   * @returns The 'WeatherStatic' container for screen-space overlays
   */
  getContainer(): Container {
    return this.staticContainer;
  }

  // ===========================================================================
  // Tilemap Management
  // ===========================================================================

  /**
   * Clears all weather tilemaps without destroying the containers.
   * Reusing the containers avoids object creation overhead.
   */
  private clearTilemaps(): void {
    for (const tilemap of this.weatherTilemaps) {
      tilemap.clear();
    }
  }

  /**
   * Computes a pseudo-random phase index for a tile based on its grid position.
   * Uses a deterministic hash to ensure consistent results across frames.
   *
   * @param tileX - Tile X coordinate
   * @param tileY - Tile Y coordinate
   * @param phaseCount - Number of animation phases (typically frameCount)
   * @returns Phase index in range [0, phaseCount)
   */
  private getPhaseIndex(
    tileX: number,
    tileY: number,
    phaseCount: number
  ): number {
    const hash = Math.abs(
      Math.sin(tileX * HASH_X_MULTIPLIER + tileY * HASH_Y_MULTIPLIER) *
        HASH_SCALE
    );
    return Math.floor((hash % 1.0) * phaseCount);
  }

  /**
   * Builds weather tilemaps for the given texture.
   * Creates WEATHER_PHASE_COUNT tilemaps with staggered animation phases.
   *
   * @param texture - Weather animation texture strip
   */
  private buildTilemaps(texture: Texture): void {
    // Calculate frame dimensions from horizontal texture strip
    const frameWidth = texture.width / WEATHER_FRAME_COUNT;
    const frameHeight = texture.height;

    // Create one tilemap per phase class (more phases = more organic staggering)
    for (let i = 0; i < WEATHER_PHASE_COUNT; i++) {
      let tilemap: CompositeTilemap;

      // Reuse existing tilemap if available (already cleared by clearTilemaps)
      if (this.weatherTilemaps[i]) {
        tilemap = this.weatherTilemaps[i];
      } else {
        tilemap = new CompositeTilemap();
        tilemap.label = `WeatherTilemap_Phase${i}`;
        this.weatherContainer.addChild(tilemap);
        this.weatherTilemaps[i] = tilemap;
      }

      tilemap.tileAnim = [0, 0];
      tilemap.visible = false; // Hidden until weather is active
    }

    // Distribute tiles across tilemaps using position-based hash
    // Tile positions use frameWidth as the step since the tilemap is scaled up
    for (let y = 0; y < MAP_HEIGHT_TILES; y++) {
      for (let x = 0; x < MAP_WIDTH_TILES; x++) {
        const phaseIndex = this.getPhaseIndex(x, y, WEATHER_PHASE_COUNT);
        const tilemap = this.weatherTilemaps[phaseIndex];

        tilemap.tile(texture, x * frameWidth, y * frameHeight, {
          tileWidth: frameWidth,
          tileHeight: frameHeight,
          animX: frameWidth,
          animCountX: WEATHER_FRAME_COUNT,
        });
      }
    }
  }

  /**
   * Shows or hides the weather tilemaps.
   */
  private setTilemapsVisible(visible: boolean): void {
    for (const tilemap of this.weatherTilemaps) {
      tilemap.visible = visible;
    }
  }

  /**
   * Handles weather type changes by rebuilding tilemaps with the new texture.
   */
  private onWeatherChange(weatherId: WeatherId | null): void {
    // Hide tilemaps if no weather
    if (!weatherId) {
      this.setTilemapsVisible(false);
      this.frameDurationMs = 0;
      this.restFrameSlots = 0;
      return;
    }

    const config = weatherVisuals[weatherId];
    if (!config) {
      this.setTilemapsVisible(false);
      return;
    }

    const texture = Assets.get<Texture>(config.textureName);
    if (!texture) {
      console.warn(`[WeatherSystem] Texture not found: ${config.textureName}`);
      this.setTilemapsVisible(false);
      return;
    }

    // Clear existing tilemaps and rebuild with new texture
    // (tileset() cannot properly swap textures after tiles are placed)
    const startTime = performance.now();
    this.clearTilemaps();
    this.buildTilemaps(texture);
    console.log(
      `[WeatherSystem] Rebuilt tilemaps for ${weatherId} in ${(performance.now() - startTime).toFixed(2)}ms`
    );

    // Update animation timing
    this.frameDurationMs = 1000 / config.fps;
    this.restFrameSlots = config.restDurationMs
      ? Math.ceil(config.restDurationMs / this.frameDurationMs)
      : 0;
    this.animationStartTime = 0;
    this.lastAnimationFrame = -1;

    // Show tilemaps
    this.setTilemapsVisible(true);
  }

  // ===========================================================================
  // Scrim Management
  // ===========================================================================

  /**
   * Updates a scrim sprite to cover the visible area.
   *
   * @param sprite - The scrim sprite to update
   * @param color - The tint color (includes alpha)
   * @param screenWidth - Viewport width in pixels
   * @param screenHeight - Viewport height in pixels
   */
  private updateScrim(
    sprite: Sprite,
    color: Color | undefined,
    screenWidth: number,
    screenHeight: number
  ): void {
    if (!color || !sprite.parent) {
      sprite.visible = false;
      return;
    }

    // Convert screen corners to local coordinates
    const topLeft = sprite.parent.toLocal({ x: 0, y: 0 });
    const bottomRight = sprite.parent.toLocal({
      x: screenWidth,
      y: screenHeight,
    });

    sprite.visible = true;
    sprite.position.copyFrom(topLeft);
    sprite.setSize(bottomRight.x - topLeft.x, bottomRight.y - topLeft.y);
    sprite.tint = color;
    sprite.alpha = color.alpha;
    sprite.zIndex = 1;
  }

  // ===========================================================================
  // Frame Update
  // ===========================================================================

  /**
   * Updates weather visuals each frame.
   *
   * @param context - System context with timing and viewport info
   */
  draw(context: QuinoaFrameContext): void {
    // Check for weather changes from context
    if (context.weatherId !== this.weatherId) {
      this.weatherId = context.weatherId;
      this.onWeatherChange(context.weatherId);
    }

    // Early exit if no weather active
    if (!this.weatherId) {
      this.backgroundScrim.visible = false;
      this.topScrim.visible = false;
      return;
    }

    const config = weatherVisuals[this.weatherId];
    const { width, height } = this.app.renderer;

    // Update background scrim only on resize
    if (
      width !== this.lastRendererWidth ||
      height !== this.lastRendererHeight
    ) {
      this.updateScrim(
        this.backgroundScrim,
        config?.aboveEverything,
        width,
        height
      );
      this.lastRendererWidth = width;
      this.lastRendererHeight = height;
    }

    // Update top scrim every frame (moves with camera)
    this.updateScrim(this.topScrim, config?.aboveGround, width, height);

    // Update tilemap animations
    this.updateTilemapAnimation(context.time);
  }

  /**
   * Advances the tilemap animation based on elapsed time.
   * Each tilemap has a staggered phase offset, and the cycle includes an
   * optional rest period where tiles hold on the last frame before repeating.
   *
   * @param time - Current timestamp from requestAnimationFrame
   */
  private updateTilemapAnimation(time: number): void {
    if (this.weatherTilemaps.length === 0 || this.frameDurationMs === 0) {
      return;
    }

    // Initialize start time on first frame
    if (this.animationStartTime === 0) {
      this.animationStartTime = time;
    }

    const elapsed = time - this.animationStartTime;
    const currentFrame = Math.floor(elapsed / this.frameDurationMs);

    // Skip update if frame hasn't changed
    if (currentFrame === this.lastAnimationFrame) {
      return;
    }

    this.lastAnimationFrame = currentFrame;

    // Total cycle includes animation frames plus rest slots
    const totalCycleSlots = WEATHER_FRAME_COUNT + this.restFrameSlots;

    // Update each tilemap with its phase-offset frame index
    for (let i = 0; i < this.weatherTilemaps.length; i++) {
      const tilemap = this.weatherTilemaps[i];
      // Scale phase offset to span the entire cycle (animation + rest).
      // With WEATHER_PHASE_COUNT tilemaps distributed across totalCycleSlots,
      // tiles are staggered more organically than if phases matched frame count.
      const scaledOffset = (i * totalCycleSlots) / WEATHER_PHASE_COUNT;
      const cyclePosition =
        Math.floor(currentFrame + scaledOffset) % totalCycleSlots;
      // During animation: show the actual frame; during rest: hold on last frame
      const frameIndex =
        cyclePosition < WEATHER_FRAME_COUNT
          ? cyclePosition
          : WEATHER_FRAME_COUNT - 1;
      tilemap.tileAnim[0] = frameIndex;
    }
  }
}
