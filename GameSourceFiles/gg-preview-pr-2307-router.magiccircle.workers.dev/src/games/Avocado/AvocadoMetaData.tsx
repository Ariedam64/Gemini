import { Center, Image } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import music from '@/assets/music/Jamie Bathgate - Marigolds in May.webm';
import { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_QuestionGame.webp';
import wallpaperImage from './assets/Wallpaper_QuestionGame.webp';
import GameDetailsImage from './assets/avocado_gamedetails_img.png';
import Slide1 from './assets/howto/Slide1.png';
import Slide2 from './assets/howto/Slide2.png';
import Slide3 from './assets/howto/Slide3.png';
import Slide4 from './assets/howto/Slide4.png';
import Slide5 from './assets/howto/Slide5.png';

export default {
  type: 'Party',
  name: <Trans>The Question Game</Trans>,
  primaryAccentColor: '#cc295a',
  secondaryAccentColor: 'Red.Pastel',
  thumbnailImage: Thumbnail,
  wallpaperImage,
  music,
  taglines: [<Trans>Close Friends</Trans>, <Trans>Inside Jokes</Trans>],
  elevatorPitch: (
    <>
      <Trans>
        Answer silly questions about your friends and bet which they'll choose!
      </Trans>
    </>
  ),
  description: (
    <>
      <Trans>
        Each round, answer a prompt. Write something funny, what you really
        think, or what you think your friend would say.
        <Center my="24px">
          <Image
            src={GameDetailsImage}
            alt="If I were a vegatable, what would I be?"
            width="219px"
            height="158px"
          />
        </Center>
        Bet what answer you think they will choose. Get points if you're right
        or if you wrote the chosen answer. The player with the most points wins!
      </Trans>
    </>
  ),
  quickBits: [
    {
      emoji: '⏱️',
      text: <Trans>3+ mins</Trans>,
    },
    {
      emoji: '👥',
      text: <Trans>3+ players</Trans>,
    },
    {
      emoji: '🎤',
      text: <Trans>Talking</Trans>,
    },
  ],
  minPlayers: 3,
  howToSlides: [
    {
      text: <Trans>One player picks a prompt to ask</Trans>,
      img: Slide1,
    },
    {
      text: <Trans>Write answers that friend might give</Trans>,
      img: Slide2,
    },
    {
      text: <Trans>They secretly pick their favorite answer</Trans>,
      img: Slide3,
    },
    {
      text: <Trans>Guess which answer they picked</Trans>,
      img: Slide4,
    },
    {
      text: (
        <Trans>Earn points for correct guesses or for writing the answer</Trans>
      ),
      img: Slide5,
    },
  ],
} satisfies GameMetaData;
