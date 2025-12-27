import { Text } from '@chakra-ui/layout';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import {
  type FaunaAbilityBaseParameters,
  type FaunaAbilityId,
  faunaAbilitiesDex,
} from '@/common/games/Quinoa/systems/fauna';
import {
  getStrength,
  getStrengthScaleFactor,
} from '@/common/games/Quinoa/utils/pets';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import {
  getAbilityDescription,
  getPetAbilityLabelDetails,
} from '@/Quinoa/components/abilities/AbilityDescriptions';
import { getAbilityColor } from '@/Quinoa/constants/colors';
import { getFormattedPercentage } from '@/Quinoa/utils/formatPercentage';
import { myPetsProgressAtom } from '../../atoms/myAtoms';
import AbilityLabel from './AbilityLabel';

interface PetAbilityProps {
  abilityId: FaunaAbilityId;
  petId: string;
}

const PetAbility: React.FC<PetAbilityProps> = ({ abilityId, petId }) => {
  const ability = faunaAbilitiesDex[abilityId];
  const abilityColor = getAbilityColor(abilityId);
  const petsProgress = useAtomValue(myPetsProgressAtom);
  const { t } = useLingui();
  const { speciesId, xp, targetScale, hunger } = petsProgress[petId];

  const strengthScaleFactor = getStrengthScaleFactor({
    speciesId,
    xp,
    targetScale,
  });
  const strength = getStrength({
    speciesId,
    xp,
    targetScale,
  });
  const isProbabilityPerMinute = ability.trigger === 'continuous';

  const baseProbability =
    'baseProbability' in ability ? ability.baseProbability : Infinity;

  const scaledProbability = baseProbability * strengthScaleFactor;
  const actualProbability = Math.min(100, scaledProbability);

  const formattedProbability = getFormattedPercentage(actualProbability);
  const formattedBaseProbability = getFormattedPercentage(baseProbability);

  const isHungerEmpty = hunger <= 0;

  const abilityLabels = Object.entries(ability.baseParameters).flatMap(
    ([key, value]) => {
      const baseParameter = key as FaunaAbilityBaseParameters;
      const label = getPetAbilityLabelDetails(
        baseParameter,
        value,
        strengthScaleFactor,
        strength
      );
      return label !== null ? [{ baseParameter, ...label }] : [];
    }
  );

  const tooltipContent = (
    <McFlex col gap={1} p={1}>
      {isHungerEmpty && (
        <Text
          fontSize={{ base: '12px', lg: '14px' }}
          fontWeight="bold"
          color="Red.Light"
          align="center"
        >
          <Trans>INACTIVE: Empty hunger</Trans>
        </Text>
      )}
      <Text
        fontSize={{ base: '12px', lg: '14px' }}
        fontWeight="bold"
        align="center"
        lineHeight="1.2"
        maxWidth="200px"
      >
        {getAbilityDescription(abilityId)}
      </Text>
      <McFlex h="1px" bg="Neutral.DarkGrey" />
      <McFlex col auto>
        {baseProbability !== Infinity && (
          <AbilityLabel
            label={
              isProbabilityPerMinute ? t`Chance per minute` : t`Probability`
            }
            calculatedValue={formattedProbability}
            baseValue={formattedBaseProbability}
            strength={strength}
            unit="%"
          />
        )}
        {abilityLabels.map(({ baseParameter, ...labelProps }) => (
          <AbilityLabel key={baseParameter} {...labelProps} />
        ))}
      </McFlex>
    </McFlex>
  );

  return (
    <McTooltip label={tooltipContent} keepOpenOnDesktopClick>
      <McFlex
        bg={isHungerEmpty ? 'rgba(60, 60, 60, 0.92)' : abilityColor.bg}
        px={2}
        py={1}
        borderRadius="6px"
        _hover={{
          bg: isHungerEmpty ? 'rgba(60, 60, 60, 0.8)' : abilityColor.hover,
        }}
        auto
        opacity={isHungerEmpty ? 0.6 : 1}
        position="relative"
        borderWidth={isHungerEmpty ? 2 : 0}
        borderColor={isHungerEmpty ? 'Red.Dark' : 'transparent'}
      >
        <Text fontSize={{ base: '12px', lg: '14px' }} fontWeight="semibold">
          {ability.name}
        </Text>
      </McFlex>
    </McTooltip>
  );
};

export default PetAbility;
