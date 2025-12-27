import { Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import type { CosmeticItem } from '@/common/resources/cosmetics/cosmeticTypes';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { useCurrencyBalance } from '@/user';
import BreadButton from '../Purchase/BreadButton';
import CosmeticLineItem from './CosmeticLineItem';

interface CosmeticPurchaseModalContentProps {
  cosmeticItems: CosmeticItem[];
  totalCost: number;
  onClose: () => void;
  revertItem: (filename: string) => void;
  onClickPurchase: () => void;
}

const CosmeticPurchaseModalContent: React.FC<
  CosmeticPurchaseModalContentProps
> = ({ cosmeticItems, totalCost, onClose, revertItem, onClickPurchase }) => {
  const currencyBalance = useCurrencyBalance();
  const cantAfford = currencyBalance < totalCost;
  const { t } = useLingui();

  const hasItems = cosmeticItems.length >= 1;
  const title = hasItems ? t`Let's Get It!` : t`Nevermind!`;

  const subtitle = hasItems
    ? t`Buy the locked cosmetics you've selected.`
    : t`You have no locked items selected.`;

  const insufficientFundsText = cantAfford
    ? t`You need more Bread! You have 🍞${currencyBalance.toLocaleString()}.`
    : '';

  const cancelButtonText = hasItems ? t`Cancel` : t`Close`;

  return (
    <McGrid templateRows="auto auto 1fr auto auto" justifyItems="center">
      <Text color="MagicBlack" size="xl" fontWeight="bold">
        {title}
      </Text>
      <McFlex
        p="10px"
        borderRadius="10px"
        bg={hasItems ? 'transparent' : 'Neutral.LightGrey'}
      >
        <Text color="MagicBlack">{subtitle}</Text>
      </McFlex>
      <McFlex col autoH my="15px" gap="10px">
        {cosmeticItems.map((item) => (
          <CosmeticLineItem
            key={item.id}
            type={item.type}
            name={item.displayName}
            filename={item.filename}
            price={item.price}
            onClickRemove={() => revertItem(item.filename)}
          />
        ))}
      </McFlex>
      <Text color="Red.Magic" fontWeight="bold" pt="5px" pb="10px">
        {insufficientFundsText}
      </Text>
      <McGrid templateColumns={hasItems ? '1fr 1fr' : '1fr'} gap="10px">
        <Button bg="Neutral.DarkGrey" onClick={onClose}>
          {cancelButtonText}
        </Button>
        {hasItems && (
          <BreadButton
            amount={totalCost}
            onClick={onClickPurchase}
            isDisabled={cantAfford}
            bg={cantAfford ? 'Neutral.Grey' : undefined}
            textProps={{
              color: cantAfford ? 'Red.Light' : 'MagicWhite',
            }}
          />
        )}
      </McGrid>
    </McGrid>
  );
};

export default CosmeticPurchaseModalContent;
