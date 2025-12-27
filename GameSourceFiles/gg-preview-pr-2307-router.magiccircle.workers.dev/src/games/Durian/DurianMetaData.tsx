import { Center, Image } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import music from '@/assets/music/T. Bless & the Professionals - Secret Agent T.webm';
import { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_SpyGame.webp';
import wallpaperImage from './assets/Wallpaper_SpyGame.webp';
import GameDetailsImage1 from './assets/durian-gamedetails-image.png';
import Slide1 from './assets/howto/Slide1.png';
import Slide2 from './assets/howto/Slide2.png';
import Slide3 from './assets/howto/Slide3.png';
import Slide4 from './assets/howto/Slide4.png';
import Slide5 from './assets/howto/Slide5.png';

export default {
  type: 'Party',
  name: <Trans>The Spy Game</Trans>,
  primaryAccentColor: 'Yellow.Dark',
  secondaryAccentColor: 'Yellow.Pastel',
  thumbnailImage: Thumbnail,
  wallpaperImage,
  music,
  taglines: [<Trans>Social Deduction</Trans>, <Trans>Words</Trans>],
  description: (
    <>
      <Trans>
        Get a spread of words in one category. <br />
        Everyone except one person knows which word is the topic. <br />
        <Center my="24px">
          <Image
            src={GameDetailsImage1}
            alt="Example game screen"
            width="169px"
            height="236px"
          />
        </Center>
        Clue in that you know what the topic is without giving it away to the
        spy.
      </Trans>
    </>
  ),
  elevatorPitch: (
    <>
      <Trans>
        Figure out who doesn't know the secret word. If you don't, keep
        bluffing!
      </Trans>
    </>
  ),
  quickBits: [
    {
      emoji: '⏱️',
      text: <Trans>5-10 mins</Trans>,
    },
    {
      emoji: '👥',
      text: <Trans>3+ players</Trans>,
    },
  ],
  minPlayers: 3,
  howToSlides: [
    {
      text: <Trans>One word is the secret topic</Trans>,
      img: Slide1,
    },
    {
      text: <Trans>Everyone but the spy knows the secret topic</Trans>,
      img: Slide2,
    },
    {
      text: (
        <Trans>
          Give a one-word clue to convince everyone you know the topic
        </Trans>
      ),
      img: Slide3,
    },
    {
      text: <Trans>Vote for who you think is the spy</Trans>,
      img: Slide4,
    },
    {
      text: (
        <Trans>If caught, the spy can still win by guessing the topic</Trans>
      ),
      img: Slide5,
    },
  ],
} satisfies GameMetaData;
