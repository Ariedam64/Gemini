export type WebpFeature = 'lossy' | 'lossless' | 'alpha' | 'animation';

/**
 * Detects browser support for a specific WebP feature
 * Based on: https://stackoverflow.com/questions/5573096/detecting-webp-support
 *
 * @param feature - 'lossy', 'lossless', 'alpha', or 'animation'
 * @returns Promise resolving to true if supported, false otherwise.
 */
function checkWebpFeatureAsync(feature: WebpFeature): Promise<boolean> {
  return new Promise((resolve) => {
    const kTestImages = {
      lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
      lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
      alpha:
        'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
      animation:
        'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
    };
    const img = new Image();
    img.onload = () => {
      const result = img.width > 0 && img.height > 0;
      resolve(result);
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = 'data:image/webp;base64,' + kTestImages[feature];
  });
}

/**
 * Checks if WebP image format (lossy and alpha) is supported by the browser.
 *
 * @returns {Promise<boolean>} Resolves to true if WebP is supported, false otherwise.
 */
export async function probeWebpSupportAsync(
  features: WebpFeature[]
): Promise<boolean> {
  try {
    const results = await Promise.all(features.map(checkWebpFeatureAsync));

    const isSupported = results.every((result) => result);
    if (!isSupported) {
      console.warn(`WebP support check failed: ${results.join(', ')}`);
    }
    return isSupported;
  } catch (e) {
    console.error('Error checking WebP support', e);
    return false;
  }
}
