import type { Rarity } from '@/common/games/Quinoa/systems/rarity';
import { rarityBackgroundColors } from '../constants/colors';

export const getRarityBackgroundColor = (rarity: Rarity): string => {
  return rarityBackgroundColors[rarity];
};
