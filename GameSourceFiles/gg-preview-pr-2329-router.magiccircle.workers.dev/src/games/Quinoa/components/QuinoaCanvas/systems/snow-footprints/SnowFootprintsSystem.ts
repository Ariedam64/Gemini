import type * as tiled from '@kayahr/tiled';
import type { Operation } from 'fast-json-patch';
import { getDefaultStore } from 'jotai';
import { Container, Sprite, Texture } from 'pixi.js';
import {
  FOOTPRINT_FADE_OUT_DURATION_MS,
  FOOTPRINT_FULL_ALPHA_DURATION_MS,
  FOOTPRINT_TEXTURE_NAMES,
} from '@/common/games/Quinoa/systems/footprints/footprintsDex';
import { getFootprintFadeProgress } from '@/common/games/Quinoa/systems/footprints/utils';
import { WeatherId } from '@/common/games/Quinoa/systems/weather/WeatherId';
import type { QuinoaData } from '@/common/games/Quinoa/types';
import {
  getTileIndexSet,
  isPresentOnMapLayer,
  tileIndexToGridPosition,
  tileIndexToPixelPosition,
  tileSize,
} from '@/common/games/Quinoa/world/map';
import type { RoomData } from '@/common/games/Room/types';
import type { IState } from '@/common/types/state';
import RoomConnection from '@/connection/RoomConnection';
import { quinoaDataAtom } from '@/Quinoa/atoms/baseAtoms';
import { PatchRouter } from '@/utils/patchRouter';
import type { QuinoaFrameContext, QuinoaSystem } from '../../interfaces';

const { get } = getDefaultStore();

export class SnowFootprintsSystem implements QuinoaSystem {
  public readonly name = 'SnowFootprints';

  private parentContainer: Container;
  private container: Container;

  private router = new PatchRouter<QuinoaData>();
  private unsubscribePatches: (() => void) | null = null;
  private unsubscribeWelcome: (() => void) | null = null;

  private indentTileIndexSet = getTileIndexSet('SnowFootprints_Indent');
  private outdentTileIndexSet = getTileIndexSet('SnowFootprints_Outdent');

  private tileIndexToFootprintSpriteMap: Map<number, Sprite> = new Map();

  private textures: Texture[] = FOOTPRINT_TEXTURE_NAMES.map((textureName) =>
    Texture.from(textureName)
  );

  constructor(_mapData: tiled.Map, parentContainer: Container) {
    this.parentContainer = parentContainer;
    this.container = new Container({ label: this.name });
    this.parentContainer.addChild(this.container);

    // Initialize sprites from initial quinoa data
    const quinoaData = get(quinoaDataAtom);
    for (const tileIndex in quinoaData.steppedTiles) {
      this.setSprite(Number(tileIndex), quinoaData);
    }

    // Handle initial full state from Welcome message
    this.router.onWelcome((quinoaData) => {
      for (const tileIndex in quinoaData.steppedTiles) {
        this.setSprite(Number(tileIndex), quinoaData);
      }
    });

    // Handle incremental patch updates
    this.router.on(
      'child/data/steppedTiles/:tileIndex',
      { exact: false },
      ({ tileIndex }, quinoaData) => {
        this.setSprite(Number(tileIndex), quinoaData);
      }
    );

    // Subscribe to Welcome messages
    this.unsubscribeWelcome = RoomConnection.getInstance().subscribeToWelcome(
      this.onWelcome
    );

    // Subscribe to patches
    const subscription = RoomConnection.getInstance().subscribeToPatches(
      this.onPatches
    );
    this.unsubscribePatches = subscription.unsubscribe;
  }

  public patch(_context: QuinoaFrameContext): void {
    const quinoaData = get(quinoaDataAtom);
    const weather = quinoaData.weather;

    const isSnowing = weather === WeatherId.Frost;
    const isRaining = weather === WeatherId.Rain;
    if (!isSnowing && !isRaining) {
      return;
    }

    const now = _context.serverTime;

    // Modulo to the most recent five minute increment
    // const weatherStartTimestamp = now - (now % (5 * 60 * 1000));

    for (const [tileIndex, { timestamp }] of Object.entries(
      quinoaData.steppedTiles
    )) {
      const tileIdx = Number(tileIndex);
      const sprite = this.tileIndexToFootprintSpriteMap.get(tileIdx);

      if (!sprite) continue;
      if (!sprite.visible) continue;

      const progress = getFootprintFadeProgress(
        quinoaData,
        tileIdx,
        now,
        timestamp
      );

      sprite.alpha = 1 - progress;
    }
  }

  private setSprite(tileIndex: number, quinoaData: QuinoaData): Sprite | null {
    const stepped = quinoaData.steppedTiles[tileIndex];
    if (!stepped) {
      return null;
    }

    let sprite = this.tileIndexToFootprintSpriteMap.get(tileIndex);

    if (!sprite) {
      const isIndent = this.indentTileIndexSet.has(tileIndex);
      const isOutdent = this.outdentTileIndexSet.has(tileIndex);

      if (!isIndent && !isOutdent) {
        return null;
      }

      sprite = new Sprite();
      const gridPosition = tileIndexToGridPosition(tileIndex);

      const xEven = gridPosition.x % 2 === 0;
      const yEven = gridPosition.y % 2 === 0;

      const scaleX = xEven === yEven ? 1 : -1;
      const scaleY = isOutdent ? -1 : 1;

      const pixelPosition = tileIndexToPixelPosition(tileIndex);
      const halfTileSize = tileSize() / 2;

      sprite.position.set(
        pixelPosition.x + halfTileSize,
        pixelPosition.y + halfTileSize
      );
      sprite.anchor.set(0.5, 0.5);
      sprite.scale.set(scaleX, scaleY);

      this.container.addChild(sprite);
      this.tileIndexToFootprintSpriteMap.set(tileIndex, sprite);
    }

    sprite.texture = this.getSnowFootprintTexture(stepped.stepCount);
    sprite.alpha = 1;
    sprite.visible = true;

    return sprite;
  }

  private getSnowFootprintTexture(stepCount: number): Texture {
    const textureIndex = Math.min(stepCount, this.textures.length) - 1;
    const texture = this.textures[textureIndex];
    if (!texture) {
      return this.textures[0];
    }
    return texture;
  }

  private onWelcome = (state: IState<RoomData>): void => {
    if (state.child?.scope !== 'Quinoa') {
      return;
    }
    const quinoaData = state.child.data as QuinoaData;
    this.router.processWelcome(quinoaData);
  };

  private onPatches = (
    patches: Operation[],
    newState: IState<RoomData>
  ): void => {
    if (newState.child?.scope !== 'Quinoa') {
      return;
    }
    const quinoaData = newState.child.data as QuinoaData;
    this.router.process(patches, quinoaData);
  };

  destroy(): void {
    this.unsubscribePatches?.();
    this.unsubscribeWelcome?.();
    this.parentContainer.removeChild(this.container);
    this.container.destroy({ children: true });
  }
}
