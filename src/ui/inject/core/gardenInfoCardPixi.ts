/**
 * Shared plumbing for anything that needs to react to the game's Pixi-rendered
 * "garden info" card (the crop/egg/decor details panel). The panel moved from
 * DOM (Chakra `McGrid`/`McFlex`, matched by the `.css-qnqsp4` class) to native
 * Pixi rendering, so old MutationObserver + CSS-selector approaches no longer
 * find anything to attach to.
 *
 * Hook points used here are the Pixi `.label` strings the game assigns to its
 * containers (`GardenInfoCardSystem`, `GardenInfoCardRow`, `GardenInfoObjectCard`).
 * Those are plain string literals, not minified identifiers, so they should
 * stay far more stable across builds than internal function/variable names.
 *
 * Multiple features need this same card (the crop coin-value badge and the
 * lock-border indicators) — they share this one card-system search via
 * `watchGardenInfoCard` instead of each running their own copy of it.
 */
import { MGPixi } from "../../../modules/pixi";
import { findAcrossBranches } from "../../../modules/pixi/logic/utils";
import { pageWindow } from "../../../utils/windowContext";

export interface GardenInfoCardGeometry {
  /** Local-space y of the card's own content top (title row), used to place things above it. */
  top: number;
  width: number;
  height: number;
}

export type GardenInfoCardListener = (card: any, geometry: GardenInfoCardGeometry | null) => void;

const CARD_SYSTEM_LABEL = "GardenInfoCardSystem";
const CARD_ROW_LABEL = "GardenInfoCardRow";
const OBJECT_CARD_LABEL = "GardenInfoObjectCard";
// Anchor on the title row rather than the card's own full bounds — the
// card's icon can be much taller for large/fully-grown crops, which would
// otherwise push dependent content up by a varying, crop-dependent amount.
const TITLE_ROW_LABEL = "GardenInfoObjectTitleRow";
// A sibling section of the row (not a descendant of it) shown above it for
// crops with an active ability/mutation proc callout (e.g. Dawnbinder).
const ABILITIES_SECTION_LABEL = "GardenInfoPlantAbilities";
const SECTION_GAP_ESTIMATE = 8;
const CARD_SYSTEM_FIND_RETRY_MS = 1000;

let cardSystem: any = null;
let currentCard: any = null;
let findRafId: number | null = null;
let lastFindCheckAt = 0;
const listeners = new Set<GardenInfoCardListener>();

const raf: (cb: (t: number) => void) => number = (pageWindow as any).requestAnimationFrame.bind(pageWindow);
const cancelRaf: (id: number) => void = (pageWindow as any).cancelAnimationFrame.bind(pageWindow);

function computeGeometry(card: any): GardenInfoCardGeometry {
  const cardBounds = card.getLocalBounds();
  // Prefer the game's own fixed hit-area size over the card's rendered
  // bounds — a large/grown crop's icon can visually overflow past the
  // card's intended box, which throws off anything anchored to it.
  const width = card.hitArea?.width ?? cardBounds.width;
  const height = card.hitArea?.height ?? cardBounds.height;
  const titleRow = (card.children ?? []).find((c: any) => c?.label === TITLE_ROW_LABEL);
  const contentTop = titleRow ? titleRow.position.y + titleRow.getLocalBounds().minY : cardBounds.minY;
  const abilitiesSection = (cardSystem?.children ?? []).find((c: any) => c?.label === ABILITIES_SECTION_LABEL);
  const extraTopOffset = abilitiesSection ? abilitiesSection.getLocalBounds().height + SECTION_GAP_ESTIMATE : 0;
  return { top: contentTop - extraTopOffset, width, height };
}

function notifyListeners(card: any | null, geometry: GardenInfoCardGeometry | null) {
  for (const listener of listeners) {
    try {
      listener(card, geometry);
    } catch (error) {
      console.warn("[gardenInfoCardPixi] listener failed", error);
    }
  }
}

// Runs synchronously inside the game's own Pixi update loop (triggered from
// its `addChild` → `childAdded` emit). If this throws, the exception bubbles
// into the game's own rebuild and aborts it partway through, corrupting its
// layout — so every path here must stay exception-safe.
function onChildAddedUnsafe(row: any) {
  if (row?.label !== CARD_ROW_LABEL) return;
  const card = findAcrossBranches(row, (node: any) => node?.label === OBJECT_CARD_LABEL);
  if (!card) return;
  currentCard = card;
  const geometry = computeGeometry(card);
  card.once("destroyed", () => {
    if (currentCard === card) {
      currentCard = null;
      notifyListeners(null, null);
    }
  });
  notifyListeners(card, geometry);
}

function onChildAdded(row: any) {
  try {
    onChildAddedUnsafe(row);
  } catch (error) {
    console.warn("[gardenInfoCardPixi] onChildAdded failed", error);
  }
}

function attachToCardSystem(system: any) {
  cardSystem = system;
  cardSystem.on("childAdded", onChildAdded);
  cardSystem.once("destroyed", () => {
    if (cardSystem === system) {
      cardSystem = null;
      currentCard = null;
      notifyListeners(null, null);
      // The game can destroy and fully recreate its whole Pixi tree (e.g.
      // WebGL context loss after the tab/window is backgrounded a while) —
      // the search loop had already stopped scheduling itself once found
      // the first time, so without this it would never look again.
      restartSearchIfNeeded();
    }
  });
  const existingRow = (system.children ?? []).find((c: any) => c?.label === CARD_ROW_LABEL);
  if (existingRow) onChildAdded(existingRow);
}

// No attempt cap: MGPixi can take a variable amount of time to become ready
// depending on how fast the page loads, so giving up after a fixed number of
// attempts risked never finding the card system at all. Retrying forever
// costs nothing once found (scheduling stops immediately below).
function tryFindCardSystem() {
  if (cardSystem) return;
  if (!MGPixi.isReady()) return;
  const found = MGPixi.findByLabel(CARD_SYSTEM_LABEL);
  if (found) attachToCardSystem(found);
}

function scheduleFind(now: number) {
  findRafId = null;
  if (!listeners.size || cardSystem) return;
  if (now - lastFindCheckAt >= CARD_SYSTEM_FIND_RETRY_MS) {
    lastFindCheckAt = now;
    tryFindCardSystem();
  }
  if (!listeners.size || cardSystem) return;
  findRafId = raf(scheduleFind);
}

/** (Re)kicks the search loop if there are subscribers but nothing found yet. */
function restartSearchIfNeeded() {
  if (!listeners.size || cardSystem) return;
  tryFindCardSystem();
  if (!cardSystem && findRafId == null) {
    findRafId = raf(scheduleFind);
  }
}

/**
 * Subscribe to the game's Pixi-rendered garden info card. `listener` is
 * called with the card container + its geometry whenever a card is shown,
 * and with `(null, null)` when it's removed. Multiple subscribers share the
 * same underlying card-system search — only one instance of it runs
 * regardless of how many callers subscribe.
 */
export function watchGardenInfoCard(listener: GardenInfoCardListener): () => void {
  listeners.add(listener);
  restartSearchIfNeeded();
  if (currentCard) {
    try {
      listener(currentCard, computeGeometry(currentCard));
    } catch (error) {
      console.warn("[gardenInfoCardPixi] listener failed", error);
    }
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size && findRafId != null) {
      cancelRaf(findRafId);
      findRafId = null;
    }
  };
}
