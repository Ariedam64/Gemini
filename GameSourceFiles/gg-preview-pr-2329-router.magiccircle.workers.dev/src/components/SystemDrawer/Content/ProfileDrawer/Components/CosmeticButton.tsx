import { Button, Text } from '@chakra-ui/react';
import type { CosmeticItem_MaybeLocked } from '@/common/resources/cosmetics/cosmeticTypes';
import CosmeticImage from '@/components/Cosmetics/CosmeticImage';
import McFlex from '@/components/McFlex/McFlex';
import { useUser } from '@/user';

export interface CosmeticButtonProps {
  isSelected: boolean;
  onClick: (item: CosmeticItem_MaybeLocked) => void;
  item: CosmeticItem_MaybeLocked;
  avatar: readonly string[];
}

const CosmeticButton: React.FC<CosmeticButtonProps> = ({
  isSelected,
  item,
  avatar,
  onClick,
}) => {
  const { user } = useUser();
  const currencyBalance = user?.currencyBalance ?? 0;
  const itemPrice = item.price ?? 0;

  return (
    <McFlex
      position="relative"
      borderWidth="4px"
      borderColor={isSelected ? 'MagicWhite' : 'Neutral.DarkGrey'}
      borderRadius="20px"
      overflow="hidden"
      aspectRatio="5/6"
    >
      <Button
        variant="blank"
        w="100%"
        h="100%"
        onClick={() => onClick(item)}
        data-testid={`cosmetic-button-${item.type}-${item.id}`}
      >
        <McFlex col orient="bottom" pt={8}>
          <McFlex opacity={item.isLocked ? 0.7 : 1}>
            <CosmeticImage
              type={item.type}
              filename={item.filename}
              avatar={avatar}
            />
          </McFlex>
          <McFlex
            col
            autoH
            orient="bottom left"
            bg="Neutral.EarlGrey"
            zIndex={1} // Fixes a visual bug on iphone7
          >
            <Text
              textAlign="left"
              fontWeight="bold"
              pl="8px"
              pt="1px"
              pb="5px"
              color="white"
              flexWrap="wrap"
              fontSize="14px"
            >
              {item.displayName}
            </Text>
          </McFlex>
        </McFlex>
        {item.isLocked && (
          <McFlex
            autoH
            position="absolute"
            top="5px"
            left="5px"
            orient="space-between"
            pr="9px"
          >
            <Text
              textAlign="left"
              fontWeight="bold"
              color="MagicWhite"
              bg={currencyBalance >= itemPrice ? undefined : 'Red.Dark'}
              p={currencyBalance >= itemPrice ? undefined : '1px 4px'}
              borderRadius={currencyBalance >= itemPrice ? undefined : '4px'}
            >
              {`🍞 ${itemPrice.toLocaleString()}`}
            </Text>
          </McFlex>
        )}
      </Button>
    </McFlex>
  );
};

export default CosmeticButton;
