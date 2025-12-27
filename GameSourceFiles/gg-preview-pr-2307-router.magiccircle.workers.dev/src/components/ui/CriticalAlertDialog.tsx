import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  type AlertDialogProps,
  Button,
  Text,
} from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useRef, useState } from 'react';
import { AlertTriangle } from 'react-feather';
import McFlex from '@/components/McFlex/McFlex';
import { useIsDeveloper } from '@/store/store';
import { getCurrentRoomId } from '@/utils';
import ReportBugButton from './ReportBugButton';

interface CriticalAlertDialogProps extends Partial<AlertDialogProps> {
  isOpen: boolean;
  title: string;
  showBugInfo?: boolean;
}

/**
 * CriticalAlertDialog component
 * @param {Object} props - component properties
 * @param {boolean} props.isOpen - flag indicating if the dialog is open
 * @param {string} props.alertMessage - message to display in the alert dialog
 */
export function CriticalAlertDialog({
  isOpen,
  children,
  title,
  showBugInfo = true,
  ...rest
}: CriticalAlertDialogProps) {
  const isDeveloper = useIsDeveloper();
  const [isHidden, setIsHidden] = useState(false);
  const cancelRef = useRef(null);

  return (
    <AlertDialog
      variant="CriticalError"
      isOpen={isOpen && !isHidden}
      onClose={() => void 0}
      leastDestructiveRef={cancelRef}
      // Disable lockFocusAcrossFrames because it was breaking right-click menus
      // in the Discord App
      lockFocusAcrossFrames={false}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      {...rest}
    >
      <AlertDialogOverlay />
      <AlertDialogContent maxWidth="650px">
        <AlertDialogHeader pt="2">
          <AlertTriangle />
          {title}
        </AlertDialogHeader>
        <AlertDialogBody fontSize="sm2">{children}</AlertDialogBody>
        Room ID: {getCurrentRoomId()}
        {showBugInfo && (
          <>
            <Text fontStyle="italic">
              <Trans>
                Psssst! Think this is a bug?&nbsp; Report it in our Discord
                server with the button below. TYSM!
                <br /> &mdash; the Devs 🫶
              </Trans>
            </Text>
            <McFlex orient="left" gap={2}>
              <ReportBugButton />
              {isDeveloper && (
                <Button
                  size="xs"
                  width="auto"
                  height="32px"
                  bg="black"
                  color="Orange.Light"
                  onClick={() => {
                    setIsHidden(true);
                  }}
                >
                  [dev] hide this modal
                </Button>
              )}
            </McFlex>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
