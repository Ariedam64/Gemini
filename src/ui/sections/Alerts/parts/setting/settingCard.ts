/**
 * Settings Card - Notification sound management
 */

import { Card } from "../../../../components/Card/Card";
import { SoundPicker, SoundPickerHandle, SoundPickerItem } from "../../../../components/SoundPicker/SoundPicker";
import { Select, SelectHandle } from "../../../../components/Select/Select";
import { Slider, SliderHandle } from "../../../../components/Slider/Slider";
import { element } from "../../../../styles/helpers";
import { LIMITS } from "../../../../../modules/audio/customSounds/types";
import type { NotificationType, NotificationMode } from "../../../../../modules/audio/customSounds/types";
import { CustomSounds } from "../../../../../modules/audio/customSounds";

/**
 * Mode descriptions for each notification type
 */
const MODE_DESCRIPTIONS: Record<NotificationType, Record<NotificationMode, string>> = {
  shop: {
    'one-shot': 'Play sound once when item appears',
    'loop': 'Loop sound while item is available in shop',
  },
  pet: {
    'one-shot': 'Play sound once when pet event occurs',
    'loop': 'Loop sound while pet event is active',
  },
  weather: {
    'one-shot': 'Play sound once when weather occurs',
    'loop': 'Loop sound while weather is active',
  },
};

function getLongestLabel(labels: string[]): string {
  let longest = "";
  for (const label of labels) {
    if (label.length > longest.length) longest = label;
  }
  return longest;
}

function measureSelectWidth(selectRoot: HTMLElement, label: string): number {
  const rootNode = selectRoot.getRootNode();
  const container =
    rootNode instanceof ShadowRoot
      ? rootNode
      : document.body || document.documentElement;

  if (!container) return 0;

  const measureRoot = element("div", { className: "select" }) as HTMLDivElement;
  for (const className of Array.from(selectRoot.classList)) {
    if (className.startsWith("select--")) {
      measureRoot.classList.add(className);
    }
  }

  measureRoot.style.position = "absolute";
  measureRoot.style.visibility = "hidden";
  measureRoot.style.pointerEvents = "none";
  measureRoot.style.left = "-9999px";
  measureRoot.style.top = "-9999px";
  measureRoot.style.minWidth = "0";

  const trigger = element("button", {
    className: "select-trigger",
    type: "button",
  }) as HTMLButtonElement;
  trigger.style.width = "auto";
  trigger.style.minWidth = "0";
  trigger.style.whiteSpace = "nowrap";

  const caretText =
    selectRoot.querySelector(".select-caret")?.textContent || "v";

  const value = element("span", { className: "select-value" }, label) as HTMLSpanElement;
  const caret = element("span", { className: "select-caret" }, caretText) as HTMLSpanElement;
  trigger.append(value, caret);
  measureRoot.appendChild(trigger);

  container.appendChild(measureRoot);
  const width = Math.ceil(trigger.getBoundingClientRect().width);
  measureRoot.remove();

  return width;
}

function applySelectWidth(selectRoot: HTMLElement, labels: string[]): void {
  const longest = getLongestLabel(labels);
  if (!longest) return;

  let attempts = 0;
  const maxAttempts = 6;

  const apply = () => {
    attempts += 1;
    if (!selectRoot.isConnected) {
      if (attempts < maxAttempts) {
        requestAnimationFrame(apply);
      }
      return;
    }

    const width = measureSelectWidth(selectRoot, longest);
    if (width > 0) {
      selectRoot.style.width = `${width}px`;
      selectRoot.style.minWidth = `${width}px`;
    }
  };

  requestAnimationFrame(apply);
}
/**
 * Public handle for the settings card part
 */
export interface SettingCardPart {
  root: HTMLElement;
  destroy(): void;
}

/**
 * Options for the settings card
 */
