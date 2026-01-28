/**
 * Room Section
 * Displays available public rooms from Aries API
 */

import { BaseSection } from "../core/Section";
import type { SectionsDeps } from "../core/Types";
import { initRoomState, DEFAULT_ROOM_STATE, RoomStateController } from "./state";
import { createPublicCard } from "./parts/public";
import type { PublicCardHandle } from "./parts/public";

/* ───────────────────────── Room Section ───────────────────────── */

export class RoomSection extends BaseSection {
  private publicCardHandle: PublicCardHandle | null = null;

  constructor(private deps?: SectionsDeps) {
    super({
      id: "tab-room",
      label: "Room",
    });
  }

  protected destroy(): void {
    // Cleanup public card
    if (this.publicCardHandle) {
      this.publicCardHandle.destroy();
      this.publicCardHandle = null;
    }
  }

  protected async build(container: HTMLElement): Promise<void> {
    const section = this.createGrid("12px");
    section.id = "room";
    container.appendChild(section);

    // Initialize state with fallback
    let state: RoomStateController;
    try {
      state = await initRoomState();
    } catch {
      // Fallback if state initialization fails
      state = {
        get: () => DEFAULT_ROOM_STATE,
        set: () => {},
        save: () => {},
        setUI: () => {},
        setCardExpanded: () => {},
        toggleCard: () => {},
      } as RoomStateController;
    }

    const currentState = state.get();

    // Public Rooms Card
    this.publicCardHandle = await createPublicCard({
      state,
      defaultExpanded: !!currentState.ui.expandedCards.public,
    });

    section.appendChild(this.publicCardHandle.root);
  }
}
