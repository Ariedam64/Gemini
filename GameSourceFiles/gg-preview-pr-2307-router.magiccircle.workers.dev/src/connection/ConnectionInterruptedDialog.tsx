import { Trans, useLingui } from '@lingui/react/macro';
import { useEffect, useState } from 'react';
import { CriticalAlertDialog } from '@/components/ui/CriticalAlertDialog';
import { useRoomConnection } from './hooks';

const NumConsecutiveFailedAttemptsBeforeShowingDialog = 5;

export function ConnectionInterruptedDialog() {
  const roomConnection = useRoomConnection();
  const [isConnectionInterrupted, setIsConnectionInterrupted] = useState(false);
  const { t } = useLingui();

  useEffect(() => {
    const unsubscribe = roomConnection.addReconnectionListener((state) => {
      setIsConnectionInterrupted(
        !state.isConnected &&
          state.numConsecutiveAttempts >=
            NumConsecutiveFailedAttemptsBeforeShowingDialog
      );
    });
    return unsubscribe;
  }, [roomConnection]);

  useEffect(() => {
    if (!isConnectionInterrupted) {
      return;
    }
    console.error('Connection to server lost');
  }, [isConnectionInterrupted]);

  return (
    <CriticalAlertDialog
      isOpen={isConnectionInterrupted}
      title={t`Connection Interrupted`}
    >
      <strong>
        <Trans>Please check your internet connection.</Trans>
      </strong>
      <br />
      <Trans>
        If you're sure you're connected to the internet, there may be a problem
        with our servers.
      </Trans>
    </CriticalAlertDialog>
  );
}
