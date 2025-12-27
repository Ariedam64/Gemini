import { Text } from '@chakra-ui/layout';
import McFlex, { type McFlexProps } from '@/components/McFlex/McFlex';
import type { ChakraColor } from '@/theme/types';
import ChatMessageTail from './ChatMessageTail';

interface ChatMessagePreviewProps extends McFlexProps {
  isVisible: boolean;
  message?: string;
  messageColor?: ChakraColor;
}

/**
 * Message preview bubble next to chat button.
 */
const ChatMessagePreview: React.FC<ChatMessagePreviewProps> = ({
  isVisible,
  message,
  messageColor,
  ...props
}) => {
  if (!isVisible || !message || !messageColor) {
    return null;
  }

  return (
    <McFlex
      orient="bottom left"
      position="absolute"
      h="22px"
      auto
      right="50px"
      top="50%"
      transform="translateY(-50%)"
      zIndex={1}
      {...props}
    >
      <McFlex
        bg={messageColor}
        borderRadius={10}
        px="8px"
        py="2px"
        width="75px"
        h="22px"
        position="relative"
      >
        <Text color="MagicBlack" fontSize="12px" noOfLines={1}>
          {message}
        </Text>
        <ChatMessageTail
          fillColor={messageColor}
          position="absolute"
          placement="right"
          bottom="1px"
          size={16}
          sx={{
            right: '-8px',
          }}
        />
      </McFlex>
    </McFlex>
  );
};

export default ChatMessagePreview;
