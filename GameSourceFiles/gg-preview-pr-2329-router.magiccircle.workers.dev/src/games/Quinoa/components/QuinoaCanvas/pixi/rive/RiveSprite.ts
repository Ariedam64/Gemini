import type {
  Alignment,
  Artboard,
  FileAsset as RiveFileAsset,
  StateMachineInstance,
} from '@rive-app/webgl2-advanced';
import { Assets, Sprite, type SpriteOptions } from 'pixi.js';
import { isDynamicImageAssetName } from '@/components/Avatars/AvatarRiveFileCache';
import type {
  LowLevelRive,
  LowLevelRiveFile,
  RiveImage,
  RiveImageAsset,
} from '@/utils/rive-utils';
import { getRiveRuntime, getStateMachineInputByName } from '@/utils/rive-utils';
import { resolveAssetAsBytes } from '../extensions/BytesAsset';
import type { IRiveBatchRenderer } from './IRiveBatchRenderer';

/**
 * Options for configuring how Rive renders the animation to the canvas texture.
 */
export interface RiveOptions {
  /** Square size for canvas region (mutually exclusive with width/height/scale) */
  size?: number;
  /** Width for canvas region (requires height, mutually exclusive with size/scale) */
  width?: number;
  /** Height for canvas region (requires width, mutually exclusive with size/scale) */
  height?: number;
  /** Scale factor based on artboard dimensions (mutually exclusive with size/width/height) */
  scale?: number;
  /** Rive alignment for rendering (default: rive.Alignment.center) */
  alignment?: Alignment;
  /** Whether to automatically register with batch renderer on creation (default: true) */
  autoRegister?: boolean;
}

/**
 * Options for creating a RiveSprite.
 * Extends standard PixiJS SpriteOptions for seamless integration.
 */
export interface RiveSpriteOptions extends Partial<SpriteOptions> {
  /**
   * Batch renderer for efficient rendering.
   * Access via `app.riveSpriteBatchRenderer` when using the plugin.
   */
  batchRenderer: IRiveBatchRenderer;
  /**
   * Path or URL to the Rive file to load.
   * Will be loaded via PixiJS Assets (cached) and decoded per sprite instance.
   */
  riveFileSrc: string;
  /** Artboard name from the Rive file (defaults to default artboard) */
  artboardName?: string;
  /** State machine name (defaults to first state machine on artboard) */
  stateMachineName?: string;
  /** Options for controlling Rive render size (canvas region allocation) */
  riveOptions?: RiveOptions;
}

/**
 * RiveSprite - A PixiJS Sprite that renders Rive animations.
 *
 * OPTIMIZED BATCH ARCHITECTURE:
 * - Extends Sprite for seamless PixiJS integration
 * - Uses RiveSpriteBatchRenderer for shared rendering
 * - Texture frame managed transparently by batch renderer
 * - draw() marks for batch rendering (doesn't render immediately)
 * - flushAll() renders all marked sprites in ONE batch with ONE upload
 *
 * FILE LOADING & CACHING:
 * - Rive file bytes loaded via PixiJS Assets (automatic caching)
 * - Each sprite gets its own decoded file instance (required for dynamic images)
 * - Image assets loaded via PixiJS Assets (cached and shared)
 *
 * PERFORMANCE CONTROL:
 * - riveOptions.size/width/height/scale controls canvas texture region (performance critical)
 * - Standard PixiJS properties (width, height, scale) control display size
 * - Can render at low resolution but display at high resolution
 *
 * @example
 * ```typescript
 * // Create sprite with batch renderer from app
 * const sprite = await RiveSprite.create({
 *   batchRenderer: app.riveSpriteBatchRenderer,
 *   riveFileSrc: 'avatar.riv',
 *   riveOptions: { size: 200 },  // Render at 200x200
 *   width: 400,                   // Display at 400px
 *   height: 400,
 *   anchor: 0.5
 * });
 *
 * // Load images into sprite using manifest aliases
 * await sprite.loadAndSetImage('Bottom', 'Bottom_Backpacking');
 * await sprite.loadAndSetImage('Mid', 'Mid_Axolotl');
 * await sprite.loadAndSetImage('Top', 'Top_Acorn');
 *
 * // Every frame:
 * sprite.draw(performance.now());  // Marks for batch render
 * // After ALL sprites have called draw():
 * app.riveSpriteBatchRenderer.flushAll();  // Batch renders + uploads
 * ```
 */
