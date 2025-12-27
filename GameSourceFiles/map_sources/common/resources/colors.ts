import { sample, without } from 'lodash';
import {
  type CosmeticColor,
  cosmeticColors,
} from '@/common/resources/cosmetic-colors';

export function randomColorName(colorsInUse?: CosmeticColor[]): CosmeticColor {
  const availableColors = without(cosmeticColors, ...(colorsInUse ?? []));
  const color = availableColors.length
    ? sample(availableColors)!
    : sample(cosmeticColors);

  return color;
}
