import { Image } from '@chakra-ui/react';
import McFlex from '@/components/McFlex/McFlex';
import type { HowToSlide } from '@/games/types';

interface FullScreenImageSlideProps {
  slide: HowToSlide;
}

const FullScreenImageSlide: React.FC<FullScreenImageSlideProps> = ({
  slide,
}) => {
  return (
    <McFlex>
      <Image
        src={slide.img}
        alt={slide.imgAlt?.toString()}
        w="100%"
        h="100%"
        objectFit="fill"
      />
    </McFlex>
  );
};

export default FullScreenImageSlide;
