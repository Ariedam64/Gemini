import { Box } from '@chakra-ui/react';
import {
  type FaunaAbilityId,
  faunaAbilitiesDex,
} from '@/common/games/Quinoa/systems/fauna/faunaAbilitiesDex';
import {
  type FloraAbilityId,
  floraAbilitiesDex,
} from '@/common/games/Quinoa/systems/flora';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { getAbilityColor } from '@/Quinoa/constants/colors';

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

  return (
    <McFlex auto gap={0.5} flexDirection={direction}>
      {abilityIds.map((abilityId) => {
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
            />
          </McTooltip>
        );
      })}
    </McFlex>
  );
};

export default MiniAbilityLabel;
