import { HowlOptions } from 'howler';
import { getDefaultStore } from 'jotai';
import { isSoundEffectsMuteAtom, soundEffectsVolumeAtom } from '@/store/store';
import { getRoomServerApiRoot } from '@/utils';
import {
  Audio,
  createAudio,
  isAudioDisabledDueToMemoryPressure,
  pausePlayingAll,
  playAudio,
  setAllVolume,
  stopPlayingAll,
} from '../audio';
import soundEffectsUrls, { SoundEffectsName } from './soundEffectsUrls';

const soundEffects: Partial<Record<SoundEffectsName, Audio>> = {};

export function playSoundEffect(
  name: SoundEffectsName,
  options?: Partial<HowlOptions>
): Audio | undefined {
  if (isAudioDisabledDueToMemoryPressure) {
    return;
  }
  return playAudio({
    audioCache: soundEffects,
    urls: soundEffectsUrls,
    volumeAtom: soundEffectsVolumeAtom,
    muteAtom: isSoundEffectsMuteAtom,
    name,
    options,
  });
}

function playAudioFromUrl(url: string): Audio | undefined {
  const { get } = getDefaultStore();
  const volume = get(soundEffectsVolumeAtom);
  const isMute = get(isSoundEffectsMuteAtom);
  const audio = createAudio(url, { format: ['mp3'] });
  audio.setVolume(volume);
  audio.setIsMute(isMute);
  audio.play();
  return audio;
}

export function playAudioFromKey(audioKey: string | undefined) {
  if (!audioKey) {
    return;
  }
  const audioUrl = `${getRoomServerApiRoot()}/audio/${audioKey}`;
  return playAudioFromUrl(audioUrl);
}

export function setAllSoundEffectsVolume() {
  setAllVolume(soundEffects, soundEffectsVolumeAtom, isSoundEffectsMuteAtom);
}

export function stopPlayingAllSoundEffects() {
  stopPlayingAll({ audioCache: soundEffects });
}

export function pausePlayingAllSoundEffects() {
  pausePlayingAll({ audioCache: soundEffects });
}
