import { Box, CloseButton, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import type { EggId } from '@/common/games/Quinoa/systems/fauna';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { ShopItem } from '@/common/games/Quinoa/systems/shop';
import { ShopType } from '@/common/games/Quinoa/user-json-schema/current';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { closeActiveModal } from '@/Quinoa/atoms/modalAtom';
import {
  eggShopInventoryAtom,
  eggShopRestockSecondsAtom,
} from '@/Quinoa/atoms/shopAtoms';
import QuinoaTimer from '../QuinoaTimer';
import RestockButton from './buttons/RestockButton';
import PurchasableShopItem from './components/PurchasableShopItem';
import QuinoaModal from './QuinoaModal';
import { handleEggPurchase } from './utils/shopPurchases';

const EggShopModal: React.FC = () => {
  const eggShopInventory = useAtomValue(eggShopInventoryAtom);
  const restockSeconds = useAtomValue(eggShopRestockSecondsAtom);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const [expandedItem, setExpandedItem] = useState<EggId | null>(null);

  const handleToggleExpanded = (item: ShopItem) => {
    if (item.itemType === ItemType.Egg) {
      setExpandedItem(expandedItem === item.eggId ? null : item.eggId);
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
          bg="Purple.Dark"
          p={2}
          overflow="hidden"
        >
          <McFlex gap={{ base: 0.5, md: 2 }} orient="left">
            <Text
              fontWeight="bold"
              fontSize={{ base: '16px', md: '18px', lg: '20px' }}
              whiteSpace="nowrap"
            >
              <Trans>New eggs in</Trans>
            </Text>
            <Box w="90px">
              <QuinoaTimer
                seconds={restockSeconds}
                showHours={false}
                showDays={false}
              />
            </Box>
          </McFlex>
          <McFlex orient="right">
            <RestockButton shopType={ShopType.Egg} />
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
            {eggShopInventory.map((item) => (
              <PurchasableShopItem
                key={item.eggId}
                purchaseItem={item}
                onPurchase={handleEggPurchase}
                onToggleExpanded={handleToggleExpanded}
                isExpanded={expandedItem === item.eggId}
                scrollableContainerRef={scrollableContainerRef}
              />
            ))}
            <McFlex p={3} pt={2} auto>
              <Text
                fontSize={{ base: 'xs', md: 'sm' }}
                color="rgba(255, 255, 255, 0.7)"
                textAlign="center"
                fontStyle="italic"
                lineHeight="1.2"
              >
                <Trans>
                  This game is in early access. More pets and updates coming
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

export default EggShopModal;
