import { getDefaultStore, useSetAtom } from 'jotai';
import {
  ConfirmationDialogData,
  confirmationDialogAtom,
} from './confirmationDialogAtom';

export const useConfirmationDialog = () => {
  const setConfirmDialog = useSetAtom(confirmationDialogAtom);

  const requestConfirm = (dialogData: ConfirmationDialogData) => {
    setConfirmDialog({
      ...dialogData,
      isOpen: true,
      onConfirm: () => {
        dialogData.onConfirm?.();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
      onCancel: () => {
        dialogData.onCancel?.();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
      onDismiss: () => {
        dialogData.onDismiss?.();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  return requestConfirm;
};

const { set } = getDefaultStore();

export function setConfirmationDialog(dialogData: ConfirmationDialogData) {
  set(confirmationDialogAtom, {
    ...dialogData,
    isOpen: true,
    onConfirm: () => {
      dialogData.onConfirm?.();
      set(confirmationDialogAtom, (prev) => ({ ...prev, isOpen: false }));
    },
    onCancel: () => {
      dialogData.onCancel?.();
      set(confirmationDialogAtom, (prev) => ({ ...prev, isOpen: false }));
    },
    onDismiss: () => {
      dialogData.onDismiss?.();
      set(confirmationDialogAtom, (prev) => ({ ...prev, isOpen: false }));
    },
  });
}
