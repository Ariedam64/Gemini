import { forwardRef, useCallback } from 'react';
import { Input, InputProps } from '@chakra-ui/react';
import { playSfx } from '@/audio/useQuinoaAudio';
import { environment, surface } from '@/environment';

export interface MagicInputProps extends InputProps {
  onEnterKeyDown?: () => void;
  shouldBlurOnEnter?: boolean;
}

/**
 * Enhanced input component with keyboard interaction and sound effects.
 *
 * @example
 * // Basic usage
 * <MagicInput
 *   onEnterKeyDown={() => console.log('Enter key pressed')}
 * />
 *
 * // Using a different input component
 * <MagicInput
 *   as={Input}
 *   onEnterKeyDown={() => console.log('Enter key pressed')}
 * />
 *
 * @param {Object} props - Component props
 * @param {() => void} [props.onEnterKeyDown] - Function called on Enter key press
 * @param {boolean} [props.shouldBlurOnEnter=true] - Blur input on Enter press
 * @param {React.Ref<HTMLInputElement>} ref - Ref forwarded to input element
 * @returns {React.ReactElement} Rendered MagicInput component
 */
const MagicInput = forwardRef<HTMLInputElement, MagicInputProps>(
  ({ onEnterKeyDown, shouldBlurOnEnter = true, ...props }, ref) => {
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if (event.key === 'Enter') {
          playSfx('Keyboard_Enter');
          // Blur the input element when the user presses enter.
          if (shouldBlurOnEnter) {
            (event.target as HTMLInputElement).blur();
          }
          // If the user has provided an onSubmit handler, call it
          if (onEnterKeyDown) {
            event.preventDefault();
            onEnterKeyDown();
          }
        } else {
          // Only play the type tap sound if the input is not at its max length
          if (
            event.currentTarget.value.length < event.currentTarget.maxLength
          ) {
            playSfx('Keyboard_TypeTap');
          }
        }
      },
      [onEnterKeyDown, shouldBlurOnEnter]
    );

    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLInputElement>) => {
        if (surface === 'webview') {
          const input = event.target as HTMLInputElement;
          input.setSelectionRange(0, input.value.length);
        }

        if (props.onClick) {
          props.onClick(event);
        }
      },
      [props.onClick]
    );

    return (
      <Input
        ref={ref}
        {...props}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

export default MagicInput;
