import {
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { useState } from 'react';
import { X } from 'react-feather';
import type { UserCosmeticItem } from '@/common/prisma/generated/browser';
import type { CosmeticItem } from '@/common/resources/cosmetics/cosmeticTypes';
import McFlex from '@/components/McFlex/McFlex';
import { useMe_UserCosmeticItems, useUser } from '@/user';
import { post } from '@/utils';
import CosmeticPurchaseModalContent from './CosmeticPurchaseModalContent';

interface CosmeticPurchaseModalProps {
  cosmeticItems: CosmeticItem[];
  isOpen: boolean;
  onClose: () => void;
  revertItem: (filename: string) => void;
  onClickSave: (acquiredCosmetics: UserCosmeticItem[] | undefined) => void;
}

const CosmeticPurchaseModal: React.FC<CosmeticPurchaseModalProps> = ({
  cosmeticItems,
  isOpen,
  onClose,
  revertItem,
  onClickSave,
}) => {
  const { mutateUser } = useUser();
  const { mutate: mutateCosmetics } = useMe_UserCosmeticItems();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const totalCost = cosmeticItems.reduce((acc, item) => acc + item.price, 0);

  const onClickPurchase = async () => {
    if (isPurchasing) {
      return;
    }
    setIsPurchasing(true);

    try {
      const purchaseData = {
        items: cosmeticItems.map((item) => item.id),
      };
      // this prob needs to be AuthenticatedResource...
      await post('/me/purchase', purchaseData);
      void mutateUser().catch(console.error);
      const acquiredCosmetics = await mutateCosmetics();
      onClose();
      onClickSave(acquiredCosmetics);
    } catch (error) {
      console.error('Error purchasing cosmetics', error);
      setIsPurchasing(false);
    }
  };

  return (
    <Modal
      variant="PurchaseModal"
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
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
        <McFlex h="100vh">
          <McFlex
            autoH
            position="relative"
            w="90%"
            bg="Neutral.White"
            borderRadius="10px"
            p="10px"
          >
            <IconButton
              position="absolute"
              top="10px"
              right="0"
              aria-label={t`Remove`}
              icon={<X />}
              variant="ghost"
              color="MagicBlack"
              onClick={onClose}
            />

            <CosmeticPurchaseModalContent
              cosmeticItems={cosmeticItems}
              totalCost={totalCost}
              onClose={onClose}
              revertItem={revertItem}
              onClickPurchase={() => void onClickPurchase()}
            />
          </McFlex>
        </McFlex>
      </ModalContent>
    </Modal>
  );
};

export default CosmeticPurchaseModal;
