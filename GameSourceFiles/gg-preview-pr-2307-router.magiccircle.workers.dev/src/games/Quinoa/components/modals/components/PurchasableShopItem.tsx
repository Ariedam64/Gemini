import { Box, Button, keyframes, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { AnimatePresence } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { useMemo, useRef } from 'react';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import { EggsDex } from '@/common/games/Quinoa/systems/fauna';
import {
  type FloraSpeciesBlueprint,
  floraSpeciesDex,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { Rarity } from '@/common/games/Quinoa/systems/rarity';
import type { ShopItem } from '@/common/games/Quinoa/systems/shop';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import { formatDate } from '@/common/utils';
import { getGuildIdWhereActivityIsBeingPlayed } from '@/common/utils/discordActivityInstanceIdUtils';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import McTooltip from '@/components/McTooltip/McTooltip';
import { MotionBox } from '@/components/Motion';
import { surface } from '@/environment';
import useIsSmallWidth from '@/hooks/useIsSmallWidth';
import { useNotificationSubscriptions } from '@/hooks/useNotificationSubscriptions';
import { myShopPurchasesAtom } from '@/Quinoa/atoms/shopAtoms';
import { isSeedPurchaseButtonHighlightedAtom } from '@/Quinoa/atoms/taskAtoms';
import { getDecorDescription } from '@/Quinoa/utils/decorDescriptions';
import { getMyNumItemOwned } from '@/Quinoa/utils/getMyNumItemOwned';
import { getRarityBackgroundColor } from '@/Quinoa/utils/getRarityBackgroundColor';
import { getToolDescription } from '@/Quinoa/utils/toolDescriptions';
import { getCurrentRoomId } from '@/utils';
import { getContrastingColor } from '@/utils/getContrastingColor';
import { rarityBackgroundColors } from '../../../constants/colors';
import PlantAbility from '../../abilities/PlantAbility';
import QuinoaCoinLabel from '../../currency/QuinoaCoinLabel';
import InventorySprite from '../../InventorySprite';
import TutorialHighlight from '../../inventory/TutorialHighlight';
import LimitedTimeDecorTimer from './LimitedTimeDecorTimer';
import ShopItemBadgeChip from './ShopItemBadgeChip';
import ShopItemDetails from './ShopItemDetails';

const celestialGradient = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '50%': {
    backgroundPosition: '100% 50%',
  },
  '100%': {
    backgroundPosition: '0% 50%',
  },
});

interface ShopItemProps<T extends ShopItem> {
  purchaseItem: T;
  onPurchase?: (item: T) => void;
  onLearnMore?: (item: T) => void;
  onToggleExpanded?: (item: T) => void;
  isExpanded?: boolean;
  scrollableContainerRef?: React.RefObject<HTMLDivElement>;
  isUnavailable?: boolean;
  hasScrolledDown?: boolean;
}

