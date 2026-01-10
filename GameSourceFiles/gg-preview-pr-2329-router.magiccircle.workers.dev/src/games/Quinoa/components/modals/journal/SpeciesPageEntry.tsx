import { Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import type { FaunaSpeciesId } from '@/common/games/Quinoa/systems/fauna';
import {
  type FloraSpeciesId,
  floraSpeciesDex,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import type { JournalVariant } from '@/common/games/Quinoa/systems/journal';
import {
  type MutationId,
  mutationsDex,
} from '@/common/games/Quinoa/systems/mutation';
import type {
  CropInventoryItem,
  PetInventoryItem,
} from '@/common/games/Quinoa/user-json-schema/current';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import colors from '../../../../../theme/colors';
import { myCropJournalAtom, myPetJournalAtom } from '../../../atoms/myAtoms';
import JournalStamp from './JournalStamp';

interface SpeciesPageEntryProps {
  variant: JournalVariant;
  speciesId: FloraSpeciesId | FaunaSpeciesId;
  isWaitingForAnimation?: boolean;
}

const SpeciesPageEntry: React.FC<SpeciesPageEntryProps> = ({
  variant,
  speciesId,
  isWaitingForAnimation = false,
}) => {
  const cropJournal = useAtomValue(myCropJournalAtom);
  const petJournal = useAtomValue(myPetJournalAtom);
  const isSmallScreen = useIsSmallScreen();
  const isCrop = speciesId in floraSpeciesDex;

  let loggedVariants: JournalVariant[];
  let logDate: number | undefined;

  if (isCrop) {
    loggedVariants =
      cropJournal?.[speciesId as FloraSpeciesId]?.variantsLogged.map(
        (entry) => entry.variant
      ) || [];
    logDate = cropJournal?.[speciesId as FloraSpeciesId]?.variantsLogged.find(
      (entry) => entry.variant === variant
    )?.createdAt;
  } else {
    loggedVariants =
      petJournal?.[speciesId as FaunaSpeciesId]?.variantsLogged.map(
        (entry) => entry.variant
      ) || [];
    logDate = petJournal?.[speciesId as FaunaSpeciesId]?.variantsLogged.find(
      (entry) => entry.variant === variant
    )?.createdAt;
  }

  const isLogged = loggedVariants.includes(variant);
  const isUnknown = !isLogged || isWaitingForAnimation;

  const mutations: MutationId[] = ['Normal', 'Max Weight'].includes(variant)
    ? []
    : [variant as MutationId];

  // Construct the inventory item for JournalStamp
  const item: CropInventoryItem | PetInventoryItem = isCrop
    ? {
        id: `journal-${speciesId}-${variant}`,
        itemType: ItemType.Produce,
        species: speciesId as FloraSpeciesId,
        scale: 1,
        mutations,
      }
    : {
        id: `journal-${speciesId}-${variant}`,
        itemType: ItemType.Pet,
        petSpecies: speciesId as FaunaSpeciesId,
        mutations,
        // Display-only defaults (not used for rendering)
        hunger: 100,
        name: null,
        xp: 0,
        targetScale: 1,
        abilities: [],
      };

  // Get the display name - use mutation name if it's a mutation, otherwise use variant name
  const getDisplayName = (variant: JournalVariant): string => {
    if (variant === 'Normal' || variant === 'Max Weight') {
      return variant;
    }
    // Check if this variant is a mutation and get its actual name
    const mutation = mutationsDex[variant];
    return mutation ? mutation.name : variant;
  };

  return (
    <McGrid
      templateRows="1fr auto"
      gap={2}
      alignItems="center"
      justifyItems="center"
    >
      <JournalStamp
        item={item}
        width={isSmallScreen ? '80px' : '100px'}
        height={isSmallScreen ? '80px' : '100px'}
        isUnknown={isUnknown}
        isMaxWeight={variant === 'Max Weight'}
        logDate={logDate}
      />
      <McFlex
        bg="Brown.Dark"
        p={1}
        borderRadius="10px"
        autoW
        minW={isSmallScreen ? '80px' : '90px'}
      >
        <Text
          fontSize={isSmallScreen ? '12px' : '14px'}
          color={colors.MagicWhite}
          textAlign="center"
          fontWeight={isUnknown ? 'normal' : 'bold'}
        >
          {isUnknown ? '???' : getDisplayName(variant)}
        </Text>
      </McFlex>
    </McGrid>
  );
};

export default SpeciesPageEntry;
