import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { memo } from 'react';
import McFlex from '@/components/McFlex/McFlex';
import { isEstablishingShotCompleteAtom } from '@/Quinoa/atoms/establishingShotAtoms';
import { useIsUserAuthenticated } from '@/store/store';
import { useCurrentPresentable, useDismissCurrentPresentable } from '.';
import { useChallengesPresentableProducer } from './challenges/useChallengePresentableProducer';
import { useClaimableCosmeticPresentableProducer } from './claimables/useClaimablePresentableProducer';
import { useCoverSheetPresentableProducer } from './cover-sheet/useCoverSheetPresentableProducer';
import { useMiniAvocadoPrizePresentableProducer } from './miniavocado-prize/useMiniAvocadoPrizePresentable';
import { useNewsItemsPresentableProducer } from './news/newsItemsPresentableProducer';
import { useStreakPresentableProducer } from './streak/useStreakPresentableProducer';

const usePresentableProducers = () => {
  const isAuthenticated = useIsUserAuthenticated();
  const producers = [
    // Presentables are rendered in the order in which
    // their producers appear in this array.
    useMiniAvocadoPrizePresentableProducer,
    useNewsItemsPresentableProducer,
    useChallengesPresentableProducer,
    useClaimableCosmeticPresentableProducer,
    // Streak animation is last so it shows after all other presentables
    useStreakPresentableProducer,
  ];
  // If the user is not signed in, we want the cover sheet to be the first presentable
  if (!isAuthenticated) {
    producers.unshift(useCoverSheetPresentableProducer);
  }
  producers.forEach((producer, index) => {
    const priority = index;
    producer(priority);
  });
};

const Presentables: React.FC = memo(() => {
  const isEstablishingShotComplete = useAtomValue(
    isEstablishingShotCompleteAtom
  );
  const presentable = useCurrentPresentable();
  const dismissCurrentPresentable = useDismissCurrentPresentable();

  usePresentableProducers();

  if (!presentable || !isEstablishingShotComplete) {
    return null;
  }
  return (
    <Modal
      isOpen
      isCentered
      onClose={dismissCurrentPresentable}
      variant="Presentable"
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
        <McFlex flexDirection="column" height="100vh" justifyContent="start">
          {presentable.component}
        </McFlex>
      </ModalContent>
    </Modal>
  );
});

export default Presentables;
