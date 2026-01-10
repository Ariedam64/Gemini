import FallbackStrokedText from './FallbackStrokedText';
import FastStrokedText from './FastStrokedText';
import { StrokedTextProps } from './StrokedTextProps';

type UserAgentData = {
  brands: { brand: string; version: string }[];
};

// https://developer.mozilla.org/en-US/docs/Web/CSS/paint-order#browser_compatibility
const MIN_CHROMIUM_VERSION_FOR_PAINT_ORDER_FOR_TEXT = 123;

const doesSupportPaintOrderForText =
  'userAgentData' in navigator &&
  Boolean(
    (navigator.userAgentData as UserAgentData).brands.find(
      ({ brand, version }) =>
        brand === 'Chromium' &&
        Number(version) >= MIN_CHROMIUM_VERSION_FOR_PAINT_ORDER_FOR_TEXT
    )
  );

/**
 * A high-performance text component that renders text with a customizable stroke (outline) and shadow.
 *
 * This component automatically detects browser capabilities and switches between two rendering strategies:
 * - **FastStrokedText**: Uses modern CSS `paint-order` property for optimal
 *   performance on supported browsers (for Chromium-based browsers, requires
 *   version 123 or higher)
 * - **FallbackStrokedText**: Uses SVG-based rendering for broader browser compatibility
 *
 * Note: the fallback SVG-based rendering is necessary because the `paint-order`
 * property is not supported by all browsers. Hopefully in a year or two we can
 * simply remove the fallback and use the modern approach. Note also that there
 * might be slight sizing and rendering differences between the two approaches,
 * but if you're using an older browser... sucks to suck.
 */
const StrokedText: React.FC<StrokedTextProps> = ({ children, ...rest }) => {
  if (!doesSupportPaintOrderForText) {
    return <FallbackStrokedText {...rest} children={children} />;
  }
  return <FastStrokedText {...rest} children={children} />;
};

export default StrokedText;
