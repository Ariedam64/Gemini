import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import McFlex from '@/components/McFlex/McFlex';
import CoverSheet from './CoverSheet';
import { useCoverSheetModal } from './useCoverSheetModal';

type CoverSheetModalProps = {};

const CoverSheetModal: React.FC<CoverSheetModalProps> = () => {
  const { isOpen, close } = useCoverSheetModal();

  return (
    <Modal
      isOpen={isOpen}
      isCentered
      onClose={close}
      variant="Presentable"
      lockFocusAcrossFrames={false}
      // Important to NOT trap focus so we don't break any modals drawn on top
      // of this one, such as the SystemDrawer (especially the ProfileDrawer)
      trapFocus={false}
      // Important to not block scroll on mount so we can scroll any modals
      // that might be drawn on top of this one, such as the SystemDrawer
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <McFlex flexDirection="column" height="100vh" justifyContent="start">
          <CoverSheet />
        </McFlex>
      </ModalContent>
    </Modal>
  );
};

export default CoverSheetModal;
