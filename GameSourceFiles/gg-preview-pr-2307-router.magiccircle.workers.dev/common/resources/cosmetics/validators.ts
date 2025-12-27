import type { CosmeticType } from '@/common/resources/cosmetics/cosmeticTypes';
import type { Cosmetic } from '@/common/types/player';
import type { UnboundUserStyle } from '@/common/types/user';
import { type CosmeticColor, cosmeticColors } from '../cosmetic-colors';
import { allCosmeticItems } from './allCosmeticItems';

const isValidDefaultCosmetic = (
  filename: string,
  type: CosmeticType
): boolean =>
  allCosmeticItems.some(
    (item) =>
      item.type === type &&
      item.availability === 'default' &&
      item.filename === filename
  );

function isValidCosmeticFilename(filename: string): boolean {
  return allCosmeticItems.some((item) => item.filename === filename);
}

export function isValidDefaultUserStyle(
  userStyle: unknown
): userStyle is UnboundUserStyle {
  if (!userStyle || typeof userStyle !== 'object' || userStyle === null) {
    return false;
  }

  const style = userStyle as Record<string, unknown>;

  if (
    typeof style.avatarBottom !== 'string' ||
    typeof style.avatarMid !== 'string' ||
    typeof style.avatarTop !== 'string' ||
    typeof style.avatarExpression !== 'string'
  ) {
    return false;
  }

  return (
    isValidDefaultCosmetic(style.avatarBottom, 'Bottom') &&
    isValidDefaultCosmetic(style.avatarMid, 'Mid') &&
    isValidDefaultCosmetic(style.avatarTop, 'Top') &&
    isValidDefaultCosmetic(style.avatarExpression, 'Expression')
  );
}

export function isValidCosmeticColor(color: string): color is CosmeticColor {
  return cosmeticColors.includes(color as CosmeticColor);
}

export function isValidCosmetic(cosmetic: Cosmetic): boolean {
  return (
    isValidCosmeticColor(cosmetic.color) &&
    cosmetic.avatar.every(isValidCosmeticFilename)
  );
}
