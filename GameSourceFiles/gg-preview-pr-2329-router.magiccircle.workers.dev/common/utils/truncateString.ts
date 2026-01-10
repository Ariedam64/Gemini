/**
 * Truncate a string to at most `maxClusters` *grapheme clusters* (visible
 * characters) without splitting an emoji or other multi-code-unit sequence.
 *
 * Uses the built-in `Intl.Segmenter` with `granularity: 'grapheme'`, which is
 * available in all modern runtimes we target (browsers, Cloudflare Workers,
 * recent Node). No fallback is provided—if this code runs in an environment
 * without `Intl.Segmenter`, it will throw so we know to polyfill.
 */
export function truncateStringSafe(
  str: string,
  options: {
    maxClusters?: number;
    maxLength?: number;
  }
): string {
  const { maxClusters, maxLength } = options;

  if (
    (maxClusters !== undefined && maxClusters <= 0) ||
    (maxLength !== undefined && maxLength <= 0)
  ) {
    return '';
  }

  // If Intl.Segmenter is not available, we fail fast so the bundler/runtime
  // configuration can be fixed rather than silently mis-truncating.
  if (typeof Intl.Segmenter !== 'function') {
    throw new Error(
      'Intl.Segmenter is required for truncateStringSafe but is not available.'
    );
  }

  const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
  let clusterCount = 0;
  let endIndex = 0;

  for (const { segment, index } of segmenter.segment(str)) {
    const nextEndIndex = index + segment.length;
    if (
      (maxClusters !== undefined && clusterCount === maxClusters) ||
      (maxLength !== undefined && nextEndIndex > maxLength)
    ) {
      return str.slice(0, endIndex);
    }
    clusterCount += 1;
    endIndex = nextEndIndex;
  }

  // If the loop completes, the string is shorter than or equal to the limit.
  return str;
}
