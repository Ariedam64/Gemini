import {
  type ToastProps,
  type UseToastOptions,
  useToast,
} from '@chakra-ui/react';
import { type ReactNode, useCallback, useRef } from 'react';
import DismissableAlert from '@/components/Alerts/DismissableAlert';
import { useConfig } from '@/config';

const systemHeaderToastId = 'SystemHeaderToast';

type MagicToastOptions = Omit<UseToastOptions, 'render'> & {
  content?: ReactNode;
};

/**
 * Factory function that returns a render function given Toast Options.
 * It supports rendering via standard toast props like icon/title/description
 * OR custom JSX content via content prop.
 *
 * @param {MagicToastOptions} options - The toast options.
 */
function createRenderFunction(options: MagicToastOptions) {
  if (
    options.content &&
    (options.icon || options.title || options.description)
  ) {
    console.error(
      "Cannot use content with icon/title/description. It's one or the other."
    );
  }
  return (props: ToastProps) => (
    <DismissableAlert {...props}>{options.content}</DismissableAlert>
  );
}

const initialSystemToastDuration = 2000;

/**
 * Hook that provides two functions: sendToast and sendSystemToast.
 *
 * sendToast: Sends regular toasts. These are intended to be sent while not in-game,
 * since they can cover game content.
 *
 * sendSystemToast: Sends system toasts. These are safer to send while in-game,
 * since they only cover the system header. If a system toast is already active,
 * sending a new one will replace the current content and extend its duration by
 * one second.
 *
 * These functions are wrappers around Chakra's useToast hook, and they
 * support all the same options. However, instead of the render prop,
 * you can provide a content prop, which accepts JSX content. This is
 * useful for more complex toasts; see the jsdocs for each function for
 * examples.
 *
 * Also, if you set status to 'error' in the options, the toast will
 * automatically have a red background and white text.
 *
 * @returns {object} An object containing the sendToast and sendSystemToast functions.
 */
export function useMagicToast() {
  const toast = useToast();
  const keepToastsOnScreen = useConfig().root_keepToastsOnScreen;
  const systemToastDuration = useRef(initialSystemToastDuration);

  const sendSystemToast = useCallback(
    /**
     * Send a system toast notification to the user. You can provide a title,
     * description, and icon, or you can provide custom JSX content via the
     * content prop. Supports all the same options as Chakra's useToast hook.
     *
     * System toasts are safer to send while in-game, since they only cover the
     * system header.
     *
     * If a system toast is already active, sending a new one will replace the
     * current one and extend its duration.
     *
     * @example
     * // Example usage:
     * sendSystemToast({
     *   title: `Game started!`,
     *   description: `Let's go!`,
     *   icon: <PlayCircle />,
     * });
     *
     * // Alternatively, you can provide JSX content:
     * sendSystemToast({
     *   content: <CustomComponent />,
     * });
     */
    (options: MagicToastOptions) => {
      const patchedOptions: UseToastOptions = {
        variant: 'SystemHeaderToast',
        isClosable: true,
        // Note: it's really important that the position is NOT the same
        // as the other toast positions, otherwise their animations will
        // conflict. This is because Chakra Toasts are rendered in a
        // container portal per-position
        position: 'top-right',
        duration: keepToastsOnScreen ? null : systemToastDuration.current,
        id: systemHeaderToastId,
        containerStyle: {
          // Note: I'm not sure why, but width 100% doesn't work with position:
          // top-right, which is why I'm using 100vw instead
          width: '100vw',
          maxWidth: 'unset',
          minWidth: 'unset',
          justifyContent: 'space-between',
          margin: 0,
          height: 'var(--system-header-height)',
        },
        ...options,
        render: createRenderFunction(options),
      };
      if (toast.isActive(systemHeaderToastId)) {
        systemToastDuration.current += 1000;
        toast.update(systemHeaderToastId, {
          ...patchedOptions,
          duration: systemToastDuration.current,
        });
      } else {
        systemToastDuration.current = initialSystemToastDuration;
        toast(patchedOptions);
      }
    },
    [toast, keepToastsOnScreen]
  );

  const sendToast = useCallback(
    /**
     * Send a toast notification to the user. You can provide a title, description,
     * and icon, or you can provide custom JSX content via the content prop.
     * Supports all the same options as Chakra's useToast hook.
     *
     * @example
     * // Example usage:
     * sendToast({
     *   title: `Someone joined the game!`,
     *   description: `They must be really great!`,
     *   icon: <DownloadCloud />,
     * });
     *
     * // Alternatively, you can provide JSX content:
     * sendToast({
     *   content: <CustomComponent />,
     * });
     */
    (options: MagicToastOptions) => {
      const patchedOptions: UseToastOptions = {
        variant: 'DismissableAlert',
        isClosable: true,
        position: 'top',
        duration: keepToastsOnScreen ? null : 4000,
        containerStyle: {
          width: '100%',
          maxWidth: 'unset',
          minWidth: 'unset',
          justifyContent: 'space-between',
          // Pointer-events none is necessary to allow interaction
          // with the system header, since the container will cover it
          // We explicitly set pointer-events all on the close icon
          // (See DismissableAlert.tsx)
          pointerEvents: 'none',
        },
        ...options,
        render: createRenderFunction(options),
      };
      toast(patchedOptions);
    },
    [toast, keepToastsOnScreen]
  );

  return { sendSystemToast, sendToast };
}

// for when we do the in-game join toasts...

// sendSystemToast({
//   content: (
//     <McFlex gap="2" justifyContent="flex-start">
//       <McFlex width="auto">
//         <PlayerToken playerId={playerIds[0]} size="sm" />
//         {playerIds.length > 1 && (
//           <CountToken
//             size="sm"
//             ml="-12px"
//             fontSize="md"
//             count={playerIds.length - 1}
//           />
//         )}
//       </McFlex>
//       <Text>Sunflower and 3 others joined the game</Text>
//     </McFlex>
//   ),
// });
