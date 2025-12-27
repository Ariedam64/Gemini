import { Trans } from '@lingui/react/macro';
import { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_BigQuestion.webp';
import Wallpaper from './assets/Wallpaper_BigQuestion.webp';

const AvocadoMiniMetaData: GameMetaData = {
  type: 'Daily',
  name: <Trans>The Daily Question</Trans>,
  primaryAccentColor: 'Yellow.Dark',
  secondaryAccentColor: 'Yellow.Pastel',
  thumbnailImage: Thumbnail,
  minPlayers: 1,
  wallpaperImage: Wallpaper,
};

export default AvocadoMiniMetaData;
