import { Trans } from '@lingui/react/macro';
import music from '@/assets/music/Amit Sagie - Chariot.webm';
import { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_HugeManatees.webp';
import wallpaperImage from './assets/Wallpaper_HugeManatees.webp';
import Slide1 from './assets/howto/Slide1.png';
import Slide2 from './assets/howto/Slide2.png';
import Slide3 from './assets/howto/Slide3.png';
import Slide4 from './assets/howto/Slide4.png';

export default {
  type: 'Party',
  name: <Trans>Huge Manatees</Trans>,
  primaryAccentColor: 'Purple.Dark',
  secondaryAccentColor: 'Purple.Pastel',
  thumbnailImage: Thumbnail,
  wallpaperImage,
  music,
  taglines: [<Trans>Fill-in-the-blank</Trans>, <Trans>Hilarious</Trans>],
  description: '',
  elevatorPitch: <Trans>Play the funniest card to win!</Trans>,
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
  howToSlides: [
    {
      img: Slide1,
      imgAlt: (
        <Trans>
          Each round, a JUDGE player submits a wacky PROMPT CARD that features a
          blank space.
        </Trans>
      ),
      isFullScreenImage: true,
    },
    {
      img: Slide2,
      imgAlt: (
        <Trans>
          Other players each choose a FILLER CARD that best "fills in the blank"
        </Trans>
      ),
      isFullScreenImage: true,
    },
    {
      img: Slide3,
      imgAlt: (
        <Trans>
          The JUDGE then chooses which FILLER CARD matches the PROMPT CARD. The
          player who submitted the best card gets A POINT!
        </Trans>
      ),
      isFullScreenImage: true,
    },
    {
      img: Slide4,
      imgAlt: (
        <Trans>
          Need new cards? Use our AI-POWERED DECK GENERATOR to make your own!
        </Trans>
      ),
      isFullScreenImage: true,
    },
  ],
} satisfies GameMetaData;
