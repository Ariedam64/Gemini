/**
 * HarvestLocker WebSocket middleware
 * Intercepts HarvestCrop messages and blocks locked slots
 */

import { middleware } from '../../websocket/middlewares/base';
import { ClientToServerMessageType } from '../../websocket/protocol';
import { loadConfig } from './state';
import { isSlotLocked } from './logic/core';

/**
 * HarvestCrop middleware
 * Blocks harvest attempts for locked slots
 */
middleware(ClientToServerMessageType.HarvestCrop, (message, ctx) => {
    // Check if feature is enabled
    const config = loadConfig();
    if (!config.enabled) {
        return true; // Pass through if disabled
    }

    // Extract slot and slotsIndex from message
    // Message format: { type: "HarvestCrop", slot: 173, slotsIndex: 5, ... }
    const msg = message as { slot?: string | number; slotsIndex?: number };

    // Normalize slot to string
    const slot = msg.slot !== undefined ? String(msg.slot) : undefined;
    const slotsIndex = msg.slotsIndex;

    if (slot !== undefined && typeof slotsIndex === 'number') {
        if (isSlotLocked(slot, slotsIndex)) {
            console.log(`[HarvestLocker] Blocked harvest for slot ${slot}-${slotsIndex}`);
            return false; // Block the message
        }
    }

    return true; // Allow the message
});
