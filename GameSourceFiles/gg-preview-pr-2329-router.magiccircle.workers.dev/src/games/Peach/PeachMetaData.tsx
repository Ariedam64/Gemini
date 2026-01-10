import { Trans } from '@lingui/react/macro';
import music from '@/assets/music/Dan Mayo - The Harvest.webm';
import { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_MiningGame.webp';
import Wallpaper from './assets/Wallpaper_MiningGame.webp';

const PeachMetaData: GameMetaData = {
  type: 'Daily',
  name: <Trans>Mining (Beta)</Trans>,
  primaryAccentColor: 'Blue.Dark',
  secondaryAccentColor: 'Blue.Pastel',
  thumbnailImage: Thumbnail,
  wallpaperImage: Wallpaper,
  minPlayers: 1,
  music,
};

export default PeachMetaData;
