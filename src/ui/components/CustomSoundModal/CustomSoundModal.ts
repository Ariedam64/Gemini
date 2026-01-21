/**
 * Custom Sound Modal - Configure custom sounds per entity.
 */

import { Modal, ModalHandle } from "../Modal/Modal";
import { Select, SelectHandle } from "../Select/Select";
import { Slider, SliderHandle } from "../Slider/Slider";
import { Button, ButtonHandle } from "../Button/Button";
import { element } from "../../styles/helpers";
import { injectStyleOnce } from "../../styles/inject";
import { MGSprite } from "../../../modules";
import { CustomSounds } from "../../../modules/audio/customSounds";
import type { EntityType, NotificationMode } from "../../../modules/audio/customSounds/types";
import { customSoundModalCss } from "./customSoundModal.css";

export interface CustomSoundModalOptions {
  /** Entity type (shop, weather, pet) */
  entityType: EntityType;

  /** Entity unique identifier */
  entityId: string;

  /** Entity display name */
  entityName: string;

  /** Optional sprite ID for visual display */
  spriteId?: string | null;

  /** Optional shop type (only for shop items) */
  shopType?: string;

  /** Optional custom icon (for weather/pet events without sprites) */
  icon?: string;

  /** Modal title */
  title?: string;

  /** Modal size */
  size?: "sm" | "md" | "lg";

  /** Close modal when clicking on backdrop */
  closeOnBackdrop?: boolean;

  /** Close modal when pressing Escape key */
  closeOnEscape?: boolean;

  /** Callback when saved (null = reset to default) */
  onSave: (config: { soundId: string; volume: number; mode: NotificationMode } | null) => void;

  /** Callback when closed */
  onClose?: () => void;
}

export interface CustomSoundModalHandle {
  root: HTMLElement;
  close(): void;
  destroy(): void;
}

const DEFAULT_OPTIONS: Required<
  Pick<CustomSoundModalOptions, "title" | "size" | "closeOnBackdrop" | "closeOnEscape">
> = {
  title: "Custom Sound",
  size: "md",
  closeOnBackdrop: true,
  closeOnEscape: true,
};

const MODE_DESCRIPTIONS: Record<NotificationMode, string> = {
  "one-shot": "Play sound once when event occurs",
  loop: "Loop sound while event is active",
};

const CLOSE_DESTROY_DELAY_MS = 220;

function resolveHudShadowRoot(): ShadowRoot | null {
  const host =
    document.querySelector("#gemini-hud-root") ||
    document.querySelector("#gemini-root") ||
    document.querySelector("#gemini-hud-container");
  return host?.shadowRoot ?? null;
}

function ensureStyles(target: HTMLElement): void {
  const shadowRoot = resolveHudShadowRoot();
  if (shadowRoot) {
    injectStyleOnce(shadowRoot, customSoundModalCss, "customSoundModal");
    return;
  }

  const style = element("style");
  style.textContent = customSoundModalCss;
  target.appendChild(style);
}

