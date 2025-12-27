import Donut10K from './Donut_10K.png';
import Donut1700 from './Donut_1700.png';
import Donut400 from './Donut_400.png';
import Donut4500 from './Donut_4500.png';
import Donut800 from './Donut_800.png';
import { Purchasable } from './types';

export const DonutPurchasables = [
  {
    amount: 400,
    image: Donut400,
  },
  {
    amount: 800,
    image: Donut800,
  },
  {
    amount: 1700,
    image: Donut1700,
  },
  {
    amount: 4500,
    image: Donut4500,
  },
  {
    amount: 10000,
    image: Donut10K,
  },
] as const satisfies Purchasable[];

export type DonutPurchasable = (typeof DonutPurchasables)[number];
