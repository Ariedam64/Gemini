import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import {
  type FaunaSpeciesId,
  faunaSpeciesDex,
  faunaSpeciesIds,
} from '@/common/games/Quinoa/systems/fauna';
import {
  type FloraSpeciesId,
  floraSpeciesDex,
  floraSpeciesIds,
} from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import {
  cropJournalVariants,
  type JournalType,
  type JournalVariant,
  petJournalVariants,
} from '@/common/games/Quinoa/systems/journal';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import McFlex from '@/components/McFlex/McFlex';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { myCropJournalAtom, myPetJournalAtom } from '../../../atoms/myAtoms';
import OverviewPageEntry, {
  type OverviewPageEntryProps,
} from './OverviewPageEntry';

interface OverviewPageProps {
  journalType: JournalType;
  onSelectSpecies: (speciesId: FloraSpeciesId | FaunaSpeciesId) => void;
}

type SpeciesListItem = {
  id: FloraSpeciesId | FaunaSpeciesId;
  name: string;
  inventoryItem: InventoryItem;
  progress: OverviewPageEntryProps['progress'];
};

const calculateProgress = ({
  allVariants,
  loggedVariants,
}: {
  allVariants: JournalVariant[];
  loggedVariants: JournalVariant[];
}) => {
  const numVariantsLogged = loggedVariants.length;
  const numVariantsTotal = allVariants.length;

  return {
    numVariantsLogged,
    numVariantsTotal,
    percentage: (numVariantsLogged / numVariantsTotal) * 100,
  };
};

const OverviewPage: React.FC<OverviewPageProps> = ({
  journalType,
  onSelectSpecies,
}) => {
  const cropJournal = useAtomValue(myCropJournalAtom);
  const petJournal = useAtomValue(myPetJournalAtom);
  const isSmallScreen = useIsSmallScreen();

  let speciesData: SpeciesListItem[] = [];
  let totalNumVariantsLogged = 0;
  let totalNumVariants = 0;

  if (journalType === ItemType.Produce) {
    speciesData = floraSpeciesIds.reduce<SpeciesListItem[]>(
      (acc, speciesId) => {
        const { name } = floraSpeciesDex[speciesId].crop;
        const speciesJournal = cropJournal?.[speciesId];
        const loggedVariants =
          speciesJournal?.variantsLogged.map((entry) => entry.variant) || [];
        const progress = calculateProgress({
          allVariants: cropJournalVariants,
          loggedVariants,
        });
        const inventoryItem: InventoryItem = {
          itemType: ItemType.Produce,
          id: speciesId,
          species: speciesId,
          scale: 1,
          mutations: [],
        };
        totalNumVariantsLogged += progress.numVariantsLogged;
        totalNumVariants += progress.numVariantsTotal;

        acc.push({ id: speciesId, name, inventoryItem, progress });
        return acc;
      },
      []
    );
  } else {
    speciesData = faunaSpeciesIds.reduce<SpeciesListItem[]>(
      (acc, speciesId) => {
        const { name } = faunaSpeciesDex[speciesId];
        const speciesJournal = petJournal?.[speciesId];
        const loggedVariants =
          speciesJournal?.variantsLogged.map((entry) => entry.variant) || [];
        const progress = calculateProgress({
          allVariants: petJournalVariants,
          loggedVariants,
        });
        const inventoryItem: InventoryItem = {
          itemType: ItemType.Pet,
          id: `pet-${speciesId}`,
          petSpecies: speciesId,
          name,
          xp: 0,
          hunger: 100,
          targetScale: 1,
          mutations: [],
          abilities: [],
        };
        totalNumVariantsLogged += progress.numVariantsLogged;
        totalNumVariants += progress.numVariantsTotal;

        acc.push({ id: speciesId, name, inventoryItem, progress });
        return acc;
      },
      []
    );
  }
  const collectedPercentage = Math.floor(
    (totalNumVariantsLogged / totalNumVariants) * 100
  );

  return (
    <McFlex col orient="top" pb={2}>
      <McFlex col autoH py={2}>
        <McFlex auto minH="24px">
          <Text
            fontSize={{ base: isSmallScreen ? '14px' : '20px', lg: '24px' }}
            fontWeight="bold"
            fontFamily="shrikhand"
            color="#4F6981"
            textAlign="center"
            lineHeight="1"
          >
            <Trans>GARDEN JOURNAL</Trans>
          </Text>
        </McFlex>
        <McFlex
          minH="4px"
          h="4px"
          bg="Brown.Pastel"
          borderRadius="full"
          opacity={0.5}
        />
        <McFlex autoH orient="right">
          <Text
            color="Brown.Light"
            fontWeight="bold"
            fontSize={{ base: '10px', md: '11px' }}
          >
            <Trans>
              Collected {collectedPercentage}%{' '}
              <Text
                color="Brown.Light"
                as="span"
                fontWeight="bold"
                fontSize={{ base: '9px', md: '10px' }}
              >
                ({totalNumVariantsLogged}/{totalNumVariants})
              </Text>
            </Trans>
          </Text>
        </McFlex>
      </McFlex>
      <McFlex
        col
        overflowY="auto"
        orient="top"
        gap={5}
        pr={1}
        sx={{
          '&::-webkit-scrollbar': {
            width: '4px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(85, 48, 20, 0.2)', // More dark brown, less gray
            borderRadius: '3px',
            '&:hover': {
              background: 'rgba(110, 60, 24, 0.3)', // Slightly lighter/different dark brown for hover
            },
          },
        }}
      >
        {speciesData.map((species) => (
          <OverviewPageEntry
            key={species.id}
            name={species.name}
            inventoryItem={species.inventoryItem}
            progress={species.progress}
            onClick={() => onSelectSpecies(species.id)}
          />
        ))}
      </McFlex>
    </McFlex>
  );
};

export default OverviewPage;
