/**
 * Formats milliseconds remaining into a human-readable time string
 * @param msRemaining - The number of milliseconds remaining
 * @returns A formatted string like "2h 15m 30s", "45m 12s", "30s", or "<1s"
 */
export function formatTime(msRemaining: number): string {
  const totalSeconds = msRemaining / 1000;
  if (totalSeconds < 0) {
    return '0s';
  }
  const hours = totalSeconds / 3600;
  const minutes = (totalSeconds % 3600) / 60;
  const seconds = totalSeconds % 60;

  const formattedHours = Math.floor(hours);
  const formattedMinutes = Math.floor(minutes);
  const formattedSeconds = Math.floor(seconds);

  if (formattedHours > 0) {
    const parts = [`${formattedHours}h`];
    if (formattedMinutes > 0) parts.push(`${formattedMinutes}m`);
    if (formattedSeconds > 0) parts.push(`${formattedSeconds}s`);
    return parts.join(' ');
  } else if (formattedMinutes > 0) {
    if (formattedSeconds > 0) {
      return `${formattedMinutes}m ${formattedSeconds}s`;
    }
    return `${formattedMinutes}m`;
  } else if (formattedSeconds > 0) {
    return `${formattedSeconds}s`;
  } else if (seconds !== 0) {
    return '<1s';
  }
  return '0s';
}
