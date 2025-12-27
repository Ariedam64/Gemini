import { Trans } from '@lingui/react/macro';
import { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_King.webp';
import Wallpaper from './assets/Wallpaper_King.webp';

const NectarineMetaData: GameMetaData = {
  type: 'Daily',
  name: <Trans>King</Trans>,
  primaryAccentColor: 'Purple.Dark',
  secondaryAccentColor: 'Purple.Pastel',
  thumbnailImage: Thumbnail,
  minPlayers: 1,
  wallpaperImage: Wallpaper,
};

export default NectarineMetaData;
