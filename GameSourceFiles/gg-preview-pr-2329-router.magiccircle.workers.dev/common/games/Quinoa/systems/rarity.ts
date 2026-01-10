export enum Rarity {
  Common = 'Common',
  Uncommon = 'Uncommon',
  Rare = 'Rare',
  Legendary = 'Legendary',
  Mythic = 'Mythical',
  Divine = 'Divine',
  Celestial = 'Celestial',
}

/**
 * Canonical rarity order used across the Quinoa systems when sorting by rarity.
 *
 * We derive the order programmatically from the enum declaration order to avoid
 * duplication. The enum is declared from most common to rarest; this export is
 * from most common to rarest.
 */
export const rarityOrderCommonToRarest: readonly Rarity[] = Object.values(
  Rarity
) as Rarity[];

/**
 * Canonical rarity order from rarest to most common. Useful for "show rarest first" sorting.
 */
export const rarityOrderRarestFirst: readonly Rarity[] = [
  ...rarityOrderCommonToRarest,
].reverse();
/**
 * Gets all rarities that are rarer than the specified rarity.
 *
 * @param rarity - The rarity to compare against
 * @returns An array of rarities that are rarer than the specified rarity, ordered from least to most rare
 *
 * @example
 * getRaritiesGreaterThan(Rarity.Common) // [Rarity.Uncommon, Rarity.Rare, Rarity.Legendary, Rarity.Mythic, Rarity.Divine, Rarity.Celestial]
 * getRaritiesGreaterThan(Rarity.Rare) // [Rarity.Legendary, Rarity.Mythic, Rarity.Divine, Rarity.Celestial]
 * getRaritiesGreaterThan(Rarity.Celestial) // []
 */
export function getRaritiesGreaterThan(rarity: Rarity): readonly Rarity[] {
  const rarityIndex = rarityOrderCommonToRarest.indexOf(rarity);
  return rarityOrderCommonToRarest.slice(rarityIndex + 1);
}