export class RiveSprite extends Sprite {
  // Rive resources (owned by this sprite)
  private rive: LowLevelRive;
  private batchRenderer: IRiveBatchRenderer;
  private riveFile: LowLevelRiveFile;
  private artboard: Artboard;
  private stateMachine: StateMachineInstance;
  private stateMachineName: string;

  // Rive rendering configuration
  private _riveRenderSize: { width: number; height: number };
  private riveAlignment: Alignment;

  // State machine state
  private _isPaused = false;
  private lastTimeMs = 0;
  /** Random time offset in milliseconds to stagger animations (0 to 2000ms) */
  private readonly timeOffsetMs: number;

  // Apparently we need *two* frames to run even while paused to ensure that
  // image updates are applied (from AvatarRenderer.ts)
  private numFramesToRunEvenWhilePaused = 0;

  // Image loading support
  private referencedRiveAssets: Map<string, RiveImageAsset>;
  private loadedPixiAssets = new Set<string>();

  /**
   * Private constructor - use RiveSprite.create() instead.
   * @private
   */
  private constructor(
    rive: LowLevelRive,
    batchRenderer: IRiveBatchRenderer,
    riveFile: LowLevelRiveFile,
    referencedRiveAssets: Map<string, RiveImageAsset>,
    artboard: Artboard,
    stateMachine: StateMachineInstance,
    renderSize: { width: number; height: number },
    alignment: Alignment,
    autoRegister: boolean,
    spriteOptions: Partial<SpriteOptions>
  ) {
    // Call Sprite constructor (texture will be set by registerSprite)
    super(spriteOptions);

    // Store Rive resources
    this.rive = rive;
    this.batchRenderer = batchRenderer;
    this.riveFile = riveFile;
    this.artboard = artboard;
    this.stateMachine = stateMachine;
    this.stateMachineName = stateMachine.name;
    this._riveRenderSize = renderSize;
    this.riveAlignment = alignment;
    this.referencedRiveAssets = referencedRiveAssets;
    // Random time offset to stagger animations (0 to 2000ms = 2 seconds)
    this.timeOffsetMs = Math.random() * 2000;

    // Register with batch renderer if autoRegister is true (default behavior)
    if (autoRegister) {
      this.batchRenderer.registerSprite(this);
    }
  }

