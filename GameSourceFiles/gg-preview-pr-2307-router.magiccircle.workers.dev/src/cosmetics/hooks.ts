import sortBy from 'lodash/sortBy';
import { useMemo } from 'react';
import { allCosmeticItems } from '@/common/resources/cosmetics/allCosmeticItems';
import {
  type CosmeticItem_MaybeLocked,
  type CosmeticItemSubGroups,
  type CosmeticType,
  cosmeticTypes,
} from '@/common/resources/cosmetics/cosmeticTypes';
import { useIsUserAuthenticated } from '@/store/store';
import { useMe_UserCosmeticItems } from '@/user';

export function useDefaultCosmetics() {
  return useMemo(
    () =>
      allCosmeticItems.filter(
        (cosmetic) => cosmetic.availability === 'default'
      ),
    []
  );
}

export function useAuthenticatedCosmetics() {
  const isAuthenticated = useIsUserAuthenticated();
  return useMemo(
    () =>
      isAuthenticated
        ? allCosmeticItems.filter(
            (cosmetic) => cosmetic.availability === 'authenticated'
          )
        : [],
    [isAuthenticated]
  );
}

// Acquired cosmetics are both `claimed` and `purchased` cosmetics
export function useAcquiredCosmetics() {
  const { myCosmeticItems } = useMe_UserCosmeticItems();
  const claimedFilenames = myCosmeticItems.map(
    (cosmetic) => cosmetic.cosmeticFilename
  );

  return useMemo(
    () =>
      allCosmeticItems.filter((cosmetic) =>
        claimedFilenames.includes(cosmetic.filename)
      ),
    [claimedFilenames]
  );
}

export function useAvailableCosmetics() {
  const defaultCosmetics = useDefaultCosmetics();
  const authenticatedCosmetics = useAuthenticatedCosmetics();
  const acquiredCosmetics = useAcquiredCosmetics();

  return useMemo(
    () => [
      ...defaultCosmetics,
      ...authenticatedCosmetics,
      ...acquiredCosmetics,
    ],
    [defaultCosmetics, authenticatedCosmetics, acquiredCosmetics] // These dependencies are stable because they use useMemo
  );
}

export function useHiddenCosmetics() {
  const isAuthenticated = useIsUserAuthenticated();
  const acquiredCosmetics = useAcquiredCosmetics();
  return useMemo(
    () =>
      allCosmeticItems.filter(
        (cosmetic) =>
          (cosmetic.availability === 'authenticated' && !isAuthenticated) ||
          (cosmetic.availability === 'claimable' &&
            !acquiredCosmetics.includes(cosmetic))
      ),
    [isAuthenticated, acquiredCosmetics]
  );
}

export function useVisibleCosmetics() {
  const hiddenCosmetics = useHiddenCosmetics();

  return useMemo(
    () =>
      allCosmeticItems.filter(
        (cosmetic) => !hiddenCosmetics.includes(cosmetic)
      ),
    [hiddenCosmetics]
  );
}

/**
 * The `useGroupedCosmetics` function is a custom hook that organizes and sorts visible cosmetic items
 * available to the user based on their type and availability.
 *
 * It first retrieves the list of available cosmetics using the `useAvailableCosmetics` hook and the list of visible cosmetics
 * using the `useVisibleCosmetics` hook.
 *
 * The function then initializes an empty record to store sorted cosmetic items by their type (Top, Mid, Bottom, Expression, Color).
 * It iterates over all visible cosmetic items and maps each item to include an `isLocked` property, which is set to true if the item
 * is not in the list of available cosmetics.
 *
 * Each type array in the record is then sorted. For 'Color' cosmetics, the sorting is based on availability. For other types,
 * the sorting is based on availability and then by display name.
 *
 * Finally, the sorted record is memoized and returned, providing a structured and sorted collection of usable cosmetic items
 * grouped by their type.
 *
 * @returns {Record<CosmeticType, CosmeticItem_MaybeLocked[]>} A record containing arrays of usable cosmetic items grouped by their type.
 */

export function useGroupedCosmetics(): Record<
  CosmeticType,
  CosmeticItemSubGroups
> {
  const availableCosmetics = useAvailableCosmetics();
  const visibleCosmetics = useVisibleCosmetics();

  return useMemo(() => {
    const groupedSortedCosmetics = {} as Record<
      CosmeticType,
      CosmeticItemSubGroups
    >;

    cosmeticTypes.forEach((type) => {
      const items = visibleCosmetics
        .filter((item) => item.type === type)
        .map((item) => ({
          ...item,
          isLocked: !availableCosmetics.some(
            (availableItem) => availableItem.id === item.id
          ),
        }));

      if (type === 'Color') {
        // Sort by availability only for color cosmetics
        groupedSortedCosmetics[type] = {
          owned: items,
          claimed: [],
          forSale: [],
        };
      } else {
        const owned = items.filter(
          (item) => !item.isLocked && item.availability !== 'claimable'
        );

        const claimed = items.filter(
          (item) => item.availability === 'claimable'
        );

        const forSale = items.filter((item) => item.isLocked);

        groupedSortedCosmetics[type] = {
          owned: sort(owned),
          claimed: sort(claimed),
          forSale: sort(forSale),
        };
      }
    });
    return groupedSortedCosmetics;
  }, [availableCosmetics, visibleCosmetics]);
}

function sort(items: CosmeticItem_MaybeLocked[]) {
  return sortBy(items, [
    (item) => (item.availability === 'authenticated' ? 0 : 1),
    (item) => item.price,
    'displayName',
  ]);
}
