import { Button } from '@chakra-ui/react';
import { getDefaultStore, useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { getInventoryItemId } from '@/common/games/Quinoa/utils/inventory';
import McFlex from '@/components/McFlex/McFlex';
import useIsSmallWidth from '@/hooks/useIsSmallWidth';
import { myInventoryItemsAtom } from '@/Quinoa/atoms/inventoryAtoms';
import { isItemHiglightedInHotbarAtom } from '@/Quinoa/atoms/taskAtoms';
import {
  explicitlySelectItem,
  myValidatedSelectedItemIndexAtom,
} from '../../atoms/myAtoms';
import useItemSize from '../../hooks/useItemSize';
import InventoryItemComponent from '../inventory/InventoryItem';
import TutorialHighlight from '../inventory/TutorialHighlight';
import InventoryMoreItemsButton from './InventoryMoreItemsButton';

const { get } = getDefaultStore();

const gapSize = 4;
const maxVisibleCount = 9;

type InventoryHotbarProps = {};

const InventoryHotbar: React.FC<InventoryHotbarProps> = () => {
  const itemSize = useItemSize();
  const isSmallWidth = useIsSmallWidth();
  const items = useAtomValue(myInventoryItemsAtom);
  const selectedItemIndex = useAtomValue(myValidatedSelectedItemIndexAtom);
  const isItemHighlighted = useAtomValue(isItemHiglightedInHotbarAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItemCount, setVisibleItemCount] = useState(items.length);

  const handleItemSelect = useCallback(
    (inventoryItemId: string) => {
      // avoid re-creating the callback function when the inventory items atom value changes
      const inventoryItemsLatestAtomValue = get(myInventoryItemsAtom);
      const itemIndex = inventoryItemsLatestAtomValue.findIndex(
        (i) => getInventoryItemId(i) === inventoryItemId
      );
      explicitlySelectItem(itemIndex);
    },
    [explicitlySelectItem]
  );

  const calculateOptimalItemCount = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const containerWidth = containerRef.current.clientWidth;
    const moreButtonWidth = itemSize;
    const availableWidthForItems = containerWidth - moreButtonWidth;
    const maxVisibleItems = Math.min(
      maxVisibleCount,
      Math.floor(availableWidthForItems / (itemSize + gapSize))
    );
    const optimalCount = Math.max(0, maxVisibleItems);
    setVisibleItemCount(optimalCount);
  }, [itemSize, gapSize, items.length]);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const observer = new MutationObserver(calculateOptimalItemCount);

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });
    window.addEventListener('resize', calculateOptimalItemCount);
    calculateOptimalItemCount();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', calculateOptimalItemCount);
    };
  }, [calculateOptimalItemCount]);
  // Calculate placeholders: fill up to maxNumPlaceholders when possible
  const maxNumPlaceholders = isSmallWidth ? 9 : 5;
  const numPlaceholderLimit = Math.min(maxNumPlaceholders, visibleItemCount);
  const numItemsReplacingPlaceholders = Math.min(
    items.length,
    numPlaceholderLimit
  );
  const numPlaceholders = Math.max(
    0,
    numPlaceholderLimit - numItemsReplacingPlaceholders
  );
  const numExtraItems = Math.max(0, items.length - visibleItemCount);

  return (
    <McFlex
      ref={containerRef}
      gap={`${gapSize}px`}
      overflow="hidden"
      zIndex={isItemHighlighted ? 'AboveGameModal' : 1}
    >
      {items.slice(0, visibleItemCount).map((item, index) => {
        const inventoryItemId = getInventoryItemId(item);
        return (
          <TutorialHighlight
            isActive={isItemHighlighted && item.itemType === ItemType.Seed}
            key={inventoryItemId}
            showScrim
          >
            <InventoryItemComponent
              item={item}
              index={index}
              isSelected={selectedItemIndex === index}
              onItemSelect={handleItemSelect}
            />
          </TutorialHighlight>
        );
      })}
      {Array.from({ length: numPlaceholders }).map((_, index) => (
        <Button
          key={`placeholder-${index}`}
          variant="blank"
          bg="rgba(0, 0, 0, 0.65)"
          color="white"
          position="relative"
          w={`${itemSize}px`}
          h={`${itemSize}px`}
          minW={`${itemSize}px`}
          minH={`${itemSize}px`}
          borderRadius="10px"
          p={0}
          borderWidth="2px"
          borderColor="transparent"
          pointerEvents="none"
        />
      ))}
      <InventoryMoreItemsButton numExtraItems={numExtraItems} />
    </McFlex>
  );
};

export default InventoryHotbar;
