import { CloseButton, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { ShopItem } from '@/common/games/Quinoa/systems/shop';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { AuthenticationOptions } from '@/components/ui/authentication/AuthenticationOptions';
import InventorySprite from './InventorySprite';

interface SurfaceExclusiveModalContentProps {
  item: ShopItem;
  onClose: () => void;
}

const SurfaceExclusiveModalContent: React.FC<
  SurfaceExclusiveModalContentProps
> = ({ item, onClose }) => {
  // Get item data based on type
  const getItemData = () => {
    if (item.itemType === ItemType.Seed) {
      const { seed } = floraSpeciesDex[item.species];
      const inventoryItem: InventoryItem = {
        itemType: ItemType.Seed,
        species: item.species,
        quantity: 1,
      };
      return {
        name: seed.name,
        inventoryItem,
      };
    }
    throw new Error('Only seed items are supported for this modal');
  };

  const itemData = getItemData();

  return (
    <>
      <McGrid
        templateColumns="auto 1fr auto"
        alignItems="center"
        bg="Brown.Magic"
        p={3}
      >
        <InventorySprite
          item={itemData.inventoryItem}
          size="30px"
          canvasScale={2}
        />
        <Text fontWeight="bold" fontSize="lg" color="white" textAlign="center">
          <Trans>Platform-Exclusive Seed</Trans>
        </Text>
        <CloseButton onClick={onClose} color="white" />
      </McGrid>
      <McFlex
        orient="top"
        auto
        col
        gap={4}
        py={4}
        px={{ base: 4, md: 6 }}
        overflowY="auto"
        maxH="50vh"
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
        <Text fontSize="sm" textAlign="center" lineHeight="1.5">
          <Trans>
            <strong>{itemData.name}</strong> only spawns naturally on the web
            and the iOS app. You can always purchase it with donuts.
          </Trans>
        </Text>
        <AuthenticationOptions
          showSignInAndOutButton={false}
          showPlayOnWebButton
        />
      </McFlex>
    </>
  );
};

export default SurfaceExclusiveModalContent;
