import type { IMediaInstance, Sound } from '@pixi/sound';
import { Assets } from 'pixi.js';

/**
 * Generic audio track manager for looping background audio (music, ambience, etc.)
 *
 * Important distinction between Sound and IMediaInstance:
 * - Sound: The audio asset loaded from the file system. This is the "template"
 *   that can be played multiple times. Setting properties on Sound (like volume)
 *   only affects *future* playback instances created from it.
 *
 * - IMediaInstance: The actual playing instance returned by sound.play().
 *   This represents one specific playback of the sound. To control currently
 *   playing audio (volume, pause, stop), you must use the IMediaInstance.
 *
 * Volume hierarchy in @pixi/sound:
 *   Final volume = instanceVolume � soundVolume � globalVolume
 *
 * This is why we store both:
 * - sound: For asset management and cleanup
 * - instance: For runtime playback control (volume, stop, etc.)
 */
export class AudioTrack<T extends string = string> {
  private name: T | null = null;
  private sound: Sound | null = null;
  private instance: IMediaInstance | null = null;

  /**
   * Plays an audio track by name from the PixiJS Assets system.
   * If the requested track is already playing, it does nothing.
   * Ensures any previous track is stopped and unloaded before playing the new track.
   *
   * @param name - The name of the track to play
   * @returns Promise that resolves after the track is started
   */
  async play(name: T, volume: number): Promise<void> {
    if (this.name === name) return;

    await this.stop();

    const sound = await Assets.load<Sound>(name);
    const instance = await sound.play({ volume, loop: true });

    this.name = name;
    this.sound = sound;
    this.instance = instance;
  }

  /**
   * Stops and unloads the currently playing track, if any.
   * Unloads the asset from memory and resets the internal state.
   *
   * @returns Promise that resolves after the track is stopped and unloaded
   */
  async stop(): Promise<void> {
    if (this.name) {
      this.sound?.stop();
      // Only unload the asset if it's still loaded
      if (Assets.get(this.name)) {
        await Assets.unload(this.name);
      }
      this.name = null;
      this.sound = null;
      this.instance = null;
    }
  }

  /**
   * Sets the volume of the currently playing track, if any.
   *
   * @param volume - The volume to set, between 0 and 1
   */
  setVolume(volume: number): void {
    if (this.instance) {
      this.instance.volume = volume;
    }
  }

  /**
   * Gets the name of the currently playing track, or null if nothing is playing.
   */
  get currentTrack(): T | null {
    return this.name;
  }

  /**
   * Returns true if a track is currently playing.
   */
  get isPlaying(): boolean {
    return this.name !== null;
  }
}
