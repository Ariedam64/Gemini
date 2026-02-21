/**
 * Shop Restock - Predictions Card
 * Rate-based layout: icon + name + shop pill | metrics subtitle | rate %
 */

import { Card } from "../../../components/Card/Card";
import { element } from "../../../styles/helpers";
import { MGShopRestock } from "../../../../features/shopRestock";
import { MGSprite } from "../../../../modules";
import type { ItemPrediction } from "../../../../features/shopRestock/types";
import { SHOP_CYCLE_INTERVALS } from "../../../../features/shopRestock/types";
import type { TrackedShopType } from "../../../../features/shopRestock";
import { EVENTS, FEATURE_KEYS } from "../../../../utils/storage";
import { getItemName, getRarity, getSpriteId } from "./itemMeta";

export interface PredictionsCardPart {
  root: HTMLElement;
  destroy(): void;
}

function formatRelative(ms: number | null): string {
  if (!ms) return "-";
  const diff = Date.now() - ms;
  if (diff < 0) return "just now";
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return `${day}d ago`;
}

function formatFrequency(rate: number | null, shopType: TrackedShopType): string {
  if (rate === null || rate <= 0) return "-";
  const interval = SHOP_CYCLE_INTERVALS[shopType];
  const expectedMs = interval / rate;

  if (rate >= 0.95) return "Every restock";

  const min = Math.round(expectedMs / 60000);
  if (min < 60) return `Every ~${min}m`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `Every ~${hr}h`;
  const day = Math.round(hr / 24);
  return `Every ~${day}d`;
}

function formatETA(estimatedNext: number | null): string {
  if (!estimatedNext) return "-";
  const diff = estimatedNext - Date.now();
  if (diff <= 0) return "now";

  const min = Math.ceil(diff / 60000);
  if (min < 60) return `~${min}m`;
  const hr = Math.ceil(min / 60);
  if (hr < 24) return `~${hr}h`;
  const day = Math.ceil(hr / 24);
  return `~${day}d`;
}

function formatAvgQty(qty: number | null): string {
  if (qty === null || qty <= 0) return "";
  if (qty >= 100) return `~${Math.round(qty)} avg`;
  if (qty >= 10) return `~${Math.round(qty)} avg`;
  if (Number.isInteger(qty)) return `~${qty} avg`;
  return `~${qty.toFixed(1)} avg`;
}

function ratePercent(rate: number | null): string {
  if (rate === null) return "-";
  const pct = rate * 100;

  // Determine max decimals needed
  let maxDecimals: number;
  if (pct >= 80) maxDecimals = 0;
  else if (pct >= 40) maxDecimals = 1;
  else if (pct >= 10) maxDecimals = 2;
  else if (pct >= 1) maxDecimals = 3;
  else maxDecimals = 4;

  // Format and trim trailing zeros
  const formatted = pct.toFixed(maxDecimals);
  return `${parseFloat(formatted)}%`;
}

function rateColorClass(rate: number | null): string {
  if (rate === null) return "restock-rate-low";
  const pct = rate * 100;
  if (pct >= 80) return "restock-rate-high";
  if (pct >= 40) return "restock-rate-mid";
  return "restock-rate-low";
}

function rateTooltip(pred: PredictionLike): string {
  const parts: string[] = [];

  // Add avg qty if available
  const avgQty = formatAvgQty(pred.averageQuantity);
  if (avgQty) parts.push(avgQty);

  // Add frequency
  parts.push(formatFrequency(pred.appearanceRate, pred.shopType));

  return parts.join("\n");
}

function etaColorClass(estimatedNext: number | null): string {
  if (!estimatedNext) return "";
  const diff = estimatedNext - Date.now();
  if (diff <= 0) return "restock-eta-now";

  const hours = diff / (60 * 60 * 1000);
  if (hours < 1) return "restock-eta-imminent"; // < 1h: green
  if (hours < 6) return "restock-eta-soon";     // 1-6h: yellow-green
  if (hours < 24) return "restock-eta-today";   // 6-24h: yellow

  const days = diff / (24 * 60 * 60 * 1000);
  if (days < 7) return "restock-eta-week";      // 1-7d: orange
  if (days < 14) return "restock-eta-fortnight"; // 7-14d: light red
  return "restock-eta-far";                     // > 14d: red
}

const SHOP_PILL_LABELS: Record<TrackedShopType, string> = {
  seed: "S",
  egg: "E",
  decor: "D",
};

type PredictionLike = ItemPrediction & { isEmpty?: boolean };

