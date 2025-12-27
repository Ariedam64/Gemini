import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { confirmationDialogAtom } from './confirmationDialogAtom';

export const ConfirmationDialog = () => {
  const state = useAtomValue(confirmationDialogAtom);
  const cancelRef = useRef<HTMLButtonElement>(null);

  if (!state.isOpen) return null;

  return (
    <AlertDialog
      variant="Dialog"
      isOpen={state.isOpen}
      autoFocus={false}
      // Disable lockFocusAcrossFrames because it was breaking right-click menus
      // in the Discord App
      lockFocusAcrossFrames={false}
      leastDestructiveRef={cancelRef}
      onClose={() => {
        state.onDismiss?.();
      }}
    >
      <AlertDialogOverlay />
      <AlertDialogContent containerProps={{ zIndex: state.zIndex }}>
        <AlertDialogCloseButton />
        <AlertDialogHeader textAlign={state.isCentered ? 'center' : undefined}>
          {state.title}
        </AlertDialogHeader>
        <AlertDialogBody textAlign={state.isCentered ? 'center' : undefined}>
          {state.message}
        </AlertDialogBody>
        {state.content}
        {(state.cancelText || state.okText) && (
          <AlertDialogFooter
            justifyContent={state.isCentered ? 'center' : undefined}
          >
            {state.cancelText && (
              <Button
                w="100%"
                ref={cancelRef}
                variant={state.cancelVariant || 'solid'}
                background={state.cancelBackground || 'Neutral.DarkGrey'}
                color={state.cancelColor || 'Neutral.White'}
                onClick={state.onCancel}
              >
                {state.cancelText}
              </Button>
            )}
            {state.okText && (
              <Button
                w="100%"
                h="50px"
                onClick={state.onConfirm}
                ml={3}
                background={state.okButtonColor || undefined}
                data-testid="confirmation-dialog-ok-button"
              >
                {state.okText}
              </Button>
            )}
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};
