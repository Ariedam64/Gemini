import { Button } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { forwardRef, useMemo, useState } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import { EggsDex } from '@/common/games/Quinoa/systems/fauna';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { ShopItem } from '@/common/games/Quinoa/systems/shop';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import type { NotificationTopic } from '@/common/notifications/notification-topics';
import { useCreditsModal } from '@/components/Credits/useCreditsModal';
import McFlex from '@/components/McFlex/McFlex';
import StrokedText from '@/components/StrokedText/StrokedText';
import { surface } from '@/environment';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { useNotificationSubscriptions } from '@/hooks/useNotificationSubscriptions';
import {
  myDecorInventoryAtom,
  myEggInventoryAtom,
  mySeedInventoryAtom,
  myToolInventoryAtom,
} from '@/Quinoa/atoms/inventoryAtoms';
import { openActivityLogModal } from '@/Quinoa/atoms/modalAtom';
import { myCoinsCountAtom } from '@/Quinoa/atoms/myAtoms';
import {
  isFirstSeedPurchaseActiveAtom,
  isSeedPurchaseButtonHighlightedAtom,
} from '@/Quinoa/atoms/taskAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import QuinoaCreditsLabel from '@/Quinoa/components/currency/QuinoaCreditsLabel';
import TutorialHighlight from '@/Quinoa/components/inventory/TutorialHighlight';
import { LearnMoreButton } from '@/Quinoa/components/modals/buttons/LearnMoreButton';
import { NotifyMeButton } from '@/Quinoa/components/modals/buttons/NotifyMeButton';
import { PurchaseWithCoinsButton } from '@/Quinoa/components/modals/buttons/PurchaseWithCoinsButton';
import LearnMoreModal from '@/Quinoa/components/modals/LearnMoreModal';
import { getMyInventoryCapacityStatus } from '@/Quinoa/utils/getMyInventoryCapacityStatus';
import { quinoaRpc } from '@/Quinoa/utils/quinoaRpc';
import { useIsUserAuthenticated } from '@/store/store';
import { useCreditsBalance } from '@/user';
import { post } from '@/utils';

interface ShopItemDetailsProps {
  item: ShopItem;
  currentStock: number;
  onPurchase: (item: ShopItem) => void;
  hasScrolledDown: boolean;
  isUnavailable: boolean;
  isItemGuildExclusive: boolean;
}

