/**
 * Settings Card - Notification sound management
 */

import { Card } from "../../../../components/Card/Card";
import { SoundPicker, SoundPickerHandle, SoundPickerItem } from "../../../../components/SoundPicker/SoundPicker";
import { element } from "../../../../styles/helpers";
import { LIMITS } from "../../../../../modules/audio/customSounds/types";
import { CustomSounds } from "../../../../../modules/audio/customSounds";
import { setCardExpandedState } from "../../state";

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

  /**
   * Convert a data URL or HTTP URL back to a File object
   * This is needed to restore audio playback for sounds loaded from storage
   */
  function sourceToFile(source: string, filename: string): File {
    // Check if it's a data URL
    if (source.startsWith("data:")) {
      try {
        // Parse the data URL
        const arr = source.split(",");
        const mime = arr[0].match(/:(.*?);/)?.[1] || "audio/mpeg";
        const bstr = atob(arr[1]);
        const n = bstr.length;
        const u8arr = new Uint8Array(n);

        for (let i = 0; i < n; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }

        return new File([u8arr], filename, { type: mime });
      } catch (error) {
        console.error(`[SettingCard] Failed to convert data URL to File:`, error);
        // Fallback: return empty file
        return new File([], filename, { type: "audio/mpeg" });
      }
    }

    // For HTTP/HTTPS URLs, return a placeholder file that references the URL
    // The soundPicker will create a blob URL from this file on demand
    // But since we can't fetch synchronously, we'll return an empty file as fallback
    // and let the soundPicker handle the URL directly
    return new File([], filename, { type: "audio/mpeg" });
  }

  function buildCard(): HTMLElement {
    const body = element("div", { className: "alerts-settings-body" });

    // Initialize CustomSounds module
    CustomSounds.init();

    // Convert CustomSound to SoundPickerItem format
    const existingSounds = CustomSounds.getAll().map((sound) => {
      const file = sourceToFile(sound.source, sound.name);
      // Store the source URL on the file object so we can use it directly for playback
      // This is especially important for HTTP URLs (like default sounds)
      (file as any).__sourceUrl = sound.source;
      return {
        id: sound.id,
        file,
        name: sound.name,
        size: 0,
        type: sound.type,
      };
    });

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
        onExpandChange: (expanded) => {
          // Persist the card expansion state (async, safe to not await)
          setCardExpandedState("alerts-settings-card", expanded).catch((error) => {
            console.error(`[SettingCard] Failed to save expansion state:`, error);
          });
        },
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
