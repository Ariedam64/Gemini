/**
 * Alerts Section State
 *
 * Manages persistent state for Alerts section (card expansion, etc.)
 */

import { createSectionStore } from "../core/State";

/** Card expansion state */
export interface AlertsState {
  /** Card ID -> expanded status */
  cardExpanded: Record<string, boolean>;
}

/** Default state */
const DEFAULT_ALERTS_STATE: AlertsState = {
  cardExpanded: {},
};

// Singleton store instance
let stateController: Awaited<ReturnType<typeof createSectionStore<AlertsState>>> | null = null;

/**
 * Get or create the state controller
 */
async function getStateController() {
  if (!stateController) {
    stateController = await createSectionStore<AlertsState>("tab-alerts", {
      version: 1,
      defaults: DEFAULT_ALERTS_STATE,
      sanitize: (s) => ({
        cardExpanded: s.cardExpanded && typeof s.cardExpanded === "object" ? s.cardExpanded : {},
      }),
    });
  }
  return stateController;
}

/**
 * Set the expanded state for a specific card
 */
export async function setCardExpandedState(cardId: string, expanded: boolean): Promise<void> {
  const controller = await getStateController();
  await controller.update((state) => {
    state.cardExpanded[cardId] = expanded;
  });
}

/**
 * Initialize section state
 * Must be called BEFORE cards are created
 */
export async function initSectionState(): Promise<void> {
  // Initialize the store
  const controller = await getStateController();
  const state = controller.get();

  // Import Card component to pre-populate the expanded states
  const { initializeExpandedStates } = await import("../../components/Card/Card");

  // Pre-populate the Card component's expansion state map
  // This must be done before cards are created so they read the correct state
  initializeExpandedStates(state.cardExpanded);
}
