import { Box } from '@chakra-ui/layout';
import {
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import { playSfx } from '@/audio/useQuinoaAudio';
import {
  isChatWidgetOpenAtom,
  isMessagesMinimizedAtom,
  unreadMessageDataAtom,
} from '@/components/Chat/store/store';
import McFlex from '@/components/McFlex/McFlex';
import { MotionBox } from '@/components/Motion';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { useFilteredMessages, useMutedPlayers } from '@/store/store';
import Chat from './components/Chat';
import ChatWidgetButton from './components/ChatWidgetButton';
import { useTrackUnreadMessages } from './hooks/useTrackUnreadMessages';

const ChatWidget: React.FC = () => {
  const chatWidgetContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useAtom(isChatWidgetOpenAtom);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [customDragPosition, setCustomDragPosition] = useState<null | number>(
    null
  );
  const [dragContainerHeight, setDragContainerHeight] = useState(0);
  const [widgetHeight, setWidgetHeight] = useState(0);
  const widgetRef = useRef<HTMLDivElement>(null);
  const initialPositionAppliedRef = useRef(false);
  const isTouchDevice = useIsTouchDevice();
  const filteredMessages = useFilteredMessages();
  const mutedPlayers = useMutedPlayers();
  const isMessagesMinimized = useAtomValue(isMessagesMinimizedAtom);
  const setUnreadMessageData = useSetAtom(unreadMessageDataAtom);

  useTrackUnreadMessages();
  // X position animation
  const xOffset = useMotionValue(isChatWidgetOpen ? 0 : 300);
  const offsetSpring = useSpring(xOffset, {
    damping: 80,
    stiffness: 1200,
    mass: 1,
  });
  const right = useMotionTemplate`calc(var(--sair) - ${offsetSpring}px)`;
  // Handle horizontal position animation
  useEffect(() => {
    xOffset.set(isChatWidgetOpen ? 0 : 300);
  }, [isChatWidgetOpen, xOffset]);
  // Enhanced Enter key handling for non-touch devices
  useEffect(() => {
    if (isTouchDevice) {
      return; // Touch devices handle this differently
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle Enter key, and avoid interfering with form inputs
      if (
        event.key === 'Enter' &&
        !(
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement
        )
      ) {
        event.preventDefault();
        if (isChatWidgetOpen) {
          // Close chat when open - ChatInput will handle its own Enter events
          // so this will only trigger when the input is not focused
          setIsChatWidgetOpen(false);
          playSfx('Button_Modal_Close');
        } else {
          // Open chat when closed
          setIsChatWidgetOpen(true);
        }
      }
    };
    // Use capture phase to get the event before other handlers
    document.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isTouchDevice, isChatWidgetOpen, setIsChatWidgetOpen]);

  useEffect(() => {
    const latestMessage = filteredMessages[filteredMessages.length - 1];
    if (
      !isChatWidgetOpen &&
      latestMessage &&
      !mutedPlayers.includes(latestMessage.playerId)
    ) {
      playSfx('Keyboard_TypeTap_D');
    }
  }, [filteredMessages, isChatWidgetOpen, mutedPlayers]);
  // If chat widget is open and messages are not minimized, reset unread message state
  useEffect(() => {
    if (isChatWidgetOpen && !isMessagesMinimized) {
      // Reset unread message state when chat opens
      setUnreadMessageData({ count: 0, latestMessage: null });
    } else {
      // Blur the chat input when closing the widget to prevent phantom input
      if (chatInputRef.current) {
        chatInputRef.current.blur();
      }
    }
  }, [isChatWidgetOpen, isMessagesMinimized, setUnreadMessageData]);

  const getAnimation = () => {
    if (customDragPosition !== null) {
      const y = customDragPosition;
      return { y };
    }
    // Check if current position is outside the new bounds
    if (dragPosition > dragBottom) {
      return { y: dragBottom };
    }
    if (dragPosition < dragTop) {
      return { y: dragTop };
    }
    return undefined;
  };
  // Use an effect to reset customDragPosition after animation is applied
  useEffect(() => {
    if (customDragPosition !== null) {
      const timeoutId = setTimeout(() => {
        setCustomDragPosition(null);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [customDragPosition]);
  // Set initial position once when component mounts
  useEffect(() => {
    if (initialPositionAppliedRef.current) {
      return;
    }
    // Set initial position to 0 (top of screen)
    setCustomDragPosition(0);
    initialPositionAppliedRef.current = true;
  }, []);

  useEffect(() => {
    setDragContainerHeight(chatWidgetContainerRef.current?.offsetHeight ?? 0);
  }, [chatWidgetContainerRef.current?.offsetHeight]);

  useEffect(() => {
    setWidgetHeight(widgetRef.current?.offsetHeight ?? 0);
  }, [widgetRef.current?.offsetHeight, isMessagesMinimized]);

  const dragTop = 0;
  const dragBottom = Math.max(0, dragContainerHeight - widgetHeight);

  return (
    <Box
      pointerEvents="none"
      style={{ touchAction: 'none' }}
      h="100%"
      top="0"
      right="0"
      position="absolute"
      zIndex="ChatWidget"
      ref={chatWidgetContainerRef}
    >
      <AnimatePresence>
        {isChatWidgetOpen && (
          <MotionBox
            ref={widgetRef}
            position="fixed"
            display="flex"
            // Note: We set the right property rather than x because resizing the window
            // has been seen the cause the x position to jump between 0 and 300px
            style={{ right }}
            alignItems={isMessagesMinimized ? 'flex-start' : 'center'}
            flexDirection="row"
            p={1}
            drag="y"
            dragConstraints={{
              top: dragTop,
              bottom: dragBottom,
            }}
            dragElastic={0.2}
            initial={{ y: dragPosition }}
            animate={getAnimation()}
            onUpdate={(latest) => {
              setDragPosition(typeof latest.y === 'number' ? latest.y : 0);
            }}
            exit={{ x: 300 }}
            onDragStart={() => {
              setIsDragging(true);
              offsetSpring.stop();
            }}
            onDrag={(_, info) => {
              // Update position with constraints
              const baseX = isChatWidgetOpen ? 0 : 300;
              const newX = baseX + info.offset.x;

              if (isChatWidgetOpen) {
                xOffset.set(Math.max(0, newX));
              } else {
                xOffset.set(Math.min(300, newX));
              }
            }}
            onDragEnd={() => {
              setIsDragging(false);
              // Handle threshold-based open/close
              const threshold = 50;
              const currentX = xOffset.get();

              if (!isChatWidgetOpen && currentX < 300 - threshold) {
                setIsChatWidgetOpen(true);
              } else if (isChatWidgetOpen && currentX > threshold) {
                setIsChatWidgetOpen(false);
              } else {
                // Snap back to current state
                xOffset.set(isChatWidgetOpen ? 0 : 300);
              }
            }}
            whileDrag={{
              scale: 1.02,
              cursor: 'grabbing',
            }}
            pointerEvents="none"
          >
            <ChatWidgetButton
              onClick={() => setIsChatWidgetOpen(!isChatWidgetOpen)}
              showPreview={!isChatWidgetOpen}
              sx={{
                cursor: isDragging ? 'grabbing !important' : undefined,
                boxShadow: isDragging
                  ? '0 2px 12px 0 rgba(0,0,0,0.22)'
                  : 'none',
                alignSelf: isMessagesMinimized ? 'flex-start' : 'auto',
                height: '50px',
                w: '40px',
              }}
              pointerEvents="auto"
            />
            <McFlex
              opacity={isChatWidgetOpen || isDragging ? 1 : 0}
              col
              w="300px"
              bg="MagicBlack"
              borderTop="1px solid rgba(255,255,255,0.1)"
              borderLeft="1px solid rgba(255,255,255,0.1)"
              borderBottom="4px solid rgba(255,255,255,0.1)"
              overflow="hidden"
              pointerEvents="auto"
              onClick={() => {
                // On desktop, clicking anywhere in the chat widget should focus the input
                if (
                  !isTouchDevice &&
                  chatInputRef.current &&
                  isChatWidgetOpen
                ) {
                  chatInputRef.current.focus();
                }
              }}
              height={isMessagesMinimized ? 'auto' : 'min(64dvh, 540px)'}
              borderLeftRadius={isMessagesMinimized ? '0px' : '16px'}
              borderRightRadius="16px"
              borderRight={
                isMessagesMinimized
                  ? '1px solid rgba(255,255,255,0.08)'
                  : 'none'
              }
              boxShadow={
                isDragging ? '0 2px 12px 0 rgba(0,0,255,0.22)' : 'none'
              }
              cursor={!isTouchDevice && isChatWidgetOpen ? 'text' : 'default'}
            >
              <Chat
                isChatWidgetOpen={isChatWidgetOpen}
                inputRef={chatInputRef}
              />
            </McFlex>
          </MotionBox>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default ChatWidget;
