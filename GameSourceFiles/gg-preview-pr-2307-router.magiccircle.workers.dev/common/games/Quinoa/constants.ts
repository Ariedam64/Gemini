import { ShopType } from './user-json-schema/current';

export const friendBonusMultiplier = 0.1;

export const shopRestockInfo: Record<
  ShopType,
  {
    creditPrice: number;
    intervalSeconds: number;
  }
> = {
  [ShopType.Seed]: {
    creditPrice: 19,
    intervalSeconds: 300,
  },
  [ShopType.Egg]: {
    creditPrice: 39,
    intervalSeconds: 900,
  },
  [ShopType.Tool]: {
    creditPrice: 13,
    intervalSeconds: 600,
  },
  [ShopType.Decor]: {
    creditPrice: 49,
    intervalSeconds: 3600,
  },
};

export const waterPlantSecondsReduction = 300; // 5 minutes
export const instaGrowCreditCostPerSecond = 11 / 3600; // 11 credits per hour

export const defaultRotation = 0;
export const flippedDefaultRotation = -360;
export const maxNumActivityLogs = 25;
