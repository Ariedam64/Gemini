import { sound } from '@pixi/sound';
import { getDefaultStore, useAtomValue } from 'jotai';
import { useEffect } from 'react';
import { weatherAtom } from '@/Quinoa/atoms/baseAtoms';
import { quinoaEngineAtom } from '@/Quinoa/atoms/engineAtom';
import {
  isSoundEffectsMuteAtom,
  soundEffectsVolumeAtom,
  useAmbienceVolume,
  useIsAmbienceMute,
  useIsMusicMute,
  useMusicVolume,
  usePlayAudioInBackground,
} from '@/store/store';
import { AudioTrack } from './AudioTrack';
import { type SfxPlayOptions, SfxSprite } from './SfxSprite';
import type { AmbienceName, MusicName, SfxName } from './types';
import { weatherToAudioTracks } from './weatherIdToMusic';

/**
 * Options for the playSfx function.
 */
export interface PlaySfxOptions {
  /**
   * Overrides the system volume entirely with a fixed value (0 to 1).
   * When set, ignores the user's SFX volume setting.
   * Cannot be used together with `volumeMultiplier`.
   */
  volumeOverride?: number;
  /**
   * Multiplier applied to the system volume (0 to 1).
   * A value of 1 plays at full system volume, 0.5 plays at half.
   * Useful for distance-based volume falloff in positional audio.
   * Cannot be used together with `volumeOverride`.
   * @default 1
   */
  volumeMultiplier?: number;
  /**
   * Stereo panning position (-1 = full left, 0 = center, 1 = full right).
   * Useful for positional audio based on grid position differences.
   */
  pan?: number;
}

const { get } = getDefaultStore();

const musicTrack = new AudioTrack<MusicName>();
const ambienceTrack = new AudioTrack<AmbienceName>();
const sfxSprite = new SfxSprite('audio/sfx/sfx');

export function useQuinoaAudio() {
  const isPixiInitialized = useAtomValue(quinoaEngineAtom) !== null;
  const weather = useAtomValue(weatherAtom);
  const musicVolume = useMusicVolume();
  const isMusicMute = useIsMusicMute();
  const ambienceVolume = useAmbienceVolume();
  const isAmbienceMute = useIsAmbienceMute();
  const playAudioInBackground = usePlayAudioInBackground();

  useEffect(() => {
    sound.disableAutoPause = playAudioInBackground;
  }, [playAudioInBackground]);

  /************
   * Load SFX
   ************/
  useEffect(() => {
    if (!isPixiInitialized) return;
    void sfxSprite.load();
    return () => {
      void sfxSprite.unload();
    };
  }, [isPixiInitialized]);

  /***************************
   * Play Music and Ambience
   ***************************/
  useEffect(() => {
    if (!isPixiInitialized) return;
    const { music, ambience } = weatherToAudioTracks(weather);
    void musicTrack.play(music, isMusicMute ? 0 : musicVolume);
    void ambienceTrack.play(ambience, isAmbienceMute ? 0 : ambienceVolume);
  }, [isPixiInitialized, weather]);

  /********************************
   * Set Music Volume
   ********************************/
  useEffect(() => {
    if (!isPixiInitialized) return;
    const volume = isMusicMute ? 0 : musicVolume;
    musicTrack.setVolume(volume);
  }, [musicVolume, isMusicMute]);

  /********************************
   * Set Ambience Volume
   ********************************/
  useEffect(() => {
    if (!isPixiInitialized) return;
    const volume = isAmbienceMute ? 0 : ambienceVolume;
    ambienceTrack.setVolume(volume);
  }, [ambienceVolume, isAmbienceMute]);

  /********************************************************************
   * Clean up the music and ambience tracks when the component unmounts
   ********************************************************************/
  useEffect(
    () => () => {
      void musicTrack.stop();
      void ambienceTrack.stop();
    },
    []
  );
}

/**
 * Plays a sound effect by name with optional spatial audio properties.
 * The SFX sprite sheet must be loaded before calling this function.
 *
 * @param name - The sound effect name to play
 * @param options - Optional playback options for volume and stereo panning
 *
 * @example
 * ```ts
 * // Play with default system volume
 * playSfx('Footstep');
 *
 * // Play at half the system volume (e.g., distant sound)
 * playSfx('Footstep', { volumeMultiplier: 0.5 });
 *
 * // Play at a fixed volume, ignoring system settings
 * playSfx('Footstep', { volumeOverride: 0.3 });
 *
 * // Play with positional audio using calculateAudioProperties
 * const { volume, stereo } = calculateAudioProperties(playerPos, soundPos, 10);
 * playSfx('Footstep', { volumeMultiplier: volume, pan: stereo });
 * ```
 */
export function playSfx(name: SfxName, options?: PlaySfxOptions): void {
  // If pixi.disableAutoPause is false (the default), sound effects that are
  // while the game is "paused" (i.e. the page is hidden or blurred) will be
  // queued and will play when the game is unpaused. This can lead to a sudden
  // barrage of sound effects when refocusing the page Those sound effects were
  // probably time-sensitive and are no longer relevant when refocusing the page
  // So, we don't want to queue them up.
  const willSoundsPlayWhileHiddenOrBlurred = !sound.disableAutoPause;
  if (willSoundsPlayWhileHiddenOrBlurred && document.hidden) return;

  if (!sfxSprite.isLoaded) return;
  const isSfxMute = get(isSoundEffectsMuteAtom);
  const sfxVolume = get(soundEffectsVolumeAtom);
  const systemVolume = isSfxMute ? 0 : sfxVolume;

  // Calculate final volume:
  // - volumeOverride: use exact value, bypassing system volume
  // - volumeMultiplier: scale system volume by multiplier
  // - neither: use system volume as-is
  let finalVolume: number;
  if (options?.volumeOverride !== undefined) {
    finalVolume = options.volumeOverride;
  } else {
    const multiplier = options?.volumeMultiplier ?? 1;
    finalVolume = systemVolume * multiplier;
  }

  const sfxOptions: SfxPlayOptions = {
    volume: finalVolume,
    pan: options?.pan,
  };

  void sfxSprite.play(name, sfxOptions);
}
