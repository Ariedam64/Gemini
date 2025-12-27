import { getDefaultStore } from 'jotai';
import {
  type CardinalDirection,
  type Direction,
  DirectionMap,
  type GridPosition,
  getGlobalTileIndexFromCoordinate,
  type QuinoaMap,
} from '@/common/games/Quinoa/world/map';
import { myUserSlotIdxAtom } from '@/Quinoa/atoms/myAtoms';
import {
  playerDirectionAtom,
  positionAtom,
} from '@/Quinoa/atoms/positionAtoms';
import { sendQuinoaMessage } from '../../../utils/sendQuinoaMessage';
import type { QuinoaFrameContext, QuinoaSystem } from '../interfaces';

const { get, set } = getDefaultStore();

/** Initial delay before continuous movement starts (ms) */
const INITIAL_MOVE_MS = 300;
/** Interval between continuous movement steps (ms) */
const MOVE_MS = 100;

/**
 * MovementSystem handles continuous player movement based on the current
 * direction state (from DirectionalInputSystem).
 *
 * Responsibilities:
 * - Applies continuous movement logic (initial delay + repeat interval)
 * - Checks collisions and map bounds
 * - Updates player position atom
 * - Sends position updates to server
 */
export class MovementSystem implements QuinoaSystem {
  public readonly name = 'movement';

  private lastMoveTime = 0;
  private isInitialMovement = true;
  private previousDirection: Direction = null;
  private map: QuinoaMap;

  constructor(map: QuinoaMap) {
    this.map = map;
  }

  /**
   * Type guard to ensure direction is a valid CardinalDirection
   */
  private isValidDirection(dir: Direction): dir is CardinalDirection {
    return dir === 'up' || dir === 'down' || dir === 'left' || dir === 'right';
  }

  /**
   * Checks if enough time has passed since the last timestamp.
   */
  private hasEnoughTimePassed(
    currentTime: number,
    lastTime: number,
    interval: number
  ): boolean {
    return currentTime - lastTime >= interval;
  }

  /**
   * Moves the player in the given direction if possible.
   * Checks map bounds and collision tiles.
   *
   * @returns true if the player actually moved
   */
  private movePlayer(
    direction: CardinalDirection,
    position: GridPosition
  ): boolean {
    const { x, y } = DirectionMap[direction];
    const newX = position.x + x;
    const newY = position.y + y;

    // Check map bounds
    if (
      newX < 0 ||
      newX >= this.map.cols ||
      newY < 0 ||
      newY >= this.map.rows
    ) {
      return false;
    }

    // Check collision
    const tileIndex = getGlobalTileIndexFromCoordinate(this.map, newX, newY);
    if (this.map.collisionTiles.has(tileIndex)) {
      return false;
    }

    const newPosition: GridPosition = { x: newX, y: newY };
    set(positionAtom, newPosition);
    sendQuinoaMessage({ type: 'PlayerPosition', position: newPosition });

    return true;
  }

  /**
   * Called every frame to handle continuous movement.
   */
  draw(context: QuinoaFrameContext): void {
    if (get(myUserSlotIdxAtom) === null) return;

    const currentDirection = get(playerDirectionAtom);

    // 1. Handle Direction Changes (Edge Triggering)
    // This replaces the previous atom subscription to ensure we use the
    // synchronized context.time and context.playerPosition.
    if (currentDirection !== this.previousDirection) {
      const wasMoving = this.isValidDirection(this.previousDirection);
      this.previousDirection = currentDirection;

      if (this.isValidDirection(currentDirection)) {
        // New valid direction pressed: Move immediately
        this.lastMoveTime = context.time;

        // If we were already moving (switching directions), we skip the initial delay
        // and go straight to the continuous movement interval.
        this.isInitialMovement = !wasMoving;

        this.movePlayer(currentDirection, context.playerPosition);
      } else {
        // Direction released or invalid: Reset state
        this.isInitialMovement = true;
      }
      return; // Processed the change this frame
    }

    // 2. Handle Continuous Movement
    // Only if we have a valid direction and it hasn't changed this frame
    if (this.isValidDirection(currentDirection)) {
      if (this.isInitialMovement) {
        if (
          this.hasEnoughTimePassed(
            context.time,
            this.lastMoveTime,
            INITIAL_MOVE_MS
          )
        ) {
          this.lastMoveTime = context.time;
          this.isInitialMovement = false;
          this.movePlayer(currentDirection, context.playerPosition);
        }
      } else if (
        this.hasEnoughTimePassed(context.time, this.lastMoveTime, MOVE_MS)
      ) {
        this.lastMoveTime = context.time;
        this.movePlayer(currentDirection, context.playerPosition);
      }
    }
  }

  destroy(): void {
    // No cleanup needed since we removed the subscription
  }
}
