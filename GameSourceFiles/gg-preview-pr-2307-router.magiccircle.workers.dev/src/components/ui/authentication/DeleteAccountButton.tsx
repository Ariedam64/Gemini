import { Button, type ButtonProps, Text } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useState } from 'react';
import { logOut } from '@/auth/discord/surfaces/web';
import { useConfirmationDialog } from '@/components/ConfirmationDialog/useConfirmationDialog';
import McFlex from '@/components/McFlex/McFlex';
import { useIsUserAuthenticated } from '@/store/store';
import { sendRequest } from '@/utils';

/**
 * Button for deleting the user's account.
 *
 * This button should be used with caution. It is expected to trigger
 * a confirmation dialog and then perform the account deletion action.
 *
 * @param props - Standard Chakra UI ButtonProps.
 */
export const DeleteAccountButton: React.FC<ButtonProps> = (props) => {
  const isAuthenticated = useIsUserAuthenticated();
  const [isDeleting, setIsDeleting] = useState(false);
  const confirm = useConfirmationDialog();

  const deleteAccount = async () => {
    setIsDeleting(true);
    try {
      await sendRequest('/me/seppuku', undefined, {
        method: 'DELETE',
      });
      confirm({
        title: t`Account deleted`,
        isCentered: true,
        message: (
          <McFlex col p={2} pt={1}>
            <Text fontSize="md">
              <Trans>
                Your account has been deleted. You will be logged out.
              </Trans>
            </Text>
          </McFlex>
        ),
        okText: t`OK`,
        onConfirm: () => {
          logOut().catch(console.error);
        },
      });
    } catch (error) {
      confirm({
        title: t`Unable to delete account`,
        isCentered: true,
        message: (
          <McFlex col p={2} pt={1}>
            <Text fontSize="md">
              <Trans>
                Please try again. Error:{' '}
                {error instanceof Error ? error.message : 'Unknown error'}
              </Trans>
            </Text>
          </McFlex>
        ),
        okText: t`OK`,
        onConfirm: () => {},
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAccount = () => {
    if (!isAuthenticated) {
      return;
    }
    confirm({
      title: t`Delete account?`,
      isCentered: true,
      message: (
        <McFlex col p={2} pt={1}>
          <Text fontSize="md">
            <Trans>
              All progress, purchases, and data will be deleted and you will be
              logged out.
            </Trans>
            <br />
            <br />
            <strong>
              <Trans>WARNING: This action is irreversible.</Trans>
            </strong>
          </Text>
        </McFlex>
      ),
      okText: t`Delete`,
      okButtonColor: 'Red.Magic',
      cancelText: t`Cancel`,
      onConfirm: () => {
        deleteAccount().catch(console.error);
      },
      onCancel: () => {},
    });
  };

  return (
    <Button
      variant="red"
      onClick={handleDeleteAccount}
      isLoading={isDeleting}
      {...props}
    >
      <Trans>Delete Account</Trans>
    </Button>
  );
};
