import { surface } from '@/environment';
import { PurchasingHookResult } from './types';
import { useApplePurchasing } from './useApplePurchasing';
import { useDiscordPurchasing } from './useDiscordPurchasing';

function useUnsupportedPurchasing(): PurchasingHookResult {
  return {
    purchasables: [],
    loading: false,
    error: null,
    purchaseError: null,
    isPurchaseSuccessModalOpen: false,
    explicitlyShowPlatformGuidance: false,
    handleCloseSuccessModal: () => {},
    handlePurchase: () => {},
  };
}

export function usePlatformPurchasing(): PurchasingHookResult {
  const discordPurchasing = useDiscordPurchasing();
  const applePurchasing = useApplePurchasing();
  const unsupportedPurchasing = useUnsupportedPurchasing();

  if (surface === 'discord') {
    return discordPurchasing;
  }
  if (surface === 'webview') {
    return applePurchasing;
  }
  return unsupportedPurchasing;
}
