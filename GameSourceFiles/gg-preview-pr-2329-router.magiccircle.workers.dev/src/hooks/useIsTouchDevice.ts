import { useEffect, useState } from 'react';

/**
 * Hook that detects if the current device supports touch input using multiple methods:
 * 1. Media queries (primary method)
 * 2. Touch event detection
 *
 * This provides more reliable detection across different devices and browsers.
 *
 * @returns {boolean} True if the device supports touch input, false otherwise
 */
export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Method 1: Media query detection
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');

    // Method 2: Touch event detection
    const hasTouchEvents =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const checkTouchDevice = () => {
      const mediaQueryResult = touchQuery.matches;
      const touchEventResult = hasTouchEvents;

      // If either media query or touch events indicate touch support, consider it a touch device
      // If neither method works, fall back to user agent detection
      const isTouch = mediaQueryResult || touchEventResult;
      setIsTouchDevice(isTouch);
    };

    checkTouchDevice();

    touchQuery.addEventListener('change', checkTouchDevice);

    return () => {
      touchQuery.removeEventListener('change', checkTouchDevice);
    };
  }, []);

  return isTouchDevice;
}
