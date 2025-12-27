import {
  Box,
  Button,
  ButtonProps,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { PriceUtils } from '@discord/embedded-app-sdk';
import { Trans, useLingui } from '@lingui/react/macro';
import { surface } from '@/environment';
import McFlex from '../McFlex/McFlex';
import DonutPurchaseSuccessWindow from './DonutPurchaseSuccessWindow';
import { PurchasableWithPrice } from './types';

interface DonutPurchaseInterfaceProps {
  purchasables: PurchasableWithPrice[];
  onPurchase: (amount: number) => void;
  error: string | null;
  purchaseError: string | null;
  isPurchaseSuccessModalOpen: boolean;
  onCloseSuccessModal: () => void;
}

// Purchase button component with the specified styling
const PurchaseButton = ({
  price,
  onClick,
}: {
  price?: string;
  onClick: ButtonProps['onClick'];
}) => {
  // For Discord, parse the price format and use PriceUtils
  const formattedPrice =
    price && surface === 'discord' && price.includes(' ')
      ? PriceUtils.formatPrice({
          amount: parseFloat(price.split(' ')[1]) * 100,
          currency: price.split(' ')[0],
        })
      : price;

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick?.(e);
      }}
      borderRadius="12px"
      border="2px solid"
      borderColor="MagicWhite"
      background="linear-gradient(180deg, #D91A5D 0%, #652E91 100%)"
      boxShadow="0px -4px 0px 0px rgba(0, 0, 0, 0.25) inset"
      color="MagicWhite"
      fontWeight="bold"
      height="44px"
      minW="80px"
      px={4}
      fontSize="sm"
      _hover={{
        background: 'linear-gradient(180deg, #C1185A 0%, #5A2985 100%)',
        transform: 'translateY(1px)',
      }}
      _active={{
        transform: 'translateY(2px)',
        boxShadow: '0px -2px 0px 0px rgba(0, 0, 0, 0.25) inset',
      }}
    >
      {formattedPrice || <Trans>Purchase</Trans>}
    </Button>
  );
};

export const DonutPurchaseInterface = ({
  purchasables,
  onPurchase,
  error,
  purchaseError,
  isPurchaseSuccessModalOpen,
  onCloseSuccessModal,
}: DonutPurchaseInterfaceProps) => {
  const { t } = useLingui();

  if (error) {
    return (
      <McFlex col gap={2} py={4}>
        <Text color="Red.Magic">{error}</Text>
      </McFlex>
    );
  }
  // Find the sweet deal card (10,000 donuts)
  const sweetDealCard = purchasables.find((card) => card.amount === 10000);
  const regularCards = purchasables.filter((card) => card.amount !== 10000);

  return (
    <McFlex col gap={4}>
      {purchaseError && (
        <Text color="Red.Magic" fontSize="sm" textAlign="center">
          {purchaseError}
        </Text>
      )}
      <SimpleGrid columns={2} spacing={3} width="100%">
        {regularCards.map((card) => (
          <McFlex key={card.amount} orient="left">
            <Box
              position="relative"
              width="154px"
              height="119px"
              backgroundImage={`url(${card.image})`}
              backgroundSize="cover"
              aria-label={t`${card.amount} Donuts`}
              onClick={() => onPurchase(card.amount)}
            >
              <Box
                position="absolute"
                top="10px"
                right="10px"
                textAlign="right"
              >
                <Text
                  fontFamily="shrikhand"
                  color="MagicWhite"
                  fontSize="md"
                  textShadow="0px 3px 0px rgba(0, 0, 0, 0.25)"
                  lineHeight="100%"
                >
                  {card.amount}
                </Text>
                <Text
                  fontFamily="shrikhand"
                  color="MagicWhite"
                  lineHeight="100%"
                  textShadow="0px 3px 0px rgba(0, 0, 0, 0.25)"
                >
                  Donuts
                </Text>
              </Box>
              {/* Overlay purchase button */}
              <Box position="absolute" bottom="10px" right="10px">
                <PurchaseButton
                  price={card.price}
                  onClick={() => onPurchase(card.amount)}
                />
              </Box>
            </Box>
          </McFlex>
        ))}
      </SimpleGrid>
      {/* Sweet Deal - largest pack displayed separately */}
      {sweetDealCard && (
        <Box
          position="relative"
          borderRadius="16px"
          overflow="hidden"
          width="100%"
          aria-label={t`10,000 Donuts Sweet Deal`}
          role="button"
          tabIndex={0}
          onClick={() => onPurchase(sweetDealCard.amount)}
        >
          <Image
            src={sweetDealCard.image}
            alt="10,000 Donuts Sweet Deal"
            width="100%"
            height="auto"
            borderRadius="16px"
          />
          <Box position="absolute" top="15px" right="20px" textAlign="right">
            <Text
              fontFamily="shrikhand"
              textShadow="0px 4px 0px rgba(0, 0, 0, 0.25)"
              color="MagicWhite"
              fontSize="28px"
              lineHeight="90%"
            >
              10,000
            </Text>
            <Text
              fontFamily="shrikhand"
              color="MagicWhite"
              fontSize="md"
              lineHeight="100%"
              textShadow="0px 3px 0px rgba(0, 0, 0, 0.25)"
            >
              Donuts
            </Text>
          </Box>
          {/* Overlay purchase button */}
          <Box position="absolute" bottom="10px" right="10px">
            <PurchaseButton
              price={sweetDealCard.price}
              onClick={() => onPurchase(sweetDealCard.amount)}
            />
          </Box>
        </Box>
      )}
      {/* Render the purchase success animation */}
      <DonutPurchaseSuccessWindow
        isOpen={isPurchaseSuccessModalOpen}
        onClose={onCloseSuccessModal}
      />
    </McFlex>
  );
};
