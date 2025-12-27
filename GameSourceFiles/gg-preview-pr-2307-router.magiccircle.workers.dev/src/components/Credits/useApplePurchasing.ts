import { posthog } from 'posthog-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  ConsumeIOSTransactionRequest,
  ConsumeIOSTransactionResponse,
} from '@/common/types/me';
import { getAppleProductIdForAmount } from '@/common/utils/consumable-identifiers';
import { useCreditsBalance } from '@/user';
import { post } from '@/utils';
import { delay } from '@/utils/delay';
import { DonutPurchasables } from './DonutPurchasables';
import type { PurchasableWithPrice, PurchasingHookResult } from './types';
import { useCreditsModal } from './useCreditsModal';

interface AppleAppStoreProduct {
  id: string;
  displayName: string;
  description: string;
  displayPrice: string;
  price: number;
}

type AppleAppStoreEvent =
  | {
      type: 'products';
      products: AppleAppStoreProduct[];
    }
  | {
      type: 'purchaseSuccess';
      productId: string;
      transactionId: string;
      storeEnvironment: 'Sandbox' | 'Production' | 'Xcode';
    }
  | {
      type: 'purchaseCancelled';
    }
  | {
      type: 'purchaseError';
      error: string;
    };

export function useApplePurchasing(): PurchasingHookResult {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  const [isPurchaseSuccessModalOpen, setIsPurchaseSuccessModalOpen] =
    useState(false);
  const [appleProducts, setAppleProducts] = useState<AppleAppStoreProduct[]>(
    []
  );
  const creditsModal = useCreditsModal();
  const { mutateCreditsBalance } = useCreditsBalance();
  // While it should be safe to call getProducts() and
  // checkForUnfinishedTransactions() multiple times,
  // guard against that so we don't send duplicate messages to the JS-webview
  // in case this component re-renders multiple times
  const hasInitializationBegun = useRef(false);

  useEffect(() => {
    if (hasInitializationBegun.current) {
      return;
    }
    hasInitializationBegun.current = true;

    const messageHandlers = window.webkit?.messageHandlers;
    if (!messageHandlers) {
      setError('iOS IAP bridge not available');
      setLoading(false);
      return;
    }
    const fetchProducts = () => {
      const productIds = DonutPurchasables.map(({ amount }) =>
        getAppleProductIdForAmount(amount)
      );
      messageHandlers.iap?.postMessage({
        action: 'getProducts',
        productIds: productIds,
      });
    };
    const checkForUnfinishedTransactions = () => {
      messageHandlers.checkForUnfinishedTransactions?.postMessage({});
    };
    checkForUnfinishedTransactions();
    fetchProducts();
  }, []);

  const handleApplePurchaseSuccess = useCallback(
    async (
      transactionDetail: Extract<
        AppleAppStoreEvent,
        { type: 'purchaseSuccess' }
      >
    ) => {
      const { transactionId, productId, storeEnvironment } = transactionDetail;

      setIsPurchaseSuccessModalOpen(true);
      setPurchaseError(null);

      try {
        const [response] = await Promise.all([
          post<ConsumeIOSTransactionResponse>(
            `/me/credits/consume-apple-transaction`,
            {
              productId,
              transactionId,
              storeEnvironment,
            } satisfies ConsumeIOSTransactionRequest
          ),
          delay(3),
        ]);

        if (!response.success) {
          throw new Error('Failed to process transaction');
        }
        if (window.webkit?.messageHandlers?.iap) {
          window.webkit.messageHandlers.iap.postMessage({
            action: 'finishTransaction',
            transactionId,
          });
        }
        await mutateCreditsBalance();
        setIsPurchaseSuccessModalOpen(false);
        creditsModal.close();
      } catch (err) {
        setIsPurchaseSuccessModalOpen(false);
        setPurchaseError(
          `Failed to process purchase: ${err}. Your purchase is safe and will be retried.`
        );
      }
    },
    [creditsModal, mutateCreditsBalance]
  );

  useEffect(() => {
    const handleIAPEvent = (event: CustomEvent<AppleAppStoreEvent>) => {
      switch (event.detail.type) {
        case 'products': {
          setAppleProducts(event.detail.products);
          setLoading(false);
          break;
        }
        case 'purchaseSuccess': {
          posthog.capture('UI_ApplePurchase_Success', event.detail);
          handleApplePurchaseSuccess(event.detail).catch(console.error);
          break;
        }
        case 'purchaseCancelled': {
          posthog.capture('UI_ApplePurchase_Cancelled');
          break;
        }
        case 'purchaseError': {
          posthog.capture('UI_ApplePurchase_Error', {
            error: event.detail.error,
          });
          setPurchaseError(event.detail.error);
          break;
        }
      }
    };

    window.addEventListener('magiccircle:iap', handleIAPEvent as EventListener);

    return () => {
      window.removeEventListener(
        'magiccircle:iap',
        handleIAPEvent as EventListener
      );
    };
  }, []);

  const purchasables: PurchasableWithPrice[] = DonutPurchasables.flatMap(
    (config) => {
      const product = appleProducts.find(
        (p) => p.id === getAppleProductIdForAmount(config.amount)
      );
      if (!product) return [];

      return [{ ...config, price: product.displayPrice }];
    }
  );

  const handlePurchase = useCallback((amount: number) => {
    setPurchaseError(null);
    if (window.webkit?.messageHandlers?.iap) {
      const productId = getAppleProductIdForAmount(amount);
      posthog.capture('UI_ApplePurchase_Initiated', { productId });
      window.webkit.messageHandlers.iap.postMessage({
        action: 'purchase',
        productId,
      });
    }
  }, []);

  const handleCloseSuccessModal = () => {
    setIsPurchaseSuccessModalOpen(false);
  };

  return {
    purchasables,
    loading,
    error,
    purchaseError,
    isPurchaseSuccessModalOpen,
    explicitlyShowPlatformGuidance: false,
    handlePurchase,
    handleCloseSuccessModal,
  };
}
