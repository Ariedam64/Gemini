import { getDefaultStore } from 'jotai';
import { useEffect } from 'react';
import mapJson from '@/common/games/Quinoa/world/Tiled/map.json';
import { tileSizeAtom } from '@/Quinoa/atoms/mapAtoms';
import {
  calculateMinTileSize,
  TILE_SIZE_WORLD,
} from '@/Quinoa/components/QuinoaCanvas/sprite-utils';
import { useIsSmallScreen } from './useIsSmallScreen';

const { get, set } = getDefaultStore();

const ABSOLUTE_MIN_TILE_SIZE = 16;

/**
 * Configuration constants for zoom behavior.
 * Used by ZoomSystem (PixiJS) and other systems that need zoom limits.
 */
export const ZoomConfig = {
  get minTileSize() {
    if (typeof window === 'undefined') return ABSOLUTE_MIN_TILE_SIZE;

    const mapWidthPixels = mapJson.width * TILE_SIZE_WORLD;
    const mapHeightPixels = mapJson.height * TILE_SIZE_WORLD;

    return calculateMinTileSize(
      window.innerWidth,
      window.innerHeight,
      mapWidthPixels,
      mapHeightPixels,
      ABSOLUTE_MIN_TILE_SIZE
    );
  },
  defaultTileSizeLargeScreen: 60,
  defaultTileSizeSmallScreen: 40,
  maxTileSize: 384,
  keyboardStepMultiplier: 1.3,
  wheelStepMultiplier: 0.003,
  pinchStepMultiplier: 0.01,
};

/**
 * Sets the initial tile size based on screen size.
 * Actual zoom input handling (wheel, pinch) is done by ZoomSystem in PixiJS.
 */
export const useZoom = () => {
  const isSmallScreen = useIsSmallScreen();

  // Set initial tile size based on screen size
  useEffect(() => {
    const defaultTileSize = isSmallScreen
      ? ZoomConfig.defaultTileSizeSmallScreen
      : ZoomConfig.defaultTileSizeLargeScreen;
    const currentTileSize = get(tileSizeAtom);
    if (
      isSmallScreen &&
      currentTileSize < ZoomConfig.defaultTileSizeSmallScreen
    ) {
      // User is zoomed out more than small screen default, preserve their preference
      return;
    }
    if (
      !isSmallScreen &&
      currentTileSize > ZoomConfig.defaultTileSizeLargeScreen
    ) {
      // User is zoomed in more than large screen default, preserve their preference
      return;
    }
    set(tileSizeAtom, defaultTileSize);
  }, [isSmallScreen]);
};
