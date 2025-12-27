export const cosmeticTypes = [
  'Top',
  'Mid',
  'Bottom',
  'Expression',
  'Color',
] as const;

export const avatarSections = [
  'Bottom',
  'Mid',
  'Top',
  'Expression',
] as const satisfies CosmeticType[];

export type CosmeticType = (typeof cosmeticTypes)[number];

export type AvatarSection = (typeof avatarSections)[number];

export const cosmeticAvailabilities = [
  'default',
  'authenticated',
  'claimable',
  'purchasable',
] as const;

export type CosmeticAvailability = (typeof cosmeticAvailabilities)[number];

export interface CosmeticItem {
  id: string;
  type: CosmeticType;
  availability: CosmeticAvailability;
  filename: string;
  displayName: string;
  price: number;
}

export interface CosmeticItem_MaybeLocked extends CosmeticItem {
  isLocked: boolean;
}

export interface CosmeticItemSubGroups {
  owned: CosmeticItem_MaybeLocked[];
  claimed: CosmeticItem_MaybeLocked[];
  forSale: CosmeticItem_MaybeLocked[];
}
