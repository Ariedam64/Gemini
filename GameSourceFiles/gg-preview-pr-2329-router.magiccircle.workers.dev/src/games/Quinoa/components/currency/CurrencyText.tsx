import { Box, type BoxProps, Text, type TextProps } from '@chakra-ui/layout';
import { Currency } from '@/common/games/Quinoa/types';
import Sprite from '../Sprite';

interface CurrencyTextProps extends TextProps {
  currency: Currency;
  spriteSize: BoxProps['width'] | BoxProps['height'];
  amount: number;
}

const CurrencyText: React.FC<CurrencyTextProps> = ({
  currency,
  spriteSize,
  amount,
  ...props
}) => {
  const spriteName =
    currency === Currency.Credits ? 'sprite/ui/Donut' : 'sprite/ui/Coin';

  return (
    <Text
      color="MagicBlack"
      as="span"
      whiteSpace="nowrap"
      display="inline-flex"
      alignItems="center"
      fontSize="inherit"
      {...props}
    >
      {amount.toLocaleString()}
      <Box as="span" display="inline-flex" verticalAlign="middle" mr="-1px">
        <Sprite
          spriteName={spriteName}
          width={spriteSize}
          height={spriteSize}
          isNormalizedScale
        />
      </Box>
    </Text>
  );
};

export default CurrencyText;
