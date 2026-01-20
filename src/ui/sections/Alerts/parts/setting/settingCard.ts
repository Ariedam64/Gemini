/**
 * Settings Card - Notification sound management
 */

import { Card } from "../../../../components/Card/Card";
import { SoundPicker, SoundPickerHandle } from "../../../../components/SoundPicker/SoundPicker";
import { element } from "../../../../styles/helpers";
import { LIMITS } from "../../../../../modules/audio/customSounds/types";

/**
 * Public handle for the settings card part
 */
export interface SettingCardPart {
  root: HTMLElement;
  destroy(): void;
}

/**
 * Create the settings card part
 */
export function createSettingCard(): SettingCardPart {
  let root: HTMLElement | null = null;
  let soundPicker: SoundPickerHandle | null = null;

  function buildCard(): HTMLElement {
    const body = element("div", { className: "alerts-settings-body" });

    soundPicker = SoundPicker({
      label: "Notification sounds",
      hint: "Upload or drop audio files for alerts",
      maxItems: LIMITS.MAX_SOUNDS,
      maxSizeBytes: LIMITS.MAX_SIZE_BYTES,
      multiple: true,
    });

    body.appendChild(soundPicker.root);

    root = Card(
      {
        id: "alerts-settings-card",
        title: "Settings",
        subtitle: "Manage notification sounds",
        expandable: true,
        defaultExpanded: true,
        stateKey: "settings",
        variant: "soft",
        padding: "sm",
        divider: false,
      },
      body
    );

    return root;
  }

  function destroy(): void {
    if (soundPicker) {
      soundPicker.destroy();
      soundPicker = null;
    }
    root = null;
  }

  return {
    root: buildCard(),
    destroy,
  };
}
