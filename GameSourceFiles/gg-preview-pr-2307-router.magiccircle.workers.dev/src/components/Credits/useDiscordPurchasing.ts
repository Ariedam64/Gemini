import type { DiscordSDK } from '@discord/embedded-app-sdk';
import { useLingui } from '@lingui/react/macro';
import { getDefaultStore } from 'jotai';
import { isObject } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import type { ConsumeEntitlementRequest } from '@/common/types/me';
import { parseCreditQuantityForDiscordSku } from '@/common/utils/consumable-identifiers';
import { surface } from '@/environment';
import { discordSdkAtom } from '@/store/store';
import { useCreditsBalance } from '@/user';
import { post } from '@/utils';
import { delay } from '@/utils/delay';
import { DonutPurchasables } from './DonutPurchasables';
import type { PurchasingHookResult } from './types';
import { useCreditsModal } from './useCreditsModal';

type GetSkusFunction = DiscordSDK['commands']['getSkus'];

type SKU = Awaited<ReturnType<GetSkusFunction>>['skus'][number];

export function useDiscordPurchasing(): PurchasingHookResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [discordSkus, setDiscordSkus] = useState<SKU[]>([]);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [explicitlyShowPlatformGuidance, setExplicitlyShowPlatformGuidance] =
    useState(false);
  const [isPurchaseSuccessModalOpen, setIsPurchaseSuccessModalOpen] =
    useState(false);
  const creditsModal = useCreditsModal();

  const purchasables = DonutPurchasables.flatMap((product) => {
    const matchingSku = discordSkus.find((sku) => {
      try {
        return parseCreditQuantityForDiscordSku(sku) === product.amount;
      } catch {
        return false;
      }
    });
    if (!matchingSku?.price?.currency) {
      return [];
    }
    const price = `${matchingSku.price.currency} ${(
      matchingSku.price.amount / 100
    ).toFixed(2)}`;

    return [{ ...product, price }];
  });

  const { mutateCreditsBalance } = useCreditsBalance();
  const { t } = useLingui();

  const handleCloseSuccessModal = () => {
    setIsPurchaseSuccessModalOpen(false);
  };

  const handlePurchase = useCallback(
    (amount: number) => {
      setPurchaseError(null);
      void (async () => {
        try {
          const discordSdk = getDefaultStore().get(discordSdkAtom);
          if (!discordSdk) {
            throw new Error('Discord SDK not initialized');
          }
          const matchingSku = discordSkus.find((sku) => {
            try {
              return parseCreditQuantityForDiscordSku(sku) === amount;
            } catch {
              return false;
            }
          });
          if (!matchingSku) {
            throw new Error('SKU not found');
          }
          const entitlements = await discordSdk.commands.startPurchase({
            sku_id: matchingSku.id,
          });
          if (!entitlements) {
            setPurchaseError(
              t`Failed to start purchase: No entitlements found.`
            );
            return;
          }
          const handlePurchaseSuccess = () => {
            const entitlement = entitlements[0];
            Promise.all([
              post(`/me/credits/consume-entitlement`, {
                entitlementId: entitlement.id,
              } satisfies ConsumeEntitlementRequest),
              delay(3),
            ])
              .then(() => {
                mutateCreditsBalance()
                  .then(() => {
                    setIsPurchaseSuccessModalOpen(false);
                    creditsModal.close();
                  })
                  .catch((err) => {
                    setPurchaseError(t`Failed to consume entitlement: ${err}`);
                    setIsPurchaseSuccessModalOpen(false);
                  });
              })
              .catch((err) => {
                setPurchaseError(t`Failed to consume entitlement: ${err}`);
                setIsPurchaseSuccessModalOpen(false);
              });
            setIsPurchaseSuccessModalOpen(true);
          };
          if (document.hasFocus()) {
            handlePurchaseSuccess();
          } else {
            const handleWindowFocus = () => {
              window.removeEventListener('focus', handleWindowFocus);
              handlePurchaseSuccess();
            };
            window.addEventListener('focus', handleWindowFocus);
            setTimeout(() => {
              window.removeEventListener('focus', handleWindowFocus);
            }, 60000);
          }
        } catch (err) {
          const PurchaseCancelledByUserError = 5008;
          const UnsupportedDeviceError = 4002;

          if (
            isObject(err) &&
            'code' in err &&
            err.code === PurchaseCancelledByUserError
          ) {
            return;
          }
          if (
            isObject(err) &&
            'code' in err &&
            err.code === UnsupportedDeviceError
          ) {
            setExplicitlyShowPlatformGuidance(true);
            return;
          }
          setPurchaseError(t`Failed to start purchase: ${JSON.stringify(err)}`);
          console.error('Failed to start purchase:', err);
        }
      })();
    },
    [creditsModal, discordSkus, mutateCreditsBalance]
  );

  useEffect(() => {
    if (surface !== 'discord') {
      setExplicitlyShowPlatformGuidance(true);
      return;
    }
    const fetchSkus = async () => {
      try {
        const discordSdk = getDefaultStore().get(discordSdkAtom);
        if (!discordSdk) {
          throw new Error('Discord SDK not initialized');
        }
        const skusResponse = await discordSdk.commands.getSkus();
        setDiscordSkus(skusResponse.skus || []);
      } catch (err) {
        console.error('Failed to fetch SKUs:', err);
        setError(t`Failed to load purchase options.`);
      } finally {
        setLoading(false);
      }
    };
    fetchSkus().catch(console.error);
  }, []);

  return {
    purchasables,
    loading,
    error,
    purchaseError,
    isPurchaseSuccessModalOpen,
    explicitlyShowPlatformGuidance,
    handlePurchase,
    handleCloseSuccessModal,
  };
}
