export function redactValue(value, maxChars) {
  const raw = safeToString(value);
  const clipped = typeof maxChars === 'number' && maxChars > 0 ? raw.slice(0, maxChars) : raw;
  return maskSecrets(clipped);
}

function safeToString(value) {
  try {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return String(value);
  } catch {
    return '[unstringifiable]';
  }
}

function maskSecrets(text) {
  if (!text) return text;
  let t = text;

  // JWT-ish: three base64url-ish chunks separated by dots.
  t = t.replace(/\b([A-Za-z0-9_-]{8,})\.([A-Za-z0-9_-]{8,})\.([A-Za-z0-9_-]{8,})\b/g, '[REDACTED:JWT]');

  // Long random tokens (bearer/api keys/etc.)
  t = t.replace(/\b[A-Za-z0-9+/_=-]{32,}\b/g, '[REDACTED:TOKEN]');

  // "Authorization: Bearer ..."
  t = t.replace(/(bearer\s+)[A-Za-z0-9+/_=-]{16,}/gi, '$1[REDACTED]');

  return t;
}

