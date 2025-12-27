/**
 * Returns the major, minor, and patch iOS version if on iOS, otherwise null.
 */
export function getIOSVersion(): [number, number, number] | null {
  if (typeof navigator === 'undefined') return null;
  const ua = navigator.userAgent;

  // Check if this is an iOS device
  if (!/(iPad|iPhone|iPod)/i.test(ua)) {
    return null;
  }

  // Try to get the version from the Version/ field first (e.g., Version/18.7.2)
  // This is more reliable for getting the full version including patch
  const versionMatch = ua.match(/Version\/(\d+)\.(\d+)(?:\.(\d+))?/i);
  if (versionMatch) {
    return [
      parseInt(versionMatch[1], 10),
      parseInt(versionMatch[2], 10),
      versionMatch[3] ? parseInt(versionMatch[3], 10) : 0,
    ];
  }

  // Fallback to OS field (e.g., OS 16_4_1 or OS 16_4)
  const osMatch = ua.match(/OS (\d+)_(\d+)(?:_(\d+))?/i);
  if (osMatch) {
    return [
      parseInt(osMatch[1], 10),
      parseInt(osMatch[2], 10),
      osMatch[3] ? parseInt(osMatch[3], 10) : 0,
    ];
  }

  return null;
}
