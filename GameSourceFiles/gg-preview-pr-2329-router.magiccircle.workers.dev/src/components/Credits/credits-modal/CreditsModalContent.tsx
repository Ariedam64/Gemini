import { Spinner } from '@chakra-ui/react';
import { useIsUserAuthenticated } from '@/store/store';
import McFlex from '../../McFlex/McFlex';
import { DonutPurchaseInterface } from '../DonutPurchaseInterface';
import { PlatformGuidanceMessage } from '../PlatformGuidanceMessage';
import { usePlatformPurchasing } from '../usePlatformPurchasing';

export const CreditsModalContent = () => {
  const isAuthenticated = useIsUserAuthenticated();
  const {
    purchasables,
    loading,
    error,
    purchaseError,
    isPurchaseSuccessModalOpen,
    explicitlyShowPlatformGuidance,
    handlePurchase,
    handleCloseSuccessModal,
  } = usePlatformPurchasing();

  if (loading) {
    return (
      <McFlex col gap={4} py={4}>
        <Spinner color="Purple.Light" />
      </McFlex>
    );
  }
  const hasNoPurchasables = purchasables.length === 0;
  if (!isAuthenticated || explicitlyShowPlatformGuidance || hasNoPurchasables) {
    return <PlatformGuidanceMessage hasNoPurchasables={hasNoPurchasables} />;
  }
  return (
    <DonutPurchaseInterface
      purchasables={purchasables}
      onPurchase={handlePurchase}
      error={error}
      purchaseError={purchaseError}
      isPurchaseSuccessModalOpen={isPurchaseSuccessModalOpen}
      onCloseSuccessModal={handleCloseSuccessModal}
    />
  );
};
