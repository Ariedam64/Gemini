import { Howl, HowlOptions } from 'howler';
import { Atom, getDefaultStore } from 'jotai';
import { clamp, debounce } from 'lodash';
// import { platform, surface } from '@/environment';
import { SoundEffectsName } from './soundEffects/soundEffectsUrls';

const { get } = getDefaultStore();
// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
type AudioName = SoundEffectsName | string;

export const isAudioDisabledDueToMemoryPressure = false;
// surface === 'discord' && platform === 'mobile';

export const isMusicDisabledDueToMemoryPressure = false; // platform === 'mobile';

export function playAudio({
  audioCache,
  urls,
  volumeAtom,
  muteAtom,
  name,
  options,
}: {
  audioCache: Partial<Record<AudioName, Audio>>;
  urls: Partial<Record<AudioName, string>>;
  volumeAtom: Atom<number>;
  muteAtom: Atom<boolean>;
  name: AudioName;
  options?: Partial<HowlOptions> & { stereo?: number };
}) {
  const globalVolume = get(volumeAtom);
  const isMute = get(muteAtom);
  let audio = audioCache[name];
  // The volume from options is a scaler for the global volume
  const finalVolume =
    options?.volume !== undefined
      ? globalVolume * options.volume
      : globalVolume;

  if (audio) {
    audio.setVolume(finalVolume);
    if (options?.stereo !== undefined) {
      audio.setStereo(options.stereo);
    }
  } else {
    const url = urls[name];
    if (!url) {
      console.error(`No audio found for ${name}`);
      return;
    }
    const creationOptions = { ...options, volume: finalVolume };
    audio = createAudio(url, creationOptions);
    audioCache[name] = audio;
  }
  audio.setIsMute(isMute);
  audio.play();
  return audio;
}

export function playAudioUrl({
  audioCache,
  url,
  volumeAtom,
  muteAtom,
  options,
}: {
  audioCache: Partial<Record<AudioName, Audio>>;
  url: string;
  volumeAtom: Atom<number>;
  muteAtom: Atom<boolean>;
  options?: Partial<HowlOptions> & { stereo?: number };
}) {
  const globalVolume = get(volumeAtom);
  const isMute = get(muteAtom);
  let audio = audioCache[url];
  // The volume from options is a scaler for the global volume
  const finalVolume =
    options?.volume !== undefined
      ? globalVolume * options.volume
      : globalVolume;

  if (audio) {
    audio.setVolume(finalVolume);
    if (options?.stereo !== undefined) {
      audio.setStereo(options.stereo);
    }
  } else {
    const creationOptions = { ...options, volume: finalVolume };
    audio = createAudio(url, creationOptions);
    audioCache[url] = audio;
  }
  audio.setIsMute(isMute);
  audio.play();
  return audio;
}

export function setVolume(
  audioCache: Partial<Record<AudioName, Audio>>,
  volumeAtom: Atom<number>,
  muteAtom: Atom<boolean>,
  name: AudioName
) {
  const volume = get(volumeAtom);
  const isMute = get(muteAtom);
  const audio = audioCache[name];

  if (audio) {
    audio.setVolume(volume);
    audio.setIsMute(isMute);
  }
}

export function setAllVolume(
  audioCache: Partial<Record<AudioName, Audio>>,
  volumeAtom: Atom<number>,
  muteAtom: Atom<boolean>
) {
  const volume = get(volumeAtom);
  const isMute = get(muteAtom);

  for (const audio of Object.values(audioCache)) {
    if (audio) {
      audio.setVolume(volume);
      audio.setIsMute(isMute);
    }
  }
}

export function stopPlayingAll({
  audioCache,
  shouldClearCache,
}: {
  audioCache: Partial<Record<AudioName, Audio>>;
  shouldClearCache?: boolean;
}) {
  for (const audio of Object.values(audioCache)) {
    if (audio) {
      audio.stopPlaying();
    }
  }
  if (shouldClearCache) {
    Object.keys(audioCache).forEach((key) => {
      const audio = audioCache[key];
      if (audio) {
        audio.destroy();
      }
      delete audioCache[key];
    });
  }
}

export function pausePlayingAll({
  audioCache,
}: {
  audioCache: Partial<Record<AudioName, Audio>>;
}) {
  for (const audio of Object.values(audioCache)) {
    if (audio) {
      audio.pause();
    }
  }
}

export type Audio = {
  play: () => void;
  setVolume: (volume: number) => void;
  setIsMute: (isMute: boolean) => void;
  stopPlaying: () => void;
  setStereo: (pan: number) => void;
  destroy: () => void;
  pause: () => void;
};

// Note(avi): I tried making a useSoundEffect() hook (now renamed to createAudio, as of 05/17/2024 -xxl), but that introduces some
// noticeable delay because creating the Howl object is expensive. So, it's
// better to create the Howl object once and reuse it, hence this function.
export function createAudio(
  sound: string,
  options: Partial<HowlOptions> = { loop: false }
): Audio {
  const audio = new Howl({
    src: [sound],
    html5: false,
    mute: false,
    volume: 1,
    ...options,
  });
  // Debounce the sound effect for StrictMode
  const debouncedPlayAudio = debounce(() => audio.play(), 0);

  const setVolume = (volume: number) => {
    const clampedVolume = clamp(volume, 0, 1);
    audio.volume(clampedVolume);
  };
  const setStereo = (pan: number) => {
    audio.stereo(pan);
  };
  const setIsMute = (isMute: boolean) => {
    audio.mute(isMute);
  };
  const stopPlaying = () => {
    audio.stop();
  };
  const destroy = () => {
    audio.unload();
  };
  const pause = () => {
    audio.pause();
  };
  return {
    play: debouncedPlayAudio,
    setVolume,
    setIsMute,
    stopPlaying,
    setStereo,
    destroy,
    pause,
  };
}
