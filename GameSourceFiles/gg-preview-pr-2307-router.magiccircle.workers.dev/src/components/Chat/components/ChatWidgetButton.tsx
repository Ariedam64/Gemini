import { Box, Button, type ButtonProps, Circle, Icon } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { useAtomValue } from 'jotai';
import { MessageCircle } from 'react-feather';
import { usePlayerChatDisplay } from '@/components/Chat/hooks/usePlayerChatDisplay';
import {
  isChatWidgetOpenAtom,
  unreadMessageDataAtom,
} from '@/components/Chat/store/store';
import McTooltip from '@/components/McTooltip/McTooltip';
import type { ChakraColor } from '@/theme/types';
import ChatMessagePreview from './ChatMessagePreview';

interface ChatWidgetButtonProps extends ButtonProps {
  showPreview?: boolean;
}

/**
 * Chat button with unread count badge and optional message preview.
 */
const ChatWidgetButton: React.FC<ChatWidgetButtonProps> = ({
  onClick,
  showPreview = false,
  ...props
}) => {
  const unreadData = useAtomValue(unreadMessageDataAtom);
  const { getPastelPlayerColor } = usePlayerChatDisplay();
  const isChatWidgetOpen = useAtomValue(isChatWidgetOpenAtom);

  const messageColor: ChakraColor | undefined = unreadData.latestMessage
    ?.playerId
    ? (getPastelPlayerColor(unreadData.latestMessage.playerId) as ChakraColor)
    : undefined;

  const shouldShowPreview =
    showPreview && unreadData.count > 0 && !!unreadData.latestMessage;

  return (
    <McTooltip
      label={t`Close [enter]`}
      zIndex={2}
      placement="left"
      showOnDesktopOnly
    >
      <Box position="relative">
        <ChatMessagePreview
          isVisible={shouldShowPreview}
          message={unreadData.latestMessage?.message}
          messageColor={messageColor}
        />
        <Button
          position="relative"
          onClick={onClick}
          bg="#9F3761"
          borderRadius="8px"
          borderRightRadius={isChatWidgetOpen ? '0px' : '8px'}
          borderTop="1px solid rgba(0,0,0,0.10)"
          borderBottom="3px solid rgba(0,0,0,0.4)"
          borderLeft="2px solid rgba(0,0,0,0.15)"
          borderRight="1px solid rgba(0,0,0,0.15)"
          w="40px"
          {...props}
          sx={{
            filter: unreadData.count > 0 ? 'brightness(1.2)' : 'none',
            ...props.sx,
          }}
          _active={{
            borderBottomWidth: '1px',
            borderBottomColor: 'rgba(0,0,0,0.2)',
            boxShadow: 'inset 0 3px 2px rgba(0,0,0,0.2)',
          }}
        >
          <Icon
            as={MessageCircle}
            boxSize="28px"
            sx={{ transform: 'scaleX(-1)' }}
          />
          {unreadData.count > 0 && (
            <Circle
              size="24px"
              bg="Red.Magic"
              position="absolute"
              top="-9px"
              left="-9px"
              fontSize="18px"
              fontWeight="heavy"
              textShadow="0px 2px 0px rgba(0,0,0,0.5)"
            >
              {unreadData.count > 99 ? '🤯' : unreadData.count}
            </Circle>
          )}
        </Button>
      </Box>
    </McTooltip>
  );
};

export default ChatWidgetButton;
