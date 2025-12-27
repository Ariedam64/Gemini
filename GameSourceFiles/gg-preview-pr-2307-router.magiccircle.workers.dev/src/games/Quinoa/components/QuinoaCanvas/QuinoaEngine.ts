// Must import @pixi/layout BEFORE pixi.js to apply Container mixins
import '@pixi/layout';

// For now, we are not using advanced blend modes, but if we do end up needing
// it, we import this!
// import 'pixi.js/advanced-blend-modes';

import type * as tiled from '@kayahr/tiled';
import type { LayoutSystemOptions } from '@pixi/layout';
import { getDefaultStore } from 'jotai';
import {
  Application,
  Assets,
  Container,
  extensions,
  Rectangle,
  RenderLayer,
  Ticker,
} from 'pixi.js';
import mapJson from '@/common/games/Quinoa/world/Tiled/map.json';
import { BASE_URL } from '@/environment';
import { ZoomConfig } from '@/hooks/useZoom';
import { weatherAtom } from '@/Quinoa/atoms/baseAtoms';
import { mapAtom, tileSizeAtom } from '@/Quinoa/atoms/mapAtoms';
import { positionAtom } from '@/Quinoa/atoms/positionAtoms';
import {
  framesPerSecondLimitAtom,
  playerIdAtom,
  renderScalePreferenceAtom,
} from '@/store/store';
import { resolveRenderScalePreference } from '@/utils/renderScale';
import { calculateServerNow } from '../../utils/serverNow';
import { CanvasSpriteCache } from './CanvasSpriteCache';
import { GameTextureCache } from './GameTextureCache';
import type {
  QuinoaFrameContext,
  QuinoaSystem,
  ZoomOverrideController,
} from './interfaces';
import { BytesAsset } from './pixi/extensions/BytesAsset';
import { RiveSpriteBatchRendererPlugin } from './pixi/rive/RiveSpriteBatchRendererPlugin';
import {
  calculateCameraTransform,
  gridToWorldPixels,
  QUINOA_RENDER_SCALE,
  setQuinoaRenderScale,
  TILE_SIZE_WORLD,
} from './sprite-utils';
import { AvatarSystem } from './systems/avatars/AvatarSystem';
import { BuildingSystem } from './systems/buildings/BuildingSystem';
import { DirectionalInputSystem } from './systems/DirectionalInputSystem';
import {
  type DebugMetricsProvider,
  DebugOverlay,
} from './systems/debug/DebugOverlay';
import { EstablishingShotSystem } from './systems/EstablishingShotSystem';
import { GlobalRenderLayers } from './systems/GlobalRenderLayers';
import { TouchInputSystem } from './systems/input/TouchInputSystem';
import { MovementSystem } from './systems/MovementSystem';
import { MapSystem, type TiledMap } from './systems/map/MapSystem';
import { PerfOverlay } from './systems/perf/PerfOverlay';
import { PetSystem } from './systems/pets/PetSystem';
import { TileObjectSystem } from './systems/tile-objects/TileObjectSystem';
import {
  calculateTileViewport,
  type TileViewport,
} from './systems/tile-objects/TileViewport';
import { VignetteSystem } from './systems/vignette/VignetteSystem';
import { WeatherSystem } from './systems/weather/WeatherSystem';
import { ZoomSystem } from './systems/ZoomSystem';

// Commented out because people seem to like the linear (blurry but smoother)
// rather than the nearest (crisp but blocky) scaling.
// TextureSource.defaultOptions.scaleMode =
//   window.devicePixelRatio >= 2 ? 'linear' : 'nearest';

/**
 * UPS (updates per second) range for zoom-based throttling.
 * patch() calls are throttled based on zoom level to save performance
 * when zoomed out (when detail is less visible anyway).
 */
const MIN_UPS = 10;
const MAX_UPS = 60;

const { get, sub } = getDefaultStore();

/**
 * Internal system entry with metadata.
 */
interface SystemEntry {
  system: QuinoaSystem;
  enabled: boolean;
}

/**
 * Custom error thrown when engine initialization is aborted due to early
 * destruction. This is expected during React StrictMode double-invocation
 * or rapid component unmount/remount cycles.
 */
export class EngineAbortedError extends Error {
  constructor() {
    super('Engine initialization aborted');
    this.name = 'EngineAbortedError';
  }
}

