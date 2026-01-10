import { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';

/**
 * Represents the dimensions of a window or viewport
 */
interface Size {
  /** The width in pixels */
  width: number;
  /** The height in pixels */
  height: number;
}

/**
 * Gets the current window dimensions
 * @returns The current window width and height
 */
function getWindowSize(): Size {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * Hook that tracks and returns the window dimensions, with debounced updates on resize
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { width, height } = useWindowSize();
 *   return <div>Window size: {width} x {height}</div>;
 * }
 * ```
 *
 * @param options - Configuration options
 * @param options.debounceMillis - Debounce delay in milliseconds for resize updates (default: 250ms)
 * @returns Current window dimensions that update when the window is resized
 */
function useWindowSize({
  debounceMillis = 250,
}: { debounceMillis?: number } = {}): Size {
  const [windowSize, setWindowSize] = useState<Size>(getWindowSize());

  const debouncedHandleResize = useMemo(
    () => debounce(() => setWindowSize(getWindowSize()), debounceMillis),
    [debounceMillis]
  );

  useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);
    return () => {
      debouncedHandleResize.cancel();
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [debouncedHandleResize]);

  return windowSize;
}

export default useWindowSize;
