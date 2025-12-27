import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { RoomData } from '@/common/games/Room/types';
import { MotionBox } from '@/components/Motion';
import { useData } from '@/hooks';
import { delay } from '@/utils/delay';
import Rive_GameStartingCountdown from './Rive_GameStartingCountdown';

type GameStartingCountdownProps = {};

const GameStartingCountdown: React.FC<GameStartingCountdownProps> = () => {
  const isGameStarting = useData((data: RoomData) => data.isGameStarting);
  const [isCountDownVisible, setIsCountDownVisible] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const countdownDelay = 2;

  useEffect(() => {
    const handleGameStarting = async () => {
      if (isGameStarting) {
        setShowBackground(true);
        await delay(countdownDelay);
        setIsCountDownVisible(true);
      } else {
        setIsCountDownVisible(false);
        setShowBackground(false);
      }
    };
    handleGameStarting().catch(console.error);
  }, [isGameStarting]);

  return (
    <AnimatePresence>
      {showBackground && (
        <MotionBox
          id="game-starting-countdown-container"
          position="absolute"
          top="calc(-1 * var(--sait))"
          left="calc(-1 * var(--sail))"
          width="calc(100% + var(--sail) + var(--sair))"
          height="calc(100% + var(--sait) + var(--saib))"
          zIndex="GameStartingCountdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
          exit={{ opacity: 0 }}
          transition={{
            duration: isGameStarting ? 1.9 : 1,
            ease: [0.001, 0.001, 0.9, 1],
          }}
        >
          {isCountDownVisible && <Rive_GameStartingCountdown />}
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default GameStartingCountdown;
