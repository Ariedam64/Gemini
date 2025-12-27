import { Icon, IconButton } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { useSetAtom } from 'jotai';
import { type RefObject, useEffect, useState } from 'react';
import { Send } from 'react-feather';
import { playSfx } from '@/audio/useQuinoaAudio';
import { isChatWidgetOpenAtom } from '@/components/Chat/store/store';
import McGrid from '@/components/McGrid/McGrid';
import MagicInput from '@/components/ui/MagicInput';
import { useConfig } from '@/config';
import { useSendRoomMessage } from '@/hooks';
import { useIsTouchDevice } from '@/hooks/useIsTouchDevice';
import { usePlayer } from '@/store/store';

interface ChatInputProps {
  isChatWidgetOpen?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  shouldAutoFocus?: boolean;
  onAutoFocus?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  isChatWidgetOpen = true,
  inputRef,
  shouldAutoFocus = false,
  onAutoFocus,
}) => {
  const player = usePlayer();
  const [message, setMessage] = useState('');
  const [lastEnterTime, setLastEnterTime] = useState(0);
  const characterLimit = useConfig().chat_characterLimit;
  const sendRoomMessage = useSendRoomMessage();
  const setIsChatWidgetOpen = useSetAtom(isChatWidgetOpenAtom);
  const { t } = useLingui();
  const isTouchDevice = useIsTouchDevice();

  // Auto-focus input when shouldAutoFocus prop is true, but only on non-touch devices
  useEffect(() => {
    if (shouldAutoFocus && !isTouchDevice && inputRef?.current) {
      inputRef.current.focus({ preventScroll: true });
      onAutoFocus?.(); // Clear the flag after auto-focusing
    }
  }, [shouldAutoFocus, isTouchDevice, inputRef, onAutoFocus]);

  const submitMessage = () => {
    if (message) {
      sendRoomMessage({ type: 'Chat', message });
      setMessage('');
      setLastEnterTime(0); // Reset double-enter tracking
    } else {
      // On non-touch devices, single Enter closes the chat
      // On touch devices, require double-enter to close
      if (!isTouchDevice) {
        setIsChatWidgetOpen(false);
        playSfx('Button_Modal_Close');
      } else {
        // Handle double-enter to close chat when input is empty (touch devices)
        const currentTime = Date.now();
        if (currentTime - lastEnterTime < 500) {
          // 500ms window for double-enter
          setIsChatWidgetOpen(false);
          setLastEnterTime(0);
          playSfx('Button_Modal_Close');
        } else {
          setLastEnterTime(currentTime);
        }
      }
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    // Reset double-enter tracking when user types
    if (e.target.value.length > 0) {
      setLastEnterTime(0);
    }
  };

  const isDisabled = player.secondsRemainingUntilChatEnabled > 0;

  return (
    <McGrid templateColumns="1fr auto">
      <MagicInput
        ref={inputRef}
        textAlign="left"
        fontSize={{ base: 'xs', md: 'sm' }}
        // Removed onFocus and onBlur handlers - no longer tracking focus state
        placeholder={
          isDisabled
            ? t`Cooldown... ${player.secondsRemainingUntilChatEnabled}`
            : t`Send`
        }
        value={isDisabled ? '' : message}
        onChange={onChange}
        maxLength={characterLimit}
        onEnterKeyDown={submitMessage}
        shouldBlurOnEnter={false}
        p="6px"
        pl="12px"
        borderRightRadius="0"
        borderLeftRadius="10px"
        w="100%"
        h="40px"
        isDisabled={isDisabled}
        // tabIndex controls keyboard navigation order:
        // 0 = normal tab order (focusable when chat is open)
        // -1 = removed from tab order (prevents focus when chat is closed)
        // This prevents the browser from scrolling to focus an off-screen input
        tabIndex={isChatWidgetOpen ? 0 : -1}
      />
      <IconButton
        size="sm"
        h="40px"
        w="40px"
        aria-label={t`Send`}
        isDisabled={isDisabled || !message}
        onClick={submitMessage}
        borderLeftRadius="0"
        borderRightRadius="10px"
        icon={<Icon as={Send} boxSize="18px" />}
      />
    </McGrid>
  );
};

export default ChatInput;
