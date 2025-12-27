// MOVE TO COMMON CLIENT FOLDER

import type { CosmeticColor } from '@/common/resources/cosmetic-colors';
import type Player from '@/common/types/player';
import type { Cosmetic } from '@/common/types/player';
import { getCosmeticSrc } from '@/cosmetics/getCosmeticSrc';
import colors from '@/theme/colors';
import { getContrastingColor } from '@/utils/getContrastingColor';

export type Decoration = {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  lightColor: string;
  bannerImageSrc: string;
  bannerUrl: string;
};

export type PlayerDecoration = Decoration & {
  background: string;
};

const decorations: Record<CosmeticColor, Decoration> = {
  Red: {
    primaryColor: colors.Red.Magic,
    backgroundColor: colors.Red.Dark,
    textColor: getContrastingColor(colors.Red.Dark),
    lightColor: colors.Red.Light,
    ...generateBannerStrings('Checkers'),
  },
  Orange: {
    primaryColor: colors.Orange.Magic,
    backgroundColor: colors.Orange.Dark,
    textColor: getContrastingColor(colors.Orange.Dark),
    lightColor: colors.Orange.Light,
    ...generateBannerStrings('Fire'),
  },
  Yellow: {
    primaryColor: colors.Yellow.Magic,
    backgroundColor: colors.Yellow.Dark,
    textColor: getContrastingColor(colors.Yellow.Dark),
    lightColor: colors.Yellow.Light,
    ...generateBannerStrings('StarsYellow'),
  },
  Green: {
    primaryColor: colors.Green.Magic,
    backgroundColor: colors.Green.Dark,
    textColor: getContrastingColor(colors.Green.Dark),
    lightColor: colors.Green.Light,
    ...generateBannerStrings('Leaves'),
  },
  Blue: {
    primaryColor: colors.Blue.Magic,
    backgroundColor: colors.Blue.Dark,
    textColor: getContrastingColor(colors.Blue.Dark),
    lightColor: colors.Blue.Light,
    ...generateBannerStrings('Stripes'),
  },
  Purple: {
    primaryColor: colors.Purple.Magic,
    backgroundColor: colors.Purple.Dark,
    textColor: getContrastingColor(colors.Purple.Dark),
    lightColor: colors.Purple.Light,
    ...generateBannerStrings('StarsPurple'),
  },
  White: {
    primaryColor: colors.Neutral.LightGrey,
    backgroundColor: colors.Neutral.DarkGrey,
    textColor: getContrastingColor(colors.Neutral.DarkGrey),
    lightColor: colors.Neutral.LightGrey,
    ...generateBannerStrings('Tiles'),
  },
  Black: {
    primaryColor: colors.Neutral.EarlGrey,
    backgroundColor: colors.Neutral.EarlGrey,
    textColor: getContrastingColor(colors.Neutral.EarlGrey),
    lightColor: colors.Neutral.EarlGrey,
    ...generateBannerStrings('Zigzags'),
  },
};

function generateBannerStrings(bannerName: string) {
  const bannerImageSrc = getCosmeticSrc('Banner_' + bannerName + '.png') ?? '';
  const bannerUrl = `url(${bannerImageSrc}) center / 200px repeat`;

  return { bannerImageSrc, bannerUrl };
}

export function getDecoration(cosmeticColor: CosmeticColor): Decoration {
  return decorations[cosmeticColor];
}

export function getPlayerDecoration(
  playerOrCosmetic: Player | Cosmetic
): PlayerDecoration {
  const cosmetic =
    'cosmetic' in playerOrCosmetic
      ? playerOrCosmetic.cosmetic
      : playerOrCosmetic;
  const decoration = getDecoration(cosmetic.color);
  const background = decoration.bannerUrl;

  return {
    ...decoration,
    background,
  };
}

export default decorations;
