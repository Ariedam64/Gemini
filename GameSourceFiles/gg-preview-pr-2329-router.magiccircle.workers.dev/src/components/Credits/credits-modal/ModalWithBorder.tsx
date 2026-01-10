import { ReactNode } from 'react';
import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

interface ModalWithBorderProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: string;
  maxW?: string;
  backgroundImage?: string;
}

export const ModalWithBorder = ({
  isOpen,
  onClose,
  children,
  size = 'lg',
  maxW = '380px',
  backgroundImage,
}: ModalWithBorderProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      lockFocusAcrossFrames={false}
      size={size}
      variant="CreditsPurchaseModal"
    >
      <ModalOverlay bg="ScrimDarkest" />
      <ModalContent bg="transparent" boxShadow="none" maxW={maxW} border="none">
        {/* Gradient border wrapper */}
        <Box
          background="linear-gradient(45deg, #FFE296, #DE1F87)"
          borderRadius="24px"
          p="3px"
        >
          <Box
            position="relative"
            width="100%"
            background="linear-gradient(135deg, #2D1B69 0%, #1A1B23 100%)"
            borderRadius="21px"
            overflow="hidden"
            p={3}
          >
            <ModalCloseButton size="lg" zIndex={10} />

            {/* Optional background image */}
            {backgroundImage && (
              <Box
                position="absolute"
                top="-80px"
                right="-90px"
                pointerEvents="none"
              >
                <img src={backgroundImage} alt="Background character" />
              </Box>
            )}

            {/* Content overlay */}
            <Box position="relative" zIndex={1} width="100%">
              {children}
            </Box>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};
