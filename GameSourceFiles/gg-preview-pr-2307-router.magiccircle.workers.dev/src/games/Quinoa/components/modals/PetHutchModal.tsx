import { Button, CloseButton, Text } from '@chakra-ui/react';
import { Trans, useLingui } from '@lingui/react/macro';
import type { PanInfo } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useRef, useState } from 'react';
import { faunaSpeciesDex } from '@/common/games/Quinoa/systems/fauna';
import { ItemType } from '@/common/games/Quinoa/systems/inventory';
import {
  getInventoryItemId,
  petHutchInventoryLimit,
} from '@/common/games/Quinoa/utils/inventory';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { closeActiveModal } from '@/Quinoa/atoms/modalAtom';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { pickupDecor } from '@/Quinoa/data/action/actionFns/pickupDecor';
import { getMyInventoryCapacityStatus } from '@/Quinoa/utils/getMyInventoryCapacityStatus';
import { sendQuinoaMessage } from '@/Quinoa/utils/sendQuinoaMessage';
import {
  myInventoryItemsAtom,
  myPetHutchPetItemsAtom,
  myPetInventoryAtom,
} from '../../atoms/inventoryAtoms';
import useItemSize from '../../hooks/useItemSize';
import DraggableInventoryItem from '../inventory/DraggableInventoryItem';
import QuinoaModal from './QuinoaModal';

const gapSize = 4;

