import { Box, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import { EggsDex } from '@/common/games/Quinoa/systems/fauna';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import { getTargetSize } from '@/common/games/Quinoa/utils/plants';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import {
  myCurrentGardenObjectAtom,
  myCurrentGrowSlotAtom,
} from '@/Quinoa/atoms/myAtoms';
import { isGardenItemInfoCardHiddenAtom } from '@/Quinoa/atoms/taskAtoms';
import InventorySprite from '@/Quinoa/components/InventorySprite';
import SpeciesAttributes, {
  type SpeciesAttributesProps,
} from '@/Quinoa/components/SpeciesAttributes';
import { getDecorTileInfo } from '../QuinoaCanvas/legacy/QuinoaCanvasUtils';
import Sprite from '../Sprite';

/**
 * Component that displays harvest information for a specific crop slot.
 * Shows the crop sprite, name, mutations, and weight.
 */
const GardenItemInfoCard: React.FC = () => {
  const growSlot = useAtomValue(myCurrentGrowSlotAtom);
  const gardenObject = useAtomValue(myCurrentGardenObjectAtom);
  const isSmallScreen = useIsSmallScreen();
  const isInfoCardHidden = useAtomValue(isGardenItemInfoCardHiddenAtom);

  if (isInfoCardHidden || !gardenObject) {
    return null;
  }

  const spriteSize = isSmallScreen ? '26px' : '32px';
  let speciesAttributes: SpeciesAttributesProps | undefined;
  let name: string;
  let item: InventoryItem | undefined;
  let canvasScale: number | undefined;
  // For rotated decor, we need to render via Sprite directly
  let rotatedDecorTileInfo: ReturnType<typeof getDecorTileInfo> | undefined;

  switch (gardenObject.objectType) {
    case 'plant': {
      if (!growSlot) {
        return null;
      }
      const { baseWeight, name: cropName } =
        floraSpeciesDex[growSlot.species].crop;
      name = cropName;
      speciesAttributes = {
        mutations: growSlot.mutations,
        weight: growSlot.targetScale * baseWeight,
        targetSize: getTargetSize(growSlot.species, growSlot.targetScale),
        fontSize: { base: '12px', md: '14px' },
      };
      item = {
        itemType: ItemType.Produce,
        id: growSlot.species,
        species: growSlot.species,
        scale: growSlot.targetScale,
        mutations: growSlot.mutations,
      };
      canvasScale = 2;
      break;
    }
    case 'egg': {
      name = EggsDex[gardenObject.eggId].name;
      item = {
        itemType: ItemType.Egg,
        eggId: gardenObject.eggId,
        quantity: 1,
      };
      break;
    }
    case 'decor': {
      name = decorDex[gardenObject.decorId].name;
      if (gardenObject.rotation === 0) {
        item = {
          itemType: ItemType.Decor,
          decorId: gardenObject.decorId,
          quantity: 1,
        };
      } else {
        rotatedDecorTileInfo = getDecorTileInfo(
          gardenObject.decorId,
          gardenObject.rotation
        );
      }
      break;
    }
  }
  // Render sprite: rotated decor uses Sprite directly, everything else uses InventorySprite
  let sprite: React.ReactNode;
  if (rotatedDecorTileInfo) {
    sprite = (
      <Sprite
        tileRef={rotatedDecorTileInfo.tileRef}
        flipH={rotatedDecorTileInfo.flipH}
        flipV={rotatedDecorTileInfo.flipV}
        width={spriteSize}
        height={spriteSize}
        unpremultiply
      />
    );
  } else if (item) {
    sprite = (
      <InventorySprite
        item={item}
        size={spriteSize}
        canvasScale={canvasScale}
      />
    );
  }
  return (
    <Box
      bg="rgba(0, 0, 0, 0.65)"
      borderRadius={isSmallScreen ? '8px' : '12px'}
      px={isSmallScreen ? 2 : 3}
      py={isSmallScreen ? 1 : 2}
      width={isSmallScreen ? '160px' : '220px'}
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <McGrid
        templateColumns="auto 1fr"
        alignItems="center"
        gap={{ base: 1, md: 2 }}
      >
        {sprite}
        <McFlex col autoW gap={1}>
          <Text
            fontSize={{ base: isSmallScreen ? '12px' : '16px', lg: '18px' }}
            fontWeight="bold"
            color="white"
            textTransform="uppercase"
            letterSpacing="0.5px"
            lineHeight="1"
            textAlign="center"
          >
            {name}
          </Text>
          {speciesAttributes && (
            <SpeciesAttributes
              {...speciesAttributes}
              infoIconProps={{
                right: '-14px',
                boxSize: { base: '11px', md: '13px' },
              }}
            />
          )}
        </McFlex>
      </McGrid>
    </Box>
  );
};

export default GardenItemInfoCard;
