import type { CosmeticColor } from '@/common/resources/cosmetic-colors';

// The Rive input to describe the color of the heart is a number.
// This function converts the color to the number that the rive animation expects.
export function getEmoteHeartColorValue(color: CosmeticColor) {
  return [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'White',
    'Black',
  ].indexOf(color);
}
