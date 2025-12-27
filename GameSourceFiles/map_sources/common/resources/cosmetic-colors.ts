export const cosmeticColors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'White',
  'Black',
] as const;

export type CosmeticColor = (typeof cosmeticColors)[number];
