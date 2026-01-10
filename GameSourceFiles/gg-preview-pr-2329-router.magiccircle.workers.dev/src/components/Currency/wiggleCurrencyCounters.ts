import { type AnimationPlaybackControlsWithThen, animate } from 'framer-motion';

const wiggleCounterAnimation = {
  scale: [1, 1.5, 1.45, 1.5, 1],
  translate: ['0px 0px', '-15px 15px', '-10px 10px', '-15px 15px', '0px 0px'],
  rotate: [0, 5, -5, 5, 0],
};

/**
 * Animates a currency counter widget with a wiggle effect
 * @param widgetId - The ID of the widget element to animate
 * @returns The animation control object or undefined if element not found
 */
function wiggleCurrencyCounter(
  widgetId: string
): AnimationPlaybackControlsWithThen | undefined {
  const element = document.getElementById(widgetId);
  if (!element) {
    console.warn(`${widgetId} widget not found`);
    return;
  }
  return animate(element, wiggleCounterAnimation);
}

export const wiggleBreadCounterWidget = ():
  | AnimationPlaybackControlsWithThen
  | undefined => wiggleCurrencyCounter('bread-counter-widget');

export const wiggleCreditsCounterWidget = ():
  | AnimationPlaybackControlsWithThen
  | undefined => wiggleCurrencyCounter('credits-counter-widget');
