import { Trans } from '@lingui/react/macro';
import music from '@/assets/music/Amit Sagie - Chariot.webm';
import { GameMetaData } from '../types';
import ThumbnailA from './assets/Thumbnail_Infinicards.webp';
import wallpaperImage from './assets/Wallpaper_Infinicards.webp';

export default {
  type: 'Party',
  name: <Trans>Infinicards</Trans>,
  primaryAccentColor: 'Purple.Dark',
  secondaryAccentColor: 'Purple.Pastel',
  thumbnailImage: ThumbnailA,
  wallpaperImage,
  music,
  taglines: [<Trans>Fill-in-the-blank</Trans>, <Trans>Hilarious</Trans>],
  description: '',
  elevatorPitch: (
    <Trans>
      Turn your inside jokes into cards. First to three points wins!
    </Trans>
  ),
  minPlayers: 1,
  quickBits: [
    {
      emoji: '⏱️',
      text: <Trans>5-10 mins</Trans>,
    },
    {
      emoji: '👥',
      text: <Trans>1+ players</Trans>,
    },
  ],
  requiresOpenAI: true,
} satisfies GameMetaData;
