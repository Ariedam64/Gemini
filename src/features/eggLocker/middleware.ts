/**
 * EggLocker WebSocket middleware
 * Intercepts HatchEgg messages and blocks eggs matching the blocked list
 */

import { middleware } from '../../websocket/middlewares/base';
import { ClientToServerMessageType } from '../../websocket/protocol';
import { loadConfig } from './state';
import { getCurrentTile } from '../../globals/variables/currentTile';
import type { EggTileObject } from '../../atoms/types';

/**
 * HatchEgg middleware
 * Reads the egg under the cursor from currentTile at send time,
 * then allows or drops the message based on the blocked list.
 */
middleware(ClientToServerMessageType.HatchEgg, () => {
    const config = loadConfig();
    if (!config.enabled) {
        return true;
    }

    const tile = getCurrentTile().get();

    if (tile.object.type !== 'egg' || !tile.object.data) {
        return true;
    }

    const eggId = (tile.object.data as EggTileObject).eggId;

    if (config.blockedEggs.includes(eggId)) {
        console.log(`[EggLocker] Blocked hatch for ${eggId}`);
        return false;
    }

    console.log(`[EggLocker] Allowed hatch for ${eggId}`);
    return true;
});
