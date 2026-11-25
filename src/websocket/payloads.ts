// src/websocket/payloads.ts
// Pure builders for outgoing message payloads (no send, no window)

export type CropCleanserPayload = {
  scope: "Quinoa";
  tileObjectIdx: number;
  growSlotIdx: number;
  toolId?: string;
};

/**
 * Payload of the CropCleanser message.
 *
 * The game sends the cleanser's `toolId` (e.g. `CropCleanser`, `HydroCleanser`,
 * `LunarCleanser`): all three go through the same action and the server tells
 * them apart by this id. Without `toolId`, the key is left out.
 */
export function cropCleanserPayload(
  tileObjectIdx: number,
  growSlotIdx: number,
  toolId?: string
): CropCleanserPayload {
  return {
    scope: "Quinoa",
    tileObjectIdx,
    growSlotIdx,
    ...(toolId !== undefined && { toolId }),
  };
}
