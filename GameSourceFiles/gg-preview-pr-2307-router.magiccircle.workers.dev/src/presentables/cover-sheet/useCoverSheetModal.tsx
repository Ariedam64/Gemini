import { atom, useAtom } from 'jotai';

export const isCoverSheetModalOpenAtom = atom(false);

export const useCoverSheetModal = () => {
  const [isOpen, setIsOpen] = useAtom(isCoverSheetModalOpenAtom);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
