import type { Cosmetic } from '@/common/types/player';
import type { UnboundUserStyle } from '@/common/types/user';
import { isValidCosmeticColor } from './validators';

export function playerCosmeticToUserStyle(
  cosmetic: Cosmetic
): Omit<UnboundUserStyle, 'name'> {
  const avatar = cosmetic.avatar;
  const [avatarBottom, avatarMid, avatarTop, avatarExpression] = avatar;
  if (!avatarBottom || !avatarMid || !avatarTop || !avatarExpression) {
    throw new Error(`Invalid avatar: ${JSON.stringify(avatar)}`);
  }
  return {
    color: cosmetic.color,
    avatarBottom,
    avatarMid,
    avatarTop,
    avatarExpression,
  };
}

export function userStyleToPlayerCosmetic(
  userStyle: UnboundUserStyle
): Cosmetic {
  return {
    color: isValidCosmeticColor(userStyle.color) ? userStyle.color : 'Purple',
    avatar: [
      userStyle.avatarBottom,
      userStyle.avatarMid,
      userStyle.avatarTop,
      userStyle.avatarExpression,
    ],
  };
}
