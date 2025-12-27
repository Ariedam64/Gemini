import type { FaunaAbilityId } from '@/common/games/Quinoa/systems/fauna';
import type { FloraAbilityId } from '@/common/games/Quinoa/systems/flora';
import type { MutationId } from '@/common/games/Quinoa/systems/mutation';
import { Rarity } from '@/common/games/Quinoa/systems/rarity';

export const rarityBackgroundColors: Record<Rarity, string> = {
  [Rarity.Common]: '#D2D2D2', // Neutral.LightGrey
  [Rarity.Uncommon]: '#5EAC46', // Green.Magic
  [Rarity.Rare]: '#0067B4', // Blue.Magic
  [Rarity.Legendary]: '#E9B52F', // Yellow.Dark
  [Rarity.Mythic]: '#8B3E98', // Purple.Magic
  [Rarity.Divine]: '#FC6D30', // Orange.Magic
  [Rarity.Celestial]:
    'linear-gradient(130deg, #00B4D8 0%, #7C2AE8 40%, #A0007E 60%, #FFD700 100%)',
};

export const mutationColors: Record<MutationId, string> = {
  Gold: 'rgb(235, 200, 0)',
  Rainbow:
    'linear-gradient(135deg, Red.Magic, Red.Light, Orange.Magic, Yellow.Dark, Green.Magic, Blue.Light, Purple.Indigo, Purple.Light)',
  Wet: 'rgba(95, 255, 255, 1)',
  Chilled: 'rgba(180, 230, 255, 1)',
  Frozen: 'rgb(185, 200, 255)',
  Dawnlit: 'rgb(245, 155, 225)',
  Ambershine: 'rgb(255, 180, 120)',
  Dawncharged: 'rgb(200, 150, 255)',
  Ambercharged: 'rgb(250, 140, 75)',
};

