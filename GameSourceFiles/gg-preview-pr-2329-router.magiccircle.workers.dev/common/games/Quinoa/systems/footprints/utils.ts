// import quinoaMapJson from '../../world/Tiled/map.json';
import type { QuinoaData } from '../../types';
import { isPresentOnMapLayer } from '../../world/map/utils';
import { WeatherId } from '../weather/WeatherId';
import {
  FOOTPRINT_FADE_OUT_DURATION_MS,
  FOOTPRINT_FULL_ALPHA_DURATION_MS,
} from './footprintsDex';

export function getFootprintFadeProgress(
  quinoaData: QuinoaData,
  tileIndex: number,
  now: number,
  footprintTimestamp: number
): number {
  const isSnowing = quinoaData.weather === WeatherId.Frost;
  const isRaining = quinoaData.weather === WeatherId.Rain;
  const isFootprintInSnow = isPresentOnMapLayer(
    tileIndex,
    'SnowFootprints_Indent'
  );
  const isFootprintOnPath = isPresentOnMapLayer(
    tileIndex,
    'SnowFootprints_Outdent'
  );

  if (isSnowing && isFootprintInSnow) {
    return innerGetFootprintFadeProgress(now, footprintTimestamp);
  }
  if (isRaining && isFootprintOnPath) {
    return innerGetFootprintFadeProgress(now, footprintTimestamp);
  }

  return 0;
}

function innerGetFootprintFadeProgress(
  now: number,
  footprintTimestamp: number
): number {
  // Assumes weather happens in 5 minute increments.
  const weatherStartTimestamp = now - (now % (5 * 60 * 1000));

  const startFadeTimestamp =
    Math.max(footprintTimestamp, weatherStartTimestamp) +
    FOOTPRINT_FULL_ALPHA_DURATION_MS;

  const endFadeTimestamp = startFadeTimestamp + FOOTPRINT_FADE_OUT_DURATION_MS;

  const progress =
    (now - startFadeTimestamp) / (endFadeTimestamp - startFadeTimestamp);

  const clampedProgress = Math.min(Math.max(progress, 0), 1);

  return clampedProgress;
}