const PetHutchModal: React.FC = () => {
  const itemSize = useItemSize();
  const myPetInventory = useAtomValue(myPetInventoryAtom);
  const myHutchPets = useAtomValue(myPetHutchPetItemsAtom);
  const myInventoryItems = useAtomValue(myInventoryItemsAtom);
  const [selectedHutchIndex, setSelectedHutchIndex] = useState<number | null>(
    null
  );
  const [selectedInventoryIndex, setSelectedInventoryIndex] = useState<
    number | null
  >(null);
  const { t } = useLingui();
  // Drag state management
  const itemRefs = useRef(new Map<string, HTMLDivElement>());
  const containerRef = useRef<HTMLDivElement>(null);
  const hutchRef = useRef<HTMLDivElement>(null);
  const inventoryRef = useRef<HTMLDivElement>(null);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [hoverDirection, setHoverDirection] = useState<'left' | 'right'>(
    'right'
  );
  const [isAnyItemDragging, setIsAnyItemDragging] = useState(false);
  const [dragReadyItemId, setDragReadyItemId] = useState<string | null>(null);
  const [isPendingDragResult, setIsPendingDragResult] = useState(false);

  const handleSelectHutchPet = (index: number) => {
    setSelectedInventoryIndex(null);
    setSelectedHutchIndex((prev) => (prev === index ? null : index));
  };

  const handleSelectInventoryPet = (index: number) => {
    setSelectedHutchIndex(null);
    setSelectedInventoryIndex((prev) => (prev === index ? null : index));
  };

  const handleStorePet = useCallback(() => {
    if (selectedInventoryIndex === null) {
      return;
    }
    const pet = myPetInventory[selectedInventoryIndex];
    if (!pet) {
      return;
    }
    const { name: speciesName } = faunaSpeciesDex[pet.petSpecies];
    if (myHutchPets.length >= petHutchInventoryLimit) {
      sendQuinoaToast({
        title: t`Hutch is full`,
        description: t`Free up space to store ${pet.name ?? t`your ${speciesName}`}.`,
        variant: 'error',
      });
      return;
    }
    sendQuinoaMessage({
      type: 'PutItemInStorage',
      itemId: getInventoryItemId(pet),
      storageId: 'PetHutch',
    });
    if (selectedInventoryIndex === myPetInventory.length - 1) {
      setSelectedInventoryIndex(null);
    }
  }, [selectedInventoryIndex, myPetInventory]);

  const handleRetrievePet = useCallback(() => {
    if (selectedHutchIndex === null) {
      return;
    }
    const pet = myHutchPets[selectedHutchIndex];
    if (!pet) {
      return;
    }
    const { isInventoryFull, isItemAtMaxQuantity } =
      getMyInventoryCapacityStatus({
        itemType: ItemType.Pet,
        id: getInventoryItemId(pet),
      });
    const { name: speciesName } = faunaSpeciesDex[pet.petSpecies];
    if (isInventoryFull) {
      sendQuinoaToast({
        title: t`Inventory full`,
        description: t`Free up space to retrieve ${pet.name ?? t`your ${speciesName}`}.`,
        variant: 'error',
      });
      return;
    }
    if (isItemAtMaxQuantity) {
      sendQuinoaToast({
        title: t`Max stack size reached`,
        description: t`Your ${pet.name ?? t`your ${speciesName}`} stack is full.`,
        variant: 'error',
      });
      return;
    }
    sendQuinoaMessage({
      type: 'RetrieveItemFromStorage',
      itemId: getInventoryItemId(pet),
      storageId: 'PetHutch',
    });
    if (selectedHutchIndex === myHutchPets.length - 1) {
      setSelectedHutchIndex(null);
    }
  }, [selectedHutchIndex, myHutchPets]);

  const handlePickUpHutch = useCallback(() => {
    pickupDecor();
    closeActiveModal();
  }, []);

  const handleItemSelect = useCallback(
    (itemId: string) => {
      // Check if item is in hutch or inventory
      const hutchIndex = myHutchPets.findIndex(
        (pet) => getInventoryItemId(pet) === itemId
      );
      const invIndex = myPetInventory.findIndex(
        (pet) => getInventoryItemId(pet) === itemId
      );
      if (hutchIndex !== -1) {
        handleSelectHutchPet(hutchIndex);
      } else if (invIndex !== -1) {
        handleSelectInventoryPet(invIndex);
      }
    },
    [myHutchPets, myPetInventory]
  );

  const handleDragReady = useCallback((itemId: string | null) => {
    setDragReadyItemId(itemId);
  }, []);

  const handleDragStart = useCallback(
    (itemId: string) => {
      setIsAnyItemDragging(true);
      handleItemSelect(itemId);
    },
    [handleItemSelect]
  );

  const handleDrag = useCallback(
    (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
      draggedItemId: string
    ) => {
      const point = info.point;
      let foundTarget = false;
      // Determine if dragged item is from hutch or inventory
      const draggedFromHutch = myHutchPets.some(
        (pet) => getInventoryItemId(pet) === draggedItemId
      );
      const draggedItemSourceArray = draggedFromHutch
        ? myHutchPets
        : myPetInventory;
      const draggedItemIndex = draggedItemSourceArray.findIndex(
        (pet) => getInventoryItemId(pet) === draggedItemId
      );
      // Check all items (both hutch and inventory) for hover
      const allPets = [...myHutchPets, ...myPetInventory];
      for (const pet of allPets) {
        const targetItemId = getInventoryItemId(pet);
        if (targetItemId === draggedItemId) {
          continue;
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
          // Check if target is in same source as dragged item
          const targetInHutch = myHutchPets.some(
            (p) => getInventoryItemId(p) === targetItemId
          );
          const targetInSameSource =
            (draggedFromHutch && targetInHutch) ||
            (!draggedFromHutch && !targetInHutch);

          if (targetInSameSource) {
            // Show hover direction based on drag direction within same source
            const targetItemIndex = draggedItemSourceArray.findIndex(
              (p) => getInventoryItemId(p) === targetItemId
            );
            if (draggedItemIndex < targetItemIndex) {
              setHoverDirection('left');
            } else {
              setHoverDirection('right');
            }
          } else {
            // Moving between containers: always show left direction
            setHoverDirection('right');
          }
          setHoveredItemId(targetItemId);
          foundTarget = true;
          break;
        }
      }
      if (!foundTarget) {
        setHoveredItemId(null);
      }
    },
    [myHutchPets, myPetInventory, itemRefs]
  );

  const handleDragEnd = useCallback(
    (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo,
      draggedItemId: string
    ): boolean => {
      setIsAnyItemDragging(false);
      setHoveredItemId(null);
      const point = info.point;
      // Helper to handle successful drag completion
      const onDragSuccess = () => {
        setIsPendingDragResult(true);
        // HACK: Clear pending state after server has time to respond
        setTimeout(() => {
          setIsPendingDragResult(false);
        }, 250);
      };
      // Determine source: is it from hutch or inventory?
      const fromHutchIndex = myHutchPets.findIndex(
        (pet) => getInventoryItemId(pet) === draggedItemId
      );
      const fromInventoryIndex = myPetInventory.findIndex(
        (pet) => getInventoryItemId(pet) === draggedItemId
      );
      const isFromHutch = fromHutchIndex !== -1;
      const isFromInventory = fromInventoryIndex !== -1;

      if (!isFromHutch && !isFromInventory) {
        return false; // Item not found
      }
      // Check if dropped on another item
      const allPets = [...myHutchPets, ...myPetInventory];
      for (const pet of allPets) {
        const targetItemId = getInventoryItemId(pet);
        if (targetItemId === draggedItemId) {
          continue;
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
          // Determine destination: is target in hutch or inventory?
          const toHutchIndex = myHutchPets.findIndex(
            (p) => getInventoryItemId(p) === targetItemId
          );
          const toInventoryIndex = myPetInventory.findIndex(
            (p) => getInventoryItemId(p) === targetItemId
          );
          const isToHutch = toHutchIndex !== -1;
          const isToInventory = toInventoryIndex !== -1;
          // Case 1: Moving within hutch
          if (isFromHutch && isToHutch) {
            if (toHutchIndex === fromHutchIndex) {
              return false; // Same position
            }
            sendQuinoaMessage({
              type: 'MoveStorageItem',
              itemId: draggedItemId,
              storageId: 'PetHutch',
              toStorageIndex: toHutchIndex,
            });
            setSelectedHutchIndex(toHutchIndex);
            onDragSuccess();
            return true;
          }
          // Case 2: Moving within inventory
          if (isFromInventory && isToInventory) {
            // Find the actual inventory index (not just pet inventory index)
            const draggedItemInventoryIndex = myInventoryItems.findIndex(
              (item) => getInventoryItemId(item) === draggedItemId
            );
            const targetItemInventoryIndex = myInventoryItems.findIndex(
              (item) => getInventoryItemId(item) === targetItemId
            );
            if (targetItemInventoryIndex === draggedItemInventoryIndex) {
              return false; // Same position
            }
            sendQuinoaMessage({
              type: 'MoveInventoryItem',
              moveItemId: draggedItemId,
              toInventoryIndex: targetItemInventoryIndex,
            });
            setSelectedInventoryIndex(toInventoryIndex);
            onDragSuccess();
            return true;
          }
          // Case 3: Moving from inventory to hutch (store)
          if (isFromInventory && isToHutch) {
            if (myHutchPets.length >= petHutchInventoryLimit) {
              sendQuinoaToast({
                title: t`Hutch is full`,
                description: t`Free up space to store this pet.`,
                variant: 'error',
              });
              return false;
            }
            // Store at the target position (takes the target's place)
            sendQuinoaMessage({
              type: 'PutItemInStorage',
              itemId: draggedItemId,
              storageId: 'PetHutch',
              toStorageIndex: toHutchIndex,
            });
            setSelectedHutchIndex(toHutchIndex);
            setSelectedInventoryIndex(null);
            onDragSuccess();
            return true;
          }
          // Case 4: Moving from hutch to inventory (retrieve)
          if (isFromHutch && isToInventory) {
            const pet = myHutchPets[fromHutchIndex];
            if (!pet) {
              return false;
            }
            const { isInventoryFull, isItemAtMaxQuantity } =
              getMyInventoryCapacityStatus({
                itemType: ItemType.Pet,
                id: draggedItemId,
              });
            if (isInventoryFull) {
              sendQuinoaToast({
                title: t`Inventory full`,
                description: t`Free up space to retrieve this pet.`,
                variant: 'error',
              });
              return false;
            }
            if (isItemAtMaxQuantity) {
              sendQuinoaToast({
                title: t`Max stack size reached`,
                description: t`This pet stack is full.`,
                variant: 'error',
              });
              return false;
            }
            // Retrieve at the target position (takes the target's place)
            const targetItemInventoryIndex = myInventoryItems.findIndex(
              (item) => getInventoryItemId(item) === targetItemId
            );
            sendQuinoaMessage({
              type: 'RetrieveItemFromStorage',
              itemId: draggedItemId,
              storageId: 'PetHutch',
              toInventoryIndex: targetItemInventoryIndex,
            });
            setSelectedInventoryIndex(toInventoryIndex);
            setSelectedHutchIndex(null);
            onDragSuccess();
            return true;
          }
          return false;
        }
      }
      // Not dropped on any specific item, but check if dropped in opposite container area
      // Case: Dropped in hutch area (from inventory)
      if (isFromInventory && hutchRef.current) {
        const hutchRect = hutchRef.current.getBoundingClientRect();
        if (
          point.x >= hutchRect.left &&
          point.x <= hutchRect.right &&
          point.y >= hutchRect.top &&
          point.y <= hutchRect.bottom
        ) {
          if (myHutchPets.length >= petHutchInventoryLimit) {
            sendQuinoaToast({
              title: t`Hutch is full`,
              description: t`Free up space to store this pet.`,
              variant: 'error',
            });
            return false;
          }
          // Store without specifying index (goes to end)
          sendQuinoaMessage({
            type: 'PutItemInStorage',
            itemId: draggedItemId,
            storageId: 'PetHutch',
          });
          setSelectedHutchIndex(myHutchPets.length);
          setSelectedInventoryIndex(null);
          onDragSuccess();
          return true;
        }
      }
      // Case: Dropped in inventory area (from hutch)
      if (isFromHutch && inventoryRef.current) {
        const invRect = inventoryRef.current.getBoundingClientRect();
        if (
          point.x >= invRect.left &&
          point.x <= invRect.right &&
          point.y >= invRect.top &&
          point.y <= invRect.bottom
        ) {
          const pet = myHutchPets[fromHutchIndex];
          if (!pet) {
            return false;
          }
          const { isInventoryFull, isItemAtMaxQuantity } =
            getMyInventoryCapacityStatus({
              itemType: ItemType.Pet,
              id: draggedItemId,
            });

          if (isInventoryFull) {
            sendQuinoaToast({
              title: t`Inventory full`,
              description: t`Free up space to retrieve this pet.`,
              variant: 'error',
            });
            return false;
          }
          if (isItemAtMaxQuantity) {
            sendQuinoaToast({
              title: t`Max stack size reached`,
              description: t`This pet stack is full.`,
              variant: 'error',
            });
            return false;
          }
          // Retrieve without specifying index (goes to end)
          sendQuinoaMessage({
            type: 'RetrieveItemFromStorage',
            itemId: draggedItemId,
            storageId: 'PetHutch',
          });
          setSelectedInventoryIndex(myPetInventory.length);
          setSelectedHutchIndex(null);
          onDragSuccess();
          return true;
        }
      }
      // Not dropped on any item or in opposite container, invalid move
      return false;
    },
    [
      myHutchPets,
      myPetInventory,
      myInventoryItems,
      itemRefs,
      hutchRef,
      inventoryRef,
    ]
  );

  const {
    buttonText,
    actionType,
    isDisabled,
    buttonBg,
  }: {
    buttonText: string;
    actionType: 'store' | 'retrieve' | null;
    isDisabled: boolean;
    buttonBg: string;
  } = useMemo(() => {
    // If currently dragging or waiting for server response, show dragging state
    if (isAnyItemDragging || isPendingDragResult) {
      return {
        buttonText: t`Dragging...`,
        actionType: null,
        isDisabled: true,
        buttonBg: 'Neutral.EarlGrey',
      };
    }
    if (selectedInventoryIndex !== null) {
      const pet = myPetInventory[selectedInventoryIndex];
      if (pet) {
        const { name: speciesName } = faunaSpeciesDex[pet.petSpecies];
        const petName = pet.name ?? speciesName;
        return {
          buttonText: t`Move ${petName} to hutch`,
          actionType: 'store' as const,
          isDisabled: false,
          buttonBg: 'Orange.Dark',
        };
      }
    }
    // Check for retrieve action (only hutch selected)
    if (selectedHutchIndex !== null) {
      const pet = myHutchPets[selectedHutchIndex];
      if (pet) {
        const { name: speciesName } = faunaSpeciesDex[pet.petSpecies];
        const petName = pet.name ?? speciesName;
        return {
          buttonText: t`Move ${petName} to inventory`,
          actionType: 'retrieve' as const,
          isDisabled: false,
          buttonBg: 'Blue.Dark',
        };
      }
    }
    // No selection
    return {
      buttonText: t`No pet selected`,
      actionType: null,
      isDisabled: true,
      buttonBg: 'Neutral.EarlGrey',
    };
  }, [
    isAnyItemDragging,
    isPendingDragResult,
    selectedHutchIndex,
    selectedInventoryIndex,
    myPetInventory,
    myHutchPets,
  ]);

  const handleAction = useCallback(() => {
    if (actionType === 'store') {
      handleStorePet();
    } else if (actionType === 'retrieve') {
      handleRetrievePet();
    }
  }, [actionType, handleStorePet, handleRetrievePet]);

  return (
    <QuinoaModal>
      <McGrid
        templateRows="auto 1fr"
        borderRadius="15px"
        bg="MagicBlack"
        borderWidth="3px"
        borderColor="Brown.Dark"
        boxShadow="xl"
        overflow="hidden"
        autoH
        h="95%"
        pt={1}
        pb={2}
        px={1}
        w={{
          base: `calc(${itemSize}px * 4 + ${gapSize}px * 10)`,
          sm: `calc(${itemSize}px * 5 + ${gapSize}px * 11)`,
          md: `calc(${itemSize}px * 8 + ${gapSize}px * 14)`,
          lg: `calc(${itemSize}px * 10 + ${gapSize}px * 16)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <McGrid
          autoH
          templateColumns="1fr 1fr"
          p={`${gapSize}px`}
          alignItems="center"
          gap={`${gapSize}px`}
        >
          <McFlex orient="top left" gap={2}>
            <Button
              onClick={handleAction}
              isDisabled={isDisabled}
              py={0}
              px={3}
              h="35px"
              bg={buttonBg}
              borderRadius="10px"
            >
              <Text
                fontWeight="bold"
                fontSize={{ base: '10px', md: '12px' }}
                whiteSpace="wrap"
              >
                {buttonText}
              </Text>
            </Button>
          </McFlex>
          <McFlex orient="top right" pr={1} gap={2}>
            <Button
              onClick={handlePickUpHutch}
              py={0}
              px={3}
              h="35px"
              bg="Neutral.EarlGrey"
              borderRadius="10px"
            >
              <Text fontWeight="bold" fontSize={{ base: '10px', md: '12px' }}>
                <Trans>Pick up hutch</Trans>
              </Text>
            </Button>
            <CloseButton w="15px" ml={1} onClick={closeActiveModal} />
          </McFlex>
        </McGrid>
        <McGrid
          ref={containerRef}
          justifyContent="center"
          position="relative"
          templateRows="auto 1fr auto 1fr"
          overflowY="auto"
          overflowX="hidden"
          p={`${gapSize}px`}
          gap={1}
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
          <McGrid auto templateColumns="1fr auto 1fr" px={1}>
            <Text textAlign="center" fontWeight="bold" gridColumn={2}>
              <Trans>Pets in Hutch</Trans>
            </Text>
            <McFlex orient="bottom right">
              <Text
                fontWeight={
                  myHutchPets.length >= petHutchInventoryLimit
                    ? 'bold'
                    : 'normal'
                }
                fontSize="12px"
              >
                {myHutchPets.length}/{petHutchInventoryLimit}
              </Text>
            </McFlex>
          </McGrid>
          <McFlex
            ref={hutchRef}
            wrap="wrap"
            autoH
            orient="top left"
            gap={`${gapSize}px`}
            w={{
              base: `calc(${itemSize}px * 4 + ${gapSize}px * 5)`,
              sm: `calc(${itemSize}px * 5 + ${gapSize}px * 6)`,
              md: `calc(${itemSize}px * 8 + ${gapSize}px * 9)`,
              lg: `calc(${itemSize}px * 10 + ${gapSize}px * 11)`,
            }}
            bg="Brown.Dark"
            p={`${gapSize}px`}
            borderRadius="10px"
          >
            {myHutchPets.length === 0 ? (
              <McFlex>
                <Text
                  color="Neutral.DarkGrey"
                  fontStyle="italic"
                  fontSize={{ base: '12px', md: '14px' }}
                  textAlign="center"
                >
                  <Trans>Your hutch is empty.</Trans>
                </Text>
              </McFlex>
            ) : (
              myHutchPets.map((pet, index) => {
                const itemId = getInventoryItemId(pet);
                return (
                  <div
                    key={`hutch-${pet.id}-${index}`}
                    ref={(node) => {
                      if (node) {
                        itemRefs.current.set(itemId, node);
                      } else {
                        itemRefs.current.delete(itemId);
                      }
                    }}
                  >
                    <DraggableInventoryItem
                      item={pet}
                      inventoryItemId={itemId}
                      isSelected={selectedHutchIndex === index}
                      onItemSelect={handleItemSelect}
                      onDragReady={handleDragReady}
                      onDragStart={handleDragStart}
                      onDrag={handleDrag}
                      onDragEnd={handleDragEnd}
                      isOpaque={true}
                      dragConstraintsRef={containerRef}
                      isHoveredTarget={hoveredItemId === itemId}
                      hoverDirection={hoverDirection}
                      isAnyItemDragging={isAnyItemDragging}
                      isDragReadyForAnyItem={dragReadyItemId !== null}
                    />
                  </div>
                );
              })
            )}
          </McFlex>
          <Text textAlign="center" pt={{ base: 2, md: 5 }} fontWeight="bold">
            <Trans>Pets in Inventory</Trans>
          </Text>
          <McFlex
            ref={inventoryRef}
            wrap="wrap"
            autoH
            orient="top left"
            gap={`${gapSize}px`}
            w={{
              base: `calc(${itemSize}px * 4 + ${gapSize}px * 5)`,
              sm: `calc(${itemSize}px * 5 + ${gapSize}px * 6)`,
              md: `calc(${itemSize}px * 8 + ${gapSize}px * 9)`,
              lg: `calc(${itemSize}px * 10 + ${gapSize}px * 11)`,
            }}
            bg="Neutral.Black"
            p={`${gapSize}px`}
            borderRadius="10px"
          >
            {myPetInventory.length === 0 ? (
              <McFlex>
                <Text
                  color="Neutral.DarkGrey"
                  fontStyle="italic"
                  fontSize={{ base: '12px', md: '14px' }}
                  textAlign="center"
                >
                  <Trans>No pets in inventory.</Trans>
                </Text>
              </McFlex>
            ) : (
              myPetInventory.map((pet, index) => {
                const itemId = getInventoryItemId(pet);
                return (
                  <div
                    key={`inv-${pet.id}-${index}`}
                    ref={(node) => {
                      if (node) {
                        itemRefs.current.set(itemId, node);
                      } else {
                        itemRefs.current.delete(itemId);
                      }
                    }}
                  >
                    <DraggableInventoryItem
                      item={pet}
                      inventoryItemId={itemId}
                      isSelected={selectedInventoryIndex === index}
                      onItemSelect={handleItemSelect}
                      onDragReady={handleDragReady}
                      onDragStart={handleDragStart}
                      onDrag={handleDrag}
                      onDragEnd={handleDragEnd}
                      isOpaque={true}
                      dragConstraintsRef={containerRef}
                      isHoveredTarget={hoveredItemId === itemId}
                      hoverDirection={hoverDirection}
                      isAnyItemDragging={isAnyItemDragging}
                      isDragReadyForAnyItem={dragReadyItemId !== null}
                    />
                  </div>
                );
              })
            )}
          </McFlex>
        </McGrid>
      </McGrid>
    </QuinoaModal>
  );
};

export default PetHutchModal;
