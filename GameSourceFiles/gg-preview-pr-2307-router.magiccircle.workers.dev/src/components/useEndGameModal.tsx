import { useLingui } from '@lingui/react/macro';
import { useSendRoomMessage } from '@/hooks';
import { useConfirmationDialog } from './ConfirmationDialog/useConfirmationDialog';

const useEndGameModal = () => {
  const showConfirmation = useConfirmationDialog();
  const sendRoomMessage = useSendRoomMessage();
  const { t } = useLingui();

  const confirmEndGame = (): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
      showConfirmation({
        title: t`Are you sure?`,
        okText: t`End Game`,
        cancelText: t`Nope`,
        cancelBackground: 'Purple.Magic',
        okButtonColor: 'Neutral.DarkGrey',
        isCentered: true,
        onConfirm: () => {
          sendRoomMessage({ type: 'RequestGame', name: 'Lobby' });
          resolve(true);
        },
        onCancel: () => resolve(false),
        onDismiss: () => resolve(false),
      });
    });
  };

  return confirmEndGame;
};

export default useEndGameModal;
