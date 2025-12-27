import { Text } from '@chakra-ui/layout';
import McFlex from '@/components/McFlex/McFlex';
import type { ChakraColor } from '@/theme/types';
import ChatMessageTail from './ChatMessageTail';

interface ChatMessageBubbleProps {
  message: string;
  isMyMessage: boolean;
  color: ChakraColor;
}

const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  isMyMessage,
  color,
}) => (
  <McFlex
    orient={isMyMessage ? 'bottom right' : 'bottom left'}
    position="relative"
    autoH
  >
    <ChatMessageTail
      fillColor={color}
      placement={isMyMessage ? 'right' : 'left'}
      top="8px"
    />
    <McFlex
      auto
      ml={isMyMessage ? '0' : '6px'}
      mr={isMyMessage ? '6px' : '0'}
      bg={color}
      borderRadius={10}
      px="8px"
      py="2px"
    >
      <Text color="MagicBlack" fontSize="12px">
        {message}
      </Text>
    </McFlex>
  </McFlex>
);

export default ChatMessageBubble;
