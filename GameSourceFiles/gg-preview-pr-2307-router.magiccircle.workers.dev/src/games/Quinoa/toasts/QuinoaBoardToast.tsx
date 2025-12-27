import { Box, CloseButton, Text } from '@chakra-ui/react';
import McFlex from '@/components/McFlex/McFlex';
import StrokedText from '@/components/StrokedText/StrokedText';

interface QuinoaBoardToastProps {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  strokeColor: string;
  backgroundImage?: string;
  onClose?: () => void;
  isClosable?: boolean;
  onClick?: () => void;
  topOffset?: number;
}

const QuinoaBoardToast = ({
  title,
  subtitle,
  strokeColor,
  backgroundImage,
  onClose,
  isClosable,
  onClick,
  topOffset = 0,
}: QuinoaBoardToastProps) => (
  <Box
    position="relative"
    w="360px"
    h="105px"
    onClick={(e) => {
      e.stopPropagation();
      if (onClick) onClick();
      if (onClose) onClose();
    }}
    cursor={onClick ? 'pointer' : 'default'}
    mt={`-${topOffset + 5}px`}
  >
    <Box
      backgroundImage={`url(${backgroundImage})`}
      backgroundSize="cover"
      w="100%"
      h="100%"
      position="relative"
    >
      <McFlex
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        color="white"
        pt={`${topOffset}px`}
        pl={5}
        gap={2}
      >
        <McFlex col flex={1} orient="top right" mt="45px" gap={1}>
          <StrokedText
            fontSize="22px"
            fontWeight="bold"
            strokeWidth={6}
            strokeColor={strokeColor}
            shadowHeight={3}
            textAlign="left"
            mr="50px"
          >
            {title}
          </StrokedText>
          <Text
            color="#F6AC51"
            fontFamily='"Greycliff CF", sans-serif'
            fontSize="14px"
            fontStyle="normal"
            fontWeight={800}
            lineHeight="100%"
            sx={{
              textShadow: '0px 1.5px 0px rgba(0, 0, 0, 0.50)',
            }}
            mr="12px"
          >
            {subtitle}
          </Text>
        </McFlex>
      </McFlex>
      {isClosable && onClose && (
        <CloseButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          size="sm"
          color="#f3c98a"
          opacity={0.92}
          _hover={{
            opacity: 1,
          }}
          position="absolute"
          top={`${topOffset + 20}px`}
          right="10px"
          bg="linear-gradient(135deg, #ad7932 60%, #8b5c2a 100%)"
          borderRadius="full"
          border="1px solid #a97c50"
          boxShadow="0 2px 6px rgba(80, 50, 20, 0.18)"
        />
      )}
    </Box>
  </Box>
);

export default QuinoaBoardToast;
