import { Trans } from '@lingui/react/macro';
import music from '@/assets/music/MooveKa - Busy Day Ahead.webm';
import { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_RockTacToe.webp';
import wallpaperImage from './assets/Wallpaper_RockTacToe.webp';
import Slide1 from './assets/howto/Slide1.png';
import Slide2 from './assets/howto/Slide2.png';
import Slide3 from './assets/howto/Slide3.png';
import Slide4 from './assets/howto/Slide4.png';

export default {
  type: 'Party',
  name: <Trans>Rock-Tac-Toe</Trans>,
  primaryAccentColor: 'Blue.Magic',
  secondaryAccentColor: 'Blue.Pastel',
  thumbnailImage: Thumbnail,
  wallpaperImage,
  music,
  taglines: [<Trans>Quick</Trans>, <Trans>Teamwork</Trans>],
  description: <Trans>Play Tic-Tac-Toe with Rock Paper Scissors tiles.</Trans>,
  elevatorPitch: (
    <Trans>It's like Rock Paper Scissors and Tic-Tac-Toe had a baby!</Trans>
  ),
  minPlayers: 1,
  howToSlides: [
    {
      img: Slide1,
      imgAlt: <Trans>It's Rock Paper Scissors on a Tic-Tac-Toe grid</Trans>,
      isFullScreenImage: true,
    },
    {
      img: Slide2,
      imgAlt: <Trans>Earn a STAR by placing 3 tiles in a row</Trans>,
      isFullScreenImage: true,
    },
    {
      img: Slide3,
      imgAlt: <Trans>Battle opponents for grid spaces and break ties</Trans>,
      isFullScreenImage: true,
    },
    {
      img: Slide4,
      imgAlt: (
        <Trans>6+ stars (or highest at the end of 25 turns) = YOU WIN!</Trans>
      ),
      isFullScreenImage: true,
    },
  ],
  quickBits: [
    {
      emoji: '⏱️',
      text: <Trans>5 mins</Trans>,
    },
    {
      emoji: '👥',
      text: <Trans>2+ players</Trans>,
    },
    {
      emoji: '♟️',
      text: <Trans>Tactical</Trans>,
    },
  ],
} satisfies GameMetaData;
