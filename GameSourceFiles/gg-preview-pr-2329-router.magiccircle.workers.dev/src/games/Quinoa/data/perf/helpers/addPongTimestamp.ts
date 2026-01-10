import { getDefaultStore } from 'jotai';
import { configAtom } from '@/config';
import { debugLogger } from '@/games/Quinoa/helpers/debugLogger';
import { pingTimestampsAtom } from '../atoms/pingTimestampsAtom';

const { get, set } = getDefaultStore();

export function addPongTimestamp(id: number) {
  const currentTimestamps = get(pingTimestampsAtom);
  const log = debugLogger(get(configAtom).perf_pingLogs);

  const next = new Map(currentTimestamps);
  const pingPong = next.get(id);

  if (!pingPong) {
    log('No ping found for ID: ', id);
    log('PING TIMESTAMPS: ', next);
    return;
  }

  next.set(id, { ...pingPong, pong: performance.now() });
  log('PONG ADDED: ', next);

  set(pingTimestampsAtom, next);
}
