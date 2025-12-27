import { Box, Button, Text } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type {
  InventoryItem,
  PetSlot,
} from '@/common/games/Quinoa/user-json-schema/current';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { MotionBox } from '@/components/Motion';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import {
  expandedPetSlotIdAtom,
  setExpandedPetSlotId,
} from '../../atoms/myAtoms';
import MiniAbilityLabel from '../abilities/MiniAbilityLabel';
import InventorySprite from '../InventorySprite';
import HungerBar from './HungerBar';
import PetDetails from './PetDetails';
import PetStrengthLabel from './PetStrengthLabel';

interface PetSlotProps {
  petSlot: PetSlot;
}

const PetSlotButton: React.FC<PetSlotProps> = ({ petSlot }) => {
  const isSmallScreen = useIsSmallScreen();
  const size = isSmallScreen ? 56 : 74;
  const expandedPetSlotId = useAtomValue(expandedPetSlotIdAtom);
  const isExpanded = expandedPetSlotId === petSlot.id;
  const isHungerDepleted = petSlot.hunger <= 0;
  const inventoryItem: InventoryItem = {
    itemType: ItemType.Pet,
    petSpecies: petSlot.petSpecies,
    xp: petSlot.xp,
    targetScale: petSlot.targetScale,
    mutations: petSlot.mutations,
    name: petSlot.name,
    hunger: petSlot.hunger,
    id: petSlot.id,
    abilities: petSlot.abilities,
  };

  const onClick = () => {
    setExpandedPetSlotId(isExpanded ? null : petSlot.id);
  };

  return (
    <McFlex auto orient="left" position="relative">
      <AnimatePresence>
        {isExpanded && (
          <MotionBox
            position="absolute"
            top="50%"
            left="100%"
            initial={{ x: -100, y: '-50%', opacity: 0 }}
            animate={{ x: 5, y: '-50%', opacity: 1 }}
            exit={{ x: -100, y: '-50%', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 25,
              mass: 0.8,
            }}
          >
            <PetDetails petSlot={petSlot} />
          </MotionBox>
        )}
      </AnimatePresence>
      <Button
        pointerEvents="auto"
        variant="blank"
        bg={isHungerDepleted ? 'rgba(166, 0, 0, 0.555)' : 'rgba(0, 0, 0, 0.65)'}
        position="relative"
        w={`${size}px`}
        h={`${size}px`}
        minW={`${size}px`}
        minH={`${size}px`}
        borderRadius="10px"
        borderWidth="2px"
        borderColor={isExpanded ? 'white' : 'transparent'}
        _hover={{
          borderColor: isExpanded ? 'white' : 'grey',
        }}
        onClick={onClick}
      >
        <McFlex col pb={0.5}>
          <Text fontSize={isSmallScreen ? '8px' : '10px'} fontWeight="bold">
            <PetStrengthLabel petId={petSlot.id} />
          </Text>
          <McGrid
            templateColumns="1fr auto 1fr"
            alignItems="center"
            gap={isSmallScreen ? 0.5 : 1}
            px={isSmallScreen ? 0.5 : 1}
          >
            <Box zIndex={1}>
              <MiniAbilityLabel abilityIds={petSlot.abilities} />
            </Box>
            <InventorySprite
              item={inventoryItem}
              size={isSmallScreen ? '24px' : '36px'}
            />
          </McGrid>
          <McGrid px={isSmallScreen ? 2 : 2.5} autoH zIndex={1}>
            <HungerBar petId={petSlot.id} height={5} />
          </McGrid>
        </McFlex>
      </Button>
    </McFlex>
  );
};

export default PetSlotButton;
