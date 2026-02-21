/**
 * Shop Restock Section
 */

import { BaseSection } from "../core/Section";
import { injectStyleOnce } from "../../styles/inject";
import { shopRestockCss } from "./styles.css";
import { initSectionState } from "./state";
import { createHistoryCard, createPredictionsCard, createStatusBar } from "./parts";
import { MGData, MGSprite } from "../../../modules";
import { resetValidItemsCache, pruneInvalidHistory } from "../../../features/shopRestock/logic/history";

export class ShopRestockSection extends BaseSection {
  private sectionElement: HTMLElement | null = null;
  private statusBar: ReturnType<typeof createStatusBar> | null = null;
  private predictionsCard: ReturnType<typeof createPredictionsCard> | null = null;
  private historyCard: ReturnType<typeof createHistoryCard> | null = null;

  constructor() {
    super({ id: "tab-shop-restock", label: "Restock" });
  }

  protected async build(container: HTMLElement): Promise<void> {
    await initSectionState();

    const shadow = container.getRootNode() as ShadowRoot;
    injectStyleOnce(shadow, shopRestockCss, "shop-restock-styles");

    const section = this.createGrid("12px");
    section.id = "shop-restock-section";
    this.sectionElement = section;

    await Promise.all([
      MGData.waitFor("plants").catch(() => { }),
      MGData.waitFor("items").catch(() => { }),
      MGData.waitFor("eggs").catch(() => { }),
      MGData.waitFor("decor").catch(() => { }),
      MGData.waitFor("weather").catch(() => { }),
    ]);

    if (!MGSprite.isReady()) {
      await MGSprite.init().catch(() => { });
    }

    resetValidItemsCache();
    pruneInvalidHistory();

    this.buildParts();

    container.appendChild(section);
  }

  private buildParts(): void {
    if (!this.sectionElement) return;

    this.statusBar = createStatusBar();
    this.sectionElement.appendChild(this.statusBar.root);

    this.predictionsCard = createPredictionsCard();
    this.sectionElement.appendChild(this.predictionsCard.root);

    this.historyCard = createHistoryCard();
    this.sectionElement.appendChild(this.historyCard.root);
  }

  protected destroy(): void {
    this.statusBar?.destroy();
    this.predictionsCard?.destroy();
    this.historyCard?.destroy();

    this.statusBar = null;
    this.predictionsCard = null;
    this.historyCard = null;
    this.sectionElement = null;
  }
}