export function createCustomSoundModal(options: CustomSoundModalOptions): CustomSoundModalHandle {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  let modal: ModalHandle | null = null;
  let soundSelect: SelectHandle | null = null;
  let playButton: ButtonHandle | null = null;
  let volumeSlider: SliderHandle | null = null;
  let modeSelect: SelectHandle | null = null;
  let modeDescription: HTMLElement | null = null;
  let currentConfig: { soundId: string; volume: number; mode: NotificationMode } | null = null;
  let currentAudio: HTMLAudioElement | null = null;
  let audioCleanup: (() => void) | null = null;
  let destroyed = false;
  let closeHandled = false;
  let destroyTimer: number | null = null;

  function stopPreview(): void {
    audioCleanup?.();
    audioCleanup = null;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    currentAudio = null;
    playButton?.setLabel("Play");
  }

  async function togglePreview(): Promise<void> {
    if (currentAudio) {
      stopPreview();
      return;
    }

    if (!currentConfig) return;

    const sound = CustomSounds.getById(currentConfig.soundId);
    if (!sound) {
      console.error(`[CustomSoundModal] Sound not found: ${currentConfig.soundId}`);
      return;
    }

    const audio = new Audio(sound.source);
    audio.volume = currentConfig.volume / 100;
    currentAudio = audio;

    const onEnd = () => {
      stopPreview();
    };

    const onError = () => {
      stopPreview();
      console.error(`[CustomSoundModal] Failed to play sound: ${sound.name}`);
    };

    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);
    audioCleanup = () => {
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
    };

    try {
      await audio.play();
      playButton?.setLabel("Stop");
    } catch (error) {
      stopPreview();
      console.error("[CustomSoundModal] Failed to play sound:", error);
    }
  }

  function updateModeDescription(): void {
    if (modeDescription && currentConfig) {
      modeDescription.textContent = MODE_DESCRIPTIONS[currentConfig.mode];
    }
  }

  function scheduleDestroy(): void {
    if (destroyed || destroyTimer !== null) return;
    destroyTimer = window.setTimeout(() => {
      destroy();
    }, CLOSE_DESTROY_DELAY_MS);
  }

  function handleClose(): void {
    if (destroyed || closeHandled) return;
    closeHandled = true;
    stopPreview();
    opts.onClose?.();
    scheduleDestroy();
  }

  function close(): void {
    if (destroyed) return;
    modal?.close();
    handleClose();
  }

  function destroy(): void {
    if (destroyed) return;
    destroyed = true;
    closeHandled = true;

    if (destroyTimer !== null) {
      window.clearTimeout(destroyTimer);
      destroyTimer = null;
    }

    stopPreview();

    if (soundSelect) {
      soundSelect.destroy();
      soundSelect = null;
    }

    if (modeSelect) {
      modeSelect.destroy();
      modeSelect = null;
    }

    volumeSlider = null;
    playButton = null;
    modeDescription = null;
    currentConfig = null;

    if (modal) {
      modal.destroy();
      modal = null;
    }
  }

  function buildTitleContent(): HTMLElement {
    const title = element("span", { className: "custom-sound-modal-title" });

    let hasVisual = false;
    if (options.spriteId) {
      try {
        const canvas = MGSprite.toCanvas(options.spriteId);
        if (canvas) {
          const visual = element("span", { className: "custom-sound-modal-title-icon" });
          canvas.className = "custom-sound-modal-title-sprite";
          visual.appendChild(canvas);
          title.appendChild(visual);
          hasVisual = true;
        }
      } catch {
        // Ignore sprite errors, fallback to icon if provided.
      }
    }

    if (!hasVisual && options.icon) {
      const visual = element("span", { className: "custom-sound-modal-title-icon" }, options.icon);
      title.appendChild(visual);
    }

    const text = element("span", { className: "custom-sound-modal-title-text" }, options.entityName);
    title.appendChild(text);

    return title;
  }

  function buildBody(): HTMLElement {
    const body = element("div", { className: "custom-sound-modal-body" });

    const existingCustom = CustomSounds.getItemCustomSound(
      options.entityType,
      options.entityId,
      options.shopType
    );
    const defaultConfig = CustomSounds.getNotificationConfig(options.entityType);

    currentConfig = existingCustom
      ? { soundId: existingCustom.soundId, volume: existingCustom.volume, mode: existingCustom.mode }
      : { soundId: defaultConfig.soundId, volume: defaultConfig.volume, mode: defaultConfig.mode };

    const soundOptions = CustomSounds.getAll().map((sound) => ({
      value: sound.id,
      label: sound.name,
    }));

    const soundRow = element("div", { className: "custom-sound-modal-row" });
    const soundLabel = element("label", { className: "custom-sound-modal-label" }, "Sound");
    soundRow.appendChild(soundLabel);

    const soundControls = element("div", { className: "custom-sound-modal-controls" });

    soundSelect = Select({
      value: currentConfig.soundId,
      options: soundOptions,
      size: "sm",
      onChange: (soundId) => {
        if (currentConfig) {
          currentConfig.soundId = soundId;
        }
        stopPreview();
      },
    });
    soundControls.appendChild(soundSelect.root);

    playButton = Button({
      label: "Play",
      variant: "default",
      size: "sm",
      onClick: () => togglePreview(),
    });
    soundControls.appendChild(playButton);

    soundRow.appendChild(soundControls);
    body.appendChild(soundRow);

    const volumeRow = element("div", { className: "custom-sound-modal-row" });
    const volumeLabel = element("label", { className: "custom-sound-modal-label" }, "Volume");
    volumeRow.appendChild(volumeLabel);

    volumeSlider = Slider({
      min: 0,
      max: 100,
      step: 1,
      value: currentConfig.volume,
      showValue: true,
      onChange: (volume) => {
        if (currentConfig) {
          currentConfig.volume = volume;
        }
        if (currentAudio) {
          currentAudio.volume = volume / 100;
        }
      },
    });
    volumeRow.appendChild(volumeSlider.root);
    body.appendChild(volumeRow);

    const modeRow = element("div", { className: "custom-sound-modal-row" });
    const modeLabel = element("label", { className: "custom-sound-modal-label" }, "Mode");
    modeRow.appendChild(modeLabel);

    const modeControls = element("div", { className: "custom-sound-modal-mode-controls" });

    modeSelect = Select({
      value: currentConfig.mode,
      options: [
        { value: "one-shot", label: "One-shot" },
        { value: "loop", label: "Loop" },
      ],
      size: "sm",
      onChange: (mode) => {
        if (currentConfig) {
          currentConfig.mode = mode as NotificationMode;
        }
        updateModeDescription();
      },
    });
    modeControls.appendChild(modeSelect.root);

    modeDescription = element(
      "div",
      { className: "custom-sound-modal-mode-description" },
      MODE_DESCRIPTIONS[currentConfig.mode]
    );
    modeControls.appendChild(modeDescription);

    modeRow.appendChild(modeControls);
    body.appendChild(modeRow);

    return body;
  }

  function buildFooter(): HTMLElement {
    const footer = element("div", { className: "custom-sound-modal-footer" });

    const resetBtn = Button({
      label: "Reset",
      variant: "danger",
      size: "sm",
      onClick: () => {
        options.onSave(null);
        close();
      },
    });
    footer.appendChild(resetBtn);

    const spacer = element("div", { style: "flex: 1" });
    footer.appendChild(spacer);

    const cancelBtn = Button({
      label: "Cancel",
      variant: "default",
      size: "sm",
      onClick: () => close(),
    });
    footer.appendChild(cancelBtn);

    const saveBtn = Button({
      label: "Save",
      variant: "primary",
      size: "sm",
      onClick: () => {
        if (currentConfig) {
          options.onSave({ ...currentConfig });
        }
        close();
      },
    });
    footer.appendChild(saveBtn);

    return footer;
  }

  const body = buildBody();
  const footer = buildFooter();

  const content = element("div");
  ensureStyles(content);
  content.appendChild(body);

  modal = Modal({
    title: options.entityName || opts.title,
    content,
    footer,
    size: opts.size,
    closeOnBackdrop: opts.closeOnBackdrop,
    closeOnEscape: opts.closeOnEscape,
    onClose: handleClose,
  });
  modal.root.classList.add("custom-sound-modal");
  const titleEl = modal.root.querySelector<HTMLElement>(".modal-title");
  if (titleEl) {
    titleEl.replaceChildren(buildTitleContent());
  }

  return {
    root: modal.root,
    close,
    destroy,
  };
}
