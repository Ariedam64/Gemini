import { Box, Text } from '@chakra-ui/layout';
import { Trans } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { faunaSpeciesDex } from '@/common/games/Quinoa/systems/fauna';
import {
  getAge,
  getPetScale,
  getTargetStrength,
} from '@/common/games/Quinoa/utils/pets';
import McFlex from '@/components/McFlex/McFlex';
import { myPetsProgressAtom } from '../../atoms/myAtoms';
import SpeciesAttributes from '../SpeciesAttributes';

interface PetStatsBarProps {
  petId: string;
}

const PetStatsBar: React.FC<PetStatsBarProps> = ({ petId }) => {
  const petsProgress = useAtomValue(myPetsProgressAtom);
  const { speciesId, targetScale, xp, mutations } = petsProgress[petId];
  const { matureWeight } = faunaSpeciesDex[speciesId];

  const targetStrength = getTargetStrength(speciesId, targetScale);
  const scale = getPetScale({
    speciesId,
    xp,
    targetScale,
  });
  const currentAge = Math.floor(getAge(xp)).toLocaleString();
  const weight = scale * matureWeight;
  return (
    <McFlex pt={1}>
      <Box px={2}>
        <Text
          fontSize={{ base: '10px', md: '12px', lg: '14px' }}
          fontWeight="bold"
          color="rgba(255, 255, 255, 0.6)"
          whiteSpace="nowrap"
        >
          <Trans>Age: {currentAge}</Trans>
        </Text>
      </Box>
      <Box px={2}>
        <Text
          fontSize={{ base: '10px', md: '12px', lg: '14px' }}
          fontWeight="bold"
          color="rgba(255, 255, 255, 0.6)"
          whiteSpace="nowrap"
        >
          <Trans>MAX STR: {targetStrength}</Trans>
        </Text>
      </Box>
      <Box px={2}>
        <SpeciesAttributes
          mutations={mutations}
          weight={weight}
          fontSize={{ base: '10px', md: '12px', lg: '14px' }}
          isCompact={true}
        />
      </Box>
    </McFlex>
  );
};

export default PetStatsBar;
