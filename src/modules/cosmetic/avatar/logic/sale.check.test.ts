// src/modules/cosmetic/avatar/logic/sale.check.test.ts
/**
 * BR-21: the avatar catalog joins `/data/avatar-cosmetics` (sale metadata),
 * puts the Spooky Shop novelties first and describes their price and end date.
 *
 * Pure logic only: hand-written `CosmeticInfo` and `meta`, no network, no DOM.
 *
 * `./sale` is loaded through `import.meta.glob` rather than a static import, so
 * that while the module does not exist the check fails on an assertion (the
 * behaviour is missing) instead of a resolution error, and typecheck stays green.
 */

import { describe, expect, it } from "vitest";
import type { CosmeticInfo } from "../types";

interface SaleCost {
  currency: string;
  amount: number;
}

/** A catalog item once enriched with its sale metadata. */
type SaleItem = CosmeticInfo & {
  cost?: SaleCost;
  expiryDate?: string;
  newAtSpookyShop?: boolean;
  soldAtSpookyShop?: boolean;
};

interface SaleMeta {
  id?: string;
  filename?: string;
  cost?: SaleCost;
  expiryDate?: string;
  newAtSpookyShop?: boolean;
  soldAtSpookyShop?: boolean;
}

/** The public surface `logic/sale.ts` must expose. */
interface SaleModule {
  enrichWithSaleData(
    items: CosmeticInfo[],
    meta: Record<string, SaleMeta> | null | undefined
  ): SaleItem[];
  sortNewSpookyFirst(items: SaleItem[]): SaleItem[];
  describeSale(item: SaleItem): string | null;
}

const saleModules = import.meta.glob<SaleModule>("./sale.ts");

async function loadSale(): Promise<SaleModule> {
  const load = saleModules["./sale.ts"];
  expect(
    load,
    "src/modules/cosmetic/avatar/logic/sale.ts must exist and export enrichWithSaleData, sortNewSpookyFirst and describeSale"
  ).toBeDefined();
  const mod = await (load as () => Promise<SaleModule>)();
  expect(typeof mod.enrichWithSaleData).toBe("function");
  expect(typeof mod.sortNewSpookyFirst).toBe("function");
  expect(typeof mod.describeSale).toBe("function");
  return mod;
}

function item(id: string, type: string, displayName: string): CosmeticInfo {
  return {
    id,
    filename: `${id}.png`,
    type,
    displayName,
    availability: "purchasable",
    price: 0,
    url: `https://example.test/cosmetics/${id}.png`,
  };
}

/** Catalog order as `/assets/cosmetics` would give it: novelties not first. */
function catalog(): CosmeticInfo[] {
  return [
    item("Bottom_Superhero", "Bottom", "Superhero"),
    item("Mid_BlackCat", "Mid", "Black Cat"),
    item("Top_CenturionHelmet", "Top", "Centurion Helmet"),
    item("Bottom_Detective", "Bottom", "Trenchcoat"),
  ];
}

function meta(): Record<string, SaleMeta> {
  return {
    Top_CenturionHelmet: {
      filename: "Top_CenturionHelmet.png",
      cost: { currency: "credits", amount: 329 },
      expiryDate: "2026-11-10T00:00:00.000Z",
      newAtSpookyShop: true,
    },
    Bottom_Superhero: {
      filename: "Bottom_Superhero.png",
      soldAtSpookyShop: true,
    },
    // Key does not match any Gemini id (the game keeps `.png`): joined on filename.
    "Bottom_Detective.png": {
      filename: "Bottom_Detective.png",
      cost: { currency: "credits", amount: 329 },
      expiryDate: "2026-11-10T00:00:00.000Z",
      newAtSpookyShop: true,
    },
    // Mid_BlackCat has no entry.
  };
}

function byId(items: SaleItem[], id: string): SaleItem {
  const found = items.find((entry) => entry.id === id);
  expect(found, `item ${id} must still be in the result`).toBeDefined();
  return found as SaleItem;
}

describe("BR-21 avatar sale metadata", () => {
  it("joins meta by id: cost, price, expiryDate and newAtSpookyShop copied, availability and url untouched", async () => {
    const { enrichWithSaleData } = await loadSale();
    const source = catalog();
    const enriched = enrichWithSaleData(source, meta());

    const centurion = byId(enriched, "Top_CenturionHelmet");
    expect(centurion.cost).toEqual({ currency: "credits", amount: 329 });
    expect(centurion.price).toBe(329);
    expect(centurion.expiryDate).toBe("2026-11-10T00:00:00.000Z");
    expect(centurion.newAtSpookyShop).toBe(true);
    expect(centurion.availability).toBe("purchasable");
    expect(centurion.url).toBe("https://example.test/cosmetics/Top_CenturionHelmet.png");
    expect(centurion.id).toBe("Top_CenturionHelmet");

    // A copy, not a mutation of the catalog entry.
    const original = byId(source, "Top_CenturionHelmet");
    expect(original.price).toBe(0);
    expect((original as SaleItem).cost).toBeUndefined();
  });

  it("leaves items without cost, at price 0 and not new, when meta is null or lacks their id", async () => {
    const { enrichWithSaleData } = await loadSale();

    for (const entry of enrichWithSaleData(catalog(), null)) {
      expect(entry.cost).toBeUndefined();
      expect(entry.price).toBe(0);
      expect(entry.newAtSpookyShop).not.toBe(true);
    }

    const blackCat = byId(enrichWithSaleData(catalog(), meta()), "Mid_BlackCat");
    expect(blackCat.cost).toBeUndefined();
    expect(blackCat.price).toBe(0);
    expect(blackCat.newAtSpookyShop).not.toBe(true);
  });

  it("falls back to filename when the meta key matches no id", async () => {
    const { enrichWithSaleData } = await loadSale();
    const detective = byId(enrichWithSaleData(catalog(), meta()), "Bottom_Detective");
    expect(detective.cost).toEqual({ currency: "credits", amount: 329 });
    expect(detective.price).toBe(329);
    expect(detective.newAtSpookyShop).toBe(true);
  });

  it("puts newAtSpookyShop items first, keeping the original order within each group", async () => {
    const { enrichWithSaleData, sortNewSpookyFirst } = await loadSale();
    const sorted = sortNewSpookyFirst(enrichWithSaleData(catalog(), meta()));
    expect(sorted.map((entry) => entry.id)).toEqual([
      "Top_CenturionHelmet",
      "Bottom_Detective",
      // soldAtSpookyShop alone does not lift an item.
      "Bottom_Superhero",
      "Mid_BlackCat",
    ]);
  });

  it("describes the sale line, and null when there is nothing to say", async () => {
    const { enrichWithSaleData, describeSale } = await loadSale();
    const enriched = enrichWithSaleData(catalog(), meta());

    expect(describeSale(byId(enriched, "Top_CenturionHelmet"))).toBe(
      "New · 329 credits · until 2026-11-10"
    );
    expect(describeSale(byId(enriched, "Mid_BlackCat"))).toBeNull();
  });

  it("omits an invalid expiryDate without throwing and keeps the currency as given", async () => {
    const { describeSale } = await loadSale();
    const dusty: SaleItem = {
      ...item("Top_Dusty", "Top", "Dusty"),
      cost: { currency: "magicDust", amount: 50 },
      price: 50,
      expiryDate: "not-a-date",
    };
    expect(() => describeSale(dusty)).not.toThrow();
    expect(describeSale(dusty)).toBe("50 magicDust");
  });
});
