import { Box } from '@chakra-ui/react';
import {
  animate,
  type PanInfo,
  useDragControls,
  useMotionValue,
} from 'framer-motion';
import isEqual from 'lodash/fp/isEqual';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { InventoryItem } from '@/common/games/Quinoa/user-json-schema/current';
import { MotionBox } from '@/components/Motion';
import InventoryItemComponent from './InventoryItem';

interface DraggableInventoryItemProps {
  item: InventoryItem;
  inventoryItemId: string;
  index?: number;
  isSelected: boolean;
  isOpaque?: boolean;
  dragConstraintsRef?: React.RefObject<HTMLElement>;
  isHoveredTarget?: boolean;
  hoverDirection?: 'left' | 'right';
  isAnyItemDragging?: boolean;
  isDragReadyForAnyItem?: boolean;
  onItemSelect: (inventoryItemId: string) => void;
  onDragStart?: (inventoryItemId: string) => void;
  onDragReady?: (inventoryItemId: string | null) => void;
  onDrag?: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    inventoryItemId: string
  ) => void;
  onDragEnd?: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    inventoryItemId: string
  ) => boolean;
}

const DraggableInventoryItem: React.FC<DraggableInventoryItemProps> = ({
  item,
  inventoryItemId,
  index,
  isSelected,
  isOpaque,
  dragConstraintsRef,
  isHoveredTarget,
  hoverDirection = 'right',
  isAnyItemDragging,
  isDragReadyForAnyItem,
  onItemSelect,
  onDragStart,
  onDragReady,
  onDrag,
  onDragEnd,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragControls = useDragControls();
  const [isDragReady, setIsDragReady] = useState(false);
  const dragTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerDownPosition = useRef<{ x: number; y: number } | null>(null);
  // Hover animation is now handled via CSS transforms in the style prop
  // This avoids conflicts with Framer Motion's drag system
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!onDrag) {
        return;
      }
      pointerDownPosition.current = { x: e.clientX, y: e.clientY };

      if (e.pointerType === 'mouse') {
        setIsDragReady(true);
        onDragReady?.(inventoryItemId);
        dragControls.start(e);
      } else {
        dragTimer.current = setTimeout(() => {
          setIsDragReady(true);
          onDragReady?.(inventoryItemId);
          dragControls.start(e);
        }, 200);
      }
    },
    [onDrag, inventoryItemId, onDragReady]
  );

  const onPointerUp = useCallback(() => {
    if (dragTimer.current) {
      clearTimeout(dragTimer.current);
      dragTimer.current = null;
    }
    pointerDownPosition.current = null;
    setIsDragReady(false);
    onDragReady?.(null);
  }, [onDragReady]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (dragTimer.current && pointerDownPosition.current) {
        const dx = e.clientX - pointerDownPosition.current.x;
        const dy = e.clientY - pointerDownPosition.current.y;
        if (Math.hypot(dx, dy) > 5) {
          clearTimeout(dragTimer.current);
          dragTimer.current = null;
          pointerDownPosition.current = null;
          setIsDragReady(false);
          onDragReady?.(null);
        }
      }
    },
    [onDragReady]
  );
  // Prevent scrolling on touch devices when dragging
  useEffect(() => {
    if (!isDragging && !isDragReady) {
      return;
    }
    const preventScroll = (e: TouchEvent) => {
      // Only prevent if the event is cancelable to avoid the warning
      if (e.cancelable) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isDragging, isDragReady]);

  useEffect(() => {
    x.set(0);
    y.set(0);
  }, [index, x, y]);

  // Reset motion offsets when the container resizes (e.g., window resize or modal size change)
  useEffect(() => {
    const node = dragConstraintsRef?.current;
    if (!node) {
      return;
    }
    const handleResize = () => {
      x.set(0);
      y.set(0);
    };
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(node);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [dragConstraintsRef]);

  return (
    <Box position="relative" zIndex={isDragging ? 9999 : 'auto'}>
      {isHoveredTarget && (
        <Box
          position="absolute"
          {...(hoverDirection === 'left' ? { right: '0px' } : { left: '0px' })}
          top="0"
          bottom="0"
          w="4px"
          bg="Neutral.Grey"
          borderRadius="2px"
        />
      )}
      <Box
        style={{
          transform:
            isDragging || isDragReady
              ? undefined
              : isHoveredTarget
                ? `translateX(${hoverDirection === 'left' ? -25 : 25}px)`
                : 'translateX(0px)',
          transition:
            isDragging || isDragReady
              ? undefined
              : 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <MotionBox
          drag
          dragListener={false}
          dragControls={dragControls}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerMove={onPointerMove}
          dragConstraints={dragConstraintsRef}
          dragMomentum={false}
          dragElastic={0.1}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          style={{
            x,
            y,
            opacity:
              (isAnyItemDragging || isDragReadyForAnyItem) &&
              !isDragging &&
              !isDragReady
                ? 0.5
                : 1,
            transition: 'opacity 0.2s ease-in-out',
            boxShadow:
              isDragging || isDragReady
                ? '0px 10px 20px rgba(0,0,0,0.4)'
                : 'none',
            borderRadius: isDragging || isDragReady ? '10px' : '0px',
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }}
          onDragStart={() => {
            onDragStart?.(inventoryItemId);
            setIsDragging(true);
            setIsDragReady(false);
          }}
          onDrag={(event, info) => onDrag?.(event, info, inventoryItemId)}
          onDragEnd={(event, info) => {
            setIsDragging(false);
            setIsDragReady(false);
            onDragReady?.(null);
            const success = onDragEnd?.(event, info, inventoryItemId);
            if (!success) {
              animate(x, 0, { duration: 0.2 });
              animate(y, 0, { duration: 0.2 });
            }
          }}
        >
          <InventoryItemComponent
            item={item}
            index={index}
            isSelected={isSelected}
            onItemSelect={onItemSelect}
            isOpaque={isOpaque}
          />
        </MotionBox>
      </Box>
    </Box>
  );
};

export default memo(DraggableInventoryItem, isEqual);