export const getAbilityColor = (abilityId: FaunaAbilityId | FloraAbilityId) => {
  switch (abilityId) {
    // ===== MOON KISSER =====
    case 'MoonKisser':
      return {
        bg: 'rgba(250, 166, 35, 0.9)',
        hover: 'rgba(250, 166, 35, 1)',
      };
    // ===== DAWN KISSER =====
    case 'DawnKisser':
      return {
        bg: 'rgba(162, 92, 242, 0.9)',
        hover: 'rgba(162, 92, 242, 1)',
      };
    // ===== PRODUCE SCALE BOOST =====
    case 'ProduceScaleBoost':
    case 'ProduceScaleBoostII':
      return {
        bg: 'rgba(34, 139, 34, 0.9)',
        hover: 'rgba(34, 139, 34, 1)',
      };
    // ===== PLANT GROWTH BOOST =====
    case 'PlantGrowthBoost':
    case 'PlantGrowthBoostII':
      return {
        bg: 'rgba(0, 128, 128, 0.9)',
        hover: 'rgba(0, 128, 128, 1)',
      };
    // ===== EGG GROWTH BOOST =====
    case 'EggGrowthBoost':
    case 'EggGrowthBoostII_NEW':
    case 'EggGrowthBoostII':
      return {
        bg: 'rgba(180, 90, 240, 0.9)',
        hover: 'rgba(180, 90, 240, 1)',
      };
    // ===== PET AGE BOOST =====
    case 'PetAgeBoost':
    case 'PetAgeBoostII':
      return {
        bg: 'rgba(147, 112, 219, 0.9)',
        hover: 'rgba(147, 112, 219, 1)',
      };
    // ===== PET HATCH SIZE BOOST =====
    case 'PetHatchSizeBoost':
    case 'PetHatchSizeBoostII':
      return {
        bg: 'rgba(128, 0, 128, 0.9)',
        hover: 'rgba(128, 0, 128, 1)',
      };
    // ===== PET XP BOOST =====
    case 'PetXpBoost':
    case 'PetXpBoostII':
      return {
        bg: 'rgba(30, 144, 255, 0.9)',
        hover: 'rgba(30, 144, 255, 1)',
      };
    // ===== HUNGER BOOST =====
    case 'HungerBoost':
    case 'HungerBoostII':
      return {
        bg: 'rgba(255, 20, 147, 0.9)',
        hover: 'rgba(255, 20, 147, 1)',
      };
    // ===== SELL BOOST =====
    case 'SellBoostI':
    case 'SellBoostII':
    case 'SellBoostIII':
    case 'SellBoostIV':
      return {
        bg: 'rgba(220, 20, 60, 0.9)',
        hover: 'rgba(220, 20, 60, 1)',
      };
    // ===== COIN FINDER =====
    case 'CoinFinderI':
    case 'CoinFinderII':
    case 'CoinFinderIII':
      return {
        bg: 'rgba(180, 150, 0, 0.9)',
        hover: 'rgba(180, 150, 0, 1)',
      };
    // ===== PRODUCE MUTATION BOOST =====
    case 'ProduceMutationBoost':
    case 'ProduceMutationBoostII':
      return {
        bg: 'rgba(140, 15, 70, 0.9)',
        hover: 'rgba(140, 15, 70, 1)',
      };
    // ===== UNIQUE ABILITIES (different names) =====
    case 'DoubleHarvest':
      return {
        bg: 'rgba(0, 120, 180, 0.9)',
        hover: 'rgba(0, 120, 180, 1)',
      };
    case 'DoubleHatch':
      return {
        bg: 'rgba(60, 90, 180, 0.9)',
        hover: 'rgba(60, 90, 180, 1)',
      };
    case 'ProduceEater':
      return {
        bg: 'rgba(255, 69, 0, 0.9)',
        hover: 'rgba(255, 69, 0, 1)',
      };
    case 'ProduceRefund':
      return {
        bg: 'rgba(255, 99, 71, 0.9)',
        hover: 'rgba(255, 99, 71, 1)',
      };
    case 'PetMutationBoost':
    case 'PetMutationBoostII':
      return {
        bg: 'rgba(160, 50, 100, 0.9)',
        hover: 'rgba(160, 50, 100, 1)',
      };
    case 'HungerRestore':
    case 'HungerRestoreII':
      return {
        bg: 'rgba(255, 105, 180, 0.9)',
        hover: 'rgba(255, 105, 180, 1)',
      };
    case 'PetRefund':
    case 'PetRefundII':
      return {
        bg: 'rgba(0, 80, 120, 0.9)',
        hover: 'rgba(0, 80, 120, 1)',
      };
    case 'Copycat':
      return {
        bg: 'rgba(255, 140, 0, 0.9)',
        hover: 'rgba(255, 140, 0, 1)',
      };
    case 'GoldGranter':
      return {
        bg: 'linear-gradient(135deg, rgba(225, 200, 55, 0.9) 0%, rgba(225, 180, 10, 0.9) 40%, rgba(215, 185, 45, 0.9) 70%, rgba(210, 185, 45, 0.9) 100%)',
        hover:
          'linear-gradient(135deg, rgba(220, 200, 70, 1) 0%, rgba(210, 175, 5, 1) 40%, rgba(210, 185, 55, 1) 70%, rgba(200, 175, 30, 1) 100%)',
      };
    case 'RainbowGranter':
      return {
        bg: 'linear-gradient(45deg, rgba(200,0,0,0.9), rgba(200,120,0,0.9), rgba(160,170,30,0.9), rgba(60,170,60,0.9), rgba(50,170,170,0.9), rgba(40,150,180,0.9), rgba(20,90,180,0.9), rgba(70,30,150,0.9))',
        hover:
          'linear-gradient(45deg, rgba(200,0,0,1), rgba(200,120,0,1), rgba(160,170,30,1), rgba(60,170,60,1), rgba(50,170,170,1), rgba(40,150,180,1), rgba(20,90,180,1), rgba(70,30,150,1))',
      };
    case 'RainDance':
      return {
        bg: 'rgba(102, 204, 216, 0.9)',
        hover: 'rgba(102, 204, 216, 1)',
      };
    case 'SeedFinderI':
    case 'SeedFinderII':
    case 'SeedFinderIII':
    case 'SeedFinderIV':
      return {
        bg: 'rgba(168, 102, 38, 0.9)',
        hover: 'rgba(168, 102, 38, 1)',
      };
    default:
      return {
        bg: 'rgba(100, 100, 100, 0.9)',
        hover: 'rgba(150, 150, 150, 1)',
      };
  }
};
