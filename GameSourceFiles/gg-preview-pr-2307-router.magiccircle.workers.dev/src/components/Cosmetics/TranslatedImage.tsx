import { Box, BoxProps, Image } from '@chakra-ui/react';

/**
 * Props for the TranslatedImage component
 * @interface TranslatedImageProps
 */
interface TranslatedImageProps extends BoxProps {
  src?: string | string[];
  alt: string;
  translateY: string | number;
  width?: string | number;
  height?: string | number;
}

/**
 * A component that renders an image or multiple images with translation effects
 * @param {TranslatedImageProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export const TranslatedImage: React.FC<TranslatedImageProps> = ({
  src,
  alt,
  translateY,
  width = '100%',
  height = '100%',
  ...rest
}) => {
  const imagesToRender = Array.isArray(src) ? src : src ? [src] : [];

  return (
    <Box
      width={width}
      height={height}
      position="relative"
      overflow="hidden"
      display="flex"
      justifyContent="center"
      alignItems="center"
      {...rest}
    >
      <Box
        position="relative"
        top={translateY}
        left="50%"
        transform="translate(-50%, -50%)"
        width="100%"
        height="100%"
      >
        {imagesToRender.map((imageSrc, index) => (
          <Image
            key={`${imageSrc}-${index}`}
            src={imageSrc}
            alt={alt}
            width="200%"
            height="200%"
            objectFit="cover"
            position="absolute"
            top={0}
            left={0}
          />
        ))}
      </Box>
    </Box>
  );
};
