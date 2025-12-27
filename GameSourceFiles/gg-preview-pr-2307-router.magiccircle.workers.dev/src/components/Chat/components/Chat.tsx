import { Icon, IconButton, Text } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useAtomValue, useSetAtom } from 'jotai';
import { type RefObject, useEffect, useState } from 'react';
import { Maximize2, Minimize2 } from 'react-feather';
import EmoteControl from '@/components/Emotes/EmoteControl';
import McFlex from '@/components/McFlex/McFlex';
import McGrid from '@/components/McGrid/McGrid';
import { MotionMcFlex, MotionMcGrid } from '@/components/Motion';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { isMessagesMinimizedAtom } from '../store/store';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

interface ChatWidgetProps {
  isChatWidgetOpen?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
}

const Chat: React.FC<ChatWidgetProps> = ({ isChatWidgetOpen, inputRef }) => {
  const [shouldAutoFocus, setShouldAutoFocus] = useState(false);
  const isTouchDevice = useIsTouchDevice();
  const isMessagesMinimized = useAtomValue(isMessagesMinimizedAtom);
  const setIsMessagesMinimized = useSetAtom(isMessagesMinimizedAtom);

  // Handle focus when chat widget opens
  useEffect(() => {
    if (isChatWidgetOpen) {
      // On non-touch devices, auto-focus when opening
      // On touch devices, don't auto-focus to avoid keyboard popup
      setShouldAutoFocus(!isTouchDevice);
    }
  }, [isChatWidgetOpen, isTouchDevice]);

  // Handle focus when un-minimizing on desktop
  useEffect(() => {
    if (!isTouchDevice && !isMessagesMinimized && isChatWidgetOpen) {
      // When un-minimizing on desktop, focus the input
      setShouldAutoFocus(true);
    }
  }, [isMessagesMinimized, isTouchDevice, isChatWidgetOpen]);

  if (isMessagesMinimized) {
    return (
      <MotionMcFlex
        layout="position"
        orient="space-between center"
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        px={2}
        gap={1}
      >
        <McFlex pb="5px">
          <EmoteControl />
        </McFlex>
        <IconButton
          size="sm"
          h="24px"
          w="24px"
          minW="24px"
          bg="rgba(255,255,255,0.1)"
          _hover={{ bg: 'rgba(255,255,255,0.2)' }}
          borderRadius="4px"
          onClick={() => setIsMessagesMinimized(false)}
          aria-label={t`Show messages`}
        >
          <Icon as={Maximize2} boxSize="14px" color="white" />
        </IconButton>
      </MotionMcFlex>
    );
  }
  return (
    <MotionMcGrid
      layout="position"
      templateRows="1fr auto"
      gap="2px"
      overflow="hidden"
      h="100%"
      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
      p={2}
    >
      {/* Messages section with header */}
      <McFlex col overflow="hidden" minH="0" gap={2}>
        <McGrid templateColumns="25px 1fr 25px" h="24px" px="4px">
          <McFlex gridColumn={2}>
            <Text fontSize={{ base: '14px', md: '16px' }} fontWeight="bold">
              <Trans>Chat</Trans>
            </Text>
          </McFlex>
          <IconButton
            size="sm"
            h="24px"
            w="24px"
            minW="24px"
            bg="rgba(255,255,255,0.1)"
            _hover={{ bg: 'rgba(255,255,255,0.2)' }}
            borderRadius="4px"
            onClick={() => setIsMessagesMinimized(true)}
            aria-label={t`Minimize messages`}
          >
            <Icon as={Minimize2} boxSize="12px" color="white" />
          </IconButton>
        </McGrid>
        <ChatMessages />
      </McFlex>
      {/* Bottom section with emotes and input */}
      <McFlex col gap="4px">
        <EmoteControl />
        <ChatInput
          isChatWidgetOpen={isChatWidgetOpen}
          inputRef={inputRef}
          shouldAutoFocus={shouldAutoFocus}
          onAutoFocus={() => setShouldAutoFocus(false)}
        />
      </McFlex>
    </MotionMcGrid>
  );
};

export default Chat;
