import { Box, CloseButton, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import type { PanInfo } from 'framer-motion';
import { getDefaultStore, useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  useCallback,
  useDeferredValue,
  useMemo,
  useRef,
  useState,
} from 'react';
import { decorDex } from '@/common/games/Quinoa/systems/decor';
import {
  EggsDex,
  faunaAbilitiesDex,
  faunaSpeciesDex,
} from '@/common/games/Quinoa/systems/fauna';
import { floraSpeciesDex } from '@/common/games/Quinoa/systems/flora';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import { toolsDex } from '@/common/games/Quinoa/systems/tools';
import { getInventoryItemId } from '@/common/games/Quinoa/utils/inventory';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import useIsSmallWidth from '@/hooks/useIsSmallWidth';
import { closeActiveModal } from '@/Quinoa/atoms/modalAtom';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import {
  itemTypeFiltersAtom,
  myInventoryItemsAtom,
} from '../../atoms/inventoryAtoms';
import {
  explicitlySelectItem,
  myPossiblyNoLongerValidSelectedItemIndexAtom,
  myValidatedSelectedItemIndexAtom,
} from '../../atoms/myAtoms';
import useItemSize from '../../hooks/useItemSize';
import QuinoaModal from '../modals/QuinoaModal';
import DraggableInventoryItem from './DraggableInventoryItem';
import InventorySearch from './InventorySearch';
import ItemTypeFilter from './ItemTypeFilter';

const { get } = getDefaultStore();

const gapSize = 4;

const InventoryModal: React.FC = () => {
  const itemSize = useItemSize();
  const isSmallWidth = useIsSmallWidth();
  const inventoryItems = useAtomValue(myInventoryItemsAtom);
  const selectedItemIndex = useAtomValue(myValidatedSelectedItemIndexAtom);
  const itemRefs = useRef(new Map<string, HTMLDivElement>());
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemTypeFilters, setItemTypeFilters] = useAtom(itemTypeFiltersAtom);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [hoverDirection, setHoverDirection] = useState<'left' | 'right'>(
    'right'
  );
  const [isAnyItemDragging, setIsAnyItemDragging] = useState(false);
  const [dragReadyItemId, setDragReadyItemId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const setSelectedItemIndex = useSetAtom(
    myPossiblyNoLongerValidSelectedItemIndexAtom
  );

  const filteredInventory = useMemo(
    () =>
      inventoryItems.filter((item) => {
        // First filter by item type (only if any filters are selected)
        if (itemTypeFilters.size > 0) {
          // NOTE: The Pet Hutch is technically a decor item, but we display it in the tool shop
          // to players and should filter it as a tool. This special case will be removed once we
          // introduce building classification, but until then the Pet Hutch is classified as a tool.
          const isPetHutch =
            item.itemType === ItemType.Decor && item.decorId === 'PetHutch';
          const effectiveItemType = isPetHutch ? ItemType.Tool : item.itemType;

          if (!itemTypeFilters.has(effectiveItemType)) {
            return false;
          }
        }
        // Then filter by search query
        if (deferredSearchQuery === '') {
          return true;
        }
        switch (item.itemType) {
          case ItemType.Produce: {
            const name = floraSpeciesDex[item.species].crop.name;
            return (
              name.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
              item.mutations.some((mutation) =>
                mutation
                  .toLowerCase()
                  .includes(deferredSearchQuery.toLowerCase())
              )
            );
          }
          case ItemType.Seed: {
            const name = floraSpeciesDex[item.species].seed.name;
            return name
              .toLowerCase()
              .includes(deferredSearchQuery.toLowerCase());
          }
          case ItemType.Plant: {
            const name = floraSpeciesDex[item.species].plant.name;
            return (
              name.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
              item.slots
                .flat()
                .some((slot) =>
                  slot.mutations.some((mutation) =>
                    mutation
                      .toLowerCase()
                      .includes(deferredSearchQuery.toLowerCase())
                  )
                )
            );
          }
          case ItemType.Tool: {
            const name = toolsDex[item.toolId].name;
            return name
              .toLowerCase()
              .includes(deferredSearchQuery.toLowerCase());
          }
          case ItemType.Egg: {
            const name = EggsDex[item.eggId].name;
            return name
              .toLowerCase()
              .includes(deferredSearchQuery.toLowerCase());
          }
          case ItemType.Pet: {
            const speciesName = faunaSpeciesDex[item.petSpecies].name;
            const abilityNames = item.abilities.map((ability) =>
              faunaAbilitiesDex[ability].name.toLowerCase()
            );
            return (
              item.name
                ?.toLowerCase()
                .includes(deferredSearchQuery.toLowerCase()) ||
              speciesName
                .toLowerCase()
                .includes(deferredSearchQuery.toLowerCase()) ||
              item.mutations.some((mutation) =>
                mutation
                  .toLowerCase()
                  .includes(deferredSearchQuery.toLowerCase())
              ) ||
              abilityNames.some((name) =>
                name.toLowerCase().includes(deferredSearchQuery.toLowerCase())
              )
            );
          }
          case ItemType.Decor: {
            const name = decorDex[item.decorId].name;
            return name
              .toLowerCase()
              .includes(deferredSearchQuery.toLowerCase());
          }
          default:
            return false;
        }
      }),
    [inventoryItems, deferredSearchQuery, itemTypeFilters]
  );

  const handleItemTypeFilterChange = (
    itemType: ItemType,
    isChecked: boolean
  ) => {
    const newFilters = new Set(itemTypeFilters);
    if (isChecked) {
      newFilters.add(itemType);
    } else {
      newFilters.delete(itemType);
    }
    setItemTypeFilters(newFilters);
  };

  const handleClearFilters = useCallback(() => {
    setItemTypeFilters(new Set());
    setSearchQuery('');
  }, [setItemTypeFilters]);

  const handleItemSelect = useCallback(
    (itemId: string) => {
      // avoid re-creating the callback function when the inventory items atom value changes
      const inventoryItemsLatestAtomValue = get(myInventoryItemsAtom);
      const itemIndex = inventoryItemsLatestAtomValue.findIndex(
        (i) => getInventoryItemId(i) === itemId
      );
      explicitlySelectItem(itemIndex);
    },
    [explicitlySelectItem]
  );

  const handleDrag = useCallback(
    (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
      draggedItemId: string
    ) => {
      const point = info.point;
      let foundTarget = false;
      const draggedItemIndex = inventoryItems.findIndex(
        (i) => getInventoryItemId(i) === draggedItemId
      );

      for (const item of filteredInventory) {
        const targetItemId = getInventoryItemId(item);
        if (targetItemId === draggedItemId) continue;

        const node = itemRefs.current.get(targetItemId);
        if (!node) continue;

        const rect = node.getBoundingClientRect();
        if (
          point.x >= rect.left &&
          point.x <= rect.right &&
          point.y >= rect.top &&
          point.y <= rect.bottom
        ) {
          // Find the target item's current index
          const targetItemIndex = inventoryItems.findIndex(
            (i) => getInventoryItemId(i) === targetItemId
          );

          // Set hover direction and item based on drag direction
          if (draggedItemIndex < targetItemIndex) {
            // Moving from earlier to later: animate left, bar on left
            setHoverDirection('left');
            setHoveredItemId(targetItemId);
          } else {
            // Moving from later to earlier: animate right, bar on right
            setHoverDirection('right');
            setHoveredItemId(targetItemId);
          }
          foundTarget = true;
          break;
        }
      }
      if (!foundTarget) {
        setHoveredItemId(null);
      }
    },
    [filteredInventory, itemRefs]
  );

  const handleDragStart = useCallback(
    (itemId: string) => {
      setIsAnyItemDragging(true);
      const itemIndex = inventoryItems.findIndex(
        (i) => getInventoryItemId(i) === itemId
      );
      if (itemIndex > -1) {
        setSelectedItemIndex(itemIndex);
      }
    },
    [filteredInventory, setSelectedItemIndex]
  );

  const handleDragReady = useCallback(
    (itemId: string | null) => {
      setDragReadyItemId(itemId);
    },
    [setDragReadyItemId]
  );

  const handleDragEnd = useCallback(
    (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
      draggedItemId: string
    ): boolean => {
      setIsAnyItemDragging(false); // Reset global drag state
      setHoveredItemId(null); // Clear hover state on drop
      const point = info.point;
      const draggedNode = itemRefs.current.get(draggedItemId);
      // Find the current index of the dragged item
      const draggedItemIndex = inventoryItems.findIndex(
        (i) => getInventoryItemId(i) === draggedItemId
      );
      // 1. Check for a direct drop on any OTHER item
      for (const item of filteredInventory) {
        const targetItemId = getInventoryItemId(item);
        if (targetItemId === draggedItemId) {
          continue; // Skip self
        }
        const node = itemRefs.current.get(targetItemId);
        if (!node) {
          continue;
        }
        const rect = node.getBoundingClientRect();
        if (
          point.x >= rect.left &&
          point.x <= rect.right &&
          point.y >= rect.top &&
          point.y <= rect.bottom
        ) {
          // Direct hit on another item
          const targetItemIndex = inventoryItems.findIndex(
            (i) => getInventoryItemId(i) === targetItemId
          );
          // Calculate the correct target index accounting for array shifting
          const toInventoryIndex = targetItemIndex;
          // Return false early if we're moving the item to its current index
          if (toInventoryIndex === draggedItemIndex) {
            return false;
          }
          setSelectedItemIndex(toInventoryIndex);
          sendQuinoaMessage({
            type: 'MoveInventoryItem',
            moveItemId: draggedItemId,
            toInventoryIndex,
          });
          return true;
        }
      }
      // 2. If no direct drop, check if the drop was in an empty space inside the container
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        if (
          point.x >= containerRect.left &&
          point.x <= containerRect.right &&
          point.y >= containerRect.top &&
          point.y <= containerRect.bottom
        ) {
          // Before we assume it's an empty space, check if we're just dropping on ourselves
          if (draggedNode) {
            const rect = draggedNode.getBoundingClientRect();
            if (
              point.x >= rect.left &&
              point.x <= rect.right &&
              point.y >= rect.top &&
              point.y <= rect.bottom
            ) {
              return false; // It was a drop on self, so invalid.
            }
          }
          // It was dropped in an empty space. Move to the end.
          let toInventoryIndex = inventoryItems.length;
          // If moving from an earlier position to the end, adjust for array shifting
          if (draggedItemIndex < toInventoryIndex) {
            toInventoryIndex = toInventoryIndex - 1;
          }
          // Return false early if we're moving the item to its current index
          if (toInventoryIndex === draggedItemIndex) {
            return false;
          }
          setSelectedItemIndex(toInventoryIndex);
          sendQuinoaMessage({
            type: 'MoveInventoryItem',
            moveItemId: draggedItemId,
            toInventoryIndex,
          });
          return true;
        }
      }
      // Dropped on itself or outside the container, so it's an invalid move.
      return false;
    },
    [filteredInventory, itemRefs, setSelectedItemIndex]
  );
  return (
    <QuinoaModal
      // disable onclick so it doesn't close the modal when trying to drag/click items
      onClick={undefined}
      onPointerDown={closeActiveModal}
    >
      <McGrid
        autoH
        maxH="100%"
        templateRows={isSmallWidth ? 'auto auto 1fr' : 'auto 1fr'}
        borderRadius="15px"
        bg="MagicBlack"
        borderWidth="3px"
        borderColor="Brown.Dark"
        boxShadow="xl"
        overflow="hidden"
        pb={1}
        px={1}
        w={{
          base: `calc(${itemSize}px * 4 + ${gapSize}px * 10)`,
          sm: `calc(${itemSize}px * 5 + ${gapSize}px * 11)`,
          md: `calc(${itemSize}px * 8 + ${gapSize}px * 14)`,
          lg: `calc(${itemSize}px * 10 + ${gapSize}px * 16)`,
        }}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <McGrid
          templateColumns={isSmallWidth ? '1fr auto' : '1fr auto'}
          gap={2}
          alignItems="center"
          p={2}
          pb={isSmallWidth ? 0 : 2}
        >
          {!isSmallWidth && (
            <McFlex gap={1}>
              <ItemTypeFilter
                itemTypeFilters={itemTypeFilters}
                onItemTypeFilterChange={handleItemTypeFilterChange}
                onClearFilters={handleClearFilters}
              />
              <InventorySearch
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </McFlex>
          )}
          <McFlex orient="top right">
            <CloseButton w="15px" ml={1} onClick={closeActiveModal} />
          </McFlex>
        </McGrid>
        {isSmallWidth && (
          <Box pb={2}>
            <ItemTypeFilter
              itemTypeFilters={itemTypeFilters}
              onItemTypeFilterChange={handleItemTypeFilterChange}
              onClearFilters={handleClearFilters}
            />
          </Box>
        )}
        {filteredInventory.length === 0 ? (
          <McFlex>
            <Text
              color="Neutral.DarkGrey"
              fontStyle="italic"
              textAlign="center"
              fontSize={{ base: 'xs', md: 'sm' }}
              pb="40px"
            >
              {inventoryItems.length > 0 ? (
                <Trans>No items found matching your filters.</Trans>
              ) : (
                <Trans>Your inventory is empty.</Trans>
              )}
            </Text>
          </McFlex>
        ) : (
          <McFlex
            orient="top"
            overflowY="auto"
            overflowX="hidden"
            p={`${gapSize}px`}
            sx={{
              '&::-webkit-scrollbar': {
                width: '4px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '3px',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                },
              },
            }}
          >
            <McFlex
              ref={containerRef}
              wrap="wrap"
              autoH
              orient="top left"
              gap={`${gapSize}px`}
              w={{
                base: `calc(${itemSize}px * 4 + ${gapSize}px * 3)`,
                sm: `calc(${itemSize}px * 5 + ${gapSize}px * 4)`,
                md: `calc(${itemSize}px * 8 + ${gapSize}px * 7)`,
                lg: `calc(${itemSize}px * 10 + ${gapSize}px * 9)`,
              }}
            >
              {filteredInventory.map((item, index) => {
                const itemId = getInventoryItemId(item);
                return (
                  <div
                    key={itemId}
                    ref={(node) => {
                      if (node) {
                        itemRefs.current.set(itemId, node);
                      } else {
                        itemRefs.current.delete(itemId);
                      }
                    }}
                  >
                    <DraggableInventoryItem
                      item={item}
                      inventoryItemId={itemId}
                      index={searchQuery ? undefined : index}
                      isSelected={
                        selectedItemIndex !== null &&
                        getInventoryItemId(
                          inventoryItems[selectedItemIndex]
                        ) === getInventoryItemId(item)
                      }
                      onItemSelect={handleItemSelect}
                      onDragReady={searchQuery ? undefined : handleDragReady}
                      onDragStart={searchQuery ? undefined : handleDragStart}
                      onDrag={searchQuery ? undefined : handleDrag}
                      onDragEnd={searchQuery ? undefined : handleDragEnd}
                      isOpaque={true}
                      dragConstraintsRef={containerRef}
                      isHoveredTarget={hoveredItemId === itemId}
                      hoverDirection={hoverDirection}
                      isAnyItemDragging={isAnyItemDragging}
                      isDragReadyForAnyItem={dragReadyItemId !== null}
                    />
                  </div>
                );
              })}
            </McFlex>
          </McFlex>
        )}
      </McGrid>
    </QuinoaModal>
  );
};

export default InventoryModal;
