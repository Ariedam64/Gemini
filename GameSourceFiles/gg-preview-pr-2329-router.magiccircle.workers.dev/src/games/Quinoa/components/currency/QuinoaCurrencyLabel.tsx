import { Box } from '@chakra-ui/layout';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import StrokedText from '@/components/StrokedText/StrokedText';
import type { StrokedTextProps } from '@/components/StrokedText/StrokedTextProps';
import strokedTextSizeConfigs from '@/Quinoa/constants/strokedTextSizeConfigs';
import type { ChakraColor } from '@/theme/types';

/**
 * Formats a currency amount to show M for million and B for billion with two decimal places.
 * Always rounds down to ensure accurate representation.
 * Only shows decimal places when they're not zero.
 * @param amount - The currency amount to format
 * @returns Formatted string with M/B abbreviations
 */
const formatCurrencyAmount = (amount: number): string => {
  if (amount >= 1_000_000_000_000) {
    const trillions = amount / 1_000_000_000_000;
    // Always round down to 2 decimal places
    const roundedTrillions = Math.floor(trillions * 100) / 100;
    const decimal = roundedTrillions % 1;
    return decimal === 0
      ? `${Math.floor(roundedTrillions)}T`
      : `${roundedTrillions.toFixed(2)}T`;
  }
  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    // Always round down to 2 decimal places
    const roundedBillions = Math.floor(billions * 100) / 100;
    const decimal = roundedBillions % 1;
    return decimal === 0
      ? `${Math.floor(roundedBillions)}B`
      : `${roundedBillions.toFixed(2)}B`;
  }
  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    // Always round down to 2 decimal places
    const roundedMillions = Math.floor(millions * 100) / 100;
    const decimal = roundedMillions % 1;
    return decimal === 0
      ? `${Math.floor(roundedMillions)}M`
      : `${roundedMillions.toFixed(2)}M`;
  }
  return amount.toLocaleString();
};

/**
 * Gets the default color based on currency amount.
 * @param amount - The currency amount
 * @returns Object with textColor and strokeColor
 */
const getDefaultColors = (
  amount: number
): { textColor: ChakraColor; strokeColor: ChakraColor } => {
  if (amount >= 1_000_000_000_000) {
    return { textColor: 'rgb(200, 140, 255)', strokeColor: 'MagicBlack' };
  }
  if (amount >= 1_000_000_000) {
    return { textColor: 'Blue.Light', strokeColor: 'MagicBlack' };
  }
  if (amount >= 1_000_000) {
    return { textColor: 'Yellow.Magic', strokeColor: 'MagicBlack' };
  }
  return { textColor: 'MagicWhite', strokeColor: 'MagicBlack' };
};

export interface QuinoaCurrencyLabelProps extends McFlexProps {
  /** The currency amount to display */
  currencyAmount: number;
  /** The currency icon element to display */
  currencyIcon?: React.ReactNode;
  /** Size variant for the label */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Props to pass to the StrokedText component */
  strokedTextProps?: Omit<StrokedTextProps, 'children'>;
  /** Whether to invert the color of the label */
  textColor?: string;
  strokeColor?: string;
  fontStyle?: string;
  showTooltip?: boolean;
  tooltipFontSize?: string;
}

/**
 * A unified component for displaying currency amounts with consistent styling.
 * Takes a currency icon and amount, and renders them with proper styling.
 */
const QuinoaCurrencyLabel: React.FC<QuinoaCurrencyLabelProps> = ({
  currencyAmount,
  currencyIcon,
  size = 'md',
  strokedTextProps,
  textColor,
  strokeColor,
  fontStyle = 'italic',
  showTooltip,
  tooltipFontSize,
  ...props
}) => {
  const config = strokedTextSizeConfigs[size];
  const isTooltipVisible = showTooltip ?? currencyAmount > 1_000_000;
  const defaultColors = getDefaultColors(currencyAmount);
  const finalTextColor = textColor || defaultColors.textColor;
  const finalStrokeColor = strokeColor || defaultColors.strokeColor;

  return (
    <McFlex gap={config.gap} auto pointerEvents="auto" {...props}>
      {currencyIcon}
      <McTooltip
        label={isTooltipVisible ? currencyAmount.toLocaleString() : undefined}
        placement="top"
        fontSize={tooltipFontSize}
        keepOpenOnDesktopClick
      >
        <Box>
          <StrokedText
            fontStyle={fontStyle}
            color={finalTextColor}
            strokeColor={finalStrokeColor}
            strokeWidth={config.strokeWidth}
            fontSize={config.fontSize}
            shadowHeight={0}
            fontWeight="500"
            {...strokedTextProps}
            mb="1px"
          >
            {formatCurrencyAmount(currencyAmount)}
          </StrokedText>
        </Box>
      </McTooltip>
    </McFlex>
  );
};

export default QuinoaCurrencyLabel;
