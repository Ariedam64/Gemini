import { type IconProps, Text } from '@chakra-ui/react';
import {
  type MutationId,
  mutationSortFn,
} from '@/common/games/Quinoa/systems/mutation';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import InfoIcon from './InfoIcon';
import MutationText from './MutationText';

export interface SpeciesAttributesProps {
  mutations?: MutationId[];
  weight?: number | string;
  targetSize?: number;
  showWeightUnit?: boolean;
  fontSize?: {
    base: string;
    md?: string;
    lg?: string;
  };
  isCompact?: boolean;
  infoIconProps?: IconProps;
}

/**
 * Shared component for rendering species attributes like mutations and weight.
 * Displays mutations with their specific colors and weight information.
 */
const SpeciesAttributes: React.FC<SpeciesAttributesProps> = ({
  mutations = [],
  weight,
  targetSize,
  showWeightUnit = true,
  fontSize = { base: '10px', md: '12px' },
  isCompact = false,
  infoIconProps,
}) => {
  const sortedMutations = mutations.toSorted(mutationSortFn);
  const weightString =
    typeof weight === 'string'
      ? weight
      : weight !== undefined
        ? weight < 1
          ? Math.max(weight, 0.01).toFixed(2)
          : weight < 10
            ? weight.toFixed(1)
            : Math.round(weight).toString()
        : undefined;

  if (sortedMutations.length === 0 && !weightString) {
    return null;
  }

  return (
    <McFlex
      autoW
      columnGap={isCompact ? 0.5 : { base: 0.5, md: 1 }}
      rowGap="1px"
      flexWrap="wrap"
    >
      <McFlex
        auto
        flexWrap="wrap"
        columnGap={isCompact ? 0 : { base: 0.5, md: 1 }}
      >
        {sortedMutations.map((mutation: MutationId) => (
          <MutationText
            key={mutation}
            mutationId={mutation}
            fontSize={fontSize}
            isCompact={isCompact}
            lineHeight={isCompact ? 0.8 : 1.1}
          />
        ))}
      </McFlex>
      {weightString && (
        <McTooltip
          label={targetSize ? `Size: ${targetSize}` : undefined}
          keepOpenOnDesktopClick
        >
          <Text
            fontSize={fontSize}
            color="Neutral.Grey"
            fontWeight="extrabold"
            lineHeight={isCompact ? 0.8 : 1.1}
            whiteSpace="nowrap"
            position="relative"
          >
            {weightString.toLocaleString()}
            {showWeightUnit ? ' kg' : ''}
            {targetSize && (
              <InfoIcon
                position="absolute"
                top="-0.5px"
                right="-11px"
                strokeWidth={2.5}
                // Allow the tooltip to be opened by clicking the info icon
                onClick={() => {}}
                {...infoIconProps}
              />
            )}
          </Text>
        </McTooltip>
      )}
    </McFlex>
  );
};

export default SpeciesAttributes;
