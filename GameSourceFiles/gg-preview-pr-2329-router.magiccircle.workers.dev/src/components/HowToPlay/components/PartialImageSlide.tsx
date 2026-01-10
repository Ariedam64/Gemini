import { Heading } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import McFlex from '@/components/McFlex/McFlex';
import type { HowToSlide } from '@/games/types';

interface PartialImageSlideProps {
  slide: HowToSlide;
}

const PartialImageSlide: React.FC<PartialImageSlideProps> = ({ slide }) => {
  return (
    <McFlex col orient="top" h="82%" mt="20%" position="relative">
      <Heading
        size={{ base: 'xs', sm: 'sm', md: 'md', lg: 'lg' }}
        px={6}
        pt="0px"
      >
        {slide.text}
      </Heading>
      <McFlex overflow="hidden" pb={6}>
        <Image
          mx="auto"
          maxWidth="80%"
          maxHeight="70%"
          width="auto"
          height="auto"
          objectFit="contain"
          src={slide.img}
          alt={slide.imgAlt?.toString()}
        />
      </McFlex>
    </McFlex>
  );
};

export default PartialImageSlide;
