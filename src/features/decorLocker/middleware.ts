/**
 * DecorLocker WebSocket middleware
 * Intercepts PickupDecor messages and blocks decors matching the blocked list
 */

import { middleware } from '../../websocket/middlewares/base';
import { ClientToServerMessageType } from '../../websocket/protocol';
import { loadConfig } from './state';
import { getCurrentTile } from '../../globals/variables/currentTile';
import type { DecorTileObject } from '../../atoms/types';

/**
 * PickupDecor middleware
 * Reads the decor under the cursor from currentTile at send time,
 * then allows or drops the message based on the blocked list.
 */
middleware(ClientToServerMessageType.PickupDecor, () => {
    const config = loadConfig();
    if (!config.enabled) {
        return true;
    }

    const tile = getCurrentTile().get();

    // Safety: if no object or not a decor, allow pickup
    if (!tile.object || tile.object.type !== 'decor' || !tile.object.data) {
        return true;
    }

    const decorId = (tile.object.data as DecorTileObject).decorId;

    if (config.blockedDecors.includes(decorId)) {
        console.log(`[DecorLocker] Blocked pickup for ${decorId}`);
        return false;
    }

    console.log(`[DecorLocker] Allowed pickup for ${decorId}`);
    return true;
});
