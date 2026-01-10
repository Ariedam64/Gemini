import { Box } from '@chakra-ui/layout';
import { t } from '@lingui/core/macro';
import { ArrowRight, RotateCcw } from 'react-feather';
import { type SwiperClass, useSwiper } from 'swiper/react';
import GlowingButton, {
  type GlowingButtonProps,
} from '@/components/ui/GlowingButton';
import type { ChakraColor } from '@/theme/types';

interface SwiperNextButtonProps extends GlowingButtonProps {
  parentSwiper?: SwiperClass | null;
  shouldLoop?: boolean;
  iconColor?: ChakraColor;
}

const SwiperNextButton: React.FC<SwiperNextButtonProps> = ({
  parentSwiper,
  shouldLoop = false,
  iconColor = 'MagicBlack',
  ...rest
}) => {
  const swiper = useSwiper();

  return (
    <GlowingButton
      bg="MagicWhite"
      isRound
      aria-label={t`Back`}
      onClick={() => {
        if (swiper.isEnd) {
          if (shouldLoop) {
            swiper.slideTo(0);
          }
          parentSwiper?.slideNext();
        } else {
          swiper.slideNext();
        }
      }}
      position="absolute"
      right="25px"
      bottom="calc(5% - 15px)"
      zIndex={11}
      {...rest}
    >
      <Box color={iconColor}>
        {swiper.isEnd ? <RotateCcw /> : <ArrowRight strokeWidth="2px" />}
      </Box>
    </GlowingButton>
  );
};

export default SwiperNextButton;
