import { Box, Button, Icon, IconButton, Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import isEqual from 'lodash/fp/isEqual';
import { memo, useCallback } from 'react';
import { Heart } from 'react-feather';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import {
  EggsDex,
  type FaunaAbilityId,
  faunaSpeciesDex,
} from '@/common/games/Quinoa/systems/fauna';
import {
  type FloraAbilityId,
  floraSpeciesDex,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { MutationId } from '@/common/games/Quinoa/systems/mutation';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import { getInventoryItemId } from '@/common/games/Quinoa/utils/inventory';
import { getPetScale, getStrength } from '@/common/games/Quinoa/utils/pets';
import { getTargetSize } from '@/common/games/Quinoa/utils/plants';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import McTooltip from '@/components/McTooltip/McTooltip';
import { platform } from '@/environment';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import {
  myFavoritedItemIdsAtom,
  myNumPetHutchItemsAtom,
} from '@/Quinoa/atoms/inventoryAtoms';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import { calculateServerNow } from '@/Quinoa/utils/serverNow';
import useItemSize from '../../hooks/useItemSize';
import MiniAbilityLabel from '../abilities/MiniAbilityLabel';
import InventorySprite from '../InventorySprite';
import HungerBar from '../pets/HungerBar';
import SpeciesAttributes from '../SpeciesAttributes';

interface InventoryItemProps {
  item: InventoryItem;
  index?: number;
  isSelected: boolean;
  onItemSelect: (inventoryItemId: string) => void;
  isOpaque?: boolean;
}

const InventoryItemComponent: React.FC<InventoryItemProps> = ({
  item,
  index,
  isSelected,
  onItemSelect,
  isOpaque = false,
}) => {
  const inventoryItemId = getInventoryItemId(item);
  const numPetHutchItems = useAtomValue(myNumPetHutchItemsAtom);
  const favoritedItemIds = useAtomValue(myFavoritedItemIdsAtom);
  const size = useItemSize();
  const isSmallScreen = useIsSmallScreen();
  const { t } = useLingui();

  const selectItem = useCallback(() => {
    onItemSelect(inventoryItemId);
  }, [inventoryItemId]);

  const favoriteItem = useCallback(() => {
    sendQuinoaMessage({
      type: 'ToggleFavoriteItem',
      itemId: inventoryItemId,
    });
  }, [inventoryItemId]);

  const getFontSize = (itemName: string): string => {
    const words = itemName.split(/\s+/);
    const hasLongWord = words.some((word) => word.length >= 11);
    return hasLongWord ? '9px' : '10px';
  };

  let name: string;
  let weight: number | undefined;
  let count: number | undefined;
  let numAdditionalItems: number | undefined;
  let hunger: number | undefined;
  let mutations: MutationId[] = [];
  let allPlantMutations: MutationId[] = [];
  let strength: number | undefined;
  let isHungerDepleted: boolean = false;
  let abilities: FaunaAbilityId[] | FloraAbilityId[] = [];
  let targetSize: number | undefined;
  let canvasScale: number = 1;

  switch (item.itemType) {
    case ItemType.Tool: {
      const { name: toolName } = toolsDex[item.toolId];
      name = toolName;
      count = item.quantity;
      break;
    }
    case ItemType.Decor: {
      const { name: decorName } = decorDex[item.decorId];
      name = decorName;
      count = item.quantity;
      if (item.decorId === 'PetHutch') {
        count = undefined;
        numAdditionalItems = numPetHutchItems;
      }
      break;
    }
    case ItemType.Seed: {
      const { name: seedName } = floraSpeciesDex[item.species].seed;
      name = seedName;
      count = item.quantity;
      const plantBlueprint = floraSpeciesDex[item.species].plant;
      abilities = 'abilities' in plantBlueprint ? plantBlueprint.abilities : [];
      break;
    }
    case ItemType.Produce: {
      const { name: cropName, baseWeight } = floraSpeciesDex[item.species].crop;
      name = cropName;
      mutations = item.mutations;
      weight = item.scale * baseWeight;
      targetSize = getTargetSize(item.species, item.scale);
      canvasScale = 1.9;
      break;
    }
    case ItemType.Plant: {
      const { name: plantName } = floraSpeciesDex[item.species].plant;
      name = plantName;
      const matureSlots = item.slots.filter(
        (slot) => slot.endTime < calculateServerNow()
      );
      numAdditionalItems = matureSlots.length;
      // Collect all unique mutations from mature slots
      const mutationSet = new Set<MutationId>();
      matureSlots.forEach((slot) => {
        slot.mutations.forEach((mutation) => mutationSet.add(mutation));
      });
      allPlantMutations = Array.from(mutationSet);
      const plantBlueprint = floraSpeciesDex[item.species].plant;
      abilities = 'abilities' in plantBlueprint ? plantBlueprint.abilities : [];
      canvasScale = 2;
      break;
    }
    case ItemType.Pet: {
      const { name: petName, matureWeight } = faunaSpeciesDex[item.petSpecies];
      name = item.name || petName;
      hunger = item.hunger;
      const scale = getPetScale({
        speciesId: item.petSpecies,
        xp: item.xp,
        targetScale: item.targetScale,
      });
      strength = getStrength({
        speciesId: item.petSpecies,
        xp: item.xp,
        targetScale: item.targetScale,
      });
      weight = scale * matureWeight;
      mutations = item.mutations;
      isHungerDepleted = hunger <= 0;
      abilities = item.abilities;
      canvasScale = 0.95;
      break;
    }
    case ItemType.Egg: {
      const { name: eggName } = EggsDex[item.eggId];
      name = eggName;
      count = item.quantity;
      break;
    }
    default: {
      // Exhaustive check
      const _exhaustiveCheck: never = item;
      console.error('Invalid item type', _exhaustiveCheck);
      name = '???';
      break;
    }
  }
  const hungryBg = isOpaque ? 'rgb(96, 30, 30)' : 'rgba(166, 0, 0, 0.555)';
  const normalBg = isOpaque ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.65)';
  const currentBg = isHungerDepleted ? hungryBg : normalBg;
  const isFavorited = favoritedItemIds.includes(inventoryItemId);

  const fontSize = getFontSize(name);

  return (
    <Box position="relative">
      <Button
        variant="blank"
        _active={{ backgroundColor: currentBg }}
        color="white"
        position="relative"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          minWidth: `${size}px`,
          minHeight: `${size}px`,
          borderColor: isSelected ? 'white' : 'transparent',
          backgroundColor: currentBg,
        }}
        borderRadius="10px"
        onClick={selectItem}
        onContextMenu={(e: React.MouseEvent) => {
          e.preventDefault();
          favoriteItem();
        }}
        borderWidth="2px"
        _hover={{ borderColor: isSelected ? 'white' : 'grey' }}
        pointerEvents="auto"
      >
        {platform === 'desktop' && index !== undefined && index < 9 && (
          <McFlex position="absolute" top="0px" left="5px" auto>
            <Text fontSize="8px" fontWeight="bold" color="Neutral.Grey">
              {index + 1}
            </Text>
          </McFlex>
        )}
        <McFlex col pb={isSmallScreen ? 0.5 : 1}>
          <McFlex auto mr={1} gap={0.5} zIndex={1}>
            {item.itemType === ItemType.Pet && (
              <SpeciesAttributes
                mutations={mutations}
                showWeightUnit={false}
                fontSize={{ base: '8px' }}
                isCompact={true}
              />
            )}
            {strength !== undefined && (
              <Text fontSize="8px" fontWeight="bold">
                <Trans>STR</Trans> {strength}
              </Text>
            )}
          </McFlex>
          <McGrid templateColumns="1fr auto 1fr" gap={0.5} alignItems="center">
            <Box zIndex={1}>
              <MiniAbilityLabel abilityIds={abilities} />
            </Box>
            <InventorySprite
              item={item}
              size={isSmallScreen ? '24px' : '30px'}
              canvasScale={canvasScale}
            />
          </McGrid>
          <McFlex
            auto
            minH={
              item.itemType === ItemType.Pet
                ? undefined
                : isSmallScreen
                  ? '18px'
                  : '20px'
            }
          >
            <Text
              style={{
                fontSize,
              }}
              fontWeight="bold"
              lineHeight="1"
              noOfLines={item.itemType === ItemType.Pet ? 1 : 2}
              overflow="visible"
              zIndex={1}
            >
              {name}
              {numAdditionalItems !== undefined && numAdditionalItems > 0 && (
                <Text
                  as="span"
                  style={{
                    fontSize,
                  }}
                  color="Green.Light"
                  fontWeight="demibold"
                  ml={0.5}
                >
                  +{numAdditionalItems}
                </Text>
              )}
            </Text>
          </McFlex>
          {item.itemType === ItemType.Produce && (
            <McFlex auto pt="2px">
              <SpeciesAttributes
                mutations={mutations}
                weight={weight}
                fontSize={{ base: '8px', md: '10px' }}
                isCompact={true}
                targetSize={targetSize}
              />
            </McFlex>
          )}
          {allPlantMutations.length > 0 && (
            <McFlex auto pt="2px">
              <SpeciesAttributes
                mutations={allPlantMutations}
                fontSize={{ base: '8px', md: '10px' }}
                isCompact={true}
              />
            </McFlex>
          )}
          {count !== undefined && (
            <McFlex auto mb="-4px">
              <Text
                fontSize={isSmallScreen ? '14px' : '16px'}
                lineHeight="1"
                display="flex"
                alignItems="center"
              >
                &times;
              </Text>
              <Text
                fontSize={isSmallScreen ? '10px' : '11px'}
                fontWeight="bold"
                lineHeight="1"
              >
                {count.toLocaleString()}
              </Text>
            </McFlex>
          )}
          {item.itemType === ItemType.Pet && (
            <McGrid autoH px={2.5} pt={isSmallScreen ? '2px' : '3px'}>
              <HungerBar petId={item.id} height={4} isShining={false} />
            </McGrid>
          )}
        </McFlex>
      </Button>
      {[ItemType.Produce, ItemType.Pet].includes(item.itemType) && (
        <McTooltip
          label={<Trans>Favorited items won't be sold or fed</Trans>}
          placement="top"
        >
          <IconButton
            aria-label={t`Favorite`}
            icon={
              <Icon
                as={Heart}
                fill={isFavorited ? 'red' : 'transparent'}
                stroke={isFavorited ? 'red' : 'white'}
                strokeWidth={1}
                boxSize={isSmallScreen ? '12px' : '15px'}
              />
            }
            pointerEvents="auto"
            position="absolute"
            variant="blank"
            top="4px"
            right="4px"
            borderRadius="10px"
            color="white"
            onClick={favoriteItem}
            onContextMenu={(e: React.MouseEvent) => {
              e.preventDefault();
              favoriteItem();
            }}
          />
        </McTooltip>
      )}
    </Box>
  );
};

export default memo(InventoryItemComponent, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