declare global {
  interface Window {
    // This is a global promise that is used to prevent multiple initializations
    // of the engine, and can survive HMR etc.
    magiccircle_quinoaEngineInitializationPromise: Promise<void> | null;
  }
}

// ============================================================================
// QuinoaEngine
// ============================================================================

/**
 * QuinoaEngine orchestrates the PixiJS rendering pipeline for the Quinoa game.
 *
 * Responsibilities:
 * - Owns the PixiJS Application and container hierarchy
 * - Manages system lifecycle (registration, enable/disable, destruction)
 * - Handles the game loop with two update cadences:
 *   - draw(): Every frame for smooth animations
 *   - patch(): Throttled based on zoom (10-60 UPS)
 * - Calculates and caches viewport for culling
 * - Applies camera transforms
 *
 * @example
 * ```typescript
 * const engine = new QuinoaEngine();
 * await engine.initialize(canvas, container);
 * engine.start();
 * // later...
 * engine.destroy();
 * ```
 */
export class QuinoaEngine
  implements DebugMetricsProvider, ZoomOverrideController
{
  private readonly enableDebugOverlay: boolean;

  private app: Application | null = null;
  private isDestroyed = false;
  private systems: Map<string, SystemEntry> = new Map();

  // Public caches exposed for consumers
  public gameTextureCache: GameTextureCache | null = null;
  public canvasSpriteCache: CanvasSpriteCache | null = null;

  // Input Management
  private touchInputSystem: TouchInputSystem | null = null;

  // Containers (owned by engine)
  private cameraContainer: Container | null = null;
  private groundContainer: Container | null = null;
  private worldContainer: Container | null = null;
  private weatherContainer: Container | null = null;
  private weatherStaticContainer: Container | null = null;
  private vignetteContainer: Container | null = null;
  private uiContainer: Container | null = null;
  private aboveGroundRenderLayer: RenderLayer | null = null;

  // Update management
  /**
   * Separate ticker for throttled patch() calls.
   * Uses maxFPS to control update rate based on zoom level.
   * Manually pumped via update() each frame - doesn't run its own RAF loop.
   */
  private patchTicker: Ticker | null = null;
  private lastFrameTime = 0;
  /** Cached context for patch ticker callback */
  private patchContext: QuinoaFrameContext | null = null;
  /** Reused per-tick context to avoid GC churn. */
  private readonly reusableContext: QuinoaFrameContext = {
    time: 0,
    serverTime: 0,
    playerPosition: { x: 0, y: 0 },
    viewport: { minTileX: 0, minTileY: 0, maxTileX: 0, maxTileY: 0 },
    deltaTime: 0,
    activePlayerId: '',
    weatherId: null,
    zoomLevel: 0,
    safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
  };

  // Viewport caching
  private cachedViewport: TileViewport | null = null;
  private lastZoom = 0;
  private lastClampedX = 0;
  private lastClampedY = 0;
  private rendererResized = false;

  // Map dimensions (cached on init)
  private mapWidthPixels = 0;
  private mapHeightPixels = 0;

  // Debug metrics (cached for DebugMetricsProvider interface)
  private patchDisabled = false;
  private cachedTargetUPS = MAX_UPS;
  private cachedEffectiveTileSize = 0;

  // Zoom override state for establishing shot
  private zoomOverride: number | null = null;

  // Safe area state
  private safeAreaInsets = { top: 0, bottom: 0, left: 0, right: 0 };

  // Subscriptions
  private unsubscribes: (() => void)[] = [];

  // Ticker callback reference for cleanup
  private tickerCallback: ((ticker: Ticker) => void) | null = null;

  constructor(options?: { enableDebugOverlay?: boolean }) {
    this.enableDebugOverlay = options?.enableDebugOverlay ?? false;
  }

  /**
   * Reads safe area insets from CSS variables.
   */
  private updateSafeAreas(): void {
    const style = getComputedStyle(document.documentElement);
    const parse = (val: string) => {
      // Handle "env(safe-area-inset-top)" fallback or "0px"
      // Computed style should return pixels if defined
      const floatVal = parseFloat(val);
      return Number.isNaN(floatVal) ? 0 : floatVal;
    };

    this.safeAreaInsets = {
      top: parse(style.getPropertyValue('--sait')),
      bottom: parse(style.getPropertyValue('--saib')),
      left: parse(style.getPropertyValue('--sail')),
      right: parse(style.getPropertyValue('--sair')),
    };
  }

  /**
   * Initializes global PixiJS resources (extensions, assets).
   * Must be called before any engine instance is created.
   * Safe to call multiple times (idempotent).
   */
  static async initializeGlobals(): Promise<void> {
    if (window.magiccircle_quinoaEngineInitializationPromise) {
      return window.magiccircle_quinoaEngineInitializationPromise;
    }

    window.magiccircle_quinoaEngineInitializationPromise = (async () => {
      // Register loadBytes parser for raw binary data loading
      extensions.add(BytesAsset);

      // Register the Rive batch renderer plugin
      // This will initialize the renderer when app.init() is called
      extensions.add(RiveSpriteBatchRendererPlugin);

      await Assets.init({
        basePath: BASE_URL + '/assets',
        manifest: 'manifest.json',
        texturePreference: {
          resolution: window.devicePixelRatio >= 2 ? 2 : 1,
        },
        loadOptions: {
          strategy: 'retry',
        },
      });

      console.log('[QuinoaEngine] Loading default bundle...');
      await Assets.loadBundle('default');
    })();

    return window.magiccircle_quinoaEngineInitializationPromise;
  }

  /**
   * Initialize the engine with a canvas element.
   *
   * @param canvas - The canvas element to render to
   * @param containerElement - The container element for resize handling
   * @param onReady - Callback when initialization is complete
   */
  async initialize(containerElement: HTMLElement): Promise<HTMLCanvasElement> {
    if (this.isDestroyed) {
      console.warn('[QuinoaEngine] Destroyed before initialization - aborting');
      throw new EngineAbortedError();
    }

    // Ensure globals are initialized before proceeding
    await QuinoaEngine.initializeGlobals();

    if (this.isDestroyed) {
      console.warn('[QuinoaEngine] Destroyed after global init - aborting');
      throw new EngineAbortedError();
    }

    // Initialize PixiJS Application
    const app = new Application();
    await app.init({
      backgroundAlpha: 0,
      resolution: QUINOA_RENDER_SCALE,
      // preference: 'webgpu',
      // Use a dedicated ticker so we can fully dispose it on destroy.
      sharedTicker: false,
      autoDensity: true,
      autoStart: false,
      useBackBuffer: true,
      resizeTo: containerElement,
      eventFeatures: {
        globalMove: false,
      },
      antialias: false,
      // Prevents blurriness on non-HiDPI screens by snapping coordinates to integers
      roundPixels: true,
      layout: {
        autoUpdate: false,
        // enableDebug: true,
      } satisfies Partial<
        LayoutSystemOptions['layout']
      > as unknown as LayoutSystemOptions,
      // Type cast to work around bug in pixi-layout: https://github.com/pixijs/layout/issues/124
    });

    if (this.isDestroyed) {
      console.warn(
        '[QuinoaEngine] Destroyed during initialization - aborting startup'
      );
      app.destroy(
        {
          removeView: true,
          // Do NOT release global resources because we might want be about to
          // recreate the engine very soon!
          releaseGlobalResources: false,
        },
        // Here, it's safe to destroy all resources because we haven't created
        // any yet! Passing 'true' tells pixi to destroy all of the auxiliary
        // resources that might have been created, including e.g. WebGL context
        true
      );
      throw new EngineAbortedError();
    }

    this.app = app;

    // Initial safe area update
    this.updateSafeAreas();

    // Listen for renderer resize events to trigger viewport recalculation
    app.renderer.on('resize', () => {
      this.rendererResized = true;
      this.updateSafeAreas();
    });

    // Initialize sprite caches
    this.gameTextureCache = new GameTextureCache(app.renderer);
    this.canvasSpriteCache = new CanvasSpriteCache(app.renderer);

    // Cache map dimensions
    const map = get(mapAtom);
    this.mapWidthPixels = map.cols * TILE_SIZE_WORLD;
    this.mapHeightPixels = map.rows * TILE_SIZE_WORLD;

    // Initialize Touch Input System
    // This must happen after app initialization so we have the canvas
    this.touchInputSystem = new TouchInputSystem(app.canvas);
    this.addSystem(this.touchInputSystem);

    // Create container hierarchy
    this.createContainerHierarchy();

    // Initialize all systems
    this.initializeSystems(mapJson as TiledMap);

    // Configure FPS limit
    const fpsLimit = get(framesPerSecondLimitAtom);
    app.ticker.maxFPS = fpsLimit > 0 ? fpsLimit : 0;

    // Subscribe to FPS limit changes
    this.unsubscribes.push(
      sub(framesPerSecondLimitAtom, () => {
        const newLimit = get(framesPerSecondLimitAtom);
        if (this.app) {
          this.app.ticker.maxFPS = newLimit > 0 ? newLimit : 0;
        }
      })
    );

    // Subscribe to Render Scale changes
    this.unsubscribes.push(
      sub(renderScalePreferenceAtom, () => {
        const pref = get(renderScalePreferenceAtom);
        const newScale = resolveRenderScalePreference(pref);

        if (this.app) {
          setQuinoaRenderScale(newScale);
          this.app.renderer.resolution = newScale;
          // Trigger resize to apply resolution change
          const { width, height } = this.app.renderer;
          this.app.renderer.resize(width, height);
        }
      })
    );

    // Initialize patch ticker for throttled updates
    // This ticker doesn't run its own RAF loop - we manually call update() each frame
    // maxFPS controls how often it actually invokes listeners
    this.patchTicker = new Ticker();
    this.patchTicker.autoStart = false;
    this.patchTicker.maxFPS = MAX_UPS; // Will be updated dynamically based on zoom
    this.patchTicker.add(() => {
      if (this.patchContext) {
        this.callPatch(this.patchContext);
      }
    });

    // For now, this can never change per-frame, so we can set it here
    // and avoid the Jotai atom read each frame.
    this.reusableContext.activePlayerId = get(playerIdAtom);

    return app.canvas;
  }

  /**
   * Creates the container hierarchy for the engine.
   * This hierarchy determines render order and camera transform scope.
   */
  private createContainerHierarchy(): void {
    if (!this.app) return;

    // Create UI container for screen-space UI elements
    this.uiContainer = new Container({ label: 'UI' });

    // Create camera container (transforms all world-space content)
    this.cameraContainer = new Container({ label: 'Camera' });

    // Create world container with render group for GPU transforms
    this.worldContainer = new Container({
      isRenderGroup: true,
      sortableChildren: true,
      label: 'World',
      // Hit area covers the entire map dimensions.
      hitArea: new Rectangle(0, 0, this.mapWidthPixels, this.mapHeightPixels),
    });

    // Create aboveGround render layer and register globally
    this.aboveGroundRenderLayer = new RenderLayer({ sortableChildren: true });
    this.aboveGroundRenderLayer.label = 'AboveGround';
    GlobalRenderLayers.aboveGround = this.aboveGroundRenderLayer;
    this.worldContainer.addChildAt(this.aboveGroundRenderLayer, 0);

    // Create weather container (world-space effects)
    this.weatherContainer = new Container({ label: 'Weather' });

    // Weather static container will be created by WeatherSystem
    this.weatherStaticContainer = new Container({ label: 'WeatherStatic' });

    // Vignette container for screen-edge darkening effect
    this.vignetteContainer = new Container({ label: 'Vignette' });
  }

  /**
   * Initialize all game systems in dependency order.
   */
  private initializeSystems(tiledMapData: tiled.Map): void {
    if (
      !this.app ||
      !this.worldContainer ||
      !this.uiContainer ||
      !this.cameraContainer ||
      !this.weatherContainer ||
      !this.vignetteContainer
    ) {
      throw new Error('[QuinoaEngine] Containers not initialized');
    }
    const map = get(mapAtom);

    // MapSystem - ground tiles (no dependencies)
    const mapSystem = new MapSystem(tiledMapData);
    this.groundContainer = mapSystem.getContainer();
    this.addSystem(mapSystem);

    // TileObjectSystem - plants, decor, eggs
    const tileObjectSystem = new TileObjectSystem(map, this.worldContainer);
    this.addSystem(tileObjectSystem);

    // BuildingSystem - Y-sorted buildings
    const buildingSystem = new BuildingSystem(
      tiledMapData,
      this.worldContainer
    );
    this.addSystem(buildingSystem);

    // PetSystem - pet sprites
    const petSystem = new PetSystem(this.worldContainer, tileObjectSystem);
    this.addSystem(petSystem);

    // AvatarSystem - player avatars
    const avatarSystem = new AvatarSystem(
      this.worldContainer,
      this.uiContainer,
      tileObjectSystem,
      buildingSystem,
      this.app.riveSpriteBatchRenderer,
      this.cameraContainer
    );
    this.addSystem(avatarSystem);

    // WeatherSystem - weather effects
    const weatherSystem = new WeatherSystem(
      this.app,
      this.weatherContainer,
      this.worldContainer
    );
    this.weatherStaticContainer = weatherSystem.getContainer();
    this.addSystem(weatherSystem);

    // VignetteSystem - screen-edge darkening effect
    const vignetteSystem = new VignetteSystem(this.app, this.vignetteContainer);
    this.addSystem(vignetteSystem);

    if (!this.touchInputSystem) {
      throw new Error('[QuinoaEngine] TouchInputSystem not initialized');
    }

    // EstablishingShotSystem - camera transitions
    const establishingShotSystem = new EstablishingShotSystem(this);
    this.addSystem(establishingShotSystem);

    // DirectionalInputSystem - keyboard and touch DPad
    const directionalInputSystem = new DirectionalInputSystem(
      this.uiContainer,
      this.touchInputSystem
    );
    this.addSystem(directionalInputSystem);

    // ZoomSystem - wheel and pinch-to-zoom
    const zoomSystem = new ZoomSystem(
      this.cameraContainer,
      this.app.canvas,
      this.touchInputSystem,
      establishingShotSystem,
      directionalInputSystem
    );
    this.addSystem(zoomSystem);

    // MovementSystem - Continuous player movement
    const movementSystem = new MovementSystem(map);
    this.addSystem(movementSystem);

    // PerfOverlay - user-facing FPS/ping display
    const perfOverlay = new PerfOverlay(this.uiContainer);
    this.addSystem(perfOverlay);

    // DebugOverlay - performance metrics display (if enabled)
    if (this.enableDebugOverlay) {
      const debugOverlay = new DebugOverlay(
        this.app.stage,
        this,
        tileObjectSystem
      );
      this.addSystem(debugOverlay);
    }

    // Build camera container hierarchy (z-order: ground < world)
    this.cameraContainer.addChild(
      this.groundContainer,
      this.worldContainer,
      this.weatherContainer
    );

    // TODO: make this less hacky
    this.cameraContainer.eventMode = 'static';
    for (const child of this.cameraContainer.children) {
      child.eventMode = 'none';
    }
    this.worldContainer.eventMode = 'static';

    // Stage hierarchy:
    // - zoomHitArea: Lowest z-order, receives input events
    // - cameraContainer: All world-space content (transformed together)
    // - weatherContainer: Screen-space weather tilemaps (above world, not camera-transformed)
    // - weatherStaticContainer: Screen-space weather color scrims
    // - vignetteContainer: Screen-edge darkening overlay
    // - uiContainer: Screen-space UI (highest z-order)
    this.app.stage.addChild(
      this.cameraContainer,
      this.weatherStaticContainer,
      this.vignetteContainer,
      this.uiContainer
    );
  }

  /**
   * Start the game loop.
   */
  start(): void {
    if (!this.app) {
      console.warn('[QuinoaEngine] Cannot start - not initialized');
      return;
    }

    this.tickerCallback = this.onTick.bind(this);
    this.app.ticker.add(this.tickerCallback);
    this.app.ticker.start();
  }

  /**
   * Stop the game loop.
   */
  stop(): void {
    if (this.app && this.tickerCallback) {
      this.app.ticker.stop();
      this.app.ticker.remove(this.tickerCallback);
      this.tickerCallback = null;
    }
  }

  // ==========================================================================
  // ZoomOverrideController implementation
  // ==========================================================================

  /**
   * Sets the zoom override value.
   * If set, this value will be used instead of the tileSizeAtom.
   */
  setZoomOverride(zoom: number | null): void {
    this.zoomOverride = zoom;
  }

  /**
   * Gets the current zoom override value.
   */
  getZoomOverride(): number | null {
    return this.zoomOverride;
  }

  /**
   * Main ticker callback - called every frame.
   */
  private onTick(_ticker: Ticker): void {
    if (this.isDestroyed || !this.app || !this.cameraContainer) return;

    const position = get(positionAtom);
    if (!position) return;

    const now = performance.now();
    const serverTime = calculateServerNow();
    // Use zoom override if active, otherwise use user preference from atom
    const tileSize = this.zoomOverride ?? get(tileSizeAtom);

    // Calculate delta time
    const deltaTime = this.lastFrameTime === 0 ? 0 : now - this.lastFrameTime;
    this.lastFrameTime = now;

    // Calculate camera transform
    const { x: targetX, y: targetY } = gridToWorldPixels(position);
    const transform = calculateCameraTransform(
      targetX,
      targetY,
      this.app.renderer.width,
      this.app.renderer.height,
      tileSize,
      this.mapWidthPixels,
      this.mapHeightPixels
    );

    // Apply camera transform
    this.cameraContainer.scale.set(transform.scale);
    this.cameraContainer.position.set(transform.x, transform.y);

    const zoomChanged = this.lastZoom !== transform.scale;

    const positionChanged =
      this.lastClampedX !== transform.clampedX ||
      this.lastClampedY !== transform.clampedY;

    // Check if camera changed (for viewport recalculation)
    const cameraChanged =
      zoomChanged || positionChanged || this.rendererResized;

    this.lastZoom = transform.scale;
    this.lastClampedX = transform.clampedX;
    this.lastClampedY = transform.clampedY;

    // Calculate effective tile size (used for viewport and throttling)
    const effectiveTileSize = transform.scale * TILE_SIZE_WORLD;

    // Recalculate viewport when camera changes
    if (cameraChanged || !this.cachedViewport) {
      const centerGridX =
        (transform.clampedX - TILE_SIZE_WORLD / 2) / TILE_SIZE_WORLD;
      const centerGridY =
        (transform.clampedY - TILE_SIZE_WORLD / 2) / TILE_SIZE_WORLD;

      this.cachedViewport = calculateTileViewport(
        this.app.renderer.width,
        this.app.renderer.height,
        effectiveTileSize,
        { x: centerGridX, y: centerGridY }
      );

      // Reset resize flag after handling
      this.rendererResized = false;
    }

    // Build context for systems
    const context = this.reusableContext;
    context.time = now;
    context.serverTime = serverTime;
    context.playerPosition = position;
    context.viewport = this.cachedViewport;
    context.deltaTime = deltaTime;
    context.weatherId = get(weatherAtom);
    context.zoomLevel = this.lastZoom;
    context.safeAreaInsets = this.safeAreaInsets;

    // Call draw() on all enabled systems
    this.callDraw(context);

    // Flush Rive batch renderer
    this.app.riveSpriteBatchRenderer.flushAll();

    // Throttled patch() calls via separate ticker
    this.cachedEffectiveTileSize = effectiveTileSize;
    this.cachedTargetUPS = this.calculateTargetUPS(effectiveTileSize);

    if (this.patchTicker) {
      // Update maxFPS dynamically based on zoom level
      this.patchTicker.maxFPS = this.cachedTargetUPS;

      // Store context for the patch callback
      this.patchContext = context;

      // Pump the patch ticker - it will only invoke listeners if enough time has passed
      this.patchTicker.update(now);
    }

    // Render
    this.app.render();
  }

  /**
   * Call draw() on all enabled systems.
   */
  private callDraw(context: QuinoaFrameContext): void {
    for (const [name, entry] of this.systems) {
      if (entry.enabled && entry.system.draw) {
        try {
          entry.system.draw(context);
        } catch (e) {
          console.error(`[QuinoaEngine] Error in ${name}.draw():`, e);
        }
      }
    }
  }

  /**
   * Call patch() on all enabled systems.
   */
  private callPatch(context: QuinoaFrameContext): void {
    if (this.patchDisabled) return;

    for (const [name, entry] of this.systems) {
      if (entry.enabled && entry.system.patch) {
        try {
          entry.system.patch(context);
        } catch (e) {
          console.error(`[QuinoaEngine] Error in ${name}.patch():`, e);
        }
      }
    }
  }

  /**
   * Calculate target UPS (updates per second) based on zoom level.
   * Uses square root curve from min to max tile size, keeping UPS
   * higher through most of the zoom range and dropping more steeply
   * only near minimum zoom. MAX_UPS only at full zoom in.
   *
   * @param tileSize - Current effective tile size in pixels
   * @returns Target UPS (10-60 based on zoom)
   */
  private calculateTargetUPS(tileSize: number): number {
    if (tileSize >= ZoomConfig.maxTileSize) {
      return MAX_UPS;
    }

    // Linear interpolation from minTileSize to maxTileSize
    const normalizedZoom = Math.max(
      0,
      Math.min(
        1,
        (tileSize - ZoomConfig.minTileSize) /
          (ZoomConfig.maxTileSize - ZoomConfig.minTileSize)
      )
    );

    return MIN_UPS + (MAX_UPS - MIN_UPS) * Math.sqrt(normalizedZoom);
  }

  // ==========================================================================
  // System Management API
  // ==========================================================================

  /**
   * Register a system with the engine.
   *
   * @param system - The system instance exposing a unique name
   */
  addSystem(system: QuinoaSystem): void {
    const { name } = system;
    if (this.systems.has(name)) {
      console.warn(`[QuinoaEngine] System '${name}' already registered`);
      return;
    }
    this.systems.set(name, { system, enabled: true });
  }

  /**
   * Enable or disable a system at runtime.
   *
   * @param name - Name of the system
   * @param enabled - Whether the system should be enabled
   */
  setSystemEnabled(name: string, enabled: boolean): void {
    const entry = this.systems.get(name);
    if (entry) {
      entry.enabled = enabled;
      console.log(
        `[QuinoaEngine] System '${name}' ${enabled ? 'enabled' : 'disabled'}`
      );
    } else {
      console.warn(`[QuinoaEngine] System '${name}' not found`);
    }
  }

  /**
   * Check if a system is enabled.
   *
   * @param name - Name of the system
   * @returns True if enabled, false if disabled or not found
   */
  isSystemEnabled(name: string): boolean {
    return this.systems.get(name)?.enabled ?? false;
  }

  /**
   * Get a system by name with type casting.
   *
   * @param name - Name of the system
   * @returns The system instance or undefined
   */
  getSystem<T extends QuinoaSystem>(name: string): T | undefined {
    return this.systems.get(name)?.system as T | undefined;
  }

  // ==========================================================================
  // Accessors for containers (used during system initialization)
  // ==========================================================================

  getWorldContainer(): Container | null {
    return this.worldContainer;
  }

  getUIContainer(): Container | null {
    return this.uiContainer;
  }

  getCachedViewport(): TileViewport | null {
    return this.cachedViewport;
  }

  // ==========================================================================
  // DebugMetricsProvider implementation
  // ==========================================================================

  /** Get the current target UPS based on zoom level. */
  getTargetUPS(): number {
    return this.cachedTargetUPS;
  }

  /** Get the current effective tile size in pixels. */
  getEffectiveTileSize(): number {
    return this.cachedEffectiveTileSize;
  }

  /** Check if patching is disabled. */
  isPatchDisabled(): boolean {
    return this.patchDisabled;
  }

  /** Set patch disabled state. */
  setPatchDisabled(disabled: boolean): void {
    this.patchDisabled = disabled;
  }

  /** Get the current renderer type (WebGPU/WebGL). */
  getRendererType(): string {
    if (!this.app) return 'Disconnected';
    return this.app.renderer.name;
  }

  // ==========================================================================
  // Cleanup
  // ==========================================================================

  /**
   * Destroy the engine and all systems.
   */
  destroy(): void {
    this.isDestroyed = true;
    console.log(
      `[QuinoaEngine] Destroying engine with ${this.systems.size} systems`
    );

    // Stop ticker
    this.stop();

    // Unsubscribe from atoms
    for (const unsub of this.unsubscribes) {
      unsub();
    }
    this.unsubscribes = [];

    // Destroy all systems (including DebugOverlay)
    for (const [name, entry] of this.systems) {
      try {
        entry.system.destroy();
      } catch (e) {
        console.error(`[QuinoaEngine] Error destroying ${name}:`, e);
      }
    }
    this.systems.clear();

    // Destroy patch ticker
    this.patchTicker?.destroy();
    this.patchTicker = null;
    this.patchContext = null;

    // Clear global render layers
    GlobalRenderLayers.aboveGround = null;

    // Clear cache references
    this.canvasSpriteCache?.clear();
    this.canvasSpriteCache = null;
    this.gameTextureCache?.clear();
    this.gameTextureCache = null;

    // Destroy PixiJS app
    this.app?.destroy(
      { releaseGlobalResources: false, removeView: true },
      {
        children: true,
        context: true,
        texture: true,
        // These are 'shared' resources and destroying them can cause issues
        textureSource: false,
        style: false,
      }
    );
    this.app = null;

    // Clear container references
    this.cameraContainer = null;
    this.groundContainer = null;
    this.worldContainer = null;
    this.weatherContainer = null;
    this.weatherStaticContainer = null;
    this.vignetteContainer = null;
    this.uiContainer = null;
    this.aboveGroundRenderLayer = null;

    // TouchInputSystem is destroyed via systems map, but we clear ref
    this.touchInputSystem = null;
  }
}
