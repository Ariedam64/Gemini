import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

interface FixedAspectRatioContainerProps {
  /**
   * The aspect ratio to maintain (width / height).
   * Example: For a 1165x1368 image, pass 1165 / 1368
   */
  aspectRatio: number;
  /**
   * Background image URL to display
   */
  backgroundImage: string;
  /**
   * Child components to render inside the container
   */
  children: ReactNode;
}

/**
 * A container component that maintains a fixed aspect ratio and keeps an image at the right size
 * regardless of the dimensions of its parent container.
 *
 * We use two containers: the outer one centers the modal and fills the available space,
 * while the inner one ensures the aspect ratio is always respected, expanding to fill
 * 100% of the width or height as needed. This guarantees the content always maintains
 * its intended proportions regardless of screen size.
 */
const FixedAspectRatioContainer: React.FC<FixedAspectRatioContainerProps> = ({
  aspectRatio,
  backgroundImage,
  children,
}) => {
  return (
    <>
      {/* outer container (container1) */}
      <Box
        h="100%"
        maxW="100%"
        aspectRatio={aspectRatio}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/* inner container (container2) */}
        <Box
          w="100%"
          aspectRatio={aspectRatio}
          backgroundImage={backgroundImage}
          backgroundSize="cover"
          backgroundPosition="center"
          onClick={(e) => e.stopPropagation()}
          position="relative"
        >
          {children}
        </Box>
      </Box>
    </>
  );
};

export default FixedAspectRatioContainer;
