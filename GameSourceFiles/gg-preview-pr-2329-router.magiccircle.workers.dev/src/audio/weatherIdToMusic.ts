import type { WeatherId } from '@/common/games/Quinoa/systems/weather/WeatherId';
import type { AmbienceName, MusicName } from './types';

type AudioTracks = {
  music: MusicName;
  ambience: AmbienceName;
};

const defaultAudioTracks: AudioTracks = {
  music: 'audio/music/ClearSkies',
  ambience: 'audio/ambience/ClearSkies',
};

const weatherIdToAudioTrackMapping: Record<WeatherId, AudioTracks> = {
  Rain: {
    music: 'audio/music/Rain',
    ambience: 'audio/ambience/Rain',
  },
  Frost: {
    music: 'audio/music/Snow',
    ambience: 'audio/ambience/Snow',
  },
  Dawn: {
    music: 'audio/music/Dawn',
    ambience: 'audio/ambience/Dawn',
  },
  AmberMoon: {
    music: 'audio/music/HarvestMoon',
    ambience: 'audio/ambience/HarvestMoon',
  },
};

/*
 * Helper function to get the AudioTracks for a given WeatherId
 */
export function weatherToAudioTracks(weatherId: WeatherId | null): AudioTracks {
  if (!weatherId) return defaultAudioTracks;
  return weatherIdToAudioTrackMapping[weatherId];
}
