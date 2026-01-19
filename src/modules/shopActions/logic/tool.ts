// src/modules/shopActions/logic/tool.ts
// Tool shop purchase logic

import { purchaseTool } from "../../../websocket/api";
import { Globals } from "../../../globals";
import type { PurchaseResult, BulkPurchaseResult } from "../types";

/**
 * Buy a single tool by ID
 */
export function buyTool(toolId: string): PurchaseResult {
  const result = purchaseTool(toolId);

  return {
    ok: result.ok,
    itemId: toolId,
    reason: result.ok ? undefined : result.reason,
  };
}

/**
 * Buy all available tools of a specific ID
 */
export function buyAllTools(toolId: string): BulkPurchaseResult {
  const shops = Globals.shops;
  const toolShop = shops.getShop("tool");
  const toolItem = toolShop.items.find((item) => item.id === toolId);

  if (!toolItem) {
    return {
      ok: false,
      itemId: toolId,
      totalPurchased: 0,
      errors: [`Tool not found in shop: ${toolId}`],
    };
  }

  const remaining = toolItem.remaining;
  const errors: string[] = [];
  let purchased = 0;

  for (let i = 0; i < remaining; i++) {
    const result = purchaseTool(toolId);
    if (result.ok) {
      purchased++;
    } else {
      errors.push(result.reason || `Failed to purchase tool ${i + 1}`);
    }
  }

  return {
    ok: purchased > 0,
    itemId: toolId,
    totalPurchased: purchased,
    errors,
  };
}