  /**
   * Creates a new RiveSprite with automatic Rive file loading.
   *
   * Loads the Rive file via PixiJS Assets (with automatic caching) and
   * creates a fresh decoded instance with its own image asset references.
   * Each sprite gets an independent Rive file instance, required for
   * dynamic per-sprite image loading.
   *
   * @param options - Configuration options
   * @returns Promise that resolves to the created RiveSprite
   *
   * @example
   * ```typescript
   * // Uses shared batch renderer automatically
   * const sprite = await RiveSprite.create({
   *   riveFileSrc: 'avatar.riv',
   *   riveOptions: { size: 200 },
   *   anchor: 0.5,
   * });
   *
   * // Load images using manifest aliases
   * await sprite.loadAndSetImage('Bottom', 'Bottom_Backpacking');
   * await sprite.loadAndSetImage('Mid', 'Mid_Axolotl');
   * ```
   */
  static async create(options: RiveSpriteOptions): Promise<RiveSprite> {
    // Extract Rive-specific options
    const {
      batchRenderer,
      riveFileSrc,
      artboardName,
      stateMachineName,
      riveOptions,
      ...spriteOptions
    } = options;

    // Get Rive runtime from global singleton
    const rive = getRiveRuntime();

    const bytes = await Assets.load<ArrayBuffer>(
      resolveAssetAsBytes(riveFileSrc)
    );

    // Create asset loader to capture image references
    const referencedRiveImages = new Map<string, RiveImageAsset>();
    const loader = new rive.CustomFileAssetLoader({
      loadContents: (asset: RiveFileAsset) => {
        if (!asset.isImage || !isDynamicImageAssetName(asset.name)) {
          return false;
        }
        referencedRiveImages.set(asset.name, asset as RiveImageAsset);
        return true;
      },
    });

    // Decode Rive file (creates fresh instance per sprite)
    const riveFile = await rive.load(new Uint8Array(bytes), loader);

    // Get artboard
    const artboard = artboardName
      ? riveFile.artboardByName(artboardName)
      : riveFile.defaultArtboard();

    // Get state machine
    let stateMachine: StateMachineInstance;
    if (stateMachineName) {
      const sm = artboard.stateMachineByName(stateMachineName);
      if (!sm) {
        throw new Error(
          `State machine '${stateMachineName}' not found in artboard`
        );
      }
      stateMachine = new rive.StateMachineInstance(sm, artboard);
    } else {
      const sm = artboard.stateMachineByIndex(0);
      if (!sm) {
        throw new Error(
          'No state machine found. Please provide stateMachineName or ensure artboard has at least one state machine.'
        );
      }
      stateMachine = new rive.StateMachineInstance(sm, artboard);
    }

    // Calculate render size
    let renderSize: { width: number; height: number };
    if (riveOptions?.size !== undefined) {
      renderSize = { width: riveOptions.size, height: riveOptions.size };
    } else if (
      riveOptions?.width !== undefined &&
      riveOptions?.height !== undefined
    ) {
      renderSize = { width: riveOptions.width, height: riveOptions.height };
    } else if (riveOptions?.scale !== undefined) {
      renderSize = {
        width: artboard.width * riveOptions.scale,
        height: artboard.height * riveOptions.scale,
      };
    } else {
      renderSize = { width: artboard.width, height: artboard.height };
    }

    // Get alignment
    const alignment = riveOptions?.alignment ?? rive.Alignment.center;

    // Get autoRegister (defaults to true for backward compatibility)
    const autoRegister = riveOptions?.autoRegister ?? true;

    // Create sprite via private constructor
    return new RiveSprite(
      rive,
      batchRenderer,
      riveFile,
      referencedRiveImages,
      artboard,
      stateMachine,
      renderSize,
      alignment,
      autoRegister,
      spriteOptions
    );
  }

  /**
   * Gets the Rive render size (canvas region size).
   * Used by the batch renderer for allocation.
   */
  get riveRenderSize(): { width: number; height: number } {
    return this._riveRenderSize;
  }

  /**
   * Sets the Rive render size (canvas region size).
   * Automatically invalidates sprite packing to trigger reallocation.
   */
  set riveRenderSize(size: { width: number; height: number }) {
    this._riveRenderSize = {
      width: Math.floor(size.width),
      height: Math.floor(size.height),
    };

    // Notify batch renderer that packing is now invalid
    this.batchRenderer.invalidateSpritePacking(this);
  }

  /**
   * Advances state machne and marks for deferred batch rendering.
   * Call this every frame. Actual rendering happens in batchRenderer.flushAll().
   *
   * @param timeMs - Current time in milliseconds
   */
  draw(timeMs: number): void {
    const shouldAdvance = !this._isPaused;
    const shouldDraw = shouldAdvance || this.numFramesToRunEvenWhilePaused > 0;

    if (shouldAdvance) {
      // Apply time offset to stagger animations
      const offsetTimeMs = timeMs - this.timeOffsetMs;
      const elapsed =
        this.lastTimeMs === 0 ? 0 : (offsetTimeMs - this.lastTimeMs) / 1000;
      this.lastTimeMs = offsetTimeMs;
      this.stateMachine.advance(elapsed);
      this.artboard.advance(elapsed);
    }

    // Mark for batch rendering (doesn't render yet!)
    if (shouldDraw) {
      this.batchRenderer.markForRender(this);
      this.numFramesToRunEvenWhilePaused--;
    }
  }

  /**
   * Gets the artboard for this sprite.
   * Used by the batch renderer during rendering.
   *
   * @returns The Rive artboard
   */
  getArtboard(): Artboard {
    return this.artboard;
  }

  /**
   * Gets the Rive alignment for rendering.
   * Used by the batch renderer during rendering.
   *
   * @returns The Rive alignment
   */
  getRiveAlignment(): Alignment {
    return this.riveAlignment;
  }

