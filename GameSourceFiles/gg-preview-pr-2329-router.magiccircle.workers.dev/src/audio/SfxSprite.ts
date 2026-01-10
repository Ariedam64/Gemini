import { filters, Sound } from '@pixi/sound';
import { Assets } from 'pixi.js';
import { SfxName } from './types';

/**
 * Options for playing a sound effect with spatial audio properties.
 */
export interface SfxPlayOptions {
  /**
   * The volume level for playback (0 to 1).
   * @default 1
   */
  volume?: number;
  /**
   * Stereo panning position (-1 = full left, 0 = center, 1 = full right).
   * When specified, applies a StereoFilter to the sound for positional audio.
   * @default undefined (no panning applied)
   */
  pan?: number;
}

/**
 * Represents an audiosprite atlas mapping sprite names to their time ranges.
 * Each entry maps a sprite name to an object containing the start and end times
 * (in seconds) for that sprite within the audio file.
 */
type AudiospriteAtlas = Record<string, { start: number; end: number }>;

/**
 * Sound effect sprite manager for playing audiosprite-based sound effects.
 *
 * Unlike AudioTrack which manages looping background audio, SfxSprite manages
 * a sprite sheet of short sound effects packed into a single audio file.
 * This is more efficient than loading dozens of individual sound files.
 *
 * The sprite sheet is loaded once and individual sprites are played on demand.
 * Supports variant sounds (e.g., multiple footstep sounds) for variety.
 */
export class SfxSprite {
  private name: string | null = null;
  private sound: Sound | null = null;
  private atlas: AudiospriteAtlas | null = null;
  private variantCache: { [K in SfxName]?: readonly SfxName[] } = {};
  private loadState:
    | 'uninitialized'
    | 'loading'
    | 'loaded'
    | 'unloading'
    | 'error' = 'uninitialized';

  /**
   * Creates an SfxSprite manager for sound effect playback
   * @param assetName - The name of the sprite sheet asset to load (e.g., 'sfx')
   */
  constructor(private readonly assetName: string) {}

  /**
   * Loads the sound effect sprite sheet from the PixiJS Assets system.
   * If the sprite sheet is already loaded, this function does nothing.
   *
   * The sprite sheet consists of two assets:
   * - The audio file (e.g., 'sfx')
   * - The atlas JSON mapping sprite names to time ranges (e.g., 'sfx-atlas')
   *
   * @returns Promise that resolves after the sprite sheet is loaded and ready
   */
  async load(): Promise<void> {
    if (this.loadState !== 'uninitialized') return;
    this.loadState = 'loading';

    let sound: Sound;
    let atlas: AudiospriteAtlas;

    try {
      [sound, atlas] = await Promise.all([
        Assets.load<Sound>(this.assetName),
        Assets.load<AudiospriteAtlas>(this.assetName + '-atlas'),
      ]);
    } catch (error) {
      this.loadState = 'error';
      throw error;
    }

    sound.addSprites(atlas);

    this.name = this.assetName;
    this.sound = sound;
    this.atlas = atlas;
    this.loadState = 'loaded';
  }

  /**
   * Unloads the currently loaded sprite sheet, if any.
   * Stops any playing sound effects and releases assets from memory.
   *
   * @returns Promise that resolves after the sprite sheet is unloaded
   */
  async unload(): Promise<void> {
    if (this.loadState !== 'loaded' || !this.name) return;
    this.loadState = 'unloading';

    try {
      await Promise.all([
        Assets.unload(this.name),
        Assets.unload(this.name + '-atlas'),
      ]);
      this.loadState = 'uninitialized';
    } catch (error) {
      this.loadState = 'error';
      throw error;
    }
    this.name = null;
    this.sound = null;
    this.atlas = null;
    this.variantCache = {};
    this.loadState = 'uninitialized';
  }

  /**
   * Plays a sound effect sprite by name with optional spatial audio properties.
   * If the sprite has variants defined in sfxVariants, a random variant is selected.
   * If no sprite sheet is loaded, this function does nothing.
   *
   * @param name - The sprite name to play (e.g., 'Footstep', 'PlantSeed')
   * @param options - Playback options including volume and stereo panning
   *
   * @example
   * ```ts
   * // Play with volume only
   * sfxSprite.play('Footstep', { volume: 0.8 });
   *
   * // Play with positional audio (sound from the right)
   * sfxSprite.play('Footstep', { volume: 0.6, pan: 0.5 });
   * ```
   */
  async play(name: SfxName, options: SfxPlayOptions = {}): Promise<void> {
    if (this.loadState !== 'loaded' || !this.name) return;

    const variant = this.getVariant(name);
    const { volume = 1, pan } = options;

    // Build play options - volume is set from the start to avoid pops
    const playOptions: Parameters<Sound['play']>[0] = {
      sprite: variant,
      volume,
    };

    // Apply stereo filter for positional audio when pan is specified
    if (pan !== undefined) {
      playOptions.filters = [new filters.StereoFilter(pan)];
    }

    await this.sound?.play(playOptions);
  }

  /**
   * Stops all currently playing sound effects.
   */
  stop(): void {
    this.sound?.stop();
  }

  /**
   * Returns true if the sprite sheet is loaded and ready to play sounds.
   */
  get isLoaded(): boolean {
    return this.loadState === 'loaded';
  }

  /**
   * Gets a random variant of the sound effect if variants exist,
   * otherwise returns the original name.
   *
   * This method uses a two-tier lookup strategy:
   * 1. First checks sfxVariants for pre-defined variant mappings
   * 2. If not found, dynamically searches the atlas for variants using regex
   *    matching pattern: {name}_A, {name}_B, etc. (e.g., Footstep_A, Footstep_B)
   * 3. Caches the discovered variants in variantCache for future calls to avoid
   *    repeated regex searches
   *
   * @param name - The base sprite name (e.g., 'Footstep', 'PlantSeed')
   * @returns A randomly selected variant sprite name to play
   */
  private getVariant(name: SfxName): SfxName {
    if (!this.atlas) return name;

    let variants = this.variantCache[name];

    if (!variants) {
      const variantRegex = new RegExp(`^${name}_[A-Z]$`);

      variants = Object.keys(this.atlas).filter((key) =>
        variantRegex.test(key)
      ) as readonly SfxName[];

      if (variants.length) {
        this.variantCache[name] = variants;
      } else {
        this.variantCache[name] = variants = [name];
      }
    }

    return variants[Math.floor(Math.random() * variants.length)];
  }
}