export interface SettingCardOptions {
  defaultExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

/**
 * Create the settings card part
 */
export function createSettingCard(options?: SettingCardOptions): SettingCardPart {
  let root: HTMLElement | null = null;
  let soundPicker: SoundPickerHandle | null = null;
  let notificationSectionElement: HTMLElement | null = null;

  // Notification settings UI handles
  const notificationSelects: Map<NotificationType, SelectHandle> = new Map();
  const notificationModeSelects: Map<NotificationType, SelectHandle> = new Map();
  const notificationSliders: Map<NotificationType, SliderHandle> = new Map();

  // Audio playback state
  let currentAudio: HTMLAudioElement | null = null;
  let playingNotificationType: NotificationType | null = null;
  let audioCleanup: (() => void) | null = null;

  /**
   * Stop preview audio
   */
  function stopPreview(): void {
    audioCleanup?.();
    audioCleanup = null;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = null;
    playingNotificationType = null;
  }

  /**
   * Update all play buttons to show Play or Stop
   */
  function updatePlayButtons(): void {
    if (!notificationSectionElement) return;
    const items = notificationSectionElement.querySelectorAll<HTMLDivElement>(".notification-item");
    items.forEach((item) => {
      const type = item.dataset.type as NotificationType | undefined;
      const playBtn = item.querySelector<HTMLButtonElement>(".notification-item-play");
      if (!type || !playBtn) return;
      const isActive = !!currentAudio && playingNotificationType === type && !currentAudio.paused;
      playBtn.textContent = isActive ? "Stop" : "Play";
      item.classList.toggle("is-playing", isActive);
    });
  }

  /**
   * Toggle preview audio for a notification type
   */
  async function togglePreview(type: NotificationType): Promise<void> {
    if (playingNotificationType === type) {
      stopPreview();
      updatePlayButtons();
      return;
    }

    stopPreview();

    const config = CustomSounds.getNotificationConfig(type);
    const sound = CustomSounds.getById(config.soundId);
    if (!sound) {
      console.error(`[SettingCard] Sound not found: ${config.soundId}`);
      return;
    }

    const audio = new Audio(sound.source);
    audio.volume = config.volume / 100;
    currentAudio = audio;
    playingNotificationType = type;

    const onEnd = () => {
      if (playingNotificationType !== type) return;
      stopPreview();
      updatePlayButtons();
    };
    const onError = () => {
      if (playingNotificationType !== type) return;
      stopPreview();
      updatePlayButtons();
      console.error(`[SettingCard] Failed to play sound: ${sound.name}`);
    };

    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);
    audioCleanup = () => {
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
    };

    try {
      await audio.play();
      updatePlayButtons();
    } catch (error) {
      stopPreview();
      updatePlayButtons();
      console.error(`[SettingCard] Failed to play sound:`, error);
    }
  }

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

  /**
   * Update select options when sounds change
   */
  function updateSelectOptions(): void {
    const allSounds = CustomSounds.getAll();
    const soundOptions = allSounds.map((sound) => ({
      value: sound.id,
      label: sound.name,
    }));

    for (const [type, select] of notificationSelects) {
      const currentConfig = CustomSounds.getNotificationConfig(type);
      select.setOptions(soundOptions);
      select.setValue(currentConfig.soundId);
    }
  }

  /**
   * Create a notification row (label + sound select + play button + volume slider + mode select)
   */
  function createNotificationRow(
    type: NotificationType,
    label: string,
    description: string
  ): HTMLElement {
    const container = element("div", {
      className: "notification-item",
      "data-type": type,
    });

    // Label
    const labelEl = element("div", { className: "notification-item-label" }, label);
    container.appendChild(labelEl);
    const sectionDescriptionEl = element(
      "div",
      { className: "notification-item-description" },
      description
    );
    container.appendChild(sectionDescriptionEl);

    // Top controls row (select + play button)
    const controlsRow = element("div", { className: "notification-item-controls" });

    // Get current config
    const config = CustomSounds.getNotificationConfig(type);

    // Get all sounds for the select dropdown
    const allSounds = CustomSounds.getAll();
    const soundOptions = allSounds.map((sound) => ({
      value: sound.id,
      label: sound.name,
    }));

    // Sound select
    const soundSelect = Select({
      value: config.soundId,
      options: soundOptions,
      size: "sm",
      onChange: (soundId) => {
        // Get current config to preserve volume and mode
        const currentConfig = CustomSounds.getNotificationConfig(type);
        CustomSounds.setNotificationConfig(type, { soundId, volume: currentConfig.volume, mode: currentConfig.mode });
      },
    });
    notificationSelects.set(type, soundSelect);

    // Play/Stop button (like SoundPicker)
    const playBtn = element("button", {
      className: "notification-item-play",
      type: "button",
      title: "Test sound",
    }, "Play") as HTMLButtonElement;

    playBtn.addEventListener("click", () => {
      togglePreview(type);
    });

    controlsRow.appendChild(soundSelect.root);
    controlsRow.appendChild(playBtn);

    container.appendChild(controlsRow);

    // Volume slider (on its own row below)
    const volumeSlider = Slider({
      min: 0,
      max: 100,
      step: 1,
      value: config.volume,
      showValue: true,
      onChange: (volume) => {
        // Get current config to preserve soundId and mode
        const currentConfig = CustomSounds.getNotificationConfig(type);
        CustomSounds.setNotificationConfig(type, { soundId: currentConfig.soundId, volume, mode: currentConfig.mode });
      },
    });
    notificationSliders.set(type, volumeSlider);

    container.appendChild(volumeSlider.root);

    // Mode selector row with description
    const modeRow = element("div", { className: "notification-mode-row" });

    const modeOptions = [
      { value: 'one-shot', label: 'One-shot' },
      { value: 'loop', label: 'Loop' },
    ];

    const modeSelect = Select({
      value: config.mode,
      options: modeOptions,
      size: "sm",
      onChange: (mode) => {
        // Get current config to preserve soundId and volume
        const currentConfig = CustomSounds.getNotificationConfig(type);
        CustomSounds.setNotificationConfig(type, { soundId: currentConfig.soundId, volume: currentConfig.volume, mode: mode as NotificationMode });
        // Update description
        updateModeDescription(type);
      },
    });
    notificationModeSelects.set(type, modeSelect);
    modeSelect.root.classList.add("shrink");
    applySelectWidth(modeSelect.root, modeOptions.map((opt) => opt.label));

    modeRow.appendChild(modeSelect.root);

    // Mode description
    const modeDescription = element(
      "div",
      { className: "notification-mode-description" },
      MODE_DESCRIPTIONS[type][config.mode]
    );
    modeRow.appendChild(modeDescription);

    container.appendChild(modeRow);

    return container;
  }