  /**
   * Triggers a Rive trigger input (one-shot animation).
   *
   * @param name - Name of the trigger input in the state machine
   */
  triggerAnimation(name: string): void {
    const input = getStateMachineInputByName(this.stateMachine, name);
    if (input?.type === this.rive.SMIInput.trigger) {
      input.asTrigger().fire();
    } else {
      console.warn(`[RiveSprite] Input '${name}' is not a trigger`);
    }
  }

  /**
   * Sets a Rive boolean input (toggle animation).
   *
   * @param name - Name of the boolean input in the state machine
   * @param isOn - New value for the boolean
   */
  toggleAnimation(name: string, isOn: boolean): void {
    const input = getStateMachineInputByName(this.stateMachine, name);
    if (input?.type === this.rive.SMIInput.bool) {
      input.asBool().value = isOn;
    } else {
      console.warn(`[RiveSprite] Input '${name}' is not a boolean`);
    }
  }

  /**
   * Sets a Rive numeric input.
   *
   * @param name - Name of the numeric input in the state machine
   * @param value - New numeric value
   */
  setInput(name: string, value: number): void {
    const input = getStateMachineInputByName(this.stateMachine, name);
    if (input?.type === this.rive.SMIInput.number) {
      input.asNumber().value = value;
    } else {
      console.warn(`[RiveSprite] Input '${name}' is not a number`);
    }
  }

  /**
   * Gets whether the animation is paused.
   */
  get isPaused(): boolean {
    return this._isPaused;
  }

  /**
   * Pauses the animation.
   * State machine is recreated to reset to initial state.
   */
  pause(): void {
    if (this._isPaused) return;
    this._isPaused = true;
    this.stateMachine.delete();

    // Recreate state machine to reset to initial state
    const sm = new this.rive.StateMachineInstance(
      this.artboard.stateMachineByName(this.stateMachineName),
      this.artboard
    );
    sm.advance(0);
    this.artboard.advance(0);
    this.stateMachine = sm;
  }

  /**
   * Resumes the animation.
   */
  resume(): void {
    if (!this._isPaused) return;
    this._isPaused = false;
  }

  /**
   * Advances the state machine and artboard by zero time.
   * Used to apply state changes (like expression updates) immediately.
   */
  advanceZero(): void {
    this.stateMachine.advance(0);
    this.artboard.advance(0);
  }

  /**
   * Called when an image asset is loaded.
   * Schedules frames to run even while paused to apply the image update.
   */
  onImageLoaded(): void {
    if (this._isPaused) {
      this.numFramesToRunEvenWhilePaused = 2;
    }
  }

  /**
   * Loads an image via PixiJS Assets and sets it into a Rive file asset reference.
   *
   * Uses PixiJS Assets system with the bytes loader to fetch the image
   * as raw bytes (instead of a Texture), then decodes with Rive. This provides:
   * - Automatic caching (via PixiJS Assets)
   * - Manifest/bundle support with alias resolution
   * - Base path resolution
   * - Works with external URLs
   *
   * The method automatically appends `?bytes` to the asset key to trigger
   * the bytes loader, which strips the suffix and resolves the real asset.
   *
   * If the referenced asset name doesn't exist in the Rive file,
   * logs a warning and returns without error.
   *
   * @param referencedRiveAssetName - Name of the asset reference in the Rive file (e.g., 'Bottom', 'Top')
   * @param pixiAssetKey - PixiJS asset alias or URL (e.g., 'Bottom_Backpacking', 'Mid_Axolotl')
   * @returns Promise that resolves when image is loaded and set
   *
   * @example
   * ```typescript
   * // Load from PixiJS Assets using manifest aliases
   * await sprite.loadAndSetImage('Bottom', 'Bottom_Backpacking');
   * await sprite.loadAndSetImage('Mid', 'Mid_Axolotl');
   * await sprite.loadAndSetImage('Top', 'Top_Acorn');
   *
   * // Load from external URL (e.g., Discord avatar)
   * await sprite.loadAndSetImage('Avatar', 'https://cdn.discord.com/avatars/123.png');
   * ```
   */
  async loadAndSetImage(
    referencedRiveAssetName: string,
    pixiAssetKey: string
  ): Promise<void> {
    const imageAsset = this.referencedRiveAssets.get(referencedRiveAssetName);
    if (!imageAsset) {
      const available =
        Array.from(this.referencedRiveAssets.keys()).join(', ') || 'none';
      console.warn(
        `[RiveSprite] No referenced asset named '${referencedRiveAssetName}' in Rive file. ` +
          `Available: ${available}. ` +
          `Did you forget to pass referencedRiveAssets to RiveSprite constructor?`
      );
      return;
    }

    const bytes = await Assets.load<ArrayBuffer>({
      src: [resolveAssetAsBytes(pixiAssetKey)],
      // specifying the parser is necessary when supplying an alias that
      // includes an image extension (e.g., 'Bottom_Backpacking.png')
      parser: 'bytes',
    });

    // Note: Not tracking for unload - PixiJS Assets handles caching/cleanup

    // Decode with Rive
    const riveImage = await this.decodeRiveImage(bytes);

    // Set in Rive
    imageAsset.setRenderImage(riveImage);

    // Unref the RiveImage to release the memory, since it's already been
    // provided to the RiveFile instance
    riveImage.unref();
  }

