import { Button, Modal, ModalOverlay, Text } from '@chakra-ui/react';
import { Plural, Trans } from '@lingui/react/macro';
import { useEffect, useState } from 'react';
import McFlex from '@/components/McFlex/McFlex';
import { surface } from '@/environment';
import { useNotificationSubscriptions } from '@/hooks/useNotificationSubscriptions';
import { sendQuinoaToast } from '@/Quinoa/atoms/toastAtoms';
import { useIsUserAuthenticated } from '@/store/store';
import { post } from '@/utils';

/**
 * iOS webview-only component that prompts users to re-enable notifications when they have
 * active notification subscriptions but have NOT granted OS-level notification permissions.
 *
 * This modal appears ONCE per app session when subscriptions initially load if:
 * - Running in iOS webview
 * - User is authenticated
 * - User has active notification subscriptions from a previous session
 * - iOS notification permission is NOT granted (checked via native bridge using OneSignal SDK)
 *
 * Common scenarios:
 * - User reset notification permissions in iOS Settings
 * - User deleted and reinstalled the app
 * - User previously subscribed to seed/egg stock notifications but disabled OS permissions
 * - User denied permissions initially but has subscriptions
 *
 * Provides two actions:
 * - Continue: Triggers iOS notification permission prompt via webkit bridge
 * - Remove all notifications: Clears all notification subscriptions via API (optimistic update)
 *
 * @note The prompt will NOT show when:
 * - Users already have granted notification permissions (`permission === true`)
 * - Users subscribe for the first time in the current session
 */
const WebviewOnly_PromptToEnableNotificationsIfNeeded: React.FC = () => {
  const isAuthenticated = useIsUserAuthenticated();
  const { subscriptions, isLoading: isLoadingSubscriptions } =
    useNotificationSubscriptions();

  const [isOpen, setIsOpen] = useState(false);
  const [didPromptIfNeeded, setDidPromptIfNeeded] = useState(false);

  // Check for pending notification subscriptions once they've initially loaded
  useEffect(() => {
    if (didPromptIfNeeded) return;
    if (surface !== 'webview') return;
    if (isLoadingSubscriptions) return;
    if (!isAuthenticated) return;
    if (subscriptions.length === 0) {
      setDidPromptIfNeeded(true);
      return;
    }

    // Check current notification permission status before showing modal
    const handlePermissionStatus = (event: Event) => {
      const customEvent = event as CustomEvent<{
        permission: boolean;
        permissionNative: number;
        canRequest: boolean;
      }>;
      const { permission, permissionNative, canRequest } = customEvent.detail;

      console.log('Notification permission status:', {
        permission,
        permissionNative,
        canRequest,
      });

      // Only show modal if permissions are NOT granted (permission === false)
      if (!permission) {
        setIsOpen(true);
      }

      setDidPromptIfNeeded(true);
    };

    window.addEventListener(
      'magiccircle:notificationPermission',
      handlePermissionStatus,
      { once: true }
    );
    window.webkit?.messageHandlers?.queryNotificationPermissionStatus?.postMessage(
      {}
    );
  }, [
    isLoadingSubscriptions,
    isAuthenticated,
    subscriptions,
    didPromptIfNeeded,
  ]);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleEnableNotifications = () => {
    window.webkit?.messageHandlers?.requestNotificationPermission?.postMessage?.(
      {}
    );
    closeModal();
  };

  const handleDisableAll = async () => {
    // Optimistically close the modal
    closeModal();

    try {
      await post('/notifications/unsubscribe-all');
    } catch (error) {
      console.error('Failed to unsubscribe from all notifications:', error);
      sendQuinoaToast({
        variant: 'error',
        title: <Trans>Failed to remove notifications</Trans>,
        description: <Trans>Please report this as a bug!</Trans>,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay zIndex="AboveGameModal" bg="ScrimDarker" />
      <McFlex
        id="NotificationReEnablePrompt"
        position="absolute"
        top="0"
        left="0"
        zIndex="AboveGameModal"
        px={2}
        onClick={closeModal}
      >
        <McFlex
          col
          auto
          maxW="400px"
          bg="Brown.Dark"
          borderRadius="15px"
          borderWidth="3px"
          borderColor="Brown.Magic"
          boxShadow="0 4px 10px rgba(0, 0, 0, 0.5)"
          overflow="hidden"
          onClick={(e) => e.stopPropagation()}
          p={4}
          gap={3}
        >
          <McFlex
            fontSize="20px"
            fontWeight="bold"
            color="Yellow.Light"
            textAlign="center"
            justifyContent="center"
            alignItems="center"
          >
            <Trans>Re-enable Notifications?</Trans>
          </McFlex>

          <Text textAlign="center">
            <Trans>
              You have{' '}
              <strong>
                <Plural
                  value={subscriptions.length}
                  one="# notification"
                  other="# notifications"
                />
              </strong>{' '}
              for Seeds/Eggs, but you need to re-enable notifications to receive
              them.
            </Trans>
          </Text>

          <McFlex col gap={2} mt={2}>
            <Button
              w="100%"
              h="40px"
              bg="Green.Magic"
              borderWidth="2px"
              borderColor="Green.Darker"
              borderRadius="5px"
              onClick={handleEnableNotifications}
              fontSize="18px"
              fontWeight="bold"
              color="white"
              _hover={{ bg: 'Green.Light' }}
            >
              <Trans>Continue</Trans>
            </Button>

            <Button
              w="100%"
              h="40px"
              bg="Red.Magic"
              borderWidth="2px"
              borderColor="Red.Darker"
              borderRadius="5px"
              onClick={() => void handleDisableAll()}
              fontSize="14px"
              fontWeight="bold"
              color="white"
              _hover={{ bg: 'Red.Light' }}
            >
              <Trans>Remove all notifications</Trans>
            </Button>
          </McFlex>
        </McFlex>
      </McFlex>
    </Modal>
  );
};

export default WebviewOnly_PromptToEnableNotificationsIfNeeded;
