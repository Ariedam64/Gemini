import { Box, Circle, Icon } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { AnimatePresence } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { MessageCircle } from 'react-feather';
import ChatMessagePreview from '@/components/Chat/components/ChatMessagePreview';
import { usePlayerChatDisplay } from '@/components/Chat/hooks/usePlayerChatDisplay';
import {
  isChatWidgetOpenAtom,
  unreadMessageDataAtom,
} from '@/components/Chat/store/store';
import McTooltip from '@/components/McTooltip/McTooltip';
import { MotionButton } from '@/components/Motion';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import type { ChakraColor } from '@/theme/types';

type ChatControlButtonProps = {};

const ChatButton: React.FC<ChatControlButtonProps> = () => {
  const isSmallScreen = useIsSmallScreen();
  const size = isSmallScreen ? '35px' : '40px';
  const [isChatWidgetOpen, setIsChatWidgetOpen] = useAtom(isChatWidgetOpenAtom);
  const unreadData = useAtomValue(unreadMessageDataAtom);
  const { getPastelPlayerColor } = usePlayerChatDisplay();

  const messageColor: ChakraColor | undefined = unreadData.latestMessage
    ?.playerId
    ? (getPastelPlayerColor(unreadData.latestMessage.playerId) as ChakraColor)
    : undefined;

  const shouldShowPreview = unreadData.count > 0 && !!unreadData.latestMessage;

  return (
    <>
      <McTooltip
        label={t`Chat [enter]`}
        placement={shouldShowPreview ? 'bottom' : 'left'}
        showOnDesktopOnly
      >
        <Box position="relative">
          <AnimatePresence>
            {!isChatWidgetOpen && (
              <MotionButton
                variant="blank"
                initial={{ x: size, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { duration: 0.1 },
                }}
                exit={{ x: 200, opacity: 0 }}
                h={size}
                w={size}
                borderRadius="full"
                bg="rgba(0, 0, 0, 0.6)"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsChatWidgetOpen(true);
                }}
                aria-label={t`Chat`}
                pointerEvents="auto"
                position="relative"
                sx={{
                  filter: unreadData.count > 0 ? 'brightness(1.2)' : 'none',
                }}
              >
                <ChatMessagePreview
                  isVisible={shouldShowPreview}
                  message={unreadData.latestMessage?.message}
                  messageColor={messageColor}
                  right="42px"
                  top="55%"
                />
                <Icon
                  as={MessageCircle}
                  boxSize="24px"
                  sx={{ transform: 'scaleX(-1)' }}
                />
                {unreadData.count > 0 && (
                  <Circle
                    size="20px"
                    bg="Red.Magic"
                    position="absolute"
                    top="-7.5px"
                    left="-8px"
                    fontSize="14px"
                    fontWeight="heavy"
                    textShadow="0px 2px 0px rgba(0,0,0,0.5)"
                  >
                    {unreadData.count > 99 ? '🤯' : unreadData.count}
                  </Circle>
                )}
              </MotionButton>
            )}
          </AnimatePresence>
        </Box>
      </McTooltip>
    </>
  );
};

export default ChatButton;
