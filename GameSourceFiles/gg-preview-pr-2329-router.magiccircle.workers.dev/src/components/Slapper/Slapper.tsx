import McFlex from '@/components/McFlex/McFlex';
import { MotionFlex } from '@/components/Motion';
import { useSlapperContent } from '@/store/store';

const Slapper: React.FC = () => {
  const content = useSlapperContent();

  return (
    <McFlex
      id="slapper-container"
      position="absolute"
      pointerEvents="none"
      overflow="hidden"
      zIndex="Slapper"
    >
      <MotionFlex
        id="slapper"
        w="100%"
        h="100%"
        justifyContent="center"
        alignItems="center"
        initial={{
          opacity: 0,
          scale: 4,
        }}
      >
        {content}
      </MotionFlex>
    </McFlex>
  );
};

export default Slapper;
