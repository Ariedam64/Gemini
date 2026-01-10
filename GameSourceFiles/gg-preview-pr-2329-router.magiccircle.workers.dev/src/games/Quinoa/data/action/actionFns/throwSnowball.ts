import { SnowballSystem } from '@/games/Quinoa/components/QuinoaCanvas/systems/snowball/SnowballSystem';
import { sendQuinoaMessage } from '@/games/Quinoa/utils/sendQuinoaMessage';

/**
 * Throws a snowball optimistically (for immediate visual feedback) and sends
 * the action to the server. If on cooldown or the system is unavailable, the
 * throw is silently skipped.
 */
export function throwSnowball() {
  // Optimistically throw the snowball locally (checks cooldown internally)
  const system = SnowballSystem.getInstance();
  if (!system?.throwLocalSnowball()) {
    return;
  }

  // Send to server
  sendQuinoaMessage({
    type: 'ThrowSnowball',
  });
}
