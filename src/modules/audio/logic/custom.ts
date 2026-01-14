/**
 * Custom Audio - Play custom audio files (notifications, alerts, etc.)
 */

import type { CustomAudioPlayOptions, CustomAudioHandle } from "../types";

let currentCustomAudio: CustomAudioHandle | null = null;

export async function playCustomAudio(
  url: string,
  opts: CustomAudioPlayOptions = {}
): Promise<CustomAudioHandle> {
  // Stop any currently playing custom audio
  stopCustomAudio();

  const audio = new Audio(url);
  audio.volume = opts.volume ?? 1;
  audio.loop = opts.loop ?? false;

  const handle: CustomAudioHandle = {
    audio,
    url,
    stop: () => {
      audio.pause();
      audio.currentTime = 0;
      if (currentCustomAudio?.audio === audio) {
        currentCustomAudio = null;
      }
    },
    setVolume: (volume: number) => {
      audio.volume = Math.max(0, Math.min(1, volume));
    },
    isPlaying: () => !audio.paused && !audio.ended,
  };

  currentCustomAudio = handle;

  try {
    await audio.play();
  } catch (error) {
    console.error("[MGAudio] Failed to play custom audio:", error);
    currentCustomAudio = null;
    throw error;
  }

  // Auto-cleanup when audio ends (if not looping)
  if (!opts.loop) {
    audio.addEventListener("ended", () => {
      if (currentCustomAudio?.audio === audio) {
        currentCustomAudio = null;
      }
    });
  }

  return handle;
}

export function stopCustomAudio(): boolean {
  if (!currentCustomAudio) return false;

  currentCustomAudio.stop();
  currentCustomAudio = null;
  return true;
}

export function setCustomAudioVolume(volume: number): boolean {
  if (!currentCustomAudio) return false;

  currentCustomAudio.setVolume(volume);
  return true;
}

export function isCustomAudioPlaying(): boolean {
  return currentCustomAudio?.isPlaying() ?? false;
}

export function getCustomAudioHandle(): CustomAudioHandle | null {
  return currentCustomAudio;
}
