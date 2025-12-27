import { PropsWithChildren } from 'react';
import { Text } from '@chakra-ui/react';

interface ShopItemBadgeChipProps {
  bg: string;
  color?: string;
}

/**
 * Compact rectangular badge for inline chips in shop items.
 * Keeps a consistent look across various badge types.
 */
const ShopItemBadgeChip: React.FC<
  PropsWithChildren<ShopItemBadgeChipProps>
> = ({ bg, color = 'MagicBlack', children }) => {
  return (
    <Text
      fontSize={{ base: '10px', sm: '11px', md: '13px' }}
      fontWeight="bold"
      color={color}
      bg={bg}
      p={0.5}
      px={1}
      borderRadius="5px"
    >
      {children}
    </Text>
  );
};

export default ShopItemBadgeChip;