  /**
   * Update the mode description when mode changes
   */
  function updateModeDescription(type: NotificationType): void {
    if (!notificationSectionElement) return;
    const item = notificationSectionElement.querySelector<HTMLDivElement>(`[data-type="${type}"]`);
    if (!item) return;

    const config = CustomSounds.getNotificationConfig(type);
    const description = item.querySelector<HTMLDivElement>(".notification-mode-description");
    if (description) {
      description.textContent = MODE_DESCRIPTIONS[type][config.mode];
    }
  }

  function buildCard(): HTMLElement {
    const body = element("div", { className: "alerts-settings-body" });

    // Initialize CustomSounds module
    CustomSounds.init();

    // Notification settings section (FIRST)
    notificationSectionElement = element("div", { className: "notification-settings" });

    // Add notification rows
    notificationSectionElement.appendChild(
      createNotificationRow(
        "shop",
        "Shops restock",
        "Default sound for shop restock alerts"
      )
    );
    notificationSectionElement.appendChild(
      createNotificationRow(
        "pet",
        "Pet events",
        "Default sound for pet event alerts"
      )
    );
    notificationSectionElement.appendChild(
      createNotificationRow(
        "weather",
        "Weather events",
        "Default sound for weather event alerts"
      )
    );

    body.appendChild(notificationSectionElement);

    // Add divider
    const divider = element("div", { className: "alerts-settings-divider" });
    body.appendChild(divider);

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
        // Update select options in notification settings
        updateSelectOptions();
      },
      onFilesAdded: (items) => {
        // Handle new files added
        addFilesToCustomSounds(items);
        // Update select options after adding files (slight delay to ensure storage is updated)
        setTimeout(() => {
          updateSelectOptions();
        }, 100);
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
        defaultExpanded: options?.defaultExpanded ?? true,
        stateKey: "settings",
        variant: "soft",
        padding: "none",
        divider: false,
        onExpandChange: options?.onExpandChange,
      },
      body
    );

    return root;
  }

  function syncWithCustomSounds(items: SoundPickerItem[]): void {
    // Get current sounds from CustomSounds
    const currentSounds = new Set(CustomSounds.getAll().map((s) => s.id));
    const itemIds = new Set(items.map((item) => item.id));

    // Find items to remove
    const removedSoundIds: string[] = [];
    for (const soundId of currentSounds) {
      if (!itemIds.has(soundId)) {
        removedSoundIds.push(soundId);
        try {
          CustomSounds.remove(soundId);
        } catch (error) {
          console.error(`[SettingCard] Failed to remove sound ${soundId}:`, error);
        }
      }
    }

    // Check if removed sounds were used in notifications and reset them
    if (removedSoundIds.length > 0) {
      const notificationTypes: NotificationType[] = ['shop', 'pet', 'weather'];
      for (const type of notificationTypes) {
        const config = CustomSounds.getNotificationConfig(type);
        if (removedSoundIds.includes(config.soundId)) {
          // Reset to default sound
          CustomSounds.setNotificationConfig(type, {
            soundId: 'default-notification',
            volume: config.volume, // Keep the volume
            mode: config.mode, // Keep the mode
          });

          // Update the slider value
          const slider = notificationSliders.get(type);
          if (slider) {
            slider.setValue(config.volume);
          }
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
    // Stop any playing audio
    stopPreview();

    if (soundPicker) {
      soundPicker.destroy();
      soundPicker = null;
    }

    // Cleanup notification selects
    for (const select of notificationSelects.values()) {
      select.destroy();
    }
    notificationSelects.clear();

    // Cleanup notification mode selects
    for (const select of notificationModeSelects.values()) {
      select.destroy();
    }
    notificationModeSelects.clear();

    // Cleanup notification sliders (no destroy method, just clear references)
    notificationSliders.clear();

    root = null;
  }

  return {
    root: buildCard(),
    destroy,
  };
}
