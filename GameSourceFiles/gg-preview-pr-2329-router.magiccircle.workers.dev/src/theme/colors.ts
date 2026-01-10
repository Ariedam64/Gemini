import { type StyleProps, useToken } from '@chakra-ui/react';
import { TinyColor } from '@ctrl/tinycolor';
import type { CosmeticColor } from '@/common/resources/cosmetic-colors';

const colors = {
  MagicBlack: '#201D1D',
  MagicWhite: '#F5F5F5',
  Scrim: 'rgba(24, 24, 24, 0.60)',
  ScrimDarker: 'rgba(24, 24, 24, 0.80)',
  ScrimDarkest: 'rgba(12, 12, 12, .85)',
  Brown: {
    Dark: '#4A3B2E',
    Magic: '#685340',
    Light: '#A88A6B',
    Pastel: '#C6B299',
  },
  Neutral: {
    TrueWhite: '#FFFFFF',
    White: '#F5F5F5',
    LightGrey: '#D2D2D2',
    Grey: '#A3A3A3',
    DarkGrey: '#717171',
    EarlGrey: '#404040',
    MagicBackground: '#201D1D',
    Black: '#181717',
  },
  Red: {
    Darker: '#73131A',
    Dark: '#931924',
    Magic: '#D02128',
    Light: '#D94C52',
    Pastel: '#EE9898',
    Salmon: '#DF4257',
  },
  Orange: {
    Dark: '#B8411C',
    Magic: '#FC6D30',
    Light: '#F48620',
    Pastel: '#EEBC98',
    Tangerine: '#FF8F27',
  },
  Yellow: {
    Dark: '#E9B52F',
    Magic: '#F3D32B',
    Light: '#FFF27D',
    Pastel: '#F1E49E',
    Pear: '#D8DF20',
  },
  Green: {
    Darker: '#086B31',
    Dark: '#0B893F',
    Magic: '#5EAC46',
    Light: '#95D761',
    Pastel: '#B2E3A1',
    Lime: '#8CC63E',
  },
  Cyan: {
    Dark: '#10725A',
    Magic: '#049B77',
    Light: '#5EB292',
    Pastel: '#A1E3B8',
  },
  Teal: {
    Dark: '#00666C',
    Magic: '#2CBBB9',
    Light: '#77D7D1',
    Pastel: '#9BDDD5',
  },
  Blue: {
    Dark: '#264093',
    Magic: '#0067B4',
    Light: '#48ADF4',
    Pastel: '#9AC6EF',
    Baby: '#25AAE2',
  },
  Purple: {
    Dark: '#652E91',
    Magic: '#8B3E98',
    Light: '#AE53B0',
    Pastel: '#AE9AEF',
    Indigo: '#6D1CF0',
  },
  Pink: {
    Dark: '#D91A5D',
    Magic: '#FF7596',
    Light: '#EE849E',
    Pastel: '#EBA7B3',
    Magenta: '#DE1F87',
  },
} as const;

/**
 * Retrieves the color value from the theme colors object based on the provided color string.
 *
 * @param {string} themeColorString - A string representing the color in the format "Color.Variant" (e.g., "Pink.Dark").
 * @returns {string} The corresponding color value from the theme colors object, or undefined if not found.
 */
export function resolveThemeColor(themeColorString: string): string {
  const [colorName, variant] = themeColorString.split('.');

  if (colorName in colors) {
    const colorObject = colors[colorName as keyof typeof colors];
    if (typeof colorObject === 'object' && variant in colorObject) {
      return colorObject[variant as keyof typeof colorObject];
    }
  }

  return themeColorString;
}

export function getPastelColor(color: CosmeticColor) {
  const variant = 'Pastel';
  const palette = colors[color as keyof typeof colors];
  if (typeof palette === 'object' && variant in palette) {
    return palette[variant];
  }
  return 'white';
}

export type Color = keyof typeof colors;

export default colors;

/**
 * Converts a Chakra UI theme color to an RGBA string with the specified alpha value.
 *
 * @param {StyleProps['color']} color - The Chakra UI theme color to convert.
 * @param {number} [alpha=1] - The alpha value to apply to the color. Defaults to 1.
 * @returns {string} The RGBA string representation of the color with the specified alpha.
 */
export function useThemeColorAsRGBA(
  color: StyleProps['color'],
  alpha: number = 1
): string {
  // First, we need to resolve the name of the color, e.g. "Purple.Indigo" to a
  // real CSS color.
  // Note: it's possible the color is a weird responsive array, so we need to
  // check for that and return pink if so
  const themeColor = useToken(
    'colors',
    typeof color === 'string' ? color : 'pink'
  );

  // Then, we need to convert the color to a TinyColor object
  const tinyColor = new TinyColor(themeColor);

  // If the alpha is 1, we return the color as is
  if (alpha !== 1) {
    tinyColor.setAlpha(alpha);
  }

  // Return the RGBA string
  return tinyColor.toRgbString();
}
