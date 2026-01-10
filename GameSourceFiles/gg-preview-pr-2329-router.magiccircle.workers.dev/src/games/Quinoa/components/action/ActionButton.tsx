import { Button } from '@chakra-ui/react';
import { useLingui } from '@lingui/react/macro';
import { useAtomValue } from 'jotai';
import { useRef } from 'react';
import type { GridPosition } from '@/common/games/Quinoa/world/map/types';
import McFlex from '@/components/McFlex/McFlex';
import McTooltip from '@/components/McTooltip/McTooltip';
import { MotionBox } from '@/components/Motion';
import StrokedText from '@/components/StrokedText/StrokedText';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';
import { positionAtom } from '@/Quinoa/atoms/positionAtoms';
import {
  isActionButtonHighlightedAtom,
  isInstaGrowButtonHiddenAtom,
} from '@/Quinoa/atoms/taskAtoms';
import { getActionButtonVariant } from '@/Quinoa/utils/getActionButtonVariant';
import { hotkeyBeingPressedAtom } from '../../atoms/hotkeyAtoms';
import { instaGrowCostAtom } from '../../atoms/myAtoms';
import { type ActionType, actionAtom } from '../../data/action/actionAtom';
import { actionLabelAtom } from '../../data/action/actionLabelAtom';
import { PRESS_AND_HOLD_ACTION_SECONDS } from '../../data/action/constants/constants';
import {
  clearActionWaitingTimeout,
  executeAction,
  isActionWaitingAtom,
} from '../../data/action/executeAction/executeAction';
import { isActionButtonLoadingAtom } from '../../data/action/isActionButtonLoadingAtom';
import { isPressAndHoldActionAtom } from '../../data/action/isPressAndHoldActionAtom';
import QuinoaCreditsLabel from '../currency/QuinoaCreditsLabel';
import TutorialHighlight from '../inventory/TutorialHighlight';

const getActionInfo = (action: ActionType, position: GridPosition) => {
  // This prevents the action from being executed if the player moves while holding the button
  return `${action}-${position.x}-${position.y}`;
};

/**
 * Action button that displays the current available action and allows execution.
 * Shows different states like "Plant", "Harvest", "Growing", etc.
 */
const ActionButton: React.FC = () => {
  const action = useAtomValue(actionAtom);
  const position = useAtomValue(positionAtom);
  const actionLabel = useAtomValue(actionLabelAtom);
  const isActionWaiting = useAtomValue(isActionWaitingAtom);
  const instaGrowCost = useAtomValue(instaGrowCostAtom);
  const isLoading = useAtomValue(isActionButtonLoadingAtom);
  const isSmallScreen = useIsSmallScreen();
  const activeHotkey = useAtomValue(hotkeyBeingPressedAtom);
  const isPressAndHold = useAtomValue(isPressAndHoldActionAtom);
  const isActionButtonHighlighted = useAtomValue(isActionButtonHighlightedAtom);
  const isInstaGrowButtonHidden = useAtomValue(isInstaGrowButtonHiddenAtom);
  const { t } = useLingui();
  // Track the last time an instant action was executed to prevent accidental
  // press-and-hold triggers immediately after
  const lastInstantActionTimeRef = useRef(0);
  const COOLDOWN_MS = 200; // Cooldown period after instant actions
  const lastInitiatedActionInfoRef = useRef<string | null>(null);
  const infoText = isPressAndHold ? t`Press & Hold` : null;

  if (
    !position ||
    action === 'invalid' ||
    action === 'none' ||
    (action === 'instaGrow' && isInstaGrowButtonHidden)
  ) {
    return null;
  }

  const handlePointerDown = () => {
    lastInitiatedActionInfoRef.current = getActionInfo(action, position);
    // Block press-and-hold if we're in the cooldown period after an instant action
    const timeSinceLastAction = Date.now() - lastInstantActionTimeRef.current;
    if (!isPressAndHold || timeSinceLastAction < COOLDOWN_MS) {
      return;
    }
    executeAction();
  };

  const handleOnClick = () => {
    clearActionWaitingTimeout();

    const currentActionInfo = getActionInfo(action, position);
    const didActionChange =
      lastInitiatedActionInfoRef.current !== currentActionInfo;

    if (isPressAndHold || didActionChange) {
      return;
    }
    lastInstantActionTimeRef.current = Date.now();
    executeAction();
  };

  return (
    <McFlex auto col>
      {infoText && (
        <StrokedText color="white" fontWeight="bold" fontSize="xs">
          {infoText}
        </StrokedText>
      )}
      <TutorialHighlight
        isActive={isActionButtonHighlighted}
        borderRadius={isSmallScreen ? '10px' : '14px'}
      >
        <McTooltip label={t`[space]`} placement="bottom" showOnDesktopOnly>
          <Button
            position="relative"
            variant={getActionButtonVariant(action)}
            // onClick must be defined to prevent propagation of the click event to
            // other components, e.g., QuinoaModal, which would immediately close the modal
            // upon opening it with the action button
            onClick={handleOnClick}
            onPointerDown={handlePointerDown}
            overflow="hidden"
            fontSize={isSmallScreen ? '14px' : '20px'}
            px={isSmallScreen ? 2 : 4}
            py={isSmallScreen ? 2 : 3}
            isLoading={isLoading}
            isActive={activeHotkey === 'Space'}
            borderRadius={isSmallScreen ? '10px' : '14px'}
          >
            <MotionBox
              zIndex={-1}
              key={`${action}-${isActionWaiting}`}
              w="100%"
              h="100%"
              bg="rgba(255, 255, 255, 0.4)"
              position="absolute"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: isActionWaiting ? 1 : 0,
              }}
              transition={{
                duration: isActionWaiting ? PRESS_AND_HOLD_ACTION_SECONDS : 0,
              }}
              transformOrigin="left"
            />
            {actionLabel}
            {/* HACK: This is a hack to show the insta-grow cost. Come up with a better solution. */}
            {/* We remove the component when loading, otherwise it make the button too tall in the loading state. */}
            {action === 'instaGrow' && !isLoading && (
              <>
                &nbsp;
                <QuinoaCreditsLabel
                  amount={instaGrowCost}
                  size={isSmallScreen ? 'sm' : 'md'}
                  showTooltip={false}
                  strokedTextProps={{
                    color: 'MagicBlack',
                    strokeColor: 'MagicBlack',
                    strokeWidth: 0.5,
                  }}
                />
              </>
            )}
          </Button>
        </McTooltip>
      </TutorialHighlight>
    </McFlex>
  );
};

export default ActionButton;