  /**
   * Decodes raw image bytes into a RiveImage using Rive's decoder.
   * @private
   */
  private async decodeRiveImage(bytes: ArrayBuffer): Promise<RiveImage> {
    return new Promise((resolve, reject) => {
      this.rive.decodeImage(new Uint8Array(bytes), (image) => {
        if (image) {
          resolve(image);
        } else {
          reject(new Error('[RiveSprite] Failed to decode image'));
        }
      });
    });
  }

  /**
   * Clears an image from a Rive file asset reference.
   * Sets the reference to null, removing the image from display.
   *
   * @param referencedRiveAssetName - Name of the asset reference in the Rive file
   *
   * @example
   * ```typescript
   * // Clear the avatar image
   * sprite.unsetImage('Avatar');
   * ```
   */
  unsetImage(referencedRiveAssetName: string): void {
    const imageAsset = this.referencedRiveAssets.get(referencedRiveAssetName);
    if (!imageAsset) {
      const available =
        Array.from(this.referencedRiveAssets.keys()).join(', ') || 'none';
      console.warn(
        `[RiveSprite] No referenced asset named '${referencedRiveAssetName}' in Rive file. ` +
          `Available: ${available}.`
      );
      return;
    }

    // Cast needed - Rive types don't allow null but it works
    imageAsset.setRenderImage(null as unknown as RiveImage);
  }

  /**
   * Unregisters this sprite from the batch renderer.
   * Used when sprite is culled to free canvas space.
   * This method is idempotent - safe to call multiple times.
   */
  unregisterFromBatchRenderer(): void {
    this.batchRenderer.unregisterSprite(this);
  }

  /**
   * Re-registers this sprite with the batch renderer.
   * Used when sprite becomes visible again after being culled.
   * This method is idempotent - safe to call multiple times.
   */
  registerWithBatchRenderer(): void {
    this.batchRenderer.registerSprite(this);
  }

  /**
   * Destroys this sprite and frees resources.
   */
  destroy(): void {
    // Unregister from batch renderer
    this.batchRenderer.unregisterSprite(this);

    // Unload any PixiJS assets we loaded
    for (const pixiAssetKey of this.loadedPixiAssets) {
      // Note: the cache key is for the bytes asset, not the original asset key
      const bytesAssetKey = resolveAssetAsBytes(pixiAssetKey);
      Assets.unload(bytesAssetKey).catch((err) => {
        console.warn(
          `[RiveSprite] Failed to unload PixiJS bytes asset ${bytesAssetKey} (original key: ${pixiAssetKey}):`,
          err
        );
      });
    }
    this.loadedPixiAssets.clear();

    // Destroy Rive resources
    this.stateMachine.delete();
    this.riveFile.unref();
    this.artboard.delete();

    // Call parent destroy (handles texture and other PixiJS resources)
    super.destroy({ texture: true });
  }
}
