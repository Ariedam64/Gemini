import type { StrokedTextProps } from '@/components/StrokedText/StrokedTextProps';
import Sprite from '../Sprite';
import QuinoaCurrencyLabel from './QuinoaCurrencyLabel';

const sizeConfigs = {
  xs: {
    iconSize: '16px',
  },
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

interface QuinoaCoinLabelProps {
  amount: number;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  strokedTextProps?: Omit<StrokedTextProps, 'children'>;
  showTooltip?: boolean;
  tooltipFontSize?: string;
}

/**
 * A wrapper component for displaying coin amounts with consistent styling.
 * This is a convenience wrapper around QuinoaCurrencyLabel with a coin icon.
 */
const QuinoaCoinLabel: React.FC<QuinoaCoinLabelProps> = ({
  amount,
  size = 'md',
  strokedTextProps,
  showTooltip,
  tooltipFontSize,
}) => {
  const config = sizeConfigs[size];

  const coinIcon = (
    <Sprite
      spriteName="sprite/ui/Coin"
      width={config.iconSize}
      height={config.iconSize}
    />
  );

  return (
    <QuinoaCurrencyLabel
      currencyAmount={amount}
      currencyIcon={coinIcon}
      size={size}
      strokedTextProps={strokedTextProps}
      showTooltip={showTooltip}
      tooltipFontSize={tooltipFontSize}
    />
  );
};

export default QuinoaCoinLabel;
