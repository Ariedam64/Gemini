/**
 * Fetches a binary resource and returns its raw bytes as an `ArrayBuffer`.
 *
 * This is a low-level primitive that performs no caching. For coalesced,
 * concurrent-safe caching of binary assets, see `BinaryFileCache`.
 *
 * Behavior:
 * - Retries up to 3 attempts on failure with exponential backoff (100ms, 200ms).
 * - Throws an `Error` on non-2xx responses (includes HTTP status) or if all
 *   attempts fail; the final error includes the last failure's message.
 *
 * @param {string} src - Absolute or relative URL of the binary asset to fetch.
 * @returns {Promise<ArrayBuffer>} Promise resolving to the response body bytes.
 * @throws {Error} If the response is not OK or all retry attempts fail.
 * @see BinaryFileCache#getOrFetch for a cached/concurrent-safe variant.
 */
export async function fetchBinaryFile(src: string): Promise<ArrayBuffer> {
  const maxAttempts = 3;
  let lastError: Error;
  // console.debug(`fetchBinaryFile: Fetching ${src}`);

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const req = new Request(src);
      const res = await fetch(req);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const buffer = await res.arrayBuffer();
      if (buffer.byteLength === 0) {
        console.warn(`fetchBinaryFile: Empty buffer for ${src}`);
      }
      return buffer;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === maxAttempts) {
        throw new Error(
          `Failed to fetch ${src} after ${maxAttempts} attempts: ${lastError.message}`
        );
      }

      // Wait before retrying (exponential backoff: 100ms, 200ms)
      const delay = 100 * Math.pow(2, attempt - 1);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  // This should never be reached, but TypeScript requires it
  throw lastError!;
}
