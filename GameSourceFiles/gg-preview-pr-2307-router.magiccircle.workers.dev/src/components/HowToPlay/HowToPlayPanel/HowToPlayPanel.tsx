import 'swiper/css/pagination';
import 'swiper/css';
import { Box, Text } from '@chakra-ui/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, type SwiperClass, SwiperSlide } from 'swiper/react';
import McFlex from '@/components/McFlex/McFlex';
import SystemDrawerCloseButton from '@/components/SystemDrawer/SystemDrawerCloseButton';
import type { HowToSlide } from '@/games/types';
import FullScreenImageSlide from '../components/FullScreenImageSlide';
import PartialImageSlide from '../components/PartialImageSlide';
import SwiperNextButton from '../components/SwiperNextButton';
import './customSwiperstyles.css';

interface HowToPlayPanelProps {
  howToSlides: HowToSlide[];
  onClose: () => void;
}

const HowToPlayPanel: React.FC<HowToPlayPanelProps> = ({
  howToSlides,
  onClose,
}) => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const progressRef = useRef<SVGSVGElement>(null);
  const circumferenceRef = useRef<number | null>(null);

  const onAutoplayTimeLeft = useCallback(
    (swiper: SwiperClass, _timeLeft: number, percentage: number) => {
      if (!progressRef.current) {
        return;
      }
      if (circumferenceRef.current === null) {
        const bbox = progressRef.current.getBBox();
        const radius = bbox.width / 2;
        circumferenceRef.current = 2 * Math.PI * radius;
      }
      const circumference = circumferenceRef.current;
      progressRef.current.style.strokeDasharray = `${circumference * (1 - percentage)} ${circumference}`;
      setActiveIndex(swiper.activeIndex);
    },
    []
  );

  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0, 1);
      swiper.autoplay.start();
    }
  }, []);

  if (!howToSlides) {
    return null;
  }
  return (
    // The position is set to absolute to prevent a weird bug on chrome where the HowToPlayPanel rendering would cause the Durian game screen to render in the wrong position
    <McFlex maxW="300px" auto my="20px">
      <Swiper
        style={{
          border: '4px solid transparent',
          backgroundImage:
            'linear-gradient(#1b2c34, #24181e), linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
          backgroundOrigin: 'border-box',
          backgroundClip: 'content-box, border-box',
          borderRadius: '15px',
          boxShadow: '0px 4px 20px rgba(17, 16, 28, 0.5)',
          overflow: 'hidden',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          '--swiper-pagination-bottom': '91%',
          '--swiper-pagination-width': 'auto !important',
          '--swiper-pagination-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-color': '#ffffff',
          '--swiper-pagination-bullet-inactive-opacity': '.25',
          '--swiper-pagination-bullet-size': '10px',
          '--swiper-pagination-bullet-horizontal-gap': '12px',
        }}
        allowTouchMove={true}
        onSwiper={(swiper) => setSwiper(swiper)}
        preventClicks={false}
        preventClicksPropagation={false}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="howToPlaySwiper"
      >
        <SystemDrawerCloseButton
          onClick={onClose}
          asComponent={null}
          right="10px"
        />
        {howToSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            {slide.isFullScreenImage ? (
              <FullScreenImageSlide slide={slide} />
            ) : (
              <PartialImageSlide slide={slide} />
            )}
          </SwiperSlide>
        ))}
        <Box
          style={{
            position: 'absolute',
            left: swiper ? `calc(10px + ${activeIndex * 34}px)` : '0',
            bottom: '91%',
            zIndex: 10,
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            transform: 'translateY(22%)',
          }}
        >
          <svg
            ref={progressRef}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              strokeWidth: '2px',
              stroke: '#FFF8B7',
              fill: 'none',
              transform: 'rotate(-90deg)',
            }}
          >
            <circle cx="22" cy="22" r="20" />
          </svg>
          <svg
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <circle cx="22" cy="22" r="16" fill="#FFF8B7" />
          </svg>
          <Text
            position="absolute"
            color="Black"
            fontWeight="bold"
            fontSize="md"
          >
            {activeIndex + 1}
          </Text>
        </Box>
        <SwiperNextButton
          shouldLoop={true}
          isGlowing={false}
          p="0"
          height="40px"
          width="40px"
          right="15px"
          bg="Black"
          iconColor="MagicWhite"
        />
      </Swiper>
    </McFlex>
  );
};

export default HowToPlayPanel;
