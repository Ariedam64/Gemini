import * as React from 'react';
import { useState } from 'react';
import { Tooltip, TooltipProps } from '@chakra-ui/react';
import { isDesktopMode } from '@/environment';

interface McTooltipProps extends TooltipProps {
  children: React.ReactElement<{
    onClick?: (e: React.MouseEvent) => void;
    onMouseEnter?: (e: React.MouseEvent) => void;
    onMouseLeave?: (e: React.MouseEvent) => void;
  }>;
  showOnDesktopOnly?: boolean;
  keepOpenOnDesktopClick?: boolean;
  keepOpenOnMobileClick?: boolean;
}

/**
 * A wrapper around Chakra UI's Tooltip that fixes mobile/touch device interactions
 * and works seamlessly without affecting layout or positioning.
 *
 * **Why this exists:**
 * - Chakra's default Tooltip doesn't work properly on touch devices without `shouldWrapChildren`
 * - Even with `shouldWrapChildren`, tooltips don't toggle correctly on repeated taps
 * - Touch events don't map cleanly to hover events, causing tooltips to get "stuck" open
 * - Standard tooltip wrappers add extra DOM elements that can disrupt layout and positioning
 *
 * **How it works:**
 * - Uses `React.cloneElement` to add event handlers directly to the child element
 * - No wrapper elements added - completely transparent to layout and positioning
 * - Manually controls tooltip state via `onClick` for reliable tap toggling
 * - First tap opens the tooltip, second tap closes it, and so on
 * - Desktop hover behavior is preserved via `onMouseEnter`/`onMouseLeave`
 * - Preserves any existing event handlers on the child element
 *
 * **Usage:**
 * ```tsx
 * <McTooltip label="Your tooltip content" placement="top">
 *   <Button>Hover or tap me</Button>
 * </McTooltip>
 * ```
 *
 * **Important:**
 * - Children must be a single React element (not fragments or multiple children)
 * - The child element must be able to accept event handler props
 *
 * @param children - The element that triggers the tooltip (must be a single React element)
 * @param showOnDesktopOnly - If true, tooltip only shows on desktop devices
 * @param keepOpenOnDesktopClick - If true, clicking won't close the tooltip on desktop (default: false)
 * @param keepOpenOnMobileClick - If true, clicking won't close the tooltip on mobile (default: false)
 * @param props - All standard Chakra Tooltip props (label, placement, etc.)
 */
const McTooltip: React.FC<McTooltipProps> = ({
  children,
  showOnDesktopOnly = false,
  keepOpenOnDesktopClick = false,
  keepOpenOnMobileClick = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (_e: React.MouseEvent) => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Tooltip
      isOpen={
        props.isOpen ?? (isOpen && (showOnDesktopOnly ? isDesktopMode : true))
      }
      mx={1}
      openDelay={200}
      {...props}
    >
      {React.cloneElement(children, {
        onClick: (e: React.MouseEvent) => {
          if (children.props.onClick) {
            children.props.onClick(e);
          }
          if (isDesktopMode) {
            // On desktop: check keepOpenOnDesktopClick prop
            if (keepOpenOnDesktopClick) {
              // If keepOpenOnDesktopClick is true, clicking doesn't close the tooltip
              return;
            }
            // Only close if open, don't reopen on click
            if (isOpen) {
              e.stopPropagation();
              setIsOpen(false);
            }
          } else {
            // On mobile: check keepOpenOnMobileClick prop
            if (keepOpenOnMobileClick) {
              // If keepOpenOnMobileClick is true, clicking doesn't close the tooltip
              return;
            }
            // Toggle normally
            handleClick(e);
          }
        },
        onMouseEnter: (e: React.MouseEvent) => {
          if (children.props.onMouseEnter) {
            children.props.onMouseEnter(e);
          }
          if (!isOpen) {
            setIsOpen(true);
          }
        },
        onMouseLeave: (e: React.MouseEvent) => {
          if (children.props.onMouseLeave) {
            children.props.onMouseLeave(e);
          }
          setIsOpen(false);
        },
      })}
    </Tooltip>
  );
};

export default McTooltip;
