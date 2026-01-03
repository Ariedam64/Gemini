/**
 * Test Section
 * Demo section for displaying all sprite categories
 */

import { element } from "../../styles/helpers";
import { BaseSection } from "../core/Section";
import { Card } from "../../components/Card/Card";
import { Table, ColDef } from "../../components/Table/Table";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Badge } from "../../components/Badge/Badge";
import { MGSprite } from "../../../modules/sprite";
import { MGData } from "../../../modules/data";
import { initTestState, TestStateController } from "./state";

type SpriteRow = {
  name: string;
  spriteId: string;
  rarity: string | null;
};

const RARITY_ORDER: Record<string, number> = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  Legendary: 4,
  Mythical: 5,
  Divine: 6,
  Celestial: 7,
};

function getRarityOrder(rarity: string | null): number {
  if (!rarity) return 0;
  return RARITY_ORDER[rarity] ?? 0;
}

export class TestSection extends BaseSection {
  private stateCtrl: TestStateController | null = null;

  constructor() {
    super({
      id: "tab-test",
      label: "Test",
    });
  }

  protected async build(container: HTMLElement): Promise<void> {
    this.stateCtrl = await initTestState();

    const section = this.createContainer("test-section");
    section.style.display = "flex";
    section.style.flexDirection = "column";
    section.style.gap = "12px";
    container.appendChild(section);

    await this.buildSpriteTables(section);
  }

  private renderSprite(row: SpriteRow): Node {
    const wrapper = element("div", {
      style: "display:flex;align-items:center;justify-content:center;width:32px;height:32px;",
    }) as HTMLDivElement;

    if (row.spriteId) {
      const spriteId = row.spriteId;
      requestAnimationFrame(() => {
        try {
          const canvas = MGSprite.toCanvas(spriteId, { scale: 1 });
          canvas.style.maxWidth = "32px";
          canvas.style.maxHeight = "32px";
          canvas.style.objectFit = "contain";
          wrapper.appendChild(canvas);
        } catch {
          wrapper.textContent = "-";
        }
      });
    } else {
      wrapper.textContent = "-";
    }
    return wrapper;
  }

  private renderRarity(row: SpriteRow): Node {
    if (!row.rarity) {
      const span = element("span", { style: "opacity:0.5;" }) as HTMLSpanElement;
      span.textContent = "—";
      return span;
    }
    const badge = Badge({
      variant: "rarity",
      rarity: row.rarity,
      size: "sm",
    });
    return badge.root;
  }

  private createDataCard(
    category: string,
    title: string,
    allRows: SpriteRow[],
    columns: ColDef<SpriteRow>[]
  ): HTMLElement {
    const state = this.stateCtrl!.getCategoryState(category);

    const filterRows = (query: string): SpriteRow[] => {
      if (!query) return allRows;
      const q = query.toLowerCase();
      return allRows.filter((row) => row.name.toLowerCase().includes(q));
    };

    const table = Table<SpriteRow>({
      columns,
      data: filterRows(state.search),
      pageSize: 0,
      compact: true,
      maxHeight: "calc(var(--lg-row-h, 40px) * 6)",
      getRowId: (row) => row.spriteId,
      onSortChange: (key, dir) => {
        this.stateCtrl!.setCategorySort(category, key, dir);
      },
    });

    if (state.sort.key && state.sort.dir) {
      table.sortBy(state.sort.key, state.sort.dir);
    }

    const search = SearchBar({
      placeholder: "Search...",
      value: state.search,
      debounceMs: 150,
      withClear: true,
      size: "sm",
      focusKey: "",
      onChange: (val) => {
        const trimmed = val.trim();
        this.stateCtrl!.setCategorySearch(category, trimmed);
        table.setData(filterRows(trimmed));
      },
    });

    const searchWrapper = element("div", {
      style: "margin-bottom:8px;",
    }) as HTMLDivElement;
    searchWrapper.appendChild(search.root);

    const content = element("div") as HTMLDivElement;
    content.appendChild(searchWrapper);
    content.appendChild(table.root);

    return Card(
      {
        title,
        subtitle: `${allRows.length} entries`,
        variant: "soft",
        padding: "sm",
        expandable: true,
        defaultExpanded: state.expanded,
        onExpandChange: (expanded) => {
          this.stateCtrl!.setCategoryExpanded(category, expanded);
        },
      },
      content
    );
  }

