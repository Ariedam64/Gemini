/**
 * Custom Sounds - Validation
 *
 * Validates custom sounds before adding to the library.
 */

import { LIMITS, SoundLimitError, SoundSizeError } from './types';

/**
 * Estimate the size of a base64-encoded data URL in bytes
 */
function estimateBase64Size(dataUrl: string): number {
  // Data URL format: data:audio/mp3;base64,<base64data>
  const base64Prefix = 'data:';
  if (!dataUrl.startsWith(base64Prefix)) {
    return 0; // Not a data URL, assume external URL (no size check)
  }

  const commaIndex = dataUrl.indexOf(',');
  if (commaIndex === -1) {
    return 0;
  }

  const base64Data = dataUrl.slice(commaIndex + 1);

  // Base64 encoding adds ~33% overhead: 3 bytes → 4 chars
  // So decoded size ≈ (base64 length * 3) / 4
  const decodedSize = (base64Data.length * 3) / 4;

  return Math.round(decodedSize);
}

/**
 * Extract MIME type from source (URL or data URL)
 */
function extractMimeType(source: string): string | null {
  // Data URL format: data:audio/mp3;base64,<data>
  if (source.startsWith('data:')) {
    const match = source.match(/^data:([^;,]+)/);
    return match ? match[1] : null;
  }

  // Try to infer from file extension
  const extensionMap: Record<string, string> = {
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav',
    '.ogg': 'audio/ogg',
  };

  for (const [ext, mime] of Object.entries(extensionMap)) {
    if (source.toLowerCase().endsWith(ext)) {
      return mime;
    }
  }

  return null;
}

/**
 * Validate sound source (URL or data URL)
 *
 * @throws {SoundSizeError} If data URL exceeds size limit
 */
export function validateSource(source: string): void {
  if (!source || !source.trim()) {
    throw new Error('Sound source cannot be empty');
  }

  // Check size for data URLs (base64)
  const size = estimateBase64Size(source);
  if (size > 0 && size > LIMITS.MAX_SIZE_BYTES) {
    throw new SoundSizeError(size);
  }

  // Note: We don't strictly validate MIME type here because:
  // - External URLs may not have extensions
  // - Browser will handle invalid audio gracefully on playback
  // - User can test the sound before saving
}

/**
 * Validate sound name
 */
export function validateName(name: string): void {
  if (!name || !name.trim()) {
    throw new Error('Sound name cannot be empty');
  }

  if (name.length > 100) {
    throw new Error('Sound name too long (max 100 characters)');
  }
}

/**
 * Check if library has reached the maximum number of sounds
 *
 * @throws {SoundLimitError} If limit is reached
 */
export function checkSoundLimit(currentCount: number): void {
  if (currentCount >= LIMITS.MAX_SOUNDS) {
    throw new SoundLimitError();
  }
}
