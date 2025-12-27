export async function delay(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

/**
 * Returns a function that delays execution by a given number of seconds, scaled
 * by the provided multiplier.
 *
 * @param {number} scaleMultiplier - The multiplier to scale the delay.
 * @returns {function} - A function that takes a number of seconds and returns a
 * Promise that resolves after the scaled delay.
 */
export function scaledDelay(
  scaleMultiplier: number = 1
): (seconds: number) => Promise<void> {
  return async function (seconds: number): Promise<void> {
    await delay(seconds * scaleMultiplier);
  };
}