  private formatCategoryName(category: string): string {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  private findPlantBySprite(spriteId: string, spriteName: string): any | null {
    const plants = MGData.get("plants") as Record<string, any> | null;
    if (!plants) return null;

    for (const plant of Object.values(plants)) {
      if (plant?.seed?.spriteId === spriteId) return plant;
      if (plant?.plant?.spriteId === spriteId) return plant;
      if (plant?.crop?.spriteId === spriteId) return plant;
    }

    const nameLC = spriteName.toLowerCase();
    for (const plant of Object.values(plants)) {
      const seedName = (plant?.seed?.name || "").toLowerCase();
      if (seedName === nameLC || seedName === `${nameLC} seed`) return plant;
    }

    return null;
  }

  private findPetBySpriteId(spriteId: string): any | null {
    const pets = MGData.get("pets") as Record<string, any> | null;
    if (!pets) return null;

    for (const pet of Object.values(pets)) {
      if (pet?.spriteId === spriteId) return pet;
    }
    return null;
  }

  private findItemBySpriteId(spriteId: string): any | null {
    const items = MGData.get("items") as Record<string, any> | null;
    if (!items) return null;

    for (const item of Object.values(items)) {
      if (item?.spriteId === spriteId) return item;
    }
    return null;
  }

  private findDecorBySpriteId(spriteId: string): any | null {
    const decors = MGData.get("decor") as Record<string, any> | null;
    if (!decors) return null;

    for (const decor of Object.values(decors)) {
      if (decor?.spriteId === spriteId) return decor;
    }
    return null;
  }

  private findEggBySpriteId(spriteId: string): any | null {
    const eggs = MGData.get("eggs") as Record<string, any> | null;
    if (!eggs) return null;

    for (const egg of Object.values(eggs)) {
      if (egg?.spriteId === spriteId) return egg;
    }
    return null;
  }

  private getRarityForSprite(category: string, spriteId: string, spriteName: string): string | null {
    const catLower = category.toLowerCase();

    if (catLower === "plant" || catLower === "seed" || catLower === "tallplant") {
      const plant = this.findPlantBySprite(spriteId, spriteName);
      if (plant?.seed?.rarity) return plant.seed.rarity;
    }

    if (catLower === "pet") {
      const pet = this.findPetBySpriteId(spriteId);
      if (pet?.rarity) return pet.rarity;
    }

    if (catLower === "item") {
      const item = this.findItemBySpriteId(spriteId);
      if (item?.rarity) return item.rarity;
    }

    if (catLower === "decor") {
      const decor = this.findDecorBySpriteId(spriteId);
      if (decor?.rarity) return decor.rarity;
    }

    if (catLower === "egg") {
      const egg = this.findEggBySpriteId(spriteId);
      if (egg?.rarity) return egg.rarity;
    }

    return null;
  }

  private yieldToMain(delayMs = 0): Promise<void> {
    return new Promise((resolve) => {
      if (delayMs > 0) {
        setTimeout(resolve, delayMs);
      } else if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(() => resolve(), { timeout: 50 });
      } else {
        setTimeout(resolve, 4);
      }
    });
  }

  private async buildSpriteTables(container: HTMLElement): Promise<void> {
    const spriteColumns: ColDef<SpriteRow>[] = [
      {
        key: "name",
        header: "Name",
        sortable: true,
        width: "1fr",
        sortFn: (a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" }),
      },
      {
        key: "rarity",
        header: "Rarity",
        sortable: true,
        width: "100px",
        align: "center",
        render: (row) => this.renderRarity(row),
        sortFn: (a, b) => getRarityOrder(a.rarity) - getRarityOrder(b.rarity),
      },
      {
        key: "sprite",
        header: "Sprite",
        width: "60px",
        align: "center",
        render: (row) => this.renderSprite(row),
      },
    ];

    if (!MGSprite.isReady()) {
      try {
        await MGSprite.init();
      } catch {
        return;
      }
    }

    const categories = MGSprite.getCategories();

    for (let i = 0; i < categories.length; i++) {
      await this.yieldToMain(8);

      const category = categories[i];
      const ids = MGSprite.getCategoryId(category);

      const rows: SpriteRow[] = ids.map((id) => {
        const spriteId = `sprite/${category}/${id}`;
        return {
          name: id,
          spriteId,
          rarity: this.getRarityForSprite(category, spriteId, id),
        };
      });

      rows.sort((a, b) => getRarityOrder(a.rarity) - getRarityOrder(b.rarity));

      if (rows.length > 0) {
        const card = this.createDataCard(
          category,
          this.formatCategoryName(category),
          rows,
          spriteColumns
        );
        container.appendChild(card);
      }
    }
  }
}
