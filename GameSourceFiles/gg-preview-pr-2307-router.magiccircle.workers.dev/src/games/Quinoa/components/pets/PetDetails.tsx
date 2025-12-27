import { Box, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { faunaSpeciesDex } from '@/common/games/Quinoa/systems/fauna';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { PetSlot } from '@/common/games/Quinoa/user-json-schema/current';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import McTooltip from '@/components/McTooltip/McTooltip';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { myFavoritedItemIdsAtom } from '@/Quinoa/atoms/inventoryAtoms';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { getMyInventoryCapacityStatus } from '@/Quinoa/utils/getMyInventoryCapacityStatus';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import {
  mySelectedItemAtom,
  setExpandedPetSlotId,
  setSelectedIndexToEnd,
  setSelectedIndexToNextItemInPetDiet,
} from '../../atoms/myAtoms';
import { playPetSoundEffect } from '../../audio';
import PetAbility from '../abilities/PetAbility';
import InventorySprite from '../InventorySprite';
import { myPetPositionsAtom } from '../QuinoaWorld/useMyPetEffects';
import HungerBar from './HungerBar';
import PetDiet from './PetDiet';
import PetName from './PetName';
import PetStatsBar from './PetStatsBar';
import PetStrengthLabel from './PetStrengthLabel';
import StrengthBar from './StrengthBar';

interface PetDetailsProps {
  petSlot: PetSlot;
}

const PetDetails: React.FC<PetDetailsProps> = ({ petSlot }) => {
  const isSmallScreen = useIsSmallScreen();
  const favoritedItemIds = useAtomValue(myFavoritedItemIdsAtom);
  const selectedItem = useAtomValue(mySelectedItemAtom);
  const { t } = useLingui();
  const setPetPositions = useSetAtom(myPetPositionsAtom);
  const { diet, name } = faunaSpeciesDex[petSlot.petSpecies];
  const isCropItem = selectedItem?.itemType === ItemType.Produce;
  const isPetItem = selectedItem?.itemType === ItemType.Pet;
  const isFavorited = isCropItem && favoritedItemIds.includes(selectedItem.id);
  const isCropInDiet =
    isCropItem &&
    diet.some((dietSpecies) => dietSpecies === selectedItem.species);
  const isFeedableItem = isCropItem && !isFavorited && isCropInDiet;

  const onFeed = useCallback(() => {
    if (!isFeedableItem) {
      return;
    }
    setSelectedIndexToNextItemInPetDiet();
    sendQuinoaMessage({
      type: 'FeedPet',
      petItemId: petSlot.id,
      cropItemId: selectedItem.id,
    });
  }, [isFeedableItem, selectedItem, setSelectedIndexToNextItemInPetDiet]);

  const onSwap = useCallback(() => {
    if (!isPetItem) {
      return;
    }
    setPetPositions((prev) => {
      const newPositions = { ...prev };
      const prevPetPosition = prev[petSlot.id];
      if (prevPetPosition) {
        newPositions[selectedItem.id] = prevPetPosition;
        delete newPositions[petSlot.id];
      }
      return newPositions;
    });
    playPetSoundEffect(selectedItem.petSpecies);
    sendQuinoaMessage({
      type: 'SwapPet',
      petSlotId: petSlot.id,
      petInventoryId: selectedItem.id,
    });
  }, [isPetItem, selectedItem, setPetPositions]);

  const onStore = useCallback(() => {
    const { isInventoryFull, isItemAtMaxQuantity } =
      getMyInventoryCapacityStatus({
        itemType: ItemType.Pet,
        id: petSlot.petSpecies,
      });
    if (isInventoryFull) {
      sendQuinoaToast({
        title: t`Inventory full`,
        description: t`Free up space to store ${petSlot.name ?? t`your ${name}`}.`,
        variant: 'error',
      });
      return;
    }
    if (isItemAtMaxQuantity) {
      sendQuinoaToast({
        title: t`Max stack size reached`,
        description: t`Your ${name} stack is full.`,
        variant: 'error',
      });
      return;
    }
    setPetPositions((prev) => {
      const newPositions = { ...prev };
      delete newPositions[petSlot.id];
      return newPositions;
    });
    setSelectedIndexToEnd();
    setExpandedPetSlotId(null);
    sendQuinoaMessage({
      type: 'StorePet',
      itemId: petSlot.id,
    });
  }, [setPetPositions, petSlot.name]);

  const onNamePet = (petItemId: string, name: string) => {
    sendQuinoaMessage({
      type: 'NamePet',
      petItemId,
      name,
    });
  };

  return (
    <McFlex
      col
      bg="rgba(0, 0, 0, 0.65)"
      p={2}
      borderRadius="10px"
      pointerEvents="auto"
      position="relative"
      gap={0.5}
    >
      <PetName petId={petSlot.id} onNameChange={onNamePet} />
      <PetStatsBar petId={petSlot.id} />
      {/* NOTE: This McGrid MUST have an explicit height property or the component will be 100% screen height on iOS < 16 */}
      <McGrid
        templateColumns="55px 1fr"
        alignItems="center"
        px={2}
        height="40px"
      >
        <McFlex orient="right" pr={1}>
          <Text
            fontSize={{ base: isSmallScreen ? '11px' : '13px', lg: '15px' }}
          >
            <Trans>Hunger</Trans>
          </Text>
        </McFlex>
        <HungerBar petId={petSlot.id} height={10} />
        <McFlex orient="right" pr={1}>
          <Text
            fontSize={{ base: isSmallScreen ? '11px' : '13px', lg: '15px' }}
            whiteSpace="nowrap"
          >
            <PetStrengthLabel petId={petSlot.id} />
          </Text>
        </McFlex>
        <StrengthBar petId={petSlot.id} height={10} />
      </McGrid>
      <McFlex gap={2} pt={2}>
        <McTooltip
          label={
            isPetItem
              ? t`Swap with ${selectedItem.name ?? faunaSpeciesDex[selectedItem.petSpecies].name}`
              : t`Store in inventory`
          }
          showOnDesktopOnly
        >
          <Button
            onClick={isPetItem ? onSwap : onStore}
            py={0}
            px={3}
            h="40px"
            bg="Neutral.EarlGrey"
            borderRadius="10px"
          >
            <McFlex gap={2}>
              <Text fontWeight="bold" fontSize={{ base: '12px', lg: '14px' }}>
                {isPetItem ? <Trans>Swap</Trans> : <Trans>Pick up</Trans>}
              </Text>
              {isPetItem && <InventorySprite item={selectedItem} size="20px" />}
            </McFlex>
          </Button>
        </McTooltip>
        <McFlex position="relative" auto>
          <McTooltip
            label={
              isFeedableItem
                ? t`Replenish hunger`
                : isCropItem && !isCropInDiet
                  ? t`Crop is not in diet`
                  : isFavorited
                    ? t`Cannot feed favorited crop`
                    : t`No crop selected`
            }
            placement="bottom-start"
            keepOpenOnDesktopClick={!isFeedableItem}
            showOnDesktopOnly={isFeedableItem}
          >
            <Button
              as="span" // Allow tooltip to work even when disabled
              isDisabled={!isFeedableItem}
              onClick={onFeed}
              p={0}
              w="120px"
              h="40px"
              variant="outline"
              borderWidth="2px"
              borderRadius="10px"
            >
              <McFlex gap={2}>
                <Text fontWeight="bold" fontSize={{ base: '14px', lg: '16px' }}>
                  <Trans>Feed</Trans>
                </Text>
                {isCropItem && (
                  <InventorySprite
                    item={selectedItem}
                    size="20px"
                    canvasScale={2}
                  />
                )}
              </McFlex>
            </Button>
          </McTooltip>
          <Box
            position="absolute"
            top={1}
            right={0}
            transform="translateY(-35%) translateX(35%)"
            zIndex={1}
          >
            <PetDiet petDiet={diet} />
          </Box>
        </McFlex>
      </McFlex>

      {/* Pet Abilities */}
      {petSlot.abilities.length > 0 && (
        <McFlex col gap={1} pt={2} auto>
          <Text
            fontSize={{ base: '12px', lg: '14px' }}
            fontWeight="bold"
            color="gray.300"
          >
            <Trans>Abilities</Trans>
          </Text>
          <McFlex gap={1} wrap="wrap" auto>
            {petSlot.abilities.map((abilityId) => (
              <PetAbility
                key={abilityId}
                abilityId={abilityId}
                petId={petSlot.id}
              />
            ))}
          </McFlex>
        </McFlex>
      )}
    </McFlex>
  );
};

export default PetDetails;
