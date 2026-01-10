import { Box } from '@chakra-ui/layout';
import type { CosmeticColor } from '@/common/resources/cosmetic-colors';
import type { EmoteType } from '@/common/types/emote';
import { RiveErrorBoundary } from '@/components/rive/RiveErrorFallback';
import { useSendRoomMessage } from '@/hooks';
import Emote from './Emote';
import { getEmoteHeartColorValue } from './utils';

interface EmoteButtonProps {
  type: EmoteType;
  color: CosmeticColor;
}

const EmoteButton: React.FC<EmoteButtonProps> = ({ type, color }) => {
  const sendRoomMessage = useSendRoomMessage();

  const onEmoteClick = (emoteType: EmoteType, heartColor: number) => {
    sendRoomMessage({
      type: 'Emote',
      emoteType,
      heartColor,
    });
  };

  return (
    <Box w="40px" h="40px" cursor="pointer">
      <RiveErrorBoundary>
        <Emote
          type={type}
          heartColor={getEmoteHeartColorValue(color)}
          isFloating={false}
          onClick={onEmoteClick}
        />
      </RiveErrorBoundary>
    </Box>
  );
};

export default EmoteButton;
