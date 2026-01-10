import { Trans } from '@lingui/react/macro';
import { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_GlobalPoll.webp';
import Wallpaper from './assets/Wallpaper_GlobalPoll.webp';

const MangoMetaData: GameMetaData = {
  type: 'Daily',
  name: <Trans>Global Poll</Trans>,
  primaryAccentColor: 'Green.Dark',
  secondaryAccentColor: 'Green.Pastel',
  thumbnailImage: Thumbnail,
  minPlayers: 1,
  wallpaperImage: Wallpaper,
};

export default MangoMetaData;
