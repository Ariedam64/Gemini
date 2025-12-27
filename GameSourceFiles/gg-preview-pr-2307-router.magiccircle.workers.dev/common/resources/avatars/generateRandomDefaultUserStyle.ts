import sample from 'lodash/sample';
import type { Cosmetic } from '@/common/types/player';
import type { UnboundUserStyle } from '@/common/types/user';
import { randomColorName } from '../colors';
import { allCosmeticItems } from '../cosmetics/allCosmeticItems';
import { avatarSections } from '../cosmetics/cosmeticTypes';
import { generateRandomName } from './generateRandomName';

const getDefaultCosmetics = () => {
  return allCosmeticItems.filter(
    (cosmetic) => cosmetic.availability === 'default'
  );
};

const nonDefaultCosmetics = allCosmeticItems.filter(
  (cosmetic) =>
    cosmetic.availability === 'claimable' ||
    cosmetic.availability === 'purchasable'
);

export function getRandomDefaultAvatar() {
  const randomCosmeticFilenames = avatarSections.map((avatarSection) => {
    const cosmeticsInSection = getDefaultCosmetics().filter(
      (cosmetic) => cosmetic.type === avatarSection
    );
    const randomItem = sample(cosmeticsInSection);
    if (!randomItem) {
      throw new Error(`No default cosmetics found for ${avatarSection}`);
    }
    return randomItem.filename;
  });

  return randomCosmeticFilenames;
}

export function generateRandomDefaultUserStyle(): UnboundUserStyle {
  const randomAvatar = getRandomDefaultAvatar();
  const [avatarBottom, avatarMid, avatarTop, avatarExpression] = randomAvatar;
  const color = randomColorName();
  const name = generateRandomName();

  if (!avatarBottom || !avatarMid || !avatarTop || !avatarExpression) {
    throw new Error(
      `Failed to generate random user style: ${JSON.stringify(randomAvatar)}`
    );
  }

  return {
    avatarBottom,
    avatarExpression,
    avatarMid,
    avatarTop,
    color,
    name,
  };
}

export function getRandomNonDefaultCosmetic(): Cosmetic {
  const randomCosmeticFilenames = avatarSections.map((avatarSection) => {
    const cosmeticsInSection = nonDefaultCosmetics.filter(
      (cosmetic) => cosmetic.type === avatarSection
    );
    const randomItem = sample(cosmeticsInSection);
    if (!randomItem) {
      throw new Error(`No default cosmetics found for ${avatarSection}`);
    }
    return randomItem.filename;
  });

  return {
    avatar: randomCosmeticFilenames,
    color: randomColorName(),
  };
}
