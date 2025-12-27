import { Center, Image } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import music from '@/assets/music/Skipp Whitman - Awkward - Instrumental Version.webm';
import { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_PictureGame.webp';
import wallpaperImage from './assets/Wallpaper_PictureGame.webp';
import GameDetailsImage1 from './assets/guava-gamedetails-image.png';
import Slide1 from './assets/howto/Slide1.png';
import Slide2 from './assets/howto/Slide2.png';
import Slide3 from './assets/howto/Slide3.png';

export default {
  type: 'Party',
  name: <Trans>The Picture Game</Trans>,
  primaryAccentColor: 'Green.Magic',
  secondaryAccentColor: 'Green.Pastel',
  thumbnailImage: Thumbnail,
  wallpaperImage,
  music,
  taglines: [<Trans>Connect the Clues</Trans>, <Trans>Cooperative</Trans>],
  description: (
    <Trans>
      Get four pictures and four words. <br />
      One person knows the secret picture and picks a word to give a clue.
      <br />
      <Center my="24px">
        <Image
          src={GameDetailsImage1}
          alt="Which picture best pairs with the word?"
          width="169px"
          height="236px"
        />
      </Center>
      The rest of the players must decipher the secret picture. Play as a team
      or compete against each other for the most points!
    </Trans>
  ),
  elevatorPitch: (
    <Trans>
      One person knows the secret picture. Can the rest figure it out with one
      clue?
    </Trans>
  ),
  quickBits: [
    {
      emoji: '⏱️',
      text: <Trans>5-10 mins</Trans>,
    },
    {
      emoji: '👥',
      text: <Trans>2+ players</Trans>,
    },
  ],
  minPlayers: 2,
  howToSlides: [
    {
      text: <Trans>Get four pictures and four words</Trans>,
      img: Slide1,
    },
    {
      text: (
        <Trans>
          The clue giver chooses one word to hint at the secret picture for the
          group
        </Trans>
      ),
      img: Slide2,
    },
    {
      text: <Trans>Deduce which is the secret picture and earn points</Trans>,
      img: Slide3,
    },
  ],
} satisfies GameMetaData;
