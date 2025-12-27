import { AnimatePresence } from 'framer-motion';
import { Suspense } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import McFlex from '@/components/McFlex/McFlex';
import { MotionMcFlex } from '@/components/Motion';
import gameViews from '@/games/gameViews';
import { useActiveGame } from '@/store/store';

type EmbeddedGameContainerProps = {};

const EmbeddedGameContainer: React.FC<EmbeddedGameContainerProps> = () => {
  const activeGame = useActiveGame();
  const View = gameViews[activeGame];

  return (
    <McFlex>
      <AnimatePresence mode="wait">
        <MotionMcFlex
          key={activeGame}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: 'spring',
            stiffness: 800,
            damping: 40,
            mass: 0.5,
          }}
        >
          <Suspense fallback={<LoadingScreen />}>
            <View />
          </Suspense>
        </MotionMcFlex>
      </AnimatePresence>
    </McFlex>
  );
};

export default EmbeddedGameContainer;
