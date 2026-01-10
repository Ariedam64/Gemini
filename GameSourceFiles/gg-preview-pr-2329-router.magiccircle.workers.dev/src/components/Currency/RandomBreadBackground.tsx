import { AnimatePresence } from 'framer-motion';
import { useMemo } from 'react';
import { MotionBox } from '@/components/Motion';
import { RiveErrorBoundary } from '@/components/rive/RiveErrorFallback';
import { isDesktopMode } from '@/environment';
import { useDesktopWindowScaleFactor } from '@/store/store';
import Rive_Currency, {
  type Rive_CurrencyState,
} from './Rive_Currency/Rive_Currency';

const getRandomInRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const generateRandomProperties = (index: number, count: number) => {
  const increment = 100 / count;
  const top =
    index % 2
      ? `${getRandomInRange(isDesktopMode ? 70 : 60, 90)}%`
      : `${getRandomInRange(5, isDesktopMode ? 15 : 30)}%`;
  const left = `${getRandomInRange(index * increment, Math.min(index * increment + increment, 90))}%`;
  const rotation = getRandomInRange(-30, 30);
  const scale = getRandomInRange(1, 2);

  return { top, left, rotation, scale };
};

interface RandomBreadBackgroundProps {
  count: number;
  breadState: Rive_CurrencyState;
}

const RandomBreadBackground: React.FC<RandomBreadBackgroundProps> = ({
  count,
  breadState,
}) => {
  const desktopWindowScaleFactor = useDesktopWindowScaleFactor();
  const scaleFactor = isDesktopMode ? desktopWindowScaleFactor : 0.5;

  // Memoize the random properties
  const randomProperties = useMemo(() => {
    return Array.from({ length: count }, (_, index) =>
      index === 4 ? null : generateRandomProperties(index, count)
    );
  }, [count]);

  return (
    <AnimatePresence>
      {randomProperties.map((props) =>
        props ? (
          <MotionBox
            key={`${props.top}-${props.left}-${props.rotation}-${props.scale}`}
            w="100px"
            h="100px"
            top={props.top}
            left={props.left}
            position="absolute"
            transform={`rotate(${props.rotation}deg) scale(${props.scale * scaleFactor})`}
            transformOrigin="top left"
            zIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 + Math.random() * 1, duration: 1.5 }}
          >
            <RiveErrorBoundary>
              <Rive_Currency currencyState={breadState} />
            </RiveErrorBoundary>
          </MotionBox>
        ) : null
      )}
    </AnimatePresence>
  );
};

export default RandomBreadBackground;
