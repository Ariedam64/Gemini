import { TileRef } from './ref';

export const isTileRef = (tileRef: unknown): tileRef is TileRef => {
  return (
    typeof tileRef === 'object' &&
    tileRef !== null &&
    'type' in tileRef &&
    tileRef.type === 'tile'
  );
};
