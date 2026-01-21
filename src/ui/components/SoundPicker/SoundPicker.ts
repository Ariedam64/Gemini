import { element } from "../../styles/helpers";
import { Button } from "../Button/Button";
import { Input, InputHandle } from "../Input/Input";

export type SoundPickerItem = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
};

export type SoundPickerErrorCode = "type" | "size" | "limit" | "name";

export type SoundPickerError = {
  code: SoundPickerErrorCode;
  message: string;
  file?: File;
  maxSizeBytes?: number;
};

export type SoundPickerOptions = {
  id?: string;
  className?: string;
  label?: string;
  hint?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  maxSizeBytes?: number;
  maxItems?: number;
  emptyLabel?: string | Node;
  onItemsChange?: (items: SoundPickerItem[]) => void;
  onFilesAdded?: (items: SoundPickerItem[]) => void;
  onError?: (error: SoundPickerError) => void;
};

export type SoundPickerHandle = {
  root: HTMLDivElement;
  getItems: () => SoundPickerItem[];
  setItems: (items: SoundPickerItem[]) => void;
  addFiles: (files: FileList | File[]) => void;
  renameItem: (id: string, name: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  setDisabled: (disabled: boolean) => void;
  openPicker: () => void;
  setStatus: (message?: string | null, tone?: "info" | "error") => void;
  destroy: () => void;
};

const DEFAULT_ACCEPT = ".mp3,.wav,.ogg,audio/*";
const DEFAULT_MAX_SIZE_BYTES = 250 * 1024;
const MAX_VISIBLE_ITEMS = 3;

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `sound-${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;
}

function getNameFromFile(file: File): string {
  const name = file.name || "Untitled";
  const lastDot = name.lastIndexOf(".");
  if (lastDot <= 0) return name;
  return name.slice(0, lastDot) || name;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes)) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function parseAccept(accept: string): string[] {
  return accept
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

function isFileAccepted(file: File, accept: string): boolean {
  const parts = parseAccept(accept);
  if (!parts.length) return true;

  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return parts.some((part) => {
    const token = part.toLowerCase();
    if (token.startsWith(".")) {
      return name.endsWith(token);
    }
    if (token.endsWith("/*")) {
      const base = token.slice(0, -1);
      return type.startsWith(base);
    }
    return type === token;
  });
}

function formatAcceptLabel(accept: string): string {
  const parts = parseAccept(accept);
  const labels = parts
    .map((part) => {
      if (part.startsWith(".")) return part.slice(1).toUpperCase();
      if (part.endsWith("/*")) return "Audio";
      if (part.includes("/")) return part.split("/")[1]?.toUpperCase() || part.toUpperCase();
      return part.toUpperCase();
    })
    .filter(Boolean);
  return labels.length ? labels.join(", ") : "Audio";
}

export function SoundPicker(options: SoundPickerOptions = {}): SoundPickerHandle {
  const {
    id,
    className,
    label = "Add sounds",
    hint,
    accept = DEFAULT_ACCEPT,
    multiple = true,
    disabled = false,
    maxSizeBytes = DEFAULT_MAX_SIZE_BYTES,
    maxItems,
    emptyLabel = "No sounds added yet",
    onItemsChange,
    onFilesAdded,
    onError,
  } = options;

  let items: SoundPickerItem[] = [];
  let dragCounter = 0;
  let editingId: string | null = null;
  let ignoreBlur = false;
  let disabledState = !!disabled;
  let previewAudio: HTMLAudioElement | null = null;
  let previewItemId: string | null = null;
  let previewCleanup: (() => void) | null = null;

  const renameInputs = new Map<string, InputHandle>();
  const previewUrls = new Map<string, string>();

  const computedMaxItems = Number.isFinite(maxItems)
    ? Math.max(1, Number(maxItems))
    : (multiple ? Number.POSITIVE_INFINITY : 1);

  const root = element("div", { className: "sound-picker", id }) as HTMLDivElement;
  if (className) root.classList.add(...className.split(" ").filter(Boolean));
  if (disabledState) root.classList.add("is-disabled");

  const header = element("div", { className: "sound-picker__header" });
  const labelEl = element("div", { className: "sound-picker__label" }, label);
  const hintText = hint ?? `${formatAcceptLabel(accept)} - Max ${formatBytes(maxSizeBytes)}`;
  const hintEl = element("div", { className: "sound-picker__hint" }, hintText);
  header.append(labelEl, hintEl);

  const zone = element("div", {
    className: "sound-picker__zone",
    role: "button",
    tabIndex: disabledState ? -1 : 0,
    "aria-disabled": String(disabledState),
  }) as HTMLDivElement;

  const zoneText = element("div", { className: "sound-picker__zone-text" });
  const zoneTitle = element("div", { className: "sound-picker__zone-title" }, "Drop audio files here");
  const zoneSubtitle = element("div", { className: "sound-picker__zone-subtitle" }, "or click to browse");
  zoneText.append(zoneTitle, zoneSubtitle);

  const pickButton = Button({
    label: multiple ? "Choose files" : "Choose file",
    size: "sm",
    onClick: (ev) => {
      ev.preventDefault();
      if (!disabledState) fileInput.click();
    },
    disabled: disabledState,
  });
  pickButton.classList.add("sound-picker__pick");

  const fileInput = element("input", {
    className: "sound-picker__input",
    type: "file",
    accept,
    multiple: multiple ? true : undefined,
    disabled: disabledState,
    tabIndex: -1,
  }) as HTMLInputElement;

  zone.append(zoneText, pickButton, fileInput);

  const statusEl = element("div", {
    className: "sound-picker__status",
    role: "status",
    "aria-live": "polite",
  }) as HTMLDivElement;

  const list = element("div", { className: "sound-picker__list", role: "list" }) as HTMLDivElement;

  root.append(header, zone, statusEl, list);

  function setStatus(message?: string | null, tone: "info" | "error" = "info"): void {
    const text = message ?? "";
    statusEl.textContent = text;
    statusEl.classList.toggle("is-error", tone === "error");
  }

  function emitError(error: SoundPickerError): void {
    onError?.(error);
    setStatus(error.message, "error");
  }

  function cleanupRenameInputs(): void {
    for (const handle of renameInputs.values()) {
      try { handle.destroy(); } catch {}
    }
    renameInputs.clear();
  }

  function getPreviewUrl(item: SoundPickerItem): string {
    const existing = previewUrls.get(item.id);
    if (existing) return existing;

    // Check if file has a source URL (e.g., HTTP URLs for default sounds)
    const sourceUrl = (item.file as any).__sourceUrl;
    if (sourceUrl) {
      previewUrls.set(item.id, sourceUrl);
      return sourceUrl;
    }

    const url = URL.createObjectURL(item.file);
    previewUrls.set(item.id, url);
    return url;
  }

  function revokePreviewUrl(id: string): void {
    const url = previewUrls.get(id);
    if (!url) return;
    // Only revoke blob URLs, not HTTP/HTTPS URLs
    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
    }
    previewUrls.delete(id);
  }

  function stopPreview(): void {
    previewCleanup?.();
    previewCleanup = null;
    if (previewAudio) {
      previewAudio.pause();
      previewAudio.currentTime = 0;
    }
    previewAudio = null;
    previewItemId = null;
  }

  function updatePlayButtons(): void {
    const rows = list.querySelectorAll<HTMLDivElement>(".sound-picker__item");
    rows.forEach((row) => {
      const id = row.dataset.id;
      const playBtn = row.querySelector<HTMLButtonElement>(".sound-picker__item-btn--play");
      if (!id || !playBtn) return;
      const isActive = !!previewAudio && previewItemId === id && !previewAudio.paused;
      playBtn.textContent = isActive ? "Stop" : "Play";
      row.classList.toggle("is-playing", isActive);
    });
  }

  function togglePreview(item: SoundPickerItem): void {
    if (disabledState) return;
    if (previewItemId === item.id) {
      stopPreview();
      updatePlayButtons();
      return;
    }

    stopPreview();

    const url = getPreviewUrl(item);
    const audio = new Audio(url);
    previewAudio = audio;
    previewItemId = item.id;

    const onEnd = () => {
      if (previewItemId !== item.id) return;
      stopPreview();
      updatePlayButtons();
    };
    const onError = () => {
      if (previewItemId !== item.id) return;
      stopPreview();
      updatePlayButtons();
      emitError({ code: "type", file: item.file, message: `Unable to play ${item.name}` });
    };

    audio.addEventListener("ended", onEnd);
    audio.addEventListener("error", onError);
    previewCleanup = () => {
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("error", onError);
    };

    audio.play().then(() => {
      updatePlayButtons();
    }).catch(() => {
      stopPreview();
      updatePlayButtons();
      emitError({ code: "type", file: item.file, message: `Unable to play ${item.name}` });
    });
  }

  function renderList(): void {
    cleanupRenameInputs();
    list.classList.toggle("is-scrollable", items.length > MAX_VISIBLE_ITEMS);

    if (!items.length) {
      const empty = element("div", { className: "sound-picker__empty" });
      empty.append(typeof emptyLabel === "string" ? document.createTextNode(emptyLabel) : emptyLabel);
      list.replaceChildren(empty);
      return;
    }

    const nodes = items.map((item) => createItemRow(item));
    list.replaceChildren(...nodes);

    if (editingId) {
      const handle = renameInputs.get(editingId);
      if (handle) {
        requestAnimationFrame(() => handle.focus());
      }
    }

    updatePlayButtons();
  }

  function createItemRow(item: SoundPickerItem): HTMLDivElement {
    const isEditing = editingId === item.id;

    const row = element("div", {
      className: "sound-picker__item",
      role: "listitem",
      "data-id": item.id,
    }) as HTMLDivElement;

    const top = element("div", { className: "sound-picker__item-top" });
    const bottom = element("div", { className: "sound-picker__item-bottom" });

    const nameWrap = element("div", { className: "sound-picker__item-name" });

    if (isEditing && !disabledState) {
      const inputHandle = Input({
        value: item.name,
        blockGameKeys: true,
        onEnter: (value) => {
          commitRename(item.id, value);
        },
      });
      inputHandle.root.classList.add("sound-picker__rename");
      inputHandle.input.classList.add("input--sm");
      inputHandle.input.setAttribute("aria-label", "Rename sound");
      inputHandle.input.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") {
          ev.preventDefault();
          cancelRename();
        }
      });
      inputHandle.input.addEventListener("blur", () => {
        if (ignoreBlur) {
          ignoreBlur = false;
          return;
        }
        commitRename(item.id, inputHandle.getValue());
      });
      renameInputs.set(item.id, inputHandle);
      nameWrap.appendChild(inputHandle.root);
    } else {
      const labelEl = element("div", {
        className: "sound-picker__item-label",
        title: item.name,
      }, item.name);
      nameWrap.appendChild(labelEl);
    }

    const actions = element("div", {
      className: "sound-picker__item-actions",
      "aria-label": "Sound actions",
    });

    if (isEditing && !disabledState) {
      const saveBtn = element("button", {
        className: "sound-picker__item-btn",
        type: "button",
        disabled: disabledState,
      }, "Save") as HTMLButtonElement;
      saveBtn.addEventListener("click", () => {
        const handle = renameInputs.get(item.id);
        commitRename(item.id, handle?.getValue() ?? item.name);
      });

      const cancelBtn = element("button", {
        className: "sound-picker__item-btn",
        type: "button",
        disabled: disabledState,
      }, "Cancel") as HTMLButtonElement;
      cancelBtn.addEventListener("pointerdown", () => {
        ignoreBlur = true;
      });
      cancelBtn.addEventListener("click", () => cancelRename());

      actions.append(saveBtn, cancelBtn);
    } else {
      const playBtn = element("button", {
        className: "sound-picker__item-btn sound-picker__item-btn--play",
        type: "button",
        disabled: disabledState,
      }, previewItemId === item.id ? "Stop" : "Play") as HTMLButtonElement;
      playBtn.addEventListener("click", () => togglePreview(item));

      const renameBtn = element("button", {
        className: "sound-picker__item-btn",
        type: "button",
        disabled: disabledState,
      }, "Rename") as HTMLButtonElement;
      renameBtn.addEventListener("click", () => {
        if (disabledState) return;
        editingId = item.id;
        renderList();
      });

      const removeBtn = element("button", {
        className: "sound-picker__item-btn sound-picker__item-btn--danger",
        type: "button",
        disabled: disabledState,
      }, "Remove") as HTMLButtonElement;
      removeBtn.addEventListener("click", () => removeItem(item.id));

      actions.append(playBtn, renameBtn, removeBtn);
    }

    top.append(nameWrap, actions);
    row.append(top);
    return row;
  }

  function getItems(): SoundPickerItem[] {
    return items.slice();
  }

  function updateItems(next: SoundPickerItem[]): void {
    const nextItems = next.slice();
    const nextIds = new Set(nextItems.map((item) => item.id));
    for (const id of Array.from(previewUrls.keys())) {
      if (!nextIds.has(id)) revokePreviewUrl(id);
    }
    if (previewItemId && !nextIds.has(previewItemId)) {
      stopPreview();
    }
    items = nextItems;
    editingId = null;
    renderList();
    onItemsChange?.(getItems());
  }

  function addFiles(fileList: FileList | File[]): void {
    if (disabledState) return;
    const files = Array.from(fileList ?? []);
    if (!files.length) return;

    const accepted: SoundPickerItem[] = [];
    const errors: SoundPickerError[] = [];

    for (const file of files) {
      if (accept && !isFileAccepted(file, accept)) {
        errors.push({
          code: "type",
          file,
          message: `Unsupported file type: ${file.name}`,
        });
        continue;
      }
      if (Number.isFinite(maxSizeBytes) && file.size > maxSizeBytes) {
        errors.push({
          code: "size",
          file,
          maxSizeBytes,
          message: `File too large: ${file.name}`,
        });
        continue;
      }

      accepted.push({
        id: createId(),
        file,
        name: getNameFromFile(file),
        size: file.size,
        type: file.type,
      });
    }

    if (!accepted.length) {
      if (errors.length) emitError(errors[0]);
      return;
    }

    const base = multiple ? items.slice() : [];
    const remaining = Number.isFinite(computedMaxItems)
      ? Math.max(0, computedMaxItems - base.length)
      : accepted.length;

    if (remaining <= 0) {
      emitError({
        code: "limit",
        message: `Maximum of ${Math.max(1, computedMaxItems)} files reached`,
      });
      return;
    }

    const selected = accepted.slice(0, remaining);
    const nextItems = multiple ? base.concat(selected) : selected.slice(0, 1);

    updateItems(nextItems);
    setStatus(null);
    onFilesAdded?.(selected.slice());

    if (errors.length) emitError(errors[0]);
  }

  function renameItem(id: string, name: string): void {
    const trimmed = name.trim();
    if (!trimmed) {
      emitError({ code: "name", message: "Name cannot be empty" });
      return;
    }

    const next = items.map((item) => (
      item.id === id ? { ...item, name: trimmed } : item
    ));
    updateItems(next);
    setStatus(null);
  }

  function commitRename(id: string, value: string): void {
    const trimmed = value.trim();
    if (!trimmed) {
      emitError({ code: "name", message: "Name cannot be empty" });
      return;
    }
    renameItem(id, trimmed);
  }

  function cancelRename(): void {
    editingId = null;
    setStatus(null);
    renderList();
  }

  function removeItem(id: string): void {
    const next = items.filter((item) => item.id !== id);
    updateItems(next);
    setStatus(null);
  }

  function clear(): void {
    stopPreview();
    updateItems([]);
    setStatus(null);
  }

  function setDisabled(next: boolean): void {
    disabledState = !!next;
    root.classList.toggle("is-disabled", disabledState);
    zone.setAttribute("aria-disabled", String(disabledState));
    zone.tabIndex = disabledState ? -1 : 0;
    fileInput.disabled = disabledState;
    pickButton.setDisabled(disabledState);
    if (disabledState) {
      stopPreview();
    }
    renderList();
  }

  function openPicker(): void {
    if (!disabledState) fileInput.click();
  }

  const onZoneClick = (ev: MouseEvent) => {
    if (disabledState) return;
    const target = ev.target as HTMLElement | null;
    if (target && target.closest(".sound-picker__pick")) return;
    fileInput.click();
  };

  const onZoneKeyDown = (ev: KeyboardEvent) => {
    if (disabledState) return;
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      fileInput.click();
    }
  };

  const onDragEnter = (ev: DragEvent) => {
    if (disabledState) return;
    if (!ev.dataTransfer || !ev.dataTransfer.types.includes("Files")) return;
    ev.preventDefault();
    dragCounter += 1;
    zone.classList.add("is-dragover");
  };

  const onDragOver = (ev: DragEvent) => {
    if (disabledState) return;
    if (!ev.dataTransfer || !ev.dataTransfer.types.includes("Files")) return;
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
  };

  const onDragLeave = (ev: DragEvent) => {
    if (disabledState) return;
    if (!zone.classList.contains("is-dragover")) return;
    ev.preventDefault();
    dragCounter = Math.max(0, dragCounter - 1);
    if (dragCounter <= 0) {
      dragCounter = 0;
      zone.classList.remove("is-dragover");
    }
  };

  const onDrop = (ev: DragEvent) => {
    if (disabledState) return;
    if (!ev.dataTransfer || !ev.dataTransfer.files.length) return;
    ev.preventDefault();
    dragCounter = 0;
    zone.classList.remove("is-dragover");
    addFiles(ev.dataTransfer.files);
  };

  const onInputChange = () => {
    if (disabledState) {
      fileInput.value = "";
      return;
    }
    if (fileInput.files) addFiles(fileInput.files);
    fileInput.value = "";
  };

  zone.addEventListener("click", onZoneClick);
  zone.addEventListener("keydown", onZoneKeyDown);
  zone.addEventListener("dragenter", onDragEnter);
  zone.addEventListener("dragover", onDragOver);
  zone.addEventListener("dragleave", onDragLeave);
  zone.addEventListener("drop", onDrop);
  fileInput.addEventListener("change", onInputChange);

  renderList();

  return {
    root,
    getItems,
    setItems: updateItems,
    addFiles,
    renameItem,
    removeItem,
    clear,
    setDisabled,
    openPicker,
    setStatus,
    destroy() {
      cleanupRenameInputs();
      stopPreview();
      for (const id of Array.from(previewUrls.keys())) {
        revokePreviewUrl(id);
      }
      zone.removeEventListener("click", onZoneClick);
      zone.removeEventListener("keydown", onZoneKeyDown);
      zone.removeEventListener("dragenter", onDragEnter);
      zone.removeEventListener("dragover", onDragOver);
      zone.removeEventListener("dragleave", onDragLeave);
      zone.removeEventListener("drop", onDrop);
      fileInput.removeEventListener("change", onInputChange);
      root.remove();
    },
  };
}
