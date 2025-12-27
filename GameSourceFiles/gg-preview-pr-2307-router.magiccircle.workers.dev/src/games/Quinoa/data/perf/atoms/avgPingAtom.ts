import { atom } from 'jotai';
import { configAtom } from '@/config';
import { debugLogger } from '@/games/Quinoa/helpers/debugLogger';
import { createThrottledCache } from '../helpers/createThrottledComputation';
import { pingTimestampsAtom } from './pingTimestampsAtom';

// Create a throttled cache that updates at most once per second
const getThrottledPing = createThrottledCache<number>(1000);

/**
 * Atom that computes the average ping (in ms) from the stored ping-pong pairs.
 * Only considers pairs where both ping and pong are present.
 * Updates are throttled to once per second to reduce UI re-renders.
 */
export const avgPingAtom = atom((get) => {
  const currentTimestamps = get(pingTimestampsAtom);
  const log = debugLogger(get(configAtom).perf_pingLogs);

  return getThrottledPing(() => {
    const pingPongs = Array.from(currentTimestamps.values()).filter(
      (pingPong) => pingPong.pong !== null
    );
    if (pingPongs.length === 0) {
      return 0;
    }
    let totalPing = 0;
    pingPongs.forEach((pingPong, idx) => {
      const diff = (pingPong.pong as number) - pingPong.ping;
      log(`Ping diff [${idx}]:`, diff);
      totalPing += diff;
    });
    const averagePing = totalPing / pingPongs.length;
    log('AVERAGE PING: ', averagePing);
    return Math.round(averagePing);
  });
});
