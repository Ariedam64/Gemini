import { Trans } from '@lingui/react/macro';
import type { GameMetaData } from '../types';
import Thumbnail from './assets/Thumbnail_MagicGarden.webp';
import Wallpaper from './assets/Wallpaper_GardenGame.webp';

export default {
  type: 'Grind',
  name: <Trans>Magic Garden</Trans>,
  primaryAccentColor: 'Green.Dark',
  secondaryAccentColor: 'Green.Pastel',
  thumbnailImage: Thumbnail,
  wallpaperImage: Wallpaper,
  minPlayers: 1,
  taglines: [<Trans>Farming</Trans>, <Trans>Multiplayer</Trans>],
  elevatorPitch: (
    <>
      <Trans>
        Buy and plant seeds (they'll grow offline too!) and watch the money roll
        in
      </Trans>
    </>
  ),
} satisfies GameMetaData;