const PurchasableShopItem = <T extends ShopItem>({
  purchaseItem,
  onPurchase,
  onLearnMore,
  onToggleExpanded,
  isExpanded = false,
  scrollableContainerRef,
  isUnavailable = false,
  hasScrolledDown = false,
}: ShopItemProps<T>) => {
  const shopPurchases = useAtomValue(myShopPurchasesAtom);
  const isSmallWidth = useIsSmallWidth();
  const detailsContainerRef = useRef<HTMLDivElement>(null);
  const isSeedPurchaseButtonHighlighted = useAtomValue(
    isSeedPurchaseButtonHighlightedAtom
  );
  const { subscriptions } = useNotificationSubscriptions();
  const isNotifySubscribed = useMemo(() => {
    if (surface !== 'webview') return false;
    if (purchaseItem.itemType === ItemType.Seed) {
      return subscriptions.some(
        (sub) =>
          sub.subject === 'QuinoaSeedInStock' &&
          sub.floraSpeciesId === purchaseItem.species
      );
    } else if (purchaseItem.itemType === ItemType.Egg) {
      return subscriptions.some(
        (sub) =>
          sub.subject === 'QuinoaEggInStock' && sub.eggId === purchaseItem.eggId
      );
    }
  }, [subscriptions, purchaseItem]);

  if (!shopPurchases) {
    return null;
  }
  const isButtonHighlighted =
    isSeedPurchaseButtonHighlighted &&
    purchaseItem.itemType === ItemType.Seed &&
    purchaseItem.species === 'Carrot' &&
    !isExpanded &&
    !hasScrolledDown;
  // Get item-specific data based on type
  const getItemData = () => {
    switch (purchaseItem.itemType) {
      case ItemType.Seed: {
        const { seed, crop, plant } = floraSpeciesDex[purchaseItem.species];
        const { name, coinPrice, creditPrice, tileRef, rarity } = seed;
        const description =
          'abilities' in plant
            ? plant.abilities.map((abilityId) => (
                <McFlex key={abilityId}>
                  <PlantAbility abilityId={abilityId} showSpecs={false} />
                </McFlex>
              ))
            : null;
        const item: InventoryItem = {
          itemType: ItemType.Seed,
          species: purchaseItem.species,
          quantity: 1,
        };
        return {
          name,
          coinPrice,
          mainSprite: tileRef,
          secondarySprite: crop.tileRef,
          rarity,
          description,
          creditPrice,
          item,
        };
      }
      case ItemType.Tool: {
        const { name, coinPrice, tileRef, rarity, isOneTimePurchase } =
          toolsDex[purchaseItem.toolId];
        const description = getToolDescription(purchaseItem.toolId);
        const item: InventoryItem = {
          itemType: ItemType.Tool,
          toolId: purchaseItem.toolId,
          quantity: 1,
        };
        return {
          name,
          coinPrice,
          mainSprite: tileRef,
          rarity,
          description,
          isOneTimePurchase,
          item,
        };
      }
      case ItemType.Egg: {
        const { name, coinPrice, tileRef, rarity } =
          EggsDex[purchaseItem.eggId];
        const item: InventoryItem = {
          itemType: ItemType.Egg,
          eggId: purchaseItem.eggId,
          quantity: 1,
        };
        return {
          name,
          coinPrice,
          mainSprite: tileRef,
          rarity,
          item,
        };
      }
      case ItemType.Decor: {
        const blueprint = decorDex[purchaseItem.decorId];
        const { name, coinPrice, tileRef, rarity, isOneTimePurchase } =
          blueprint;
        const expiryDate = 'expiryDate' in blueprint && blueprint.expiryDate;
        const description = getDecorDescription(purchaseItem.decorId);
        // By default all sprites are rendered at 100% scale,
        // but we need to adjust for the rocks and the owl to contrast the sizes
        const canvasScale =
          purchaseItem.decorId === 'SmallRock' ||
          purchaseItem.decorId === 'SmallGravestone'
            ? 0.6
            : purchaseItem.decorId === 'MediumRock' ||
                purchaseItem.decorId === 'WoodOwl' ||
                purchaseItem.decorId === 'StoneGnome' ||
                purchaseItem.decorId === 'MediumGravestone' ||
                purchaseItem.decorId === 'MiniFairyCottage' ||
                purchaseItem.decorId === 'MiniFairyForge' ||
                purchaseItem.decorId === 'MiniFairyKeep'
              ? 0.8
              : 1;
        const item: InventoryItem = {
          itemType: ItemType.Decor,
          decorId: purchaseItem.decorId,
          quantity: 1,
        };
        return {
          name,
          coinPrice,
          mainSprite: tileRef,
          rarity,
          expiryDate,
          isOneTimePurchase,
          description,
          canvasScale,
          item,
        };
      }
      default:
        return undefined;
    }
  };

  const itemData = getItemData();
  if (!itemData) {
    console.error('Invalid item type', purchaseItem);
    return null;
  }
  // Get purchase tracking based on item type
  const amountPreviouslyPurchased = (() => {
    switch (purchaseItem.itemType) {
      case ItemType.Seed:
        return shopPurchases.seed?.purchases[purchaseItem.species] ?? 0;
      case ItemType.Tool:
        if (itemData.isOneTimePurchase) {
          return getMyNumItemOwned({
            itemType: ItemType.Tool,
            id: purchaseItem.toolId,
          });
        } else {
          return shopPurchases.tool?.purchases[purchaseItem.toolId] ?? 0;
        }
      case ItemType.Egg:
        return shopPurchases.egg?.purchases[purchaseItem.eggId] ?? 0;
      case ItemType.Decor:
        if (itemData.isOneTimePurchase) {
          return getMyNumItemOwned({
            itemType: ItemType.Decor,
            id: purchaseItem.decorId,
          });
        } else {
          return shopPurchases.decor?.purchases[purchaseItem.decorId] ?? 0;
        }
      default:
        return 0;
    }
  })();
  const isAvailable = purchaseItem.initialStock > 0 && !isUnavailable;
  const currentStock = isAvailable
    ? purchaseItem.initialStock - amountPreviouslyPurchased
    : 0;
  const isOneTimePurchaseAndOwned =
    itemData.isOneTimePurchase && amountPreviouslyPurchased > 0;

  const handleToggle = () => {
    onToggleExpanded?.(purchaseItem);
    // Scroll the details shelf into view when expanding
    if (!isExpanded) {
      setTimeout(() => {
        if (scrollableContainerRef?.current && detailsContainerRef.current) {
          const container = scrollableContainerRef.current;
          const element = detailsContainerRef.current;
          const contentElement = element.firstElementChild as HTMLElement;

          if (contentElement) {
            const containerRect = container.getBoundingClientRect();
            // We can't use element.getBoundingClientRect() for height as it's being animated.
            // Instead, we use its `top` and get the height from its content.
            const elementTop = element.getBoundingClientRect().top;
            const contentHeight = contentElement.offsetHeight;

            const offset = elementTop - containerRect.top;
            const newScrollTop =
              container.scrollTop +
              offset -
              containerRect.height / 2 +
              contentHeight / 2;

            container.scrollTo({
              top: newScrollTop,
              behavior: 'smooth',
            });
          }
        }
      }, 100); // A small delay to ensure the element is in the DOM and its content is measurable.
    }
  };
  const seed: FloraSpeciesBlueprint['seed'] | null =
    purchaseItem.itemType === ItemType.Seed
      ? floraSpeciesDex[purchaseItem.species].seed
      : null;

  const guildId = getGuildIdWhereActivityIsBeingPlayed(
    getCurrentRoomId() ?? ''
  );
  const isItemGuildExclusive = Boolean(seed?.getCanSpawnInGuild);

  const isSeedPlatformExclusive =
    seed?.unavailableSurfaces &&
    seed?.unavailableSurfaces.length > 0 &&
    !seed?.unavailableSurfaces?.includes(surface);

  const isServerExclusive = Boolean(
    guildId && seed?.getCanSpawnInGuild?.(guildId)
  );
  const isIOSExclusive = surface === 'webview' && isSeedPlatformExclusive;
  const isWebExclusive = surface === 'web' && isSeedPlatformExclusive;

  const getButtonBg = () => {
    if (itemData.expiryDate) {
      if (isAvailable) {
        return '#785536';
      }
      if (isUnavailable) {
        return '#3d2d1f'; // Darker muted orange-brown
      }
      return '#5a340e'; // Muted orange-brown for out of stock
    }
    if (isAvailable) {
      return 'Brown.Magic';
    }
    if (isUnavailable) {
      return '#37302b';
    }
    return 'Brown.Dark';
  };
  return (
    <McFlex
      col
      // Create a new stacking context because we'll want the details panel to
      // "slide out" from behind the button, so we need to ensure it's on a
      // different layer.
      zIndex={0}
      autoH
    >
      <TutorialHighlight
        isActive={isButtonHighlighted}
        borderRadius="5px"
        width="100%"
      >
        <Button
          variant="blank"
          borderWidth="2px"
          borderColor="black"
          p={isSmallWidth ? 1 : 2}
          bg={getButtonBg()}
          borderRadius="5px"
          w="100%"
          onClick={handleToggle}
          isDisabled={isOneTimePurchaseAndOwned}
          // We need to use brightness instead of opacity for the active state,
          // otherwise, when the details panel "slides out" of the button, it will
          // be semi-transparent and you'll be able to see the details panel
          // behind the button!
          _hover={{
            filter: 'brightness(1.1)',
          }}
          _active={{
            opacity: 1,
            filter: 'brightness(1.2)',
          }}
        >
          <McFlex
            height={isSmallWidth ? '70px' : '80px'}
            orient="left"
            gap={isSmallWidth ? 1 : 2}
          >
            <McFlex auto position="relative">
              <InventorySprite
                item={itemData.item}
                size={isSmallWidth ? '40px' : '60px'}
                canvasScale={itemData.canvasScale}
              />
            </McFlex>
            <McFlex
              auto
              position="absolute"
              top={2}
              right={2}
              orient="top right"
              gap={1}
            >
              {itemData.expiryDate && (
                <McFlex auto gap={0.5} col orient="top right">
                  <McTooltip
                    label={
                      <Trans>
                        Restocks until {formatDate(itemData.expiryDate, true)}
                      </Trans>
                    }
                    keepOpenOnDesktopClick
                  >
                    <ShopItemBadgeChip bg="Orange.Dark" color="MagicWhite">
                      <Trans>LIMITED TIME!</Trans>
                    </ShopItemBadgeChip>
                  </McTooltip>
                  <LimitedTimeDecorTimer expiryDate={itemData.expiryDate} />
                </McFlex>
              )}
              {isNotifySubscribed && (
                <ShopItemBadgeChip bg="Yellow.Pastel">
                  <Trans>NOTIFY</Trans>
                </ShopItemBadgeChip>
              )}
              {isUnavailable && (
                <Text
                  as="span"
                  cursor="pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLearnMore?.(purchaseItem);
                  }}
                  fontSize={{
                    base: '8px',
                    sm: '12px',
                    md: '14px',
                    lg: '16px',
                  }}
                  fontWeight="bold"
                  color="Neutral.Grey"
                  textAlign="right"
                  lineHeight="1.1"
                >
                  <Trans>Buy with donuts or learn more</Trans>
                </Text>
              )}
              {isIOSExclusive && (
                <ShopItemBadgeChip bg="Cyan.Magic" color="MagicWhite">
                  <Trans>iOS EXCLUSIVE!</Trans>
                </ShopItemBadgeChip>
              )}
              {isWebExclusive && (
                <ShopItemBadgeChip bg="Cyan.Magic" color="MagicWhite">
                  <Trans>WEB EXCLUSIVE!</Trans>
                </ShopItemBadgeChip>
              )}
              {isServerExclusive && (
                <ShopItemBadgeChip bg="Cyan.Magic" color="MagicWhite">
                  <Trans>SERVER EXCLUSIVE!</Trans>
                </ShopItemBadgeChip>
              )}
            </McFlex>
            <McGrid templateRows="auto 1fr" flex={1} gap={1}>
              <Text
                fontWeight="bold"
                fontSize={{ base: '16px', md: '18px' }}
                align="left"
              >
                {itemData.name}
              </Text>
              <McGrid
                templateColumns="auto 1fr auto"
                alignItems="center"
                gap={isSmallWidth ? 1 : 2}
              >
                {isOneTimePurchaseAndOwned ? (
                  <McFlex orient="top left" w="70px">
                    <Text
                      fontSize={{
                        base: '10px',
                        sm: '12px',
                        md: '14px',
                        lg: '16px',
                      }}
                      fontWeight="bold"
                      color="Neutral.Grey"
                    >
                      <Trans>OWNED</Trans>
                    </Text>
                  </McFlex>
                ) : (
                  <McFlex
                    col
                    orient="top left"
                    gap={0}
                    whiteSpace="nowrap"
                    w="70px"
                  >
                    <Text
                      fontSize={{
                        base: '12px',
                        sm: '13px',
                        md: '16px',
                      }}
                      fontWeight="bold"
                      color={currentStock > 0 ? 'Green.Light' : 'Red.Light'}
                      textTransform="uppercase"
                    >
                      {currentStock > 0 ? (
                        <Trans>X{currentStock} Stock</Trans>
                      ) : (
                        <Trans>
                          NO {isUnavailable ? <Trans>LOCAL</Trans> : ''} STOCK
                        </Trans>
                      )}
                    </Text>
                    <QuinoaCoinLabel amount={itemData.coinPrice} size="sm" />
                  </McFlex>
                )}
                <McFlex orient="top left" pl={{ base: 0, md: 2 }}>
                  <Box
                    fontSize={{
                      base: '8px',
                      sm: '11px',
                      md: '13px',
                      lg: '15px',
                    }}
                    fontWeight="bold"
                    color="Neutral.Grey"
                    textAlign="left"
                  >
                    {itemData.description}
                  </Box>
                </McFlex>
                <McFlex orient="bottom right">
                  {/* Only show rarity badge for items that have rarity (seeds) */}
                  {itemData.rarity && (
                    <Box
                      bg={
                        itemData.rarity === Rarity.Celestial
                          ? undefined
                          : getRarityBackgroundColor(itemData.rarity)
                      }
                      borderRadius="3px"
                      py={0.5}
                      px={1}
                      sx={
                        itemData.rarity === Rarity.Celestial
                          ? {
                              background:
                                rarityBackgroundColors[Rarity.Celestial],
                              backgroundSize: '200% 200%',
                              animation: `${celestialGradient} 4s linear infinite`,
                            }
                          : {}
                      }
                    >
                      <Text
                        fontSize={{
                          base: '10px',
                          sm: '12px',
                          md: '14px',
                          lg: '16px',
                        }}
                        color={getContrastingColor(
                          getRarityBackgroundColor(itemData.rarity)
                        )}
                        fontWeight="bold"
                        textShadow={
                          itemData.rarity === Rarity.Celestial
                            ? '0 0 4px black'
                            : undefined
                        }
                      >
                        {itemData.rarity}
                      </Text>
                    </Box>
                  )}
                </McFlex>
              </McGrid>
            </McGrid>
          </McFlex>
        </Button>
      </TutorialHighlight>
      <AnimatePresence>
        {isExpanded && onPurchase && (
          <MotionBox
            ref={detailsContainerRef}
            initial={{ height: 0, y: -75, opacity: 0 }}
            animate={{ height: 'auto', y: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
            width="100%"
            // We want the details panel to slide out from behind the button
            zIndex="-1"
          >
            <ShopItemDetails
              item={purchaseItem}
              currentStock={currentStock}
              onPurchase={onPurchase as (item: ShopItem) => void}
              hasScrolledDown={hasScrolledDown}
              isUnavailable={isUnavailable}
              isItemGuildExclusive={isItemGuildExclusive}
            />
          </MotionBox>
        )}
      </AnimatePresence>
    </McFlex>
  );
};

export default PurchasableShopItem;
