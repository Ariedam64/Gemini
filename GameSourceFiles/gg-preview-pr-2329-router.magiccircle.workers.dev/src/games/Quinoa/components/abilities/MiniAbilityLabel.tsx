import { Box } from '@chakra-ui/react';
import {
  type FaunaAbilityId,
  faunaAbilitiesDex,
  faunaAbilitySortFn,
} from '@/common/games/Quinoa/systems/fauna/faunaAbilitiesDex';
import {
  type FloraAbilityId,
  floraAbilitiesDex,
} from '@/common/games/Quinoa/systems/flora';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { getAbilityColor } from '@/Quinoa/constants/colors';
import { getWeatherBorderColor } from './utils';

const sizeConfigs = {
  xs: {
    base: '4px',
    md: '6px',
  },
  sm: {
    base: '6px',
    md: '8px',
  },
  md: {
    base: '8px',
    md: '10px',
  },
  lg: {
    base: '10px',
    md: '12px',
  },
  xl: {
    base: '12px',
    md: '16px',
  },
};

interface MiniAbilityLabelProps {
  abilityIds: FaunaAbilityId[] | FloraAbilityId[];
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  direction?: 'row' | 'column';
}

const MiniAbilityLabel: React.FC<MiniAbilityLabelProps> = ({
  abilityIds,
  size = 'sm',
  direction = 'column',
}) => {
  const config = sizeConfigs[size];
  // Sort abilities: fauna abilities use the sort function, flora abilities maintain order
  const sortedAbilityIds =
    abilityIds.length > 0 && abilityIds[0] in faunaAbilitiesDex
      ? (abilityIds as FaunaAbilityId[]).toSorted(faunaAbilitySortFn)
      : abilityIds;

  return (
    <McFlex auto gap={0.5} flexDirection={direction}>
      {sortedAbilityIds.map((abilityId) => {
        const abilityBlueprint =
          abilityId in faunaAbilitiesDex
            ? faunaAbilitiesDex[abilityId as FaunaAbilityId]
            : abilityId in floraAbilitiesDex
              ? floraAbilitiesDex[abilityId as FloraAbilityId]
              : null;
        if (!abilityBlueprint) {
          return null;
        }
        const colors = getAbilityColor(abilityId);
        // Check if ability has required weather and get border color
        const requiredWeather =
          'requiredWeather' in abilityBlueprint.baseParameters
            ? abilityBlueprint.baseParameters.requiredWeather
            : undefined;
        const weatherBorderColor = requiredWeather
          ? getWeatherBorderColor(requiredWeather)
          : undefined;

        return (
          <McTooltip
            key={abilityId}
            label={abilityBlueprint.name}
            keepOpenOnDesktopClick
          >
            <Box
              w={config}
              h={config}
              bg={colors.bg}
              _hover={{ bg: colors.hover }}
              borderRadius="2px"
              transition="background-color 0.2s"
              borderWidth={weatherBorderColor ? '1px' : '0'}
              borderColor={weatherBorderColor ?? 'transparent'}
              boxSizing="border-box"
            />
          </McTooltip>
        );
      })}
    </McFlex>
  );
};

export default MiniAbilityLabel;
