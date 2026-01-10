import { Box } from '@chakra-ui/react';
import { EventType } from '@rive-app/react-canvas';
import { useEffect, useRef, useState } from 'react';
import type { EmoteType } from '@/common/types/emote';
import useMcRive from '@/hooks/useMcRive';
import useMcRiveStateMachine from '@/hooks/useMcRiveStateMachine';
import emotesRiveFile from './assets/emotes.riv?url';

interface EmoteProps {
  type: EmoteType;
  heartColor: number;
  isFloating: boolean;
  onClick?: (emoteType: number, heartColor: number) => void;
}
const Emote: React.FC<EmoteProps> = ({
  type,
  heartColor,
  isFloating,
  onClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const { rive, RiveComponent } = useMcRive({
    src: emotesRiveFile,
    stateMachines: 'State Machine 1',
    artboard: 'Emotes',
    autoplay: true,
  });

  const { getInput, setInput } = useMcRiveStateMachine(
    rive,
    'State Machine 1',
    {
      emoteType: type,
      heartColor,
      isFloating,
    }
  );

  useEffect(() => {
    if (rive) {
      rive.on(EventType.RiveEvent, onRiveEventReceived);
      setIsVisible(true);
    }
    return () => {
      rive?.removeAllRiveEventListeners(EventType.RiveEvent);
    };
  }, [rive]);

  useEffect(() => {
    setInput('heartColor', heartColor);
  }, [heartColor]);

  // For performance, pause the animation when not hovered.
  useEffect(() => {
    if (!rive) return;

    if (isHovered) {
      // Clear any existing timer
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = undefined;
      }
      rive.play();
    } else {
      // Wait for the hover-off animation to finish before pausing
      hoverTimerRef.current = setTimeout(() => {
        rive.pause();
        hoverTimerRef.current = undefined;
      }, 1000);
    }

    // Cleanup timer on unmount or when dependencies change
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = undefined;
      }
    };
  }, [rive, isHovered]);

  const onRiveEventReceived = () => {
    const heartColor = getInput('heartColor');
    if (onClick && typeof heartColor === 'number') {
      onClick(type, heartColor);
    }
  };

  return (
    <Box
      h="100%"
      visibility={isVisible ? 'visible' : 'hidden'}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <RiveComponent />
    </Box>
  );
};

export default Emote;