function predictionRow(pred: PredictionLike): HTMLElement {
  const row = element("div", { className: "restock-pred-row restock-row-hover" });

  // === Left side: icon + text block ===
  const left = element("div", { className: "restock-pred-left" });

  const iconWrap = element("div", { className: `restock-icon-wrap rarity-${getRarity(pred.itemId, pred.shopType) ?? 'common'}` });
  const spriteId = getSpriteId(pred.itemId, pred.shopType);
  if (spriteId) {
    try {
      const canvas = MGSprite.toCanvas(spriteId);
      if (canvas) {
        canvas.className = "restock-item-sprite";
        iconWrap.appendChild(canvas);
      }
    } catch (e) { /* ignore */ }
  }

  const textBlock = element("div", { className: "restock-pred-text" });

  // Line 1: name + shop pill
  const line1 = element("div", { className: "restock-pred-line1" });
  const name = element("span", {
    className: `restock-item-name restock-text-${getRarity(pred.itemId, pred.shopType) ?? 'common'}`,
  }, getItemName(pred.itemId, pred.shopType));

  line1.appendChild(name);

  // Line 2: metrics subtitle
  const line2 = element("div", { className: "restock-pred-line2" });

  if (pred.isEmpty) {
    line2.textContent = "Not enough data";
    line2.style.opacity = "0.5";
  } else {
    // Line2: just "Seen Xm ago"
    line2.textContent = `Seen ${formatRelative(pred.lastSeen)}`;
  }

  textBlock.append(line1, line2);
  left.append(iconWrap, textBlock);

  // === Right side: dual hero metrics (ETA | Rate) ===
  const right = element("div", { className: "restock-pred-metrics" });

  if (pred.isEmpty) {
    const placeholder = element("div", { className: "restock-pred-rate restock-rate-low" }, "--");
    right.appendChild(placeholder);
  } else {
    // ETA metric
    const etaWrap = element("div", { className: "restock-pred-metric-wrap" });
    const etaValue = element("div", {
      className: `restock-pred-metric-value restock-eta-value ${etaColorClass(pred.estimatedNextTimestamp)}`,
    }, formatETA(pred.estimatedNextTimestamp));
    const etaLabel = element("div", { className: "restock-pred-metric-label" }, "next");
    etaWrap.append(etaValue, etaLabel);

    // Rate metric
    const rateWrap = element("div", { className: "restock-pred-metric-wrap" });
    rateWrap.dataset.tooltip = rateTooltip(pred); // Store tooltip content

    const rateValue = element("div", {
      className: `restock-pred-metric-value ${rateColorClass(pred.appearanceRate)}`,
    }, ratePercent(pred.appearanceRate));
    const rateLabel = element("div", { className: "restock-pred-metric-label" }, "rate");
    rateWrap.append(rateValue, rateLabel);

    right.append(etaWrap, rateWrap);
  }

  row.append(left, right);

  row.addEventListener("click", (e) => {
    e.stopPropagation();
    MGShopRestock.toggleTrackedItem(pred.shopType, pred.itemId);
  });

  return row;
}

export function createPredictionsCard(): PredictionsCardPart {
  let refreshTimer: number | null = null;
  const content = element("div", { className: "restock-pred-list" });

  function render(): void {
    content.innerHTML = "";
    const tracked = MGShopRestock.getTrackedItems();

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     ('ontouchstart' in window) ||
                     (navigator.maxTouchPoints > 0);
    const action = isMobile ? "Tap" : "Click";

    if (!tracked.length) {
      const empty = element("div", { style: "padding: 20px; text-align: center; opacity: 0.6; font-size: 13px; line-height: 1.5;" });
      const mainText = element("div", {}, `${action} an item in the History to show the next restock estimation`);
      empty.appendChild(mainText);
      content.appendChild(empty);
      return;
    }

    const items: PredictionLike[] = tracked.map(item => {
      const pred = MGShopRestock.predictItem(item.shopType, item.itemId);
      if (pred) return pred as PredictionLike;
      return {
        itemId: item.itemId,
        shopType: item.shopType,
        estimatedNextTimestamp: null,
        averageIntervalMs: null,
        totalDataPoints: 0,
        lastSeen: null,
        appearanceRate: null,
        averageQuantity: null,
        isEmpty: true,
      };
    });

    // Sort by appearance rate descending (most reliable first), empties at bottom
    items.sort((a, b) => {
      if (a.isEmpty && !b.isEmpty) return 1;
      if (!a.isEmpty && b.isEmpty) return -1;
      const rA = a.appearanceRate ?? -1;
      const rB = b.appearanceRate ?? -1;
      return rB - rA;
    });

    for (const item of items) {
      content.appendChild(predictionRow(item));
    }

    // Add hint at bottom when there are items
    const hint = element("div", {
      style: "padding: 8px 12px; font-size: 11px; opacity: 0.5; text-align: left;"
    }, `${action} to deselect the item in the Active Predictions`);
    content.appendChild(hint);
  }

  render();
  refreshTimer = window.setInterval(render, 30000);

  window.addEventListener(EVENTS.SHOP_RESTOCK_TRACKED_CHANGED, render as EventListener);
  window.addEventListener(EVENTS.SHOP_RESTOCK_TRACKED, render as EventListener);
  window.addEventListener(EVENTS.SHOP_RESTOCK_HISTORY_UPDATED, render as EventListener);
  const handleStorage = (event: Event) => {
    const detail = (event as CustomEvent<{ key?: string }>).detail;
    if (detail?.key === FEATURE_KEYS.SHOP_RESTOCK) {
      render();
    }
  };
  window.addEventListener(EVENTS.STORAGE_CHANGE, handleStorage as EventListener);

  const root = Card(
    {
      id: "restock-predictions",
      title: "Active Predictions",
      variant: "soft",
      padding: "none",
      expandable: true,
      defaultExpanded: true,
      stateKey: "predictions",
    },
    content
  );
  root.classList.add("restock-card");

  return {
    root,
    destroy() {
      if (refreshTimer !== null) window.clearInterval(refreshTimer);
      refreshTimer = null;
      window.removeEventListener(EVENTS.SHOP_RESTOCK_TRACKED_CHANGED, render as EventListener);
      window.removeEventListener(EVENTS.SHOP_RESTOCK_TRACKED, render as EventListener);
      window.removeEventListener(EVENTS.SHOP_RESTOCK_HISTORY_UPDATED, render as EventListener);
      window.removeEventListener(EVENTS.STORAGE_CHANGE, handleStorage as EventListener);
    },
  };
}
