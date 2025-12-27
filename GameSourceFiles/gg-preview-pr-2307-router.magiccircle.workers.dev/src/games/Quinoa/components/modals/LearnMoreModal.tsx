import { Modal, ModalOverlay } from '@chakra-ui/react';
import type { ShopItem } from '@/common/games/Quinoa/systems/shop';
import McFlex from '@/components/McFlex/McFlex';
import GuildSeedAvailabilityModalContent from '../GuildSeedAvailabilityModalContent';
import SurfaceExclusiveModalContent from '../SurfaceExclusiveModalContent';

interface LearnMoreModalProps {
  item: ShopItem;
  onClose: () => void;
  isItemGuildExclusive: boolean;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({
  item,
  onClose,
  isItemGuildExclusive,
}) => {
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay zIndex="AboveGameModal" bg="ScrimDarker" />
      <McFlex
        position="absolute"
        top="0"
        left="0"
        zIndex="AboveGameModal"
        px={2}
        onClick={onClose}
      >
        <McFlex
          col
          auto
          maxW="500px"
          bg="Brown.Dark"
          borderRadius="15px"
          borderWidth="3px"
          borderColor="Brown.Magic"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.5)"
          overflow="hidden"
          onClick={(e) => e.stopPropagation()}
          top="0"
        >
          {isItemGuildExclusive ? (
            <GuildSeedAvailabilityModalContent item={item} onClose={onClose} />
          ) : (
            <SurfaceExclusiveModalContent item={item} onClose={onClose} />
          )}
        </McFlex>
      </McFlex>
    </Modal>
  );
};

export default LearnMoreModal;
