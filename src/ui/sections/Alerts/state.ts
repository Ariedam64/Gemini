/**
 * Alerts Section State
 *
 * Manages persistence of section UI state (card expansion, etc.)
 */

import { storageGet, storageSet, SECTION_KEYS } from "../../../utils/storage";

/** Card expansion state */
export interface AlertsSectionState {
  /** Card ID -> expanded status */
  cardExpanded: Record<string, boolean>;
}

/** Default state */
const DEFAULT_STATE: AlertsSectionState = {
  cardExpanded: {},
};

/**
 * Load section state from storage
 */
export function loadSectionState(): AlertsSectionState {
  return storageGet<AlertsSectionState>(SECTION_KEYS.ALERTS, DEFAULT_STATE);
}

/**
 * Save section state to storage
 */
export function saveSectionState(state: AlertsSectionState): void {
  storageSet(SECTION_KEYS.ALERTS, state);
}

/**
 * Get the expanded state for a specific card
 */
export function getCardExpandedState(cardId: string): boolean | undefined {
  const state = loadSectionState();
  return state.cardExpanded[cardId];
}

/**
 * Set the expanded state for a specific card
 */
export function setCardExpandedState(cardId: string, expanded: boolean): void {
  const state = loadSectionState();
  state.cardExpanded[cardId] = expanded;
  saveSectionState(state);
}

/**
 * Initialize section state
 * Must be called BEFORE cards are created
 */
export async function initSectionState(): Promise<void> {
  // Load state from storage
  const state = loadSectionState();

  // Import Card component to pre-populate the expanded states
  const { initializeExpandedStates } = await import("../../components/Card/Card");

  // Pre-populate the Card component's expansion state map
  // This must be done before cards are created so they read the correct state
  initializeExpandedStates(state.cardExpanded);
}
