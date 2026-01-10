import { Button, Text } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { setActiveModal } from '@/Quinoa/atoms/modalAtom';
import useItemSize from '../../hooks/useItemSize';
import Sprite from '../Sprite';

interface InventoryMoreItemsButtonProps {
  numExtraItems: number;
}

const InventoryMoreItemsButton: React.FC<InventoryMoreItemsButtonProps> = ({
  numExtraItems,
}) => {
  const size = useItemSize();
  const { t } = useLingui();

  return (
    <McTooltip label={t`Inventory [e]`} showOnDesktopOnly>
      <Button
        variant="blank"
        w={`${size}px`}
        h={`${size}px`}
        minW={`${size}px`}
        minH={`${size}px`}
        onClick={(e) => {
          e.stopPropagation();
          setActiveModal('inventory');
        }}
        pointerEvents="auto"
      >
        {numExtraItems > 0 && (
          <McFlex
            position="absolute"
            top={0}
            right={0}
            borderRadius="full"
            w="22px"
            h="22px"
            zIndex={1}
            bg="linear-gradient(135deg, #ad7932 60%, #8b5c2a 100%)"
            opacity={0.92}
          >
            <Text fontSize="12px" fontWeight="bold" whiteSpace="nowrap">
              +{numExtraItems}
            </Text>
          </McFlex>
        )}
        <Sprite
          width="100%"
          height="100%"
          spriteName="sprite/ui/InventoryBag"
        />
      </Button>
    </McTooltip>
  );
};

export default InventoryMoreItemsButton;
