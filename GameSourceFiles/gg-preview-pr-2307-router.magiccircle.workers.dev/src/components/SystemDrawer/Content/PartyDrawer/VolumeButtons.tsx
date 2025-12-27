import {
  Box,
  type Icon as ChakraIcon,
  IconButton,
  useToken,
} from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { type Icon as FeatherIcon, Volume1, VolumeX } from 'react-feather';
import { setAllMusicVolume } from '@/audio/legacy/music/music';
import { setAllSoundEffectsVolume } from '@/audio/legacy/soundEffects/soundEffect';
import { playSfx } from '@/audio/useQuinoaAudio';
import McFlex from '@/components/McFlex/McFlex';

interface VolumeButtonsProps {
  type: 'Music' | 'Ambience' | 'SoundEffects';
  IconComponent: typeof ChakraIcon | FeatherIcon;
  count: number;
  isMute: boolean;
  volume: number;
  setVolume: (value: number) => void;
  setMute: (value: boolean) => void;
}

const VolumeButtons: React.FC<VolumeButtonsProps> = ({
  type,
  IconComponent,
  count,
  isMute,
  volume,
  setVolume,
  setMute,
}) => {
  const [MagicPurple, NeutralGrey, LightPurple, NeutralLightGrey] = useToken(
    'colors',
    ['Purple.Magic', 'Neutral.Grey', 'Purple.Pastel', 'Neutral.LightGrey']
  );

  /*
    We use exponential scaling for volume because our perception of loudness is logarithmic.
    By scaling the volume exponentially, each step in the volume level is perceived as a consistent increase in loudness.
  */
  const minimumVolume = 0.001;
  const maxVolume = 0.2;
  // Growth rate is derived from the requirement that the volume should start at minimumVolume and reach maxVolume (i.e., 1) at the final count minus 1 (because index starts at 0)
  const volumeIncreaseFactor = (maxVolume / minimumVolume) ** (1 / (count - 1));

  const getButtonVolume = (index: number) => {
    // Apply the exponential function to the index to calculate the volume
    const volume = minimumVolume * volumeIncreaseFactor ** index;
    return volume;
  };

  const getColor = (index: number) => {
    if (getButtonVolume(index) > volume || isMute) {
      return NeutralLightGrey;
    } else {
      return LightPurple;
    }
  };

  const getFill = (index: number) => {
    if (getButtonVolume(index) > volume || isMute) {
      return NeutralGrey;
    } else {
      return MagicPurple;
    }
  };

  const handleOnClick = (index: number) => {
    setVolume(getButtonVolume(index));
    setMute(false);
    if (type === 'SoundEffects') {
      playSfx('Button_Main');
      // set volume for sound effects since it could be currently playing, i.e., Quinoa background sound effect
      setAllSoundEffectsVolume();
    } else if (type === 'Ambience') {
      // TODO: implement ambience volume setting or rip it all out
      // setAllAmbienceVolume();
    } else if (type === 'Music') {
      // set volume for music since it could be currently playing.
      setAllMusicVolume();
    }
  };

  const handleMuteClick = () => {
    setMute(!isMute);
    if (type === 'SoundEffects') {
      playSfx('Button_Main');
      // set volume for sound effects since it could be currently playing, i.e., Quinoa background sound effect
      setAllSoundEffectsVolume();
    } else if (type === 'Music') {
      setAllMusicVolume();
    }
  };

  return (
    <McFlex gap={2} flexDirection="row" orient="right">
      <Box position="relative" top={1}>
        {isMute ? (
          <IconButton
            aria-label={t`Mute`}
            icon={<VolumeX />}
            variant="icon"
            onClick={handleMuteClick}
          />
        ) : (
          <IconButton
            variant="icon"
            aria-label={t`Mute`}
            icon={<Volume1 />}
            onClick={handleMuteClick}
          />
        )}
      </Box>
      {Array.from({ length: count }, (_, index) => (
        <IconButton
          key={getButtonVolume(index)}
          variant="icon"
          aria-label={t`Volume`}
          icon={
            <IconComponent
              color={getColor(index)}
              fill={getFill(index)}
              size={15 + index}
            />
          }
          onClick={() => handleOnClick(index)}
        />
      ))}
    </McFlex>
  );
};

export default VolumeButtons;
