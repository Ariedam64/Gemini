import { Text } from '@chakra-ui/layout';
import { Trans, useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import {
  type FloraAbilityBaseParameters,
  type FloraAbilityId,
  floraAbilitiesDex,
} from '@/common/games/Quinoa/systems/flora';
import { weatherDex } from '@/common/games/Quinoa/systems/weather';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { weatherAtom } from '@/Quinoa/atoms/baseAtoms';
import {
  getAbilityDescription,
  getPlantAbilityLabelDetails,
} from '@/Quinoa/components/abilities/AbilityDescriptions';
import { getAbilityColor } from '@/Quinoa/constants/colors';
import { getContrastingColor } from '@/utils/getContrastingColor';
import AbilityLabel from './AbilityLabel';

interface PlantAbilityProps {
  abilityId: FloraAbilityId;
  showSpecs?: boolean;
  isMature?: boolean;
}

const PlantAbility: React.FC<PlantAbilityProps> = ({
  abilityId,
  showSpecs = true,
  isMature = true,
}) => {
  const weather = useAtomValue(weatherAtom);
  const abilityColor = getAbilityColor(abilityId);
  const ability = floraAbilitiesDex[abilityId];
  const isRequiredWeather = weather === ability.baseParameters.requiredWeather;
  const requiredWeatherName =
    weatherDex[ability.baseParameters.requiredWeather].name;
  const isInactive = showSpecs && (!isMature || !isRequiredWeather);
  const { t } = useLingui();

  const abilityLabels = Object.entries(ability.baseParameters).flatMap(
    ([key, value]) => {
      if (typeof value !== 'number') {
        return [];
      }
      const baseParameter = key as FloraAbilityBaseParameters;
      const label = getPlantAbilityLabelDetails(baseParameter, value);
      return label !== null ? [{ baseParameter, ...label }] : [];
    }
  );

  const tooltipContent = (
    <McFlex col gap={1} p={1}>
      {isInactive && (
        <Text
          fontSize="12px"
          fontWeight="bold"
          color="Red.Light"
          align="center"
        >
          <Trans>
            INACTIVE:{' '}
            {isMature ? t`Not ${requiredWeatherName}` : t`Plant still growing`}
          </Trans>
        </Text>
      )}
      <Text
        fontSize="12px"
        fontWeight="bold"
        align="center"
        lineHeight="1.2"
        maxWidth="200px"
      >
        {getAbilityDescription(abilityId)}
      </Text>
      {showSpecs && (
        <>
          <McFlex h="1px" bg="Neutral.DarkGrey" />
          <McFlex col auto>
            {abilityLabels.map(({ baseParameter, ...labelProps }) => (
              <AbilityLabel key={baseParameter} {...labelProps} />
            ))}
          </McFlex>
        </>
      )}
    </McFlex>
  );

  return (
    <McTooltip label={tooltipContent} keepOpenOnDesktopClick>
      <McFlex
        bg={isInactive ? 'rgba(60, 60, 60, 0.92)' : abilityColor.bg}
        px={{ base: 1, md: 2 }}
        py={1}
        borderRadius="6px"
        _hover={{
          bg: isInactive ? 'rgba(60, 60, 60, 0.8)' : abilityColor.hover,
        }}
        auto
        opacity={isInactive ? 0.6 : 1}
        position="relative"
        borderWidth={isInactive ? 2 : 0}
        borderColor={isInactive ? 'Red.Dark' : 'transparent'}
      >
        <Text
          fontSize={{ base: '10px', md: '12px' }}
          fontWeight="semibold"
          color={isInactive ? 'white' : getContrastingColor(abilityColor.bg)}
        >
          {ability.name}
        </Text>
      </McFlex>
    </McTooltip>
  );
};

export default PlantAbility;
