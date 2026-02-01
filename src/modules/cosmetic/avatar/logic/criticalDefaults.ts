/**
 * Critical default cosmetics (fallback if discovery fails)
 * Keep this list MINIMAL - discovery should be primary
 */

import type { CosmeticInfo } from "../types";

export const CRITICAL_DEFAULTS: CosmeticInfo[] = [
  // Default outfit (always available)
  {
    id: 'Top_DefaultGray.png',
    filename: 'Top_DefaultGray.png' as any,
    type: 'Top',
    availability: 'default',
    displayName: 'Default',
    price: 0,
    url: '',
  },
  {
    id: 'Mid_DefaultGray.png',
    filename: 'Mid_DefaultGray.png' as any,
    type: 'Mid',
    availability: 'default',
    displayName: 'Default',
    price: 0,
    url: '',
  },
  {
    id: 'Bottom_DefaultGray.png',
    filename: 'Bottom_DefaultGray.png' as any,
    type: 'Bottom',
    availability: 'default',
    displayName: 'Default',
    price: 0,
    url: '',
  },
  {
    id: 'Expression_Default.png',
    filename: 'Expression_Default.png' as any,
    type: 'Expression',
    availability: 'default',
    displayName: 'Default',
    price: 0,
    url: '',
  },

  {
    id: 'Top_Blank.png',
    filename: 'Top_Blank.png' as any,
    type: 'Top',
    availability: 'default',
    displayName: 'None',
    price: 0,
    url: '',
  },
  {
    id: 'Mid_Blank.png',
    filename: 'Mid_Blank.png' as any,
    type: 'Mid',
    availability: 'default',
    displayName: 'None',
    price: 0,
    url: '',
  },
  {
    id: 'Bottom_Blank.png',
    filename: 'Bottom_Blank.png' as any,
    type: 'Bottom',
    availability: 'default',
    displayName: 'None',
    price: 0,
    url: '',
  },
  {
    id: 'Expression_Blank.png',
    filename: 'Expression_Blank.png' as any,
    type: 'Expression',
    availability: 'default',
    displayName: 'None',
    price: 0,
    url: '',
  },
];
