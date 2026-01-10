import { isMusicMuteAtom, musicVolumeAtom } from '@/store/store';
import {
  Audio,
  isAudioDisabledDueToMemoryPressure,
  isMusicDisabledDueToMemoryPressure,
  pausePlayingAll,
  playAudioUrl,
  setAllVolume,
  stopPlayingAll,
} from '../audio';

const musicAudioCache: Partial<Record<string, Audio>> = {};

export function playMusic(url: string) {
  if (
    isAudioDisabledDueToMemoryPressure ||
    isMusicDisabledDueToMemoryPressure
  ) {
    return;
  }
  playAudioUrl({
    audioCache: musicAudioCache,
    url,
    volumeAtom: musicVolumeAtom,
    muteAtom: isMusicMuteAtom,
    options: {
      loop: true,
    },
  });
}

export function setAllMusicVolume() {
  setAllVolume(musicAudioCache, musicVolumeAtom, isMusicMuteAtom);
}

export function stopPlayingAllMusic() {
  stopPlayingAll({ audioCache: musicAudioCache, shouldClearCache: true });
}

export function pausePlayingAllMusic() {
  pausePlayingAll({ audioCache: musicAudioCache });
}
