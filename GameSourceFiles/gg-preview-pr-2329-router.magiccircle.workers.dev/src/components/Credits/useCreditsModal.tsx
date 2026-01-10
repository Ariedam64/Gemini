import { atom, useAtom } from 'jotai';

export const isCreditsModalOpenAtom = atom(false);

export const useCreditsModal = () => {
  const [isOpen, setIsOpen] = useAtom(isCreditsModalOpenAtom);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};