const ShopItemDetails = forwardRef<HTMLDivElement, ShopItemDetailsProps>(
  (
    {
      item,
      currentStock,
      onPurchase,
      hasScrolledDown,
      isUnavailable,
      isItemGuildExclusive,
    },
    ref
  ) => {
    const isSmallScreen = useIsSmallScreen();
    const [isLoadingCreditPurchase, setIsLoadingCreditPurchase] =
      useState(false);
    const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
    const myCoinsCount = useAtomValue(myCoinsCountAtom);
    const eggInventory = useAtomValue(myEggInventoryAtom);
    const seedInventory = useAtomValue(mySeedInventoryAtom);
    const toolInventory = useAtomValue(myToolInventoryAtom);
    const decorInventory = useAtomValue(myDecorInventoryAtom);
    const isAuthenticated = useIsUserAuthenticated();
    const { availableCredits, mutateCreditsBalance } = useCreditsBalance();
    const { open: openCreditsModal } = useCreditsModal();
    const { t } = useLingui();

    const isSeedPurchaseButtonHighlighted = useAtomValue(
      isSeedPurchaseButtonHighlightedAtom
    );
    const isFirstSeedPurchaseActive = useAtomValue(
      isFirstSeedPurchaseActiveAtom
    );
    const isButtonHighlighted =
      isSeedPurchaseButtonHighlighted &&
      item.itemType === ItemType.Seed &&
      item.species === 'Carrot' &&
      !hasScrolledDown;

    const isInStock = currentStock > 0;

    const getItemData = () => {
      switch (item.itemType) {
        case ItemType.Seed: {
          const seedBlueprint = floraSpeciesDex[item.species].seed;
          const { name, coinPrice, creditPrice, tileRef } = seedBlueprint;
          const ownedCount =
            seedInventory.find((i) => i.species === item.species)?.quantity ??
            0;
          return {
            name,
            coinPrice,
            creditPrice,
            tileRef,
            ownedCount,
          };
        }
        case ItemType.Tool: {
          const { name, coinPrice, creditPrice, tileRef, isOneTimePurchase } =
            toolsDex[item.toolId];
          const ownedCount =
            toolInventory.find((i) => i.toolId === item.toolId)?.quantity ?? 0;
          return {
            name,
            coinPrice,
            creditPrice,
            tileRef,
            isOneTimePurchase,
            ownedCount,
          };
        }
        case ItemType.Egg: {
          const { name, coinPrice, creditPrice, tileRef } = EggsDex[item.eggId];
          const ownedCount =
            eggInventory.find((i) => i.eggId === item.eggId)?.quantity ?? 0;
          return {
            name,
            coinPrice,
            creditPrice,
            tileRef,
            ownedCount,
          };
        }
        case ItemType.Decor: {
          const blueprint = decorDex[item.decorId];
          const { name, coinPrice, creditPrice, tileRef } = blueprint;
          const ownedCount =
            decorInventory.find((i) => i.decorId === item.decorId)?.quantity ??
            0;
          return {
            name,
            coinPrice,
            creditPrice,
            tileRef,
            ownedCount,
          };
        }
      }
    };

    const itemData = getItemData();
    const canUserSubscribeToNotifications = useMemo(() => {
      // Seeds are available to all authenticated webview users
      if (
        surface === 'webview' &&
        item.itemType === ItemType.Seed &&
        !isUnavailable &&
        isAuthenticated
      ) {
        return true;
      }
      // Eggs are available only to developers
      if (
        surface === 'webview' &&
        item.itemType === ItemType.Egg &&
        isAuthenticated
      ) {
        return true;
      }
      return false;
    }, [surface, item.itemType, isAuthenticated, itemData]);

    const handleLearnMore = () => {
      setShowLearnMoreModal(true);
    };
    const canAffordWithCoins = myCoinsCount >= itemData.coinPrice;
    const [isNotifying, setIsNotifying] = useState(false);
    const { subscriptions, mutate: mutateSubscriptions } =
      useNotificationSubscriptions();
    const isSubscribed = useMemo(() => {
      if (item.itemType === ItemType.Seed) {
        return subscriptions.some(
          (sub) =>
            sub.subject === 'QuinoaSeedInStock' &&
            sub.floraSpeciesId === item.species
        );
      }
      if (item.itemType === ItemType.Egg) {
        return subscriptions.some(
          (sub) =>
            sub.subject === 'QuinoaEggInStock' && sub.eggId === item.eggId
        );
      }
      return false;
    }, [subscriptions, item]);

    const handleNotifySubscribe = async () => {
      if (item.itemType !== ItemType.Seed && item.itemType !== ItemType.Egg)
        return;
      if (surface === 'webview') {
        window.webkit?.messageHandlers?.requestNotificationPermission?.postMessage?.(
          {}
        );
      }
      setIsNotifying(true);
      try {
        const topic: NotificationTopic =
          item.itemType === ItemType.Seed
            ? {
                subject: 'QuinoaSeedInStock' as const,
                floraSpeciesId: item.species,
              }
            : {
                subject: 'QuinoaEggInStock' as const,
                eggId: item.eggId,
              };
        await post<unknown, NotificationTopic>(
          '/notifications/subscribe',
          topic
        );
        await mutateSubscriptions();
        sendQuinoaToast({
          title: <Trans>Notification set</Trans>,
          description: (
            <Trans>We'll let you know when {itemData.name} is in stock.</Trans>
          ),
          variant: 'success',
          icon: itemData.tileRef,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : undefined;
        sendQuinoaToast({
          title: <Trans>Couldn't set notification</Trans>,
          description: errorMessage,
          variant: 'error',
        });
      } finally {
        setIsNotifying(false);
      }
    };

    const handleNotifyUnsubscribe = async () => {
      if (item.itemType !== ItemType.Seed && item.itemType !== ItemType.Egg)
        return;
      setIsNotifying(true);
      try {
        const topic: NotificationTopic =
          item.itemType === ItemType.Seed
            ? {
                subject: 'QuinoaSeedInStock' as const,
                floraSpeciesId: item.species,
              }
            : {
                subject: 'QuinoaEggInStock' as const,
                eggId: item.eggId,
              };
        await post<unknown, NotificationTopic>(
          '/notifications/unsubscribe',
          topic
        );
        await mutateSubscriptions();
        sendQuinoaToast({
          title: <Trans>Notification removed</Trans>,
          description: (
            <Trans>We won't notify you when {itemData.name} is in stock.</Trans>
          ),
          variant: 'success',
          icon: itemData.tileRef,
        });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : undefined;
        sendQuinoaToast({
          title: <Trans>Couldn't remove notification</Trans>,
          description: errorMessage,
          variant: 'error',
        });
      } finally {
        setIsNotifying(false);
      }
    };

    const handlePurchaseWithCredits = async () => {
      if (isLoadingCreditPurchase) return;
      if (availableCredits < itemData.creditPrice) {
        openCreditsModal();
        return;
      }
      const id = (() => {
        switch (item.itemType) {
          case ItemType.Tool:
            return item.toolId;
          case ItemType.Seed:
            return item.species;
          case ItemType.Egg:
            return item.eggId;
          case ItemType.Decor:
            return item.decorId;
        }
      })();
      const itemTypeName = (() => {
        switch (item.itemType) {
          case ItemType.Tool:
            return t`tool`;
          case ItemType.Seed:
            return t`seed`;
          case ItemType.Egg:
            return t`egg`;
          case ItemType.Decor:
            return t`decor`;
        }
      })();
      const { isInventoryFull, isItemAtMaxQuantity } =
        getMyInventoryCapacityStatus({
          itemType: item.itemType,
          id,
        });
      if (isInventoryFull) {
        sendQuinoaToast({
          title: t`Inventory full`,
          description: t`Free up space to buy this ${itemTypeName}.`,
          variant: 'error',
        });
        return;
      }
      if (isItemAtMaxQuantity) {
        sendQuinoaToast({
          title: t`Max stack size reached`,
          description: t`Your ${itemData.name} stack is full.`,
          variant: 'error',
        });
        return;
      }
      setIsLoadingCreditPurchase(true);

      try {
        switch (item.itemType) {
          case ItemType.Seed:
            await quinoaRpc({
              method: 'PurchaseSeedWithCredits',
              species: item.species,
            });
            break;
          case ItemType.Tool:
            await quinoaRpc({
              method: 'PurchaseToolWithCredits',
              toolId: item.toolId,
            });
            break;
          case ItemType.Egg:
            await quinoaRpc({
              method: 'PurchaseEggWithCredits',
              egg: item.eggId,
            });
            break;
          case ItemType.Decor:
            await quinoaRpc({
              method: 'PurchaseDecorWithCredits',
              decorId: item.decorId,
            });
            break;
        }
        // Revalidate credits balance after successful purchase
        await mutateCreditsBalance();
        // Show success toast
        playSfx('DonutBuy');
        sendQuinoaToast({
          title: <Trans>Purchase successful</Trans>,
          description: (
            <Trans>
              You now have{' '}
              <strong>{(itemData.ownedCount + 1).toLocaleString()}</strong>{' '}
              {itemData.name}
              {itemData.ownedCount === 0 ? '.' : '(s).'}
            </Trans>
          ),
          variant: 'success',
          icon: itemData.tileRef,
          onClick: openActivityLogModal,
        });
      } catch (error) {
        // Show error toast
        sendQuinoaToast({
          title: <Trans>Purchase failed</Trans>,
          description:
            error instanceof Error ? (
              error.message
            ) : (
              <Trans>Something went wrong. Please try again.</Trans>
            ),
          variant: 'error',
        });
      } finally {
        setIsLoadingCreditPurchase(false);
      }
    };

    const isCreditPurchaseDisabled = itemData.isOneTimePurchase && !isInStock;

    return (
      <>
        <McFlex px={2} ref={ref}>
          <McFlex
            borderWidth="2px"
            borderColor="black"
            borderRadius="0 0 5px 5px"
            borderTop="none"
            p={2}
            bg="Brown.Dark"
            autoH
            orient="left"
            gap={1}
          >
            {isUnavailable ? (
              <LearnMoreButton onClick={handleLearnMore} />
            ) : (
              <TutorialHighlight
                isActive={isButtonHighlighted}
                borderRadius="8px"
                width="100%"
                numTasks={isFirstSeedPurchaseActive ? 2 : 1}
              >
                <PurchaseWithCoinsButton
                  isInStock={isInStock}
                  canAfford={canAffordWithCoins}
                  onClick={() => onPurchase(item)}
                  coinPrice={itemData.coinPrice}
                />
              </TutorialHighlight>
            )}
            <Button
              w="100%"
              h="40px"
              bg="Purple.Magic"
              borderRadius="8px"
              onClick={() => void handlePurchaseWithCredits()}
              isLoading={isLoadingCreditPurchase}
              isDisabled={isCreditPurchaseDisabled}
              borderBottom="3px solid rgba(0,0,0,0.4)"
              _active={
                isCreditPurchaseDisabled
                  ? undefined
                  : {
                      borderBottomWidth: '1px',
                      borderBottomColor: 'rgba(0,0,0,0.2)',
                      boxShadow: 'inset 0 3px 2px rgba(0,0,0,0.2)',
                    }
              }
              transition="transform 0.2s ease"
            >
              {isCreditPurchaseDisabled ? (
                <StrokedText
                  color="white"
                  strokeColor="black"
                  shadowHeight={0}
                  fontSize={{ base: '16px', lg: '18px' }}
                  fontWeight="bold"
                  mt={1}
                >
                  <Trans>NO STOCK</Trans>
                </StrokedText>
              ) : (
                <QuinoaCreditsLabel
                  amount={itemData.creditPrice}
                  size={isSmallScreen ? 'sm' : 'md'}
                  strokedTextProps={{
                    color: 'MagicWhite',
                    strokeColor: 'MagicBlack',
                  }}
                  showTooltip={false}
                />
              )}
            </Button>
            {canUserSubscribeToNotifications && (
              <NotifyMeButton
                isSubscribed={isSubscribed}
                onClick={
                  isSubscribed
                    ? () => void handleNotifyUnsubscribe()
                    : () => void handleNotifySubscribe()
                }
                isLoading={isNotifying}
              />
            )}
          </McFlex>
        </McFlex>
        {showLearnMoreModal && (
          <LearnMoreModal
            item={item}
            onClose={() => setShowLearnMoreModal(false)}
            isItemGuildExclusive={isItemGuildExclusive}
          />
        )}
      </>
    );
  }
);

export default ShopItemDetails;
