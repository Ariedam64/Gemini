import McFlex from '../../McFlex/McFlex';
import { useCreditsModal } from '../useCreditsModal';
import { CreditsModalContent } from './CreditsModalContent';
import { CreditsModalDescription } from './CreditsModalDescription';
import { CreditsModalHeader } from './CreditsModalHeader';
import { ModalWithBorder } from './ModalWithBorder';
import WizardPandaTrimmed from './WizardPandaTrimmed.png';

export const CreditsModal = () => {
  const { isOpen, close } = useCreditsModal();

  if (!isOpen) return null;

  return (
    <ModalWithBorder
      isOpen={isOpen}
      onClose={close}
      backgroundImage={WizardPandaTrimmed}
    >
      <McFlex col gap={2}>
        <CreditsModalHeader />
        <CreditsModalDescription />
        <CreditsModalContent />
      </McFlex>
    </ModalWithBorder>
  );
};
