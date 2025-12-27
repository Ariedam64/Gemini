import { useEffect } from 'react';
import type { ClaimableCosmeticInfo } from '@/common/resources/avatars/ClaimableCosmeticInfo';
import { useIsUserAuthenticated } from '@/store/store';
import { post } from '@/utils';
import { usePresentableProducer } from '..';
import {
  type ClaimableCosmeticPresentable,
  ClaimableCosmeticPresentableRenderer,
} from './ClaimableCosmeticPresentable';

const refreshClaimableCosmetics = async () => {
  // This is an expensive call, which queries both the Discord API (which has
  // aggressive rate-limiting) and our database. So, we only do this during log-in.
  const claimableCosmetics = await post<ClaimableCosmeticInfo[]>(
    '/me/cosmetics/unclaimed'
  );
  return claimableCosmetics;
};

export function useClaimableCosmeticPresentableProducer(priority: number) {
  const { setPresentables } =
    usePresentableProducer<ClaimableCosmeticPresentable>(priority);
  const isUserAuthenticated = useIsUserAuthenticated();

  useEffect(() => {
    (async () => {
      if (!isUserAuthenticated) {
        return;
      }
      const claimableCosmetics = await refreshClaimableCosmetics();
      setPresentables(
        claimableCosmetics.map((cosmetic) => ({
          id: 'unclaimed-cosmetic-' + cosmetic.cosmeticFilename,
          presentable: {
            type: 'ClaimableCosmetic',
            component: (
              <ClaimableCosmeticPresentableRenderer
                claimableCosmetic={cosmetic}
              />
            ),
          },
        }))
      );
    })().catch(console.error);
  }, [isUserAuthenticated]);
}
