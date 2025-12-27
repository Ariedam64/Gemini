import { atom, useAtomValue } from 'jotai';
import { type Config, defaults } from '@/common/config/config';

/**
 * An atom that holds the config data.
 * This is initilized with the default config, but can be updated by the server
 * with a Config message.
 */
export const configAtom = atom<Config>(defaults);

export function useConfig(): Config {
  const config = useAtomValue(configAtom);
  return config;
}
