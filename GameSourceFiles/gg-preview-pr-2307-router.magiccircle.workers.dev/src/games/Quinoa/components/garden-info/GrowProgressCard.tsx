import { Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { EggsDex } from '@/common/games/Quinoa/systems/fauna';
import {
  floraSpeciesDex,
  HarvestType,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { MutationId } from '@/common/games/Quinoa/systems/mutation';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import { getTargetSize } from '@/common/games/Quinoa/utils/plants';
import McFlex from '@/components/McFlex/McFlex';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import {
  isGardenObjectMatureAtom,
  myCurrentGardenObjectAtom,
  myCurrentGrowSlotAtom,
  secondsUntilCurrentGrowSlotMaturesAtom,
  secondsUntilEarliestActionAtom,
} from '@/Quinoa/atoms/myAtoms';
import SpeciesAttributes from '@/Quinoa/components/SpeciesAttributes';
import InventorySprite from '../InventorySprite';

/**
 * Component that displays grow progress information for a specific crop slot or egg.
 * Shows the crop/egg sprite, name, mutations, and time remaining to grow/hatch.
 */
const GrowProgressCard: React.FC = () => {
  const isGardenObjectMature = useAtomValue(isGardenObjectMatureAtom);
  const gardenObject = useAtomValue(myCurrentGardenObjectAtom);
  const growSlot = useAtomValue(myCurrentGrowSlotAtom);
  const isSmallScreen = useIsSmallScreen();
  const secondsUntilEarliestAction = useAtomValue(
    secondsUntilEarliestActionAtom
  );
  const secondsUntilCurrentGrowSlotMatures = useAtomValue(
    secondsUntilCurrentGrowSlotMaturesAtom
  );
  const secondsRemaining = isGardenObjectMature
    ? secondsUntilCurrentGrowSlotMatures
    : secondsUntilEarliestAction;

  if (!gardenObject) {
    return null;
  }
  let name: string;
  let mutations: MutationId[] = [];
  let targetSize: number | undefined;
  let inventoryItem: InventoryItem | undefined;
  let canvasScale = 1;

  switch (gardenObject.objectType) {
    case 'egg': {
      name = EggsDex[gardenObject.eggId].name;
      inventoryItem = {
        itemType: ItemType.Egg,
        eggId: gardenObject.eggId,
        quantity: 1,
      };
      break;
    }
    case 'plant': {
      if (!growSlot) {
        return null;
      }
      const harvestType = floraSpeciesDex[growSlot.species].plant.harvestType;
      name = floraSpeciesDex[growSlot.species].crop.name;
      mutations = growSlot.mutations;
      targetSize = getTargetSize(growSlot.species, growSlot.targetScale);
      canvasScale = 2;

      if (harvestType === HarvestType.Multiple) {
        inventoryItem = {
          itemType: ItemType.Produce,
          id: 'preview',
          species: growSlot.species,
          scale: growSlot.targetScale,
          mutations: growSlot.mutations,
        };
      } else {
        inventoryItem = {
          itemType: ItemType.Plant,
          id: 'preview',
          species: growSlot.species,
          slots: [growSlot],
          plantedAt: gardenObject.plantedAt,
          maturedAt: gardenObject.maturedAt,
        };
      }
      break;
    }
    default: {
      return null;
    }
  }
  return (
    <McFlex
      bg="rgba(0, 0, 0, 0.65)"
      borderRadius={isSmallScreen ? '8px' : '12px'}
      px={isSmallScreen ? 2 : 3}
      py={isSmallScreen ? 1 : 2}
      auto
      width={isSmallScreen ? '160px' : '220px'}
    >
      <McFlex gap={{ base: 1, md: 2 }}>
        {inventoryItem && (
          <McFlex autoW>
            <InventorySprite
              item={inventoryItem}
              size={isSmallScreen ? '26px' : '32px'}
              canvasScale={canvasScale}
            />
          </McFlex>
        )}
        <McFlex col gap={1}>
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
          <SpeciesAttributes
            mutations={mutations}
            targetSize={targetSize}
            infoIconProps={{
              right: '-14px',
              boxSize: { base: '11px', md: '13px' },
            }}
          />
          <Text
            fontSize={isSmallScreen ? '10px' : '15px'}
            color="rgba(255, 255, 255, 0.6)"
            fontWeight="extrabold"
            lineHeight="1.2"
            whiteSpace="nowrap"
            pl={1}
          >
            {secondsRemaining}
          </Text>
        </McFlex>
      </McFlex>
    </McFlex>
  );
};

export default GrowProgressCard;
