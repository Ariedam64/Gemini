import { Box, BoxProps } from '@chakra-ui/layout';
import { ChakraColor } from '@/theme/types';

/**
 * Renders a chat message tail (speech bubble pointer) for chat messages.
 *
 * @component
 * @param {ChakraColor} fillColor - The color to fill the tail with, matching the chat bubble.
 * @param {'left' | 'right'} placement - The side of the bubble the tail should appear on.
 * @param {number} [size=12] - The height of the tail in pixels. The width is scaled proportionally.
 * @param {BoxProps} props - Additional Box props for positioning and styling.
 * @returns {JSX.Element} The rendered chat message tail.
 */
interface ChatMessageTailProps extends BoxProps {
  fillColor: ChakraColor;
  placement: 'left' | 'right';
  size?: number; // height in pixels, width is scaled proportionally
}

const BASE_WIDTH = 8;
const BASE_HEIGHT = 12;

const ChatMessageTail: React.FC<ChatMessageTailProps> = ({
  fillColor,
  placement,
  size = 12,
  ...props
}) => {
  const scale = size / BASE_HEIGHT;
  const width = BASE_WIDTH * scale;
  const height = size;

  return (
    <Box
      position="absolute"
      {...props}
      sx={{
        transform:
          placement === 'right'
            ? `rotate(15deg) scale(-1, 1)`
            : `rotate(-15deg)`,
        ...props.sx,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${BASE_WIDTH} ${BASE_HEIGHT}`}
      >
        <path
          d="M 0 7 C 6 7, 7 3, 7 0 C 7 4, 6 7, 7 10 C 4 10, 2 8, 0 7 Z"
          style={{ fill: fillColor }}
        />
      </svg>
    </Box>
  );
};

export default ChatMessageTail;
