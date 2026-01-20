/**
 * Settings Card - Notification sound management
 */

import { Card } from "../../../../components/Card/Card";
import { SoundPicker, SoundPickerHandle, SoundPickerItem } from "../../../../components/SoundPicker/SoundPicker";
import { element } from "../../../../styles/helpers";
import { LIMITS } from "../../../../../modules/audio/customSounds/types";
import { CustomSounds } from "../../../../../modules/audio/customSounds";

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

    // Initialize CustomSounds module
    CustomSounds.init();

    // Convert CustomSound to SoundPickerItem format
    const existingSounds = CustomSounds.getAll().map((sound) => ({
      id: sound.id,
      file: new File([], sound.name, { type: "audio/mpeg" }), // Placeholder file for UI
      name: sound.name,
      size: 0,
      type: sound.type,
    }));

    soundPicker = SoundPicker({
      label: "Notification sounds",
      hint: "Upload or drop audio files for alerts",
      maxItems: LIMITS.MAX_SOUNDS,
      maxSizeBytes: LIMITS.MAX_SIZE_BYTES,
      multiple: true,
      onItemsChange: (items) => {
        // Sync with CustomSounds when items change
        syncWithCustomSounds(items);
      },
      onFilesAdded: (items) => {
        // Handle new files added
        addFilesToCustomSounds(items);
      },
    });

    // Load existing sounds into the picker
    soundPicker.setItems(existingSounds);

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

  function syncWithCustomSounds(items: SoundPickerItem[]): void {
    // Get current sounds from CustomSounds
    const currentSounds = new Set(CustomSounds.getAll().map((s) => s.id));

    // Find items to remove
    for (const soundId of currentSounds) {
      if (!items.some((item) => item.id === soundId)) {
        try {
          CustomSounds.remove(soundId);
        } catch (error) {
          console.error(`[SettingCard] Failed to remove sound ${soundId}:`, error);
        }
      }
    }

    // Find items to rename
    for (const item of items) {
      if (currentSounds.has(item.id)) {
        const sound = CustomSounds.getById(item.id);
        if (sound && sound.name !== item.name) {
          try {
            CustomSounds.update(item.id, { name: item.name });
          } catch (error) {
            console.error(`[SettingCard] Failed to rename sound ${item.id}:`, error);
          }
        }
      }
    }
  }

  function addFilesToCustomSounds(items: SoundPickerItem[]): void {
    for (const item of items) {
      if (!CustomSounds.getById(item.id)) {
        // Convert file to data URL and add to CustomSounds
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          try {
            CustomSounds.add(item.name, dataUrl, "upload");
          } catch (error) {
            console.error(`[SettingCard] Failed to add sound ${item.name}:`, error);
          }
        };
        reader.onerror = () => {
          console.error(`[SettingCard] Failed to read file ${item.name}`);
        };
        reader.readAsDataURL(item.file);
      }
    }
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
