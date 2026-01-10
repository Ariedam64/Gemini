import { Button } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import StrokedText from '@/components/StrokedText/StrokedText';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import QuinoaCoinLabel from '../../currency/QuinoaCoinLabel';

export const PurchaseWithCoinsButton = ({
  isInStock,
  canAfford,
  onClick,
  coinPrice,
}: {
  isInStock: boolean;
  canAfford: boolean;
  onClick: () => void;
  coinPrice: number;
}) => {
  const isSmallScreen = useIsSmallScreen();
  const strokedTextProps = canAfford
    ? undefined
    : {
        color: 'Red.Light',
      };
  const isDisabled = !isInStock || !canAfford;

  return (
    <Button
      w="100%"
      h="40px"
      borderRadius="8px"
      onClick={onClick}
      bg={isDisabled ? 'Neutral.Grey' : 'Green.Magic'}
      isDisabled={isDisabled}
      borderBottom="3px solid rgba(0,0,0,0.4)"
      _active={
        isDisabled
          ? undefined
          : {
              borderBottomWidth: '1px',
              borderBottomColor: 'rgba(0,0,0,0.2)',
              boxShadow: 'inset 0 3px 2px rgba(0,0,0,0.2)',
            }
      }
      transition="transform 0.2s ease"
    >
      {isInStock ? (
        <QuinoaCoinLabel
          amount={coinPrice}
          size={isSmallScreen ? 'sm' : 'md'}
          strokedTextProps={strokedTextProps}
          showTooltip={false}
        />
      ) : (
        <StrokedText
          color="white"
          strokeColor="black"
          shadowHeight={0}
          fontSize={{ base: '16px', lg: '18px' }}
          fontWeight="bold"
          mt={1}
        >
          <Trans>NO STOCK</Trans>
        </StrokedText>
      )}
    </Button>
  );
};
