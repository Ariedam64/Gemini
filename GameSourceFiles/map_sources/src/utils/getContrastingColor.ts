import { TinyColor } from '@ctrl/tinycolor';
import colors, { resolveThemeColor } from '@/theme/colors';
import { ChakraColor } from '@/theme/types';

/**
 * This function checks if the provided background color is dark.
 * It uses the TinyColor library to determine the darkness of the color.
 * If the color is dark, it returns true. If it's light or undefined, it returns false.
 * @param {ChakraColor} backgroundColor - The background color to check.
 * @returns {boolean} - True if the color is dark, false otherwise.
 */
export function getIsBackgroundColorDark(backgroundColor?: ChakraColor) {
  if (backgroundColor === undefined) return false;
  const bg = new TinyColor(backgroundColor);
  return bg.isDark();
}

/**
 * This function returns a contrasting text color based on the provided
 * background color. If the background color is dark, it returns 'MagicWhite'.
 * If it's light, it returns 'MagicBlack'.
 * @param {ChakraColor} backgroundColor - The background color to contrast with.
 * @returns {ChakraColor} - The contrasting text color.
 */
export function getContrastingColor(
  backgroundColor?: ChakraColor
): ChakraColor {
  if (backgroundColor === undefined) return 'MagicWhite';
  return getIsBackgroundColorDark(resolveThemeColor(backgroundColor))
    ? colors.MagicWhite
    : colors.MagicBlack;
}
/**
 * This function returns an invert filter value based on the provided
 * background color. If the background color is dark, it returns 'invert(0)'.
 * If it's light, it returns 'invert(1)'.
 * @param {ChakraColor} backgroundColor - The background color to contrast with.
 * @returns {string} - The invert filter value.
 */
export function getImageColorInvertFilter(
  backgroundColor?: ChakraColor
): string {
  if (backgroundColor === undefined) return 'invert(0)';
  return getIsBackgroundColorDark(backgroundColor) ? 'invert(0)' : 'invert(1)';
}
