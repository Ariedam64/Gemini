import { Center, Image } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import music from '@/assets/music/Skipp Whitman - Patience - Instrumental Version.webm';
import { GameMetaData } from '../types';
import GameDetailsImage1 from './assets/GameDetailsImage1.png';
import Thumbnail from './assets/Thumbnail_Farkleberry.jpg';
import Slide0 from './assets/howto/Slide0.png';
import Slide1 from './assets/howto/Slide1.png';
import Slide2 from './assets/howto/Slide2.png';

export default {
  type: 'Party',
  name: <Trans>Farkleberry</Trans>,
  primaryAccentColor: 'Orange.Tangerine',
  secondaryAccentColor: 'Orange.Pastel',
  thumbnailImage: Thumbnail,
  taglines: [
    <Trans>Trivia</Trans>,
    <Trans>Funny</Trans>,
    <Trans>Competition</Trans>,
  ],
  music,
  elevatorPitch: (
    <>
      <Trans>
        Can you pick out the <em>real</em> answers from the fake ones?
      </Trans>
    </>
  ),
  description: (
    <>
      <Trans>
        Out of ten answers for a trivia category, pick out all the answers that
        you think are true.
      </Trans>
      <Center my="24px">
        <Image
          src={GameDetailsImage1}
          alt="Stack of cards"
          width="214px"
          height="228px"
        />
      </Center>
      <Trans>
        Earn points for every real answer you pick and lose points for every
        answer you are tricked by. Don't get got!
      </Trans>
    </>
  ),
  minPlayers: 1,
  quickBits: [
    {
      emoji: '⏱️',
      text: <Trans>2-5 mins</Trans>,
    },
    {
      emoji: '💭',
      text: <Trans>Trivia</Trans>,
    },
    {
      emoji: '🏆',
      text: <Trans>Compete</Trans>,
    },
  ],
  howToSlides: [
    {
      text: <Trans>Choose all answers that fit the prompt</Trans>,
      img: Slide0,
    },
    {
      text: <Trans>Don't get tricked by the fake answers</Trans>,
      img: Slide1,
    },
    {
      text: <Trans>Get more points than your friends</Trans>,
      img: Slide2,
    },
  ],
} satisfies GameMetaData;
