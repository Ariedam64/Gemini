import { useEffect } from 'react';
import { useIsUserAuthenticated } from '@/store/store';
import { usePresentableProducer } from '..';
import CoverSheet from './CoverSheet';
import { coverSheetPresentableId } from './constants';
import { useCoverSheetModal } from './useCoverSheetModal';

export interface CoverSheetPresentable {
  type: 'CoverSheet';
  component: React.ReactNode;
}

export function useCoverSheetPresentableProducer(priority: number) {
  const { addPresentable, removePresentable } =
    usePresentableProducer<CoverSheetPresentable>(priority);
  const isAuthenticated = useIsUserAuthenticated();
  const { isOpen: isCoverSheetModalOpen } = useCoverSheetModal();

  useEffect(() => {
    if (!isAuthenticated) {
      addPresentable({
        id: coverSheetPresentableId,
        presentable: {
          type: 'CoverSheet',
          component: <CoverSheet />,
        },
      });
    } else {
      removePresentable({ id: coverSheetPresentableId });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isCoverSheetModalOpen) {
      removePresentable({ id: coverSheetPresentableId });
    }
  }, [isCoverSheetModalOpen]);
}
