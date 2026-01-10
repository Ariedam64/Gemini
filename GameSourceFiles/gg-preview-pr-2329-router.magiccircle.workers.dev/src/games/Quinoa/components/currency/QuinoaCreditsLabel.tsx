import { Box, Image } from '@chakra-ui/react';
import DonutIcon from '@/components/Currency/DonutIcon.webp';
import QuinoaCurrencyLabel, {
  QuinoaCurrencyLabelProps,
} from './QuinoaCurrencyLabel';

export interface QuinoaCreditsLabelProps
  extends Omit<QuinoaCurrencyLabelProps, 'currencyIcon' | 'currencyAmount'> {
  /** The number of credits to display */
  amount: number;
  /** Size variant for the label */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeConfigs = {
  sm: {
    iconSize: '20px',
  },
  md: {
    iconSize: '24px',
  },
  lg: {
    iconSize: '36px',
  },
  xl: {
    iconSize: '50px',
  },
};

const defaultStrokedTextProps = {
  color: 'MagicBlack',
  strokeColor: 'none',
  fontStyle: 'italic bold',
};

/**
 * A wrapper component for displaying credits amounts with consistent styling.
 * This is a convenience wrapper around QuinoaCurrencyLabel with a credits icon.
 */
const QuinoaCreditsLabel: React.FC<QuinoaCreditsLabelProps> = ({
  amount,
  size = 'md',
  strokedTextProps,
  showTooltip,
  tooltipFontSize,
}) => {
  const config = sizeConfigs[size];

  const creditsIcon = (
    <Box w={config.iconSize} h={config.iconSize} flexShrink={0}>
      <Image src={DonutIcon} alt="Donuts" boxSize={config.iconSize} />
    </Box>
  );

  return (
    <QuinoaCurrencyLabel
      currencyAmount={amount}
      currencyIcon={creditsIcon}
      size={size}
      strokedTextProps={strokedTextProps || defaultStrokedTextProps}
      showTooltip={showTooltip}
      tooltipFontSize={tooltipFontSize}
    />
  );
};

export default QuinoaCreditsLabel;
