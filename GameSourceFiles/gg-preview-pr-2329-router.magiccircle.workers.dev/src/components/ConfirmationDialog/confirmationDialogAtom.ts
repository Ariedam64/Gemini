import { BoxProps, ButtonProps } from '@chakra-ui/react';
import { atom } from 'jotai';
import { Color } from '@/theme/colors';

type BackgroundColorType = BoxProps['backgroundColor'];

/**
 * Defines the structure for confirmation dialog data.
 * @interface
 * @property {string} title - The title of the dialog.
 * @property {string} message - The message to be displayed in the dialog.
 * @property {string} okText - The text for the confirmation button.
 * @property {string} cancelText - The text for the cancel button.
 * @property {() => void} onConfirm - The function to execute when the confirmation button is clicked.
 * @property {() => void} [onCancel] - The function to execute when the cancel button is clicked. Optional.
 * @property {() => void} [onDismiss] - The function to execute when the dialog is dismissed without any action. Optional.
 */
export interface ConfirmationDialogData {
  zIndex?: ButtonProps['zIndex'];
  title: string;
  message?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okTextVariant?: ButtonProps['variant'];
  cancelVariant?: ButtonProps['variant'];
  isCentered?: boolean;
  okButtonColor?: BackgroundColorType;
  cancelColor?: Color;
  cancelBackground?: BackgroundColorType;
  content?: JSX.Element;
  onConfirm?: () => void;
  onCancel?: () => void;
  onDismiss?: () => void;
}

interface ConfirmDialogState extends ConfirmationDialogData {
  isOpen: boolean;
}

const defaultConfirmDialogState: ConfirmDialogState = {
  isOpen: false,
  title: '',
  message: '',
  okText: 'OK',
  okTextVariant: 'solid',
  cancelText: 'Cancel',
  cancelVariant: 'solid',
  onConfirm: () => {},
  onCancel: () => {},
  onDismiss: () => {},
};

export const confirmationDialogAtom = atom<ConfirmDialogState>(
  defaultConfirmDialogState
);
