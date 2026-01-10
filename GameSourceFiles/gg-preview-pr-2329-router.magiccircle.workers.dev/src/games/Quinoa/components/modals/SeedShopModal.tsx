import { Box, CloseButton, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import {
  type FloraSpeciesId,
  floraSpeciesDex,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { ShopItem } from '@/common/games/Quinoa/systems/shop';
import { ShopType } from '@/common/games/Quinoa/user-json-schema/current';
import { getGuildIdWhereActivityIsBeingPlayed } from '@/common/utils/discordActivityInstanceIdUtils';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { surface } from '@/environment';
import { closeActiveModal } from '@/Quinoa/atoms/modalAtom';
import {
  seedShopInventoryAtom,
  seedShopRestockSecondsAtom,
} from '@/Quinoa/atoms/shopAtoms';
import { getCurrentRoomId } from '@/utils';
import QuinoaTimer from '../QuinoaTimer';
import RestockButton from './buttons/RestockButton';
import PurchasableShopItem from './components/PurchasableShopItem';
import QuinoaModal from './QuinoaModal';
import { handleSeedPurchase } from './utils/shopPurchases';

const SeedShopModal: React.FC = () => {
  const seedShopInventory = useAtomValue(seedShopInventoryAtom);
  const restockSeconds = useAtomValue(seedShopRestockSecondsAtom);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [expandedItem, setExpandedItem] = useState<FloraSpeciesId | null>(null);
  const [hasScrolledDown, setHasScrolledDown] = useState(false);
  // Track scroll position for tutorial highlight
  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (!container) {
      return;
    }
    const handleScroll = () => {
      const isAtTop = container.scrollTop === 0;
      setHasScrolledDown(!isAtTop);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleToggleExpanded = (item: ShopItem) => {
    if (item.itemType !== ItemType.Seed) {
      return;
    }
    if (item.itemType === ItemType.Seed) {
      setExpandedItem(expandedItem === item.species ? null : item.species);
    }
  };

  return (
    <QuinoaModal>
      <McGrid
        autoH
        maxH="100%"
        maxW="600px"
        templateRows="auto 1fr"
        bg="MagicBlack"
        borderRadius="15px"
        borderWidth="3px"
        borderColor="Brown.Dark"
        boxShadow="0 4px 10px  rgba(0, 0, 0, 0.5)"
        overflow="hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <McGrid
          templateColumns="1fr 1fr auto"
          gap={{ base: 0.5, md: 2 }}
          alignItems="center"
          bg="Green.Darker"
          p={2}
          overflow="hidden"
        >
          <McFlex gap={{ base: 0.5, md: 2 }} orient="left">
            <Text
              fontWeight="bold"
              fontSize={{ base: '16px', md: '18px', lg: '20px' }}
              whiteSpace="nowrap"
            >
              <Trans>New seeds in</Trans>
            </Text>
            <Box w="90px">
              <QuinoaTimer
                seconds={restockSeconds}
                showHours={false}
                showDays={false}
                bg="Green.Dark"
                strokeColor="Green.Darker"
              />
            </Box>
          </McFlex>
          <McFlex orient="right">
            <RestockButton shopType={ShopType.Seed} />
          </McFlex>
          <CloseButton onClick={closeActiveModal} />
        </McGrid>
        <Box
          ref={scrollableContainerRef}
          overflowY="auto"
          sx={{
            '&::-webkit-scrollbar': {
              width: '4px',
              height: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '3px',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
              },
            },
          }}
        >
          <McFlex col orient="top" p={2} pt={1}>
            {seedShopInventory.map((item) => {
              const seedBlueprint = floraSpeciesDex[item.species].seed;
              const isUnavailableOnThisSurface =
                'unavailableSurfaces' in seedBlueprint &&
                seedBlueprint.unavailableSurfaces.some((s) => s === surface);
              const guildId = getGuildIdWhereActivityIsBeingPlayed(
                getCurrentRoomId() ?? ''
              );
              const isUnavailableInThisDiscordActivity =
                surface === 'discord' &&
                'getCanSpawnInGuild' in seedBlueprint &&
                (!guildId || !seedBlueprint.getCanSpawnInGuild?.(guildId));
              const isUnavailable =
                isUnavailableOnThisSurface ||
                isUnavailableInThisDiscordActivity;

              return (
                <PurchasableShopItem
                  key={item.species}
                  purchaseItem={item}
                  onPurchase={handleSeedPurchase}
                  onToggleExpanded={handleToggleExpanded}
                  isExpanded={expandedItem === item.species}
                  scrollableContainerRef={scrollableContainerRef}
                  isUnavailable={isUnavailable}
                  hasScrolledDown={hasScrolledDown}
                />
              );
            })}
            <McFlex p={3} pt={2} auto>
              <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                color="rgba(255, 255, 255, 0.7)"
                textAlign="center"
                fontStyle="italic"
                lineHeight="1.2"
              >
                <Trans>
                  This game is in early access. More seeds and updates coming
                  soon!
                </Trans>
              </Text>
            </McFlex>
          </McFlex>
        </Box>
      </McGrid>
    </QuinoaModal>
  );
};

export default SeedShopModal;
